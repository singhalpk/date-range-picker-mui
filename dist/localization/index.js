"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalizationContext = void 0;
exports.LocalizationProvider = LocalizationProvider;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@mui/material/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const LocalizationContext = /*#__PURE__*/React.createContext(null);
exports.LocalizationContext = LocalizationContext;
let warnedOnce = false;
/**
 * @ignore - do not document.
 */

function LocalizationProvider(inProps) {
  const props = (0, _styles.useThemeProps)({
    props: inProps
  });
  const {
    children,
    dateAdapter: Utils,
    dateFormats,
    dateLibInstance,
    locale,
    adapterLocale
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnce && locale !== undefined) {
      warnedOnce = true;
      console.warn("LocalizationProvider's prop `locale` is deprecated and replaced by `adapterLocale`");
    }
  }

  const utils = React.useMemo(() => new Utils({
    locale: adapterLocale !== null && adapterLocale !== void 0 ? adapterLocale : locale,
    formats: dateFormats,
    instance: dateLibInstance
  }), [Utils, locale, adapterLocale, dateFormats, dateLibInstance]);
  const defaultDates = React.useMemo(() => ({
    minDate: utils.date('1900-01-01T00:00:00.000'),
    maxDate: utils.date('2099-12-31T00:00:00.000')
  }), [utils]);
  const contextValue = React.useMemo(() => ({
    utils,
    defaultDates
  }), [defaultDates, utils]);
  return /*#__PURE__*/React.createElement(LocalizationContext.Provider, {
    value: contextValue
  }, children);
}

LocalizationProvider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * Locale for the date library you are using
   */
  adapterLocale: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  children: _propTypes.default.node,

  /**
   * DateIO adapter class function
   */
  dateAdapter: _propTypes.default.func.isRequired,

  /**
   * Formats that are used for any child pickers
   */
  dateFormats: _propTypes.default.shape({
    dayOfMonth: _propTypes.default.string,
    fullDate: _propTypes.default.string,
    fullDateTime: _propTypes.default.string,
    fullDateTime12h: _propTypes.default.string,
    fullDateTime24h: _propTypes.default.string,
    fullDateWithWeekday: _propTypes.default.string,
    fullTime: _propTypes.default.string,
    fullTime12h: _propTypes.default.string,
    fullTime24h: _propTypes.default.string,
    hours12h: _propTypes.default.string,
    hours24h: _propTypes.default.string,
    keyboardDate: _propTypes.default.string,
    keyboardDateTime: _propTypes.default.string,
    keyboardDateTime12h: _propTypes.default.string,
    keyboardDateTime24h: _propTypes.default.string,
    minutes: _propTypes.default.string,
    month: _propTypes.default.string,
    monthAndDate: _propTypes.default.string,
    monthAndYear: _propTypes.default.string,
    monthShort: _propTypes.default.string,
    normalDate: _propTypes.default.string,
    normalDateWithWeekday: _propTypes.default.string,
    seconds: _propTypes.default.string,
    shortDate: _propTypes.default.string,
    weekday: _propTypes.default.string,
    weekdayShort: _propTypes.default.string,
    year: _propTypes.default.string
  }),

  /**
   * Date library instance you are using, if it has some global overrides
   * ```jsx
   * dateLibInstance={momentTimeZone}
   * ```
   */
  dateLibInstance: _propTypes.default.any,

  /**
   * Locale for the date library you are using
   * @deprecated Use `adapterLocale` instead
   */
  locale: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string])
};