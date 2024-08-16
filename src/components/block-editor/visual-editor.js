/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	BlockCanvas,
	BlockList,
	BlockTools,
	__unstableUseTypewriter as useTypewriter,
	__experimentalUseResizeCanvas as useResizeCanvas,
	__experimentalRecursionProvider as RecursionProvider,
// @ts-ignore
} from '@wordpress/block-editor';
import { useEffect, useRef, useMemo } from '@wordpress/element';
import { __unstableMotion as motion } from '@wordpress/components';
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
export default function VisualEditor( { styles } ) {
	const {
		deviceType,
		isWelcomeGuideVisible,
		isTemplateMode,
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
	const hasMetaBoxes = false;

	const desktopCanvasStyles = {
		height: '100%',
		width: '100%',
		marginLeft: 'auto',
		marginRight: 'auto',
		display: 'flex',
		flexFlow: 'column',
		// Default background color so that grey
		// .edit-post-editor-regions__content color doesn't show through.
		background: 'white',
	};
	const templateModeStyles = {
		...desktopCanvasStyles,
		borderRadius: '2px 2px 0 0',
		border: '1px solid #ddd',
		borderBottom: 0,
	};
	const resizedCanvasStyles = useResizeCanvas( deviceType, isTemplateMode );
	const previewMode = 'is-' + deviceType.toLowerCase() + '-preview';

	let animatedStyles = isTemplateMode
		? templateModeStyles
		: desktopCanvasStyles;
	if ( resizedCanvasStyles ) {
		animatedStyles = resizedCanvasStyles;
	}

	let paddingBottom;

	// Add a constant padding for the typewritter effect. When typing at the
	// bottom, there needs to be room to scroll up.
	if ( ! hasMetaBoxes && ! resizedCanvasStyles && ! isTemplateMode ) {
		paddingBottom = '40vh';
	}

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

	styles = useMemo(
		() => [
			...styles,
			{
				// We should move this in to future to the body.
				css:
					`.edit-post-visual-editor__post-title-wrapper{margin-top:4rem}` +
					( paddingBottom
						? `body{padding-bottom:${ paddingBottom }}`
						: '' ),
			},
		],
		[ styles ]
	);

	// TODO: Styles not appearing in the iframe mode yet
	// const isToBeIframed =
	// 	( ( hasV3BlocksOnly || ( isGutenbergPlugin && isBlockBasedTheme ) ) &&
	// 		! hasMetaBoxes ) ||
	// 	isTemplateMode ||
	// 	deviceType === 'Tablet' ||
	// 	deviceType === 'Mobile';
	const isToBeIframed = false;

	return (
		<BlockTools
			__unstableContentRef={ ref }
			className={ classnames( 'edit-post-visual-editor', {
				'is-template-mode': isTemplateMode,
				'has-inline-canvas': ! isToBeIframed,
			} ) }
		>
			<motion.div
				className="edit-post-visual-editor__content-area"
				animate={ {
					padding: isTemplateMode ? '48px 48px 0' : 0,
				} }
			>
				<motion.div
					animate={ animatedStyles }
					initial={ desktopCanvasStyles }
					className={ previewMode }
				>
					<BlockCanvas
						shouldIframe={ isToBeIframed }
						contentRef={ contentRef }
						styles={ styles }
						height="100%"
					>
						<EditorHeading.Slot mode="visual" />

						<RecursionProvider
							blockName={ wrapperBlockName }
							uniqueId={ wrapperUniqueId }
						>
							<BlockList
								className={
									isTemplateMode
										? 'wp-site-blocks'
										: `wp-block-post-content` // Ensure root level blocks receive default/flow blockGap styling rules.
								}
							/>
						</RecursionProvider>

						<FooterSlot.Slot mode="visual" />
					</BlockCanvas>
				</motion.div>
			</motion.div>
		</BlockTools>
	);
}
