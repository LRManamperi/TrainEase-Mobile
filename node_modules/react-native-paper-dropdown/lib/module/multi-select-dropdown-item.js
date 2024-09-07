import { useCallback, useMemo, Fragment } from 'react';
import { useTheme, Menu, Divider, Checkbox } from 'react-native-paper';
import { View } from 'react-native';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function MultiSelectDropdownItem(props) {
  const {
    option,
    width,
    value = [],
    onSelect,
    isLast,
    menuItemTestID
  } = props;
  const style = useMemo(() => ({
    minWidth: width
  }), [width]);
  const isActive = useCallback(currentValue => {
    return value.indexOf(currentValue) !== -1;
  }, [value]);
  const theme = useTheme();
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
  const wrapperStyle = useMemo(() => ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8
  }), []);
  const menuItemWrapperStyle = useMemo(() => ({
    flex: 1
  }), []);
  return /*#__PURE__*/_jsxs(Fragment, {
    children: [/*#__PURE__*/_jsxs(View, {
      style: wrapperStyle,
      children: [/*#__PURE__*/_jsx(View, {
        style: menuItemWrapperStyle,
        children: /*#__PURE__*/_jsx(Menu.Item, {
          testID: menuItemTestID,
          style: style,
          title: option.label,
          titleStyle: titleStyle,
          onPress: onPress
        })
      }), /*#__PURE__*/_jsx(Checkbox.Android, {
        status: isActive(option.value) ? 'checked' : 'unchecked',
        onPress: onPress
      })]
    }), !isLast && /*#__PURE__*/_jsx(Divider, {})]
  }, option.value);
}
export default MultiSelectDropdownItem;
//# sourceMappingURL=multi-select-dropdown-item.js.map