"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _compose = require("@wordpress/compose");
var _data = require("@wordpress/data");
var _blockEditor = require("@wordpress/block-editor");
var _i18n = require("@wordpress/i18n");
var _editor = require("@wordpress/editor");
var _footerSlot = _interopRequireDefault(require("../footer-slot"));
var _jsxRuntime = require("react/jsx-runtime");
/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

var Footer = function Footer(_ref) {
  var editorMode = _ref.editorMode;
  var isMobileViewport = (0, _compose.useViewportMatch)('medium', '<');
  var _useSelect = (0, _data.useSelect)(function (select) {
      // @ts-ignore
      var _select = select(_editor.store),
        getPostTypeLabel = _select.getPostTypeLabel;
      var postTypeLabel = getPostTypeLabel();
      return {
        // TODO: This is currently disabled until it can be better worked in
        showBlockBreadcrumbs: false,
        //isFeatureActive( 'showBlockBreadcrumbs' ),
        // translators: Default label for the Document in the Block Breadcrumb.
        documentLabel: postTypeLabel || (0, _i18n._x)('Document', 'noun')
      };
    }, []),
    showBlockBreadcrumbs = _useSelect.showBlockBreadcrumbs,
    documentLabel = _useSelect.documentLabel;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "edit-post-layout__footer",
    children: [showBlockBreadcrumbs && !isMobileViewport && editorMode === 'visual' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_blockEditor.BlockBreadcrumb, {
      rootLabelText: documentLabel
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_footerSlot["default"].Slot, {})]
  });
};
var _default = exports["default"] = Footer;
//# sourceMappingURL=footer.js.map