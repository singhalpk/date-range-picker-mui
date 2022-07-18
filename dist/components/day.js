"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _material = require("@mui/material");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getBGColor = theme => theme.palette.muidaterangeday ? theme.palette.muidaterangeday : theme.palette.primary;

const getTextColor = theme => theme.palette.muidaterangetex ? theme.palette.muidaterangetex : theme.palette.primary;

const getBorderStyle = (startOfRange, endOfRange) => {
  if (startOfRange) {
    return '10% 0 0 10%';
  } else if (endOfRange) {
    return '0 10% 10% 0';
  }
};

const Day = _ref => {
  let {
    startOfRange,
    endOfRange,
    disabled,
    highlighted,
    outlined,
    filled,
    onClick,
    onHover,
    value
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      display: 'flex',
      borderRadius: getBorderStyle(startOfRange, endOfRange),
      background: theme => !disabled && highlighted ? getBGColor(theme).light : undefined
    }
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    sx: _objectSpread({
      height: '36px',
      width: '36px',
      padding: 0,
      borderRadius: '10%',
      border: theme => !disabled && outlined ? "1px solid ".concat(getBGColor(theme).dark) : undefined
    }, !disabled && filled ? {
      '&:hover': {
        backgroundColor: theme => getBGColor(theme).dark
      },
      backgroundColor: theme => getBGColor(theme).dark
    } : {}),
    disabled: disabled,
    onClick: onClick,
    onMouseOver: onHover // size="large"

  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    sx: {
      lineHeight: 1.6,
      color: theme => !disabled ? filled ? getBGColor(theme).contrastText : getTextColor(theme).primary : getTextColor(theme).secondary
    },
    variant: "body2"
  }, value)));
};

var _default = Day;
exports.default = _default;