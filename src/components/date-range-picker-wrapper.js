import React from 'react';

import { Box } from '@mui/material';
import DateRangePicker from './date-range-pickers';

const DateRangePickerWrapper = props => {
  const { closeOnClickOutside, wrapperClassName, toggle, open } = props;

  const handleToggle = () => {
    if (closeOnClickOutside === false) {
      return;
    }

    toggle();
  };

  const handleKeyPress = event => event?.key === 'Escape' && handleToggle();

  return (
    <Box sx={{ position: 'relative' }}>
      {open && (
        <Box
          sx={{
            position: 'fixed',
            height: '100vh',
            width: '100vw',
            bottom: 0,
            zIndex: 0,
            right: 0,
            left: 0,
            top: 0,
          }}
          onKeyPress={handleKeyPress}
          onClick={handleToggle}
        />
      )}

      <Box sx={{ position: 'relative', zIndex: 1 }} className={wrapperClassName}>
        <DateRangePicker {...props} />
      </Box>
    </Box>
  );
};

export default DateRangePickerWrapper;
