"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PostTextEditor = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _reactAutosizeTextarea = _interopRequireDefault(require("react-autosize-textarea"));
var _i18n = require("@wordpress/i18n");
var _element = require("@wordpress/element");
var _data = require("@wordpress/data");
var _compose = require("@wordpress/compose");
var _blocks = require("@wordpress/blocks");
var _jsxRuntime = require("react/jsx-runtime");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /**
 * External dependencies
 */ /**
 * WordPress dependencies
 */
var PostTextEditor = exports.PostTextEditor = /*#__PURE__*/function (_Component) {
  function PostTextEditor(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, PostTextEditor);
    _this = _callSuper(this, PostTextEditor, [props]);
    _this.edit = _this.edit.bind(_this);
    _this.stopEditing = _this.stopEditing.bind(_this);
    _this.state = {};
    return _this;
  }
  (0, _inherits2["default"])(PostTextEditor, _Component);
  return (0, _createClass2["default"])(PostTextEditor, [{
    key: "edit",
    value:
    /**
     * Handles a textarea change event to notify the onChange prop callback and
     * reflect the new value in the component's own state. This marks the start
     * of the user's edits, if not already changed, preventing future props
     * changes to value from replacing the rendered value. This is expected to
     * be followed by a reset to dirty state via `stopEditing`.
     *
     * @see stopEditing
     *
     * @param {Event} event Change event.
     */
    function edit(event) {
      // @ts-ignore */}
      var value = event.target.value;
      this.props.onChange(value);
      this.setState({
        value: value,
        isDirty: true
      });
    }

    /**
     * Function called when the user has completed their edits, responsible for
     * ensuring that changes, if made, are surfaced to the onPersist prop
     * callback and resetting dirty state.
     */
  }, {
    key: "stopEditing",
    value: function stopEditing() {
      if (this.state.isDirty) {
        this.props.onPersist(this.state.value);
        this.setState({
          isDirty: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var value = this.state.value;
      var instanceId = this.props.instanceId;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          htmlFor: "post-content-".concat(instanceId),
          className: "screen-reader-text",
          children: (0, _i18n.__)('Type text or HTML')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactAutosizeTextarea["default"], {
          autoComplete: "off",
          dir: "auto",
          value: value
          // @ts-ignore */}
          ,
          onChange: this.edit,
          onBlur: this.stopEditing,
          className: "editor-post-text-editor",
          id: "post-content-".concat(instanceId),
          placeholder: (0, _i18n.__)('Start writing with text or HTML')
        })]
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (state.isDirty) {
        return null;
      }
      return {
        value: props.value,
        isDirty: false
      };
    }
  }]);
}(_element.Component); // @ts-ignore
var _default = exports["default"] = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('isolated/editor'),
    getBlocks = _select.getBlocks;
  return {
    value: (0, _blocks.serialize)(getBlocks())
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('isolated/editor'),
    updateBlocksWithoutUndo = _dispatch.updateBlocksWithoutUndo;
  return {
    onChange: function onChange(content) {
      var blocks = (0, _blocks.parse)(content);
      updateBlocksWithoutUndo(blocks);
    },
    onPersist: function onPersist(content) {
      var blocks = (0, _blocks.parse)(content);
      updateBlocksWithoutUndo(blocks);
    }
  };
}), _compose.withInstanceId])(PostTextEditor);
//# sourceMappingURL=post-text-editor.js.map