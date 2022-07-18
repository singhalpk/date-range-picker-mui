"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var React = _interopRequireWildcard(require("react"));

var _useUtils = require("../useUtils");

var _menu = _interopRequireDefault(require("./menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DateRangePicker = props => {
  const {
    open,
    onChange,
    initialDateRange,
    minDate,
    maxDate,
    locale
  } = props;
  const {
    date: toDate,
    isBefore,
    isAfter,
    toJsDate,
    addMonths,
    isSameMonth,
    isSameDay,
    isWithinRange,
    endOfDay
  } = (0, _useUtils.useUtils)();
  const defaultDates = (0, _useUtils.useDefaultDates)();
  const today = new Date();
  const minDateValid = toDate(minDate || defaultDates.minDate);
  const maxDateValid = toDate(maxDate || defaultDates.maxDate);
  const [dateRange, setDateRange] = React.useState(_objectSpread({}, initialDateRange));
  const [hoverDay, setHoverDay] = React.useState();

  const getValidatedMonths = (range, minDate, maxDate) => {
    const {
      startDate,
      endDate
    } = range;

    if (startDate && endDate) {
      const newStart = isBefore(toDate(startDate), toDate(minDate)) ? toDate(startDate) : minDate;
      const newEnd = isAfter(toDate(endDate), toDate(maxDate)) ? toDate(endDate) : maxDate;
      return [newStart, isSameMonth(newStart, newEnd) ? addMonths(toDate(newStart), 1) : newEnd];
    }

    return [toDate(startDate), toDate(endDate)];
  };

  const [intialFirstMonth, initialSecondMonth] = getValidatedMonths(initialDateRange || {}, minDateValid, maxDateValid);
  const [firstMonth, setFirstMonth] = React.useState(intialFirstMonth || today);
  const [secondMonth, setSecondMonth] = React.useState(initialSecondMonth || addMonths(toDate(firstMonth), 1));
  const {
    startDate,
    endDate
  } = dateRange; // handlers

  const setFirstMonthValidated = date => {
    if (isBefore(date, toDate(secondMonth))) {
      setFirstMonth(toJsDate(date));
    }
  };

  const setSecondMonthValidated = date => {
    if (isAfter(date, toDate(firstMonth))) {
      setSecondMonth(toJsDate(date));
    }
  };

  const setDateRangeValidated = range => {
    let {
      startDate: newStart,
      endDate: newEnd
    } = range;

    if (newStart && newEnd) {
      range.startDate = newStart = isAfter(toDate(newStart), toDate(minDateValid)) ? toDate(newStart) : minDateValid;
      range.endDate = newEnd = isBefore(toDate(newEnd), toDate(maxDateValid)) ? toDate(newEnd) : maxDateValid;
      setDateRange(range);
      onChange({
        startDate: toJsDate(range.startDate),
        endDate: toJsDate(endOfDay(range.endDate))
      });
      setFirstMonth(newStart);
      setSecondMonth(isSameMonth(toDate(newStart), toDate(newEnd)) ? addMonths(toDate(newStart), 1) : newEnd);
    } else {
      const emptyRange = {};
      setDateRange(emptyRange);
      onChange(emptyRange);
      setFirstMonth(today);
      setSecondMonth(addMonths(toDate(firstMonth), 1));
    }
  };

  const onDayClick = day => {
    if (startDate && !endDate && !isBefore(toDate(day), toDate(startDate))) {
      const newRange = {
        startDate,
        endDate: day
      };
      onChange({
        startDate: toJsDate(startDate),
        endDate: toJsDate(endOfDay(day))
      });
      setDateRange(newRange);
    } else {
      setDateRange({
        startDate: day,
        endDate: undefined
      });
    }

    setHoverDay(day);
  };

  const onMonthNavigate = (marker, action) => {
    if (marker === _useUtils.MARKERS.FIRST_MONTH) {
      const firstNew = addMonths(toDate(firstMonth), action);
      setFirstMonth(firstNew);
      setSecondMonth(firstNew);
    } else {
      const secondNew = addMonths(toDate(secondMonth), action);

      if (isBefore(toDate(firstMonth), toDate(secondNew)) || isSameMonth(toDate(firstMonth), toDate(secondNew))) {
        setSecondMonth(secondNew);
      }
    }
  };

  const onDayHover = date => {
    if (startDate && !endDate) {
      if (!hoverDay || !isSameDay(toDate(date), toDate(hoverDay))) {
        setHoverDay(date);
      }
    }
  }; // helpers


  const inHoverRange = day => startDate && !endDate && hoverDay && isAfter(hoverDay, startDate) && isWithinRange(toDate(day), [toDate(startDate), toDate(hoverDay)]);

  const helpers = {
    inHoverRange
  };
  const handlers = {
    onDayClick,
    onDayHover,
    onMonthNavigate
  };
  return open ? /*#__PURE__*/React.createElement(_menu.default, {
    dateRange: dateRange,
    minDate: minDateValid,
    maxDate: maxDateValid,
    firstMonth: firstMonth,
    secondMonth: secondMonth,
    setFirstMonth: setFirstMonthValidated,
    setSecondMonth: setSecondMonthValidated,
    setDateRange: setDateRangeValidated,
    helpers: helpers,
    handlers: handlers,
    locale: locale
  }) : null;
};

var _default = DateRangePicker;
exports.default = _default;