/**
 * WordPress dependencies
 */
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { MenuItem, withSpokenMessages } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { check } from '@wordpress/icons';

/**
 *
 * @param root0
 * @param root0.onToggle
 * @param root0.isActive
 * @param root0.label
 * @param root0.info
 * @param root0.messageActivated
 * @param root0.messageDeactivated
 * @param root0.speak
 */
function FeatureToggle({
	onToggle,
	isActive,
	label,
	info,
	messageActivated,
	messageDeactivated,
	speak,
}) {
	const speakMessage = () => {
		if (isActive) {
			speak(messageDeactivated || __('Feature deactivated'));
		} else {
			speak(messageActivated || __('Feature activated'));
		}
	};

	return (
		<MenuItem
			icon={isActive && check}
			isSelected={isActive}
			onClick={() => {
				onToggle();
				speakMessage();
			}}
			role="menuitemcheckbox"
			info={info}
		>
			{label}
		</MenuItem>
	);
}

// @ts-ignore
export default compose([
	withSelect((select, { feature }) => ({
		isActive: select('isolated/editor').isFeatureActive(feature),
	})),
	withDispatch((dispatch, ownProps) => ({
		onToggle() {
			dispatch('isolated/editor').toggleFeature(ownProps.feature);
			ownProps.onClose();
		},
	})),
	withSpokenMessages,
])(FeatureToggle);
