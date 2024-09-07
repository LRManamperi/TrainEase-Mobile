"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNativePaper = require("react-native-paper");
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
function DropdownHeader(props) {
  const {
    label,
    resetMenu,
    toggleMenu,
    value
  } = props;
  const isValueSelected = Array.isArray(value) ? value.length > 0 : !!value;
  const style = (0, _react.useMemo)(() => ({
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  }), []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativePaper.Appbar.Header, {
    statusBarHeight: 0,
    style: style,
    children: [isValueSelected && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativePaper.Appbar.Action, {
      icon: 'reload',
      onPress: resetMenu
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativePaper.Appbar.Content, {
      title: label
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativePaper.Appbar.Action, {
      icon: isValueSelected ? 'check' : 'close',
      onPress: toggleMenu
    })]
  });
}
var _default = exports.default = DropdownHeader;
//# sourceMappingURL=dropdown-header.js.map