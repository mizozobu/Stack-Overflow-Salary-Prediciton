import i18n from 'i18next';
import axios from 'axios';
import en from '../../../locale/en/translation';
import ja from '../../../locale/ja/translation';

export const i18next = i18n
  .init({
    resources: {
      en: {
        translation: en
      },
      ja: {
        translation: ja
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: false,
    }
  });

export const changeClientLang = async(lang) => {
  i18next.changeLanguage(lang);
};

export const changeServerLang = async(lang) => {
  try {
    await axios.post('/_api/lang', {lang});
  }
  catch (err) {
    /* eslint-disable no-console */
    console.error(err);
    /* eslint-enable no-console */
  }
};

export const changeLang = lang => {
  changeClientLang(lang);
  changeServerLang(lang);
};
