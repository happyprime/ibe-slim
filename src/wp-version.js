/**
 * WordPress version.
 *
 * This must be defined in the global scope by the project using IBE. If
 * it is not defined, a default is provided.
 *
 * @type {string}
 */
const IBE_WP_VERSION = typeof window.IBE_WP_VERSION !== 'undefined' ? window.IBE_WP_VERSION : '6.5';

export { IBE_WP_VERSION };
