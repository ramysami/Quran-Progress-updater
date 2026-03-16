# Quran Progress Web Updater (GitHub Pages)

This is a standalone web version of the "Quran Progress Updater" Chrome extension, designed to be hosted on GitHub Pages. It allows users to manually update their Quran reading progress in Todoist from any browser without needing the extension installed.

## Features

- **Manual Input:** Simple form to enter Surah and Verse numbers.
- **Todoist Integration:** 
    - Fetches Ayah metadata (Name, Text, Page, Juz) from `api.alquran.cloud`.
    - Adds a formatted comment to a specific Todoist task.
    - Updates the task content with a direct link to the verse on `quran.com`.
    - Automatically completes the task if it is due today or overdue.
- **Persistent Settings:** Uses `localStorage` to remember your Todoist API Token and Task ID so you only have to enter them once.
- **Responsive Design:** A clean, mobile-friendly interface with modern CSS.

## Setup & Configuration

1. **Deploy:** Upload the `index.html` file to a GitHub repository and enable GitHub Pages.
2. **First Visit:** When you first open the page, it will ask for your:
    - **Todoist API Token:** Found in Todoist Settings > Integrations > Developer.
    - **Task ID:** The unique ID of the Todoist task you want to update (found in the task's URL).
3. **Save:** Click "Save & Continue". These credentials are stored locally in your browser.

## Security & Privacy

- **No Backend:** This is a 100% client-side application. Your API token is never sent to any server except directly to `api.todoist.com`.
- **Storage:** Credentials are saved in your browser's `localStorage`. 
- **Recommendation:** 
    - Do **not** use this on public computers without clearing the settings (via the Settings menu) or using Incognito mode.
    - For maximum isolation, consider using a custom domain for your GitHub Pages site.
- **Alternative to Hardcoding:** This approach is significantly more secure than hardcoding secrets into the source code, as it prevents them from being committed to your GitHub repository.

## Development

The logic is contained entirely within `index.html` using Vanilla JS for maximum portability and zero dependencies. It replicates the core functionality of the `content.js` script from the original Chrome extension.
