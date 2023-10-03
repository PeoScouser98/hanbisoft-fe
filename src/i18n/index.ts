import i18n from 'i18next';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

export const locales = {
	en: {
		value: 'en',
		text: 'English'
	},
	kr: {
		value: 'kr',
		text: '한국인'
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
	.use(initReactI18next)
	.use(ChainedBackend)
	.init({
		backend: {
			backends: [HttpBackend],
			backendOptions: [
				{
					loadPath: '/locales/{{lng}}/{{ns}}.json'
				}
			]
		},
		defaultNS: ['common', 'home'],
		preload: ['en'],
		ns: ['common', 'home', 'equipment'],
		lng,
		fallbackLng: 'en',
		fallbackNS: ['common', 'home'],
		saveMissing: true,
		appendNamespaceToMissingKey: true,
		debug: false,
		interpolation: {
			escapeValue: false
		},
		react: {
			useSuspense: false
		}
	});

const t = i18n.t.bind(i18n);

export { t };
