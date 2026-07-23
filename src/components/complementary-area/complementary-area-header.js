/**
 * External dependencies
 */
import classnames from 'classnames';
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as interfaceStore } from '@wordpress/interface';

/**
 * WordPress dependencies
 */
import { closeSmall } from '@wordpress/icons';

/**
 *
 * @param root0
 * @param root0.as
 * @param root0.scope
 * @param root0.identifier
 * @param root0.icon
 * @param root0.selectedIcon
 * @param root0.name
 */
function ComplementaryAreaToggle({
	as = Button,
	scope,
	identifier,
	icon,
	selectedIcon,
	name,
	...props
}) {
	const ComponentToUse = as;
	const isSelected = useSelect(
		(select) =>
			// @ts-ignore
			select(interfaceStore).getActiveComplementaryArea(scope) ===
			identifier,
		[identifier]
	);
	const { enableComplementaryArea, disableComplementaryArea } =
		useDispatch(interfaceStore);
	return (
		<ComponentToUse
			icon={selectedIcon && isSelected ? selectedIcon : icon}
			onClick={() => {
				if (isSelected) {
					disableComplementaryArea(scope);
				} else {
					enableComplementaryArea(scope, identifier);
				}
			}}
			{...props}
		/>
	);
}

const ComplementaryAreaHeader = ({
	smallScreenTitle,
	children,
	className,
	toggleButtonProps,
}) => {
	const toggleButton = (
		<ComplementaryAreaToggle icon={closeSmall} {...toggleButtonProps} />
	);
	return (
		<>
			<div className="components-panel__header interface-complementary-area-header__small">
				{smallScreenTitle && (
					<span className="interface-complementary-area-header__small-title">
						{smallScreenTitle}
					</span>
				)}
				{toggleButton}
			</div>
			<div
				className={classnames(
					'components-panel__header',
					'interface-complementary-area-header',
					className
				)}
				tabIndex={-1}
			>
				{children}
				{toggleButton}
			</div>
		</>
	);
};

export default ComplementaryAreaHeader;
