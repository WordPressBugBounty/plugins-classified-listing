import { b as _toConsumableArray, r as reactExports, g as _slicedToArray, f as React, h as _defineProperty, a as _objectSpread2, e as _extends$2, t as getDefaultExportFromCjs, _ as _typeof, c as _objectWithoutProperties, n as _createClass, l as _classCallCheck, i as reactDomExports, j as _inherits, k as _createSuper, m as _assertThisInitialized$1, o as jsxRuntimeExports } from "./objectWithoutProperties-Dm3WTQmc.js";
import { c as classNames, v as useEvent$1, aS as calculateColor, aT as calcOffset, M as useMergedState, aU as generateColor, aV as Color, aW as ColorPickerPrefixCls, aX as ColorBlock, aY as defaultColor, i as genStyleHooks, m as merge$1, l as initZoomMotion, r as resetComponent, E as getArrowStyle, aZ as PresetColors, J as getArrowToken, I as getArrowOffsetToken, C as ConfigContext, a_ as Popup$1, a4 as useComponentConfig, T as Tooltip, a$ as getTransitionName, a as cloneElement, X as KeyCode, W as Icon$1, b0 as Trigger, w as wrapperRaf, Q as warningOnce, b1 as useLayoutUpdateEffect, ad as useLayoutEffect, aj as isVisible, ai as RefResizeObserver, Y as pickAttrs, o as omit, b2 as ForwardOverflow, b3 as FormItemInputContext, a8 as Select, b4 as Group, b5 as Button, b6 as genOverflowStyle, b7 as getMultipleSelectorUnit, e as unit, F as FastColor, _ as initComponentToken, b8 as genOutlinedStyle, b9 as genUnderlinedStyle, ba as genFilledStyle, bb as genBorderlessStyle, Z as initInputToken, bc as genCompactItemStyle, A as slideUpOut, z as slideDownOut, D as slideUpIn, B as slideDownIn, h as textEllipsis, bd as genRoundedArrow, be as genPlaceholderStyle, k as initSlideMotion, H as initMoveMotion, a6 as useLocale$1, bf as locale, f as genFocusOutline, aw as DisabledContext, bg as composeRef, x as useCSSVarCls, bh as TARGET_CLS, bi as useBubbleLock, bj as Wave, bk as Checkbox$2, at as CSSMotion, G as genFocusStyle, bl as useId, a5 as useSize, bm as generateColor$1, bn as isMobile, bo as BaseInput, bp as triggerFocus, $ as genBasicInputStyle, bq as genInputGroupStyle, br as genOutlinedGroupStyle, bs as genFilledGroupStyle, p as resetIcon, S as useCompactItemContext, bt as useVariant, bu as getStatusClassNames, d as ContextIsolator, ar as RefIcon$h, bv as getMergedStatus, aD as ConfigProvider, bw as getColorAlpha, bx as toHexFormat, ax as Input$1, by as getRoundNumber, ae as isEqual, bz as getGradientPercentColor, bA as AggregationColor, u as useForceUpdate, bB as genAlphaColor, bC as ColorPresets, aG as Divider, P as genPurePanel, bD as useIcons$1, V as Button$1, q as useZIndex, bE as isPresetSize, au as Keyframe, a3 as genSubStyleComponent, bF as genPresetColor, bG as isPresetColor, bH as useClosable, bI as pickClosable, bJ as isPresetStatusColor, bK as replaceElement, bL as _asyncToGenerator, bM as _regeneratorRuntime, n as clearFix, bN as initFadeMotion, bO as blue, j as genCollapseMotion, bP as RefIcon$i, aR as Progress$1, y as initCollapseMotion, bQ as CSSMotionList, av as RefIcon$j, aa as localeValues } from "./index-ChKw1fwE.js";
import { e as createCache, g as getRegisteredStyles, s as serializeStyles, i as insertStyles, h as hoistNonReactStatics$1 } from "./hoist-non-react-statics.cjs-N8yz9EbG.js";
function mergeClassNames(schema, ...classNames$1) {
  const mergedSchema = schema || {};
  return classNames$1.reduce((acc, cur) => {
    Object.keys(cur || {}).forEach((key2) => {
      const keySchema = mergedSchema[key2];
      const curVal = cur[key2];
      if (keySchema && typeof keySchema === "object") {
        if (curVal && typeof curVal === "object") {
          acc[key2] = mergeClassNames(keySchema, acc[key2], curVal);
        } else {
          const {
            _default: defaultField
          } = keySchema;
          if (defaultField) {
            acc[key2] = acc[key2] || {};
            acc[key2][defaultField] = classNames(acc[key2][defaultField], curVal);
          }
        }
      } else {
        acc[key2] = classNames(acc[key2], curVal);
      }
    });
    return acc;
  }, {});
}
function useSemanticClassNames(schema, ...classNames2) {
  return reactExports.useMemo(() => mergeClassNames.apply(void 0, [schema].concat(classNames2)), [classNames2, schema]);
}
function useSemanticStyles(...styles) {
  return reactExports.useMemo(() => {
    return styles.reduce((acc, cur = {}) => {
      Object.keys(cur).forEach((key2) => {
        acc[key2] = Object.assign(Object.assign({}, acc[key2]), cur[key2]);
      });
      return acc;
    }, {});
  }, [styles]);
}
function fillObjectBySchema(obj, schema) {
  const newObj = Object.assign({}, obj);
  Object.keys(schema).forEach((key2) => {
    if (key2 !== "_default") {
      const nestSchema = schema[key2];
      const nextValue = newObj[key2] || {};
      newObj[key2] = nestSchema ? fillObjectBySchema(nextValue, nestSchema) : nextValue;
    }
  });
  return newObj;
}
const useMergeSemantic = (classNamesList, stylesList, schema) => {
  const mergedClassNames = useSemanticClassNames.apply(void 0, [schema].concat(_toConsumableArray(classNamesList)));
  const mergedStyles = useSemanticStyles.apply(void 0, _toConsumableArray(stylesList));
  return reactExports.useMemo(() => {
    return [fillObjectBySchema(mergedClassNames, schema), fillObjectBySchema(mergedStyles, schema)];
  }, [mergedClassNames, mergedStyles, schema]);
};
function getPosition$1(e) {
  var obj = "touches" in e ? e.touches[0] : e;
  var scrollXOffset = document.documentElement.scrollLeft || document.body.scrollLeft || window.pageXOffset;
  var scrollYOffset = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
  return {
    pageX: obj.pageX - scrollXOffset,
    pageY: obj.pageY - scrollYOffset
  };
}
function useColorDrag(props) {
  var targetRef = props.targetRef, containerRef = props.containerRef, direction = props.direction, onDragChange = props.onDragChange, onDragChangeComplete = props.onDragChangeComplete, calculate = props.calculate, color = props.color, disabledDrag = props.disabledDrag;
  var _useState = reactExports.useState({
    x: 0,
    y: 0
  }), _useState2 = _slicedToArray(_useState, 2), offsetValue = _useState2[0], setOffsetValue = _useState2[1];
  var mouseMoveRef = reactExports.useRef(null);
  var mouseUpRef = reactExports.useRef(null);
  reactExports.useEffect(function() {
    setOffsetValue(calculate());
  }, [color]);
  reactExports.useEffect(function() {
    return function() {
      document.removeEventListener("mousemove", mouseMoveRef.current);
      document.removeEventListener("mouseup", mouseUpRef.current);
      document.removeEventListener("touchmove", mouseMoveRef.current);
      document.removeEventListener("touchend", mouseUpRef.current);
      mouseMoveRef.current = null;
      mouseUpRef.current = null;
    };
  }, []);
  var updateOffset = function updateOffset2(e) {
    var _getPosition = getPosition$1(e), pageX = _getPosition.pageX, pageY = _getPosition.pageY;
    var _containerRef$current = containerRef.current.getBoundingClientRect(), rectX = _containerRef$current.x, rectY = _containerRef$current.y, width = _containerRef$current.width, height = _containerRef$current.height;
    var _targetRef$current$ge = targetRef.current.getBoundingClientRect(), targetWidth = _targetRef$current$ge.width, targetHeight = _targetRef$current$ge.height;
    var centerOffsetX = targetWidth / 2;
    var centerOffsetY = targetHeight / 2;
    var offsetX = Math.max(0, Math.min(pageX - rectX, width)) - centerOffsetX;
    var offsetY = Math.max(0, Math.min(pageY - rectY, height)) - centerOffsetY;
    var calcOffset2 = {
      x: offsetX,
      y: direction === "x" ? offsetValue.y : offsetY
    };
    if (targetWidth === 0 && targetHeight === 0 || targetWidth !== targetHeight) {
      return false;
    }
    onDragChange === null || onDragChange === void 0 || onDragChange(calcOffset2);
  };
  var onDragMove = function onDragMove2(e) {
    e.preventDefault();
    updateOffset(e);
  };
  var onDragStop = function onDragStop2(e) {
    e.preventDefault();
    document.removeEventListener("mousemove", mouseMoveRef.current);
    document.removeEventListener("mouseup", mouseUpRef.current);
    document.removeEventListener("touchmove", mouseMoveRef.current);
    document.removeEventListener("touchend", mouseUpRef.current);
    mouseMoveRef.current = null;
    mouseUpRef.current = null;
    onDragChangeComplete === null || onDragChangeComplete === void 0 || onDragChangeComplete();
  };
  var onDragStart = function onDragStart2(e) {
    document.removeEventListener("mousemove", mouseMoveRef.current);
    document.removeEventListener("mouseup", mouseUpRef.current);
    if (disabledDrag) {
      return;
    }
    updateOffset(e);
    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragStop);
    document.addEventListener("touchmove", onDragMove);
    document.addEventListener("touchend", onDragStop);
    mouseMoveRef.current = onDragMove;
    mouseUpRef.current = onDragStop;
  };
  return [offsetValue, onDragStart];
}
var Handler = function Handler2(_ref) {
  var _ref$size = _ref.size, size = _ref$size === void 0 ? "default" : _ref$size, color = _ref.color, prefixCls = _ref.prefixCls;
  return /* @__PURE__ */ React.createElement("div", {
    className: classNames("".concat(prefixCls, "-handler"), _defineProperty({}, "".concat(prefixCls, "-handler-sm"), size === "small")),
    style: {
      backgroundColor: color
    }
  });
};
var Palette = function Palette2(_ref) {
  var children = _ref.children, style = _ref.style, prefixCls = _ref.prefixCls;
  return /* @__PURE__ */ React.createElement("div", {
    className: "".concat(prefixCls, "-palette"),
    style: _objectSpread2({
      position: "relative"
    }, style)
  }, children);
};
var Transform = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var children = props.children, x = props.x, y = props.y;
  return /* @__PURE__ */ React.createElement("div", {
    ref,
    style: {
      position: "absolute",
      left: "".concat(x, "%"),
      top: "".concat(y, "%"),
      zIndex: 1,
      transform: "translate(-50%, -50%)"
    }
  }, children);
});
var Picker$1 = function Picker(_ref) {
  var color = _ref.color, onChange2 = _ref.onChange, prefixCls = _ref.prefixCls, onChangeComplete = _ref.onChangeComplete, disabled = _ref.disabled;
  var pickerRef = reactExports.useRef();
  var transformRef = reactExports.useRef();
  var colorRef = reactExports.useRef(color);
  var onDragChange = useEvent$1(function(offsetValue) {
    var calcColor = calculateColor({
      offset: offsetValue,
      targetRef: transformRef,
      containerRef: pickerRef,
      color
    });
    colorRef.current = calcColor;
    onChange2(calcColor);
  });
  var _useColorDrag = useColorDrag({
    color,
    containerRef: pickerRef,
    targetRef: transformRef,
    calculate: function calculate() {
      return calcOffset(color);
    },
    onDragChange,
    onDragChangeComplete: function onDragChangeComplete() {
      return onChangeComplete === null || onChangeComplete === void 0 ? void 0 : onChangeComplete(colorRef.current);
    },
    disabledDrag: disabled
  }), _useColorDrag2 = _slicedToArray(_useColorDrag, 2), offset = _useColorDrag2[0], dragStartHandle = _useColorDrag2[1];
  return /* @__PURE__ */ React.createElement("div", {
    ref: pickerRef,
    className: "".concat(prefixCls, "-select"),
    onMouseDown: dragStartHandle,
    onTouchStart: dragStartHandle
  }, /* @__PURE__ */ React.createElement(Palette, {
    prefixCls
  }, /* @__PURE__ */ React.createElement(Transform, {
    x: offset.x,
    y: offset.y,
    ref: transformRef
  }, /* @__PURE__ */ React.createElement(Handler, {
    color: color.toRgbString(),
    prefixCls
  })), /* @__PURE__ */ React.createElement("div", {
    className: "".concat(prefixCls, "-saturation"),
    style: {
      backgroundColor: "hsl(".concat(color.toHsb().h, ",100%, 50%)"),
      backgroundImage: "linear-gradient(0deg, #000, transparent),linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0))"
    }
  })));
};
var useColorState = function useColorState2(defaultValue2, value) {
  var _useMergedState = useMergedState(defaultValue2, {
    value
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedValue = _useMergedState2[0], setValue = _useMergedState2[1];
  var color = reactExports.useMemo(function() {
    return generateColor(mergedValue);
  }, [mergedValue]);
  return [color, setValue];
};
var Gradient = function Gradient2(_ref) {
  var colors = _ref.colors, children = _ref.children, _ref$direction = _ref.direction, direction = _ref$direction === void 0 ? "to right" : _ref$direction, type = _ref.type, prefixCls = _ref.prefixCls;
  var gradientColors = reactExports.useMemo(function() {
    return colors.map(function(color, idx) {
      var result = generateColor(color);
      if (type === "alpha" && idx === colors.length - 1) {
        result = new Color(result.setA(1));
      }
      return result.toRgbString();
    }).join(",");
  }, [colors, type]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "".concat(prefixCls, "-gradient"),
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(".concat(direction, ", ").concat(gradientColors, ")")
    }
  }, children);
};
var Slider$2 = function Slider(props) {
  var prefixCls = props.prefixCls, colors = props.colors, disabled = props.disabled, onChange2 = props.onChange, onChangeComplete = props.onChangeComplete, color = props.color, type = props.type;
  var sliderRef = reactExports.useRef();
  var transformRef = reactExports.useRef();
  var colorRef = reactExports.useRef(color);
  var getValue = function getValue2(c) {
    return type === "hue" ? c.getHue() : c.a * 100;
  };
  var onDragChange = useEvent$1(function(offsetValue) {
    var calcColor = calculateColor({
      offset: offsetValue,
      targetRef: transformRef,
      containerRef: sliderRef,
      color,
      type
    });
    colorRef.current = calcColor;
    onChange2(getValue(calcColor));
  });
  var _useColorDrag = useColorDrag({
    color,
    targetRef: transformRef,
    containerRef: sliderRef,
    calculate: function calculate() {
      return calcOffset(color, type);
    },
    onDragChange,
    onDragChangeComplete: function onDragChangeComplete() {
      onChangeComplete(getValue(colorRef.current));
    },
    direction: "x",
    disabledDrag: disabled
  }), _useColorDrag2 = _slicedToArray(_useColorDrag, 2), offset = _useColorDrag2[0], dragStartHandle = _useColorDrag2[1];
  var handleColor = React.useMemo(function() {
    if (type === "hue") {
      var hsb = color.toHsb();
      hsb.s = 1;
      hsb.b = 1;
      hsb.a = 1;
      var lightColor = new Color(hsb);
      return lightColor;
    }
    return color;
  }, [color, type]);
  var gradientList = React.useMemo(function() {
    return colors.map(function(info) {
      return "".concat(info.color, " ").concat(info.percent, "%");
    });
  }, [colors]);
  return /* @__PURE__ */ React.createElement("div", {
    ref: sliderRef,
    className: classNames("".concat(prefixCls, "-slider"), "".concat(prefixCls, "-slider-").concat(type)),
    onMouseDown: dragStartHandle,
    onTouchStart: dragStartHandle
  }, /* @__PURE__ */ React.createElement(Palette, {
    prefixCls
  }, /* @__PURE__ */ React.createElement(Transform, {
    x: offset.x,
    y: offset.y,
    ref: transformRef
  }, /* @__PURE__ */ React.createElement(Handler, {
    size: "small",
    color: handleColor.toHexString(),
    prefixCls
  })), /* @__PURE__ */ React.createElement(Gradient, {
    colors: gradientList,
    type,
    prefixCls
  })));
};
function useComponent(components2) {
  return reactExports.useMemo(function() {
    var _ref = components2 || {}, slider = _ref.slider;
    return [slider || Slider$2];
  }, [components2]);
}
var HUE_COLORS = [{
  color: "rgb(255, 0, 0)",
  percent: 0
}, {
  color: "rgb(255, 255, 0)",
  percent: 17
}, {
  color: "rgb(0, 255, 0)",
  percent: 33
}, {
  color: "rgb(0, 255, 255)",
  percent: 50
}, {
  color: "rgb(0, 0, 255)",
  percent: 67
}, {
  color: "rgb(255, 0, 255)",
  percent: 83
}, {
  color: "rgb(255, 0, 0)",
  percent: 100
}];
var ColorPicker$1 = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var value = props.value, defaultValue2 = props.defaultValue, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? ColorPickerPrefixCls : _props$prefixCls, onChange2 = props.onChange, onChangeComplete = props.onChangeComplete, className = props.className, style = props.style, panelRender = props.panelRender, _props$disabledAlpha = props.disabledAlpha, disabledAlpha = _props$disabledAlpha === void 0 ? false : _props$disabledAlpha, _props$disabled = props.disabled, disabled = _props$disabled === void 0 ? false : _props$disabled, components2 = props.components;
  var _useComponent = useComponent(components2), _useComponent2 = _slicedToArray(_useComponent, 1), Slider3 = _useComponent2[0];
  var _useColorState = useColorState(defaultValue2 || defaultColor, value), _useColorState2 = _slicedToArray(_useColorState, 2), colorValue = _useColorState2[0], setColorValue = _useColorState2[1];
  var alphaColor = reactExports.useMemo(function() {
    return colorValue.setA(1).toRgbString();
  }, [colorValue]);
  var handleChange = function handleChange2(data, type) {
    if (!value) {
      setColorValue(data);
    }
    onChange2 === null || onChange2 === void 0 || onChange2(data, type);
  };
  var getHueColor = function getHueColor2(hue) {
    return new Color(colorValue.setHue(hue));
  };
  var getAlphaColor = function getAlphaColor2(alpha) {
    return new Color(colorValue.setA(alpha / 100));
  };
  var onHueChange = function onHueChange2(hue) {
    handleChange(getHueColor(hue), {
      type: "hue",
      value: hue
    });
  };
  var onAlphaChange = function onAlphaChange2(alpha) {
    handleChange(getAlphaColor(alpha), {
      type: "alpha",
      value: alpha
    });
  };
  var onHueChangeComplete = function onHueChangeComplete2(hue) {
    if (onChangeComplete) {
      onChangeComplete(getHueColor(hue));
    }
  };
  var onAlphaChangeComplete = function onAlphaChangeComplete2(alpha) {
    if (onChangeComplete) {
      onChangeComplete(getAlphaColor(alpha));
    }
  };
  var mergeCls = classNames("".concat(prefixCls, "-panel"), className, _defineProperty({}, "".concat(prefixCls, "-panel-disabled"), disabled));
  var sharedSliderProps = {
    prefixCls,
    disabled,
    color: colorValue
  };
  var defaultPanel = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Picker$1, _extends$2({
    onChange: handleChange
  }, sharedSliderProps, {
    onChangeComplete
  })), /* @__PURE__ */ React.createElement("div", {
    className: "".concat(prefixCls, "-slider-container")
  }, /* @__PURE__ */ React.createElement("div", {
    className: classNames("".concat(prefixCls, "-slider-group"), _defineProperty({}, "".concat(prefixCls, "-slider-group-disabled-alpha"), disabledAlpha))
  }, /* @__PURE__ */ React.createElement(Slider3, _extends$2({}, sharedSliderProps, {
    type: "hue",
    colors: HUE_COLORS,
    min: 0,
    max: 359,
    value: colorValue.getHue(),
    onChange: onHueChange,
    onChangeComplete: onHueChangeComplete
  })), !disabledAlpha && /* @__PURE__ */ React.createElement(Slider3, _extends$2({}, sharedSliderProps, {
    type: "alpha",
    colors: [{
      percent: 0,
      color: "rgba(255, 0, 4, 0)"
    }, {
      percent: 100,
      color: alphaColor
    }],
    min: 0,
    max: 100,
    value: colorValue.a * 100,
    onChange: onAlphaChange,
    onChangeComplete: onAlphaChangeComplete
  }))), /* @__PURE__ */ React.createElement(ColorBlock, {
    color: colorValue.toRgbString(),
    prefixCls
  })));
  return /* @__PURE__ */ React.createElement("div", {
    className: mergeCls,
    style,
    ref
  }, typeof panelRender === "function" ? panelRender(defaultPanel) : defaultPanel);
});
const getRenderPropValue = (propValue) => {
  if (!propValue) {
    return null;
  }
  return typeof propValue === "function" ? propValue() : propValue;
};
const genBaseStyle$3 = (token) => {
  const {
    componentCls,
    popoverColor,
    titleMinWidth,
    fontWeightStrong,
    innerPadding,
    boxShadowSecondary,
    colorTextHeading,
    borderRadiusLG,
    zIndexPopup,
    titleMarginBottom,
    colorBgElevated,
    popoverBg,
    titleBorderBottom,
    innerContentPadding,
    titlePadding
  } = token;
  return [
    {
      [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
        position: "absolute",
        top: 0,
        // use `left` to fix https://github.com/ant-design/ant-design/issues/39195
        left: {
          _skip_check_: true,
          value: 0
        },
        zIndex: zIndexPopup,
        fontWeight: "normal",
        whiteSpace: "normal",
        textAlign: "start",
        cursor: "auto",
        userSelect: "text",
        // When use `autoArrow`, origin will follow the arrow position
        "--valid-offset-x": "var(--arrow-offset-horizontal, var(--arrow-x))",
        transformOrigin: [`var(--valid-offset-x, 50%)`, `var(--arrow-y, 50%)`].join(" "),
        "--antd-arrow-background-color": colorBgElevated,
        width: "max-content",
        maxWidth: "100vw",
        "&-rtl": {
          direction: "rtl"
        },
        "&-hidden": {
          display: "none"
        },
        [`${componentCls}-content`]: {
          position: "relative"
        },
        [`${componentCls}-inner`]: {
          backgroundColor: popoverBg,
          backgroundClip: "padding-box",
          borderRadius: borderRadiusLG,
          boxShadow: boxShadowSecondary,
          padding: innerPadding
        },
        [`${componentCls}-title`]: {
          minWidth: titleMinWidth,
          marginBottom: titleMarginBottom,
          color: colorTextHeading,
          fontWeight: fontWeightStrong,
          borderBottom: titleBorderBottom,
          padding: titlePadding
        },
        [`${componentCls}-inner-content`]: {
          color: popoverColor,
          padding: innerContentPadding
        }
      })
    },
    // Arrow Style
    getArrowStyle(token, "var(--antd-arrow-background-color)"),
    // Pure Render
    {
      [`${componentCls}-pure`]: {
        position: "relative",
        maxWidth: "none",
        margin: token.sizePopupArrow,
        display: "inline-block",
        [`${componentCls}-content`]: {
          display: "inline-block"
        }
      }
    }
  ];
};
const genColorStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: PresetColors.map((colorKey) => {
      const lightColor = token[`${colorKey}6`];
      return {
        [`&${componentCls}-${colorKey}`]: {
          "--antd-arrow-background-color": lightColor,
          [`${componentCls}-inner`]: {
            backgroundColor: lightColor
          },
          [`${componentCls}-arrow`]: {
            background: "transparent"
          }
        }
      };
    })
  };
};
const prepareComponentToken$9 = (token) => {
  const {
    lineWidth,
    controlHeight,
    fontHeight,
    padding,
    wireframe,
    zIndexPopupBase,
    borderRadiusLG,
    marginXS,
    lineType,
    colorSplit,
    paddingSM
  } = token;
  const titlePaddingBlockDist = controlHeight - fontHeight;
  const popoverTitlePaddingBlockTop = titlePaddingBlockDist / 2;
  const popoverTitlePaddingBlockBottom = titlePaddingBlockDist / 2 - lineWidth;
  const popoverPaddingHorizontal = padding;
  return Object.assign(Object.assign(Object.assign({
    titleMinWidth: 177,
    zIndexPopup: zIndexPopupBase + 30
  }, getArrowToken(token)), getArrowOffsetToken({
    contentRadius: borderRadiusLG,
    limitVerticalRadius: true
  })), {
    // internal
    innerPadding: wireframe ? 0 : 12,
    titleMarginBottom: wireframe ? 0 : marginXS,
    titlePadding: wireframe ? `${popoverTitlePaddingBlockTop}px ${popoverPaddingHorizontal}px ${popoverTitlePaddingBlockBottom}px` : 0,
    titleBorderBottom: wireframe ? `${lineWidth}px ${lineType} ${colorSplit}` : "none",
    innerContentPadding: wireframe ? `${paddingSM}px ${popoverPaddingHorizontal}px` : 0
  });
};
const useStyle$b = genStyleHooks("Popover", (token) => {
  const {
    colorBgElevated,
    colorText
  } = token;
  const popoverToken = merge$1(token, {
    popoverBg: colorBgElevated,
    popoverColor: colorText
  });
  return [genBaseStyle$3(popoverToken), genColorStyle(popoverToken), initZoomMotion(popoverToken, "zoom-big")];
}, prepareComponentToken$9, {
  resetStyle: false,
  deprecatedTokens: [["width", "titleMinWidth"], ["minWidth", "titleMinWidth"]]
});
var __rest$i = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Overlay = ({
  title,
  content,
  prefixCls
}) => {
  if (!title && !content) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, title && /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-title`
  }, title), content && /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-inner-content`
  }, content));
};
const RawPurePanel = (props) => {
  const {
    hashId,
    prefixCls,
    className,
    style,
    placement = "top",
    title,
    content,
    children
  } = props;
  const titleNode = getRenderPropValue(title);
  const contentNode = getRenderPropValue(content);
  const cls = classNames(hashId, prefixCls, `${prefixCls}-pure`, `${prefixCls}-placement-${placement}`, className);
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: cls,
    style
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-arrow`
  }), /* @__PURE__ */ reactExports.createElement(Popup$1, Object.assign({}, props, {
    className: hashId,
    prefixCls
  }), children || /* @__PURE__ */ reactExports.createElement(Overlay, {
    prefixCls,
    title: titleNode,
    content: contentNode
  })));
};
const PurePanel$3 = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className
  } = props, restProps = __rest$i(props, ["prefixCls", "className"]);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("popover", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$b(prefixCls);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(RawPurePanel, Object.assign({}, restProps, {
    prefixCls,
    hashId,
    className: classNames(className, cssVarCls)
  })));
};
var __rest$h = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalPopover = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var _a, _b;
  const {
    prefixCls: customizePrefixCls,
    title,
    content,
    overlayClassName,
    placement = "top",
    trigger = "hover",
    children,
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    onOpenChange,
    overlayStyle = {},
    styles,
    classNames: popoverClassNames
  } = props, otherProps = __rest$h(props, ["prefixCls", "title", "content", "overlayClassName", "placement", "trigger", "children", "mouseEnterDelay", "mouseLeaveDelay", "onOpenChange", "overlayStyle", "styles", "classNames"]);
  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("popover");
  const prefixCls = getPrefixCls("popover", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$b(prefixCls);
  const rootPrefixCls = getPrefixCls();
  const rootClassNames = classNames(overlayClassName, hashId, cssVarCls, contextClassName, contextClassNames.root, popoverClassNames === null || popoverClassNames === void 0 ? void 0 : popoverClassNames.root);
  const bodyClassNames = classNames(contextClassNames.body, popoverClassNames === null || popoverClassNames === void 0 ? void 0 : popoverClassNames.body);
  const [open, setOpen] = useMergedState(false, {
    value: (_a = props.open) !== null && _a !== void 0 ? _a : props.visible,
    defaultValue: (_b = props.defaultOpen) !== null && _b !== void 0 ? _b : props.defaultVisible
  });
  const settingOpen = (value, e) => {
    setOpen(value, true);
    onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(value, e);
  };
  const onKeyDown = (e) => {
    if (e.keyCode === KeyCode.ESC) {
      settingOpen(false, e);
    }
  };
  const onInternalOpenChange = (value) => {
    settingOpen(value);
  };
  const titleNode = getRenderPropValue(title);
  const contentNode = getRenderPropValue(content);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(Tooltip, Object.assign({
    placement,
    trigger,
    mouseEnterDelay,
    mouseLeaveDelay
  }, otherProps, {
    prefixCls,
    classNames: {
      root: rootClassNames,
      body: bodyClassNames
    },
    styles: {
      root: Object.assign(Object.assign(Object.assign(Object.assign({}, contextStyles.root), contextStyle), overlayStyle), styles === null || styles === void 0 ? void 0 : styles.root),
      body: Object.assign(Object.assign({}, contextStyles.body), styles === null || styles === void 0 ? void 0 : styles.body)
    },
    ref,
    open,
    onOpenChange: onInternalOpenChange,
    overlay: titleNode || contentNode ? /* @__PURE__ */ reactExports.createElement(Overlay, {
      prefixCls,
      title: titleNode,
      content: contentNode
    }) : null,
    transitionName: getTransitionName(rootPrefixCls, "zoom-big", otherProps.transitionName),
    "data-popover-inject": true
  }), cloneElement(children, {
    onKeyDown: (e) => {
      var _a2, _b2;
      if (/* @__PURE__ */ reactExports.isValidElement(children)) {
        (_b2 = children === null || children === void 0 ? void 0 : (_a2 = children.props).onKeyDown) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, e);
      }
      onKeyDown(e);
    }
  })));
});
const Popover = InternalPopover;
Popover._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$3;
var LeftOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" } }] }, "name": "left", "theme": "outlined" };
var LeftOutlined = function LeftOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends$2({}, props, {
    ref,
    icon: LeftOutlined$1
  }));
};
var RefIcon$g = /* @__PURE__ */ reactExports.forwardRef(LeftOutlined);
var dayjs_min$1 = { exports: {} };
var dayjs_min = dayjs_min$1.exports;
var hasRequiredDayjs_min;
function requireDayjs_min() {
  if (hasRequiredDayjs_min) return dayjs_min$1.exports;
  hasRequiredDayjs_min = 1;
  (function(module, exports$1) {
    !(function(t, e) {
      module.exports = e();
    })(dayjs_min, (function() {
      var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
        var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
        return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
      } }, m = function(t2, e2, n2) {
        var r2 = String(t2);
        return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
      }, v = { s: m, z: function(t2) {
        var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
        return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
      }, m: function t2(e2, n2) {
        if (e2.date() < n2.date()) return -t2(n2, e2);
        var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
        return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
      }, a: function(t2) {
        return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
      }, p: function(t2) {
        return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t2) {
        return void 0 === t2;
      } }, g = "en", D = {};
      D[g] = M;
      var p = "$isDayjsObject", S = function(t2) {
        return t2 instanceof _ || !(!t2 || !t2[p]);
      }, w = function t2(e2, n2, r2) {
        var i2;
        if (!e2) return g;
        if ("string" == typeof e2) {
          var s2 = e2.toLowerCase();
          D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
          var u2 = e2.split("-");
          if (!i2 && u2.length > 1) return t2(u2[0]);
        } else {
          var a2 = e2.name;
          D[a2] = e2, i2 = a2;
        }
        return !r2 && i2 && (g = i2), i2 || !r2 && g;
      }, O = function(t2, e2) {
        if (S(t2)) return t2.clone();
        var n2 = "object" == typeof e2 ? e2 : {};
        return n2.date = t2, n2.args = arguments, new _(n2);
      }, b = v;
      b.l = w, b.i = S, b.w = function(t2, e2) {
        return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
      };
      var _ = (function() {
        function M2(t2) {
          this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
        }
        var m2 = M2.prototype;
        return m2.parse = function(t2) {
          this.$d = (function(t3) {
            var e2 = t3.date, n2 = t3.utc;
            if (null === e2) return /* @__PURE__ */ new Date(NaN);
            if (b.u(e2)) return /* @__PURE__ */ new Date();
            if (e2 instanceof Date) return new Date(e2);
            if ("string" == typeof e2 && !/Z$/i.test(e2)) {
              var r2 = e2.match($);
              if (r2) {
                var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
              }
            }
            return new Date(e2);
          })(t2), this.init();
        }, m2.init = function() {
          var t2 = this.$d;
          this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
        }, m2.$utils = function() {
          return b;
        }, m2.isValid = function() {
          return !(this.$d.toString() === l);
        }, m2.isSame = function(t2, e2) {
          var n2 = O(t2);
          return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
        }, m2.isAfter = function(t2, e2) {
          return O(t2) < this.startOf(e2);
        }, m2.isBefore = function(t2, e2) {
          return this.endOf(e2) < O(t2);
        }, m2.$g = function(t2, e2, n2) {
          return b.u(t2) ? this[e2] : this.set(n2, t2);
        }, m2.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m2.valueOf = function() {
          return this.$d.getTime();
        }, m2.startOf = function(t2, e2) {
          var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
            var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
            return r2 ? i2 : i2.endOf(a);
          }, $2 = function(t3, e3) {
            return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
          }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
          switch (f2) {
            case h:
              return r2 ? l2(1, 0) : l2(31, 11);
            case c:
              return r2 ? l2(1, M3) : l2(0, M3 + 1);
            case o:
              var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
              return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
            case a:
            case d:
              return $2(v2 + "Hours", 0);
            case u:
              return $2(v2 + "Minutes", 1);
            case s:
              return $2(v2 + "Seconds", 2);
            case i:
              return $2(v2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m2.endOf = function(t2) {
          return this.startOf(t2, false);
        }, m2.$set = function(t2, e2) {
          var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
          if (o2 === c || o2 === h) {
            var y2 = this.clone().set(d, 1);
            y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
          } else l2 && this.$d[l2]($2);
          return this.init(), this;
        }, m2.set = function(t2, e2) {
          return this.clone().$set(t2, e2);
        }, m2.get = function(t2) {
          return this[b.p(t2)]();
        }, m2.add = function(r2, f2) {
          var d2, l2 = this;
          r2 = Number(r2);
          var $2 = b.p(f2), y2 = function(t2) {
            var e2 = O(l2);
            return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
          };
          if ($2 === c) return this.set(c, this.$M + r2);
          if ($2 === h) return this.set(h, this.$y + r2);
          if ($2 === a) return y2(1);
          if ($2 === o) return y2(7);
          var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
          return b.w(m3, this);
        }, m2.subtract = function(t2, e2) {
          return this.add(-1 * t2, e2);
        }, m2.format = function(t2) {
          var e2 = this, n2 = this.$locale();
          if (!this.isValid()) return n2.invalidDate || l;
          var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {
            return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
          }, d2 = function(t3) {
            return b.s(s2 % 12 || 12, t3, "0");
          }, $2 = f2 || function(t3, e3, n3) {
            var r3 = t3 < 12 ? "AM" : "PM";
            return n3 ? r3.toLowerCase() : r3;
          };
          return r2.replace(y, (function(t3, r3) {
            return r3 || (function(t4) {
              switch (t4) {
                case "YY":
                  return String(e2.$y).slice(-2);
                case "YYYY":
                  return b.s(e2.$y, 4, "0");
                case "M":
                  return a2 + 1;
                case "MM":
                  return b.s(a2 + 1, 2, "0");
                case "MMM":
                  return h2(n2.monthsShort, a2, c2, 3);
                case "MMMM":
                  return h2(c2, a2);
                case "D":
                  return e2.$D;
                case "DD":
                  return b.s(e2.$D, 2, "0");
                case "d":
                  return String(e2.$W);
                case "dd":
                  return h2(n2.weekdaysMin, e2.$W, o2, 2);
                case "ddd":
                  return h2(n2.weekdaysShort, e2.$W, o2, 3);
                case "dddd":
                  return o2[e2.$W];
                case "H":
                  return String(s2);
                case "HH":
                  return b.s(s2, 2, "0");
                case "h":
                  return d2(1);
                case "hh":
                  return d2(2);
                case "a":
                  return $2(s2, u2, true);
                case "A":
                  return $2(s2, u2, false);
                case "m":
                  return String(u2);
                case "mm":
                  return b.s(u2, 2, "0");
                case "s":
                  return String(e2.$s);
                case "ss":
                  return b.s(e2.$s, 2, "0");
                case "SSS":
                  return b.s(e2.$ms, 3, "0");
                case "Z":
                  return i2;
              }
              return null;
            })(t3) || i2.replace(":", "");
          }));
        }, m2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m2.diff = function(r2, d2, l2) {
          var $2, y2 = this, M3 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
            return b.m(y2, m3);
          };
          switch (M3) {
            case h:
              $2 = D2() / 12;
              break;
            case c:
              $2 = D2();
              break;
            case f:
              $2 = D2() / 3;
              break;
            case o:
              $2 = (g2 - v2) / 6048e5;
              break;
            case a:
              $2 = (g2 - v2) / 864e5;
              break;
            case u:
              $2 = g2 / n;
              break;
            case s:
              $2 = g2 / e;
              break;
            case i:
              $2 = g2 / t;
              break;
            default:
              $2 = g2;
          }
          return l2 ? $2 : b.a($2);
        }, m2.daysInMonth = function() {
          return this.endOf(c).$D;
        }, m2.$locale = function() {
          return D[this.$L];
        }, m2.locale = function(t2, e2) {
          if (!t2) return this.$L;
          var n2 = this.clone(), r2 = w(t2, e2, true);
          return r2 && (n2.$L = r2), n2;
        }, m2.clone = function() {
          return b.w(this.$d, this);
        }, m2.toDate = function() {
          return new Date(this.valueOf());
        }, m2.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m2.toISOString = function() {
          return this.$d.toISOString();
        }, m2.toString = function() {
          return this.$d.toUTCString();
        }, M2;
      })(), k = _.prototype;
      return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach((function(t2) {
        k[t2[1]] = function(e2) {
          return this.$g(e2, t2[0], t2[1]);
        };
      })), O.extend = function(t2, e2) {
        return t2.$i || (t2(e2, _, O), t2.$i = true), O;
      }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
        return O(1e3 * t2);
      }, O.en = D[g], O.Ls = D, O.p = {}, O;
    }));
  })(dayjs_min$1);
  return dayjs_min$1.exports;
}
var dayjs_minExports = requireDayjs_min();
const dayjs = /* @__PURE__ */ getDefaultExportFromCjs(dayjs_minExports);
var weekday$2 = { exports: {} };
var weekday$1 = weekday$2.exports;
var hasRequiredWeekday;
function requireWeekday() {
  if (hasRequiredWeekday) return weekday$2.exports;
  hasRequiredWeekday = 1;
  (function(module, exports$1) {
    !(function(e, t) {
      module.exports = t();
    })(weekday$1, (function() {
      return function(e, t) {
        t.prototype.weekday = function(e2) {
          var t2 = this.$locale().weekStart || 0, i = this.$W, n = (i < t2 ? i + 7 : i) - t2;
          return this.$utils().u(e2) ? n : this.subtract(n, "day").add(e2, "day");
        };
      };
    }));
  })(weekday$2);
  return weekday$2.exports;
}
var weekdayExports = requireWeekday();
const weekday = /* @__PURE__ */ getDefaultExportFromCjs(weekdayExports);
var localeData$2 = { exports: {} };
var localeData$1 = localeData$2.exports;
var hasRequiredLocaleData;
function requireLocaleData() {
  if (hasRequiredLocaleData) return localeData$2.exports;
  hasRequiredLocaleData = 1;
  (function(module, exports$1) {
    !(function(n, e) {
      module.exports = e();
    })(localeData$1, (function() {
      return function(n, e, t) {
        var r = e.prototype, o = function(n2) {
          return n2 && (n2.indexOf ? n2 : n2.s);
        }, u = function(n2, e2, t2, r2, u2) {
          var i2 = n2.name ? n2 : n2.$locale(), a2 = o(i2[e2]), s2 = o(i2[t2]), f = a2 || s2.map((function(n3) {
            return n3.slice(0, r2);
          }));
          if (!u2) return f;
          var d = i2.weekStart;
          return f.map((function(n3, e3) {
            return f[(e3 + (d || 0)) % 7];
          }));
        }, i = function() {
          return t.Ls[t.locale()];
        }, a = function(n2, e2) {
          return n2.formats[e2] || (function(n3) {
            return n3.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(n4, e3, t2) {
              return e3 || t2.slice(1);
            }));
          })(n2.formats[e2.toUpperCase()]);
        }, s = function() {
          var n2 = this;
          return { months: function(e2) {
            return e2 ? e2.format("MMMM") : u(n2, "months");
          }, monthsShort: function(e2) {
            return e2 ? e2.format("MMM") : u(n2, "monthsShort", "months", 3);
          }, firstDayOfWeek: function() {
            return n2.$locale().weekStart || 0;
          }, weekdays: function(e2) {
            return e2 ? e2.format("dddd") : u(n2, "weekdays");
          }, weekdaysMin: function(e2) {
            return e2 ? e2.format("dd") : u(n2, "weekdaysMin", "weekdays", 2);
          }, weekdaysShort: function(e2) {
            return e2 ? e2.format("ddd") : u(n2, "weekdaysShort", "weekdays", 3);
          }, longDateFormat: function(e2) {
            return a(n2.$locale(), e2);
          }, meridiem: this.$locale().meridiem, ordinal: this.$locale().ordinal };
        };
        r.localeData = function() {
          return s.bind(this)();
        }, t.localeData = function() {
          var n2 = i();
          return { firstDayOfWeek: function() {
            return n2.weekStart || 0;
          }, weekdays: function() {
            return t.weekdays();
          }, weekdaysShort: function() {
            return t.weekdaysShort();
          }, weekdaysMin: function() {
            return t.weekdaysMin();
          }, months: function() {
            return t.months();
          }, monthsShort: function() {
            return t.monthsShort();
          }, longDateFormat: function(e2) {
            return a(n2, e2);
          }, meridiem: n2.meridiem, ordinal: n2.ordinal };
        }, t.months = function() {
          return u(i(), "months");
        }, t.monthsShort = function() {
          return u(i(), "monthsShort", "months", 3);
        }, t.weekdays = function(n2) {
          return u(i(), "weekdays", null, null, n2);
        }, t.weekdaysShort = function(n2) {
          return u(i(), "weekdaysShort", "weekdays", 3, n2);
        }, t.weekdaysMin = function(n2) {
          return u(i(), "weekdaysMin", "weekdays", 2, n2);
        };
      };
    }));
  })(localeData$2);
  return localeData$2.exports;
}
var localeDataExports = requireLocaleData();
const localeData = /* @__PURE__ */ getDefaultExportFromCjs(localeDataExports);
var weekOfYear$2 = { exports: {} };
var weekOfYear$1 = weekOfYear$2.exports;
var hasRequiredWeekOfYear;
function requireWeekOfYear() {
  if (hasRequiredWeekOfYear) return weekOfYear$2.exports;
  hasRequiredWeekOfYear = 1;
  (function(module, exports$1) {
    !(function(e, t) {
      module.exports = t();
    })(weekOfYear$1, (function() {
      var e = "week", t = "year";
      return function(i, n, r) {
        var f = n.prototype;
        f.week = function(i2) {
          if (void 0 === i2 && (i2 = null), null !== i2) return this.add(7 * (i2 - this.week()), "day");
          var n2 = this.$locale().yearStart || 1;
          if (11 === this.month() && this.date() > 25) {
            var f2 = r(this).startOf(t).add(1, t).date(n2), s = r(this).endOf(e);
            if (f2.isBefore(s)) return 1;
          }
          var a = r(this).startOf(t).date(n2).startOf(e).subtract(1, "millisecond"), o = this.diff(a, e, true);
          return o < 0 ? r(this).startOf("week").week() : Math.ceil(o);
        }, f.weeks = function(e2) {
          return void 0 === e2 && (e2 = null), this.week(e2);
        };
      };
    }));
  })(weekOfYear$2);
  return weekOfYear$2.exports;
}
var weekOfYearExports = requireWeekOfYear();
const weekOfYear = /* @__PURE__ */ getDefaultExportFromCjs(weekOfYearExports);
var weekYear$2 = { exports: {} };
var weekYear$1 = weekYear$2.exports;
var hasRequiredWeekYear;
function requireWeekYear() {
  if (hasRequiredWeekYear) return weekYear$2.exports;
  hasRequiredWeekYear = 1;
  (function(module, exports$1) {
    !(function(e, t) {
      module.exports = t();
    })(weekYear$1, (function() {
      return function(e, t) {
        t.prototype.weekYear = function() {
          var e2 = this.month(), t2 = this.week(), n = this.year();
          return 1 === t2 && 11 === e2 ? n + 1 : 0 === e2 && t2 >= 52 ? n - 1 : n;
        };
      };
    }));
  })(weekYear$2);
  return weekYear$2.exports;
}
var weekYearExports = requireWeekYear();
const weekYear = /* @__PURE__ */ getDefaultExportFromCjs(weekYearExports);
var advancedFormat$2 = { exports: {} };
var advancedFormat$1 = advancedFormat$2.exports;
var hasRequiredAdvancedFormat;
function requireAdvancedFormat() {
  if (hasRequiredAdvancedFormat) return advancedFormat$2.exports;
  hasRequiredAdvancedFormat = 1;
  (function(module, exports$1) {
    !(function(e, t) {
      module.exports = t();
    })(advancedFormat$1, (function() {
      return function(e, t) {
        var r = t.prototype, n = r.format;
        r.format = function(e2) {
          var t2 = this, r2 = this.$locale();
          if (!this.isValid()) return n.bind(this)(e2);
          var s = this.$utils(), a = (e2 || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, (function(e3) {
            switch (e3) {
              case "Q":
                return Math.ceil((t2.$M + 1) / 3);
              case "Do":
                return r2.ordinal(t2.$D);
              case "gggg":
                return t2.weekYear();
              case "GGGG":
                return t2.isoWeekYear();
              case "wo":
                return r2.ordinal(t2.week(), "W");
              case "w":
              case "ww":
                return s.s(t2.week(), "w" === e3 ? 1 : 2, "0");
              case "W":
              case "WW":
                return s.s(t2.isoWeek(), "W" === e3 ? 1 : 2, "0");
              case "k":
              case "kk":
                return s.s(String(0 === t2.$H ? 24 : t2.$H), "k" === e3 ? 1 : 2, "0");
              case "X":
                return Math.floor(t2.$d.getTime() / 1e3);
              case "x":
                return t2.$d.getTime();
              case "z":
                return "[" + t2.offsetName() + "]";
              case "zzz":
                return "[" + t2.offsetName("long") + "]";
              default:
                return e3;
            }
          }));
          return n.bind(this)(a);
        };
      };
    }));
  })(advancedFormat$2);
  return advancedFormat$2.exports;
}
var advancedFormatExports = requireAdvancedFormat();
const advancedFormat = /* @__PURE__ */ getDefaultExportFromCjs(advancedFormatExports);
var customParseFormat$2 = { exports: {} };
var customParseFormat$1 = customParseFormat$2.exports;
var hasRequiredCustomParseFormat;
function requireCustomParseFormat() {
  if (hasRequiredCustomParseFormat) return customParseFormat$2.exports;
  hasRequiredCustomParseFormat = 1;
  (function(module, exports$1) {
    !(function(e, t) {
      module.exports = t();
    })(customParseFormat$1, (function() {
      var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, r = /\d\d/, i = /\d\d?/, o = /\d*[^-_:/,()\s\d]+/, s = {}, a = function(e2) {
        return (e2 = +e2) + (e2 > 68 ? 1900 : 2e3);
      };
      var f = function(e2) {
        return function(t2) {
          this[e2] = +t2;
        };
      }, h = [/[+-]\d\d:?(\d\d)?|Z/, function(e2) {
        (this.zone || (this.zone = {})).offset = (function(e3) {
          if (!e3) return 0;
          if ("Z" === e3) return 0;
          var t2 = e3.match(/([+-]|\d\d)/g), n2 = 60 * t2[1] + (+t2[2] || 0);
          return 0 === n2 ? 0 : "+" === t2[0] ? -n2 : n2;
        })(e2);
      }], u = function(e2) {
        var t2 = s[e2];
        return t2 && (t2.indexOf ? t2 : t2.s.concat(t2.f));
      }, d = function(e2, t2) {
        var n2, r2 = s.meridiem;
        if (r2) {
          for (var i2 = 1; i2 <= 24; i2 += 1) if (e2.indexOf(r2(i2, 0, t2)) > -1) {
            n2 = i2 > 12;
            break;
          }
        } else n2 = e2 === (t2 ? "pm" : "PM");
        return n2;
      }, c = { A: [o, function(e2) {
        this.afternoon = d(e2, false);
      }], a: [o, function(e2) {
        this.afternoon = d(e2, true);
      }], Q: [n, function(e2) {
        this.month = 3 * (e2 - 1) + 1;
      }], S: [n, function(e2) {
        this.milliseconds = 100 * +e2;
      }], SS: [r, function(e2) {
        this.milliseconds = 10 * +e2;
      }], SSS: [/\d{3}/, function(e2) {
        this.milliseconds = +e2;
      }], s: [i, f("seconds")], ss: [i, f("seconds")], m: [i, f("minutes")], mm: [i, f("minutes")], H: [i, f("hours")], h: [i, f("hours")], HH: [i, f("hours")], hh: [i, f("hours")], D: [i, f("day")], DD: [r, f("day")], Do: [o, function(e2) {
        var t2 = s.ordinal, n2 = e2.match(/\d+/);
        if (this.day = n2[0], t2) for (var r2 = 1; r2 <= 31; r2 += 1) t2(r2).replace(/\[|\]/g, "") === e2 && (this.day = r2);
      }], w: [i, f("week")], ww: [r, f("week")], M: [i, f("month")], MM: [r, f("month")], MMM: [o, function(e2) {
        var t2 = u("months"), n2 = (u("monthsShort") || t2.map((function(e3) {
          return e3.slice(0, 3);
        }))).indexOf(e2) + 1;
        if (n2 < 1) throw new Error();
        this.month = n2 % 12 || n2;
      }], MMMM: [o, function(e2) {
        var t2 = u("months").indexOf(e2) + 1;
        if (t2 < 1) throw new Error();
        this.month = t2 % 12 || t2;
      }], Y: [/[+-]?\d+/, f("year")], YY: [r, function(e2) {
        this.year = a(e2);
      }], YYYY: [/\d{4}/, f("year")], Z: h, ZZ: h };
      function l(n2) {
        var r2, i2;
        r2 = n2, i2 = s && s.formats;
        for (var o2 = (n2 = r2.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(t2, n3, r3) {
          var o3 = r3 && r3.toUpperCase();
          return n3 || i2[r3] || e[r3] || i2[o3].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(e2, t3, n4) {
            return t3 || n4.slice(1);
          }));
        }))).match(t), a2 = o2.length, f2 = 0; f2 < a2; f2 += 1) {
          var h2 = o2[f2], u2 = c[h2], d2 = u2 && u2[0], l2 = u2 && u2[1];
          o2[f2] = l2 ? { regex: d2, parser: l2 } : h2.replace(/^\[|\]$/g, "");
        }
        return function(e2) {
          for (var t2 = {}, n3 = 0, r3 = 0; n3 < a2; n3 += 1) {
            var i3 = o2[n3];
            if ("string" == typeof i3) r3 += i3.length;
            else {
              var s2 = i3.regex, f3 = i3.parser, h3 = e2.slice(r3), u3 = s2.exec(h3)[0];
              f3.call(t2, u3), e2 = e2.replace(u3, "");
            }
          }
          return (function(e3) {
            var t3 = e3.afternoon;
            if (void 0 !== t3) {
              var n4 = e3.hours;
              t3 ? n4 < 12 && (e3.hours += 12) : 12 === n4 && (e3.hours = 0), delete e3.afternoon;
            }
          })(t2), t2;
        };
      }
      return function(e2, t2, n2) {
        n2.p.customParseFormat = true, e2 && e2.parseTwoDigitYear && (a = e2.parseTwoDigitYear);
        var r2 = t2.prototype, i2 = r2.parse;
        r2.parse = function(e3) {
          var t3 = e3.date, r3 = e3.utc, o2 = e3.args;
          this.$u = r3;
          var a2 = o2[1];
          if ("string" == typeof a2) {
            var f2 = true === o2[2], h2 = true === o2[3], u2 = f2 || h2, d2 = o2[2];
            h2 && (d2 = o2[2]), s = this.$locale(), !f2 && d2 && (s = n2.Ls[d2]), this.$d = (function(e4, t4, n3, r4) {
              try {
                if (["x", "X"].indexOf(t4) > -1) return new Date(("X" === t4 ? 1e3 : 1) * e4);
                var i3 = l(t4)(e4), o3 = i3.year, s2 = i3.month, a3 = i3.day, f3 = i3.hours, h3 = i3.minutes, u3 = i3.seconds, d3 = i3.milliseconds, c3 = i3.zone, m2 = i3.week, M2 = /* @__PURE__ */ new Date(), Y = a3 || (o3 || s2 ? 1 : M2.getDate()), p = o3 || M2.getFullYear(), v = 0;
                o3 && !s2 || (v = s2 > 0 ? s2 - 1 : M2.getMonth());
                var D, w = f3 || 0, g = h3 || 0, y = u3 || 0, L = d3 || 0;
                return c3 ? new Date(Date.UTC(p, v, Y, w, g, y, L + 60 * c3.offset * 1e3)) : n3 ? new Date(Date.UTC(p, v, Y, w, g, y, L)) : (D = new Date(p, v, Y, w, g, y, L), m2 && (D = r4(D).week(m2).toDate()), D);
              } catch (e5) {
                return /* @__PURE__ */ new Date("");
              }
            })(t3, a2, r3, n2), this.init(), d2 && true !== d2 && (this.$L = this.locale(d2).$L), u2 && t3 != this.format(a2) && (this.$d = /* @__PURE__ */ new Date("")), s = {};
          } else if (a2 instanceof Array) for (var c2 = a2.length, m = 1; m <= c2; m += 1) {
            o2[1] = a2[m - 1];
            var M = n2.apply(this, o2);
            if (M.isValid()) {
              this.$d = M.$d, this.$L = M.$L, this.init();
              break;
            }
            m === c2 && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else i2.call(this, e3);
        };
      };
    }));
  })(customParseFormat$2);
  return customParseFormat$2.exports;
}
var customParseFormatExports = requireCustomParseFormat();
const customParseFormat = /* @__PURE__ */ getDefaultExportFromCjs(customParseFormatExports);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(function(o, c) {
  var proto = c.prototype;
  var oldFormat = proto.format;
  proto.format = function f(formatStr) {
    var str = (formatStr || "").replace("Wo", "wo");
    return oldFormat.bind(this)(str);
  };
});
var localeMap = {
  // ar_EG:
  // az_AZ:
  // bg_BG:
  bn_BD: "bn-bd",
  by_BY: "be",
  // ca_ES:
  // cs_CZ:
  // da_DK:
  // de_DE:
  // el_GR:
  en_GB: "en-gb",
  en_US: "en",
  // es_ES:
  // et_EE:
  // fa_IR:
  // fi_FI:
  fr_BE: "fr",
  // todo: dayjs has no fr_BE locale, use fr at present
  fr_CA: "fr-ca",
  // fr_FR:
  // ga_IE:
  // gl_ES:
  // he_IL:
  // hi_IN:
  // hr_HR:
  // hu_HU:
  hy_AM: "hy-am",
  // id_ID:
  // is_IS:
  // it_IT:
  // ja_JP:
  // ka_GE:
  // kk_KZ:
  // km_KH:
  kmr_IQ: "ku",
  // kn_IN:
  // ko_KR:
  // ku_IQ: // previous ku in antd
  // lt_LT:
  // lv_LV:
  // mk_MK:
  // ml_IN:
  // mn_MN:
  // ms_MY:
  // nb_NO:
  // ne_NP:
  nl_BE: "nl-be",
  // nl_NL:
  // pl_PL:
  pt_BR: "pt-br",
  // pt_PT:
  // ro_RO:
  // ru_RU:
  // sk_SK:
  // sl_SI:
  // sr_RS:
  // sv_SE:
  // ta_IN:
  // th_TH:
  // tr_TR:
  // uk_UA:
  // ur_PK:
  // vi_VN:
  zh_CN: "zh-cn",
  zh_HK: "zh-hk",
  zh_TW: "zh-tw"
};
var parseLocale = function parseLocale2(locale2) {
  var mapLocale = localeMap[locale2];
  return mapLocale || locale2.split("_")[0];
};
var generateConfig = {
  // get
  getNow: function getNow() {
    var now2 = dayjs();
    if (typeof now2.tz === "function") {
      return now2.tz();
    }
    return now2;
  },
  getFixedDate: function getFixedDate(string) {
    return dayjs(string, ["YYYY-M-DD", "YYYY-MM-DD"]);
  },
  getEndDate: function getEndDate(date) {
    return date.endOf("month");
  },
  getWeekDay: function getWeekDay(date) {
    var clone2 = date.locale("en");
    return clone2.weekday() + clone2.localeData().firstDayOfWeek();
  },
  getYear: function getYear(date) {
    return date.year();
  },
  getMonth: function getMonth(date) {
    return date.month();
  },
  getDate: function getDate(date) {
    return date.date();
  },
  getHour: function getHour(date) {
    return date.hour();
  },
  getMinute: function getMinute(date) {
    return date.minute();
  },
  getSecond: function getSecond(date) {
    return date.second();
  },
  getMillisecond: function getMillisecond(date) {
    return date.millisecond();
  },
  // set
  addYear: function addYear(date, diff) {
    return date.add(diff, "year");
  },
  addMonth: function addMonth(date, diff) {
    return date.add(diff, "month");
  },
  addDate: function addDate(date, diff) {
    return date.add(diff, "day");
  },
  setYear: function setYear(date, year) {
    return date.year(year);
  },
  setMonth: function setMonth(date, month) {
    return date.month(month);
  },
  setDate: function setDate(date, num) {
    return date.date(num);
  },
  setHour: function setHour(date, hour) {
    return date.hour(hour);
  },
  setMinute: function setMinute(date, minute) {
    return date.minute(minute);
  },
  setSecond: function setSecond(date, second) {
    return date.second(second);
  },
  setMillisecond: function setMillisecond(date, milliseconds) {
    return date.millisecond(milliseconds);
  },
  // Compare
  isAfter: function isAfter(date1, date2) {
    return date1.isAfter(date2);
  },
  isValidate: function isValidate(date) {
    return date.isValid();
  },
  locale: {
    getWeekFirstDay: function getWeekFirstDay(locale2) {
      return dayjs().locale(parseLocale(locale2)).localeData().firstDayOfWeek();
    },
    getWeekFirstDate: function getWeekFirstDate(locale2, date) {
      return date.locale(parseLocale(locale2)).weekday(0);
    },
    getWeek: function getWeek(locale2, date) {
      return date.locale(parseLocale(locale2)).week();
    },
    getShortWeekDays: function getShortWeekDays(locale2) {
      return dayjs().locale(parseLocale(locale2)).localeData().weekdaysMin();
    },
    getShortMonths: function getShortMonths(locale2) {
      return dayjs().locale(parseLocale(locale2)).localeData().monthsShort();
    },
    format: function format(locale2, date, _format) {
      return date.locale(parseLocale(locale2)).format(_format);
    },
    parse: function parse(locale2, text2, formats) {
      var localeStr = parseLocale(locale2);
      for (var i = 0; i < formats.length; i += 1) {
        var format2 = formats[i];
        var formatText = text2;
        if (format2.includes("wo") || format2.includes("Wo")) {
          var year = formatText.split("-")[0];
          var weekStr = formatText.split("-")[1];
          var firstWeek = dayjs(year, "YYYY").startOf("year").locale(localeStr);
          for (var j = 0; j <= 52; j += 1) {
            var nextWeek = firstWeek.add(j, "week");
            if (nextWeek.format("Wo") === weekStr) {
              return nextWeek;
            }
          }
          return null;
        }
        var date = dayjs(formatText, format2, true).locale(localeStr);
        if (date.isValid()) {
          return date;
        }
      }
      return null;
    }
  }
};
function getRealPlacement(placement, rtl) {
  if (placement !== void 0) {
    return placement;
  }
  return rtl ? "bottomRight" : "bottomLeft";
}
var PickerContext = /* @__PURE__ */ reactExports.createContext(null);
var BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ["tl", "bl"],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  bottomRight: {
    points: ["tr", "br"],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  topLeft: {
    points: ["bl", "tl"],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topRight: {
    points: ["br", "tr"],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  }
};
function PickerTrigger(_ref) {
  var popupElement = _ref.popupElement, popupStyle = _ref.popupStyle, popupClassName = _ref.popupClassName, popupAlign = _ref.popupAlign, transitionName = _ref.transitionName, getPopupContainer = _ref.getPopupContainer, children = _ref.children, range = _ref.range, placement = _ref.placement, _ref$builtinPlacement = _ref.builtinPlacements, builtinPlacements = _ref$builtinPlacement === void 0 ? BUILT_IN_PLACEMENTS : _ref$builtinPlacement, direction = _ref.direction, visible = _ref.visible, onClose = _ref.onClose;
  var _React$useContext = reactExports.useContext(PickerContext), prefixCls = _React$useContext.prefixCls;
  var dropdownPrefixCls = "".concat(prefixCls, "-dropdown");
  var realPlacement = getRealPlacement(placement, direction === "rtl");
  return /* @__PURE__ */ reactExports.createElement(Trigger, {
    showAction: [],
    hideAction: ["click"],
    popupPlacement: realPlacement,
    builtinPlacements,
    prefixCls: dropdownPrefixCls,
    popupTransitionName: transitionName,
    popup: popupElement,
    popupAlign,
    popupVisible: visible,
    popupClassName: classNames(popupClassName, _defineProperty(_defineProperty({}, "".concat(dropdownPrefixCls, "-range"), range), "".concat(dropdownPrefixCls, "-rtl"), direction === "rtl")),
    popupStyle,
    stretch: "minWidth",
    getPopupContainer,
    onPopupVisibleChange: function onPopupVisibleChange(nextVisible) {
      if (!nextVisible) {
        onClose();
      }
    }
  }, children);
}
function leftPad(str, length) {
  var fill = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  var current = String(str);
  while (current.length < length) {
    current = "".concat(fill).concat(current);
  }
  return current;
}
function toArray(val) {
  if (val === null || val === void 0) {
    return [];
  }
  return Array.isArray(val) ? val : [val];
}
function fillIndex(ori, index2, value) {
  var clone2 = _toConsumableArray(ori);
  clone2[index2] = value;
  return clone2;
}
function pickProps(props, keys) {
  var clone2 = {};
  var mergedKeys = keys || Object.keys(props);
  mergedKeys.forEach(function(key2) {
    if (props[key2] !== void 0) {
      clone2[key2] = props[key2];
    }
  });
  return clone2;
}
function getRowFormat(picker, locale2, format2) {
  if (format2) {
    return format2;
  }
  switch (picker) {
    // All from the `locale.fieldXXXFormat` first
    case "time":
      return locale2.fieldTimeFormat;
    case "datetime":
      return locale2.fieldDateTimeFormat;
    case "month":
      return locale2.fieldMonthFormat;
    case "year":
      return locale2.fieldYearFormat;
    case "quarter":
      return locale2.fieldQuarterFormat;
    case "week":
      return locale2.fieldWeekFormat;
    default:
      return locale2.fieldDateFormat;
  }
}
function getFromDate(calendarValues, activeIndexList, activeIndex) {
  var mergedActiveIndex = activeIndex !== void 0 ? activeIndex : activeIndexList[activeIndexList.length - 1];
  var firstValuedIndex = activeIndexList.find(function(index2) {
    return calendarValues[index2];
  });
  return mergedActiveIndex !== firstValuedIndex ? calendarValues[firstValuedIndex] : void 0;
}
function pickTriggerProps(props) {
  return pickProps(props, ["placement", "builtinPlacements", "popupAlign", "getPopupContainer", "transitionName", "direction"]);
}
function useCellRender(cellRender, dateRender, monthCellRender, range) {
  var mergedCellRender = reactExports.useMemo(function() {
    if (cellRender) {
      return cellRender;
    }
    return function(current, info) {
      var date = current;
      if (dateRender && info.type === "date") {
        return dateRender(date, info.today);
      }
      if (monthCellRender && info.type === "month") {
        return monthCellRender(date, info.locale);
      }
      return info.originNode;
    };
  }, [cellRender, monthCellRender, dateRender]);
  var onInternalCellRender = reactExports.useCallback(function(date, info) {
    return mergedCellRender(date, _objectSpread2(_objectSpread2({}, info), {}, {
      range
    }));
  }, [mergedCellRender, range]);
  return onInternalCellRender;
}
function useFieldsInvalidate(calendarValue, isInvalidateDate) {
  var allowEmpty = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
  var _React$useState = reactExports.useState([false, false]), _React$useState2 = _slicedToArray(_React$useState, 2), fieldsInvalidates = _React$useState2[0], setFieldsInvalidates = _React$useState2[1];
  var onSelectorInvalid = function onSelectorInvalid2(invalid, index2) {
    setFieldsInvalidates(function(ori) {
      return fillIndex(ori, index2, invalid);
    });
  };
  var submitInvalidates = reactExports.useMemo(function() {
    return fieldsInvalidates.map(function(invalid, index2) {
      if (invalid) {
        return true;
      }
      var current = calendarValue[index2];
      if (!current) {
        return false;
      }
      if (!allowEmpty[index2] && !current) {
        return true;
      }
      if (current && isInvalidateDate(current, {
        activeIndex: index2
      })) {
        return true;
      }
      return false;
    });
  }, [calendarValue, fieldsInvalidates, isInvalidateDate, allowEmpty]);
  return [submitInvalidates, onSelectorInvalid];
}
function fillTimeFormat(showHour, showMinute, showSecond, showMillisecond, showMeridiem) {
  var timeFormat = "";
  var cells = [];
  if (showHour) {
    cells.push(showMeridiem ? "hh" : "HH");
  }
  if (showMinute) {
    cells.push("mm");
  }
  if (showSecond) {
    cells.push("ss");
  }
  timeFormat = cells.join(":");
  if (showMillisecond) {
    timeFormat += ".SSS";
  }
  if (showMeridiem) {
    timeFormat += " A";
  }
  return timeFormat;
}
function fillLocale(locale2, showHour, showMinute, showSecond, showMillisecond, use12Hours) {
  var fieldDateTimeFormat = locale2.fieldDateTimeFormat, fieldDateFormat = locale2.fieldDateFormat, fieldTimeFormat = locale2.fieldTimeFormat, fieldMonthFormat = locale2.fieldMonthFormat, fieldYearFormat = locale2.fieldYearFormat, fieldWeekFormat = locale2.fieldWeekFormat, fieldQuarterFormat = locale2.fieldQuarterFormat, yearFormat = locale2.yearFormat, cellYearFormat = locale2.cellYearFormat, cellQuarterFormat = locale2.cellQuarterFormat, dayFormat = locale2.dayFormat, cellDateFormat = locale2.cellDateFormat;
  var timeFormat = fillTimeFormat(showHour, showMinute, showSecond, showMillisecond, use12Hours);
  return _objectSpread2(_objectSpread2({}, locale2), {}, {
    fieldDateTimeFormat: fieldDateTimeFormat || "YYYY-MM-DD ".concat(timeFormat),
    fieldDateFormat: fieldDateFormat || "YYYY-MM-DD",
    fieldTimeFormat: fieldTimeFormat || timeFormat,
    fieldMonthFormat: fieldMonthFormat || "YYYY-MM",
    fieldYearFormat: fieldYearFormat || "YYYY",
    fieldWeekFormat: fieldWeekFormat || "gggg-wo",
    fieldQuarterFormat: fieldQuarterFormat || "YYYY-[Q]Q",
    yearFormat: yearFormat || "YYYY",
    cellYearFormat: cellYearFormat || "YYYY",
    cellQuarterFormat: cellQuarterFormat || "[Q]Q",
    cellDateFormat: cellDateFormat || dayFormat || "D"
  });
}
function useLocale(locale2, showProps) {
  var showHour = showProps.showHour, showMinute = showProps.showMinute, showSecond = showProps.showSecond, showMillisecond = showProps.showMillisecond, use12Hours = showProps.use12Hours;
  return React.useMemo(function() {
    return fillLocale(locale2, showHour, showMinute, showSecond, showMillisecond, use12Hours);
  }, [locale2, showHour, showMinute, showSecond, showMillisecond, use12Hours]);
}
function checkShow(format2, keywords, show) {
  return show !== null && show !== void 0 ? show : keywords.some(function(keyword) {
    return format2.includes(keyword);
  });
}
var showTimeKeys = [
  // 'format',
  "showNow",
  "showHour",
  "showMinute",
  "showSecond",
  "showMillisecond",
  "use12Hours",
  "hourStep",
  "minuteStep",
  "secondStep",
  "millisecondStep",
  "hideDisabledOptions",
  "defaultValue",
  "disabledHours",
  "disabledMinutes",
  "disabledSeconds",
  "disabledMilliseconds",
  "disabledTime",
  "changeOnScroll",
  "defaultOpenValue"
];
function pickTimeProps(props) {
  var timeProps = pickProps(props, showTimeKeys);
  var format2 = props.format, picker = props.picker;
  var propFormat = null;
  if (format2) {
    propFormat = format2;
    if (Array.isArray(propFormat)) {
      propFormat = propFormat[0];
    }
    propFormat = _typeof(propFormat) === "object" ? propFormat.format : propFormat;
  }
  if (picker === "time") {
    timeProps.format = propFormat;
  }
  return [timeProps, propFormat];
}
function isStringFormat(format2) {
  return format2 && typeof format2 === "string";
}
function existShowConfig(showHour, showMinute, showSecond, showMillisecond) {
  return [showHour, showMinute, showSecond, showMillisecond].some(function(show) {
    return show !== void 0;
  });
}
function fillShowConfig(hasShowConfig, showHour, showMinute, showSecond, showMillisecond) {
  var parsedShowHour = showHour;
  var parsedShowMinute = showMinute;
  var parsedShowSecond = showSecond;
  if (!hasShowConfig && !parsedShowHour && !parsedShowMinute && !parsedShowSecond && !showMillisecond) {
    parsedShowHour = true;
    parsedShowMinute = true;
    parsedShowSecond = true;
  } else if (hasShowConfig) {
    var _parsedShowHour, _parsedShowMinute, _parsedShowSecond;
    var existFalse = [parsedShowHour, parsedShowMinute, parsedShowSecond].some(function(show) {
      return show === false;
    });
    var existTrue = [parsedShowHour, parsedShowMinute, parsedShowSecond].some(function(show) {
      return show === true;
    });
    var defaultShow = existFalse ? true : !existTrue;
    parsedShowHour = (_parsedShowHour = parsedShowHour) !== null && _parsedShowHour !== void 0 ? _parsedShowHour : defaultShow;
    parsedShowMinute = (_parsedShowMinute = parsedShowMinute) !== null && _parsedShowMinute !== void 0 ? _parsedShowMinute : defaultShow;
    parsedShowSecond = (_parsedShowSecond = parsedShowSecond) !== null && _parsedShowSecond !== void 0 ? _parsedShowSecond : defaultShow;
  }
  return [parsedShowHour, parsedShowMinute, parsedShowSecond, showMillisecond];
}
function getTimeProps(componentProps) {
  var showTime = componentProps.showTime;
  var _pickTimeProps = pickTimeProps(componentProps), _pickTimeProps2 = _slicedToArray(_pickTimeProps, 2), pickedProps = _pickTimeProps2[0], propFormat = _pickTimeProps2[1];
  var showTimeConfig = showTime && _typeof(showTime) === "object" ? showTime : {};
  var timeConfig = _objectSpread2(_objectSpread2({
    defaultOpenValue: showTimeConfig.defaultOpenValue || showTimeConfig.defaultValue
  }, pickedProps), showTimeConfig);
  var showMillisecond = timeConfig.showMillisecond;
  var showHour = timeConfig.showHour, showMinute = timeConfig.showMinute, showSecond = timeConfig.showSecond;
  var hasShowConfig = existShowConfig(showHour, showMinute, showSecond, showMillisecond);
  var _fillShowConfig = fillShowConfig(hasShowConfig, showHour, showMinute, showSecond, showMillisecond);
  var _fillShowConfig2 = _slicedToArray(_fillShowConfig, 3);
  showHour = _fillShowConfig2[0];
  showMinute = _fillShowConfig2[1];
  showSecond = _fillShowConfig2[2];
  return [timeConfig, _objectSpread2(_objectSpread2({}, timeConfig), {}, {
    showHour,
    showMinute,
    showSecond,
    showMillisecond
  }), timeConfig.format, propFormat];
}
function fillShowTimeConfig(picker, showTimeFormat, propFormat, timeConfig, locale2) {
  var isTimePicker = picker === "time";
  if (picker === "datetime" || isTimePicker) {
    var pickedProps = timeConfig;
    var defaultLocaleFormat = getRowFormat(picker, locale2, null);
    var baselineFormat = defaultLocaleFormat;
    var formatList = [showTimeFormat, propFormat];
    for (var i = 0; i < formatList.length; i += 1) {
      var format2 = toArray(formatList[i])[0];
      if (isStringFormat(format2)) {
        baselineFormat = format2;
        break;
      }
    }
    var showHour = pickedProps.showHour, showMinute = pickedProps.showMinute, showSecond = pickedProps.showSecond, showMillisecond = pickedProps.showMillisecond;
    var use12Hours = pickedProps.use12Hours;
    var showMeridiem = checkShow(baselineFormat, ["a", "A", "LT", "LLL", "LTS"], use12Hours);
    var hasShowConfig = existShowConfig(showHour, showMinute, showSecond, showMillisecond);
    if (!hasShowConfig) {
      showHour = checkShow(baselineFormat, ["H", "h", "k", "LT", "LLL"]);
      showMinute = checkShow(baselineFormat, ["m", "LT", "LLL"]);
      showSecond = checkShow(baselineFormat, ["s", "LTS"]);
      showMillisecond = checkShow(baselineFormat, ["SSS"]);
    }
    var _fillShowConfig3 = fillShowConfig(hasShowConfig, showHour, showMinute, showSecond, showMillisecond);
    var _fillShowConfig4 = _slicedToArray(_fillShowConfig3, 3);
    showHour = _fillShowConfig4[0];
    showMinute = _fillShowConfig4[1];
    showSecond = _fillShowConfig4[2];
    var timeFormat = showTimeFormat || fillTimeFormat(showHour, showMinute, showSecond, showMillisecond, showMeridiem);
    return _objectSpread2(_objectSpread2({}, pickedProps), {}, {
      // Format
      format: timeFormat,
      // Show Config
      showHour,
      showMinute,
      showSecond,
      showMillisecond,
      use12Hours: showMeridiem
    });
  }
  return null;
}
function fillClearIcon(prefixCls, allowClear, clearIcon) {
  if (allowClear === false) {
    return null;
  }
  var config = allowClear && _typeof(allowClear) === "object" ? allowClear : {};
  return config.clearIcon || clearIcon || /* @__PURE__ */ reactExports.createElement("span", {
    className: "".concat(prefixCls, "-clear-btn")
  });
}
var WEEK_DAY_COUNT = 7;
function nullableCompare(value1, value2, oriCompareFn) {
  if (!value1 && !value2 || value1 === value2) {
    return true;
  }
  if (!value1 || !value2) {
    return false;
  }
  return oriCompareFn();
}
function isSameDecade(generateConfig2, decade1, decade2) {
  return nullableCompare(decade1, decade2, function() {
    var num1 = Math.floor(generateConfig2.getYear(decade1) / 10);
    var num2 = Math.floor(generateConfig2.getYear(decade2) / 10);
    return num1 === num2;
  });
}
function isSameYear$1(generateConfig2, year1, year2) {
  return nullableCompare(year1, year2, function() {
    return generateConfig2.getYear(year1) === generateConfig2.getYear(year2);
  });
}
function getQuarter(generateConfig2, date) {
  var quota = Math.floor(generateConfig2.getMonth(date) / 3);
  return quota + 1;
}
function isSameQuarter(generateConfig2, quarter1, quarter2) {
  return nullableCompare(quarter1, quarter2, function() {
    return isSameYear$1(generateConfig2, quarter1, quarter2) && getQuarter(generateConfig2, quarter1) === getQuarter(generateConfig2, quarter2);
  });
}
function isSameMonth$1(generateConfig2, month1, month2) {
  return nullableCompare(month1, month2, function() {
    return isSameYear$1(generateConfig2, month1, month2) && generateConfig2.getMonth(month1) === generateConfig2.getMonth(month2);
  });
}
function isSameDate$1(generateConfig2, date1, date2) {
  return nullableCompare(date1, date2, function() {
    return isSameYear$1(generateConfig2, date1, date2) && isSameMonth$1(generateConfig2, date1, date2) && generateConfig2.getDate(date1) === generateConfig2.getDate(date2);
  });
}
function isSameTime(generateConfig2, time1, time2) {
  return nullableCompare(time1, time2, function() {
    return generateConfig2.getHour(time1) === generateConfig2.getHour(time2) && generateConfig2.getMinute(time1) === generateConfig2.getMinute(time2) && generateConfig2.getSecond(time1) === generateConfig2.getSecond(time2);
  });
}
function isSameTimestamp(generateConfig2, time1, time2) {
  return nullableCompare(time1, time2, function() {
    return isSameDate$1(generateConfig2, time1, time2) && isSameTime(generateConfig2, time1, time2) && generateConfig2.getMillisecond(time1) === generateConfig2.getMillisecond(time2);
  });
}
function isSameWeek(generateConfig2, locale2, date1, date2) {
  return nullableCompare(date1, date2, function() {
    var weekStartDate1 = generateConfig2.locale.getWeekFirstDate(locale2, date1);
    var weekStartDate2 = generateConfig2.locale.getWeekFirstDate(locale2, date2);
    return isSameYear$1(generateConfig2, weekStartDate1, weekStartDate2) && generateConfig2.locale.getWeek(locale2, date1) === generateConfig2.locale.getWeek(locale2, date2);
  });
}
function isSame(generateConfig2, locale2, source, target, type) {
  switch (type) {
    case "date":
      return isSameDate$1(generateConfig2, source, target);
    case "week":
      return isSameWeek(generateConfig2, locale2.locale, source, target);
    case "month":
      return isSameMonth$1(generateConfig2, source, target);
    case "quarter":
      return isSameQuarter(generateConfig2, source, target);
    case "year":
      return isSameYear$1(generateConfig2, source, target);
    case "decade":
      return isSameDecade(generateConfig2, source, target);
    case "time":
      return isSameTime(generateConfig2, source, target);
    default:
      return isSameTimestamp(generateConfig2, source, target);
  }
}
function isInRange(generateConfig2, startDate, endDate, current) {
  if (!startDate || !endDate || !current) {
    return false;
  }
  return generateConfig2.isAfter(current, startDate) && generateConfig2.isAfter(endDate, current);
}
function isSameOrAfter(generateConfig2, locale2, date1, date2, type) {
  if (isSame(generateConfig2, locale2, date1, date2, type)) {
    return true;
  }
  return generateConfig2.isAfter(date1, date2);
}
function getWeekStartDate(locale2, generateConfig2, value) {
  var weekFirstDay = generateConfig2.locale.getWeekFirstDay(locale2);
  var monthStartDate = generateConfig2.setDate(value, 1);
  var startDateWeekDay = generateConfig2.getWeekDay(monthStartDate);
  var alignStartDate = generateConfig2.addDate(monthStartDate, weekFirstDay - startDateWeekDay);
  if (generateConfig2.getMonth(alignStartDate) === generateConfig2.getMonth(value) && generateConfig2.getDate(alignStartDate) > 1) {
    alignStartDate = generateConfig2.addDate(alignStartDate, -7);
  }
  return alignStartDate;
}
function formatValue(value, _ref) {
  var generateConfig2 = _ref.generateConfig, locale2 = _ref.locale, format2 = _ref.format;
  if (!value) {
    return "";
  }
  return typeof format2 === "function" ? format2(value) : generateConfig2.locale.format(locale2.locale, value, format2);
}
function fillTime(generateConfig2, date, time) {
  var tmpDate = date;
  var getFn = ["getHour", "getMinute", "getSecond", "getMillisecond"];
  var setFn = ["setHour", "setMinute", "setSecond", "setMillisecond"];
  setFn.forEach(function(fn, index2) {
    if (time) {
      tmpDate = generateConfig2[fn](tmpDate, generateConfig2[getFn[index2]](time));
    } else {
      tmpDate = generateConfig2[fn](tmpDate, 0);
    }
  });
  return tmpDate;
}
function useDisabledBoundary(generateConfig2, locale2, disabledDate, minDate, maxDate) {
  var mergedDisabledDate = useEvent$1(function(date, info) {
    if (disabledDate && disabledDate(date, info)) {
      return true;
    }
    if (minDate && generateConfig2.isAfter(minDate, date) && !isSame(generateConfig2, locale2, minDate, date, info.type)) {
      return true;
    }
    if (maxDate && generateConfig2.isAfter(date, maxDate) && !isSame(generateConfig2, locale2, maxDate, date, info.type)) {
      return true;
    }
    return false;
  });
  return mergedDisabledDate;
}
function useFieldFormat(picker, locale2, format2) {
  return reactExports.useMemo(function() {
    var rawFormat = getRowFormat(picker, locale2, format2);
    var formatList = toArray(rawFormat);
    var firstFormat = formatList[0];
    var maskFormat = _typeof(firstFormat) === "object" && firstFormat.type === "mask" ? firstFormat.format : null;
    return [
      // Format list
      formatList.map(function(config) {
        return typeof config === "string" || typeof config === "function" ? config : config.format;
      }),
      // Mask Format
      maskFormat
    ];
  }, [picker, locale2, format2]);
}
function useInputReadOnly(formatList, inputReadOnly, multiple) {
  if (typeof formatList[0] === "function" || multiple) {
    return true;
  }
  return inputReadOnly;
}
function useInvalidate(generateConfig2, picker, disabledDate, showTime) {
  var isInvalidate = useEvent$1(function(date, info) {
    var outsideInfo = _objectSpread2({
      type: picker
    }, info);
    delete outsideInfo.activeIndex;
    if (
      // Date object is invalid
      !generateConfig2.isValidate(date) || // Date is disabled by `disabledDate`
      disabledDate && disabledDate(date, outsideInfo)
    ) {
      return true;
    }
    if ((picker === "date" || picker === "time") && showTime) {
      var _showTime$disabledTim;
      var range = info && info.activeIndex === 1 ? "end" : "start";
      var _ref = ((_showTime$disabledTim = showTime.disabledTime) === null || _showTime$disabledTim === void 0 ? void 0 : _showTime$disabledTim.call(showTime, date, range, {
        from: outsideInfo.from
      })) || {}, disabledHours = _ref.disabledHours, disabledMinutes = _ref.disabledMinutes, disabledSeconds = _ref.disabledSeconds, disabledMilliseconds = _ref.disabledMilliseconds;
      var legacyDisabledHours = showTime.disabledHours, legacyDisabledMinutes = showTime.disabledMinutes, legacyDisabledSeconds = showTime.disabledSeconds;
      var mergedDisabledHours = disabledHours || legacyDisabledHours;
      var mergedDisabledMinutes = disabledMinutes || legacyDisabledMinutes;
      var mergedDisabledSeconds = disabledSeconds || legacyDisabledSeconds;
      var hour = generateConfig2.getHour(date);
      var minute = generateConfig2.getMinute(date);
      var second = generateConfig2.getSecond(date);
      var millisecond = generateConfig2.getMillisecond(date);
      if (mergedDisabledHours && mergedDisabledHours().includes(hour)) {
        return true;
      }
      if (mergedDisabledMinutes && mergedDisabledMinutes(hour).includes(minute)) {
        return true;
      }
      if (mergedDisabledSeconds && mergedDisabledSeconds(hour, minute).includes(second)) {
        return true;
      }
      if (disabledMilliseconds && disabledMilliseconds(hour, minute, second).includes(millisecond)) {
        return true;
      }
    }
    return false;
  });
  return isInvalidate;
}
function useList(value) {
  var fillMode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var values = reactExports.useMemo(function() {
    var list = value ? toArray(value) : value;
    if (fillMode && list) {
      list[1] = list[1] || list[0];
    }
    return list;
  }, [value, fillMode]);
  return values;
}
function useFilledProps(props, updater) {
  var generateConfig2 = props.generateConfig, locale2 = props.locale, _props$picker = props.picker, picker = _props$picker === void 0 ? "date" : _props$picker, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-picker" : _props$prefixCls, _props$styles = props.styles, styles = _props$styles === void 0 ? {} : _props$styles, _props$classNames = props.classNames, classNames2 = _props$classNames === void 0 ? {} : _props$classNames, _props$order = props.order, order = _props$order === void 0 ? true : _props$order, _props$components = props.components, components2 = _props$components === void 0 ? {} : _props$components, inputRender = props.inputRender, allowClear = props.allowClear, clearIcon = props.clearIcon, needConfirm = props.needConfirm, multiple = props.multiple, format2 = props.format, inputReadOnly = props.inputReadOnly, disabledDate = props.disabledDate, minDate = props.minDate, maxDate = props.maxDate, showTime = props.showTime, value = props.value, defaultValue2 = props.defaultValue, pickerValue = props.pickerValue, defaultPickerValue = props.defaultPickerValue;
  var values = useList(value);
  var defaultValues = useList(defaultValue2);
  var pickerValues = useList(pickerValue);
  var defaultPickerValues = useList(defaultPickerValue);
  var internalPicker = picker === "date" && showTime ? "datetime" : picker;
  var multipleInteractivePicker = internalPicker === "time" || internalPicker === "datetime";
  var complexPicker = multipleInteractivePicker || multiple;
  var mergedNeedConfirm = needConfirm !== null && needConfirm !== void 0 ? needConfirm : multipleInteractivePicker;
  var _getTimeProps = getTimeProps(props), _getTimeProps2 = _slicedToArray(_getTimeProps, 4), timeProps = _getTimeProps2[0], localeTimeProps = _getTimeProps2[1], showTimeFormat = _getTimeProps2[2], propFormat = _getTimeProps2[3];
  var mergedLocale = useLocale(locale2, localeTimeProps);
  var mergedShowTime = reactExports.useMemo(function() {
    return fillShowTimeConfig(internalPicker, showTimeFormat, propFormat, timeProps, mergedLocale);
  }, [internalPicker, showTimeFormat, propFormat, timeProps, mergedLocale]);
  var filledProps = reactExports.useMemo(function() {
    return _objectSpread2(_objectSpread2({}, props), {}, {
      prefixCls,
      locale: mergedLocale,
      picker,
      styles,
      classNames: classNames2,
      order,
      components: _objectSpread2({
        input: inputRender
      }, components2),
      clearIcon: fillClearIcon(prefixCls, allowClear, clearIcon),
      showTime: mergedShowTime,
      value: values,
      defaultValue: defaultValues,
      pickerValue: pickerValues,
      defaultPickerValue: defaultPickerValues
    }, updater === null || updater === void 0 ? void 0 : updater());
  }, [props]);
  var _useFieldFormat = useFieldFormat(internalPicker, mergedLocale, format2), _useFieldFormat2 = _slicedToArray(_useFieldFormat, 2), formatList = _useFieldFormat2[0], maskFormat = _useFieldFormat2[1];
  var mergedInputReadOnly = useInputReadOnly(formatList, inputReadOnly, multiple);
  var disabledBoundaryDate = useDisabledBoundary(generateConfig2, locale2, disabledDate, minDate, maxDate);
  var isInvalidateDate = useInvalidate(generateConfig2, picker, disabledBoundaryDate, mergedShowTime);
  var mergedProps = reactExports.useMemo(function() {
    return _objectSpread2(_objectSpread2({}, filledProps), {}, {
      needConfirm: mergedNeedConfirm,
      inputReadOnly: mergedInputReadOnly,
      disabledDate: disabledBoundaryDate
    });
  }, [filledProps, mergedNeedConfirm, mergedInputReadOnly, disabledBoundaryDate]);
  return [mergedProps, internalPicker, complexPicker, formatList, maskFormat, isInvalidateDate];
}
function useDelayState(value, defaultValue2, onChange2) {
  var _useMergedState = useMergedState(defaultValue2, {
    value
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), state = _useMergedState2[0], setState = _useMergedState2[1];
  var nextValueRef = React.useRef(value);
  var rafRef = React.useRef();
  var cancelRaf = function cancelRaf2() {
    wrapperRaf.cancel(rafRef.current);
  };
  var doUpdate = useEvent$1(function() {
    setState(nextValueRef.current);
    if (onChange2 && state !== nextValueRef.current) {
      onChange2(nextValueRef.current);
    }
  });
  var updateValue = useEvent$1(function(next, immediately) {
    cancelRaf();
    nextValueRef.current = next;
    if (next || immediately) {
      doUpdate();
    } else {
      rafRef.current = wrapperRaf(doUpdate);
    }
  });
  React.useEffect(function() {
    return cancelRaf;
  }, []);
  return [state, updateValue];
}
function useOpen(open, defaultOpen) {
  var disabledList = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
  var onOpenChange = arguments.length > 3 ? arguments[3] : void 0;
  var mergedOpen = disabledList.every(function(disabled) {
    return disabled;
  }) ? false : open;
  var _useDelayState = useDelayState(mergedOpen, defaultOpen || false, onOpenChange), _useDelayState2 = _slicedToArray(_useDelayState, 2), rafOpen = _useDelayState2[0], setRafOpen = _useDelayState2[1];
  function setOpen(next) {
    var config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!config.inherit || rafOpen) {
      setRafOpen(next, config.force);
    }
  }
  return [rafOpen, setOpen];
}
function usePickerRef(ref) {
  var selectorRef = reactExports.useRef();
  reactExports.useImperativeHandle(ref, function() {
    var _selectorRef$current;
    return {
      nativeElement: (_selectorRef$current = selectorRef.current) === null || _selectorRef$current === void 0 ? void 0 : _selectorRef$current.nativeElement,
      focus: function focus(options) {
        var _selectorRef$current2;
        (_selectorRef$current2 = selectorRef.current) === null || _selectorRef$current2 === void 0 || _selectorRef$current2.focus(options);
      },
      blur: function blur() {
        var _selectorRef$current3;
        (_selectorRef$current3 = selectorRef.current) === null || _selectorRef$current3 === void 0 || _selectorRef$current3.blur();
      }
    };
  });
  return selectorRef;
}
function usePresets(presets, legacyRanges) {
  return reactExports.useMemo(function() {
    if (presets) {
      return presets;
    }
    if (legacyRanges) {
      warningOnce(false, "`ranges` is deprecated. Please use `presets` instead.");
      return Object.entries(legacyRanges).map(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 2), label = _ref2[0], value = _ref2[1];
        return {
          label,
          value
        };
      });
    }
    return [];
  }, [presets, legacyRanges]);
}
function useLockEffect(condition, callback) {
  var delayFrames = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  var callbackRef = reactExports.useRef(callback);
  callbackRef.current = callback;
  useLayoutUpdateEffect(function() {
    if (condition) {
      callbackRef.current(condition);
    } else {
      var id = wrapperRaf(function() {
        callbackRef.current(condition);
      }, delayFrames);
      return function() {
        wrapperRaf.cancel(id);
      };
    }
  }, [condition]);
}
function useRangeActive(disabled) {
  var empty2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  var mergedOpen = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var _React$useState = reactExports.useState(0), _React$useState2 = _slicedToArray(_React$useState, 2), activeIndex = _React$useState2[0], setActiveIndex = _React$useState2[1];
  var _React$useState3 = reactExports.useState(false), _React$useState4 = _slicedToArray(_React$useState3, 2), focused = _React$useState4[0], setFocused = _React$useState4[1];
  var activeListRef = reactExports.useRef([]);
  var submitIndexRef = reactExports.useRef(null);
  var lastOperationRef = reactExports.useRef(null);
  var updateSubmitIndex = function updateSubmitIndex2(index2) {
    submitIndexRef.current = index2;
  };
  var hasActiveSubmitValue = function hasActiveSubmitValue2(index2) {
    return submitIndexRef.current === index2;
  };
  var triggerFocus2 = function triggerFocus3(nextFocus) {
    setFocused(nextFocus);
  };
  var lastOperation = function lastOperation2(type) {
    if (type) {
      lastOperationRef.current = type;
    }
    return lastOperationRef.current;
  };
  var nextActiveIndex = function nextActiveIndex2(nextValue) {
    var list = activeListRef.current;
    var filledActiveSet = new Set(list.filter(function(index2) {
      return nextValue[index2] || empty2[index2];
    }));
    var nextIndex = list[list.length - 1] === 0 ? 1 : 0;
    if (filledActiveSet.size >= 2 || disabled[nextIndex]) {
      return null;
    }
    return nextIndex;
  };
  useLockEffect(focused || mergedOpen, function() {
    if (!focused) {
      activeListRef.current = [];
      updateSubmitIndex(null);
    }
  });
  reactExports.useEffect(function() {
    if (focused) {
      activeListRef.current.push(activeIndex);
    }
  }, [focused, activeIndex]);
  return [focused, triggerFocus2, lastOperation, activeIndex, setActiveIndex, nextActiveIndex, activeListRef.current, updateSubmitIndex, hasActiveSubmitValue];
}
function useRangeDisabledDate(values, disabled, activeIndexList, generateConfig2, locale2, disabledDate) {
  var activeIndex = activeIndexList[activeIndexList.length - 1];
  var rangeDisabledDate = function rangeDisabledDate2(date, info) {
    var _values = _slicedToArray(values, 2), start = _values[0], end = _values[1];
    var mergedInfo = _objectSpread2(_objectSpread2({}, info), {}, {
      from: getFromDate(values, activeIndexList)
    });
    if (activeIndex === 1 && disabled[0] && start && // Same date isOK
    !isSame(generateConfig2, locale2, start, date, mergedInfo.type) && // Before start date
    generateConfig2.isAfter(start, date)) {
      return true;
    }
    if (activeIndex === 0 && disabled[1] && end && // Same date isOK
    !isSame(generateConfig2, locale2, end, date, mergedInfo.type) && // After end date
    generateConfig2.isAfter(date, end)) {
      return true;
    }
    return disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date, mergedInfo);
  };
  return rangeDisabledDate;
}
function offsetPanelDate(generateConfig2, picker, date, offset) {
  switch (picker) {
    case "date":
    case "week":
      return generateConfig2.addMonth(date, offset);
    case "month":
    case "quarter":
      return generateConfig2.addYear(date, offset);
    case "year":
      return generateConfig2.addYear(date, offset * 10);
    case "decade":
      return generateConfig2.addYear(date, offset * 100);
    default:
      return date;
  }
}
var EMPTY_LIST = [];
function useRangePickerValue(generateConfig2, locale2, calendarValue, modes, open, activeIndex, pickerMode, multiplePanel) {
  var defaultPickerValue = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : EMPTY_LIST;
  var pickerValue = arguments.length > 9 && arguments[9] !== void 0 ? arguments[9] : EMPTY_LIST;
  var timeDefaultValue = arguments.length > 10 && arguments[10] !== void 0 ? arguments[10] : EMPTY_LIST;
  var onPickerValueChange = arguments.length > 11 ? arguments[11] : void 0;
  var minDate = arguments.length > 12 ? arguments[12] : void 0;
  var maxDate = arguments.length > 13 ? arguments[13] : void 0;
  var isTimePicker = pickerMode === "time";
  var mergedActiveIndex = activeIndex || 0;
  var getDefaultPickerValue = function getDefaultPickerValue2(index2) {
    var now2 = generateConfig2.getNow();
    if (isTimePicker) {
      now2 = fillTime(generateConfig2, now2);
    }
    return defaultPickerValue[index2] || calendarValue[index2] || now2;
  };
  var _pickerValue = _slicedToArray(pickerValue, 2), startPickerValue = _pickerValue[0], endPickerValue = _pickerValue[1];
  var _useMergedState = useMergedState(function() {
    return getDefaultPickerValue(0);
  }, {
    value: startPickerValue
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedStartPickerValue = _useMergedState2[0], setStartPickerValue = _useMergedState2[1];
  var _useMergedState3 = useMergedState(function() {
    return getDefaultPickerValue(1);
  }, {
    value: endPickerValue
  }), _useMergedState4 = _slicedToArray(_useMergedState3, 2), mergedEndPickerValue = _useMergedState4[0], setEndPickerValue = _useMergedState4[1];
  var currentPickerValue = reactExports.useMemo(function() {
    var current = [mergedStartPickerValue, mergedEndPickerValue][mergedActiveIndex];
    return isTimePicker ? current : fillTime(generateConfig2, current, timeDefaultValue[mergedActiveIndex]);
  }, [isTimePicker, mergedStartPickerValue, mergedEndPickerValue, mergedActiveIndex, generateConfig2, timeDefaultValue]);
  var setCurrentPickerValue = function setCurrentPickerValue2(nextPickerValue) {
    var source = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "panel";
    var updater = [setStartPickerValue, setEndPickerValue][mergedActiveIndex];
    updater(nextPickerValue);
    var clone2 = [mergedStartPickerValue, mergedEndPickerValue];
    clone2[mergedActiveIndex] = nextPickerValue;
    if (onPickerValueChange && (!isSame(generateConfig2, locale2, mergedStartPickerValue, clone2[0], pickerMode) || !isSame(generateConfig2, locale2, mergedEndPickerValue, clone2[1], pickerMode))) {
      onPickerValueChange(clone2, {
        source,
        range: mergedActiveIndex === 1 ? "end" : "start",
        mode: modes
      });
    }
  };
  var getEndDatePickerValue = function getEndDatePickerValue2(startDate, endDate) {
    if (multiplePanel) {
      var SAME_CHECKER = {
        date: "month",
        week: "month",
        month: "year",
        quarter: "year"
      };
      var mode = SAME_CHECKER[pickerMode];
      if (mode && !isSame(generateConfig2, locale2, startDate, endDate, mode)) {
        return offsetPanelDate(generateConfig2, pickerMode, endDate, -1);
      }
      if (pickerMode === "year" && startDate) {
        var srcYear = Math.floor(generateConfig2.getYear(startDate) / 10);
        var tgtYear = Math.floor(generateConfig2.getYear(endDate) / 10);
        if (srcYear !== tgtYear) {
          return offsetPanelDate(generateConfig2, pickerMode, endDate, -1);
        }
      }
    }
    return endDate;
  };
  var prevActiveIndexRef = reactExports.useRef(null);
  useLayoutEffect(function() {
    if (open) {
      if (!defaultPickerValue[mergedActiveIndex]) {
        var nextPickerValue = isTimePicker ? null : generateConfig2.getNow();
        if (prevActiveIndexRef.current !== null && prevActiveIndexRef.current !== mergedActiveIndex) {
          nextPickerValue = [mergedStartPickerValue, mergedEndPickerValue][mergedActiveIndex ^ 1];
        } else if (calendarValue[mergedActiveIndex]) {
          nextPickerValue = mergedActiveIndex === 0 ? calendarValue[0] : getEndDatePickerValue(calendarValue[0], calendarValue[1]);
        } else if (calendarValue[mergedActiveIndex ^ 1]) {
          nextPickerValue = calendarValue[mergedActiveIndex ^ 1];
        }
        if (nextPickerValue) {
          if (minDate && generateConfig2.isAfter(minDate, nextPickerValue)) {
            nextPickerValue = minDate;
          }
          var offsetPickerValue = multiplePanel ? offsetPanelDate(generateConfig2, pickerMode, nextPickerValue, 1) : nextPickerValue;
          if (maxDate && generateConfig2.isAfter(offsetPickerValue, maxDate)) {
            nextPickerValue = multiplePanel ? offsetPanelDate(generateConfig2, pickerMode, maxDate, -1) : maxDate;
          }
          setCurrentPickerValue(nextPickerValue, "reset");
        }
      }
    }
  }, [open, mergedActiveIndex, calendarValue[mergedActiveIndex]]);
  reactExports.useEffect(function() {
    if (open) {
      prevActiveIndexRef.current = mergedActiveIndex;
    } else {
      prevActiveIndexRef.current = null;
    }
  }, [open, mergedActiveIndex]);
  useLayoutEffect(function() {
    if (open && defaultPickerValue) {
      if (defaultPickerValue[mergedActiveIndex]) {
        setCurrentPickerValue(defaultPickerValue[mergedActiveIndex], "reset");
      }
    }
  }, [open, mergedActiveIndex]);
  return [currentPickerValue, setCurrentPickerValue];
}
function useSyncState(defaultValue2, controlledValue) {
  var valueRef = reactExports.useRef(defaultValue2);
  var _React$useState = reactExports.useState({}), _React$useState2 = _slicedToArray(_React$useState, 2), forceUpdate = _React$useState2[1];
  var getter = function getter2(useControlledValueFirst) {
    return useControlledValueFirst && controlledValue !== void 0 ? controlledValue : valueRef.current;
  };
  var setter = function setter2(nextValue) {
    valueRef.current = nextValue;
    forceUpdate({});
  };
  return [getter, setter, getter(true)];
}
var EMPTY_VALUE = [];
function useUtil(generateConfig2, locale2, formatList) {
  var getDateTexts = function getDateTexts2(dates) {
    return dates.map(function(date) {
      return formatValue(date, {
        generateConfig: generateConfig2,
        locale: locale2,
        format: formatList[0]
      });
    });
  };
  var isSameDates = function isSameDates2(source, target) {
    var maxLen = Math.max(source.length, target.length);
    var diffIndex = -1;
    for (var i = 0; i < maxLen; i += 1) {
      var prev = source[i] || null;
      var next = target[i] || null;
      if (prev !== next && !isSameTimestamp(generateConfig2, prev, next)) {
        diffIndex = i;
        break;
      }
    }
    return [diffIndex < 0, diffIndex !== 0];
  };
  return [getDateTexts, isSameDates];
}
function orderDates(dates, generateConfig2) {
  return _toConsumableArray(dates).sort(function(a, b) {
    return generateConfig2.isAfter(a, b) ? 1 : -1;
  });
}
function useCalendarValue(mergedValue) {
  var _useSyncState = useSyncState(mergedValue), _useSyncState2 = _slicedToArray(_useSyncState, 2), calendarValue = _useSyncState2[0], setCalendarValue = _useSyncState2[1];
  var syncWithValue = useEvent$1(function() {
    setCalendarValue(mergedValue);
  });
  reactExports.useEffect(function() {
    syncWithValue();
  }, [mergedValue]);
  return [calendarValue, setCalendarValue];
}
function useInnerValue(generateConfig2, locale2, formatList, rangeValue, order, defaultValue2, value, onCalendarChange, onOk) {
  var _useMergedState = useMergedState(defaultValue2, {
    value
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), innerValue = _useMergedState2[0], setInnerValue = _useMergedState2[1];
  var mergedValue = innerValue || EMPTY_VALUE;
  var _useCalendarValue = useCalendarValue(mergedValue), _useCalendarValue2 = _slicedToArray(_useCalendarValue, 2), calendarValue = _useCalendarValue2[0], setCalendarValue = _useCalendarValue2[1];
  var _useUtil = useUtil(generateConfig2, locale2, formatList), _useUtil2 = _slicedToArray(_useUtil, 2), getDateTexts = _useUtil2[0], isSameDates = _useUtil2[1];
  var triggerCalendarChange = useEvent$1(function(nextCalendarValues) {
    var clone2 = _toConsumableArray(nextCalendarValues);
    if (rangeValue) {
      for (var i = 0; i < 2; i += 1) {
        clone2[i] = clone2[i] || null;
      }
    } else if (order) {
      clone2 = orderDates(clone2.filter(function(date) {
        return date;
      }), generateConfig2);
    }
    var _isSameDates = isSameDates(calendarValue(), clone2), _isSameDates2 = _slicedToArray(_isSameDates, 2), isSameMergedDates = _isSameDates2[0], isSameStart = _isSameDates2[1];
    if (!isSameMergedDates) {
      setCalendarValue(clone2);
      if (onCalendarChange) {
        var cellTexts = getDateTexts(clone2);
        onCalendarChange(clone2, cellTexts, {
          range: isSameStart ? "end" : "start"
        });
      }
    }
  });
  var triggerOk = function triggerOk2() {
    if (onOk) {
      onOk(calendarValue());
    }
  };
  return [mergedValue, setInnerValue, calendarValue, triggerCalendarChange, triggerOk];
}
function useRangeValue(info, mergedValue, setInnerValue, getCalendarValue, triggerCalendarChange, disabled, formatList, focused, open, isInvalidateDate) {
  var generateConfig2 = info.generateConfig, locale2 = info.locale, picker = info.picker, onChange2 = info.onChange, allowEmpty = info.allowEmpty, order = info.order;
  var orderOnChange = disabled.some(function(d) {
    return d;
  }) ? false : order;
  var _useUtil3 = useUtil(generateConfig2, locale2, formatList), _useUtil4 = _slicedToArray(_useUtil3, 2), getDateTexts = _useUtil4[0], isSameDates = _useUtil4[1];
  var _useSyncState3 = useSyncState(mergedValue), _useSyncState4 = _slicedToArray(_useSyncState3, 2), submitValue = _useSyncState4[0], setSubmitValue = _useSyncState4[1];
  var syncWithValue = useEvent$1(function() {
    setSubmitValue(mergedValue);
  });
  reactExports.useEffect(function() {
    syncWithValue();
  }, [mergedValue]);
  var triggerSubmit = useEvent$1(function(nextValue) {
    var isNullValue = nextValue === null;
    var clone2 = _toConsumableArray(nextValue || submitValue());
    if (isNullValue) {
      var maxLen = Math.max(disabled.length, clone2.length);
      for (var i = 0; i < maxLen; i += 1) {
        if (!disabled[i]) {
          clone2[i] = null;
        }
      }
    }
    if (orderOnChange && clone2[0] && clone2[1]) {
      clone2 = orderDates(clone2, generateConfig2);
    }
    triggerCalendarChange(clone2);
    var _clone = clone2, _clone2 = _slicedToArray(_clone, 2), start = _clone2[0], end = _clone2[1];
    var startEmpty = !start;
    var endEmpty = !end;
    var validateEmptyDateRange = allowEmpty ? (
      // Validate empty start
      (!startEmpty || allowEmpty[0]) && // Validate empty end
      (!endEmpty || allowEmpty[1])
    ) : true;
    var validateOrder = !order || startEmpty || endEmpty || isSame(generateConfig2, locale2, start, end, picker) || generateConfig2.isAfter(end, start);
    var validateDates = (
      // Validate start
      (disabled[0] || !start || !isInvalidateDate(start, {
        activeIndex: 0
      })) && // Validate end
      (disabled[1] || !end || !isInvalidateDate(end, {
        from: start,
        activeIndex: 1
      }))
    );
    var allPassed = (
      // Null value is from clear button
      isNullValue || // Normal check
      validateEmptyDateRange && validateOrder && validateDates
    );
    if (allPassed) {
      setInnerValue(clone2);
      var _isSameDates3 = isSameDates(clone2, mergedValue), _isSameDates4 = _slicedToArray(_isSameDates3, 1), isSameMergedDates = _isSameDates4[0];
      if (onChange2 && !isSameMergedDates) {
        onChange2(
          // Return null directly if all date are empty
          isNullValue && clone2.every(function(val) {
            return !val;
          }) ? null : clone2,
          getDateTexts(clone2)
        );
      }
    }
    return allPassed;
  });
  var flushSubmit = useEvent$1(function(index2, needTriggerChange) {
    var nextSubmitValue = fillIndex(submitValue(), index2, getCalendarValue()[index2]);
    setSubmitValue(nextSubmitValue);
    if (needTriggerChange) {
      triggerSubmit();
    }
  });
  var interactiveFinished = !focused && !open;
  useLockEffect(!interactiveFinished, function() {
    if (interactiveFinished) {
      triggerSubmit();
      triggerCalendarChange(mergedValue);
      syncWithValue();
    }
  }, 2);
  return [flushSubmit, triggerSubmit];
}
function useShowNow(picker, mode, showNow, showToday, rangePicker) {
  if (mode !== "date" && mode !== "time") {
    return false;
  }
  if (showNow !== void 0) {
    return showNow;
  }
  if (showToday !== void 0) {
    return showToday;
  }
  return !rangePicker && (picker === "date" || picker === "time");
}
function findValidateTime(date, getHourUnits, getMinuteUnits, getSecondUnits, getMillisecondUnits, generateConfig2) {
  var nextDate = date;
  function alignValidate(getUnitValue, setUnitValue, units) {
    var nextValue = generateConfig2[getUnitValue](nextDate);
    var nextUnit = units.find(function(unit2) {
      return unit2.value === nextValue;
    });
    if (!nextUnit || nextUnit.disabled) {
      var validateUnits = units.filter(function(unit2) {
        return !unit2.disabled;
      });
      var reverseEnabledUnits = _toConsumableArray(validateUnits).reverse();
      var validateUnit = reverseEnabledUnits.find(function(unit2) {
        return unit2.value <= nextValue;
      }) || validateUnits[0];
      if (validateUnit) {
        nextValue = validateUnit.value;
        nextDate = generateConfig2[setUnitValue](nextDate, nextValue);
      }
    }
    return nextValue;
  }
  var nextHour = alignValidate("getHour", "setHour", getHourUnits());
  var nextMinute = alignValidate("getMinute", "setMinute", getMinuteUnits(nextHour));
  var nextSecond = alignValidate("getSecond", "setSecond", getSecondUnits(nextHour, nextMinute));
  alignValidate("getMillisecond", "setMillisecond", getMillisecondUnits(nextHour, nextMinute, nextSecond));
  return nextDate;
}
function emptyDisabled() {
  return [];
}
function generateUnits(start, end) {
  var step = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  var hideDisabledOptions = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  var disabledUnits = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [];
  var pad = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 2;
  var units = [];
  var integerStep = step >= 1 ? step | 0 : 1;
  for (var i = start; i <= end; i += integerStep) {
    var disabled = disabledUnits.includes(i);
    if (!disabled || !hideDisabledOptions) {
      units.push({
        label: leftPad(i, pad),
        value: i,
        disabled
      });
    }
  }
  return units;
}
function useTimeInfo(generateConfig2) {
  var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var date = arguments.length > 2 ? arguments[2] : void 0;
  var _ref = props || {}, use12Hours = _ref.use12Hours, _ref$hourStep = _ref.hourStep, hourStep = _ref$hourStep === void 0 ? 1 : _ref$hourStep, _ref$minuteStep = _ref.minuteStep, minuteStep = _ref$minuteStep === void 0 ? 1 : _ref$minuteStep, _ref$secondStep = _ref.secondStep, secondStep = _ref$secondStep === void 0 ? 1 : _ref$secondStep, _ref$millisecondStep = _ref.millisecondStep, millisecondStep = _ref$millisecondStep === void 0 ? 100 : _ref$millisecondStep, hideDisabledOptions = _ref.hideDisabledOptions, disabledTime = _ref.disabledTime, disabledHours = _ref.disabledHours, disabledMinutes = _ref.disabledMinutes, disabledSeconds = _ref.disabledSeconds;
  var mergedDate = reactExports.useMemo(function() {
    return date || generateConfig2.getNow();
  }, [date, generateConfig2]);
  var getDisabledTimes = reactExports.useCallback(function(targetDate) {
    var disabledConfig = (disabledTime === null || disabledTime === void 0 ? void 0 : disabledTime(targetDate)) || {};
    return [disabledConfig.disabledHours || disabledHours || emptyDisabled, disabledConfig.disabledMinutes || disabledMinutes || emptyDisabled, disabledConfig.disabledSeconds || disabledSeconds || emptyDisabled, disabledConfig.disabledMilliseconds || emptyDisabled];
  }, [disabledTime, disabledHours, disabledMinutes, disabledSeconds]);
  var _React$useMemo = reactExports.useMemo(function() {
    return getDisabledTimes(mergedDate);
  }, [mergedDate, getDisabledTimes]), _React$useMemo2 = _slicedToArray(_React$useMemo, 4), mergedDisabledHours = _React$useMemo2[0], mergedDisabledMinutes = _React$useMemo2[1], mergedDisabledSeconds = _React$useMemo2[2], mergedDisabledMilliseconds = _React$useMemo2[3];
  var getAllUnits = reactExports.useCallback(function(getDisabledHours, getDisabledMinutes, getDisabledSeconds, getDisabledMilliseconds) {
    var hours = generateUnits(0, 23, hourStep, hideDisabledOptions, getDisabledHours());
    var rowHourUnits2 = use12Hours ? hours.map(function(unit2) {
      return _objectSpread2(_objectSpread2({}, unit2), {}, {
        label: leftPad(unit2.value % 12 || 12, 2)
      });
    }) : hours;
    var getMinuteUnits2 = function getMinuteUnits3(nextHour) {
      return generateUnits(0, 59, minuteStep, hideDisabledOptions, getDisabledMinutes(nextHour));
    };
    var getSecondUnits2 = function getSecondUnits3(nextHour, nextMinute) {
      return generateUnits(0, 59, secondStep, hideDisabledOptions, getDisabledSeconds(nextHour, nextMinute));
    };
    var getMillisecondUnits2 = function getMillisecondUnits3(nextHour, nextMinute, nextSecond) {
      return generateUnits(0, 999, millisecondStep, hideDisabledOptions, getDisabledMilliseconds(nextHour, nextMinute, nextSecond), 3);
    };
    return [rowHourUnits2, getMinuteUnits2, getSecondUnits2, getMillisecondUnits2];
  }, [hideDisabledOptions, hourStep, use12Hours, millisecondStep, minuteStep, secondStep]);
  var _React$useMemo3 = reactExports.useMemo(function() {
    return getAllUnits(mergedDisabledHours, mergedDisabledMinutes, mergedDisabledSeconds, mergedDisabledMilliseconds);
  }, [getAllUnits, mergedDisabledHours, mergedDisabledMinutes, mergedDisabledSeconds, mergedDisabledMilliseconds]), _React$useMemo4 = _slicedToArray(_React$useMemo3, 4), rowHourUnits = _React$useMemo4[0], getMinuteUnits = _React$useMemo4[1], getSecondUnits = _React$useMemo4[2], getMillisecondUnits = _React$useMemo4[3];
  var getValidTime = function getValidTime2(nextTime, certainDate) {
    var getCheckHourUnits = function getCheckHourUnits2() {
      return rowHourUnits;
    };
    var getCheckMinuteUnits = getMinuteUnits;
    var getCheckSecondUnits = getSecondUnits;
    var getCheckMillisecondUnits = getMillisecondUnits;
    if (certainDate) {
      var _getDisabledTimes = getDisabledTimes(certainDate), _getDisabledTimes2 = _slicedToArray(_getDisabledTimes, 4), targetDisabledHours = _getDisabledTimes2[0], targetDisabledMinutes = _getDisabledTimes2[1], targetDisabledSeconds = _getDisabledTimes2[2], targetDisabledMilliseconds = _getDisabledTimes2[3];
      var _getAllUnits = getAllUnits(targetDisabledHours, targetDisabledMinutes, targetDisabledSeconds, targetDisabledMilliseconds), _getAllUnits2 = _slicedToArray(_getAllUnits, 4), targetRowHourUnits = _getAllUnits2[0], targetGetMinuteUnits = _getAllUnits2[1], targetGetSecondUnits = _getAllUnits2[2], targetGetMillisecondUnits = _getAllUnits2[3];
      getCheckHourUnits = function getCheckHourUnits2() {
        return targetRowHourUnits;
      };
      getCheckMinuteUnits = targetGetMinuteUnits;
      getCheckSecondUnits = targetGetSecondUnits;
      getCheckMillisecondUnits = targetGetMillisecondUnits;
    }
    var validateDate = findValidateTime(nextTime, getCheckHourUnits, getCheckMinuteUnits, getCheckSecondUnits, getCheckMillisecondUnits, generateConfig2);
    return validateDate;
  };
  return [
    // getValidTime
    getValidTime,
    // Units
    rowHourUnits,
    getMinuteUnits,
    getSecondUnits,
    getMillisecondUnits
  ];
}
function Footer(props) {
  var mode = props.mode, internalMode = props.internalMode, renderExtraFooter = props.renderExtraFooter, showNow = props.showNow, showTime = props.showTime, onSubmit = props.onSubmit, onNow = props.onNow, invalid = props.invalid, needConfirm = props.needConfirm, generateConfig2 = props.generateConfig, disabledDate = props.disabledDate;
  var _React$useContext = reactExports.useContext(PickerContext), prefixCls = _React$useContext.prefixCls, locale2 = _React$useContext.locale, _React$useContext$but = _React$useContext.button, Button2 = _React$useContext$but === void 0 ? "button" : _React$useContext$but;
  var now2 = generateConfig2.getNow();
  var _useTimeInfo = useTimeInfo(generateConfig2, showTime, now2), _useTimeInfo2 = _slicedToArray(_useTimeInfo, 1), getValidTime = _useTimeInfo2[0];
  var extraNode = renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter(mode);
  var nowDisabled = disabledDate(now2, {
    type: mode
  });
  var onInternalNow = function onInternalNow2() {
    if (!nowDisabled) {
      var validateNow = getValidTime(now2);
      onNow(validateNow);
    }
  };
  var nowPrefixCls = "".concat(prefixCls, "-now");
  var nowBtnPrefixCls = "".concat(nowPrefixCls, "-btn");
  var presetNode = showNow && /* @__PURE__ */ reactExports.createElement("li", {
    className: nowPrefixCls
  }, /* @__PURE__ */ reactExports.createElement("a", {
    className: classNames(nowBtnPrefixCls, nowDisabled && "".concat(nowBtnPrefixCls, "-disabled")),
    "aria-disabled": nowDisabled,
    onClick: onInternalNow
  }, internalMode === "date" ? locale2.today : locale2.now));
  var okNode = needConfirm && /* @__PURE__ */ reactExports.createElement("li", {
    className: "".concat(prefixCls, "-ok")
  }, /* @__PURE__ */ reactExports.createElement(Button2, {
    disabled: invalid,
    onClick: onSubmit
  }, locale2.ok));
  var rangeNode = (presetNode || okNode) && /* @__PURE__ */ reactExports.createElement("ul", {
    className: "".concat(prefixCls, "-ranges")
  }, presetNode, okNode);
  if (!extraNode && !rangeNode) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-footer")
  }, extraNode && /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-footer-extra")
  }, extraNode), rangeNode);
}
function useToggleDates(generateConfig2, locale2, panelMode) {
  function toggleDates(list, target) {
    var index2 = list.findIndex(function(date) {
      return isSame(generateConfig2, locale2, date, target, panelMode);
    });
    if (index2 === -1) {
      return [].concat(_toConsumableArray(list), [target]);
    }
    var sliceList = _toConsumableArray(list);
    sliceList.splice(index2, 1);
    return sliceList;
  }
  return toggleDates;
}
var PanelContext = /* @__PURE__ */ reactExports.createContext(null);
function usePanelContext() {
  return reactExports.useContext(PanelContext);
}
function useInfo(props, panelType) {
  var prefixCls = props.prefixCls, generateConfig2 = props.generateConfig, locale2 = props.locale, disabledDate = props.disabledDate, minDate = props.minDate, maxDate = props.maxDate, cellRender = props.cellRender, hoverValue = props.hoverValue, hoverRangeValue = props.hoverRangeValue, onHover = props.onHover, values = props.values, pickerValue = props.pickerValue, onSelect = props.onSelect, prevIcon = props.prevIcon, nextIcon = props.nextIcon, superPrevIcon = props.superPrevIcon, superNextIcon = props.superNextIcon;
  var now2 = generateConfig2.getNow();
  var info = {
    now: now2,
    values,
    pickerValue,
    prefixCls,
    disabledDate,
    minDate,
    maxDate,
    cellRender,
    hoverValue,
    hoverRangeValue,
    onHover,
    locale: locale2,
    generateConfig: generateConfig2,
    onSelect,
    panelType,
    // Icons
    prevIcon,
    nextIcon,
    superPrevIcon,
    superNextIcon
  };
  return [info, now2];
}
var PickerHackContext = /* @__PURE__ */ reactExports.createContext({});
function PanelBody(props) {
  var rowNum = props.rowNum, colNum = props.colNum, baseDate = props.baseDate, getCellDate = props.getCellDate, prefixColumn = props.prefixColumn, rowClassName = props.rowClassName, titleFormat = props.titleFormat, getCellText = props.getCellText, getCellClassName = props.getCellClassName, headerCells = props.headerCells, _props$cellSelection = props.cellSelection, cellSelection = _props$cellSelection === void 0 ? true : _props$cellSelection, disabledDate = props.disabledDate;
  var _usePanelContext = usePanelContext(), prefixCls = _usePanelContext.prefixCls, type = _usePanelContext.panelType, now2 = _usePanelContext.now, contextDisabledDate = _usePanelContext.disabledDate, cellRender = _usePanelContext.cellRender, onHover = _usePanelContext.onHover, hoverValue = _usePanelContext.hoverValue, hoverRangeValue = _usePanelContext.hoverRangeValue, generateConfig2 = _usePanelContext.generateConfig, values = _usePanelContext.values, locale2 = _usePanelContext.locale, onSelect = _usePanelContext.onSelect;
  var mergedDisabledDate = disabledDate || contextDisabledDate;
  var cellPrefixCls = "".concat(prefixCls, "-cell");
  var _React$useContext = reactExports.useContext(PickerHackContext), onCellDblClick = _React$useContext.onCellDblClick;
  var matchValues = function matchValues2(date) {
    return values.some(function(singleValue) {
      return singleValue && isSame(generateConfig2, locale2, date, singleValue, type);
    });
  };
  var rows = [];
  for (var row = 0; row < rowNum; row += 1) {
    var rowNode = [];
    var rowStartDate = void 0;
    var _loop = function _loop2() {
      var offset = row * colNum + col;
      var currentDate = getCellDate(baseDate, offset);
      var disabled = mergedDisabledDate === null || mergedDisabledDate === void 0 ? void 0 : mergedDisabledDate(currentDate, {
        type
      });
      if (col === 0) {
        rowStartDate = currentDate;
        if (prefixColumn) {
          rowNode.push(prefixColumn(rowStartDate));
        }
      }
      var inRange = false;
      var rangeStart = false;
      var rangeEnd = false;
      if (cellSelection && hoverRangeValue) {
        var _hoverRangeValue = _slicedToArray(hoverRangeValue, 2), hoverStart = _hoverRangeValue[0], hoverEnd = _hoverRangeValue[1];
        inRange = isInRange(generateConfig2, hoverStart, hoverEnd, currentDate);
        rangeStart = isSame(generateConfig2, locale2, currentDate, hoverStart, type);
        rangeEnd = isSame(generateConfig2, locale2, currentDate, hoverEnd, type);
      }
      var title = titleFormat ? formatValue(currentDate, {
        locale: locale2,
        format: titleFormat,
        generateConfig: generateConfig2
      }) : void 0;
      var inner = /* @__PURE__ */ reactExports.createElement("div", {
        className: "".concat(cellPrefixCls, "-inner")
      }, getCellText(currentDate));
      rowNode.push(/* @__PURE__ */ reactExports.createElement("td", {
        key: col,
        title,
        className: classNames(cellPrefixCls, _objectSpread2(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(cellPrefixCls, "-disabled"), disabled), "".concat(cellPrefixCls, "-hover"), (hoverValue || []).some(function(date) {
          return isSame(generateConfig2, locale2, currentDate, date, type);
        })), "".concat(cellPrefixCls, "-in-range"), inRange && !rangeStart && !rangeEnd), "".concat(cellPrefixCls, "-range-start"), rangeStart), "".concat(cellPrefixCls, "-range-end"), rangeEnd), "".concat(prefixCls, "-cell-selected"), !hoverRangeValue && // WeekPicker use row instead
        type !== "week" && matchValues(currentDate)), getCellClassName(currentDate))),
        onClick: function onClick() {
          if (!disabled) {
            onSelect(currentDate);
          }
        },
        onDoubleClick: function onDoubleClick() {
          if (!disabled && onCellDblClick) {
            onCellDblClick();
          }
        },
        onMouseEnter: function onMouseEnter() {
          if (!disabled) {
            onHover === null || onHover === void 0 || onHover(currentDate);
          }
        },
        onMouseLeave: function onMouseLeave() {
          if (!disabled) {
            onHover === null || onHover === void 0 || onHover(null);
          }
        }
      }, cellRender ? cellRender(currentDate, {
        prefixCls,
        originNode: inner,
        today: now2,
        type,
        locale: locale2
      }) : inner));
    };
    for (var col = 0; col < colNum; col += 1) {
      _loop();
    }
    rows.push(/* @__PURE__ */ reactExports.createElement("tr", {
      key: row,
      className: rowClassName === null || rowClassName === void 0 ? void 0 : rowClassName(rowStartDate)
    }, rowNode));
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-body")
  }, /* @__PURE__ */ reactExports.createElement("table", {
    className: "".concat(prefixCls, "-content")
  }, headerCells && /* @__PURE__ */ reactExports.createElement("thead", null, /* @__PURE__ */ reactExports.createElement("tr", null, headerCells)), /* @__PURE__ */ reactExports.createElement("tbody", null, rows)));
}
var HIDDEN_STYLE = {
  visibility: "hidden"
};
function PanelHeader(props) {
  var offset = props.offset, superOffset = props.superOffset, onChange2 = props.onChange, getStart = props.getStart, getEnd = props.getEnd, children = props.children;
  var _usePanelContext = usePanelContext(), prefixCls = _usePanelContext.prefixCls, _usePanelContext$prev = _usePanelContext.prevIcon, prevIcon = _usePanelContext$prev === void 0 ? "‹" : _usePanelContext$prev, _usePanelContext$next = _usePanelContext.nextIcon, nextIcon = _usePanelContext$next === void 0 ? "›" : _usePanelContext$next, _usePanelContext$supe = _usePanelContext.superPrevIcon, superPrevIcon = _usePanelContext$supe === void 0 ? "«" : _usePanelContext$supe, _usePanelContext$supe2 = _usePanelContext.superNextIcon, superNextIcon = _usePanelContext$supe2 === void 0 ? "»" : _usePanelContext$supe2, minDate = _usePanelContext.minDate, maxDate = _usePanelContext.maxDate, generateConfig2 = _usePanelContext.generateConfig, locale2 = _usePanelContext.locale, pickerValue = _usePanelContext.pickerValue, type = _usePanelContext.panelType;
  var headerPrefixCls = "".concat(prefixCls, "-header");
  var _React$useContext = reactExports.useContext(PickerHackContext), hidePrev = _React$useContext.hidePrev, hideNext = _React$useContext.hideNext, hideHeader = _React$useContext.hideHeader;
  var disabledOffsetPrev = reactExports.useMemo(function() {
    if (!minDate || !offset || !getEnd) {
      return false;
    }
    var prevPanelLimitDate = getEnd(offset(-1, pickerValue));
    return !isSameOrAfter(generateConfig2, locale2, prevPanelLimitDate, minDate, type);
  }, [minDate, offset, pickerValue, getEnd, generateConfig2, locale2, type]);
  var disabledSuperOffsetPrev = reactExports.useMemo(function() {
    if (!minDate || !superOffset || !getEnd) {
      return false;
    }
    var prevPanelLimitDate = getEnd(superOffset(-1, pickerValue));
    return !isSameOrAfter(generateConfig2, locale2, prevPanelLimitDate, minDate, type);
  }, [minDate, superOffset, pickerValue, getEnd, generateConfig2, locale2, type]);
  var disabledOffsetNext = reactExports.useMemo(function() {
    if (!maxDate || !offset || !getStart) {
      return false;
    }
    var nextPanelLimitDate = getStart(offset(1, pickerValue));
    return !isSameOrAfter(generateConfig2, locale2, maxDate, nextPanelLimitDate, type);
  }, [maxDate, offset, pickerValue, getStart, generateConfig2, locale2, type]);
  var disabledSuperOffsetNext = reactExports.useMemo(function() {
    if (!maxDate || !superOffset || !getStart) {
      return false;
    }
    var nextPanelLimitDate = getStart(superOffset(1, pickerValue));
    return !isSameOrAfter(generateConfig2, locale2, maxDate, nextPanelLimitDate, type);
  }, [maxDate, superOffset, pickerValue, getStart, generateConfig2, locale2, type]);
  var onOffset = function onOffset2(distance) {
    if (offset) {
      onChange2(offset(distance, pickerValue));
    }
  };
  var onSuperOffset = function onSuperOffset2(distance) {
    if (superOffset) {
      onChange2(superOffset(distance, pickerValue));
    }
  };
  if (hideHeader) {
    return null;
  }
  var prevBtnCls = "".concat(headerPrefixCls, "-prev-btn");
  var nextBtnCls = "".concat(headerPrefixCls, "-next-btn");
  var superPrevBtnCls = "".concat(headerPrefixCls, "-super-prev-btn");
  var superNextBtnCls = "".concat(headerPrefixCls, "-super-next-btn");
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: headerPrefixCls
  }, superOffset && /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    "aria-label": locale2.previousYear,
    onClick: function onClick() {
      return onSuperOffset(-1);
    },
    tabIndex: -1,
    className: classNames(superPrevBtnCls, disabledSuperOffsetPrev && "".concat(superPrevBtnCls, "-disabled")),
    disabled: disabledSuperOffsetPrev,
    style: hidePrev ? HIDDEN_STYLE : {}
  }, superPrevIcon), offset && /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    "aria-label": locale2.previousMonth,
    onClick: function onClick() {
      return onOffset(-1);
    },
    tabIndex: -1,
    className: classNames(prevBtnCls, disabledOffsetPrev && "".concat(prevBtnCls, "-disabled")),
    disabled: disabledOffsetPrev,
    style: hidePrev ? HIDDEN_STYLE : {}
  }, prevIcon), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(headerPrefixCls, "-view")
  }, children), offset && /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    "aria-label": locale2.nextMonth,
    onClick: function onClick() {
      return onOffset(1);
    },
    tabIndex: -1,
    className: classNames(nextBtnCls, disabledOffsetNext && "".concat(nextBtnCls, "-disabled")),
    disabled: disabledOffsetNext,
    style: hideNext ? HIDDEN_STYLE : {}
  }, nextIcon), superOffset && /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    "aria-label": locale2.nextYear,
    onClick: function onClick() {
      return onSuperOffset(1);
    },
    tabIndex: -1,
    className: classNames(superNextBtnCls, disabledSuperOffsetNext && "".concat(superNextBtnCls, "-disabled")),
    disabled: disabledSuperOffsetNext,
    style: hideNext ? HIDDEN_STYLE : {}
  }, superNextIcon));
}
function DatePanel(props) {
  var prefixCls = props.prefixCls, _props$panelName = props.panelName, panelName = _props$panelName === void 0 ? "date" : _props$panelName, locale2 = props.locale, generateConfig2 = props.generateConfig, pickerValue = props.pickerValue, onPickerValueChange = props.onPickerValueChange, onModeChange = props.onModeChange, _props$mode = props.mode, mode = _props$mode === void 0 ? "date" : _props$mode, disabledDate = props.disabledDate, onSelect = props.onSelect, onHover = props.onHover, showWeek = props.showWeek;
  var panelPrefixCls = "".concat(prefixCls, "-").concat(panelName, "-panel");
  var cellPrefixCls = "".concat(prefixCls, "-cell");
  var isWeek = mode === "week";
  var _useInfo = useInfo(props, mode), _useInfo2 = _slicedToArray(_useInfo, 2), info = _useInfo2[0], now2 = _useInfo2[1];
  var weekFirstDay = generateConfig2.locale.getWeekFirstDay(locale2.locale);
  var monthStartDate = generateConfig2.setDate(pickerValue, 1);
  var baseDate = getWeekStartDate(locale2.locale, generateConfig2, monthStartDate);
  var month = generateConfig2.getMonth(pickerValue);
  var showPrefixColumn = showWeek === void 0 ? isWeek : showWeek;
  var prefixColumn = showPrefixColumn ? function(date) {
    var disabled = disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date, {
      type: "week"
    });
    return /* @__PURE__ */ reactExports.createElement("td", {
      key: "week",
      className: classNames(cellPrefixCls, "".concat(cellPrefixCls, "-week"), _defineProperty({}, "".concat(cellPrefixCls, "-disabled"), disabled)),
      onClick: function onClick() {
        if (!disabled) {
          onSelect(date);
        }
      },
      onMouseEnter: function onMouseEnter() {
        if (!disabled) {
          onHover === null || onHover === void 0 || onHover(date);
        }
      },
      onMouseLeave: function onMouseLeave() {
        if (!disabled) {
          onHover === null || onHover === void 0 || onHover(null);
        }
      }
    }, /* @__PURE__ */ reactExports.createElement("div", {
      className: "".concat(cellPrefixCls, "-inner")
    }, generateConfig2.locale.getWeek(locale2.locale, date)));
  } : null;
  var headerCells = [];
  var weekDaysLocale = locale2.shortWeekDays || (generateConfig2.locale.getShortWeekDays ? generateConfig2.locale.getShortWeekDays(locale2.locale) : []);
  if (prefixColumn) {
    headerCells.push(/* @__PURE__ */ reactExports.createElement("th", {
      key: "empty"
    }, /* @__PURE__ */ reactExports.createElement("span", {
      style: {
        width: 0,
        height: 0,
        position: "absolute",
        overflow: "hidden",
        opacity: 0
      }
    }, locale2.week)));
  }
  for (var i = 0; i < WEEK_DAY_COUNT; i += 1) {
    headerCells.push(/* @__PURE__ */ reactExports.createElement("th", {
      key: i
    }, weekDaysLocale[(i + weekFirstDay) % WEEK_DAY_COUNT]));
  }
  var getCellDate = function getCellDate2(date, offset) {
    return generateConfig2.addDate(date, offset);
  };
  var getCellText = function getCellText2(date) {
    return formatValue(date, {
      locale: locale2,
      format: locale2.cellDateFormat,
      generateConfig: generateConfig2
    });
  };
  var getCellClassName = function getCellClassName2(date) {
    var classObj = _defineProperty(_defineProperty({}, "".concat(prefixCls, "-cell-in-view"), isSameMonth$1(generateConfig2, date, pickerValue)), "".concat(prefixCls, "-cell-today"), isSameDate$1(generateConfig2, date, now2));
    return classObj;
  };
  var monthsLocale = locale2.shortMonths || (generateConfig2.locale.getShortMonths ? generateConfig2.locale.getShortMonths(locale2.locale) : []);
  var yearNode = /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    "aria-label": locale2.yearSelect,
    key: "year",
    onClick: function onClick() {
      onModeChange("year", pickerValue);
    },
    tabIndex: -1,
    className: "".concat(prefixCls, "-year-btn")
  }, formatValue(pickerValue, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }));
  var monthNode = /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    "aria-label": locale2.monthSelect,
    key: "month",
    onClick: function onClick() {
      onModeChange("month", pickerValue);
    },
    tabIndex: -1,
    className: "".concat(prefixCls, "-month-btn")
  }, locale2.monthFormat ? formatValue(pickerValue, {
    locale: locale2,
    format: locale2.monthFormat,
    generateConfig: generateConfig2
  }) : monthsLocale[month]);
  var monthYearNodes = locale2.monthBeforeYear ? [monthNode, yearNode] : [yearNode, monthNode];
  return /* @__PURE__ */ reactExports.createElement(PanelContext.Provider, {
    value: info
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames(panelPrefixCls, showWeek && "".concat(panelPrefixCls, "-show-week"))
  }, /* @__PURE__ */ reactExports.createElement(PanelHeader, {
    offset: function offset(distance) {
      return generateConfig2.addMonth(pickerValue, distance);
    },
    superOffset: function superOffset(distance) {
      return generateConfig2.addYear(pickerValue, distance);
    },
    onChange: onPickerValueChange,
    getStart: function getStart(date) {
      return generateConfig2.setDate(date, 1);
    },
    getEnd: function getEnd(date) {
      var clone2 = generateConfig2.setDate(date, 1);
      clone2 = generateConfig2.addMonth(clone2, 1);
      return generateConfig2.addDate(clone2, -1);
    }
  }, monthYearNodes), /* @__PURE__ */ reactExports.createElement(PanelBody, _extends$2({
    titleFormat: locale2.fieldDateFormat
  }, props, {
    colNum: WEEK_DAY_COUNT,
    rowNum: 6,
    baseDate,
    headerCells,
    getCellDate,
    getCellText,
    getCellClassName,
    prefixColumn,
    cellSelection: !isWeek
  }))));
}
var SPEED_PTG = 1 / 3;
function useScrollTo(ulRef, value) {
  var scrollingRef = reactExports.useRef(false);
  var scrollRafRef = reactExports.useRef(null);
  var scrollDistRef = reactExports.useRef(null);
  var isScrolling = function isScrolling2() {
    return scrollingRef.current;
  };
  var stopScroll = function stopScroll2() {
    wrapperRaf.cancel(scrollRafRef.current);
    scrollingRef.current = false;
  };
  var scrollRafTimesRef = reactExports.useRef();
  var startScroll = function startScroll2() {
    var ul = ulRef.current;
    scrollDistRef.current = null;
    scrollRafTimesRef.current = 0;
    if (ul) {
      var targetLi = ul.querySelector('[data-value="'.concat(value, '"]'));
      var firstLi = ul.querySelector("li");
      var doScroll = function doScroll2() {
        stopScroll();
        scrollingRef.current = true;
        scrollRafTimesRef.current += 1;
        var currentTop = ul.scrollTop;
        var firstLiTop = firstLi.offsetTop;
        var targetLiTop = targetLi.offsetTop;
        var targetTop = targetLiTop - firstLiTop;
        if (targetLiTop === 0 && targetLi !== firstLi || !isVisible(ul)) {
          if (scrollRafTimesRef.current <= 5) {
            scrollRafRef.current = wrapperRaf(doScroll2);
          }
          return;
        }
        var nextTop = currentTop + (targetTop - currentTop) * SPEED_PTG;
        var dist = Math.abs(targetTop - nextTop);
        if (scrollDistRef.current !== null && scrollDistRef.current < dist) {
          stopScroll();
          return;
        }
        scrollDistRef.current = dist;
        if (dist <= 1) {
          ul.scrollTop = targetTop;
          stopScroll();
          return;
        }
        ul.scrollTop = nextTop;
        scrollRafRef.current = wrapperRaf(doScroll2);
      };
      if (targetLi && firstLi) {
        doScroll();
      }
    }
  };
  var syncScroll = useEvent$1(startScroll);
  return [syncScroll, stopScroll, isScrolling];
}
var SCROLL_DELAY = 300;
function flattenUnits(units) {
  return units.map(function(_ref) {
    var value = _ref.value, label = _ref.label, disabled = _ref.disabled;
    return [value, label, disabled].join(",");
  }).join(";");
}
function TimeColumn(props) {
  var units = props.units, value = props.value, optionalValue = props.optionalValue, type = props.type, onChange2 = props.onChange, onHover = props.onHover, onDblClick = props.onDblClick, changeOnScroll = props.changeOnScroll;
  var _usePanelContext = usePanelContext(), prefixCls = _usePanelContext.prefixCls, cellRender = _usePanelContext.cellRender, now2 = _usePanelContext.now, locale2 = _usePanelContext.locale;
  var panelPrefixCls = "".concat(prefixCls, "-time-panel");
  var cellPrefixCls = "".concat(prefixCls, "-time-panel-cell");
  var ulRef = reactExports.useRef(null);
  var checkDelayRef = reactExports.useRef();
  var clearDelayCheck = function clearDelayCheck2() {
    clearTimeout(checkDelayRef.current);
  };
  var _useScrollTo = useScrollTo(ulRef, value !== null && value !== void 0 ? value : optionalValue), _useScrollTo2 = _slicedToArray(_useScrollTo, 3), syncScroll = _useScrollTo2[0], stopScroll = _useScrollTo2[1], isScrolling = _useScrollTo2[2];
  useLayoutEffect(function() {
    syncScroll();
    clearDelayCheck();
    return function() {
      stopScroll();
      clearDelayCheck();
    };
  }, [value, optionalValue, flattenUnits(units)]);
  var onInternalScroll = function onInternalScroll2(event) {
    clearDelayCheck();
    var target = event.target;
    if (!isScrolling() && changeOnScroll) {
      checkDelayRef.current = setTimeout(function() {
        var ul = ulRef.current;
        var firstLiTop = ul.querySelector("li").offsetTop;
        var liList = Array.from(ul.querySelectorAll("li"));
        var liTopList = liList.map(function(li) {
          return li.offsetTop - firstLiTop;
        });
        var liDistList = liTopList.map(function(top, index2) {
          if (units[index2].disabled) {
            return Number.MAX_SAFE_INTEGER;
          }
          return Math.abs(top - target.scrollTop);
        });
        var minDist = Math.min.apply(Math, _toConsumableArray(liDistList));
        var minDistIndex = liDistList.findIndex(function(dist) {
          return dist === minDist;
        });
        var targetUnit = units[minDistIndex];
        if (targetUnit && !targetUnit.disabled) {
          onChange2(targetUnit.value);
        }
      }, SCROLL_DELAY);
    }
  };
  var columnPrefixCls = "".concat(panelPrefixCls, "-column");
  return /* @__PURE__ */ reactExports.createElement("ul", {
    className: columnPrefixCls,
    ref: ulRef,
    "data-type": type,
    onScroll: onInternalScroll
  }, units.map(function(_ref2) {
    var label = _ref2.label, unitValue = _ref2.value, disabled = _ref2.disabled;
    var inner = /* @__PURE__ */ reactExports.createElement("div", {
      className: "".concat(cellPrefixCls, "-inner")
    }, label);
    return /* @__PURE__ */ reactExports.createElement("li", {
      key: unitValue,
      className: classNames(cellPrefixCls, _defineProperty(_defineProperty({}, "".concat(cellPrefixCls, "-selected"), value === unitValue), "".concat(cellPrefixCls, "-disabled"), disabled)),
      onClick: function onClick() {
        if (!disabled) {
          onChange2(unitValue);
        }
      },
      onDoubleClick: function onDoubleClick() {
        if (!disabled && onDblClick) {
          onDblClick();
        }
      },
      onMouseEnter: function onMouseEnter() {
        onHover(unitValue);
      },
      onMouseLeave: function onMouseLeave() {
        onHover(null);
      },
      "data-value": unitValue
    }, cellRender ? cellRender(unitValue, {
      prefixCls,
      originNode: inner,
      today: now2,
      type: "time",
      subType: type,
      locale: locale2
    }) : inner);
  }));
}
function isAM(hour) {
  return hour < 12;
}
function TimePanelBody(props) {
  var showHour = props.showHour, showMinute = props.showMinute, showSecond = props.showSecond, showMillisecond = props.showMillisecond, showMeridiem = props.use12Hours, changeOnScroll = props.changeOnScroll;
  var _usePanelContext = usePanelContext(), prefixCls = _usePanelContext.prefixCls, values = _usePanelContext.values, generateConfig2 = _usePanelContext.generateConfig, locale2 = _usePanelContext.locale, onSelect = _usePanelContext.onSelect, _usePanelContext$onHo = _usePanelContext.onHover, onHover = _usePanelContext$onHo === void 0 ? function() {
  } : _usePanelContext$onHo, pickerValue = _usePanelContext.pickerValue;
  var value = (values === null || values === void 0 ? void 0 : values[0]) || null;
  var _React$useContext = reactExports.useContext(PickerHackContext), onCellDblClick = _React$useContext.onCellDblClick;
  var _useTimeInfo = useTimeInfo(generateConfig2, props, value), _useTimeInfo2 = _slicedToArray(_useTimeInfo, 5), getValidTime = _useTimeInfo2[0], rowHourUnits = _useTimeInfo2[1], getMinuteUnits = _useTimeInfo2[2], getSecondUnits = _useTimeInfo2[3], getMillisecondUnits = _useTimeInfo2[4];
  var getUnitValue = function getUnitValue2(func) {
    var valueUnitVal = value && generateConfig2[func](value);
    var pickerUnitValue = pickerValue && generateConfig2[func](pickerValue);
    return [valueUnitVal, pickerUnitValue];
  };
  var _getUnitValue = getUnitValue("getHour"), _getUnitValue2 = _slicedToArray(_getUnitValue, 2), hour = _getUnitValue2[0], pickerHour = _getUnitValue2[1];
  var _getUnitValue3 = getUnitValue("getMinute"), _getUnitValue4 = _slicedToArray(_getUnitValue3, 2), minute = _getUnitValue4[0], pickerMinute = _getUnitValue4[1];
  var _getUnitValue5 = getUnitValue("getSecond"), _getUnitValue6 = _slicedToArray(_getUnitValue5, 2), second = _getUnitValue6[0], pickerSecond = _getUnitValue6[1];
  var _getUnitValue7 = getUnitValue("getMillisecond"), _getUnitValue8 = _slicedToArray(_getUnitValue7, 2), millisecond = _getUnitValue8[0], pickerMillisecond = _getUnitValue8[1];
  var meridiem = hour === null ? null : isAM(hour) ? "am" : "pm";
  var hourUnits = reactExports.useMemo(function() {
    if (!showMeridiem) {
      return rowHourUnits;
    }
    return isAM(hour) ? rowHourUnits.filter(function(h) {
      return isAM(h.value);
    }) : rowHourUnits.filter(function(h) {
      return !isAM(h.value);
    });
  }, [hour, rowHourUnits, showMeridiem]);
  var getEnabled = function getEnabled2(units, val) {
    var _enabledUnits$;
    var enabledUnits = units.filter(function(unit2) {
      return !unit2.disabled;
    });
    return val !== null && val !== void 0 ? val : (
      // Fallback to enabled value
      enabledUnits === null || enabledUnits === void 0 || (_enabledUnits$ = enabledUnits[0]) === null || _enabledUnits$ === void 0 ? void 0 : _enabledUnits$.value
    );
  };
  var validHour = getEnabled(rowHourUnits, hour);
  var minuteUnits = reactExports.useMemo(function() {
    return getMinuteUnits(validHour);
  }, [getMinuteUnits, validHour]);
  var validMinute = getEnabled(minuteUnits, minute);
  var secondUnits = reactExports.useMemo(function() {
    return getSecondUnits(validHour, validMinute);
  }, [getSecondUnits, validHour, validMinute]);
  var validSecond = getEnabled(secondUnits, second);
  var millisecondUnits = reactExports.useMemo(function() {
    return getMillisecondUnits(validHour, validMinute, validSecond);
  }, [getMillisecondUnits, validHour, validMinute, validSecond]);
  var validMillisecond = getEnabled(millisecondUnits, millisecond);
  var meridiemUnits = reactExports.useMemo(function() {
    if (!showMeridiem) {
      return [];
    }
    var base = generateConfig2.getNow();
    var amDate = generateConfig2.setHour(base, 6);
    var pmDate = generateConfig2.setHour(base, 18);
    var formatMeridiem = function formatMeridiem2(date, defaultLabel) {
      var cellMeridiemFormat = locale2.cellMeridiemFormat;
      return cellMeridiemFormat ? formatValue(date, {
        generateConfig: generateConfig2,
        locale: locale2,
        format: cellMeridiemFormat
      }) : defaultLabel;
    };
    return [{
      label: formatMeridiem(amDate, "AM"),
      value: "am",
      disabled: rowHourUnits.every(function(h) {
        return h.disabled || !isAM(h.value);
      })
    }, {
      label: formatMeridiem(pmDate, "PM"),
      value: "pm",
      disabled: rowHourUnits.every(function(h) {
        return h.disabled || isAM(h.value);
      })
    }];
  }, [rowHourUnits, showMeridiem, generateConfig2, locale2]);
  var triggerChange = function triggerChange2(nextDate) {
    var validateDate = getValidTime(nextDate);
    onSelect(validateDate);
  };
  var triggerDateTmpl = reactExports.useMemo(function() {
    var tmpl = value || pickerValue || generateConfig2.getNow();
    var isNotNull = function isNotNull2(num) {
      return num !== null && num !== void 0;
    };
    if (isNotNull(hour)) {
      tmpl = generateConfig2.setHour(tmpl, hour);
      tmpl = generateConfig2.setMinute(tmpl, minute);
      tmpl = generateConfig2.setSecond(tmpl, second);
      tmpl = generateConfig2.setMillisecond(tmpl, millisecond);
    } else if (isNotNull(pickerHour)) {
      tmpl = generateConfig2.setHour(tmpl, pickerHour);
      tmpl = generateConfig2.setMinute(tmpl, pickerMinute);
      tmpl = generateConfig2.setSecond(tmpl, pickerSecond);
      tmpl = generateConfig2.setMillisecond(tmpl, pickerMillisecond);
    } else if (isNotNull(validHour)) {
      tmpl = generateConfig2.setHour(tmpl, validHour);
      tmpl = generateConfig2.setMinute(tmpl, validMinute);
      tmpl = generateConfig2.setSecond(tmpl, validSecond);
      tmpl = generateConfig2.setMillisecond(tmpl, validMillisecond);
    }
    return tmpl;
  }, [value, pickerValue, hour, minute, second, millisecond, validHour, validMinute, validSecond, validMillisecond, pickerHour, pickerMinute, pickerSecond, pickerMillisecond, generateConfig2]);
  var fillColumnValue = function fillColumnValue2(val, func) {
    if (val === null) {
      return null;
    }
    return generateConfig2[func](triggerDateTmpl, val);
  };
  var getNextHourTime = function getNextHourTime2(val) {
    return fillColumnValue(val, "setHour");
  };
  var getNextMinuteTime = function getNextMinuteTime2(val) {
    return fillColumnValue(val, "setMinute");
  };
  var getNextSecondTime = function getNextSecondTime2(val) {
    return fillColumnValue(val, "setSecond");
  };
  var getNextMillisecondTime = function getNextMillisecondTime2(val) {
    return fillColumnValue(val, "setMillisecond");
  };
  var getMeridiemTime = function getMeridiemTime2(val) {
    if (val === null) {
      return null;
    }
    if (val === "am" && !isAM(hour)) {
      return generateConfig2.setHour(triggerDateTmpl, hour - 12);
    } else if (val === "pm" && isAM(hour)) {
      return generateConfig2.setHour(triggerDateTmpl, hour + 12);
    }
    return triggerDateTmpl;
  };
  var onHourChange = function onHourChange2(val) {
    triggerChange(getNextHourTime(val));
  };
  var onMinuteChange = function onMinuteChange2(val) {
    triggerChange(getNextMinuteTime(val));
  };
  var onSecondChange = function onSecondChange2(val) {
    triggerChange(getNextSecondTime(val));
  };
  var onMillisecondChange = function onMillisecondChange2(val) {
    triggerChange(getNextMillisecondTime(val));
  };
  var onMeridiemChange = function onMeridiemChange2(val) {
    triggerChange(getMeridiemTime(val));
  };
  var onHourHover = function onHourHover2(val) {
    onHover(getNextHourTime(val));
  };
  var onMinuteHover = function onMinuteHover2(val) {
    onHover(getNextMinuteTime(val));
  };
  var onSecondHover = function onSecondHover2(val) {
    onHover(getNextSecondTime(val));
  };
  var onMillisecondHover = function onMillisecondHover2(val) {
    onHover(getNextMillisecondTime(val));
  };
  var onMeridiemHover = function onMeridiemHover2(val) {
    onHover(getMeridiemTime(val));
  };
  var sharedColumnProps = {
    onDblClick: onCellDblClick,
    changeOnScroll
  };
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-content")
  }, showHour && /* @__PURE__ */ reactExports.createElement(TimeColumn, _extends$2({
    units: hourUnits,
    value: hour,
    optionalValue: pickerHour,
    type: "hour",
    onChange: onHourChange,
    onHover: onHourHover
  }, sharedColumnProps)), showMinute && /* @__PURE__ */ reactExports.createElement(TimeColumn, _extends$2({
    units: minuteUnits,
    value: minute,
    optionalValue: pickerMinute,
    type: "minute",
    onChange: onMinuteChange,
    onHover: onMinuteHover
  }, sharedColumnProps)), showSecond && /* @__PURE__ */ reactExports.createElement(TimeColumn, _extends$2({
    units: secondUnits,
    value: second,
    optionalValue: pickerSecond,
    type: "second",
    onChange: onSecondChange,
    onHover: onSecondHover
  }, sharedColumnProps)), showMillisecond && /* @__PURE__ */ reactExports.createElement(TimeColumn, _extends$2({
    units: millisecondUnits,
    value: millisecond,
    optionalValue: pickerMillisecond,
    type: "millisecond",
    onChange: onMillisecondChange,
    onHover: onMillisecondHover
  }, sharedColumnProps)), showMeridiem && /* @__PURE__ */ reactExports.createElement(TimeColumn, _extends$2({
    units: meridiemUnits,
    value: meridiem,
    type: "meridiem",
    onChange: onMeridiemChange,
    onHover: onMeridiemHover
  }, sharedColumnProps)));
}
function TimePanel(props) {
  var prefixCls = props.prefixCls, value = props.value, locale2 = props.locale, generateConfig2 = props.generateConfig, showTime = props.showTime;
  var _ref = showTime || {}, format2 = _ref.format;
  var panelPrefixCls = "".concat(prefixCls, "-time-panel");
  var _useInfo = useInfo(props, "time"), _useInfo2 = _slicedToArray(_useInfo, 1), info = _useInfo2[0];
  return /* @__PURE__ */ reactExports.createElement(PanelContext.Provider, {
    value: info
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames(panelPrefixCls)
  }, /* @__PURE__ */ reactExports.createElement(PanelHeader, null, value ? formatValue(value, {
    locale: locale2,
    format: format2,
    generateConfig: generateConfig2
  }) : " "), /* @__PURE__ */ reactExports.createElement(TimePanelBody, showTime)));
}
function DateTimePanel(props) {
  var prefixCls = props.prefixCls, generateConfig2 = props.generateConfig, showTime = props.showTime, onSelect = props.onSelect, value = props.value, pickerValue = props.pickerValue, onHover = props.onHover;
  var panelPrefixCls = "".concat(prefixCls, "-datetime-panel");
  var _useTimeInfo = useTimeInfo(generateConfig2, showTime), _useTimeInfo2 = _slicedToArray(_useTimeInfo, 1), getValidTime = _useTimeInfo2[0];
  var mergeTime = function mergeTime2(date) {
    if (value) {
      return fillTime(generateConfig2, date, value);
    }
    return fillTime(generateConfig2, date, pickerValue);
  };
  var onDateHover = function onDateHover2(date) {
    onHover === null || onHover === void 0 || onHover(date ? mergeTime(date) : date);
  };
  var onDateSelect = function onDateSelect2(date) {
    var cloneDate = mergeTime(date);
    onSelect(getValidTime(cloneDate, cloneDate));
  };
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: panelPrefixCls
  }, /* @__PURE__ */ reactExports.createElement(DatePanel, _extends$2({}, props, {
    onSelect: onDateSelect,
    onHover: onDateHover
  })), /* @__PURE__ */ reactExports.createElement(TimePanel, props));
}
function DecadePanel(props) {
  var prefixCls = props.prefixCls, locale2 = props.locale, generateConfig2 = props.generateConfig, pickerValue = props.pickerValue, disabledDate = props.disabledDate, onPickerValueChange = props.onPickerValueChange;
  var panelPrefixCls = "".concat(prefixCls, "-decade-panel");
  var _useInfo = useInfo(props, "decade"), _useInfo2 = _slicedToArray(_useInfo, 1), info = _useInfo2[0];
  var getStartYear = function getStartYear2(date) {
    var startYear = Math.floor(generateConfig2.getYear(date) / 100) * 100;
    return generateConfig2.setYear(date, startYear);
  };
  var getEndYear = function getEndYear2(date) {
    var startYear = getStartYear(date);
    return generateConfig2.addYear(startYear, 99);
  };
  var startYearDate = getStartYear(pickerValue);
  var endYearDate = getEndYear(pickerValue);
  var baseDate = generateConfig2.addYear(startYearDate, -10);
  var getCellDate = function getCellDate2(date, offset) {
    return generateConfig2.addYear(date, offset * 10);
  };
  var getCellText = function getCellText2(date) {
    var cellYearFormat = locale2.cellYearFormat;
    var startYearStr = formatValue(date, {
      locale: locale2,
      format: cellYearFormat,
      generateConfig: generateConfig2
    });
    var endYearStr = formatValue(generateConfig2.addYear(date, 9), {
      locale: locale2,
      format: cellYearFormat,
      generateConfig: generateConfig2
    });
    return "".concat(startYearStr, "-").concat(endYearStr);
  };
  var getCellClassName = function getCellClassName2(date) {
    return _defineProperty({}, "".concat(prefixCls, "-cell-in-view"), isSameDecade(generateConfig2, date, startYearDate) || isSameDecade(generateConfig2, date, endYearDate) || isInRange(generateConfig2, startYearDate, endYearDate, date));
  };
  var mergedDisabledDate = disabledDate ? function(currentDate, disabledInfo) {
    var baseStartDate = generateConfig2.setDate(currentDate, 1);
    var baseStartMonth = generateConfig2.setMonth(baseStartDate, 0);
    var baseStartYear = generateConfig2.setYear(baseStartMonth, Math.floor(generateConfig2.getYear(baseStartMonth) / 10) * 10);
    var baseEndYear = generateConfig2.addYear(baseStartYear, 10);
    var baseEndDate = generateConfig2.addDate(baseEndYear, -1);
    return disabledDate(baseStartYear, disabledInfo) && disabledDate(baseEndDate, disabledInfo);
  } : null;
  var yearNode = "".concat(formatValue(startYearDate, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }), "-").concat(formatValue(endYearDate, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }));
  return /* @__PURE__ */ reactExports.createElement(PanelContext.Provider, {
    value: info
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: panelPrefixCls
  }, /* @__PURE__ */ reactExports.createElement(PanelHeader, {
    superOffset: function superOffset(distance) {
      return generateConfig2.addYear(pickerValue, distance * 100);
    },
    onChange: onPickerValueChange,
    getStart: getStartYear,
    getEnd: getEndYear
  }, yearNode), /* @__PURE__ */ reactExports.createElement(PanelBody, _extends$2({}, props, {
    disabledDate: mergedDisabledDate,
    colNum: 3,
    rowNum: 4,
    baseDate,
    getCellDate,
    getCellText,
    getCellClassName
  }))));
}
function MonthPanel(props) {
  var prefixCls = props.prefixCls, locale2 = props.locale, generateConfig2 = props.generateConfig, pickerValue = props.pickerValue, disabledDate = props.disabledDate, onPickerValueChange = props.onPickerValueChange, onModeChange = props.onModeChange;
  var panelPrefixCls = "".concat(prefixCls, "-month-panel");
  var _useInfo = useInfo(props, "month"), _useInfo2 = _slicedToArray(_useInfo, 1), info = _useInfo2[0];
  var baseDate = generateConfig2.setMonth(pickerValue, 0);
  var monthsLocale = locale2.shortMonths || (generateConfig2.locale.getShortMonths ? generateConfig2.locale.getShortMonths(locale2.locale) : []);
  var getCellDate = function getCellDate2(date, offset) {
    return generateConfig2.addMonth(date, offset);
  };
  var getCellText = function getCellText2(date) {
    var month = generateConfig2.getMonth(date);
    return locale2.monthFormat ? formatValue(date, {
      locale: locale2,
      format: locale2.monthFormat,
      generateConfig: generateConfig2
    }) : monthsLocale[month];
  };
  var getCellClassName = function getCellClassName2() {
    return _defineProperty({}, "".concat(prefixCls, "-cell-in-view"), true);
  };
  var mergedDisabledDate = disabledDate ? function(currentDate, disabledInfo) {
    var startDate = generateConfig2.setDate(currentDate, 1);
    var nextMonthStartDate = generateConfig2.setMonth(startDate, generateConfig2.getMonth(startDate) + 1);
    var endDate = generateConfig2.addDate(nextMonthStartDate, -1);
    return disabledDate(startDate, disabledInfo) && disabledDate(endDate, disabledInfo);
  } : null;
  var yearNode = /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    key: "year",
    "aria-label": locale2.yearSelect,
    onClick: function onClick() {
      onModeChange("year");
    },
    tabIndex: -1,
    className: "".concat(prefixCls, "-year-btn")
  }, formatValue(pickerValue, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }));
  return /* @__PURE__ */ reactExports.createElement(PanelContext.Provider, {
    value: info
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: panelPrefixCls
  }, /* @__PURE__ */ reactExports.createElement(PanelHeader, {
    superOffset: function superOffset(distance) {
      return generateConfig2.addYear(pickerValue, distance);
    },
    onChange: onPickerValueChange,
    getStart: function getStart(date) {
      return generateConfig2.setMonth(date, 0);
    },
    getEnd: function getEnd(date) {
      return generateConfig2.setMonth(date, 11);
    }
  }, yearNode), /* @__PURE__ */ reactExports.createElement(PanelBody, _extends$2({}, props, {
    disabledDate: mergedDisabledDate,
    titleFormat: locale2.fieldMonthFormat,
    colNum: 3,
    rowNum: 4,
    baseDate,
    getCellDate,
    getCellText,
    getCellClassName
  }))));
}
function QuarterPanel(props) {
  var prefixCls = props.prefixCls, locale2 = props.locale, generateConfig2 = props.generateConfig, pickerValue = props.pickerValue, onPickerValueChange = props.onPickerValueChange, onModeChange = props.onModeChange;
  var panelPrefixCls = "".concat(prefixCls, "-quarter-panel");
  var _useInfo = useInfo(props, "quarter"), _useInfo2 = _slicedToArray(_useInfo, 1), info = _useInfo2[0];
  var baseDate = generateConfig2.setMonth(pickerValue, 0);
  var getCellDate = function getCellDate2(date, offset) {
    return generateConfig2.addMonth(date, offset * 3);
  };
  var getCellText = function getCellText2(date) {
    return formatValue(date, {
      locale: locale2,
      format: locale2.cellQuarterFormat,
      generateConfig: generateConfig2
    });
  };
  var getCellClassName = function getCellClassName2() {
    return _defineProperty({}, "".concat(prefixCls, "-cell-in-view"), true);
  };
  var yearNode = /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    key: "year",
    "aria-label": locale2.yearSelect,
    onClick: function onClick() {
      onModeChange("year");
    },
    tabIndex: -1,
    className: "".concat(prefixCls, "-year-btn")
  }, formatValue(pickerValue, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }));
  return /* @__PURE__ */ reactExports.createElement(PanelContext.Provider, {
    value: info
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: panelPrefixCls
  }, /* @__PURE__ */ reactExports.createElement(PanelHeader, {
    superOffset: function superOffset(distance) {
      return generateConfig2.addYear(pickerValue, distance);
    },
    onChange: onPickerValueChange,
    getStart: function getStart(date) {
      return generateConfig2.setMonth(date, 0);
    },
    getEnd: function getEnd(date) {
      return generateConfig2.setMonth(date, 11);
    }
  }, yearNode), /* @__PURE__ */ reactExports.createElement(PanelBody, _extends$2({}, props, {
    titleFormat: locale2.fieldQuarterFormat,
    colNum: 4,
    rowNum: 1,
    baseDate,
    getCellDate,
    getCellText,
    getCellClassName
  }))));
}
function WeekPanel(props) {
  var prefixCls = props.prefixCls, generateConfig2 = props.generateConfig, locale2 = props.locale, value = props.value, hoverValue = props.hoverValue, hoverRangeValue = props.hoverRangeValue;
  var localeName = locale2.locale;
  var rowPrefixCls = "".concat(prefixCls, "-week-panel-row");
  var rowClassName = function rowClassName2(currentDate) {
    var rangeCls = {};
    if (hoverRangeValue) {
      var _hoverRangeValue = _slicedToArray(hoverRangeValue, 2), rangeStart = _hoverRangeValue[0], rangeEnd = _hoverRangeValue[1];
      var isRangeStart = isSameWeek(generateConfig2, localeName, rangeStart, currentDate);
      var isRangeEnd = isSameWeek(generateConfig2, localeName, rangeEnd, currentDate);
      rangeCls["".concat(rowPrefixCls, "-range-start")] = isRangeStart;
      rangeCls["".concat(rowPrefixCls, "-range-end")] = isRangeEnd;
      rangeCls["".concat(rowPrefixCls, "-range-hover")] = !isRangeStart && !isRangeEnd && isInRange(generateConfig2, rangeStart, rangeEnd, currentDate);
    }
    if (hoverValue) {
      rangeCls["".concat(rowPrefixCls, "-hover")] = hoverValue.some(function(date) {
        return isSameWeek(generateConfig2, localeName, currentDate, date);
      });
    }
    return classNames(
      rowPrefixCls,
      _defineProperty({}, "".concat(rowPrefixCls, "-selected"), !hoverRangeValue && isSameWeek(generateConfig2, localeName, value, currentDate)),
      // Patch for hover range
      rangeCls
    );
  };
  return /* @__PURE__ */ reactExports.createElement(DatePanel, _extends$2({}, props, {
    mode: "week",
    panelName: "week",
    rowClassName
  }));
}
function YearPanel(props) {
  var prefixCls = props.prefixCls, locale2 = props.locale, generateConfig2 = props.generateConfig, pickerValue = props.pickerValue, disabledDate = props.disabledDate, onPickerValueChange = props.onPickerValueChange, onModeChange = props.onModeChange;
  var panelPrefixCls = "".concat(prefixCls, "-year-panel");
  var _useInfo = useInfo(props, "year"), _useInfo2 = _slicedToArray(_useInfo, 1), info = _useInfo2[0];
  var getStartYear = function getStartYear2(date) {
    var startYear = Math.floor(generateConfig2.getYear(date) / 10) * 10;
    return generateConfig2.setYear(date, startYear);
  };
  var getEndYear = function getEndYear2(date) {
    var startYear = getStartYear(date);
    return generateConfig2.addYear(startYear, 9);
  };
  var startYearDate = getStartYear(pickerValue);
  var endYearDate = getEndYear(pickerValue);
  var baseDate = generateConfig2.addYear(startYearDate, -1);
  var getCellDate = function getCellDate2(date, offset) {
    return generateConfig2.addYear(date, offset);
  };
  var getCellText = function getCellText2(date) {
    return formatValue(date, {
      locale: locale2,
      format: locale2.cellYearFormat,
      generateConfig: generateConfig2
    });
  };
  var getCellClassName = function getCellClassName2(date) {
    return _defineProperty({}, "".concat(prefixCls, "-cell-in-view"), isSameYear$1(generateConfig2, date, startYearDate) || isSameYear$1(generateConfig2, date, endYearDate) || isInRange(generateConfig2, startYearDate, endYearDate, date));
  };
  var mergedDisabledDate = disabledDate ? function(currentDate, disabledInfo) {
    var startMonth = generateConfig2.setMonth(currentDate, 0);
    var startDate = generateConfig2.setDate(startMonth, 1);
    var endMonth = generateConfig2.addYear(startDate, 1);
    var endDate = generateConfig2.addDate(endMonth, -1);
    return disabledDate(startDate, disabledInfo) && disabledDate(endDate, disabledInfo);
  } : null;
  var yearNode = /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    key: "decade",
    "aria-label": locale2.decadeSelect,
    onClick: function onClick() {
      onModeChange("decade");
    },
    tabIndex: -1,
    className: "".concat(prefixCls, "-decade-btn")
  }, formatValue(startYearDate, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }), "-", formatValue(endYearDate, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }));
  return /* @__PURE__ */ reactExports.createElement(PanelContext.Provider, {
    value: info
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: panelPrefixCls
  }, /* @__PURE__ */ reactExports.createElement(PanelHeader, {
    superOffset: function superOffset(distance) {
      return generateConfig2.addYear(pickerValue, distance * 10);
    },
    onChange: onPickerValueChange,
    getStart: getStartYear,
    getEnd: getEndYear
  }, yearNode), /* @__PURE__ */ reactExports.createElement(PanelBody, _extends$2({}, props, {
    disabledDate: mergedDisabledDate,
    titleFormat: locale2.fieldYearFormat,
    colNum: 3,
    rowNum: 4,
    baseDate,
    getCellDate,
    getCellText,
    getCellClassName
  }))));
}
var DefaultComponents = {
  date: DatePanel,
  datetime: DateTimePanel,
  week: WeekPanel,
  month: MonthPanel,
  quarter: QuarterPanel,
  year: YearPanel,
  decade: DecadePanel,
  time: TimePanel
};
function PickerPanel(props, ref) {
  var _React$useContext;
  var locale2 = props.locale, generateConfig2 = props.generateConfig, direction = props.direction, prefixCls = props.prefixCls, _props$tabIndex = props.tabIndex, tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex, multiple = props.multiple, defaultValue2 = props.defaultValue, value = props.value, onChange2 = props.onChange, onSelect = props.onSelect, defaultPickerValue = props.defaultPickerValue, pickerValue = props.pickerValue, onPickerValueChange = props.onPickerValueChange, mode = props.mode, onPanelChange = props.onPanelChange, _props$picker = props.picker, picker = _props$picker === void 0 ? "date" : _props$picker, showTime = props.showTime, hoverValue = props.hoverValue, hoverRangeValue = props.hoverRangeValue, cellRender = props.cellRender, dateRender = props.dateRender, monthCellRender = props.monthCellRender, _props$components = props.components, components2 = _props$components === void 0 ? {} : _props$components, hideHeader = props.hideHeader;
  var mergedPrefixCls = ((_React$useContext = reactExports.useContext(PickerContext)) === null || _React$useContext === void 0 ? void 0 : _React$useContext.prefixCls) || prefixCls || "rc-picker";
  var rootRef = reactExports.useRef();
  reactExports.useImperativeHandle(ref, function() {
    return {
      nativeElement: rootRef.current
    };
  });
  var _getTimeProps = getTimeProps(props), _getTimeProps2 = _slicedToArray(_getTimeProps, 4), timeProps = _getTimeProps2[0], localeTimeProps = _getTimeProps2[1], showTimeFormat = _getTimeProps2[2], propFormat = _getTimeProps2[3];
  var filledLocale = useLocale(locale2, localeTimeProps);
  var internalPicker = picker === "date" && showTime ? "datetime" : picker;
  var mergedShowTime = reactExports.useMemo(function() {
    return fillShowTimeConfig(internalPicker, showTimeFormat, propFormat, timeProps, filledLocale);
  }, [internalPicker, showTimeFormat, propFormat, timeProps, filledLocale]);
  var now2 = generateConfig2.getNow();
  var _useMergedState = useMergedState(picker, {
    value: mode,
    postState: function postState(val) {
      return val || "date";
    }
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedMode = _useMergedState2[0], setMergedMode = _useMergedState2[1];
  var internalMode = mergedMode === "date" && mergedShowTime ? "datetime" : mergedMode;
  var toggleDates = useToggleDates(generateConfig2, locale2, internalPicker);
  var _useMergedState3 = useMergedState(defaultValue2, {
    value
  }), _useMergedState4 = _slicedToArray(_useMergedState3, 2), innerValue = _useMergedState4[0], setMergedValue = _useMergedState4[1];
  var mergedValue = reactExports.useMemo(function() {
    var values = toArray(innerValue).filter(function(val) {
      return val;
    });
    return multiple ? values : values.slice(0, 1);
  }, [innerValue, multiple]);
  var triggerChange = useEvent$1(function(nextValue) {
    setMergedValue(nextValue);
    if (onChange2 && (nextValue === null || mergedValue.length !== nextValue.length || mergedValue.some(function(ori, index2) {
      return !isSame(generateConfig2, locale2, ori, nextValue[index2], internalPicker);
    }))) {
      onChange2 === null || onChange2 === void 0 || onChange2(multiple ? nextValue : nextValue[0]);
    }
  });
  var onInternalSelect = useEvent$1(function(newDate) {
    onSelect === null || onSelect === void 0 || onSelect(newDate);
    if (mergedMode === picker) {
      var nextValues = multiple ? toggleDates(mergedValue, newDate) : [newDate];
      triggerChange(nextValues);
    }
  });
  var _useMergedState5 = useMergedState(defaultPickerValue || mergedValue[0] || now2, {
    value: pickerValue
  }), _useMergedState6 = _slicedToArray(_useMergedState5, 2), mergedPickerValue = _useMergedState6[0], setInternalPickerValue = _useMergedState6[1];
  reactExports.useEffect(function() {
    if (mergedValue[0] && !pickerValue) {
      setInternalPickerValue(mergedValue[0]);
    }
  }, [mergedValue[0]]);
  var triggerPanelChange = function triggerPanelChange2(viewDate, nextMode) {
    onPanelChange === null || onPanelChange === void 0 || onPanelChange(viewDate || pickerValue, nextMode || mergedMode);
  };
  var setPickerValue = function setPickerValue2(nextPickerValue) {
    var triggerPanelEvent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    setInternalPickerValue(nextPickerValue);
    onPickerValueChange === null || onPickerValueChange === void 0 || onPickerValueChange(nextPickerValue);
    if (triggerPanelEvent) {
      triggerPanelChange(nextPickerValue);
    }
  };
  var triggerModeChange = function triggerModeChange2(nextMode, viewDate) {
    setMergedMode(nextMode);
    if (viewDate) {
      setPickerValue(viewDate);
    }
    triggerPanelChange(viewDate, nextMode);
  };
  var onPanelValueSelect = function onPanelValueSelect2(nextValue) {
    onInternalSelect(nextValue);
    setPickerValue(nextValue);
    if (mergedMode !== picker) {
      var decadeYearQueue = ["decade", "year"];
      var decadeYearMonthQueue = [].concat(decadeYearQueue, ["month"]);
      var pickerQueue = {
        quarter: [].concat(decadeYearQueue, ["quarter"]),
        week: [].concat(_toConsumableArray(decadeYearMonthQueue), ["week"]),
        date: [].concat(_toConsumableArray(decadeYearMonthQueue), ["date"])
      };
      var queue = pickerQueue[picker] || decadeYearMonthQueue;
      var index2 = queue.indexOf(mergedMode);
      var nextMode = queue[index2 + 1];
      if (nextMode) {
        triggerModeChange(nextMode, nextValue);
      }
    }
  };
  var hoverRangeDate = reactExports.useMemo(function() {
    var start;
    var end;
    if (Array.isArray(hoverRangeValue)) {
      var _hoverRangeValue = _slicedToArray(hoverRangeValue, 2);
      start = _hoverRangeValue[0];
      end = _hoverRangeValue[1];
    } else {
      start = hoverRangeValue;
    }
    if (!start && !end) {
      return null;
    }
    start = start || end;
    end = end || start;
    return generateConfig2.isAfter(start, end) ? [end, start] : [start, end];
  }, [hoverRangeValue, generateConfig2]);
  var onInternalCellRender = useCellRender(cellRender, dateRender, monthCellRender);
  var PanelComponent = components2[internalMode] || DefaultComponents[internalMode] || DatePanel;
  var parentHackContext = reactExports.useContext(PickerHackContext);
  var pickerPanelContext = reactExports.useMemo(function() {
    return _objectSpread2(_objectSpread2({}, parentHackContext), {}, {
      hideHeader
    });
  }, [parentHackContext, hideHeader]);
  var panelCls = "".concat(mergedPrefixCls, "-panel");
  var panelProps = pickProps(props, [
    // Week
    "showWeek",
    // Icons
    "prevIcon",
    "nextIcon",
    "superPrevIcon",
    "superNextIcon",
    // Disabled
    "disabledDate",
    "minDate",
    "maxDate",
    // Hover
    "onHover"
  ]);
  return /* @__PURE__ */ reactExports.createElement(PickerHackContext.Provider, {
    value: pickerPanelContext
  }, /* @__PURE__ */ reactExports.createElement("div", {
    ref: rootRef,
    tabIndex,
    className: classNames(panelCls, _defineProperty({}, "".concat(panelCls, "-rtl"), direction === "rtl"))
  }, /* @__PURE__ */ reactExports.createElement(PanelComponent, _extends$2({}, panelProps, {
    // Time
    showTime: mergedShowTime,
    prefixCls: mergedPrefixCls,
    locale: filledLocale,
    generateConfig: generateConfig2,
    onModeChange: triggerModeChange,
    pickerValue: mergedPickerValue,
    onPickerValueChange: function onPickerValueChange2(nextPickerValue) {
      setPickerValue(nextPickerValue, true);
    },
    value: mergedValue[0],
    onSelect: onPanelValueSelect,
    values: mergedValue,
    cellRender: onInternalCellRender,
    hoverRangeValue: hoverRangeDate,
    hoverValue
  }))));
}
var RefPanelPicker = /* @__PURE__ */ reactExports.memo(/* @__PURE__ */ reactExports.forwardRef(PickerPanel));
function PopupPanel(props) {
  var picker = props.picker, multiplePanel = props.multiplePanel, pickerValue = props.pickerValue, onPickerValueChange = props.onPickerValueChange, needConfirm = props.needConfirm, onSubmit = props.onSubmit, range = props.range, hoverValue = props.hoverValue;
  var _React$useContext = reactExports.useContext(PickerContext), prefixCls = _React$useContext.prefixCls, generateConfig2 = _React$useContext.generateConfig;
  var internalOffsetDate = reactExports.useCallback(function(date, offset) {
    return offsetPanelDate(generateConfig2, picker, date, offset);
  }, [generateConfig2, picker]);
  var nextPickerValue = reactExports.useMemo(function() {
    return internalOffsetDate(pickerValue, 1);
  }, [pickerValue, internalOffsetDate]);
  var onSecondPickerValueChange = function onSecondPickerValueChange2(nextDate) {
    onPickerValueChange(internalOffsetDate(nextDate, -1));
  };
  var sharedContext = {
    onCellDblClick: function onCellDblClick() {
      if (needConfirm) {
        onSubmit();
      }
    }
  };
  var hideHeader = picker === "time";
  var pickerProps = _objectSpread2(_objectSpread2({}, props), {}, {
    hoverValue: null,
    hoverRangeValue: null,
    hideHeader
  });
  if (range) {
    pickerProps.hoverRangeValue = hoverValue;
  } else {
    pickerProps.hoverValue = hoverValue;
  }
  if (multiplePanel) {
    return /* @__PURE__ */ reactExports.createElement("div", {
      className: "".concat(prefixCls, "-panels")
    }, /* @__PURE__ */ reactExports.createElement(PickerHackContext.Provider, {
      value: _objectSpread2(_objectSpread2({}, sharedContext), {}, {
        hideNext: true
      })
    }, /* @__PURE__ */ reactExports.createElement(RefPanelPicker, pickerProps)), /* @__PURE__ */ reactExports.createElement(PickerHackContext.Provider, {
      value: _objectSpread2(_objectSpread2({}, sharedContext), {}, {
        hidePrev: true
      })
    }, /* @__PURE__ */ reactExports.createElement(RefPanelPicker, _extends$2({}, pickerProps, {
      pickerValue: nextPickerValue,
      onPickerValueChange: onSecondPickerValueChange
    }))));
  }
  return /* @__PURE__ */ reactExports.createElement(PickerHackContext.Provider, {
    value: _objectSpread2({}, sharedContext)
  }, /* @__PURE__ */ reactExports.createElement(RefPanelPicker, pickerProps));
}
function executeValue(value) {
  return typeof value === "function" ? value() : value;
}
function PresetPanel(props) {
  var prefixCls = props.prefixCls, presets = props.presets, _onClick = props.onClick, onHover = props.onHover;
  if (!presets.length) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-presets")
  }, /* @__PURE__ */ reactExports.createElement("ul", null, presets.map(function(_ref, index2) {
    var label = _ref.label, value = _ref.value;
    return /* @__PURE__ */ reactExports.createElement("li", {
      key: index2,
      onClick: function onClick() {
        _onClick(executeValue(value));
      },
      onMouseEnter: function onMouseEnter() {
        onHover(executeValue(value));
      },
      onMouseLeave: function onMouseLeave() {
        onHover(null);
      }
    }, label);
  })));
}
function Popup(props) {
  var panelRender = props.panelRender, internalMode = props.internalMode, picker = props.picker, showNow = props.showNow, range = props.range, multiple = props.multiple, _props$activeInfo = props.activeInfo, activeInfo = _props$activeInfo === void 0 ? [0, 0, 0] : _props$activeInfo, presets = props.presets, onPresetHover = props.onPresetHover, onPresetSubmit = props.onPresetSubmit, onFocus = props.onFocus, onBlur = props.onBlur, onPanelMouseDown = props.onPanelMouseDown, direction = props.direction, value = props.value, onSelect = props.onSelect, isInvalid = props.isInvalid, defaultOpenValue = props.defaultOpenValue, onOk = props.onOk, onSubmit = props.onSubmit;
  var _React$useContext = reactExports.useContext(PickerContext), prefixCls = _React$useContext.prefixCls;
  var panelPrefixCls = "".concat(prefixCls, "-panel");
  var rtl = direction === "rtl";
  var arrowRef = reactExports.useRef(null);
  var wrapperRef = reactExports.useRef(null);
  var _React$useState = reactExports.useState(0), _React$useState2 = _slicedToArray(_React$useState, 2), containerWidth = _React$useState2[0], setContainerWidth = _React$useState2[1];
  var _React$useState3 = reactExports.useState(0), _React$useState4 = _slicedToArray(_React$useState3, 2), containerOffset = _React$useState4[0], setContainerOffset = _React$useState4[1];
  var _React$useState5 = reactExports.useState(0), _React$useState6 = _slicedToArray(_React$useState5, 2), arrowOffset = _React$useState6[0], setArrowOffset = _React$useState6[1];
  var onResize = function onResize2(info) {
    if (info.width) {
      setContainerWidth(info.width);
    }
  };
  var _activeInfo = _slicedToArray(activeInfo, 3), activeInputLeft = _activeInfo[0], activeInputRight = _activeInfo[1], selectorWidth = _activeInfo[2];
  var _React$useState7 = reactExports.useState(0), _React$useState8 = _slicedToArray(_React$useState7, 2), retryTimes = _React$useState8[0], setRetryTimes = _React$useState8[1];
  reactExports.useEffect(function() {
    setRetryTimes(10);
  }, [activeInputLeft]);
  reactExports.useEffect(function() {
    if (range && wrapperRef.current) {
      var _arrowRef$current;
      var arrowWidth = ((_arrowRef$current = arrowRef.current) === null || _arrowRef$current === void 0 ? void 0 : _arrowRef$current.offsetWidth) || 0;
      var wrapperRect = wrapperRef.current.getBoundingClientRect();
      if (!wrapperRect.height || wrapperRect.right < 0) {
        setRetryTimes(function(times) {
          return Math.max(0, times - 1);
        });
        return;
      }
      var nextArrowOffset = (rtl ? activeInputRight - arrowWidth : activeInputLeft) - wrapperRect.left;
      setArrowOffset(nextArrowOffset);
      if (containerWidth && containerWidth < selectorWidth) {
        var offset = rtl ? wrapperRect.right - (activeInputRight - arrowWidth + containerWidth) : activeInputLeft + arrowWidth - wrapperRect.left - containerWidth;
        var safeOffset = Math.max(0, offset);
        setContainerOffset(safeOffset);
      } else {
        setContainerOffset(0);
      }
    }
  }, [retryTimes, rtl, containerWidth, activeInputLeft, activeInputRight, selectorWidth, range]);
  function filterEmpty(list) {
    return list.filter(function(item) {
      return item;
    });
  }
  var valueList = reactExports.useMemo(function() {
    return filterEmpty(toArray(value));
  }, [value]);
  var isTimePickerEmptyValue = picker === "time" && !valueList.length;
  var footerSubmitValue = reactExports.useMemo(function() {
    if (isTimePickerEmptyValue) {
      return filterEmpty([defaultOpenValue]);
    }
    return valueList;
  }, [isTimePickerEmptyValue, valueList, defaultOpenValue]);
  var popupPanelValue = isTimePickerEmptyValue ? defaultOpenValue : valueList;
  var disableSubmit = reactExports.useMemo(function() {
    if (!footerSubmitValue.length) {
      return true;
    }
    return footerSubmitValue.some(function(val) {
      return isInvalid(val);
    });
  }, [footerSubmitValue, isInvalid]);
  var onFooterSubmit = function onFooterSubmit2() {
    if (isTimePickerEmptyValue) {
      onSelect(defaultOpenValue);
    }
    onOk();
    onSubmit();
  };
  var mergedNodes = /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-panel-layout")
  }, /* @__PURE__ */ reactExports.createElement(PresetPanel, {
    prefixCls,
    presets,
    onClick: onPresetSubmit,
    onHover: onPresetHover
  }), /* @__PURE__ */ reactExports.createElement("div", null, /* @__PURE__ */ reactExports.createElement(PopupPanel, _extends$2({}, props, {
    value: popupPanelValue
  })), /* @__PURE__ */ reactExports.createElement(Footer, _extends$2({}, props, {
    showNow: multiple ? false : showNow,
    invalid: disableSubmit,
    onSubmit: onFooterSubmit
  }))));
  if (panelRender) {
    mergedNodes = panelRender(mergedNodes);
  }
  var containerPrefixCls = "".concat(panelPrefixCls, "-container");
  var marginLeft = "marginLeft";
  var marginRight = "marginRight";
  var renderNode = /* @__PURE__ */ reactExports.createElement("div", {
    onMouseDown: onPanelMouseDown,
    tabIndex: -1,
    className: classNames(
      containerPrefixCls,
      // Used for Today Button style, safe to remove if no need
      "".concat(prefixCls, "-").concat(internalMode, "-panel-container")
    ),
    style: _defineProperty(_defineProperty({}, rtl ? marginRight : marginLeft, containerOffset), rtl ? marginLeft : marginRight, "auto"),
    onFocus,
    onBlur
  }, mergedNodes);
  if (range) {
    renderNode = /* @__PURE__ */ reactExports.createElement("div", {
      onMouseDown: onPanelMouseDown,
      ref: wrapperRef,
      className: classNames("".concat(prefixCls, "-range-wrapper"), "".concat(prefixCls, "-").concat(picker, "-range-wrapper"))
    }, /* @__PURE__ */ reactExports.createElement("div", {
      ref: arrowRef,
      className: "".concat(prefixCls, "-range-arrow"),
      style: {
        left: arrowOffset
      }
    }), /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
      onResize
    }, renderNode));
  }
  return renderNode;
}
function useInputProps(props, postProps) {
  var format2 = props.format, maskFormat = props.maskFormat, generateConfig2 = props.generateConfig, locale2 = props.locale, preserveInvalidOnBlur = props.preserveInvalidOnBlur, inputReadOnly = props.inputReadOnly, required = props.required, ariaRequired = props["aria-required"], onSubmit = props.onSubmit, _onFocus = props.onFocus, _onBlur = props.onBlur, onInputChange = props.onInputChange, onInvalid = props.onInvalid, open = props.open, onOpenChange = props.onOpenChange, _onKeyDown = props.onKeyDown, _onChange = props.onChange, activeHelp = props.activeHelp, name = props.name, autoComplete = props.autoComplete, id = props.id, value = props.value, invalid = props.invalid, placeholder = props.placeholder, disabled = props.disabled, activeIndex = props.activeIndex, allHelp = props.allHelp, picker = props.picker;
  var parseDate = function parseDate2(str, formatStr) {
    var parsed = generateConfig2.locale.parse(locale2.locale, str, [formatStr]);
    return parsed && generateConfig2.isValidate(parsed) ? parsed : null;
  };
  var firstFormat = format2[0];
  var getText = reactExports.useCallback(function(date) {
    return formatValue(date, {
      locale: locale2,
      format: firstFormat,
      generateConfig: generateConfig2
    });
  }, [locale2, generateConfig2, firstFormat]);
  var valueTexts = reactExports.useMemo(function() {
    return value.map(getText);
  }, [value, getText]);
  var size = reactExports.useMemo(function() {
    var defaultSize = picker === "time" ? 8 : 10;
    var length = typeof firstFormat === "function" ? firstFormat(generateConfig2.getNow()).length : firstFormat.length;
    return Math.max(defaultSize, length) + 2;
  }, [firstFormat, picker, generateConfig2]);
  var _validateFormat = function validateFormat(text2) {
    for (var i = 0; i < format2.length; i += 1) {
      var singleFormat = format2[i];
      if (typeof singleFormat === "string") {
        var parsed = parseDate(text2, singleFormat);
        if (parsed) {
          return parsed;
        }
      }
    }
    return false;
  };
  var getInputProps = function getInputProps2(index2) {
    function getProp(propValue) {
      return index2 !== void 0 ? propValue[index2] : propValue;
    }
    var pickedAttrs = pickAttrs(props, {
      aria: true,
      data: true
    });
    var inputProps = _objectSpread2(_objectSpread2({}, pickedAttrs), {}, {
      // ============== Shared ==============
      format: maskFormat,
      validateFormat: function validateFormat(text2) {
        return !!_validateFormat(text2);
      },
      preserveInvalidOnBlur,
      readOnly: inputReadOnly,
      required,
      "aria-required": ariaRequired,
      name,
      autoComplete,
      size,
      // ============= By Index =============
      id: getProp(id),
      value: getProp(valueTexts) || "",
      invalid: getProp(invalid),
      placeholder: getProp(placeholder),
      active: activeIndex === index2,
      helped: allHelp || activeHelp && activeIndex === index2,
      disabled: getProp(disabled),
      onFocus: function onFocus(event) {
        _onFocus(event, index2);
      },
      onBlur: function onBlur(event) {
        _onBlur(event, index2);
      },
      onSubmit,
      // Get validate text value
      onChange: function onChange2(text2) {
        onInputChange();
        var parsed = _validateFormat(text2);
        if (parsed) {
          onInvalid(false, index2);
          _onChange(parsed, index2);
          return;
        }
        onInvalid(!!text2, index2);
      },
      onHelp: function onHelp() {
        onOpenChange(true, {
          index: index2
        });
      },
      onKeyDown: function onKeyDown(event) {
        var prevented = false;
        _onKeyDown === null || _onKeyDown === void 0 || _onKeyDown(event, function() {
          prevented = true;
        });
        if (!event.defaultPrevented && !prevented) {
          switch (event.key) {
            case "Escape":
              onOpenChange(false, {
                index: index2
              });
              break;
            case "Enter":
              if (!open) {
                onOpenChange(true);
              }
              break;
          }
        }
      }
    }, postProps === null || postProps === void 0 ? void 0 : postProps({
      valueTexts
    }));
    Object.keys(inputProps).forEach(function(key2) {
      if (inputProps[key2] === void 0) {
        delete inputProps[key2];
      }
    });
    return inputProps;
  };
  return [getInputProps, getText];
}
var propNames = ["onMouseEnter", "onMouseLeave"];
function useRootProps(props) {
  return reactExports.useMemo(function() {
    return pickProps(props, propNames);
  }, [props]);
}
var _excluded$9 = ["icon", "type"], _excluded2$2 = ["onClear"];
function Icon(props) {
  var icon = props.icon, type = props.type, restProps = _objectWithoutProperties(props, _excluded$9);
  var _React$useContext = reactExports.useContext(PickerContext), prefixCls = _React$useContext.prefixCls;
  return icon ? /* @__PURE__ */ reactExports.createElement("span", _extends$2({
    className: "".concat(prefixCls, "-").concat(type)
  }, restProps), icon) : null;
}
function ClearIcon(_ref) {
  var onClear = _ref.onClear, restProps = _objectWithoutProperties(_ref, _excluded2$2);
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends$2({}, restProps, {
    type: "clear",
    role: "button",
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
    },
    onClick: function onClick(e) {
      e.stopPropagation();
      onClear();
    }
  }));
}
var FORMAT_KEYS = ["YYYY", "MM", "DD", "HH", "mm", "ss", "SSS"];
var REPLACE_KEY = "顧";
var MaskFormat = /* @__PURE__ */ (function() {
  function MaskFormat2(format2) {
    _classCallCheck(this, MaskFormat2);
    _defineProperty(this, "format", void 0);
    _defineProperty(this, "maskFormat", void 0);
    _defineProperty(this, "cells", void 0);
    _defineProperty(this, "maskCells", void 0);
    this.format = format2;
    var replaceKeys = FORMAT_KEYS.map(function(key2) {
      return "(".concat(key2, ")");
    }).join("|");
    var replaceReg = new RegExp(replaceKeys, "g");
    this.maskFormat = format2.replace(
      replaceReg,
      // Use Chinese character to avoid user use it in format
      function(key2) {
        return REPLACE_KEY.repeat(key2.length);
      }
    );
    var cellReg = new RegExp("(".concat(FORMAT_KEYS.join("|"), ")"));
    var strCells = (format2.split(cellReg) || []).filter(function(str) {
      return str;
    });
    var offset = 0;
    this.cells = strCells.map(function(text2) {
      var mask = FORMAT_KEYS.includes(text2);
      var start = offset;
      var end = offset + text2.length;
      offset = end;
      return {
        text: text2,
        mask,
        start,
        end
      };
    });
    this.maskCells = this.cells.filter(function(cell) {
      return cell.mask;
    });
  }
  _createClass(MaskFormat2, [{
    key: "getSelection",
    value: function getSelection(maskCellIndex) {
      var _ref = this.maskCells[maskCellIndex] || {}, start = _ref.start, end = _ref.end;
      return [start || 0, end || 0];
    }
    /** Check given text match format */
  }, {
    key: "match",
    value: function match(text2) {
      for (var i = 0; i < this.maskFormat.length; i += 1) {
        var maskChar = this.maskFormat[i];
        var textChar = text2[i];
        if (!textChar || maskChar !== REPLACE_KEY && maskChar !== textChar) {
          return false;
        }
      }
      return true;
    }
    /** Get mask cell count */
  }, {
    key: "size",
    value: function size() {
      return this.maskCells.length;
    }
  }, {
    key: "getMaskCellIndex",
    value: function getMaskCellIndex(anchorIndex) {
      var closetDist = Number.MAX_SAFE_INTEGER;
      var closetIndex = 0;
      for (var i = 0; i < this.maskCells.length; i += 1) {
        var _this$maskCells$i = this.maskCells[i], start = _this$maskCells$i.start, end = _this$maskCells$i.end;
        if (anchorIndex >= start && anchorIndex <= end) {
          return i;
        }
        var dist = Math.min(Math.abs(anchorIndex - start), Math.abs(anchorIndex - end));
        if (dist < closetDist) {
          closetDist = dist;
          closetIndex = i;
        }
      }
      return closetIndex;
    }
  }]);
  return MaskFormat2;
})();
function getMaskRange(key2) {
  var PresetRange = {
    YYYY: [0, 9999, (/* @__PURE__ */ new Date()).getFullYear()],
    MM: [1, 12],
    DD: [1, 31],
    HH: [0, 23],
    mm: [0, 59],
    ss: [0, 59],
    SSS: [0, 999]
  };
  return PresetRange[key2];
}
var _excluded$8 = ["active", "showActiveCls", "suffixIcon", "format", "validateFormat", "onChange", "onInput", "helped", "onHelp", "onSubmit", "onKeyDown", "preserveInvalidOnBlur", "invalid", "clearIcon"];
var Input = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var active = props.active, _props$showActiveCls = props.showActiveCls, showActiveCls = _props$showActiveCls === void 0 ? true : _props$showActiveCls, suffixIcon = props.suffixIcon, format2 = props.format, validateFormat = props.validateFormat, onChange2 = props.onChange;
  props.onInput;
  var helped = props.helped, onHelp = props.onHelp, onSubmit = props.onSubmit, onKeyDown = props.onKeyDown, _props$preserveInvali = props.preserveInvalidOnBlur, preserveInvalidOnBlur = _props$preserveInvali === void 0 ? false : _props$preserveInvali, invalid = props.invalid, clearIcon = props.clearIcon, restProps = _objectWithoutProperties(props, _excluded$8);
  var value = props.value, onFocus = props.onFocus, onBlur = props.onBlur, onMouseUp = props.onMouseUp;
  var _React$useContext = reactExports.useContext(PickerContext), prefixCls = _React$useContext.prefixCls, _React$useContext$inp = _React$useContext.input, Component = _React$useContext$inp === void 0 ? "input" : _React$useContext$inp;
  var inputPrefixCls = "".concat(prefixCls, "-input");
  var _React$useState = reactExports.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), focused = _React$useState2[0], setFocused = _React$useState2[1];
  var _React$useState3 = reactExports.useState(value), _React$useState4 = _slicedToArray(_React$useState3, 2), internalInputValue = _React$useState4[0], setInputValue = _React$useState4[1];
  var _React$useState5 = reactExports.useState(""), _React$useState6 = _slicedToArray(_React$useState5, 2), focusCellText = _React$useState6[0], setFocusCellText = _React$useState6[1];
  var _React$useState7 = reactExports.useState(null), _React$useState8 = _slicedToArray(_React$useState7, 2), focusCellIndex = _React$useState8[0], setFocusCellIndex = _React$useState8[1];
  var _React$useState9 = reactExports.useState(null), _React$useState10 = _slicedToArray(_React$useState9, 2), forceSelectionSyncMark = _React$useState10[0], forceSelectionSync = _React$useState10[1];
  var inputValue = internalInputValue || "";
  reactExports.useEffect(function() {
    setInputValue(value);
  }, [value]);
  var holderRef = reactExports.useRef();
  var inputRef = reactExports.useRef();
  reactExports.useImperativeHandle(ref, function() {
    return {
      nativeElement: holderRef.current,
      inputElement: inputRef.current,
      focus: function focus(options) {
        inputRef.current.focus(options);
      },
      blur: function blur() {
        inputRef.current.blur();
      }
    };
  });
  var maskFormat = reactExports.useMemo(function() {
    return new MaskFormat(format2 || "");
  }, [format2]);
  var _React$useMemo = reactExports.useMemo(function() {
    if (helped) {
      return [0, 0];
    }
    return maskFormat.getSelection(focusCellIndex);
  }, [maskFormat, focusCellIndex, helped]), _React$useMemo2 = _slicedToArray(_React$useMemo, 2), selectionStart = _React$useMemo2[0], selectionEnd = _React$useMemo2[1];
  var onModify = function onModify2(text2) {
    if (text2 && text2 !== format2 && text2 !== value) {
      onHelp();
    }
  };
  var triggerInputChange = useEvent$1(function(text2) {
    if (validateFormat(text2)) {
      onChange2(text2);
    }
    setInputValue(text2);
    onModify(text2);
  });
  var onInternalChange = function onInternalChange2(event) {
    if (!format2) {
      var text2 = event.target.value;
      onModify(text2);
      setInputValue(text2);
      onChange2(text2);
    }
  };
  var onFormatPaste = function onFormatPaste2(event) {
    var pasteText = event.clipboardData.getData("text");
    if (validateFormat(pasteText)) {
      triggerInputChange(pasteText);
    }
  };
  var mouseDownRef = reactExports.useRef(false);
  var onFormatMouseDown = function onFormatMouseDown2() {
    mouseDownRef.current = true;
  };
  var onFormatMouseUp = function onFormatMouseUp2(event) {
    var _ref = event.target, start = _ref.selectionStart;
    var closeMaskIndex = maskFormat.getMaskCellIndex(start);
    setFocusCellIndex(closeMaskIndex);
    forceSelectionSync({});
    onMouseUp === null || onMouseUp === void 0 || onMouseUp(event);
    mouseDownRef.current = false;
  };
  var onFormatFocus = function onFormatFocus2(event) {
    setFocused(true);
    setFocusCellIndex(0);
    setFocusCellText("");
    onFocus(event);
  };
  var onSharedBlur = function onSharedBlur2(event) {
    onBlur(event);
  };
  var onFormatBlur = function onFormatBlur2(event) {
    setFocused(false);
    onSharedBlur(event);
  };
  useLockEffect(active, function() {
    if (!active && !preserveInvalidOnBlur) {
      setInputValue(value);
    }
  });
  var onSharedKeyDown = function onSharedKeyDown2(event) {
    if (event.key === "Enter" && validateFormat(inputValue)) {
      onSubmit();
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown(event);
  };
  var onFormatKeyDown = function onFormatKeyDown2(event) {
    onSharedKeyDown(event);
    var key2 = event.key;
    var nextCellText = null;
    var nextFillText = null;
    var maskCellLen = selectionEnd - selectionStart;
    var cellFormat = format2.slice(selectionStart, selectionEnd);
    var offsetCellIndex = function offsetCellIndex2(offset) {
      setFocusCellIndex(function(idx) {
        var nextIndex = idx + offset;
        nextIndex = Math.max(nextIndex, 0);
        nextIndex = Math.min(nextIndex, maskFormat.size() - 1);
        return nextIndex;
      });
    };
    var offsetCellValue = function offsetCellValue2(offset) {
      var _getMaskRange = getMaskRange(cellFormat), _getMaskRange2 = _slicedToArray(_getMaskRange, 3), rangeStart = _getMaskRange2[0], rangeEnd = _getMaskRange2[1], rangeDefault = _getMaskRange2[2];
      var currentText = inputValue.slice(selectionStart, selectionEnd);
      var currentTextNum = Number(currentText);
      if (isNaN(currentTextNum)) {
        return String(rangeDefault ? rangeDefault : offset > 0 ? rangeStart : rangeEnd);
      }
      var num = currentTextNum + offset;
      var range = rangeEnd - rangeStart + 1;
      return String(rangeStart + (range + num - rangeStart) % range);
    };
    switch (key2) {
      // =============== Remove ===============
      case "Backspace":
      case "Delete":
        nextCellText = "";
        nextFillText = cellFormat;
        break;
      // =============== Arrows ===============
      // Left key
      case "ArrowLeft":
        nextCellText = "";
        offsetCellIndex(-1);
        break;
      // Right key
      case "ArrowRight":
        nextCellText = "";
        offsetCellIndex(1);
        break;
      // Up key
      case "ArrowUp":
        nextCellText = "";
        nextFillText = offsetCellValue(1);
        break;
      // Down key
      case "ArrowDown":
        nextCellText = "";
        nextFillText = offsetCellValue(-1);
        break;
      // =============== Number ===============
      default:
        if (!isNaN(Number(key2))) {
          nextCellText = focusCellText + key2;
          nextFillText = nextCellText;
        }
        break;
    }
    if (nextCellText !== null) {
      setFocusCellText(nextCellText);
      if (nextCellText.length >= maskCellLen) {
        offsetCellIndex(1);
        setFocusCellText("");
      }
    }
    if (nextFillText !== null) {
      var nextFocusValue = (
        // before
        inputValue.slice(0, selectionStart) + // replace
        leftPad(nextFillText, maskCellLen) + // after
        inputValue.slice(selectionEnd)
      );
      triggerInputChange(nextFocusValue.slice(0, format2.length));
    }
    forceSelectionSync({});
  };
  var rafRef = reactExports.useRef();
  useLayoutEffect(function() {
    if (!focused || !format2 || mouseDownRef.current) {
      return;
    }
    if (!maskFormat.match(inputValue)) {
      triggerInputChange(format2);
      return;
    }
    inputRef.current.setSelectionRange(selectionStart, selectionEnd);
    rafRef.current = wrapperRaf(function() {
      inputRef.current.setSelectionRange(selectionStart, selectionEnd);
    });
    return function() {
      wrapperRaf.cancel(rafRef.current);
    };
  }, [maskFormat, format2, focused, inputValue, focusCellIndex, selectionStart, selectionEnd, forceSelectionSyncMark, triggerInputChange]);
  var inputProps = format2 ? {
    onFocus: onFormatFocus,
    onBlur: onFormatBlur,
    onKeyDown: onFormatKeyDown,
    onMouseDown: onFormatMouseDown,
    onMouseUp: onFormatMouseUp,
    onPaste: onFormatPaste
  } : {};
  return /* @__PURE__ */ reactExports.createElement("div", {
    ref: holderRef,
    className: classNames(inputPrefixCls, _defineProperty(_defineProperty({}, "".concat(inputPrefixCls, "-active"), active && showActiveCls), "".concat(inputPrefixCls, "-placeholder"), helped))
  }, /* @__PURE__ */ reactExports.createElement(Component, _extends$2({
    ref: inputRef,
    "aria-invalid": invalid,
    autoComplete: "off"
  }, restProps, {
    onKeyDown: onSharedKeyDown,
    onBlur: onSharedBlur
    // Replace with format
  }, inputProps, {
    // Value
    value: inputValue,
    onChange: onInternalChange
  })), /* @__PURE__ */ reactExports.createElement(Icon, {
    type: "suffix",
    icon: suffixIcon
  }), clearIcon);
});
var _excluded$7 = ["id", "prefix", "clearIcon", "suffixIcon", "separator", "activeIndex", "activeHelp", "allHelp", "focused", "onFocus", "onBlur", "onKeyDown", "locale", "generateConfig", "placeholder", "className", "style", "onClick", "onClear", "value", "onChange", "onSubmit", "onInputChange", "format", "maskFormat", "preserveInvalidOnBlur", "onInvalid", "disabled", "invalid", "inputReadOnly", "direction", "onOpenChange", "onActiveInfo", "placement", "onMouseDown", "required", "aria-required", "autoFocus", "tabIndex"], _excluded2$1 = ["index"];
function RangeSelector(props, ref) {
  var id = props.id, prefix = props.prefix, clearIcon = props.clearIcon, suffixIcon = props.suffixIcon, _props$separator = props.separator, separator = _props$separator === void 0 ? "~" : _props$separator, activeIndex = props.activeIndex;
  props.activeHelp;
  props.allHelp;
  var focused = props.focused;
  props.onFocus;
  props.onBlur;
  props.onKeyDown;
  props.locale;
  props.generateConfig;
  var placeholder = props.placeholder, className = props.className, style = props.style, onClick = props.onClick, onClear = props.onClear, value = props.value;
  props.onChange;
  props.onSubmit;
  props.onInputChange;
  props.format;
  props.maskFormat;
  props.preserveInvalidOnBlur;
  props.onInvalid;
  var disabled = props.disabled, invalid = props.invalid;
  props.inputReadOnly;
  var direction = props.direction;
  props.onOpenChange;
  var onActiveInfo = props.onActiveInfo;
  props.placement;
  var _onMouseDown = props.onMouseDown;
  props.required;
  props["aria-required"];
  var autoFocus = props.autoFocus, tabIndex = props.tabIndex, restProps = _objectWithoutProperties(props, _excluded$7);
  var rtl = direction === "rtl";
  var _React$useContext = reactExports.useContext(PickerContext), prefixCls = _React$useContext.prefixCls;
  var ids2 = reactExports.useMemo(function() {
    if (typeof id === "string") {
      return [id];
    }
    var mergedId = id || {};
    return [mergedId.start, mergedId.end];
  }, [id]);
  var rootRef = reactExports.useRef();
  var inputStartRef = reactExports.useRef();
  var inputEndRef = reactExports.useRef();
  var getInput = function getInput2(index2) {
    var _index;
    return (_index = [inputStartRef, inputEndRef][index2]) === null || _index === void 0 ? void 0 : _index.current;
  };
  reactExports.useImperativeHandle(ref, function() {
    return {
      nativeElement: rootRef.current,
      focus: function focus(options) {
        if (_typeof(options) === "object") {
          var _getInput;
          var _ref = options || {}, _ref$index = _ref.index, _index2 = _ref$index === void 0 ? 0 : _ref$index, rest = _objectWithoutProperties(_ref, _excluded2$1);
          (_getInput = getInput(_index2)) === null || _getInput === void 0 || _getInput.focus(rest);
        } else {
          var _getInput2;
          (_getInput2 = getInput(options !== null && options !== void 0 ? options : 0)) === null || _getInput2 === void 0 || _getInput2.focus();
        }
      },
      blur: function blur() {
        var _getInput3, _getInput4;
        (_getInput3 = getInput(0)) === null || _getInput3 === void 0 || _getInput3.blur();
        (_getInput4 = getInput(1)) === null || _getInput4 === void 0 || _getInput4.blur();
      }
    };
  });
  var rootProps = useRootProps(restProps);
  var mergedPlaceholder = reactExports.useMemo(function() {
    return Array.isArray(placeholder) ? placeholder : [placeholder, placeholder];
  }, [placeholder]);
  var _useInputProps = useInputProps(_objectSpread2(_objectSpread2({}, props), {}, {
    id: ids2,
    placeholder: mergedPlaceholder
  })), _useInputProps2 = _slicedToArray(_useInputProps, 1), getInputProps = _useInputProps2[0];
  var _React$useState = reactExports.useState({
    position: "absolute",
    width: 0
  }), _React$useState2 = _slicedToArray(_React$useState, 2), activeBarStyle = _React$useState2[0], setActiveBarStyle = _React$useState2[1];
  var syncActiveOffset = useEvent$1(function() {
    var input = getInput(activeIndex);
    if (input) {
      var inputRect = input.nativeElement.getBoundingClientRect();
      var parentRect = rootRef.current.getBoundingClientRect();
      var rectOffset = inputRect.left - parentRect.left;
      setActiveBarStyle(function(ori) {
        return _objectSpread2(_objectSpread2({}, ori), {}, {
          width: inputRect.width,
          left: rectOffset
        });
      });
      onActiveInfo([inputRect.left, inputRect.right, parentRect.width]);
    }
  });
  reactExports.useEffect(function() {
    syncActiveOffset();
  }, [activeIndex]);
  var showClear = clearIcon && (value[0] && !disabled[0] || value[1] && !disabled[1]);
  var startAutoFocus = autoFocus && !disabled[0];
  var endAutoFocus = autoFocus && !startAutoFocus && !disabled[1];
  return /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
    onResize: syncActiveOffset
  }, /* @__PURE__ */ reactExports.createElement("div", _extends$2({}, rootProps, {
    className: classNames(prefixCls, "".concat(prefixCls, "-range"), _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-focused"), focused), "".concat(prefixCls, "-disabled"), disabled.every(function(i) {
      return i;
    })), "".concat(prefixCls, "-invalid"), invalid.some(function(i) {
      return i;
    })), "".concat(prefixCls, "-rtl"), rtl), className),
    style,
    ref: rootRef,
    onClick,
    onMouseDown: function onMouseDown(e) {
      var target = e.target;
      if (target !== inputStartRef.current.inputElement && target !== inputEndRef.current.inputElement) {
        e.preventDefault();
      }
      _onMouseDown === null || _onMouseDown === void 0 || _onMouseDown(e);
    }
  }), prefix && /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-prefix")
  }, prefix), /* @__PURE__ */ reactExports.createElement(Input, _extends$2({
    ref: inputStartRef
  }, getInputProps(0), {
    autoFocus: startAutoFocus,
    tabIndex,
    "date-range": "start"
  })), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-range-separator")
  }, separator), /* @__PURE__ */ reactExports.createElement(Input, _extends$2({
    ref: inputEndRef
  }, getInputProps(1), {
    autoFocus: endAutoFocus,
    tabIndex,
    "date-range": "end"
  })), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-active-bar"),
    style: activeBarStyle
  }), /* @__PURE__ */ reactExports.createElement(Icon, {
    type: "suffix",
    icon: suffixIcon
  }), showClear && /* @__PURE__ */ reactExports.createElement(ClearIcon, {
    icon: clearIcon,
    onClear
  })));
}
var RefRangeSelector = /* @__PURE__ */ reactExports.forwardRef(RangeSelector);
function separateConfig(config, defaultConfig) {
  var singleConfig = config !== null && config !== void 0 ? config : defaultConfig;
  if (Array.isArray(singleConfig)) {
    return singleConfig;
  }
  return [singleConfig, singleConfig];
}
function getActiveRange(activeIndex) {
  return activeIndex === 1 ? "end" : "start";
}
function RangePicker$1(props, ref) {
  var _useFilledProps = useFilledProps(props, function() {
    var disabled2 = props.disabled, allowEmpty2 = props.allowEmpty;
    var mergedDisabled = separateConfig(disabled2, false);
    var mergedAllowEmpty = separateConfig(allowEmpty2, false);
    return {
      disabled: mergedDisabled,
      allowEmpty: mergedAllowEmpty
    };
  }), _useFilledProps2 = _slicedToArray(_useFilledProps, 6), filledProps = _useFilledProps2[0], internalPicker = _useFilledProps2[1], complexPicker = _useFilledProps2[2], formatList = _useFilledProps2[3], maskFormat = _useFilledProps2[4], isInvalidateDate = _useFilledProps2[5];
  var prefixCls = filledProps.prefixCls, styles = filledProps.styles, classNames2 = filledProps.classNames, defaultValue2 = filledProps.defaultValue, value = filledProps.value, needConfirm = filledProps.needConfirm, onKeyDown = filledProps.onKeyDown, disabled = filledProps.disabled, allowEmpty = filledProps.allowEmpty, disabledDate = filledProps.disabledDate, minDate = filledProps.minDate, maxDate = filledProps.maxDate, defaultOpen = filledProps.defaultOpen, open = filledProps.open, onOpenChange = filledProps.onOpenChange, locale2 = filledProps.locale, generateConfig2 = filledProps.generateConfig, picker = filledProps.picker, showNow = filledProps.showNow, showToday = filledProps.showToday, showTime = filledProps.showTime, mode = filledProps.mode, onPanelChange = filledProps.onPanelChange, onCalendarChange = filledProps.onCalendarChange, onOk = filledProps.onOk, defaultPickerValue = filledProps.defaultPickerValue, pickerValue = filledProps.pickerValue, onPickerValueChange = filledProps.onPickerValueChange, inputReadOnly = filledProps.inputReadOnly, suffixIcon = filledProps.suffixIcon, onFocus = filledProps.onFocus, onBlur = filledProps.onBlur, presets = filledProps.presets, ranges = filledProps.ranges, components2 = filledProps.components, cellRender = filledProps.cellRender, dateRender = filledProps.dateRender, monthCellRender = filledProps.monthCellRender, onClick = filledProps.onClick;
  var selectorRef = usePickerRef(ref);
  var _useOpen = useOpen(open, defaultOpen, disabled, onOpenChange), _useOpen2 = _slicedToArray(_useOpen, 2), mergedOpen = _useOpen2[0], setMergeOpen = _useOpen2[1];
  var triggerOpen = function triggerOpen2(nextOpen, config) {
    if (disabled.some(function(fieldDisabled) {
      return !fieldDisabled;
    }) || !nextOpen) {
      setMergeOpen(nextOpen, config);
    }
  };
  var _useInnerValue = useInnerValue(generateConfig2, locale2, formatList, true, false, defaultValue2, value, onCalendarChange, onOk), _useInnerValue2 = _slicedToArray(_useInnerValue, 5), mergedValue = _useInnerValue2[0], setInnerValue = _useInnerValue2[1], getCalendarValue = _useInnerValue2[2], triggerCalendarChange = _useInnerValue2[3], triggerOk = _useInnerValue2[4];
  var calendarValue = getCalendarValue();
  var _useRangeActive = useRangeActive(disabled, allowEmpty, mergedOpen), _useRangeActive2 = _slicedToArray(_useRangeActive, 9), focused = _useRangeActive2[0], triggerFocus2 = _useRangeActive2[1], lastOperation = _useRangeActive2[2], activeIndex = _useRangeActive2[3], setActiveIndex = _useRangeActive2[4], nextActiveIndex = _useRangeActive2[5], activeIndexList = _useRangeActive2[6], updateSubmitIndex = _useRangeActive2[7], hasActiveSubmitValue = _useRangeActive2[8];
  var onSharedFocus = function onSharedFocus2(event, index2) {
    triggerFocus2(true);
    onFocus === null || onFocus === void 0 || onFocus(event, {
      range: getActiveRange(index2 !== null && index2 !== void 0 ? index2 : activeIndex)
    });
  };
  var onSharedBlur = function onSharedBlur2(event, index2) {
    triggerFocus2(false);
    onBlur === null || onBlur === void 0 || onBlur(event, {
      range: getActiveRange(index2 !== null && index2 !== void 0 ? index2 : activeIndex)
    });
  };
  var mergedShowTime = reactExports.useMemo(function() {
    if (!showTime) {
      return null;
    }
    var disabledTime = showTime.disabledTime;
    var proxyDisabledTime = disabledTime ? function(date) {
      var range = getActiveRange(activeIndex);
      var fromDate = getFromDate(calendarValue, activeIndexList, activeIndex);
      return disabledTime(date, range, {
        from: fromDate
      });
    } : void 0;
    return _objectSpread2(_objectSpread2({}, showTime), {}, {
      disabledTime: proxyDisabledTime
    });
  }, [showTime, activeIndex, calendarValue, activeIndexList]);
  var _useMergedState = useMergedState([picker, picker], {
    value: mode
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), modes = _useMergedState2[0], setModes = _useMergedState2[1];
  var mergedMode = modes[activeIndex] || picker;
  var internalMode = mergedMode === "date" && mergedShowTime ? "datetime" : mergedMode;
  var multiplePanel = internalMode === picker && internalMode !== "time";
  var mergedShowNow = useShowNow(picker, mergedMode, showNow, showToday, true);
  var _useRangeValue = useRangeValue(filledProps, mergedValue, setInnerValue, getCalendarValue, triggerCalendarChange, disabled, formatList, focused, mergedOpen, isInvalidateDate), _useRangeValue2 = _slicedToArray(_useRangeValue, 2), flushSubmit = _useRangeValue2[0], triggerSubmitChange = _useRangeValue2[1];
  var mergedDisabledDate = useRangeDisabledDate(calendarValue, disabled, activeIndexList, generateConfig2, locale2, disabledDate);
  var _useFieldsInvalidate = useFieldsInvalidate(calendarValue, isInvalidateDate, allowEmpty), _useFieldsInvalidate2 = _slicedToArray(_useFieldsInvalidate, 2), submitInvalidates = _useFieldsInvalidate2[0], onSelectorInvalid = _useFieldsInvalidate2[1];
  var _useRangePickerValue = useRangePickerValue(generateConfig2, locale2, calendarValue, modes, mergedOpen, activeIndex, internalPicker, multiplePanel, defaultPickerValue, pickerValue, mergedShowTime === null || mergedShowTime === void 0 ? void 0 : mergedShowTime.defaultOpenValue, onPickerValueChange, minDate, maxDate), _useRangePickerValue2 = _slicedToArray(_useRangePickerValue, 2), currentPickerValue = _useRangePickerValue2[0], setCurrentPickerValue = _useRangePickerValue2[1];
  var triggerModeChange = useEvent$1(function(nextPickerValue, nextMode, triggerEvent) {
    var clone2 = fillIndex(modes, activeIndex, nextMode);
    if (clone2[0] !== modes[0] || clone2[1] !== modes[1]) {
      setModes(clone2);
    }
    if (onPanelChange && triggerEvent !== false) {
      var clonePickerValue = _toConsumableArray(calendarValue);
      if (nextPickerValue) {
        clonePickerValue[activeIndex] = nextPickerValue;
      }
      onPanelChange(clonePickerValue, clone2);
    }
  });
  var fillCalendarValue = function fillCalendarValue2(date, index2) {
    return (
      // Trigger change only when date changed
      fillIndex(calendarValue, index2, date)
    );
  };
  var triggerPartConfirm = function triggerPartConfirm2(date, skipFocus) {
    var nextValue = calendarValue;
    if (date) {
      nextValue = fillCalendarValue(date, activeIndex);
    }
    updateSubmitIndex(activeIndex);
    var nextIndex = nextActiveIndex(nextValue);
    triggerCalendarChange(nextValue);
    flushSubmit(activeIndex, nextIndex === null);
    if (nextIndex === null) {
      triggerOpen(false, {
        force: true
      });
    } else if (!skipFocus) {
      selectorRef.current.focus({
        index: nextIndex
      });
    }
  };
  var onSelectorClick = function onSelectorClick2(event) {
    var _activeElement;
    var rootNode = event.target.getRootNode();
    if (!selectorRef.current.nativeElement.contains((_activeElement = rootNode.activeElement) !== null && _activeElement !== void 0 ? _activeElement : document.activeElement)) {
      var enabledIndex = disabled.findIndex(function(d) {
        return !d;
      });
      if (enabledIndex >= 0) {
        selectorRef.current.focus({
          index: enabledIndex
        });
      }
    }
    triggerOpen(true);
    onClick === null || onClick === void 0 || onClick(event);
  };
  var onSelectorClear = function onSelectorClear2() {
    triggerSubmitChange(null);
    triggerOpen(false, {
      force: true
    });
  };
  var _React$useState = reactExports.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), hoverSource = _React$useState2[0], setHoverSource = _React$useState2[1];
  var _React$useState3 = reactExports.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), internalHoverValues = _React$useState4[0], setInternalHoverValues = _React$useState4[1];
  var hoverValues = reactExports.useMemo(function() {
    return internalHoverValues || calendarValue;
  }, [calendarValue, internalHoverValues]);
  reactExports.useEffect(function() {
    if (!mergedOpen) {
      setInternalHoverValues(null);
    }
  }, [mergedOpen]);
  var _React$useState5 = reactExports.useState([0, 0, 0]), _React$useState6 = _slicedToArray(_React$useState5, 2), activeInfo = _React$useState6[0], setActiveInfo = _React$useState6[1];
  var presetList = usePresets(presets, ranges);
  var onPresetHover = function onPresetHover2(nextValues) {
    setInternalHoverValues(nextValues);
    setHoverSource("preset");
  };
  var onPresetSubmit = function onPresetSubmit2(nextValues) {
    var passed = triggerSubmitChange(nextValues);
    if (passed) {
      triggerOpen(false, {
        force: true
      });
    }
  };
  var onNow = function onNow2(now2) {
    triggerPartConfirm(now2);
  };
  var onPanelHover = function onPanelHover2(date) {
    setInternalHoverValues(date ? fillCalendarValue(date, activeIndex) : null);
    setHoverSource("cell");
  };
  var onPanelFocus = function onPanelFocus2(event) {
    triggerOpen(true);
    onSharedFocus(event);
  };
  var onPanelMouseDown = function onPanelMouseDown2() {
    lastOperation("panel");
  };
  var onPanelSelect = function onPanelSelect2(date) {
    var clone2 = fillIndex(calendarValue, activeIndex, date);
    triggerCalendarChange(clone2);
    if (!needConfirm && !complexPicker && internalPicker === internalMode) {
      triggerPartConfirm(date);
    }
  };
  var onPopupClose = function onPopupClose2() {
    triggerOpen(false);
  };
  var onInternalCellRender = useCellRender(cellRender, dateRender, monthCellRender, getActiveRange(activeIndex));
  var panelValue = calendarValue[activeIndex] || null;
  var isPopupInvalidateDate = useEvent$1(function(date) {
    return isInvalidateDate(date, {
      activeIndex
    });
  });
  var panelProps = reactExports.useMemo(function() {
    var domProps = pickAttrs(filledProps, false);
    var restProps = omit(filledProps, [].concat(_toConsumableArray(Object.keys(domProps)), ["onChange", "onCalendarChange", "style", "className", "onPanelChange", "disabledTime"]));
    return restProps;
  }, [filledProps]);
  var panel = /* @__PURE__ */ reactExports.createElement(Popup, _extends$2({}, panelProps, {
    showNow: mergedShowNow,
    showTime: mergedShowTime,
    range: true,
    multiplePanel,
    activeInfo,
    disabledDate: mergedDisabledDate,
    onFocus: onPanelFocus,
    onBlur: onSharedBlur,
    onPanelMouseDown,
    picker,
    mode: mergedMode,
    internalMode,
    onPanelChange: triggerModeChange,
    format: maskFormat,
    value: panelValue,
    isInvalid: isPopupInvalidateDate,
    onChange: null,
    onSelect: onPanelSelect,
    pickerValue: currentPickerValue,
    defaultOpenValue: toArray(showTime === null || showTime === void 0 ? void 0 : showTime.defaultOpenValue)[activeIndex],
    onPickerValueChange: setCurrentPickerValue,
    hoverValue: hoverValues,
    onHover: onPanelHover,
    needConfirm,
    onSubmit: triggerPartConfirm,
    onOk: triggerOk,
    presets: presetList,
    onPresetHover,
    onPresetSubmit,
    onNow,
    cellRender: onInternalCellRender
  }));
  var onSelectorChange = function onSelectorChange2(date, index2) {
    var clone2 = fillCalendarValue(date, index2);
    triggerCalendarChange(clone2);
  };
  var onSelectorInputChange = function onSelectorInputChange2() {
    lastOperation("input");
  };
  var onSelectorFocus = function onSelectorFocus2(event, index2) {
    var activeListLen = activeIndexList.length;
    var lastActiveIndex = activeIndexList[activeListLen - 1];
    if (activeListLen && lastActiveIndex !== index2 && needConfirm && // Not change index if is not filled
    !allowEmpty[lastActiveIndex] && !hasActiveSubmitValue(lastActiveIndex) && calendarValue[lastActiveIndex]) {
      selectorRef.current.focus({
        index: lastActiveIndex
      });
      return;
    }
    lastOperation("input");
    triggerOpen(true, {
      inherit: true
    });
    if (activeIndex !== index2 && mergedOpen && !needConfirm && complexPicker) {
      triggerPartConfirm(null, true);
    }
    setActiveIndex(index2);
    onSharedFocus(event, index2);
  };
  var onSelectorBlur = function onSelectorBlur2(event, index2) {
    triggerOpen(false);
    if (!needConfirm && lastOperation() === "input") {
      var nextIndex = nextActiveIndex(calendarValue);
      flushSubmit(activeIndex, nextIndex === null);
    }
    onSharedBlur(event, index2);
  };
  var onSelectorKeyDown = function onSelectorKeyDown2(event, preventDefault2) {
    if (event.key === "Tab") {
      triggerPartConfirm(null, true);
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown(event, preventDefault2);
  };
  var context = reactExports.useMemo(function() {
    return {
      prefixCls,
      locale: locale2,
      generateConfig: generateConfig2,
      button: components2.button,
      input: components2.input
    };
  }, [prefixCls, locale2, generateConfig2, components2.button, components2.input]);
  useLayoutEffect(function() {
    if (mergedOpen && activeIndex !== void 0) {
      triggerModeChange(null, picker, false);
    }
  }, [mergedOpen, activeIndex, picker]);
  useLayoutEffect(function() {
    var lastOp = lastOperation();
    if (!mergedOpen && lastOp === "input") {
      triggerOpen(false);
      triggerPartConfirm(null, true);
    }
    if (!mergedOpen && complexPicker && !needConfirm && lastOp === "panel") {
      triggerOpen(true);
      triggerPartConfirm();
    }
  }, [mergedOpen]);
  return /* @__PURE__ */ reactExports.createElement(PickerContext.Provider, {
    value: context
  }, /* @__PURE__ */ reactExports.createElement(PickerTrigger, _extends$2({}, pickTriggerProps(filledProps), {
    popupElement: panel,
    popupStyle: styles.popup,
    popupClassName: classNames2.popup,
    visible: mergedOpen,
    onClose: onPopupClose,
    range: true
  }), /* @__PURE__ */ reactExports.createElement(
    RefRangeSelector,
    _extends$2({}, filledProps, {
      // Ref
      ref: selectorRef,
      suffixIcon,
      activeIndex: focused || mergedOpen ? activeIndex : null,
      activeHelp: !!internalHoverValues,
      allHelp: !!internalHoverValues && hoverSource === "preset",
      focused,
      onFocus: onSelectorFocus,
      onBlur: onSelectorBlur,
      onKeyDown: onSelectorKeyDown,
      onSubmit: triggerPartConfirm,
      value: hoverValues,
      maskFormat,
      onChange: onSelectorChange,
      onInputChange: onSelectorInputChange,
      format: formatList,
      inputReadOnly,
      disabled,
      open: mergedOpen,
      onOpenChange: triggerOpen,
      onClick: onSelectorClick,
      onClear: onSelectorClear,
      invalid: submitInvalidates,
      onInvalid: onSelectorInvalid,
      onActiveInfo: setActiveInfo
    })
  )));
}
var RefRangePicker = /* @__PURE__ */ reactExports.forwardRef(RangePicker$1);
function MultipleDates(props) {
  var prefixCls = props.prefixCls, value = props.value, onRemove = props.onRemove, _props$removeIcon = props.removeIcon, removeIcon = _props$removeIcon === void 0 ? "×" : _props$removeIcon, formatDate = props.formatDate, disabled = props.disabled, maxTagCount = props.maxTagCount, placeholder = props.placeholder;
  var selectorCls = "".concat(prefixCls, "-selector");
  var selectionCls = "".concat(prefixCls, "-selection");
  var overflowCls = "".concat(selectionCls, "-overflow");
  function renderSelector(content, onClose) {
    return /* @__PURE__ */ reactExports.createElement("span", {
      className: classNames("".concat(selectionCls, "-item")),
      title: typeof content === "string" ? content : null
    }, /* @__PURE__ */ reactExports.createElement("span", {
      className: "".concat(selectionCls, "-item-content")
    }, content), !disabled && onClose && /* @__PURE__ */ reactExports.createElement("span", {
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
      },
      onClick: onClose,
      className: "".concat(selectionCls, "-item-remove")
    }, removeIcon));
  }
  function renderItem(date) {
    var displayLabel = formatDate(date);
    var onClose = function onClose2(event) {
      if (event) event.stopPropagation();
      onRemove(date);
    };
    return renderSelector(displayLabel, onClose);
  }
  function renderRest(omittedValues) {
    var content = "+ ".concat(omittedValues.length, " ...");
    return renderSelector(content);
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: selectorCls
  }, /* @__PURE__ */ reactExports.createElement(ForwardOverflow, {
    prefixCls: overflowCls,
    data: value,
    renderItem,
    renderRest,
    itemKey: function itemKey(date) {
      return formatDate(date);
    },
    maxCount: maxTagCount
  }), !value.length && /* @__PURE__ */ reactExports.createElement("span", {
    className: "".concat(prefixCls, "-selection-placeholder")
  }, placeholder));
}
var _excluded$6 = ["id", "open", "prefix", "clearIcon", "suffixIcon", "activeHelp", "allHelp", "focused", "onFocus", "onBlur", "onKeyDown", "locale", "generateConfig", "placeholder", "className", "style", "onClick", "onClear", "internalPicker", "value", "onChange", "onSubmit", "onInputChange", "multiple", "maxTagCount", "format", "maskFormat", "preserveInvalidOnBlur", "onInvalid", "disabled", "invalid", "inputReadOnly", "direction", "onOpenChange", "onMouseDown", "required", "aria-required", "autoFocus", "tabIndex", "removeIcon"];
function SingleSelector(props, ref) {
  props.id;
  var open = props.open, prefix = props.prefix, clearIcon = props.clearIcon, suffixIcon = props.suffixIcon;
  props.activeHelp;
  props.allHelp;
  var focused = props.focused;
  props.onFocus;
  props.onBlur;
  props.onKeyDown;
  var locale2 = props.locale, generateConfig2 = props.generateConfig, placeholder = props.placeholder, className = props.className, style = props.style, onClick = props.onClick, onClear = props.onClear, internalPicker = props.internalPicker, value = props.value, onChange2 = props.onChange, onSubmit = props.onSubmit;
  props.onInputChange;
  var multiple = props.multiple, maxTagCount = props.maxTagCount;
  props.format;
  props.maskFormat;
  props.preserveInvalidOnBlur;
  props.onInvalid;
  var disabled = props.disabled, invalid = props.invalid;
  props.inputReadOnly;
  var direction = props.direction;
  props.onOpenChange;
  var _onMouseDown = props.onMouseDown;
  props.required;
  props["aria-required"];
  var autoFocus = props.autoFocus, tabIndex = props.tabIndex, removeIcon = props.removeIcon, restProps = _objectWithoutProperties(props, _excluded$6);
  var rtl = direction === "rtl";
  var _React$useContext = reactExports.useContext(PickerContext), prefixCls = _React$useContext.prefixCls;
  var rootRef = reactExports.useRef();
  var inputRef = reactExports.useRef();
  reactExports.useImperativeHandle(ref, function() {
    return {
      nativeElement: rootRef.current,
      focus: function focus(options) {
        var _inputRef$current;
        (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus(options);
      },
      blur: function blur() {
        var _inputRef$current2;
        (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 || _inputRef$current2.blur();
      }
    };
  });
  var rootProps = useRootProps(restProps);
  var onSingleChange = function onSingleChange2(date) {
    onChange2([date]);
  };
  var onMultipleRemove = function onMultipleRemove2(date) {
    var nextValues = value.filter(function(oriDate) {
      return oriDate && !isSame(generateConfig2, locale2, oriDate, date, internalPicker);
    });
    onChange2(nextValues);
    if (!open) {
      onSubmit();
    }
  };
  var _useInputProps = useInputProps(_objectSpread2(_objectSpread2({}, props), {}, {
    onChange: onSingleChange
  }), function(_ref) {
    var valueTexts = _ref.valueTexts;
    return {
      value: valueTexts[0] || "",
      active: focused
    };
  }), _useInputProps2 = _slicedToArray(_useInputProps, 2), getInputProps = _useInputProps2[0], getText = _useInputProps2[1];
  var showClear = !!(clearIcon && value.length && !disabled);
  var selectorNode = multiple ? /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(MultipleDates, {
    prefixCls,
    value,
    onRemove: onMultipleRemove,
    formatDate: getText,
    maxTagCount,
    disabled,
    removeIcon,
    placeholder
  }), /* @__PURE__ */ reactExports.createElement("input", {
    className: "".concat(prefixCls, "-multiple-input"),
    value: value.map(getText).join(","),
    ref: inputRef,
    readOnly: true,
    autoFocus,
    tabIndex
  }), /* @__PURE__ */ reactExports.createElement(Icon, {
    type: "suffix",
    icon: suffixIcon
  }), showClear && /* @__PURE__ */ reactExports.createElement(ClearIcon, {
    icon: clearIcon,
    onClear
  })) : /* @__PURE__ */ reactExports.createElement(Input, _extends$2({
    ref: inputRef
  }, getInputProps(), {
    autoFocus,
    tabIndex,
    suffixIcon,
    clearIcon: showClear && /* @__PURE__ */ reactExports.createElement(ClearIcon, {
      icon: clearIcon,
      onClear
    }),
    showActiveCls: false
  }));
  return /* @__PURE__ */ reactExports.createElement("div", _extends$2({}, rootProps, {
    className: classNames(prefixCls, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-multiple"), multiple), "".concat(prefixCls, "-focused"), focused), "".concat(prefixCls, "-disabled"), disabled), "".concat(prefixCls, "-invalid"), invalid), "".concat(prefixCls, "-rtl"), rtl), className),
    style,
    ref: rootRef,
    onClick,
    onMouseDown: function onMouseDown(e) {
      var _inputRef$current3;
      var target = e.target;
      if (target !== ((_inputRef$current3 = inputRef.current) === null || _inputRef$current3 === void 0 ? void 0 : _inputRef$current3.inputElement)) {
        e.preventDefault();
      }
      _onMouseDown === null || _onMouseDown === void 0 || _onMouseDown(e);
    }
  }), prefix && /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-prefix")
  }, prefix), selectorNode);
}
var RefSingleSelector = /* @__PURE__ */ reactExports.forwardRef(SingleSelector);
function Picker2(props, ref) {
  var _useFilledProps = useFilledProps(props), _useFilledProps2 = _slicedToArray(_useFilledProps, 6), filledProps = _useFilledProps2[0], internalPicker = _useFilledProps2[1], complexPicker = _useFilledProps2[2], formatList = _useFilledProps2[3], maskFormat = _useFilledProps2[4], isInvalidateDate = _useFilledProps2[5];
  var _ref = filledProps, prefixCls = _ref.prefixCls, styles = _ref.styles, classNames2 = _ref.classNames, order = _ref.order, defaultValue2 = _ref.defaultValue, value = _ref.value, needConfirm = _ref.needConfirm, onChange2 = _ref.onChange, onKeyDown = _ref.onKeyDown, disabled = _ref.disabled, disabledDate = _ref.disabledDate, minDate = _ref.minDate, maxDate = _ref.maxDate, defaultOpen = _ref.defaultOpen, open = _ref.open, onOpenChange = _ref.onOpenChange, locale2 = _ref.locale, generateConfig2 = _ref.generateConfig, picker = _ref.picker, showNow = _ref.showNow, showToday = _ref.showToday, showTime = _ref.showTime, mode = _ref.mode, onPanelChange = _ref.onPanelChange, onCalendarChange = _ref.onCalendarChange, onOk = _ref.onOk, multiple = _ref.multiple, defaultPickerValue = _ref.defaultPickerValue, pickerValue = _ref.pickerValue, onPickerValueChange = _ref.onPickerValueChange, inputReadOnly = _ref.inputReadOnly, suffixIcon = _ref.suffixIcon, removeIcon = _ref.removeIcon, onFocus = _ref.onFocus, onBlur = _ref.onBlur, presets = _ref.presets, components2 = _ref.components, cellRender = _ref.cellRender, dateRender = _ref.dateRender, monthCellRender = _ref.monthCellRender, onClick = _ref.onClick;
  var selectorRef = usePickerRef(ref);
  function pickerParam(values) {
    if (values === null) {
      return null;
    }
    return multiple ? values : values[0];
  }
  var toggleDates = useToggleDates(generateConfig2, locale2, internalPicker);
  var _useOpen = useOpen(open, defaultOpen, [disabled], onOpenChange), _useOpen2 = _slicedToArray(_useOpen, 2), mergedOpen = _useOpen2[0], triggerOpen = _useOpen2[1];
  var onInternalCalendarChange = function onInternalCalendarChange2(dates, dateStrings, info) {
    if (onCalendarChange) {
      var filteredInfo = _objectSpread2({}, info);
      delete filteredInfo.range;
      onCalendarChange(pickerParam(dates), pickerParam(dateStrings), filteredInfo);
    }
  };
  var onInternalOk = function onInternalOk2(dates) {
    onOk === null || onOk === void 0 || onOk(pickerParam(dates));
  };
  var _useInnerValue = useInnerValue(generateConfig2, locale2, formatList, false, order, defaultValue2, value, onInternalCalendarChange, onInternalOk), _useInnerValue2 = _slicedToArray(_useInnerValue, 5), mergedValue = _useInnerValue2[0], setInnerValue = _useInnerValue2[1], getCalendarValue = _useInnerValue2[2], triggerCalendarChange = _useInnerValue2[3], triggerOk = _useInnerValue2[4];
  var calendarValue = getCalendarValue();
  var _useRangeActive = useRangeActive([disabled]), _useRangeActive2 = _slicedToArray(_useRangeActive, 4), focused = _useRangeActive2[0], triggerFocus2 = _useRangeActive2[1], lastOperation = _useRangeActive2[2], activeIndex = _useRangeActive2[3];
  var onSharedFocus = function onSharedFocus2(event) {
    triggerFocus2(true);
    onFocus === null || onFocus === void 0 || onFocus(event, {});
  };
  var onSharedBlur = function onSharedBlur2(event) {
    triggerFocus2(false);
    onBlur === null || onBlur === void 0 || onBlur(event, {});
  };
  var _useMergedState = useMergedState(picker, {
    value: mode
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedMode = _useMergedState2[0], setMode = _useMergedState2[1];
  var internalMode = mergedMode === "date" && showTime ? "datetime" : mergedMode;
  var mergedShowNow = useShowNow(picker, mergedMode, showNow, showToday);
  var onInternalChange = onChange2 && function(dates, dateStrings) {
    onChange2(pickerParam(dates), pickerParam(dateStrings));
  };
  var _useRangeValue = useRangeValue(
    _objectSpread2(_objectSpread2({}, filledProps), {}, {
      onChange: onInternalChange
    }),
    mergedValue,
    setInnerValue,
    getCalendarValue,
    triggerCalendarChange,
    [],
    //disabled,
    formatList,
    focused,
    mergedOpen,
    isInvalidateDate
  ), _useRangeValue2 = _slicedToArray(_useRangeValue, 2), triggerSubmitChange = _useRangeValue2[1];
  var _useFieldsInvalidate = useFieldsInvalidate(calendarValue, isInvalidateDate), _useFieldsInvalidate2 = _slicedToArray(_useFieldsInvalidate, 2), submitInvalidates = _useFieldsInvalidate2[0], onSelectorInvalid = _useFieldsInvalidate2[1];
  var submitInvalidate = reactExports.useMemo(function() {
    return submitInvalidates.some(function(invalidated) {
      return invalidated;
    });
  }, [submitInvalidates]);
  var onInternalPickerValueChange = function onInternalPickerValueChange2(dates, info) {
    if (onPickerValueChange) {
      var cleanInfo = _objectSpread2(_objectSpread2({}, info), {}, {
        mode: info.mode[0]
      });
      delete cleanInfo.range;
      onPickerValueChange(dates[0], cleanInfo);
    }
  };
  var _useRangePickerValue = useRangePickerValue(
    generateConfig2,
    locale2,
    calendarValue,
    [mergedMode],
    mergedOpen,
    activeIndex,
    internalPicker,
    false,
    // multiplePanel,
    defaultPickerValue,
    pickerValue,
    toArray(showTime === null || showTime === void 0 ? void 0 : showTime.defaultOpenValue),
    onInternalPickerValueChange,
    minDate,
    maxDate
  ), _useRangePickerValue2 = _slicedToArray(_useRangePickerValue, 2), currentPickerValue = _useRangePickerValue2[0], setCurrentPickerValue = _useRangePickerValue2[1];
  var triggerModeChange = useEvent$1(function(nextPickerValue, nextMode, triggerEvent) {
    setMode(nextMode);
    if (onPanelChange && triggerEvent !== false) {
      var lastPickerValue = nextPickerValue || calendarValue[calendarValue.length - 1];
      onPanelChange(lastPickerValue, nextMode);
    }
  });
  var triggerConfirm = function triggerConfirm2() {
    triggerSubmitChange(getCalendarValue());
    triggerOpen(false, {
      force: true
    });
  };
  var onSelectorClick = function onSelectorClick2(event) {
    if (!disabled && !selectorRef.current.nativeElement.contains(document.activeElement)) {
      selectorRef.current.focus();
    }
    triggerOpen(true);
    onClick === null || onClick === void 0 || onClick(event);
  };
  var onSelectorClear = function onSelectorClear2() {
    triggerSubmitChange(null);
    triggerOpen(false, {
      force: true
    });
  };
  var _React$useState = reactExports.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), hoverSource = _React$useState2[0], setHoverSource = _React$useState2[1];
  var _React$useState3 = reactExports.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), internalHoverValue = _React$useState4[0], setInternalHoverValue = _React$useState4[1];
  var hoverValues = reactExports.useMemo(function() {
    var values = [internalHoverValue].concat(_toConsumableArray(calendarValue)).filter(function(date) {
      return date;
    });
    return multiple ? values : values.slice(0, 1);
  }, [calendarValue, internalHoverValue, multiple]);
  var selectorValues = reactExports.useMemo(function() {
    if (!multiple && internalHoverValue) {
      return [internalHoverValue];
    }
    return calendarValue.filter(function(date) {
      return date;
    });
  }, [calendarValue, internalHoverValue, multiple]);
  reactExports.useEffect(function() {
    if (!mergedOpen) {
      setInternalHoverValue(null);
    }
  }, [mergedOpen]);
  var presetList = usePresets(presets);
  var onPresetHover = function onPresetHover2(nextValue) {
    setInternalHoverValue(nextValue);
    setHoverSource("preset");
  };
  var onPresetSubmit = function onPresetSubmit2(nextValue) {
    var nextCalendarValues = multiple ? toggleDates(getCalendarValue(), nextValue) : [nextValue];
    var passed = triggerSubmitChange(nextCalendarValues);
    if (passed && !multiple) {
      triggerOpen(false, {
        force: true
      });
    }
  };
  var onNow = function onNow2(now2) {
    onPresetSubmit(now2);
  };
  var onPanelHover = function onPanelHover2(date) {
    setInternalHoverValue(date);
    setHoverSource("cell");
  };
  var onPanelFocus = function onPanelFocus2(event) {
    triggerOpen(true);
    onSharedFocus(event);
  };
  var onPanelSelect = function onPanelSelect2(date) {
    lastOperation("panel");
    if (multiple && internalMode !== picker) {
      return;
    }
    var nextValues = multiple ? toggleDates(getCalendarValue(), date) : [date];
    triggerCalendarChange(nextValues);
    if (!needConfirm && !complexPicker && internalPicker === internalMode) {
      triggerConfirm();
    }
  };
  var onPopupClose = function onPopupClose2() {
    triggerOpen(false);
  };
  var onInternalCellRender = useCellRender(cellRender, dateRender, monthCellRender);
  var panelProps = reactExports.useMemo(function() {
    var domProps = pickAttrs(filledProps, false);
    var restProps = omit(filledProps, [].concat(_toConsumableArray(Object.keys(domProps)), ["onChange", "onCalendarChange", "style", "className", "onPanelChange"]));
    return _objectSpread2(_objectSpread2({}, restProps), {}, {
      multiple: filledProps.multiple
    });
  }, [filledProps]);
  var panel = /* @__PURE__ */ reactExports.createElement(Popup, _extends$2({}, panelProps, {
    showNow: mergedShowNow,
    showTime,
    disabledDate,
    onFocus: onPanelFocus,
    onBlur: onSharedBlur,
    picker,
    mode: mergedMode,
    internalMode,
    onPanelChange: triggerModeChange,
    format: maskFormat,
    value: calendarValue,
    isInvalid: isInvalidateDate,
    onChange: null,
    onSelect: onPanelSelect,
    pickerValue: currentPickerValue,
    defaultOpenValue: showTime === null || showTime === void 0 ? void 0 : showTime.defaultOpenValue,
    onPickerValueChange: setCurrentPickerValue,
    hoverValue: hoverValues,
    onHover: onPanelHover,
    needConfirm,
    onSubmit: triggerConfirm,
    onOk: triggerOk,
    presets: presetList,
    onPresetHover,
    onPresetSubmit,
    onNow,
    cellRender: onInternalCellRender
  }));
  var onSelectorChange = function onSelectorChange2(date) {
    triggerCalendarChange(date);
  };
  var onSelectorInputChange = function onSelectorInputChange2() {
    lastOperation("input");
  };
  var onSelectorFocus = function onSelectorFocus2(event) {
    lastOperation("input");
    triggerOpen(true, {
      inherit: true
    });
    onSharedFocus(event);
  };
  var onSelectorBlur = function onSelectorBlur2(event) {
    triggerOpen(false);
    onSharedBlur(event);
  };
  var onSelectorKeyDown = function onSelectorKeyDown2(event, preventDefault2) {
    if (event.key === "Tab") {
      triggerConfirm();
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown(event, preventDefault2);
  };
  var context = reactExports.useMemo(function() {
    return {
      prefixCls,
      locale: locale2,
      generateConfig: generateConfig2,
      button: components2.button,
      input: components2.input
    };
  }, [prefixCls, locale2, generateConfig2, components2.button, components2.input]);
  useLayoutEffect(function() {
    if (mergedOpen && activeIndex !== void 0) {
      triggerModeChange(null, picker, false);
    }
  }, [mergedOpen, activeIndex, picker]);
  useLayoutEffect(function() {
    var lastOp = lastOperation();
    if (!mergedOpen && lastOp === "input") {
      triggerOpen(false);
      triggerConfirm();
    }
    if (!mergedOpen && complexPicker && !needConfirm && lastOp === "panel") {
      triggerConfirm();
    }
  }, [mergedOpen]);
  return /* @__PURE__ */ reactExports.createElement(PickerContext.Provider, {
    value: context
  }, /* @__PURE__ */ reactExports.createElement(PickerTrigger, _extends$2({}, pickTriggerProps(filledProps), {
    popupElement: panel,
    popupStyle: styles.popup,
    popupClassName: classNames2.popup,
    visible: mergedOpen,
    onClose: onPopupClose
  }), /* @__PURE__ */ reactExports.createElement(
    RefSingleSelector,
    _extends$2({}, filledProps, {
      // Ref
      ref: selectorRef,
      suffixIcon,
      removeIcon,
      activeHelp: !!internalHoverValue,
      allHelp: !!internalHoverValue && hoverSource === "preset",
      focused,
      onFocus: onSelectorFocus,
      onBlur: onSelectorBlur,
      onKeyDown: onSelectorKeyDown,
      onSubmit: triggerConfirm,
      value: selectorValues,
      maskFormat,
      onChange: onSelectorChange,
      onInputChange: onSelectorInputChange,
      internalPicker,
      format: formatList,
      inputReadOnly,
      disabled,
      open: mergedOpen,
      onOpenChange: triggerOpen,
      onClick: onSelectorClick,
      onClear: onSelectorClear,
      invalid: submitInvalidate,
      onInvalid: function onInvalid(invalid) {
        onSelectorInvalid(invalid, 0);
      }
    })
  )));
}
var RefPicker = /* @__PURE__ */ reactExports.forwardRef(Picker2);
const YEAR_SELECT_OFFSET = 10;
const YEAR_SELECT_TOTAL = 20;
function YearSelect(props) {
  const {
    fullscreen,
    validRange,
    generateConfig: generateConfig2,
    locale: locale2,
    prefixCls,
    value,
    onChange: onChange2,
    divRef
  } = props;
  const year = generateConfig2.getYear(value || generateConfig2.getNow());
  let start = year - YEAR_SELECT_OFFSET;
  let end = start + YEAR_SELECT_TOTAL;
  if (validRange) {
    start = generateConfig2.getYear(validRange[0]);
    end = generateConfig2.getYear(validRange[1]) + 1;
  }
  const suffix = locale2 && locale2.year === "年" ? "年" : "";
  const options = [];
  for (let index2 = start; index2 < end; index2++) {
    options.push({
      label: `${index2}${suffix}`,
      value: index2
    });
  }
  return /* @__PURE__ */ reactExports.createElement(Select, {
    size: fullscreen ? void 0 : "small",
    options,
    value: year,
    className: `${prefixCls}-year-select`,
    onChange: (numYear) => {
      let newDate = generateConfig2.setYear(value, numYear);
      if (validRange) {
        const [startDate, endDate] = validRange;
        const newYear = generateConfig2.getYear(newDate);
        const newMonth = generateConfig2.getMonth(newDate);
        if (newYear === generateConfig2.getYear(endDate) && newMonth > generateConfig2.getMonth(endDate)) {
          newDate = generateConfig2.setMonth(newDate, generateConfig2.getMonth(endDate));
        }
        if (newYear === generateConfig2.getYear(startDate) && newMonth < generateConfig2.getMonth(startDate)) {
          newDate = generateConfig2.setMonth(newDate, generateConfig2.getMonth(startDate));
        }
      }
      onChange2(newDate);
    },
    getPopupContainer: () => divRef.current
  });
}
function MonthSelect(props) {
  const {
    prefixCls,
    fullscreen,
    validRange,
    value,
    generateConfig: generateConfig2,
    locale: locale2,
    onChange: onChange2,
    divRef
  } = props;
  const month = generateConfig2.getMonth(value || generateConfig2.getNow());
  let start = 0;
  let end = 11;
  if (validRange) {
    const [rangeStart, rangeEnd] = validRange;
    const currentYear = generateConfig2.getYear(value);
    if (generateConfig2.getYear(rangeEnd) === currentYear) {
      end = generateConfig2.getMonth(rangeEnd);
    }
    if (generateConfig2.getYear(rangeStart) === currentYear) {
      start = generateConfig2.getMonth(rangeStart);
    }
  }
  const months = locale2.shortMonths || generateConfig2.locale.getShortMonths(locale2.locale);
  const options = [];
  for (let index2 = start; index2 <= end; index2 += 1) {
    options.push({
      label: months[index2],
      value: index2
    });
  }
  return /* @__PURE__ */ reactExports.createElement(Select, {
    size: fullscreen ? void 0 : "small",
    className: `${prefixCls}-month-select`,
    value: month,
    options,
    onChange: (newMonth) => {
      onChange2(generateConfig2.setMonth(value, newMonth));
    },
    getPopupContainer: () => divRef.current
  });
}
function ModeSwitch(props) {
  const {
    prefixCls,
    locale: locale2,
    mode,
    fullscreen,
    onModeChange
  } = props;
  return /* @__PURE__ */ reactExports.createElement(Group, {
    onChange: ({
      target: {
        value
      }
    }) => {
      onModeChange(value);
    },
    value: mode,
    size: fullscreen ? void 0 : "small",
    className: `${prefixCls}-mode-switch`
  }, /* @__PURE__ */ reactExports.createElement(Button, {
    value: "month"
  }, locale2.month), /* @__PURE__ */ reactExports.createElement(Button, {
    value: "year"
  }, locale2.year));
}
function CalendarHeader(props) {
  const {
    prefixCls,
    fullscreen,
    mode,
    onChange: onChange2,
    onModeChange
  } = props;
  const divRef = reactExports.useRef(null);
  const formItemInputContext = reactExports.useContext(FormItemInputContext);
  const mergedFormItemInputContext = reactExports.useMemo(() => Object.assign(Object.assign({}, formItemInputContext), {
    isFormItemInput: false
  }), [formItemInputContext]);
  const sharedProps = Object.assign(Object.assign({}, props), {
    fullscreen,
    divRef
  });
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-header`,
    ref: divRef
  }, /* @__PURE__ */ reactExports.createElement(FormItemInputContext.Provider, {
    value: mergedFormItemInputContext
  }, /* @__PURE__ */ reactExports.createElement(YearSelect, Object.assign({}, sharedProps, {
    onChange: (v) => {
      onChange2(v, "year");
    }
  })), mode === "month" && /* @__PURE__ */ reactExports.createElement(MonthSelect, Object.assign({}, sharedProps, {
    onChange: (v) => {
      onChange2(v, "month");
    }
  }))), /* @__PURE__ */ reactExports.createElement(ModeSwitch, Object.assign({}, sharedProps, {
    onModeChange
  })));
}
const genSize = (token, suffix) => {
  const {
    componentCls,
    controlHeight
  } = token;
  const suffixCls = suffix ? `${componentCls}-${suffix}` : "";
  const multipleSelectorUnit = getMultipleSelectorUnit(token);
  return [
    // genSelectionStyle(token, suffix),
    {
      [`${componentCls}-multiple${suffixCls}`]: {
        paddingBlock: multipleSelectorUnit.containerPadding,
        paddingInlineStart: multipleSelectorUnit.basePadding,
        minHeight: controlHeight,
        // ======================== Selections ========================
        [`${componentCls}-selection-item`]: {
          height: multipleSelectorUnit.itemHeight,
          lineHeight: unit(multipleSelectorUnit.itemLineHeight)
        }
      }
    }
  ];
};
const genPickerMultipleStyle = (token) => {
  const {
    componentCls,
    calc,
    lineWidth
  } = token;
  const smallToken = merge$1(token, {
    fontHeight: token.fontSize,
    selectHeight: token.controlHeightSM,
    multipleSelectItemHeight: token.multipleItemHeightSM,
    borderRadius: token.borderRadiusSM,
    borderRadiusSM: token.borderRadiusXS,
    controlHeight: token.controlHeightSM
  });
  const largeToken = merge$1(token, {
    fontHeight: calc(token.multipleItemHeightLG).sub(calc(lineWidth).mul(2).equal()).equal(),
    fontSize: token.fontSizeLG,
    selectHeight: token.controlHeightLG,
    multipleSelectItemHeight: token.multipleItemHeightLG,
    borderRadius: token.borderRadiusLG,
    borderRadiusSM: token.borderRadius,
    controlHeight: token.controlHeightLG
  });
  return [
    // ======================== Size ========================
    genSize(smallToken, "small"),
    genSize(token),
    genSize(largeToken, "large"),
    // ====================== Selection ======================
    {
      [`${componentCls}${componentCls}-multiple`]: Object.assign(Object.assign({
        width: "100%",
        cursor: "text",
        // ==================== Selector =====================
        [`${componentCls}-selector`]: {
          flex: "auto",
          padding: 0,
          position: "relative",
          "&:after": {
            margin: 0
          },
          // ================== placeholder ==================
          [`${componentCls}-selection-placeholder`]: {
            position: "absolute",
            top: "50%",
            insetInlineStart: token.inputPaddingHorizontalBase,
            insetInlineEnd: 0,
            transform: "translateY(-50%)",
            transition: `all ${token.motionDurationSlow}`,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            flex: 1,
            color: token.colorTextPlaceholder,
            pointerEvents: "none"
          }
        }
      }, genOverflowStyle(token)), {
        // ====================== Input ======================
        // Input is `readonly`, which is used for a11y only
        [`${componentCls}-multiple-input`]: {
          width: 0,
          height: 0,
          border: 0,
          visibility: "hidden",
          position: "absolute",
          zIndex: -1
        }
      })
    }
  ];
};
const genPickerCellInnerStyle = (token) => {
  const {
    pickerCellCls,
    pickerCellInnerCls,
    cellHeight,
    borderRadiusSM,
    motionDurationMid,
    cellHoverBg,
    lineWidth,
    lineType,
    colorPrimary,
    cellActiveWithRangeBg,
    colorTextLightSolid,
    colorTextDisabled,
    cellBgDisabled,
    colorFillSecondary
  } = token;
  return {
    "&::before": {
      position: "absolute",
      top: "50%",
      insetInlineStart: 0,
      insetInlineEnd: 0,
      zIndex: 1,
      height: cellHeight,
      transform: "translateY(-50%)",
      content: '""',
      pointerEvents: "none"
    },
    // >>> Default
    [pickerCellInnerCls]: {
      position: "relative",
      zIndex: 2,
      display: "inline-block",
      minWidth: cellHeight,
      height: cellHeight,
      lineHeight: unit(cellHeight),
      borderRadius: borderRadiusSM,
      transition: `background ${motionDurationMid}`
    },
    // >>> Hover
    [`&:hover:not(${pickerCellCls}-in-view):not(${pickerCellCls}-disabled),
    &:hover:not(${pickerCellCls}-selected):not(${pickerCellCls}-range-start):not(${pickerCellCls}-range-end):not(${pickerCellCls}-disabled)`]: {
      [pickerCellInnerCls]: {
        background: cellHoverBg
      }
    },
    // >>> Today
    [`&-in-view${pickerCellCls}-today ${pickerCellInnerCls}`]: {
      "&::before": {
        position: "absolute",
        top: 0,
        insetInlineEnd: 0,
        bottom: 0,
        insetInlineStart: 0,
        zIndex: 1,
        border: `${unit(lineWidth)} ${lineType} ${colorPrimary}`,
        borderRadius: borderRadiusSM,
        content: '""'
      }
    },
    // >>> In Range
    [`&-in-view${pickerCellCls}-in-range,
      &-in-view${pickerCellCls}-range-start,
      &-in-view${pickerCellCls}-range-end`]: {
      position: "relative",
      [`&:not(${pickerCellCls}-disabled):before`]: {
        background: cellActiveWithRangeBg
      }
    },
    // >>> Selected
    [`&-in-view${pickerCellCls}-selected,
      &-in-view${pickerCellCls}-range-start,
      &-in-view${pickerCellCls}-range-end`]: {
      [`&:not(${pickerCellCls}-disabled) ${pickerCellInnerCls}`]: {
        color: colorTextLightSolid,
        background: colorPrimary
      },
      [`&${pickerCellCls}-disabled ${pickerCellInnerCls}`]: {
        background: colorFillSecondary
      }
    },
    [`&-in-view${pickerCellCls}-range-start:not(${pickerCellCls}-disabled):before`]: {
      insetInlineStart: "50%"
    },
    [`&-in-view${pickerCellCls}-range-end:not(${pickerCellCls}-disabled):before`]: {
      insetInlineEnd: "50%"
    },
    // range start border-radius
    [`&-in-view${pickerCellCls}-range-start:not(${pickerCellCls}-range-end) ${pickerCellInnerCls}`]: {
      borderStartStartRadius: borderRadiusSM,
      borderEndStartRadius: borderRadiusSM,
      borderStartEndRadius: 0,
      borderEndEndRadius: 0
    },
    // range end border-radius
    [`&-in-view${pickerCellCls}-range-end:not(${pickerCellCls}-range-start) ${pickerCellInnerCls}`]: {
      borderStartStartRadius: 0,
      borderEndStartRadius: 0,
      borderStartEndRadius: borderRadiusSM,
      borderEndEndRadius: borderRadiusSM
    },
    // >>> Disabled
    "&-disabled": {
      color: colorTextDisabled,
      cursor: "not-allowed",
      [pickerCellInnerCls]: {
        background: "transparent"
      },
      "&::before": {
        background: cellBgDisabled
      }
    },
    [`&-disabled${pickerCellCls}-today ${pickerCellInnerCls}::before`]: {
      borderColor: colorTextDisabled
    }
  };
};
const genPanelStyle = (token) => {
  const {
    componentCls,
    pickerCellCls,
    pickerCellInnerCls,
    pickerYearMonthCellWidth,
    pickerControlIconSize,
    cellWidth,
    paddingSM,
    paddingXS,
    paddingXXS,
    colorBgContainer,
    lineWidth,
    lineType,
    borderRadiusLG,
    colorPrimary,
    colorTextHeading,
    colorSplit,
    pickerControlIconBorderWidth,
    colorIcon,
    textHeight,
    motionDurationMid,
    colorIconHover,
    fontWeightStrong,
    cellHeight,
    pickerCellPaddingVertical,
    colorTextDisabled,
    colorText,
    fontSize,
    motionDurationSlow,
    withoutTimeCellHeight,
    pickerQuarterPanelContentHeight,
    borderRadiusSM,
    colorTextLightSolid,
    cellHoverBg,
    timeColumnHeight,
    timeColumnWidth,
    timeCellHeight,
    controlItemBgActive,
    marginXXS,
    pickerDatePanelPaddingHorizontal,
    pickerControlIconMargin
  } = token;
  const pickerPanelWidth = token.calc(cellWidth).mul(7).add(token.calc(pickerDatePanelPaddingHorizontal).mul(2)).equal();
  return {
    [componentCls]: {
      "&-panel": {
        display: "inline-flex",
        flexDirection: "column",
        textAlign: "center",
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        outline: "none",
        "&-focused": {
          borderColor: colorPrimary
        },
        "&-rtl": {
          [`${componentCls}-prev-icon,
              ${componentCls}-super-prev-icon`]: {
            transform: "rotate(45deg)"
          },
          [`${componentCls}-next-icon,
              ${componentCls}-super-next-icon`]: {
            transform: "rotate(-135deg)"
          },
          [`${componentCls}-time-panel`]: {
            [`${componentCls}-content`]: {
              direction: "ltr",
              "> *": {
                direction: "rtl"
              }
            }
          }
        }
      },
      // ========================================================
      // =                     Shared Panel                     =
      // ========================================================
      [`&-decade-panel,
        &-year-panel,
        &-quarter-panel,
        &-month-panel,
        &-week-panel,
        &-date-panel,
        &-time-panel`]: {
        display: "flex",
        flexDirection: "column",
        width: pickerPanelWidth
      },
      // ======================= Header =======================
      "&-header": {
        display: "flex",
        padding: `0 ${unit(paddingXS)}`,
        color: colorTextHeading,
        borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
        "> *": {
          flex: "none"
        },
        button: {
          padding: 0,
          color: colorIcon,
          lineHeight: unit(textHeight),
          background: "transparent",
          border: 0,
          cursor: "pointer",
          transition: `color ${motionDurationMid}`,
          fontSize: "inherit",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          "&:empty": {
            display: "none"
          }
        },
        "> button": {
          minWidth: "1.6em",
          fontSize,
          "&:hover": {
            color: colorIconHover
          },
          "&:disabled": {
            opacity: 0.25,
            pointerEvents: "none"
          }
        },
        "&-view": {
          flex: "auto",
          fontWeight: fontWeightStrong,
          lineHeight: unit(textHeight),
          "> button": {
            color: "inherit",
            fontWeight: "inherit",
            verticalAlign: "top",
            "&:not(:first-child)": {
              marginInlineStart: paddingXS
            },
            "&:hover": {
              color: colorPrimary
            }
          }
        }
      },
      // Arrow button
      [`&-prev-icon,
        &-next-icon,
        &-super-prev-icon,
        &-super-next-icon`]: {
        position: "relative",
        width: pickerControlIconSize,
        height: pickerControlIconSize,
        "&::before": {
          position: "absolute",
          top: 0,
          insetInlineStart: 0,
          width: pickerControlIconSize,
          height: pickerControlIconSize,
          border: `0 solid currentcolor`,
          borderBlockStartWidth: pickerControlIconBorderWidth,
          borderInlineStartWidth: pickerControlIconBorderWidth,
          content: '""'
        }
      },
      [`&-super-prev-icon,
        &-super-next-icon`]: {
        "&::after": {
          position: "absolute",
          top: pickerControlIconMargin,
          insetInlineStart: pickerControlIconMargin,
          display: "inline-block",
          width: pickerControlIconSize,
          height: pickerControlIconSize,
          border: "0 solid currentcolor",
          borderBlockStartWidth: pickerControlIconBorderWidth,
          borderInlineStartWidth: pickerControlIconBorderWidth,
          content: '""'
        }
      },
      "&-prev-icon, &-super-prev-icon": {
        transform: "rotate(-45deg)"
      },
      "&-next-icon, &-super-next-icon": {
        transform: "rotate(135deg)"
      },
      // ======================== Body ========================
      "&-content": {
        width: "100%",
        tableLayout: "fixed",
        borderCollapse: "collapse",
        "th, td": {
          position: "relative",
          minWidth: cellHeight,
          fontWeight: "normal"
        },
        th: {
          height: token.calc(cellHeight).add(token.calc(pickerCellPaddingVertical).mul(2)).equal(),
          color: colorText,
          verticalAlign: "middle"
        }
      },
      "&-cell": Object.assign({
        padding: `${unit(pickerCellPaddingVertical)} 0`,
        color: colorTextDisabled,
        cursor: "pointer",
        // In view
        "&-in-view": {
          color: colorText
        }
      }, genPickerCellInnerStyle(token)),
      [`&-decade-panel,
        &-year-panel,
        &-quarter-panel,
        &-month-panel`]: {
        [`${componentCls}-content`]: {
          height: token.calc(withoutTimeCellHeight).mul(4).equal()
        },
        [pickerCellInnerCls]: {
          padding: `0 ${unit(paddingXS)}`
        }
      },
      "&-quarter-panel": {
        [`${componentCls}-content`]: {
          height: pickerQuarterPanelContentHeight
        }
      },
      // ========================================================
      // =                       Special                        =
      // ========================================================
      // ===================== Decade Panel =====================
      "&-decade-panel": {
        [pickerCellInnerCls]: {
          padding: `0 ${unit(token.calc(paddingXS).div(2).equal())}`
        },
        [`${componentCls}-cell::before`]: {
          display: "none"
        }
      },
      // ============= Year & Quarter & Month Panel =============
      [`&-year-panel,
        &-quarter-panel,
        &-month-panel`]: {
        [`${componentCls}-body`]: {
          padding: `0 ${unit(paddingXS)}`
        },
        [pickerCellInnerCls]: {
          width: pickerYearMonthCellWidth
        }
      },
      // ====================== Date Panel ======================
      "&-date-panel": {
        [`${componentCls}-body`]: {
          padding: `${unit(paddingXS)} ${unit(pickerDatePanelPaddingHorizontal)}`
        },
        [`${componentCls}-content th`]: {
          boxSizing: "border-box",
          padding: 0
        }
      },
      // ====================== Week Panel ======================
      "&-week-panel-row": {
        td: {
          "&:before": {
            transition: `background ${motionDurationMid}`
          },
          "&:first-child:before": {
            borderStartStartRadius: borderRadiusSM,
            borderEndStartRadius: borderRadiusSM
          },
          "&:last-child:before": {
            borderStartEndRadius: borderRadiusSM,
            borderEndEndRadius: borderRadiusSM
          }
        },
        "&:hover td:before": {
          background: cellHoverBg
        },
        "&-range-start td, &-range-end td, &-selected td, &-hover td": {
          // Rise priority to override hover style
          [`&${pickerCellCls}`]: {
            "&:before": {
              background: colorPrimary
            },
            [`&${componentCls}-cell-week`]: {
              color: new FastColor(colorTextLightSolid).setA(0.5).toHexString()
            },
            [pickerCellInnerCls]: {
              color: colorTextLightSolid
            }
          }
        },
        "&-range-hover td:before": {
          background: controlItemBgActive
        }
      },
      // >>> ShowWeek
      "&-week-panel, &-date-panel-show-week": {
        [`${componentCls}-body`]: {
          padding: `${unit(paddingXS)} ${unit(paddingSM)}`
        },
        [`${componentCls}-content th`]: {
          width: "auto"
        }
      },
      // ==================== Datetime Panel ====================
      "&-datetime-panel": {
        display: "flex",
        [`${componentCls}-time-panel`]: {
          borderInlineStart: `${unit(lineWidth)} ${lineType} ${colorSplit}`
        },
        [`${componentCls}-date-panel,
          ${componentCls}-time-panel`]: {
          transition: `opacity ${motionDurationSlow}`
        },
        // Keyboard
        "&-active": {
          [`${componentCls}-date-panel,
            ${componentCls}-time-panel`]: {
            opacity: 0.3,
            "&-active": {
              opacity: 1
            }
          }
        }
      },
      // ====================== Time Panel ======================
      "&-time-panel": {
        width: "auto",
        minWidth: "auto",
        [`${componentCls}-content`]: {
          display: "flex",
          flex: "auto",
          height: timeColumnHeight
        },
        "&-column": {
          flex: "1 0 auto",
          width: timeColumnWidth,
          margin: `${unit(paddingXXS)} 0`,
          padding: 0,
          overflowY: "hidden",
          textAlign: "start",
          listStyle: "none",
          transition: `background ${motionDurationMid}`,
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            width: 8,
            backgroundColor: "transparent"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: token.colorTextTertiary,
            borderRadius: token.borderRadiusSM
          },
          // For Firefox
          "&": {
            scrollbarWidth: "thin",
            scrollbarColor: `${token.colorTextTertiary} transparent`
          },
          "&::after": {
            display: "block",
            height: `calc(100% - ${unit(timeCellHeight)})`,
            content: '""'
          },
          "&:not(:first-child)": {
            borderInlineStart: `${unit(lineWidth)} ${lineType} ${colorSplit}`
          },
          "&-active": {
            background: new FastColor(controlItemBgActive).setA(0.2).toHexString()
          },
          "&:hover": {
            overflowY: "auto"
          },
          "> li": {
            margin: 0,
            padding: 0,
            [`&${componentCls}-time-panel-cell`]: {
              marginInline: marginXXS,
              [`${componentCls}-time-panel-cell-inner`]: {
                display: "block",
                width: token.calc(timeColumnWidth).sub(token.calc(marginXXS).mul(2)).equal(),
                height: timeCellHeight,
                margin: 0,
                paddingBlock: 0,
                paddingInlineEnd: 0,
                paddingInlineStart: token.calc(timeColumnWidth).sub(timeCellHeight).div(2).equal(),
                color: colorText,
                lineHeight: unit(timeCellHeight),
                borderRadius: borderRadiusSM,
                cursor: "pointer",
                transition: `background ${motionDurationMid}`,
                "&:hover": {
                  background: cellHoverBg
                }
              },
              "&-selected": {
                [`${componentCls}-time-panel-cell-inner`]: {
                  background: controlItemBgActive
                }
              },
              "&-disabled": {
                [`${componentCls}-time-panel-cell-inner`]: {
                  color: colorTextDisabled,
                  background: "transparent",
                  cursor: "not-allowed"
                }
              }
            }
          }
        }
      }
    }
  };
};
const genPickerPanelStyle = (token) => {
  const {
    componentCls,
    textHeight,
    lineWidth,
    paddingSM,
    antCls,
    colorPrimary,
    cellActiveWithRangeBg,
    colorPrimaryBorder,
    lineType,
    colorSplit
  } = token;
  return {
    [`${componentCls}-dropdown`]: {
      // ======================== Footer ========================
      [`${componentCls}-footer`]: {
        borderTop: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
        "&-extra": {
          padding: `0 ${unit(paddingSM)}`,
          lineHeight: unit(token.calc(textHeight).sub(token.calc(lineWidth).mul(2)).equal()),
          textAlign: "start",
          "&:not(:last-child)": {
            borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`
          }
        }
      },
      // ==================== Footer > Ranges ===================
      [`${componentCls}-panels + ${componentCls}-footer ${componentCls}-ranges`]: {
        justifyContent: "space-between"
      },
      [`${componentCls}-ranges`]: {
        marginBlock: 0,
        paddingInline: unit(paddingSM),
        overflow: "hidden",
        textAlign: "start",
        listStyle: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "> li": {
          lineHeight: unit(token.calc(textHeight).sub(token.calc(lineWidth).mul(2)).equal()),
          display: "inline-block"
        },
        [`${componentCls}-now-btn-disabled`]: {
          pointerEvents: "none",
          color: token.colorTextDisabled
        },
        // https://github.com/ant-design/ant-design/issues/23687
        [`${componentCls}-preset > ${antCls}-tag-blue`]: {
          color: colorPrimary,
          background: cellActiveWithRangeBg,
          borderColor: colorPrimaryBorder,
          cursor: "pointer"
        },
        [`${componentCls}-ok`]: {
          paddingBlock: token.calc(lineWidth).mul(2).equal(),
          marginInlineStart: "auto"
        }
      }
    }
  };
};
const initPickerPanelToken = (token) => {
  const {
    componentCls,
    controlHeightLG,
    paddingXXS,
    padding
  } = token;
  return {
    pickerCellCls: `${componentCls}-cell`,
    pickerCellInnerCls: `${componentCls}-cell-inner`,
    pickerYearMonthCellWidth: token.calc(controlHeightLG).mul(1.5).equal(),
    pickerQuarterPanelContentHeight: token.calc(controlHeightLG).mul(1.4).equal(),
    pickerCellPaddingVertical: token.calc(paddingXXS).add(token.calc(paddingXXS).div(2)).equal(),
    pickerCellBorderGap: 2,
    // Magic for gap between cells
    pickerControlIconSize: 7,
    pickerControlIconMargin: 4,
    pickerControlIconBorderWidth: 1.5,
    pickerDatePanelPaddingHorizontal: token.calc(padding).add(token.calc(paddingXXS).div(2)).equal()
    // 18 in normal
  };
};
const initPanelComponentToken = (token) => {
  const {
    colorBgContainerDisabled,
    controlHeight,
    controlHeightSM,
    controlHeightLG,
    paddingXXS,
    lineWidth
  } = token;
  const dblPaddingXXS = paddingXXS * 2;
  const dblLineWidth = lineWidth * 2;
  const multipleItemHeight = Math.min(controlHeight - dblPaddingXXS, controlHeight - dblLineWidth);
  const multipleItemHeightSM = Math.min(controlHeightSM - dblPaddingXXS, controlHeightSM - dblLineWidth);
  const multipleItemHeightLG = Math.min(controlHeightLG - dblPaddingXXS, controlHeightLG - dblLineWidth);
  const INTERNAL_FIXED_ITEM_MARGIN = Math.floor(paddingXXS / 2);
  const filledToken = {
    INTERNAL_FIXED_ITEM_MARGIN,
    cellHoverBg: token.controlItemBgHover,
    cellActiveWithRangeBg: token.controlItemBgActive,
    cellHoverWithRangeBg: new FastColor(token.colorPrimary).lighten(35).toHexString(),
    cellRangeBorderColor: new FastColor(token.colorPrimary).lighten(20).toHexString(),
    cellBgDisabled: colorBgContainerDisabled,
    timeColumnWidth: controlHeightLG * 1.4,
    timeColumnHeight: 28 * 8,
    timeCellHeight: 28,
    cellWidth: controlHeightSM * 1.5,
    cellHeight: controlHeightSM,
    textHeight: controlHeightLG,
    withoutTimeCellHeight: controlHeightLG * 1.65,
    multipleItemBg: token.colorFillSecondary,
    multipleItemBorderColor: "transparent",
    multipleItemHeight,
    multipleItemHeightSM,
    multipleItemHeightLG,
    multipleSelectorBgDisabled: colorBgContainerDisabled,
    multipleItemColorDisabled: token.colorTextDisabled,
    multipleItemBorderColorDisabled: "transparent"
  };
  return filledToken;
};
const prepareComponentToken$8 = (token) => Object.assign(Object.assign(Object.assign(Object.assign({}, initComponentToken(token)), initPanelComponentToken(token)), getArrowToken(token)), {
  presetsWidth: 120,
  presetsMaxWidth: 200,
  zIndexPopup: token.zIndexPopupBase + 50
});
const genVariantsStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: [
      Object.assign(Object.assign(Object.assign(Object.assign({}, genOutlinedStyle(token)), genUnderlinedStyle(token)), genFilledStyle(token)), genBorderlessStyle(token)),
      // ========================= Multiple =========================
      {
        "&-outlined": {
          [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
            background: token.multipleItemBg,
            border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`
          }
        },
        "&-filled": {
          [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
            background: token.colorBgContainer,
            border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`
          }
        },
        "&-borderless": {
          [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
            background: token.multipleItemBg,
            border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`
          }
        },
        "&-underlined": {
          [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
            background: token.multipleItemBg,
            border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`
          }
        }
      }
    ]
  };
};
const genPickerPadding = (paddingBlock, paddingInline) => {
  return {
    padding: `${unit(paddingBlock)} ${unit(paddingInline)}`
  };
};
const genPickerStatusStyle = (token) => {
  const {
    componentCls,
    colorError,
    colorWarning
  } = token;
  return {
    [`${componentCls}:not(${componentCls}-disabled):not([disabled])`]: {
      [`&${componentCls}-status-error`]: {
        [`${componentCls}-active-bar`]: {
          background: colorError
        }
      },
      [`&${componentCls}-status-warning`]: {
        [`${componentCls}-active-bar`]: {
          background: colorWarning
        }
      }
    }
  };
};
const genPickerStyle$1 = (token) => {
  var _a;
  const {
    componentCls,
    antCls,
    paddingInline,
    lineWidth,
    lineType,
    colorBorder,
    borderRadius,
    motionDurationMid,
    colorTextDisabled,
    colorTextPlaceholder,
    colorTextQuaternary,
    fontSizeLG,
    inputFontSizeLG,
    fontSizeSM,
    inputFontSizeSM,
    controlHeightSM,
    paddingInlineSM,
    paddingXS,
    marginXS,
    colorIcon,
    lineWidthBold,
    colorPrimary,
    motionDurationSlow,
    zIndexPopup,
    paddingXXS,
    sizePopupArrow,
    colorBgElevated,
    borderRadiusLG,
    boxShadowSecondary,
    borderRadiusSM,
    colorSplit,
    cellHoverBg,
    presetsWidth,
    presetsMaxWidth,
    boxShadowPopoverArrow,
    fontHeight,
    lineHeightLG
  } = token;
  return [
    {
      [componentCls]: Object.assign(Object.assign(Object.assign({}, resetComponent(token)), genPickerPadding(token.paddingBlock, token.paddingInline)), {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        lineHeight: 1,
        borderRadius,
        transition: `border ${motionDurationMid}, box-shadow ${motionDurationMid}, background ${motionDurationMid}`,
        [`${componentCls}-prefix`]: {
          flex: "0 0 auto",
          marginInlineEnd: token.inputAffixPadding
        },
        // ======================== Input =========================
        [`${componentCls}-input`]: {
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          width: "100%",
          "> input": Object.assign(Object.assign({
            position: "relative",
            display: "inline-block",
            width: "100%",
            color: "inherit",
            fontSize: (_a = token.inputFontSize) !== null && _a !== void 0 ? _a : token.fontSize,
            lineHeight: token.lineHeight,
            transition: `all ${motionDurationMid}`
          }, genPlaceholderStyle(colorTextPlaceholder)), {
            flex: "auto",
            // Fix Firefox flex not correct:
            // https://github.com/ant-design/ant-design/pull/20023#issuecomment-564389553
            minWidth: 1,
            height: "auto",
            padding: 0,
            background: "transparent",
            border: 0,
            fontFamily: "inherit",
            "&:focus": {
              boxShadow: "none",
              outline: 0
            },
            "&[disabled]": {
              background: "transparent",
              color: colorTextDisabled,
              cursor: "not-allowed"
            }
          }),
          "&-placeholder": {
            "> input": {
              color: colorTextPlaceholder
            }
          }
        },
        // Size
        "&-large": Object.assign(Object.assign({}, genPickerPadding(token.paddingBlockLG, token.paddingInlineLG)), {
          [`${componentCls}-input > input`]: {
            fontSize: inputFontSizeLG !== null && inputFontSizeLG !== void 0 ? inputFontSizeLG : fontSizeLG,
            lineHeight: lineHeightLG
          }
        }),
        "&-small": Object.assign(Object.assign({}, genPickerPadding(token.paddingBlockSM, token.paddingInlineSM)), {
          [`${componentCls}-input > input`]: {
            fontSize: inputFontSizeSM !== null && inputFontSizeSM !== void 0 ? inputFontSizeSM : fontSizeSM
          }
        }),
        [`${componentCls}-suffix`]: {
          display: "flex",
          flex: "none",
          alignSelf: "center",
          marginInlineStart: token.calc(paddingXS).div(2).equal(),
          color: colorTextQuaternary,
          lineHeight: 1,
          pointerEvents: "none",
          transition: `opacity ${motionDurationMid}, color ${motionDurationMid}`,
          "> *": {
            verticalAlign: "top",
            "&:not(:last-child)": {
              marginInlineEnd: marginXS
            }
          }
        },
        [`${componentCls}-clear`]: {
          position: "absolute",
          top: "50%",
          insetInlineEnd: 0,
          color: colorTextQuaternary,
          lineHeight: 1,
          transform: "translateY(-50%)",
          cursor: "pointer",
          opacity: 0,
          transition: `opacity ${motionDurationMid}, color ${motionDurationMid}`,
          "> *": {
            verticalAlign: "top"
          },
          "&:hover": {
            color: colorIcon
          }
        },
        "&:hover": {
          [`${componentCls}-clear`]: {
            opacity: 1
          },
          // Should use the following selector, but since `:has` has poor compatibility,
          // we use `:not(:last-child)` instead, which may cause some problems in some cases.
          // [`${componentCls}-suffix:has(+ ${componentCls}-clear)`]: {
          [`${componentCls}-suffix:not(:last-child)`]: {
            opacity: 0
          }
        },
        [`${componentCls}-separator`]: {
          position: "relative",
          display: "inline-block",
          width: "1em",
          height: fontSizeLG,
          color: colorTextQuaternary,
          fontSize: fontSizeLG,
          verticalAlign: "top",
          cursor: "default",
          [`${componentCls}-focused &`]: {
            color: colorIcon
          },
          [`${componentCls}-range-separator &`]: {
            [`${componentCls}-disabled &`]: {
              cursor: "not-allowed"
            }
          }
        },
        // ======================== Range =========================
        "&-range": {
          position: "relative",
          display: "inline-flex",
          // Active bar
          [`${componentCls}-active-bar`]: {
            bottom: token.calc(lineWidth).mul(-1).equal(),
            height: lineWidthBold,
            background: colorPrimary,
            opacity: 0,
            transition: `all ${motionDurationSlow} ease-out`,
            pointerEvents: "none"
          },
          [`&${componentCls}-focused`]: {
            [`${componentCls}-active-bar`]: {
              opacity: 1
            }
          },
          [`${componentCls}-range-separator`]: {
            alignItems: "center",
            padding: `0 ${unit(paddingXS)}`,
            lineHeight: 1
          }
        },
        // ======================== Clear =========================
        "&-range, &-multiple": {
          // Clear
          [`${componentCls}-clear`]: {
            insetInlineEnd: paddingInline
          },
          [`&${componentCls}-small`]: {
            [`${componentCls}-clear`]: {
              insetInlineEnd: paddingInlineSM
            }
          }
        },
        // ======================= Dropdown =======================
        "&-dropdown": Object.assign(Object.assign(Object.assign({}, resetComponent(token)), genPanelStyle(token)), {
          pointerEvents: "none",
          position: "absolute",
          // Fix incorrect position of picker popup
          // https://github.com/ant-design/ant-design/issues/35590
          top: -9999,
          left: {
            _skip_check_: true,
            value: -9999
          },
          zIndex: zIndexPopup,
          [`&${componentCls}-dropdown-hidden`]: {
            display: "none"
          },
          "&-rtl": {
            direction: "rtl"
          },
          [`&${componentCls}-dropdown-placement-bottomLeft,
            &${componentCls}-dropdown-placement-bottomRight`]: {
            [`${componentCls}-range-arrow`]: {
              top: 0,
              display: "block",
              transform: "translateY(-100%)"
            }
          },
          [`&${componentCls}-dropdown-placement-topLeft,
            &${componentCls}-dropdown-placement-topRight`]: {
            [`${componentCls}-range-arrow`]: {
              bottom: 0,
              display: "block",
              transform: "translateY(100%) rotate(180deg)"
            }
          },
          [`&${antCls}-slide-up-appear, &${antCls}-slide-up-enter`]: {
            [`${componentCls}-range-arrow${componentCls}-range-arrow`]: {
              transition: "none"
            }
          },
          [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-topRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-topRight`]: {
            animationName: slideDownIn
          },
          [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-bottomRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-bottomRight`]: {
            animationName: slideUpIn
          },
          // https://github.com/ant-design/ant-design/issues/48727
          [`&${antCls}-slide-up-leave ${componentCls}-panel-container`]: {
            pointerEvents: "none"
          },
          [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-topRight`]: {
            animationName: slideDownOut
          },
          [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-bottomRight`]: {
            animationName: slideUpOut
          },
          // Time picker with additional style
          [`${componentCls}-panel > ${componentCls}-time-panel`]: {
            paddingTop: paddingXXS
          },
          // ======================== Ranges ========================
          [`${componentCls}-range-wrapper`]: {
            display: "flex",
            position: "relative"
          },
          [`${componentCls}-range-arrow`]: Object.assign(Object.assign({
            position: "absolute",
            zIndex: 1,
            display: "none",
            paddingInline: token.calc(paddingInline).mul(1.5).equal(),
            boxSizing: "content-box",
            transition: `all ${motionDurationSlow} ease-out`
          }, genRoundedArrow(token, colorBgElevated, boxShadowPopoverArrow)), {
            "&:before": {
              insetInlineStart: token.calc(paddingInline).mul(1.5).equal()
            }
          }),
          [`${componentCls}-panel-container`]: {
            overflow: "hidden",
            verticalAlign: "top",
            background: colorBgElevated,
            borderRadius: borderRadiusLG,
            boxShadow: boxShadowSecondary,
            transition: `margin ${motionDurationSlow}`,
            display: "inline-block",
            pointerEvents: "auto",
            // ======================== Layout ========================
            [`${componentCls}-panel-layout`]: {
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "stretch"
            },
            // ======================== Preset ========================
            [`${componentCls}-presets`]: {
              display: "flex",
              flexDirection: "column",
              minWidth: presetsWidth,
              maxWidth: presetsMaxWidth,
              ul: {
                height: 0,
                flex: "auto",
                listStyle: "none",
                overflow: "auto",
                margin: 0,
                padding: paddingXS,
                borderInlineEnd: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
                li: Object.assign(Object.assign({}, textEllipsis), {
                  borderRadius: borderRadiusSM,
                  paddingInline: paddingXS,
                  paddingBlock: token.calc(controlHeightSM).sub(fontHeight).div(2).equal(),
                  cursor: "pointer",
                  transition: `all ${motionDurationSlow}`,
                  "+ li": {
                    marginTop: marginXS
                  },
                  "&:hover": {
                    background: cellHoverBg
                  }
                })
              }
            },
            // ======================== Panels ========================
            [`${componentCls}-panels`]: {
              display: "inline-flex",
              flexWrap: "nowrap",
              // [`${componentCls}-panel`]: {
              //   borderWidth: `0 0 ${unit(lineWidth)}`,
              // },
              "&:last-child": {
                [`${componentCls}-panel`]: {
                  borderWidth: 0
                }
              }
            },
            [`${componentCls}-panel`]: {
              verticalAlign: "top",
              background: "transparent",
              borderRadius: 0,
              borderWidth: 0,
              [`${componentCls}-content, table`]: {
                textAlign: "center"
              },
              "&-focused": {
                borderColor: colorBorder
              }
            }
          }
        }),
        "&-dropdown-range": {
          padding: `${unit(token.calc(sizePopupArrow).mul(2).div(3).equal())} 0`,
          "&-hidden": {
            display: "none"
          }
        },
        "&-rtl": {
          direction: "rtl",
          [`${componentCls}-separator`]: {
            transform: "scale(-1, 1)"
          },
          [`${componentCls}-footer`]: {
            "&-extra": {
              direction: "rtl"
            }
          }
        }
      })
    },
    // Follow code may reuse in other components
    initSlideMotion(token, "slide-up"),
    initSlideMotion(token, "slide-down"),
    initMoveMotion(token, "move-up"),
    initMoveMotion(token, "move-down")
  ];
};
const useStyle$a = genStyleHooks("DatePicker", (token) => {
  const pickerToken = merge$1(initInputToken(token), initPickerPanelToken(token), {
    inputPaddingHorizontalBase: token.calc(token.paddingSM).sub(1).equal(),
    multipleSelectItemHeight: token.multipleItemHeight,
    selectHeight: token.controlHeight
  });
  return [
    genPickerPanelStyle(pickerToken),
    genPickerStyle$1(pickerToken),
    genVariantsStyle(pickerToken),
    genPickerStatusStyle(pickerToken),
    genPickerMultipleStyle(pickerToken),
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    genCompactItemStyle(token, {
      focusElCls: `${token.componentCls}-focused`
    })
  ];
}, prepareComponentToken$8);
const genCalendarStyles = (token) => {
  const {
    calendarCls,
    componentCls,
    fullBg,
    fullPanelBg,
    itemActiveBg
  } = token;
  return {
    [calendarCls]: Object.assign(Object.assign(Object.assign({}, genPanelStyle(token)), resetComponent(token)), {
      background: fullBg,
      "&-rtl": {
        direction: "rtl"
      },
      [`${calendarCls}-header`]: {
        display: "flex",
        justifyContent: "flex-end",
        padding: `${unit(token.paddingSM)} 0`,
        [`${calendarCls}-year-select`]: {
          minWidth: token.yearControlWidth
        },
        [`${calendarCls}-month-select`]: {
          minWidth: token.monthControlWidth,
          marginInlineStart: token.marginXS
        },
        [`${calendarCls}-mode-switch`]: {
          marginInlineStart: token.marginXS
        }
      }
    }),
    [`${calendarCls} ${componentCls}-panel`]: {
      background: fullPanelBg,
      border: 0,
      borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
      borderRadius: 0,
      [`${componentCls}-month-panel, ${componentCls}-date-panel`]: {
        width: "auto"
      },
      [`${componentCls}-body`]: {
        padding: `${unit(token.paddingXS)} 0`
      },
      [`${componentCls}-content`]: {
        width: "100%"
      }
    },
    [`${calendarCls}-mini`]: {
      borderRadius: token.borderRadiusLG,
      [`${calendarCls}-header`]: {
        paddingInlineEnd: token.paddingXS,
        paddingInlineStart: token.paddingXS
      },
      [`${componentCls}-panel`]: {
        borderRadius: `0 0 ${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)}`
      },
      [`${componentCls}-content`]: {
        height: token.miniContentHeight,
        th: {
          height: "auto",
          padding: 0,
          lineHeight: unit(token.weekHeight)
        }
      },
      [`${componentCls}-cell::before`]: {
        pointerEvents: "none"
      }
    },
    [`${calendarCls}${calendarCls}-full`]: {
      [`${componentCls}-panel`]: {
        display: "block",
        width: "100%",
        textAlign: "end",
        background: fullBg,
        border: 0,
        [`${componentCls}-body`]: {
          "th, td": {
            padding: 0
          },
          th: {
            height: "auto",
            paddingInlineEnd: token.paddingSM,
            paddingBottom: token.paddingXXS,
            lineHeight: unit(token.weekHeight)
          }
        }
      },
      [`${componentCls}-cell-week ${componentCls}-cell-inner`]: {
        display: "block",
        borderRadius: 0,
        borderTop: `${unit(token.lineWidthBold)} ${token.lineType} ${token.colorSplit}`,
        width: "100%",
        height: token.calc(token.dateValueHeight).add(token.dateContentHeight).add(token.calc(token.paddingXS).div(2)).add(token.lineWidthBold).equal()
      },
      [`${componentCls}-cell`]: {
        "&::before": {
          display: "none"
        },
        "&:hover": {
          [`${calendarCls}-date`]: {
            background: token.controlItemBgHover
          }
        },
        [`${calendarCls}-date-today::before`]: {
          display: "none"
        },
        // >>> Selected
        [`&-in-view${componentCls}-cell-selected`]: {
          [`${calendarCls}-date, ${calendarCls}-date-today`]: {
            background: itemActiveBg
          }
        },
        "&-selected, &-selected:hover": {
          [`${calendarCls}-date, ${calendarCls}-date-today`]: {
            [`${calendarCls}-date-value`]: {
              color: token.colorPrimary
            }
          }
        }
      },
      [`${calendarCls}-date`]: {
        display: "block",
        width: "auto",
        height: "auto",
        margin: `0 ${unit(token.calc(token.marginXS).div(2).equal())}`,
        padding: `${unit(token.calc(token.paddingXS).div(2).equal())} ${unit(token.paddingXS)} 0`,
        border: 0,
        borderTop: `${unit(token.lineWidthBold)} ${token.lineType} ${token.colorSplit}`,
        borderRadius: 0,
        transition: `background ${token.motionDurationSlow}`,
        "&-value": {
          lineHeight: unit(token.dateValueHeight),
          transition: `color ${token.motionDurationSlow}`
        },
        "&-content": {
          position: "static",
          width: "auto",
          height: token.dateContentHeight,
          overflowY: "auto",
          color: token.colorText,
          lineHeight: token.lineHeight,
          textAlign: "start"
        },
        "&-today": {
          borderColor: token.colorPrimary,
          [`${calendarCls}-date-value`]: {
            color: token.colorText
          }
        }
      }
    },
    [`@media only screen and (max-width: ${unit(token.screenXS)}) `]: {
      [calendarCls]: {
        [`${calendarCls}-header`]: {
          display: "block",
          [`${calendarCls}-year-select`]: {
            width: "50%"
          },
          [`${calendarCls}-month-select`]: {
            width: `calc(50% - ${unit(token.paddingXS)})`
          },
          [`${calendarCls}-mode-switch`]: {
            width: "100%",
            marginTop: token.marginXS,
            marginInlineStart: 0,
            "> label": {
              width: "50%",
              textAlign: "center"
            }
          }
        }
      }
    }
  };
};
const prepareComponentToken$7 = (token) => Object.assign({
  fullBg: token.colorBgContainer,
  fullPanelBg: token.colorBgContainer,
  itemActiveBg: token.controlItemBgActive,
  yearControlWidth: 80,
  monthControlWidth: 70,
  miniContentHeight: 256
}, initPanelComponentToken(token));
const useStyle$9 = genStyleHooks("Calendar", (token) => {
  const calendarCls = `${token.componentCls}-calendar`;
  const calendarToken = merge$1(token, initPickerPanelToken(token), {
    calendarCls,
    pickerCellInnerCls: `${token.componentCls}-cell-inner`,
    dateValueHeight: token.controlHeightSM,
    weekHeight: token.calc(token.controlHeightSM).mul(0.75).equal(),
    dateContentHeight: token.calc(token.calc(token.fontHeightSM).add(token.marginXS)).mul(3).add(token.calc(token.lineWidth).mul(2)).equal()
  });
  return genCalendarStyles(calendarToken);
}, prepareComponentToken$7);
const isSameYear = (date1, date2, config) => {
  const {
    getYear: getYear2
  } = config;
  return date1 && date2 && getYear2(date1) === getYear2(date2);
};
const isSameMonth = (date1, date2, config) => {
  const {
    getMonth: getMonth2
  } = config;
  return isSameYear(date1, date2, config) && getMonth2(date1) === getMonth2(date2);
};
const isSameDate = (date1, date2, config) => {
  const {
    getDate: getDate2
  } = config;
  return isSameMonth(date1, date2, config) && getDate2(date1) === getDate2(date2);
};
const generateCalendar = (generateConfig2) => {
  const Calendar2 = (props) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      style,
      dateFullCellRender,
      dateCellRender,
      monthFullCellRender,
      monthCellRender,
      cellRender,
      fullCellRender,
      headerRender,
      value,
      defaultValue: defaultValue2,
      disabledDate,
      mode,
      validRange,
      fullscreen = true,
      showWeek,
      onChange: onChange2,
      onPanelChange,
      onSelect
    } = props;
    const {
      getPrefixCls,
      direction,
      className: contextClassName,
      style: contextStyle
    } = useComponentConfig("calendar");
    const prefixCls = getPrefixCls("picker", customizePrefixCls);
    const calendarPrefixCls = `${prefixCls}-calendar`;
    const [wrapCSSVar, hashId, cssVarCls] = useStyle$9(prefixCls, calendarPrefixCls);
    const today = generateConfig2.getNow();
    const [mergedValue, setMergedValue] = useMergedState(() => value || generateConfig2.getNow(), {
      defaultValue: defaultValue2,
      value
    });
    const [mergedMode, setMergedMode] = useMergedState("month", {
      value: mode
    });
    const panelMode = reactExports.useMemo(() => mergedMode === "year" ? "month" : "date", [mergedMode]);
    const mergedDisabledDate = reactExports.useCallback((date) => {
      const notInRange = validRange ? generateConfig2.isAfter(validRange[0], date) || generateConfig2.isAfter(date, validRange[1]) : false;
      return notInRange || !!(disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date));
    }, [disabledDate, validRange]);
    const triggerPanelChange = (date, newMode) => {
      onPanelChange === null || onPanelChange === void 0 ? void 0 : onPanelChange(date, newMode);
    };
    const triggerChange = (date) => {
      setMergedValue(date);
      if (!isSameDate(date, mergedValue, generateConfig2)) {
        if (panelMode === "date" && !isSameMonth(date, mergedValue, generateConfig2) || panelMode === "month" && !isSameYear(date, mergedValue, generateConfig2)) {
          triggerPanelChange(date, mergedMode);
        }
        onChange2 === null || onChange2 === void 0 ? void 0 : onChange2(date);
      }
    };
    const triggerModeChange = (newMode) => {
      setMergedMode(newMode);
      triggerPanelChange(mergedValue, newMode);
    };
    const onInternalSelect = (date, source) => {
      triggerChange(date);
      onSelect === null || onSelect === void 0 ? void 0 : onSelect(date, {
        source
      });
    };
    const dateRender = reactExports.useCallback((date, info) => {
      if (fullCellRender) {
        return fullCellRender(date, info);
      }
      if (dateFullCellRender) {
        return dateFullCellRender(date);
      }
      return /* @__PURE__ */ reactExports.createElement("div", {
        className: classNames(`${prefixCls}-cell-inner`, `${calendarPrefixCls}-date`, {
          [`${calendarPrefixCls}-date-today`]: isSameDate(today, date, generateConfig2)
        })
      }, /* @__PURE__ */ reactExports.createElement("div", {
        className: `${calendarPrefixCls}-date-value`
      }, String(generateConfig2.getDate(date)).padStart(2, "0")), /* @__PURE__ */ reactExports.createElement("div", {
        className: `${calendarPrefixCls}-date-content`
      }, typeof cellRender === "function" ? cellRender(date, info) : dateCellRender === null || dateCellRender === void 0 ? void 0 : dateCellRender(date)));
    }, [today, prefixCls, calendarPrefixCls, fullCellRender, dateFullCellRender, cellRender, dateCellRender]);
    const monthRender = reactExports.useCallback((date, info) => {
      if (fullCellRender) {
        return fullCellRender(date, info);
      }
      if (monthFullCellRender) {
        return monthFullCellRender(date);
      }
      const months = info.locale.shortMonths || generateConfig2.locale.getShortMonths(info.locale.locale);
      return /* @__PURE__ */ reactExports.createElement("div", {
        className: classNames(`${prefixCls}-cell-inner`, `${calendarPrefixCls}-date`, {
          [`${calendarPrefixCls}-date-today`]: isSameMonth(today, date, generateConfig2)
        })
      }, /* @__PURE__ */ reactExports.createElement("div", {
        className: `${calendarPrefixCls}-date-value`
      }, months[generateConfig2.getMonth(date)]), /* @__PURE__ */ reactExports.createElement("div", {
        className: `${calendarPrefixCls}-date-content`
      }, typeof cellRender === "function" ? cellRender(date, info) : monthCellRender === null || monthCellRender === void 0 ? void 0 : monthCellRender(date)));
    }, [today, prefixCls, calendarPrefixCls, fullCellRender, monthFullCellRender, cellRender, monthCellRender]);
    const [contextLocale] = useLocale$1("Calendar", locale);
    const locale$1 = Object.assign(Object.assign({}, contextLocale), props.locale);
    const mergedCellRender = (current, info) => {
      if (info.type === "date") {
        return dateRender(current, info);
      }
      if (info.type === "month") {
        return monthRender(current, Object.assign(Object.assign({}, info), {
          locale: locale$1 === null || locale$1 === void 0 ? void 0 : locale$1.lang
        }));
      }
    };
    return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", {
      className: classNames(calendarPrefixCls, {
        [`${calendarPrefixCls}-full`]: fullscreen,
        [`${calendarPrefixCls}-mini`]: !fullscreen,
        [`${calendarPrefixCls}-rtl`]: direction === "rtl"
      }, contextClassName, className, rootClassName, hashId, cssVarCls),
      style: Object.assign(Object.assign({}, contextStyle), style)
    }, headerRender ? headerRender({
      value: mergedValue,
      type: mergedMode,
      onChange: (nextDate) => {
        onInternalSelect(nextDate, "customize");
      },
      onTypeChange: triggerModeChange
    }) : /* @__PURE__ */ reactExports.createElement(CalendarHeader, {
      prefixCls: calendarPrefixCls,
      value: mergedValue,
      generateConfig: generateConfig2,
      mode: mergedMode,
      fullscreen,
      locale: locale$1 === null || locale$1 === void 0 ? void 0 : locale$1.lang,
      validRange,
      onChange: onInternalSelect,
      onModeChange: triggerModeChange
    }), /* @__PURE__ */ reactExports.createElement(RefPanelPicker, {
      value: mergedValue,
      prefixCls,
      locale: locale$1 === null || locale$1 === void 0 ? void 0 : locale$1.lang,
      generateConfig: generateConfig2,
      cellRender: mergedCellRender,
      onSelect: (nextDate) => {
        onInternalSelect(nextDate, panelMode);
      },
      mode: panelMode,
      picker: panelMode,
      disabledDate: mergedDisabledDate,
      hideHeader: true,
      showWeek
    })));
  };
  return Calendar2;
};
const Calendar = generateCalendar(generateConfig);
Calendar.generateCalendar = generateCalendar;
function throttle(delay, callback, options) {
  var _ref = options || {}, _ref$noTrailing = _ref.noTrailing, noTrailing = _ref$noTrailing === void 0 ? false : _ref$noTrailing, _ref$noLeading = _ref.noLeading, noLeading = _ref$noLeading === void 0 ? false : _ref$noLeading, _ref$debounceMode = _ref.debounceMode, debounceMode = _ref$debounceMode === void 0 ? void 0 : _ref$debounceMode;
  var timeoutID;
  var cancelled = false;
  var lastExec = 0;
  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  }
  function cancel(options2) {
    var _ref2 = options2 || {}, _ref2$upcomingOnly = _ref2.upcomingOnly, upcomingOnly = _ref2$upcomingOnly === void 0 ? false : _ref2$upcomingOnly;
    clearExistingTimeout();
    cancelled = !upcomingOnly;
  }
  function wrapper() {
    for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
      arguments_[_key] = arguments[_key];
    }
    var self = this;
    var elapsed = Date.now() - lastExec;
    if (cancelled) {
      return;
    }
    function exec() {
      lastExec = Date.now();
      callback.apply(self, arguments_);
    }
    function clear() {
      timeoutID = void 0;
    }
    if (!noLeading && debounceMode && !timeoutID) {
      exec();
    }
    clearExistingTimeout();
    if (debounceMode === void 0 && elapsed > delay) {
      if (noLeading) {
        lastExec = Date.now();
        if (!noTrailing) {
          timeoutID = setTimeout(debounceMode ? clear : exec, delay);
        }
      } else {
        exec();
      }
    } else if (noTrailing !== true) {
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === void 0 ? delay - elapsed : delay);
    }
  }
  wrapper.cancel = cancel;
  return wrapper;
}
function debounce(delay, callback, options) {
  var _ref = {}, _ref$atBegin = _ref.atBegin, atBegin = _ref$atBegin === void 0 ? false : _ref$atBegin;
  return throttle(delay, callback, {
    debounceMode: atBegin !== false
  });
}
const genCheckboxStyle = (token) => {
  const {
    checkboxCls
  } = token;
  const wrapperCls = `${checkboxCls}-wrapper`;
  return [
    // ===================== Basic =====================
    {
      // Group
      [`${checkboxCls}-group`]: Object.assign(Object.assign({}, resetComponent(token)), {
        display: "inline-flex",
        flexWrap: "wrap",
        columnGap: token.marginXS,
        // Group > Grid
        [`> ${token.antCls}-row`]: {
          flex: 1
        }
      }),
      // Wrapper
      [wrapperCls]: Object.assign(Object.assign({}, resetComponent(token)), {
        display: "inline-flex",
        alignItems: "baseline",
        cursor: "pointer",
        // Fix checkbox & radio in flex align #30260
        "&:after": {
          display: "inline-block",
          width: 0,
          overflow: "hidden",
          content: "'\\a0'"
        },
        // Checkbox near checkbox
        [`& + ${wrapperCls}`]: {
          marginInlineStart: 0
        },
        [`&${wrapperCls}-in-form-item`]: {
          'input[type="checkbox"]': {
            width: 14,
            // FIXME: magic
            height: 14
            // FIXME: magic
          }
        }
      }),
      // Wrapper > Checkbox
      [checkboxCls]: Object.assign(Object.assign({}, resetComponent(token)), {
        position: "relative",
        whiteSpace: "nowrap",
        lineHeight: 1,
        cursor: "pointer",
        borderRadius: token.borderRadiusSM,
        // To make alignment right when `controlHeight` is changed
        // Ref: https://github.com/ant-design/ant-design/issues/41564
        alignSelf: "center",
        // Wrapper > Checkbox > input
        [`${checkboxCls}-input`]: {
          position: "absolute",
          // Since baseline align will get additional space offset,
          // we need to move input to top to make it align with text.
          // Ref: https://github.com/ant-design/ant-design/issues/38926#issuecomment-1486137799
          inset: 0,
          zIndex: 1,
          cursor: "pointer",
          opacity: 0,
          margin: 0,
          [`&:focus-visible + ${checkboxCls}-inner`]: genFocusOutline(token)
        },
        // Wrapper > Checkbox > inner
        [`${checkboxCls}-inner`]: {
          boxSizing: "border-box",
          display: "block",
          width: token.checkboxSize,
          height: token.checkboxSize,
          direction: "ltr",
          backgroundColor: token.colorBgContainer,
          border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
          borderRadius: token.borderRadiusSM,
          borderCollapse: "separate",
          transition: `all ${token.motionDurationSlow}`,
          "&:after": {
            boxSizing: "border-box",
            position: "absolute",
            top: "50%",
            insetInlineStart: "25%",
            display: "table",
            width: token.calc(token.checkboxSize).div(14).mul(5).equal(),
            height: token.calc(token.checkboxSize).div(14).mul(8).equal(),
            border: `${unit(token.lineWidthBold)} solid ${token.colorWhite}`,
            borderTop: 0,
            borderInlineStart: 0,
            transform: "rotate(45deg) scale(0) translate(-50%,-50%)",
            opacity: 0,
            content: '""',
            transition: `all ${token.motionDurationFast} ${token.motionEaseInBack}, opacity ${token.motionDurationFast}`
          }
        },
        // Wrapper > Checkbox + Text
        "& + span": {
          paddingInlineStart: token.paddingXS,
          paddingInlineEnd: token.paddingXS
        }
      })
    },
    // ===================== Hover =====================
    {
      // Wrapper & Wrapper > Checkbox
      [`
        ${wrapperCls}:not(${wrapperCls}-disabled),
        ${checkboxCls}:not(${checkboxCls}-disabled)
      `]: {
        [`&:hover ${checkboxCls}-inner`]: {
          borderColor: token.colorPrimary
        }
      },
      [`${wrapperCls}:not(${wrapperCls}-disabled)`]: {
        [`&:hover ${checkboxCls}-checked:not(${checkboxCls}-disabled) ${checkboxCls}-inner`]: {
          backgroundColor: token.colorPrimaryHover,
          borderColor: "transparent"
        },
        [`&:hover ${checkboxCls}-checked:not(${checkboxCls}-disabled):after`]: {
          borderColor: token.colorPrimaryHover
        }
      }
    },
    // ==================== Checked ====================
    {
      // Wrapper > Checkbox
      [`${checkboxCls}-checked`]: {
        [`${checkboxCls}-inner`]: {
          backgroundColor: token.colorPrimary,
          borderColor: token.colorPrimary,
          "&:after": {
            opacity: 1,
            transform: "rotate(45deg) scale(1) translate(-50%,-50%)",
            transition: `all ${token.motionDurationMid} ${token.motionEaseOutBack} ${token.motionDurationFast}`
          }
        }
      },
      [`
        ${wrapperCls}-checked:not(${wrapperCls}-disabled),
        ${checkboxCls}-checked:not(${checkboxCls}-disabled)
      `]: {
        [`&:hover ${checkboxCls}-inner`]: {
          backgroundColor: token.colorPrimaryHover,
          borderColor: "transparent"
        }
      }
    },
    // ================= Indeterminate =================
    {
      [checkboxCls]: {
        "&-indeterminate": {
          "&": {
            // Wrapper > Checkbox > inner
            [`${checkboxCls}-inner`]: {
              backgroundColor: `${token.colorBgContainer}`,
              borderColor: `${token.colorBorder}`,
              "&:after": {
                top: "50%",
                insetInlineStart: "50%",
                width: token.calc(token.fontSizeLG).div(2).equal(),
                height: token.calc(token.fontSizeLG).div(2).equal(),
                backgroundColor: token.colorPrimary,
                border: 0,
                transform: "translate(-50%, -50%) scale(1)",
                opacity: 1,
                content: '""'
              }
            },
            // https://github.com/ant-design/ant-design/issues/50074
            [`&:hover ${checkboxCls}-inner`]: {
              backgroundColor: `${token.colorBgContainer}`,
              borderColor: `${token.colorPrimary}`
            }
          }
        }
      }
    },
    // ==================== Disable ====================
    {
      // Wrapper
      [`${wrapperCls}-disabled`]: {
        cursor: "not-allowed"
      },
      // Wrapper > Checkbox
      [`${checkboxCls}-disabled`]: {
        // Wrapper > Checkbox > input
        [`&, ${checkboxCls}-input`]: {
          cursor: "not-allowed",
          // Disabled for native input to enable Tooltip event handler
          // ref: https://github.com/ant-design/ant-design/issues/39822#issuecomment-1365075901
          pointerEvents: "none"
        },
        // Wrapper > Checkbox > inner
        [`${checkboxCls}-inner`]: {
          background: token.colorBgContainerDisabled,
          borderColor: token.colorBorder,
          "&:after": {
            borderColor: token.colorTextDisabled
          }
        },
        "&:after": {
          display: "none"
        },
        "& + span": {
          color: token.colorTextDisabled
        },
        [`&${checkboxCls}-indeterminate ${checkboxCls}-inner::after`]: {
          background: token.colorTextDisabled
        }
      }
    }
  ];
};
function getStyle(prefixCls, token) {
  const checkboxToken = merge$1(token, {
    checkboxCls: `.${prefixCls}`,
    checkboxSize: token.controlInteractiveSize
  });
  return genCheckboxStyle(checkboxToken);
}
const useStyle$8 = genStyleHooks("Checkbox", (token, {
  prefixCls
}) => [getStyle(prefixCls, token)]);
const GroupContext = /* @__PURE__ */ React.createContext(null);
var __rest$g = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalCheckbox = (props, ref) => {
  var _a;
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children,
    indeterminate = false,
    style,
    onMouseEnter,
    onMouseLeave,
    skipGroup = false,
    disabled
  } = props, restProps = __rest$g(props, ["prefixCls", "className", "rootClassName", "children", "indeterminate", "style", "onMouseEnter", "onMouseLeave", "skipGroup", "disabled"]);
  const {
    getPrefixCls,
    direction,
    checkbox
  } = reactExports.useContext(ConfigContext);
  const checkboxGroup = reactExports.useContext(GroupContext);
  const {
    isFormItemInput
  } = reactExports.useContext(FormItemInputContext);
  const contextDisabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = (_a = (checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.disabled) || disabled) !== null && _a !== void 0 ? _a : contextDisabled;
  const prevValue = reactExports.useRef(restProps.value);
  const checkboxRef = reactExports.useRef(null);
  const mergedRef = composeRef(ref, checkboxRef);
  reactExports.useEffect(() => {
    checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.registerValue(restProps.value);
  }, []);
  reactExports.useEffect(() => {
    if (skipGroup) {
      return;
    }
    if (restProps.value !== prevValue.current) {
      checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.cancelValue(prevValue.current);
      checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.registerValue(restProps.value);
      prevValue.current = restProps.value;
    }
    return () => checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.cancelValue(restProps.value);
  }, [restProps.value]);
  reactExports.useEffect(() => {
    var _a2;
    if ((_a2 = checkboxRef.current) === null || _a2 === void 0 ? void 0 : _a2.input) {
      checkboxRef.current.input.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  const prefixCls = getPrefixCls("checkbox", customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$8(prefixCls, rootCls);
  const checkboxProps = Object.assign({}, restProps);
  if (checkboxGroup && !skipGroup) {
    checkboxProps.onChange = (...args) => {
      if (restProps.onChange) {
        restProps.onChange.apply(restProps, args);
      }
      if (checkboxGroup.toggleOption) {
        checkboxGroup.toggleOption({
          label: children,
          value: restProps.value
        });
      }
    };
    checkboxProps.name = checkboxGroup.name;
    checkboxProps.checked = checkboxGroup.value.includes(restProps.value);
  }
  const classString = classNames(`${prefixCls}-wrapper`, {
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-wrapper-checked`]: checkboxProps.checked,
    [`${prefixCls}-wrapper-disabled`]: mergedDisabled,
    [`${prefixCls}-wrapper-in-form-item`]: isFormItemInput
  }, checkbox === null || checkbox === void 0 ? void 0 : checkbox.className, className, rootClassName, cssVarCls, rootCls, hashId);
  const checkboxClass = classNames({
    [`${prefixCls}-indeterminate`]: indeterminate
  }, TARGET_CLS, hashId);
  const [onLabelClick, onInputClick] = useBubbleLock(checkboxProps.onClick);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(Wave, {
    component: "Checkbox",
    disabled: mergedDisabled
  }, /* @__PURE__ */ reactExports.createElement("label", {
    className: classString,
    style: Object.assign(Object.assign({}, checkbox === null || checkbox === void 0 ? void 0 : checkbox.style), style),
    onMouseEnter,
    onMouseLeave,
    onClick: onLabelClick
  }, /* @__PURE__ */ reactExports.createElement(Checkbox$2, Object.assign({}, checkboxProps, {
    onClick: onInputClick,
    prefixCls,
    className: checkboxClass,
    disabled: mergedDisabled,
    ref: mergedRef
  })), children !== void 0 && children !== null && /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-label`
  }, children))));
};
const Checkbox$1 = /* @__PURE__ */ reactExports.forwardRef(InternalCheckbox);
var __rest$f = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const CheckboxGroup = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    defaultValue: defaultValue2,
    children,
    options = [],
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    onChange: onChange2
  } = props, restProps = __rest$f(props, ["defaultValue", "children", "options", "prefixCls", "className", "rootClassName", "style", "onChange"]);
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const [value, setValue] = reactExports.useState(restProps.value || defaultValue2 || []);
  const [registeredValues, setRegisteredValues] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if ("value" in restProps) {
      setValue(restProps.value || []);
    }
  }, [restProps.value]);
  const memoizedOptions = reactExports.useMemo(() => options.map((option) => {
    if (typeof option === "string" || typeof option === "number") {
      return {
        label: option,
        value: option
      };
    }
    return option;
  }), [options]);
  const cancelValue = (val) => {
    setRegisteredValues((prevValues) => prevValues.filter((v) => v !== val));
  };
  const registerValue = (val) => {
    setRegisteredValues((prevValues) => [].concat(_toConsumableArray(prevValues), [val]));
  };
  const toggleOption = (option) => {
    const optionIndex = value.indexOf(option.value);
    const newValue = _toConsumableArray(value);
    if (optionIndex === -1) {
      newValue.push(option.value);
    } else {
      newValue.splice(optionIndex, 1);
    }
    if (!("value" in restProps)) {
      setValue(newValue);
    }
    onChange2 === null || onChange2 === void 0 ? void 0 : onChange2(newValue.filter((val) => registeredValues.includes(val)).sort((a, b) => {
      const indexA = memoizedOptions.findIndex((opt) => opt.value === a);
      const indexB = memoizedOptions.findIndex((opt) => opt.value === b);
      return indexA - indexB;
    }));
  };
  const prefixCls = getPrefixCls("checkbox", customizePrefixCls);
  const groupPrefixCls = `${prefixCls}-group`;
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$8(prefixCls, rootCls);
  const domProps = omit(restProps, ["value", "disabled"]);
  const childrenNode = options.length ? memoizedOptions.map((option) => /* @__PURE__ */ reactExports.createElement(Checkbox$1, {
    prefixCls,
    key: option.value.toString(),
    disabled: "disabled" in option ? option.disabled : restProps.disabled,
    value: option.value,
    checked: value.includes(option.value),
    onChange: option.onChange,
    className: classNames(`${groupPrefixCls}-item`, option.className),
    style: option.style,
    title: option.title,
    id: option.id,
    required: option.required
  }, option.label)) : children;
  const memoizedContext = reactExports.useMemo(() => ({
    toggleOption,
    value,
    disabled: restProps.disabled,
    name: restProps.name,
    // https://github.com/ant-design/ant-design/issues/16376
    registerValue,
    cancelValue
  }), [toggleOption, value, restProps.disabled, restProps.name, registerValue, cancelValue]);
  const classString = classNames(groupPrefixCls, {
    [`${groupPrefixCls}-rtl`]: direction === "rtl"
  }, className, rootClassName, cssVarCls, rootCls, hashId);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", Object.assign({
    className: classString,
    style
  }, domProps, {
    ref
  }), /* @__PURE__ */ reactExports.createElement(GroupContext.Provider, {
    value: memoizedContext
  }, childrenNode)));
});
const Checkbox = Checkbox$1;
Checkbox.Group = CheckboxGroup;
Checkbox.__ANT_CHECKBOX = true;
var calcThumbStyle = function calcThumbStyle2(targetElement, vertical) {
  if (!targetElement) return null;
  var style = {
    left: targetElement.offsetLeft,
    right: targetElement.parentElement.clientWidth - targetElement.clientWidth - targetElement.offsetLeft,
    width: targetElement.clientWidth,
    top: targetElement.offsetTop,
    bottom: targetElement.parentElement.clientHeight - targetElement.clientHeight - targetElement.offsetTop,
    height: targetElement.clientHeight
  };
  if (vertical) {
    return {
      left: 0,
      right: 0,
      width: 0,
      top: style.top,
      bottom: style.bottom,
      height: style.height
    };
  }
  return {
    left: style.left,
    right: style.right,
    width: style.width,
    top: 0,
    bottom: 0,
    height: 0
  };
};
var toPX = function toPX2(value) {
  return value !== void 0 ? "".concat(value, "px") : void 0;
};
function MotionThumb(props) {
  var prefixCls = props.prefixCls, containerRef = props.containerRef, value = props.value, getValueIndex = props.getValueIndex, motionName = props.motionName, onMotionStart = props.onMotionStart, onMotionEnd = props.onMotionEnd, direction = props.direction, _props$vertical = props.vertical, vertical = _props$vertical === void 0 ? false : _props$vertical;
  var thumbRef = reactExports.useRef(null);
  var _React$useState = reactExports.useState(value), _React$useState2 = _slicedToArray(_React$useState, 2), prevValue = _React$useState2[0], setPrevValue = _React$useState2[1];
  var findValueElement = function findValueElement2(val) {
    var _containerRef$current;
    var index2 = getValueIndex(val);
    var ele = (_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.querySelectorAll(".".concat(prefixCls, "-item"))[index2];
    return (ele === null || ele === void 0 ? void 0 : ele.offsetParent) && ele;
  };
  var _React$useState3 = reactExports.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), prevStyle = _React$useState4[0], setPrevStyle = _React$useState4[1];
  var _React$useState5 = reactExports.useState(null), _React$useState6 = _slicedToArray(_React$useState5, 2), nextStyle = _React$useState6[0], setNextStyle = _React$useState6[1];
  useLayoutEffect(function() {
    if (prevValue !== value) {
      var prev = findValueElement(prevValue);
      var next = findValueElement(value);
      var calcPrevStyle = calcThumbStyle(prev, vertical);
      var calcNextStyle = calcThumbStyle(next, vertical);
      setPrevValue(value);
      setPrevStyle(calcPrevStyle);
      setNextStyle(calcNextStyle);
      if (prev && next) {
        onMotionStart();
      } else {
        onMotionEnd();
      }
    }
  }, [value]);
  var thumbStart = reactExports.useMemo(function() {
    if (vertical) {
      var _prevStyle$top;
      return toPX((_prevStyle$top = prevStyle === null || prevStyle === void 0 ? void 0 : prevStyle.top) !== null && _prevStyle$top !== void 0 ? _prevStyle$top : 0);
    }
    if (direction === "rtl") {
      return toPX(-(prevStyle === null || prevStyle === void 0 ? void 0 : prevStyle.right));
    }
    return toPX(prevStyle === null || prevStyle === void 0 ? void 0 : prevStyle.left);
  }, [vertical, direction, prevStyle]);
  var thumbActive = reactExports.useMemo(function() {
    if (vertical) {
      var _nextStyle$top;
      return toPX((_nextStyle$top = nextStyle === null || nextStyle === void 0 ? void 0 : nextStyle.top) !== null && _nextStyle$top !== void 0 ? _nextStyle$top : 0);
    }
    if (direction === "rtl") {
      return toPX(-(nextStyle === null || nextStyle === void 0 ? void 0 : nextStyle.right));
    }
    return toPX(nextStyle === null || nextStyle === void 0 ? void 0 : nextStyle.left);
  }, [vertical, direction, nextStyle]);
  var onAppearStart = function onAppearStart2() {
    if (vertical) {
      return {
        transform: "translateY(var(--thumb-start-top))",
        height: "var(--thumb-start-height)"
      };
    }
    return {
      transform: "translateX(var(--thumb-start-left))",
      width: "var(--thumb-start-width)"
    };
  };
  var onAppearActive = function onAppearActive2() {
    if (vertical) {
      return {
        transform: "translateY(var(--thumb-active-top))",
        height: "var(--thumb-active-height)"
      };
    }
    return {
      transform: "translateX(var(--thumb-active-left))",
      width: "var(--thumb-active-width)"
    };
  };
  var onVisibleChanged = function onVisibleChanged2() {
    setPrevStyle(null);
    setNextStyle(null);
    onMotionEnd();
  };
  if (!prevStyle || !nextStyle) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(CSSMotion, {
    visible: true,
    motionName,
    motionAppear: true,
    onAppearStart,
    onAppearActive,
    onVisibleChanged
  }, function(_ref, ref) {
    var motionClassName = _ref.className, motionStyle = _ref.style;
    var mergedStyle = _objectSpread2(_objectSpread2({}, motionStyle), {}, {
      "--thumb-start-left": thumbStart,
      "--thumb-start-width": toPX(prevStyle === null || prevStyle === void 0 ? void 0 : prevStyle.width),
      "--thumb-active-left": thumbActive,
      "--thumb-active-width": toPX(nextStyle === null || nextStyle === void 0 ? void 0 : nextStyle.width),
      "--thumb-start-top": thumbStart,
      "--thumb-start-height": toPX(prevStyle === null || prevStyle === void 0 ? void 0 : prevStyle.height),
      "--thumb-active-top": thumbActive,
      "--thumb-active-height": toPX(nextStyle === null || nextStyle === void 0 ? void 0 : nextStyle.height)
    });
    var motionProps = {
      ref: composeRef(thumbRef, ref),
      style: mergedStyle,
      className: classNames("".concat(prefixCls, "-thumb"), motionClassName)
    };
    return /* @__PURE__ */ reactExports.createElement("div", motionProps);
  });
}
var _excluded$5 = ["prefixCls", "direction", "vertical", "options", "disabled", "defaultValue", "value", "name", "onChange", "className", "motionName"];
function getValidTitle(option) {
  if (typeof option.title !== "undefined") {
    return option.title;
  }
  if (_typeof(option.label) !== "object") {
    var _option$label;
    return (_option$label = option.label) === null || _option$label === void 0 ? void 0 : _option$label.toString();
  }
}
function normalizeOptions(options) {
  return options.map(function(option) {
    if (_typeof(option) === "object" && option !== null) {
      var validTitle = getValidTitle(option);
      return _objectSpread2(_objectSpread2({}, option), {}, {
        title: validTitle
      });
    }
    return {
      label: option === null || option === void 0 ? void 0 : option.toString(),
      title: option === null || option === void 0 ? void 0 : option.toString(),
      value: option
    };
  });
}
var InternalSegmentedOption = function InternalSegmentedOption2(_ref) {
  var prefixCls = _ref.prefixCls, className = _ref.className, disabled = _ref.disabled, checked = _ref.checked, label = _ref.label, title = _ref.title, value = _ref.value, name = _ref.name, onChange2 = _ref.onChange, onFocus = _ref.onFocus, onBlur = _ref.onBlur, onKeyDown = _ref.onKeyDown, onKeyUp = _ref.onKeyUp, onMouseDown = _ref.onMouseDown;
  var handleChange = function handleChange2(event) {
    if (disabled) {
      return;
    }
    onChange2(event, value);
  };
  return /* @__PURE__ */ reactExports.createElement("label", {
    className: classNames(className, _defineProperty({}, "".concat(prefixCls, "-item-disabled"), disabled)),
    onMouseDown
  }, /* @__PURE__ */ reactExports.createElement("input", {
    name,
    className: "".concat(prefixCls, "-item-input"),
    type: "radio",
    disabled,
    checked,
    onChange: handleChange,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp
  }), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-item-label"),
    title
  }, label));
};
var Segmented$1 = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var _segmentedOptions$;
  var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-segmented" : _props$prefixCls, direction = props.direction, vertical = props.vertical, _props$options = props.options, options = _props$options === void 0 ? [] : _props$options, disabled = props.disabled, defaultValue2 = props.defaultValue, value = props.value, name = props.name, onChange2 = props.onChange, _props$className = props.className, className = _props$className === void 0 ? "" : _props$className, _props$motionName = props.motionName, motionName = _props$motionName === void 0 ? "thumb-motion" : _props$motionName, restProps = _objectWithoutProperties(props, _excluded$5);
  var containerRef = reactExports.useRef(null);
  var mergedRef = reactExports.useMemo(function() {
    return composeRef(containerRef, ref);
  }, [containerRef, ref]);
  var segmentedOptions = reactExports.useMemo(function() {
    return normalizeOptions(options);
  }, [options]);
  var _useMergedState = useMergedState((_segmentedOptions$ = segmentedOptions[0]) === null || _segmentedOptions$ === void 0 ? void 0 : _segmentedOptions$.value, {
    value,
    defaultValue: defaultValue2
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), rawValue = _useMergedState2[0], setRawValue = _useMergedState2[1];
  var _React$useState = reactExports.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), thumbShow = _React$useState2[0], setThumbShow = _React$useState2[1];
  var handleChange = function handleChange2(event, val) {
    setRawValue(val);
    onChange2 === null || onChange2 === void 0 || onChange2(val);
  };
  var divProps = omit(restProps, ["children"]);
  var _React$useState3 = reactExports.useState(false), _React$useState4 = _slicedToArray(_React$useState3, 2), isKeyboard = _React$useState4[0], setIsKeyboard = _React$useState4[1];
  var _React$useState5 = reactExports.useState(false), _React$useState6 = _slicedToArray(_React$useState5, 2), isFocused = _React$useState6[0], setIsFocused = _React$useState6[1];
  var handleFocus = function handleFocus2() {
    setIsFocused(true);
  };
  var handleBlur = function handleBlur2() {
    setIsFocused(false);
  };
  var handleMouseDown = function handleMouseDown2() {
    setIsKeyboard(false);
  };
  var handleKeyUp = function handleKeyUp2(event) {
    if (event.key === "Tab") {
      setIsKeyboard(true);
    }
  };
  var onOffset = function onOffset2(offset) {
    var currentIndex = segmentedOptions.findIndex(function(option) {
      return option.value === rawValue;
    });
    var total = segmentedOptions.length;
    var nextIndex = (currentIndex + offset + total) % total;
    var nextOption = segmentedOptions[nextIndex];
    if (nextOption) {
      setRawValue(nextOption.value);
      onChange2 === null || onChange2 === void 0 || onChange2(nextOption.value);
    }
  };
  var handleKeyDown = function handleKeyDown2(event) {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        onOffset(-1);
        break;
      case "ArrowRight":
      case "ArrowDown":
        onOffset(1);
        break;
    }
  };
  return /* @__PURE__ */ reactExports.createElement("div", _extends$2({
    role: "radiogroup",
    "aria-label": "segmented control",
    tabIndex: disabled ? void 0 : 0,
    "aria-orientation": vertical ? "vertical" : "horizontal"
  }, divProps, {
    className: classNames(prefixCls, _defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-rtl"), direction === "rtl"), "".concat(prefixCls, "-disabled"), disabled), "".concat(prefixCls, "-vertical"), vertical), className),
    ref: mergedRef
  }), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-group")
  }, /* @__PURE__ */ reactExports.createElement(MotionThumb, {
    vertical,
    prefixCls,
    value: rawValue,
    containerRef,
    motionName: "".concat(prefixCls, "-").concat(motionName),
    direction,
    getValueIndex: function getValueIndex(val) {
      return segmentedOptions.findIndex(function(n) {
        return n.value === val;
      });
    },
    onMotionStart: function onMotionStart() {
      setThumbShow(true);
    },
    onMotionEnd: function onMotionEnd() {
      setThumbShow(false);
    }
  }), segmentedOptions.map(function(segmentedOption) {
    return /* @__PURE__ */ reactExports.createElement(InternalSegmentedOption, _extends$2({}, segmentedOption, {
      name,
      key: segmentedOption.value,
      prefixCls,
      className: classNames(segmentedOption.className, "".concat(prefixCls, "-item"), _defineProperty(_defineProperty({}, "".concat(prefixCls, "-item-selected"), segmentedOption.value === rawValue && !thumbShow), "".concat(prefixCls, "-item-focused"), isFocused && isKeyboard && segmentedOption.value === rawValue)),
      checked: segmentedOption.value === rawValue,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      onMouseDown: handleMouseDown,
      disabled: !!disabled || !!segmentedOption.disabled
    }));
  })));
});
var TypedSegmented = Segmented$1;
function getItemDisabledStyle(cls, token) {
  return {
    [`${cls}, ${cls}:hover, ${cls}:focus`]: {
      color: token.colorTextDisabled,
      cursor: "not-allowed"
    }
  };
}
function getItemSelectedStyle(token) {
  return {
    background: token.itemSelectedBg,
    boxShadow: token.boxShadowTertiary
  };
}
const segmentedTextEllipsisCss = Object.assign({
  overflow: "hidden"
}, textEllipsis);
const genSegmentedStyle = (token) => {
  const {
    componentCls
  } = token;
  const labelHeight = token.calc(token.controlHeight).sub(token.calc(token.trackPadding).mul(2)).equal();
  const labelHeightLG = token.calc(token.controlHeightLG).sub(token.calc(token.trackPadding).mul(2)).equal();
  const labelHeightSM = token.calc(token.controlHeightSM).sub(token.calc(token.trackPadding).mul(2)).equal();
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
      display: "inline-block",
      padding: token.trackPadding,
      color: token.itemColor,
      background: token.trackBg,
      borderRadius: token.borderRadius,
      transition: `all ${token.motionDurationMid}`
    }), genFocusStyle(token)), {
      [`${componentCls}-group`]: {
        position: "relative",
        display: "flex",
        alignItems: "stretch",
        justifyItems: "flex-start",
        flexDirection: "row",
        width: "100%"
      },
      // RTL styles
      [`&${componentCls}-rtl`]: {
        direction: "rtl"
      },
      [`&${componentCls}-vertical`]: {
        [`${componentCls}-group`]: {
          flexDirection: "column"
        },
        [`${componentCls}-thumb`]: {
          width: "100%",
          height: 0,
          padding: `0 ${unit(token.paddingXXS)}`
        }
      },
      // block styles
      [`&${componentCls}-block`]: {
        display: "flex"
      },
      [`&${componentCls}-block ${componentCls}-item`]: {
        flex: 1,
        minWidth: 0
      },
      // item styles
      [`${componentCls}-item`]: {
        position: "relative",
        textAlign: "center",
        cursor: "pointer",
        transition: `color ${token.motionDurationMid}`,
        borderRadius: token.borderRadiusSM,
        // Fix Safari render bug
        // https://github.com/ant-design/ant-design/issues/45250
        transform: "translateZ(0)",
        "&-selected": Object.assign(Object.assign({}, getItemSelectedStyle(token)), {
          color: token.itemSelectedColor
        }),
        "&-focused": genFocusOutline(token),
        "&::after": {
          content: '""',
          position: "absolute",
          zIndex: -1,
          width: "100%",
          height: "100%",
          top: 0,
          insetInlineStart: 0,
          borderRadius: "inherit",
          opacity: 0,
          transition: `opacity ${token.motionDurationMid}, background-color ${token.motionDurationMid}`,
          // This is mandatory to make it not clickable or hoverable
          // Ref: https://github.com/ant-design/ant-design/issues/40888
          pointerEvents: "none"
        },
        [`&:not(${componentCls}-item-selected):not(${componentCls}-item-disabled)`]: {
          "&:hover, &:active": {
            color: token.itemHoverColor
          },
          "&:hover::after": {
            opacity: 1,
            backgroundColor: token.itemHoverBg
          },
          "&:active::after": {
            opacity: 1,
            backgroundColor: token.itemActiveBg
          }
        },
        "&-label": Object.assign({
          minHeight: labelHeight,
          lineHeight: unit(labelHeight),
          padding: `0 ${unit(token.segmentedPaddingHorizontal)}`
        }, segmentedTextEllipsisCss),
        // syntactic sugar to add `icon` for Segmented Item
        "&-icon + *": {
          marginInlineStart: token.calc(token.marginSM).div(2).equal()
        },
        "&-input": {
          position: "absolute",
          insetBlockStart: 0,
          insetInlineStart: 0,
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: "none"
        }
      },
      // thumb styles
      [`${componentCls}-thumb`]: Object.assign(Object.assign({}, getItemSelectedStyle(token)), {
        position: "absolute",
        insetBlockStart: 0,
        insetInlineStart: 0,
        width: 0,
        height: "100%",
        padding: `${unit(token.paddingXXS)} 0`,
        borderRadius: token.borderRadiusSM,
        [`& ~ ${componentCls}-item:not(${componentCls}-item-selected):not(${componentCls}-item-disabled)::after`]: {
          backgroundColor: "transparent"
        }
      }),
      // size styles
      [`&${componentCls}-lg`]: {
        borderRadius: token.borderRadiusLG,
        [`${componentCls}-item-label`]: {
          minHeight: labelHeightLG,
          lineHeight: unit(labelHeightLG),
          padding: `0 ${unit(token.segmentedPaddingHorizontal)}`,
          fontSize: token.fontSizeLG
        },
        [`${componentCls}-item, ${componentCls}-thumb`]: {
          borderRadius: token.borderRadius
        }
      },
      [`&${componentCls}-sm`]: {
        borderRadius: token.borderRadiusSM,
        [`${componentCls}-item-label`]: {
          minHeight: labelHeightSM,
          lineHeight: unit(labelHeightSM),
          padding: `0 ${unit(token.segmentedPaddingHorizontalSM)}`
        },
        [`${componentCls}-item, ${componentCls}-thumb`]: {
          borderRadius: token.borderRadiusXS
        }
      }
    }), getItemDisabledStyle(`&-disabled ${componentCls}-item`, token)), getItemDisabledStyle(`${componentCls}-item-disabled`, token)), {
      // transition effect when `appear-active`
      [`${componentCls}-thumb-motion-appear-active`]: {
        transition: `transform ${token.motionDurationSlow} ${token.motionEaseInOut}, width ${token.motionDurationSlow} ${token.motionEaseInOut}`,
        willChange: "transform, width"
      },
      [`&${componentCls}-shape-round`]: {
        borderRadius: 9999,
        [`${componentCls}-item, ${componentCls}-thumb`]: {
          borderRadius: 9999
        }
      }
    })
  };
};
const prepareComponentToken$6 = (token) => {
  const {
    colorTextLabel,
    colorText,
    colorFillSecondary,
    colorBgElevated,
    colorFill,
    lineWidthBold,
    colorBgLayout
  } = token;
  return {
    trackPadding: lineWidthBold,
    trackBg: colorBgLayout,
    itemColor: colorTextLabel,
    itemHoverColor: colorText,
    itemHoverBg: colorFillSecondary,
    itemSelectedBg: colorBgElevated,
    itemActiveBg: colorFill,
    itemSelectedColor: colorText
  };
};
const useStyle$7 = genStyleHooks("Segmented", (token) => {
  const {
    lineWidth,
    calc
  } = token;
  const segmentedToken = merge$1(token, {
    segmentedPaddingHorizontal: calc(token.controlPaddingHorizontal).sub(lineWidth).equal(),
    segmentedPaddingHorizontalSM: calc(token.controlPaddingHorizontalSM).sub(lineWidth).equal()
  });
  return genSegmentedStyle(segmentedToken);
}, prepareComponentToken$6);
var __rest$e = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function isSegmentedLabeledOptionWithIcon(option) {
  return typeof option === "object" && !!(option === null || option === void 0 ? void 0 : option.icon);
}
const InternalSegmented = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const defaultName = useId();
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    block,
    options = [],
    size: customSize = "middle",
    style,
    vertical,
    shape = "default",
    name = defaultName
  } = props, restProps = __rest$e(props, ["prefixCls", "className", "rootClassName", "block", "options", "size", "style", "vertical", "shape", "name"]);
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle
  } = useComponentConfig("segmented");
  const prefixCls = getPrefixCls("segmented", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$7(prefixCls);
  const mergedSize = useSize(customSize);
  const extendedOptions = reactExports.useMemo(() => options.map((option) => {
    if (isSegmentedLabeledOptionWithIcon(option)) {
      const {
        icon,
        label
      } = option, restOption = __rest$e(option, ["icon", "label"]);
      return Object.assign(Object.assign({}, restOption), {
        label: /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("span", {
          className: `${prefixCls}-item-icon`
        }, icon), label && /* @__PURE__ */ reactExports.createElement("span", null, label))
      });
    }
    return option;
  }), [options, prefixCls]);
  const cls = classNames(className, rootClassName, contextClassName, {
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-sm`]: mergedSize === "small",
    [`${prefixCls}-lg`]: mergedSize === "large",
    [`${prefixCls}-vertical`]: vertical,
    [`${prefixCls}-shape-${shape}`]: shape === "round"
  }, hashId, cssVarCls);
  const mergedStyle = Object.assign(Object.assign({}, contextStyle), style);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(TypedSegmented, Object.assign({}, restProps, {
    name,
    className: cls,
    style: mergedStyle,
    options: extendedOptions,
    ref,
    prefixCls,
    direction,
    vertical
  })));
});
const Segmented = InternalSegmented;
const PanelPickerContext = /* @__PURE__ */ React.createContext({});
const PanelPresetsContext = /* @__PURE__ */ React.createContext({});
const ColorClear = ({
  prefixCls,
  value,
  onChange: onChange2
}) => {
  const handleClick = () => {
    if (onChange2 && value && !value.cleared) {
      const hsba = value.toHsb();
      hsba.a = 0;
      const genColor = generateColor$1(hsba);
      genColor.cleared = true;
      onChange2(genColor);
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-clear`,
    onClick: handleClick
  });
};
const FORMAT_HEX = "hex";
const FORMAT_RGB = "rgb";
const FORMAT_HSB = "hsb";
var UpOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" } }] }, "name": "up", "theme": "outlined" };
var UpOutlined = function UpOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends$2({}, props, {
    ref,
    icon: UpOutlined$1
  }));
};
var RefIcon$f = /* @__PURE__ */ reactExports.forwardRef(UpOutlined);
function supportBigInt() {
  return typeof BigInt === "function";
}
function isEmpty$1(value) {
  return !value && value !== 0 && !Number.isNaN(value) || !String(value).trim();
}
function trimNumber(numStr) {
  var str = numStr.trim();
  var negative = str.startsWith("-");
  if (negative) {
    str = str.slice(1);
  }
  str = str.replace(/(\.\d*[^0])0*$/, "$1").replace(/\.0*$/, "").replace(/^0+/, "");
  if (str.startsWith(".")) {
    str = "0".concat(str);
  }
  var trimStr = str || "0";
  var splitNumber = trimStr.split(".");
  var integerStr = splitNumber[0] || "0";
  var decimalStr = splitNumber[1] || "0";
  if (integerStr === "0" && decimalStr === "0") {
    negative = false;
  }
  var negativeStr = negative ? "-" : "";
  return {
    negative,
    negativeStr,
    trimStr,
    integerStr,
    decimalStr,
    fullStr: "".concat(negativeStr).concat(trimStr)
  };
}
function isE(number) {
  var str = String(number);
  return !Number.isNaN(Number(str)) && str.includes("e");
}
function getNumberPrecision(number) {
  var numStr = String(number);
  if (isE(number)) {
    var precision = Number(numStr.slice(numStr.indexOf("e-") + 2));
    var decimalMatch = numStr.match(/\.(\d+)/);
    if (decimalMatch !== null && decimalMatch !== void 0 && decimalMatch[1]) {
      precision += decimalMatch[1].length;
    }
    return precision;
  }
  return numStr.includes(".") && validateNumber(numStr) ? numStr.length - numStr.indexOf(".") - 1 : 0;
}
function num2str(number) {
  var numStr = String(number);
  if (isE(number)) {
    if (number > Number.MAX_SAFE_INTEGER) {
      return String(supportBigInt() ? BigInt(number).toString() : Number.MAX_SAFE_INTEGER);
    }
    if (number < Number.MIN_SAFE_INTEGER) {
      return String(supportBigInt() ? BigInt(number).toString() : Number.MIN_SAFE_INTEGER);
    }
    numStr = number.toFixed(getNumberPrecision(numStr));
  }
  return trimNumber(numStr).fullStr;
}
function validateNumber(num) {
  if (typeof num === "number") {
    return !Number.isNaN(num);
  }
  if (!num) {
    return false;
  }
  return (
    // Normal type: 11.28
    /^\s*-?\d+(\.\d+)?\s*$/.test(num) || // Pre-number: 1.
    /^\s*-?\d+\.\s*$/.test(num) || // Post-number: .1
    /^\s*-?\.\d+\s*$/.test(num)
  );
}
var BigIntDecimal = /* @__PURE__ */ (function() {
  function BigIntDecimal2(value) {
    _classCallCheck(this, BigIntDecimal2);
    _defineProperty(this, "origin", "");
    _defineProperty(this, "negative", void 0);
    _defineProperty(this, "integer", void 0);
    _defineProperty(this, "decimal", void 0);
    _defineProperty(this, "decimalLen", void 0);
    _defineProperty(this, "empty", void 0);
    _defineProperty(this, "nan", void 0);
    if (isEmpty$1(value)) {
      this.empty = true;
      return;
    }
    this.origin = String(value);
    if (value === "-" || Number.isNaN(value)) {
      this.nan = true;
      return;
    }
    var mergedValue = value;
    if (isE(mergedValue)) {
      mergedValue = Number(mergedValue);
    }
    mergedValue = typeof mergedValue === "string" ? mergedValue : num2str(mergedValue);
    if (validateNumber(mergedValue)) {
      var trimRet = trimNumber(mergedValue);
      this.negative = trimRet.negative;
      var numbers = trimRet.trimStr.split(".");
      this.integer = BigInt(numbers[0]);
      var decimalStr = numbers[1] || "0";
      this.decimal = BigInt(decimalStr);
      this.decimalLen = decimalStr.length;
    } else {
      this.nan = true;
    }
  }
  _createClass(BigIntDecimal2, [{
    key: "getMark",
    value: function getMark() {
      return this.negative ? "-" : "";
    }
  }, {
    key: "getIntegerStr",
    value: function getIntegerStr() {
      return this.integer.toString();
    }
    /**
     * @private get decimal string
     */
  }, {
    key: "getDecimalStr",
    value: function getDecimalStr() {
      return this.decimal.toString().padStart(this.decimalLen, "0");
    }
    /**
     * @private Align BigIntDecimal with same decimal length. e.g. 12.3 + 5 = 1230000
     * This is used for add function only.
     */
  }, {
    key: "alignDecimal",
    value: function alignDecimal(decimalLength) {
      var str = "".concat(this.getMark()).concat(this.getIntegerStr()).concat(this.getDecimalStr().padEnd(decimalLength, "0"));
      return BigInt(str);
    }
  }, {
    key: "negate",
    value: function negate() {
      var clone2 = new BigIntDecimal2(this.toString());
      clone2.negative = !clone2.negative;
      return clone2;
    }
  }, {
    key: "cal",
    value: function cal(offset, calculator, calDecimalLen) {
      var maxDecimalLength = Math.max(this.getDecimalStr().length, offset.getDecimalStr().length);
      var myAlignedDecimal = this.alignDecimal(maxDecimalLength);
      var offsetAlignedDecimal = offset.alignDecimal(maxDecimalLength);
      var valueStr = calculator(myAlignedDecimal, offsetAlignedDecimal).toString();
      var nextDecimalLength = calDecimalLen(maxDecimalLength);
      var _trimNumber = trimNumber(valueStr), negativeStr = _trimNumber.negativeStr, trimStr = _trimNumber.trimStr;
      var hydrateValueStr = "".concat(negativeStr).concat(trimStr.padStart(nextDecimalLength + 1, "0"));
      return new BigIntDecimal2("".concat(hydrateValueStr.slice(0, -nextDecimalLength), ".").concat(hydrateValueStr.slice(-nextDecimalLength)));
    }
  }, {
    key: "add",
    value: function add2(value) {
      if (this.isInvalidate()) {
        return new BigIntDecimal2(value);
      }
      var offset = new BigIntDecimal2(value);
      if (offset.isInvalidate()) {
        return this;
      }
      return this.cal(offset, function(num1, num2) {
        return num1 + num2;
      }, function(len) {
        return len;
      });
    }
  }, {
    key: "multi",
    value: function multi(value) {
      var target = new BigIntDecimal2(value);
      if (this.isInvalidate() || target.isInvalidate()) {
        return new BigIntDecimal2(NaN);
      }
      return this.cal(target, function(num1, num2) {
        return num1 * num2;
      }, function(len) {
        return len * 2;
      });
    }
  }, {
    key: "isEmpty",
    value: function isEmpty2() {
      return this.empty;
    }
  }, {
    key: "isNaN",
    value: function isNaN2() {
      return this.nan;
    }
  }, {
    key: "isInvalidate",
    value: function isInvalidate() {
      return this.isEmpty() || this.isNaN();
    }
  }, {
    key: "equals",
    value: function equals(target) {
      return this.toString() === (target === null || target === void 0 ? void 0 : target.toString());
    }
  }, {
    key: "lessEquals",
    value: function lessEquals(target) {
      return this.add(target.negate().toString()).toNumber() <= 0;
    }
  }, {
    key: "toNumber",
    value: function toNumber() {
      if (this.isNaN()) {
        return NaN;
      }
      return Number(this.toString());
    }
  }, {
    key: "toString",
    value: function toString() {
      var safe = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
      if (!safe) {
        return this.origin;
      }
      if (this.isInvalidate()) {
        return "";
      }
      return trimNumber("".concat(this.getMark()).concat(this.getIntegerStr(), ".").concat(this.getDecimalStr())).fullStr;
    }
  }]);
  return BigIntDecimal2;
})();
var NumberDecimal = /* @__PURE__ */ (function() {
  function NumberDecimal2(value) {
    _classCallCheck(this, NumberDecimal2);
    _defineProperty(this, "origin", "");
    _defineProperty(this, "number", void 0);
    _defineProperty(this, "empty", void 0);
    if (isEmpty$1(value)) {
      this.empty = true;
      return;
    }
    this.origin = String(value);
    this.number = Number(value);
  }
  _createClass(NumberDecimal2, [{
    key: "negate",
    value: function negate() {
      return new NumberDecimal2(-this.toNumber());
    }
  }, {
    key: "add",
    value: function add2(value) {
      if (this.isInvalidate()) {
        return new NumberDecimal2(value);
      }
      var target = Number(value);
      if (Number.isNaN(target)) {
        return this;
      }
      var number = this.number + target;
      if (number > Number.MAX_SAFE_INTEGER) {
        return new NumberDecimal2(Number.MAX_SAFE_INTEGER);
      }
      if (number < Number.MIN_SAFE_INTEGER) {
        return new NumberDecimal2(Number.MIN_SAFE_INTEGER);
      }
      var maxPrecision = Math.max(getNumberPrecision(this.number), getNumberPrecision(target));
      return new NumberDecimal2(number.toFixed(maxPrecision));
    }
  }, {
    key: "multi",
    value: function multi(value) {
      var target = Number(value);
      if (this.isInvalidate() || Number.isNaN(target)) {
        return new NumberDecimal2(NaN);
      }
      var number = this.number * target;
      if (number > Number.MAX_SAFE_INTEGER) {
        return new NumberDecimal2(Number.MAX_SAFE_INTEGER);
      }
      if (number < Number.MIN_SAFE_INTEGER) {
        return new NumberDecimal2(Number.MIN_SAFE_INTEGER);
      }
      var maxPrecision = Math.max(getNumberPrecision(this.number), getNumberPrecision(target));
      return new NumberDecimal2(number.toFixed(maxPrecision));
    }
  }, {
    key: "isEmpty",
    value: function isEmpty2() {
      return this.empty;
    }
  }, {
    key: "isNaN",
    value: function isNaN2() {
      return Number.isNaN(this.number);
    }
  }, {
    key: "isInvalidate",
    value: function isInvalidate() {
      return this.isEmpty() || this.isNaN();
    }
  }, {
    key: "equals",
    value: function equals(target) {
      return this.toNumber() === (target === null || target === void 0 ? void 0 : target.toNumber());
    }
  }, {
    key: "lessEquals",
    value: function lessEquals(target) {
      return this.add(target.negate().toString()).toNumber() <= 0;
    }
  }, {
    key: "toNumber",
    value: function toNumber() {
      return this.number;
    }
  }, {
    key: "toString",
    value: function toString() {
      var safe = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
      if (!safe) {
        return this.origin;
      }
      if (this.isInvalidate()) {
        return "";
      }
      return num2str(this.number);
    }
  }]);
  return NumberDecimal2;
})();
function getMiniDecimal(value) {
  if (supportBigInt()) {
    return new BigIntDecimal(value);
  }
  return new NumberDecimal(value);
}
function toFixed(numStr, separatorStr, precision) {
  var cutOnly = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  if (numStr === "") {
    return "";
  }
  var _trimNumber = trimNumber(numStr), negativeStr = _trimNumber.negativeStr, integerStr = _trimNumber.integerStr, decimalStr = _trimNumber.decimalStr;
  var precisionDecimalStr = "".concat(separatorStr).concat(decimalStr);
  var numberWithoutDecimal = "".concat(negativeStr).concat(integerStr);
  if (precision >= 0) {
    var advancedNum = Number(decimalStr[precision]);
    if (advancedNum >= 5 && !cutOnly) {
      var advancedDecimal = getMiniDecimal(numStr).add("".concat(negativeStr, "0.").concat("0".repeat(precision)).concat(10 - advancedNum));
      return toFixed(advancedDecimal.toString(), separatorStr, precision, cutOnly);
    }
    if (precision === 0) {
      return numberWithoutDecimal;
    }
    return "".concat(numberWithoutDecimal).concat(separatorStr).concat(decimalStr.padEnd(precision, "0").slice(0, precision));
  }
  if (precisionDecimalStr === ".0") {
    return numberWithoutDecimal;
  }
  return "".concat(numberWithoutDecimal).concat(precisionDecimalStr);
}
function proxyObject(obj, extendProps) {
  if (typeof Proxy !== "undefined" && obj) {
    return new Proxy(obj, {
      get: function get(target, prop) {
        if (extendProps[prop]) {
          return extendProps[prop];
        }
        var originProp = target[prop];
        return typeof originProp === "function" ? originProp.bind(target) : originProp;
      }
    });
  }
  return obj;
}
function useCursor(input, focused) {
  var selectionRef = reactExports.useRef(null);
  function recordCursor() {
    try {
      var start = input.selectionStart, end = input.selectionEnd, value = input.value;
      var beforeTxt = value.substring(0, start);
      var afterTxt = value.substring(end);
      selectionRef.current = {
        start,
        end,
        value,
        beforeTxt,
        afterTxt
      };
    } catch (e) {
    }
  }
  function restoreCursor() {
    if (input && selectionRef.current && focused) {
      try {
        var value = input.value;
        var _selectionRef$current = selectionRef.current, beforeTxt = _selectionRef$current.beforeTxt, afterTxt = _selectionRef$current.afterTxt, start = _selectionRef$current.start;
        var startPos = value.length;
        if (value.startsWith(beforeTxt)) {
          startPos = beforeTxt.length;
        } else if (value.endsWith(afterTxt)) {
          startPos = value.length - selectionRef.current.afterTxt.length;
        } else {
          var beforeLastChar = beforeTxt[start - 1];
          var newIndex = value.indexOf(beforeLastChar, start - 1);
          if (newIndex !== -1) {
            startPos = newIndex + 1;
          }
        }
        input.setSelectionRange(startPos, startPos);
      } catch (e) {
        warningOnce(false, "Something warning of cursor restore. Please fire issue about this: ".concat(e.message));
      }
    }
  }
  return [recordCursor, restoreCursor];
}
var useMobile = function useMobile2() {
  var _useState = reactExports.useState(false), _useState2 = _slicedToArray(_useState, 2), mobile = _useState2[0], setMobile = _useState2[1];
  useLayoutEffect(function() {
    setMobile(isMobile());
  }, []);
  return mobile;
};
var STEP_INTERVAL = 200;
var STEP_DELAY = 600;
function StepHandler(_ref) {
  var prefixCls = _ref.prefixCls, upNode = _ref.upNode, downNode = _ref.downNode, upDisabled = _ref.upDisabled, downDisabled = _ref.downDisabled, onStep = _ref.onStep;
  var stepTimeoutRef = reactExports.useRef();
  var frameIds = reactExports.useRef([]);
  var onStepRef = reactExports.useRef();
  onStepRef.current = onStep;
  var onStopStep = function onStopStep2() {
    clearTimeout(stepTimeoutRef.current);
  };
  var onStepMouseDown = function onStepMouseDown2(e, up) {
    e.preventDefault();
    onStopStep();
    onStepRef.current(up);
    function loopStep() {
      onStepRef.current(up);
      stepTimeoutRef.current = setTimeout(loopStep, STEP_INTERVAL);
    }
    stepTimeoutRef.current = setTimeout(loopStep, STEP_DELAY);
  };
  reactExports.useEffect(function() {
    return function() {
      onStopStep();
      frameIds.current.forEach(function(id) {
        return wrapperRaf.cancel(id);
      });
    };
  }, []);
  var isMobile2 = useMobile();
  if (isMobile2) {
    return null;
  }
  var handlerClassName = "".concat(prefixCls, "-handler");
  var upClassName = classNames(handlerClassName, "".concat(handlerClassName, "-up"), _defineProperty({}, "".concat(handlerClassName, "-up-disabled"), upDisabled));
  var downClassName = classNames(handlerClassName, "".concat(handlerClassName, "-down"), _defineProperty({}, "".concat(handlerClassName, "-down-disabled"), downDisabled));
  var safeOnStopStep = function safeOnStopStep2() {
    return frameIds.current.push(wrapperRaf(onStopStep));
  };
  var sharedHandlerProps = {
    unselectable: "on",
    role: "button",
    onMouseUp: safeOnStopStep,
    onMouseLeave: safeOnStopStep
  };
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(handlerClassName, "-wrap")
  }, /* @__PURE__ */ reactExports.createElement("span", _extends$2({}, sharedHandlerProps, {
    onMouseDown: function onMouseDown(e) {
      onStepMouseDown(e, true);
    },
    "aria-label": "Increase Value",
    "aria-disabled": upDisabled,
    className: upClassName
  }), upNode || /* @__PURE__ */ reactExports.createElement("span", {
    unselectable: "on",
    className: "".concat(prefixCls, "-handler-up-inner")
  })), /* @__PURE__ */ reactExports.createElement("span", _extends$2({}, sharedHandlerProps, {
    onMouseDown: function onMouseDown(e) {
      onStepMouseDown(e, false);
    },
    "aria-label": "Decrease Value",
    "aria-disabled": downDisabled,
    className: downClassName
  }), downNode || /* @__PURE__ */ reactExports.createElement("span", {
    unselectable: "on",
    className: "".concat(prefixCls, "-handler-down-inner")
  })));
}
function getDecupleSteps(step) {
  var stepStr = typeof step === "number" ? num2str(step) : trimNumber(step).fullStr;
  var hasPoint = stepStr.includes(".");
  if (!hasPoint) {
    return step + "0";
  }
  return trimNumber(stepStr.replace(/(\d)\.(\d)/g, "$1$2.")).fullStr;
}
const useFrame = (function() {
  var idRef = reactExports.useRef(0);
  var cleanUp = function cleanUp2() {
    wrapperRaf.cancel(idRef.current);
  };
  reactExports.useEffect(function() {
    return cleanUp;
  }, []);
  return function(callback) {
    cleanUp();
    idRef.current = wrapperRaf(function() {
      callback();
    });
  };
});
var _excluded$4 = ["prefixCls", "className", "style", "min", "max", "step", "defaultValue", "value", "disabled", "readOnly", "upHandler", "downHandler", "keyboard", "changeOnWheel", "controls", "classNames", "stringMode", "parser", "formatter", "precision", "decimalSeparator", "onChange", "onInput", "onPressEnter", "onStep", "changeOnBlur", "domRef"], _excluded2 = ["disabled", "style", "prefixCls", "value", "prefix", "suffix", "addonBefore", "addonAfter", "className", "classNames"];
var getDecimalValue = function getDecimalValue2(stringMode, decimalValue) {
  if (stringMode || decimalValue.isEmpty()) {
    return decimalValue.toString();
  }
  return decimalValue.toNumber();
};
var getDecimalIfValidate = function getDecimalIfValidate2(value) {
  var decimal = getMiniDecimal(value);
  return decimal.isInvalidate() ? null : decimal;
};
var InternalInputNumber = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var prefixCls = props.prefixCls, className = props.className, style = props.style, min = props.min, max = props.max, _props$step = props.step, step = _props$step === void 0 ? 1 : _props$step, defaultValue2 = props.defaultValue, value = props.value, disabled = props.disabled, readOnly = props.readOnly, upHandler = props.upHandler, downHandler = props.downHandler, keyboard = props.keyboard, _props$changeOnWheel = props.changeOnWheel, changeOnWheel = _props$changeOnWheel === void 0 ? false : _props$changeOnWheel, _props$controls = props.controls, controls = _props$controls === void 0 ? true : _props$controls;
  props.classNames;
  var stringMode = props.stringMode, parser = props.parser, formatter = props.formatter, precision = props.precision, decimalSeparator = props.decimalSeparator, onChange2 = props.onChange, onInput = props.onInput, onPressEnter = props.onPressEnter, onStep = props.onStep, _props$changeOnBlur = props.changeOnBlur, changeOnBlur = _props$changeOnBlur === void 0 ? true : _props$changeOnBlur, domRef = props.domRef, inputProps = _objectWithoutProperties(props, _excluded$4);
  var inputClassName = "".concat(prefixCls, "-input");
  var inputRef = reactExports.useRef(null);
  var _React$useState = reactExports.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), focus = _React$useState2[0], setFocus = _React$useState2[1];
  var userTypingRef = reactExports.useRef(false);
  var compositionRef = reactExports.useRef(false);
  var shiftKeyRef = reactExports.useRef(false);
  var _React$useState3 = reactExports.useState(function() {
    return getMiniDecimal(value !== null && value !== void 0 ? value : defaultValue2);
  }), _React$useState4 = _slicedToArray(_React$useState3, 2), decimalValue = _React$useState4[0], setDecimalValue = _React$useState4[1];
  function setUncontrolledDecimalValue(newDecimal) {
    if (value === void 0) {
      setDecimalValue(newDecimal);
    }
  }
  var getPrecision = reactExports.useCallback(function(numStr, userTyping) {
    if (userTyping) {
      return void 0;
    }
    if (precision >= 0) {
      return precision;
    }
    return Math.max(getNumberPrecision(numStr), getNumberPrecision(step));
  }, [precision, step]);
  var mergedParser = reactExports.useCallback(function(num) {
    var numStr = String(num);
    if (parser) {
      return parser(numStr);
    }
    var parsedStr = numStr;
    if (decimalSeparator) {
      parsedStr = parsedStr.replace(decimalSeparator, ".");
    }
    return parsedStr.replace(/[^\w.-]+/g, "");
  }, [parser, decimalSeparator]);
  var inputValueRef = reactExports.useRef("");
  var mergedFormatter = reactExports.useCallback(function(number, userTyping) {
    if (formatter) {
      return formatter(number, {
        userTyping,
        input: String(inputValueRef.current)
      });
    }
    var str = typeof number === "number" ? num2str(number) : number;
    if (!userTyping) {
      var mergedPrecision = getPrecision(str, userTyping);
      if (validateNumber(str) && (decimalSeparator || mergedPrecision >= 0)) {
        var separatorStr = decimalSeparator || ".";
        str = toFixed(str, separatorStr, mergedPrecision);
      }
    }
    return str;
  }, [formatter, getPrecision, decimalSeparator]);
  var _React$useState5 = reactExports.useState(function() {
    var initValue = defaultValue2 !== null && defaultValue2 !== void 0 ? defaultValue2 : value;
    if (decimalValue.isInvalidate() && ["string", "number"].includes(_typeof(initValue))) {
      return Number.isNaN(initValue) ? "" : initValue;
    }
    return mergedFormatter(decimalValue.toString(), false);
  }), _React$useState6 = _slicedToArray(_React$useState5, 2), inputValue = _React$useState6[0], setInternalInputValue = _React$useState6[1];
  inputValueRef.current = inputValue;
  function setInputValue(newValue, userTyping) {
    setInternalInputValue(mergedFormatter(
      // Invalidate number is sometime passed by external control, we should let it go
      // Otherwise is controlled by internal interactive logic which check by userTyping
      // You can ref 'show limited value when input is not focused' test for more info.
      newValue.isInvalidate() ? newValue.toString(false) : newValue.toString(!userTyping),
      userTyping
    ));
  }
  var maxDecimal = reactExports.useMemo(function() {
    return getDecimalIfValidate(max);
  }, [max, precision]);
  var minDecimal = reactExports.useMemo(function() {
    return getDecimalIfValidate(min);
  }, [min, precision]);
  var upDisabled = reactExports.useMemo(function() {
    if (!maxDecimal || !decimalValue || decimalValue.isInvalidate()) {
      return false;
    }
    return maxDecimal.lessEquals(decimalValue);
  }, [maxDecimal, decimalValue]);
  var downDisabled = reactExports.useMemo(function() {
    if (!minDecimal || !decimalValue || decimalValue.isInvalidate()) {
      return false;
    }
    return decimalValue.lessEquals(minDecimal);
  }, [minDecimal, decimalValue]);
  var _useCursor = useCursor(inputRef.current, focus), _useCursor2 = _slicedToArray(_useCursor, 2), recordCursor = _useCursor2[0], restoreCursor = _useCursor2[1];
  var getRangeValue = function getRangeValue2(target) {
    if (maxDecimal && !target.lessEquals(maxDecimal)) {
      return maxDecimal;
    }
    if (minDecimal && !minDecimal.lessEquals(target)) {
      return minDecimal;
    }
    return null;
  };
  var isInRange2 = function isInRange22(target) {
    return !getRangeValue(target);
  };
  var triggerValueUpdate = function triggerValueUpdate2(newValue, userTyping) {
    var updateValue = newValue;
    var isRangeValidate = isInRange2(updateValue) || updateValue.isEmpty();
    if (!updateValue.isEmpty() && !userTyping) {
      updateValue = getRangeValue(updateValue) || updateValue;
      isRangeValidate = true;
    }
    if (!readOnly && !disabled && isRangeValidate) {
      var numStr = updateValue.toString();
      var mergedPrecision = getPrecision(numStr, userTyping);
      if (mergedPrecision >= 0) {
        updateValue = getMiniDecimal(toFixed(numStr, ".", mergedPrecision));
        if (!isInRange2(updateValue)) {
          updateValue = getMiniDecimal(toFixed(numStr, ".", mergedPrecision, true));
        }
      }
      if (!updateValue.equals(decimalValue)) {
        setUncontrolledDecimalValue(updateValue);
        onChange2 === null || onChange2 === void 0 || onChange2(updateValue.isEmpty() ? null : getDecimalValue(stringMode, updateValue));
        if (value === void 0) {
          setInputValue(updateValue, userTyping);
        }
      }
      return updateValue;
    }
    return decimalValue;
  };
  var onNextPromise = useFrame();
  var collectInputValue = function collectInputValue2(inputStr) {
    recordCursor();
    inputValueRef.current = inputStr;
    setInternalInputValue(inputStr);
    if (!compositionRef.current) {
      var finalValue = mergedParser(inputStr);
      var finalDecimal = getMiniDecimal(finalValue);
      if (!finalDecimal.isNaN()) {
        triggerValueUpdate(finalDecimal, true);
      }
    }
    onInput === null || onInput === void 0 || onInput(inputStr);
    onNextPromise(function() {
      var nextInputStr = inputStr;
      if (!parser) {
        nextInputStr = inputStr.replace(/。/g, ".");
      }
      if (nextInputStr !== inputStr) {
        collectInputValue2(nextInputStr);
      }
    });
  };
  var onCompositionStart = function onCompositionStart2() {
    compositionRef.current = true;
  };
  var onCompositionEnd = function onCompositionEnd2() {
    compositionRef.current = false;
    collectInputValue(inputRef.current.value);
  };
  var onInternalInput = function onInternalInput2(e) {
    collectInputValue(e.target.value);
  };
  var onInternalStep = function onInternalStep2(up) {
    var _inputRef$current;
    if (up && upDisabled || !up && downDisabled) {
      return;
    }
    userTypingRef.current = false;
    var stepDecimal = getMiniDecimal(shiftKeyRef.current ? getDecupleSteps(step) : step);
    if (!up) {
      stepDecimal = stepDecimal.negate();
    }
    var target = (decimalValue || getMiniDecimal(0)).add(stepDecimal.toString());
    var updatedValue = triggerValueUpdate(target, false);
    onStep === null || onStep === void 0 || onStep(getDecimalValue(stringMode, updatedValue), {
      offset: shiftKeyRef.current ? getDecupleSteps(step) : step,
      type: up ? "up" : "down"
    });
    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus();
  };
  var flushInputValue = function flushInputValue2(userTyping) {
    var parsedValue = getMiniDecimal(mergedParser(inputValue));
    var formatValue2;
    if (!parsedValue.isNaN()) {
      formatValue2 = triggerValueUpdate(parsedValue, userTyping);
    } else {
      formatValue2 = triggerValueUpdate(decimalValue, userTyping);
    }
    if (value !== void 0) {
      setInputValue(decimalValue, false);
    } else if (!formatValue2.isNaN()) {
      setInputValue(formatValue2, false);
    }
  };
  var onBeforeInput = function onBeforeInput2() {
    userTypingRef.current = true;
  };
  var onKeyDown = function onKeyDown2(event) {
    var key2 = event.key, shiftKey = event.shiftKey;
    userTypingRef.current = true;
    shiftKeyRef.current = shiftKey;
    if (key2 === "Enter") {
      if (!compositionRef.current) {
        userTypingRef.current = false;
      }
      flushInputValue(false);
      onPressEnter === null || onPressEnter === void 0 || onPressEnter(event);
    }
    if (keyboard === false) {
      return;
    }
    if (!compositionRef.current && ["Up", "ArrowUp", "Down", "ArrowDown"].includes(key2)) {
      onInternalStep(key2 === "Up" || key2 === "ArrowUp");
      event.preventDefault();
    }
  };
  var onKeyUp = function onKeyUp2() {
    userTypingRef.current = false;
    shiftKeyRef.current = false;
  };
  reactExports.useEffect(function() {
    if (changeOnWheel && focus) {
      var onWheel = function onWheel2(event) {
        onInternalStep(event.deltaY < 0);
        event.preventDefault();
      };
      var input = inputRef.current;
      if (input) {
        input.addEventListener("wheel", onWheel, {
          passive: false
        });
        return function() {
          return input.removeEventListener("wheel", onWheel);
        };
      }
    }
  });
  var onBlur = function onBlur2() {
    if (changeOnBlur) {
      flushInputValue(false);
    }
    setFocus(false);
    userTypingRef.current = false;
  };
  useLayoutUpdateEffect(function() {
    if (!decimalValue.isInvalidate()) {
      setInputValue(decimalValue, false);
    }
  }, [precision, formatter]);
  useLayoutUpdateEffect(function() {
    var newValue = getMiniDecimal(value);
    setDecimalValue(newValue);
    var currentParsedValue = getMiniDecimal(mergedParser(inputValue));
    if (!newValue.equals(currentParsedValue) || !userTypingRef.current || formatter) {
      setInputValue(newValue, userTypingRef.current);
    }
  }, [value]);
  useLayoutUpdateEffect(function() {
    if (formatter) {
      restoreCursor();
    }
  }, [inputValue]);
  return /* @__PURE__ */ reactExports.createElement("div", {
    ref: domRef,
    className: classNames(prefixCls, className, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-focused"), focus), "".concat(prefixCls, "-disabled"), disabled), "".concat(prefixCls, "-readonly"), readOnly), "".concat(prefixCls, "-not-a-number"), decimalValue.isNaN()), "".concat(prefixCls, "-out-of-range"), !decimalValue.isInvalidate() && !isInRange2(decimalValue))),
    style,
    onFocus: function onFocus() {
      setFocus(true);
    },
    onBlur,
    onKeyDown,
    onKeyUp,
    onCompositionStart,
    onCompositionEnd,
    onBeforeInput
  }, controls && /* @__PURE__ */ reactExports.createElement(StepHandler, {
    prefixCls,
    upNode: upHandler,
    downNode: downHandler,
    upDisabled,
    downDisabled,
    onStep: onInternalStep
  }), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(inputClassName, "-wrap")
  }, /* @__PURE__ */ reactExports.createElement("input", _extends$2({
    autoComplete: "off",
    role: "spinbutton",
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuenow": decimalValue.isInvalidate() ? null : decimalValue.toString(),
    step
  }, inputProps, {
    ref: composeRef(inputRef, ref),
    className: inputClassName,
    value: inputValue,
    onChange: onInternalInput,
    disabled,
    readOnly
  }))));
});
var InputNumber$1 = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var disabled = props.disabled, style = props.style, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-input-number" : _props$prefixCls, value = props.value, prefix = props.prefix, suffix = props.suffix, addonBefore = props.addonBefore, addonAfter = props.addonAfter, className = props.className, classNames2 = props.classNames, rest = _objectWithoutProperties(props, _excluded2);
  var holderRef = reactExports.useRef(null);
  var inputNumberDomRef = reactExports.useRef(null);
  var inputFocusRef = reactExports.useRef(null);
  var focus = function focus2(option) {
    if (inputFocusRef.current) {
      triggerFocus(inputFocusRef.current, option);
    }
  };
  reactExports.useImperativeHandle(ref, function() {
    return proxyObject(inputFocusRef.current, {
      focus,
      nativeElement: holderRef.current.nativeElement || inputNumberDomRef.current
    });
  });
  return /* @__PURE__ */ reactExports.createElement(BaseInput, {
    className,
    triggerFocus: focus,
    prefixCls,
    value,
    disabled,
    style,
    prefix,
    suffix,
    addonAfter,
    addonBefore,
    classNames: classNames2,
    components: {
      affixWrapper: "div",
      groupWrapper: "div",
      wrapper: "div",
      groupAddon: "div"
    },
    ref: holderRef
  }, /* @__PURE__ */ reactExports.createElement(InternalInputNumber, _extends$2({
    prefixCls,
    disabled,
    ref: inputFocusRef,
    domRef: inputNumberDomRef,
    className: classNames2 === null || classNames2 === void 0 ? void 0 : classNames2.input
  }, rest)));
});
const prepareComponentToken$5 = (token) => {
  var _a;
  const handleVisible = (_a = token.handleVisible) !== null && _a !== void 0 ? _a : "auto";
  const handleWidth = token.controlHeightSM - token.lineWidth * 2;
  return Object.assign(Object.assign({}, initComponentToken(token)), {
    controlWidth: 90,
    handleWidth,
    handleFontSize: token.fontSize / 2,
    handleVisible,
    handleActiveBg: token.colorFillAlter,
    handleBg: token.colorBgContainer,
    filledHandleBg: new FastColor(token.colorFillSecondary).onBackground(token.colorBgContainer).toHexString(),
    handleHoverColor: token.colorPrimary,
    handleBorderColor: token.colorBorder,
    handleOpacity: handleVisible === true ? 1 : 0,
    handleVisibleWidth: handleVisible === true ? handleWidth : 0
  });
};
const genRadiusStyle = ({
  componentCls,
  borderRadiusSM,
  borderRadiusLG
}, size) => {
  const borderRadius = size === "lg" ? borderRadiusLG : borderRadiusSM;
  return {
    [`&-${size}`]: {
      [`${componentCls}-handler-wrap`]: {
        borderStartEndRadius: borderRadius,
        borderEndEndRadius: borderRadius
      },
      [`${componentCls}-handler-up`]: {
        borderStartEndRadius: borderRadius
      },
      [`${componentCls}-handler-down`]: {
        borderEndEndRadius: borderRadius
      }
    }
  };
};
const genInputNumberStyles = (token) => {
  const {
    componentCls,
    lineWidth,
    lineType,
    borderRadius,
    inputFontSizeSM,
    inputFontSizeLG,
    controlHeightLG,
    controlHeightSM,
    colorError,
    paddingInlineSM,
    paddingBlockSM,
    paddingBlockLG,
    paddingInlineLG,
    colorIcon,
    motionDurationMid,
    handleHoverColor,
    handleOpacity,
    paddingInline,
    paddingBlock,
    handleBg,
    handleActiveBg,
    colorTextDisabled,
    borderRadiusSM,
    borderRadiusLG,
    controlWidth,
    handleBorderColor,
    filledHandleBg,
    lineHeightLG,
    calc
  } = token;
  return [
    {
      [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), genBasicInputStyle(token)), {
        display: "inline-block",
        width: controlWidth,
        margin: 0,
        padding: 0,
        borderRadius
      }), genOutlinedStyle(token, {
        [`${componentCls}-handler-wrap`]: {
          background: handleBg,
          [`${componentCls}-handler-down`]: {
            borderBlockStart: `${unit(lineWidth)} ${lineType} ${handleBorderColor}`
          }
        }
      })), genFilledStyle(token, {
        [`${componentCls}-handler-wrap`]: {
          background: filledHandleBg,
          [`${componentCls}-handler-down`]: {
            borderBlockStart: `${unit(lineWidth)} ${lineType} ${handleBorderColor}`
          }
        },
        "&:focus-within": {
          [`${componentCls}-handler-wrap`]: {
            background: handleBg
          }
        }
      })), genUnderlinedStyle(token, {
        [`${componentCls}-handler-wrap`]: {
          background: handleBg,
          [`${componentCls}-handler-down`]: {
            borderBlockStart: `${unit(lineWidth)} ${lineType} ${handleBorderColor}`
          }
        }
      })), genBorderlessStyle(token)), {
        "&-rtl": {
          direction: "rtl",
          [`${componentCls}-input`]: {
            direction: "rtl"
          }
        },
        "&-lg": {
          padding: 0,
          fontSize: inputFontSizeLG,
          lineHeight: lineHeightLG,
          borderRadius: borderRadiusLG,
          [`input${componentCls}-input`]: {
            height: calc(controlHeightLG).sub(calc(lineWidth).mul(2)).equal(),
            padding: `${unit(paddingBlockLG)} ${unit(paddingInlineLG)}`
          }
        },
        "&-sm": {
          padding: 0,
          fontSize: inputFontSizeSM,
          borderRadius: borderRadiusSM,
          [`input${componentCls}-input`]: {
            height: calc(controlHeightSM).sub(calc(lineWidth).mul(2)).equal(),
            padding: `${unit(paddingBlockSM)} ${unit(paddingInlineSM)}`
          }
        },
        // ===================== Out Of Range =====================
        "&-out-of-range": {
          [`${componentCls}-input-wrap`]: {
            input: {
              color: colorError
            }
          }
        },
        // Style for input-group: input with label, with button or dropdown...
        "&-group": Object.assign(Object.assign(Object.assign({}, resetComponent(token)), genInputGroupStyle(token)), {
          "&-wrapper": Object.assign(Object.assign(Object.assign({
            display: "inline-block",
            textAlign: "start",
            verticalAlign: "top",
            [`${componentCls}-affix-wrapper`]: {
              width: "100%"
            },
            // Size
            "&-lg": {
              [`${componentCls}-group-addon`]: {
                borderRadius: borderRadiusLG,
                fontSize: token.fontSizeLG
              }
            },
            "&-sm": {
              [`${componentCls}-group-addon`]: {
                borderRadius: borderRadiusSM
              }
            }
          }, genOutlinedGroupStyle(token)), genFilledGroupStyle(token)), {
            // Fix the issue of using icons in Space Compact mode
            // https://github.com/ant-design/ant-design/issues/45764
            [`&:not(${componentCls}-compact-first-item):not(${componentCls}-compact-last-item)${componentCls}-compact-item`]: {
              [`${componentCls}, ${componentCls}-group-addon`]: {
                borderRadius: 0
              }
            },
            [`&:not(${componentCls}-compact-last-item)${componentCls}-compact-first-item`]: {
              [`${componentCls}, ${componentCls}-group-addon`]: {
                borderStartEndRadius: 0,
                borderEndEndRadius: 0
              }
            },
            [`&:not(${componentCls}-compact-first-item)${componentCls}-compact-last-item`]: {
              [`${componentCls}, ${componentCls}-group-addon`]: {
                borderStartStartRadius: 0,
                borderEndStartRadius: 0
              }
            }
          })
        }),
        [`&-disabled ${componentCls}-input`]: {
          cursor: "not-allowed"
        },
        [componentCls]: {
          "&-input": Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
            width: "100%",
            padding: `${unit(paddingBlock)} ${unit(paddingInline)}`,
            textAlign: "start",
            backgroundColor: "transparent",
            border: 0,
            borderRadius,
            outline: 0,
            transition: `all ${motionDurationMid} linear`,
            appearance: "textfield",
            fontSize: "inherit"
          }), genPlaceholderStyle(token.colorTextPlaceholder)), {
            '&[type="number"]::-webkit-inner-spin-button, &[type="number"]::-webkit-outer-spin-button': {
              margin: 0,
              appearance: "none"
            }
          })
        },
        [`&:hover ${componentCls}-handler-wrap, &-focused ${componentCls}-handler-wrap`]: {
          width: token.handleWidth,
          opacity: 1
        }
      })
    },
    // Handler
    {
      [componentCls]: Object.assign(Object.assign(Object.assign({
        [`${componentCls}-handler-wrap`]: {
          position: "absolute",
          insetBlockStart: 0,
          insetInlineEnd: 0,
          width: token.handleVisibleWidth,
          opacity: handleOpacity,
          height: "100%",
          borderStartStartRadius: 0,
          borderStartEndRadius: borderRadius,
          borderEndEndRadius: borderRadius,
          borderEndStartRadius: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          transition: `all ${motionDurationMid}`,
          overflow: "hidden",
          // Fix input number inside Menu makes icon too large
          // We arise the selector priority by nest selector here
          // https://github.com/ant-design/ant-design/issues/14367
          [`${componentCls}-handler`]: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "auto",
            height: "40%",
            [`
              ${componentCls}-handler-up-inner,
              ${componentCls}-handler-down-inner
            `]: {
              marginInlineEnd: 0,
              fontSize: token.handleFontSize
            }
          }
        },
        [`${componentCls}-handler`]: {
          height: "50%",
          overflow: "hidden",
          color: colorIcon,
          fontWeight: "bold",
          lineHeight: 0,
          textAlign: "center",
          cursor: "pointer",
          borderInlineStart: `${unit(lineWidth)} ${lineType} ${handleBorderColor}`,
          transition: `all ${motionDurationMid} linear`,
          "&:active": {
            background: handleActiveBg
          },
          // Hover
          "&:hover": {
            height: `60%`,
            [`
              ${componentCls}-handler-up-inner,
              ${componentCls}-handler-down-inner
            `]: {
              color: handleHoverColor
            }
          },
          "&-up-inner, &-down-inner": Object.assign(Object.assign({}, resetIcon()), {
            color: colorIcon,
            transition: `all ${motionDurationMid} linear`,
            userSelect: "none"
          })
        },
        [`${componentCls}-handler-up`]: {
          borderStartEndRadius: borderRadius
        },
        [`${componentCls}-handler-down`]: {
          borderEndEndRadius: borderRadius
        }
      }, genRadiusStyle(token, "lg")), genRadiusStyle(token, "sm")), {
        // Disabled
        "&-disabled, &-readonly": {
          [`${componentCls}-handler-wrap`]: {
            display: "none"
          },
          [`${componentCls}-input`]: {
            color: "inherit"
          }
        },
        [`
          ${componentCls}-handler-up-disabled,
          ${componentCls}-handler-down-disabled
        `]: {
          cursor: "not-allowed"
        },
        [`
          ${componentCls}-handler-up-disabled:hover &-handler-up-inner,
          ${componentCls}-handler-down-disabled:hover &-handler-down-inner
        `]: {
          color: colorTextDisabled
        }
      })
    }
  ];
};
const genAffixWrapperStyles = (token) => {
  const {
    componentCls,
    paddingBlock,
    paddingInline,
    inputAffixPadding,
    controlWidth,
    borderRadiusLG,
    borderRadiusSM,
    paddingInlineLG,
    paddingInlineSM,
    paddingBlockLG,
    paddingBlockSM,
    motionDurationMid
  } = token;
  return {
    [`${componentCls}-affix-wrapper`]: Object.assign(Object.assign({
      [`input${componentCls}-input`]: {
        padding: `${unit(paddingBlock)} 0`
      }
    }, genBasicInputStyle(token)), {
      // or number handler will cover form status
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      width: controlWidth,
      padding: 0,
      paddingInlineStart: paddingInline,
      "&-lg": {
        borderRadius: borderRadiusLG,
        paddingInlineStart: paddingInlineLG,
        [`input${componentCls}-input`]: {
          padding: `${unit(paddingBlockLG)} 0`
        }
      },
      "&-sm": {
        borderRadius: borderRadiusSM,
        paddingInlineStart: paddingInlineSM,
        [`input${componentCls}-input`]: {
          padding: `${unit(paddingBlockSM)} 0`
        }
      },
      [`&:not(${componentCls}-disabled):hover`]: {
        zIndex: 1
      },
      "&-focused, &:focus": {
        zIndex: 1
      },
      [`&-disabled > ${componentCls}-disabled`]: {
        background: "transparent"
      },
      [`> div${componentCls}`]: {
        width: "100%",
        border: "none",
        outline: "none",
        [`&${componentCls}-focused`]: {
          boxShadow: "none !important"
        }
      },
      "&::before": {
        display: "inline-block",
        width: 0,
        visibility: "hidden",
        content: '"\\a0"'
      },
      [`${componentCls}-handler-wrap`]: {
        zIndex: 2
      },
      [componentCls]: {
        position: "static",
        color: "inherit",
        "&-prefix, &-suffix": {
          display: "flex",
          flex: "none",
          alignItems: "center",
          pointerEvents: "none"
        },
        "&-prefix": {
          marginInlineEnd: inputAffixPadding
        },
        "&-suffix": {
          insetBlockStart: 0,
          insetInlineEnd: 0,
          height: "100%",
          marginInlineEnd: paddingInline,
          marginInlineStart: inputAffixPadding,
          transition: `margin ${motionDurationMid}`
        }
      },
      [`&:hover ${componentCls}-handler-wrap, &-focused ${componentCls}-handler-wrap`]: {
        width: token.handleWidth,
        opacity: 1
      },
      [`&:not(${componentCls}-affix-wrapper-without-controls):hover ${componentCls}-suffix`]: {
        marginInlineEnd: token.calc(token.handleWidth).add(paddingInline).equal()
      }
    }),
    // 覆盖 affix-wrapper borderRadius！
    [`${componentCls}-underlined`]: {
      borderRadius: 0
    }
  };
};
const useStyle$6 = genStyleHooks("InputNumber", (token) => {
  const inputNumberToken = merge$1(token, initInputToken(token));
  return [
    genInputNumberStyles(inputNumberToken),
    genAffixWrapperStyles(inputNumberToken),
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    genCompactItemStyle(inputNumberToken)
  ];
}, prepareComponentToken$5, {
  unitless: {
    handleOpacity: true
  },
  resetFont: false
});
var __rest$d = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InputNumber = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const inputRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => inputRef.current);
  const {
    className,
    rootClassName,
    size: customizeSize,
    disabled: customDisabled,
    prefixCls: customizePrefixCls,
    addonBefore,
    addonAfter,
    prefix,
    suffix,
    bordered,
    readOnly,
    status: customStatus,
    controls,
    variant: customVariant
  } = props, others = __rest$d(props, ["className", "rootClassName", "size", "disabled", "prefixCls", "addonBefore", "addonAfter", "prefix", "suffix", "bordered", "readOnly", "status", "controls", "variant"]);
  const prefixCls = getPrefixCls("input-number", customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$6(prefixCls, rootCls);
  const {
    compactSize,
    compactItemClassnames
  } = useCompactItemContext(prefixCls, direction);
  let upIcon = /* @__PURE__ */ reactExports.createElement(RefIcon$f, {
    className: `${prefixCls}-handler-up-inner`
  });
  let downIcon = /* @__PURE__ */ reactExports.createElement(RefIcon$h, {
    className: `${prefixCls}-handler-down-inner`
  });
  const controlsTemp = typeof controls === "boolean" ? controls : void 0;
  if (typeof controls === "object") {
    upIcon = typeof controls.upIcon === "undefined" ? upIcon : /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-handler-up-inner`
    }, controls.upIcon);
    downIcon = typeof controls.downIcon === "undefined" ? downIcon : /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-handler-down-inner`
    }, controls.downIcon);
  }
  const {
    hasFeedback,
    status: contextStatus,
    isFormItemInput,
    feedbackIcon
  } = reactExports.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);
  const mergedSize = useSize((ctx) => {
    var _a;
    return (_a = customizeSize !== null && customizeSize !== void 0 ? customizeSize : compactSize) !== null && _a !== void 0 ? _a : ctx;
  });
  const disabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  const [variant, enableVariantCls] = useVariant("inputNumber", customVariant, bordered);
  const suffixNode = hasFeedback && /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, feedbackIcon);
  const inputNumberClass = classNames({
    [`${prefixCls}-lg`]: mergedSize === "large",
    [`${prefixCls}-sm`]: mergedSize === "small",
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-in-form-item`]: isFormItemInput
  }, hashId);
  const wrapperClassName = `${prefixCls}-group`;
  const element = /* @__PURE__ */ reactExports.createElement(InputNumber$1, Object.assign({
    ref: inputRef,
    disabled: mergedDisabled,
    className: classNames(cssVarCls, rootCls, className, rootClassName, compactItemClassnames),
    upHandler: upIcon,
    downHandler: downIcon,
    prefixCls,
    readOnly,
    controls: controlsTemp,
    prefix,
    suffix: suffixNode || suffix,
    addonBefore: addonBefore && /* @__PURE__ */ reactExports.createElement(ContextIsolator, {
      form: true,
      space: true
    }, addonBefore),
    addonAfter: addonAfter && /* @__PURE__ */ reactExports.createElement(ContextIsolator, {
      form: true,
      space: true
    }, addonAfter),
    classNames: {
      input: inputNumberClass,
      variant: classNames({
        [`${prefixCls}-${variant}`]: enableVariantCls
      }, getStatusClassNames(prefixCls, mergedStatus, hasFeedback)),
      affixWrapper: classNames({
        [`${prefixCls}-affix-wrapper-sm`]: mergedSize === "small",
        [`${prefixCls}-affix-wrapper-lg`]: mergedSize === "large",
        [`${prefixCls}-affix-wrapper-rtl`]: direction === "rtl",
        [`${prefixCls}-affix-wrapper-without-controls`]: controls === false || mergedDisabled || readOnly
      }, hashId),
      wrapper: classNames({
        [`${wrapperClassName}-rtl`]: direction === "rtl"
      }, hashId),
      groupWrapper: classNames({
        [`${prefixCls}-group-wrapper-sm`]: mergedSize === "small",
        [`${prefixCls}-group-wrapper-lg`]: mergedSize === "large",
        [`${prefixCls}-group-wrapper-rtl`]: direction === "rtl",
        [`${prefixCls}-group-wrapper-${variant}`]: enableVariantCls
      }, getStatusClassNames(`${prefixCls}-group-wrapper`, mergedStatus, hasFeedback), hashId)
    }
  }, others));
  return wrapCSSVar(element);
});
const TypedInputNumber = InputNumber;
const PureInputNumber = (props) => /* @__PURE__ */ reactExports.createElement(ConfigProvider, {
  theme: {
    components: {
      InputNumber: {
        handleVisible: true
      }
    }
  }
}, /* @__PURE__ */ reactExports.createElement(InputNumber, Object.assign({}, props)));
TypedInputNumber._InternalPanelDoNotUseOrYouWillBeFired = PureInputNumber;
const ColorSteppers = ({
  prefixCls,
  min = 0,
  max = 100,
  value,
  onChange: onChange2,
  className,
  formatter
}) => {
  const colorSteppersPrefixCls = `${prefixCls}-steppers`;
  const [internalValue, setInternalValue] = reactExports.useState(0);
  const stepValue = !Number.isNaN(value) ? value : internalValue;
  return /* @__PURE__ */ React.createElement(TypedInputNumber, {
    className: classNames(colorSteppersPrefixCls, className),
    min,
    max,
    value: stepValue,
    formatter,
    size: "small",
    onChange: (step) => {
      setInternalValue(step || 0);
      onChange2 === null || onChange2 === void 0 ? void 0 : onChange2(step);
    }
  });
};
const ColorAlphaInput = ({
  prefixCls,
  value,
  onChange: onChange2
}) => {
  const colorAlphaInputPrefixCls = `${prefixCls}-alpha-input`;
  const [internalValue, setInternalValue] = reactExports.useState(() => generateColor$1(value || "#000"));
  const alphaValue = value || internalValue;
  const handleAlphaChange = (step) => {
    const hsba = alphaValue.toHsb();
    hsba.a = (step || 0) / 100;
    const genColor = generateColor$1(hsba);
    setInternalValue(genColor);
    onChange2 === null || onChange2 === void 0 ? void 0 : onChange2(genColor);
  };
  return /* @__PURE__ */ React.createElement(ColorSteppers, {
    value: getColorAlpha(alphaValue),
    prefixCls,
    formatter: (step) => `${step}%`,
    className: colorAlphaInputPrefixCls,
    onChange: handleAlphaChange
  });
};
const hexReg = /(^#[\da-f]{6}$)|(^#[\da-f]{8}$)/i;
const isHexString = (hex) => hexReg.test(`#${hex}`);
const ColorHexInput = ({
  prefixCls,
  value,
  onChange: onChange2
}) => {
  const colorHexInputPrefixCls = `${prefixCls}-hex-input`;
  const [hexValue, setHexValue] = reactExports.useState(() => value ? toHexFormat(value.toHexString()) : void 0);
  reactExports.useEffect(() => {
    if (value) {
      setHexValue(toHexFormat(value.toHexString()));
    }
  }, [value]);
  const handleHexChange = (e) => {
    const originValue = e.target.value;
    setHexValue(toHexFormat(originValue));
    if (isHexString(toHexFormat(originValue, true))) {
      onChange2 === null || onChange2 === void 0 ? void 0 : onChange2(generateColor$1(originValue));
    }
  };
  return /* @__PURE__ */ React.createElement(Input$1, {
    className: colorHexInputPrefixCls,
    value: hexValue,
    prefix: "#",
    onChange: handleHexChange,
    size: "small"
  });
};
const ColorHsbInput = ({
  prefixCls,
  value,
  onChange: onChange2
}) => {
  const colorHsbInputPrefixCls = `${prefixCls}-hsb-input`;
  const [internalValue, setInternalValue] = reactExports.useState(() => generateColor$1(value || "#000"));
  const hsbValue = value || internalValue;
  const handleHsbChange = (step, type) => {
    const hsb = hsbValue.toHsb();
    hsb[type] = type === "h" ? step : (step || 0) / 100;
    const genColor = generateColor$1(hsb);
    setInternalValue(genColor);
    onChange2 === null || onChange2 === void 0 ? void 0 : onChange2(genColor);
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: colorHsbInputPrefixCls
  }, /* @__PURE__ */ React.createElement(ColorSteppers, {
    max: 360,
    min: 0,
    value: Number(hsbValue.toHsb().h),
    prefixCls,
    className: colorHsbInputPrefixCls,
    formatter: (step) => getRoundNumber(step || 0).toString(),
    onChange: (step) => handleHsbChange(Number(step), "h")
  }), /* @__PURE__ */ React.createElement(ColorSteppers, {
    max: 100,
    min: 0,
    value: Number(hsbValue.toHsb().s) * 100,
    prefixCls,
    className: colorHsbInputPrefixCls,
    formatter: (step) => `${getRoundNumber(step || 0)}%`,
    onChange: (step) => handleHsbChange(Number(step), "s")
  }), /* @__PURE__ */ React.createElement(ColorSteppers, {
    max: 100,
    min: 0,
    value: Number(hsbValue.toHsb().b) * 100,
    prefixCls,
    className: colorHsbInputPrefixCls,
    formatter: (step) => `${getRoundNumber(step || 0)}%`,
    onChange: (step) => handleHsbChange(Number(step), "b")
  }));
};
const ColorRgbInput = ({
  prefixCls,
  value,
  onChange: onChange2
}) => {
  const colorRgbInputPrefixCls = `${prefixCls}-rgb-input`;
  const [internalValue, setInternalValue] = reactExports.useState(() => generateColor$1(value || "#000"));
  const rgbValue = value || internalValue;
  const handleRgbChange = (step, type) => {
    const rgb = rgbValue.toRgb();
    rgb[type] = step || 0;
    const genColor = generateColor$1(rgb);
    setInternalValue(genColor);
    onChange2 === null || onChange2 === void 0 ? void 0 : onChange2(genColor);
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: colorRgbInputPrefixCls
  }, /* @__PURE__ */ React.createElement(ColorSteppers, {
    max: 255,
    min: 0,
    value: Number(rgbValue.toRgb().r),
    prefixCls,
    className: colorRgbInputPrefixCls,
    onChange: (step) => handleRgbChange(Number(step), "r")
  }), /* @__PURE__ */ React.createElement(ColorSteppers, {
    max: 255,
    min: 0,
    value: Number(rgbValue.toRgb().g),
    prefixCls,
    className: colorRgbInputPrefixCls,
    onChange: (step) => handleRgbChange(Number(step), "g")
  }), /* @__PURE__ */ React.createElement(ColorSteppers, {
    max: 255,
    min: 0,
    value: Number(rgbValue.toRgb().b),
    prefixCls,
    className: colorRgbInputPrefixCls,
    onChange: (step) => handleRgbChange(Number(step), "b")
  }));
};
const selectOptions = [FORMAT_HEX, FORMAT_HSB, FORMAT_RGB].map((format2) => ({
  value: format2,
  label: format2.toUpperCase()
}));
const ColorInput = (props) => {
  const {
    prefixCls,
    format: format2,
    value,
    disabledAlpha,
    onFormatChange,
    onChange: onChange2,
    disabledFormat
  } = props;
  const [colorFormat, setColorFormat] = useMergedState(FORMAT_HEX, {
    value: format2,
    onChange: onFormatChange
  });
  const colorInputPrefixCls = `${prefixCls}-input`;
  const handleFormatChange = (newFormat) => {
    setColorFormat(newFormat);
  };
  const steppersNode = reactExports.useMemo(() => {
    const inputProps = {
      value,
      prefixCls,
      onChange: onChange2
    };
    switch (colorFormat) {
      case FORMAT_HSB:
        return /* @__PURE__ */ React.createElement(ColorHsbInput, Object.assign({}, inputProps));
      case FORMAT_RGB:
        return /* @__PURE__ */ React.createElement(ColorRgbInput, Object.assign({}, inputProps));
      // case FORMAT_HEX:
      default:
        return /* @__PURE__ */ React.createElement(ColorHexInput, Object.assign({}, inputProps));
    }
  }, [colorFormat, prefixCls, value, onChange2]);
  return /* @__PURE__ */ React.createElement("div", {
    className: `${colorInputPrefixCls}-container`
  }, !disabledFormat && /* @__PURE__ */ React.createElement(Select, {
    value: colorFormat,
    variant: "borderless",
    getPopupContainer: (current) => current,
    popupMatchSelectWidth: 68,
    placement: "bottomRight",
    onChange: handleFormatChange,
    className: `${prefixCls}-format-select`,
    size: "small",
    options: selectOptions
  }), /* @__PURE__ */ React.createElement("div", {
    className: colorInputPrefixCls
  }, steppersNode), !disabledAlpha && /* @__PURE__ */ React.createElement(ColorAlphaInput, {
    prefixCls,
    value,
    onChange: onChange2
  }));
};
function getOffset(value, min, max) {
  return (value - min) / (max - min);
}
function getDirectionStyle(direction, value, min, max) {
  var offset = getOffset(value, min, max);
  var positionStyle = {};
  switch (direction) {
    case "rtl":
      positionStyle.right = "".concat(offset * 100, "%");
      positionStyle.transform = "translateX(50%)";
      break;
    case "btt":
      positionStyle.bottom = "".concat(offset * 100, "%");
      positionStyle.transform = "translateY(50%)";
      break;
    case "ttb":
      positionStyle.top = "".concat(offset * 100, "%");
      positionStyle.transform = "translateY(-50%)";
      break;
    default:
      positionStyle.left = "".concat(offset * 100, "%");
      positionStyle.transform = "translateX(-50%)";
      break;
  }
  return positionStyle;
}
function getIndex(value, index2) {
  return Array.isArray(value) ? value[index2] : value;
}
var SliderContext = /* @__PURE__ */ reactExports.createContext({
  min: 0,
  max: 0,
  direction: "ltr",
  step: 1,
  includedStart: 0,
  includedEnd: 0,
  tabIndex: 0,
  keyboard: true,
  styles: {},
  classNames: {}
});
var UnstableContext = /* @__PURE__ */ reactExports.createContext({});
var _excluded$3 = ["prefixCls", "value", "valueIndex", "onStartMove", "onDelete", "style", "render", "dragging", "draggingDelete", "onOffsetChange", "onChangeComplete", "onFocus", "onMouseEnter"];
var Handle = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var prefixCls = props.prefixCls, value = props.value, valueIndex = props.valueIndex, onStartMove = props.onStartMove, onDelete = props.onDelete, style = props.style, render3 = props.render, dragging = props.dragging, draggingDelete = props.draggingDelete, onOffsetChange = props.onOffsetChange, onChangeComplete = props.onChangeComplete, onFocus = props.onFocus, onMouseEnter = props.onMouseEnter, restProps = _objectWithoutProperties(props, _excluded$3);
  var _React$useContext = reactExports.useContext(SliderContext), min = _React$useContext.min, max = _React$useContext.max, direction = _React$useContext.direction, disabled = _React$useContext.disabled, keyboard = _React$useContext.keyboard, range = _React$useContext.range, tabIndex = _React$useContext.tabIndex, ariaLabelForHandle = _React$useContext.ariaLabelForHandle, ariaLabelledByForHandle = _React$useContext.ariaLabelledByForHandle, ariaRequired = _React$useContext.ariaRequired, ariaValueTextFormatterForHandle = _React$useContext.ariaValueTextFormatterForHandle, styles = _React$useContext.styles, classNames$1 = _React$useContext.classNames;
  var handlePrefixCls = "".concat(prefixCls, "-handle");
  var onInternalStartMove = function onInternalStartMove2(e) {
    if (!disabled) {
      onStartMove(e, valueIndex);
    }
  };
  var onInternalFocus = function onInternalFocus2(e) {
    onFocus === null || onFocus === void 0 || onFocus(e, valueIndex);
  };
  var onInternalMouseEnter = function onInternalMouseEnter2(e) {
    onMouseEnter(e, valueIndex);
  };
  var onKeyDown = function onKeyDown2(e) {
    if (!disabled && keyboard) {
      var offset = null;
      switch (e.which || e.keyCode) {
        case KeyCode.LEFT:
          offset = direction === "ltr" || direction === "btt" ? -1 : 1;
          break;
        case KeyCode.RIGHT:
          offset = direction === "ltr" || direction === "btt" ? 1 : -1;
          break;
        // Up is plus
        case KeyCode.UP:
          offset = direction !== "ttb" ? 1 : -1;
          break;
        // Down is minus
        case KeyCode.DOWN:
          offset = direction !== "ttb" ? -1 : 1;
          break;
        case KeyCode.HOME:
          offset = "min";
          break;
        case KeyCode.END:
          offset = "max";
          break;
        case KeyCode.PAGE_UP:
          offset = 2;
          break;
        case KeyCode.PAGE_DOWN:
          offset = -2;
          break;
        case KeyCode.BACKSPACE:
        case KeyCode.DELETE:
          onDelete === null || onDelete === void 0 || onDelete(valueIndex);
          break;
      }
      if (offset !== null) {
        e.preventDefault();
        onOffsetChange(offset, valueIndex);
      }
    }
  };
  var handleKeyUp = function handleKeyUp2(e) {
    switch (e.which || e.keyCode) {
      case KeyCode.LEFT:
      case KeyCode.RIGHT:
      case KeyCode.UP:
      case KeyCode.DOWN:
      case KeyCode.HOME:
      case KeyCode.END:
      case KeyCode.PAGE_UP:
      case KeyCode.PAGE_DOWN:
        onChangeComplete === null || onChangeComplete === void 0 || onChangeComplete();
        break;
    }
  };
  var positionStyle = getDirectionStyle(direction, value, min, max);
  var divProps = {};
  if (valueIndex !== null) {
    var _getIndex;
    divProps = {
      tabIndex: disabled ? null : getIndex(tabIndex, valueIndex),
      role: "slider",
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value,
      "aria-disabled": disabled,
      "aria-label": getIndex(ariaLabelForHandle, valueIndex),
      "aria-labelledby": getIndex(ariaLabelledByForHandle, valueIndex),
      "aria-required": getIndex(ariaRequired, valueIndex),
      "aria-valuetext": (_getIndex = getIndex(ariaValueTextFormatterForHandle, valueIndex)) === null || _getIndex === void 0 ? void 0 : _getIndex(value),
      "aria-orientation": direction === "ltr" || direction === "rtl" ? "horizontal" : "vertical",
      onMouseDown: onInternalStartMove,
      onTouchStart: onInternalStartMove,
      onFocus: onInternalFocus,
      onMouseEnter: onInternalMouseEnter,
      onKeyDown,
      onKeyUp: handleKeyUp
    };
  }
  var handleNode = /* @__PURE__ */ reactExports.createElement("div", _extends$2({
    ref,
    className: classNames(handlePrefixCls, _defineProperty(_defineProperty(_defineProperty({}, "".concat(handlePrefixCls, "-").concat(valueIndex + 1), valueIndex !== null && range), "".concat(handlePrefixCls, "-dragging"), dragging), "".concat(handlePrefixCls, "-dragging-delete"), draggingDelete), classNames$1.handle),
    style: _objectSpread2(_objectSpread2(_objectSpread2({}, positionStyle), style), styles.handle)
  }, divProps, restProps));
  if (render3) {
    handleNode = render3(handleNode, {
      index: valueIndex,
      prefixCls,
      value,
      dragging,
      draggingDelete
    });
  }
  return handleNode;
});
var _excluded$2 = ["prefixCls", "style", "onStartMove", "onOffsetChange", "values", "handleRender", "activeHandleRender", "draggingIndex", "draggingDelete", "onFocus"];
var Handles = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var prefixCls = props.prefixCls, style = props.style, onStartMove = props.onStartMove, onOffsetChange = props.onOffsetChange, values = props.values, handleRender = props.handleRender, activeHandleRender = props.activeHandleRender, draggingIndex = props.draggingIndex, draggingDelete = props.draggingDelete, onFocus = props.onFocus, restProps = _objectWithoutProperties(props, _excluded$2);
  var handlesRef = reactExports.useRef({});
  var _React$useState = reactExports.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), activeVisible = _React$useState2[0], setActiveVisible = _React$useState2[1];
  var _React$useState3 = reactExports.useState(-1), _React$useState4 = _slicedToArray(_React$useState3, 2), activeIndex = _React$useState4[0], setActiveIndex = _React$useState4[1];
  var onActive = function onActive2(index2) {
    setActiveIndex(index2);
    setActiveVisible(true);
  };
  var onHandleFocus = function onHandleFocus2(e, index2) {
    onActive(index2);
    onFocus === null || onFocus === void 0 || onFocus(e);
  };
  var onHandleMouseEnter = function onHandleMouseEnter2(e, index2) {
    onActive(index2);
  };
  reactExports.useImperativeHandle(ref, function() {
    return {
      focus: function focus(index2) {
        var _handlesRef$current$i;
        (_handlesRef$current$i = handlesRef.current[index2]) === null || _handlesRef$current$i === void 0 || _handlesRef$current$i.focus();
      },
      hideHelp: function hideHelp() {
        reactDomExports.flushSync(function() {
          setActiveVisible(false);
        });
      }
    };
  });
  var handleProps = _objectSpread2({
    prefixCls,
    onStartMove,
    onOffsetChange,
    render: handleRender,
    onFocus: onHandleFocus,
    onMouseEnter: onHandleMouseEnter
  }, restProps);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, values.map(function(value, index2) {
    var dragging = draggingIndex === index2;
    return /* @__PURE__ */ reactExports.createElement(Handle, _extends$2({
      ref: function ref2(node) {
        if (!node) {
          delete handlesRef.current[index2];
        } else {
          handlesRef.current[index2] = node;
        }
      },
      dragging,
      draggingDelete: dragging && draggingDelete,
      style: getIndex(style, index2),
      key: index2,
      value,
      valueIndex: index2
    }, handleProps));
  }), activeHandleRender && activeVisible && /* @__PURE__ */ reactExports.createElement(Handle, _extends$2({
    key: "a11y"
  }, handleProps, {
    value: values[activeIndex],
    valueIndex: null,
    dragging: draggingIndex !== -1,
    draggingDelete,
    render: activeHandleRender,
    style: {
      pointerEvents: "none"
    },
    tabIndex: null,
    "aria-hidden": true
  })));
});
var Mark = function Mark2(props) {
  var prefixCls = props.prefixCls, style = props.style, children = props.children, value = props.value, _onClick = props.onClick;
  var _React$useContext = reactExports.useContext(SliderContext), min = _React$useContext.min, max = _React$useContext.max, direction = _React$useContext.direction, includedStart = _React$useContext.includedStart, includedEnd = _React$useContext.includedEnd, included = _React$useContext.included;
  var textCls = "".concat(prefixCls, "-text");
  var positionStyle = getDirectionStyle(direction, value, min, max);
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: classNames(textCls, _defineProperty({}, "".concat(textCls, "-active"), included && includedStart <= value && value <= includedEnd)),
    style: _objectSpread2(_objectSpread2({}, positionStyle), style),
    onMouseDown: function onMouseDown(e) {
      e.stopPropagation();
    },
    onClick: function onClick() {
      _onClick(value);
    }
  }, children);
};
var Marks = function Marks2(props) {
  var prefixCls = props.prefixCls, marks = props.marks, onClick = props.onClick;
  var markPrefixCls = "".concat(prefixCls, "-mark");
  if (!marks.length) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: markPrefixCls
  }, marks.map(function(_ref) {
    var value = _ref.value, style = _ref.style, label = _ref.label;
    return /* @__PURE__ */ reactExports.createElement(Mark, {
      key: value,
      prefixCls: markPrefixCls,
      style,
      value,
      onClick
    }, label);
  }));
};
var Dot = function Dot2(props) {
  var prefixCls = props.prefixCls, value = props.value, style = props.style, activeStyle = props.activeStyle;
  var _React$useContext = reactExports.useContext(SliderContext), min = _React$useContext.min, max = _React$useContext.max, direction = _React$useContext.direction, included = _React$useContext.included, includedStart = _React$useContext.includedStart, includedEnd = _React$useContext.includedEnd;
  var dotClassName = "".concat(prefixCls, "-dot");
  var active = included && includedStart <= value && value <= includedEnd;
  var mergedStyle = _objectSpread2(_objectSpread2({}, getDirectionStyle(direction, value, min, max)), typeof style === "function" ? style(value) : style);
  if (active) {
    mergedStyle = _objectSpread2(_objectSpread2({}, mergedStyle), typeof activeStyle === "function" ? activeStyle(value) : activeStyle);
  }
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: classNames(dotClassName, _defineProperty({}, "".concat(dotClassName, "-active"), active)),
    style: mergedStyle
  });
};
var Steps = function Steps2(props) {
  var prefixCls = props.prefixCls, marks = props.marks, dots = props.dots, style = props.style, activeStyle = props.activeStyle;
  var _React$useContext = reactExports.useContext(SliderContext), min = _React$useContext.min, max = _React$useContext.max, step = _React$useContext.step;
  var stepDots = reactExports.useMemo(function() {
    var dotSet = /* @__PURE__ */ new Set();
    marks.forEach(function(mark) {
      dotSet.add(mark.value);
    });
    if (dots && step !== null) {
      var current = min;
      while (current <= max) {
        dotSet.add(current);
        current += step;
      }
    }
    return Array.from(dotSet);
  }, [min, max, step, dots, marks]);
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-step")
  }, stepDots.map(function(dotValue) {
    return /* @__PURE__ */ reactExports.createElement(Dot, {
      prefixCls,
      key: dotValue,
      value: dotValue,
      style,
      activeStyle
    });
  }));
};
var Track = function Track2(props) {
  var prefixCls = props.prefixCls, style = props.style, start = props.start, end = props.end, index2 = props.index, onStartMove = props.onStartMove, replaceCls = props.replaceCls;
  var _React$useContext = reactExports.useContext(SliderContext), direction = _React$useContext.direction, min = _React$useContext.min, max = _React$useContext.max, disabled = _React$useContext.disabled, range = _React$useContext.range, classNames$1 = _React$useContext.classNames;
  var trackPrefixCls = "".concat(prefixCls, "-track");
  var offsetStart = getOffset(start, min, max);
  var offsetEnd = getOffset(end, min, max);
  var onInternalStartMove = function onInternalStartMove2(e) {
    if (!disabled && onStartMove) {
      onStartMove(e, -1);
    }
  };
  var positionStyle = {};
  switch (direction) {
    case "rtl":
      positionStyle.right = "".concat(offsetStart * 100, "%");
      positionStyle.width = "".concat(offsetEnd * 100 - offsetStart * 100, "%");
      break;
    case "btt":
      positionStyle.bottom = "".concat(offsetStart * 100, "%");
      positionStyle.height = "".concat(offsetEnd * 100 - offsetStart * 100, "%");
      break;
    case "ttb":
      positionStyle.top = "".concat(offsetStart * 100, "%");
      positionStyle.height = "".concat(offsetEnd * 100 - offsetStart * 100, "%");
      break;
    default:
      positionStyle.left = "".concat(offsetStart * 100, "%");
      positionStyle.width = "".concat(offsetEnd * 100 - offsetStart * 100, "%");
  }
  var className = replaceCls || classNames(trackPrefixCls, _defineProperty(_defineProperty({}, "".concat(trackPrefixCls, "-").concat(index2 + 1), index2 !== null && range), "".concat(prefixCls, "-track-draggable"), onStartMove), classNames$1.track);
  return /* @__PURE__ */ reactExports.createElement("div", {
    className,
    style: _objectSpread2(_objectSpread2({}, positionStyle), style),
    onMouseDown: onInternalStartMove,
    onTouchStart: onInternalStartMove
  });
};
var Tracks = function Tracks2(props) {
  var prefixCls = props.prefixCls, style = props.style, values = props.values, startPoint = props.startPoint, onStartMove = props.onStartMove;
  var _React$useContext = reactExports.useContext(SliderContext), included = _React$useContext.included, range = _React$useContext.range, min = _React$useContext.min, styles = _React$useContext.styles, classNames$1 = _React$useContext.classNames;
  var trackList = reactExports.useMemo(function() {
    if (!range) {
      if (values.length === 0) {
        return [];
      }
      var startValue = startPoint !== null && startPoint !== void 0 ? startPoint : min;
      var endValue = values[0];
      return [{
        start: Math.min(startValue, endValue),
        end: Math.max(startValue, endValue)
      }];
    }
    var list = [];
    for (var i = 0; i < values.length - 1; i += 1) {
      list.push({
        start: values[i],
        end: values[i + 1]
      });
    }
    return list;
  }, [values, range, startPoint, min]);
  if (!included) {
    return null;
  }
  var tracksNode = trackList !== null && trackList !== void 0 && trackList.length && (classNames$1.tracks || styles.tracks) ? /* @__PURE__ */ reactExports.createElement(Track, {
    index: null,
    prefixCls,
    start: trackList[0].start,
    end: trackList[trackList.length - 1].end,
    replaceCls: classNames(classNames$1.tracks, "".concat(prefixCls, "-tracks")),
    style: styles.tracks
  }) : null;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, tracksNode, trackList.map(function(_ref, index2) {
    var start = _ref.start, end = _ref.end;
    return /* @__PURE__ */ reactExports.createElement(Track, {
      index: index2,
      prefixCls,
      style: _objectSpread2(_objectSpread2({}, getIndex(style, index2)), styles.track),
      start,
      end,
      key: index2,
      onStartMove
    });
  }));
};
var REMOVE_DIST = 130;
function getPosition(e) {
  var obj = "targetTouches" in e ? e.targetTouches[0] : e;
  return {
    pageX: obj.pageX,
    pageY: obj.pageY
  };
}
function useDrag(containerRef, direction, rawValues, min, max, formatValue2, triggerChange, finishChange, offsetValues, editable, minCount) {
  var _React$useState = reactExports.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), draggingValue = _React$useState2[0], setDraggingValue = _React$useState2[1];
  var _React$useState3 = reactExports.useState(-1), _React$useState4 = _slicedToArray(_React$useState3, 2), draggingIndex = _React$useState4[0], setDraggingIndex = _React$useState4[1];
  var _React$useState5 = reactExports.useState(false), _React$useState6 = _slicedToArray(_React$useState5, 2), draggingDelete = _React$useState6[0], setDraggingDelete = _React$useState6[1];
  var _React$useState7 = reactExports.useState(rawValues), _React$useState8 = _slicedToArray(_React$useState7, 2), cacheValues = _React$useState8[0], setCacheValues = _React$useState8[1];
  var _React$useState9 = reactExports.useState(rawValues), _React$useState10 = _slicedToArray(_React$useState9, 2), originValues = _React$useState10[0], setOriginValues = _React$useState10[1];
  var mouseMoveEventRef = reactExports.useRef(null);
  var mouseUpEventRef = reactExports.useRef(null);
  var touchEventTargetRef = reactExports.useRef(null);
  var _React$useContext = reactExports.useContext(UnstableContext), onDragStart = _React$useContext.onDragStart, onDragChange = _React$useContext.onDragChange;
  useLayoutEffect(function() {
    if (draggingIndex === -1) {
      setCacheValues(rawValues);
    }
  }, [rawValues, draggingIndex]);
  reactExports.useEffect(function() {
    return function() {
      document.removeEventListener("mousemove", mouseMoveEventRef.current);
      document.removeEventListener("mouseup", mouseUpEventRef.current);
      if (touchEventTargetRef.current) {
        touchEventTargetRef.current.removeEventListener("touchmove", mouseMoveEventRef.current);
        touchEventTargetRef.current.removeEventListener("touchend", mouseUpEventRef.current);
      }
    };
  }, []);
  var flushValues = function flushValues2(nextValues, nextValue, deleteMark) {
    if (nextValue !== void 0) {
      setDraggingValue(nextValue);
    }
    setCacheValues(nextValues);
    var changeValues = nextValues;
    if (deleteMark) {
      changeValues = nextValues.filter(function(_, i) {
        return i !== draggingIndex;
      });
    }
    triggerChange(changeValues);
    if (onDragChange) {
      onDragChange({
        rawValues: nextValues,
        deleteIndex: deleteMark ? draggingIndex : -1,
        draggingIndex,
        draggingValue: nextValue
      });
    }
  };
  var updateCacheValue = useEvent$1(function(valueIndex, offsetPercent, deleteMark) {
    if (valueIndex === -1) {
      var startValue = originValues[0];
      var endValue = originValues[originValues.length - 1];
      var maxStartOffset = min - startValue;
      var maxEndOffset = max - endValue;
      var offset = offsetPercent * (max - min);
      offset = Math.max(offset, maxStartOffset);
      offset = Math.min(offset, maxEndOffset);
      var formatStartValue = formatValue2(startValue + offset);
      offset = formatStartValue - startValue;
      var cloneCacheValues = originValues.map(function(val) {
        return val + offset;
      });
      flushValues(cloneCacheValues);
    } else {
      var offsetDist = (max - min) * offsetPercent;
      var cloneValues = _toConsumableArray(cacheValues);
      cloneValues[valueIndex] = originValues[valueIndex];
      var next = offsetValues(cloneValues, offsetDist, valueIndex, "dist");
      flushValues(next.values, next.value, deleteMark);
    }
  });
  var onStartMove = function onStartMove2(e, valueIndex, startValues) {
    e.stopPropagation();
    var initialValues = startValues || rawValues;
    var originValue = initialValues[valueIndex];
    setDraggingIndex(valueIndex);
    setDraggingValue(originValue);
    setOriginValues(initialValues);
    setCacheValues(initialValues);
    setDraggingDelete(false);
    var _getPosition = getPosition(e), startX = _getPosition.pageX, startY = _getPosition.pageY;
    var deleteMark = false;
    if (onDragStart) {
      onDragStart({
        rawValues: initialValues,
        draggingIndex: valueIndex,
        draggingValue: originValue
      });
    }
    var onMouseMove = function onMouseMove2(event) {
      event.preventDefault();
      var _getPosition2 = getPosition(event), moveX = _getPosition2.pageX, moveY = _getPosition2.pageY;
      var offsetX = moveX - startX;
      var offsetY = moveY - startY;
      var _containerRef$current = containerRef.current.getBoundingClientRect(), width = _containerRef$current.width, height = _containerRef$current.height;
      var offSetPercent;
      var removeDist;
      switch (direction) {
        case "btt":
          offSetPercent = -offsetY / height;
          removeDist = offsetX;
          break;
        case "ttb":
          offSetPercent = offsetY / height;
          removeDist = offsetX;
          break;
        case "rtl":
          offSetPercent = -offsetX / width;
          removeDist = offsetY;
          break;
        default:
          offSetPercent = offsetX / width;
          removeDist = offsetY;
      }
      deleteMark = editable ? Math.abs(removeDist) > REMOVE_DIST && minCount < cacheValues.length : false;
      setDraggingDelete(deleteMark);
      updateCacheValue(valueIndex, offSetPercent, deleteMark);
    };
    var onMouseUp = function onMouseUp2(event) {
      event.preventDefault();
      document.removeEventListener("mouseup", onMouseUp2);
      document.removeEventListener("mousemove", onMouseMove);
      if (touchEventTargetRef.current) {
        touchEventTargetRef.current.removeEventListener("touchmove", mouseMoveEventRef.current);
        touchEventTargetRef.current.removeEventListener("touchend", mouseUpEventRef.current);
      }
      mouseMoveEventRef.current = null;
      mouseUpEventRef.current = null;
      touchEventTargetRef.current = null;
      finishChange(deleteMark);
      setDraggingIndex(-1);
      setDraggingDelete(false);
    };
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
    e.currentTarget.addEventListener("touchend", onMouseUp);
    e.currentTarget.addEventListener("touchmove", onMouseMove);
    mouseMoveEventRef.current = onMouseMove;
    mouseUpEventRef.current = onMouseUp;
    touchEventTargetRef.current = e.currentTarget;
  };
  var returnValues = reactExports.useMemo(function() {
    var sourceValues = _toConsumableArray(rawValues).sort(function(a, b) {
      return a - b;
    });
    var targetValues = _toConsumableArray(cacheValues).sort(function(a, b) {
      return a - b;
    });
    var counts = {};
    targetValues.forEach(function(val) {
      counts[val] = (counts[val] || 0) + 1;
    });
    sourceValues.forEach(function(val) {
      counts[val] = (counts[val] || 0) - 1;
    });
    var maxDiffCount = editable ? 1 : 0;
    var diffCount = Object.values(counts).reduce(function(prev, next) {
      return prev + Math.abs(next);
    }, 0);
    return diffCount <= maxDiffCount ? cacheValues : rawValues;
  }, [rawValues, cacheValues, editable]);
  return [draggingIndex, draggingValue, draggingDelete, returnValues, onStartMove];
}
function useOffset(min, max, step, markList, allowCross, pushable) {
  var formatRangeValue = reactExports.useCallback(function(val) {
    return Math.max(min, Math.min(max, val));
  }, [min, max]);
  var formatStepValue = reactExports.useCallback(function(val) {
    if (step !== null) {
      var stepValue = min + Math.round((formatRangeValue(val) - min) / step) * step;
      var getDecimal = function getDecimal2(num) {
        return (String(num).split(".")[1] || "").length;
      };
      var maxDecimal = Math.max(getDecimal(step), getDecimal(max), getDecimal(min));
      var fixedValue = Number(stepValue.toFixed(maxDecimal));
      return min <= fixedValue && fixedValue <= max ? fixedValue : null;
    }
    return null;
  }, [step, min, max, formatRangeValue]);
  var formatValue2 = reactExports.useCallback(function(val) {
    var formatNextValue = formatRangeValue(val);
    var alignValues = markList.map(function(mark) {
      return mark.value;
    });
    if (step !== null) {
      alignValues.push(formatStepValue(val));
    }
    alignValues.push(min, max);
    var closeValue = alignValues[0];
    var closeDist = max - min;
    alignValues.forEach(function(alignValue) {
      var dist = Math.abs(formatNextValue - alignValue);
      if (dist <= closeDist) {
        closeValue = alignValue;
        closeDist = dist;
      }
    });
    return closeValue;
  }, [min, max, markList, step, formatRangeValue, formatStepValue]);
  var offsetValue = function offsetValue2(values, offset, valueIndex) {
    var mode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "unit";
    if (typeof offset === "number") {
      var nextValue;
      var originValue = values[valueIndex];
      var targetDistValue = originValue + offset;
      var potentialValues = [];
      markList.forEach(function(mark) {
        potentialValues.push(mark.value);
      });
      potentialValues.push(min, max);
      potentialValues.push(formatStepValue(originValue));
      var sign = offset > 0 ? 1 : -1;
      if (mode === "unit") {
        potentialValues.push(formatStepValue(originValue + sign * step));
      } else {
        potentialValues.push(formatStepValue(targetDistValue));
      }
      potentialValues = potentialValues.filter(function(val) {
        return val !== null;
      }).filter(function(val) {
        return offset < 0 ? val <= originValue : val >= originValue;
      });
      if (mode === "unit") {
        potentialValues = potentialValues.filter(function(val) {
          return val !== originValue;
        });
      }
      var compareValue = mode === "unit" ? originValue : targetDistValue;
      nextValue = potentialValues[0];
      var valueDist = Math.abs(nextValue - compareValue);
      potentialValues.forEach(function(potentialValue) {
        var dist = Math.abs(potentialValue - compareValue);
        if (dist < valueDist) {
          nextValue = potentialValue;
          valueDist = dist;
        }
      });
      if (nextValue === void 0) {
        return offset < 0 ? min : max;
      }
      if (mode === "dist") {
        return nextValue;
      }
      if (Math.abs(offset) > 1) {
        var cloneValues = _toConsumableArray(values);
        cloneValues[valueIndex] = nextValue;
        return offsetValue2(cloneValues, offset - sign, valueIndex, mode);
      }
      return nextValue;
    } else if (offset === "min") {
      return min;
    } else if (offset === "max") {
      return max;
    }
  };
  var offsetChangedValue = function offsetChangedValue2(values, offset, valueIndex) {
    var mode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "unit";
    var originValue = values[valueIndex];
    var nextValue = offsetValue(values, offset, valueIndex, mode);
    return {
      value: nextValue,
      changed: nextValue !== originValue
    };
  };
  var needPush = function needPush2(dist) {
    return pushable === null && dist === 0 || typeof pushable === "number" && dist < pushable;
  };
  var offsetValues = function offsetValues2(values, offset, valueIndex) {
    var mode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "unit";
    var nextValues = values.map(formatValue2);
    var originValue = nextValues[valueIndex];
    var nextValue = offsetValue(nextValues, offset, valueIndex, mode);
    nextValues[valueIndex] = nextValue;
    if (allowCross === false) {
      var pushNum = pushable || 0;
      if (valueIndex > 0 && nextValues[valueIndex - 1] !== originValue) {
        nextValues[valueIndex] = Math.max(nextValues[valueIndex], nextValues[valueIndex - 1] + pushNum);
      }
      if (valueIndex < nextValues.length - 1 && nextValues[valueIndex + 1] !== originValue) {
        nextValues[valueIndex] = Math.min(nextValues[valueIndex], nextValues[valueIndex + 1] - pushNum);
      }
    } else if (typeof pushable === "number" || pushable === null) {
      for (var i = valueIndex + 1; i < nextValues.length; i += 1) {
        var changed = true;
        while (needPush(nextValues[i] - nextValues[i - 1]) && changed) {
          var _offsetChangedValue = offsetChangedValue(nextValues, 1, i);
          nextValues[i] = _offsetChangedValue.value;
          changed = _offsetChangedValue.changed;
        }
      }
      for (var _i = valueIndex; _i > 0; _i -= 1) {
        var _changed = true;
        while (needPush(nextValues[_i] - nextValues[_i - 1]) && _changed) {
          var _offsetChangedValue2 = offsetChangedValue(nextValues, -1, _i - 1);
          nextValues[_i - 1] = _offsetChangedValue2.value;
          _changed = _offsetChangedValue2.changed;
        }
      }
      for (var _i2 = nextValues.length - 1; _i2 > 0; _i2 -= 1) {
        var _changed2 = true;
        while (needPush(nextValues[_i2] - nextValues[_i2 - 1]) && _changed2) {
          var _offsetChangedValue3 = offsetChangedValue(nextValues, -1, _i2 - 1);
          nextValues[_i2 - 1] = _offsetChangedValue3.value;
          _changed2 = _offsetChangedValue3.changed;
        }
      }
      for (var _i3 = 0; _i3 < nextValues.length - 1; _i3 += 1) {
        var _changed3 = true;
        while (needPush(nextValues[_i3 + 1] - nextValues[_i3]) && _changed3) {
          var _offsetChangedValue4 = offsetChangedValue(nextValues, 1, _i3 + 1);
          nextValues[_i3 + 1] = _offsetChangedValue4.value;
          _changed3 = _offsetChangedValue4.changed;
        }
      }
    }
    return {
      value: nextValues[valueIndex],
      values: nextValues
    };
  };
  return [formatValue2, offsetValues];
}
function useRange(range) {
  return reactExports.useMemo(function() {
    if (range === true || !range) {
      return [!!range, false, false, 0];
    }
    var editable = range.editable, draggableTrack = range.draggableTrack, minCount = range.minCount, maxCount = range.maxCount;
    return [true, editable, !editable && draggableTrack, minCount || 0, maxCount];
  }, [range]);
}
var Slider$1 = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-slider" : _props$prefixCls, className = props.className, style = props.style, classNames$1 = props.classNames, styles = props.styles, id = props.id, _props$disabled = props.disabled, disabled = _props$disabled === void 0 ? false : _props$disabled, _props$keyboard = props.keyboard, keyboard = _props$keyboard === void 0 ? true : _props$keyboard, autoFocus = props.autoFocus, onFocus = props.onFocus, onBlur = props.onBlur, _props$min = props.min, min = _props$min === void 0 ? 0 : _props$min, _props$max = props.max, max = _props$max === void 0 ? 100 : _props$max, _props$step = props.step, step = _props$step === void 0 ? 1 : _props$step, value = props.value, defaultValue2 = props.defaultValue, range = props.range, count = props.count, onChange2 = props.onChange, onBeforeChange = props.onBeforeChange, onAfterChange = props.onAfterChange, onChangeComplete = props.onChangeComplete, _props$allowCross = props.allowCross, allowCross = _props$allowCross === void 0 ? true : _props$allowCross, _props$pushable = props.pushable, pushable = _props$pushable === void 0 ? false : _props$pushable, reverse = props.reverse, vertical = props.vertical, _props$included = props.included, included = _props$included === void 0 ? true : _props$included, startPoint = props.startPoint, trackStyle = props.trackStyle, handleStyle = props.handleStyle, railStyle = props.railStyle, dotStyle = props.dotStyle, activeDotStyle = props.activeDotStyle, marks = props.marks, dots = props.dots, handleRender = props.handleRender, activeHandleRender = props.activeHandleRender, track = props.track, _props$tabIndex = props.tabIndex, tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex, ariaLabelForHandle = props.ariaLabelForHandle, ariaLabelledByForHandle = props.ariaLabelledByForHandle, ariaRequired = props.ariaRequired, ariaValueTextFormatterForHandle = props.ariaValueTextFormatterForHandle;
  var handlesRef = reactExports.useRef(null);
  var containerRef = reactExports.useRef(null);
  var direction = reactExports.useMemo(function() {
    if (vertical) {
      return reverse ? "ttb" : "btt";
    }
    return reverse ? "rtl" : "ltr";
  }, [reverse, vertical]);
  var _useRange = useRange(range), _useRange2 = _slicedToArray(_useRange, 5), rangeEnabled = _useRange2[0], rangeEditable = _useRange2[1], rangeDraggableTrack = _useRange2[2], minCount = _useRange2[3], maxCount = _useRange2[4];
  var mergedMin = reactExports.useMemo(function() {
    return isFinite(min) ? min : 0;
  }, [min]);
  var mergedMax = reactExports.useMemo(function() {
    return isFinite(max) ? max : 100;
  }, [max]);
  var mergedStep = reactExports.useMemo(function() {
    return step !== null && step <= 0 ? 1 : step;
  }, [step]);
  var mergedPush = reactExports.useMemo(function() {
    if (typeof pushable === "boolean") {
      return pushable ? mergedStep : false;
    }
    return pushable >= 0 ? pushable : false;
  }, [pushable, mergedStep]);
  var markList = reactExports.useMemo(function() {
    return Object.keys(marks || {}).map(function(key2) {
      var mark = marks[key2];
      var markObj = {
        value: Number(key2)
      };
      if (mark && _typeof(mark) === "object" && !/* @__PURE__ */ reactExports.isValidElement(mark) && ("label" in mark || "style" in mark)) {
        markObj.style = mark.style;
        markObj.label = mark.label;
      } else {
        markObj.label = mark;
      }
      return markObj;
    }).filter(function(_ref) {
      var label = _ref.label;
      return label || typeof label === "number";
    }).sort(function(a, b) {
      return a.value - b.value;
    });
  }, [marks]);
  var _useOffset = useOffset(mergedMin, mergedMax, mergedStep, markList, allowCross, mergedPush), _useOffset2 = _slicedToArray(_useOffset, 2), formatValue2 = _useOffset2[0], offsetValues = _useOffset2[1];
  var _useMergedState = useMergedState(defaultValue2, {
    value
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedValue = _useMergedState2[0], setValue = _useMergedState2[1];
  var rawValues = reactExports.useMemo(function() {
    var valueList = mergedValue === null || mergedValue === void 0 ? [] : Array.isArray(mergedValue) ? mergedValue : [mergedValue];
    var _valueList = _slicedToArray(valueList, 1), _valueList$ = _valueList[0], val0 = _valueList$ === void 0 ? mergedMin : _valueList$;
    var returnValues = mergedValue === null ? [] : [val0];
    if (rangeEnabled) {
      returnValues = _toConsumableArray(valueList);
      if (count || mergedValue === void 0) {
        var pointCount = count >= 0 ? count + 1 : 2;
        returnValues = returnValues.slice(0, pointCount);
        while (returnValues.length < pointCount) {
          var _returnValues;
          returnValues.push((_returnValues = returnValues[returnValues.length - 1]) !== null && _returnValues !== void 0 ? _returnValues : mergedMin);
        }
      }
      returnValues.sort(function(a, b) {
        return a - b;
      });
    }
    returnValues.forEach(function(val, index2) {
      returnValues[index2] = formatValue2(val);
    });
    return returnValues;
  }, [mergedValue, rangeEnabled, mergedMin, count, formatValue2]);
  var getTriggerValue = function getTriggerValue2(triggerValues) {
    return rangeEnabled ? triggerValues : triggerValues[0];
  };
  var triggerChange = useEvent$1(function(nextValues) {
    var cloneNextValues = _toConsumableArray(nextValues).sort(function(a, b) {
      return a - b;
    });
    if (onChange2 && !isEqual(cloneNextValues, rawValues, true)) {
      onChange2(getTriggerValue(cloneNextValues));
    }
    setValue(cloneNextValues);
  });
  var finishChange = useEvent$1(function(draggingDelete2) {
    if (draggingDelete2) {
      handlesRef.current.hideHelp();
    }
    var finishValue = getTriggerValue(rawValues);
    onAfterChange === null || onAfterChange === void 0 || onAfterChange(finishValue);
    warningOnce(!onAfterChange, "[rc-slider] `onAfterChange` is deprecated. Please use `onChangeComplete` instead.");
    onChangeComplete === null || onChangeComplete === void 0 || onChangeComplete(finishValue);
  });
  var onDelete = function onDelete2(index2) {
    if (disabled || !rangeEditable || rawValues.length <= minCount) {
      return;
    }
    var cloneNextValues = _toConsumableArray(rawValues);
    cloneNextValues.splice(index2, 1);
    onBeforeChange === null || onBeforeChange === void 0 || onBeforeChange(getTriggerValue(cloneNextValues));
    triggerChange(cloneNextValues);
    var nextFocusIndex = Math.max(0, index2 - 1);
    handlesRef.current.hideHelp();
    handlesRef.current.focus(nextFocusIndex);
  };
  var _useDrag = useDrag(containerRef, direction, rawValues, mergedMin, mergedMax, formatValue2, triggerChange, finishChange, offsetValues, rangeEditable, minCount), _useDrag2 = _slicedToArray(_useDrag, 5), draggingIndex = _useDrag2[0], draggingValue = _useDrag2[1], draggingDelete = _useDrag2[2], cacheValues = _useDrag2[3], onStartDrag = _useDrag2[4];
  var changeToCloseValue = function changeToCloseValue2(newValue, e) {
    if (!disabled) {
      var cloneNextValues = _toConsumableArray(rawValues);
      var valueIndex = 0;
      var valueBeforeIndex = 0;
      var valueDist = mergedMax - mergedMin;
      rawValues.forEach(function(val, index2) {
        var dist = Math.abs(newValue - val);
        if (dist <= valueDist) {
          valueDist = dist;
          valueIndex = index2;
        }
        if (val < newValue) {
          valueBeforeIndex = index2;
        }
      });
      var focusIndex = valueIndex;
      if (rangeEditable && valueDist !== 0 && (!maxCount || rawValues.length < maxCount)) {
        cloneNextValues.splice(valueBeforeIndex + 1, 0, newValue);
        focusIndex = valueBeforeIndex + 1;
      } else {
        cloneNextValues[valueIndex] = newValue;
      }
      if (rangeEnabled && !rawValues.length && count === void 0) {
        cloneNextValues.push(newValue);
      }
      var nextValue = getTriggerValue(cloneNextValues);
      onBeforeChange === null || onBeforeChange === void 0 || onBeforeChange(nextValue);
      triggerChange(cloneNextValues);
      if (e) {
        var _document$activeEleme, _document$activeEleme2;
        (_document$activeEleme = document.activeElement) === null || _document$activeEleme === void 0 || (_document$activeEleme2 = _document$activeEleme.blur) === null || _document$activeEleme2 === void 0 || _document$activeEleme2.call(_document$activeEleme);
        handlesRef.current.focus(focusIndex);
        onStartDrag(e, focusIndex, cloneNextValues);
      } else {
        onAfterChange === null || onAfterChange === void 0 || onAfterChange(nextValue);
        warningOnce(!onAfterChange, "[rc-slider] `onAfterChange` is deprecated. Please use `onChangeComplete` instead.");
        onChangeComplete === null || onChangeComplete === void 0 || onChangeComplete(nextValue);
      }
    }
  };
  var onSliderMouseDown = function onSliderMouseDown2(e) {
    e.preventDefault();
    var _containerRef$current = containerRef.current.getBoundingClientRect(), width = _containerRef$current.width, height = _containerRef$current.height, left = _containerRef$current.left, top = _containerRef$current.top, bottom = _containerRef$current.bottom, right = _containerRef$current.right;
    var clientX = e.clientX, clientY = e.clientY;
    var percent;
    switch (direction) {
      case "btt":
        percent = (bottom - clientY) / height;
        break;
      case "ttb":
        percent = (clientY - top) / height;
        break;
      case "rtl":
        percent = (right - clientX) / width;
        break;
      default:
        percent = (clientX - left) / width;
    }
    var nextValue = mergedMin + percent * (mergedMax - mergedMin);
    changeToCloseValue(formatValue2(nextValue), e);
  };
  var _React$useState = reactExports.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), keyboardValue = _React$useState2[0], setKeyboardValue = _React$useState2[1];
  var onHandleOffsetChange = function onHandleOffsetChange2(offset, valueIndex) {
    if (!disabled) {
      var next = offsetValues(rawValues, offset, valueIndex);
      onBeforeChange === null || onBeforeChange === void 0 || onBeforeChange(getTriggerValue(rawValues));
      triggerChange(next.values);
      setKeyboardValue(next.value);
    }
  };
  reactExports.useEffect(function() {
    if (keyboardValue !== null) {
      var valueIndex = rawValues.indexOf(keyboardValue);
      if (valueIndex >= 0) {
        handlesRef.current.focus(valueIndex);
      }
    }
    setKeyboardValue(null);
  }, [keyboardValue]);
  var mergedDraggableTrack = reactExports.useMemo(function() {
    if (rangeDraggableTrack && mergedStep === null) {
      return false;
    }
    return rangeDraggableTrack;
  }, [rangeDraggableTrack, mergedStep]);
  var onStartMove = useEvent$1(function(e, valueIndex) {
    onStartDrag(e, valueIndex);
    onBeforeChange === null || onBeforeChange === void 0 || onBeforeChange(getTriggerValue(rawValues));
  });
  var dragging = draggingIndex !== -1;
  reactExports.useEffect(function() {
    if (!dragging) {
      var valueIndex = rawValues.lastIndexOf(draggingValue);
      handlesRef.current.focus(valueIndex);
    }
  }, [dragging]);
  var sortedCacheValues = reactExports.useMemo(function() {
    return _toConsumableArray(cacheValues).sort(function(a, b) {
      return a - b;
    });
  }, [cacheValues]);
  var _React$useMemo = reactExports.useMemo(function() {
    if (!rangeEnabled) {
      return [mergedMin, sortedCacheValues[0]];
    }
    return [sortedCacheValues[0], sortedCacheValues[sortedCacheValues.length - 1]];
  }, [sortedCacheValues, rangeEnabled, mergedMin]), _React$useMemo2 = _slicedToArray(_React$useMemo, 2), includedStart = _React$useMemo2[0], includedEnd = _React$useMemo2[1];
  reactExports.useImperativeHandle(ref, function() {
    return {
      focus: function focus() {
        handlesRef.current.focus(0);
      },
      blur: function blur() {
        var _containerRef$current2;
        var _document = document, activeElement = _document.activeElement;
        if ((_containerRef$current2 = containerRef.current) !== null && _containerRef$current2 !== void 0 && _containerRef$current2.contains(activeElement)) {
          activeElement === null || activeElement === void 0 || activeElement.blur();
        }
      }
    };
  });
  reactExports.useEffect(function() {
    if (autoFocus) {
      handlesRef.current.focus(0);
    }
  }, []);
  var context = reactExports.useMemo(function() {
    return {
      min: mergedMin,
      max: mergedMax,
      direction,
      disabled,
      keyboard,
      step: mergedStep,
      included,
      includedStart,
      includedEnd,
      range: rangeEnabled,
      tabIndex,
      ariaLabelForHandle,
      ariaLabelledByForHandle,
      ariaRequired,
      ariaValueTextFormatterForHandle,
      styles: styles || {},
      classNames: classNames$1 || {}
    };
  }, [mergedMin, mergedMax, direction, disabled, keyboard, mergedStep, included, includedStart, includedEnd, rangeEnabled, tabIndex, ariaLabelForHandle, ariaLabelledByForHandle, ariaRequired, ariaValueTextFormatterForHandle, styles, classNames$1]);
  return /* @__PURE__ */ reactExports.createElement(SliderContext.Provider, {
    value: context
  }, /* @__PURE__ */ reactExports.createElement("div", {
    ref: containerRef,
    className: classNames(prefixCls, className, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-disabled"), disabled), "".concat(prefixCls, "-vertical"), vertical), "".concat(prefixCls, "-horizontal"), !vertical), "".concat(prefixCls, "-with-marks"), markList.length)),
    style,
    onMouseDown: onSliderMouseDown,
    id
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames("".concat(prefixCls, "-rail"), classNames$1 === null || classNames$1 === void 0 ? void 0 : classNames$1.rail),
    style: _objectSpread2(_objectSpread2({}, railStyle), styles === null || styles === void 0 ? void 0 : styles.rail)
  }), track !== false && /* @__PURE__ */ reactExports.createElement(Tracks, {
    prefixCls,
    style: trackStyle,
    values: rawValues,
    startPoint,
    onStartMove: mergedDraggableTrack ? onStartMove : void 0
  }), /* @__PURE__ */ reactExports.createElement(Steps, {
    prefixCls,
    marks: markList,
    dots,
    style: dotStyle,
    activeStyle: activeDotStyle
  }), /* @__PURE__ */ reactExports.createElement(Handles, {
    ref: handlesRef,
    prefixCls,
    style: handleStyle,
    values: cacheValues,
    draggingIndex,
    draggingDelete,
    onStartMove,
    onOffsetChange: onHandleOffsetChange,
    onFocus,
    onBlur,
    handleRender,
    activeHandleRender,
    onChangeComplete: finishChange,
    onDelete: rangeEditable ? onDelete : void 0
  }), /* @__PURE__ */ reactExports.createElement(Marks, {
    prefixCls,
    marks: markList,
    onClick: changeToCloseValue
  })));
});
const SliderInternalContext = /* @__PURE__ */ reactExports.createContext({});
const SliderTooltip = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    open,
    draggingDelete,
    value
  } = props;
  const innerRef = reactExports.useRef(null);
  const mergedOpen = open && !draggingDelete;
  const rafRef = reactExports.useRef(null);
  function cancelKeepAlign() {
    wrapperRaf.cancel(rafRef.current);
    rafRef.current = null;
  }
  function keepAlign() {
    rafRef.current = wrapperRaf(() => {
      var _a;
      (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.forceAlign();
      rafRef.current = null;
    });
  }
  reactExports.useEffect(() => {
    if (mergedOpen) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }
    return cancelKeepAlign;
  }, [mergedOpen, props.title, value]);
  return /* @__PURE__ */ reactExports.createElement(Tooltip, Object.assign({
    ref: composeRef(innerRef, ref)
  }, props, {
    open: mergedOpen
  }));
});
const genBaseStyle$2 = (token) => {
  const {
    componentCls,
    antCls,
    controlSize,
    dotSize,
    marginFull,
    marginPart,
    colorFillContentHover,
    handleColorDisabled,
    calc,
    handleSize,
    handleSizeHover,
    handleActiveColor,
    handleActiveOutlineColor,
    handleLineWidth,
    handleLineWidthHover,
    motionDurationMid
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      position: "relative",
      height: controlSize,
      margin: `${unit(marginPart)} ${unit(marginFull)}`,
      padding: 0,
      cursor: "pointer",
      touchAction: "none",
      "&-vertical": {
        margin: `${unit(marginFull)} ${unit(marginPart)}`
      },
      [`${componentCls}-rail`]: {
        position: "absolute",
        backgroundColor: token.railBg,
        borderRadius: token.borderRadiusXS,
        transition: `background-color ${motionDurationMid}`
      },
      [`${componentCls}-track,${componentCls}-tracks`]: {
        position: "absolute",
        transition: `background-color ${motionDurationMid}`
      },
      [`${componentCls}-track`]: {
        backgroundColor: token.trackBg,
        borderRadius: token.borderRadiusXS
      },
      [`${componentCls}-track-draggable`]: {
        boxSizing: "content-box",
        backgroundClip: "content-box",
        border: "solid rgba(0,0,0,0)"
      },
      "&:hover": {
        [`${componentCls}-rail`]: {
          backgroundColor: token.railHoverBg
        },
        [`${componentCls}-track`]: {
          backgroundColor: token.trackHoverBg
        },
        [`${componentCls}-dot`]: {
          borderColor: colorFillContentHover
        },
        [`${componentCls}-handle::after`]: {
          boxShadow: `0 0 0 ${unit(handleLineWidth)} ${token.colorPrimaryBorderHover}`
        },
        [`${componentCls}-dot-active`]: {
          borderColor: token.dotActiveBorderColor
        }
      },
      [`${componentCls}-handle`]: {
        position: "absolute",
        width: handleSize,
        height: handleSize,
        outline: "none",
        userSelect: "none",
        // Dragging status
        "&-dragging-delete": {
          opacity: 0
        },
        // 扩大选区
        "&::before": {
          content: '""',
          position: "absolute",
          insetInlineStart: calc(handleLineWidth).mul(-1).equal(),
          insetBlockStart: calc(handleLineWidth).mul(-1).equal(),
          width: calc(handleSize).add(calc(handleLineWidth).mul(2)).equal(),
          height: calc(handleSize).add(calc(handleLineWidth).mul(2)).equal(),
          backgroundColor: "transparent"
        },
        "&::after": {
          content: '""',
          position: "absolute",
          insetBlockStart: 0,
          insetInlineStart: 0,
          width: handleSize,
          height: handleSize,
          backgroundColor: token.colorBgElevated,
          boxShadow: `0 0 0 ${unit(handleLineWidth)} ${token.handleColor}`,
          outline: `0px solid transparent`,
          borderRadius: "50%",
          cursor: "pointer",
          transition: `
            inset-inline-start ${motionDurationMid},
            inset-block-start ${motionDurationMid},
            width ${motionDurationMid},
            height ${motionDurationMid},
            box-shadow ${motionDurationMid},
            outline ${motionDurationMid}
          `
        },
        "&:hover, &:active, &:focus": {
          "&::before": {
            insetInlineStart: calc(handleSizeHover).sub(handleSize).div(2).add(handleLineWidthHover).mul(-1).equal(),
            insetBlockStart: calc(handleSizeHover).sub(handleSize).div(2).add(handleLineWidthHover).mul(-1).equal(),
            width: calc(handleSizeHover).add(calc(handleLineWidthHover).mul(2)).equal(),
            height: calc(handleSizeHover).add(calc(handleLineWidthHover).mul(2)).equal()
          },
          "&::after": {
            boxShadow: `0 0 0 ${unit(handleLineWidthHover)} ${handleActiveColor}`,
            outline: `6px solid ${handleActiveOutlineColor}`,
            width: handleSizeHover,
            height: handleSizeHover,
            insetInlineStart: token.calc(handleSize).sub(handleSizeHover).div(2).equal(),
            insetBlockStart: token.calc(handleSize).sub(handleSizeHover).div(2).equal()
          }
        }
      },
      [`&-lock ${componentCls}-handle`]: {
        "&::before, &::after": {
          transition: "none"
        }
      },
      [`${componentCls}-mark`]: {
        position: "absolute",
        fontSize: token.fontSize
      },
      [`${componentCls}-mark-text`]: {
        position: "absolute",
        display: "inline-block",
        color: token.colorTextDescription,
        textAlign: "center",
        wordBreak: "keep-all",
        cursor: "pointer",
        userSelect: "none",
        "&-active": {
          color: token.colorText
        }
      },
      [`${componentCls}-step`]: {
        position: "absolute",
        background: "transparent",
        pointerEvents: "none"
      },
      [`${componentCls}-dot`]: {
        position: "absolute",
        width: dotSize,
        height: dotSize,
        backgroundColor: token.colorBgElevated,
        border: `${unit(handleLineWidth)} solid ${token.dotBorderColor}`,
        borderRadius: "50%",
        cursor: "pointer",
        transition: `border-color ${token.motionDurationSlow}`,
        pointerEvents: "auto",
        "&-active": {
          borderColor: token.dotActiveBorderColor
        }
      },
      [`&${componentCls}-disabled`]: {
        cursor: "not-allowed",
        [`${componentCls}-rail`]: {
          backgroundColor: `${token.railBg} !important`
        },
        [`${componentCls}-track`]: {
          backgroundColor: `${token.trackBgDisabled} !important`
        },
        [`
          ${componentCls}-dot
        `]: {
          backgroundColor: token.colorBgElevated,
          borderColor: token.trackBgDisabled,
          boxShadow: "none",
          cursor: "not-allowed"
        },
        [`${componentCls}-handle::after`]: {
          backgroundColor: token.colorBgElevated,
          cursor: "not-allowed",
          width: handleSize,
          height: handleSize,
          boxShadow: `0 0 0 ${unit(handleLineWidth)} ${handleColorDisabled}`,
          insetInlineStart: 0,
          insetBlockStart: 0
        },
        [`
          ${componentCls}-mark-text,
          ${componentCls}-dot
        `]: {
          cursor: `not-allowed !important`
        }
      },
      [`&-tooltip ${antCls}-tooltip-inner`]: {
        minWidth: "unset"
      }
    })
  };
};
const genDirectionStyle = (token, horizontal) => {
  const {
    componentCls,
    railSize,
    handleSize,
    dotSize,
    marginFull,
    calc
  } = token;
  const railPadding = horizontal ? "paddingBlock" : "paddingInline";
  const full = horizontal ? "width" : "height";
  const part = horizontal ? "height" : "width";
  const handlePos = horizontal ? "insetBlockStart" : "insetInlineStart";
  const markInset = horizontal ? "top" : "insetInlineStart";
  const handlePosSize = calc(railSize).mul(3).sub(handleSize).div(2).equal();
  const draggableBorderSize = calc(handleSize).sub(railSize).div(2).equal();
  const draggableBorder = horizontal ? {
    borderWidth: `${unit(draggableBorderSize)} 0`,
    transform: `translateY(${unit(calc(draggableBorderSize).mul(-1).equal())})`
  } : {
    borderWidth: `0 ${unit(draggableBorderSize)}`,
    transform: `translateX(${unit(token.calc(draggableBorderSize).mul(-1).equal())})`
  };
  return {
    [railPadding]: railSize,
    [part]: calc(railSize).mul(3).equal(),
    [`${componentCls}-rail`]: {
      [full]: "100%",
      [part]: railSize
    },
    [`${componentCls}-track,${componentCls}-tracks`]: {
      [part]: railSize
    },
    [`${componentCls}-track-draggable`]: Object.assign({}, draggableBorder),
    [`${componentCls}-handle`]: {
      [handlePos]: handlePosSize
    },
    [`${componentCls}-mark`]: {
      // Reset all
      insetInlineStart: 0,
      top: 0,
      // https://github.com/ant-design/ant-design/issues/43731
      [markInset]: calc(railSize).mul(3).add(horizontal ? 0 : marginFull).equal(),
      [full]: "100%"
    },
    [`${componentCls}-step`]: {
      // Reset all
      insetInlineStart: 0,
      top: 0,
      [markInset]: railSize,
      [full]: "100%",
      [part]: railSize
    },
    [`${componentCls}-dot`]: {
      position: "absolute",
      [handlePos]: calc(railSize).sub(dotSize).div(2).equal()
    }
  };
};
const genHorizontalStyle = (token) => {
  const {
    componentCls,
    marginPartWithMark
  } = token;
  return {
    [`${componentCls}-horizontal`]: Object.assign(Object.assign({}, genDirectionStyle(token, true)), {
      [`&${componentCls}-with-marks`]: {
        marginBottom: marginPartWithMark
      }
    })
  };
};
const genVerticalStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-vertical`]: Object.assign(Object.assign({}, genDirectionStyle(token, false)), {
      height: "100%"
    })
  };
};
const prepareComponentToken$4 = (token) => {
  const increaseHandleWidth = 1;
  const controlSize = token.controlHeightLG / 4;
  const controlSizeHover = token.controlHeightSM / 2;
  const handleLineWidth = token.lineWidth + increaseHandleWidth;
  const handleLineWidthHover = token.lineWidth + increaseHandleWidth * 1.5;
  const handleActiveColor = token.colorPrimary;
  const handleActiveOutlineColor = new FastColor(handleActiveColor).setA(0.2).toRgbString();
  return {
    controlSize,
    railSize: 4,
    handleSize: controlSize,
    handleSizeHover: controlSizeHover,
    dotSize: 8,
    handleLineWidth,
    handleLineWidthHover,
    railBg: token.colorFillTertiary,
    railHoverBg: token.colorFillSecondary,
    trackBg: token.colorPrimaryBorder,
    trackHoverBg: token.colorPrimaryBorderHover,
    handleColor: token.colorPrimaryBorder,
    handleActiveColor,
    handleActiveOutlineColor,
    handleColorDisabled: new FastColor(token.colorTextDisabled).onBackground(token.colorBgContainer).toHexString(),
    dotBorderColor: token.colorBorderSecondary,
    dotActiveBorderColor: token.colorPrimaryBorder,
    trackBgDisabled: token.colorBgContainerDisabled
  };
};
const useStyle$5 = genStyleHooks("Slider", (token) => {
  const sliderToken = merge$1(token, {
    marginPart: token.calc(token.controlHeight).sub(token.controlSize).div(2).equal(),
    marginFull: token.calc(token.controlSize).div(2).equal(),
    marginPartWithMark: token.calc(token.controlHeightLG).sub(token.controlSize).equal()
  });
  return [genBaseStyle$2(sliderToken), genHorizontalStyle(sliderToken), genVerticalStyle(sliderToken)];
}, prepareComponentToken$4);
function useRafLock() {
  const [state, setState] = reactExports.useState(false);
  const rafRef = reactExports.useRef(null);
  const cleanup = () => {
    wrapperRaf.cancel(rafRef.current);
  };
  const setDelayState = (nextState) => {
    cleanup();
    if (nextState) {
      setState(nextState);
    } else {
      rafRef.current = wrapperRaf(() => {
        setState(nextState);
      });
    }
  };
  reactExports.useEffect(() => cleanup, []);
  return [state, setDelayState];
}
var __rest$c = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function getTipFormatter(tipFormatter, legacyTipFormatter) {
  if (tipFormatter || tipFormatter === null) {
    return tipFormatter;
  }
  if (legacyTipFormatter || legacyTipFormatter === null) {
    return legacyTipFormatter;
  }
  return (val) => typeof val === "number" ? val.toString() : "";
}
const Slider2 = /* @__PURE__ */ React.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    range,
    className,
    rootClassName,
    style,
    disabled,
    // Deprecated Props
    tooltipPrefixCls: legacyTooltipPrefixCls,
    tipFormatter: legacyTipFormatter,
    tooltipVisible: legacyTooltipVisible,
    getTooltipPopupContainer: legacyGetTooltipPopupContainer,
    tooltipPlacement: legacyTooltipPlacement,
    tooltip = {},
    onChangeComplete,
    classNames: sliderClassNames,
    styles
  } = props, restProps = __rest$c(props, ["prefixCls", "range", "className", "rootClassName", "style", "disabled", "tooltipPrefixCls", "tipFormatter", "tooltipVisible", "getTooltipPopupContainer", "tooltipPlacement", "tooltip", "onChangeComplete", "classNames", "styles"]);
  const {
    vertical
  } = props;
  const {
    getPrefixCls,
    direction: contextDirection,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
    getPopupContainer
  } = useComponentConfig("slider");
  const contextDisabled = React.useContext(DisabledContext);
  const mergedDisabled = disabled !== null && disabled !== void 0 ? disabled : contextDisabled;
  const {
    handleRender: contextHandleRender,
    direction: internalContextDirection
  } = React.useContext(SliderInternalContext);
  const mergedDirection = internalContextDirection || contextDirection;
  const isRTL = mergedDirection === "rtl";
  const [hoverOpen, setHoverOpen] = useRafLock();
  const [focusOpen, setFocusOpen] = useRafLock();
  const tooltipProps = Object.assign({}, tooltip);
  const {
    open: tooltipOpen,
    placement: tooltipPlacement,
    getPopupContainer: getTooltipPopupContainer,
    prefixCls: customizeTooltipPrefixCls,
    formatter: tipFormatter
  } = tooltipProps;
  const lockOpen = tooltipOpen !== null && tooltipOpen !== void 0 ? tooltipOpen : legacyTooltipVisible;
  const activeOpen = (hoverOpen || focusOpen) && lockOpen !== false;
  const mergedTipFormatter = getTipFormatter(tipFormatter, legacyTipFormatter);
  const [dragging, setDragging] = useRafLock();
  const onInternalChangeComplete = (nextValues) => {
    onChangeComplete === null || onChangeComplete === void 0 ? void 0 : onChangeComplete(nextValues);
    setDragging(false);
  };
  const getTooltipPlacement = (placement, vert) => {
    if (placement) {
      return placement;
    }
    if (!vert) {
      return "top";
    }
    return isRTL ? "left" : "right";
  };
  const prefixCls = getPrefixCls("slider", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$5(prefixCls);
  const rootClassNames = classNames(className, contextClassName, contextClassNames.root, sliderClassNames === null || sliderClassNames === void 0 ? void 0 : sliderClassNames.root, rootClassName, {
    [`${prefixCls}-rtl`]: isRTL,
    [`${prefixCls}-lock`]: dragging
  }, hashId, cssVarCls);
  if (isRTL && !restProps.vertical) {
    restProps.reverse = !restProps.reverse;
  }
  React.useEffect(() => {
    const onMouseUp = () => {
      wrapperRaf(() => {
        setFocusOpen(false);
      }, 1);
    };
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);
  const useActiveTooltipHandle = range && !lockOpen;
  const handleRender = contextHandleRender || ((node, info) => {
    const {
      index: index2
    } = info;
    const nodeProps = node.props;
    function proxyEvent(eventName, event, triggerRestPropsEvent) {
      var _a, _b, _c, _d;
      if (triggerRestPropsEvent) {
        (_b = (_a = restProps)[eventName]) === null || _b === void 0 ? void 0 : _b.call(_a, event);
      }
      (_d = (_c = nodeProps)[eventName]) === null || _d === void 0 ? void 0 : _d.call(_c, event);
    }
    const passedProps = Object.assign(Object.assign({}, nodeProps), {
      onMouseEnter: (e) => {
        setHoverOpen(true);
        proxyEvent("onMouseEnter", e);
      },
      onMouseLeave: (e) => {
        setHoverOpen(false);
        proxyEvent("onMouseLeave", e);
      },
      onMouseDown: (e) => {
        setFocusOpen(true);
        setDragging(true);
        proxyEvent("onMouseDown", e);
      },
      onFocus: (e) => {
        var _a;
        setFocusOpen(true);
        (_a = restProps.onFocus) === null || _a === void 0 ? void 0 : _a.call(restProps, e);
        proxyEvent("onFocus", e, true);
      },
      onBlur: (e) => {
        var _a;
        setFocusOpen(false);
        (_a = restProps.onBlur) === null || _a === void 0 ? void 0 : _a.call(restProps, e);
        proxyEvent("onBlur", e, true);
      }
    });
    const cloneNode = /* @__PURE__ */ React.cloneElement(node, passedProps);
    const open = (!!lockOpen || activeOpen) && mergedTipFormatter !== null;
    if (!useActiveTooltipHandle) {
      return /* @__PURE__ */ React.createElement(SliderTooltip, Object.assign({}, tooltipProps, {
        prefixCls: getPrefixCls("tooltip", customizeTooltipPrefixCls !== null && customizeTooltipPrefixCls !== void 0 ? customizeTooltipPrefixCls : legacyTooltipPrefixCls),
        title: mergedTipFormatter ? mergedTipFormatter(info.value) : "",
        value: info.value,
        open,
        placement: getTooltipPlacement(tooltipPlacement !== null && tooltipPlacement !== void 0 ? tooltipPlacement : legacyTooltipPlacement, vertical),
        key: index2,
        classNames: {
          root: `${prefixCls}-tooltip`
        },
        getPopupContainer: getTooltipPopupContainer || legacyGetTooltipPopupContainer || getPopupContainer
      }), cloneNode);
    }
    return cloneNode;
  });
  const activeHandleRender = useActiveTooltipHandle ? (handle, info) => {
    const cloneNode = /* @__PURE__ */ React.cloneElement(handle, {
      style: Object.assign(Object.assign({}, handle.props.style), {
        visibility: "hidden"
      })
    });
    return /* @__PURE__ */ React.createElement(SliderTooltip, Object.assign({}, tooltipProps, {
      prefixCls: getPrefixCls("tooltip", customizeTooltipPrefixCls !== null && customizeTooltipPrefixCls !== void 0 ? customizeTooltipPrefixCls : legacyTooltipPrefixCls),
      title: mergedTipFormatter ? mergedTipFormatter(info.value) : "",
      open: mergedTipFormatter !== null && activeOpen,
      placement: getTooltipPlacement(tooltipPlacement !== null && tooltipPlacement !== void 0 ? tooltipPlacement : legacyTooltipPlacement, vertical),
      key: "tooltip",
      classNames: {
        root: `${prefixCls}-tooltip`
      },
      getPopupContainer: getTooltipPopupContainer || legacyGetTooltipPopupContainer || getPopupContainer,
      draggingDelete: info.draggingDelete
    }), cloneNode);
  } : void 0;
  const rootStyle = Object.assign(Object.assign(Object.assign(Object.assign({}, contextStyles.root), contextStyle), styles === null || styles === void 0 ? void 0 : styles.root), style);
  const mergedTracks = Object.assign(Object.assign({}, contextStyles.tracks), styles === null || styles === void 0 ? void 0 : styles.tracks);
  const mergedTracksClassNames = classNames(contextClassNames.tracks, sliderClassNames === null || sliderClassNames === void 0 ? void 0 : sliderClassNames.tracks);
  return wrapCSSVar(
    // @ts-ignore
    /* @__PURE__ */ React.createElement(Slider$1, Object.assign({}, restProps, {
      classNames: Object.assign({
        handle: classNames(contextClassNames.handle, sliderClassNames === null || sliderClassNames === void 0 ? void 0 : sliderClassNames.handle),
        rail: classNames(contextClassNames.rail, sliderClassNames === null || sliderClassNames === void 0 ? void 0 : sliderClassNames.rail),
        track: classNames(contextClassNames.track, sliderClassNames === null || sliderClassNames === void 0 ? void 0 : sliderClassNames.track)
      }, mergedTracksClassNames ? {
        tracks: mergedTracksClassNames
      } : {}),
      styles: Object.assign({
        handle: Object.assign(Object.assign({}, contextStyles.handle), styles === null || styles === void 0 ? void 0 : styles.handle),
        rail: Object.assign(Object.assign({}, contextStyles.rail), styles === null || styles === void 0 ? void 0 : styles.rail),
        track: Object.assign(Object.assign({}, contextStyles.track), styles === null || styles === void 0 ? void 0 : styles.track)
      }, Object.keys(mergedTracks).length ? {
        tracks: mergedTracks
      } : {}),
      step: restProps.step,
      range,
      className: rootClassNames,
      style: rootStyle,
      disabled: mergedDisabled,
      ref,
      prefixCls,
      handleRender,
      activeHandleRender,
      onChangeComplete: onInternalChangeComplete
    }))
  );
});
var __rest$b = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const GradientColorSlider = (props) => {
  const {
    prefixCls,
    colors,
    type,
    color,
    range = false,
    className,
    activeIndex,
    onActive,
    onDragStart,
    onDragChange,
    onKeyDelete
  } = props, restProps = __rest$b(props, ["prefixCls", "colors", "type", "color", "range", "className", "activeIndex", "onActive", "onDragStart", "onDragChange", "onKeyDelete"]);
  const sliderProps = Object.assign(Object.assign({}, restProps), {
    track: false
  });
  const linearCss = reactExports.useMemo(() => {
    const colorsStr = colors.map((c) => `${c.color} ${c.percent}%`).join(", ");
    return `linear-gradient(90deg, ${colorsStr})`;
  }, [colors]);
  const pointColor = reactExports.useMemo(() => {
    if (!color || !type) {
      return null;
    }
    if (type === "alpha") {
      return color.toRgbString();
    }
    return `hsl(${color.toHsb().h}, 100%, 50%)`;
  }, [color, type]);
  const onInternalDragStart = useEvent$1(onDragStart);
  const onInternalDragChange = useEvent$1(onDragChange);
  const unstableContext = reactExports.useMemo(() => ({
    onDragStart: onInternalDragStart,
    onDragChange: onInternalDragChange
  }), []);
  const handleRender = useEvent$1((ori, info) => {
    const {
      onFocus,
      style,
      className: handleCls,
      onKeyDown
    } = ori.props;
    const mergedStyle = Object.assign({}, style);
    if (type === "gradient") {
      mergedStyle.background = getGradientPercentColor(colors, info.value);
    }
    return /* @__PURE__ */ reactExports.cloneElement(ori, {
      onFocus: (e) => {
        onActive === null || onActive === void 0 ? void 0 : onActive(info.index);
        onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
      },
      style: mergedStyle,
      className: classNames(handleCls, {
        [`${prefixCls}-slider-handle-active`]: activeIndex === info.index
      }),
      onKeyDown: (e) => {
        if ((e.key === "Delete" || e.key === "Backspace") && onKeyDelete) {
          onKeyDelete(info.index);
        }
        onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(e);
      }
    });
  });
  const sliderContext = reactExports.useMemo(() => ({
    direction: "ltr",
    handleRender
  }), []);
  return /* @__PURE__ */ reactExports.createElement(SliderInternalContext.Provider, {
    value: sliderContext
  }, /* @__PURE__ */ reactExports.createElement(UnstableContext.Provider, {
    value: unstableContext
  }, /* @__PURE__ */ reactExports.createElement(Slider2, Object.assign({}, sliderProps, {
    className: classNames(className, `${prefixCls}-slider`),
    tooltip: {
      open: false
    },
    range: {
      editable: range,
      minCount: 2
    },
    styles: {
      rail: {
        background: linearCss
      },
      handle: pointColor ? {
        background: pointColor
      } : {}
    },
    classNames: {
      rail: `${prefixCls}-slider-rail`,
      handle: `${prefixCls}-slider-handle`
    }
  }))));
};
const SingleColorSlider = (props) => {
  const {
    value,
    onChange: onChange2,
    onChangeComplete
  } = props;
  const singleOnChange = (v) => onChange2(v[0]);
  const singleOnChangeComplete = (v) => onChangeComplete(v[0]);
  return /* @__PURE__ */ reactExports.createElement(GradientColorSlider, Object.assign({}, props, {
    value: [value],
    onChange: singleOnChange,
    onChangeComplete: singleOnChangeComplete
  }));
};
function sortColors(colors) {
  return _toConsumableArray(colors).sort((a, b) => a.percent - b.percent);
}
const GradientColorBar = (props) => {
  const {
    prefixCls,
    mode,
    onChange: onChange2,
    onChangeComplete,
    onActive,
    activeIndex,
    onGradientDragging,
    colors
  } = props;
  const isGradient = mode === "gradient";
  const colorList = reactExports.useMemo(() => colors.map((info) => ({
    percent: info.percent,
    color: info.color.toRgbString()
  })), [colors]);
  const values = reactExports.useMemo(() => colorList.map((info) => info.percent), [colorList]);
  const colorsRef = reactExports.useRef(colorList);
  const onDragStart = ({
    rawValues,
    draggingIndex,
    draggingValue
  }) => {
    if (rawValues.length > colorList.length) {
      const newPointColor = getGradientPercentColor(colorList, draggingValue);
      const nextColors = _toConsumableArray(colorList);
      nextColors.splice(draggingIndex, 0, {
        percent: draggingValue,
        color: newPointColor
      });
      colorsRef.current = nextColors;
    } else {
      colorsRef.current = colorList;
    }
    onGradientDragging(true);
    onChange2(new AggregationColor(sortColors(colorsRef.current)), true);
  };
  const onDragChange = ({
    deleteIndex,
    draggingIndex,
    draggingValue
  }) => {
    let nextColors = _toConsumableArray(colorsRef.current);
    if (deleteIndex !== -1) {
      nextColors.splice(deleteIndex, 1);
    } else {
      nextColors[draggingIndex] = Object.assign(Object.assign({}, nextColors[draggingIndex]), {
        percent: draggingValue
      });
      nextColors = sortColors(nextColors);
    }
    onChange2(new AggregationColor(nextColors), true);
  };
  const onKeyDelete = (index2) => {
    const nextColors = _toConsumableArray(colorList);
    nextColors.splice(index2, 1);
    const nextColor = new AggregationColor(nextColors);
    onChange2(nextColor);
    onChangeComplete(nextColor);
  };
  const onInternalChangeComplete = (nextValues) => {
    onChangeComplete(new AggregationColor(colorList));
    if (activeIndex >= nextValues.length) {
      onActive(nextValues.length - 1);
    }
    onGradientDragging(false);
  };
  if (!isGradient) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(GradientColorSlider, {
    min: 0,
    max: 100,
    prefixCls,
    className: `${prefixCls}-gradient-slider`,
    colors: colorList,
    color: null,
    value: values,
    range: true,
    onChangeComplete: onInternalChangeComplete,
    disabled: false,
    type: "gradient",
    // Active
    activeIndex,
    onActive,
    // Drag
    onDragStart,
    onDragChange,
    onKeyDelete
  });
};
const GradientColorBar$1 = /* @__PURE__ */ reactExports.memo(GradientColorBar);
var __rest$a = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const components = {
  slider: SingleColorSlider
};
const PanelPicker = () => {
  const panelPickerContext = reactExports.useContext(PanelPickerContext);
  const {
    mode,
    onModeChange,
    modeOptions,
    prefixCls,
    allowClear,
    value,
    disabledAlpha,
    onChange: onChange2,
    onClear,
    onChangeComplete,
    activeIndex,
    gradientDragging
  } = panelPickerContext, injectProps = __rest$a(panelPickerContext, ["mode", "onModeChange", "modeOptions", "prefixCls", "allowClear", "value", "disabledAlpha", "onChange", "onClear", "onChangeComplete", "activeIndex", "gradientDragging"]);
  const colors = React.useMemo(() => {
    if (!value.cleared) {
      return value.getColors();
    }
    return [{
      percent: 0,
      color: new AggregationColor("")
    }, {
      percent: 100,
      color: new AggregationColor("")
    }];
  }, [value]);
  const isSingle = !value.isGradient();
  const [lockedColor, setLockedColor] = React.useState(value);
  useLayoutEffect(() => {
    var _a;
    if (!isSingle) {
      setLockedColor((_a = colors[activeIndex]) === null || _a === void 0 ? void 0 : _a.color);
    }
  }, [isSingle, colors, gradientDragging, activeIndex]);
  const activeColor = React.useMemo(() => {
    var _a;
    if (isSingle) {
      return value;
    }
    if (gradientDragging) {
      return lockedColor;
    }
    return (_a = colors[activeIndex]) === null || _a === void 0 ? void 0 : _a.color;
  }, [colors, value, activeIndex, isSingle, lockedColor, gradientDragging]);
  const [pickerColor, setPickerColor] = React.useState(activeColor);
  const [forceSync, setForceSync] = useForceUpdate();
  const mergedPickerColor = (pickerColor === null || pickerColor === void 0 ? void 0 : pickerColor.equals(activeColor)) ? activeColor : pickerColor;
  useLayoutEffect(() => {
    setPickerColor(activeColor);
  }, [forceSync, activeColor === null || activeColor === void 0 ? void 0 : activeColor.toHexString()]);
  const fillColor = (nextColor, info) => {
    let submitColor = generateColor$1(nextColor);
    if (value.cleared) {
      const rgb = submitColor.toRgb();
      if (!rgb.r && !rgb.g && !rgb.b && info) {
        const {
          type: infoType,
          value: infoValue = 0
        } = info;
        submitColor = new AggregationColor({
          h: infoType === "hue" ? infoValue : 0,
          s: 1,
          b: 1,
          a: infoType === "alpha" ? infoValue / 100 : 1
        });
      } else {
        submitColor = genAlphaColor(submitColor);
      }
    }
    if (mode === "single") {
      return submitColor;
    }
    const nextColors = _toConsumableArray(colors);
    nextColors[activeIndex] = Object.assign(Object.assign({}, nextColors[activeIndex]), {
      color: submitColor
    });
    return new AggregationColor(nextColors);
  };
  const onPickerChange = (colorValue, fromPicker, info) => {
    const nextColor = fillColor(colorValue, info);
    setPickerColor(nextColor.isGradient() ? nextColor.getColors()[activeIndex].color : nextColor);
    onChange2(nextColor, fromPicker);
  };
  const onInternalChangeComplete = (nextColor, info) => {
    onChangeComplete(fillColor(nextColor, info));
    setForceSync();
  };
  const onInputChange = (colorValue) => {
    onChange2(fillColor(colorValue));
  };
  let operationNode = null;
  const showMode = modeOptions.length > 1;
  if (allowClear || showMode) {
    operationNode = /* @__PURE__ */ React.createElement("div", {
      className: `${prefixCls}-operation`
    }, showMode && /* @__PURE__ */ React.createElement(Segmented, {
      size: "small",
      options: modeOptions,
      value: mode,
      onChange: onModeChange
    }), /* @__PURE__ */ React.createElement(ColorClear, Object.assign({
      prefixCls,
      value,
      onChange: (clearColor) => {
        onChange2(clearColor);
        onClear === null || onClear === void 0 ? void 0 : onClear();
      }
    }, injectProps)));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, operationNode, /* @__PURE__ */ React.createElement(GradientColorBar$1, Object.assign({}, panelPickerContext, {
    colors
  })), /* @__PURE__ */ React.createElement(ColorPicker$1, {
    prefixCls,
    value: mergedPickerColor === null || mergedPickerColor === void 0 ? void 0 : mergedPickerColor.toHsb(),
    disabledAlpha,
    onChange: (colorValue, info) => {
      onPickerChange(colorValue, true, info);
    },
    onChangeComplete: (colorValue, info) => {
      onInternalChangeComplete(colorValue, info);
    },
    components
  }), /* @__PURE__ */ React.createElement(ColorInput, Object.assign({
    value: activeColor,
    onChange: onInputChange,
    prefixCls,
    disabledAlpha
  }, injectProps)));
};
const PanelPresets = () => {
  const {
    prefixCls,
    value,
    presets,
    onChange: onChange2
  } = reactExports.useContext(PanelPresetsContext);
  return Array.isArray(presets) ? /* @__PURE__ */ React.createElement(ColorPresets, {
    value,
    presets,
    prefixCls,
    onChange: onChange2
  }) : null;
};
const ColorPickerPanel = (props) => {
  const {
    prefixCls,
    presets,
    panelRender,
    value,
    onChange: onChange2,
    onClear,
    allowClear,
    disabledAlpha,
    mode,
    onModeChange,
    modeOptions,
    onChangeComplete,
    activeIndex,
    onActive,
    format: format2,
    onFormatChange,
    gradientDragging,
    onGradientDragging,
    disabledFormat
  } = props;
  const colorPickerPanelPrefixCls = `${prefixCls}-inner`;
  const panelContext = React.useMemo(() => ({
    prefixCls,
    value,
    onChange: onChange2,
    onClear,
    allowClear,
    disabledAlpha,
    mode,
    onModeChange,
    modeOptions,
    onChangeComplete,
    activeIndex,
    onActive,
    format: format2,
    onFormatChange,
    gradientDragging,
    onGradientDragging,
    disabledFormat
  }), [prefixCls, value, onChange2, onClear, allowClear, disabledAlpha, mode, onModeChange, modeOptions, onChangeComplete, activeIndex, onActive, format2, onFormatChange, gradientDragging, onGradientDragging, disabledFormat]);
  const presetContext = React.useMemo(() => ({
    prefixCls,
    value,
    presets,
    onChange: onChange2
  }), [prefixCls, value, presets, onChange2]);
  const innerPanel = /* @__PURE__ */ React.createElement("div", {
    className: `${colorPickerPanelPrefixCls}-content`
  }, /* @__PURE__ */ React.createElement(PanelPicker, null), Array.isArray(presets) && /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(PanelPresets, null));
  return /* @__PURE__ */ React.createElement(PanelPickerContext.Provider, {
    value: panelContext
  }, /* @__PURE__ */ React.createElement(PanelPresetsContext.Provider, {
    value: presetContext
  }, /* @__PURE__ */ React.createElement("div", {
    className: colorPickerPanelPrefixCls
  }, typeof panelRender === "function" ? panelRender(innerPanel, {
    components: {
      Picker: PanelPicker,
      Presets: PanelPresets
    }
  }) : innerPanel)));
};
var __rest$9 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const ColorTrigger = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    color,
    prefixCls,
    open,
    disabled,
    format: format2,
    className,
    showText,
    activeIndex
  } = props, rest = __rest$9(props, ["color", "prefixCls", "open", "disabled", "format", "className", "showText", "activeIndex"]);
  const colorTriggerPrefixCls = `${prefixCls}-trigger`;
  const colorTextPrefixCls = `${colorTriggerPrefixCls}-text`;
  const colorTextCellPrefixCls = `${colorTextPrefixCls}-cell`;
  const [locale2] = useLocale$1("ColorPicker");
  const desc = React.useMemo(() => {
    if (!showText) {
      return "";
    }
    if (typeof showText === "function") {
      return showText(color);
    }
    if (color.cleared) {
      return locale2.transparent;
    }
    if (color.isGradient()) {
      return color.getColors().map((c, index2) => {
        const inactive = activeIndex !== -1 && activeIndex !== index2;
        return /* @__PURE__ */ React.createElement("span", {
          key: index2,
          className: classNames(colorTextCellPrefixCls, inactive && `${colorTextCellPrefixCls}-inactive`)
        }, c.color.toRgbString(), " ", c.percent, "%");
      });
    }
    const hexString = color.toHexString().toUpperCase();
    const alpha = getColorAlpha(color);
    switch (format2) {
      case "rgb":
        return color.toRgbString();
      case "hsb":
        return color.toHsbString();
      // case 'hex':
      default:
        return alpha < 100 ? `${hexString.slice(0, 7)},${alpha}%` : hexString;
    }
  }, [color, format2, showText, activeIndex, locale2.transparent, colorTextCellPrefixCls]);
  const containerNode = reactExports.useMemo(() => color.cleared ? /* @__PURE__ */ React.createElement(ColorClear, {
    prefixCls
  }) : /* @__PURE__ */ React.createElement(ColorBlock, {
    prefixCls,
    color: color.toCssString()
  }), [color, prefixCls]);
  return /* @__PURE__ */ React.createElement("div", Object.assign({
    ref,
    className: classNames(colorTriggerPrefixCls, className, {
      [`${colorTriggerPrefixCls}-active`]: open,
      [`${colorTriggerPrefixCls}-disabled`]: disabled
    })
  }, pickAttrs(rest)), containerNode, showText && /* @__PURE__ */ React.createElement("div", {
    className: colorTextPrefixCls
  }, desc));
});
function useModeColor(defaultValue2, value, mode) {
  const [locale2] = useLocale$1("ColorPicker");
  const [mergedColor, setMergedColor] = useMergedState(defaultValue2, {
    value
  });
  const [modeState, setModeState] = reactExports.useState("single");
  const [modeOptionList, modeSet] = reactExports.useMemo(() => {
    const list = (Array.isArray(mode) ? mode : [mode]).filter((m) => m);
    if (!list.length) {
      list.push("single");
    }
    const modes = new Set(list);
    const optionList = [];
    const pushOption = (modeType, localeTxt) => {
      if (modes.has(modeType)) {
        optionList.push({
          label: localeTxt,
          value: modeType
        });
      }
    };
    pushOption("single", locale2.singleColor);
    pushOption("gradient", locale2.gradientColor);
    return [optionList, modes];
  }, [mode, locale2.singleColor, locale2.gradientColor]);
  const [cacheColor, setCacheColor] = reactExports.useState(null);
  const setColor = useEvent$1((nextColor) => {
    setCacheColor(nextColor);
    setMergedColor(nextColor);
  });
  const postColor = reactExports.useMemo(() => {
    const colorObj = generateColor$1(mergedColor || "");
    return colorObj.equals(cacheColor) ? cacheColor : colorObj;
  }, [mergedColor, cacheColor]);
  const postMode = reactExports.useMemo(() => {
    var _a;
    if (modeSet.has(modeState)) {
      return modeState;
    }
    return (_a = modeOptionList[0]) === null || _a === void 0 ? void 0 : _a.value;
  }, [modeSet, modeState, modeOptionList]);
  reactExports.useEffect(() => {
    setModeState(postColor.isGradient() ? "gradient" : "single");
  }, [postColor]);
  return [postColor, setColor, postMode, setModeState, modeOptionList];
}
const getTransBg = (size, colorFill) => ({
  backgroundImage: `conic-gradient(${colorFill} 25%, transparent 25% 50%, ${colorFill} 50% 75%, transparent 75% 100%)`,
  backgroundSize: `${size} ${size}`
});
const genColorBlockStyle = (token, size) => {
  const {
    componentCls,
    borderRadiusSM,
    colorPickerInsetShadow,
    lineWidth,
    colorFillSecondary
  } = token;
  return {
    [`${componentCls}-color-block`]: Object.assign(Object.assign({
      position: "relative",
      borderRadius: borderRadiusSM,
      width: size,
      height: size,
      boxShadow: colorPickerInsetShadow,
      flex: "none"
    }, getTransBg("50%", token.colorFillSecondary)), {
      [`${componentCls}-color-block-inner`]: {
        width: "100%",
        height: "100%",
        boxShadow: `inset 0 0 0 ${unit(lineWidth)} ${colorFillSecondary}`,
        borderRadius: "inherit"
      }
    })
  };
};
const genInputStyle = (token) => {
  const {
    componentCls,
    antCls,
    fontSizeSM,
    lineHeightSM,
    colorPickerAlphaInputWidth,
    marginXXS,
    paddingXXS,
    controlHeightSM,
    marginXS,
    fontSizeIcon,
    paddingXS,
    colorTextPlaceholder,
    colorPickerInputNumberHandleWidth,
    lineWidth
  } = token;
  return {
    [`${componentCls}-input-container`]: {
      display: "flex",
      [`${componentCls}-steppers${antCls}-input-number`]: {
        fontSize: fontSizeSM,
        lineHeight: lineHeightSM,
        [`${antCls}-input-number-input`]: {
          paddingInlineStart: paddingXXS,
          paddingInlineEnd: 0
        },
        [`${antCls}-input-number-handler-wrap`]: {
          width: colorPickerInputNumberHandleWidth
        }
      },
      [`${componentCls}-steppers${componentCls}-alpha-input`]: {
        flex: `0 0 ${unit(colorPickerAlphaInputWidth)}`,
        marginInlineStart: marginXXS
      },
      [`${componentCls}-format-select${antCls}-select`]: {
        marginInlineEnd: marginXS,
        width: "auto",
        "&-single": {
          [`${antCls}-select-selector`]: {
            padding: 0,
            border: 0
          },
          [`${antCls}-select-arrow`]: {
            insetInlineEnd: 0
          },
          [`${antCls}-select-selection-item`]: {
            paddingInlineEnd: token.calc(fontSizeIcon).add(marginXXS).equal(),
            fontSize: fontSizeSM,
            lineHeight: unit(controlHeightSM)
          },
          [`${antCls}-select-item-option-content`]: {
            fontSize: fontSizeSM,
            lineHeight: lineHeightSM
          },
          [`${antCls}-select-dropdown`]: {
            [`${antCls}-select-item`]: {
              minHeight: "auto"
            }
          }
        }
      },
      [`${componentCls}-input`]: {
        gap: marginXXS,
        alignItems: "center",
        flex: 1,
        width: 0,
        [`${componentCls}-hsb-input,${componentCls}-rgb-input`]: {
          display: "flex",
          gap: marginXXS,
          alignItems: "center"
        },
        [`${componentCls}-steppers`]: {
          flex: 1
        },
        [`${componentCls}-hex-input${antCls}-input-affix-wrapper`]: {
          flex: 1,
          padding: `0 ${unit(paddingXS)}`,
          [`${antCls}-input`]: {
            fontSize: fontSizeSM,
            textTransform: "uppercase",
            lineHeight: unit(token.calc(controlHeightSM).sub(token.calc(lineWidth).mul(2)).equal())
          },
          [`${antCls}-input-prefix`]: {
            color: colorTextPlaceholder
          }
        }
      }
    }
  };
};
const genPickerStyle = (token) => {
  const {
    componentCls,
    controlHeightLG,
    borderRadiusSM,
    colorPickerInsetShadow,
    marginSM,
    colorBgElevated,
    colorFillSecondary,
    lineWidthBold,
    colorPickerHandlerSize
  } = token;
  return {
    userSelect: "none",
    [`${componentCls}-select`]: {
      [`${componentCls}-palette`]: {
        minHeight: token.calc(controlHeightLG).mul(4).equal(),
        overflow: "hidden",
        borderRadius: borderRadiusSM
      },
      [`${componentCls}-saturation`]: {
        position: "absolute",
        borderRadius: "inherit",
        boxShadow: colorPickerInsetShadow,
        inset: 0
      },
      marginBottom: marginSM
    },
    // ======================== Panel =========================
    [`${componentCls}-handler`]: {
      width: colorPickerHandlerSize,
      height: colorPickerHandlerSize,
      border: `${unit(lineWidthBold)} solid ${colorBgElevated}`,
      position: "relative",
      borderRadius: "50%",
      cursor: "pointer",
      boxShadow: `${colorPickerInsetShadow}, 0 0 0 1px ${colorFillSecondary}`
    }
  };
};
const genPresetsStyle = (token) => {
  const {
    componentCls,
    antCls,
    colorTextQuaternary,
    paddingXXS,
    colorPickerPresetColorSize,
    fontSizeSM,
    colorText,
    lineHeightSM,
    lineWidth,
    borderRadius,
    colorFill,
    colorWhite,
    marginXXS,
    paddingXS,
    fontHeightSM
  } = token;
  return {
    [`${componentCls}-presets`]: {
      [`${antCls}-collapse-item > ${antCls}-collapse-header`]: {
        padding: 0,
        [`${antCls}-collapse-expand-icon`]: {
          height: fontHeightSM,
          color: colorTextQuaternary,
          paddingInlineEnd: paddingXXS
        }
      },
      [`${antCls}-collapse`]: {
        display: "flex",
        flexDirection: "column",
        gap: marginXXS
      },
      [`${antCls}-collapse-item > ${antCls}-collapse-content > ${antCls}-collapse-content-box`]: {
        padding: `${unit(paddingXS)} 0`
      },
      "&-label": {
        fontSize: fontSizeSM,
        color: colorText,
        lineHeight: lineHeightSM
      },
      "&-items": {
        display: "flex",
        flexWrap: "wrap",
        gap: token.calc(marginXXS).mul(1.5).equal(),
        [`${componentCls}-presets-color`]: {
          position: "relative",
          cursor: "pointer",
          width: colorPickerPresetColorSize,
          height: colorPickerPresetColorSize,
          "&::before": {
            content: '""',
            pointerEvents: "none",
            width: token.calc(colorPickerPresetColorSize).add(token.calc(lineWidth).mul(4)).equal(),
            height: token.calc(colorPickerPresetColorSize).add(token.calc(lineWidth).mul(4)).equal(),
            position: "absolute",
            top: token.calc(lineWidth).mul(-2).equal(),
            insetInlineStart: token.calc(lineWidth).mul(-2).equal(),
            borderRadius,
            border: `${unit(lineWidth)} solid transparent`,
            transition: `border-color ${token.motionDurationMid} ${token.motionEaseInBack}`
          },
          "&:hover::before": {
            borderColor: colorFill
          },
          "&::after": {
            boxSizing: "border-box",
            position: "absolute",
            top: "50%",
            insetInlineStart: "21.5%",
            display: "table",
            width: token.calc(colorPickerPresetColorSize).div(13).mul(5).equal(),
            height: token.calc(colorPickerPresetColorSize).div(13).mul(8).equal(),
            border: `${unit(token.lineWidthBold)} solid ${token.colorWhite}`,
            borderTop: 0,
            borderInlineStart: 0,
            transform: "rotate(45deg) scale(0) translate(-50%,-50%)",
            opacity: 0,
            content: '""',
            transition: `all ${token.motionDurationFast} ${token.motionEaseInBack}, opacity ${token.motionDurationFast}`
          },
          [`&${componentCls}-presets-color-checked`]: {
            "&::after": {
              opacity: 1,
              borderColor: colorWhite,
              transform: "rotate(45deg) scale(1) translate(-50%,-50%)",
              transition: `transform ${token.motionDurationMid} ${token.motionEaseOutBack} ${token.motionDurationFast}`
            },
            [`&${componentCls}-presets-color-bright`]: {
              "&::after": {
                borderColor: "rgba(0, 0, 0, 0.45)"
              }
            }
          }
        }
      },
      "&-empty": {
        fontSize: fontSizeSM,
        color: colorTextQuaternary
      }
    }
  };
};
const genSliderStyle = (token) => {
  const {
    componentCls,
    colorPickerInsetShadow,
    colorBgElevated,
    colorFillSecondary,
    lineWidthBold,
    colorPickerHandlerSizeSM,
    colorPickerSliderHeight,
    marginSM,
    marginXS
  } = token;
  const handleInnerSize = token.calc(colorPickerHandlerSizeSM).sub(token.calc(lineWidthBold).mul(2).equal()).equal();
  const handleHoverSize = token.calc(colorPickerHandlerSizeSM).add(token.calc(lineWidthBold).mul(2).equal()).equal();
  const activeHandleStyle = {
    "&:after": {
      transform: "scale(1)",
      boxShadow: `${colorPickerInsetShadow}, 0 0 0 1px ${token.colorPrimaryActive}`
    }
  };
  return {
    // ======================== Slider ========================
    [`${componentCls}-slider`]: [getTransBg(unit(colorPickerSliderHeight), token.colorFillSecondary), {
      margin: 0,
      padding: 0,
      height: colorPickerSliderHeight,
      borderRadius: token.calc(colorPickerSliderHeight).div(2).equal(),
      "&-rail": {
        height: colorPickerSliderHeight,
        borderRadius: token.calc(colorPickerSliderHeight).div(2).equal(),
        boxShadow: colorPickerInsetShadow
      },
      [`& ${componentCls}-slider-handle`]: {
        width: handleInnerSize,
        height: handleInnerSize,
        top: 0,
        borderRadius: "100%",
        "&:before": {
          display: "block",
          position: "absolute",
          background: "transparent",
          left: {
            _skip_check_: true,
            value: "50%"
          },
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: handleHoverSize,
          height: handleHoverSize,
          borderRadius: "100%"
        },
        "&:after": {
          width: colorPickerHandlerSizeSM,
          height: colorPickerHandlerSizeSM,
          border: `${unit(lineWidthBold)} solid ${colorBgElevated}`,
          boxShadow: `${colorPickerInsetShadow}, 0 0 0 1px ${colorFillSecondary}`,
          outline: "none",
          insetInlineStart: token.calc(lineWidthBold).mul(-1).equal(),
          top: token.calc(lineWidthBold).mul(-1).equal(),
          background: "transparent",
          transition: "none"
        },
        "&:focus": activeHandleStyle
      }
    }],
    // ======================== Layout ========================
    [`${componentCls}-slider-container`]: {
      display: "flex",
      gap: marginSM,
      marginBottom: marginSM,
      // Group
      [`${componentCls}-slider-group`]: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        display: "flex",
        "&-disabled-alpha": {
          justifyContent: "center"
        }
      }
    },
    [`${componentCls}-gradient-slider`]: {
      marginBottom: marginXS,
      [`& ${componentCls}-slider-handle`]: {
        "&:after": {
          transform: "scale(0.8)"
        },
        "&-active, &:focus": activeHandleStyle
      }
    }
  };
};
const genActiveStyle = (token, borderColor, outlineColor) => ({
  borderInlineEndWidth: token.lineWidth,
  borderColor,
  boxShadow: `0 0 0 ${unit(token.controlOutlineWidth)} ${outlineColor}`,
  outline: 0
});
const genRtlStyle$1 = (token) => {
  const {
    componentCls
  } = token;
  return {
    "&-rtl": {
      [`${componentCls}-presets-color`]: {
        "&::after": {
          direction: "ltr"
        }
      },
      [`${componentCls}-clear`]: {
        "&::after": {
          direction: "ltr"
        }
      }
    }
  };
};
const genClearStyle = (token, size, extraStyle) => {
  const {
    componentCls,
    borderRadiusSM,
    lineWidth,
    colorSplit,
    colorBorder,
    red6
  } = token;
  return {
    [`${componentCls}-clear`]: Object.assign(Object.assign({
      width: size,
      height: size,
      borderRadius: borderRadiusSM,
      border: `${unit(lineWidth)} solid ${colorSplit}`,
      position: "relative",
      overflow: "hidden",
      cursor: "inherit",
      transition: `all ${token.motionDurationFast}`
    }, extraStyle), {
      "&::after": {
        content: '""',
        position: "absolute",
        insetInlineEnd: token.calc(lineWidth).mul(-1).equal(),
        top: token.calc(lineWidth).mul(-1).equal(),
        display: "block",
        width: 40,
        // maximum
        height: 2,
        // fixed
        transformOrigin: `calc(100% - 1px) 1px`,
        transform: "rotate(-45deg)",
        backgroundColor: red6
      },
      "&:hover": {
        borderColor: colorBorder
      }
    })
  };
};
const genStatusStyle = (token) => {
  const {
    componentCls,
    colorError,
    colorWarning,
    colorErrorHover,
    colorWarningHover,
    colorErrorOutline,
    colorWarningOutline
  } = token;
  return {
    [`&${componentCls}-status-error`]: {
      borderColor: colorError,
      "&:hover": {
        borderColor: colorErrorHover
      },
      [`&${componentCls}-trigger-active`]: Object.assign({}, genActiveStyle(token, colorError, colorErrorOutline))
    },
    [`&${componentCls}-status-warning`]: {
      borderColor: colorWarning,
      "&:hover": {
        borderColor: colorWarningHover
      },
      [`&${componentCls}-trigger-active`]: Object.assign({}, genActiveStyle(token, colorWarning, colorWarningOutline))
    }
  };
};
const genSizeStyle = (token) => {
  const {
    componentCls,
    controlHeightLG,
    controlHeightSM,
    controlHeight,
    controlHeightXS,
    borderRadius,
    borderRadiusSM,
    borderRadiusXS,
    borderRadiusLG,
    fontSizeLG
  } = token;
  return {
    [`&${componentCls}-lg`]: {
      minWidth: controlHeightLG,
      minHeight: controlHeightLG,
      borderRadius: borderRadiusLG,
      [`${componentCls}-color-block, ${componentCls}-clear`]: {
        width: controlHeight,
        height: controlHeight,
        borderRadius
      },
      [`${componentCls}-trigger-text`]: {
        fontSize: fontSizeLG
      }
    },
    [`&${componentCls}-sm`]: {
      minWidth: controlHeightSM,
      minHeight: controlHeightSM,
      borderRadius: borderRadiusSM,
      [`${componentCls}-color-block, ${componentCls}-clear`]: {
        width: controlHeightXS,
        height: controlHeightXS,
        borderRadius: borderRadiusXS
      },
      [`${componentCls}-trigger-text`]: {
        lineHeight: unit(controlHeightXS)
      }
    }
  };
};
const genColorPickerStyle = (token) => {
  const {
    antCls,
    componentCls,
    colorPickerWidth,
    colorPrimary,
    motionDurationMid,
    colorBgElevated,
    colorTextDisabled,
    colorText,
    colorBgContainerDisabled,
    borderRadius,
    marginXS,
    marginSM,
    controlHeight,
    controlHeightSM,
    colorBgTextActive,
    colorPickerPresetColorSize,
    colorPickerPreviewSize,
    lineWidth,
    colorBorder,
    paddingXXS,
    fontSize,
    colorPrimaryHover,
    controlOutline
  } = token;
  return [{
    [componentCls]: Object.assign({
      [`${componentCls}-inner`]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
        "&-content": {
          display: "flex",
          flexDirection: "column",
          width: colorPickerWidth,
          [`& > ${antCls}-divider`]: {
            margin: `${unit(marginSM)} 0 ${unit(marginXS)}`
          }
        },
        [`${componentCls}-panel`]: Object.assign({}, genPickerStyle(token))
      }, genSliderStyle(token)), genColorBlockStyle(token, colorPickerPreviewSize)), genInputStyle(token)), genPresetsStyle(token)), genClearStyle(token, colorPickerPresetColorSize, {
        marginInlineStart: "auto"
      })), {
        // Operation bar
        [`${componentCls}-operation`]: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: marginXS
        }
      }),
      "&-trigger": Object.assign(Object.assign(Object.assign(Object.assign({
        minWidth: controlHeight,
        minHeight: controlHeight,
        borderRadius,
        border: `${unit(lineWidth)} solid ${colorBorder}`,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "flex-start",
        justifyContent: "center",
        transition: `all ${motionDurationMid}`,
        background: colorBgElevated,
        padding: token.calc(paddingXXS).sub(lineWidth).equal(),
        [`${componentCls}-trigger-text`]: {
          marginInlineStart: marginXS,
          marginInlineEnd: token.calc(marginXS).sub(token.calc(paddingXXS).sub(lineWidth)).equal(),
          fontSize,
          color: colorText,
          alignSelf: "center",
          "&-cell": {
            "&:not(:last-child):after": {
              content: '", "'
            },
            "&-inactive": {
              color: colorTextDisabled
            }
          }
        },
        "&:hover": {
          borderColor: colorPrimaryHover
        },
        [`&${componentCls}-trigger-active`]: Object.assign({}, genActiveStyle(token, colorPrimary, controlOutline)),
        "&-disabled": {
          color: colorTextDisabled,
          background: colorBgContainerDisabled,
          cursor: "not-allowed",
          "&:hover": {
            borderColor: colorBgTextActive
          },
          [`${componentCls}-trigger-text`]: {
            color: colorTextDisabled
          }
        }
      }, genClearStyle(token, controlHeightSM)), genColorBlockStyle(token, controlHeightSM)), genStatusStyle(token)), genSizeStyle(token))
    }, genRtlStyle$1(token))
  }, genCompactItemStyle(token, {
    focusElCls: `${componentCls}-trigger-active`
  })];
};
const useStyle$4 = genStyleHooks("ColorPicker", (token) => {
  const {
    colorTextQuaternary,
    marginSM
  } = token;
  const colorPickerSliderHeight = 8;
  const colorPickerToken = merge$1(token, {
    colorPickerWidth: 234,
    colorPickerHandlerSize: 16,
    colorPickerHandlerSizeSM: 12,
    colorPickerAlphaInputWidth: 44,
    colorPickerInputNumberHandleWidth: 16,
    colorPickerPresetColorSize: 24,
    colorPickerInsetShadow: `inset 0 0 1px 0 ${colorTextQuaternary}`,
    colorPickerSliderHeight,
    colorPickerPreviewSize: token.calc(colorPickerSliderHeight).mul(2).add(marginSM).equal()
  });
  return genColorPickerStyle(colorPickerToken);
});
var __rest$8 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const ColorPicker = (props) => {
  const {
    mode,
    value,
    defaultValue: defaultValue2,
    format: format2,
    defaultFormat,
    allowClear = false,
    presets,
    children,
    trigger = "click",
    open,
    disabled,
    placement = "bottomLeft",
    arrow = true,
    panelRender,
    showText,
    style,
    className,
    size: customizeSize,
    rootClassName,
    prefixCls: customizePrefixCls,
    styles,
    disabledAlpha = false,
    onFormatChange,
    onChange: onChange2,
    onClear,
    onOpenChange,
    onChangeComplete,
    getPopupContainer,
    autoAdjustOverflow = true,
    destroyTooltipOnHide,
    destroyOnHidden,
    disabledFormat
  } = props, rest = __rest$8(props, ["mode", "value", "defaultValue", "format", "defaultFormat", "allowClear", "presets", "children", "trigger", "open", "disabled", "placement", "arrow", "panelRender", "showText", "style", "className", "size", "rootClassName", "prefixCls", "styles", "disabledAlpha", "onFormatChange", "onChange", "onClear", "onOpenChange", "onChangeComplete", "getPopupContainer", "autoAdjustOverflow", "destroyTooltipOnHide", "destroyOnHidden", "disabledFormat"]);
  const {
    getPrefixCls,
    direction,
    colorPicker
  } = reactExports.useContext(ConfigContext);
  const contextDisabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = disabled !== null && disabled !== void 0 ? disabled : contextDisabled;
  const [popupOpen, setPopupOpen] = useMergedState(false, {
    value: open,
    postState: (openData) => !mergedDisabled && openData,
    onChange: onOpenChange
  });
  const [formatValue2, setFormatValue] = useMergedState(format2, {
    value: format2,
    defaultValue: defaultFormat,
    onChange: onFormatChange
  });
  const prefixCls = getPrefixCls("color-picker", customizePrefixCls);
  const [mergedColor, setColor, modeState, setModeState, modeOptions] = useModeColor(defaultValue2, value, mode);
  const isAlphaColor = reactExports.useMemo(() => getColorAlpha(mergedColor) < 100, [mergedColor]);
  const [cachedGradientColor, setCachedGradientColor] = React.useState(null);
  const onInternalChangeComplete = (color) => {
    if (onChangeComplete) {
      let changeColor = generateColor$1(color);
      if (disabledAlpha && isAlphaColor) {
        changeColor = genAlphaColor(color);
      }
      onChangeComplete(changeColor);
    }
  };
  const onInternalChange = (data, changeFromPickerDrag) => {
    let color = generateColor$1(data);
    if (disabledAlpha && isAlphaColor) {
      color = genAlphaColor(color);
    }
    setColor(color);
    setCachedGradientColor(null);
    if (onChange2) {
      onChange2(color, color.toCssString());
    }
    if (!changeFromPickerDrag) {
      onInternalChangeComplete(color);
    }
  };
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [gradientDragging, setGradientDragging] = React.useState(false);
  const onInternalModeChange = (newMode) => {
    setModeState(newMode);
    if (newMode === "single" && mergedColor.isGradient()) {
      setActiveIndex(0);
      onInternalChange(new AggregationColor(mergedColor.getColors()[0].color));
      setCachedGradientColor(mergedColor);
    } else if (newMode === "gradient" && !mergedColor.isGradient()) {
      const baseColor = isAlphaColor ? genAlphaColor(mergedColor) : mergedColor;
      onInternalChange(new AggregationColor(cachedGradientColor || [{
        percent: 0,
        color: baseColor
      }, {
        percent: 100,
        color: baseColor
      }]));
    }
  };
  const {
    status: contextStatus
  } = React.useContext(FormItemInputContext);
  const {
    compactSize,
    compactItemClassnames
  } = useCompactItemContext(prefixCls, direction);
  const mergedSize = useSize((ctx) => {
    var _a;
    return (_a = customizeSize !== null && customizeSize !== void 0 ? customizeSize : compactSize) !== null && _a !== void 0 ? _a : ctx;
  });
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$4(prefixCls, rootCls);
  const rtlCls = {
    [`${prefixCls}-rtl`]: direction
  };
  const mergedRootCls = classNames(rootClassName, cssVarCls, rootCls, rtlCls);
  const mergedCls = classNames(getStatusClassNames(prefixCls, contextStatus), {
    [`${prefixCls}-sm`]: mergedSize === "small",
    [`${prefixCls}-lg`]: mergedSize === "large"
  }, compactItemClassnames, colorPicker === null || colorPicker === void 0 ? void 0 : colorPicker.className, mergedRootCls, className, hashId);
  const mergedPopupCls = classNames(prefixCls, mergedRootCls);
  const popoverProps = {
    open: popupOpen,
    trigger,
    placement,
    arrow,
    rootClassName,
    getPopupContainer,
    autoAdjustOverflow,
    destroyOnHidden: destroyOnHidden !== null && destroyOnHidden !== void 0 ? destroyOnHidden : !!destroyTooltipOnHide
  };
  const mergedStyle = Object.assign(Object.assign({}, colorPicker === null || colorPicker === void 0 ? void 0 : colorPicker.style), style);
  return wrapCSSVar(/* @__PURE__ */ React.createElement(Popover, Object.assign({
    style: styles === null || styles === void 0 ? void 0 : styles.popup,
    styles: {
      body: styles === null || styles === void 0 ? void 0 : styles.popupOverlayInner
    },
    onOpenChange: (visible) => {
      if (!visible || !mergedDisabled) {
        setPopupOpen(visible);
      }
    },
    content: /* @__PURE__ */ React.createElement(ContextIsolator, {
      form: true
    }, /* @__PURE__ */ React.createElement(ColorPickerPanel, {
      mode: modeState,
      onModeChange: onInternalModeChange,
      modeOptions,
      prefixCls,
      value: mergedColor,
      allowClear,
      disabled: mergedDisabled,
      disabledAlpha,
      presets,
      panelRender,
      format: formatValue2,
      onFormatChange: setFormatValue,
      onChange: onInternalChange,
      onChangeComplete: onInternalChangeComplete,
      onClear,
      activeIndex,
      onActive: setActiveIndex,
      gradientDragging,
      onGradientDragging: setGradientDragging,
      disabledFormat
    })),
    classNames: {
      root: mergedPopupCls
    }
  }, popoverProps), children || /* @__PURE__ */ React.createElement(ColorTrigger, Object.assign({
    activeIndex: popupOpen ? activeIndex : -1,
    open: popupOpen,
    className: mergedCls,
    style: mergedStyle,
    prefixCls,
    disabled: mergedDisabled,
    showText,
    format: formatValue2
  }, rest, {
    color: mergedColor
  }))));
};
const PurePanel$2 = genPurePanel(
  ColorPicker,
  void 0,
  (props) => Object.assign(Object.assign({}, props), {
    placement: "bottom",
    autoAdjustOverflow: false
  }),
  "color-picker",
  /* istanbul ignore next */
  (prefixCls) => prefixCls
);
ColorPicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$2;
var SwapRightOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z" } }] }, "name": "swap-right", "theme": "outlined" };
var SwapRightOutlined = function SwapRightOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends$2({}, props, {
    ref,
    icon: SwapRightOutlined$1
  }));
};
var RefIcon$e = /* @__PURE__ */ reactExports.forwardRef(SwapRightOutlined);
const useMergedPickerSemantic = (pickerType, classNames$1, styles, popupClassName, popupStyle) => {
  const {
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig(pickerType);
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames$1], [contextStyles, styles], {
    popup: {
      _default: "root"
    }
  });
  return reactExports.useMemo(() => {
    var _a, _b;
    const filledClassNames = Object.assign(Object.assign({}, mergedClassNames), {
      popup: Object.assign(Object.assign({}, mergedClassNames.popup), {
        root: classNames((_a = mergedClassNames.popup) === null || _a === void 0 ? void 0 : _a.root, popupClassName)
      })
    });
    const filledStyles = Object.assign(Object.assign({}, mergedStyles), {
      popup: Object.assign(Object.assign({}, mergedStyles.popup), {
        root: Object.assign(Object.assign({}, (_b = mergedStyles.popup) === null || _b === void 0 ? void 0 : _b.root), popupStyle)
      })
    });
    return [filledClassNames, filledStyles];
  }, [mergedClassNames, mergedStyles, popupClassName, popupStyle]);
};
function getPlaceholder(locale2, picker, customizePlaceholder) {
  if (customizePlaceholder !== void 0) {
    return customizePlaceholder;
  }
  if (picker === "year" && locale2.lang.yearPlaceholder) {
    return locale2.lang.yearPlaceholder;
  }
  if (picker === "quarter" && locale2.lang.quarterPlaceholder) {
    return locale2.lang.quarterPlaceholder;
  }
  if (picker === "month" && locale2.lang.monthPlaceholder) {
    return locale2.lang.monthPlaceholder;
  }
  if (picker === "week" && locale2.lang.weekPlaceholder) {
    return locale2.lang.weekPlaceholder;
  }
  if (picker === "time" && locale2.timePickerLocale.placeholder) {
    return locale2.timePickerLocale.placeholder;
  }
  return locale2.lang.placeholder;
}
function getRangePlaceholder(locale2, picker, customizePlaceholder) {
  if (customizePlaceholder !== void 0) {
    return customizePlaceholder;
  }
  if (picker === "year" && locale2.lang.yearPlaceholder) {
    return locale2.lang.rangeYearPlaceholder;
  }
  if (picker === "quarter" && locale2.lang.quarterPlaceholder) {
    return locale2.lang.rangeQuarterPlaceholder;
  }
  if (picker === "month" && locale2.lang.monthPlaceholder) {
    return locale2.lang.rangeMonthPlaceholder;
  }
  if (picker === "week" && locale2.lang.weekPlaceholder) {
    return locale2.lang.rangeWeekPlaceholder;
  }
  if (picker === "time" && locale2.timePickerLocale.placeholder) {
    return locale2.timePickerLocale.rangePlaceholder;
  }
  return locale2.lang.rangePlaceholder;
}
function useIcons(props, prefixCls) {
  const {
    allowClear = true
  } = props;
  const {
    clearIcon,
    removeIcon
  } = useIcons$1(Object.assign(Object.assign({}, props), {
    prefixCls,
    componentName: "DatePicker"
  }));
  const mergedAllowClear = reactExports.useMemo(() => {
    if (allowClear === false) {
      return false;
    }
    const allowClearConfig = allowClear === true ? {} : allowClear;
    return Object.assign({
      clearIcon
    }, allowClearConfig);
  }, [allowClear, clearIcon]);
  return [mergedAllowClear, removeIcon];
}
const [WEEK, WEEKPICKER] = ["week", "WeekPicker"];
const [MONTH, MONTHPICKER] = ["month", "MonthPicker"];
const [YEAR, YEARPICKER] = ["year", "YearPicker"];
const [QUARTER, QUARTERPICKER] = ["quarter", "QuarterPicker"];
const [TIME, TIMEPICKER] = ["time", "TimePicker"];
var CalendarOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z" } }] }, "name": "calendar", "theme": "outlined" };
var CalendarOutlined = function CalendarOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends$2({}, props, {
    ref,
    icon: CalendarOutlined$1
  }));
};
var RefIcon$d = /* @__PURE__ */ reactExports.forwardRef(CalendarOutlined);
var ClockCircleOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { "tag": "path", "attrs": { "d": "M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z" } }] }, "name": "clock-circle", "theme": "outlined" };
var ClockCircleOutlined = function ClockCircleOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends$2({}, props, {
    ref,
    icon: ClockCircleOutlined$1
  }));
};
var RefIcon$c = /* @__PURE__ */ reactExports.forwardRef(ClockCircleOutlined);
const SuffixIcon = ({
  picker,
  hasFeedback,
  feedbackIcon,
  suffixIcon
}) => {
  if (suffixIcon === null || suffixIcon === false) {
    return null;
  }
  if (suffixIcon === true || suffixIcon === void 0) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, picker === TIME ? /* @__PURE__ */ React.createElement(RefIcon$c, null) : /* @__PURE__ */ React.createElement(RefIcon$d, null), hasFeedback && feedbackIcon);
  }
  return suffixIcon;
};
const PickerButton = (props) => /* @__PURE__ */ reactExports.createElement(Button$1, Object.assign({
  size: "small",
  type: "primary"
}, props));
function useComponents(components2) {
  return reactExports.useMemo(() => Object.assign({
    button: PickerButton
  }, components2), [components2]);
}
var __rest$7 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const generateRangePicker = (generateConfig2) => {
  const RangePicker2 = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
    var _a;
    const {
      prefixCls: customizePrefixCls,
      getPopupContainer: customGetPopupContainer,
      components: components2,
      className,
      style,
      placement,
      size: customizeSize,
      disabled: customDisabled,
      bordered = true,
      placeholder,
      popupStyle,
      popupClassName,
      dropdownClassName,
      status: customStatus,
      rootClassName,
      variant: customVariant,
      picker,
      styles,
      classNames: classNames$1,
      suffixIcon
    } = props, restProps = __rest$7(props, ["prefixCls", "getPopupContainer", "components", "className", "style", "placement", "size", "disabled", "bordered", "placeholder", "popupStyle", "popupClassName", "dropdownClassName", "status", "rootClassName", "variant", "picker", "styles", "classNames", "suffixIcon"]);
    const pickerType = picker === TIME ? "timePicker" : "datePicker";
    const innerRef = reactExports.useRef(null);
    const {
      getPrefixCls,
      direction,
      getPopupContainer,
      rangePicker
    } = reactExports.useContext(ConfigContext);
    const prefixCls = getPrefixCls("picker", customizePrefixCls);
    const {
      compactSize,
      compactItemClassnames
    } = useCompactItemContext(prefixCls, direction);
    const rootPrefixCls = getPrefixCls();
    const [variant, enableVariantCls] = useVariant("rangePicker", customVariant, bordered);
    const rootCls = useCSSVarCls(prefixCls);
    const [wrapCSSVar, hashId, cssVarCls] = useStyle$a(prefixCls, rootCls);
    const [mergedClassNames, mergedStyles] = useMergedPickerSemantic(pickerType, classNames$1, styles, popupClassName || dropdownClassName, popupStyle);
    const [mergedAllowClear] = useIcons(props, prefixCls);
    const mergedComponents = useComponents(components2);
    const mergedSize = useSize((ctx) => {
      var _a2;
      return (_a2 = customizeSize !== null && customizeSize !== void 0 ? customizeSize : compactSize) !== null && _a2 !== void 0 ? _a2 : ctx;
    });
    const disabled = reactExports.useContext(DisabledContext);
    const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
    const formItemContext = reactExports.useContext(FormItemInputContext);
    const {
      hasFeedback,
      status: contextStatus,
      feedbackIcon
    } = formItemContext;
    const mergedSuffixIcon = /* @__PURE__ */ reactExports.createElement(SuffixIcon, {
      picker,
      hasFeedback,
      feedbackIcon,
      suffixIcon
    });
    reactExports.useImperativeHandle(ref, () => innerRef.current);
    const [contextLocale] = useLocale$1("Calendar", locale);
    const locale$1 = Object.assign(Object.assign({}, contextLocale), props.locale);
    const [zIndex] = useZIndex("DatePicker", (_a = mergedStyles.popup.root) === null || _a === void 0 ? void 0 : _a.zIndex);
    return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(ContextIsolator, {
      space: true
    }, /* @__PURE__ */ reactExports.createElement(RefRangePicker, Object.assign({
      separator: /* @__PURE__ */ reactExports.createElement("span", {
        "aria-label": "to",
        className: `${prefixCls}-separator`
      }, /* @__PURE__ */ reactExports.createElement(RefIcon$e, null)),
      disabled: mergedDisabled,
      ref: innerRef,
      placement,
      placeholder: getRangePlaceholder(locale$1, picker, placeholder),
      suffixIcon: mergedSuffixIcon,
      prevIcon: /* @__PURE__ */ reactExports.createElement("span", {
        className: `${prefixCls}-prev-icon`
      }),
      nextIcon: /* @__PURE__ */ reactExports.createElement("span", {
        className: `${prefixCls}-next-icon`
      }),
      superPrevIcon: /* @__PURE__ */ reactExports.createElement("span", {
        className: `${prefixCls}-super-prev-icon`
      }),
      superNextIcon: /* @__PURE__ */ reactExports.createElement("span", {
        className: `${prefixCls}-super-next-icon`
      }),
      transitionName: `${rootPrefixCls}-slide-up`,
      picker
    }, restProps, {
      className: classNames({
        [`${prefixCls}-${mergedSize}`]: mergedSize,
        [`${prefixCls}-${variant}`]: enableVariantCls
      }, getStatusClassNames(prefixCls, getMergedStatus(contextStatus, customStatus), hasFeedback), hashId, compactItemClassnames, className, rangePicker === null || rangePicker === void 0 ? void 0 : rangePicker.className, cssVarCls, rootCls, rootClassName, mergedClassNames.root),
      style: Object.assign(Object.assign(Object.assign({}, rangePicker === null || rangePicker === void 0 ? void 0 : rangePicker.style), style), mergedStyles.root),
      locale: locale$1.lang,
      prefixCls,
      getPopupContainer: customGetPopupContainer || getPopupContainer,
      generateConfig: generateConfig2,
      components: mergedComponents,
      direction,
      classNames: {
        popup: classNames(hashId, cssVarCls, rootCls, rootClassName, mergedClassNames.popup.root)
      },
      styles: {
        popup: Object.assign(Object.assign({}, mergedStyles.popup.root), {
          zIndex
        })
      },
      allowClear: mergedAllowClear
    }))));
  });
  return RangePicker2;
};
var __rest$6 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const generatePicker$1 = (generateConfig2) => {
  const getPicker = (picker, displayName) => {
    const consumerName = displayName === TIMEPICKER ? "timePicker" : "datePicker";
    const Picker3 = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
      var _a;
      const {
        prefixCls: customizePrefixCls,
        getPopupContainer: customizeGetPopupContainer,
        components: components2,
        style,
        className,
        rootClassName,
        size: customizeSize,
        bordered,
        placement,
        placeholder,
        popupStyle,
        popupClassName,
        dropdownClassName,
        disabled: customDisabled,
        status: customStatus,
        variant: customVariant,
        onCalendarChange,
        styles,
        classNames: classNames$1,
        suffixIcon
      } = props, restProps = __rest$6(props, ["prefixCls", "getPopupContainer", "components", "style", "className", "rootClassName", "size", "bordered", "placement", "placeholder", "popupStyle", "popupClassName", "dropdownClassName", "disabled", "status", "variant", "onCalendarChange", "styles", "classNames", "suffixIcon"]);
      const {
        getPrefixCls,
        direction,
        getPopupContainer,
        // Consume different styles according to different names
        [consumerName]: consumerStyle
      } = reactExports.useContext(ConfigContext);
      const prefixCls = getPrefixCls("picker", customizePrefixCls);
      const {
        compactSize,
        compactItemClassnames
      } = useCompactItemContext(prefixCls, direction);
      const innerRef = reactExports.useRef(null);
      const [variant, enableVariantCls] = useVariant("datePicker", customVariant, bordered);
      const rootCls = useCSSVarCls(prefixCls);
      const [wrapCSSVar, hashId, cssVarCls] = useStyle$a(prefixCls, rootCls);
      reactExports.useImperativeHandle(ref, () => innerRef.current);
      const additionalProps = {
        showToday: true
      };
      const mergedPicker = picker || props.picker;
      const rootPrefixCls = getPrefixCls();
      const {
        onSelect,
        multiple
      } = restProps;
      const hasLegacyOnSelect = onSelect && picker === "time" && !multiple;
      const onInternalCalendarChange = (date, dateStr, info) => {
        onCalendarChange === null || onCalendarChange === void 0 ? void 0 : onCalendarChange(date, dateStr, info);
        if (hasLegacyOnSelect) {
          onSelect(date);
        }
      };
      const [mergedClassNames, mergedStyles] = useMergedPickerSemantic(consumerName, classNames$1, styles, popupClassName || dropdownClassName, popupStyle);
      const [mergedAllowClear, removeIcon] = useIcons(props, prefixCls);
      const mergedComponents = useComponents(components2);
      const mergedSize = useSize((ctx) => {
        var _a2;
        return (_a2 = customizeSize !== null && customizeSize !== void 0 ? customizeSize : compactSize) !== null && _a2 !== void 0 ? _a2 : ctx;
      });
      const disabled = reactExports.useContext(DisabledContext);
      const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
      const formItemContext = reactExports.useContext(FormItemInputContext);
      const {
        hasFeedback,
        status: contextStatus,
        feedbackIcon
      } = formItemContext;
      const mergedSuffixIcon = /* @__PURE__ */ reactExports.createElement(SuffixIcon, {
        picker: mergedPicker,
        hasFeedback,
        feedbackIcon,
        suffixIcon
      });
      const [contextLocale] = useLocale$1("DatePicker", locale);
      const locale$1 = Object.assign(Object.assign({}, contextLocale), props.locale);
      const [zIndex] = useZIndex("DatePicker", (_a = mergedStyles.popup.root) === null || _a === void 0 ? void 0 : _a.zIndex);
      return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(ContextIsolator, {
        space: true
      }, /* @__PURE__ */ reactExports.createElement(RefPicker, Object.assign({
        ref: innerRef,
        placeholder: getPlaceholder(locale$1, mergedPicker, placeholder),
        suffixIcon: mergedSuffixIcon,
        placement,
        prevIcon: /* @__PURE__ */ reactExports.createElement("span", {
          className: `${prefixCls}-prev-icon`
        }),
        nextIcon: /* @__PURE__ */ reactExports.createElement("span", {
          className: `${prefixCls}-next-icon`
        }),
        superPrevIcon: /* @__PURE__ */ reactExports.createElement("span", {
          className: `${prefixCls}-super-prev-icon`
        }),
        superNextIcon: /* @__PURE__ */ reactExports.createElement("span", {
          className: `${prefixCls}-super-next-icon`
        }),
        transitionName: `${rootPrefixCls}-slide-up`,
        picker,
        onCalendarChange: onInternalCalendarChange
      }, additionalProps, restProps, {
        locale: locale$1.lang,
        className: classNames({
          [`${prefixCls}-${mergedSize}`]: mergedSize,
          [`${prefixCls}-${variant}`]: enableVariantCls
        }, getStatusClassNames(prefixCls, getMergedStatus(contextStatus, customStatus), hasFeedback), hashId, compactItemClassnames, consumerStyle === null || consumerStyle === void 0 ? void 0 : consumerStyle.className, className, cssVarCls, rootCls, rootClassName, mergedClassNames.root),
        style: Object.assign(Object.assign(Object.assign({}, consumerStyle === null || consumerStyle === void 0 ? void 0 : consumerStyle.style), style), mergedStyles.root),
        prefixCls,
        getPopupContainer: customizeGetPopupContainer || getPopupContainer,
        generateConfig: generateConfig2,
        components: mergedComponents,
        direction,
        disabled: mergedDisabled,
        classNames: {
          popup: classNames(hashId, cssVarCls, rootCls, rootClassName, mergedClassNames.popup.root)
        },
        styles: {
          popup: Object.assign(Object.assign({}, mergedStyles.popup.root), {
            zIndex
          })
        },
        allowClear: mergedAllowClear,
        removeIcon
      }))));
    });
    return Picker3;
  };
  const DatePicker2 = getPicker();
  const WeekPicker = getPicker(WEEK, WEEKPICKER);
  const MonthPicker = getPicker(MONTH, MONTHPICKER);
  const YearPicker = getPicker(YEAR, YEARPICKER);
  const QuarterPicker = getPicker(QUARTER, QUARTERPICKER);
  const TimePicker2 = getPicker(TIME, TIMEPICKER);
  return {
    DatePicker: DatePicker2,
    WeekPicker,
    MonthPicker,
    YearPicker,
    TimePicker: TimePicker2,
    QuarterPicker
  };
};
const generatePicker = (generateConfig2) => {
  const {
    DatePicker: DatePicker2,
    WeekPicker,
    MonthPicker,
    YearPicker,
    TimePicker: TimePicker2,
    QuarterPicker
  } = generatePicker$1(generateConfig2);
  const RangePicker2 = generateRangePicker(generateConfig2);
  const MergedDatePicker = DatePicker2;
  MergedDatePicker.WeekPicker = WeekPicker;
  MergedDatePicker.MonthPicker = MonthPicker;
  MergedDatePicker.YearPicker = YearPicker;
  MergedDatePicker.RangePicker = RangePicker2;
  MergedDatePicker.TimePicker = TimePicker2;
  MergedDatePicker.QuarterPicker = QuarterPicker;
  return MergedDatePicker;
};
const DatePicker = generatePicker(generateConfig);
const PurePanel$1 = genPurePanel(DatePicker, "popupAlign", void 0, "picker");
DatePicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$1;
const PureRangePanel = genPurePanel(DatePicker.RangePicker, "popupAlign", void 0, "picker");
DatePicker._InternalRangePanelDoNotUseOrYouWillBeFired = PureRangePanel;
DatePicker.generatePicker = generatePicker;
const flexWrapValues = ["wrap", "nowrap", "wrap-reverse"];
const justifyContentValues = ["flex-start", "flex-end", "start", "end", "center", "space-between", "space-around", "space-evenly", "stretch", "normal", "left", "right"];
const alignItemsValues = ["center", "start", "end", "flex-start", "flex-end", "self-start", "self-end", "baseline", "normal", "stretch"];
const genClsWrap = (prefixCls, props) => {
  const wrap = props.wrap === true ? "wrap" : props.wrap;
  return {
    [`${prefixCls}-wrap-${wrap}`]: wrap && flexWrapValues.includes(wrap)
  };
};
const genClsAlign = (prefixCls, props) => {
  const alignCls = {};
  alignItemsValues.forEach((cssKey) => {
    alignCls[`${prefixCls}-align-${cssKey}`] = props.align === cssKey;
  });
  alignCls[`${prefixCls}-align-stretch`] = !props.align && !!props.vertical;
  return alignCls;
};
const genClsJustify = (prefixCls, props) => {
  const justifyCls = {};
  justifyContentValues.forEach((cssKey) => {
    justifyCls[`${prefixCls}-justify-${cssKey}`] = props.justify === cssKey;
  });
  return justifyCls;
};
function createFlexClassNames(prefixCls, props) {
  return classNames(Object.assign(Object.assign(Object.assign({}, genClsWrap(prefixCls, props)), genClsAlign(prefixCls, props)), genClsJustify(prefixCls, props)));
}
const genFlexStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      display: "flex",
      margin: 0,
      padding: 0,
      "&-vertical": {
        flexDirection: "column"
      },
      "&-rtl": {
        direction: "rtl"
      },
      "&:empty": {
        display: "none"
      }
    }
  };
};
const genFlexGapStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      "&-gap-small": {
        gap: token.flexGapSM
      },
      "&-gap-middle": {
        gap: token.flexGap
      },
      "&-gap-large": {
        gap: token.flexGapLG
      }
    }
  };
};
const genFlexWrapStyle = (token) => {
  const {
    componentCls
  } = token;
  const wrapStyle = {};
  flexWrapValues.forEach((value) => {
    wrapStyle[`${componentCls}-wrap-${value}`] = {
      flexWrap: value
    };
  });
  return wrapStyle;
};
const genAlignItemsStyle = (token) => {
  const {
    componentCls
  } = token;
  const alignStyle = {};
  alignItemsValues.forEach((value) => {
    alignStyle[`${componentCls}-align-${value}`] = {
      alignItems: value
    };
  });
  return alignStyle;
};
const genJustifyContentStyle = (token) => {
  const {
    componentCls
  } = token;
  const justifyStyle = {};
  justifyContentValues.forEach((value) => {
    justifyStyle[`${componentCls}-justify-${value}`] = {
      justifyContent: value
    };
  });
  return justifyStyle;
};
const prepareComponentToken$3 = () => ({});
const useStyle$3 = genStyleHooks("Flex", (token) => {
  const {
    paddingXS,
    padding,
    paddingLG
  } = token;
  const flexToken = merge$1(token, {
    flexGapSM: paddingXS,
    flexGap: padding,
    flexGapLG: paddingLG
  });
  return [genFlexStyle(flexToken), genFlexGapStyle(flexToken), genFlexWrapStyle(flexToken), genAlignItemsStyle(flexToken), genJustifyContentStyle(flexToken)];
}, prepareComponentToken$3, {
  // Flex component don't apply extra font style
  // https://github.com/ant-design/ant-design/issues/46403
  resetStyle: false
});
var __rest$5 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Flex = /* @__PURE__ */ React.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    rootClassName,
    className,
    style,
    flex,
    gap,
    vertical = false,
    component: Component = "div",
    children
  } = props, othersProps = __rest$5(props, ["prefixCls", "rootClassName", "className", "style", "flex", "gap", "vertical", "component", "children"]);
  const {
    flex: ctxFlex,
    direction: ctxDirection,
    getPrefixCls
  } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls("flex", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$3(prefixCls);
  const mergedVertical = vertical !== null && vertical !== void 0 ? vertical : ctxFlex === null || ctxFlex === void 0 ? void 0 : ctxFlex.vertical;
  const mergedCls = classNames(className, rootClassName, ctxFlex === null || ctxFlex === void 0 ? void 0 : ctxFlex.className, prefixCls, hashId, cssVarCls, createFlexClassNames(prefixCls, props), {
    [`${prefixCls}-rtl`]: ctxDirection === "rtl",
    [`${prefixCls}-gap-${gap}`]: isPresetSize(gap),
    [`${prefixCls}-vertical`]: mergedVertical
  });
  const mergedStyle = Object.assign(Object.assign({}, ctxFlex === null || ctxFlex === void 0 ? void 0 : ctxFlex.style), style);
  if (flex) {
    mergedStyle.flex = flex;
  }
  if (gap && !isPresetSize(gap)) {
    mergedStyle.gap = gap;
  }
  return wrapCSSVar(/* @__PURE__ */ React.createElement(Component, Object.assign({
    ref,
    className: mergedCls,
    style: mergedStyle
  }, omit(othersProps, ["justify", "wrap", "align"])), children));
});
const viewSize = 100;
const borderWidth = viewSize / 5;
const radius = viewSize / 2 - borderWidth / 2;
const circumference = radius * 2 * Math.PI;
const position = 50;
const CustomCircle = (props) => {
  const {
    dotClassName,
    style,
    hasCircleCls
  } = props;
  return /* @__PURE__ */ reactExports.createElement("circle", {
    className: classNames(`${dotClassName}-circle`, {
      [`${dotClassName}-circle-bg`]: hasCircleCls
    }),
    r: radius,
    cx: position,
    cy: position,
    strokeWidth: borderWidth,
    style
  });
};
const Progress = ({
  percent,
  prefixCls
}) => {
  const dotClassName = `${prefixCls}-dot`;
  const holderClassName = `${dotClassName}-holder`;
  const hideClassName = `${holderClassName}-hidden`;
  const [render3, setRender] = reactExports.useState(false);
  useLayoutEffect(() => {
    if (percent !== 0) {
      setRender(true);
    }
  }, [percent !== 0]);
  const safePtg = Math.max(Math.min(percent, 100), 0);
  if (!render3) {
    return null;
  }
  const circleStyle = {
    strokeDashoffset: `${circumference / 4}`,
    strokeDasharray: `${circumference * safePtg / 100} ${circumference * (100 - safePtg) / 100}`
  };
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: classNames(holderClassName, `${dotClassName}-progress`, safePtg <= 0 && hideClassName)
  }, /* @__PURE__ */ reactExports.createElement("svg", {
    viewBox: `0 0 ${viewSize} ${viewSize}`,
    role: "progressbar",
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": safePtg
  }, /* @__PURE__ */ reactExports.createElement(CustomCircle, {
    dotClassName,
    hasCircleCls: true
  }), /* @__PURE__ */ reactExports.createElement(CustomCircle, {
    dotClassName,
    style: circleStyle
  })));
};
function Looper(props) {
  const {
    prefixCls,
    percent = 0
  } = props;
  const dotClassName = `${prefixCls}-dot`;
  const holderClassName = `${dotClassName}-holder`;
  const hideClassName = `${holderClassName}-hidden`;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("span", {
    className: classNames(holderClassName, percent > 0 && hideClassName)
  }, /* @__PURE__ */ reactExports.createElement("span", {
    className: classNames(dotClassName, `${prefixCls}-dot-spin`)
  }, [1, 2, 3, 4].map((i) => /* @__PURE__ */ reactExports.createElement("i", {
    className: `${prefixCls}-dot-item`,
    key: i
  })))), /* @__PURE__ */ reactExports.createElement(Progress, {
    prefixCls,
    percent
  }));
}
function Indicator(props) {
  var _a;
  const {
    prefixCls,
    indicator,
    percent
  } = props;
  const dotClassName = `${prefixCls}-dot`;
  if (indicator && /* @__PURE__ */ reactExports.isValidElement(indicator)) {
    return cloneElement(indicator, {
      className: classNames((_a = indicator.props) === null || _a === void 0 ? void 0 : _a.className, dotClassName),
      percent
    });
  }
  return /* @__PURE__ */ reactExports.createElement(Looper, {
    prefixCls,
    percent
  });
}
const antSpinMove = new Keyframe("antSpinMove", {
  to: {
    opacity: 1
  }
});
const antRotate = new Keyframe("antRotate", {
  to: {
    transform: "rotate(405deg)"
  }
});
const genSpinStyle = (token) => {
  const {
    componentCls,
    calc
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      position: "absolute",
      display: "none",
      color: token.colorPrimary,
      fontSize: 0,
      textAlign: "center",
      verticalAlign: "middle",
      opacity: 0,
      transition: `transform ${token.motionDurationSlow} ${token.motionEaseInOutCirc}`,
      "&-spinning": {
        position: "relative",
        display: "inline-block",
        opacity: 1
      },
      [`${componentCls}-text`]: {
        fontSize: token.fontSize,
        paddingTop: calc(calc(token.dotSize).sub(token.fontSize)).div(2).add(2).equal()
      },
      "&-fullscreen": {
        position: "fixed",
        width: "100vw",
        height: "100vh",
        backgroundColor: token.colorBgMask,
        zIndex: token.zIndexPopupBase,
        inset: 0,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        opacity: 0,
        visibility: "hidden",
        transition: `all ${token.motionDurationMid}`,
        "&-show": {
          opacity: 1,
          visibility: "visible"
        },
        [componentCls]: {
          [`${componentCls}-dot-holder`]: {
            color: token.colorWhite
          },
          [`${componentCls}-text`]: {
            color: token.colorTextLightSolid
          }
        }
      },
      "&-nested-loading": {
        position: "relative",
        [`> div > ${componentCls}`]: {
          position: "absolute",
          top: 0,
          insetInlineStart: 0,
          zIndex: 4,
          display: "block",
          width: "100%",
          height: "100%",
          maxHeight: token.contentHeight,
          [`${componentCls}-dot`]: {
            position: "absolute",
            top: "50%",
            insetInlineStart: "50%",
            margin: calc(token.dotSize).mul(-1).div(2).equal()
          },
          [`${componentCls}-text`]: {
            position: "absolute",
            top: "50%",
            width: "100%",
            textShadow: `0 1px 2px ${token.colorBgContainer}`
            // FIXME: shadow
          },
          [`&${componentCls}-show-text ${componentCls}-dot`]: {
            marginTop: calc(token.dotSize).div(2).mul(-1).sub(10).equal()
          },
          "&-sm": {
            [`${componentCls}-dot`]: {
              margin: calc(token.dotSizeSM).mul(-1).div(2).equal()
            },
            [`${componentCls}-text`]: {
              paddingTop: calc(calc(token.dotSizeSM).sub(token.fontSize)).div(2).add(2).equal()
            },
            [`&${componentCls}-show-text ${componentCls}-dot`]: {
              marginTop: calc(token.dotSizeSM).div(2).mul(-1).sub(10).equal()
            }
          },
          "&-lg": {
            [`${componentCls}-dot`]: {
              margin: calc(token.dotSizeLG).mul(-1).div(2).equal()
            },
            [`${componentCls}-text`]: {
              paddingTop: calc(calc(token.dotSizeLG).sub(token.fontSize)).div(2).add(2).equal()
            },
            [`&${componentCls}-show-text ${componentCls}-dot`]: {
              marginTop: calc(token.dotSizeLG).div(2).mul(-1).sub(10).equal()
            }
          }
        },
        [`${componentCls}-container`]: {
          position: "relative",
          transition: `opacity ${token.motionDurationSlow}`,
          "&::after": {
            position: "absolute",
            top: 0,
            insetInlineEnd: 0,
            bottom: 0,
            insetInlineStart: 0,
            zIndex: 10,
            width: "100%",
            height: "100%",
            background: token.colorBgContainer,
            opacity: 0,
            transition: `all ${token.motionDurationSlow}`,
            content: '""',
            pointerEvents: "none"
          }
        },
        [`${componentCls}-blur`]: {
          clear: "both",
          opacity: 0.5,
          userSelect: "none",
          pointerEvents: "none",
          "&::after": {
            opacity: 0.4,
            pointerEvents: "auto"
          }
        }
      },
      // tip
      // ------------------------------
      "&-tip": {
        color: token.spinDotDefault
      },
      // holder
      // ------------------------------
      [`${componentCls}-dot-holder`]: {
        width: "1em",
        height: "1em",
        fontSize: token.dotSize,
        display: "inline-block",
        transition: `transform ${token.motionDurationSlow} ease, opacity ${token.motionDurationSlow} ease`,
        transformOrigin: "50% 50%",
        lineHeight: 1,
        color: token.colorPrimary,
        "&-hidden": {
          transform: "scale(0.3)",
          opacity: 0
        }
      },
      // progress
      // ------------------------------
      [`${componentCls}-dot-progress`]: {
        position: "absolute",
        inset: 0
      },
      // dots
      // ------------------------------
      [`${componentCls}-dot`]: {
        position: "relative",
        display: "inline-block",
        fontSize: token.dotSize,
        width: "1em",
        height: "1em",
        "&-item": {
          position: "absolute",
          display: "block",
          width: calc(token.dotSize).sub(calc(token.marginXXS).div(2)).div(2).equal(),
          height: calc(token.dotSize).sub(calc(token.marginXXS).div(2)).div(2).equal(),
          background: "currentColor",
          borderRadius: "100%",
          transform: "scale(0.75)",
          transformOrigin: "50% 50%",
          opacity: 0.3,
          animationName: antSpinMove,
          animationDuration: "1s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
          animationDirection: "alternate",
          "&:nth-child(1)": {
            top: 0,
            insetInlineStart: 0,
            animationDelay: "0s"
          },
          "&:nth-child(2)": {
            top: 0,
            insetInlineEnd: 0,
            animationDelay: "0.4s"
          },
          "&:nth-child(3)": {
            insetInlineEnd: 0,
            bottom: 0,
            animationDelay: "0.8s"
          },
          "&:nth-child(4)": {
            bottom: 0,
            insetInlineStart: 0,
            animationDelay: "1.2s"
          }
        },
        "&-spin": {
          transform: "rotate(45deg)",
          animationName: antRotate,
          animationDuration: "1.2s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear"
        },
        "&-circle": {
          strokeLinecap: "round",
          transition: ["stroke-dashoffset", "stroke-dasharray", "stroke", "stroke-width", "opacity"].map((item) => `${item} ${token.motionDurationSlow} ease`).join(","),
          fillOpacity: 0,
          stroke: "currentcolor"
        },
        "&-circle-bg": {
          stroke: token.colorFillSecondary
        }
      },
      // small
      [`&-sm ${componentCls}-dot`]: {
        "&, &-holder": {
          fontSize: token.dotSizeSM
        }
      },
      [`&-sm ${componentCls}-dot-holder`]: {
        i: {
          width: calc(calc(token.dotSizeSM).sub(calc(token.marginXXS).div(2))).div(2).equal(),
          height: calc(calc(token.dotSizeSM).sub(calc(token.marginXXS).div(2))).div(2).equal()
        }
      },
      // large
      [`&-lg ${componentCls}-dot`]: {
        "&, &-holder": {
          fontSize: token.dotSizeLG
        }
      },
      [`&-lg ${componentCls}-dot-holder`]: {
        i: {
          width: calc(calc(token.dotSizeLG).sub(token.marginXXS)).div(2).equal(),
          height: calc(calc(token.dotSizeLG).sub(token.marginXXS)).div(2).equal()
        }
      },
      [`&${componentCls}-show-text ${componentCls}-text`]: {
        display: "block"
      }
    })
  };
};
const prepareComponentToken$2 = (token) => {
  const {
    controlHeightLG,
    controlHeight
  } = token;
  return {
    contentHeight: 400,
    dotSize: controlHeightLG / 2,
    dotSizeSM: controlHeightLG * 0.35,
    dotSizeLG: controlHeight
  };
};
const useStyle$2 = genStyleHooks("Spin", (token) => {
  const spinToken = merge$1(token, {
    spinDotDefault: token.colorTextDescription
  });
  return genSpinStyle(spinToken);
}, prepareComponentToken$2);
const AUTO_INTERVAL = 200;
const STEP_BUCKETS = [[30, 0.05], [70, 0.03], [96, 0.01]];
function usePercent(spinning, percent) {
  const [mockPercent, setMockPercent] = reactExports.useState(0);
  const mockIntervalRef = reactExports.useRef(null);
  const isAuto = percent === "auto";
  reactExports.useEffect(() => {
    if (isAuto && spinning) {
      setMockPercent(0);
      mockIntervalRef.current = setInterval(() => {
        setMockPercent((prev) => {
          const restPTG = 100 - prev;
          for (let i = 0; i < STEP_BUCKETS.length; i += 1) {
            const [limit, stepPtg] = STEP_BUCKETS[i];
            if (prev <= limit) {
              return prev + restPTG * stepPtg;
            }
          }
          return prev;
        });
      }, AUTO_INTERVAL);
    }
    return () => {
      if (mockIntervalRef.current) {
        clearInterval(mockIntervalRef.current);
        mockIntervalRef.current = null;
      }
    };
  }, [isAuto, spinning]);
  return isAuto ? mockPercent : percent;
}
var __rest$4 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
let defaultIndicator;
function shouldDelay(spinning, delay) {
  return !!spinning && !!delay && !Number.isNaN(Number(delay));
}
const Spin = (props) => {
  var _a;
  const {
    prefixCls: customizePrefixCls,
    spinning: customSpinning = true,
    delay = 0,
    className,
    rootClassName,
    size = "default",
    tip,
    wrapperClassName,
    style,
    children,
    fullscreen = false,
    indicator,
    percent
  } = props, restProps = __rest$4(props, ["prefixCls", "spinning", "delay", "className", "rootClassName", "size", "tip", "wrapperClassName", "style", "children", "fullscreen", "indicator", "percent"]);
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    indicator: contextIndicator
  } = useComponentConfig("spin");
  const prefixCls = getPrefixCls("spin", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$2(prefixCls);
  const [spinning, setSpinning] = reactExports.useState(() => customSpinning && !shouldDelay(customSpinning, delay));
  const mergedPercent = usePercent(spinning, percent);
  reactExports.useEffect(() => {
    if (customSpinning) {
      const showSpinning = debounce(delay, () => {
        setSpinning(true);
      });
      showSpinning();
      return () => {
        var _a2;
        (_a2 = showSpinning === null || showSpinning === void 0 ? void 0 : showSpinning.cancel) === null || _a2 === void 0 ? void 0 : _a2.call(showSpinning);
      };
    }
    setSpinning(false);
  }, [delay, customSpinning]);
  const isNestedPattern = reactExports.useMemo(() => typeof children !== "undefined" && !fullscreen, [children, fullscreen]);
  const spinClassName = classNames(prefixCls, contextClassName, {
    [`${prefixCls}-sm`]: size === "small",
    [`${prefixCls}-lg`]: size === "large",
    [`${prefixCls}-spinning`]: spinning,
    [`${prefixCls}-show-text`]: !!tip,
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, className, !fullscreen && rootClassName, hashId, cssVarCls);
  const containerClassName = classNames(`${prefixCls}-container`, {
    [`${prefixCls}-blur`]: spinning
  });
  const mergedIndicator = (_a = indicator !== null && indicator !== void 0 ? indicator : contextIndicator) !== null && _a !== void 0 ? _a : defaultIndicator;
  const mergedStyle = Object.assign(Object.assign({}, contextStyle), style);
  const spinElement = /* @__PURE__ */ reactExports.createElement("div", Object.assign({}, restProps, {
    style: mergedStyle,
    className: spinClassName,
    "aria-live": "polite",
    "aria-busy": spinning
  }), /* @__PURE__ */ reactExports.createElement(Indicator, {
    prefixCls,
    indicator: mergedIndicator,
    percent: mergedPercent
  }), tip && (isNestedPattern || fullscreen) ? /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-text`
  }, tip) : null);
  if (isNestedPattern) {
    return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", Object.assign({}, restProps, {
      className: classNames(`${prefixCls}-nested-loading`, wrapperClassName, hashId, cssVarCls)
    }), spinning && /* @__PURE__ */ reactExports.createElement("div", {
      key: "loading"
    }, spinElement), /* @__PURE__ */ reactExports.createElement("div", {
      className: containerClassName,
      key: "container"
    }, children)));
  }
  if (fullscreen) {
    return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", {
      className: classNames(`${prefixCls}-fullscreen`, {
        [`${prefixCls}-fullscreen-show`]: spinning
      }, rootClassName, hashId, cssVarCls)
    }, spinElement));
  }
  return wrapCSSVar(spinElement);
};
Spin.setDefaultIndicator = (indicator) => {
  defaultIndicator = indicator;
};
const genBaseStyle$1 = (token) => {
  const {
    paddingXXS,
    lineWidth,
    tagPaddingHorizontal,
    componentCls,
    calc
  } = token;
  const paddingInline = calc(tagPaddingHorizontal).sub(lineWidth).equal();
  const iconMarginInline = calc(paddingXXS).sub(lineWidth).equal();
  return {
    // Result
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      display: "inline-block",
      height: "auto",
      // https://github.com/ant-design/ant-design/pull/47504
      marginInlineEnd: token.marginXS,
      paddingInline,
      fontSize: token.tagFontSize,
      lineHeight: token.tagLineHeight,
      whiteSpace: "nowrap",
      background: token.defaultBg,
      border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
      borderRadius: token.borderRadiusSM,
      opacity: 1,
      transition: `all ${token.motionDurationMid}`,
      textAlign: "start",
      position: "relative",
      // RTL
      [`&${componentCls}-rtl`]: {
        direction: "rtl"
      },
      "&, a, a:hover": {
        color: token.defaultColor
      },
      [`${componentCls}-close-icon`]: {
        marginInlineStart: iconMarginInline,
        fontSize: token.tagIconSize,
        color: token.colorIcon,
        cursor: "pointer",
        transition: `all ${token.motionDurationMid}`,
        "&:hover": {
          color: token.colorTextHeading
        }
      },
      [`&${componentCls}-has-color`]: {
        borderColor: "transparent",
        [`&, a, a:hover, ${token.iconCls}-close, ${token.iconCls}-close:hover`]: {
          color: token.colorTextLightSolid
        }
      },
      "&-checkable": {
        backgroundColor: "transparent",
        borderColor: "transparent",
        cursor: "pointer",
        [`&:not(${componentCls}-checkable-checked):hover`]: {
          color: token.colorPrimary,
          backgroundColor: token.colorFillSecondary
        },
        "&:active, &-checked": {
          color: token.colorTextLightSolid
        },
        "&-checked": {
          backgroundColor: token.colorPrimary,
          "&:hover": {
            backgroundColor: token.colorPrimaryHover
          }
        },
        "&:active": {
          backgroundColor: token.colorPrimaryActive
        }
      },
      "&-hidden": {
        display: "none"
      },
      // To ensure that a space will be placed between character and `Icon`.
      [`> ${token.iconCls} + span, > span + ${token.iconCls}`]: {
        marginInlineStart: paddingInline
      }
    }),
    [`${componentCls}-borderless`]: {
      borderColor: "transparent",
      background: token.tagBorderlessBg
    }
  };
};
const prepareToken = (token) => {
  const {
    lineWidth,
    fontSizeIcon,
    calc
  } = token;
  const tagFontSize = token.fontSizeSM;
  const tagToken = merge$1(token, {
    tagFontSize,
    tagLineHeight: unit(calc(token.lineHeightSM).mul(tagFontSize).equal()),
    tagIconSize: calc(fontSizeIcon).sub(calc(lineWidth).mul(2)).equal(),
    // Tag icon is much smaller
    tagPaddingHorizontal: 8,
    // Fixed padding.
    tagBorderlessBg: token.defaultBg
  });
  return tagToken;
};
const prepareComponentToken$1 = (token) => ({
  defaultBg: new FastColor(token.colorFillQuaternary).onBackground(token.colorBgContainer).toHexString(),
  defaultColor: token.colorText
});
const useStyle$1 = genStyleHooks("Tag", (token) => {
  const tagToken = prepareToken(token);
  return genBaseStyle$1(tagToken);
}, prepareComponentToken$1);
var __rest$3 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const CheckableTag = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    style,
    className,
    checked,
    children,
    icon,
    onChange: onChange2,
    onClick
  } = props, restProps = __rest$3(props, ["prefixCls", "style", "className", "checked", "children", "icon", "onChange", "onClick"]);
  const {
    getPrefixCls,
    tag
  } = reactExports.useContext(ConfigContext);
  const handleClick = (e) => {
    onChange2 === null || onChange2 === void 0 ? void 0 : onChange2(!checked);
    onClick === null || onClick === void 0 ? void 0 : onClick(e);
  };
  const prefixCls = getPrefixCls("tag", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$1(prefixCls);
  const cls = classNames(prefixCls, `${prefixCls}-checkable`, {
    [`${prefixCls}-checkable-checked`]: checked
  }, tag === null || tag === void 0 ? void 0 : tag.className, className, hashId, cssVarCls);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("span", Object.assign({}, restProps, {
    ref,
    style: Object.assign(Object.assign({}, style), tag === null || tag === void 0 ? void 0 : tag.style),
    className: cls,
    onClick: handleClick
  }), icon, /* @__PURE__ */ reactExports.createElement("span", null, children)));
});
const genPresetStyle = (token) => genPresetColor(token, (colorKey, {
  textColor,
  lightBorderColor,
  lightColor,
  darkColor
}) => ({
  [`${token.componentCls}${token.componentCls}-${colorKey}`]: {
    color: textColor,
    background: lightColor,
    borderColor: lightBorderColor,
    // Inverse color
    "&-inverse": {
      color: token.colorTextLightSolid,
      background: darkColor,
      borderColor: darkColor
    },
    [`&${token.componentCls}-borderless`]: {
      borderColor: "transparent"
    }
  }
}));
const PresetCmp = genSubStyleComponent(["Tag", "preset"], (token) => {
  const tagToken = prepareToken(token);
  return genPresetStyle(tagToken);
}, prepareComponentToken$1);
function capitalize$1(str) {
  if (typeof str !== "string") {
    return str;
  }
  const ret = str.charAt(0).toUpperCase() + str.slice(1);
  return ret;
}
const genTagStatusStyle = (token, status, cssVariableType) => {
  const capitalizedCssVariableType = capitalize$1(cssVariableType);
  return {
    [`${token.componentCls}${token.componentCls}-${status}`]: {
      color: token[`color${cssVariableType}`],
      background: token[`color${capitalizedCssVariableType}Bg`],
      borderColor: token[`color${capitalizedCssVariableType}Border`],
      [`&${token.componentCls}-borderless`]: {
        borderColor: "transparent"
      }
    }
  };
};
const StatusCmp = genSubStyleComponent(["Tag", "status"], (token) => {
  const tagToken = prepareToken(token);
  return [genTagStatusStyle(tagToken, "success", "Success"), genTagStatusStyle(tagToken, "processing", "Info"), genTagStatusStyle(tagToken, "error", "Error"), genTagStatusStyle(tagToken, "warning", "Warning")];
}, prepareComponentToken$1);
var __rest$2 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalTag = /* @__PURE__ */ reactExports.forwardRef((tagProps, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    children,
    icon,
    color,
    onClose,
    bordered = true,
    visible: deprecatedVisible
  } = tagProps, props = __rest$2(tagProps, ["prefixCls", "className", "rootClassName", "style", "children", "icon", "color", "onClose", "bordered", "visible"]);
  const {
    getPrefixCls,
    direction,
    tag: tagContext
  } = reactExports.useContext(ConfigContext);
  const [visible, setVisible] = reactExports.useState(true);
  const domProps = omit(props, ["closeIcon", "closable"]);
  reactExports.useEffect(() => {
    if (deprecatedVisible !== void 0) {
      setVisible(deprecatedVisible);
    }
  }, [deprecatedVisible]);
  const isPreset = isPresetColor(color);
  const isStatus = isPresetStatusColor(color);
  const isInternalColor = isPreset || isStatus;
  const tagStyle = Object.assign(Object.assign({
    backgroundColor: color && !isInternalColor ? color : void 0
  }, tagContext === null || tagContext === void 0 ? void 0 : tagContext.style), style);
  const prefixCls = getPrefixCls("tag", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$1(prefixCls);
  const tagClassName = classNames(prefixCls, tagContext === null || tagContext === void 0 ? void 0 : tagContext.className, {
    [`${prefixCls}-${color}`]: isInternalColor,
    [`${prefixCls}-has-color`]: color && !isInternalColor,
    [`${prefixCls}-hidden`]: !visible,
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-borderless`]: !bordered
  }, className, rootClassName, hashId, cssVarCls);
  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose === null || onClose === void 0 ? void 0 : onClose(e);
    if (e.defaultPrevented) {
      return;
    }
    setVisible(false);
  };
  const [, mergedCloseIcon] = useClosable(pickClosable(tagProps), pickClosable(tagContext), {
    closable: false,
    closeIconRender: (iconNode2) => {
      const replacement = /* @__PURE__ */ reactExports.createElement("span", {
        className: `${prefixCls}-close-icon`,
        onClick: handleCloseClick
      }, iconNode2);
      return replaceElement(iconNode2, replacement, (originProps) => ({
        onClick: (e) => {
          var _a;
          (_a = originProps === null || originProps === void 0 ? void 0 : originProps.onClick) === null || _a === void 0 ? void 0 : _a.call(originProps, e);
          handleCloseClick(e);
        },
        className: classNames(originProps === null || originProps === void 0 ? void 0 : originProps.className, `${prefixCls}-close-icon`)
      }));
    }
  });
  const isNeedWave = typeof props.onClick === "function" || children && children.type === "a";
  const iconNode = icon || null;
  const kids = iconNode ? /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, iconNode, children && /* @__PURE__ */ reactExports.createElement("span", null, children)) : children;
  const tagNode = /* @__PURE__ */ reactExports.createElement("span", Object.assign({}, domProps, {
    ref,
    className: tagClassName,
    style: tagStyle
  }), kids, mergedCloseIcon, isPreset && /* @__PURE__ */ reactExports.createElement(PresetCmp, {
    key: "preset",
    prefixCls
  }), isStatus && /* @__PURE__ */ reactExports.createElement(StatusCmp, {
    key: "status",
    prefixCls
  }));
  return wrapCSSVar(isNeedWave ? /* @__PURE__ */ reactExports.createElement(Wave, {
    component: "Tag"
  }, tagNode) : tagNode);
});
const Tag = InternalTag;
Tag.CheckableTag = CheckableTag;
var __rest$1 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const {
  TimePicker: InternalTimePicker,
  RangePicker: InternalRangePicker
} = DatePicker;
const RangePicker = /* @__PURE__ */ reactExports.forwardRef((props, ref) => /* @__PURE__ */ reactExports.createElement(InternalRangePicker, Object.assign({}, props, {
  picker: "time",
  mode: void 0,
  ref
})));
const TimePicker = /* @__PURE__ */ reactExports.forwardRef((_a, ref) => {
  var {
    addon,
    renderExtraFooter,
    variant,
    bordered
  } = _a, restProps = __rest$1(_a, ["addon", "renderExtraFooter", "variant", "bordered"]);
  const [mergedVariant] = useVariant("timePicker", variant, bordered);
  const internalRenderExtraFooter = reactExports.useMemo(() => {
    if (renderExtraFooter) {
      return renderExtraFooter;
    }
    if (addon) {
      return addon;
    }
    return void 0;
  }, [addon, renderExtraFooter]);
  return /* @__PURE__ */ reactExports.createElement(InternalTimePicker, Object.assign({}, restProps, {
    mode: void 0,
    ref,
    renderExtraFooter: internalRenderExtraFooter,
    variant: mergedVariant
  }));
});
const PurePanel = genPurePanel(TimePicker, "popupAlign", void 0, "picker");
TimePicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
TimePicker.RangePicker = RangePicker;
TimePicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
var DeleteOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" } }] }, "name": "delete", "theme": "outlined" };
var DeleteOutlined = function DeleteOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends$2({}, props, {
    ref,
    icon: DeleteOutlined$1
  }));
};
var RefIcon$b = /* @__PURE__ */ reactExports.forwardRef(DeleteOutlined);
const attrAccept = (function(file, acceptedFiles) {
  if (file && acceptedFiles) {
    var acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(",");
    var fileName = file.name || "";
    var mimeType = file.type || "";
    var baseMimeType = mimeType.replace(/\/.*$/, "");
    return acceptedFilesArray.some(function(type) {
      var validType = type.trim();
      if (/^\*(\/\*)?$/.test(type)) {
        return true;
      }
      if (validType.charAt(0) === ".") {
        var lowerFileName = fileName.toLowerCase();
        var lowerType = validType.toLowerCase();
        var affixList = [lowerType];
        if (lowerType === ".jpg" || lowerType === ".jpeg") {
          affixList = [".jpg", ".jpeg"];
        }
        return affixList.some(function(affix) {
          return lowerFileName.endsWith(affix);
        });
      }
      if (/\/\*$/.test(validType)) {
        return baseMimeType === validType.replace(/\/.*$/, "");
      }
      if (mimeType === validType) {
        return true;
      }
      if (/^\w+$/.test(validType)) {
        warningOnce(false, "Upload takes an invalidate 'accept' type '".concat(validType, "'.Skip for check."));
        return true;
      }
      return false;
    });
  }
  return true;
});
function getError(option, xhr) {
  var msg = "cannot ".concat(option.method, " ").concat(option.action, " ").concat(xhr.status, "'");
  var err = new Error(msg);
  err.status = xhr.status;
  err.method = option.method;
  err.url = option.action;
  return err;
}
function getBody(xhr) {
  var text2 = xhr.responseText || xhr.response;
  if (!text2) {
    return text2;
  }
  try {
    return JSON.parse(text2);
  } catch (e) {
    return text2;
  }
}
function upload(option) {
  var xhr = new XMLHttpRequest();
  if (option.onProgress && xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      option.onProgress(e);
    };
  }
  var formData = new FormData();
  if (option.data) {
    Object.keys(option.data).forEach(function(key2) {
      var value = option.data[key2];
      if (Array.isArray(value)) {
        value.forEach(function(item) {
          formData.append("".concat(key2, "[]"), item);
        });
        return;
      }
      formData.append(key2, value);
    });
  }
  if (option.file instanceof Blob) {
    formData.append(option.filename, option.file, option.file.name);
  } else {
    formData.append(option.filename, option.file);
  }
  xhr.onerror = function error(e) {
    option.onError(e);
  };
  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(option, xhr), getBody(xhr));
    }
    return option.onSuccess(getBody(xhr), xhr);
  };
  xhr.open(option.method, option.action, true);
  if (option.withCredentials && "withCredentials" in xhr) {
    xhr.withCredentials = true;
  }
  var headers = option.headers || {};
  if (headers["X-Requested-With"] !== null) {
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  }
  Object.keys(headers).forEach(function(h) {
    if (headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  });
  xhr.send(formData);
  return {
    abort: function abort() {
      xhr.abort();
    }
  };
}
var traverseFileTree = /* @__PURE__ */ (function() {
  var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee4(files, isAccepted) {
    var flattenFileList, progressFileList, readDirectory, _readDirectory, readFile, _readFile, _traverseFileTree, wipIndex;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _readFile = function _readFile3() {
            _readFile = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee3(item) {
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    return _context3.abrupt("return", new Promise(function(reslove) {
                      item.file(function(file) {
                        if (isAccepted(file)) {
                          if (item.fullPath && !file.webkitRelativePath) {
                            Object.defineProperties(file, {
                              webkitRelativePath: {
                                writable: true
                              }
                            });
                            file.webkitRelativePath = item.fullPath.replace(/^\//, "");
                            Object.defineProperties(file, {
                              webkitRelativePath: {
                                writable: false
                              }
                            });
                          }
                          reslove(file);
                        } else {
                          reslove(null);
                        }
                      });
                    }));
                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return _readFile.apply(this, arguments);
          };
          readFile = function _readFile2(_x4) {
            return _readFile.apply(this, arguments);
          };
          _readDirectory = function _readDirectory3() {
            _readDirectory = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2(directory) {
              var dirReader, entries2, results, n, i;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    dirReader = directory.createReader();
                    entries2 = [];
                  case 2:
                    _context2.next = 5;
                    return new Promise(function(resolve) {
                      dirReader.readEntries(resolve, function() {
                        return resolve([]);
                      });
                    });
                  case 5:
                    results = _context2.sent;
                    n = results.length;
                    if (n) {
                      _context2.next = 9;
                      break;
                    }
                    return _context2.abrupt("break", 12);
                  case 9:
                    for (i = 0; i < n; i++) {
                      entries2.push(results[i]);
                    }
                    _context2.next = 2;
                    break;
                  case 12:
                    return _context2.abrupt("return", entries2);
                  case 13:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return _readDirectory.apply(this, arguments);
          };
          readDirectory = function _readDirectory2(_x3) {
            return _readDirectory.apply(this, arguments);
          };
          flattenFileList = [];
          progressFileList = [];
          files.forEach(function(file) {
            return progressFileList.push(file.webkitGetAsEntry());
          });
          _traverseFileTree = /* @__PURE__ */ (function() {
            var _ref2 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(item, path) {
              var _file, entries2;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    if (item) {
                      _context.next = 2;
                      break;
                    }
                    return _context.abrupt("return");
                  case 2:
                    item.path = path || "";
                    if (!item.isFile) {
                      _context.next = 10;
                      break;
                    }
                    _context.next = 6;
                    return readFile(item);
                  case 6:
                    _file = _context.sent;
                    if (_file) {
                      flattenFileList.push(_file);
                    }
                    _context.next = 15;
                    break;
                  case 10:
                    if (!item.isDirectory) {
                      _context.next = 15;
                      break;
                    }
                    _context.next = 13;
                    return readDirectory(item);
                  case 13:
                    entries2 = _context.sent;
                    progressFileList.push.apply(progressFileList, _toConsumableArray(entries2));
                  case 15:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function _traverseFileTree2(_x5, _x6) {
              return _ref2.apply(this, arguments);
            };
          })();
          wipIndex = 0;
        case 9:
          if (!(wipIndex < progressFileList.length)) {
            _context4.next = 15;
            break;
          }
          _context4.next = 12;
          return _traverseFileTree(progressFileList[wipIndex]);
        case 12:
          wipIndex++;
          _context4.next = 9;
          break;
        case 15:
          return _context4.abrupt("return", flattenFileList);
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function traverseFileTree2(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
var now = +/* @__PURE__ */ new Date();
var index = 0;
function uid() {
  return "rc-upload-".concat(now, "-").concat(++index);
}
var _excluded$1 = ["component", "prefixCls", "className", "classNames", "disabled", "id", "name", "style", "styles", "multiple", "accept", "capture", "children", "directory", "folder", "openFileDialogOnClick", "onMouseEnter", "onMouseLeave", "hasControlInside"];
var AjaxUploader = /* @__PURE__ */ (function(_Component) {
  _inherits(AjaxUploader2, _Component);
  var _super = _createSuper(AjaxUploader2);
  function AjaxUploader2() {
    var _this;
    _classCallCheck(this, AjaxUploader2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized$1(_this), "state", {
      uid: uid()
    });
    _defineProperty(_assertThisInitialized$1(_this), "reqs", {});
    _defineProperty(_assertThisInitialized$1(_this), "fileInput", void 0);
    _defineProperty(_assertThisInitialized$1(_this), "_isMounted", void 0);
    _defineProperty(_assertThisInitialized$1(_this), "onChange", function(e) {
      var _this$props = _this.props, accept = _this$props.accept, directory = _this$props.directory;
      var files = e.target.files;
      var acceptedFiles = _toConsumableArray(files).filter(function(file) {
        return !directory || attrAccept(file, accept);
      });
      _this.uploadFiles(acceptedFiles);
      _this.reset();
    });
    _defineProperty(_assertThisInitialized$1(_this), "onClick", function(event) {
      var el = _this.fileInput;
      if (!el) {
        return;
      }
      var target = event.target;
      var onClick = _this.props.onClick;
      if (target && target.tagName === "BUTTON") {
        var parent = el.parentNode;
        parent.focus();
        target.blur();
      }
      el.click();
      if (onClick) {
        onClick(event);
      }
    });
    _defineProperty(_assertThisInitialized$1(_this), "onKeyDown", function(e) {
      if (e.key === "Enter") {
        _this.onClick(e);
      }
    });
    _defineProperty(_assertThisInitialized$1(_this), "onDataTransferFiles", /* @__PURE__ */ (function() {
      var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(dataTransfer, existFileCallback) {
        var _this$props2, multiple, accept, directory, items, files, acceptFiles;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this$props2 = _this.props, multiple = _this$props2.multiple, accept = _this$props2.accept, directory = _this$props2.directory;
              items = _toConsumableArray(dataTransfer.items || []);
              files = _toConsumableArray(dataTransfer.files || []);
              if (files.length > 0 || items.some(function(item) {
                return item.kind === "file";
              })) {
                existFileCallback === null || existFileCallback === void 0 || existFileCallback();
              }
              if (!directory) {
                _context.next = 11;
                break;
              }
              _context.next = 7;
              return traverseFileTree(Array.prototype.slice.call(items), function(_file) {
                return attrAccept(_file, _this.props.accept);
              });
            case 7:
              files = _context.sent;
              _this.uploadFiles(files);
              _context.next = 14;
              break;
            case 11:
              acceptFiles = _toConsumableArray(files).filter(function(file) {
                return attrAccept(file, accept);
              });
              if (multiple === false) {
                acceptFiles = files.slice(0, 1);
              }
              _this.uploadFiles(acceptFiles);
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    })());
    _defineProperty(_assertThisInitialized$1(_this), "onFilePaste", /* @__PURE__ */ (function() {
      var _ref2 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2(e) {
        var pastable, clipboardData;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              pastable = _this.props.pastable;
              if (pastable) {
                _context2.next = 3;
                break;
              }
              return _context2.abrupt("return");
            case 3:
              if (!(e.type === "paste")) {
                _context2.next = 6;
                break;
              }
              clipboardData = e.clipboardData;
              return _context2.abrupt("return", _this.onDataTransferFiles(clipboardData, function() {
                e.preventDefault();
              }));
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function(_x3) {
        return _ref2.apply(this, arguments);
      };
    })());
    _defineProperty(_assertThisInitialized$1(_this), "onFileDragOver", function(e) {
      e.preventDefault();
    });
    _defineProperty(_assertThisInitialized$1(_this), "onFileDrop", /* @__PURE__ */ (function() {
      var _ref3 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee3(e) {
        var dataTransfer;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              e.preventDefault();
              if (!(e.type === "drop")) {
                _context3.next = 4;
                break;
              }
              dataTransfer = e.dataTransfer;
              return _context3.abrupt("return", _this.onDataTransferFiles(dataTransfer));
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function(_x4) {
        return _ref3.apply(this, arguments);
      };
    })());
    _defineProperty(_assertThisInitialized$1(_this), "uploadFiles", function(files) {
      var originFiles = _toConsumableArray(files);
      var postFiles = originFiles.map(function(file) {
        file.uid = uid();
        return _this.processFile(file, originFiles);
      });
      Promise.all(postFiles).then(function(fileList) {
        var onBatchStart = _this.props.onBatchStart;
        onBatchStart === null || onBatchStart === void 0 || onBatchStart(fileList.map(function(_ref4) {
          var origin = _ref4.origin, parsedFile = _ref4.parsedFile;
          return {
            file: origin,
            parsedFile
          };
        }));
        fileList.filter(function(file) {
          return file.parsedFile !== null;
        }).forEach(function(file) {
          _this.post(file);
        });
      });
    });
    _defineProperty(_assertThisInitialized$1(_this), "processFile", /* @__PURE__ */ (function() {
      var _ref5 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee4(file, fileList) {
        var beforeUpload, transformedFile, action, mergedAction, data, mergedData, parsedData, parsedFile, mergedParsedFile;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              beforeUpload = _this.props.beforeUpload;
              transformedFile = file;
              if (!beforeUpload) {
                _context4.next = 14;
                break;
              }
              _context4.prev = 3;
              _context4.next = 6;
              return beforeUpload(file, fileList);
            case 6:
              transformedFile = _context4.sent;
              _context4.next = 12;
              break;
            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](3);
              transformedFile = false;
            case 12:
              if (!(transformedFile === false)) {
                _context4.next = 14;
                break;
              }
              return _context4.abrupt("return", {
                origin: file,
                parsedFile: null,
                action: null,
                data: null
              });
            case 14:
              action = _this.props.action;
              if (!(typeof action === "function")) {
                _context4.next = 21;
                break;
              }
              _context4.next = 18;
              return action(file);
            case 18:
              mergedAction = _context4.sent;
              _context4.next = 22;
              break;
            case 21:
              mergedAction = action;
            case 22:
              data = _this.props.data;
              if (!(typeof data === "function")) {
                _context4.next = 29;
                break;
              }
              _context4.next = 26;
              return data(file);
            case 26:
              mergedData = _context4.sent;
              _context4.next = 30;
              break;
            case 29:
              mergedData = data;
            case 30:
              parsedData = // string type is from legacy `transformFile`.
              // Not sure if this will work since no related test case works with it
              (_typeof(transformedFile) === "object" || typeof transformedFile === "string") && transformedFile ? transformedFile : file;
              if (parsedData instanceof File) {
                parsedFile = parsedData;
              } else {
                parsedFile = new File([parsedData], file.name, {
                  type: file.type
                });
              }
              mergedParsedFile = parsedFile;
              mergedParsedFile.uid = file.uid;
              return _context4.abrupt("return", {
                origin: file,
                data: mergedData,
                parsedFile: mergedParsedFile,
                action: mergedAction
              });
            case 35:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[3, 9]]);
      }));
      return function(_x5, _x6) {
        return _ref5.apply(this, arguments);
      };
    })());
    _defineProperty(_assertThisInitialized$1(_this), "saveFileInput", function(node) {
      _this.fileInput = node;
    });
    return _this;
  }
  _createClass(AjaxUploader2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
      var pastable = this.props.pastable;
      if (pastable) {
        document.addEventListener("paste", this.onFilePaste);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
      this.abort();
      document.removeEventListener("paste", this.onFilePaste);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var pastable = this.props.pastable;
      if (pastable && !prevProps.pastable) {
        document.addEventListener("paste", this.onFilePaste);
      } else if (!pastable && prevProps.pastable) {
        document.removeEventListener("paste", this.onFilePaste);
      }
    }
  }, {
    key: "post",
    value: function post(_ref6) {
      var _this2 = this;
      var data = _ref6.data, origin = _ref6.origin, action = _ref6.action, parsedFile = _ref6.parsedFile;
      if (!this._isMounted) {
        return;
      }
      var _this$props3 = this.props, onStart = _this$props3.onStart, customRequest = _this$props3.customRequest, name = _this$props3.name, headers = _this$props3.headers, withCredentials = _this$props3.withCredentials, method = _this$props3.method;
      var uid2 = origin.uid;
      var request = customRequest || upload;
      var requestOption = {
        action,
        filename: name,
        data,
        file: parsedFile,
        headers,
        withCredentials,
        method: method || "post",
        onProgress: function onProgress(e) {
          var onProgress2 = _this2.props.onProgress;
          onProgress2 === null || onProgress2 === void 0 || onProgress2(e, parsedFile);
        },
        onSuccess: function onSuccess(ret, xhr) {
          var onSuccess2 = _this2.props.onSuccess;
          onSuccess2 === null || onSuccess2 === void 0 || onSuccess2(ret, parsedFile, xhr);
          delete _this2.reqs[uid2];
        },
        onError: function onError(err, ret) {
          var onError2 = _this2.props.onError;
          onError2 === null || onError2 === void 0 || onError2(err, ret, parsedFile);
          delete _this2.reqs[uid2];
        }
      };
      onStart(origin);
      this.reqs[uid2] = request(requestOption, {
        defaultRequest: upload
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.setState({
        uid: uid()
      });
    }
  }, {
    key: "abort",
    value: function abort(file) {
      var reqs = this.reqs;
      if (file) {
        var uid2 = file.uid ? file.uid : file;
        if (reqs[uid2] && reqs[uid2].abort) {
          reqs[uid2].abort();
        }
        delete reqs[uid2];
      } else {
        Object.keys(reqs).forEach(function(uid3) {
          if (reqs[uid3] && reqs[uid3].abort) {
            reqs[uid3].abort();
          }
          delete reqs[uid3];
        });
      }
    }
  }, {
    key: "render",
    value: function render3() {
      var _this$props4 = this.props, Tag2 = _this$props4.component, prefixCls = _this$props4.prefixCls, className = _this$props4.className, _this$props4$classNam = _this$props4.classNames, classNames$1 = _this$props4$classNam === void 0 ? {} : _this$props4$classNam, disabled = _this$props4.disabled, id = _this$props4.id, name = _this$props4.name, style = _this$props4.style, _this$props4$styles = _this$props4.styles, styles = _this$props4$styles === void 0 ? {} : _this$props4$styles, multiple = _this$props4.multiple, accept = _this$props4.accept, capture = _this$props4.capture, children = _this$props4.children, directory = _this$props4.directory, folder = _this$props4.folder, openFileDialogOnClick = _this$props4.openFileDialogOnClick, onMouseEnter = _this$props4.onMouseEnter, onMouseLeave = _this$props4.onMouseLeave, hasControlInside = _this$props4.hasControlInside, otherProps = _objectWithoutProperties(_this$props4, _excluded$1);
      var cls = classNames(_defineProperty(_defineProperty(_defineProperty({}, prefixCls, true), "".concat(prefixCls, "-disabled"), disabled), className, className));
      var dirProps = directory || folder ? {
        directory: "directory",
        webkitdirectory: "webkitdirectory"
      } : {};
      var events2 = disabled ? {} : {
        onClick: openFileDialogOnClick ? this.onClick : function() {
        },
        onKeyDown: openFileDialogOnClick ? this.onKeyDown : function() {
        },
        onMouseEnter,
        onMouseLeave,
        onDrop: this.onFileDrop,
        onDragOver: this.onFileDragOver,
        tabIndex: hasControlInside ? void 0 : "0"
      };
      return /* @__PURE__ */ React.createElement(Tag2, _extends$2({}, events2, {
        className: cls,
        role: hasControlInside ? void 0 : "button",
        style
      }), /* @__PURE__ */ React.createElement("input", _extends$2({}, pickAttrs(otherProps, {
        aria: true,
        data: true
      }), {
        id,
        name,
        disabled,
        type: "file",
        ref: this.saveFileInput,
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        key: this.state.uid,
        style: _objectSpread2({
          display: "none"
        }, styles.input),
        className: classNames$1.input,
        accept
      }, dirProps, {
        multiple,
        onChange: this.onChange
      }, capture != null ? {
        capture
      } : {})), children);
    }
  }]);
  return AjaxUploader2;
})(reactExports.Component);
function empty() {
}
var Upload$2 = /* @__PURE__ */ (function(_Component) {
  _inherits(Upload2, _Component);
  var _super = _createSuper(Upload2);
  function Upload2() {
    var _this;
    _classCallCheck(this, Upload2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized$1(_this), "uploader", void 0);
    _defineProperty(_assertThisInitialized$1(_this), "saveUploader", function(node) {
      _this.uploader = node;
    });
    return _this;
  }
  _createClass(Upload2, [{
    key: "abort",
    value: function abort(file) {
      this.uploader.abort(file);
    }
  }, {
    key: "render",
    value: function render3() {
      return /* @__PURE__ */ React.createElement(AjaxUploader, _extends$2({}, this.props, {
        ref: this.saveUploader
      }));
    }
  }]);
  return Upload2;
})(reactExports.Component);
_defineProperty(Upload$2, "defaultProps", {
  component: "span",
  prefixCls: "rc-upload",
  data: {},
  headers: {},
  name: "file",
  multipart: false,
  onStart: empty,
  onError: empty,
  onSuccess: empty,
  multiple: false,
  beforeUpload: null,
  customRequest: null,
  withCredentials: false,
  openFileDialogOnClick: true,
  hasControlInside: false
});
const genDraggerStyle = (token) => {
  const {
    componentCls,
    iconCls
  } = token;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-drag`]: {
        position: "relative",
        width: "100%",
        height: "100%",
        textAlign: "center",
        background: token.colorFillAlter,
        border: `${unit(token.lineWidth)} dashed ${token.colorBorder}`,
        borderRadius: token.borderRadiusLG,
        cursor: "pointer",
        transition: `border-color ${token.motionDurationSlow}`,
        [componentCls]: {
          padding: token.padding
        },
        [`${componentCls}-btn`]: {
          display: "table",
          width: "100%",
          height: "100%",
          outline: "none",
          borderRadius: token.borderRadiusLG,
          "&:focus-visible": {
            outline: `${unit(token.lineWidthFocus)} solid ${token.colorPrimaryBorder}`
          }
        },
        [`${componentCls}-drag-container`]: {
          display: "table-cell",
          verticalAlign: "middle"
        },
        [`
          &:not(${componentCls}-disabled):hover,
          &-hover:not(${componentCls}-disabled)
        `]: {
          borderColor: token.colorPrimaryHover
        },
        [`p${componentCls}-drag-icon`]: {
          marginBottom: token.margin,
          [iconCls]: {
            color: token.colorPrimary,
            fontSize: token.uploadThumbnailSize
          }
        },
        [`p${componentCls}-text`]: {
          margin: `0 0 ${unit(token.marginXXS)}`,
          color: token.colorTextHeading,
          fontSize: token.fontSizeLG
        },
        [`p${componentCls}-hint`]: {
          color: token.colorTextDescription,
          fontSize: token.fontSize
        },
        // ===================== Disabled =====================
        [`&${componentCls}-disabled`]: {
          [`p${componentCls}-drag-icon ${iconCls},
            p${componentCls}-text,
            p${componentCls}-hint
          `]: {
            color: token.colorTextDisabled
          }
        }
      }
    }
  };
};
const genListStyle = (token) => {
  const {
    componentCls,
    iconCls,
    fontSize,
    lineHeight,
    calc
  } = token;
  const itemCls = `${componentCls}-list-item`;
  const actionsCls = `${itemCls}-actions`;
  const actionCls = `${itemCls}-action`;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-list`]: Object.assign(Object.assign({}, clearFix()), {
        lineHeight: token.lineHeight,
        [itemCls]: {
          position: "relative",
          height: calc(token.lineHeight).mul(fontSize).equal(),
          marginTop: token.marginXS,
          fontSize,
          display: "flex",
          alignItems: "center",
          transition: `background-color ${token.motionDurationSlow}`,
          borderRadius: token.borderRadiusSM,
          "&:hover": {
            backgroundColor: token.controlItemBgHover
          },
          [`${itemCls}-name`]: Object.assign(Object.assign({}, textEllipsis), {
            padding: `0 ${unit(token.paddingXS)}`,
            lineHeight,
            flex: "auto",
            transition: `all ${token.motionDurationSlow}`
          }),
          [actionsCls]: {
            whiteSpace: "nowrap",
            [actionCls]: {
              opacity: 0
            },
            [iconCls]: {
              color: token.actionsColor,
              transition: `all ${token.motionDurationSlow}`
            },
            [`
              ${actionCls}:focus-visible,
              &.picture ${actionCls}
            `]: {
              opacity: 1
            }
          },
          [`${componentCls}-icon ${iconCls}`]: {
            color: token.colorIcon,
            fontSize
          },
          [`${itemCls}-progress`]: {
            position: "absolute",
            bottom: token.calc(token.uploadProgressOffset).mul(-1).equal(),
            width: "100%",
            paddingInlineStart: calc(fontSize).add(token.paddingXS).equal(),
            fontSize,
            lineHeight: 0,
            pointerEvents: "none",
            "> div": {
              margin: 0
            }
          }
        },
        [`${itemCls}:hover ${actionCls}`]: {
          opacity: 1
        },
        [`${itemCls}-error`]: {
          color: token.colorError,
          [`${itemCls}-name, ${componentCls}-icon ${iconCls}`]: {
            color: token.colorError
          },
          [actionsCls]: {
            [`${iconCls}, ${iconCls}:hover`]: {
              color: token.colorError
            },
            [actionCls]: {
              opacity: 1
            }
          }
        },
        [`${componentCls}-list-item-container`]: {
          transition: `opacity ${token.motionDurationSlow}, height ${token.motionDurationSlow}`,
          // For smooth removing animation
          "&::before": {
            display: "table",
            width: 0,
            height: 0,
            content: '""'
          }
        }
      })
    }
  };
};
const genMotionStyle = (token) => {
  const {
    componentCls
  } = token;
  const uploadAnimateInlineIn = new Keyframe("uploadAnimateInlineIn", {
    from: {
      width: 0,
      height: 0,
      padding: 0,
      opacity: 0,
      margin: token.calc(token.marginXS).div(-2).equal()
    }
  });
  const uploadAnimateInlineOut = new Keyframe("uploadAnimateInlineOut", {
    to: {
      width: 0,
      height: 0,
      padding: 0,
      opacity: 0,
      margin: token.calc(token.marginXS).div(-2).equal()
    }
  });
  const inlineCls = `${componentCls}-animate-inline`;
  return [{
    [`${componentCls}-wrapper`]: {
      [`${inlineCls}-appear, ${inlineCls}-enter, ${inlineCls}-leave`]: {
        animationDuration: token.motionDurationSlow,
        animationTimingFunction: token.motionEaseInOutCirc,
        animationFillMode: "forwards"
      },
      [`${inlineCls}-appear, ${inlineCls}-enter`]: {
        animationName: uploadAnimateInlineIn
      },
      [`${inlineCls}-leave`]: {
        animationName: uploadAnimateInlineOut
      }
    }
  }, {
    [`${componentCls}-wrapper`]: initFadeMotion(token)
  }, uploadAnimateInlineIn, uploadAnimateInlineOut];
};
const genPictureStyle = (token) => {
  const {
    componentCls,
    iconCls,
    uploadThumbnailSize,
    uploadProgressOffset,
    calc
  } = token;
  const listCls = `${componentCls}-list`;
  const itemCls = `${listCls}-item`;
  return {
    [`${componentCls}-wrapper`]: {
      // ${listCls} 增加优先级
      [`
        ${listCls}${listCls}-picture,
        ${listCls}${listCls}-picture-card,
        ${listCls}${listCls}-picture-circle
      `]: {
        [itemCls]: {
          position: "relative",
          height: calc(uploadThumbnailSize).add(calc(token.lineWidth).mul(2)).add(calc(token.paddingXS).mul(2)).equal(),
          padding: token.paddingXS,
          border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
          borderRadius: token.borderRadiusLG,
          "&:hover": {
            background: "transparent"
          },
          [`${itemCls}-thumbnail`]: Object.assign(Object.assign({}, textEllipsis), {
            width: uploadThumbnailSize,
            height: uploadThumbnailSize,
            lineHeight: unit(calc(uploadThumbnailSize).add(token.paddingSM).equal()),
            textAlign: "center",
            flex: "none",
            [iconCls]: {
              fontSize: token.fontSizeHeading2,
              color: token.colorPrimary
            },
            img: {
              display: "block",
              width: "100%",
              height: "100%",
              overflow: "hidden"
            }
          }),
          [`${itemCls}-progress`]: {
            bottom: uploadProgressOffset,
            width: `calc(100% - ${unit(calc(token.paddingSM).mul(2).equal())})`,
            marginTop: 0,
            paddingInlineStart: calc(uploadThumbnailSize).add(token.paddingXS).equal()
          }
        },
        [`${itemCls}-error`]: {
          borderColor: token.colorError,
          // Adjust the color of the error icon : https://github.com/ant-design/ant-design/pull/24160
          [`${itemCls}-thumbnail ${iconCls}`]: {
            [`svg path[fill='${blue[0]}']`]: {
              fill: token.colorErrorBg
            },
            [`svg path[fill='${blue.primary}']`]: {
              fill: token.colorError
            }
          }
        },
        [`${itemCls}-uploading`]: {
          borderStyle: "dashed",
          [`${itemCls}-name`]: {
            marginBottom: uploadProgressOffset
          }
        }
      },
      [`${listCls}${listCls}-picture-circle ${itemCls}`]: {
        [`&, &::before, ${itemCls}-thumbnail`]: {
          borderRadius: "50%"
        }
      }
    }
  };
};
const genPictureCardStyle = (token) => {
  const {
    componentCls,
    iconCls,
    fontSizeLG,
    colorTextLightSolid,
    calc
  } = token;
  const listCls = `${componentCls}-list`;
  const itemCls = `${listCls}-item`;
  const uploadPictureCardSize = token.uploadPicCardSize;
  return {
    [`
      ${componentCls}-wrapper${componentCls}-picture-card-wrapper,
      ${componentCls}-wrapper${componentCls}-picture-circle-wrapper
    `]: Object.assign(Object.assign({}, clearFix()), {
      display: "block",
      [`${componentCls}${componentCls}-select`]: {
        width: uploadPictureCardSize,
        height: uploadPictureCardSize,
        textAlign: "center",
        verticalAlign: "top",
        backgroundColor: token.colorFillAlter,
        border: `${unit(token.lineWidth)} dashed ${token.colorBorder}`,
        borderRadius: token.borderRadiusLG,
        cursor: "pointer",
        transition: `border-color ${token.motionDurationSlow}`,
        [`> ${componentCls}`]: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center"
        },
        [`&:not(${componentCls}-disabled):hover`]: {
          borderColor: token.colorPrimary
        }
      },
      // list
      [`${listCls}${listCls}-picture-card, ${listCls}${listCls}-picture-circle`]: {
        display: "flex",
        flexWrap: "wrap",
        "@supports not (gap: 1px)": {
          "& > *": {
            marginBlockEnd: token.marginXS,
            marginInlineEnd: token.marginXS
          }
        },
        "@supports (gap: 1px)": {
          gap: token.marginXS
        },
        [`${listCls}-item-container`]: {
          display: "inline-block",
          width: uploadPictureCardSize,
          height: uploadPictureCardSize,
          verticalAlign: "top"
        },
        "&::after": {
          display: "none"
        },
        "&::before": {
          display: "none"
        },
        [itemCls]: {
          height: "100%",
          margin: 0,
          "&::before": {
            position: "absolute",
            zIndex: 1,
            width: `calc(100% - ${unit(calc(token.paddingXS).mul(2).equal())})`,
            height: `calc(100% - ${unit(calc(token.paddingXS).mul(2).equal())})`,
            backgroundColor: token.colorBgMask,
            opacity: 0,
            transition: `all ${token.motionDurationSlow}`,
            content: '" "'
          }
        },
        [`${itemCls}:hover`]: {
          [`&::before, ${itemCls}-actions`]: {
            opacity: 1
          }
        },
        [`${itemCls}-actions`]: {
          position: "absolute",
          insetInlineStart: 0,
          zIndex: 10,
          width: "100%",
          whiteSpace: "nowrap",
          textAlign: "center",
          opacity: 0,
          transition: `all ${token.motionDurationSlow}`,
          [`
            ${iconCls}-eye,
            ${iconCls}-download,
            ${iconCls}-delete
          `]: {
            zIndex: 10,
            width: fontSizeLG,
            margin: `0 ${unit(token.marginXXS)}`,
            fontSize: fontSizeLG,
            cursor: "pointer",
            transition: `all ${token.motionDurationSlow}`,
            color: colorTextLightSolid,
            "&:hover": {
              color: colorTextLightSolid
            },
            svg: {
              verticalAlign: "baseline"
            }
          }
        },
        [`${itemCls}-thumbnail, ${itemCls}-thumbnail img`]: {
          position: "static",
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "contain"
        },
        [`${itemCls}-name`]: {
          display: "none",
          textAlign: "center"
        },
        [`${itemCls}-file + ${itemCls}-name`]: {
          position: "absolute",
          bottom: token.margin,
          display: "block",
          width: `calc(100% - ${unit(calc(token.paddingXS).mul(2).equal())})`
        },
        [`${itemCls}-uploading`]: {
          [`&${itemCls}`]: {
            backgroundColor: token.colorFillAlter
          },
          [`&::before, ${iconCls}-eye, ${iconCls}-download, ${iconCls}-delete`]: {
            display: "none"
          }
        },
        [`${itemCls}-progress`]: {
          bottom: token.marginXL,
          width: `calc(100% - ${unit(calc(token.paddingXS).mul(2).equal())})`,
          paddingInlineStart: 0
        }
      }
    }),
    [`${componentCls}-wrapper${componentCls}-picture-circle-wrapper`]: {
      [`${componentCls}${componentCls}-select`]: {
        borderRadius: "50%"
      }
    }
  };
};
const genRtlStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-rtl`]: {
      direction: "rtl"
    }
  };
};
const genBaseStyle = (token) => {
  const {
    componentCls,
    colorTextDisabled
  } = token;
  return {
    [`${componentCls}-wrapper`]: Object.assign(Object.assign({}, resetComponent(token)), {
      [componentCls]: {
        outline: 0,
        "input[type='file']": {
          cursor: "pointer"
        }
      },
      [`${componentCls}-select`]: {
        display: "inline-block"
      },
      [`${componentCls}-hidden`]: {
        display: "none"
      },
      [`${componentCls}-disabled`]: {
        color: colorTextDisabled,
        cursor: "not-allowed"
      }
    })
  };
};
const prepareComponentToken = (token) => ({
  actionsColor: token.colorIcon,
  pictureCardSize: token.controlHeightLG * 2.55
});
const useStyle = genStyleHooks("Upload", (token) => {
  const {
    fontSizeHeading3,
    fontHeight,
    lineWidth,
    pictureCardSize,
    calc
  } = token;
  const uploadToken = merge$1(token, {
    uploadThumbnailSize: calc(fontSizeHeading3).mul(2).equal(),
    uploadProgressOffset: calc(calc(fontHeight).div(2)).add(lineWidth).equal(),
    uploadPicCardSize: pictureCardSize
  });
  return [genBaseStyle(uploadToken), genDraggerStyle(uploadToken), genPictureStyle(uploadToken), genPictureCardStyle(uploadToken), genListStyle(uploadToken), genMotionStyle(uploadToken), genRtlStyle(uploadToken), genCollapseMotion(uploadToken)];
}, prepareComponentToken);
var FileTwoTone$1 = { "icon": function render(primaryColor, secondaryColor) {
  return { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M534 352V136H232v752h560V394H576a42 42 0 01-42-42z", "fill": secondaryColor } }, { "tag": "path", "attrs": { "d": "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM602 137.8L790.2 326H602V137.8zM792 888H232V136h302v216a42 42 0 0042 42h216v494z", "fill": primaryColor } }] };
}, "name": "file", "theme": "twotone" };
var FileTwoTone = function FileTwoTone2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends$2({}, props, {
    ref,
    icon: FileTwoTone$1
  }));
};
var RefIcon$a = /* @__PURE__ */ reactExports.forwardRef(FileTwoTone);
var PaperClipOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M779.3 196.6c-94.2-94.2-247.6-94.2-341.7 0l-261 260.8c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l261-260.8c32.4-32.4 75.5-50.2 121.3-50.2s88.9 17.8 121.2 50.2c32.4 32.4 50.2 75.5 50.2 121.2 0 45.8-17.8 88.8-50.2 121.2l-266 265.9-43.1 43.1c-40.3 40.3-105.8 40.3-146.1 0-19.5-19.5-30.2-45.4-30.2-73s10.7-53.5 30.2-73l263.9-263.8c6.7-6.6 15.5-10.3 24.9-10.3h.1c9.4 0 18.1 3.7 24.7 10.3 6.7 6.7 10.3 15.5 10.3 24.9 0 9.3-3.7 18.1-10.3 24.7L372.4 653c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l215.6-215.6c19.9-19.9 30.8-46.3 30.8-74.4s-11-54.6-30.8-74.4c-41.1-41.1-107.9-41-149 0L463 364 224.8 602.1A172.22 172.22 0 00174 724.8c0 46.3 18.1 89.8 50.8 122.5 33.9 33.8 78.3 50.7 122.7 50.7 44.4 0 88.8-16.9 122.6-50.7l309.2-309C824.8 492.7 850 432 850 367.5c.1-64.6-25.1-125.3-70.7-170.9z" } }] }, "name": "paper-clip", "theme": "outlined" };
var PaperClipOutlined = function PaperClipOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends$2({}, props, {
    ref,
    icon: PaperClipOutlined$1
  }));
};
var RefIcon$9 = /* @__PURE__ */ reactExports.forwardRef(PaperClipOutlined);
var PictureTwoTone$1 = { "icon": function render2(primaryColor, secondaryColor) {
  return { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792zm0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z", "fill": primaryColor } }, { "tag": "path", "attrs": { "d": "M424.6 765.8l-150.1-178L136 752.1V792h752v-30.4L658.1 489z", "fill": secondaryColor } }, { "tag": "path", "attrs": { "d": "M136 652.7l132.4-157c3.2-3.8 9-3.8 12.2 0l144 170.7L652 396.8c3.2-3.8 9-3.8 12.2 0L888 662.2V232H136v420.7zM304 280a88 88 0 110 176 88 88 0 010-176z", "fill": secondaryColor } }, { "tag": "path", "attrs": { "d": "M276 368a28 28 0 1056 0 28 28 0 10-56 0z", "fill": secondaryColor } }, { "tag": "path", "attrs": { "d": "M304 456a88 88 0 100-176 88 88 0 000 176zm0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z", "fill": primaryColor } }] };
}, "name": "picture", "theme": "twotone" };
var PictureTwoTone = function PictureTwoTone2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends$2({}, props, {
    ref,
    icon: PictureTwoTone$1
  }));
};
var RefIcon$8 = /* @__PURE__ */ reactExports.forwardRef(PictureTwoTone);
function file2Obj(file) {
  return Object.assign(Object.assign({}, file), {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    percent: 0,
    originFileObj: file
  });
}
function updateFileList(file, fileList) {
  const nextFileList = _toConsumableArray(fileList);
  const fileIndex = nextFileList.findIndex(({
    uid: uid2
  }) => uid2 === file.uid);
  if (fileIndex === -1) {
    nextFileList.push(file);
  } else {
    nextFileList[fileIndex] = file;
  }
  return nextFileList;
}
function getFileItem(file, fileList) {
  const matchKey = file.uid !== void 0 ? "uid" : "name";
  return fileList.filter((item) => item[matchKey] === file[matchKey])[0];
}
function removeFileItem(file, fileList) {
  const matchKey = file.uid !== void 0 ? "uid" : "name";
  const removed = fileList.filter((item) => item[matchKey] !== file[matchKey]);
  if (removed.length === fileList.length) {
    return null;
  }
  return removed;
}
const extname = (url = "") => {
  const temp = url.split("/");
  const filename = temp[temp.length - 1];
  const filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [""])[0];
};
const isImageFileType = (type) => type.indexOf("image/") === 0;
const isImageUrl = (file) => {
  if (file.type && !file.thumbUrl) {
    return isImageFileType(file.type);
  }
  const url = file.thumbUrl || file.url || "";
  const extension = extname(url);
  if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico|heic|heif)$/i.test(extension)) {
    return true;
  }
  if (/^data:/.test(url)) {
    return false;
  }
  if (extension) {
    return false;
  }
  return true;
};
const MEASURE_SIZE = 200;
function previewImage(file) {
  return new Promise((resolve) => {
    if (!file.type || !isImageFileType(file.type)) {
      resolve("");
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = MEASURE_SIZE;
    canvas.height = MEASURE_SIZE;
    canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${MEASURE_SIZE}px; height: ${MEASURE_SIZE}px; z-index: 9999; display: none;`;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      const {
        width,
        height
      } = img;
      let drawWidth = MEASURE_SIZE;
      let drawHeight = MEASURE_SIZE;
      let offsetX = 0;
      let offsetY = 0;
      if (width > height) {
        drawHeight = height * (MEASURE_SIZE / width);
        offsetY = -(drawHeight - drawWidth) / 2;
      } else {
        drawWidth = width * (MEASURE_SIZE / height);
        offsetX = -(drawWidth - drawHeight) / 2;
      }
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      const dataURL = canvas.toDataURL();
      document.body.removeChild(canvas);
      window.URL.revokeObjectURL(img.src);
      resolve(dataURL);
    };
    img.crossOrigin = "anonymous";
    if (file.type.startsWith("image/svg+xml")) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          img.src = reader.result;
        }
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith("image/gif")) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      img.src = window.URL.createObjectURL(file);
    }
  });
}
var DownloadOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z" } }] }, "name": "download", "theme": "outlined" };
var DownloadOutlined = function DownloadOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends$2({}, props, {
    ref,
    icon: DownloadOutlined$1
  }));
};
var RefIcon$7 = /* @__PURE__ */ reactExports.forwardRef(DownloadOutlined);
const ListItem = /* @__PURE__ */ reactExports.forwardRef(({
  prefixCls,
  className,
  style,
  locale: locale2,
  listType,
  file,
  items,
  progress: progressProps,
  iconRender,
  actionIconRender,
  itemRender,
  isImgUrl,
  showPreviewIcon,
  showRemoveIcon,
  showDownloadIcon,
  previewIcon: customPreviewIcon,
  removeIcon: customRemoveIcon,
  downloadIcon: customDownloadIcon,
  extra: customExtra,
  onPreview,
  onDownload,
  onClose
}, ref) => {
  var _a, _b;
  const {
    status
  } = file;
  const [mergedStatus, setMergedStatus] = reactExports.useState(status);
  reactExports.useEffect(() => {
    if (status !== "removed") {
      setMergedStatus(status);
    }
  }, [status]);
  const [showProgress, setShowProgress] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgress(true);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const iconNode = iconRender(file);
  let icon = /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-icon`
  }, iconNode);
  if (listType === "picture" || listType === "picture-card" || listType === "picture-circle") {
    if (mergedStatus === "uploading" || !file.thumbUrl && !file.url) {
      const uploadingClassName = classNames(`${prefixCls}-list-item-thumbnail`, {
        [`${prefixCls}-list-item-file`]: mergedStatus !== "uploading"
      });
      icon = /* @__PURE__ */ reactExports.createElement("div", {
        className: uploadingClassName
      }, iconNode);
    } else {
      const thumbnail = (isImgUrl === null || isImgUrl === void 0 ? void 0 : isImgUrl(file)) ? /* @__PURE__ */ reactExports.createElement("img", {
        src: file.thumbUrl || file.url,
        alt: file.name,
        className: `${prefixCls}-list-item-image`,
        crossOrigin: file.crossOrigin
      }) : iconNode;
      const aClassName = classNames(`${prefixCls}-list-item-thumbnail`, {
        [`${prefixCls}-list-item-file`]: isImgUrl && !isImgUrl(file)
      });
      icon = /* @__PURE__ */ reactExports.createElement("a", {
        className: aClassName,
        onClick: (e) => onPreview(file, e),
        href: file.url || file.thumbUrl,
        target: "_blank",
        rel: "noopener noreferrer"
      }, thumbnail);
    }
  }
  const listItemClassName = classNames(`${prefixCls}-list-item`, `${prefixCls}-list-item-${mergedStatus}`);
  const linkProps = typeof file.linkProps === "string" ? JSON.parse(file.linkProps) : file.linkProps;
  const removeIcon = (typeof showRemoveIcon === "function" ? showRemoveIcon(file) : showRemoveIcon) ? actionIconRender(
    (typeof customRemoveIcon === "function" ? customRemoveIcon(file) : customRemoveIcon) || /* @__PURE__ */ reactExports.createElement(RefIcon$b, null),
    () => onClose(file),
    prefixCls,
    locale2.removeFile,
    // acceptUploadDisabled is true, only remove icon will follow Upload disabled prop
    // https://github.com/ant-design/ant-design/issues/46171
    true
  ) : null;
  const downloadIcon = (typeof showDownloadIcon === "function" ? showDownloadIcon(file) : showDownloadIcon) && mergedStatus === "done" ? actionIconRender((typeof customDownloadIcon === "function" ? customDownloadIcon(file) : customDownloadIcon) || /* @__PURE__ */ reactExports.createElement(RefIcon$7, null), () => onDownload(file), prefixCls, locale2.downloadFile) : null;
  const downloadOrDelete = listType !== "picture-card" && listType !== "picture-circle" && /* @__PURE__ */ reactExports.createElement("span", {
    key: "download-delete",
    className: classNames(`${prefixCls}-list-item-actions`, {
      picture: listType === "picture"
    })
  }, downloadIcon, removeIcon);
  const extraContent = typeof customExtra === "function" ? customExtra(file) : customExtra;
  const extra = extraContent && /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-list-item-extra`
  }, extraContent);
  const listItemNameClass = classNames(`${prefixCls}-list-item-name`);
  const fileName = file.url ? /* @__PURE__ */ reactExports.createElement("a", Object.assign({
    key: "view",
    target: "_blank",
    rel: "noopener noreferrer",
    className: listItemNameClass,
    title: file.name
  }, linkProps, {
    href: file.url,
    onClick: (e) => onPreview(file, e)
  }), file.name, extra) : /* @__PURE__ */ reactExports.createElement("span", {
    key: "view",
    className: listItemNameClass,
    onClick: (e) => onPreview(file, e),
    title: file.name
  }, file.name, extra);
  const previewIcon = (typeof showPreviewIcon === "function" ? showPreviewIcon(file) : showPreviewIcon) && (file.url || file.thumbUrl) ? /* @__PURE__ */ reactExports.createElement("a", {
    href: file.url || file.thumbUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    onClick: (e) => onPreview(file, e),
    title: locale2.previewFile
  }, typeof customPreviewIcon === "function" ? customPreviewIcon(file) : customPreviewIcon || /* @__PURE__ */ reactExports.createElement(RefIcon$i, null)) : null;
  const pictureCardActions = (listType === "picture-card" || listType === "picture-circle") && mergedStatus !== "uploading" && /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-list-item-actions`
  }, previewIcon, mergedStatus === "done" && downloadIcon, removeIcon);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const dom = /* @__PURE__ */ reactExports.createElement("div", {
    className: listItemClassName
  }, icon, fileName, downloadOrDelete, pictureCardActions, showProgress && /* @__PURE__ */ reactExports.createElement(CSSMotion, {
    motionName: `${rootPrefixCls}-fade`,
    visible: mergedStatus === "uploading",
    motionDeadline: 2e3
  }, ({
    className: motionClassName
  }) => {
    const loadingProgress = "percent" in file ? /* @__PURE__ */ reactExports.createElement(Progress$1, Object.assign({
      type: "line",
      percent: file.percent,
      "aria-label": file["aria-label"],
      "aria-labelledby": file["aria-labelledby"]
    }, progressProps)) : null;
    return /* @__PURE__ */ reactExports.createElement("div", {
      className: classNames(`${prefixCls}-list-item-progress`, motionClassName)
    }, loadingProgress);
  }));
  const message = file.response && typeof file.response === "string" ? file.response : ((_a = file.error) === null || _a === void 0 ? void 0 : _a.statusText) || ((_b = file.error) === null || _b === void 0 ? void 0 : _b.message) || locale2.uploadError;
  const item = mergedStatus === "error" ? /* @__PURE__ */ reactExports.createElement(Tooltip, {
    title: message,
    getPopupContainer: (node) => node.parentNode
  }, dom) : dom;
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames(`${prefixCls}-list-item-container`, className),
    style,
    ref
  }, itemRender ? itemRender(item, file, items, {
    download: onDownload.bind(null, file),
    preview: onPreview.bind(null, file),
    remove: onClose.bind(null, file)
  }) : item);
});
const InternalUploadList = (props, ref) => {
  const {
    listType = "text",
    previewFile = previewImage,
    onPreview,
    onDownload,
    onRemove,
    locale: locale2,
    iconRender,
    isImageUrl: isImgUrl = isImageUrl,
    prefixCls: customizePrefixCls,
    items = [],
    showPreviewIcon = true,
    showRemoveIcon = true,
    showDownloadIcon = false,
    removeIcon,
    previewIcon,
    downloadIcon,
    extra,
    progress = {
      size: [-1, 2],
      showInfo: false
    },
    appendAction,
    appendActionVisible = true,
    itemRender,
    disabled
  } = props;
  const [, forceUpdate] = useForceUpdate();
  const [motionAppear, setMotionAppear] = reactExports.useState(false);
  const isPictureCardOrCirle = ["picture-card", "picture-circle"].includes(listType);
  reactExports.useEffect(() => {
    if (!listType.startsWith("picture")) {
      return;
    }
    (items || []).forEach((file) => {
      if (!(file.originFileObj instanceof File || file.originFileObj instanceof Blob) || file.thumbUrl !== void 0) {
        return;
      }
      file.thumbUrl = "";
      previewFile === null || previewFile === void 0 ? void 0 : previewFile(file.originFileObj).then((previewDataUrl) => {
        file.thumbUrl = previewDataUrl || "";
        forceUpdate();
      });
    });
  }, [listType, items, previewFile]);
  reactExports.useEffect(() => {
    setMotionAppear(true);
  }, []);
  const onInternalPreview = (file, e) => {
    if (!onPreview) {
      return;
    }
    e === null || e === void 0 ? void 0 : e.preventDefault();
    return onPreview(file);
  };
  const onInternalDownload = (file) => {
    if (typeof onDownload === "function") {
      onDownload(file);
    } else if (file.url) {
      window.open(file.url);
    }
  };
  const onInternalClose = (file) => {
    onRemove === null || onRemove === void 0 ? void 0 : onRemove(file);
  };
  const internalIconRender = (file) => {
    if (iconRender) {
      return iconRender(file, listType);
    }
    const isLoading = file.status === "uploading";
    if (listType.startsWith("picture")) {
      const loadingIcon = listType === "picture" ? /* @__PURE__ */ reactExports.createElement(RefIcon$j, null) : locale2.uploading;
      const fileIcon = (isImgUrl === null || isImgUrl === void 0 ? void 0 : isImgUrl(file)) ? /* @__PURE__ */ reactExports.createElement(RefIcon$8, null) : /* @__PURE__ */ reactExports.createElement(RefIcon$a, null);
      return isLoading ? loadingIcon : fileIcon;
    }
    return isLoading ? /* @__PURE__ */ reactExports.createElement(RefIcon$j, null) : /* @__PURE__ */ reactExports.createElement(RefIcon$9, null);
  };
  const actionIconRender = (customIcon, callback, prefixCls2, title, acceptUploadDisabled) => {
    const btnProps = {
      type: "text",
      size: "small",
      title,
      onClick: (e) => {
        var _a, _b;
        callback();
        if (/* @__PURE__ */ reactExports.isValidElement(customIcon)) {
          (_b = (_a = customIcon.props).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        }
      },
      className: `${prefixCls2}-list-item-action`,
      disabled: acceptUploadDisabled ? disabled : false
    };
    return /* @__PURE__ */ reactExports.isValidElement(customIcon) ? /* @__PURE__ */ reactExports.createElement(Button$1, Object.assign({}, btnProps, {
      icon: cloneElement(customIcon, Object.assign(Object.assign({}, customIcon.props), {
        onClick: () => {
        }
      }))
    })) : /* @__PURE__ */ reactExports.createElement(Button$1, Object.assign({}, btnProps), /* @__PURE__ */ reactExports.createElement("span", null, customIcon));
  };
  reactExports.useImperativeHandle(ref, () => ({
    handlePreview: onInternalPreview,
    handleDownload: onInternalDownload
  }));
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("upload", customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const listClassNames = classNames(`${prefixCls}-list`, `${prefixCls}-list-${listType}`);
  const listItemMotion = reactExports.useMemo(() => omit(initCollapseMotion(rootPrefixCls), ["onAppearEnd", "onEnterEnd", "onLeaveEnd"]), [rootPrefixCls]);
  const motionConfig = Object.assign(Object.assign({}, isPictureCardOrCirle ? {} : listItemMotion), {
    motionDeadline: 2e3,
    motionName: `${prefixCls}-${isPictureCardOrCirle ? "animate-inline" : "animate"}`,
    keys: _toConsumableArray(items.map((file) => ({
      key: file.uid,
      file
    }))),
    motionAppear
  });
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: listClassNames
  }, /* @__PURE__ */ reactExports.createElement(CSSMotionList, Object.assign({}, motionConfig, {
    component: false
  }), ({
    key: key2,
    file,
    className: motionClassName,
    style: motionStyle
  }) => /* @__PURE__ */ reactExports.createElement(ListItem, {
    key: key2,
    locale: locale2,
    prefixCls,
    className: motionClassName,
    style: motionStyle,
    file,
    items,
    progress,
    listType,
    isImgUrl,
    showPreviewIcon,
    showRemoveIcon,
    showDownloadIcon,
    removeIcon,
    previewIcon,
    downloadIcon,
    extra,
    iconRender: internalIconRender,
    actionIconRender,
    itemRender,
    onPreview: onInternalPreview,
    onDownload: onInternalDownload,
    onClose: onInternalClose
  })), appendAction && /* @__PURE__ */ reactExports.createElement(CSSMotion, Object.assign({}, motionConfig, {
    visible: appendActionVisible,
    forceRender: true
  }), ({
    className: motionClassName,
    style: motionStyle
  }) => cloneElement(appendAction, (oriProps) => ({
    className: classNames(oriProps.className, motionClassName),
    style: Object.assign(Object.assign(Object.assign({}, motionStyle), {
      // prevent the element has hover css pseudo-class that may cause animation to end prematurely.
      pointerEvents: motionClassName ? "none" : void 0
    }), oriProps.style)
  }))));
};
const UploadList = /* @__PURE__ */ reactExports.forwardRef(InternalUploadList);
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, [])).next());
  });
};
const LIST_IGNORE = `__LIST_IGNORE_${Date.now()}__`;
const InternalUpload = (props, ref) => {
  const config = useComponentConfig("upload");
  const {
    fileList,
    defaultFileList,
    onRemove,
    showUploadList = true,
    listType = "text",
    onPreview,
    onDownload,
    onChange: onChange2,
    onDrop,
    previewFile,
    disabled: customDisabled,
    locale: propLocale,
    iconRender,
    isImageUrl: isImageUrl2,
    progress,
    prefixCls: customizePrefixCls,
    className,
    type = "select",
    children,
    style,
    itemRender,
    maxCount,
    data = {},
    multiple = false,
    hasControlInside = true,
    action = "",
    accept = "",
    supportServerRender = true,
    rootClassName
  } = props;
  const disabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  const customRequest = props.customRequest || config.customRequest;
  const [mergedFileList, setMergedFileList] = useMergedState(defaultFileList || [], {
    value: fileList,
    postState: (list) => list !== null && list !== void 0 ? list : []
  });
  const [dragState, setDragState] = reactExports.useState("drop");
  const upload2 = reactExports.useRef(null);
  const wrapRef = reactExports.useRef(null);
  reactExports.useMemo(() => {
    const timestamp = Date.now();
    (fileList || []).forEach((file, index2) => {
      if (!file.uid && !Object.isFrozen(file)) {
        file.uid = `__AUTO__${timestamp}_${index2}__`;
      }
    });
  }, [fileList]);
  const onInternalChange = (file, changedFileList, event) => {
    let cloneList = _toConsumableArray(changedFileList);
    let exceedMaxCount = false;
    if (maxCount === 1) {
      cloneList = cloneList.slice(-1);
    } else if (maxCount) {
      exceedMaxCount = cloneList.length > maxCount;
      cloneList = cloneList.slice(0, maxCount);
    }
    reactDomExports.flushSync(() => {
      setMergedFileList(cloneList);
    });
    const changeInfo = {
      file,
      fileList: cloneList
    };
    if (event) {
      changeInfo.event = event;
    }
    if (!exceedMaxCount || file.status === "removed" || // We should ignore event if current file is exceed `maxCount`
    cloneList.some((f) => f.uid === file.uid)) {
      reactDomExports.flushSync(() => {
        onChange2 === null || onChange2 === void 0 ? void 0 : onChange2(changeInfo);
      });
    }
  };
  const mergedBeforeUpload = (file, fileListArgs) => __awaiter(void 0, void 0, void 0, function* () {
    const {
      beforeUpload,
      transformFile
    } = props;
    let parsedFile = file;
    if (beforeUpload) {
      const result = yield beforeUpload(file, fileListArgs);
      if (result === false) {
        return false;
      }
      delete file[LIST_IGNORE];
      if (result === LIST_IGNORE) {
        Object.defineProperty(file, LIST_IGNORE, {
          value: true,
          configurable: true
        });
        return false;
      }
      if (typeof result === "object" && result) {
        parsedFile = result;
      }
    }
    if (transformFile) {
      parsedFile = yield transformFile(parsedFile);
    }
    return parsedFile;
  });
  const onBatchStart = (batchFileInfoList) => {
    const filteredFileInfoList = batchFileInfoList.filter((info) => !info.file[LIST_IGNORE]);
    if (!filteredFileInfoList.length) {
      return;
    }
    const objectFileList = filteredFileInfoList.map((info) => file2Obj(info.file));
    let newFileList = _toConsumableArray(mergedFileList);
    objectFileList.forEach((fileObj) => {
      newFileList = updateFileList(fileObj, newFileList);
    });
    objectFileList.forEach((fileObj, index2) => {
      let triggerFileObj = fileObj;
      if (!filteredFileInfoList[index2].parsedFile) {
        const {
          originFileObj
        } = fileObj;
        let clone2;
        try {
          clone2 = new File([originFileObj], originFileObj.name, {
            type: originFileObj.type
          });
        } catch (_a) {
          clone2 = new Blob([originFileObj], {
            type: originFileObj.type
          });
          clone2.name = originFileObj.name;
          clone2.lastModifiedDate = /* @__PURE__ */ new Date();
          clone2.lastModified = (/* @__PURE__ */ new Date()).getTime();
        }
        clone2.uid = fileObj.uid;
        triggerFileObj = clone2;
      } else {
        fileObj.status = "uploading";
      }
      onInternalChange(triggerFileObj, newFileList);
    });
  };
  const onSuccess = (response, file, xhr) => {
    try {
      if (typeof response === "string") {
        response = JSON.parse(response);
      }
    } catch (_a) {
    }
    if (!getFileItem(file, mergedFileList)) {
      return;
    }
    const targetItem = file2Obj(file);
    targetItem.status = "done";
    targetItem.percent = 100;
    targetItem.response = response;
    targetItem.xhr = xhr;
    const nextFileList = updateFileList(targetItem, mergedFileList);
    onInternalChange(targetItem, nextFileList);
  };
  const onProgress = (e, file) => {
    if (!getFileItem(file, mergedFileList)) {
      return;
    }
    const targetItem = file2Obj(file);
    targetItem.status = "uploading";
    targetItem.percent = e.percent;
    const nextFileList = updateFileList(targetItem, mergedFileList);
    onInternalChange(targetItem, nextFileList, e);
  };
  const onError = (error, response, file) => {
    if (!getFileItem(file, mergedFileList)) {
      return;
    }
    const targetItem = file2Obj(file);
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = "error";
    const nextFileList = updateFileList(targetItem, mergedFileList);
    onInternalChange(targetItem, nextFileList);
  };
  const handleRemove = (file) => {
    let currentFile;
    Promise.resolve(typeof onRemove === "function" ? onRemove(file) : onRemove).then((ret) => {
      var _a;
      if (ret === false) {
        return;
      }
      const removedFileList = removeFileItem(file, mergedFileList);
      if (removedFileList) {
        currentFile = Object.assign(Object.assign({}, file), {
          status: "removed"
        });
        mergedFileList === null || mergedFileList === void 0 ? void 0 : mergedFileList.forEach((item) => {
          const matchKey = currentFile.uid !== void 0 ? "uid" : "name";
          if (item[matchKey] === currentFile[matchKey] && !Object.isFrozen(item)) {
            item.status = "removed";
          }
        });
        (_a = upload2.current) === null || _a === void 0 ? void 0 : _a.abort(currentFile);
        onInternalChange(currentFile, removedFileList);
      }
    });
  };
  const onFileDrop = (e) => {
    setDragState(e.type);
    if (e.type === "drop") {
      onDrop === null || onDrop === void 0 ? void 0 : onDrop(e);
    }
  };
  reactExports.useImperativeHandle(ref, () => ({
    onBatchStart,
    onSuccess,
    onProgress,
    onError,
    fileList: mergedFileList,
    upload: upload2.current,
    nativeElement: wrapRef.current
  }));
  const {
    getPrefixCls,
    direction,
    upload: ctxUpload
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("upload", customizePrefixCls);
  const rcUploadProps = Object.assign(Object.assign({
    onBatchStart,
    onError,
    onProgress,
    onSuccess
  }, props), {
    customRequest,
    data,
    multiple,
    action,
    accept,
    supportServerRender,
    prefixCls,
    disabled: mergedDisabled,
    beforeUpload: mergedBeforeUpload,
    onChange: void 0,
    hasControlInside
  });
  delete rcUploadProps.className;
  delete rcUploadProps.style;
  if (!children || mergedDisabled) {
    delete rcUploadProps.id;
  }
  const wrapperCls = `${prefixCls}-wrapper`;
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, wrapperCls);
  const [contextLocale] = useLocale$1("Upload", localeValues.Upload);
  const {
    showRemoveIcon,
    showPreviewIcon,
    showDownloadIcon,
    removeIcon,
    previewIcon,
    downloadIcon,
    extra
  } = typeof showUploadList === "boolean" ? {} : showUploadList;
  const realShowRemoveIcon = typeof showRemoveIcon === "undefined" ? !mergedDisabled : showRemoveIcon;
  const renderUploadList = (button, buttonVisible) => {
    if (!showUploadList) {
      return button;
    }
    return /* @__PURE__ */ reactExports.createElement(UploadList, {
      prefixCls,
      listType,
      items: mergedFileList,
      previewFile,
      onPreview,
      onDownload,
      onRemove: handleRemove,
      showRemoveIcon: realShowRemoveIcon,
      showPreviewIcon,
      showDownloadIcon,
      removeIcon,
      previewIcon,
      downloadIcon,
      iconRender,
      extra,
      locale: Object.assign(Object.assign({}, contextLocale), propLocale),
      isImageUrl: isImageUrl2,
      progress,
      appendAction: button,
      appendActionVisible: buttonVisible,
      itemRender,
      disabled: mergedDisabled
    });
  };
  const mergedCls = classNames(wrapperCls, className, rootClassName, hashId, cssVarCls, ctxUpload === null || ctxUpload === void 0 ? void 0 : ctxUpload.className, {
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-picture-card-wrapper`]: listType === "picture-card",
    [`${prefixCls}-picture-circle-wrapper`]: listType === "picture-circle"
  });
  const mergedStyle = Object.assign(Object.assign({}, ctxUpload === null || ctxUpload === void 0 ? void 0 : ctxUpload.style), style);
  if (type === "drag") {
    const dragCls = classNames(hashId, prefixCls, `${prefixCls}-drag`, {
      [`${prefixCls}-drag-uploading`]: mergedFileList.some((file) => file.status === "uploading"),
      [`${prefixCls}-drag-hover`]: dragState === "dragover",
      [`${prefixCls}-disabled`]: mergedDisabled,
      [`${prefixCls}-rtl`]: direction === "rtl"
    });
    return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("span", {
      className: mergedCls,
      ref: wrapRef
    }, /* @__PURE__ */ reactExports.createElement("div", {
      className: dragCls,
      style: mergedStyle,
      onDrop: onFileDrop,
      onDragOver: onFileDrop,
      onDragLeave: onFileDrop
    }, /* @__PURE__ */ reactExports.createElement(Upload$2, Object.assign({}, rcUploadProps, {
      ref: upload2,
      className: `${prefixCls}-btn`
    }), /* @__PURE__ */ reactExports.createElement("div", {
      className: `${prefixCls}-drag-container`
    }, children))), renderUploadList()));
  }
  const uploadBtnCls = classNames(prefixCls, `${prefixCls}-select`, {
    [`${prefixCls}-disabled`]: mergedDisabled,
    [`${prefixCls}-hidden`]: !children
  });
  const uploadButton = /* @__PURE__ */ reactExports.createElement("div", {
    className: uploadBtnCls,
    style: mergedStyle
  }, /* @__PURE__ */ reactExports.createElement(Upload$2, Object.assign({}, rcUploadProps, {
    ref: upload2
  })));
  if (listType === "picture-card" || listType === "picture-circle") {
    return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("span", {
      className: mergedCls,
      ref: wrapRef
    }, renderUploadList(uploadButton, !!children)));
  }
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("span", {
    className: mergedCls,
    ref: wrapRef
  }, uploadButton, renderUploadList()));
};
const Upload$1 = /* @__PURE__ */ reactExports.forwardRef(InternalUpload);
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Dragger = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    style,
    height,
    hasControlInside = false,
    children
  } = props, restProps = __rest(props, ["style", "height", "hasControlInside", "children"]);
  const mergedStyle = Object.assign(Object.assign({}, style), {
    height
  });
  return /* @__PURE__ */ reactExports.createElement(Upload$1, Object.assign({
    ref,
    hasControlInside
  }, restProps, {
    style: mergedStyle,
    type: "drag"
  }), children);
});
const Upload = Upload$1;
Upload.Dragger = Dragger;
Upload.LIST_IGNORE = LIST_IGNORE;
var CameraOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M864 248H728l-32.4-90.8a32.07 32.07 0 00-30.2-21.2H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 248H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V328c0-44.2-35.8-80-80-80zm8 536c0 4.4-3.6 8-8 8H160c-4.4 0-8-3.6-8-8V328c0-4.4 3.6-8 8-8h186.7l17.1-47.8 22.9-64.2h250.5l22.9 64.2 17.1 47.8H864c4.4 0 8 3.6 8 8v456zM512 384c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160-71.6-160-160-160zm0 256c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z" } }] }, "name": "camera", "theme": "outlined" };
var CameraOutlined = function CameraOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends$2({}, props, {
    ref,
    icon: CameraOutlined$1
  }));
};
var RefIcon$6 = /* @__PURE__ */ reactExports.forwardRef(CameraOutlined);
var CloseCircleOutlined$1 = { "icon": { "tag": "svg", "attrs": { "fill-rule": "evenodd", "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm0 76c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm128.01 198.83c.03 0 .05.01.09.06l45.02 45.01a.2.2 0 01.05.09.12.12 0 010 .07c0 .02-.01.04-.05.08L557.25 512l127.87 127.86a.27.27 0 01.05.06v.02a.12.12 0 010 .07c0 .03-.01.05-.05.09l-45.02 45.02a.2.2 0 01-.09.05.12.12 0 01-.07 0c-.02 0-.04-.01-.08-.05L512 557.25 384.14 685.12c-.04.04-.06.05-.08.05a.12.12 0 01-.07 0c-.03 0-.05-.01-.09-.05l-45.02-45.02a.2.2 0 01-.05-.09.12.12 0 010-.07c0-.02.01-.04.06-.08L466.75 512 338.88 384.14a.27.27 0 01-.05-.06l-.01-.02a.12.12 0 010-.07c0-.03.01-.05.05-.09l45.02-45.02a.2.2 0 01.09-.05.12.12 0 01.07 0c.02 0 .04.01.08.06L512 466.75l127.86-127.86c.04-.05.06-.06.08-.06a.12.12 0 01.07 0z" } }] }, "name": "close-circle", "theme": "outlined" };
var CloseCircleOutlined = function CloseCircleOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends$2({}, props, {
    ref,
    icon: CloseCircleOutlined$1
  }));
};
var RefIcon$5 = /* @__PURE__ */ reactExports.forwardRef(CloseCircleOutlined);
var ExclamationCircleOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { "tag": "path", "attrs": { "d": "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" } }] }, "name": "exclamation-circle", "theme": "outlined" };
var ExclamationCircleOutlined = function ExclamationCircleOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends$2({}, props, {
    ref,
    icon: ExclamationCircleOutlined$1
  }));
};
var RefIcon$4 = /* @__PURE__ */ reactExports.forwardRef(ExclamationCircleOutlined);
var InboxOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M885.2 446.3l-.2-.8-112.2-285.1c-5-16.1-19.9-27.2-36.8-27.2H281.2c-17 0-32.1 11.3-36.9 27.6L139.4 443l-.3.7-.2.8c-1.3 4.9-1.7 9.9-1 14.8-.1 1.6-.2 3.2-.2 4.8V830a60.9 60.9 0 0060.8 60.8h627.2c33.5 0 60.8-27.3 60.9-60.8V464.1c0-1.3 0-2.6-.1-3.7.4-4.9 0-9.6-1.3-14.1zm-295.8-43l-.3 15.7c-.8 44.9-31.8 75.1-77.1 75.1-22.1 0-41.1-7.1-54.8-20.6S436 441.2 435.6 419l-.3-15.7H229.5L309 210h399.2l81.7 193.3H589.4zm-375 76.8h157.3c24.3 57.1 76 90.8 140.4 90.8 33.7 0 65-9.4 90.3-27.2 22.2-15.6 39.5-37.4 50.7-63.6h156.5V814H214.4V480.1z" } }] }, "name": "inbox", "theme": "outlined" };
var InboxOutlined = function InboxOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends$2({}, props, {
    ref,
    icon: InboxOutlined$1
  }));
};
var RefIcon$3 = /* @__PURE__ */ reactExports.forwardRef(InboxOutlined);
var MinusCircleFilled$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h368c4.4 0 8 3.6 8 8v48z" } }] }, "name": "minus-circle", "theme": "filled" };
var MinusCircleFilled = function MinusCircleFilled2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends$2({}, props, {
    ref,
    icon: MinusCircleFilled$1
  }));
};
var RefIcon$2 = /* @__PURE__ */ reactExports.forwardRef(MinusCircleFilled);
var PlusCircleFilled$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z" } }] }, "name": "plus-circle", "theme": "filled" };
var PlusCircleFilled = function PlusCircleFilled2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends$2({}, props, {
    ref,
    icon: PlusCircleFilled$1
  }));
};
var RefIcon$1 = /* @__PURE__ */ reactExports.forwardRef(PlusCircleFilled);
var UploadOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z" } }] }, "name": "upload", "theme": "outlined" };
var UploadOutlined = function UploadOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends$2({}, props, {
    ref,
    icon: UploadOutlined$1
  }));
};
var RefIcon = /* @__PURE__ */ reactExports.forwardRef(UploadOutlined);
const CrossIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 1L1 9M1 1L9 9", stroke: "#3232FF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) });
function useCombinedRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }
  return reactExports.useMemo(
    () => (node) => {
      refs.forEach((ref) => ref(node));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
}
const canUseDOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
function isWindow(element) {
  const elementString = Object.prototype.toString.call(element);
  return elementString === "[object Window]" || // In Electron context the Window object serializes to [object global]
  elementString === "[object global]";
}
function isNode(node) {
  return "nodeType" in node;
}
function getWindow(target) {
  var _target$ownerDocument, _target$ownerDocument2;
  if (!target) {
    return window;
  }
  if (isWindow(target)) {
    return target;
  }
  if (!isNode(target)) {
    return window;
  }
  return (_target$ownerDocument = (_target$ownerDocument2 = target.ownerDocument) == null ? void 0 : _target$ownerDocument2.defaultView) != null ? _target$ownerDocument : window;
}
function isDocument(node) {
  const {
    Document
  } = getWindow(node);
  return node instanceof Document;
}
function isHTMLElement(node) {
  if (isWindow(node)) {
    return false;
  }
  return node instanceof getWindow(node).HTMLElement;
}
function isSVGElement(node) {
  return node instanceof getWindow(node).SVGElement;
}
function getOwnerDocument(target) {
  if (!target) {
    return document;
  }
  if (isWindow(target)) {
    return target.document;
  }
  if (!isNode(target)) {
    return document;
  }
  if (isDocument(target)) {
    return target;
  }
  if (isHTMLElement(target) || isSVGElement(target)) {
    return target.ownerDocument;
  }
  return document;
}
const useIsomorphicLayoutEffect = canUseDOM ? reactExports.useLayoutEffect : reactExports.useEffect;
function useEvent(handler) {
  const handlerRef = reactExports.useRef(handler);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });
  return reactExports.useCallback(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return handlerRef.current == null ? void 0 : handlerRef.current(...args);
  }, []);
}
function useInterval() {
  const intervalRef = reactExports.useRef(null);
  const set = reactExports.useCallback((listener, duration) => {
    intervalRef.current = setInterval(listener, duration);
  }, []);
  const clear = reactExports.useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  return [set, clear];
}
function useLatestValue(value, dependencies) {
  if (dependencies === void 0) {
    dependencies = [value];
  }
  const valueRef = reactExports.useRef(value);
  useIsomorphicLayoutEffect(() => {
    if (valueRef.current !== value) {
      valueRef.current = value;
    }
  }, dependencies);
  return valueRef;
}
function useLazyMemo(callback, dependencies) {
  const valueRef = reactExports.useRef();
  return reactExports.useMemo(
    () => {
      const newValue = callback(valueRef.current);
      valueRef.current = newValue;
      return newValue;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...dependencies]
  );
}
function useNodeRef(onChange2) {
  const onChangeHandler = useEvent(onChange2);
  const node = reactExports.useRef(null);
  const setNodeRef = reactExports.useCallback(
    (element) => {
      if (element !== node.current) {
        onChangeHandler == null ? void 0 : onChangeHandler(element, node.current);
      }
      node.current = element;
    },
    //eslint-disable-next-line
    []
  );
  return [node, setNodeRef];
}
function usePrevious(value) {
  const ref = reactExports.useRef();
  reactExports.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
let ids = {};
function useUniqueId(prefix, value) {
  return reactExports.useMemo(() => {
    if (value) {
      return value;
    }
    const id = ids[prefix] == null ? 0 : ids[prefix] + 1;
    ids[prefix] = id;
    return prefix + "-" + id;
  }, [prefix, value]);
}
function createAdjustmentFn(modifier) {
  return function(object) {
    for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      adjustments[_key - 1] = arguments[_key];
    }
    return adjustments.reduce((accumulator, adjustment) => {
      const entries2 = Object.entries(adjustment);
      for (const [key2, valueAdjustment] of entries2) {
        const value = accumulator[key2];
        if (value != null) {
          accumulator[key2] = value + modifier * valueAdjustment;
        }
      }
      return accumulator;
    }, {
      ...object
    });
  };
}
const add = /* @__PURE__ */ createAdjustmentFn(1);
const subtract = /* @__PURE__ */ createAdjustmentFn(-1);
function hasViewportRelativeCoordinates(event) {
  return "clientX" in event && "clientY" in event;
}
function isKeyboardEvent(event) {
  if (!event) {
    return false;
  }
  const {
    KeyboardEvent
  } = getWindow(event.target);
  return KeyboardEvent && event instanceof KeyboardEvent;
}
function isTouchEvent(event) {
  if (!event) {
    return false;
  }
  const {
    TouchEvent
  } = getWindow(event.target);
  return TouchEvent && event instanceof TouchEvent;
}
function getEventCoordinates(event) {
  if (isTouchEvent(event)) {
    if (event.touches && event.touches.length) {
      const {
        clientX: x,
        clientY: y
      } = event.touches[0];
      return {
        x,
        y
      };
    } else if (event.changedTouches && event.changedTouches.length) {
      const {
        clientX: x,
        clientY: y
      } = event.changedTouches[0];
      return {
        x,
        y
      };
    }
  }
  if (hasViewportRelativeCoordinates(event)) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }
  return null;
}
const CSS = /* @__PURE__ */ Object.freeze({
  Translate: {
    toString(transform) {
      if (!transform) {
        return;
      }
      const {
        x,
        y
      } = transform;
      return "translate3d(" + (x ? Math.round(x) : 0) + "px, " + (y ? Math.round(y) : 0) + "px, 0)";
    }
  },
  Scale: {
    toString(transform) {
      if (!transform) {
        return;
      }
      const {
        scaleX,
        scaleY
      } = transform;
      return "scaleX(" + scaleX + ") scaleY(" + scaleY + ")";
    }
  },
  Transform: {
    toString(transform) {
      if (!transform) {
        return;
      }
      return [CSS.Translate.toString(transform), CSS.Scale.toString(transform)].join(" ");
    }
  },
  Transition: {
    toString(_ref) {
      let {
        property,
        duration,
        easing
      } = _ref;
      return property + " " + duration + "ms " + easing;
    }
  }
});
const SELECTOR = "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";
function findFirstFocusableNode(element) {
  if (element.matches(SELECTOR)) {
    return element;
  }
  return element.querySelector(SELECTOR);
}
const hiddenStyles = {
  display: "none"
};
function HiddenText(_ref) {
  let {
    id,
    value
  } = _ref;
  return React.createElement("div", {
    id,
    style: hiddenStyles
  }, value);
}
function LiveRegion(_ref) {
  let {
    id,
    announcement,
    ariaLiveType = "assertive"
  } = _ref;
  const visuallyHidden = {
    position: "fixed",
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(100%)",
    whiteSpace: "nowrap"
  };
  return React.createElement("div", {
    id,
    style: visuallyHidden,
    role: "status",
    "aria-live": ariaLiveType,
    "aria-atomic": true
  }, announcement);
}
function useAnnouncement() {
  const [announcement, setAnnouncement] = reactExports.useState("");
  const announce = reactExports.useCallback((value) => {
    if (value != null) {
      setAnnouncement(value);
    }
  }, []);
  return {
    announce,
    announcement
  };
}
const DndMonitorContext = /* @__PURE__ */ reactExports.createContext(null);
function useDndMonitor(listener) {
  const registerListener = reactExports.useContext(DndMonitorContext);
  reactExports.useEffect(() => {
    if (!registerListener) {
      throw new Error("useDndMonitor must be used within a children of <DndContext>");
    }
    const unsubscribe = registerListener(listener);
    return unsubscribe;
  }, [listener, registerListener]);
}
function useDndMonitorProvider() {
  const [listeners] = reactExports.useState(() => /* @__PURE__ */ new Set());
  const registerListener = reactExports.useCallback((listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, [listeners]);
  const dispatch = reactExports.useCallback((_ref) => {
    let {
      type,
      event
    } = _ref;
    listeners.forEach((listener) => {
      var _listener$type;
      return (_listener$type = listener[type]) == null ? void 0 : _listener$type.call(listener, event);
    });
  }, [listeners]);
  return [dispatch, registerListener];
}
const defaultScreenReaderInstructions = {
  draggable: "\n    To pick up a draggable item, press the space bar.\n    While dragging, use the arrow keys to move the item.\n    Press space again to drop the item in its new position, or press escape to cancel.\n  "
};
const defaultAnnouncements = {
  onDragStart(_ref) {
    let {
      active
    } = _ref;
    return "Picked up draggable item " + active.id + ".";
  },
  onDragOver(_ref2) {
    let {
      active,
      over
    } = _ref2;
    if (over) {
      return "Draggable item " + active.id + " was moved over droppable area " + over.id + ".";
    }
    return "Draggable item " + active.id + " is no longer over a droppable area.";
  },
  onDragEnd(_ref3) {
    let {
      active,
      over
    } = _ref3;
    if (over) {
      return "Draggable item " + active.id + " was dropped over droppable area " + over.id;
    }
    return "Draggable item " + active.id + " was dropped.";
  },
  onDragCancel(_ref4) {
    let {
      active
    } = _ref4;
    return "Dragging was cancelled. Draggable item " + active.id + " was dropped.";
  }
};
function Accessibility(_ref) {
  let {
    announcements = defaultAnnouncements,
    container,
    hiddenTextDescribedById,
    screenReaderInstructions = defaultScreenReaderInstructions
  } = _ref;
  const {
    announce,
    announcement
  } = useAnnouncement();
  const liveRegionId = useUniqueId("DndLiveRegion");
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setMounted(true);
  }, []);
  useDndMonitor(reactExports.useMemo(() => ({
    onDragStart(_ref2) {
      let {
        active
      } = _ref2;
      announce(announcements.onDragStart({
        active
      }));
    },
    onDragMove(_ref3) {
      let {
        active,
        over
      } = _ref3;
      if (announcements.onDragMove) {
        announce(announcements.onDragMove({
          active,
          over
        }));
      }
    },
    onDragOver(_ref4) {
      let {
        active,
        over
      } = _ref4;
      announce(announcements.onDragOver({
        active,
        over
      }));
    },
    onDragEnd(_ref5) {
      let {
        active,
        over
      } = _ref5;
      announce(announcements.onDragEnd({
        active,
        over
      }));
    },
    onDragCancel(_ref6) {
      let {
        active,
        over
      } = _ref6;
      announce(announcements.onDragCancel({
        active,
        over
      }));
    }
  }), [announce, announcements]));
  if (!mounted) {
    return null;
  }
  const markup = React.createElement(React.Fragment, null, React.createElement(HiddenText, {
    id: hiddenTextDescribedById,
    value: screenReaderInstructions.draggable
  }), React.createElement(LiveRegion, {
    id: liveRegionId,
    announcement
  }));
  return container ? reactDomExports.createPortal(markup, container) : markup;
}
var Action;
(function(Action2) {
  Action2["DragStart"] = "dragStart";
  Action2["DragMove"] = "dragMove";
  Action2["DragEnd"] = "dragEnd";
  Action2["DragCancel"] = "dragCancel";
  Action2["DragOver"] = "dragOver";
  Action2["RegisterDroppable"] = "registerDroppable";
  Action2["SetDroppableDisabled"] = "setDroppableDisabled";
  Action2["UnregisterDroppable"] = "unregisterDroppable";
})(Action || (Action = {}));
function noop() {
}
function useSensor(sensor, options) {
  return reactExports.useMemo(
    () => ({
      sensor,
      options: options != null ? options : {}
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sensor, options]
  );
}
function useSensors() {
  for (var _len = arguments.length, sensors = new Array(_len), _key = 0; _key < _len; _key++) {
    sensors[_key] = arguments[_key];
  }
  return reactExports.useMemo(
    () => [...sensors].filter((sensor) => sensor != null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...sensors]
  );
}
const defaultCoordinates = /* @__PURE__ */ Object.freeze({
  x: 0,
  y: 0
});
function distanceBetween(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
function getRelativeTransformOrigin(event, rect) {
  const eventCoordinates = getEventCoordinates(event);
  if (!eventCoordinates) {
    return "0 0";
  }
  const transformOrigin = {
    x: (eventCoordinates.x - rect.left) / rect.width * 100,
    y: (eventCoordinates.y - rect.top) / rect.height * 100
  };
  return transformOrigin.x + "% " + transformOrigin.y + "%";
}
function sortCollisionsAsc(_ref, _ref2) {
  let {
    data: {
      value: a
    }
  } = _ref;
  let {
    data: {
      value: b
    }
  } = _ref2;
  return a - b;
}
function sortCollisionsDesc(_ref3, _ref4) {
  let {
    data: {
      value: a
    }
  } = _ref3;
  let {
    data: {
      value: b
    }
  } = _ref4;
  return b - a;
}
function cornersOfRectangle(_ref5) {
  let {
    left,
    top,
    height,
    width
  } = _ref5;
  return [{
    x: left,
    y: top
  }, {
    x: left + width,
    y: top
  }, {
    x: left,
    y: top + height
  }, {
    x: left + width,
    y: top + height
  }];
}
function getFirstCollision(collisions, property) {
  if (!collisions || collisions.length === 0) {
    return null;
  }
  const [firstCollision] = collisions;
  return firstCollision[property];
}
function centerOfRectangle(rect, left, top) {
  if (left === void 0) {
    left = rect.left;
  }
  if (top === void 0) {
    top = rect.top;
  }
  return {
    x: left + rect.width * 0.5,
    y: top + rect.height * 0.5
  };
}
const closestCenter = (_ref) => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const centerRect = centerOfRectangle(collisionRect, collisionRect.left, collisionRect.top);
  const collisions = [];
  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);
    if (rect) {
      const distBetween = distanceBetween(centerOfRectangle(rect), centerRect);
      collisions.push({
        id,
        data: {
          droppableContainer,
          value: distBetween
        }
      });
    }
  }
  return collisions.sort(sortCollisionsAsc);
};
const closestCorners = (_ref) => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const corners = cornersOfRectangle(collisionRect);
  const collisions = [];
  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);
    if (rect) {
      const rectCorners = cornersOfRectangle(rect);
      const distances = corners.reduce((accumulator, corner, index2) => {
        return accumulator + distanceBetween(rectCorners[index2], corner);
      }, 0);
      const effectiveDistance = Number((distances / 4).toFixed(4));
      collisions.push({
        id,
        data: {
          droppableContainer,
          value: effectiveDistance
        }
      });
    }
  }
  return collisions.sort(sortCollisionsAsc);
};
function getIntersectionRatio(entry, target) {
  const top = Math.max(target.top, entry.top);
  const left = Math.max(target.left, entry.left);
  const right = Math.min(target.left + target.width, entry.left + entry.width);
  const bottom = Math.min(target.top + target.height, entry.top + entry.height);
  const width = right - left;
  const height = bottom - top;
  if (left < right && top < bottom) {
    const targetArea = target.width * target.height;
    const entryArea = entry.width * entry.height;
    const intersectionArea = width * height;
    const intersectionRatio = intersectionArea / (targetArea + entryArea - intersectionArea);
    return Number(intersectionRatio.toFixed(4));
  }
  return 0;
}
const rectIntersection = (_ref) => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const collisions = [];
  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);
    if (rect) {
      const intersectionRatio = getIntersectionRatio(rect, collisionRect);
      if (intersectionRatio > 0) {
        collisions.push({
          id,
          data: {
            droppableContainer,
            value: intersectionRatio
          }
        });
      }
    }
  }
  return collisions.sort(sortCollisionsDesc);
};
function isPointWithinRect(point, rect) {
  const {
    top,
    left,
    bottom,
    right
  } = rect;
  return top <= point.y && point.y <= bottom && left <= point.x && point.x <= right;
}
const pointerWithin = (_ref) => {
  let {
    droppableContainers,
    droppableRects,
    pointerCoordinates
  } = _ref;
  if (!pointerCoordinates) {
    return [];
  }
  const collisions = [];
  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);
    if (rect && isPointWithinRect(pointerCoordinates, rect)) {
      const corners = cornersOfRectangle(rect);
      const distances = corners.reduce((accumulator, corner) => {
        return accumulator + distanceBetween(pointerCoordinates, corner);
      }, 0);
      const effectiveDistance = Number((distances / 4).toFixed(4));
      collisions.push({
        id,
        data: {
          droppableContainer,
          value: effectiveDistance
        }
      });
    }
  }
  return collisions.sort(sortCollisionsAsc);
};
function adjustScale(transform, rect1, rect2) {
  return {
    ...transform,
    scaleX: rect1 && rect2 ? rect1.width / rect2.width : 1,
    scaleY: rect1 && rect2 ? rect1.height / rect2.height : 1
  };
}
function getRectDelta(rect1, rect2) {
  return rect1 && rect2 ? {
    x: rect1.left - rect2.left,
    y: rect1.top - rect2.top
  } : defaultCoordinates;
}
function createRectAdjustmentFn(modifier) {
  return function adjustClientRect(rect) {
    for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      adjustments[_key - 1] = arguments[_key];
    }
    return adjustments.reduce((acc, adjustment) => ({
      ...acc,
      top: acc.top + modifier * adjustment.y,
      bottom: acc.bottom + modifier * adjustment.y,
      left: acc.left + modifier * adjustment.x,
      right: acc.right + modifier * adjustment.x
    }), {
      ...rect
    });
  };
}
const getAdjustedRect = /* @__PURE__ */ createRectAdjustmentFn(1);
function parseTransform(transform) {
  if (transform.startsWith("matrix3d(")) {
    const transformArray = transform.slice(9, -1).split(/, /);
    return {
      x: +transformArray[12],
      y: +transformArray[13],
      scaleX: +transformArray[0],
      scaleY: +transformArray[5]
    };
  } else if (transform.startsWith("matrix(")) {
    const transformArray = transform.slice(7, -1).split(/, /);
    return {
      x: +transformArray[4],
      y: +transformArray[5],
      scaleX: +transformArray[0],
      scaleY: +transformArray[3]
    };
  }
  return null;
}
function inverseTransform(rect, transform, transformOrigin) {
  const parsedTransform = parseTransform(transform);
  if (!parsedTransform) {
    return rect;
  }
  const {
    scaleX,
    scaleY,
    x: translateX,
    y: translateY
  } = parsedTransform;
  const x = rect.left - translateX - (1 - scaleX) * parseFloat(transformOrigin);
  const y = rect.top - translateY - (1 - scaleY) * parseFloat(transformOrigin.slice(transformOrigin.indexOf(" ") + 1));
  const w = scaleX ? rect.width / scaleX : rect.width;
  const h = scaleY ? rect.height / scaleY : rect.height;
  return {
    width: w,
    height: h,
    top: y,
    right: x + w,
    bottom: y + h,
    left: x
  };
}
const defaultOptions = {
  ignoreTransform: false
};
function getClientRect(element, options) {
  if (options === void 0) {
    options = defaultOptions;
  }
  let rect = element.getBoundingClientRect();
  if (options.ignoreTransform) {
    const {
      transform,
      transformOrigin
    } = getWindow(element).getComputedStyle(element);
    if (transform) {
      rect = inverseTransform(rect, transform, transformOrigin);
    }
  }
  const {
    top,
    left,
    width,
    height,
    bottom,
    right
  } = rect;
  return {
    top,
    left,
    width,
    height,
    bottom,
    right
  };
}
function getTransformAgnosticClientRect(element) {
  return getClientRect(element, {
    ignoreTransform: true
  });
}
function getWindowClientRect(element) {
  const width = element.innerWidth;
  const height = element.innerHeight;
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height
  };
}
function isFixed(node, computedStyle) {
  if (computedStyle === void 0) {
    computedStyle = getWindow(node).getComputedStyle(node);
  }
  return computedStyle.position === "fixed";
}
function isScrollable(element, computedStyle) {
  if (computedStyle === void 0) {
    computedStyle = getWindow(element).getComputedStyle(element);
  }
  const overflowRegex = /(auto|scroll|overlay)/;
  const properties2 = ["overflow", "overflowX", "overflowY"];
  return properties2.some((property) => {
    const value = computedStyle[property];
    return typeof value === "string" ? overflowRegex.test(value) : false;
  });
}
function getScrollableAncestors(element, limit) {
  const scrollParents = [];
  function findScrollableAncestors(node) {
    if (limit != null && scrollParents.length >= limit) {
      return scrollParents;
    }
    if (!node) {
      return scrollParents;
    }
    if (isDocument(node) && node.scrollingElement != null && !scrollParents.includes(node.scrollingElement)) {
      scrollParents.push(node.scrollingElement);
      return scrollParents;
    }
    if (!isHTMLElement(node) || isSVGElement(node)) {
      return scrollParents;
    }
    if (scrollParents.includes(node)) {
      return scrollParents;
    }
    const computedStyle = getWindow(element).getComputedStyle(node);
    if (node !== element) {
      if (isScrollable(node, computedStyle)) {
        scrollParents.push(node);
      }
    }
    if (isFixed(node, computedStyle)) {
      return scrollParents;
    }
    return findScrollableAncestors(node.parentNode);
  }
  if (!element) {
    return scrollParents;
  }
  return findScrollableAncestors(element);
}
function getFirstScrollableAncestor(node) {
  const [firstScrollableAncestor] = getScrollableAncestors(node, 1);
  return firstScrollableAncestor != null ? firstScrollableAncestor : null;
}
function getScrollableElement(element) {
  if (!canUseDOM || !element) {
    return null;
  }
  if (isWindow(element)) {
    return element;
  }
  if (!isNode(element)) {
    return null;
  }
  if (isDocument(element) || element === getOwnerDocument(element).scrollingElement) {
    return window;
  }
  if (isHTMLElement(element)) {
    return element;
  }
  return null;
}
function getScrollXCoordinate(element) {
  if (isWindow(element)) {
    return element.scrollX;
  }
  return element.scrollLeft;
}
function getScrollYCoordinate(element) {
  if (isWindow(element)) {
    return element.scrollY;
  }
  return element.scrollTop;
}
function getScrollCoordinates(element) {
  return {
    x: getScrollXCoordinate(element),
    y: getScrollYCoordinate(element)
  };
}
var Direction;
(function(Direction2) {
  Direction2[Direction2["Forward"] = 1] = "Forward";
  Direction2[Direction2["Backward"] = -1] = "Backward";
})(Direction || (Direction = {}));
function isDocumentScrollingElement(element) {
  if (!canUseDOM || !element) {
    return false;
  }
  return element === document.scrollingElement;
}
function getScrollPosition(scrollingContainer) {
  const minScroll = {
    x: 0,
    y: 0
  };
  const dimensions = isDocumentScrollingElement(scrollingContainer) ? {
    height: window.innerHeight,
    width: window.innerWidth
  } : {
    height: scrollingContainer.clientHeight,
    width: scrollingContainer.clientWidth
  };
  const maxScroll = {
    x: scrollingContainer.scrollWidth - dimensions.width,
    y: scrollingContainer.scrollHeight - dimensions.height
  };
  const isTop = scrollingContainer.scrollTop <= minScroll.y;
  const isLeft = scrollingContainer.scrollLeft <= minScroll.x;
  const isBottom = scrollingContainer.scrollTop >= maxScroll.y;
  const isRight = scrollingContainer.scrollLeft >= maxScroll.x;
  return {
    isTop,
    isLeft,
    isBottom,
    isRight,
    maxScroll,
    minScroll
  };
}
const defaultThreshold = {
  x: 0.2,
  y: 0.2
};
function getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, _ref, acceleration, thresholdPercentage) {
  let {
    top,
    left,
    right,
    bottom
  } = _ref;
  if (acceleration === void 0) {
    acceleration = 10;
  }
  if (thresholdPercentage === void 0) {
    thresholdPercentage = defaultThreshold;
  }
  const {
    isTop,
    isBottom,
    isLeft,
    isRight
  } = getScrollPosition(scrollContainer);
  const direction = {
    x: 0,
    y: 0
  };
  const speed = {
    x: 0,
    y: 0
  };
  const threshold = {
    height: scrollContainerRect.height * thresholdPercentage.y,
    width: scrollContainerRect.width * thresholdPercentage.x
  };
  if (!isTop && top <= scrollContainerRect.top + threshold.height) {
    direction.y = Direction.Backward;
    speed.y = acceleration * Math.abs((scrollContainerRect.top + threshold.height - top) / threshold.height);
  } else if (!isBottom && bottom >= scrollContainerRect.bottom - threshold.height) {
    direction.y = Direction.Forward;
    speed.y = acceleration * Math.abs((scrollContainerRect.bottom - threshold.height - bottom) / threshold.height);
  }
  if (!isRight && right >= scrollContainerRect.right - threshold.width) {
    direction.x = Direction.Forward;
    speed.x = acceleration * Math.abs((scrollContainerRect.right - threshold.width - right) / threshold.width);
  } else if (!isLeft && left <= scrollContainerRect.left + threshold.width) {
    direction.x = Direction.Backward;
    speed.x = acceleration * Math.abs((scrollContainerRect.left + threshold.width - left) / threshold.width);
  }
  return {
    direction,
    speed
  };
}
function getScrollElementRect(element) {
  if (element === document.scrollingElement) {
    const {
      innerWidth,
      innerHeight
    } = window;
    return {
      top: 0,
      left: 0,
      right: innerWidth,
      bottom: innerHeight,
      width: innerWidth,
      height: innerHeight
    };
  }
  const {
    top,
    left,
    right,
    bottom
  } = element.getBoundingClientRect();
  return {
    top,
    left,
    right,
    bottom,
    width: element.clientWidth,
    height: element.clientHeight
  };
}
function getScrollOffsets(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return add(acc, getScrollCoordinates(node));
  }, defaultCoordinates);
}
function getScrollXOffset(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return acc + getScrollXCoordinate(node);
  }, 0);
}
function getScrollYOffset(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return acc + getScrollYCoordinate(node);
  }, 0);
}
function scrollIntoViewIfNeeded(element, measure) {
  if (measure === void 0) {
    measure = getClientRect;
  }
  if (!element) {
    return;
  }
  const {
    top,
    left,
    bottom,
    right
  } = measure(element);
  const firstScrollableAncestor = getFirstScrollableAncestor(element);
  if (!firstScrollableAncestor) {
    return;
  }
  if (bottom <= 0 || right <= 0 || top >= window.innerHeight || left >= window.innerWidth) {
    element.scrollIntoView({
      block: "center",
      inline: "center"
    });
  }
}
const properties = [["x", ["left", "right"], getScrollXOffset], ["y", ["top", "bottom"], getScrollYOffset]];
class Rect {
  constructor(rect, element) {
    this.rect = void 0;
    this.width = void 0;
    this.height = void 0;
    this.top = void 0;
    this.bottom = void 0;
    this.right = void 0;
    this.left = void 0;
    const scrollableAncestors = getScrollableAncestors(element);
    const scrollOffsets = getScrollOffsets(scrollableAncestors);
    this.rect = {
      ...rect
    };
    this.width = rect.width;
    this.height = rect.height;
    for (const [axis, keys, getScrollOffset] of properties) {
      for (const key2 of keys) {
        Object.defineProperty(this, key2, {
          get: () => {
            const currentOffsets = getScrollOffset(scrollableAncestors);
            const scrollOffsetsDeltla = scrollOffsets[axis] - currentOffsets;
            return this.rect[key2] + scrollOffsetsDeltla;
          },
          enumerable: true
        });
      }
    }
    Object.defineProperty(this, "rect", {
      enumerable: false
    });
  }
}
class Listeners {
  constructor(target) {
    this.target = void 0;
    this.listeners = [];
    this.removeAll = () => {
      this.listeners.forEach((listener) => {
        var _this$target;
        return (_this$target = this.target) == null ? void 0 : _this$target.removeEventListener(...listener);
      });
    };
    this.target = target;
  }
  add(eventName, handler, options) {
    var _this$target2;
    (_this$target2 = this.target) == null ? void 0 : _this$target2.addEventListener(eventName, handler, options);
    this.listeners.push([eventName, handler, options]);
  }
}
function getEventListenerTarget(target) {
  const {
    EventTarget
  } = getWindow(target);
  return target instanceof EventTarget ? target : getOwnerDocument(target);
}
function hasExceededDistance(delta, measurement) {
  const dx = Math.abs(delta.x);
  const dy = Math.abs(delta.y);
  if (typeof measurement === "number") {
    return Math.sqrt(dx ** 2 + dy ** 2) > measurement;
  }
  if ("x" in measurement && "y" in measurement) {
    return dx > measurement.x && dy > measurement.y;
  }
  if ("x" in measurement) {
    return dx > measurement.x;
  }
  if ("y" in measurement) {
    return dy > measurement.y;
  }
  return false;
}
var EventName;
(function(EventName2) {
  EventName2["Click"] = "click";
  EventName2["DragStart"] = "dragstart";
  EventName2["Keydown"] = "keydown";
  EventName2["ContextMenu"] = "contextmenu";
  EventName2["Resize"] = "resize";
  EventName2["SelectionChange"] = "selectionchange";
  EventName2["VisibilityChange"] = "visibilitychange";
})(EventName || (EventName = {}));
function preventDefault(event) {
  event.preventDefault();
}
function stopPropagation(event) {
  event.stopPropagation();
}
var KeyboardCode;
(function(KeyboardCode2) {
  KeyboardCode2["Space"] = "Space";
  KeyboardCode2["Down"] = "ArrowDown";
  KeyboardCode2["Right"] = "ArrowRight";
  KeyboardCode2["Left"] = "ArrowLeft";
  KeyboardCode2["Up"] = "ArrowUp";
  KeyboardCode2["Esc"] = "Escape";
  KeyboardCode2["Enter"] = "Enter";
  KeyboardCode2["Tab"] = "Tab";
})(KeyboardCode || (KeyboardCode = {}));
const defaultKeyboardCodes = {
  start: [KeyboardCode.Space, KeyboardCode.Enter],
  cancel: [KeyboardCode.Esc],
  end: [KeyboardCode.Space, KeyboardCode.Enter, KeyboardCode.Tab]
};
const defaultKeyboardCoordinateGetter = (event, _ref) => {
  let {
    currentCoordinates
  } = _ref;
  switch (event.code) {
    case KeyboardCode.Right:
      return {
        ...currentCoordinates,
        x: currentCoordinates.x + 25
      };
    case KeyboardCode.Left:
      return {
        ...currentCoordinates,
        x: currentCoordinates.x - 25
      };
    case KeyboardCode.Down:
      return {
        ...currentCoordinates,
        y: currentCoordinates.y + 25
      };
    case KeyboardCode.Up:
      return {
        ...currentCoordinates,
        y: currentCoordinates.y - 25
      };
  }
  return void 0;
};
class KeyboardSensor {
  constructor(props) {
    this.props = void 0;
    this.autoScrollEnabled = false;
    this.referenceCoordinates = void 0;
    this.listeners = void 0;
    this.windowListeners = void 0;
    this.props = props;
    const {
      event: {
        target
      }
    } = props;
    this.props = props;
    this.listeners = new Listeners(getOwnerDocument(target));
    this.windowListeners = new Listeners(getWindow(target));
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.attach();
  }
  attach() {
    this.handleStart();
    this.windowListeners.add(EventName.Resize, this.handleCancel);
    this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
    setTimeout(() => this.listeners.add(EventName.Keydown, this.handleKeyDown));
  }
  handleStart() {
    const {
      activeNode,
      onStart
    } = this.props;
    const node = activeNode.node.current;
    if (node) {
      scrollIntoViewIfNeeded(node);
    }
    onStart(defaultCoordinates);
  }
  handleKeyDown(event) {
    if (isKeyboardEvent(event)) {
      const {
        active,
        context,
        options
      } = this.props;
      const {
        keyboardCodes = defaultKeyboardCodes,
        coordinateGetter = defaultKeyboardCoordinateGetter,
        scrollBehavior = "smooth"
      } = options;
      const {
        code
      } = event;
      if (keyboardCodes.end.includes(code)) {
        this.handleEnd(event);
        return;
      }
      if (keyboardCodes.cancel.includes(code)) {
        this.handleCancel(event);
        return;
      }
      const {
        collisionRect
      } = context.current;
      const currentCoordinates = collisionRect ? {
        x: collisionRect.left,
        y: collisionRect.top
      } : defaultCoordinates;
      if (!this.referenceCoordinates) {
        this.referenceCoordinates = currentCoordinates;
      }
      const newCoordinates = coordinateGetter(event, {
        active,
        context: context.current,
        currentCoordinates
      });
      if (newCoordinates) {
        const coordinatesDelta = subtract(newCoordinates, currentCoordinates);
        const scrollDelta = {
          x: 0,
          y: 0
        };
        const {
          scrollableAncestors
        } = context.current;
        for (const scrollContainer of scrollableAncestors) {
          const direction = event.code;
          const {
            isTop,
            isRight,
            isLeft,
            isBottom,
            maxScroll,
            minScroll
          } = getScrollPosition(scrollContainer);
          const scrollElementRect = getScrollElementRect(scrollContainer);
          const clampedCoordinates = {
            x: Math.min(direction === KeyboardCode.Right ? scrollElementRect.right - scrollElementRect.width / 2 : scrollElementRect.right, Math.max(direction === KeyboardCode.Right ? scrollElementRect.left : scrollElementRect.left + scrollElementRect.width / 2, newCoordinates.x)),
            y: Math.min(direction === KeyboardCode.Down ? scrollElementRect.bottom - scrollElementRect.height / 2 : scrollElementRect.bottom, Math.max(direction === KeyboardCode.Down ? scrollElementRect.top : scrollElementRect.top + scrollElementRect.height / 2, newCoordinates.y))
          };
          const canScrollX = direction === KeyboardCode.Right && !isRight || direction === KeyboardCode.Left && !isLeft;
          const canScrollY = direction === KeyboardCode.Down && !isBottom || direction === KeyboardCode.Up && !isTop;
          if (canScrollX && clampedCoordinates.x !== newCoordinates.x) {
            const newScrollCoordinates = scrollContainer.scrollLeft + coordinatesDelta.x;
            const canScrollToNewCoordinates = direction === KeyboardCode.Right && newScrollCoordinates <= maxScroll.x || direction === KeyboardCode.Left && newScrollCoordinates >= minScroll.x;
            if (canScrollToNewCoordinates && !coordinatesDelta.y) {
              scrollContainer.scrollTo({
                left: newScrollCoordinates,
                behavior: scrollBehavior
              });
              return;
            }
            if (canScrollToNewCoordinates) {
              scrollDelta.x = scrollContainer.scrollLeft - newScrollCoordinates;
            } else {
              scrollDelta.x = direction === KeyboardCode.Right ? scrollContainer.scrollLeft - maxScroll.x : scrollContainer.scrollLeft - minScroll.x;
            }
            if (scrollDelta.x) {
              scrollContainer.scrollBy({
                left: -scrollDelta.x,
                behavior: scrollBehavior
              });
            }
            break;
          } else if (canScrollY && clampedCoordinates.y !== newCoordinates.y) {
            const newScrollCoordinates = scrollContainer.scrollTop + coordinatesDelta.y;
            const canScrollToNewCoordinates = direction === KeyboardCode.Down && newScrollCoordinates <= maxScroll.y || direction === KeyboardCode.Up && newScrollCoordinates >= minScroll.y;
            if (canScrollToNewCoordinates && !coordinatesDelta.x) {
              scrollContainer.scrollTo({
                top: newScrollCoordinates,
                behavior: scrollBehavior
              });
              return;
            }
            if (canScrollToNewCoordinates) {
              scrollDelta.y = scrollContainer.scrollTop - newScrollCoordinates;
            } else {
              scrollDelta.y = direction === KeyboardCode.Down ? scrollContainer.scrollTop - maxScroll.y : scrollContainer.scrollTop - minScroll.y;
            }
            if (scrollDelta.y) {
              scrollContainer.scrollBy({
                top: -scrollDelta.y,
                behavior: scrollBehavior
              });
            }
            break;
          }
        }
        this.handleMove(event, add(subtract(newCoordinates, this.referenceCoordinates), scrollDelta));
      }
    }
  }
  handleMove(event, coordinates) {
    const {
      onMove
    } = this.props;
    event.preventDefault();
    onMove(coordinates);
  }
  handleEnd(event) {
    const {
      onEnd
    } = this.props;
    event.preventDefault();
    this.detach();
    onEnd();
  }
  handleCancel(event) {
    const {
      onCancel
    } = this.props;
    event.preventDefault();
    this.detach();
    onCancel();
  }
  detach() {
    this.listeners.removeAll();
    this.windowListeners.removeAll();
  }
}
KeyboardSensor.activators = [{
  eventName: "onKeyDown",
  handler: (event, _ref, _ref2) => {
    let {
      keyboardCodes = defaultKeyboardCodes,
      onActivation
    } = _ref;
    let {
      active
    } = _ref2;
    const {
      code
    } = event.nativeEvent;
    if (keyboardCodes.start.includes(code)) {
      const activator = active.activatorNode.current;
      if (activator && event.target !== activator) {
        return false;
      }
      event.preventDefault();
      onActivation == null ? void 0 : onActivation({
        event: event.nativeEvent
      });
      return true;
    }
    return false;
  }
}];
function isDistanceConstraint(constraint) {
  return Boolean(constraint && "distance" in constraint);
}
function isDelayConstraint(constraint) {
  return Boolean(constraint && "delay" in constraint);
}
class AbstractPointerSensor {
  constructor(props, events2, listenerTarget) {
    var _getEventCoordinates;
    if (listenerTarget === void 0) {
      listenerTarget = getEventListenerTarget(props.event.target);
    }
    this.props = void 0;
    this.events = void 0;
    this.autoScrollEnabled = true;
    this.document = void 0;
    this.activated = false;
    this.initialCoordinates = void 0;
    this.timeoutId = null;
    this.listeners = void 0;
    this.documentListeners = void 0;
    this.windowListeners = void 0;
    this.props = props;
    this.events = events2;
    const {
      event
    } = props;
    const {
      target
    } = event;
    this.props = props;
    this.events = events2;
    this.document = getOwnerDocument(target);
    this.documentListeners = new Listeners(this.document);
    this.listeners = new Listeners(listenerTarget);
    this.windowListeners = new Listeners(getWindow(target));
    this.initialCoordinates = (_getEventCoordinates = getEventCoordinates(event)) != null ? _getEventCoordinates : defaultCoordinates;
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.removeTextSelection = this.removeTextSelection.bind(this);
    this.attach();
  }
  attach() {
    const {
      events: events2,
      props: {
        options: {
          activationConstraint,
          bypassActivationConstraint
        }
      }
    } = this;
    this.listeners.add(events2.move.name, this.handleMove, {
      passive: false
    });
    this.listeners.add(events2.end.name, this.handleEnd);
    if (events2.cancel) {
      this.listeners.add(events2.cancel.name, this.handleCancel);
    }
    this.windowListeners.add(EventName.Resize, this.handleCancel);
    this.windowListeners.add(EventName.DragStart, preventDefault);
    this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
    this.windowListeners.add(EventName.ContextMenu, preventDefault);
    this.documentListeners.add(EventName.Keydown, this.handleKeydown);
    if (activationConstraint) {
      if (bypassActivationConstraint != null && bypassActivationConstraint({
        event: this.props.event,
        activeNode: this.props.activeNode,
        options: this.props.options
      })) {
        return this.handleStart();
      }
      if (isDelayConstraint(activationConstraint)) {
        this.timeoutId = setTimeout(this.handleStart, activationConstraint.delay);
        this.handlePending(activationConstraint);
        return;
      }
      if (isDistanceConstraint(activationConstraint)) {
        this.handlePending(activationConstraint);
        return;
      }
    }
    this.handleStart();
  }
  detach() {
    this.listeners.removeAll();
    this.windowListeners.removeAll();
    setTimeout(this.documentListeners.removeAll, 50);
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
  handlePending(constraint, offset) {
    const {
      active,
      onPending
    } = this.props;
    onPending(active, constraint, this.initialCoordinates, offset);
  }
  handleStart() {
    const {
      initialCoordinates
    } = this;
    const {
      onStart
    } = this.props;
    if (initialCoordinates) {
      this.activated = true;
      this.documentListeners.add(EventName.Click, stopPropagation, {
        capture: true
      });
      this.removeTextSelection();
      this.documentListeners.add(EventName.SelectionChange, this.removeTextSelection);
      onStart(initialCoordinates);
    }
  }
  handleMove(event) {
    var _getEventCoordinates2;
    const {
      activated,
      initialCoordinates,
      props
    } = this;
    const {
      onMove,
      options: {
        activationConstraint
      }
    } = props;
    if (!initialCoordinates) {
      return;
    }
    const coordinates = (_getEventCoordinates2 = getEventCoordinates(event)) != null ? _getEventCoordinates2 : defaultCoordinates;
    const delta = subtract(initialCoordinates, coordinates);
    if (!activated && activationConstraint) {
      if (isDistanceConstraint(activationConstraint)) {
        if (activationConstraint.tolerance != null && hasExceededDistance(delta, activationConstraint.tolerance)) {
          return this.handleCancel();
        }
        if (hasExceededDistance(delta, activationConstraint.distance)) {
          return this.handleStart();
        }
      }
      if (isDelayConstraint(activationConstraint)) {
        if (hasExceededDistance(delta, activationConstraint.tolerance)) {
          return this.handleCancel();
        }
      }
      this.handlePending(activationConstraint, delta);
      return;
    }
    if (event.cancelable) {
      event.preventDefault();
    }
    onMove(coordinates);
  }
  handleEnd() {
    const {
      onAbort,
      onEnd
    } = this.props;
    this.detach();
    if (!this.activated) {
      onAbort(this.props.active);
    }
    onEnd();
  }
  handleCancel() {
    const {
      onAbort,
      onCancel
    } = this.props;
    this.detach();
    if (!this.activated) {
      onAbort(this.props.active);
    }
    onCancel();
  }
  handleKeydown(event) {
    if (event.code === KeyboardCode.Esc) {
      this.handleCancel();
    }
  }
  removeTextSelection() {
    var _this$document$getSel;
    (_this$document$getSel = this.document.getSelection()) == null ? void 0 : _this$document$getSel.removeAllRanges();
  }
}
const events = {
  cancel: {
    name: "pointercancel"
  },
  move: {
    name: "pointermove"
  },
  end: {
    name: "pointerup"
  }
};
class PointerSensor extends AbstractPointerSensor {
  constructor(props) {
    const {
      event
    } = props;
    const listenerTarget = getOwnerDocument(event.target);
    super(props, events, listenerTarget);
  }
}
PointerSensor.activators = [{
  eventName: "onPointerDown",
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;
    if (!event.isPrimary || event.button !== 0) {
      return false;
    }
    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];
const events$1 = {
  move: {
    name: "mousemove"
  },
  end: {
    name: "mouseup"
  }
};
var MouseButton;
(function(MouseButton2) {
  MouseButton2[MouseButton2["RightClick"] = 2] = "RightClick";
})(MouseButton || (MouseButton = {}));
class MouseSensor extends AbstractPointerSensor {
  constructor(props) {
    super(props, events$1, getOwnerDocument(props.event.target));
  }
}
MouseSensor.activators = [{
  eventName: "onMouseDown",
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;
    if (event.button === MouseButton.RightClick) {
      return false;
    }
    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];
const events$2 = {
  cancel: {
    name: "touchcancel"
  },
  move: {
    name: "touchmove"
  },
  end: {
    name: "touchend"
  }
};
class TouchSensor extends AbstractPointerSensor {
  constructor(props) {
    super(props, events$2);
  }
  static setup() {
    window.addEventListener(events$2.move.name, noop2, {
      capture: false,
      passive: false
    });
    return function teardown() {
      window.removeEventListener(events$2.move.name, noop2);
    };
    function noop2() {
    }
  }
}
TouchSensor.activators = [{
  eventName: "onTouchStart",
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;
    const {
      touches
    } = event;
    if (touches.length > 1) {
      return false;
    }
    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];
var AutoScrollActivator;
(function(AutoScrollActivator2) {
  AutoScrollActivator2[AutoScrollActivator2["Pointer"] = 0] = "Pointer";
  AutoScrollActivator2[AutoScrollActivator2["DraggableRect"] = 1] = "DraggableRect";
})(AutoScrollActivator || (AutoScrollActivator = {}));
var TraversalOrder;
(function(TraversalOrder2) {
  TraversalOrder2[TraversalOrder2["TreeOrder"] = 0] = "TreeOrder";
  TraversalOrder2[TraversalOrder2["ReversedTreeOrder"] = 1] = "ReversedTreeOrder";
})(TraversalOrder || (TraversalOrder = {}));
function useAutoScroller(_ref) {
  let {
    acceleration,
    activator = AutoScrollActivator.Pointer,
    canScroll,
    draggingRect,
    enabled,
    interval = 5,
    order = TraversalOrder.TreeOrder,
    pointerCoordinates,
    scrollableAncestors,
    scrollableAncestorRects,
    delta,
    threshold
  } = _ref;
  const scrollIntent = useScrollIntent({
    delta,
    disabled: !enabled
  });
  const [setAutoScrollInterval, clearAutoScrollInterval] = useInterval();
  const scrollSpeed = reactExports.useRef({
    x: 0,
    y: 0
  });
  const scrollDirection = reactExports.useRef({
    x: 0,
    y: 0
  });
  const rect = reactExports.useMemo(() => {
    switch (activator) {
      case AutoScrollActivator.Pointer:
        return pointerCoordinates ? {
          top: pointerCoordinates.y,
          bottom: pointerCoordinates.y,
          left: pointerCoordinates.x,
          right: pointerCoordinates.x
        } : null;
      case AutoScrollActivator.DraggableRect:
        return draggingRect;
    }
  }, [activator, draggingRect, pointerCoordinates]);
  const scrollContainerRef = reactExports.useRef(null);
  const autoScroll = reactExports.useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }
    const scrollLeft = scrollSpeed.current.x * scrollDirection.current.x;
    const scrollTop = scrollSpeed.current.y * scrollDirection.current.y;
    scrollContainer.scrollBy(scrollLeft, scrollTop);
  }, []);
  const sortedScrollableAncestors = reactExports.useMemo(() => order === TraversalOrder.TreeOrder ? [...scrollableAncestors].reverse() : scrollableAncestors, [order, scrollableAncestors]);
  reactExports.useEffect(
    () => {
      if (!enabled || !scrollableAncestors.length || !rect) {
        clearAutoScrollInterval();
        return;
      }
      for (const scrollContainer of sortedScrollableAncestors) {
        if ((canScroll == null ? void 0 : canScroll(scrollContainer)) === false) {
          continue;
        }
        const index2 = scrollableAncestors.indexOf(scrollContainer);
        const scrollContainerRect = scrollableAncestorRects[index2];
        if (!scrollContainerRect) {
          continue;
        }
        const {
          direction,
          speed
        } = getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, rect, acceleration, threshold);
        for (const axis of ["x", "y"]) {
          if (!scrollIntent[axis][direction[axis]]) {
            speed[axis] = 0;
            direction[axis] = 0;
          }
        }
        if (speed.x > 0 || speed.y > 0) {
          clearAutoScrollInterval();
          scrollContainerRef.current = scrollContainer;
          setAutoScrollInterval(autoScroll, interval);
          scrollSpeed.current = speed;
          scrollDirection.current = direction;
          return;
        }
      }
      scrollSpeed.current = {
        x: 0,
        y: 0
      };
      scrollDirection.current = {
        x: 0,
        y: 0
      };
      clearAutoScrollInterval();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      acceleration,
      autoScroll,
      canScroll,
      clearAutoScrollInterval,
      enabled,
      interval,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(rect),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(scrollIntent),
      setAutoScrollInterval,
      scrollableAncestors,
      sortedScrollableAncestors,
      scrollableAncestorRects,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(threshold)
    ]
  );
}
const defaultScrollIntent = {
  x: {
    [Direction.Backward]: false,
    [Direction.Forward]: false
  },
  y: {
    [Direction.Backward]: false,
    [Direction.Forward]: false
  }
};
function useScrollIntent(_ref2) {
  let {
    delta,
    disabled
  } = _ref2;
  const previousDelta = usePrevious(delta);
  return useLazyMemo((previousIntent) => {
    if (disabled || !previousDelta || !previousIntent) {
      return defaultScrollIntent;
    }
    const direction = {
      x: Math.sign(delta.x - previousDelta.x),
      y: Math.sign(delta.y - previousDelta.y)
    };
    return {
      x: {
        [Direction.Backward]: previousIntent.x[Direction.Backward] || direction.x === -1,
        [Direction.Forward]: previousIntent.x[Direction.Forward] || direction.x === 1
      },
      y: {
        [Direction.Backward]: previousIntent.y[Direction.Backward] || direction.y === -1,
        [Direction.Forward]: previousIntent.y[Direction.Forward] || direction.y === 1
      }
    };
  }, [disabled, delta, previousDelta]);
}
function useCachedNode(draggableNodes, id) {
  const draggableNode = id != null ? draggableNodes.get(id) : void 0;
  const node = draggableNode ? draggableNode.node.current : null;
  return useLazyMemo((cachedNode) => {
    var _ref;
    if (id == null) {
      return null;
    }
    return (_ref = node != null ? node : cachedNode) != null ? _ref : null;
  }, [node, id]);
}
function useCombineActivators(sensors, getSyntheticHandler) {
  return reactExports.useMemo(() => sensors.reduce((accumulator, sensor) => {
    const {
      sensor: Sensor
    } = sensor;
    const sensorActivators = Sensor.activators.map((activator) => ({
      eventName: activator.eventName,
      handler: getSyntheticHandler(activator.handler, sensor)
    }));
    return [...accumulator, ...sensorActivators];
  }, []), [sensors, getSyntheticHandler]);
}
var MeasuringStrategy;
(function(MeasuringStrategy2) {
  MeasuringStrategy2[MeasuringStrategy2["Always"] = 0] = "Always";
  MeasuringStrategy2[MeasuringStrategy2["BeforeDragging"] = 1] = "BeforeDragging";
  MeasuringStrategy2[MeasuringStrategy2["WhileDragging"] = 2] = "WhileDragging";
})(MeasuringStrategy || (MeasuringStrategy = {}));
var MeasuringFrequency;
(function(MeasuringFrequency2) {
  MeasuringFrequency2["Optimized"] = "optimized";
})(MeasuringFrequency || (MeasuringFrequency = {}));
const defaultValue = /* @__PURE__ */ new Map();
function useDroppableMeasuring(containers, _ref) {
  let {
    dragging,
    dependencies,
    config
  } = _ref;
  const [queue, setQueue] = reactExports.useState(null);
  const {
    frequency,
    measure,
    strategy
  } = config;
  const containersRef = reactExports.useRef(containers);
  const disabled = isDisabled();
  const disabledRef = useLatestValue(disabled);
  const measureDroppableContainers = reactExports.useCallback(function(ids2) {
    if (ids2 === void 0) {
      ids2 = [];
    }
    if (disabledRef.current) {
      return;
    }
    setQueue((value) => {
      if (value === null) {
        return ids2;
      }
      return value.concat(ids2.filter((id) => !value.includes(id)));
    });
  }, [disabledRef]);
  const timeoutId = reactExports.useRef(null);
  const droppableRects = useLazyMemo((previousValue) => {
    if (disabled && !dragging) {
      return defaultValue;
    }
    if (!previousValue || previousValue === defaultValue || containersRef.current !== containers || queue != null) {
      const map = /* @__PURE__ */ new Map();
      for (let container of containers) {
        if (!container) {
          continue;
        }
        if (queue && queue.length > 0 && !queue.includes(container.id) && container.rect.current) {
          map.set(container.id, container.rect.current);
          continue;
        }
        const node = container.node.current;
        const rect = node ? new Rect(measure(node), node) : null;
        container.rect.current = rect;
        if (rect) {
          map.set(container.id, rect);
        }
      }
      return map;
    }
    return previousValue;
  }, [containers, queue, dragging, disabled, measure]);
  reactExports.useEffect(() => {
    containersRef.current = containers;
  }, [containers]);
  reactExports.useEffect(
    () => {
      if (disabled) {
        return;
      }
      measureDroppableContainers();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dragging, disabled]
  );
  reactExports.useEffect(
    () => {
      if (queue && queue.length > 0) {
        setQueue(null);
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(queue)]
  );
  reactExports.useEffect(
    () => {
      if (disabled || typeof frequency !== "number" || timeoutId.current !== null) {
        return;
      }
      timeoutId.current = setTimeout(() => {
        measureDroppableContainers();
        timeoutId.current = null;
      }, frequency);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [frequency, disabled, measureDroppableContainers, ...dependencies]
  );
  return {
    droppableRects,
    measureDroppableContainers,
    measuringScheduled: queue != null
  };
  function isDisabled() {
    switch (strategy) {
      case MeasuringStrategy.Always:
        return false;
      case MeasuringStrategy.BeforeDragging:
        return dragging;
      default:
        return !dragging;
    }
  }
}
function useInitialValue(value, computeFn) {
  return useLazyMemo((previousValue) => {
    if (!value) {
      return null;
    }
    if (previousValue) {
      return previousValue;
    }
    return typeof computeFn === "function" ? computeFn(value) : value;
  }, [computeFn, value]);
}
function useInitialRect(node, measure) {
  return useInitialValue(node, measure);
}
function useMutationObserver(_ref) {
  let {
    callback,
    disabled
  } = _ref;
  const handleMutations = useEvent(callback);
  const mutationObserver = reactExports.useMemo(() => {
    if (disabled || typeof window === "undefined" || typeof window.MutationObserver === "undefined") {
      return void 0;
    }
    const {
      MutationObserver
    } = window;
    return new MutationObserver(handleMutations);
  }, [handleMutations, disabled]);
  reactExports.useEffect(() => {
    return () => mutationObserver == null ? void 0 : mutationObserver.disconnect();
  }, [mutationObserver]);
  return mutationObserver;
}
function useResizeObserver(_ref) {
  let {
    callback,
    disabled
  } = _ref;
  const handleResize = useEvent(callback);
  const resizeObserver = reactExports.useMemo(
    () => {
      if (disabled || typeof window === "undefined" || typeof window.ResizeObserver === "undefined") {
        return void 0;
      }
      const {
        ResizeObserver
      } = window;
      return new ResizeObserver(handleResize);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled]
  );
  reactExports.useEffect(() => {
    return () => resizeObserver == null ? void 0 : resizeObserver.disconnect();
  }, [resizeObserver]);
  return resizeObserver;
}
function defaultMeasure(element) {
  return new Rect(getClientRect(element), element);
}
function useRect(element, measure, fallbackRect) {
  if (measure === void 0) {
    measure = defaultMeasure;
  }
  const [rect, setRect] = reactExports.useState(null);
  function measureRect() {
    setRect((currentRect) => {
      if (!element) {
        return null;
      }
      if (element.isConnected === false) {
        var _ref;
        return (_ref = currentRect != null ? currentRect : fallbackRect) != null ? _ref : null;
      }
      const newRect = measure(element);
      if (JSON.stringify(currentRect) === JSON.stringify(newRect)) {
        return currentRect;
      }
      return newRect;
    });
  }
  const mutationObserver = useMutationObserver({
    callback(records) {
      if (!element) {
        return;
      }
      for (const record of records) {
        const {
          type,
          target
        } = record;
        if (type === "childList" && target instanceof HTMLElement && target.contains(element)) {
          measureRect();
          break;
        }
      }
    }
  });
  const resizeObserver = useResizeObserver({
    callback: measureRect
  });
  useIsomorphicLayoutEffect(() => {
    measureRect();
    if (element) {
      resizeObserver == null ? void 0 : resizeObserver.observe(element);
      mutationObserver == null ? void 0 : mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else {
      resizeObserver == null ? void 0 : resizeObserver.disconnect();
      mutationObserver == null ? void 0 : mutationObserver.disconnect();
    }
  }, [element]);
  return rect;
}
function useRectDelta(rect) {
  const initialRect = useInitialValue(rect);
  return getRectDelta(rect, initialRect);
}
const defaultValue$1 = [];
function useScrollableAncestors(node) {
  const previousNode = reactExports.useRef(node);
  const ancestors = useLazyMemo((previousValue) => {
    if (!node) {
      return defaultValue$1;
    }
    if (previousValue && previousValue !== defaultValue$1 && node && previousNode.current && node.parentNode === previousNode.current.parentNode) {
      return previousValue;
    }
    return getScrollableAncestors(node);
  }, [node]);
  reactExports.useEffect(() => {
    previousNode.current = node;
  }, [node]);
  return ancestors;
}
function useScrollOffsets(elements) {
  const [scrollCoordinates, setScrollCoordinates] = reactExports.useState(null);
  const prevElements = reactExports.useRef(elements);
  const handleScroll = reactExports.useCallback((event) => {
    const scrollingElement = getScrollableElement(event.target);
    if (!scrollingElement) {
      return;
    }
    setScrollCoordinates((scrollCoordinates2) => {
      if (!scrollCoordinates2) {
        return null;
      }
      scrollCoordinates2.set(scrollingElement, getScrollCoordinates(scrollingElement));
      return new Map(scrollCoordinates2);
    });
  }, []);
  reactExports.useEffect(() => {
    const previousElements = prevElements.current;
    if (elements !== previousElements) {
      cleanup(previousElements);
      const entries2 = elements.map((element) => {
        const scrollableElement = getScrollableElement(element);
        if (scrollableElement) {
          scrollableElement.addEventListener("scroll", handleScroll, {
            passive: true
          });
          return [scrollableElement, getScrollCoordinates(scrollableElement)];
        }
        return null;
      }).filter((entry) => entry != null);
      setScrollCoordinates(entries2.length ? new Map(entries2) : null);
      prevElements.current = elements;
    }
    return () => {
      cleanup(elements);
      cleanup(previousElements);
    };
    function cleanup(elements2) {
      elements2.forEach((element) => {
        const scrollableElement = getScrollableElement(element);
        scrollableElement == null ? void 0 : scrollableElement.removeEventListener("scroll", handleScroll);
      });
    }
  }, [handleScroll, elements]);
  return reactExports.useMemo(() => {
    if (elements.length) {
      return scrollCoordinates ? Array.from(scrollCoordinates.values()).reduce((acc, coordinates) => add(acc, coordinates), defaultCoordinates) : getScrollOffsets(elements);
    }
    return defaultCoordinates;
  }, [elements, scrollCoordinates]);
}
function useScrollOffsetsDelta(scrollOffsets, dependencies) {
  if (dependencies === void 0) {
    dependencies = [];
  }
  const initialScrollOffsets = reactExports.useRef(null);
  reactExports.useEffect(
    () => {
      initialScrollOffsets.current = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  );
  reactExports.useEffect(() => {
    const hasScrollOffsets = scrollOffsets !== defaultCoordinates;
    if (hasScrollOffsets && !initialScrollOffsets.current) {
      initialScrollOffsets.current = scrollOffsets;
    }
    if (!hasScrollOffsets && initialScrollOffsets.current) {
      initialScrollOffsets.current = null;
    }
  }, [scrollOffsets]);
  return initialScrollOffsets.current ? subtract(scrollOffsets, initialScrollOffsets.current) : defaultCoordinates;
}
function useSensorSetup(sensors) {
  reactExports.useEffect(
    () => {
      if (!canUseDOM) {
        return;
      }
      const teardownFns = sensors.map((_ref) => {
        let {
          sensor
        } = _ref;
        return sensor.setup == null ? void 0 : sensor.setup();
      });
      return () => {
        for (const teardown of teardownFns) {
          teardown == null ? void 0 : teardown();
        }
      };
    },
    // TO-DO: Sensors length could theoretically change which would not be a valid dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    sensors.map((_ref2) => {
      let {
        sensor
      } = _ref2;
      return sensor;
    })
  );
}
function useSyntheticListeners(listeners, id) {
  return reactExports.useMemo(() => {
    return listeners.reduce((acc, _ref) => {
      let {
        eventName,
        handler
      } = _ref;
      acc[eventName] = (event) => {
        handler(event, id);
      };
      return acc;
    }, {});
  }, [listeners, id]);
}
function useWindowRect(element) {
  return reactExports.useMemo(() => element ? getWindowClientRect(element) : null, [element]);
}
const defaultValue$2 = [];
function useRects(elements, measure) {
  if (measure === void 0) {
    measure = getClientRect;
  }
  const [firstElement] = elements;
  const windowRect = useWindowRect(firstElement ? getWindow(firstElement) : null);
  const [rects, setRects] = reactExports.useState(defaultValue$2);
  function measureRects() {
    setRects(() => {
      if (!elements.length) {
        return defaultValue$2;
      }
      return elements.map((element) => isDocumentScrollingElement(element) ? windowRect : new Rect(measure(element), element));
    });
  }
  const resizeObserver = useResizeObserver({
    callback: measureRects
  });
  useIsomorphicLayoutEffect(() => {
    resizeObserver == null ? void 0 : resizeObserver.disconnect();
    measureRects();
    elements.forEach((element) => resizeObserver == null ? void 0 : resizeObserver.observe(element));
  }, [elements]);
  return rects;
}
function getMeasurableNode(node) {
  if (!node) {
    return null;
  }
  if (node.children.length > 1) {
    return node;
  }
  const firstChild = node.children[0];
  return isHTMLElement(firstChild) ? firstChild : node;
}
function useDragOverlayMeasuring(_ref) {
  let {
    measure
  } = _ref;
  const [rect, setRect] = reactExports.useState(null);
  const handleResize = reactExports.useCallback((entries2) => {
    for (const {
      target
    } of entries2) {
      if (isHTMLElement(target)) {
        setRect((rect2) => {
          const newRect = measure(target);
          return rect2 ? {
            ...rect2,
            width: newRect.width,
            height: newRect.height
          } : newRect;
        });
        break;
      }
    }
  }, [measure]);
  const resizeObserver = useResizeObserver({
    callback: handleResize
  });
  const handleNodeChange = reactExports.useCallback((element) => {
    const node = getMeasurableNode(element);
    resizeObserver == null ? void 0 : resizeObserver.disconnect();
    if (node) {
      resizeObserver == null ? void 0 : resizeObserver.observe(node);
    }
    setRect(node ? measure(node) : null);
  }, [measure, resizeObserver]);
  const [nodeRef, setRef] = useNodeRef(handleNodeChange);
  return reactExports.useMemo(() => ({
    nodeRef,
    rect,
    setRef
  }), [rect, nodeRef, setRef]);
}
const defaultSensors = [{
  sensor: PointerSensor,
  options: {}
}, {
  sensor: KeyboardSensor,
  options: {}
}];
const defaultData = {
  current: {}
};
const defaultMeasuringConfiguration = {
  draggable: {
    measure: getTransformAgnosticClientRect
  },
  droppable: {
    measure: getTransformAgnosticClientRect,
    strategy: MeasuringStrategy.WhileDragging,
    frequency: MeasuringFrequency.Optimized
  },
  dragOverlay: {
    measure: getClientRect
  }
};
class DroppableContainersMap extends Map {
  get(id) {
    var _super$get;
    return id != null ? (_super$get = super.get(id)) != null ? _super$get : void 0 : void 0;
  }
  toArray() {
    return Array.from(this.values());
  }
  getEnabled() {
    return this.toArray().filter((_ref) => {
      let {
        disabled
      } = _ref;
      return !disabled;
    });
  }
  getNodeFor(id) {
    var _this$get$node$curren, _this$get;
    return (_this$get$node$curren = (_this$get = this.get(id)) == null ? void 0 : _this$get.node.current) != null ? _this$get$node$curren : void 0;
  }
}
const defaultPublicContext = {
  activatorEvent: null,
  active: null,
  activeNode: null,
  activeNodeRect: null,
  collisions: null,
  containerNodeRect: null,
  draggableNodes: /* @__PURE__ */ new Map(),
  droppableRects: /* @__PURE__ */ new Map(),
  droppableContainers: /* @__PURE__ */ new DroppableContainersMap(),
  over: null,
  dragOverlay: {
    nodeRef: {
      current: null
    },
    rect: null,
    setRef: noop
  },
  scrollableAncestors: [],
  scrollableAncestorRects: [],
  measuringConfiguration: defaultMeasuringConfiguration,
  measureDroppableContainers: noop,
  windowRect: null,
  measuringScheduled: false
};
const defaultInternalContext = {
  activatorEvent: null,
  activators: [],
  active: null,
  activeNodeRect: null,
  ariaDescribedById: {
    draggable: ""
  },
  dispatch: noop,
  draggableNodes: /* @__PURE__ */ new Map(),
  over: null,
  measureDroppableContainers: noop
};
const InternalContext = /* @__PURE__ */ reactExports.createContext(defaultInternalContext);
const PublicContext = /* @__PURE__ */ reactExports.createContext(defaultPublicContext);
function getInitialState() {
  return {
    draggable: {
      active: null,
      initialCoordinates: {
        x: 0,
        y: 0
      },
      nodes: /* @__PURE__ */ new Map(),
      translate: {
        x: 0,
        y: 0
      }
    },
    droppable: {
      containers: new DroppableContainersMap()
    }
  };
}
function reducer(state, action) {
  switch (action.type) {
    case Action.DragStart:
      return {
        ...state,
        draggable: {
          ...state.draggable,
          initialCoordinates: action.initialCoordinates,
          active: action.active
        }
      };
    case Action.DragMove:
      if (state.draggable.active == null) {
        return state;
      }
      return {
        ...state,
        draggable: {
          ...state.draggable,
          translate: {
            x: action.coordinates.x - state.draggable.initialCoordinates.x,
            y: action.coordinates.y - state.draggable.initialCoordinates.y
          }
        }
      };
    case Action.DragEnd:
    case Action.DragCancel:
      return {
        ...state,
        draggable: {
          ...state.draggable,
          active: null,
          initialCoordinates: {
            x: 0,
            y: 0
          },
          translate: {
            x: 0,
            y: 0
          }
        }
      };
    case Action.RegisterDroppable: {
      const {
        element
      } = action;
      const {
        id
      } = element;
      const containers = new DroppableContainersMap(state.droppable.containers);
      containers.set(id, element);
      return {
        ...state,
        droppable: {
          ...state.droppable,
          containers
        }
      };
    }
    case Action.SetDroppableDisabled: {
      const {
        id,
        key: key2,
        disabled
      } = action;
      const element = state.droppable.containers.get(id);
      if (!element || key2 !== element.key) {
        return state;
      }
      const containers = new DroppableContainersMap(state.droppable.containers);
      containers.set(id, {
        ...element,
        disabled
      });
      return {
        ...state,
        droppable: {
          ...state.droppable,
          containers
        }
      };
    }
    case Action.UnregisterDroppable: {
      const {
        id,
        key: key2
      } = action;
      const element = state.droppable.containers.get(id);
      if (!element || key2 !== element.key) {
        return state;
      }
      const containers = new DroppableContainersMap(state.droppable.containers);
      containers.delete(id);
      return {
        ...state,
        droppable: {
          ...state.droppable,
          containers
        }
      };
    }
    default: {
      return state;
    }
  }
}
function RestoreFocus(_ref) {
  let {
    disabled
  } = _ref;
  const {
    active,
    activatorEvent,
    draggableNodes
  } = reactExports.useContext(InternalContext);
  const previousActivatorEvent = usePrevious(activatorEvent);
  const previousActiveId = usePrevious(active == null ? void 0 : active.id);
  reactExports.useEffect(() => {
    if (disabled) {
      return;
    }
    if (!activatorEvent && previousActivatorEvent && previousActiveId != null) {
      if (!isKeyboardEvent(previousActivatorEvent)) {
        return;
      }
      if (document.activeElement === previousActivatorEvent.target) {
        return;
      }
      const draggableNode = draggableNodes.get(previousActiveId);
      if (!draggableNode) {
        return;
      }
      const {
        activatorNode,
        node
      } = draggableNode;
      if (!activatorNode.current && !node.current) {
        return;
      }
      requestAnimationFrame(() => {
        for (const element of [activatorNode.current, node.current]) {
          if (!element) {
            continue;
          }
          const focusableNode = findFirstFocusableNode(element);
          if (focusableNode) {
            focusableNode.focus();
            break;
          }
        }
      });
    }
  }, [activatorEvent, disabled, draggableNodes, previousActiveId, previousActivatorEvent]);
  return null;
}
function applyModifiers(modifiers, _ref) {
  let {
    transform,
    ...args
  } = _ref;
  return modifiers != null && modifiers.length ? modifiers.reduce((accumulator, modifier) => {
    return modifier({
      transform: accumulator,
      ...args
    });
  }, transform) : transform;
}
function useMeasuringConfiguration(config) {
  return reactExports.useMemo(
    () => ({
      draggable: {
        ...defaultMeasuringConfiguration.draggable,
        ...config == null ? void 0 : config.draggable
      },
      droppable: {
        ...defaultMeasuringConfiguration.droppable,
        ...config == null ? void 0 : config.droppable
      },
      dragOverlay: {
        ...defaultMeasuringConfiguration.dragOverlay,
        ...config == null ? void 0 : config.dragOverlay
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config == null ? void 0 : config.draggable, config == null ? void 0 : config.droppable, config == null ? void 0 : config.dragOverlay]
  );
}
function useLayoutShiftScrollCompensation(_ref) {
  let {
    activeNode,
    measure,
    initialRect,
    config = true
  } = _ref;
  const initialized = reactExports.useRef(false);
  const {
    x,
    y
  } = typeof config === "boolean" ? {
    x: config,
    y: config
  } : config;
  useIsomorphicLayoutEffect(() => {
    const disabled = !x && !y;
    if (disabled || !activeNode) {
      initialized.current = false;
      return;
    }
    if (initialized.current || !initialRect) {
      return;
    }
    const node = activeNode == null ? void 0 : activeNode.node.current;
    if (!node || node.isConnected === false) {
      return;
    }
    const rect = measure(node);
    const rectDelta = getRectDelta(rect, initialRect);
    if (!x) {
      rectDelta.x = 0;
    }
    if (!y) {
      rectDelta.y = 0;
    }
    initialized.current = true;
    if (Math.abs(rectDelta.x) > 0 || Math.abs(rectDelta.y) > 0) {
      const firstScrollableAncestor = getFirstScrollableAncestor(node);
      if (firstScrollableAncestor) {
        firstScrollableAncestor.scrollBy({
          top: rectDelta.y,
          left: rectDelta.x
        });
      }
    }
  }, [activeNode, x, y, initialRect, measure]);
}
const ActiveDraggableContext = /* @__PURE__ */ reactExports.createContext({
  ...defaultCoordinates,
  scaleX: 1,
  scaleY: 1
});
var Status;
(function(Status2) {
  Status2[Status2["Uninitialized"] = 0] = "Uninitialized";
  Status2[Status2["Initializing"] = 1] = "Initializing";
  Status2[Status2["Initialized"] = 2] = "Initialized";
})(Status || (Status = {}));
const DndContext = /* @__PURE__ */ reactExports.memo(function DndContext2(_ref) {
  var _sensorContext$curren, _dragOverlay$nodeRef$, _dragOverlay$rect, _over$rect;
  let {
    id,
    accessibility,
    autoScroll = true,
    children,
    sensors = defaultSensors,
    collisionDetection = rectIntersection,
    measuring,
    modifiers,
    ...props
  } = _ref;
  const store = reactExports.useReducer(reducer, void 0, getInitialState);
  const [state, dispatch] = store;
  const [dispatchMonitorEvent, registerMonitorListener] = useDndMonitorProvider();
  const [status, setStatus] = reactExports.useState(Status.Uninitialized);
  const isInitialized = status === Status.Initialized;
  const {
    draggable: {
      active: activeId,
      nodes: draggableNodes,
      translate
    },
    droppable: {
      containers: droppableContainers
    }
  } = state;
  const node = activeId != null ? draggableNodes.get(activeId) : null;
  const activeRects = reactExports.useRef({
    initial: null,
    translated: null
  });
  const active = reactExports.useMemo(() => {
    var _node$data;
    return activeId != null ? {
      id: activeId,
      // It's possible for the active node to unmount while dragging
      data: (_node$data = node == null ? void 0 : node.data) != null ? _node$data : defaultData,
      rect: activeRects
    } : null;
  }, [activeId, node]);
  const activeRef = reactExports.useRef(null);
  const [activeSensor, setActiveSensor] = reactExports.useState(null);
  const [activatorEvent, setActivatorEvent] = reactExports.useState(null);
  const latestProps = useLatestValue(props, Object.values(props));
  const draggableDescribedById = useUniqueId("DndDescribedBy", id);
  const enabledDroppableContainers = reactExports.useMemo(() => droppableContainers.getEnabled(), [droppableContainers]);
  const measuringConfiguration = useMeasuringConfiguration(measuring);
  const {
    droppableRects,
    measureDroppableContainers,
    measuringScheduled
  } = useDroppableMeasuring(enabledDroppableContainers, {
    dragging: isInitialized,
    dependencies: [translate.x, translate.y],
    config: measuringConfiguration.droppable
  });
  const activeNode = useCachedNode(draggableNodes, activeId);
  const activationCoordinates = reactExports.useMemo(() => activatorEvent ? getEventCoordinates(activatorEvent) : null, [activatorEvent]);
  const autoScrollOptions = getAutoScrollerOptions();
  const initialActiveNodeRect = useInitialRect(activeNode, measuringConfiguration.draggable.measure);
  useLayoutShiftScrollCompensation({
    activeNode: activeId != null ? draggableNodes.get(activeId) : null,
    config: autoScrollOptions.layoutShiftCompensation,
    initialRect: initialActiveNodeRect,
    measure: measuringConfiguration.draggable.measure
  });
  const activeNodeRect = useRect(activeNode, measuringConfiguration.draggable.measure, initialActiveNodeRect);
  const containerNodeRect = useRect(activeNode ? activeNode.parentElement : null);
  const sensorContext = reactExports.useRef({
    activatorEvent: null,
    active: null,
    activeNode,
    collisionRect: null,
    collisions: null,
    droppableRects,
    draggableNodes,
    draggingNode: null,
    draggingNodeRect: null,
    droppableContainers,
    over: null,
    scrollableAncestors: [],
    scrollAdjustedTranslate: null
  });
  const overNode = droppableContainers.getNodeFor((_sensorContext$curren = sensorContext.current.over) == null ? void 0 : _sensorContext$curren.id);
  const dragOverlay = useDragOverlayMeasuring({
    measure: measuringConfiguration.dragOverlay.measure
  });
  const draggingNode = (_dragOverlay$nodeRef$ = dragOverlay.nodeRef.current) != null ? _dragOverlay$nodeRef$ : activeNode;
  const draggingNodeRect = isInitialized ? (_dragOverlay$rect = dragOverlay.rect) != null ? _dragOverlay$rect : activeNodeRect : null;
  const usesDragOverlay = Boolean(dragOverlay.nodeRef.current && dragOverlay.rect);
  const nodeRectDelta = useRectDelta(usesDragOverlay ? null : activeNodeRect);
  const windowRect = useWindowRect(draggingNode ? getWindow(draggingNode) : null);
  const scrollableAncestors = useScrollableAncestors(isInitialized ? overNode != null ? overNode : activeNode : null);
  const scrollableAncestorRects = useRects(scrollableAncestors);
  const modifiedTranslate = applyModifiers(modifiers, {
    transform: {
      x: translate.x - nodeRectDelta.x,
      y: translate.y - nodeRectDelta.y,
      scaleX: 1,
      scaleY: 1
    },
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggingNodeRect,
    over: sensorContext.current.over,
    overlayNodeRect: dragOverlay.rect,
    scrollableAncestors,
    scrollableAncestorRects,
    windowRect
  });
  const pointerCoordinates = activationCoordinates ? add(activationCoordinates, translate) : null;
  const scrollOffsets = useScrollOffsets(scrollableAncestors);
  const scrollAdjustment = useScrollOffsetsDelta(scrollOffsets);
  const activeNodeScrollDelta = useScrollOffsetsDelta(scrollOffsets, [activeNodeRect]);
  const scrollAdjustedTranslate = add(modifiedTranslate, scrollAdjustment);
  const collisionRect = draggingNodeRect ? getAdjustedRect(draggingNodeRect, modifiedTranslate) : null;
  const collisions = active && collisionRect ? collisionDetection({
    active,
    collisionRect,
    droppableRects,
    droppableContainers: enabledDroppableContainers,
    pointerCoordinates
  }) : null;
  const overId = getFirstCollision(collisions, "id");
  const [over, setOver] = reactExports.useState(null);
  const appliedTranslate = usesDragOverlay ? modifiedTranslate : add(modifiedTranslate, activeNodeScrollDelta);
  const transform = adjustScale(appliedTranslate, (_over$rect = over == null ? void 0 : over.rect) != null ? _over$rect : null, activeNodeRect);
  const activeSensorRef = reactExports.useRef(null);
  const instantiateSensor = reactExports.useCallback(
    (event, _ref2) => {
      let {
        sensor: Sensor,
        options
      } = _ref2;
      if (activeRef.current == null) {
        return;
      }
      const activeNode2 = draggableNodes.get(activeRef.current);
      if (!activeNode2) {
        return;
      }
      const activatorEvent2 = event.nativeEvent;
      const sensorInstance = new Sensor({
        active: activeRef.current,
        activeNode: activeNode2,
        event: activatorEvent2,
        options,
        // Sensors need to be instantiated with refs for arguments that change over time
        // otherwise they are frozen in time with the stale arguments
        context: sensorContext,
        onAbort(id2) {
          const draggableNode = draggableNodes.get(id2);
          if (!draggableNode) {
            return;
          }
          const {
            onDragAbort
          } = latestProps.current;
          const event2 = {
            id: id2
          };
          onDragAbort == null ? void 0 : onDragAbort(event2);
          dispatchMonitorEvent({
            type: "onDragAbort",
            event: event2
          });
        },
        onPending(id2, constraint, initialCoordinates, offset) {
          const draggableNode = draggableNodes.get(id2);
          if (!draggableNode) {
            return;
          }
          const {
            onDragPending
          } = latestProps.current;
          const event2 = {
            id: id2,
            constraint,
            initialCoordinates,
            offset
          };
          onDragPending == null ? void 0 : onDragPending(event2);
          dispatchMonitorEvent({
            type: "onDragPending",
            event: event2
          });
        },
        onStart(initialCoordinates) {
          const id2 = activeRef.current;
          if (id2 == null) {
            return;
          }
          const draggableNode = draggableNodes.get(id2);
          if (!draggableNode) {
            return;
          }
          const {
            onDragStart
          } = latestProps.current;
          const event2 = {
            activatorEvent: activatorEvent2,
            active: {
              id: id2,
              data: draggableNode.data,
              rect: activeRects
            }
          };
          reactDomExports.unstable_batchedUpdates(() => {
            onDragStart == null ? void 0 : onDragStart(event2);
            setStatus(Status.Initializing);
            dispatch({
              type: Action.DragStart,
              initialCoordinates,
              active: id2
            });
            dispatchMonitorEvent({
              type: "onDragStart",
              event: event2
            });
            setActiveSensor(activeSensorRef.current);
            setActivatorEvent(activatorEvent2);
          });
        },
        onMove(coordinates) {
          dispatch({
            type: Action.DragMove,
            coordinates
          });
        },
        onEnd: createHandler(Action.DragEnd),
        onCancel: createHandler(Action.DragCancel)
      });
      activeSensorRef.current = sensorInstance;
      function createHandler(type) {
        return async function handler() {
          const {
            active: active2,
            collisions: collisions2,
            over: over2,
            scrollAdjustedTranslate: scrollAdjustedTranslate2
          } = sensorContext.current;
          let event2 = null;
          if (active2 && scrollAdjustedTranslate2) {
            const {
              cancelDrop
            } = latestProps.current;
            event2 = {
              activatorEvent: activatorEvent2,
              active: active2,
              collisions: collisions2,
              delta: scrollAdjustedTranslate2,
              over: over2
            };
            if (type === Action.DragEnd && typeof cancelDrop === "function") {
              const shouldCancel = await Promise.resolve(cancelDrop(event2));
              if (shouldCancel) {
                type = Action.DragCancel;
              }
            }
          }
          activeRef.current = null;
          reactDomExports.unstable_batchedUpdates(() => {
            dispatch({
              type
            });
            setStatus(Status.Uninitialized);
            setOver(null);
            setActiveSensor(null);
            setActivatorEvent(null);
            activeSensorRef.current = null;
            const eventName = type === Action.DragEnd ? "onDragEnd" : "onDragCancel";
            if (event2) {
              const handler2 = latestProps.current[eventName];
              handler2 == null ? void 0 : handler2(event2);
              dispatchMonitorEvent({
                type: eventName,
                event: event2
              });
            }
          });
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [draggableNodes]
  );
  const bindActivatorToSensorInstantiator = reactExports.useCallback((handler, sensor) => {
    return (event, active2) => {
      const nativeEvent = event.nativeEvent;
      const activeDraggableNode = draggableNodes.get(active2);
      if (
        // Another sensor is already instantiating
        activeRef.current !== null || // No active draggable
        !activeDraggableNode || // Event has already been captured
        nativeEvent.dndKit || nativeEvent.defaultPrevented
      ) {
        return;
      }
      const activationContext = {
        active: activeDraggableNode
      };
      const shouldActivate = handler(event, sensor.options, activationContext);
      if (shouldActivate === true) {
        nativeEvent.dndKit = {
          capturedBy: sensor.sensor
        };
        activeRef.current = active2;
        instantiateSensor(event, sensor);
      }
    };
  }, [draggableNodes, instantiateSensor]);
  const activators = useCombineActivators(sensors, bindActivatorToSensorInstantiator);
  useSensorSetup(sensors);
  useIsomorphicLayoutEffect(() => {
    if (activeNodeRect && status === Status.Initializing) {
      setStatus(Status.Initialized);
    }
  }, [activeNodeRect, status]);
  reactExports.useEffect(
    () => {
      const {
        onDragMove
      } = latestProps.current;
      const {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        over: over2
      } = sensorContext.current;
      if (!active2 || !activatorEvent2) {
        return;
      }
      const event = {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        delta: {
          x: scrollAdjustedTranslate.x,
          y: scrollAdjustedTranslate.y
        },
        over: over2
      };
      reactDomExports.unstable_batchedUpdates(() => {
        onDragMove == null ? void 0 : onDragMove(event);
        dispatchMonitorEvent({
          type: "onDragMove",
          event
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scrollAdjustedTranslate.x, scrollAdjustedTranslate.y]
  );
  reactExports.useEffect(
    () => {
      const {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        droppableContainers: droppableContainers2,
        scrollAdjustedTranslate: scrollAdjustedTranslate2
      } = sensorContext.current;
      if (!active2 || activeRef.current == null || !activatorEvent2 || !scrollAdjustedTranslate2) {
        return;
      }
      const {
        onDragOver
      } = latestProps.current;
      const overContainer = droppableContainers2.get(overId);
      const over2 = overContainer && overContainer.rect.current ? {
        id: overContainer.id,
        rect: overContainer.rect.current,
        data: overContainer.data,
        disabled: overContainer.disabled
      } : null;
      const event = {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        delta: {
          x: scrollAdjustedTranslate2.x,
          y: scrollAdjustedTranslate2.y
        },
        over: over2
      };
      reactDomExports.unstable_batchedUpdates(() => {
        setOver(over2);
        onDragOver == null ? void 0 : onDragOver(event);
        dispatchMonitorEvent({
          type: "onDragOver",
          event
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [overId]
  );
  useIsomorphicLayoutEffect(() => {
    sensorContext.current = {
      activatorEvent,
      active,
      activeNode,
      collisionRect,
      collisions,
      droppableRects,
      draggableNodes,
      draggingNode,
      draggingNodeRect,
      droppableContainers,
      over,
      scrollableAncestors,
      scrollAdjustedTranslate
    };
    activeRects.current = {
      initial: draggingNodeRect,
      translated: collisionRect
    };
  }, [active, activeNode, collisions, collisionRect, draggableNodes, draggingNode, draggingNodeRect, droppableRects, droppableContainers, over, scrollableAncestors, scrollAdjustedTranslate]);
  useAutoScroller({
    ...autoScrollOptions,
    delta: translate,
    draggingRect: collisionRect,
    pointerCoordinates,
    scrollableAncestors,
    scrollableAncestorRects
  });
  const publicContext = reactExports.useMemo(() => {
    const context = {
      active,
      activeNode,
      activeNodeRect,
      activatorEvent,
      collisions,
      containerNodeRect,
      dragOverlay,
      draggableNodes,
      droppableContainers,
      droppableRects,
      over,
      measureDroppableContainers,
      scrollableAncestors,
      scrollableAncestorRects,
      measuringConfiguration,
      measuringScheduled,
      windowRect
    };
    return context;
  }, [active, activeNode, activeNodeRect, activatorEvent, collisions, containerNodeRect, dragOverlay, draggableNodes, droppableContainers, droppableRects, over, measureDroppableContainers, scrollableAncestors, scrollableAncestorRects, measuringConfiguration, measuringScheduled, windowRect]);
  const internalContext = reactExports.useMemo(() => {
    const context = {
      activatorEvent,
      activators,
      active,
      activeNodeRect,
      ariaDescribedById: {
        draggable: draggableDescribedById
      },
      dispatch,
      draggableNodes,
      over,
      measureDroppableContainers
    };
    return context;
  }, [activatorEvent, activators, active, activeNodeRect, dispatch, draggableDescribedById, draggableNodes, over, measureDroppableContainers]);
  return React.createElement(DndMonitorContext.Provider, {
    value: registerMonitorListener
  }, React.createElement(InternalContext.Provider, {
    value: internalContext
  }, React.createElement(PublicContext.Provider, {
    value: publicContext
  }, React.createElement(ActiveDraggableContext.Provider, {
    value: transform
  }, children)), React.createElement(RestoreFocus, {
    disabled: (accessibility == null ? void 0 : accessibility.restoreFocus) === false
  })), React.createElement(Accessibility, {
    ...accessibility,
    hiddenTextDescribedById: draggableDescribedById
  }));
  function getAutoScrollerOptions() {
    const activeSensorDisablesAutoscroll = (activeSensor == null ? void 0 : activeSensor.autoScrollEnabled) === false;
    const autoScrollGloballyDisabled = typeof autoScroll === "object" ? autoScroll.enabled === false : autoScroll === false;
    const enabled = isInitialized && !activeSensorDisablesAutoscroll && !autoScrollGloballyDisabled;
    if (typeof autoScroll === "object") {
      return {
        ...autoScroll,
        enabled
      };
    }
    return {
      enabled
    };
  }
});
const NullContext = /* @__PURE__ */ reactExports.createContext(null);
const defaultRole = "button";
const ID_PREFIX$1 = "Draggable";
function useDraggable(_ref) {
  let {
    id,
    data,
    disabled = false,
    attributes
  } = _ref;
  const key2 = useUniqueId(ID_PREFIX$1);
  const {
    activators,
    activatorEvent,
    active,
    activeNodeRect,
    ariaDescribedById,
    draggableNodes,
    over
  } = reactExports.useContext(InternalContext);
  const {
    role = defaultRole,
    roleDescription = "draggable",
    tabIndex = 0
  } = attributes != null ? attributes : {};
  const isDragging = (active == null ? void 0 : active.id) === id;
  const transform = reactExports.useContext(isDragging ? ActiveDraggableContext : NullContext);
  const [node, setNodeRef] = useNodeRef();
  const [activatorNode, setActivatorNodeRef] = useNodeRef();
  const listeners = useSyntheticListeners(activators, id);
  const dataRef = useLatestValue(data);
  useIsomorphicLayoutEffect(
    () => {
      draggableNodes.set(id, {
        id,
        key: key2,
        node,
        activatorNode,
        data: dataRef
      });
      return () => {
        const node2 = draggableNodes.get(id);
        if (node2 && node2.key === key2) {
          draggableNodes.delete(id);
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [draggableNodes, id]
  );
  const memoizedAttributes = reactExports.useMemo(() => ({
    role,
    tabIndex,
    "aria-disabled": disabled,
    "aria-pressed": isDragging && role === defaultRole ? true : void 0,
    "aria-roledescription": roleDescription,
    "aria-describedby": ariaDescribedById.draggable
  }), [disabled, role, tabIndex, isDragging, roleDescription, ariaDescribedById.draggable]);
  return {
    active,
    activatorEvent,
    activeNodeRect,
    attributes: memoizedAttributes,
    isDragging,
    listeners: disabled ? void 0 : listeners,
    node,
    over,
    setNodeRef,
    setActivatorNodeRef,
    transform
  };
}
function useDndContext() {
  return reactExports.useContext(PublicContext);
}
const ID_PREFIX$1$1 = "Droppable";
const defaultResizeObserverConfig = {
  timeout: 25
};
function useDroppable(_ref) {
  let {
    data,
    disabled = false,
    id,
    resizeObserverConfig
  } = _ref;
  const key2 = useUniqueId(ID_PREFIX$1$1);
  const {
    active,
    dispatch,
    over,
    measureDroppableContainers
  } = reactExports.useContext(InternalContext);
  const previous = reactExports.useRef({
    disabled
  });
  const resizeObserverConnected = reactExports.useRef(false);
  const rect = reactExports.useRef(null);
  const callbackId = reactExports.useRef(null);
  const {
    disabled: resizeObserverDisabled,
    updateMeasurementsFor,
    timeout: resizeObserverTimeout
  } = {
    ...defaultResizeObserverConfig,
    ...resizeObserverConfig
  };
  const ids2 = useLatestValue(updateMeasurementsFor != null ? updateMeasurementsFor : id);
  const handleResize = reactExports.useCallback(
    () => {
      if (!resizeObserverConnected.current) {
        resizeObserverConnected.current = true;
        return;
      }
      if (callbackId.current != null) {
        clearTimeout(callbackId.current);
      }
      callbackId.current = setTimeout(() => {
        measureDroppableContainers(Array.isArray(ids2.current) ? ids2.current : [ids2.current]);
        callbackId.current = null;
      }, resizeObserverTimeout);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [resizeObserverTimeout]
  );
  const resizeObserver = useResizeObserver({
    callback: handleResize,
    disabled: resizeObserverDisabled || !active
  });
  const handleNodeChange = reactExports.useCallback((newElement, previousElement) => {
    if (!resizeObserver) {
      return;
    }
    if (previousElement) {
      resizeObserver.unobserve(previousElement);
      resizeObserverConnected.current = false;
    }
    if (newElement) {
      resizeObserver.observe(newElement);
    }
  }, [resizeObserver]);
  const [nodeRef, setNodeRef] = useNodeRef(handleNodeChange);
  const dataRef = useLatestValue(data);
  reactExports.useEffect(() => {
    if (!resizeObserver || !nodeRef.current) {
      return;
    }
    resizeObserver.disconnect();
    resizeObserverConnected.current = false;
    resizeObserver.observe(nodeRef.current);
  }, [nodeRef, resizeObserver]);
  reactExports.useEffect(
    () => {
      dispatch({
        type: Action.RegisterDroppable,
        element: {
          id,
          key: key2,
          disabled,
          node: nodeRef,
          rect,
          data: dataRef
        }
      });
      return () => dispatch({
        type: Action.UnregisterDroppable,
        key: key2,
        id
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );
  reactExports.useEffect(() => {
    if (disabled !== previous.current.disabled) {
      dispatch({
        type: Action.SetDroppableDisabled,
        id,
        key: key2,
        disabled
      });
      previous.current.disabled = disabled;
    }
  }, [id, key2, disabled, dispatch]);
  return {
    active,
    rect,
    isOver: (over == null ? void 0 : over.id) === id,
    node: nodeRef,
    over,
    setNodeRef
  };
}
function AnimationManager(_ref) {
  let {
    animation,
    children
  } = _ref;
  const [clonedChildren, setClonedChildren] = reactExports.useState(null);
  const [element, setElement] = reactExports.useState(null);
  const previousChildren = usePrevious(children);
  if (!children && !clonedChildren && previousChildren) {
    setClonedChildren(previousChildren);
  }
  useIsomorphicLayoutEffect(() => {
    if (!element) {
      return;
    }
    const key2 = clonedChildren == null ? void 0 : clonedChildren.key;
    const id = clonedChildren == null ? void 0 : clonedChildren.props.id;
    if (key2 == null || id == null) {
      setClonedChildren(null);
      return;
    }
    Promise.resolve(animation(id, element)).then(() => {
      setClonedChildren(null);
    });
  }, [animation, clonedChildren, element]);
  return React.createElement(React.Fragment, null, children, clonedChildren ? reactExports.cloneElement(clonedChildren, {
    ref: setElement
  }) : null);
}
const defaultTransform = {
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1
};
function NullifiedContextProvider(_ref) {
  let {
    children
  } = _ref;
  return React.createElement(InternalContext.Provider, {
    value: defaultInternalContext
  }, React.createElement(ActiveDraggableContext.Provider, {
    value: defaultTransform
  }, children));
}
const baseStyles = {
  position: "fixed",
  touchAction: "none"
};
const defaultTransition$1 = (activatorEvent) => {
  const isKeyboardActivator = isKeyboardEvent(activatorEvent);
  return isKeyboardActivator ? "transform 250ms ease" : void 0;
};
const PositionedOverlay = /* @__PURE__ */ reactExports.forwardRef((_ref, ref) => {
  let {
    as,
    activatorEvent,
    adjustScale: adjustScale2,
    children,
    className,
    rect,
    style,
    transform,
    transition = defaultTransition$1
  } = _ref;
  if (!rect) {
    return null;
  }
  const scaleAdjustedTransform = adjustScale2 ? transform : {
    ...transform,
    scaleX: 1,
    scaleY: 1
  };
  const styles = {
    ...baseStyles,
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    transform: CSS.Transform.toString(scaleAdjustedTransform),
    transformOrigin: adjustScale2 && activatorEvent ? getRelativeTransformOrigin(activatorEvent, rect) : void 0,
    transition: typeof transition === "function" ? transition(activatorEvent) : transition,
    ...style
  };
  return React.createElement(as, {
    className,
    style: styles,
    ref
  }, children);
});
const defaultDropAnimationSideEffects = (options) => (_ref) => {
  let {
    active,
    dragOverlay
  } = _ref;
  const originalStyles = {};
  const {
    styles,
    className
  } = options;
  if (styles != null && styles.active) {
    for (const [key2, value] of Object.entries(styles.active)) {
      if (value === void 0) {
        continue;
      }
      originalStyles[key2] = active.node.style.getPropertyValue(key2);
      active.node.style.setProperty(key2, value);
    }
  }
  if (styles != null && styles.dragOverlay) {
    for (const [key2, value] of Object.entries(styles.dragOverlay)) {
      if (value === void 0) {
        continue;
      }
      dragOverlay.node.style.setProperty(key2, value);
    }
  }
  if (className != null && className.active) {
    active.node.classList.add(className.active);
  }
  if (className != null && className.dragOverlay) {
    dragOverlay.node.classList.add(className.dragOverlay);
  }
  return function cleanup() {
    for (const [key2, value] of Object.entries(originalStyles)) {
      active.node.style.setProperty(key2, value);
    }
    if (className != null && className.active) {
      active.node.classList.remove(className.active);
    }
  };
};
const defaultKeyframeResolver = (_ref2) => {
  let {
    transform: {
      initial,
      final
    }
  } = _ref2;
  return [{
    transform: CSS.Transform.toString(initial)
  }, {
    transform: CSS.Transform.toString(final)
  }];
};
const defaultDropAnimationConfiguration = {
  duration: 250,
  easing: "ease",
  keyframes: defaultKeyframeResolver,
  sideEffects: /* @__PURE__ */ defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0"
      }
    }
  })
};
function useDropAnimation(_ref3) {
  let {
    config,
    draggableNodes,
    droppableContainers,
    measuringConfiguration
  } = _ref3;
  return useEvent((id, node) => {
    if (config === null) {
      return;
    }
    const activeDraggable = draggableNodes.get(id);
    if (!activeDraggable) {
      return;
    }
    const activeNode = activeDraggable.node.current;
    if (!activeNode) {
      return;
    }
    const measurableNode = getMeasurableNode(node);
    if (!measurableNode) {
      return;
    }
    const {
      transform
    } = getWindow(node).getComputedStyle(node);
    const parsedTransform = parseTransform(transform);
    if (!parsedTransform) {
      return;
    }
    const animation = typeof config === "function" ? config : createDefaultDropAnimation(config);
    scrollIntoViewIfNeeded(activeNode, measuringConfiguration.draggable.measure);
    return animation({
      active: {
        id,
        data: activeDraggable.data,
        node: activeNode,
        rect: measuringConfiguration.draggable.measure(activeNode)
      },
      draggableNodes,
      dragOverlay: {
        node,
        rect: measuringConfiguration.dragOverlay.measure(measurableNode)
      },
      droppableContainers,
      measuringConfiguration,
      transform: parsedTransform
    });
  });
}
function createDefaultDropAnimation(options) {
  const {
    duration,
    easing,
    sideEffects,
    keyframes
  } = {
    ...defaultDropAnimationConfiguration,
    ...options
  };
  return (_ref4) => {
    let {
      active,
      dragOverlay,
      transform,
      ...rest
    } = _ref4;
    if (!duration) {
      return;
    }
    const delta = {
      x: dragOverlay.rect.left - active.rect.left,
      y: dragOverlay.rect.top - active.rect.top
    };
    const scale = {
      scaleX: transform.scaleX !== 1 ? active.rect.width * transform.scaleX / dragOverlay.rect.width : 1,
      scaleY: transform.scaleY !== 1 ? active.rect.height * transform.scaleY / dragOverlay.rect.height : 1
    };
    const finalTransform = {
      x: transform.x - delta.x,
      y: transform.y - delta.y,
      ...scale
    };
    const animationKeyframes = keyframes({
      ...rest,
      active,
      dragOverlay,
      transform: {
        initial: transform,
        final: finalTransform
      }
    });
    const [firstKeyframe] = animationKeyframes;
    const lastKeyframe = animationKeyframes[animationKeyframes.length - 1];
    if (JSON.stringify(firstKeyframe) === JSON.stringify(lastKeyframe)) {
      return;
    }
    const cleanup = sideEffects == null ? void 0 : sideEffects({
      active,
      dragOverlay,
      ...rest
    });
    const animation = dragOverlay.node.animate(animationKeyframes, {
      duration,
      easing,
      fill: "forwards"
    });
    return new Promise((resolve) => {
      animation.onfinish = () => {
        cleanup == null ? void 0 : cleanup();
        resolve();
      };
    });
  };
}
let key = 0;
function useKey(id) {
  return reactExports.useMemo(() => {
    if (id == null) {
      return;
    }
    key++;
    return key;
  }, [id]);
}
const DragOverlay = /* @__PURE__ */ React.memo((_ref) => {
  let {
    adjustScale: adjustScale2 = false,
    children,
    dropAnimation: dropAnimationConfig,
    style,
    transition,
    modifiers,
    wrapperElement = "div",
    className,
    zIndex = 999
  } = _ref;
  const {
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggableNodes,
    droppableContainers,
    dragOverlay,
    over,
    measuringConfiguration,
    scrollableAncestors,
    scrollableAncestorRects,
    windowRect
  } = useDndContext();
  const transform = reactExports.useContext(ActiveDraggableContext);
  const key2 = useKey(active == null ? void 0 : active.id);
  const modifiedTransform = applyModifiers(modifiers, {
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggingNodeRect: dragOverlay.rect,
    over,
    overlayNodeRect: dragOverlay.rect,
    scrollableAncestors,
    scrollableAncestorRects,
    transform,
    windowRect
  });
  const initialRect = useInitialValue(activeNodeRect);
  const dropAnimation = useDropAnimation({
    config: dropAnimationConfig,
    draggableNodes,
    droppableContainers,
    measuringConfiguration
  });
  const ref = initialRect ? dragOverlay.setRef : void 0;
  return React.createElement(NullifiedContextProvider, null, React.createElement(AnimationManager, {
    animation: dropAnimation
  }, active && key2 ? React.createElement(PositionedOverlay, {
    key: key2,
    id: active.id,
    ref,
    as: wrapperElement,
    activatorEvent,
    adjustScale: adjustScale2,
    className,
    transition,
    rect: initialRect,
    style: {
      zIndex,
      ...style
    },
    transform: modifiedTransform
  }, children) : null));
});
function arrayMove(array, from, to) {
  const newArray = array.slice();
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);
  return newArray;
}
function getSortedRects(items, rects) {
  return items.reduce((accumulator, id, index2) => {
    const rect = rects.get(id);
    if (rect) {
      accumulator[index2] = rect;
    }
    return accumulator;
  }, Array(items.length));
}
function isValidIndex(index2) {
  return index2 !== null && index2 >= 0;
}
function itemsEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
function normalizeDisabled(disabled) {
  if (typeof disabled === "boolean") {
    return {
      draggable: disabled,
      droppable: disabled
    };
  }
  return disabled;
}
const defaultScale = {
  scaleX: 1,
  scaleY: 1
};
const horizontalListSortingStrategy = (_ref) => {
  var _rects$activeIndex;
  let {
    rects,
    activeNodeRect: fallbackActiveRect,
    activeIndex,
    overIndex,
    index: index2
  } = _ref;
  const activeNodeRect = (_rects$activeIndex = rects[activeIndex]) != null ? _rects$activeIndex : fallbackActiveRect;
  if (!activeNodeRect) {
    return null;
  }
  const itemGap = getItemGap(rects, index2, activeIndex);
  if (index2 === activeIndex) {
    const newIndexRect = rects[overIndex];
    if (!newIndexRect) {
      return null;
    }
    return {
      x: activeIndex < overIndex ? newIndexRect.left + newIndexRect.width - (activeNodeRect.left + activeNodeRect.width) : newIndexRect.left - activeNodeRect.left,
      y: 0,
      ...defaultScale
    };
  }
  if (index2 > activeIndex && index2 <= overIndex) {
    return {
      x: -activeNodeRect.width - itemGap,
      y: 0,
      ...defaultScale
    };
  }
  if (index2 < activeIndex && index2 >= overIndex) {
    return {
      x: activeNodeRect.width + itemGap,
      y: 0,
      ...defaultScale
    };
  }
  return {
    x: 0,
    y: 0,
    ...defaultScale
  };
};
function getItemGap(rects, index2, activeIndex) {
  const currentRect = rects[index2];
  const previousRect = rects[index2 - 1];
  const nextRect = rects[index2 + 1];
  if (!currentRect || !previousRect && !nextRect) {
    return 0;
  }
  if (activeIndex < index2) {
    return previousRect ? currentRect.left - (previousRect.left + previousRect.width) : nextRect.left - (currentRect.left + currentRect.width);
  }
  return nextRect ? nextRect.left - (currentRect.left + currentRect.width) : currentRect.left - (previousRect.left + previousRect.width);
}
const rectSortingStrategy = (_ref) => {
  let {
    rects,
    activeIndex,
    overIndex,
    index: index2
  } = _ref;
  const newRects = arrayMove(rects, overIndex, activeIndex);
  const oldRect = rects[index2];
  const newRect = newRects[index2];
  if (!newRect || !oldRect) {
    return null;
  }
  return {
    x: newRect.left - oldRect.left,
    y: newRect.top - oldRect.top,
    scaleX: newRect.width / oldRect.width,
    scaleY: newRect.height / oldRect.height
  };
};
const defaultScale$1 = {
  scaleX: 1,
  scaleY: 1
};
const verticalListSortingStrategy = (_ref) => {
  var _rects$activeIndex;
  let {
    activeIndex,
    activeNodeRect: fallbackActiveRect,
    index: index2,
    rects,
    overIndex
  } = _ref;
  const activeNodeRect = (_rects$activeIndex = rects[activeIndex]) != null ? _rects$activeIndex : fallbackActiveRect;
  if (!activeNodeRect) {
    return null;
  }
  if (index2 === activeIndex) {
    const overIndexRect = rects[overIndex];
    if (!overIndexRect) {
      return null;
    }
    return {
      x: 0,
      y: activeIndex < overIndex ? overIndexRect.top + overIndexRect.height - (activeNodeRect.top + activeNodeRect.height) : overIndexRect.top - activeNodeRect.top,
      ...defaultScale$1
    };
  }
  const itemGap = getItemGap$1(rects, index2, activeIndex);
  if (index2 > activeIndex && index2 <= overIndex) {
    return {
      x: 0,
      y: -activeNodeRect.height - itemGap,
      ...defaultScale$1
    };
  }
  if (index2 < activeIndex && index2 >= overIndex) {
    return {
      x: 0,
      y: activeNodeRect.height + itemGap,
      ...defaultScale$1
    };
  }
  return {
    x: 0,
    y: 0,
    ...defaultScale$1
  };
};
function getItemGap$1(clientRects, index2, activeIndex) {
  const currentRect = clientRects[index2];
  const previousRect = clientRects[index2 - 1];
  const nextRect = clientRects[index2 + 1];
  if (!currentRect) {
    return 0;
  }
  if (activeIndex < index2) {
    return previousRect ? currentRect.top - (previousRect.top + previousRect.height) : nextRect ? nextRect.top - (currentRect.top + currentRect.height) : 0;
  }
  return nextRect ? nextRect.top - (currentRect.top + currentRect.height) : previousRect ? currentRect.top - (previousRect.top + previousRect.height) : 0;
}
const ID_PREFIX = "Sortable";
const Context = /* @__PURE__ */ React.createContext({
  activeIndex: -1,
  containerId: ID_PREFIX,
  disableTransforms: false,
  items: [],
  overIndex: -1,
  useDragOverlay: false,
  sortedRects: [],
  strategy: rectSortingStrategy,
  disabled: {
    draggable: false,
    droppable: false
  }
});
function SortableContext(_ref) {
  let {
    children,
    id,
    items: userDefinedItems,
    strategy = rectSortingStrategy,
    disabled: disabledProp = false
  } = _ref;
  const {
    active,
    dragOverlay,
    droppableRects,
    over,
    measureDroppableContainers
  } = useDndContext();
  const containerId = useUniqueId(ID_PREFIX, id);
  const useDragOverlay = Boolean(dragOverlay.rect !== null);
  const items = reactExports.useMemo(() => userDefinedItems.map((item) => typeof item === "object" && "id" in item ? item.id : item), [userDefinedItems]);
  const isDragging = active != null;
  const activeIndex = active ? items.indexOf(active.id) : -1;
  const overIndex = over ? items.indexOf(over.id) : -1;
  const previousItemsRef = reactExports.useRef(items);
  const itemsHaveChanged = !itemsEqual(items, previousItemsRef.current);
  const disableTransforms = overIndex !== -1 && activeIndex === -1 || itemsHaveChanged;
  const disabled = normalizeDisabled(disabledProp);
  useIsomorphicLayoutEffect(() => {
    if (itemsHaveChanged && isDragging) {
      measureDroppableContainers(items);
    }
  }, [itemsHaveChanged, items, isDragging, measureDroppableContainers]);
  reactExports.useEffect(() => {
    previousItemsRef.current = items;
  }, [items]);
  const contextValue = reactExports.useMemo(
    () => ({
      activeIndex,
      containerId,
      disabled,
      disableTransforms,
      items,
      overIndex,
      useDragOverlay,
      sortedRects: getSortedRects(items, droppableRects),
      strategy
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeIndex, containerId, disabled.draggable, disabled.droppable, disableTransforms, items, overIndex, droppableRects, useDragOverlay, strategy]
  );
  return React.createElement(Context.Provider, {
    value: contextValue
  }, children);
}
const defaultNewIndexGetter = (_ref) => {
  let {
    id,
    items,
    activeIndex,
    overIndex
  } = _ref;
  return arrayMove(items, activeIndex, overIndex).indexOf(id);
};
const defaultAnimateLayoutChanges = (_ref2) => {
  let {
    containerId,
    isSorting,
    wasDragging,
    index: index2,
    items,
    newIndex,
    previousItems,
    previousContainerId,
    transition
  } = _ref2;
  if (!transition || !wasDragging) {
    return false;
  }
  if (previousItems !== items && index2 === newIndex) {
    return false;
  }
  if (isSorting) {
    return true;
  }
  return newIndex !== index2 && containerId === previousContainerId;
};
const defaultTransition = {
  duration: 200,
  easing: "ease"
};
const transitionProperty = "transform";
const disabledTransition = /* @__PURE__ */ CSS.Transition.toString({
  property: transitionProperty,
  duration: 0,
  easing: "linear"
});
const defaultAttributes = {
  roleDescription: "sortable"
};
function useDerivedTransform(_ref) {
  let {
    disabled,
    index: index2,
    node,
    rect
  } = _ref;
  const [derivedTransform, setDerivedtransform] = reactExports.useState(null);
  const previousIndex = reactExports.useRef(index2);
  useIsomorphicLayoutEffect(() => {
    if (!disabled && index2 !== previousIndex.current && node.current) {
      const initial = rect.current;
      if (initial) {
        const current = getClientRect(node.current, {
          ignoreTransform: true
        });
        const delta = {
          x: initial.left - current.left,
          y: initial.top - current.top,
          scaleX: initial.width / current.width,
          scaleY: initial.height / current.height
        };
        if (delta.x || delta.y) {
          setDerivedtransform(delta);
        }
      }
    }
    if (index2 !== previousIndex.current) {
      previousIndex.current = index2;
    }
  }, [disabled, index2, node, rect]);
  reactExports.useEffect(() => {
    if (derivedTransform) {
      setDerivedtransform(null);
    }
  }, [derivedTransform]);
  return derivedTransform;
}
function useSortable(_ref) {
  let {
    animateLayoutChanges = defaultAnimateLayoutChanges,
    attributes: userDefinedAttributes,
    disabled: localDisabled,
    data: customData,
    getNewIndex = defaultNewIndexGetter,
    id,
    strategy: localStrategy,
    resizeObserverConfig,
    transition = defaultTransition
  } = _ref;
  const {
    items,
    containerId,
    activeIndex,
    disabled: globalDisabled,
    disableTransforms,
    sortedRects,
    overIndex,
    useDragOverlay,
    strategy: globalStrategy
  } = reactExports.useContext(Context);
  const disabled = normalizeLocalDisabled(localDisabled, globalDisabled);
  const index2 = items.indexOf(id);
  const data = reactExports.useMemo(() => ({
    sortable: {
      containerId,
      index: index2,
      items
    },
    ...customData
  }), [containerId, customData, index2, items]);
  const itemsAfterCurrentSortable = reactExports.useMemo(() => items.slice(items.indexOf(id)), [items, id]);
  const {
    rect,
    node,
    isOver,
    setNodeRef: setDroppableNodeRef
  } = useDroppable({
    id,
    data,
    disabled: disabled.droppable,
    resizeObserverConfig: {
      updateMeasurementsFor: itemsAfterCurrentSortable,
      ...resizeObserverConfig
    }
  });
  const {
    active,
    activatorEvent,
    activeNodeRect,
    attributes,
    setNodeRef: setDraggableNodeRef,
    listeners,
    isDragging,
    over,
    setActivatorNodeRef,
    transform
  } = useDraggable({
    id,
    data,
    attributes: {
      ...defaultAttributes,
      ...userDefinedAttributes
    },
    disabled: disabled.draggable
  });
  const setNodeRef = useCombinedRefs(setDroppableNodeRef, setDraggableNodeRef);
  const isSorting = Boolean(active);
  const displaceItem = isSorting && !disableTransforms && isValidIndex(activeIndex) && isValidIndex(overIndex);
  const shouldDisplaceDragSource = !useDragOverlay && isDragging;
  const dragSourceDisplacement = shouldDisplaceDragSource && displaceItem ? transform : null;
  const strategy = localStrategy != null ? localStrategy : globalStrategy;
  const finalTransform = displaceItem ? dragSourceDisplacement != null ? dragSourceDisplacement : strategy({
    rects: sortedRects,
    activeNodeRect,
    activeIndex,
    overIndex,
    index: index2
  }) : null;
  const newIndex = isValidIndex(activeIndex) && isValidIndex(overIndex) ? getNewIndex({
    id,
    items,
    activeIndex,
    overIndex
  }) : index2;
  const activeId = active == null ? void 0 : active.id;
  const previous = reactExports.useRef({
    activeId,
    items,
    newIndex,
    containerId
  });
  const itemsHaveChanged = items !== previous.current.items;
  const shouldAnimateLayoutChanges = animateLayoutChanges({
    active,
    containerId,
    isDragging,
    isSorting,
    id,
    index: index2,
    items,
    newIndex: previous.current.newIndex,
    previousItems: previous.current.items,
    previousContainerId: previous.current.containerId,
    transition,
    wasDragging: previous.current.activeId != null
  });
  const derivedTransform = useDerivedTransform({
    disabled: !shouldAnimateLayoutChanges,
    index: index2,
    node,
    rect
  });
  reactExports.useEffect(() => {
    if (isSorting && previous.current.newIndex !== newIndex) {
      previous.current.newIndex = newIndex;
    }
    if (containerId !== previous.current.containerId) {
      previous.current.containerId = containerId;
    }
    if (items !== previous.current.items) {
      previous.current.items = items;
    }
  }, [isSorting, newIndex, containerId, items]);
  reactExports.useEffect(() => {
    if (activeId === previous.current.activeId) {
      return;
    }
    if (activeId && !previous.current.activeId) {
      previous.current.activeId = activeId;
      return;
    }
    const timeoutId = setTimeout(() => {
      previous.current.activeId = activeId;
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [activeId]);
  return {
    active,
    activeIndex,
    attributes,
    data,
    rect,
    index: index2,
    newIndex,
    items,
    isOver,
    isSorting,
    isDragging,
    listeners,
    node,
    overIndex,
    over,
    setNodeRef,
    setActivatorNodeRef,
    setDroppableNodeRef,
    setDraggableNodeRef,
    transform: derivedTransform != null ? derivedTransform : finalTransform,
    transition: getTransition()
  };
  function getTransition() {
    if (
      // Temporarily disable transitions for a single frame to set up derived transforms
      derivedTransform || // Or to prevent items jumping to back to their "new" position when items change
      itemsHaveChanged && previous.current.newIndex === index2
    ) {
      return disabledTransition;
    }
    if (shouldDisplaceDragSource && !isKeyboardEvent(activatorEvent) || !transition) {
      return void 0;
    }
    if (isSorting || shouldAnimateLayoutChanges) {
      return CSS.Transition.toString({
        ...transition,
        property: transitionProperty
      });
    }
    return void 0;
  }
}
function normalizeLocalDisabled(localDisabled, globalDisabled) {
  var _localDisabled$dragga, _localDisabled$droppa;
  if (typeof localDisabled === "boolean") {
    return {
      draggable: localDisabled,
      // Backwards compatibility
      droppable: false
    };
  }
  return {
    draggable: (_localDisabled$dragga = localDisabled == null ? void 0 : localDisabled.draggable) != null ? _localDisabled$dragga : globalDisabled.draggable,
    droppable: (_localDisabled$droppa = localDisabled == null ? void 0 : localDisabled.droppable) != null ? _localDisabled$droppa : globalDisabled.droppable
  };
}
function hasSortableData(entry) {
  if (!entry) {
    return false;
  }
  const data = entry.data.current;
  if (data && "sortable" in data && typeof data.sortable === "object" && "containerId" in data.sortable && "items" in data.sortable && "index" in data.sortable) {
    return true;
  }
  return false;
}
const directions = [KeyboardCode.Down, KeyboardCode.Right, KeyboardCode.Up, KeyboardCode.Left];
const sortableKeyboardCoordinates = (event, _ref) => {
  let {
    context: {
      active,
      collisionRect,
      droppableRects,
      droppableContainers,
      over,
      scrollableAncestors
    }
  } = _ref;
  if (directions.includes(event.code)) {
    event.preventDefault();
    if (!active || !collisionRect) {
      return;
    }
    const filteredContainers = [];
    droppableContainers.getEnabled().forEach((entry) => {
      if (!entry || entry != null && entry.disabled) {
        return;
      }
      const rect = droppableRects.get(entry.id);
      if (!rect) {
        return;
      }
      switch (event.code) {
        case KeyboardCode.Down:
          if (collisionRect.top < rect.top) {
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Up:
          if (collisionRect.top > rect.top) {
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Left:
          if (collisionRect.left > rect.left) {
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Right:
          if (collisionRect.left < rect.left) {
            filteredContainers.push(entry);
          }
          break;
      }
    });
    const collisions = closestCorners({
      collisionRect,
      droppableRects,
      droppableContainers: filteredContainers
    });
    let closestId = getFirstCollision(collisions, "id");
    if (closestId === (over == null ? void 0 : over.id) && collisions.length > 1) {
      closestId = collisions[1].id;
    }
    if (closestId != null) {
      const activeDroppable = droppableContainers.get(active.id);
      const newDroppable = droppableContainers.get(closestId);
      const newRect = newDroppable ? droppableRects.get(newDroppable.id) : null;
      const newNode = newDroppable == null ? void 0 : newDroppable.node.current;
      if (newNode && newRect && activeDroppable && newDroppable) {
        const newScrollAncestors = getScrollableAncestors(newNode);
        const hasDifferentScrollAncestors = newScrollAncestors.some((element, index2) => scrollableAncestors[index2] !== element);
        const hasSameContainer = isSameContainer(activeDroppable, newDroppable);
        const isAfterActive = isAfter2(activeDroppable, newDroppable);
        const offset = hasDifferentScrollAncestors || !hasSameContainer ? {
          x: 0,
          y: 0
        } : {
          x: isAfterActive ? collisionRect.width - newRect.width : 0,
          y: isAfterActive ? collisionRect.height - newRect.height : 0
        };
        const rectCoordinates = {
          x: newRect.left,
          y: newRect.top
        };
        const newCoordinates = offset.x && offset.y ? rectCoordinates : subtract(rectCoordinates, offset);
        return newCoordinates;
      }
    }
  }
  return void 0;
};
function isSameContainer(a, b) {
  if (!hasSortableData(a) || !hasSortableData(b)) {
    return false;
  }
  return a.data.current.sortable.containerId === b.data.current.sortable.containerId;
}
function isAfter2(a, b) {
  if (!hasSortableData(a) || !hasSortableData(b)) {
    return false;
  }
  if (!isSameContainer(a, b)) {
    return false;
  }
  return a.data.current.sortable.index < b.data.current.sortable.index;
}
const HelpMessage = ({ message, className }) => {
  if (!message) {
    return;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rtcl-fb-help${className ? " " + className : ""}`, children: message });
};
const AIIcon = ({ color = "white", width = "17", height = "21" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width, height, viewBox: "0 0 17 21", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6.37822 4.38293L6.95178 5.97575C7.5889 7.74356 8.98101 9.13566 10.7488 9.77279L12.3416 10.3463C12.4852 10.3985 12.4852 10.6021 12.3416 10.6535L10.7488 11.227C8.98101 11.8642 7.5889 13.2563 6.95178 15.0241L6.37822 16.6169C6.32608 16.7605 6.12252 16.7605 6.07109 16.6169L5.49753 15.0241C4.86041 13.2563 3.4683 11.8642 1.70049 11.227L0.107676 10.6535C-0.0358919 10.6013 -0.0358919 10.3978 0.107676 10.3463L1.70049 9.77279C3.4683 9.13566 4.86041 7.74356 5.49753 5.97575L6.07109 4.38293C6.12252 4.23865 6.32608 4.23865 6.37822 4.38293Z", fill: color }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13.548 0.555177L13.8387 1.36158C14.1616 2.25656 14.8666 2.96154 15.7615 3.28439L16.568 3.5751C16.6408 3.60152 16.6408 3.70438 16.568 3.73081L15.7615 4.02151C14.8666 4.34436 14.1616 5.04934 13.8387 5.94432L13.548 6.75073C13.5216 6.82358 13.4187 6.82358 13.3923 6.75073L13.1016 5.94432C12.7788 5.04934 12.0738 4.34436 11.1788 4.02151L10.3724 3.73081C10.2995 3.70438 10.2995 3.60152 10.3724 3.5751L11.1788 3.28439C12.0738 2.96154 12.7788 2.25656 13.1016 1.36158L13.3923 0.555177C13.4187 0.481608 13.5223 0.481608 13.548 0.555177Z", fill: color }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13.548 14.2498L13.8387 15.0562C14.1616 15.9512 14.8666 16.6562 15.7615 16.979L16.568 17.2697C16.6408 17.2962 16.6408 17.399 16.568 17.4254L15.7615 17.7161C14.8666 18.039 14.1616 18.744 13.8387 19.639L13.548 20.4454C13.5216 20.5182 13.4187 20.5182 13.3923 20.4454L13.1016 19.639C12.7788 18.744 12.0738 18.039 11.1788 17.7161L10.3724 17.4254C10.2995 17.399 10.2995 17.2962 10.3724 17.2697L11.1788 16.979C12.0738 16.6562 12.7788 15.9512 13.1016 15.0562L13.3923 14.2498C13.4187 14.177 13.5223 14.177 13.548 14.2498Z", fill: color })
] });
const {
  entries,
  setPrototypeOf,
  isFrozen,
  getPrototypeOf,
  getOwnPropertyDescriptor
} = Object;
let {
  freeze,
  seal,
  create
} = Object;
let {
  apply,
  construct
} = typeof Reflect !== "undefined" && Reflect;
if (!freeze) {
  freeze = function freeze2(x) {
    return x;
  };
}
if (!seal) {
  seal = function seal2(x) {
    return x;
  };
}
if (!apply) {
  apply = function apply2(func, thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    return func.apply(thisArg, args);
  };
}
if (!construct) {
  construct = function construct2(Func) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return new Func(...args);
  };
}
const arrayForEach = unapply(Array.prototype.forEach);
const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
const arrayPop = unapply(Array.prototype.pop);
const arrayPush = unapply(Array.prototype.push);
const arraySplice = unapply(Array.prototype.splice);
const stringToLowerCase = unapply(String.prototype.toLowerCase);
const stringToString = unapply(String.prototype.toString);
const stringMatch = unapply(String.prototype.match);
const stringReplace = unapply(String.prototype.replace);
const stringIndexOf = unapply(String.prototype.indexOf);
const stringTrim = unapply(String.prototype.trim);
const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
const regExpTest = unapply(RegExp.prototype.test);
const typeErrorCreate = unconstruct(TypeError);
function unapply(func) {
  return function(thisArg) {
    if (thisArg instanceof RegExp) {
      thisArg.lastIndex = 0;
    }
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return apply(func, thisArg, args);
  };
}
function unconstruct(Func) {
  return function() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return construct(Func, args);
  };
}
function addToSet(set, array) {
  let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
  if (setPrototypeOf) {
    setPrototypeOf(set, null);
  }
  let l = array.length;
  while (l--) {
    let element = array[l];
    if (typeof element === "string") {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        if (!isFrozen(array)) {
          array[l] = lcElement;
        }
        element = lcElement;
      }
    }
    set[element] = true;
  }
  return set;
}
function cleanArray(array) {
  for (let index2 = 0; index2 < array.length; index2++) {
    const isPropertyExist = objectHasOwnProperty(array, index2);
    if (!isPropertyExist) {
      array[index2] = null;
    }
  }
  return array;
}
function clone(object) {
  const newObject = create(null);
  for (const [property, value] of entries(object)) {
    const isPropertyExist = objectHasOwnProperty(object, property);
    if (isPropertyExist) {
      if (Array.isArray(value)) {
        newObject[property] = cleanArray(value);
      } else if (value && typeof value === "object" && value.constructor === Object) {
        newObject[property] = clone(value);
      } else {
        newObject[property] = value;
      }
    }
  }
  return newObject;
}
function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === "function") {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf(object);
  }
  function fallbackValue() {
    return null;
  }
  return fallbackValue;
}
const html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
const svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
const svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
const svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
const mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
const mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
const text = freeze(["#text"]);
const html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]);
const svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
const mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
const xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
const TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm);
const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
const ARIA_ATTR = seal(/^aria-[\-\w]+$/);
const IS_ALLOWED_URI = seal(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
);
const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
const ATTR_WHITESPACE = seal(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
);
const DOCTYPE_NAME = seal(/^html$/i);
const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
var EXPRESSIONS = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR,
  ATTR_WHITESPACE,
  CUSTOM_ELEMENT,
  DATA_ATTR,
  DOCTYPE_NAME,
  ERB_EXPR,
  IS_ALLOWED_URI,
  IS_SCRIPT_OR_DATA,
  MUSTACHE_EXPR,
  TMPLIT_EXPR
});
const NODE_TYPE = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
};
const getGlobal = function getGlobal2() {
  return typeof window === "undefined" ? null : window;
};
const _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
    return null;
  }
  let suffix = null;
  const ATTR_NAME = "data-tt-policy-suffix";
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
    suffix = purifyHostElement.getAttribute(ATTR_NAME);
  }
  const policyName = "dompurify" + (suffix ? "#" + suffix : "");
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html2) {
        return html2;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_) {
    console.warn("TrustedTypes policy " + policyName + " could not be created.");
    return null;
  }
};
const _createHooksMap = function _createHooksMap2() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function createDOMPurify() {
  let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
  const DOMPurify = (root) => createDOMPurify(root);
  DOMPurify.version = "3.3.1";
  DOMPurify.removed = [];
  if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document || !window2.Element) {
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  let {
    document: document2
  } = window2;
  const originalDocument = document2;
  const currentScript = originalDocument.currentScript;
  const {
    DocumentFragment,
    HTMLTemplateElement,
    Node,
    Element,
    NodeFilter,
    NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
    HTMLFormElement,
    DOMParser,
    trustedTypes
  } = window2;
  const ElementPrototype = Element.prototype;
  const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
  const remove = lookupGetter(ElementPrototype, "remove");
  const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
  const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
  const getParentNode = lookupGetter(ElementPrototype, "parentNode");
  if (typeof HTMLTemplateElement === "function") {
    const template = document2.createElement("template");
    if (template.content && template.content.ownerDocument) {
      document2 = template.content.ownerDocument;
    }
  }
  let trustedTypesPolicy;
  let emptyHTML = "";
  const {
    implementation,
    createNodeIterator,
    createDocumentFragment,
    getElementsByTagName
  } = document2;
  const {
    importNode
  } = originalDocument;
  let hooks = _createHooksMap();
  DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: MUSTACHE_EXPR2,
    ERB_EXPR: ERB_EXPR2,
    TMPLIT_EXPR: TMPLIT_EXPR2,
    DATA_ATTR: DATA_ATTR2,
    ARIA_ATTR: ARIA_ATTR2,
    IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA2,
    ATTR_WHITESPACE: ATTR_WHITESPACE2,
    CUSTOM_ELEMENT: CUSTOM_ELEMENT2
  } = EXPRESSIONS;
  let {
    IS_ALLOWED_URI: IS_ALLOWED_URI$1
  } = EXPRESSIONS;
  let ALLOWED_TAGS = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
  let ALLOWED_ATTR = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
  let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  let FORBID_TAGS = null;
  let FORBID_ATTR = null;
  const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
    tagCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    }
  }));
  let ALLOW_ARIA_ATTR = true;
  let ALLOW_DATA_ATTR = true;
  let ALLOW_UNKNOWN_PROTOCOLS = false;
  let ALLOW_SELF_CLOSE_IN_ATTR = true;
  let SAFE_FOR_TEMPLATES = false;
  let SAFE_FOR_XML = true;
  let WHOLE_DOCUMENT = false;
  let SET_CONFIG = false;
  let FORCE_BODY = false;
  let RETURN_DOM = false;
  let RETURN_DOM_FRAGMENT = false;
  let RETURN_TRUSTED_TYPE = false;
  let SANITIZE_DOM = true;
  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
  let KEEP_CONTENT = true;
  let IN_PLACE = false;
  let USE_PROFILES = {};
  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
  const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
  let NAMESPACE = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;
  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
  let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
  let HTML_INTEGRATION_POINTS = addToSet({}, ["annotation-xml"]);
  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
  let PARSER_MEDIA_TYPE = null;
  const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
  const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
  let transformCaseFunc = null;
  let CONFIG = null;
  const formElement = document2.createElement("form");
  const isRegexOrFunction = function isRegexOrFunction2(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  const _parseConfig = function _parseConfig2() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    if (!cfg || typeof cfg !== "object") {
      cfg = {};
    }
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
    transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
    ALLOWED_TAGS = objectHasOwnProperty(cfg, "ALLOWED_TAGS") ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = objectHasOwnProperty(cfg, "ALLOWED_ATTR") ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
    ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, "ALLOWED_NAMESPACES") ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
    URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = objectHasOwnProperty(cfg, "ADD_DATA_URI_TAGS") ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = objectHasOwnProperty(cfg, "FORBID_CONTENTS") ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
    FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
    USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
    SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
    RETURN_DOM = cfg.RETURN_DOM || false;
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
    FORCE_BODY = cfg.FORCE_BODY || false;
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
    IN_PLACE = cfg.IN_PLACE || false;
    IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
    NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
    MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
    HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
    CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
    }
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, text);
      ALLOWED_ATTR = [];
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1);
        addToSet(ALLOWED_ATTR, html);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    if (cfg.ADD_TAGS) {
      if (typeof cfg.ADD_TAGS === "function") {
        EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
      } else {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }
        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }
    }
    if (cfg.ADD_ATTR) {
      if (typeof cfg.ADD_ATTR === "function") {
        EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
      } else {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }
        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }
    }
    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (cfg.FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }
    if (cfg.ADD_FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
    }
    if (KEEP_CONTENT) {
      ALLOWED_TAGS["#text"] = true;
    }
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
    }
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ["tbody"]);
      delete FORBID_TAGS.tbody;
    }
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      }
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      }
      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
      emptyHTML = trustedTypesPolicy.createHTML("");
    } else {
      if (trustedTypesPolicy === void 0) {
        trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      }
      if (trustedTypesPolicy !== null && typeof emptyHTML === "string") {
        emptyHTML = trustedTypesPolicy.createHTML("");
      }
    }
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
  const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
  const _checkValidNamespace = function _checkValidNamespace2(element) {
    let parent = getParentNode(element);
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: "template"
      };
    }
    const tagName = stringToLowerCase(element.tagName);
    const parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "svg";
      }
      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      }
      return Boolean(ALL_SVG_TAGS[tagName]);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "math";
      }
      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
      }
      return Boolean(ALL_MATHML_TAGS[tagName]);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    }
    return false;
  };
  const _forceRemove = function _forceRemove2(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      getParentNode(node).removeChild(node);
    } catch (_) {
      remove(node);
    }
  };
  const _removeAttribute = function _removeAttribute2(name, element) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: element.getAttributeNode(name),
        from: element
      });
    } catch (_) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: element
      });
    }
    element.removeAttribute(name);
    if (name === "is") {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(element);
        } catch (_) {
        }
      } else {
        try {
          element.setAttribute(name, "");
        } catch (_) {
        }
      }
    }
  };
  const _initDocument = function _initDocument2(dirty) {
    let doc = null;
    let leadingWhitespace = null;
    if (FORCE_BODY) {
      dirty = "<remove></remove>" + dirty;
    } else {
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
    }
    const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_) {
      }
    }
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, "template", null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_) {
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  const _createNodeIterator = function _createNodeIterator2(root) {
    return createNodeIterator.call(
      root.ownerDocument || root,
      root,
      // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION,
      null
    );
  };
  const _isClobbered = function _isClobbered2(element) {
    return element instanceof HTMLFormElement && (typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function");
  };
  const _isNode = function _isNode2(value) {
    return typeof Node === "function" && value instanceof Node;
  };
  function _executeHooks(hooks2, currentNode, data) {
    arrayForEach(hooks2, (hook) => {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  }
  const _sanitizeElements = function _sanitizeElements2(currentNode) {
    let content = null;
    _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    const tagName = transformCaseFunc(currentNode.nodeName);
    _executeHooks(hooks.uponSanitizeElement, currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
      _forceRemove(currentNode);
      return true;
    }
    if (!(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName])) {
      if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
          return false;
        }
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
          return false;
        }
      }
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        const parentNode = getParentNode(currentNode) || currentNode.parentNode;
        const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
        if (childNodes && parentNode) {
          const childCount = childNodes.length;
          for (let i = childCount - 1; i >= 0; --i) {
            const childClone = cloneNode(childNodes[i], true);
            childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
            parentNode.insertBefore(childClone, getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
      content = currentNode.textContent;
      arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
        content = stringReplace(content, expr, " ");
      });
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }
    _executeHooks(hooks.afterSanitizeElements, currentNode, null);
    return false;
  };
  const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
    if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
      return false;
    }
    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR2, lcName)) ;
    else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR2, lcName)) ;
    else if (EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag)) ;
    else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      if (
        // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) || // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))
      ) ;
      else {
        return false;
      }
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
    else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
    else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) ;
    else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA2, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
    else if (value) {
      return false;
    } else ;
    return true;
  };
  const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
    return tagName !== "annotation-xml" && stringMatch(tagName, CUSTOM_ELEMENT2);
  };
  const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
    _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
    const {
      attributes
    } = currentNode;
    if (!attributes || _isClobbered(currentNode)) {
      return;
    }
    const hookEvent = {
      attrName: "",
      attrValue: "",
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR,
      forceKeepAttr: void 0
    };
    let l = attributes.length;
    while (l--) {
      const attr = attributes[l];
      const {
        name,
        namespaceURI,
        value: attrValue
      } = attr;
      const lcName = transformCaseFunc(name);
      const initValue = attrValue;
      let value = name === "value" ? initValue : stringTrim(initValue);
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = void 0;
      _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
      value = hookEvent.attrValue;
      if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
        _removeAttribute(name, currentNode);
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }
      if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title|textarea)/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (lcName === "attributename" && stringMatch(value, "href")) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (hookEvent.forceKeepAttr) {
        continue;
      }
      if (!hookEvent.keepAttr) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          value = stringReplace(value, expr, " ");
        });
      }
      const lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") {
        if (namespaceURI) ;
        else {
          switch (trustedTypes.getAttributeType(lcTag, lcName)) {
            case "TrustedHTML": {
              value = trustedTypesPolicy.createHTML(value);
              break;
            }
            case "TrustedScriptURL": {
              value = trustedTypesPolicy.createScriptURL(value);
              break;
            }
          }
        }
      }
      if (value !== initValue) {
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            currentNode.setAttribute(name, value);
          }
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
          } else {
            arrayPop(DOMPurify.removed);
          }
        } catch (_) {
          _removeAttribute(name, currentNode);
        }
      }
    }
    _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
  };
  const _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
    let shadowNode = null;
    const shadowIterator = _createNodeIterator(fragment);
    _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
      _sanitizeElements(shadowNode);
      _sanitizeAttributes(shadowNode);
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM2(shadowNode.content);
      }
    }
    _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
  };
  DOMPurify.sanitize = function(dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let body = null;
    let importedNode = null;
    let currentNode = null;
    let returnNode = null;
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = "<!-->";
    }
    if (typeof dirty !== "string" && !_isNode(dirty)) {
      if (typeof dirty.toString === "function") {
        dirty = dirty.toString();
        if (typeof dirty !== "string") {
          throw typeErrorCreate("dirty is not a string, aborting");
        }
      } else {
        throw typeErrorCreate("toString is not a function");
      }
    }
    if (!DOMPurify.isSupported) {
      return dirty;
    }
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }
    DOMPurify.removed = [];
    if (typeof dirty === "string") {
      IN_PLACE = false;
    }
    if (IN_PLACE) {
      if (dirty.nodeName) {
        const tagName = transformCaseFunc(dirty.nodeName);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
        }
      }
    } else if (dirty instanceof Node) {
      body = _initDocument("<!---->");
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") {
        body = importedNode;
      } else if (importedNode.nodeName === "HTML") {
        body = importedNode;
      } else {
        body.appendChild(importedNode);
      }
    } else {
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf("<") === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }
      body = _initDocument(dirty);
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
      }
    }
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
    while (currentNode = nodeIterator.nextNode()) {
      _sanitizeElements(currentNode);
      _sanitizeAttributes(currentNode);
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }
    }
    if (IN_PLACE) {
      return dirty;
    }
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
    }
    if (SAFE_FOR_TEMPLATES) {
      arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
        serializedHTML = stringReplace(serializedHTML, expr, " ");
      });
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _parseConfig(cfg);
    SET_CONFIG = true;
  };
  DOMPurify.clearConfig = function() {
    CONFIG = null;
    SET_CONFIG = false;
  };
  DOMPurify.isValidAttribute = function(tag, attr, value) {
    if (!CONFIG) {
      _parseConfig({});
    }
    const lcTag = transformCaseFunc(tag);
    const lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function(entryPoint, hookFunction) {
    if (typeof hookFunction !== "function") {
      return;
    }
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function(entryPoint, hookFunction) {
    if (hookFunction !== void 0) {
      const index2 = arrayLastIndexOf(hooks[entryPoint], hookFunction);
      return index2 === -1 ? void 0 : arraySplice(hooks[entryPoint], index2, 1)[0];
    }
    return arrayPop(hooks[entryPoint]);
  };
  DOMPurify.removeHooks = function(entryPoint) {
    hooks[entryPoint] = [];
  };
  DOMPurify.removeAllHooks = function() {
    hooks = _createHooksMap();
  };
  return DOMPurify;
}
var purify = createDOMPurify();
function insertWithoutScoping(cache, serialized) {
  if (cache.inserted[serialized.name] === void 0) {
    return cache.insert("", serialized, cache.sheet, true);
  }
}
function merge(registered, css2, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);
  if (registeredStyles.length < 2) {
    return className;
  }
  return rawClassName + css2(registeredStyles);
}
var createEmotion = function createEmotion2(options) {
  var cache = createCache(options);
  cache.sheet.speedy = function(value) {
    this.isSpeedy = value;
  };
  cache.compat = true;
  var css2 = function css3() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var serialized = serializeStyles(args, cache.registered, void 0);
    insertStyles(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };
  var keyframes = function keyframes2() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    var serialized = serializeStyles(args, cache.registered);
    var animation = "animation-" + serialized.name;
    insertWithoutScoping(cache, {
      name: serialized.name,
      styles: "@keyframes " + animation + "{" + serialized.styles + "}"
    });
    return animation;
  };
  var injectGlobal = function injectGlobal2() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    var serialized = serializeStyles(args, cache.registered);
    insertWithoutScoping(cache, serialized);
  };
  var cx = function cx2() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return merge(cache.registered, css2, classnames(args));
  };
  return {
    css: css2,
    cx,
    injectGlobal,
    keyframes,
    hydrate: function hydrate(ids2) {
      ids2.forEach(function(key2) {
        cache.inserted[key2] = true;
      });
    },
    flush: function flush() {
      cache.registered = {};
      cache.inserted = {};
      cache.sheet.flush();
    },
    sheet: cache.sheet,
    cache,
    getRegisteredStyles: getRegisteredStyles.bind(null, cache.registered),
    merge: merge.bind(null, cache.registered, css2)
  };
};
var classnames = function classnames2(args) {
  var cls = "";
  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;
    switch (typeof arg) {
      case "boolean":
        break;
      case "object": {
        if (Array.isArray(arg)) {
          toAdd = classnames2(arg);
        } else {
          toAdd = "";
          for (var k in arg) {
            if (arg[k] && k) {
              toAdd && (toAdd += " ");
              toAdd += k;
            }
          }
        }
        break;
      }
      default: {
        toAdd = arg;
      }
    }
    if (toAdd) {
      cls && (cls += " ");
      cls += toAdd;
    }
  }
  return cls;
};
var _createEmotion = createEmotion({
  key: "css"
}), css = _createEmotion.css;
var propTypes = { exports: {} };
var ReactPropTypesSecret_1;
var hasRequiredReactPropTypesSecret;
function requireReactPropTypesSecret() {
  if (hasRequiredReactPropTypesSecret) return ReactPropTypesSecret_1;
  hasRequiredReactPropTypesSecret = 1;
  var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  ReactPropTypesSecret_1 = ReactPropTypesSecret;
  return ReactPropTypesSecret_1;
}
var factoryWithThrowingShims;
var hasRequiredFactoryWithThrowingShims;
function requireFactoryWithThrowingShims() {
  if (hasRequiredFactoryWithThrowingShims) return factoryWithThrowingShims;
  hasRequiredFactoryWithThrowingShims = 1;
  var ReactPropTypesSecret = /* @__PURE__ */ requireReactPropTypesSecret();
  function emptyFunction() {
  }
  function emptyFunctionWithReset() {
  }
  emptyFunctionWithReset.resetWarningCache = emptyFunction;
  factoryWithThrowingShims = function() {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret === ReactPropTypesSecret) {
        return;
      }
      var err = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
      );
      err.name = "Invariant Violation";
      throw err;
    }
    shim.isRequired = shim;
    function getShim() {
      return shim;
    }
    var ReactPropTypes = {
      array: shim,
      bigint: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,
      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,
      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
  };
  return factoryWithThrowingShims;
}
var hasRequiredPropTypes;
function requirePropTypes() {
  if (hasRequiredPropTypes) return propTypes.exports;
  hasRequiredPropTypes = 1;
  {
    propTypes.exports = /* @__PURE__ */ requireFactoryWithThrowingShims()();
  }
  return propTypes.exports;
}
var propTypesExports = /* @__PURE__ */ requirePropTypes();
const PropTypes = /* @__PURE__ */ getDefaultExportFromCjs(propTypesExports);
var _excluded = ["sitekey", "onChange", "theme", "type", "tabindex", "onExpired", "onErrored", "size", "stoken", "grecaptcha", "badge", "hl", "isolated"];
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key2 = sourceKeys[i];
    if (excluded.indexOf(key2) >= 0) continue;
    target[key2] = source[key2];
  }
  return target;
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _inheritsLoose$1(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
var ReCAPTCHA = /* @__PURE__ */ (function(_React$Component) {
  _inheritsLoose$1(ReCAPTCHA2, _React$Component);
  function ReCAPTCHA2() {
    var _this;
    _this = _React$Component.call(this) || this;
    _this.handleExpired = _this.handleExpired.bind(_assertThisInitialized(_this));
    _this.handleErrored = _this.handleErrored.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleRecaptchaRef = _this.handleRecaptchaRef.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = ReCAPTCHA2.prototype;
  _proto.getCaptchaFunction = function getCaptchaFunction(fnName) {
    if (this.props.grecaptcha) {
      if (this.props.grecaptcha.enterprise) {
        return this.props.grecaptcha.enterprise[fnName];
      }
      return this.props.grecaptcha[fnName];
    }
    return null;
  };
  _proto.getValue = function getValue() {
    var getResponse = this.getCaptchaFunction("getResponse");
    if (getResponse && this._widgetId !== void 0) {
      return getResponse(this._widgetId);
    }
    return null;
  };
  _proto.getWidgetId = function getWidgetId() {
    if (this.props.grecaptcha && this._widgetId !== void 0) {
      return this._widgetId;
    }
    return null;
  };
  _proto.execute = function execute() {
    var execute2 = this.getCaptchaFunction("execute");
    if (execute2 && this._widgetId !== void 0) {
      return execute2(this._widgetId);
    } else {
      this._executeRequested = true;
    }
  };
  _proto.executeAsync = function executeAsync() {
    var _this2 = this;
    return new Promise(function(resolve, reject) {
      _this2.executionResolve = resolve;
      _this2.executionReject = reject;
      _this2.execute();
    });
  };
  _proto.reset = function reset() {
    var resetter = this.getCaptchaFunction("reset");
    if (resetter && this._widgetId !== void 0) {
      resetter(this._widgetId);
    }
  };
  _proto.forceReset = function forceReset() {
    var resetter = this.getCaptchaFunction("reset");
    if (resetter) {
      resetter();
    }
  };
  _proto.handleExpired = function handleExpired() {
    if (this.props.onExpired) {
      this.props.onExpired();
    } else {
      this.handleChange(null);
    }
  };
  _proto.handleErrored = function handleErrored() {
    if (this.props.onErrored) {
      this.props.onErrored();
    }
    if (this.executionReject) {
      this.executionReject();
      delete this.executionResolve;
      delete this.executionReject;
    }
  };
  _proto.handleChange = function handleChange(token) {
    if (this.props.onChange) {
      this.props.onChange(token);
    }
    if (this.executionResolve) {
      this.executionResolve(token);
      delete this.executionReject;
      delete this.executionResolve;
    }
  };
  _proto.explicitRender = function explicitRender() {
    var render3 = this.getCaptchaFunction("render");
    if (render3 && this._widgetId === void 0) {
      var wrapper = document.createElement("div");
      this._widgetId = render3(wrapper, {
        sitekey: this.props.sitekey,
        callback: this.handleChange,
        theme: this.props.theme,
        type: this.props.type,
        tabindex: this.props.tabindex,
        "expired-callback": this.handleExpired,
        "error-callback": this.handleErrored,
        size: this.props.size,
        stoken: this.props.stoken,
        hl: this.props.hl,
        badge: this.props.badge,
        isolated: this.props.isolated
      });
      this.captcha.appendChild(wrapper);
    }
    if (this._executeRequested && this.props.grecaptcha && this._widgetId !== void 0) {
      this._executeRequested = false;
      this.execute();
    }
  };
  _proto.componentDidMount = function componentDidMount() {
    this.explicitRender();
  };
  _proto.componentDidUpdate = function componentDidUpdate() {
    this.explicitRender();
  };
  _proto.handleRecaptchaRef = function handleRecaptchaRef(elem) {
    this.captcha = elem;
  };
  _proto.render = function render3() {
    var _this$props = this.props;
    _this$props.sitekey;
    _this$props.onChange;
    _this$props.theme;
    _this$props.type;
    _this$props.tabindex;
    _this$props.onExpired;
    _this$props.onErrored;
    _this$props.size;
    _this$props.stoken;
    _this$props.grecaptcha;
    _this$props.badge;
    _this$props.hl;
    _this$props.isolated;
    var childProps = _objectWithoutPropertiesLoose$1(_this$props, _excluded);
    return /* @__PURE__ */ reactExports.createElement("div", _extends$1({}, childProps, {
      ref: this.handleRecaptchaRef
    }));
  };
  return ReCAPTCHA2;
})(reactExports.Component);
ReCAPTCHA.displayName = "ReCAPTCHA";
ReCAPTCHA.propTypes = {
  sitekey: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  grecaptcha: PropTypes.object,
  theme: PropTypes.oneOf(["dark", "light"]),
  type: PropTypes.oneOf(["image", "audio"]),
  tabindex: PropTypes.number,
  onExpired: PropTypes.func,
  onErrored: PropTypes.func,
  size: PropTypes.oneOf(["compact", "normal", "invisible"]),
  stoken: PropTypes.string,
  hl: PropTypes.string,
  badge: PropTypes.oneOf(["bottomright", "bottomleft", "inline"]),
  isolated: PropTypes.bool
};
ReCAPTCHA.defaultProps = {
  onChange: function onChange() {
  },
  theme: "light",
  type: "image",
  tabindex: 0,
  size: "normal",
  badge: "bottomright"
};
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key2 = sourceKeys[i];
    if (excluded.indexOf(key2) >= 0) continue;
    target[key2] = source[key2];
  }
  return target;
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
var SCRIPT_MAP = {};
var idCount = 0;
function makeAsyncScript(getScriptURL, options) {
  options = options || {};
  return function wrapWithAsyncScript(WrappedComponent) {
    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || "Component";
    var AsyncScriptLoader = /* @__PURE__ */ (function(_Component) {
      _inheritsLoose(AsyncScriptLoader2, _Component);
      function AsyncScriptLoader2(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.state = {};
        _this.__scriptURL = "";
        return _this;
      }
      var _proto = AsyncScriptLoader2.prototype;
      _proto.asyncScriptLoaderGetScriptLoaderID = function asyncScriptLoaderGetScriptLoaderID() {
        if (!this.__scriptLoaderID) {
          this.__scriptLoaderID = "async-script-loader-" + idCount++;
        }
        return this.__scriptLoaderID;
      };
      _proto.setupScriptURL = function setupScriptURL() {
        this.__scriptURL = typeof getScriptURL === "function" ? getScriptURL() : getScriptURL;
        return this.__scriptURL;
      };
      _proto.asyncScriptLoaderHandleLoad = function asyncScriptLoaderHandleLoad(state) {
        var _this2 = this;
        this.setState(state, function() {
          return _this2.props.asyncScriptOnLoad && _this2.props.asyncScriptOnLoad(_this2.state);
        });
      };
      _proto.asyncScriptLoaderTriggerOnScriptLoaded = function asyncScriptLoaderTriggerOnScriptLoaded() {
        var mapEntry = SCRIPT_MAP[this.__scriptURL];
        if (!mapEntry || !mapEntry.loaded) {
          throw new Error("Script is not loaded.");
        }
        for (var obsKey in mapEntry.observers) {
          mapEntry.observers[obsKey](mapEntry);
        }
        delete window[options.callbackName];
      };
      _proto.componentDidMount = function componentDidMount() {
        var _this3 = this;
        var scriptURL = this.setupScriptURL();
        var key2 = this.asyncScriptLoaderGetScriptLoaderID();
        var _options = options, globalName2 = _options.globalName, callbackName2 = _options.callbackName, scriptId = _options.scriptId;
        if (globalName2 && typeof window[globalName2] !== "undefined") {
          SCRIPT_MAP[scriptURL] = {
            loaded: true,
            observers: {}
          };
        }
        if (SCRIPT_MAP[scriptURL]) {
          var entry = SCRIPT_MAP[scriptURL];
          if (entry && (entry.loaded || entry.errored)) {
            this.asyncScriptLoaderHandleLoad(entry);
            return;
          }
          entry.observers[key2] = function(entry2) {
            return _this3.asyncScriptLoaderHandleLoad(entry2);
          };
          return;
        }
        var observers = {};
        observers[key2] = function(entry2) {
          return _this3.asyncScriptLoaderHandleLoad(entry2);
        };
        SCRIPT_MAP[scriptURL] = {
          loaded: false,
          observers
        };
        var script = document.createElement("script");
        script.src = scriptURL;
        script.async = true;
        for (var attribute in options.attributes) {
          script.setAttribute(attribute, options.attributes[attribute]);
        }
        if (scriptId) {
          script.id = scriptId;
        }
        var callObserverFuncAndRemoveObserver = function callObserverFuncAndRemoveObserver2(func) {
          if (SCRIPT_MAP[scriptURL]) {
            var mapEntry = SCRIPT_MAP[scriptURL];
            var observersMap = mapEntry.observers;
            for (var obsKey in observersMap) {
              if (func(observersMap[obsKey])) {
                delete observersMap[obsKey];
              }
            }
          }
        };
        if (callbackName2 && typeof window !== "undefined") {
          window[callbackName2] = function() {
            return _this3.asyncScriptLoaderTriggerOnScriptLoaded();
          };
        }
        script.onload = function() {
          var mapEntry = SCRIPT_MAP[scriptURL];
          if (mapEntry) {
            mapEntry.loaded = true;
            callObserverFuncAndRemoveObserver(function(observer) {
              if (callbackName2) {
                return false;
              }
              observer(mapEntry);
              return true;
            });
          }
        };
        script.onerror = function() {
          var mapEntry = SCRIPT_MAP[scriptURL];
          if (mapEntry) {
            mapEntry.errored = true;
            callObserverFuncAndRemoveObserver(function(observer) {
              observer(mapEntry);
              return true;
            });
          }
        };
        document.body.appendChild(script);
      };
      _proto.componentWillUnmount = function componentWillUnmount() {
        var scriptURL = this.__scriptURL;
        if (options.removeOnUnmount === true) {
          var allScripts = document.getElementsByTagName("script");
          for (var i = 0; i < allScripts.length; i += 1) {
            if (allScripts[i].src.indexOf(scriptURL) > -1) {
              if (allScripts[i].parentNode) {
                allScripts[i].parentNode.removeChild(allScripts[i]);
              }
            }
          }
        }
        var mapEntry = SCRIPT_MAP[scriptURL];
        if (mapEntry) {
          delete mapEntry.observers[this.asyncScriptLoaderGetScriptLoaderID()];
          if (options.removeOnUnmount === true) {
            delete SCRIPT_MAP[scriptURL];
          }
        }
      };
      _proto.render = function render3() {
        var globalName2 = options.globalName;
        var _this$props = this.props;
        _this$props.asyncScriptOnLoad;
        var forwardedRef = _this$props.forwardedRef, childProps = _objectWithoutPropertiesLoose(_this$props, ["asyncScriptOnLoad", "forwardedRef"]);
        if (globalName2 && typeof window !== "undefined") {
          childProps[globalName2] = typeof window[globalName2] !== "undefined" ? window[globalName2] : void 0;
        }
        childProps.ref = forwardedRef;
        return reactExports.createElement(WrappedComponent, childProps);
      };
      return AsyncScriptLoader2;
    })(reactExports.Component);
    var ForwardedComponent = reactExports.forwardRef(function(props, ref) {
      return reactExports.createElement(AsyncScriptLoader, _extends({}, props, {
        forwardedRef: ref
      }));
    });
    ForwardedComponent.displayName = "AsyncScriptLoader(" + wrappedComponentName + ")";
    ForwardedComponent.propTypes = {
      asyncScriptOnLoad: PropTypes.func
    };
    return hoistNonReactStatics$1(ForwardedComponent, WrappedComponent);
  };
}
var callbackName = "onloadcallback";
var globalName = "grecaptcha";
function getOptions() {
  return typeof window !== "undefined" && window.recaptchaOptions || {};
}
function getURL() {
  var dynamicOptions = getOptions();
  var hostname = dynamicOptions.useRecaptchaNet ? "recaptcha.net" : "www.google.com";
  if (dynamicOptions.enterprise) {
    return "https://" + hostname + "/recaptcha/enterprise.js?onload=" + callbackName + "&render=explicit";
  }
  return "https://" + hostname + "/recaptcha/api.js?onload=" + callbackName + "&render=explicit";
}
const RecaptchaWrapper = makeAsyncScript(getURL, {
  callbackName,
  globalName,
  attributes: getOptions().nonce ? {
    nonce: getOptions().nonce
  } : {}
})(ReCAPTCHA);
const convertDateTimeFormatPhpToJS = (format2) => {
  const map = {
    "d": "DD",
    // Day of month, 2 digits (01-31)
    "D": "ddd",
    // Abbreviated weekday name (Mon-Sun)
    "j": "D",
    // Day of month, no leading zero (1-31)
    "l": "dddd",
    // Full weekday name (Monday-Sunday)
    "N": "E",
    // ISO day of week (1=Monday, 7=Sunday)
    "w": "d",
    // Day of week (0=Sunday, 6=Saturday)
    "F": "MMMM",
    // Full month name (January-December)
    "m": "MM",
    // Month with leading zeros (01-12)
    "M": "MMM",
    // Abbreviated month name (Jan-Dec)
    "n": "M",
    // Month without leading zeros (1-12)
    "Y": "YYYY",
    // 4-digit year
    "y": "YY",
    // 2-digit year
    "H": "HH",
    // Hours 24h with leading zeros (00-23)
    "G": "H",
    // Hours 24h without leading zeros (0-23)
    "h": "hh",
    // Hours 12h with leading zeros (01-12)
    "g": "h",
    // Hours 12h without leading zeros (1-12)
    "i": "mm",
    // Minutes with leading zeros (00-59)
    "s": "ss",
    // Seconds with leading zeros (00-59)
    "A": "A",
    // AM/PM uppercase
    "a": "a",
    // am/pm lowercase
    "K": "A"
    // AM/PM (legacy mapping)
  };
  let result = "";
  for (let i = 0; i < format2.length; i++) {
    const char = format2[i];
    if (char === "\\" && i + 1 < format2.length) {
      result += "[" + format2[i + 1] + "]";
      i++;
    } else if (map[char]) {
      result += map[char];
    } else {
      result += char;
    }
  }
  return result;
};
const checkCondition = (store, condition) => {
  const field = store.form.fields[condition.fieldId];
  if (!field) {
    return false;
  }
  if (rtclFB.isAdminEnd && ["title", "description"].includes(field.element)) {
    return;
  }
  const fieldName = field.name;
  const fieldValue = store.formData[fieldName];
  let currentValue;
  if (field.element === "pricing") {
    currentValue = fieldValue?.price;
  } else if (["category", "location", "tag"].includes(field.element)) {
    if (Array.isArray(fieldValue) && fieldValue.length) {
      currentValue = fieldValue?.map((_term) => _term.term_id);
    }
    condition.value = condition.value ? parseInt(condition.value, 10) : condition.value;
  } else {
    currentValue = fieldValue;
  }
  if ("=" === condition.operator) {
    return currentValue == condition.value;
  } else if ("!=" === condition.operator) {
    return currentValue != condition.value;
  } else if (">" === condition.operator) {
    return currentValue > condition.value;
  } else if (">=" === condition.operator) {
    return currentValue >= condition.value;
  } else if ("<" === condition.operator) {
    return currentValue < condition.value;
  } else if ("<=" === condition.operator) {
    return currentValue <= condition.value;
  } else if ("contains" === condition.operator) {
    return Array.isArray(currentValue) && currentValue.includes(condition.value);
  } else if ("doNotContains" === condition.operator) {
    return !Array.isArray(currentValue) || !currentValue.includes(condition.value);
  } else if ("startsWith" === condition.operator) {
    return currentValue && currentValue.startsWith(condition.value);
  } else if ("endsWith" === condition.operator) {
    return currentValue && currentValue.endsWith(condition.value);
  } else if ("empty" === condition.operator) {
    return !currentValue;
  } else if ("notEmpty" === condition.operator) {
    return !!currentValue;
  }
  return false;
};
const isValidateCondition = (store, logics) => {
  if (logics.relation && "and" === logics.relation.toLowerCase()) {
    return logics.conditions?.every((_condition) => checkCondition(store, _condition));
  } else {
    return logics.conditions?.some((_condition) => checkCondition(store, _condition));
  }
};
const isValidUrl = (value) => {
  if (!value) return false;
  const url = String(value).trim();
  const regex = /^https?:\/\/([\w-]+\.)+[\w-]{2,}(:\d+)?([/?#][^\s]*)?$/i;
  return regex.test(url);
};
const isValidateField = (value, field) => {
  const { logics, validation: rules, uuid, name } = field;
  if (rules) {
    const errors = {};
    Object.keys(rules).map((ruleKey) => {
      if (rules[ruleKey].value) {
        let hasError = false;
        if ("required" === ruleKey) {
          if (field.element === "pricing") {
            if (field.options.length) {
              const message = rules[ruleKey].message.replace(/{value}/g, rules[ruleKey].value);
              const priceRequiredErrors = {};
              if (field.options.includes("pricing_type")) {
                if (!value?.pricing_type) {
                  priceRequiredErrors["pricing_type"] = message;
                }
              }
              if (!field.options.includes("pricing_type") || field.options.includes("pricing_type") && value?.pricing_type !== "disabled") {
                if (field.options.includes("price_type")) {
                  if (!value?.price_type) {
                    priceRequiredErrors["price_type"] = message;
                  }
                }
                if (!field.options.includes("price_type") || field.options.includes("price_type") && value?.price_type !== "on_call") {
                  if (field.options.includes("price_unit")) {
                    if (!value?.price_unit) {
                      priceRequiredErrors["price_unit"] = message;
                    }
                  }
                  if (!value?.price) {
                    priceRequiredErrors["price"] = message;
                  } else if (value?.price < 0) {
                    priceRequiredErrors["price"] = rtclFB?.i18n?.pricing?.negative_price_error || "Price must be a positive value.";
                  }
                  if (field.options.includes("pricing_type") && value?.pricing_type === "range") {
                    if (!value?.max_price) {
                      priceRequiredErrors["max_price"] = message;
                    }
                  }
                }
              }
              if (Object.keys(priceRequiredErrors).length) {
                errors[ruleKey] = priceRequiredErrors;
              }
            } else {
              hasError = !value?.price;
            }
          } else {
            hasError = !value;
          }
        } else if ("min" === ruleKey) {
          if ("number" === field.element) {
            let ruleValue = parseInt(rules[ruleKey].value, 10);
            if (value && value < ruleValue) {
              hasError = true;
            }
          } else {
            let ruleValue = parseInt(rules[ruleKey].value, 10);
            if (value) {
              let checkLength = value.length;
              if ((field.editor_type === "wp_editor" || ["description", "excerpt"].includes(field.element)) && typeof value === "string") {
                const tmp = document.createElement("div");
                tmp.innerHTML = value;
                checkLength = (tmp.textContent || tmp.innerText || "").length;
              }
              if (checkLength < ruleValue) {
                hasError = true;
              }
            }
          }
        } else if ("max" === ruleKey) {
          const ruleValue = Number(rules[ruleKey].value);
          if (value && !Number.isNaN(ruleValue)) {
            if ("number" === field.element) {
              if (value > ruleValue) {
                hasError = true;
              }
            } else {
              let checkLength = value.length;
              if ((field.editor_type === "wp_editor" || ["description", "excerpt"].includes(field.element)) && typeof value === "string") {
                const tmp = document.createElement("div");
                tmp.innerHTML = value;
                checkLength = (tmp.textContent || tmp.innerText || "").length;
              }
              if (ruleValue && checkLength > ruleValue) {
                hasError = true;
              }
            }
          }
        } else if ("url" === ruleKey) {
          if (value && !isValidUrl(value)) {
            hasError = true;
          }
        } else if ("email" === ruleKey) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (value && !emailRegex.test(value)) {
            hasError = true;
          }
        } else if ("regex" === ruleKey) {
          if (value && rules[ruleKey].value) {
            try {
              const re = new RegExp(rules[ruleKey].value);
              if (!re.test(value)) hasError = true;
            } catch (e) {
            }
          }
        }
        if (hasError && rules[ruleKey].message) {
          errors[ruleKey] = rules[ruleKey].message.replace(/{value}/g, rules[ruleKey].value);
        }
      }
    });
    if (["website", "url"].includes(field.element) && value && !errors.url && !isValidUrl(value)) {
      errors.url = rules?.url?.message || typeof rtclFB !== "undefined" && rtclFB?.i18n?.invalid_url || "Please enter a valid URL (e.g. https://example.com)";
    }
    if (Object.keys(errors).length) {
      return errors;
    }
  }
  return null;
};
const isValidateRepeaterFields = (values, repeater) => {
  const { fields } = repeater;
  const errors = {};
  values = Array.isArray(values) && values.length ? values : [{}];
  if (fields && Array.isArray(fields) && fields.length) {
    values.map((repeaterValue, repeaterIndex) => {
      fields.map((_field, fieldIndex) => {
        const _errors = isValidateField(repeaterValue[_field.name], _field);
        if (_errors) {
          errors[repeaterIndex] = errors[repeaterIndex] ? {
            ...errors[repeaterIndex],
            [_field.uuid]: _errors
          } : { [_field.uuid]: _errors };
        } else {
          if (errors?.[repeaterIndex]?.[_field.uuid])
            delete errors?.[repeaterIndex]?.[_field.uuid];
        }
      });
      if (errors?.[repeaterIndex] && Object.keys(errors?.[repeaterIndex]).length < 1) {
        delete errors?.[repeaterIndex];
      }
    });
  }
  if (Object.keys(errors).length) {
    return errors;
  }
  return null;
};
const getPlainTextLength = (value, editorType) => {
  if (!value) return 0;
  if (editorType === "wp_editor" && typeof value === "string") {
    const tmp = document.createElement("div");
    tmp.innerHTML = value;
    return (tmp.textContent || tmp.innerText || "").length;
  }
  return typeof value === "string" ? value.length : 0;
};
const collapseExtraSpaces = (value) => {
  if (typeof value !== "string" || value === "") {
    return value;
  }
  return value.replace(/(?:&nbsp;|[^\S\r\n]){2,}/gi, " ");
};
const isEmpty = (value) => value == null || typeof value === "object" && Object.keys(value).length === 0 || typeof value === "string" && value.trim().length === 0;
const stripPhoneDialCode = (value) => {
  if (!value || !value.startsWith("+")) return value;
  const list = (typeof rtclFB !== "undefined" ? rtclFB.countryPhoneList : null) || [];
  let bestLen = 0;
  for (const c of list) {
    if (value.startsWith(c.dial_code) && c.dial_code.length > bestLen) bestLen = c.dial_code.length;
  }
  return bestLen ? value.slice(bestLen).trimStart() : value;
};
const hasDialCode = (value) => {
  if (!value || !value.startsWith("+")) return false;
  const list = (typeof rtclFB !== "undefined" ? rtclFB.countryPhoneList : null) || [];
  return list.some((c) => value.startsWith(c.dial_code));
};
const isObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
const namefy = (text2) => {
  return text2.toString().normalize("NFKD").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/\_\_+/g, "_");
};
const optionify = (text2) => {
  return text2.toString().normalize("NFKD").toLowerCase().trim().replace(/\s+/g, "_").replace(/[^\w\-]+/g, "").replace(/\-/g, "_").replace(/\_\_+/g, "_");
};
const classify = (text2) => {
  if (text2 == null) return "";
  return String(text2).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9\s_-]/g, "");
};
const convertBytes = (bytes, options) => {
  options = { ...options, useBinaryUnits: false, decimals: 2 };
  const { useBinaryUnits = false, decimals = 2 } = options;
  if (decimals < 0) {
    throw new Error(`Invalid decimals ${decimals}`);
  }
  const base = useBinaryUnits ? 1024 : 1e3;
  const units = useBinaryUnits ? ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"] : ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(base));
  return `${(bytes / Math.pow(base, i)).toFixed(decimals)} ${units[i]}`;
};
const getFileNameFromUrl = (url) => {
  if (!url) {
    return "";
  }
  return url.split("#")[0].split("?")[0].split("/").pop();
};
const capitalize = (s) => {
  if (!s) return s;
  const [f, ...r] = [...String(s)];
  return f ? f.toLocaleUpperCase() + r.join("") : "";
};
const collectSlUsedFields = (singleLayout) => {
  const out = /* @__PURE__ */ new Set();
  const addSections = (sections) => {
    for (const sec of sections ?? []) {
      for (const sCol of sec.containers ?? []) {
        for (const id of sCol.fields ?? []) out.add(id);
      }
    }
  };
  if (singleLayout?.rows) {
    for (const row of singleLayout.rows) {
      for (const col of row.columns ?? []) addSections(col.sections);
    }
  } else {
    addSections(singleLayout?.sections);
  }
  return [...out];
};
const generateRandomString = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(35);
};
const generateFormStructure = (fields, translatedTitle, availableFields) => {
  const matchedFields = fields.reduce((acc, field) => {
    if (availableFields[field.type] && availableFields[field.type].editor && availableFields[field.type].editor.icon_class) {
      const uuid = generateRandomString();
      const name = availableFields[field.type].preset ? `${field.type}` : `${field.type}_${uuid}`;
      acc[uuid] = {
        uuid,
        name,
        label: field.label,
        element: field.type,
        placeholder: field.label,
        preset: availableFields[field.type].preset || false,
        validation: {
          required: {
            value: field.required || false,
            message: "This field is required"
          }
        },
        section: field.section
      };
      if (field.type === "pricing") {
        acc[uuid].name = `${field.type}`;
        acc[uuid].options = ["pricing_type", "price_type"];
        acc[uuid].pricing_type = "price";
        acc[uuid].price_type = "fixed";
        acc[uuid].price_type_label = "Price Type";
        acc[uuid].price_unit_label = "Price Unit";
        acc[uuid].pricing_type_label = "Pricing Type";
        acc[uuid].price_unit = "hour";
      }
      if (field.type === "select" || field.type === "checkbox" || field.type === "radio") {
        acc[uuid].options = field.options?.map((option) => ({
          label: option,
          value: option.toLowerCase().replace(/\s+/g, "-"),
          icon_class: ""
        }));
      }
      if (field.type === "terms_and_condition") {
        acc[uuid].tnc_html = field.label;
        acc[uuid].element = field.type;
      }
      if (field.type === "date") {
        acc[uuid].date_format = "d/m/Y H:i";
      }
    }
    return acc;
  }, {});
  const sectionFieldsMap = Object.entries(matchedFields).reduce((acc, [uuid, field]) => {
    if (!acc[field.section]) {
      acc[field.section] = [];
    }
    acc[field.section].push(uuid);
    return acc;
  }, {});
  return {
    title: translatedTitle,
    slug: translatedTitle.toLowerCase().replace(/\s+/g, "-"),
    status: "publish",
    fields: matchedFields,
    sections: Object.entries(sectionFieldsMap).map(([section, fields2], index2) => ({
      uuid: generateRandomString(),
      title: section || `Section ${index2 + 1}`,
      logics: "",
      // New (6.0+) structure: field-columns live under `containers` with no `width`
      // — matches FormPreDefined::sample()/blank() and getSectionField(). Legacy forms
      // used `columns: [{width, fields}]`; emitting that here would render as an old form.
      containers: [{ fields: fields2.length > 0 ? fields2 : [] }],
      element: "section",
      css_class: ""
    })),
    settings: {
      submit_btn_text: "Submit",
      update_btn_text: "Update"
    },
    default: true,
    created_by: "1",
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  };
};
const submitFormData = async (formStructure) => {
  try {
    const response = await jQuery.ajax({
      url: rtclFB.ajaxurl,
      method: "post",
      data: {
        __rtcl_wpnonce: rtclFB.__rtcl_wpnonce,
        id: "ai",
        ai_form_data: formStructure,
        action: "rtcl_fb_admin_form_create"
      }
    });
    return response;
  } catch (error) {
    throw new Error("There was an error submitting the form.");
  }
};
const fetchAIKeyword = async (formData) => {
  try {
    const response = await jQuery.ajax({
      url: rtclFB.ajaxurl,
      method: "post",
      data: {
        __rtcl_wpnonce: rtclFB.__rtcl_wpnonce,
        id: "ai",
        ai_form_data: formData,
        action: "rtcl_fb_admin_fetch_ai_keyword"
      }
    });
    return response;
  } catch (error) {
    throw new Error("There was an error submitting the form.");
  }
};
const fetchAIFormField = async (formData) => {
  try {
    const response = await jQuery.ajax({
      url: rtclFB.ajaxurl,
      method: "post",
      data: {
        __rtcl_wpnonce: rtclFB.__rtcl_wpnonce,
        ai_form_data: formData,
        action: "rtcl_fb_admin_fetch_ai_form_fields"
      }
    });
    return response;
  } catch (error) {
    throw new Error("There was an error submitting the form.");
  }
};
const fetchAIChatWithCustomer = async (formData, systemPrompt) => {
  try {
    const response = await jQuery.ajax({
      url: rtclFB.ajaxurl,
      method: "post",
      data: {
        __rtcl_wpnonce: rtclFB.nonce,
        prompt: formData,
        systemPrompt,
        action: "rtcl_fb_write_with_ai"
      }
    });
    return response;
  } catch (error) {
    throw new Error("There was an error submitting the form.");
  }
};
export {
  arrayMove as $,
  AIIcon as A,
  RefIcon$1 as B,
  Checkbox as C,
  DndContext as D,
  dayjs as E,
  Flex as F,
  isEmpty as G,
  HelpMessage as H,
  verticalListSortingStrategy as I,
  useDroppable as J,
  useDraggable as K,
  isObject as L,
  Slider2 as M,
  optionify as N,
  namefy as O,
  PurePanel$3 as P,
  capitalize as Q,
  RefIcon$g as R,
  Spin as S,
  Tag as T,
  Upload as U,
  classify as V,
  closestCenter as W,
  useSensors as X,
  sortableKeyboardCoordinates as Y,
  KeyboardSensor as Z,
  DragOverlay as _,
  Popover as a,
  pointerWithin as a0,
  rectIntersection as a1,
  collectSlUsedFields as a2,
  fetchAIKeyword as a3,
  generateFormStructure as a4,
  submitFormData as a5,
  fetchAIFormField as a6,
  isValidateField as a7,
  fetchAIChatWithCustomer as a8,
  collapseExtraSpaces as a9,
  getPlainTextLength as aa,
  getFileNameFromUrl as ab,
  convertBytes as ac,
  weekday as ad,
  localeData as ae,
  weekOfYear as af,
  RefIcon$c as ag,
  stripPhoneDialCode as ah,
  isValidateCondition as ai,
  isValidateRepeaterFields as aj,
  hasDialCode as ak,
  getStyle as b,
  CrossIcon as c,
  RefIcon$4 as d,
  RefIcon$5 as e,
  TypedInputNumber as f,
  getRenderPropValue as g,
  PointerSensor as h,
  SortableContext as i,
  horizontalListSortingStrategy as j,
  RefIcon$3 as k,
  useSortable as l,
  CSS as m,
  css as n,
  RefIcon$6 as o,
  purify as p,
  RefIcon$b as q,
  RefIcon as r,
  RecaptchaWrapper as s,
  ColorPicker as t,
  useSensor as u,
  convertDateTimeFormatPhpToJS as v,
  TimePicker as w,
  DatePicker as x,
  Calendar as y,
  RefIcon$2 as z
};
