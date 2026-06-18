/**
 * WordPress dependencies
 */

import { ComplementaryArea } from '@wordpress/interface';
import { Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 *
 * @param root0
 * @param root0.button
 * @param root0.onToggle
 */
function Inspector({ button, onToggle }) {
	/**
	 *
	 * @param ev
	 */
	function onOutside(ev) {
		if (
			ev.target.closest('.block-editor-block-inspector') === null &&
			!ev.target.classList.contains('iso-inspector')
		) {
			onToggle(false);
			ev.preventDefault();
			ev.stopPropagation();
		}
	}

	return (
		<Popover
			position="bottom left"
			className="iso-inspector"
			anchor={button?.current}
			onFocusOutside={onOutside}
		>
			<ComplementaryArea.Slot scope="isolated/editor" />
		</Popover>
	);
}

export default Inspector;
