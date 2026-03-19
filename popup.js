const SURAHS = [
    { "number": 1, "name": "الفاتحة", "english": "Al-Fatihah" },
    { "number": 2, "name": "البقرة", "english": "Al-Baqarah" },
    { "number": 3, "name": "آل عمران", "english": "Ali 'Imran" },
    { "number": 4, "name": "النساء", "english": "An-Nisa" },
    { "number": 5, "name": "المائدة", "english": "Al-Ma'idah" },
    { "number": 6, "name": "الأنعام", "english": "Al-An'am" },
    { "number": 7, "name": "الأعراف", "english": "Al-A'raf" },
    { "number": 8, "name": "الأنفال", "english": "Al-Anfal" },
    { "number": 9, "name": "التوبة", "english": "At-Tawbah" },
    { "number": 10, "name": "يونس", "english": "Yunus" },
    { "number": 11, "name": "هود", "english": "Hud" },
    { "number": 12, "name": "يوسف", "english": "Yusuf" },
    { "number": 13, "name": "الرعد", "english": "Ar-Ra'd" },
    { "number": 14, "name": "إبراهيم", "english": "Ibrahim" },
    { "number": 15, "name": "الحجر", "english": "Al-Hijr" },
    { "number": 16, "name": "النحل", "english": "An-Nahl" },
    { "number": 17, "name": "الإسراء", "english": "Al-Isra" },
    { "number": 18, "name": "الكهف", "english": "Al-Kahf" },
    { "number": 19, "name": "مريم", "english": "Maryam" },
    { "number": 20, "name": "طه", "english": "Taha" },
    { "number": 21, "name": "الأنبياء", "english": "Al-Anbiya" },
    { "number": 22, "name": "الحج", "english": "Al-Hajj" },
    { "number": 23, "name": "المؤمنون", "english": "Al-Mu'minun" },
    { "number": 24, "name": "النور", "english": "An-Nur" },
    { "number": 25, "name": "الفرقان", "english": "Al-Furqan" },
    { "number": 26, "name": "الشعراء", "english": "Ash-Shu'ara" },
    { "number": 27, "name": "النمل", "english": "An-Naml" },
    { "number": 28, "name": "القصص", "english": "Al-Qasas" },
    { "number": 29, "name": "العنكبوت", "english": "Al-'Ankabut" },
    { "number": 30, "name": "الروم", "english": "Ar-Rum" },
    { "number": 31, "name": "لقمان", "english": "Luqman" },
    { "number": 32, "name": "السجدة", "english": "As-Sajdah" },
    { "number": 33, "name": "الأحزاب", "english": "Al-Ahzab" },
    { "number": 34, "name": "سبإ", "english": "Saba" },
    { "number": 35, "name": "فاطر", "english": "Fatir" },
    { "number": 36, "name": "يس", "english": "Ya-Sin" },
    { "number": 37, "name": "الصافات", "english": "As-Saffat" },
    { "number": 38, "name": "ص", "english": "Sad" },
    { "number": 39, "name": "الزمر", "english": "Az-Zumar" },
    { "number": 40, "name": "غافر", "english": "Ghafir" },
    { "number": 41, "name": "فصلت", "english": "Fussilat" },
    { "number": 42, "name": "الشورى", "english": "Ash-Shura" },
    { "number": 43, "name": "الزخرف", "english": "Az-Zukhruf" },
    { "number": 44, "name": "الدخان", "english": "Ad-Dukhan" },
    { "number": 45, "name": "الجاثية", "english": "Al-Jathiyah" },
    { "number": 46, "name": "الأحقاف", "english": "Al-Ahqaf" },
    { "number": 47, "name": "محمد", "english": "Muhammad" },
    { "number": 48, "name": "الفتح", "english": "Al-Fath" },
    { "number": 49, "name": "الحجرات", "english": "Al-Hujurat" },
    { "number": 50, "name": "ق", "english": "Qaf" },
    { "number": 51, "name": "الذاريات", "english": "Adh-Dhariyat" },
    { "number": 52, "name": "الطور", "english": "At-Tur" },
    { "number": 53, "name": "النجم", "english": "An-Najm" },
    { "number": 54, "name": "القمر", "english": "Al-Qamar" },
    { "number": 55, "name": "الرحمن", "english": "Ar-Rahman" },
    { "number": 56, "name": "الواقعة", "english": "Al-Waqi'ah" },
    { "number": 57, "name": "الحديد", "english": "Al-Hadid" },
    { "number": 58, "name": "المجادلة", "english": "Al-Mujadila" },
    { "number": 59, "name": "الحشر", "english": "Al-Hashr" },
    { "number": 60, "name": "الممتحنة", "english": "Al-Mumtahanah" },
    { "number": 61, "name": "الصف", "english": "As-Saff" },
    { "number": 62, "name": "الجمعة", "english": "Al-Jumu'ah" },
    { "number": 63, "name": "المنافقون", "english": "Al-Munafiqun" },
    { "number": 64, "name": "التغابن", "english": "At-Taghabun" },
    { "number": 65, "name": "الطلاق", "english": "At-Talaq" },
    { "number": 66, "name": "التحريم", "english": "At-Tahrim" },
    { "number": 67, "name": "الملك", "english": "Al-Mulk" },
    { "number": 68, "name": "القلم", "english": "Al-Qalam" },
    { "number": 69, "name": "الحاقة", "english": "Al-Haqqah" },
    { "number": 70, "name": "المعارج", "english": "Al-Ma'arij" },
    { "number": 71, "name": "نوح", "english": "Nuh" },
    { "number": 72, "name": "الجن", "english": "Al-Jinn" },
    { "number": 73, "name": "المزمل", "english": "Al-Muzzammil" },
    { "number": 74, "name": "المدثر", "english": "Al-Muddaththir" },
    { "number": 75, "name": "القيامة", "english": "Al-Qiyamah" },
    { "number": 76, "name": "الإنسان", "english": "Al-Insan" },
    { "number": 77, "name": "المرسلات", "english": "Al-Mursalat" },
    { "number": 78, "name": "النبإ", "english": "An-Naba" },
    { "number": 79, "name": "النازعات", "english": "An-Nazi'at" },
    { "number": 80, "name": "عبس", "english": "'Abasa" },
    { "number": 81, "name": "التكوير", "english": "At-Takwir" },
    { "number": 82, "name": "الانفطار", "english": "Al-Infitar" },
    { "number": 83, "name": "المطففين", "english": "Al-Mutaffifin" },
    { "number": 84, "name": "الانشقاق", "english": "Al-Inshiqaq" },
    { "number": 85, "name": "البروج", "english": "Al-Buruj" },
    { "number": 86, "name": "الطارق", "english": "At-Tariq" },
    { "number": 87, "name": "الأعلى", "english": "Al-A'la" },
    { "number": 88, "name": "الغاشية", "english": "Al-Ghashiyah" },
    { "number": 89, "name": "الفجر", "english": "Al-Fajr" },
    { "number": 90, "name": "البلد", "english": "Al-Balad" },
    { "number": 91, "name": "الشمس", "english": "Ash-Shams" },
    { "number": 92, "name": "الليل", "english": "Al-Layl" },
    { "number": 93, "name": "الضحى", "english": "Ad-Duha" },
    { "number": 94, "name": "الشرح", "english": "Ash-Sharh" },
    { "number": 95, "name": "التين", "english": "At-Tin" },
    { "number": 96, "name": "العلق", "english": "Al-'Alaq" },
    { "number": 97, "name": "القدر", "english": "Al-Qadr" },
    { "number": 98, "name": "البينة", "english": "Al-Bayyinah" },
    { "number": 99, "name": "الزلزلة", "english": "Az-Zalzalah" },
    { "number": 100, "name": "العاديات", "english": "Al-'Adiyat" },
    { "number": 101, "name": "القارعة", "english": "Al-Qari'ah" },
    { "number": 102, "name": "التكاثر", "english": "At-Takathur" },
    { "number": 103, "name": "العصر", "english": "Al-'Asr" },
    { "number": 104, "name": "الهمزة", "english": "Al-Humazah" },
    { "number": 105, "name": "الفيل", "english": "Al-Fil" },
    { "number": 106, "name": "قريش", "english": "Quraysh" },
    { "number": 107, "name": "الماعون", "english": "Al-Ma'un" },
    { "number": 108, "name": "الكوثر", "english": "Al-Kawthar" },
    { "number": 109, "name": "الكافرون", "english": "Al-Kafirun" },
    { "number": 110, "name": "النصر", "english": "An-Nasr" },
    { "number": 111, "name": "المسد", "english": "Al-Masad" },
    { "number": 112, "name": "الإخلاص", "english": "Al-Ikhlas" },
    { "number": 113, "name": "الفلق", "english": "Al-Falaq" },
    { "number": 114, "name": "الناس", "english": "An-Nas" }
];

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
const surahSelect = document.getElementById('surah');
const verseInput = document.getElementById('verse');
const updateBtn = document.getElementById('update-btn');
const statusDiv = document.getElementById('status');
const goToOptionsBtn = document.getElementById('go-to-options');
const optionsFooterLink = document.getElementById('options-footer-link');

