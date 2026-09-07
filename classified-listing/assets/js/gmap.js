var __pow = Math.pow;
(function() {
  "use strict";
  function InfoBox(opt_opts) {
    opt_opts = opt_opts || {};
    google.maps.OverlayView.apply(this, arguments);
    this.content_ = opt_opts.content || "";
    this.disableAutoPan_ = opt_opts.disableAutoPan || false;
    this.maxWidth_ = opt_opts.maxWidth || 0;
    this.pixelOffset_ = opt_opts.pixelOffset || new google.maps.Size(0, 0);
    this.position_ = opt_opts.position || new google.maps.LatLng(0, 0);
    this.zIndex_ = opt_opts.zIndex || null;
    this.boxClass_ = opt_opts.boxClass || "infoBox";
    this.boxStyle_ = opt_opts.boxStyle || {};
    this.closeBoxMargin_ = opt_opts.closeBoxMargin || "2px";
    this.closeBoxURL_ = opt_opts.closeBoxURL || "http://www.google.com/intl/en_us/mapfiles/close.gif";
    if (opt_opts.closeBoxURL === "") {
      this.closeBoxURL_ = "";
    }
    this.infoBoxClearance_ = opt_opts.infoBoxClearance || new google.maps.Size(1, 1);
    if (typeof opt_opts.visible === "undefined") {
      if (typeof opt_opts.isHidden === "undefined") {
        opt_opts.visible = true;
      } else {
        opt_opts.visible = !opt_opts.isHidden;
      }
    }
    this.isHidden_ = !opt_opts.visible;
    this.alignBottom_ = opt_opts.alignBottom || false;
    this.pane_ = opt_opts.pane || "floatPane";
    this.enableEventPropagation_ = opt_opts.enableEventPropagation || false;
    this.div_ = null;
    this.closeListener_ = null;
    this.moveListener_ = null;
    this.contextListener_ = null;
    this.eventListeners_ = null;
    this.fixedWidthSet_ = null;
  }
  InfoBox.prototype = new google.maps.OverlayView();
  InfoBox.prototype.createInfoBoxDiv_ = function() {
    var i;
    var events;
    var bw;
    var me = this;
    var cancelHandler = function(e) {
      e.cancelBubble = true;
      if (e.stopPropagation) {
        e.stopPropagation();
      }
    };
    var ignoreHandler = function(e) {
      e.returnValue = false;
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (!me.enableEventPropagation_) {
        cancelHandler(e);
      }
    };
    if (!this.div_) {
      this.div_ = document.createElement("div");
      this.setBoxStyle_();
      if (typeof this.content_.nodeType === "undefined") {
        this.div_.innerHTML = this.getCloseBoxImg_() + this.content_;
      } else {
        this.div_.innerHTML = this.getCloseBoxImg_();
        this.div_.appendChild(this.content_);
      }
      this.getPanes()[this.pane_].appendChild(this.div_);
      this.addClickHandler_();
      if (this.div_.style.width) {
        this.fixedWidthSet_ = true;
      } else {
        if (this.maxWidth_ !== 0 && this.div_.offsetWidth > this.maxWidth_) {
          this.div_.style.width = this.maxWidth_;
          this.div_.style.overflow = "auto";
          this.fixedWidthSet_ = true;
        } else {
          bw = this.getBoxWidths_();
          this.div_.style.width = this.div_.offsetWidth - bw.left - bw.right + "px";
          this.fixedWidthSet_ = false;
        }
      }
      this.panBox_(this.disableAutoPan_);
      if (!this.enableEventPropagation_) {
        this.eventListeners_ = [];
        events = [
          "mousedown",
          "mouseover",
          "mouseout",
          "mouseup",
          "click",
          "dblclick",
          "touchstart",
          "touchend",
          "touchmove"
        ];
        for (i = 0; i < events.length; i++) {
          this.eventListeners_.push(google.maps.event.addDomListener(this.div_, events[i], cancelHandler));
        }
        this.eventListeners_.push(google.maps.event.addDomListener(this.div_, "mouseover", function(e) {
          this.style.cursor = "default";
        }));
      }
      this.contextListener_ = google.maps.event.addDomListener(this.div_, "contextmenu", ignoreHandler);
      google.maps.event.trigger(this, "domready");
    }
  };
  InfoBox.prototype.getCloseBoxImg_ = function() {
    var img = "";
    if (this.closeBoxURL_ !== "") {
      img = "<img";
      img += " src='" + this.closeBoxURL_ + "'";
      img += " align=right";
      img += " style='";
      img += " position: relative;";
      img += " cursor: pointer;";
      img += " margin: " + this.closeBoxMargin_ + ";";
      img += "'>";
    }
    return img;
  };
  InfoBox.prototype.addClickHandler_ = function() {
    var closeBox;
    if (this.closeBoxURL_ !== "") {
      closeBox = this.div_.firstChild;
      this.closeListener_ = google.maps.event.addDomListener(closeBox, "click", this.getCloseClickHandler_());
    } else {
      this.closeListener_ = null;
    }
  };
  InfoBox.prototype.getCloseClickHandler_ = function() {
    var me = this;
    return function(e) {
      e.cancelBubble = true;
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      google.maps.event.trigger(me, "closeclick");
      me.close();
    };
  };
  InfoBox.prototype.panBox_ = function(disablePan) {
    var map;
    var xOffset = 0, yOffset = 0;
    if (!disablePan) {
      map = this.getMap();
      if (map instanceof google.maps.Map) {
        if (!map.getBounds().contains(this.position_)) {
          map.setCenter(this.position_);
        }
        map.getBounds();
        var mapDiv = map.getDiv();
        var mapWidth = mapDiv.offsetWidth;
        var mapHeight = mapDiv.offsetHeight;
        var iwOffsetX = this.pixelOffset_.width;
        var iwOffsetY = this.pixelOffset_.height;
        var iwWidth = this.div_.offsetWidth;
        var iwHeight = this.div_.offsetHeight;
        var padX = this.infoBoxClearance_.width;
        var padY = this.infoBoxClearance_.height;
        var pixPosition = this.getProjection().fromLatLngToContainerPixel(this.position_);
        if (pixPosition.x < -iwOffsetX + padX) {
          xOffset = pixPosition.x + iwOffsetX - padX;
        } else if (pixPosition.x + iwWidth + iwOffsetX + padX > mapWidth) {
          xOffset = pixPosition.x + iwWidth + iwOffsetX + padX - mapWidth;
        }
        if (this.alignBottom_) {
          if (pixPosition.y < -iwOffsetY + padY + iwHeight) {
            yOffset = pixPosition.y + iwOffsetY - padY - iwHeight;
          } else if (pixPosition.y + iwOffsetY + padY > mapHeight) {
            yOffset = pixPosition.y + iwOffsetY + padY - mapHeight;
          }
        } else {
          if (pixPosition.y < -iwOffsetY + padY) {
            yOffset = pixPosition.y + iwOffsetY - padY;
          } else if (pixPosition.y + iwHeight + iwOffsetY + padY > mapHeight) {
            yOffset = pixPosition.y + iwHeight + iwOffsetY + padY - mapHeight;
          }
        }
        if (!(xOffset === 0 && yOffset === 0)) {
          map.getCenter();
          map.panBy(xOffset, yOffset);
        }
      }
    }
  };
  InfoBox.prototype.setBoxStyle_ = function() {
    var i, boxStyle;
    if (this.div_) {
      this.div_.className = this.boxClass_;
      this.div_.style.cssText = "";
      boxStyle = this.boxStyle_;
      for (i in boxStyle) {
        if (boxStyle.hasOwnProperty(i)) {
          this.div_.style[i] = boxStyle[i];
        }
      }
      this.div_.style.WebkitTransform = "translateZ(0)";
      if (typeof this.div_.style.opacity !== "undefined" && this.div_.style.opacity !== "") {
        this.div_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + this.div_.style.opacity * 100 + ')"';
        this.div_.style.filter = "alpha(opacity=" + this.div_.style.opacity * 100 + ")";
      }
      this.div_.style.position = "absolute";
      this.div_.style.visibility = "hidden";
      if (this.zIndex_ !== null) {
        this.div_.style.zIndex = this.zIndex_;
      }
    }
  };
  InfoBox.prototype.getBoxWidths_ = function() {
    var computedStyle;
    var bw = { top: 0, bottom: 0, left: 0, right: 0 };
    var box = this.div_;
    if (document.defaultView && document.defaultView.getComputedStyle) {
      computedStyle = box.ownerDocument.defaultView.getComputedStyle(box, "");
      if (computedStyle) {
        bw.top = parseInt(computedStyle.borderTopWidth, 10) || 0;
        bw.bottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;
        bw.left = parseInt(computedStyle.borderLeftWidth, 10) || 0;
        bw.right = parseInt(computedStyle.borderRightWidth, 10) || 0;
      }
    } else if (document.documentElement.currentStyle) {
      if (box.currentStyle) {
        bw.top = parseInt(box.currentStyle.borderTopWidth, 10) || 0;
        bw.bottom = parseInt(box.currentStyle.borderBottomWidth, 10) || 0;
        bw.left = parseInt(box.currentStyle.borderLeftWidth, 10) || 0;
        bw.right = parseInt(box.currentStyle.borderRightWidth, 10) || 0;
      }
    }
    return bw;
  };
  InfoBox.prototype.onRemove = function() {
    if (this.div_) {
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    }
  };
  InfoBox.prototype.draw = function() {
    this.createInfoBoxDiv_();
    var pixPosition = this.getProjection().fromLatLngToDivPixel(this.position_);
    this.div_.style.left = pixPosition.x + this.pixelOffset_.width + "px";
    if (this.alignBottom_) {
      this.div_.style.bottom = -(pixPosition.y + this.pixelOffset_.height) + "px";
    } else {
      this.div_.style.top = pixPosition.y + this.pixelOffset_.height + "px";
    }
    if (this.isHidden_) {
      this.div_.style.visibility = "hidden";
    } else {
      this.div_.style.visibility = "visible";
    }
  };
  InfoBox.prototype.setOptions = function(opt_opts) {
    if (typeof opt_opts.boxClass !== "undefined") {
      this.boxClass_ = opt_opts.boxClass;
      this.setBoxStyle_();
    }
    if (typeof opt_opts.boxStyle !== "undefined") {
      this.boxStyle_ = opt_opts.boxStyle;
      this.setBoxStyle_();
    }
    if (typeof opt_opts.content !== "undefined") {
      this.setContent(opt_opts.content);
    }
    if (typeof opt_opts.disableAutoPan !== "undefined") {
      this.disableAutoPan_ = opt_opts.disableAutoPan;
    }
    if (typeof opt_opts.maxWidth !== "undefined") {
      this.maxWidth_ = opt_opts.maxWidth;
    }
    if (typeof opt_opts.pixelOffset !== "undefined") {
      this.pixelOffset_ = opt_opts.pixelOffset;
    }
    if (typeof opt_opts.alignBottom !== "undefined") {
      this.alignBottom_ = opt_opts.alignBottom;
    }
    if (typeof opt_opts.position !== "undefined") {
      this.setPosition(opt_opts.position);
    }
    if (typeof opt_opts.zIndex !== "undefined") {
      this.setZIndex(opt_opts.zIndex);
    }
    if (typeof opt_opts.closeBoxMargin !== "undefined") {
      this.closeBoxMargin_ = opt_opts.closeBoxMargin;
    }
    if (typeof opt_opts.closeBoxURL !== "undefined") {
      this.closeBoxURL_ = opt_opts.closeBoxURL;
    }
    if (typeof opt_opts.infoBoxClearance !== "undefined") {
      this.infoBoxClearance_ = opt_opts.infoBoxClearance;
    }
    if (typeof opt_opts.isHidden !== "undefined") {
      this.isHidden_ = opt_opts.isHidden;
    }
    if (typeof opt_opts.visible !== "undefined") {
      this.isHidden_ = !opt_opts.visible;
    }
    if (typeof opt_opts.enableEventPropagation !== "undefined") {
      this.enableEventPropagation_ = opt_opts.enableEventPropagation;
    }
    if (this.div_) {
      this.draw();
    }
  };
  InfoBox.prototype.setContent = function(content) {
    this.content_ = content;
    if (this.div_) {
      if (this.closeListener_) {
        google.maps.event.removeListener(this.closeListener_);
        this.closeListener_ = null;
      }
      if (!this.fixedWidthSet_) {
        this.div_.style.width = "";
      }
      if (typeof content.nodeType === "undefined") {
        this.div_.innerHTML = this.getCloseBoxImg_() + content;
      } else {
        this.div_.innerHTML = this.getCloseBoxImg_();
        this.div_.appendChild(content);
      }
      if (!this.fixedWidthSet_) {
        this.div_.style.width = this.div_.offsetWidth + "px";
        if (typeof content.nodeType === "undefined") {
          this.div_.innerHTML = this.getCloseBoxImg_() + content;
        } else {
          this.div_.innerHTML = this.getCloseBoxImg_();
          this.div_.appendChild(content);
        }
      }
      this.addClickHandler_();
    }
    google.maps.event.trigger(this, "content_changed");
  };
  InfoBox.prototype.setPosition = function(latlng) {
    this.position_ = latlng;
    if (this.div_) {
      this.draw();
    }
    google.maps.event.trigger(this, "position_changed");
  };
  InfoBox.prototype.setZIndex = function(index) {
    this.zIndex_ = index;
    if (this.div_) {
      this.div_.style.zIndex = index;
    }
    google.maps.event.trigger(this, "zindex_changed");
  };
  InfoBox.prototype.setVisible = function(isVisible) {
    this.isHidden_ = !isVisible;
    if (this.div_) {
      this.div_.style.visibility = this.isHidden_ ? "hidden" : "visible";
    }
  };
  InfoBox.prototype.getContent = function() {
    return this.content_;
  };
  InfoBox.prototype.getPosition = function() {
    return this.position_;
  };
  InfoBox.prototype.getZIndex = function() {
    return this.zIndex_;
  };
  InfoBox.prototype.getVisible = function() {
    var isVisible;
    if (typeof this.getMap() === "undefined" || this.getMap() === null) {
      isVisible = false;
    } else {
      isVisible = !this.isHidden_;
    }
    return isVisible;
  };
  InfoBox.prototype.show = function() {
    this.isHidden_ = false;
    if (this.div_) {
      this.div_.style.visibility = "visible";
    }
  };
  InfoBox.prototype.hide = function() {
    this.isHidden_ = true;
    if (this.div_) {
      this.div_.style.visibility = "hidden";
    }
  };
  InfoBox.prototype.open = function(map, anchor) {
    var me = this;
    if (anchor) {
      this.position_ = anchor.getPosition();
      this.moveListener_ = google.maps.event.addListener(anchor, "position_changed", function() {
        me.setPosition(this.getPosition());
      });
    }
    this.setMap(map);
    if (this.div_) {
      this.panBox_();
    }
  };
  InfoBox.prototype.close = function() {
    var i;
    if (this.closeListener_) {
      google.maps.event.removeListener(this.closeListener_);
      this.closeListener_ = null;
    }
    if (this.eventListeners_) {
      for (i = 0; i < this.eventListeners_.length; i++) {
        google.maps.event.removeListener(this.eventListeners_[i]);
      }
      this.eventListeners_ = null;
    }
    if (this.moveListener_) {
      google.maps.event.removeListener(this.moveListener_);
      this.moveListener_ = null;
    }
    if (this.contextListener_) {
      google.maps.event.removeListener(this.contextListener_);
      this.contextListener_ = null;
    }
    this.setMap(null);
  };
  InfoBox.prototype.getCloseBoxImg_ = function() {
    return '<div class="closeInfoBox"><i class="rtcl-icon-cancel"></i></div>';
  };
  InfoBox.prototype.addClickHandler_ = function() {
    const closeBox = this.div_.firstChild;
    this.closeListener_ = google.maps.event.addDomListener(closeBox, "click", this.getCloseClickHandler_());
  };
  InfoBox.prototype.getCloseClickHandler_ = function() {
    var me = this;
    return function(e) {
      e.cancelBubble = true;
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      google.maps.event.trigger(me, "closeclick");
      jQuery(".infoBox").trigger("mouseleave");
      me.close();
    };
  };
  var getOwnPropertyNames = Object.getOwnPropertyNames, getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function combineComparators(comparatorA, comparatorB) {
    return function isEqual(a, b, state) {
      return comparatorA(a, b, state) && comparatorB(a, b, state);
    };
  }
  function createIsCircular(areItemsEqual) {
    return function isCircular(a, b, state) {
      if (!a || !b || typeof a !== "object" || typeof b !== "object") {
        return areItemsEqual(a, b, state);
      }
      var cache = state.cache;
      var cachedA = cache.get(a);
      var cachedB = cache.get(b);
      if (cachedA && cachedB) {
        return cachedA === b && cachedB === a;
      }
      cache.set(a, b);
      cache.set(b, a);
      var result = areItemsEqual(a, b, state);
      cache.delete(a);
      cache.delete(b);
      return result;
    };
  }
  function getShortTag(value) {
    return value != null ? value[Symbol.toStringTag] : void 0;
  }
  function getStrictProperties(object) {
    return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
  }
  var hasOwn = Object.hasOwn || (function(object, property) {
    return hasOwnProperty.call(object, property);
  });
  function sameValueZeroEqual(a, b) {
    return a === b || !a && !b && a !== a && b !== b;
  }
  var PREACT_VNODE = "__v";
  var PREACT_OWNER = "__o";
  var REACT_OWNER = "_owner";
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, keys = Object.keys;
  function areArraysEqual(a, b, state) {
    var index = a.length;
    if (b.length !== index) {
      return false;
    }
    while (index-- > 0) {
      if (!state.equals(a[index], b[index], index, index, a, b, state)) {
        return false;
      }
    }
    return true;
  }
  function areDatesEqual(a, b) {
    return sameValueZeroEqual(a.getTime(), b.getTime());
  }
  function areErrorsEqual(a, b) {
    return a.name === b.name && a.message === b.message && a.cause === b.cause && a.stack === b.stack;
  }
  function areFunctionsEqual(a, b) {
    return a === b;
  }
  function areMapsEqual(a, b, state) {
    var size = a.size;
    if (size !== b.size) {
      return false;
    }
    if (!size) {
      return true;
    }
    var matchedIndices = new Array(size);
    var aIterable = a.entries();
    var aResult;
    var bResult;
    var index = 0;
    while (aResult = aIterable.next()) {
      if (aResult.done) {
        break;
      }
      var bIterable = b.entries();
      var hasMatch = false;
      var matchIndex = 0;
      while (bResult = bIterable.next()) {
        if (bResult.done) {
          break;
        }
        if (matchedIndices[matchIndex]) {
          matchIndex++;
          continue;
        }
        var aEntry = aResult.value;
        var bEntry = bResult.value;
        if (state.equals(aEntry[0], bEntry[0], index, matchIndex, a, b, state) && state.equals(aEntry[1], bEntry[1], aEntry[0], bEntry[0], a, b, state)) {
          hasMatch = matchedIndices[matchIndex] = true;
          break;
        }
        matchIndex++;
      }
      if (!hasMatch) {
        return false;
      }
      index++;
    }
    return true;
  }
  var areNumbersEqual = sameValueZeroEqual;
  function areObjectsEqual(a, b, state) {
    var properties = keys(a);
    var index = properties.length;
    if (keys(b).length !== index) {
      return false;
    }
    while (index-- > 0) {
      if (!isPropertyEqual(a, b, state, properties[index])) {
        return false;
      }
    }
    return true;
  }
  function areObjectsEqualStrict(a, b, state) {
    var properties = getStrictProperties(a);
    var index = properties.length;
    if (getStrictProperties(b).length !== index) {
      return false;
    }
    var property;
    var descriptorA;
    var descriptorB;
    while (index-- > 0) {
      property = properties[index];
      if (!isPropertyEqual(a, b, state, property)) {
        return false;
      }
      descriptorA = getOwnPropertyDescriptor(a, property);
      descriptorB = getOwnPropertyDescriptor(b, property);
      if ((descriptorA || descriptorB) && (!descriptorA || !descriptorB || descriptorA.configurable !== descriptorB.configurable || descriptorA.enumerable !== descriptorB.enumerable || descriptorA.writable !== descriptorB.writable)) {
        return false;
      }
    }
    return true;
  }
  function arePrimitiveWrappersEqual(a, b) {
    return sameValueZeroEqual(a.valueOf(), b.valueOf());
  }
  function areRegExpsEqual(a, b) {
    return a.source === b.source && a.flags === b.flags;
  }
  function areSetsEqual(a, b, state) {
    var size = a.size;
    if (size !== b.size) {
      return false;
    }
    if (!size) {
      return true;
    }
    var matchedIndices = new Array(size);
    var aIterable = a.values();
    var aResult;
    var bResult;
    while (aResult = aIterable.next()) {
      if (aResult.done) {
        break;
      }
      var bIterable = b.values();
      var hasMatch = false;
      var matchIndex = 0;
      while (bResult = bIterable.next()) {
        if (bResult.done) {
          break;
        }
        if (!matchedIndices[matchIndex] && state.equals(aResult.value, bResult.value, aResult.value, bResult.value, a, b, state)) {
          hasMatch = matchedIndices[matchIndex] = true;
          break;
        }
        matchIndex++;
      }
      if (!hasMatch) {
        return false;
      }
    }
    return true;
  }
  function areTypedArraysEqual(a, b) {
    var index = a.length;
    if (b.length !== index) {
      return false;
    }
    while (index-- > 0) {
      if (a[index] !== b[index]) {
        return false;
      }
    }
    return true;
  }
  function areUrlsEqual(a, b) {
    return a.hostname === b.hostname && a.pathname === b.pathname && a.protocol === b.protocol && a.port === b.port && a.hash === b.hash && a.username === b.username && a.password === b.password;
  }
  function isPropertyEqual(a, b, state, property) {
    if ((property === REACT_OWNER || property === PREACT_OWNER || property === PREACT_VNODE) && (a.$$typeof || b.$$typeof)) {
      return true;
    }
    return hasOwn(b, property) && state.equals(a[property], b[property], property, property, a, b, state);
  }
  var ARGUMENTS_TAG = "[object Arguments]";
  var BOOLEAN_TAG = "[object Boolean]";
  var DATE_TAG = "[object Date]";
  var ERROR_TAG = "[object Error]";
  var MAP_TAG = "[object Map]";
  var NUMBER_TAG = "[object Number]";
  var OBJECT_TAG = "[object Object]";
  var REG_EXP_TAG = "[object RegExp]";
  var SET_TAG = "[object Set]";
  var STRING_TAG = "[object String]";
  var URL_TAG = "[object URL]";
  var isArray = Array.isArray;
  var isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null;
  var assign = Object.assign;
  var getTag = Object.prototype.toString.call.bind(Object.prototype.toString);
  function createEqualityComparator(_a) {
    var areArraysEqual2 = _a.areArraysEqual, areDatesEqual2 = _a.areDatesEqual, areErrorsEqual2 = _a.areErrorsEqual, areFunctionsEqual2 = _a.areFunctionsEqual, areMapsEqual2 = _a.areMapsEqual, areNumbersEqual2 = _a.areNumbersEqual, areObjectsEqual2 = _a.areObjectsEqual, arePrimitiveWrappersEqual2 = _a.arePrimitiveWrappersEqual, areRegExpsEqual2 = _a.areRegExpsEqual, areSetsEqual2 = _a.areSetsEqual, areTypedArraysEqual2 = _a.areTypedArraysEqual, areUrlsEqual2 = _a.areUrlsEqual, unknownTagComparators = _a.unknownTagComparators;
    return function comparator(a, b, state) {
      if (a === b) {
        return true;
      }
      if (a == null || b == null) {
        return false;
      }
      var type = typeof a;
      if (type !== typeof b) {
        return false;
      }
      if (type !== "object") {
        if (type === "number") {
          return areNumbersEqual2(a, b, state);
        }
        if (type === "function") {
          return areFunctionsEqual2(a, b, state);
        }
        return false;
      }
      var constructor = a.constructor;
      if (constructor !== b.constructor) {
        return false;
      }
      if (constructor === Object) {
        return areObjectsEqual2(a, b, state);
      }
      if (isArray(a)) {
        return areArraysEqual2(a, b, state);
      }
      if (isTypedArray != null && isTypedArray(a)) {
        return areTypedArraysEqual2(a, b, state);
      }
      if (constructor === Date) {
        return areDatesEqual2(a, b, state);
      }
      if (constructor === RegExp) {
        return areRegExpsEqual2(a, b, state);
      }
      if (constructor === Map) {
        return areMapsEqual2(a, b, state);
      }
      if (constructor === Set) {
        return areSetsEqual2(a, b, state);
      }
      var tag = getTag(a);
      if (tag === DATE_TAG) {
        return areDatesEqual2(a, b, state);
      }
      if (tag === REG_EXP_TAG) {
        return areRegExpsEqual2(a, b, state);
      }
      if (tag === MAP_TAG) {
        return areMapsEqual2(a, b, state);
      }
      if (tag === SET_TAG) {
        return areSetsEqual2(a, b, state);
      }
      if (tag === OBJECT_TAG) {
        return typeof a.then !== "function" && typeof b.then !== "function" && areObjectsEqual2(a, b, state);
      }
      if (tag === URL_TAG) {
        return areUrlsEqual2(a, b, state);
      }
      if (tag === ERROR_TAG) {
        return areErrorsEqual2(a, b, state);
      }
      if (tag === ARGUMENTS_TAG) {
        return areObjectsEqual2(a, b, state);
      }
      if (tag === BOOLEAN_TAG || tag === NUMBER_TAG || tag === STRING_TAG) {
        return arePrimitiveWrappersEqual2(a, b, state);
      }
      if (unknownTagComparators) {
        var unknownTagComparator = unknownTagComparators[tag];
        if (!unknownTagComparator) {
          var shortTag = getShortTag(a);
          if (shortTag) {
            unknownTagComparator = unknownTagComparators[shortTag];
          }
        }
        if (unknownTagComparator) {
          return unknownTagComparator(a, b, state);
        }
      }
      return false;
    };
  }
  function createEqualityComparatorConfig(_a) {
    var circular = _a.circular, createCustomConfig = _a.createCustomConfig, strict = _a.strict;
    var config = {
      areArraysEqual: strict ? areObjectsEqualStrict : areArraysEqual,
      areDatesEqual,
      areErrorsEqual,
      areFunctionsEqual,
      areMapsEqual: strict ? combineComparators(areMapsEqual, areObjectsEqualStrict) : areMapsEqual,
      areNumbersEqual,
      areObjectsEqual: strict ? areObjectsEqualStrict : areObjectsEqual,
      arePrimitiveWrappersEqual,
      areRegExpsEqual,
      areSetsEqual: strict ? combineComparators(areSetsEqual, areObjectsEqualStrict) : areSetsEqual,
      areTypedArraysEqual: strict ? areObjectsEqualStrict : areTypedArraysEqual,
      areUrlsEqual,
      unknownTagComparators: void 0
    };
    if (createCustomConfig) {
      config = assign({}, config, createCustomConfig(config));
    }
    if (circular) {
      var areArraysEqual$1 = createIsCircular(config.areArraysEqual);
      var areMapsEqual$1 = createIsCircular(config.areMapsEqual);
      var areObjectsEqual$1 = createIsCircular(config.areObjectsEqual);
      var areSetsEqual$1 = createIsCircular(config.areSetsEqual);
      config = assign({}, config, {
        areArraysEqual: areArraysEqual$1,
        areMapsEqual: areMapsEqual$1,
        areObjectsEqual: areObjectsEqual$1,
        areSetsEqual: areSetsEqual$1
      });
    }
    return config;
  }
  function createInternalEqualityComparator(compare) {
    return function(a, b, _indexOrKeyA, _indexOrKeyB, _parentA, _parentB, state) {
      return compare(a, b, state);
    };
  }
  function createIsEqual(_a) {
    var circular = _a.circular, comparator = _a.comparator, createState = _a.createState, equals = _a.equals, strict = _a.strict;
    if (createState) {
      return function isEqual(a, b) {
        var _a2 = createState(), _b = _a2.cache, cache = _b === void 0 ? circular ? /* @__PURE__ */ new WeakMap() : void 0 : _b, meta = _a2.meta;
        return comparator(a, b, {
          cache,
          equals,
          meta,
          strict
        });
      };
    }
    if (circular) {
      return function isEqual(a, b) {
        return comparator(a, b, {
          cache: /* @__PURE__ */ new WeakMap(),
          equals,
          meta: void 0,
          strict
        });
      };
    }
    var state = {
      cache: void 0,
      equals,
      meta: void 0,
      strict
    };
    return function isEqual(a, b) {
      return comparator(a, b, state);
    };
  }
  var deepEqual = createCustomEqual();
  createCustomEqual({ strict: true });
  createCustomEqual({ circular: true });
  createCustomEqual({
    circular: true,
    strict: true
  });
  createCustomEqual({
    createInternalComparator: function() {
      return sameValueZeroEqual;
    }
  });
  createCustomEqual({
    strict: true,
    createInternalComparator: function() {
      return sameValueZeroEqual;
    }
  });
  createCustomEqual({
    circular: true,
    createInternalComparator: function() {
      return sameValueZeroEqual;
    }
  });
  createCustomEqual({
    circular: true,
    createInternalComparator: function() {
      return sameValueZeroEqual;
    },
    strict: true
  });
  function createCustomEqual(options) {
    if (options === void 0) {
      options = {};
    }
    var _a = options.circular, circular = _a === void 0 ? false : _a, createCustomInternalComparator = options.createInternalComparator, createState = options.createState, _b = options.strict, strict = _b === void 0 ? false : _b;
    var config = createEqualityComparatorConfig(options);
    var comparator = createEqualityComparator(config);
    var equals = createCustomInternalComparator ? createCustomInternalComparator(comparator) : createInternalEqualityComparator(comparator);
    return createIsEqual({ circular, comparator, createState, equals, strict });
  }
  const ARRAY_TYPES = [
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array
  ];
  const VERSION = 1;
  const HEADER_SIZE = 8;
  class KDBush {
    /**
     * Creates an index from raw `ArrayBuffer` data.
     * @param {ArrayBuffer} data
     */
    static from(data) {
      if (!(data instanceof ArrayBuffer)) {
        throw new Error("Data must be an instance of ArrayBuffer.");
      }
      const [magic, versionAndType] = new Uint8Array(data, 0, 2);
      if (magic !== 219) {
        throw new Error("Data does not appear to be in a KDBush format.");
      }
      const version = versionAndType >> 4;
      if (version !== VERSION) {
        throw new Error(`Got v${version} data when expected v${VERSION}.`);
      }
      const ArrayType = ARRAY_TYPES[versionAndType & 15];
      if (!ArrayType) {
        throw new Error("Unrecognized array type.");
      }
      const [nodeSize] = new Uint16Array(data, 2, 1);
      const [numItems] = new Uint32Array(data, 4, 1);
      return new KDBush(numItems, nodeSize, ArrayType, data);
    }
    /**
     * Creates an index that will hold a given number of items.
     * @param {number} numItems
     * @param {number} [nodeSize=64] Size of the KD-tree node (64 by default).
     * @param {TypedArrayConstructor} [ArrayType=Float64Array] The array type used for coordinates storage (`Float64Array` by default).
     * @param {ArrayBuffer} [data] (For internal use only)
     */
    constructor(numItems, nodeSize = 64, ArrayType = Float64Array, data) {
      if (isNaN(numItems) || numItems < 0) throw new Error(`Unpexpected numItems value: ${numItems}.`);
      this.numItems = +numItems;
      this.nodeSize = Math.min(Math.max(+nodeSize, 2), 65535);
      this.ArrayType = ArrayType;
      this.IndexArrayType = numItems < 65536 ? Uint16Array : Uint32Array;
      const arrayTypeIndex = ARRAY_TYPES.indexOf(this.ArrayType);
      const coordsByteSize = numItems * 2 * this.ArrayType.BYTES_PER_ELEMENT;
      const idsByteSize = numItems * this.IndexArrayType.BYTES_PER_ELEMENT;
      const padCoords = (8 - idsByteSize % 8) % 8;
      if (arrayTypeIndex < 0) {
        throw new Error(`Unexpected typed array class: ${ArrayType}.`);
      }
      if (data && data instanceof ArrayBuffer) {
        this.data = data;
        this.ids = new this.IndexArrayType(this.data, HEADER_SIZE, numItems);
        this.coords = new this.ArrayType(this.data, HEADER_SIZE + idsByteSize + padCoords, numItems * 2);
        this._pos = numItems * 2;
        this._finished = true;
      } else {
        this.data = new ArrayBuffer(HEADER_SIZE + coordsByteSize + idsByteSize + padCoords);
        this.ids = new this.IndexArrayType(this.data, HEADER_SIZE, numItems);
        this.coords = new this.ArrayType(this.data, HEADER_SIZE + idsByteSize + padCoords, numItems * 2);
        this._pos = 0;
        this._finished = false;
        new Uint8Array(this.data, 0, 2).set([219, (VERSION << 4) + arrayTypeIndex]);
        new Uint16Array(this.data, 2, 1)[0] = nodeSize;
        new Uint32Array(this.data, 4, 1)[0] = numItems;
      }
    }
    /**
     * Add a point to the index.
     * @param {number} x
     * @param {number} y
     * @returns {number} An incremental index associated with the added item (starting from `0`).
     */
    add(x, y) {
      const index = this._pos >> 1;
      this.ids[index] = index;
      this.coords[this._pos++] = x;
      this.coords[this._pos++] = y;
      return index;
    }
    /**
     * Perform indexing of the added points.
     */
    finish() {
      const numAdded = this._pos >> 1;
      if (numAdded !== this.numItems) {
        throw new Error(`Added ${numAdded} items when expected ${this.numItems}.`);
      }
      sort(this.ids, this.coords, this.nodeSize, 0, this.numItems - 1, 0);
      this._finished = true;
      return this;
    }
    /**
     * Search the index for items within a given bounding box.
     * @param {number} minX
     * @param {number} minY
     * @param {number} maxX
     * @param {number} maxY
     * @returns {number[]} An array of indices correponding to the found items.
     */
    range(minX, minY, maxX, maxY) {
      if (!this._finished) throw new Error("Data not yet indexed - call index.finish().");
      const { ids, coords, nodeSize } = this;
      const stack = [0, ids.length - 1, 0];
      const result = [];
      while (stack.length) {
        const axis = stack.pop() || 0;
        const right = stack.pop() || 0;
        const left = stack.pop() || 0;
        if (right - left <= nodeSize) {
          for (let i = left; i <= right; i++) {
            const x2 = coords[2 * i];
            const y2 = coords[2 * i + 1];
            if (x2 >= minX && x2 <= maxX && y2 >= minY && y2 <= maxY) result.push(ids[i]);
          }
          continue;
        }
        const m = left + right >> 1;
        const x = coords[2 * m];
        const y = coords[2 * m + 1];
        if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);
        if (axis === 0 ? minX <= x : minY <= y) {
          stack.push(left);
          stack.push(m - 1);
          stack.push(1 - axis);
        }
        if (axis === 0 ? maxX >= x : maxY >= y) {
          stack.push(m + 1);
          stack.push(right);
          stack.push(1 - axis);
        }
      }
      return result;
    }
    /**
     * Search the index for items within a given radius.
     * @param {number} qx
     * @param {number} qy
     * @param {number} r Query radius.
     * @returns {number[]} An array of indices correponding to the found items.
     */
    within(qx, qy, r) {
      if (!this._finished) throw new Error("Data not yet indexed - call index.finish().");
      const { ids, coords, nodeSize } = this;
      const stack = [0, ids.length - 1, 0];
      const result = [];
      const r2 = r * r;
      while (stack.length) {
        const axis = stack.pop() || 0;
        const right = stack.pop() || 0;
        const left = stack.pop() || 0;
        if (right - left <= nodeSize) {
          for (let i = left; i <= right; i++) {
            if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
          }
          continue;
        }
        const m = left + right >> 1;
        const x = coords[2 * m];
        const y = coords[2 * m + 1];
        if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);
        if (axis === 0 ? qx - r <= x : qy - r <= y) {
          stack.push(left);
          stack.push(m - 1);
          stack.push(1 - axis);
        }
        if (axis === 0 ? qx + r >= x : qy + r >= y) {
          stack.push(m + 1);
          stack.push(right);
          stack.push(1 - axis);
        }
      }
      return result;
    }
  }
  function sort(ids, coords, nodeSize, left, right, axis) {
    if (right - left <= nodeSize) return;
    const m = left + right >> 1;
    select(ids, coords, m, left, right, axis);
    sort(ids, coords, nodeSize, left, m - 1, 1 - axis);
    sort(ids, coords, nodeSize, m + 1, right, 1 - axis);
  }
  function select(ids, coords, k, left, right, axis) {
    while (right > left) {
      if (right - left > 600) {
        const n = right - left + 1;
        const m = k - left + 1;
        const z = Math.log(n);
        const s = 0.5 * Math.exp(2 * z / 3);
        const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
        const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
        const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
        select(ids, coords, k, newLeft, newRight, axis);
      }
      const t = coords[2 * k + axis];
      let i = left;
      let j = right;
      swapItem(ids, coords, left, k);
      if (coords[2 * right + axis] > t) swapItem(ids, coords, left, right);
      while (i < j) {
        swapItem(ids, coords, i, j);
        i++;
        j--;
        while (coords[2 * i + axis] < t) i++;
        while (coords[2 * j + axis] > t) j--;
      }
      if (coords[2 * left + axis] === t) swapItem(ids, coords, left, j);
      else {
        j++;
        swapItem(ids, coords, j, right);
      }
      if (j <= k) left = j + 1;
      if (k <= j) right = j - 1;
    }
  }
  function swapItem(ids, coords, i, j) {
    swap(ids, i, j);
    swap(coords, 2 * i, 2 * j);
    swap(coords, 2 * i + 1, 2 * j + 1);
  }
  function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  function sqDist(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
  }
  const defaultOptions = {
    minZoom: 0,
    // min zoom to generate clusters on
    maxZoom: 16,
    // max zoom level to cluster the points on
    minPoints: 2,
    // minimum points to form a cluster
    radius: 40,
    // cluster radius in pixels
    extent: 512,
    // tile extent (radius is calculated relative to it)
    nodeSize: 64,
    // size of the KD-tree leaf node, affects performance
    log: false,
    // whether to log timing info
    // whether to generate numeric ids for input features (in vector tiles)
    generateId: false,
    // a reduce function for calculating custom cluster properties
    reduce: null,
    // (accumulated, props) => { accumulated.sum += props.sum; }
    // properties to use for individual points when running the reducer
    map: (props) => props
    // props => ({sum: props.my_value})
  };
  const fround = Math.fround || /* @__PURE__ */ ((tmp) => ((x) => {
    tmp[0] = +x;
    return tmp[0];
  }))(new Float32Array(1));
  const OFFSET_ZOOM = 2;
  const OFFSET_ID = 3;
  const OFFSET_PARENT = 4;
  const OFFSET_NUM = 5;
  const OFFSET_PROP = 6;
  class Supercluster {
    constructor(options) {
      this.options = Object.assign(Object.create(defaultOptions), options);
      this.trees = new Array(this.options.maxZoom + 1);
      this.stride = this.options.reduce ? 7 : 6;
      this.clusterProps = [];
    }
    load(points) {
      const { log, minZoom, maxZoom } = this.options;
      if (log) console.time("total time");
      const timerId = `prepare ${points.length} points`;
      if (log) console.time(timerId);
      this.points = points;
      const data = [];
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (!p.geometry) continue;
        const [lng, lat] = p.geometry.coordinates;
        const x = fround(lngX(lng));
        const y = fround(latY(lat));
        data.push(
          x,
          y,
          // projected point coordinates
          Infinity,
          // the last zoom the point was processed at
          i,
          // index of the source feature in the original input array
          -1,
          // parent cluster id
          1
          // number of points in a cluster
        );
        if (this.options.reduce) data.push(0);
      }
      let tree = this.trees[maxZoom + 1] = this._createTree(data);
      if (log) console.timeEnd(timerId);
      for (let z = maxZoom; z >= minZoom; z--) {
        const now = +Date.now();
        tree = this.trees[z] = this._createTree(this._cluster(tree, z));
        if (log) console.log("z%d: %d clusters in %dms", z, tree.numItems, +Date.now() - now);
      }
      if (log) console.timeEnd("total time");
      return this;
    }
    getClusters(bbox, zoom) {
      let minLng = ((bbox[0] + 180) % 360 + 360) % 360 - 180;
      const minLat = Math.max(-90, Math.min(90, bbox[1]));
      let maxLng = bbox[2] === 180 ? 180 : ((bbox[2] + 180) % 360 + 360) % 360 - 180;
      const maxLat = Math.max(-90, Math.min(90, bbox[3]));
      if (bbox[2] - bbox[0] >= 360) {
        minLng = -180;
        maxLng = 180;
      } else if (minLng > maxLng) {
        const easternHem = this.getClusters([minLng, minLat, 180, maxLat], zoom);
        const westernHem = this.getClusters([-180, minLat, maxLng, maxLat], zoom);
        return easternHem.concat(westernHem);
      }
      const tree = this.trees[this._limitZoom(zoom)];
      const ids = tree.range(lngX(minLng), latY(maxLat), lngX(maxLng), latY(minLat));
      const data = tree.data;
      const clusters = [];
      for (const id of ids) {
        const k = this.stride * id;
        clusters.push(data[k + OFFSET_NUM] > 1 ? getClusterJSON(data, k, this.clusterProps) : this.points[data[k + OFFSET_ID]]);
      }
      return clusters;
    }
    getChildren(clusterId) {
      const originId = this._getOriginId(clusterId);
      const originZoom = this._getOriginZoom(clusterId);
      const errorMsg = "No cluster with the specified id.";
      const tree = this.trees[originZoom];
      if (!tree) throw new Error(errorMsg);
      const data = tree.data;
      if (originId * this.stride >= data.length) throw new Error(errorMsg);
      const r = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
      const x = data[originId * this.stride];
      const y = data[originId * this.stride + 1];
      const ids = tree.within(x, y, r);
      const children = [];
      for (const id of ids) {
        const k = id * this.stride;
        if (data[k + OFFSET_PARENT] === clusterId) {
          children.push(data[k + OFFSET_NUM] > 1 ? getClusterJSON(data, k, this.clusterProps) : this.points[data[k + OFFSET_ID]]);
        }
      }
      if (children.length === 0) throw new Error(errorMsg);
      return children;
    }
    getLeaves(clusterId, limit, offset) {
      limit = limit || 10;
      offset = offset || 0;
      const leaves = [];
      this._appendLeaves(leaves, clusterId, limit, offset, 0);
      return leaves;
    }
    getTile(z, x, y) {
      const tree = this.trees[this._limitZoom(z)];
      const z2 = Math.pow(2, z);
      const { extent, radius } = this.options;
      const p = radius / extent;
      const top = (y - p) / z2;
      const bottom = (y + 1 + p) / z2;
      const tile = {
        features: []
      };
      this._addTileFeatures(
        tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom),
        tree.data,
        x,
        y,
        z2,
        tile
      );
      if (x === 0) {
        this._addTileFeatures(
          tree.range(1 - p / z2, top, 1, bottom),
          tree.data,
          z2,
          y,
          z2,
          tile
        );
      }
      if (x === z2 - 1) {
        this._addTileFeatures(
          tree.range(0, top, p / z2, bottom),
          tree.data,
          -1,
          y,
          z2,
          tile
        );
      }
      return tile.features.length ? tile : null;
    }
    getClusterExpansionZoom(clusterId) {
      let expansionZoom = this._getOriginZoom(clusterId) - 1;
      while (expansionZoom <= this.options.maxZoom) {
        const children = this.getChildren(clusterId);
        expansionZoom++;
        if (children.length !== 1) break;
        clusterId = children[0].properties.cluster_id;
      }
      return expansionZoom;
    }
    _appendLeaves(result, clusterId, limit, offset, skipped) {
      const children = this.getChildren(clusterId);
      for (const child of children) {
        const props = child.properties;
        if (props && props.cluster) {
          if (skipped + props.point_count <= offset) {
            skipped += props.point_count;
          } else {
            skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped);
          }
        } else if (skipped < offset) {
          skipped++;
        } else {
          result.push(child);
        }
        if (result.length === limit) break;
      }
      return skipped;
    }
    _createTree(data) {
      const tree = new KDBush(data.length / this.stride | 0, this.options.nodeSize, Float32Array);
      for (let i = 0; i < data.length; i += this.stride) tree.add(data[i], data[i + 1]);
      tree.finish();
      tree.data = data;
      return tree;
    }
    _addTileFeatures(ids, data, x, y, z2, tile) {
      for (const i of ids) {
        const k = i * this.stride;
        const isCluster = data[k + OFFSET_NUM] > 1;
        let tags, px, py;
        if (isCluster) {
          tags = getClusterProperties(data, k, this.clusterProps);
          px = data[k];
          py = data[k + 1];
        } else {
          const p = this.points[data[k + OFFSET_ID]];
          tags = p.properties;
          const [lng, lat] = p.geometry.coordinates;
          px = lngX(lng);
          py = latY(lat);
        }
        const f = {
          type: 1,
          geometry: [[
            Math.round(this.options.extent * (px * z2 - x)),
            Math.round(this.options.extent * (py * z2 - y))
          ]],
          tags
        };
        let id;
        if (isCluster || this.options.generateId) {
          id = data[k + OFFSET_ID];
        } else {
          id = this.points[data[k + OFFSET_ID]].id;
        }
        if (id !== void 0) f.id = id;
        tile.features.push(f);
      }
    }
    _limitZoom(z) {
      return Math.max(this.options.minZoom, Math.min(Math.floor(+z), this.options.maxZoom + 1));
    }
    _cluster(tree, zoom) {
      const { radius, extent, reduce, minPoints } = this.options;
      const r = radius / (extent * Math.pow(2, zoom));
      const data = tree.data;
      const nextData = [];
      const stride = this.stride;
      for (let i = 0; i < data.length; i += stride) {
        if (data[i + OFFSET_ZOOM] <= zoom) continue;
        data[i + OFFSET_ZOOM] = zoom;
        const x = data[i];
        const y = data[i + 1];
        const neighborIds = tree.within(data[i], data[i + 1], r);
        const numPointsOrigin = data[i + OFFSET_NUM];
        let numPoints = numPointsOrigin;
        for (const neighborId of neighborIds) {
          const k = neighborId * stride;
          if (data[k + OFFSET_ZOOM] > zoom) numPoints += data[k + OFFSET_NUM];
        }
        if (numPoints > numPointsOrigin && numPoints >= minPoints) {
          let wx = x * numPointsOrigin;
          let wy = y * numPointsOrigin;
          let clusterProperties;
          let clusterPropIndex = -1;
          const id = ((i / stride | 0) << 5) + (zoom + 1) + this.points.length;
          for (const neighborId of neighborIds) {
            const k = neighborId * stride;
            if (data[k + OFFSET_ZOOM] <= zoom) continue;
            data[k + OFFSET_ZOOM] = zoom;
            const numPoints2 = data[k + OFFSET_NUM];
            wx += data[k] * numPoints2;
            wy += data[k + 1] * numPoints2;
            data[k + OFFSET_PARENT] = id;
            if (reduce) {
              if (!clusterProperties) {
                clusterProperties = this._map(data, i, true);
                clusterPropIndex = this.clusterProps.length;
                this.clusterProps.push(clusterProperties);
              }
              reduce(clusterProperties, this._map(data, k));
            }
          }
          data[i + OFFSET_PARENT] = id;
          nextData.push(wx / numPoints, wy / numPoints, Infinity, id, -1, numPoints);
          if (reduce) nextData.push(clusterPropIndex);
        } else {
          for (let j = 0; j < stride; j++) nextData.push(data[i + j]);
          if (numPoints > 1) {
            for (const neighborId of neighborIds) {
              const k = neighborId * stride;
              if (data[k + OFFSET_ZOOM] <= zoom) continue;
              data[k + OFFSET_ZOOM] = zoom;
              for (let j = 0; j < stride; j++) nextData.push(data[k + j]);
            }
          }
        }
      }
      return nextData;
    }
    // get index of the point from which the cluster originated
    _getOriginId(clusterId) {
      return clusterId - this.points.length >> 5;
    }
    // get zoom of the point from which the cluster originated
    _getOriginZoom(clusterId) {
      return (clusterId - this.points.length) % 32;
    }
    _map(data, i, clone) {
      if (data[i + OFFSET_NUM] > 1) {
        const props = this.clusterProps[data[i + OFFSET_PROP]];
        return clone ? Object.assign({}, props) : props;
      }
      const original = this.points[data[i + OFFSET_ID]].properties;
      const result = this.options.map(original);
      return clone && result === original ? Object.assign({}, result) : result;
    }
  }
  function getClusterJSON(data, i, clusterProps) {
    return {
      type: "Feature",
      id: data[i + OFFSET_ID],
      properties: getClusterProperties(data, i, clusterProps),
      geometry: {
        type: "Point",
        coordinates: [xLng(data[i]), yLat(data[i + 1])]
      }
    };
  }
  function getClusterProperties(data, i, clusterProps) {
    const count = data[i + OFFSET_NUM];
    const abbrev = count >= 1e4 ? `${Math.round(count / 1e3)}k` : count >= 1e3 ? `${Math.round(count / 100) / 10}k` : count;
    const propIndex = data[i + OFFSET_PROP];
    const properties = propIndex === -1 ? {} : Object.assign({}, clusterProps[propIndex]);
    return Object.assign(properties, {
      cluster: true,
      cluster_id: data[i + OFFSET_ID],
      point_count: count,
      point_count_abbreviated: abbrev
    });
  }
  function lngX(lng) {
    return lng / 360 + 0.5;
  }
  function latY(lat) {
    const sin = Math.sin(lat * Math.PI / 180);
    const y = 0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;
    return y < 0 ? 0 : y > 1 ? 1 : y;
  }
  function xLng(x) {
    return (x - 0.5) * 360;
  }
  function yLat(y) {
    const y2 = (180 - y * 360) * Math.PI / 180;
    return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
  }
  function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  }
  typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };
  class MarkerUtils {
    static isAdvancedMarkerAvailable(map) {
      return google.maps.marker && map.getMapCapabilities().isAdvancedMarkersAvailable === true;
    }
    static isAdvancedMarker(marker) {
      return google.maps.marker && marker instanceof google.maps.marker.AdvancedMarkerElement;
    }
    static setMap(marker, map) {
      if (this.isAdvancedMarker(marker)) {
        marker.map = map;
      } else {
        marker.setMap(map);
      }
    }
    static getPosition(marker) {
      if (this.isAdvancedMarker(marker)) {
        if (marker.position) {
          if (marker.position instanceof google.maps.LatLng) {
            return marker.position;
          }
          if (Number.isFinite(marker.position.lat) && Number.isFinite(marker.position.lng)) {
            return new google.maps.LatLng(marker.position.lat, marker.position.lng);
          }
        }
        return new google.maps.LatLng(null);
      }
      return marker.getPosition();
    }
    static getVisible(marker) {
      if (this.isAdvancedMarker(marker)) {
        return true;
      }
      return marker.getVisible();
    }
  }
  class Cluster {
    constructor({ markers, position }) {
      this.markers = [];
      if (markers)
        this.markers = markers;
      if (position) {
        if (position instanceof google.maps.LatLng) {
          this._position = position;
        } else {
          this._position = new google.maps.LatLng(position);
        }
      }
    }
    get bounds() {
      if (this.markers.length === 0 && !this._position) {
        return;
      }
      const bounds = new google.maps.LatLngBounds(this._position, this._position);
      for (const marker of this.markers) {
        bounds.extend(MarkerUtils.getPosition(marker));
      }
      return bounds;
    }
    get position() {
      return this._position || this.bounds.getCenter();
    }
    /**
     * Get the count of **visible** markers.
     */
    get count() {
      return this.markers.filter((m) => MarkerUtils.getVisible(m)).length;
    }
    /**
     * Add a marker to the cluster.
     */
    push(marker) {
      this.markers.push(marker);
    }
    /**
     * Cleanup references and remove marker from map.
     */
    delete() {
      if (this.marker) {
        MarkerUtils.setMap(this.marker, null);
        this.marker = void 0;
      }
      this.markers.length = 0;
    }
  }
  function assertNotNull(value, message = "assertion failed") {
    if (value === null || value === void 0) {
      throw Error(message);
    }
  }
  class AbstractAlgorithm {
    constructor({ maxZoom = 16 }) {
      this.maxZoom = maxZoom;
    }
    /**
     * Helper function to bypass clustering based upon some map state such as
     * zoom, number of markers, etc.
     *
     * ```typescript
     *  cluster({markers, map}: AlgorithmInput): Cluster[] {
     *    if (shouldBypassClustering(map)) {
     *      return this.noop({markers})
     *    }
     * }
     * ```
     */
    noop({ markers }) {
      return noop(markers);
    }
  }
  const noop = (markers) => {
    const clusters = markers.map((marker) => new Cluster({
      position: MarkerUtils.getPosition(marker),
      markers: [marker]
    }));
    return clusters;
  };
  class SuperClusterAlgorithm extends AbstractAlgorithm {
    constructor(_a) {
      var { maxZoom, radius = 60 } = _a, options = __rest(_a, ["maxZoom", "radius"]);
      super({ maxZoom });
      this.markers = [];
      this.clusters = [];
      this.state = { zoom: -1 };
      this.superCluster = new Supercluster(Object.assign({ maxZoom: this.maxZoom, radius }, options));
    }
    calculate(input) {
      let changed = false;
      let zoom = input.map.getZoom();
      assertNotNull(zoom);
      zoom = Math.round(zoom);
      const state = { zoom };
      if (!deepEqual(input.markers, this.markers)) {
        changed = true;
        this.markers = [...input.markers];
        const points = this.markers.map((marker) => {
          const position = MarkerUtils.getPosition(marker);
          const coordinates = [position.lng(), position.lat()];
          return {
            type: "Feature",
            geometry: { type: "Point", coordinates },
            properties: { marker }
          };
        });
        this.superCluster.load(points);
      }
      if (!changed) {
        if (this.state.zoom <= this.maxZoom || state.zoom <= this.maxZoom) {
          changed = !deepEqual(this.state, state);
        }
      }
      this.state = state;
      if (input.markers.length === 0) {
        this.clusters = [];
        return { clusters: this.clusters, changed };
      }
      if (changed) {
        this.clusters = this.cluster(input);
      }
      return { clusters: this.clusters, changed };
    }
    cluster({ map }) {
      const zoom = map.getZoom();
      assertNotNull(zoom);
      return this.superCluster.getClusters([-180, -90, 180, 90], Math.round(zoom)).map((feature) => this.transformCluster(feature));
    }
    transformCluster({ geometry: { coordinates: [lng, lat] }, properties }) {
      if (properties.cluster) {
        return new Cluster({
          markers: this.superCluster.getLeaves(properties.cluster_id, Infinity).map((leaf) => leaf.properties.marker),
          position: { lat, lng }
        });
      }
      const marker = properties.marker;
      return new Cluster({
        markers: [marker],
        position: MarkerUtils.getPosition(marker)
      });
    }
  }
  class ClusterStats {
    constructor(markers, clusters) {
      this.markers = { sum: markers.length };
      const clusterMarkerCounts = clusters.map((a) => a.count);
      const clusterMarkerSum = clusterMarkerCounts.reduce((a, b) => a + b, 0);
      this.clusters = {
        count: clusters.length,
        markers: {
          mean: clusterMarkerSum / clusters.length,
          sum: clusterMarkerSum,
          min: Math.min(...clusterMarkerCounts),
          max: Math.max(...clusterMarkerCounts)
        }
      };
    }
  }
  class DefaultRenderer {
    /**
     * The default render function for the library used by {@link MarkerClusterer}.
     *
     * Currently set to use the following:
     *
     * ```typescript
     * // change color if this cluster has more markers than the mean cluster
     * const color =
     *   count > Math.max(10, stats.clusters.markers.mean)
     *     ? "#ff0000"
     *     : "#0000ff";
     *
     * // create svg url with fill color
     * const svg = window.btoa(`
     * <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
     *   <circle cx="120" cy="120" opacity=".6" r="70" />
     *   <circle cx="120" cy="120" opacity=".3" r="90" />
     *   <circle cx="120" cy="120" opacity=".2" r="110" />
     *   <circle cx="120" cy="120" opacity=".1" r="130" />
     * </svg>`);
     *
     * // create marker using svg icon
     * return new google.maps.Marker({
     *   position,
     *   icon: {
     *     url: `data:image/svg+xml;base64,${svg}`,
     *     scaledSize: new google.maps.Size(45, 45),
     *   },
     *   label: {
     *     text: String(count),
     *     color: "rgba(255,255,255,0.9)",
     *     fontSize: "12px",
     *   },
     *   // adjust zIndex to be above other markers
     *   zIndex: 1000 + count,
     * });
     * ```
     */
    render({ count, position }, stats, map) {
      const color = count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";
      const svg = `<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">
<circle cx="120" cy="120" opacity=".6" r="70" />
<circle cx="120" cy="120" opacity=".3" r="90" />
<circle cx="120" cy="120" opacity=".2" r="110" />
<text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">${count}</text>
</svg>`;
      const title = `Cluster of ${count} markers`, zIndex = Number(google.maps.Marker.MAX_ZINDEX) + count;
      if (MarkerUtils.isAdvancedMarkerAvailable(map)) {
        const parser = new DOMParser();
        const svgEl = parser.parseFromString(svg, "image/svg+xml").documentElement;
        svgEl.setAttribute("transform", "translate(0 25)");
        const clusterOptions2 = {
          map,
          position,
          zIndex,
          title,
          content: svgEl
        };
        return new google.maps.marker.AdvancedMarkerElement(clusterOptions2);
      }
      const clusterOptions = {
        position,
        zIndex,
        title,
        icon: {
          url: `data:image/svg+xml;base64,${btoa(svg)}`,
          anchor: new google.maps.Point(25, 25)
        }
      };
      return new google.maps.Marker(clusterOptions);
    }
  }
  function extend(type1, type2) {
    for (let property in type2.prototype) {
      type1.prototype[property] = type2.prototype[property];
    }
  }
  class OverlayViewSafe {
    constructor() {
      extend(OverlayViewSafe, google.maps.OverlayView);
    }
  }
  var MarkerClustererEvents;
  (function(MarkerClustererEvents2) {
    MarkerClustererEvents2["CLUSTERING_BEGIN"] = "clusteringbegin";
    MarkerClustererEvents2["CLUSTERING_END"] = "clusteringend";
    MarkerClustererEvents2["CLUSTER_CLICK"] = "click";
    MarkerClustererEvents2["GMP_CLICK"] = "gmp-click";
  })(MarkerClustererEvents || (MarkerClustererEvents = {}));
  const defaultOnClusterClickHandler = (_, cluster, map) => {
    if (cluster.bounds)
      map.fitBounds(cluster.bounds);
  };
  class MarkerClusterer extends OverlayViewSafe {
    constructor({ map, markers = [], algorithmOptions = {}, algorithm = new SuperClusterAlgorithm(algorithmOptions), renderer = new DefaultRenderer(), onClusterClick = defaultOnClusterClickHandler }) {
      super();
      this.map = null;
      this.idleListener = null;
      this.markers = [...markers];
      this.clusters = [];
      this.algorithm = algorithm;
      this.renderer = renderer;
      this.onClusterClick = onClusterClick;
      if (map) {
        this.setMap(map);
      }
    }
    addMarker(marker, noDraw) {
      if (this.markers.includes(marker)) {
        return;
      }
      this.markers.push(marker);
      if (!noDraw) {
        this.render();
      }
    }
    addMarkers(markers, noDraw) {
      markers.forEach((marker) => {
        this.addMarker(marker, true);
      });
      if (!noDraw) {
        this.render();
      }
    }
    removeMarker(marker, noDraw) {
      const index = this.markers.indexOf(marker);
      if (index === -1) {
        return false;
      }
      MarkerUtils.setMap(marker, null);
      this.markers.splice(index, 1);
      if (!noDraw) {
        this.render();
      }
      return true;
    }
    removeMarkers(markers, noDraw) {
      let removed = false;
      markers.forEach((marker) => {
        removed = this.removeMarker(marker, true) || removed;
      });
      if (removed && !noDraw) {
        this.render();
      }
      return removed;
    }
    clearMarkers(noDraw) {
      this.markers.length = 0;
      if (!noDraw) {
        this.render();
      }
    }
    /**
     * Recalculates and draws all the marker clusters.
     */
    render() {
      const map = this.getMap();
      if (map instanceof google.maps.Map && map.getProjection()) {
        google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_BEGIN, this);
        const { clusters, changed } = this.algorithm.calculate({
          markers: this.markers,
          map,
          mapCanvasProjection: this.getProjection()
        });
        if (changed || changed == void 0) {
          const singleMarker = /* @__PURE__ */ new Set();
          for (const cluster of clusters) {
            if (cluster.markers.length == 1) {
              singleMarker.add(cluster.markers[0]);
            }
          }
          const groupMarkers = [];
          for (const cluster of this.clusters) {
            if (cluster.marker == null) {
              continue;
            }
            if (cluster.markers.length == 1) {
              if (!singleMarker.has(cluster.marker)) {
                MarkerUtils.setMap(cluster.marker, null);
              }
            } else {
              groupMarkers.push(cluster.marker);
            }
          }
          this.clusters = clusters;
          this.renderClusters();
          requestAnimationFrame(() => groupMarkers.forEach((marker) => MarkerUtils.setMap(marker, null)));
        }
        google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_END, this);
      }
    }
    onAdd() {
      const map = this.getMap();
      assertNotNull(map);
      this.idleListener = map.addListener("idle", this.render.bind(this));
      this.render();
    }
    onRemove() {
      if (this.idleListener)
        google.maps.event.removeListener(this.idleListener);
      this.reset();
    }
    reset() {
      this.markers.forEach((marker) => MarkerUtils.setMap(marker, null));
      this.clusters.forEach((cluster) => cluster.delete());
      this.clusters = [];
    }
    renderClusters() {
      const stats = new ClusterStats(this.markers, this.clusters);
      const map = this.getMap();
      this.clusters.forEach((cluster) => {
        if (cluster.markers.length === 1) {
          cluster.marker = cluster.markers[0];
        } else {
          cluster.marker = this.renderer.render(cluster, stats, map);
          cluster.markers.forEach((marker) => MarkerUtils.setMap(marker, null));
          if (this.onClusterClick) {
            const markerClickEventName = MarkerUtils.isAdvancedMarker(cluster.marker) ? MarkerClustererEvents.GMP_CLICK : MarkerClustererEvents.CLUSTER_CLICK;
            cluster.marker.addListener(
              markerClickEventName,
              /* istanbul ignore next */
              (event) => {
                google.maps.event.trigger(this, MarkerClustererEvents.CLUSTER_CLICK, cluster);
                this.onClusterClick(event, cluster, map);
              }
            );
          }
        }
        MarkerUtils.setMap(cluster.marker, map);
      });
    }
  }
  const isChrome = /Chrome|CriOS/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const getGeneratedAddress = () => {
    let address = [];
    const items = {};
    const address_order = ["address", "sub_sub_location", "sub_location", "location", "zipcode"];
    const mapFields = document.querySelectorAll(".rtcl-map-field");
    if (mapFields.length) {
      for (let i = 0; i < mapFields.length; ++i) {
        const mapField = mapFields[i];
        if (mapField.offsetParent !== null) {
          const type = mapField.type;
          const attr_name = mapField.name;
          if ((type === "text" || type === "textarea") && mapField.value) {
            items[attr_name] = mapField.value;
          } else if (type === "select-one" && mapField.value && mapField.options[mapField.selectedIndex].innerText) {
            items[attr_name] = mapField.options[mapField.selectedIndex].innerText;
          }
        }
      }
    }
    address_order.map(function(value) {
      if (items[value] !== void 0) {
        address.push(items[value]);
      }
    });
    address = address.filter(function(v) {
      return v !== "";
    });
    address = address.join();
    return address;
  };
  const getListingMapData = () => {
    const data = [];
    const rtclLls = document.querySelectorAll(".rtcl-listing-item");
    if (rtclLls.length) {
      for (let i = 0; i < rtclLls.length; ++i) {
        const mapData = JSON.parse(rtclLls[i].getAttribute("data-options"));
        if (mapData) {
          data.push(mapData);
        }
      }
    }
    return data;
  };
  const getListingCardById = (id) => {
    if (!id) {
      return null;
    }
    const items = document.querySelectorAll(".rtcl-listing-item");
    for (let i = 0; i < items.length; ++i) {
      try {
        const opts = JSON.parse(items[i].getAttribute("data-options") || "{}");
        if (opts && String(opts.id) === String(id)) {
          return items[i];
        }
      } catch (e) {
      }
    }
    return null;
  };
  const focusListingCard = (id) => {
    const card = getListingCardById(id);
    if (!card) {
      return;
    }
    const rect = card.getBoundingClientRect();
    const viewH = window.innerHeight || document.documentElement.clientHeight;
    const fullyInView = rect.top >= 0 && rect.bottom <= viewH;
    if (!fullyInView) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    card.classList.add("rtcl-listing-focused");
    clearTimeout(card._rtclFocusTimer);
    card._rtclFocusTimer = setTimeout(() => {
      card.classList.remove("rtcl-listing-focused");
    }, 2500);
  };
  (function($) {
    let globalMap = null;
    const geoCoder = new google.maps.Geocoder();
    $(function() {
      rtcl_render_map_view();
      $(".rtcl-map").each(function() {
        rtcl_render_map(this);
      });
      rtcl_startGeoAutoSuggestion();
      rtcl_getCurrentLocation();
      $(document).on("rtcl_ajax_filter_after_render", function() {
        if ($(".rtcl-map-view").length) {
          rtcl_render_map_view();
        }
      });
      $(document).on("mouseenter", ".rtcl-listing-item .listing-title, .rtcl-listing-item .rtcl-listing-title", function() {
        rtcl_focus_map_marker(getListingIdFromEl($(this).closest(".rtcl-listing-item")[0]), true);
      }).on("mouseleave", ".rtcl-listing-item .listing-title, .rtcl-listing-item .rtcl-listing-title", function() {
        rtcl_focus_map_marker(getListingIdFromEl($(this).closest(".rtcl-listing-item")[0]), false);
      });
    });
    function getListingIdFromEl(el) {
      try {
        const opts = JSON.parse(el.getAttribute("data-options") || "{}");
        return opts && opts.id ? String(opts.id) : "";
      } catch (e) {
        return "";
      }
    }
    const rtclIconSizeCache = {};
    function withScaledIcon(url, scale, cb) {
      if (!url) {
        cb(null);
        return;
      }
      if (rtclIconSizeCache[url]) {
        const s = rtclIconSizeCache[url];
        cb({
          url,
          scaledSize: new google.maps.Size(s.w * scale, s.h * scale),
          anchor: new google.maps.Point(s.w * scale / 2, s.h * scale)
        });
        return;
      }
      const img = new Image();
      img.onload = function() {
        rtclIconSizeCache[url] = { w: img.width, h: img.height };
        cb({
          url,
          scaledSize: new google.maps.Size(img.width * scale, img.height * scale),
          anchor: new google.maps.Point(img.width * scale / 2, img.height * scale)
        });
      };
      img.onerror = function() {
        cb(null);
      };
      img.src = url;
    }
    window.rtcl_focus_map_marker = function(id, focus) {
      if (!id) {
        return;
      }
      $(".rtcl-map-view").each(function() {
        const map = $(this).data("gmapInstance");
        const markersById = $(this).data("rtclMarkersById");
        if (!map || !markersById || !markersById[id]) {
          return;
        }
        const marker = markersById[id];
        if (focus) {
          map.panTo(marker.getPosition());
          marker.setZIndex(1e3);
          withScaledIcon(marker.rtclBaseIcon, 1.28, function(icon) {
            if (icon) {
              marker.setIcon(icon);
            }
          });
        } else {
          marker.setZIndex(null);
          if (marker.rtclBaseIcon) {
            marker.setIcon(marker.rtclBaseIcon);
          }
        }
      });
    };
    window.rtcl_getCurrentLocation = function() {
      $(".rtcl-get-location").on("click", function() {
        const $_item = $(this);
        if ($_item.hasClass("initiated")) return;
        $_item.addClass("initiated");
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function(position) {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              const field_wrap = $_item.parent();
              const address_field = field_wrap.find(".rtcl-geo-address-input");
              field_wrap.find("input.latitude").val(lat);
              field_wrap.find("input.longitude").val(lng);
              if (address_field.length) {
                const latLng = new google.maps.LatLng(lat, lng);
                geoCoder.geocode(
                  { latLng },
                  function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                      if (results[0]) {
                        const place = results[0];
                        address_field.val(place.formatted_address);
                        if (rtcl_map.location === "geo" && $_item.attr("id") === "rtcl-geo-loc-form") {
                          update_latLng(place.geometry.location);
                        }
                        $(document).trigger("rtcl_map_retrieve_geocode", [{
                          lat: place.geometry.location.lat(),
                          lng: place.geometry.location.lng(),
                          address: place.formatted_address,
                          target: $_item[0]
                        }]);
                      } else {
                        toastr.error("Address not found");
                      }
                    } else {
                      toastr.error(
                        "Geocoder failed due to: " + status
                      );
                    }
                  }
                );
              }
            },
            function(error) {
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  toastr.error(
                    "User denied the request for Geolocation."
                  );
                  break;
                case error.POSITION_UNAVAILABLE:
                  toastr.error(
                    "Location information is unavailable."
                  );
                  break;
                case error.TIMEOUT:
                  toastr.error(
                    "The request to get user location timed out."
                  );
                  break;
                case error.UNKNOWN_ERROR:
                  toastr.error("An unknown error occurred.");
                  break;
                default:
                  toastr.error("An unknown error occurred.");
                  break;
              }
            }
          );
        } else {
          toastr.error("Geolocation is not supported by this browser.");
        }
      });
    };
    window.rtcl_startGeoAutoSuggestion = function() {
      $(document).find(".rtcl-geo-address-input").each(function() {
        const _input = $(this);
        this.autocomplete = isChrome ? "disabled" : "off";
        const field_wrap = _input.parent();
        const autocomplete = new google.maps.places.Autocomplete(this);
        const div = document.createElement("div");
        div.style.display = "none";
        document.body.appendChild(div);
        let map = new google.maps.Map(div);
        map = globalMap && _input.hasClass("rtcl_geo_address_input") ? globalMap : map;
        autocomplete.bindTo("bounds", map);
        google.maps.event.addListener(
          autocomplete,
          "place_changed",
          function() {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
              return;
            }
            _input.val(place.formatted_address);
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            field_wrap.find("input.latitude").val(lat);
            field_wrap.find("input.longitude").val(lng);
            $(document).trigger("rtcl_map_retrieve_geocode", [{
              lat,
              lng,
              address: place.formatted_address,
              target: _input[0]
            }]);
            if (_input.hasClass("rtcl_geo_address_input")) {
              map.setCenter(place.geometry.location);
              map.setZoom(rtcl_map.zoom.search || 17);
              if (map.markers && map.markers.length) {
                map.markers[0].setPosition(
                  place.geometry.location
                );
                if (map.markers[0].iw) {
                  map.markers[0].iw.setContent(
                    place.formatted_address
                  );
                  map.markers[0].iw.open();
                }
              }
              update_latLng(place.geometry.location);
            }
          }
        );
        google.maps.event.addDomListener(
          this,
          "keydown",
          function(event) {
            if (event.keyCode === 13 && $(".pac-container:visible").length) {
              event.preventDefault();
            }
          }
        );
      });
    };
    window.rtcl_render_map = function(htmlElement) {
      const $element = $(htmlElement), $markers = $element.find(".marker"), map_center_point = new google.maps.LatLng(
        rtcl_map.center.lat || 0,
        rtcl_map.center.lng || 0
      ), options = Object.assign(
        {},
        {
          zoom: rtcl_map.zoom.default,
          center: map_center_point,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          zoomControl: true,
          scrollwheel: false
        },
        $element.data("options") || {}
      ), args = {
        zoom: parseInt(options.zoom) || 16,
        center: options.center,
        mapTypeId: options.mapTypeId,
        zoomControl: options.zoomControl,
        scrollwheel: options.scrollwheel
      }, map = new google.maps.Map(htmlElement, args);
      map.markers = [];
      map.type = $element.data("type");
      if (map.type === "input") {
        globalMap = map;
      }
      $markers.each(function() {
        const $marker = $(this), latitude = $marker.data("latitude") || map_center_point.lat(), longitude = $marker.data("longitude") || map_center_point.lng(), address = $marker.data("latitude") && $marker.data("longitude") ? "" : $marker.data("address"), position = new google.maps.LatLng(latitude, longitude);
        const marker = new google.maps.Marker({
          map,
          position,
          draggable: map.type === "input"
        });
        if (options.icon) {
          marker.setIcon(options.icon);
        }
        map.setCenter(position);
        const infoWindow = new google.maps.InfoWindow({
          content: $marker.html()
        });
        google.maps.event.addListener(marker, "click", function() {
          infoWindow.open(map, marker);
        });
        marker.iw = infoWindow;
        map.markers.push(marker);
        if (address) {
          geoCoder.geocode(
            { address },
            function(results, status) {
              if (status === google.maps.GeocoderStatus.OK) {
                const place = results[0];
                marker.setPosition(place.geometry.location);
                map.setCenter(place.geometry.location);
                update_latLng(place.geometry.location);
                $(document).trigger("rtcl_map_retrieve_geocode", [{
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                  address: place.formatted_address
                }]);
              }
            }
          );
        }
        if (map.type === "input") {
          google.maps.event.addListener(
            marker,
            "dragend",
            function(event) {
              const point = marker.getPosition();
              map.setCenter(point);
              map.setZoom(rtcl_map.zoom.search || 17);
              update_latLng(point);
              const geo_address_input = $(
                "input.rtcl_geo_address_input"
              );
              if (geo_address_input.length) {
                geoCoder.geocode(
                  { latLng: point },
                  function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK && results[0]) {
                      geo_address_input.val(
                        results[0].formatted_address
                      );
                      marker.iw.setContent(
                        results[0].formatted_address
                      );
                    }
                  }
                );
                const field_wrap = geo_address_input.parent();
                field_wrap.find("input.latitude").val(point.lat());
                field_wrap.find("input.longitude").val(point.lng());
              }
            }
          );
          if (rtcl_map.location === "local") {
            re_render_map_by_address_change(map);
            $(".rtcl-map-field").on("blur change keyup", function() {
              re_render_map_by_address_change(map);
            });
          }
        }
      });
    };
    function re_render_map_by_address_change(map) {
      const address = getGeneratedAddress();
      geoCoder.geocode({ address }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          const point = results[0].geometry.location, marker = map.markers[0];
          marker.setPosition(point);
          map.setCenter(point);
          map.setZoom(rtcl_map.zoom.search || 17);
          update_latLng(point);
        }
      });
    }
    function update_latLng(point) {
      $("#rtcl-latitude").val(point.lat());
      $("#rtcl-longitude").val(point.lng());
    }
    window.rtcl_render_map_view = function() {
      const map_view = $(".rtcl-map-view");
      if (map_view.length) {
        map_view.each(function() {
          render_map_view(this);
        });
      }
    };
    const applyFillMinZoom = function(map, el) {
      const h = el.clientHeight || 0;
      if (h <= 0) {
        return;
      }
      const fillZoom = Math.ceil(Math.log2(h / 256));
      if (isFinite(fillZoom) && fillZoom > 0) {
        map.setOptions({ minZoom: fillZoom });
      }
    };
    const haversineKm = function(a, b) {
      const R = 6371;
      const toRad = (d) => d * Math.PI / 180;
      const dLat = toRad(b.lat - a.lat);
      const dLng = toRad(b.lng - a.lng);
      const h = __pow(Math.sin(dLat / 2), 2) + __pow(Math.sin(dLng / 2), 2) * Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat));
      return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
    };
    const getDensestNeighborhood = function(points, radiusKm) {
      let best = null;
      let bestCount = -1;
      points.forEach((p) => {
        const neighbors = points.filter((q) => haversineKm(p, q) <= radiusKm);
        if (neighbors.length > bestCount) {
          bestCount = neighbors.length;
          best = { center: p, points: neighbors };
        }
      });
      return best;
    };
    const render_map_view = function(htmlElement) {
      const $view = $(htmlElement);
      const mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: ""
      };
      let mapInstance = $view.data("gmapInstance");
      let prevMarkers = $view.data("gmapMarkers") || [];
      let prevCluster = $view.data("gmapCluster");
      if (!mapInstance) {
        mapInstance = new google.maps.Map(htmlElement, mapOptions);
        $view.data("gmapInstance", mapInstance);
      } else {
        prevMarkers.forEach((m) => m.setMap(null));
        if (prevCluster) prevCluster.clearMarkers();
        const prevIdle = $view.data("rtclIdleListener");
        if (prevIdle) {
          google.maps.event.removeListener(prevIdle);
        }
      }
      const newMarkers = [];
      const markersById = {};
      const bounds = new google.maps.LatLngBounds();
      const infoBox = new InfoBox({
        enableEventPropagation: true,
        maxWidth: 350,
        infoBoxClearance: new google.maps.Size(50, 50),
        alignBottom: true,
        pixelOffset: new google.maps.Size(-47, -75)
      }), addedIDs = [], mapType = $view.data("map-type") || "";
      let itemData = $view.data("map-data") || [];
      if (mapType === "search") {
        itemData = getListingMapData();
      }
      if (itemData && itemData.length) {
        $.each(itemData, function(index, _item) {
          const item = Object.assign(
            { id: 0, latitude: 0, longitude: 0, icon: "", content: "" },
            _item
          );
          if (!item.latitude || !item.longitude) {
            return;
          }
          const pos = new google.maps.LatLng(
            item.latitude,
            item.longitude
          );
          if (addedIDs.indexOf(item.id) === -1) {
            addedIDs.push(item.id);
            bounds.extend(pos);
            const marker = new google.maps.Marker({
              position: pos,
              icon: item.icon,
              map: mapInstance
            });
            marker.content = item.content;
            marker.rtclBaseIcon = item.icon;
            marker.rtclListingId = item.id;
            marker.addListener("click", function() {
              infoBox.close();
              infoBox.setContent(marker.content);
              infoBox.setOptions({
                pixelOffset: new google.maps.Size(-47, -75)
              });
              infoBox.open(mapInstance, marker);
              focusListingCard(marker.rtclListingId);
            });
            newMarkers.push(marker);
            markersById[item.id] = marker;
          }
        });
      }
      const defCenter = rtcl_map.center || {};
      const defLat = Number(defCenter.lat) || 0;
      const defLng = Number(defCenter.lng) || 0;
      if (!newMarkers.length && (defLat || defLng)) {
        new google.maps.Marker({
          position: new google.maps.LatLng(defLat, defLng),
          map: mapInstance
        });
      }
      const markerCluster = newMarkers.length ? new MarkerClusterer({ map: mapInstance, markers: newMarkers }) : null;
      if (markerCluster) markerCluster.addListener("click", (cluster) => {
        infoBox.close();
        const markers = cluster.markers;
        let samePosition = true;
        let pos;
        for (let i = 0; i < markers.length; i++) {
          if (!pos) {
            pos = markers[i].position;
          } else if (!pos.equals(markers[i].position)) {
            samePosition = false;
          }
        }
        if (samePosition) {
          let content = '<ul class="list-unstyled info-box-markers-list">';
          markers.forEach((marker) => {
            content += `<li>${marker.content}</li>`;
          });
          content += "</ul>";
          infoBox.setContent(content);
          infoBox.setOptions({ pixelOffset: new google.maps.Size(-45, -50) });
          infoBox.open(mapInstance, markers[markers.length - 1]);
          setTimeout(() => {
            $(".info-box-markers-list").scrollbar();
          }, 50);
        } else {
          const bounds2 = new google.maps.LatLngBounds();
          markers.forEach((marker) => bounds2.extend(marker.position));
          mapInstance.fitBounds(bounds2);
        }
      });
      const padding = { top: 30, right: 30, bottom: 30, left: 30 };
      const centerPosition = rtcl_map.cluster_options.map_center_position;
      const points = newMarkers.map((m) => ({
        lat: m.getPosition().lat(),
        lng: m.getPosition().lng()
      }));
      const frameMap = function() {
        if (!newMarkers.length) {
          const zoom = rtcl_map.zoom && rtcl_map.zoom.default || 12;
          if (defLat || defLng) {
            mapInstance.setCenter(new google.maps.LatLng(defLat, defLng));
            mapInstance.setZoom(zoom);
          } else {
            mapInstance.setCenter(new google.maps.LatLng(20, 0));
            mapInstance.setZoom(2);
          }
          return;
        }
        if ("densest" === centerPosition) {
          const dense = getDensestNeighborhood(points, 800);
          if (dense && dense.points.length > 1) {
            const db = new google.maps.LatLngBounds();
            dense.points.forEach((p) => db.extend(new google.maps.LatLng(p.lat, p.lng)));
            mapInstance.fitBounds(db, padding);
            return;
          }
        }
        if (newMarkers.length === 1) {
          mapInstance.setCenter(newMarkers[0].getPosition());
          mapInstance.setZoom(rtcl_map.zoom.default || 14);
        } else if (newMarkers.length > 1) {
          mapInstance.fitBounds(bounds, padding);
        }
      };
      const settleAndFrame = function() {
        google.maps.event.trigger(mapInstance, "resize");
        applyFillMinZoom(mapInstance, htmlElement);
        frameMap();
      };
      const prevTimer = $view.data("rtclFrameTimer");
      if (prevTimer) {
        clearTimeout(prevTimer);
      }
      settleAndFrame();
      $view.data("rtclIdleListener", google.maps.event.addListenerOnce(mapInstance, "idle", settleAndFrame));
      $view.data("rtclFrameTimer", setTimeout(settleAndFrame, 300));
      $view.data("gmapMarkers", newMarkers);
      $view.data("gmapCluster", markerCluster);
      $view.data("rtclMarkersById", markersById);
      mapInstance.rtclMarkersById = markersById;
    };
  })(jQuery);
})();
