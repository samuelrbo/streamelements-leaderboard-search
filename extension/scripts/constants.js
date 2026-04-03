(function () {
  const SE_API = 'https://api.streamelements.com/kappa/v2';
  const SE_CONTAINER = 'div[data-slot="card-content"] table.w-full';
  const SE_SIDEBAR = 'aside';
  const SE_SIDEBAR_DETAILS = 'aside ul';
  const SE_RESULT_ID = 'streamelements-leaderboard-search-result';
  const SE_USERNAME = 'span.text-sm.text-white.font-medium';
  const SE_EARN_POINTS_TIME = 'div.mt-4.flex.flex-col p';

  // Chrome: expose globally
  if (typeof window !== 'undefined') {
    window.constants = {
      SE_API,
      SE_CONTAINER,
      SE_SIDEBAR,
      SE_SIDEBAR_DETAILS,
      SE_RESULT_ID,
      SE_USERNAME,
      SE_EARN_POINTS_TIME,
    };
  }

  // Jest: export as module
  if (typeof module !== 'undefined') {
    module.exports = {
      SE_API,
      SE_CONTAINER,
      SE_SIDEBAR,
      SE_SIDEBAR_DETAILS,
      SE_RESULT_ID,
      SE_USERNAME,
      SE_EARN_POINTS_TIME,
    };
  }
})();