surahSelect.addEventListener('keydown', (e) => {
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

function populateSurahDropdown() {
    const currentSurah = surahSelect.value;
    
    surahSelect.innerHTML = `<option value="">${language === 'ar' ? 'اختر السورة' : 'Select Surah'}</option>`;
    SURAHS.forEach(s => {
        const option = document.createElement('option');
        option.value = s.number;
        option.textContent = `${s.number}. ${language === 'ar' ? s.name : s.english}`;
        surahSelect.appendChild(option);
    });
    
    if (currentSurah) {
        surahSelect.value = currentSurah;
    }
}

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
            populateSurahDropdown();
            prefillFromTask();
            surahSelect.focus();
        }
    });
}

// --- NETWORK HELPERS ---
async function prefillFromTask() {
    if (!todoistToken || !taskId) return;
    
    try {
        const response = await fetchWithRetry(`https://api.todoist.com/api/v1/tasks/${taskId}`, {
            headers: { 'Authorization': `Bearer ${todoistToken}` }
        });
        const task = await response.json();
        const content = task.content;
        
        // Match both Arabic and English URLs
        // Format: [text](https://quran.com/1?startingVerse=1) or [text](https://quran.com/ar/1?startingVerse=1)
        const match = content.match(/https:\/\/quran\.com\/(?:ar\/)?(\d+)\?startingVerse=(\d+)/);
        
        if (match) {
            const surahNum = match[1];
            const verseNum = match[2];
            
            surahSelect.value = surahNum;
            verseInput.value = verseNum;
        }
    } catch (err) {
        console.error("Failed to prefill from task:", err);
    }
}

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
    const surah = surahSelect.value;
    let verse = verseInput.value;

    if (!surah) {
        showStatus(language === 'ar' ? "يرجى اختيار السورة" : "Please select a Surah", "error");
        return;
    }

    if (!verse || parseInt(verse, 10) === 0) {
        verse = '1';
        verseInput.value = '1';
    }

    updateBtn.disabled = true;
    showStatus(language === 'ar' ? "⏳ جاري المعالجة..." : "⏳ Processing...", "loading");

    try {
        // STEP 1: Fetch Quran Data
        showStatus(language === 'ar' ? "⏳ جاري جلب تفاصيل الآية..." : "⏳ Fetching Ayah details...", "loading");
        
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
        showStatus(language === 'ar' ? "📝 جاري إضافة التعليق..." : "📝 Adding Todoist comment...", "loading");
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
        showStatus(language === 'ar' ? "🔗 جاري تحديث الرابط..." : "🔗 Updating task link...", "loading");
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
        showStatus(language === 'ar' ? "✅ جاري التحقق من حالة المهمة..." : "✅ Checking task status...", "loading");
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
            completionMsg = language === 'ar' ? " وتم إكمال المهمة!" : " & Completed!";
        }

        const successMsg = language === 'ar' ? 
            `✅ تم الحفظ بنجاح: ${surahName} : ${verse}${completionMsg}` : 
            `✅ Successfully saved: ${surahName} : ${verse}${completionMsg}`;
        
        showStatus(successMsg, "success");
        verseInput.value = '';

    } catch (err) {
        console.error(err);
        showStatus(language === 'ar' ? "❌ خطأ: " + err.message : "❌ Error: " + err.message, "error");
    } finally {
        updateBtn.disabled = false;
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }
});

// Initialize
checkSetup();
