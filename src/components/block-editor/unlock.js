/**
 * WordPress dependencies
 */
import { __dangerousOptInToUnstableAPIsOnlyForCoreModules } from '@wordpress/private-apis';

export const { unlock } =
    __dangerousOptInToUnstableAPIsOnlyForCoreModules(
        'If you found this script, then you probably need to replace the private-apis.js script provided by WordPress with your own.',
        '@happyprime/ibe-slim'
    );
