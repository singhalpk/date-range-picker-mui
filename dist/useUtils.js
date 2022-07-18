"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUtils = exports.useLocalizationContext = exports.useDefaultDates = exports.MARKERS = void 0;

var React = _interopRequireWildcard(require("react"));

var _localization = require("./localization");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useLocalizationContext = () => {
  const localization = React.useContext(_localization.LocalizationContext);

  if (localization === null) {
    throw new Error('Please! add localization');
  }

  return localization;
};

exports.useLocalizationContext = useLocalizationContext;

const useUtils = () => useLocalizationContext().utils;

exports.useUtils = useUtils;

const useDefaultDates = () => useLocalizationContext().defaultDates;

exports.useDefaultDates = useDefaultDates;
const MARKERS = {
  FIRST_MONTH: 'firstMonth',
  SECOND_MONTH: 'secondMonth'
};
exports.MARKERS = MARKERS;