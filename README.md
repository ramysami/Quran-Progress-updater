# Quran Progress Updater

A dual-mode tool to help you track your Quran reading progress by integrating [Quran.com](https://quran.com) with [Todoist](https://todoist.com).

This repository contains both a **Chrome Extension** for an integrated experience on Quran.com and a **Standalone Web Version** for manual updates from any browser.

## 🚀 Features

- **Integrated Selection (Extension):** Activate "Selection Mode" on Quran.com and click any Ayah to update your progress.
- **Manual Update (Web):** Use the GitHub Pages version to manually enter Surah and Verse numbers.
- **Detailed Metadata:** Automatically fetches Surah name, Page number, and Juz using the [Al Quran Cloud API](https://alquran.cloud/api).
- **Todoist Automation:**
    - Adds a formatted comment with Ayah details to your tracking task.
    - Updates the task content with a direct link to the specific Ayah on Quran.com.
    - Automatically completes the task if it is due today or overdue.
- **Privacy Focused:** Your Todoist API token is stored locally in your browser and is only sent directly to the Todoist API.

---

## 🛠 Chrome Extension

The extension provides the most seamless experience by allowing you to select verses directly on the Quran.com interface.

### Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **"Developer mode"** (top-right toggle).
4. Click **"Load unpacked"** and select the root directory of this project.

### Configuration

1. In `chrome://extensions`, find **Quran Progress Updater** and click **Details**.
2. Click **Extension options**.
3. Enter your **Todoist API Token** (found in Todoist Settings > Integrations > Developer).
4. Enter the **Task ID** of the specific task you use for tracking (found at the end of the task's URL).
5. Click **Save**.

### Usage

1. Visit [Quran.com](https://quran.com).
2. Click the extension icon in your toolbar (or the "Activate Ayah Selector" button if pinned).
3. Click on the Ayah you just finished reading.
4. The extension will handle the rest!

---

## 🌐 Web Version (GitHub Pages)

Located in the `/gh-page` directory, this is a standalone HTML file that can be hosted on GitHub Pages. It’s perfect for updating your progress from mobile or browsers where you can't install extensions.

### Setup

1. Enable GitHub Pages for your fork/repository and point it to the `/gh-page` directory (or just open `gh-page/index.html` locally).
2. On first visit, enter your **Todoist API Token** and **Task ID**.
3. These settings are saved in your browser's `localStorage`.

### Usage

1. Enter the **Surah Number** and **Ayah Number**.
2. Click **Update Progress**.

---

## 🛡 Security & Privacy

- **No Backend:** This project is 100% client-side. No data is ever sent to a third-party server other than the official Todoist and Al Quran Cloud APIs.
- **Local Storage:** Your sensitive API token is stored only in your browser (Chrome Storage for the extension, LocalStorage for the web version).

## 🛠 Tech Stack

- **Languages:** JavaScript (ES6+), HTML5, CSS3.
- **APIs:** [Todoist REST API](https://developer.todoist.com/rest/v2/), [Al Quran Cloud API](https://alquran.cloud/api).
- **Platform:** Chrome Extension Manifest V3.
