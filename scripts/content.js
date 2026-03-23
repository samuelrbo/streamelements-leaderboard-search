const SE_API = 'https://api.streamelements.com/kappa/v2';
const SE_CONTAINER = 'div[data-slot="card-content"] table.w-full';
const SE_SIDEBAR = 'aside';
const SE_SIDEBAR_DETAILS = 'aside ul';
const SE_RESULT_ID = 'streamelements-leaderboard-search-result';
const SE_USERNAME = 'span.text-sm.text-white.font-medium';
const SE_EARN_POINTS_TIME = 'div.mt-4.flex.flex-col p';

let debounceTimer;
let abortController;

/**
 * @description
 * Function helper to create HTML elements
 *
 * @param {string} type HTML element
 * @param {object} attributes Html element attributes
 * @param {string[]} clazz Class string list
 */
function element(type, attributes = null, clazz = []) {
  var el = document.createElement(type);

  if (attributes) {
    for (attr in attributes) {
      if (attr === 'style') {
        for (style in attributes[attr]) {
          el[attr][style] = attributes[attr][style]
        }
      } else {
        el[attr] = attributes[attr];
      }
    }
  }

  if (clazz && Array.isArray(clazz) && clazz.length > 0) {
    clazz.forEach(c => el.classList.add(c));
  }

  return el;
}

/**
 * @description
 * Function to format a number with comman between 3-in-3 numbers
 *
 * @example
 * // returns "1,000"
 * commafy(1000)
 *
 * @example
 * // returns "100,000"
 * commafy(100000)
 *
 * @example
 * // returns "10,000,000"
 * commafy(10000000)
 *
 * @param {number} num
 *
 * @returns {string} Return a commafy number
 */
function commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join(',');
}

/**
 * @description
 * Get the streamer channel name from the StreamElements URL
 *
 * @param {string} url StreamElements URL
 *
 * @returns {string} Streamer channel name
 */
function getStreamerChannelName(url) {
  const regex = /https?:\/\/(?:www\.)?streamelements\.com\/([^\/]+)/i;
  const match = url.match(regex);

  return match ? match[1] : null;
}

/**
 * @typedef ChannelInfoProfile
 * @type {object}
 * @property {string} title
 * @property {string} headerImage
 */

/**
 * @typedef ChannelInfo
 * @type {object}
 * @property {ChannelInfoProfile} profile
 * @property {string} _id
 * @property {string} provider
 * @property {string} broadcasterType
 * @property {boolean} suspended
 * @property {string} providerId
 * @property {string} avatar
 * @property {string} username
 * @property {string} alias
 * @property {string} displayName
 * @property {boolean} inactive
 * @property {boolean} isPartner
 */

/**
 * @description
 * Function to get StreamElements channel info data
 *
 * @param {string} channelName Twictch channel name / StreamElements alias
 *
 * @returns {Promise<ChannelInfo|false>}
 */
async function getChannelInfo(channelName) {
  try {
    const response = await fetch(`${SE_API}/channels/${channelName}`).catch(e => {});
    const data = await response.json();

    return data;
  } catch(err) {
    return false;
  }
}

/**
 * @typedef UserPoints
 * @type {object}
 * @property {string} channel
 * @property {string} username
 * @property {number} points
 * @property {number} pointsAlltime
 * @property {number} watchtime
 * @property {number} rank
 */

/**
 * @description
 * Function to get user points for the current channel
 *
 * @param {string} channelId StreamElements channel ID
 * @param {string} username Twitch user
 * @returns {Promise<{UserPoints|false}>}
 */
async function getUserPoints(channelId, username) {
   try {
    abortController = new AbortController();
    const { signal } = abortController;


    const response = await fetch(`${SE_API}/points/${channelId}/${username}`, { signal }).catch(e => {});
    const data = await response.json();

    return data;
  } catch(err) {
    return false;
  }
}

/**
 * @description
 * Twitch user serach to get leadboard details
 *
 * @param {string} username Twitch username
 */
async function search(username) {
  const rowResult = document.getElementById(SE_RESULT_ID);
  rowResult.innerHTML = '';

  if (!username || username.length < 3) {
    return;
  }

  try {
    const cellWaiting = element('td', {
      colSpan: 3
    }, [
      'px-5',
      'py-3.5',
      'text-sm',
      'text-muted-foreground',
      'text-center'
    ]);
    cellWaiting.innerHTML = chrome.i18n.getMessage('loadingResult');
    rowResult.append(cellWaiting);

    const channelInfo = await getChannelInfo(getStreamerChannelName(location.href));

    if (!channelInfo) {
      return;
    }

    const data = await getUserPoints(channelInfo._id, username);

    if (!data) {
      return;
    }

    if (!data.username) {
      rowResult.innerHTML = '';
      const cellNoResult = element('td', {
        colSpan: 3
      }, [
        'px-5',
        'py-3.5',
        'text-sm',
        'text-muted-foreground',
        'text-center'
      ]);
      cellNoResult.innerHTML = chrome.i18n.getMessage('emptyResult');
      rowResult.append(cellNoResult);
      return;
    }

    rowResult.innerHTML = '';

    const cellPosition = element('td', null, [
      'px-5',
      'py-3.5',
      'text-sm',
      'w-20',
    ]);
    const spanPosition = element('span', null, [
      'text-muted-foreground'
    ]);
    spanPosition.innerHTML = `#${data.rank}`
    cellPosition.append(spanPosition);
    rowResult.append(cellPosition);

    const cellUsername = element('td', null, [
      'px-5',
      'py-3.5',
      'text-sm',
      'text-foreground',
    ]);
    const spanUsername = element('span', null, [
      'inline-flex',
      'items-center',
      'gap-2'
    ]);
    spanUsername.innerHTML = data.username;
    cellUsername.append(spanUsername);
    rowResult.append(cellUsername);

    const cellPoints = element('td', null, [
      'px-5',
      'py-3.5',
      'text-sm',
      'text-right',
      'tabular-nums',
      'text-foreground',
    ]);
    cellPoints.innerHTML = commafy( data.points );
    rowResult.append(cellPoints);
  } catch (error) {
    rowResult.innerHTML = '';

    // if (error.name === 'AbortError') {
    //   console.log(chrome.i18n.getMessage('abortSearch'), query);
    // } else {
    //   console.error(chrome.i18n.getMessage('searchError'), error);
    // }
  }
}

