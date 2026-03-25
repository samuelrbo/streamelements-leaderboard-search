# Changelog — StreamElements Leaderboard Search

All notable changes to this project will be documented in this file.
The format follows the guidelines of [Keep a Changelog](https://keepachangelog.com/).
This project is licensed under **GPLv3**.

---

## [Unreleased]
-

---

## [1.1.1] - 2026-03-25
### Added
- Update folder organization
- Build plugin command
- Update project structure
- Tests with Puppeteer
- Include Docker to execute e2e tests
- Update documentation
- GitHub Actions pipeline for automated testing.
- Automated ZIP artifact generation on Tag push.

## [1.1.0] - 2026-03-23
### Added
- Update plugin version
- onUrlChange
- New query to check the leaderboard table
- Logged user points details on sidebar
  - Position
  - Usernam
  - Points (Formatted)

### Removed
- Required permissions for chrome plugin on:
  - tabs
  - <all_urls>

## [1.0.0] — 2026-03-21
### Added
- Initial functional release of the extension.
- Automatic extraction of the streamer identifier from the StreamElements URL.
- Support for dynamic pages using `MutationObserver`.
- Initial project structure:
  - `_locales/`
    - `en/`
      - `messages.json`
    - `pt_BR/`
      - `messages.json`
    - `pt_PT/`
      - `messages.json`
  - `icons/`
    - `icon16.png`
    - `icon32.png`
    - `icon48.png`
    - `icon128.png`
    - `icon256.png`
  - `scripts/`
    - `content.js`
  - `manifest.json`
  - `.gitignore`
  - `CHANGELOG.md`
  - `CONTRIBUTING.md`
  - `LICENSE`
  - `manifest.json`
  - `README.md`
- Optimized `.gitignore` file.

---

## Project History
The project was created by **Samuel Oliveira <samuelrbo@gmail.com>**
to simplify the process of querying public StreamElements leaderboards.
