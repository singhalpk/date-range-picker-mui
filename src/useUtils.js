import * as React from 'react';

import { LocalizationContext } from './localization';

export const useLocalizationContext = () => {
  const localization = React.useContext(LocalizationContext);
  if (localization === null) {
    throw new Error('Please! add localization');
  }

  return localization;
};

export const useUtils = () => useLocalizationContext().utils;

export const useDefaultDates = () => useLocalizationContext().defaultDates;

export const MARKERS = {
  FIRST_MONTH: 'firstMonth',
  SECOND_MONTH: 'secondMonth',
};
