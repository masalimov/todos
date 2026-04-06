import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [index('catchall.tsx'), route('/add', './todoadd.tsx')] satisfies RouteConfig;
