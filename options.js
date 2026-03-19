const translations = {
    ar: {
        title: "إعدادات محدث تقدم القرآن",
        tokenLabel: "رمز Todoist API:",
        tokenPlaceholder: "أدخل الرمز هنا",
        taskIdLabel: "رقم المهمة في Todoist:",
        taskIdPlaceholder: "أدخل رقم المهمة هنا",
        languageLabel: "اللغة:",
        saveBtn: "حفظ",
        clearBtn: "مسح",
        statusSaved: "تم حفظ الإعدادات.",
        statusCleared: "تم مسح الإعدادات."
    },
    en: {
        title: "Quran Progress Updater Options",
        tokenLabel: "Todoist API Token:",
        tokenPlaceholder: "Enter your token here",
        taskIdLabel: "Todoist Task ID:",
        taskIdPlaceholder: "Enter your Task ID here",
        languageLabel: "Language:",
        saveBtn: "Save",
        clearBtn: "Clear",
        statusSaved: "Options saved.",
        statusCleared: "Options cleared."
    }
};

function updateUI(lang) {
    const t = translations[lang] || translations.en;
    document.getElementById('title').textContent = t.title;
    document.querySelector('label[for="token"]').textContent = t.tokenLabel;
    document.getElementById('token').placeholder = t.tokenPlaceholder;
    document.querySelector('label[for="taskId"]').textContent = t.taskIdLabel;
    document.getElementById('taskId').placeholder = t.taskIdPlaceholder;
    document.querySelector('label[for="language"]').textContent = t.languageLabel;
    document.getElementById('save').textContent = t.saveBtn;
    document.getElementById('clear').textContent = t.clearBtn;
    
    // Set text direction
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

// Saves options to chrome.storage
function save_options() {
    var token = document.getElementById('token').value;
    var taskId = document.getElementById('taskId').value;
    var language = document.getElementById('language').value;
    chrome.storage.sync.set({
        todoistToken: token,
        todoistTaskId: taskId,
        language: language
    }, function() {
        updateUI(language);
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        const t = translations[language] || translations.en;
        status.textContent = t.statusSaved;
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores input box state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        todoistToken: '',
        todoistTaskId: '',
        language: 'ar'
    }, function(items) {
        document.getElementById('token').value = items.todoistToken;
        document.getElementById('taskId').value = items.todoistTaskId;
        document.getElementById('language').value = items.language;
        updateUI(items.language);
    });
}

// Clears the stored token and taskId
function clear_options() {
    chrome.storage.sync.set({
        todoistToken: '',
        todoistTaskId: ''
    }, function() {
        document.getElementById('token').value = '';
        document.getElementById('taskId').value = '';
        var language = document.getElementById('language').value;
        var status = document.getElementById('status');
        const t = translations[language] || translations.en;
        status.textContent = t.statusCleared;
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('clear').addEventListener('click', clear_options);
document.getElementById('language').addEventListener('change', (e) => updateUI(e.target.value));
