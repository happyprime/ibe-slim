/**
 * Internal dependencies
 */
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';

/**
 * Store definition for the interface namespace.
 *
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/data/README.md#createReduxStore
 *
 * @type {object}
 */
export default {
	reducer,
	actions,
	selectors,
};
