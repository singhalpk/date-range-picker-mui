/* eslint-disable object-curly-newline */
import React from 'react';
import { Divider, Grid, Paper, Typography } from '@mui/material';
import { useUtils, MARKERS } from '../useUtils';
import Month from './month';

const Menu = props => {
  const { date: toDate, formatByString } = useUtils();
  const { dateRange, minDate, maxDate, firstMonth, setFirstMonth, setSecondMonth, secondMonth, helpers, handlers, locale } = props;
  const { startDate, endDate } = dateRange;
  // const canNavigateCloser = getMonth(toDate(secondMonth)) - getMonth(toDate(firstMonth)) >= 0;
  const commonProps = {
    dateRange,
    minDate,
    maxDate,
    helpers,
    handlers,
  };
  return (
    <Paper elevation={5} square>
      <Grid container direction="row" wrap="nowrap">
        <Divider orientation="vertical" flexItem />
        <Grid>
          <Grid container sx={{ padding: '20px 20px' }} alignItems="center">
            <Grid item sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="subtitle1">
                {startDate ? formatByString(toDate(startDate), 'dd MMM yyyy', { locale }) : 'Start Date'}
              </Typography>
            </Grid>
            <Divider sx={{ width: '15px', background: '#000' }} />
            <Grid item sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="subtitle1">
                {endDate ? formatByString(toDate(endDate), 'dd MMM yyyy', { locale }) : 'End Date'}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container direction="row" justifyContent="center" wrap="nowrap">
            <Month
              {...commonProps}
              value={startDate ? secondMonth : firstMonth}
              setValue={startDate ? setSecondMonth : setFirstMonth}
              navState={[true, true]}
              marker={startDate ? MARKERS.SECOND_MONTH : MARKERS.FIRST_MONTH}
              locale={locale}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Menu;
