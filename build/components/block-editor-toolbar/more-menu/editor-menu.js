"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _components = require("@wordpress/components");
var _i18n = require("@wordpress/i18n");
var _data = require("@wordpress/data");
var _compose = require("@wordpress/compose");
var _icons = require("@wordpress/icons");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * WordPress dependencies
 */

/** @typedef {import('./index').OnClose} OnClose */
/** @typedef {import('../../../index').BlockEditorSettings} BlockEditorSettings */

/**
 * Close dropdown callback
 *
 * @callback OnSetMode
 * @param {string} mode
 */

/**
 * The 'more menu' editor section
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isCodeEditingEnabled
 * @param {string} props.editorMode
 * @param {OnClose} props.onClose - Callback to close the menu
 * @param {OnSetMode} props.onSetMode
 * @param {BlockEditorSettings} props.settings - Settings
 */function EditorMenu(_ref) {
  var _settings$iso, _settings$iso2;
  var onClose = _ref.onClose,
    editorMode = _ref.editorMode,
    onSetMode = _ref.onSetMode,
    isCodeEditingEnabled = _ref.isCodeEditingEnabled,
    settings = _ref.settings;
  /**
   * @param {string} mode
   */
  var setMode = function setMode(mode) {
    onSetMode(mode);
    onClose();
  };
  if (!isCodeEditingEnabled) {
    return null;
  }
  if ((settings === null || settings === void 0 || (_settings$iso = settings.iso) === null || _settings$iso === void 0 ? void 0 : _settings$iso.moreMenu) === false || !(settings !== null && settings !== void 0 && (_settings$iso2 = settings.iso) !== null && _settings$iso2 !== void 0 && (_settings$iso2 = _settings$iso2.moreMenu) !== null && _settings$iso2 !== void 0 && _settings$iso2.editor)) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.MenuGroup, {
    label: (0, _i18n._x)('Editor', 'noun'),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_components.MenuItem, {
      icon: editorMode === 'visual' ? _icons.check : null,
      isSelected: editorMode === 'visual',
      onClick: function onClick() {
        return setMode('visual');
      },
      role: "menuitemcheckbox",
      children: (0, _i18n.__)('Visual editor')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.MenuItem, {
      icon: editorMode === 'text' ? _icons.check : null,
      isSelected: editorMode === 'text',
      onClick: function onClick() {
        return setMode('text');
      },
      role: "menuitemcheckbox",
      children: (0, _i18n.__)('Code editor')
    })]
  });
}

// @ts-ignore
var _default = exports["default"] = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('isolated/editor'),
    getEditorMode = _select.getEditorMode;
  var _select$getEditorSett = select('core/editor').getEditorSettings(),
    codeEditingEnabled = _select$getEditorSett.codeEditingEnabled;
  return {
    editorMode: getEditorMode(),
    isCodeEditingEnabled: codeEditingEnabled
  };
}), (0, _data.withDispatch)(function (dispatch) {
  return {
    onSetMode: function onSetMode(mode) {
      dispatch('isolated/editor').setEditorMode(mode);
    }
  };
})])(EditorMenu);
//# sourceMappingURL=editor-menu.js.map