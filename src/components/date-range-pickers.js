import * as React from 'react';
import { useDefaultDates, useUtils, MARKERS } from '../useUtils';
import Menu from './menu';

const DateRangePicker = props => {
  const { open, onChange, initialDateRange, minDate, maxDate, locale } = props;
  const { date: toDate, isBefore, isAfter, toJsDate, addMonths, isSameMonth, isSameDay, isWithinRange, endOfDay } = useUtils();
  const defaultDates = useDefaultDates();
  const today = new Date();
  const minDateValid = toDate(minDate || defaultDates.minDate);
  const maxDateValid = toDate(maxDate || defaultDates.maxDate);
  const [dateRange, setDateRange] = React.useState({ ...initialDateRange });
  const [hoverDay, setHoverDay] = React.useState();

  const getValidatedMonths = (range, minDate, maxDate) => {
    const { startDate, endDate } = range;
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

  const { startDate, endDate } = dateRange;

  // handlers
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
    let { startDate: newStart, endDate: newEnd } = range;

    if (newStart && newEnd) {
      range.startDate = newStart = isAfter(toDate(newStart), toDate(minDateValid)) ? toDate(newStart) : minDateValid;
      range.endDate = newEnd = isBefore(toDate(newEnd), toDate(maxDateValid)) ? toDate(newEnd) : maxDateValid;

      setDateRange(range);
      onChange({ startDate: toJsDate(range.startDate), endDate: toJsDate(endOfDay(range.endDate)) });

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
      const newRange = { startDate, endDate: day };
      onChange({ startDate: toJsDate(startDate), endDate: toJsDate(endOfDay(day)) });
      setDateRange(newRange);
    } else {
      setDateRange({ startDate: day, endDate: undefined });
    }
    setHoverDay(day);
  };

  const onMonthNavigate = (marker, action) => {
    if (marker === MARKERS.FIRST_MONTH) {
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
  };

  // helpers
  const inHoverRange = day =>
    startDate && !endDate && hoverDay && isAfter(hoverDay, startDate) && isWithinRange(toDate(day), [toDate(startDate), toDate(hoverDay)]);

  const helpers = {
    inHoverRange,
  };

  const handlers = {
    onDayClick,
    onDayHover,
    onMonthNavigate,
  };

  return open ? (
    <Menu
      dateRange={dateRange}
      minDate={minDateValid}
      maxDate={maxDateValid}
      firstMonth={firstMonth}
      secondMonth={secondMonth}
      setFirstMonth={setFirstMonthValidated}
      setSecondMonth={setSecondMonthValidated}
      setDateRange={setDateRangeValidated}
      helpers={helpers}
      handlers={handlers}
      locale={locale}
    />
  ) : null;
};

export default DateRangePicker;
