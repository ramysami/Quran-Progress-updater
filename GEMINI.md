# GEMINI.md

## Project Overview

This is a Chrome browser extension called "Quran Progress Updater". Its purpose is to help users track their Quran reading progress by integrating with Todoist.

When active on `quran.com`, the extension injects a button onto the page. Clicking this button enables a "selection mode." When the user then clicks on a specific Ayah (verse), the extension automatically:

1.  Fetches detailed metadata about the selected Ayah (Surah name, page, Juz) from the `api.alquran.cloud` API.
2.  Creates a formatted comment in a specific Todoist task with the Ayah details.
3.  Updates the Todoist task's content to be a direct link to the selected Ayah on `quran.com`.
4.  If the task was due, it marks it as complete.

### Technologies Used

*   **Languages:** JavaScript
*   **APIs:**
    *   `api.alquran.cloud` (for Quran metadata)
    *   `api.todoist.com` (for task management)
*   **Platform:** Chrome Extension (Manifest V3)

## Building and Running

This project is a simple Chrome extension and does not have a formal build process (e.g., webpack, vite).

To run the extension:

1.  Open Google Chrome and navigate to `chrome://extensions`.
2.  Enable "Developer mode" using the toggle in the top-right corner.
3.  Click the "Load unpacked" button.
4.  Select the directory containing this `GEMINI.md` file.
5.  The extension should now be loaded and active. You can visit `quran.com` to see the "Activate Ayah Selector" button.

## Configuration

To use the extension, you need to configure your Todoist credentials.

1.  Go to the extensions page (`chrome://extensions`).
2.  Find the "Quran Progress Updater" extension and click on "Details".
3.  Click on "Extension options".
4.  Enter your **Todoist API Token** and **Task ID** (the ID of the task you want to update).
5.  Click "Save".

## Development Conventions

### Code Style

The code in `content.js` is written in modern JavaScript (ES6+). It uses `async/await` for handling asynchronous operations.
