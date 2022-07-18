import React from 'react';
import { IconButton, Typography, Box } from '@mui/material';

const getBGColor = theme => (theme.palette.muidaterangeday ? theme.palette.muidaterangeday : theme.palette.primary);
const getTextColor = theme => (theme.palette.muidaterangetex ? theme.palette.muidaterangetex : theme.palette.primary);
const getBorderStyle = (startOfRange, endOfRange) => {
  if (startOfRange) {
    return '10% 0 0 10%';
  } else if (endOfRange) {
    return '0 10% 10% 0';
  }
};

const Day = ({ startOfRange, endOfRange, disabled, highlighted, outlined, filled, onClick, onHover, value }) => (
  <Box
    sx={{
      display: 'flex',
      borderRadius: getBorderStyle(startOfRange, endOfRange),
      background: theme => (!disabled && highlighted ? getBGColor(theme).light : undefined),
    }}
  >
    <IconButton
      sx={{
        height: '36px',
        width: '36px',
        padding: 0,
        borderRadius: '10%',
        border: theme => (!disabled && outlined ? `1px solid ${getBGColor(theme).dark}` : undefined),
        ...(!disabled && filled
          ? {
              '&:hover': {
                backgroundColor: theme => getBGColor(theme).dark,
              },
              backgroundColor: theme => getBGColor(theme).dark,
            }
          : {}),
      }}
      disabled={disabled}
      onClick={onClick}
      onMouseOver={onHover}
      // size="large"
    >
      <Typography
        sx={{
          lineHeight: 1.6,
          color: theme =>
            !disabled ? (filled ? getBGColor(theme).contrastText : getTextColor(theme).primary) : getTextColor(theme).secondary,
        }}
        variant="body2"
      >
        {value}
      </Typography>
    </IconButton>
  </Box>
);

export default Day;
