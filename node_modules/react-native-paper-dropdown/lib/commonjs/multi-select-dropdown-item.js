"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNativePaper = require("react-native-paper");
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
function MultiSelectDropdownItem(props) {
  const {
    option,
    width,
    value = [],
    onSelect,
    isLast,
    menuItemTestID
  } = props;
  const style = (0, _react.useMemo)(() => ({
    minWidth: width
  }), [width]);
  const isActive = (0, _react.useCallback)(currentValue => {
    return value.indexOf(currentValue) !== -1;
  }, [value]);
  const theme = (0, _reactNativePaper.useTheme)();
  const titleStyle = {
    color: isActive(option.value) ? theme.colors.primary : theme.colors.onBackground
  };
  const onPress = () => {
    if (option.value) {
      const valueIndex = value.indexOf(option.value);
      if (valueIndex === -1) {
        onSelect?.([...value, option.value]);
      } else {
        onSelect?.([...value].filter(currentValue => currentValue !== option.value));
      }
    }
  };
  const wrapperStyle = (0, _react.useMemo)(() => ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8
  }), []);
  const menuItemWrapperStyle = (0, _react.useMemo)(() => ({
    flex: 1
  }), []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: wrapperStyle,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: menuItemWrapperStyle,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativePaper.Menu.Item, {
          testID: menuItemTestID,
          style: style,
          title: option.label,
          titleStyle: titleStyle,
          onPress: onPress
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativePaper.Checkbox.Android, {
        status: isActive(option.value) ? 'checked' : 'unchecked',
        onPress: onPress
      })]
    }), !isLast && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativePaper.Divider, {})]
  }, option.value);
}
var _default = exports.default = MultiSelectDropdownItem;
//# sourceMappingURL=multi-select-dropdown-item.js.map