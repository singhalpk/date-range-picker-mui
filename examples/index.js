import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { default as AdapterLuxon } from '@date-io/luxon';
import { DateRangePickerComponent } from '../dist/mui-date-range';
import { LocalizationProvider } from '../dist/localization-provider';

const StyledButton = styled(Button)(({ theme, active }) => ({
  padding: theme.spacing(2.5, 4),
}));


export default function App() {
  const [showPicker, setPicker] = useState(false);
  const [dateRange, setDateRange] = useState(null);

  const onSelect = async range => {
    setDateRange(range);
  };

  const handleClose = () => {
    setPicker(showPicker => !showPicker);
  };
  const handleProfileMenuOpen = event => {
    setPicker(showPicker => !showPicker);
  };

  return (
    <>
        <StyledButton onClick={handleProfileMenuOpen}  variant="contained">
            <Typography variant="body1" fontWeight={500} >
                Date
            </Typography>
        </StyledButton>
        <Typography>{dateRange.start}-{dateRange.end}</Typography>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <DateRangePickerComponent open={showPicker} onChange={onSelect} toggle={handleClose} />
        </LocalizationProvider>
    </>
  );
}
