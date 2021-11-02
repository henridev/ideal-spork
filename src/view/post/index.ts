import i18n from '../../config/i18n/i18n';
import i18nAuth from './i18n/eng.json';

i18n.addResourceBundle('eng', 'post', i18nAuth);

// eslint-disable-next-line import/prefer-default-export
export { default as PostRoutes } from './PostRoutes/PostRoutes';
