"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _material = require("@mui/material");

var _header = _interopRequireDefault(require("./header"));

var _useUtils = require("../useUtils");

var _day = _interopRequireDefault(require("./day"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const chunks = (array, size) => Array.from({
  length: Math.ceil(array.length / size)
}, (_v, i) => array.slice(i * size, i * size + size));

const Month = props => {
  var _locale$options;

  const {
    date: toDate,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    isBefore,
    isSameDay,
    addDays,
    isWithinRange,
    isSameMonth,
    formatByString,
    toJsDate
  } = (0, _useUtils.useUtils)();
  const {
    helpers,
    handlers,
    value: date,
    dateRange,
    marker,
    setValue: setDate,
    minDate,
    maxDate,
    locale
  } = props;
  const weekStartsOn = (locale === null || locale === void 0 ? void 0 : (_locale$options = locale.options) === null || _locale$options === void 0 ? void 0 : _locale$options.weekStartsOn) || 0;
  const WEEK_DAYS = typeof locale !== 'undefined' ? [...Array(7).keys()].map(d => {
    var _locale$localize;

    return (_locale$localize = locale.localize) === null || _locale$localize === void 0 ? void 0 : _locale$localize.day((d + weekStartsOn) % 7, {
      width: 'short',
      context: 'standalone'
    });
  }) : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const [back, forward] = props.navState;

  const getDaysInMonth = (date, locale) => {
    const startWeek = startOfWeek(startOfMonth(date), {
      locale
    });
    const endWeek = endOfWeek(endOfMonth(date), {
      locale
    });
    const days = [];

    for (let curr = startWeek; isBefore(curr, endWeek);) {
      days.push(curr);
      curr = addDays(curr, 1);
    }

    return days;
  };

  const isStartOfRange = (_ref, day) => {
    let {
      startDate
    } = _ref;
    return startDate && isSameDay(day, startDate);
  };

  const isEndOfRange = (_ref2, day) => {
    let {
      endDate
    } = _ref2;
    return endDate && isSameDay(day, endDate);
  };

  const inDateRange = (_ref3, day) => {
    let {
      startDate,
      endDate
    } = _ref3;
    return startDate && endDate && (isWithinRange(toDate(day), [startDate, endDate]) || isSameDay(day, startDate) || isSameDay(day, endDate));
  };

  const isRangeSameDay = _ref4 => {
    let {
      startDate,
      endDate
    } = _ref4;

    if (startDate && endDate) {
      return isSameDay(startDate, endDate);
    }

    return false;
  };

  return /*#__PURE__*/_react.default.createElement(_material.Paper, {
    square: true,
    elevation: 0,
    sx: {
      width: 290
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_header.default, {
    date: date,
    setDate: setDate,
    nextDisabled: !forward,
    prevDisabled: !back,
    onClickPrevious: () => handlers.onMonthNavigate(marker, -1),
    onClickNext: () => handlers.onMonthNavigate(marker, 1),
    locale: locale
  }), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    container: true,
    direction: "row",
    justifyContent: "space-between",
    sx: {
      marginTop: '10px',
      paddingLeft: '30px',
      paddingRight: '30px'
    }
  }, WEEK_DAYS.map(day => /*#__PURE__*/_react.default.createElement(_material.Typography, {
    color: "textSecondary",
    key: day,
    variant: "caption"
  }, day))), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    container: true,
    direction: "column",
    justifyContent: "space-between",
    sx: {
      paddingLeft: '15px',
      paddingRight: '15px',
      marginTop: '15px',
      marginBottom: '20px'
    }
  }, chunks(getDaysInMonth(toDate(date)), 7).map(week => /*#__PURE__*/_react.default.createElement(_material.Grid, {
    key: week[0],
    container: true,
    direction: "row",
    justifyContent: "center"
  }, week.map(day => {
    const isStart = isStartOfRange(dateRange, day);
    const isEnd = isEndOfRange(dateRange, day);
    const isRangeOneDay = isRangeSameDay(dateRange);
    const highlighted = inDateRange(dateRange, day) || helpers.inHoverRange(day);
    return /*#__PURE__*/_react.default.createElement(_day.default, {
      key: formatByString(toDate(day), 'dd-MM-yyyy'),
      filled: isStart || isEnd,
      outlined: isSameDay(toDate(day), toDate(new Date())),
      highlighted: highlighted && !isRangeOneDay,
      disabled: !isSameMonth(toDate(date), toDate(day)) || !isWithinRange(toDate(day), [minDate, maxDate]),
      startOfRange: isStart && !isRangeOneDay,
      endOfRange: isEnd && !isRangeOneDay,
      onClick: () => handlers.onDayClick(day),
      onHover: () => handlers.onDayHover(day),
      value: toJsDate(day).getDate()
    });
  }))))));
};

var _default = Month;
exports.default = _default;