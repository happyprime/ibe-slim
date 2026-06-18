/**
 * Is the feature active?
 *
 * @param {object} state - Current state
 * @param {string} feature - Feature name
 * @param {boolean} [defaultValue] - Default value
 */
export function isFeatureActive(state, feature, defaultValue = false) {
	return state.preferences[feature] === undefined
		? defaultValue
		: state.preferences[feature];
}
