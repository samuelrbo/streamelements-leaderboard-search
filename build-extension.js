const zipFolder = require('zip-folder');
const path = require('path');

const source = path.join(__dirname, 'extension');
const target = path.join(__dirname, 'extension.zip');

zipFolder(source, target, function(err) {
  if (err) {
    console.log('Error compressing extension.', err);
  } else {
    console.log('Extension successfully compressed into extension.zip');
  }
});
