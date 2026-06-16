/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file routes.js
 * @description Route manifest — combines Hydrogen routes with file-based flat routes.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import { flatRoutes } from '@react-router/fs-routes';
import { hydrogenRoutes } from '@shopify/hydrogen';

export default hydrogenRoutes([
  ...(await flatRoutes()),
  // Manual route definitions can be added to this array, in addition to or instead of using the `flatRoutes` file-based routing convention.
  // See https://reactrouter.com/api/framework-conventions/routes.ts#routests
]);

/** @typedef {import('@react-router/dev/routes').RouteConfig} RouteConfig */
