import {
  getDefaultWordFields,
  getMushafId,
  ITEMS_PER_PAGE,
  makeUrl,
} from './api';

import {DEFAULT_RECITER} from '../redux/defaultSettings/defaultSettings';
import {
  getReadingPreferencesInitialState,
  getTranslationsInitialState,
} from '../redux/defaultSettings/util';

import {QuranFont} from '../../src/types/QuranReader';

export const DEFAULT_VERSES_PARAMS = {
  words: true,
  translationFields: 'resource_name,language_id', // needed to show the name of the translation
  perPage: ITEMS_PER_PAGE,
  fields: `${QuranFont.Uthmani},chapter_id,hizb_number,text_imlaei_simple`, // we need text_uthmani field when copying the verse. text_imlaei_simple is for SEO description meta tag. Also the chapter_id for when we want to share the verse or navigate to Tafsir, hizb_number is for when we show the context menu.
};

export const getVersesParams = (
  currentLocale,
  params,
  includeTranslationFields = true,
) => {
  const defaultParams = {
    ...DEFAULT_VERSES_PARAMS,
    translations:
      getTranslationsInitialState(currentLocale).selectedTranslations.join(
        ', ',
      ),
    reciter: DEFAULT_RECITER.id,
    wordTranslationLanguage:
      getReadingPreferencesInitialState(currentLocale).selectedWordByWordLocale,
  };

  if (!includeTranslationFields) {
    delete defaultParams.translationFields;
    delete defaultParams.translations;
  }

  return {
    ...defaultParams,
    ...params,
  };
};

export const makeVersesUrl = (id, currentLocale, params) =>
  makeUrl(`/verses/by_chapter/${id}`, getVersesParams(currentLocale, params));

export const makeByRangeVersesUrl = (currentLocale, params) =>
  makeUrl(`/verses/by_range`, getVersesParams(currentLocale, params));

export const makeTranslationsUrl = language =>
  makeUrl('/resources/translations', {language});

export const makeAvailableRecitersUrl = (locale, fields) =>
  makeUrl('/audio/reciters', {locale, fields});

export const makeAudioUrlByPage = (recitationsId, pageId) =>
  `https://api.quran.com/api/v4/recitations/${recitationsId}/by_page/${pageId}?per_page=all`;

export const makeAudioUrlByChapter = (recitationsId, chapterId) =>
  `https://api.quran.com/api/v4/quran/recitations/${recitationsId}?fields=duration,segments,format&chapter_number=${chapterId}`;

export const makeAudioUrlByJuz = (recitationsId, juzId) =>
  `https://api.quran.com/api/v4/quran/recitations/${recitationsId}?fields=duration,segments,format&juz_number=${juzId}`;

export const makeTafsirsUrl = language =>
  makeUrl('/resources/tafsirs', {language});

export const makeTafsirContentUrl = (tafsirId, verseKey, options) => {
  const params = {
    locale: options.lang,
    words: true,
    ...getDefaultWordFields(options.quranFont),
    ...getMushafId(options.quranFont, options.mushafLines),
  };
  return makeUrl(`/tafsirs/${tafsirId}/by_ayah/${verseKey}`, params);
};

export const makePagesLookupUrl = params => makeUrl('/pages/lookup', params);

export const makeChapterUrl = (chapterIdOrSlug, language) =>
  makeUrl(`/chapters/${chapterIdOrSlug}`, {language});

export const makeJuzVersesUrl = (id, currentLocale, params) =>
  makeUrl(`/verses/by_juz/${id}`, getVersesParams(currentLocale, params));

export const makePageVersesUrl = (
  id,
  currentLocale,
  params,
  includeTranslationFields = true,
) =>
  makeUrl(
    `/verses/by_page/${id}`,
    getVersesParams(currentLocale, params, includeTranslationFields),
  );

export const makeDonateUrl = (showDonationPopup = false) =>
  `https://donate.quran.foundation${
    showDonationPopup ? '?showDonationPopup' : ''
  }`;
