(function () {
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
  function commafy(num) {
    let str = num.toString().split('.');
    if (str[0].length >= 4) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
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
   * @description
   * Get the time to receive points in milliseconds
   *
   * @param {string} text
   * @returns {number} Return the time on text in milleseconds
   */
  function extractTimeToMs(text) {
    const clean = text.replace(/<[^>]+>/g, '');

    const match = clean.match(/every\s+(\d+)\s+(\w+)/i);
    if (!match) return null;

    const value = Number(match[1]);
    const unit = match[2].toLowerCase();

    let ms = 0;

    switch (unit) {
      case 'second':
      case 'seconds':
        ms = value * 1000;
        break;

      case 'minute':
      case 'minutes':
        ms = value * 60 * 1000;
        break;

      case 'hour':
      case 'hours':
        ms = value * 60 * 60 * 1000;
        break;

      default:
        return null;
    }

    return ms;
  }

  // Chrome: expose globally
  if (typeof window !== 'undefined') {
    window.utils = { commafy, getStreamerChannelName, extractTimeToMs };
  }

  // Jest: export as module
  if (typeof module !== 'undefined') {
    module.exports = { commafy, getStreamerChannelName, extractTimeToMs };
  }
})();
