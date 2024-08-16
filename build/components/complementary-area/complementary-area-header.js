"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classnames = _interopRequireDefault(require("classnames"));
var _components = require("@wordpress/components");
var _data = require("@wordpress/data");
var _interface = require("@wordpress/interface");
var _icons = require("@wordpress/icons");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["as", "scope", "identifier", "icon", "selectedIcon", "name"];
/**
 * External dependencies
 */
/**
 * WordPress dependencies
 */
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function ComplementaryAreaToggle(_ref) {
  var _ref$as = _ref.as,
    as = _ref$as === void 0 ? _components.Button : _ref$as,
    scope = _ref.scope,
    identifier = _ref.identifier,
    icon = _ref.icon,
    selectedIcon = _ref.selectedIcon,
    name = _ref.name,
    props = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  var ComponentToUse = as;
  var isSelected = (0, _data.useSelect)(function (select) {
    return (
      // @ts-ignore
      select(_interface.store).getActiveComplementaryArea(scope) === identifier
    );
  }, [identifier]);
  var _useDispatch = (0, _data.useDispatch)(_interface.store),
    enableComplementaryArea = _useDispatch.enableComplementaryArea,
    disableComplementaryArea = _useDispatch.disableComplementaryArea;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ComponentToUse, _objectSpread({
    icon: selectedIcon && isSelected ? selectedIcon : icon,
    onClick: function onClick() {
      if (isSelected) {
        disableComplementaryArea(scope);
      } else {
        enableComplementaryArea(scope, identifier);
      }
    }
  }, props));
}
var ComplementaryAreaHeader = function ComplementaryAreaHeader(_ref2) {
  var smallScreenTitle = _ref2.smallScreenTitle,
    children = _ref2.children,
    className = _ref2.className,
    toggleButtonProps = _ref2.toggleButtonProps;
  var toggleButton = /*#__PURE__*/(0, _jsxRuntime.jsx)(ComplementaryAreaToggle, _objectSpread({
    icon: _icons.closeSmall
  }, toggleButtonProps));
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "components-panel__header interface-complementary-area-header__small",
      children: [smallScreenTitle && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "interface-complementary-area-header__small-title",
        children: smallScreenTitle
      }), toggleButton]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: (0, _classnames["default"])('components-panel__header', 'interface-complementary-area-header', className),
      tabIndex: -1,
      children: [children, toggleButton]
    })]
  });
};
var _default = exports["default"] = ComplementaryAreaHeader;
//# sourceMappingURL=complementary-area-header.js.map