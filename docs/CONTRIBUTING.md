# Contributing to StreamElements Leaderboard Search

Thank you for your interest in contributing! This project is licensed under **GPLv3**.

## 🧱 How to Contribute

- **Bug Reports:** Open an issue describing the steps to reproduce the error.
- **Features:** Suggest new ideas via issues before starting to code.
- **Code:** Submit Pull Requests from a `feature/` or `fix/` branch.

## 🔧 Local Development & Testing

Before submitting a Pull Request, you **must** ensure all tests pass.

### 1. Setup

```sh
npm install
```

### 2. Run Unit Tests

```sh
npm run test:unit
```

### 3. Run E2E Tests (Interface)

This requires Docker installed to ensure the environment matches the production CI.

```sh
docker-compose up --build --exit-code-from e2e
```

## 🚀 Release Process (Version Bump)

To maintain consistency between the `package.json`, the extension's `manifest.json`, and the `CHANGELOG.md`, follow these steps when preparing a new version:

### 1. Update the version in the files

Use the automation script to synchronize the version across all configuration files:

```sh
# Example for version 1.1.2
npm run bump 1.1.2
```

### 2. Update the Changelog

Make sure the changes in `## [Unreleased]` have been moved to the new section of the corresponding version with the current date in the `docs/CHANGELOG.md` file.

### 3. Create Tag and Push

Deployment (ZIP generation and GitHub Release) is automated via Tags.

```sh
git add .
git commit -m "chore: release v1.1.2"
git tag v1.1.2
git push origin main --tags
```

## 📜 Pull Request Guidelines

1. Keep code clean and follow ES6+ standards.
2. Use descriptive commit messages.
3. Update the `CHANGELOG.md` under the `[Unreleased]` section.
4. If you add a new feature, include a corresponding test case in `tests/`.

## 🤝 Thank You

Your contributions help streamers and viewers navigate their communities better!
