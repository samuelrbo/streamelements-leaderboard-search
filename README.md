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

After the update on the StreamElements UI, the search functionality was removed from the leaderboard interface.

This extension adds a search input to the Streamer leaderboard page using the StreamElements public API, allowing users to find rankings quickly.

## ✨ Features

- **Real-time Search:** Filter any user in the leaderboard instantly.
- **Sidebar Integration:** View your personal rank, username, and formatted points in a fixed sidebar card.
- **Auto-Update:** Personal points in the sidebar refresh automatically based on the channel's loyalty settings.

## 🧪 Testing & Quality

This project uses a robust testing infrastructure to ensure that UI changes in StreamElements don't break the extension.

### Running Tests (Docker)

To ensure parity with the CI/CD environment, we use Docker to run E2E tests with Puppeteer:

```sh
docker compose -f docker-compose.e2e.yml up --build --exit-code-from e2e
```

## Project Structure

```sh
/
├── docs/                         # Documentation folder
|   ├── CHANGELOG.md              # Changelog doc file
|   └── CONTRIBUTING.md           # Contributing doc file
├── extension/                    # Extension files
|   ├── _locales/                 # Language files
|   |   ├── en/                   # English i18n folder
|   |       └── messages.json     # English i18n file
|   |   ├── pr_BR/                # Brazilian Portuguese i18n folder
|   |       └── messages.json     # Brazilian Portuguese i18n file
|       └── pt_PT/                # Portugal Portuguese i18n folder
|           └── messages.json     # Portugal Portuguese i18n file
|   ├── icons/                    # Icons
|       ├── icon16.png
|       ├── icon32.png
|       ├── icon48.png
|       ├── icon128.png
|       └── icon256.png
|   ├── scripts/
|       ├── constants.js          # Extension constants
|       ├── content.js            # Script injected in the StreamElemets page to execute the search
|       └── utils.js              # Extension utils
|   └── manifest.json             # Extension configuration
├── tests/                        # Tests
|   ├── e2e/                      # End-to-end tests folder
|     ├── mocks/                  # End-to-end mocks
|       ├── api.js                # API mock
|       └── dom.js                # DOM mock
|     ├── content.test.js         # Content test
|     ├── search.test.js          # Search test
|     └── sidebar.test.js         # Sidebar points test
|   ├── unit/                     # Unit tests
|     └── utils.test.js           # Project utils functions test
|   └── puppeteer.environment.js  # Contributing doc file
├── .gitignore                    # Git ignore file
├── build-extension.js            # Build extension zip file
├── extension.zip                 # Builded extension zip file
├── jest.config.js                # Test/Jest config file
├── LICENSE                       # GPLv3 License
├── package-lock.json             # Package-lock file
├── package.json                  # Packge file
└── README.md                     # This file
```

## Developer mode

1. Clone (or download) the project repository
2. Open Chrome (or Chrome like browser) and access: `chrome://extensions`
3. Active the developer mode
4. Click to load without package
5. Select the package folder

## 💖 Support the Project

If this extension has helped you or your community, consider supporting its continuous development. Every contribution helps keep the project updated and free!

### 🌎 International (PayPal)

For international supporters, you can donate via PayPal:

[<img src="https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white" />](https://www.paypal.com/donate/?hosted_button_id=HPGPH82LXYNPN)

---

### 🦊 Crypto (MetaMask/Ethereum)

If you prefer crypto, you can send any ERC-20 token to my wallet:

**Bitcoin**

```sh
bc1qggez8sgat2nsd2vuha8pnlcsa8e2p2ewclqry4
```

**Ethereum**

```sh
0x695b6bDCBe29bdf35ca39818b0C44B757dC3Bc0e
```

**Solana**

```sh
GkE3BGcMMbmYizQsGyYBJtRTjpKqJ8NLWcupch3fM5cT
```

---

### 🇧🇷 Brazil (Pix)

You can support via **Pix**. Scan the QR Code below or use the copy-and-paste key:

**b5ef8726-a567-40e2-b3ad-c49d2465c5ea**
