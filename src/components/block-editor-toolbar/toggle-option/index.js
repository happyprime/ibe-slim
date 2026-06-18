/**
 * WordPress dependencies
 */
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { MenuItem, withSpokenMessages } from '@wordpress/components';
import { check } from '@wordpress/icons';

/**
 *
 * @param root0
 * @param root0.onToggle
 * @param root0.isActive
 * @param root0.label
 * @param root0.info
 */
function OptionToggle({ onToggle, isActive, label, info }) {
	return (
		<MenuItem
			icon={isActive && check}
			isSelected={isActive}
			onClick={onToggle}
			role="menuitemcheckbox"
			info={info}
		>
			{label}
		</MenuItem>
	);
}

// @ts-ignore
export default compose([
	withSelect((select, { option }) => ({
		isActive: select('isolated/editor').isOptionActive(option),
	})),
	withDispatch((dispatch, ownProps) => ({
		onToggle() {
			dispatch('isolated/editor').toggleOption(ownProps.option);
			ownProps.onClose();
		},
	})),
	withSpokenMessages,
])(OptionToggle);
