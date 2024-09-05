"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IBE_WP_VERSION = void 0;
/**
 * WordPress version.
 *
 * This must be defined in the global scope by the project using IBE. If
 * it is not defined, a default is provided.
 *
 * @type {string}
 */
var IBE_WP_VERSION = exports.IBE_WP_VERSION = typeof window.IBE_WP_VERSION !== 'undefined' ? window.IBE_WP_VERSION : '6.5';
//# sourceMappingURL=wp-version.js.map