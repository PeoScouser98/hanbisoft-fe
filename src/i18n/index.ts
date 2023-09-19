import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

export const locales = {
	en: {
		value: 'en',
		text: 'English'
	},
	kr: {
		value: 'kr',
		text: 'Korean'
	}
};

const lng = (() => {
	try {
		const { value } = JSON.parse(localStorage.getItem('language'));
		return value;
	} catch (error) {
		return 'en';
	}
})();

i18n
	.use(HttpBackend)
	.use(initReactI18next)
	.init({
		backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
		defaultNS: 'common',
		preload: ['common'],
		ns: ['common', 'home'],
		lng,
		fallbackLng: 'en',
		fallbackNS: ['common'],
		saveMissing: true,
		appendNamespaceToMissingKey: true,
		debug: false,
		interpolation: {
			escapeValue: false
		},
		react: {
			useSuspense: true
		}
	});

export default i18n;
