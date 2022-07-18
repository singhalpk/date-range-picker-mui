import { FormControl, Grid, IconButton, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useUtils } from '../useUtils';
import { styled } from '@mui/material/styles';

const LeftIcon = styled('i')(({ theme }) => ({
  border: 'solid black',
  borderWidth: theme.spacing(0, 0.5, 0.5, 0),
  display: 'inline-block',
  padding: theme.spacing(1),
  transform: 'rotate(135deg)',
}));

const RightIcon = styled('i')(({ theme }) => ({
  border: 'solid black',
  borderWidth: theme.spacing(0, 0.5, 0.5, 0),
  display: 'inline-block',
  padding: theme.spacing(1),
  transform: 'rotate(-45deg)',
}));

const generateYears = (year, count) => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((_y, i) => year - half + i); // TODO: make part of the state
};

const Header = ({ date, setDate, nextDisabled, prevDisabled, onClickNext, onClickPrevious, locale }) => {
  const { date: toDate, getMonth, setMonth, setYear, getYear } = useUtils();

  const MONTHS =
    typeof locale !== 'undefined'
      ? [...Array(12).keys()].map(d => locale.localize?.month(d, { width: 'abbreviated', context: 'standalone' }))
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const handleMonthChange = event => {
    setDate(setMonth(toDate(date), parseInt(event.target.value, 10)));
  };

  const handleYearChange = event => {
    setDate(setYear(toDate(date), parseInt(event.target.value, 10)));
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item sx={{ padding: '5px' }}>
        <IconButton
          sx={{
            padding: '10px',
            '&:hover': {
              background: 'none',
            },
          }}
          disabled={prevDisabled}
          onClick={onClickPrevious}
          // size="large"
        >
          <LeftIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <FormControl variant="standard">
          <Select value={getMonth(toDate(date))} onChange={handleMonthChange} MenuProps={{ disablePortal: true }}>
            {MONTHS.map((month, idx) => (
              <MenuItem key={month} value={idx}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl variant="standard">
          <Select value={getYear(toDate(date))} onChange={handleYearChange} MenuProps={{ disablePortal: true }}>
            {generateYears(getYear(toDate(date)), 30).map(year => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <Typography>{format(date, "MMMM YYYY")}</Typography> */}
      </Grid>
      <Grid item sx={{ padding: '5px' }}>
        <IconButton
          sx={{
            padding: '10px',
            '&:hover': {
              background: 'none',
            },
          }}
          disabled={nextDisabled}
          onClick={onClickNext}
          // size="large"
        >
          <RightIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;
