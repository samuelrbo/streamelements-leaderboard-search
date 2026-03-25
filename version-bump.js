const fs = require('fs');
const path = require('path');

// Files path
const paths = {
  package: path.join(__dirname, 'package.json'),
  packageLock: path.join(__dirname, 'package-lock.json'),
  manifest: path.join(__dirname, 'extension', 'manifest.json')
};

// Get the argument version (ex: node version-bump.js 1.1.2)
const newVersion = process.argv[2];

if (!newVersion) {
  console.error('❌ Error: Provide a version. Example: node version-bump.js 1.1.2');
  process.exit(1);
}

// Validate simple version format (x.y.z)
if (!/^\d+\.\d+\.\d+$/.test(newVersion)) {
  console.error('❌ Error: Invalid version format. Use the x.y.z format.');
  process.exit(1);
}

function updateJSON(filePath, key, value) {
  if (fs.existsSync(filePath)) {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    content[key] = value;
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
    console.log(`✅ Updated: ${path.basename(filePath)} -> ${value}`);
  } else {
    console.warn(`⚠️ Warning: File not found: ${filePath}`);
  }
}

function updateChangelog(version) {
  const changelogPath = path.join(__dirname, 'docs', 'CHANGELOG.md');
  if (fs.existsSync(changelogPath)) {
    let content = fs.readFileSync(changelogPath, 'utf8');
    const date = new Date().toISOString().split('T')[0];

    content = content.replace(
      '## [Unreleased]',
      `## [Unreleased]\n\n---\n\n## [${version}] - ${date}`
    );

    fs.writeFileSync(changelogPath, content);
    console.log(`✅ CHANGELOG.md updated with the latest version ${version}`);
  }
}

console.log(`🚀 Starting update for v${newVersion}...`);

updateJSON(paths.package, 'version', newVersion);
updateJSON(paths.packageLock, 'version', newVersion);
updateJSON(paths.manifest, 'version', newVersion);

updateChangelog(newVersion)

console.log("\n✨ All files synchronized!");