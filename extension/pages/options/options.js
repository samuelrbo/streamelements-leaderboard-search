const MAX_STREAMERS = 5;

const twitchNameInput = document.getElementById('twitch-name');
const twitchTokenInput = document.getElementById('twitch-token');
const newStreamerInput = document.getElementById('new-streamer');
const addBtn = document.querySelector('.btn-primary'); // O botão de adicionar
const saveBtn = document.getElementById('save');
const statusMsg = document.getElementById('status');
const tableBody = document.querySelector('table tbody');

function initI18n() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const message = chrome.i18n.getMessage(el.getAttribute('data-i18n'));
    if (message) {
      if (el.querySelector('svg')) {
        const textNode = document.createTextNode(' ' + message);
        el.appendChild(textNode);
      } else {
        el.innerHTML = message;
      }
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const message = chrome.i18n.getMessage(
      el.getAttribute('data-i18n-placeholder')
    );
    if (message) el.setAttribute('placeholder', message);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initI18n();

  chrome.storage.sync.get(
    ['twitchName', 'trackedStreamers', 'twitchToken'],
    (data) => {
      if (data.twitchName) {
        twitchNameInput.value = data.twitchName;
      }

      if (data.twitchToken) {
        twitchTokenInput.value = data.twitchToken;
      }

      if (data.trackedStreamers && data.trackedStreamers.length > 0) {
        tableBody.innerHTML = '';
        data.trackedStreamers.forEach((streamer) => {
          addStreamerToTable(streamer);
        });
      }
    }
  );
});

function addStreamerToTable(name) {
  const btnRemove = chrome.i18n.getMessage('btnRemove');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><div class="streamer-name">${name}</div></td>
    <td style="text-align: right;">
      <button class="btn-remove" title="${btnRemove}">
        <svg viewBox="0 0 24 24" width="18" height="18" style="fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </td>
  `;

  row.querySelector('.btn-remove').addEventListener('click', () => {
    row.remove();
    updateUIState();

    chrome.storage.sync.get('alreadyNotified', (data) => {
      let notified = data.alreadyNotified || {};
      delete notified[streamerName];
      chrome.storage.sync.set({ alreadyNotified: notified });
    });
  });

  tableBody.appendChild(row);
  updateUIState();
}

addBtn.addEventListener('click', () => {
  const name = newStreamerInput.value.trim().toLowerCase();

  const currentCount = document.querySelectorAll('.streamer-name').length;

  if (!name) return;

  if (currentCount >= MAX_STREAMERS) {
    showStatus(chrome.i18n.getMessage('errorLimitReached'), true);
    return;
  }

  addStreamerToTable(name);
  newStreamerInput.value = '';
  newStreamerInput.focus();
});

saveBtn.addEventListener('click', () => {
  const twitchName = twitchNameInput.value.trim();
  const twitchToken = twitchTokenInput.value.trim();
  const streamers = [];

  document.querySelectorAll('.streamer-name').forEach((div) => {
    streamers.push(div.textContent);
  });

  chrome.storage.sync.set(
    {
      twitchName: twitchName,
      twitchToken: twitchToken,
      trackedStreamers: streamers,
    },
    () => {
      showStatus(chrome.i18n.getMessage('saveMessage'));
    }
  );
});

function showStatus(text, isError = false) {
  statusMsg.textContent = text;
  statusMsg.style.display = 'block';

  statusMsg.style.background = isError ? '#ffebee' : '#e8daff';
  statusMsg.style.color = isError ? '#d32f2f' : '#7B00FF';

  setTimeout(() => {
    statusMsg.style.display = 'none';
  }, 3000);
}

function updateUIState() {
  const currentCount = document.querySelectorAll('.streamer-name').length;
  if (currentCount >= MAX_STREAMERS) {
    newStreamerInput.disabled = true;
    addBtn.style.opacity = '0.5';
    addBtn.style.cursor = 'not-allowed';
  } else {
    newStreamerInput.disabled = false;
    addBtn.style.opacity = '1';
    addBtn.style.cursor = 'pointer';
  }
}

newStreamerInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});
