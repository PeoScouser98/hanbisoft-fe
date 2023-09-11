import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import krTranslation from './kr.translation.json';

export default i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: {}
		},
		kr: krTranslation
	},
	lng: 'en',
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false
	}
});
