import ReactDOM from 'react-dom/client';
import App from './_app.tsx';
import themes from 'devextreme/ui/themes';

themes.initialized(() => ReactDOM.createRoot(document.getElementById('root')!).render(<App />));
