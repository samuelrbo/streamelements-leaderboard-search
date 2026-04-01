const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const sourceDir = path.join(__dirname, '..', 'extension');
const outPath = path.join(__dirname, '..', 'extension.zip');

const output = fs.createWriteStream(outPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(
    `✅ Success! The file was generated with ${archive.pointer()} bytes.`
  );
  console.log(
    'The contents of the "extension" folder are now in the root of the ZIP file.'
  );
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

archive.directory(sourceDir, false);

archive.finalize();
