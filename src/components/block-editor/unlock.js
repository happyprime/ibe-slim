/**
 * WordPress dependencies
 */
import { __dangerousOptInToUnstableAPIsOnlyForCoreModules } from '@wordpress/private-apis';

const latest = 'I acknowledge private features are not for use in themes or plugins and doing so will break in the next version of WordPress.';
const old    = 'I know using unstable features means my theme or plugin will inevitably break in the next version of WordPress.';

export const { unlock } =
    __dangerousOptInToUnstableAPIsOnlyForCoreModules(
        latest,
        '@wordpress/edit-post'
    );
