(function() {
  "use strict";
  (function($) {
    const RtFieldDependency = function(el) {
      this.el = el;
      this.$el = $(el);
      this.fields = {};
      this.conditions = this.$el.data("rt-depends") || [];
      this.init();
    };
    RtFieldDependency.prototype = {
      init: function() {
        const fd = this;
        if (fd.conditions.length) {
          fd.$el.addClass("has-rt-dependent");
          fd.loadEvent();
        }
      },
      loadEvent: function() {
        const fd = this;
        fd.conditions.map((rules) => {
          rules.map((rule) => {
            const context = '[data-id="_field_' + rule.field + '"]';
            $(document.body).on("input change", context + " input, " + context + " select", function(e) {
              fd.runValidation.apply(fd, [e, rule.field]);
            });
            $(context).find("input,select").each(function() {
              const el = this;
              fd.runValidation({ target: el }, rule.field);
            });
          });
        });
      },
      runValidation: function(e, field_id) {
        const fd = this;
        const el = e.target;
        const type = this.getField_type(el);
        let current_value = el.value;
        if (fd.fields[field_id] === void 0) {
          if ("checkbox" === type) {
            current_value = el.checked ? [current_value] : "";
          }
          fd.fields[field_id] = {
            type,
            value: current_value
          };
        } else {
          if ("checkbox" === type) {
            const itemIndex = fd.fields[field_id].value.indexOf(current_value);
            if (el.checked) {
              if (itemIndex === -1) {
                fd.fields[field_id].value.push(current_value);
              }
            } else {
              if (itemIndex > -1) {
                fd.fields[field_id].value.splice(itemIndex, 1);
              }
            }
          } else if ("radio" === type) {
            fd.fields[field_id].value = $(document).find("input[type='radio'][name='" + el.getAttribute("name") + "']:checked").val();
          } else {
            fd.fields[field_id].value = current_value;
          }
        }
        setTimeout(() => {
          fd.userRule.apply(fd, arguments);
        }, 10);
      },
      userRule() {
        const fd = this;
        const con = [];
        fd.conditions.map((rules) => {
          const conInner = [];
          rules.map((rule) => {
            conInner.push(fd.validated(rule));
          });
          con.push(conInner);
        });
        if (con.map((item) => !item.includes(false)).includes(true)) {
          if (fd.$el.hasClass("row")) {
            fd.$el.css({ display: "flex" });
          } else {
            fd.$el.show();
          }
          fd.$el.removeClass("rt-dependent-error");
          fd.$el.addClass("rt-dependent-valid");
        } else {
          fd.$el.removeClass("rt-dependent-valid");
          fd.$el.addClass("rt-dependent-error");
          fd.$el.find('input[type="checkbox"],input[type="radio"]').prop("checked", false);
          fd.$el.find('select, input[type="text"], input[type="number"], input[type="url"]').val("").trigger("change");
          fd.$el.hide();
        }
      },
      validated(rule) {
        const fd = this;
        let isValid = 0;
        rule.field;
        const operator = rule.operator;
        if (fd.fields[rule.field] !== void 0) {
          const field = fd.fields[rule.field];
          if (operator === "==empty") {
            isValid = Array.isArray(field.value) ? !field.value.length : !field.value;
          } else if (operator === "!=empty") {
            isValid = Array.isArray(field.value) ? !!field.value.length : !!field.value;
          } else if (operator === "==") {
            if ($.isNumeric(rule.value)) {
              return fd.isEqualToNumber(rule.value, field.value);
            } else {
              return fd.isEqualTo(rule.value, field.value);
            }
          } else if (operator === "!=") {
            if ($.isNumeric(rule.value)) {
              return !fd.isEqualToNumber(rule.value, field.value);
            } else {
              return !fd.isEqualTo(rule.value, field.value);
            }
          } else if (operator === "==pattern") {
            return fd.matchesPattern(field.value, rule.value);
          } else if (operator === "==contains") {
            return fd.containsString(field.value, rule.value);
          }
        }
        isValid = isValid === 0 || isValid === 1 ? !!isValid : isValid;
        return isValid;
      },
      getField_type(el) {
        let type = "";
        const tagName = el.tagName;
        if (el) {
          if (tagName === "INPUT") {
            type = el.type;
          } else if (tagName === "SELECT") {
            type = "select";
          }
        }
        return type;
      },
      parseString: function(val) {
        return val ? "" + val : "";
      },
      isEqualTo: function(v1, v2) {
        return this.parseString(v1).toLowerCase() === this.parseString(v2).toLowerCase();
      },
      isEqualToNumber: function(v1, v2) {
        return parseFloat(v1) === parseFloat(v2);
      },
      inArray: function(v1, array) {
        const fd = this;
        array = array.map(function(v2) {
          return fd.parseString(v2);
        });
        return array.indexOf(v1) > -1;
      },
      containsString: function(haystack, needle) {
        return this.parseString(haystack).indexOf(this.parseString(needle)) > -1;
      },
      matchesPattern: function(v1, pattern) {
        const regexp = new RegExp(this.parseString(pattern), "gi");
        return this.parseString(v1).match(regexp);
      }
    };
    window.rtclRenderCFfConditions = function() {
      $(document).find(".rtcl-cf-wrap[data-rt-depends]").each(function() {
        new RtFieldDependency(this);
      });
    };
    rtclRenderCFfConditions();
    $.fn.rtFieldDependency = function(options) {
      this._targets = $(this);
      this._settings = $.extend({
        "attribute": "rt-depends",
        "rules": {}
      }, options);
      const that = this;
      const arrayInArraysHelper = function arrayInArraysHelper2(needleArray, haystackArray, strict) {
        if (typeof strict == "undefined") {
          strict = false;
        }
        if (needleArray == null) {
          needleArray = [];
        }
        if (strict == true) {
          return needleArray.sort().join(",").toLowerCase() == haystackArray.sort().join(",").toLowerCase();
        } else {
          for (var i = 0; i < needleArray.length; i++) {
            if (haystackArray.indexOf(needleArray[i]) >= 0) {
              return true;
            }
          }
          return false;
        }
      };
      const stringInArraysHelper = function stringInArraysHelper2(needleString, haystackArray) {
        return $.inArray(needleString, haystackArray) >= 0 && $.isArray(haystackArray);
      };
      const isEmpty = function isEmpty2(value2) {
        if (typeof value2 == "null" || typeof value2 == "undefined") {
          return true;
        }
        if (typeof value2 == "string") {
          return $.trim(value2) === "";
        }
        if ((typeof value2 === "undefined" ? "undefined" : typeof value2) == "object") {
          if ($.isArray(value2)) {
            let _tmp = $.map(value2, function(val, i) {
              return $.trim(val) === "" ? null : val;
            });
            return $.isEmptyObject(_tmp);
          } else {
            return $.isEmptyObject(value2);
          }
        }
        return false;
      };
      this.typeRegExpDependency = function(selector, depObject) {
        if (typeof useEvent == "undefined") {
          useEvent = false;
        }
        if (typeof $(parent).prop("tagName") == "undefined") {
          return false;
        }
        var tag = $(parent).prop("tagName").toLowerCase();
        var type = $(parent).prop("type").toLowerCase();
        var name = tag + ":" + type;
        var value2 = $.trim($(parent).val());
        switch (name) {
          case "input:text":
          case "input:password":
          case "input:number":
          case "input:date":
          case "input:email":
          case "input:url":
          case "input:tel":
          case "textarea:textarea":
            var modifier = typeof depObject.modifier == "undefined" ? "" : depObject.modifier;
            var pattern = new RegExp(depObject.pattern, modifier);
            if (pattern.test(value2)) {
              $(element).show();
            } else {
              $(element).hide();
            }
            break;
        }
        if (useEvent) {
          $(document.body).on("input", $(parent), function(e) {
            typeRegExpDependency(element, depObject, parent, false);
          });
        }
      };
      this.typeEmptyDependency = function(selector, depObject) {
        if (typeof $(selector).prop("tagName") == "undefined") {
          return false;
        }
        let trigger = false;
        let tag = $(selector).prop("tagName").toLowerCase();
        let type = $(selector).prop("type").toLowerCase();
        let name = tag + ":" + type;
        let value2 = $(selector).val();
        switch (name) {
          case "input:text":
          case "input:password":
          case "input:number":
          case "input:date":
          case "input:email":
          case "input:url":
          case "input:tel":
          case "textarea:textarea":
          case "select:select-one":
            if ($.trim(value2) === "") {
              trigger = true;
            }
            break;
          case "input:checkbox":
            if (!$(selector).is(":checked") && $.trim(value2) === "") {
              trigger = true;
            }
            break;
          case "select:select-multiple":
            if (isEmpty(value2)) {
              trigger = true;
            }
            break;
        }
        return trigger;
      };
      this.typeNotEmptyDependency = function(selector, depObject) {
        if (typeof $(parent).prop("tagName") == "undefined") {
          return false;
        }
        let trigger = false;
        let tag = $(parent).prop("tagName").toLowerCase();
        let type = $(parent).prop("type").toLowerCase();
        let name = tag + ":" + type;
        let value2 = $(parent).val();
        switch (name) {
          case "input:text":
          case "input:password":
          case "input:number":
          case "input:date":
          case "input:email":
          case "input:url":
          case "input:tel":
          case "textarea:textarea":
          case "select:select-one":
            if ($.trim(value2) != "") {
              trigger = true;
            }
            break;
          case "input:checkbox":
            if ($(parent).is(":checked") && $.trim(value2) != "") {
              trigger = true;
            }
            break;
          case "select:select-multiple":
            if (isEmpty(value2)) {
              trigger = true;
            }
            break;
        }
        return trigger;
      };
      this.typeEqualDependency = function(selector, depObject) {
        if (typeof $(selector).prop("tagName") == "undefined") {
          return false;
        }
        let trigger = false;
        let tag = $(selector).prop("tagName").toLowerCase();
        let type = $(selector).prop("type").toLowerCase();
        let name = tag + ":" + type;
        let val = $(selector).val();
        let equalLike = typeof depObject.like != "undefined";
        depObject.empty = typeof depObject.empty == "undefined" ? false : depObject.empty;
        depObject.strict = typeof depObject.strict == "undefined" ? false : depObject.strict;
        if (equalLike) {
          let eqtag = $(depObject.like).prop("tagName").toLowerCase();
          let eqtype = $(depObject.like).prop("type").toLowerCase();
          let eqname = eqtag + ":" + eqtype;
          if (eqname == "input:checkbox" || eqname == "input:radio") {
            depObject.value = $(depObject.like + ":checked").map(function() {
              return this.value;
            }).get();
          } else {
            depObject.value = $(depObject.like).val();
            if (!showOnEmptyValue) {
              depObject.value = $.trim($(depObject.like).val()) == "" ? null : $(depObject.like).val();
            }
          }
        }
        switch (name) {
          case "input:text":
          case "input:password":
          case "input:number":
          case "input:date":
          case "input:email":
          case "input:url":
          case "input:tel":
          case "textarea:textarea":
          case "select:select-one":
            if ($.trim(val) === depObject.value) {
              trigger = true;
            } else if (stringInArraysHelper(val, depObject.value)) {
              trigger = true;
            } else {
              if ($.trim(val) === "" && depObject.empty) {
                trigger = true;
              }
            }
            break;
          case "input:checkbox":
          case "input:radio":
            let valList = $(selector + ":checked").map(function() {
              return this.value;
            }).get();
            if (valList === depObject.value) {
              trigger = true;
            } else if (stringInArraysHelper(valList, depObject.value)) {
              trigger = true;
            } else if (arrayInArraysHelper(valList, depObject.value, depObject.strict)) {
              trigger = true;
            } else {
              if (isEmpty(valList) && depObject.empty) {
                trigger = true;
              }
            }
            break;
          case "select:select-multiple":
            if (arrayInArraysHelper(value, depObject.value, depObject.strict)) {
              trigger = true;
            } else {
              if (val == null && depObject.empty) {
                trigger = true;
              }
            }
            break;
        }
        return trigger;
      };
      this.typeNotEqualDependency = function(selector, depObject) {
        if (typeof $(selector).prop("tagName") == "undefined") {
          return false;
        }
        let trigger = false;
        let tag = $(selector).prop("tagName").toLowerCase();
        let type = $(selector).prop("type").toLowerCase();
        let name = tag + ":" + type;
        let value2 = $(selector).val();
        let equalLike = typeof depObject.like == "undefined" ? false : true;
        depObject.strict = typeof depObject.strict == "undefined" ? false : depObject.strict;
        depObject.empty = typeof depObject.empty == "undefined" ? true : depObject.empty;
        if (equalLike) {
          var eqtag = $(depObject.like).prop("tagName").toLowerCase();
          var eqtype = $(depObject.like).prop("type").toLowerCase();
          var eqname = eqtag + ":" + eqtype;
          if (eqname == "input:checkbox" || eqname == "input:radio") {
            depObject.value = $(depObject.like + ":checked").map(function() {
              return this.value;
            }).get();
          } else {
            depObject.value = $(depObject.like).val();
            if (!showOnEmptyValue) {
              depObject.value = $.trim($(depObject.like).val()) == "" ? null : $(depObject.like).val();
            }
          }
        }
        switch (name) {
          case "input:text":
          case "input:password":
          case "input:number":
          case "input:date":
          case "input:email":
          case "input:url":
          case "input:tel":
          case "textarea:textarea":
          case "select:select-one":
            if (value2 == depObject.value) {
              trigger = false;
            } else if (stringInArraysHelper(value2, depObject.value)) {
              trigger = false;
            } else {
              if ($.trim(value2) == "" && !depObject.empty) {
                trigger = false;
              } else {
                trigger = true;
              }
            }
            break;
          case "input:checkbox":
          case "input:radio":
            value2 = $(selector + ":checked").map(function() {
              return this.value;
            }).get();
            if (typeof depObject.strict == "undefined") {
              depObject.strict = false;
            }
            if (value2 == depObject.value) {
              trigger = false;
            } else if (stringInArraysHelper(value2, depObject.value)) {
              trigger = false;
            } else if (arrayInArraysHelper(value2, depObject.value, depObject.strict)) {
              trigger = false;
            } else {
              if (isEmpty(value2) && !depObject.empty) {
                trigger = false;
              } else {
                trigger = true;
              }
            }
            break;
          case "select:select-multiple":
            if (arrayInArraysHelper(value2, depObject.value, depObject.strict)) {
              trigger = false;
            } else {
              if (value2 == null && !depObject.empty) {
                trigger = false;
              } else {
                trigger = true;
              }
            }
            break;
        }
        return trigger;
      };
      this.typeCompareDependency = function(selector, depObject) {
        let trigger = false;
        if (typeof $(selector).prop("tagName") == "undefined") {
          return false;
        }
        $(selector).prop("tagName").toLowerCase();
        $(selector).prop("type").toLowerCase();
        let value2 = parseInt($(selector).val());
        depObject.value = parseInt(depObject.value);
        switch (depObject.sign) {
          case "<":
          case "lt":
          case "lessthen":
          case "less-then":
          case "LessThen":
            if (value2 < depObject.value) {
              trigger = true;
            }
            break;
          case "<=":
          case "lteq":
          case "lessthenequal":
          case "less-then-equal":
          case "LessThenEqual":
          case "eqlt":
            if (value2 <= depObject.value) {
              trigger = true;
            }
            break;
          case ">=":
          case "gteq":
          case "greaterthenequal":
          case "greater-then-equal":
          case "GreaterThenEqual":
          case "eqgt":
            if (value2 >= depObject.value) {
              trigger = true;
            }
            break;
          case ">":
          case "gt":
          case "greaterthen":
          case "greater-then":
          case "GreaterThen":
            if (value2 > depObject.value) {
              trigger = true;
            }
            break;
        }
        return trigger;
      };
      this.typeRangeDependency = function(selector, depObject) {
        if (typeof $(selector).prop("tagName") == "undefined") {
          return false;
        }
        let trigger = false;
        $(selector).prop("tagName").toLowerCase();
        $(selector).prop("type").toLowerCase();
        let value2 = parseInt($(selector).val());
        let min, max;
        if ($.isArray(depObject.value)) {
          min = parseInt(depObject.value[0]);
          max = parseInt(depObject.value[1]);
        }
        if (typeof depObject.value == "undefined") {
          min = parseInt(depObject.min);
          max = parseInt(depObject.max);
        }
        if (min < value2 && value2 < max) {
          trigger = true;
        }
        return trigger;
      };
      this.typeLengthDependency = function(selector, depObject) {
        if (typeof $(parent).prop("tagName") == "undefined") {
          return false;
        }
        let trigger = false;
        $(parent).prop("tagName").toLowerCase();
        $(parent).prop("type").toLowerCase();
        let value2 = $(parent).val().length;
        depObject.value = parseInt(depObject.value);
        switch (depObject.sign) {
          case "<":
          case "lt":
          case "lessthen":
          case "less-then":
          case "LessThen":
            if (value2 < depObject.value) {
              trigger = true;
            }
            break;
          case "<=":
          case "lteq":
          case "lessthenequal":
          case "less-then-equal":
          case "LessThenEqual":
          case "eqlt":
            if (value2 <= depObject.value) {
              trigger = true;
            }
            break;
          case ">=":
          case "gteq":
          case "greaterthenequal":
          case "greater-then-equal":
          case "GreaterThenEqual":
          case "eqgt":
            if (value2 >= depObject.value) {
              trigger = true;
            }
            break;
          case ">":
          case "gt":
          case "greaterthen":
          case "greater-then":
          case "GreaterThen":
            if (value2 > depObject.value) {
              trigger = true;
            }
            break;
        }
        return trigger;
      };
      this.useRuleType = function(target, data) {
        let trigger = false;
        const that2 = this;
        $.each(data.rules, function(selector, depObject) {
          switch (depObject.type) {
            case "empty":
              trigger = that2.typeEmptyDependency(selector, depObject);
              break;
            case "notempty":
            case "not-empty":
            case "notEmpty":
            case "!empty":
              trigger = that2.typeNotEmptyDependency(selector, depObject);
              break;
            case "equal":
            case "==":
            case "=":
              trigger = that2.typeEqualDependency(selector, depObject);
              break;
            case "!equal":
            case "notequal":
            case "!=":
            case "not-equal":
            case "notEqual":
              trigger = that2.typeNotEqualDependency(selector, depObject);
              break;
            case "regexp":
            case "expression":
            case "reg":
            case "exp":
              trigger = that2.typeRegExpDependency(selector, depObject);
              break;
            case "compare":
            case "comp":
              trigger = that2.typeCompareDependency(selector, depObject);
              break;
            case "length":
            case "lng":
              trigger = that2.typeLengthDependency(selector, depObject);
              break;
            case "range":
              trigger = that2.typeRangeDependency(selector, depObject);
              break;
          }
          if (data.relation.toLocaleLowerCase() === "and" && trigger === true) {
            return false;
          }
          if (data.relation.toLocaleLowerCase() === "or" && trigger === false) {
            return false;
          }
        });
        if (trigger) {
          $(target).show("slow");
        } else {
          $(target).hide("slow");
        }
      };
      return this._targets.each(function() {
        const target = $(this);
        const data = target.data(that._settings.attribute.replace("data-", "").trim());
        if (data) {
          target.addClass("has-dependent-data");
          const options2 = $.extend({
            "rules": {},
            "relation": "or"
          }, data);
          const optionsKeys = Object.keys(options2.rules);
          if (optionsKeys.length) {
            that.useRuleType(target, options2);
            $(document.body).on("input change", $(optionsKeys.join(",")), function(e) {
              that.useRuleType(target, options2);
            });
          }
        }
      });
    };
  })(jQuery);
})();
