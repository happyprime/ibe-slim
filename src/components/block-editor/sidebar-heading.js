/**
 * WordPress dependencies
 */
import { privateApis as componentsPrivateApis } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { superUnlock } from '@happyprime/wp-super-unlock';

export const sidebars = {
	document: 'edit-post/document',
	block: 'edit-post/block',
};

const { Tabs } = superUnlock( componentsPrivateApis, '6.5' );

const SettingsHeader = ( { documentInspector } ) => {
	const { documentLabel } = useSelect( ( select ) => {
		const hasCustomLabel = documentInspector && typeof documentInspector === 'string';
		return {
			// translators: Default label for the Document sidebar tab, not selected.
			documentLabel: hasCustomLabel ? documentInspector : _x( 'Document', 'noun' ),
		};
	}, [] );

	/* Use a list so screen readers will announce how many tabs there are. */
	return (
		<Tabs.TabList>
			{ !!documentInspector && <Tabs.Tab tabId={ sidebars.document }>{ documentLabel }</Tabs.Tab>}
			<Tabs.Tab tabId={ sidebars.block }>
				{ /* translators: Text label for the Block Settings Sidebar tab. */ }
				{ __( 'Block' ) }
			</Tabs.Tab>
		</Tabs.TabList>
	);
};

export default SettingsHeader;
