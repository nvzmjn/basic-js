const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const stats = {};
  for (const domain of domains) {
    const parts = domain.split('.');
    let subdomain = '';
    for (let i = parts.length - 1; i >= 0; i--) {
      subdomain = parts[i] + (subdomain ? `.${subdomain}` : '');
      stats[subdomain] = (stats[subdomain] || 0) + 1;
    }
  }
  const result = {};
  for (const subdomain in stats) {
    const key = '.' + subdomain.split('.').reverse().join('.');
    result[key] = stats[subdomain];
  }
  return result;
}

module.exports = {
  getDNSStats
};
