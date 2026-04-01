const CHECK_INTERVAL_MINUTES = 5;

chrome.alarms.create('checkStreamers', {
  periodInMinutes: CHECK_INTERVAL_MINUTES,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkStreamers') {
    checkLiveStreamers();
  }
});

async function checkLiveStreamers() {
  chrome.storage.sync.get(
    ['trackedStreamers', 'twitchToken', 'alreadyNotified'],
    async (data) => {
      const { trackedStreamers, twitchToken, alreadyNotified = {} } = data;

      if (!trackedStreamers || !twitchToken) return;

      showNotification(
        'Teste',
        'Verificando se o motor de notificações funciona'
      );

      for (const username of trackedStreamers) {
        try {
          const response = await fetch(
            `https://api.twitch.tv/helix/streams?user_login=${username}`,
            {
              headers: {
                'Client-ID': 'gp762nuuoqcoxypju8c569th9wz7q5',
                Authorization: `Bearer ${twitchToken.replace('oauth:', '')}`,
              },
            }
          );

          if (response.status === 401) {
            console.error('Token expirado ou inválido.');
            return;
          }

          const json = await response.json();
          const isLive = json.data && json.data.length > 0;

          if (isLive) {
            const streamData = json.data[0];
            const streamId = streamData.id;

            if (alreadyNotified[username] !== streamId) {
              showNotification(username, streamData.title);

              alreadyNotified[username] = streamId;
              chrome.storage.sync.set({ alreadyNotified });
            }
          } else {
            if (alreadyNotified[username]) {
              delete alreadyNotified[username];
              chrome.storage.sync.set({ alreadyNotified });
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  );
}

function showNotification(username, title) {
  const notificationTitle = chrome.i18n.getMessage('notificationTitle');
  const notificationMessage = chrome.i18n.getMessage('notificationMessage');

  chrome.notifications.create(`live-${username}`, {
    type: 'basic',
    iconUrl: '../../icons/icon128.png',
    title: `${username} ${notificationTitle}`,
    message: title || notificationMessage,
    priority: 2,
  });
}

chrome.notifications.onClicked.addListener((notificationId) => {
  if (notificationId.startsWith('live-')) {
    const username = notificationId.replace('live-', '');
    chrome.tabs.create({ url: `https://twitch.tv/${username}` });
  }
});
