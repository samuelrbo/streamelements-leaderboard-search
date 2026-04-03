const MAX_STREAMERS = 5;

const twitchNameInput = document.getElementById('twitch-name');
const newStreamerInput = document.getElementById('new-streamer');
const addBtn = document.querySelector('.btn-primary');
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

  addBtn.title = chrome.i18n.getMessage('btnAdd');
}

document.addEventListener('DOMContentLoaded', () => {
  initI18n();

  chrome.storage.sync.get(['twitchName', 'trackedStreamers'], (data) => {
    if (data.twitchName) {
      twitchNameInput.value = data.twitchName;
    }

    if (data.trackedStreamers && data.trackedStreamers.length > 0) {
      document.getElementById('totalStreamers').innerHTML =
        `(${data.trackedStreamers.length} / ${MAX_STREAMERS})`;

      tableBody.innerHTML = '';
      data.trackedStreamers.forEach((streamer) => {
        addStreamerToTable(streamer);
      });

      updatePoints();
    }
  });
});

function addStreamerToTable(name) {
  const btnRemove = chrome.i18n.getMessage('btnRemove');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
      <div class="streamer-name">${name}</div>
      <small id="streamer-${name}-points"></small>
    </td>
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
  });

  tableBody.appendChild(row);
  updateUIState();

  addPoints(name, twitchNameInput.value.trim().toLowerCase());
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
  const streamers = [];

  document.querySelectorAll('.streamer-name').forEach((div) => {
    streamers.push(div.textContent);
  });

  chrome.storage.sync.set(
    {
      twitchName: twitchName,
      trackedStreamers: streamers,
    },
    () => {
      showStatus(chrome.i18n.getMessage('saveMessage'));
    }
  );
});

function showStatus(text, isError = false) {
  statusMsg.textContent = text;
  statusMsg.style.visibility = 'visible';

  statusMsg.style.background = isError ? '#ffebee' : '#e8daff';
  statusMsg.style.color = isError ? '#d32f2f' : '#7B00FF';

  setTimeout(() => {
    statusMsg.style.visibility = 'hidden';
  }, 1500);
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

  document.getElementById('totalStreamers').innerHTML =
    `(${currentCount} / ${MAX_STREAMERS})`;

  saveBtn.click();
}

newStreamerInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});

function commafy(num) {
  let str = num.toString().split('.');
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  return str.join(',');
}

async function getPoints(channelName, twitchName) {
  try {
    const channelResponse = await fetch(
      `https://api.streamelements.com/kappa/v2/channels/${channelName}`
    );

    if (channelResponse.status !== 200) {
    }

    const channel = await channelResponse.json();

    const response = await fetch(
      `https://api.streamelements.com/kappa/v2/points/${channel._id}/${twitchName}`
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return false;
  }
}

async function updatePoints() {
  chrome.storage.sync.get(['trackedStreamers', 'twitchName'], async (data) => {
    const { trackedStreamers, twitchName } = data;

    if (!trackedStreamers || !twitchName) return;

    for (const streamerName of trackedStreamers) {
      const streamer = streamerName.toLowerCase();
      addPoints(streamer, twitchName.toLowerCase());
    }
  });

  setTimeout(
    () => {
      updatePoints();
    },
    1 * 60 * 1000
  );
}

async function addPoints(streamer, twitchName) {
  try {
    const data = await getPoints(streamer, twitchName);

    const s = document.getElementById(`streamer-${streamer}-points`);

    if (data.points && s) {
      s.innerHTML = `<b>${commafy(data.points)}</b>`;
    }
  } catch (e) {
    console.error(e);
  }
}
