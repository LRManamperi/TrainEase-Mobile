import { Appbar } from 'react-native-paper';
import { useMemo } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function DropdownHeader(props) {
  const {
    label,
    resetMenu,
    toggleMenu,
    value
  } = props;
  const isValueSelected = Array.isArray(value) ? value.length > 0 : !!value;
  const style = useMemo(() => ({
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  }), []);
  return /*#__PURE__*/_jsxs(Appbar.Header, {
    statusBarHeight: 0,
    style: style,
    children: [isValueSelected && /*#__PURE__*/_jsx(Appbar.Action, {
      icon: 'reload',
      onPress: resetMenu
    }), /*#__PURE__*/_jsx(Appbar.Content, {
      title: label
    }), /*#__PURE__*/_jsx(Appbar.Action, {
      icon: isValueSelected ? 'check' : 'close',
      onPress: toggleMenu
    })]
  });
}
export default DropdownHeader;
//# sourceMappingURL=dropdown-header.js.map