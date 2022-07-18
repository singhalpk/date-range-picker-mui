"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.parse-int.js");

var _material = require("@mui/material");

var _react = _interopRequireDefault(require("react"));

var _useUtils = require("../useUtils");

var _styles = require("@mui/material/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LeftIcon = (0, _styles.styled)('i')(_ref => {
  let {
    theme
  } = _ref;
  return {
    border: 'solid black',
    borderWidth: theme.spacing(0, 0.5, 0.5, 0),
    display: 'inline-block',
    padding: theme.spacing(1),
    transform: 'rotate(135deg)'
  };
});
const RightIcon = (0, _styles.styled)('i')(_ref2 => {
  let {
    theme
  } = _ref2;
  return {
    border: 'solid black',
    borderWidth: theme.spacing(0, 0.5, 0.5, 0),
    display: 'inline-block',
    padding: theme.spacing(1),
    transform: 'rotate(-45deg)'
  };
});

const generateYears = (year, count) => {
  const half = Math.floor(count / 2);
  return Array(count).fill(0).map((_y, i) => year - half + i); // TODO: make part of the state
};

const Header = _ref3 => {
  let {
    date,
    setDate,
    nextDisabled,
    prevDisabled,
    onClickNext,
    onClickPrevious,
    locale
  } = _ref3;
  const {
    date: toDate,
    getMonth,
    setMonth,
    setYear,
    getYear
  } = (0, _useUtils.useUtils)();
  const MONTHS = typeof locale !== 'undefined' ? [...Array(12).keys()].map(d => {
    var _locale$localize;

    return (_locale$localize = locale.localize) === null || _locale$localize === void 0 ? void 0 : _locale$localize.month(d, {
      width: 'abbreviated',
      context: 'standalone'
    });
  }) : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const handleMonthChange = event => {
    setDate(setMonth(toDate(date), parseInt(event.target.value, 10)));
  };

  const handleYearChange = event => {
    setDate(setYear(toDate(date), parseInt(event.target.value, 10)));
  };

  return /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    justifyContent: "space-between",
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    sx: {
      padding: '5px'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    sx: {
      padding: '10px',
      '&:hover': {
        background: 'none'
      }
    },
    disabled: prevDisabled,
    onClick: onClickPrevious // size="large"

  }, /*#__PURE__*/_react.default.createElement(LeftIcon, null))), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    variant: "standard"
  }, /*#__PURE__*/_react.default.createElement(_material.Select, {
    value: getMonth(toDate(date)),
    onChange: handleMonthChange,
    MenuProps: {
      disablePortal: true
    }
  }, MONTHS.map((month, idx) => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: month,
    value: idx
  }, month))))), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    variant: "standard"
  }, /*#__PURE__*/_react.default.createElement(_material.Select, {
    value: getYear(toDate(date)),
    onChange: handleYearChange,
    MenuProps: {
      disablePortal: true
    }
  }, generateYears(getYear(toDate(date)), 30).map(year => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: year,
    value: year
  }, year))))), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    sx: {
      padding: '5px'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    sx: {
      padding: '10px',
      '&:hover': {
        background: 'none'
      }
    },
    disabled: nextDisabled,
    onClick: onClickNext // size="large"

  }, /*#__PURE__*/_react.default.createElement(RightIcon, null))));
};

var _default = Header;
exports.default = _default;