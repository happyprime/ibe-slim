/**
 * WordPress dependencies
 */
import {
	BlockCanvas,
	BlockList,
	BlockTools,
	__unstableUseTypewriter as useTypewriter,
	RecursionProvider,
// @ts-ignore
} from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';
import { useMergeRefs } from '@wordpress/compose';
// @ts-ignore
import { parse, store as blocksStore } from '@wordpress/blocks';
// @ts-ignore
import { store as editorStore } from '@wordpress/editor';

// @ts-ignore
const isGutenbergPlugin = true;

/**
 * Internal dependencies
 */
import EditorHeading from '../editor-heading-slot';
import FooterSlot from '../footer-slot';

/**
 * This is a copy of packages/edit-post/src/components/visual-editor/index.js
 *
 * The original is not exported, and contains code for post titles
 *
 * @param {Object} args
 * @param args.styles
 */
export default function VisualEditor() {
	const ref = useRef();
	const contentRef = useMergeRefs( [ ref, useTypewriter() ] );

	return (
		<BlockTools
			__unstableContentRef={ ref }
			className={ 'edit-post-visual-editor' }
		>
			<BlockCanvas
				shouldIframe={ false }
				contentRef={ contentRef }
				height="100%"
			>
				<EditorHeading.Slot mode="visual" />

				<RecursionProvider
					blockName={ 'core/post-content' }
					uniqueId={ 'averyuniqueeditor' }
				>
					<BlockList />
				</RecursionProvider>

				<FooterSlot.Slot mode="visual" />
			</BlockCanvas>
		</BlockTools>
	);
}
