"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _material = require("@mui/material");

var _useUtils = require("../useUtils");

var _month = _interopRequireDefault(require("./month"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Menu = props => {
  const {
    date: toDate,
    formatByString
  } = (0, _useUtils.useUtils)();
  const {
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    setSecondMonth,
    secondMonth,
    helpers,
    handlers,
    locale
  } = props;
  const {
    startDate,
    endDate
  } = dateRange; // const canNavigateCloser = getMonth(toDate(secondMonth)) - getMonth(toDate(firstMonth)) >= 0;

  const commonProps = {
    dateRange,
    minDate,
    maxDate,
    helpers,
    handlers
  };
  return /*#__PURE__*/_react.default.createElement(_material.Paper, {
    elevation: 5,
    square: true
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    direction: "row",
    wrap: "nowrap"
  }, /*#__PURE__*/_react.default.createElement(_material.Divider, {
    orientation: "vertical",
    flexItem: true
  }), /*#__PURE__*/_react.default.createElement(_material.Grid, null, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    sx: {
      padding: '20px 20px'
    },
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    sx: {
      flex: 1,
      textAlign: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle1"
  }, startDate ? formatByString(toDate(startDate), 'dd MMM yyyy', {
    locale
  }) : 'Start Date')), /*#__PURE__*/_react.default.createElement(_material.Divider, {
    sx: {
      width: '15px',
      background: '#000'
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    sx: {
      flex: 1,
      textAlign: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle1"
  }, endDate ? formatByString(toDate(endDate), 'dd MMM yyyy', {
    locale
  }) : 'End Date'))), /*#__PURE__*/_react.default.createElement(_material.Divider, null), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    direction: "row",
    justifyContent: "center",
    wrap: "nowrap"
  }, /*#__PURE__*/_react.default.createElement(_month.default, _extends({}, commonProps, {
    value: startDate ? secondMonth : firstMonth,
    setValue: startDate ? setSecondMonth : setFirstMonth,
    navState: [true, true],
    marker: startDate ? _useUtils.MARKERS.SECOND_MONTH : _useUtils.MARKERS.FIRST_MONTH,
    locale: locale
  }))))));
};

var _default = Menu;
exports.default = _default;