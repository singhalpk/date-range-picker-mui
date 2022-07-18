import React from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import Header from './header';
import { useUtils } from '../useUtils';
import Day from './day';

const chunks = (array, size) => Array.from({ length: Math.ceil(array.length / size) }, (_v, i) => array.slice(i * size, i * size + size));

const Month = props => {
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
    toJsDate,
  } = useUtils();
  const { helpers, handlers, value: date, dateRange, marker, setValue: setDate, minDate, maxDate, locale } = props;
  const weekStartsOn = locale?.options?.weekStartsOn || 0;
  const WEEK_DAYS =
    typeof locale !== 'undefined'
      ? [...Array(7).keys()].map(d => locale.localize?.day((d + weekStartsOn) % 7, { width: 'short', context: 'standalone' }))
      : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const [back, forward] = props.navState;

  const getDaysInMonth = (date, locale) => {
    const startWeek = startOfWeek(startOfMonth(date), { locale });
    const endWeek = endOfWeek(endOfMonth(date), { locale });
    const days = [];
    for (let curr = startWeek; isBefore(curr, endWeek); ) {
      days.push(curr);
      curr = addDays(curr, 1);
    }
    return days;
  };
  const isStartOfRange = ({ startDate }, day) => startDate && isSameDay(day, startDate);

  const isEndOfRange = ({ endDate }, day) => endDate && isSameDay(day, endDate);

  const inDateRange = ({ startDate, endDate }, day) =>
    startDate && endDate && (isWithinRange(toDate(day), [startDate, endDate]) || isSameDay(day, startDate) || isSameDay(day, endDate));

  const isRangeSameDay = ({ startDate, endDate }) => {
    if (startDate && endDate) {
      return isSameDay(startDate, endDate);
    }
    return false;
  };

  return (
    <Paper square elevation={0} sx={{ width: 290 }}>
      <Grid container>
        <Header
          date={date}
          setDate={setDate}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() => handlers.onMonthNavigate(marker, -1)}
          onClickNext={() => handlers.onMonthNavigate(marker, 1)}
          locale={locale}
        />

        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          sx={{
            marginTop: '10px',
            paddingLeft: '30px',
            paddingRight: '30px',
          }}
        >
          {WEEK_DAYS.map(day => (
            <Typography color="textSecondary" key={day} variant="caption">
              {day}
            </Typography>
          ))}
        </Grid>

        <Grid
          item
          container
          direction="column"
          justifyContent="space-between"
          sx={{
            paddingLeft: '15px',
            paddingRight: '15px',
            marginTop: '15px',
            marginBottom: '20px',
          }}
        >
          {chunks(getDaysInMonth(toDate(date)), 7).map(week => (
            <Grid key={week[0]} container direction="row" justifyContent="center">
              {week.map(day => {
                const isStart = isStartOfRange(dateRange, day);
                const isEnd = isEndOfRange(dateRange, day);
                const isRangeOneDay = isRangeSameDay(dateRange);
                const highlighted = inDateRange(dateRange, day) || helpers.inHoverRange(day);

                return (
                  <Day
                    key={formatByString(toDate(day), 'dd-MM-yyyy')}
                    filled={isStart || isEnd}
                    outlined={isSameDay(toDate(day), toDate(new Date()))}
                    highlighted={highlighted && !isRangeOneDay}
                    disabled={!isSameMonth(toDate(date), toDate(day)) || !isWithinRange(toDate(day), [minDate, maxDate])}
                    startOfRange={isStart && !isRangeOneDay}
                    endOfRange={isEnd && !isRangeOneDay}
                    onClick={() => handlers.onDayClick(day)}
                    onHover={() => handlers.onDayHover(day)}
                    value={toJsDate(day).getDate()}
                  />
                );
              })}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Month;
