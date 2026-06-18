/**
 * ESLint flat configuration.
 *
 * Uses the shared @happyprime/eslint-config (ESLint 9 / flat config). The
 * shared config provides ESLint, the plugins, and the ignore patterns via its
 * peer dependencies, so nothing else needs to be declared here.
 */
import happyprime from '@happyprime/eslint-config';

export default [
	...happyprime,
	{
		rules: {
			// This package pervasively uses higher-order components and
			// render-prop/Slot-Fill wrappers where an explicit displayName adds
			// noise without value.
			'react/display-name': 'off',
		},
	},
];
