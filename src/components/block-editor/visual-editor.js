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
import { useEffect, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
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
	const {
		isWelcomeGuideVisible,
		wrapperBlockName,
		wrapperUniqueId,
		// @ts-ignore
		isBlockBasedTheme,
		// @ts-ignore
		hasV3BlocksOnly,
	} = useSelect( ( select ) => {
		const {
			isFeatureActive,
		} = select( 'isolated/editor' );
		const { getCurrentPostId, getCurrentPostType, getEditorSettings } =
			select( editorStore );
		const { getBlockTypes } = select( blocksStore );
		const _isTemplateMode = false;
		const postTypeSlug = getCurrentPostType();
		let _wrapperBlockName;

		if ( postTypeSlug === 'wp_block' ) {
			_wrapperBlockName = 'core/block';
		} else if ( ! _isTemplateMode ) {
			_wrapperBlockName = 'core/post-content';
		}

		const editorSettings = getEditorSettings();

		return {
			deviceType: 'Desktop',
			// @ts-ignore
			isWelcomeGuideVisible: isFeatureActive( 'welcomeGuide' ),
			isTemplateMode: _isTemplateMode,
			postContentAttributes: getEditorSettings().postContentAttributes,
			// Post template fetch returns a 404 on classic themes, which
			// messes with e2e tests, so check it's a block theme first.
			editedPostTemplate: undefined,
			wrapperBlockName: _wrapperBlockName,
			wrapperUniqueId: getCurrentPostId(),
			isBlockBasedTheme: editorSettings.__unstableIsBlockBasedTheme,
			hasV3BlocksOnly: getBlockTypes().every( ( type ) => {
				return type.apiVersion >= 3;
			} ),
		};
	}, [] );
	// @ts-ignore
	const { isCleanNewPost } = useSelect( editorStore );

	const ref = useRef();
	const contentRef = useMergeRefs( [ ref, useTypewriter() ] );

	const titleRef = useRef();
	useEffect( () => {
		if ( isWelcomeGuideVisible || ! isCleanNewPost() ) {
			return;
		}
		// @ts-ignore
		titleRef?.current?.focus();
	}, [ isWelcomeGuideVisible, isCleanNewPost ] );

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
					blockName={ wrapperBlockName }
					uniqueId={ wrapperUniqueId }
				>
					<BlockList />
				</RecursionProvider>

				<FooterSlot.Slot mode="visual" />
			</BlockCanvas>
		</BlockTools>
	);
}
