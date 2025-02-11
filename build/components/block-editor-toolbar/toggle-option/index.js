"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _data = require("@wordpress/data");
var _compose = require("@wordpress/compose");
var _components = require("@wordpress/components");
var _icons = require("@wordpress/icons");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * WordPress dependencies
 */

function OptionToggle(_ref) {
  var onToggle = _ref.onToggle,
    isActive = _ref.isActive,
    label = _ref.label,
    info = _ref.info;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.MenuItem, {
    icon: isActive && _icons.check,
    isSelected: isActive,
    onClick: onToggle,
    role: "menuitemcheckbox",
    info: info,
    children: label
  });
}

// @ts-ignore
var _default = exports["default"] = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref2) {
  var option = _ref2.option;
  return {
    isActive: select('isolated/editor').isOptionActive(option)
  };
}), (0, _data.withDispatch)(function (dispatch, ownProps) {
  return {
    onToggle: function onToggle() {
      dispatch('isolated/editor').toggleOption(ownProps.option);
      ownProps.onClose();
    }
  };
}), _components.withSpokenMessages])(OptionToggle);
//# sourceMappingURL=index.js.map