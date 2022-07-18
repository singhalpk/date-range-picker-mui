"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _material = require("@mui/material");

var _dateRangePickers = _interopRequireDefault(require("./date-range-pickers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DateRangePickerWrapper = props => {
  const {
    closeOnClickOutside,
    wrapperClassName,
    toggle,
    open
  } = props;

  const handleToggle = () => {
    if (closeOnClickOutside === false) {
      return;
    }

    toggle();
  };

  const handleKeyPress = event => (event === null || event === void 0 ? void 0 : event.key) === 'Escape' && handleToggle();

  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      position: 'relative'
    }
  }, open && /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      position: 'fixed',
      height: '100vh',
      width: '100vw',
      bottom: 0,
      zIndex: 0,
      right: 0,
      left: 0,
      top: 0
    },
    onKeyPress: handleKeyPress,
    onClick: handleToggle
  }), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      position: 'relative',
      zIndex: 1
    },
    className: wrapperClassName
  }, /*#__PURE__*/_react.default.createElement(_dateRangePickers.default, props)));
};

var _default = DateRangePickerWrapper;
exports.default = _default;