function init() {
  const exists = document.getElementById('search-container');
  if (exists) {
    return;
  }

  const container = element('div', {
    id: 'search-container',
    style: {
      marginBotton: '24px',
    },
  });

  const searchInput = element('input', {
    placeholder: chrome.i18n.getMessage('searchPlaceholder'),
    style: {
      width: '100%',
      backgroundColor: '#7B00FF',
      margin: '24px 0',
      padding: '10px',
      color: '#FFFFFF',
    },
  });
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value;

    clearTimeout(debounceTimer);

    if (abortController) {
      abortController.abort();
    }

    debounceTimer = setTimeout(() => {
      search(query);
    }, 300);
  });
  container.append(searchInput);

  const resultContainer = element('div');

  const tableResult = element('table', null, ['w-full']);
  resultContainer.append(tableResult);

  const tableResultBody = element('tbody');
  tableResult.append(tableResultBody);

  const rowResult = element('tr', {
    id: SE_RESULT_ID,
    style: {
      backgroundColor: '#392a46',
    },
  }, [
    'border-b',
    'border-border',
    'last:border-0',
    'transition-colors',
    'bg-muted',
  ]);
  tableResultBody.append(rowResult);

  container.append(resultContainer);

  const dataContainer = document.querySelector(SE_CONTAINER).parentNode.parentNode.parentNode.parentNode;
  dataContainer.insertBefore(container, dataContainer.childNodes[1]);
}

/**
 * @description
 * Function to wait until the page is prepared to initialize the plugin
 *
 * @param {string} selector
 * @param {Function} callback
 */
function waitFor(selector, callback) {
  const element = document.querySelector(selector);
  if (element) {
    console.log('element exists')
    callback(element);
    return;
  }

  const observer = new MutationObserver(() => {
    const element = document.querySelector(selector);
     console.log('observer element')
    if (element) {
      console.log('observed element found')
      observer.disconnect();
      callback(element);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * @description
 * Function to checl if URL changed (for SPA)
 *
 * @param {Function} callback
 */
function onUrlChange(callback) {
  let oldHref = location.href;
  console.log('oldHref', oldHref);

  const observer = new MutationObserver(() => {
    console.log('location.href', location.href);
    if (location.href !== oldHref) {
      oldHref = location.href;
      callback(location.href);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * @description
 * Get the time to receive points in milliseconds
 *
 * @param {string} text
 * @returns {number} Return the time on text in milleseconds
 */
function extractTimeToMs() {
  const text = document.querySelector(SE_EARN_POINTS_TIME).innerHTML;

  const clean = text.replace(/<[^>]+>/g, "");

  const match = clean.match(/every\s+(\d+)\s+(\w+)/i);
  if (!match) return null;

  const value = Number(match[1]);
  const unit = match[2].toLowerCase();

  let ms = 0;

  switch (unit) {
    case "second":
    case "seconds":
      ms = value * 1000;
      break;

    case "minute":
    case "minutes":
      ms = value * 60 * 1000;
      break;

    case "hour":
    case "hours":
      ms = value * 60 * 60 * 1000;
      break;

    default:
      return null;
  }

  return ms;
}

/**
 * @description
 * Load the current user points and set in the seidebar
 */
async function loadPoints() {
  const channelInfo = await getChannelInfo(getStreamerChannelName(location.href));

  if (!channelInfo) {
    return;
  }

  const username = document.querySelector(SE_USERNAME).innerHTML;

  const data = await getUserPoints(
    channelInfo._id,
    username
  );

  let userPoints = document.getElementById('personal-points');

  if (!userPoints) {
    const userPointsContainer = element('div', null, [
      'mt-4',
      'flex',
      'flex-col',
      'gap-1.5',
      'text-sm',
      'text-foreground/70',
    ]);

    userPoints = element('p', {
      id: 'personal-points',
      style: {
        padding: '5px 10px',
        color: '#FFFFFF',
        backgroundColor: '#7B00FF',
      }
    });

    userPointsContainer.append(userPoints);

    document.querySelector(SE_SIDEBAR)
      .insertBefore(
        userPointsContainer,
        document.querySelector(SE_SIDEBAR_DETAILS)
      );
  }

  userPoints.innerHTML = `<b>#${data.rank}</b> - ${username} - <b>${commafy( data.points )}</b>`;

  setTimeout(async () => { void loadPoints(); }, extractTimeToMs() / 2);
}

waitFor(SE_SIDEBAR, () => { loadPoints(); });

waitFor(SE_CONTAINER, () => {
  void init();
});

onUrlChange(async () => {
  waitFor(SE_CONTAINER, (el) => {
    void init();
  });
});
