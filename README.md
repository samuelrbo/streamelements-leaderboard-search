# StreamElements Leaderboard Search

<p align="center">
  <img src="https://img.shields.io/badge/-chrome%20extesion-7B00FF?style=for-the-badge">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-7B00FF?style=for-the-badge">
  <img src="https://img.shields.io/badge/language-JS-7B00FF?style=for-the-badge">
  <img src="https://img.shields.io/badge/license-gplv3-7B00FF?style=for-the-badge">
</p>

---

After the update on the StreamElements UI, was removed the search from the leaderboard interface.

This plugin add an search input to Streamer leaderboard page using the StreamElements public API.

## How it works

The extension injects the `scripts/content.js` in the StremElements' leaderboard page.

## Project Structure

```sh
/
├── _locales/             # Language files
    ├── en/
        ├── messages.json # English i18n file
    ├── pr_BR/
        ├── messages.json # Brazilian Portuguese i18n file
    ├── pt_PT/
        ├── messages.json # Portugal Portuguese i18n file
├── icons/                # Icons
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    ├── icon128.png
    ├── icon256.png
├── scripts/
    ├── content.js        # Script injected in the StreamElemets page to execute the search
├── .gitignore            # Git ignore
├── CHANGELOG.md          # Changelog doc file
├── CONTRIBUTING.md       # Contributing doc file
├── LICENSE               # GPLv3 License
├── manifest.json         # Extension configuration
└── README.md             # This file
```


## Developer mode

1. Clone (or download) the project repository
2. Open Chrome (or Chrome like browser) and access: `chrome://extensions`
3. Active the developer mode
4. Click to load without package
5. Select the package folder
