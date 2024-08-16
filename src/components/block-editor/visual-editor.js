/**
 * WordPress dependencies
 */
import {
	BlockCanvas,
	BlockList,
	BlockTools,
	__unstableUseTypewriter as useTypewriter
} from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';
import { useMergeRefs } from '@wordpress/compose';

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
				<BlockList />
			</BlockCanvas>
		</BlockTools>
	);
}
