"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = VisualEditor;
var _blockEditor = require("@wordpress/block-editor");
var _element = require("@wordpress/element");
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
  var ref = (0, _element.useRef)();
  var contentRef = (0, _compose.useMergeRefs)([ref, (0, _blockEditor.__unstableUseTypewriter)()]);
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
        blockName: 'core/post-content',
        uniqueId: 'averyuniqueeditor',
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_blockEditor.BlockList, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_footerSlot["default"].Slot, {
        mode: "visual"
      })]
    })
  });
}
//# sourceMappingURL=visual-editor.js.map