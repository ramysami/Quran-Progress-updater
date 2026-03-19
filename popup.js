// --- NUMERIC HELPERS ---
function convertArabicToWestern(str) {
    return str.replace(/[٠-٩]/g, d => d.charCodeAt(0) - 1632);
}

function handleNumericInput(e) {
    const originalValue = e.target.value;
    const converted = convertArabicToWestern(originalValue);
    // Also filter to only allow digits
    const onlyDigits = converted.replace(/\D/g, '');
    if (e.target.value !== onlyDigits) {
        e.target.value = onlyDigits;
    }
}

// --- UI LOGIC ---
const mainSection = document.getElementById('main-section');
const errorSection = document.getElementById('error-section');
const surahInput = document.getElementById('surah');
const verseInput = document.getElementById('verse');
const updateBtn = document.getElementById('update-btn');
const statusDiv = document.getElementById('status');
const goToOptionsBtn = document.getElementById('go-to-options');
const optionsFooterLink = document.getElementById('options-footer-link');

document.getElementById('surah').addEventListener('input', (e) => {
    handleNumericInput(e);
    const val = e.target.value;
    if (val !== '') {
        const num = parseInt(val, 10);
        if (num > 114) e.target.value = '114';
    }
});
document.getElementById('surah').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        verseInput.focus();
    }
});
document.getElementById('verse').addEventListener('input', handleNumericInput);
document.getElementById('verse').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        updateBtn.click();
    }
});

function showStatus(msg, type = '') {
    statusDiv.textContent = msg;
    statusDiv.className = 'status-msg ' + type;
}

function openOptions() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
}

goToOptionsBtn.addEventListener('click', openOptions);
optionsFooterLink.addEventListener('click', (e) => {
    e.preventDefault();
    openOptions();
});

// --- PERSISTENCE ---
let todoistToken, taskId, language;

function checkSetup() {
    chrome.storage.sync.get(['todoistToken', 'todoistTaskId', 'language'], (items) => {
        todoistToken = items.todoistToken;
        taskId = items.todoistTaskId;
        language = items.language || 'ar';

        if (!todoistToken || !taskId) {
            mainSection.style.display = 'none';
            errorSection.style.display = 'block';
        } else {
            mainSection.style.display = 'block';
            errorSection.style.display = 'none';
            surahInput.focus();
        }
    });
}

// --- NETWORK HELPERS ---
async function fetchWithRetry(url, options = {}, retries = 3, timeout = 6000) {
    for (let i = 0; i < retries; i++) {
        try {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);
            
            const response = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(id);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response;
        } catch (err) {
            if (i === retries - 1) throw err;
            await new Promise(res => setTimeout(res, 1500));
        }
    }
}

function isTodayOrOverdue(dateStr) {
    if(!dateStr) return false;
    const today = new Date().toISOString().slice(0, 10);
    return dateStr <= today;
}

// --- MAIN LOGIC ---
updateBtn.addEventListener('click', async () => {
    const surah = surahInput.value;
    let verse = verseInput.value;

    if (!surah) {
        showStatus("Please enter a Surah number", "error");
        return;
    }

    if (!verse || parseInt(verse, 10) === 0) {
        verse = '1';
        verseInput.value = '1';
    }

    const surahNum = parseInt(surah, 10);
    if (surahNum < 1 || surahNum > 114) {
        showStatus("Surah number must be between 1 and 114", "error");
        return;
    }

    updateBtn.disabled = true;
    showStatus("⏳ Processing...", "loading");

    try {
        // STEP 1: Fetch Quran Data
        showStatus("⏳ Fetching Ayah details...", "loading");
        
        const quranRes = await fetchWithRetry(`https://api.alquran.cloud/v1/ayah/${surah}:${verse}/ar.alafasy`);
        const quranJson = await quranRes.json();
        const data = quranJson.data;
        
        const surahName = language === 'ar' ? data.surah.name : data.surah.englishName;
        const pageNumber = data.page;
        const juzNumber = data.juz;
        const ayahText = data.text;

        let formattedComment;
        if (language === 'ar') {
            formattedComment = `سُورَةُ ${surahName} (${surah})
الجزء: ${juzNumber}
صفحة: ${pageNumber}
آيه (${verse}): ${ayahText}`;
        } else {
            formattedComment = `Surah ${surahName} (${surah})
Juz: ${juzNumber}
Page: ${pageNumber}
Ayah (${verse}): ${ayahText}`;
        }

        // STEP 2: Post Comment
        showStatus("📝 Adding Todoist comment...", "loading");
        await fetchWithRetry(`https://api.todoist.com/api/v1/comments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${todoistToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task_id: taskId,
                content: formattedComment
            })
        });

        // STEP 3: Update Task URL
        showStatus("🔗 Updating task link...", "loading");
        let newUrl, newContent;
        if (language === 'ar') {
            newUrl = `https://quran.com/ar/${surah}?startingVerse=${verse}`;
            newContent = `[قراءة القرآن الكريم](${newUrl})`;
        } else {
            newUrl = `https://quran.com/${surah}?startingVerse=${verse}`;
            newContent = `[Reading the Holy Quran](${newUrl})`;
        }

        await fetchWithRetry(`https://api.todoist.com/api/v1/tasks/${taskId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${todoistToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: newContent })
        });

        // STEP 4: Check Completion
        showStatus("✅ Checking task status...", "loading");
        const taskRes = await fetchWithRetry(`https://api.todoist.com/api/v1/tasks/${taskId}`, {
            headers: { 'Authorization': `Bearer ${todoistToken}` }
        });
        const task = await taskRes.json();
        const due = task.due?.date;

        let completionMsg = "";
        if (due && isTodayOrOverdue(due)) {
            await fetchWithRetry(`https://api.todoist.com/api/v1/tasks/${taskId}/close`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${todoistToken}` }
            });
            completionMsg = " & Completed!";
        }

        showStatus(`✅ Successfully saved: ${surahName} : ${verse}${completionMsg}`, "success");
        surahInput.value = '';
        verseInput.value = '';

    } catch (err) {
        console.error(err);
        showStatus("❌ Error: " + err.message, "error");
    } finally {
        updateBtn.disabled = false;
    }
});

// Initialize
checkSetup();
