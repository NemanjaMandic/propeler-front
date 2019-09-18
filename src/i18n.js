import i18n from 'i18next';
import { I18Map } from './utilities/errorHelpers';
import translations_en from './locales/en/translations_en';
import translations_sr from './locales/sr/translations_sr';

const language = localStorage.getItem('language') || 'en';

i18n
	.init({
		lng: language,
		nsSeparator: false,
		resources: {
			en: {
				translations: translations_en,
			},
			sr: {
				translations: translations_sr,
			},
		},
		react: {
			useSuspense: false,
		},
	})
	.then(() => {
		I18Map.errors = i18n.language === 'en' ? translations_en : translations_sr;
	});
i18n.on('languageChanged', lng => {
	I18Map.errors = i18n.language === 'en' ? translations_en : translations_sr;
});

export default i18n;
