(function () {
    let selecting = false;
    let persistentToast = null;
    let hoveredElement = null;

    // --- HIGHLIGHTING ---
    function clearHighlight() {
        if (hoveredElement) {
            hoveredElement.style.outline = 'none';
        }
        hoveredElement = null;
    }

    // --- TOAST NOTIFICATIONS ---
    function showToast(message, persistent = false) {
        if (persistentToast) {
            persistentToast.textContent = '\u200E' + message;
            if (!persistent) {
                const toastToRemove = persistentToast;
                persistentToast = null;
                setTimeout(() => {
                    toastToRemove.style.opacity = '0';
                    setTimeout(() => toastToRemove.remove(), 300);
                }, 3000);
            }
            return;
        }

        const toast = document.createElement('div');
        toast.textContent = '\u200E' + message;
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(30, 30, 30, 0.95)',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            zIndex: '2147483647', // Max Z-Index
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            opacity: '0',
            transition: 'opacity 0.3s ease-in-out',
            pointerEvents: 'none',
            fontFamily: 'sans-serif',
            maxWidth: '90vw',
            direction: 'ltr',
            textAlign: 'center',
            backdropFilter: 'blur(4px)'
        });

        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
        });

        if (persistent) {
            persistentToast = toast;
        } else {
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
    }

    function clearPersistentToast() {
        if (persistentToast) {
            const t = persistentToast;
            persistentToast = null;
            t.style.opacity = '0';
            setTimeout(() => t.remove(), 300);
        }
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
                const isLast = i === retries - 1;
                console.warn(`Attempt ${i + 1} failed: ${err.message}`);
                
                if (isLast) throw err;
                showToast(`⚠️ Connection issue... Retrying (${i + 1}/${retries})`, true);
                await new Promise(res => setTimeout(res, 1500));
            }
        }
    }

    // --- BUTTON CREATION ---
    function insertButton() {
        if (document.getElementById('ayah-select-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'ayah-select-btn';
        btn.innerHTML = '<span>📖</span>'; 
        
        Object.assign(btn.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '2147483647',
            width: '50px',
            height: '50px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)', 
            color: '#fff',
            border: '2px solid rgba(255,255,255,0.2)',
            borderRadius: '50%', 
            fontSize: '24px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        });

        btn.onmousedown = () => { btn.style.transform = 'scale(0.9)'; };
        btn.onmouseup = () => { btn.style.transform = 'scale(1.1)'; };

        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Don't trigger page clicks
            if (selecting) {
                selecting = false;
                clearHighlight();
                clearPersistentToast();
                showToast("❌ Cancelled");
                btn.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                return;
            }
            selecting = true;
            btn.style.backgroundColor = '#2ecc71'; // Green when active
            showToast('📌 Hover over a verse and click to save', true);
        });

        document.body.appendChild(btn);
    }

    // --- DATE HELPERS ---
    function isToday(dateStr) {
        if(!dateStr) return false;
        const today = new Date().toISOString().slice(0, 10);
        return dateStr === today;
    }

    function isOverdue(dateStr) {
        if(!dateStr) return false;
        const today = new Date().toISOString().slice(0, 10);
        return dateStr < today;
    }

    // --- HELPER: Find Verse Element ---
    function findVerseElement(target) {
        const verseEl = target.closest('[data-verse-key], [data-word-location]');
        return verseEl;
    }

    // --- MAIN LOGIC ---
    async function handleTap(e) {
        // We use the globally hovered element, not the clicked target
        if (!hoveredElement) return;

        const locationVal = hoveredElement.dataset.verseKey || hoveredElement.dataset.wordLocation;
        if (!locationVal) return;

        // Clear highlight and exit selection mode immediately
        clearHighlight();
        const btn = document.getElementById('ayah-select-btn');
        if (btn) btn.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        showToast("Processing...", true);

        // Parse: "4:1:1" (word) or "4:1" (verse)
        const parts = locationVal.split(':');
        const surah = parts[0];
        const ayah = parts[1];
        
        console.log('📌 Processing:', surah, ayah);
        
        // CONFIG
        chrome.storage.sync.get(['todoistToken', 'todoistTaskId', 'language'], async function(result) {
            if (!result.todoistToken) {
                showToast("❌ Todoist token not set. Please set it in the extension options.", false);
                return;
            }
            if (!result.todoistTaskId) {
                showToast("❌ Todoist Task ID not set. Please set it in the extension options.", false);
                return;
            }
            const todoistToken = result.todoistToken;
            const taskId = result.todoistTaskId;
            const language = result.language || 'ar';

        try {
            // Disable selection mode immediately
            selecting = false;
            clearPersistentToast();

            // STEP 1: Fetch Quran Data
            showToast("⏳ Fetching Ayah details...", true);
            
            const edition = language === 'ar' ? 'ar.alafasy' : 'en.sahih';
            const quranRes = await fetchWithRetry(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/${edition}`);
            const quranJson = await quranRes.json();
            const data = quranJson.data;
            
            const surahName = language === 'ar' ? data.surah.name : data.surah.englishName;
            const pageNumber = data.page;
            const juzNumber = data.juz;
            const ayahText = data.text;

            let formattedComment;
            if (language === 'ar') {
                formattedComment = `${surahName} (${surah})، آية رقم (${ayah}) صـ(${pageNumber})، الجزء رقم (${juzNumber}) حتي قوله تعالى: ${ayahText}`;
            } else {
                formattedComment = `Surah ${surahName} (${surah}), Ayah (${ayah}), Page (${pageNumber}), Juz (${juzNumber}) until: ${ayahText}`;
            }

            // STEP 2: Post Comment
            showToast("📝 Updating Todoist...", true);
            
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
            let newUrl, newContent;
            if (language === 'ar') {
                newUrl = `https://quran.com/ar/${surah}?startingVerse=${ayah}`;
                newContent = `[قراءة القرآن الكريم](${newUrl})`;
            } else {
                newUrl = `https://quran.com/${surah}?startingVerse=${ayah}`;
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
            const taskRes = await fetchWithRetry(`https://api.todoist.com/api/v1/tasks/${taskId}`, {
                headers: { 'Authorization': `Bearer ${todoistToken}` }
            });
            const task = await taskRes.json();
            const due = task.due?.date;

            let completionMsg = "";
            if (due && (isToday(due) || isOverdue(due))) {
                await fetchWithRetry(`https://api.todoist.com/api/v1/tasks/${taskId}/close`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${todoistToken}` }
                });
                completionMsg = " & Completed!";
            }

            // SUCCESS
            showToast(`✅ Saved: ${surahName} : ${ayah}${completionMsg}`, false);

        } catch (err) {
            console.error(err);
            showToast("❌ Failed: " + err.message, false);
            // Re-enable selection if it failed so user can try again
            selecting = true; 
            if(btn) btn.style.backgroundColor = '#2ecc71';
        }
    });}

    // --- EVENT LISTENERS ---
    function setupTapHandler() {
        // Listen for hover events to highlight potential targets
        document.addEventListener('mousemove', (e) => {
            if (!selecting) return;

            const targetElement = findVerseElement(e.target);

            // If we are not hovering a valid element, clear any existing highlight
            if (!targetElement) {
                clearHighlight();
                return;
            }

            // If we are already hovering this element, do nothing
            if (targetElement === hoveredElement) {
                return;
            }

            // Clear previous highlight and apply a new one
            clearHighlight();
            hoveredElement = targetElement;
            hoveredElement.style.outline = '2px solid rgba(46, 204, 113, 0.7)';
        }, true);

        // Listen for clicks to process the highlighted element
        document.addEventListener('click', (e) => {
            if (!selecting || !hoveredElement) return;
            
            // Stop the original click from doing anything
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            handleTap(e);
        }, true); // Use capture phase to intercept clicks early

        // Also block mousedown and pointerdown to prevent audio playback
        const blockAndHandle = (e) => {
            if (!selecting || !hoveredElement) return;
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        };

        document.addEventListener('mousedown', blockAndHandle, true);
        document.addEventListener('pointerdown', blockAndHandle, true);

        // Cancel selection with Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && selecting) {
                selecting = false;
                clearHighlight();
                clearPersistentToast();
                showToast("Selection cancelled");
                const btn = document.getElementById('ayah-select-btn');
                if (btn) btn.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
            }
        });
    }

    insertButton();
    setupTapHandler();
})();
