"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _lodash = require("lodash");
var _element = require("@wordpress/element");
var _compose = require("@wordpress/compose");
var _jsxRuntime = require("react/jsx-runtime");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } // @ts-nocheck
/**
 * External dependencies
 */ /**
 * WordPress dependencies
 */ /**
 * Input types which are classified as button types, for use in considering
 * whether element is a (focus-normalized) button.
 *
 * @type {string[]}
 */
var INPUT_BUTTON_TYPES = ['button', 'submit'];

/**
 * Returns true if the given element is a button element subject to focus
 * normalization, or false otherwise.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
 *
 * @param {Element} element Element to test.
 *
 * @return {boolean} Whether element is a button.
 */
function isFocusNormalizedButton(element) {
  switch (element.nodeName) {
    case 'A':
    case 'BUTTON':
      return true;
    case 'INPUT':
      return (0, _lodash.includes)(INPUT_BUTTON_TYPES, element.type);
  }
  return false;
}
var _default = exports["default"] = (0, _compose.createHigherOrderComponent)(function (WrappedComponent) {
  return /*#__PURE__*/function (_Component) {
    function _class() {
      var _this;
      (0, _classCallCheck2["default"])(this, _class);
      _this = _callSuper(this, _class, arguments);
      _this.bindNode = _this.bindNode.bind(_this);
      _this.cancelBlurCheck = _this.cancelBlurCheck.bind(_this);
      _this.queueBlurCheck = _this.queueBlurCheck.bind(_this);
      _this.normalizeButtonFocus = _this.normalizeButtonFocus.bind(_this);
      return _this;
    }
    (0, _inherits2["default"])(_class, _Component);
    return (0, _createClass2["default"])(_class, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        clearTimeout(this.blurCheckTimeout);
      }
    }, {
      key: "bindNode",
      value: function bindNode(node) {
        if (node) {
          this.node = node;
        } else {
          delete this.node;
          this.cancelBlurCheck();
        }
      }
    }, {
      key: "queueBlurCheck",
      value: function queueBlurCheck(event) {
        var _this2 = this;
        // React does not allow using an event reference asynchronously
        // due to recycling behavior, except when explicitly persisted.
        event.persist();

        // Skip blur check if clicking button. See `normalizeButtonFocus`.
        if (this.preventBlurCheck) {
          return;
        }
        this.blurCheckTimeout = setTimeout(function () {
          // If document is not focused then focus should remain
          // inside the wrapped component and therefore we cancel
          // this blur event thereby leaving focus in place.
          // https://developer.mozilla.org/en-US/docs/Web/API/Document/hasFocus.
          if (!document.hasFocus()) {
            event.preventDefault();
            return;
          }
          if ('function' === typeof _this2.node.handleFocusOutside) {
            _this2.node.handleFocusOutside(event);
          }
        }, 0);
      }
    }, {
      key: "cancelBlurCheck",
      value: function cancelBlurCheck() {
        clearTimeout(this.blurCheckTimeout);
        if (typeof this.node !== 'undefined' && 'function' === typeof this.node.handleFocus) {
          this.node.handleFocus(event);
        }
      }

      /**
       * Handles a mousedown or mouseup event to respectively assign and
       * unassign a flag for preventing blur check on button elements. Some
       * browsers, namely Firefox and Safari, do not emit a focus event on
       * button elements when clicked, while others do. The logic here
       * intends to normalize this as treating click on buttons as focus.
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
       *
       * @param {MouseEvent} event Event for mousedown or mouseup.
       */
    }, {
      key: "normalizeButtonFocus",
      value: function normalizeButtonFocus(event) {
        var type = event.type,
          target = event.target;
        var isInteractionEnd = (0, _lodash.includes)(['mouseup', 'touchend'], type);
        if (isInteractionEnd) {
          this.preventBlurCheck = false;
        } else if (isFocusNormalizedButton(target)) {
          this.preventBlurCheck = true;
        }
      }
    }, {
      key: "render",
      value: function render() {
        // Disable reason: See `normalizeButtonFocus` for browser-specific
        // focus event normalization.

        /* eslint-disable jsx-a11y/no-static-element-interactions */
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          onFocus: this.cancelBlurCheck,
          onMouseDown: this.normalizeButtonFocus,
          onMouseUp: this.normalizeButtonFocus,
          onTouchStart: this.normalizeButtonFocus,
          onTouchEnd: this.normalizeButtonFocus,
          onBlur: this.queueBlurCheck,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(WrappedComponent, _objectSpread({
            ref: this.bindNode
          }, this.props))
        });
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      }
    }]);
  }(_element.Component);
}, 'withFocusOutside');
//# sourceMappingURL=with-focus-outside.js.map