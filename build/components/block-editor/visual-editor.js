"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = VisualEditor;
var _blockEditor = require("@wordpress/block-editor");
var _element = require("@wordpress/element");
var _compose = require("@wordpress/compose");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * WordPress dependencies
 */

/**
 * This is a copy of packages/edit-post/src/components/visual-editor/index.js
 *
 * The original is not exported, and contains code for post titles
 *
 * @param {Object} args
 * @param args.styles
 */function VisualEditor() {
  var ref = (0, _element.useRef)();
  var contentRef = (0, _compose.useMergeRefs)([ref, (0, _blockEditor.__unstableUseTypewriter)()]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_blockEditor.BlockTools, {
    __unstableContentRef: ref,
    className: 'edit-post-visual-editor',
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_blockEditor.BlockCanvas, {
      shouldIframe: false,
      contentRef: contentRef,
      height: "100%",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_blockEditor.BlockList, {})
    })
  });
}
//# sourceMappingURL=visual-editor.js.map