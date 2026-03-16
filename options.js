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
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
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
    });
}

function handleNumericInput(e) {
    const originalValue = e.target.value;
    // Convert Arabic digits to Western
    const converted = originalValue.replace(/[٠-٩]/g, d => d.charCodeAt(0) - 1632);
    // Only allow digits
    const onlyDigits = converted.replace(/\D/g, '');
    if (e.target.value !== onlyDigits) {
        e.target.value = onlyDigits;
    }
}

// Clears the stored token and taskId
function clear_options() {
    chrome.storage.sync.set({
        todoistToken: '',
        todoistTaskId: ''
    }, function() {
        document.getElementById('token').value = '';
        document.getElementById('taskId').value = '';
        var status = document.getElementById('status');
        status.textContent = 'Options cleared.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('clear').addEventListener('click', clear_options);
document.getElementById('taskId').addEventListener('input', handleNumericInput);
