const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en', 'es', 'ja', 'in', 'fr', 'pt', 'th', 'de', 'ko', 'tr'
    ],
  },
  localePath: typeof window === 'undefined'
    ? path.resolve('./public/locales')
    : '/locales',
}; 