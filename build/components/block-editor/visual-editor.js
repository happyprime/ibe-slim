"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = VisualEditor;
var _blockEditor = require("@wordpress/block-editor");
var _element = require("@wordpress/element");
var _data = require("@wordpress/data");
var _compose = require("@wordpress/compose");
var _blocks = require("@wordpress/blocks");
var _editor = require("@wordpress/editor");
var _editorHeadingSlot = _interopRequireDefault(require("../editor-heading-slot"));
var _footerSlot = _interopRequireDefault(require("../footer-slot"));
var _jsxRuntime = require("react/jsx-runtime");
/**
 * WordPress dependencies
 */

// @ts-ignore

// @ts-ignore

// @ts-ignore
var isGutenbergPlugin = true;

/**
 * Internal dependencies
 */

/**
 * This is a copy of packages/edit-post/src/components/visual-editor/index.js
 *
 * The original is not exported, and contains code for post titles
 *
 * @param {Object} args
 * @param args.styles
 */
function VisualEditor() {
  var _useSelect = (0, _data.useSelect)(function (select) {
      var _select = select('isolated/editor'),
        isFeatureActive = _select.isFeatureActive;
      var _select2 = select(_editor.store),
        getCurrentPostId = _select2.getCurrentPostId,
        getCurrentPostType = _select2.getCurrentPostType,
        getEditorSettings = _select2.getEditorSettings;
      var _select3 = select(_blocks.store),
        getBlockTypes = _select3.getBlockTypes;
      var _isTemplateMode = false;
      var postTypeSlug = getCurrentPostType();
      var _wrapperBlockName;
      if (postTypeSlug === 'wp_block') {
        _wrapperBlockName = 'core/block';
      } else if (!_isTemplateMode) {
        _wrapperBlockName = 'core/post-content';
      }
      var editorSettings = getEditorSettings();
      return {
        deviceType: 'Desktop',
        // @ts-ignore
        isWelcomeGuideVisible: isFeatureActive('welcomeGuide'),
        isTemplateMode: _isTemplateMode,
        postContentAttributes: getEditorSettings().postContentAttributes,
        // Post template fetch returns a 404 on classic themes, which
        // messes with e2e tests, so check it's a block theme first.
        editedPostTemplate: undefined,
        wrapperBlockName: _wrapperBlockName,
        wrapperUniqueId: getCurrentPostId(),
        isBlockBasedTheme: editorSettings.__unstableIsBlockBasedTheme,
        hasV3BlocksOnly: getBlockTypes().every(function (type) {
          return type.apiVersion >= 3;
        })
      };
    }, []),
    isWelcomeGuideVisible = _useSelect.isWelcomeGuideVisible,
    wrapperBlockName = _useSelect.wrapperBlockName,
    wrapperUniqueId = _useSelect.wrapperUniqueId,
    isBlockBasedTheme = _useSelect.isBlockBasedTheme,
    hasV3BlocksOnly = _useSelect.hasV3BlocksOnly;
  // @ts-ignore
  var _useSelect2 = (0, _data.useSelect)(_editor.store),
    isCleanNewPost = _useSelect2.isCleanNewPost;
  var ref = (0, _element.useRef)();
  var contentRef = (0, _compose.useMergeRefs)([ref, (0, _blockEditor.__unstableUseTypewriter)()]);
  var titleRef = (0, _element.useRef)();
  (0, _element.useEffect)(function () {
    var _titleRef$current;
    if (isWelcomeGuideVisible || !isCleanNewPost()) {
      return;
    }
    // @ts-ignore
    titleRef === null || titleRef === void 0 || (_titleRef$current = titleRef.current) === null || _titleRef$current === void 0 || _titleRef$current.focus();
  }, [isWelcomeGuideVisible, isCleanNewPost]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_blockEditor.BlockTools, {
    __unstableContentRef: ref,
    className: 'edit-post-visual-editor',
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_blockEditor.BlockCanvas, {
      shouldIframe: false,
      contentRef: contentRef,
      height: "100%",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_editorHeadingSlot["default"].Slot, {
        mode: "visual"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_blockEditor.RecursionProvider, {
        blockName: wrapperBlockName,
        uniqueId: wrapperUniqueId,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_blockEditor.BlockList, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_footerSlot["default"].Slot, {
        mode: "visual"
      })]
    })
  });
}
//# sourceMappingURL=visual-editor.js.map