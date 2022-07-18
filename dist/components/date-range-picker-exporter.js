"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _dateRangePickerWrapper = _interopRequireDefault(require("./date-range-picker-wrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DateRangePickerExporter = props => /*#__PURE__*/_react.default.createElement(_dateRangePickerWrapper.default, props);

var _default = DateRangePickerExporter;
exports.default = _default;