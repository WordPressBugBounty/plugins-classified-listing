(function() {
  "use strict";
  (function($) {
    window.rtclCheckPasswordStrength = function(password) {
      let strength = 0;
      let missing = [];
      var minLen = parseInt(rtcl_validator.pw_min_length, 10) || 8;
      var hints = rtcl_validator.pwsL10n || {};
      if (password.length >= minLen) strength += 1;
      else missing.push(hints.hint_min_length || minLen + "+ characters");
      if (password.match(/[A-Z]/)) strength += 1;
      else missing.push(hints.hint_uppercase || "uppercase");
      if (password.match(/[a-z]/)) strength += 1;
      else missing.push(hints.hint_lowercase || "lowercase");
      if (password.match(/[0-9]/)) strength += 1;
      else missing.push(hints.hint_digit || "digit");
      if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
      else missing.push(hints.hint_special || "special character");
      return { strength, missing };
    };
    if ($.fn.validate) {
      let stripHtml2 = function(value) {
        return value.replace(/<.[^<>]*?>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/[.(),;:!?%#$'\"_+=\/\-“”’]*/g, "");
      };
      $.validator.setDefaults({
        rules: { seltype: "required" },
        errorElement: "div",
        errorClass: "with-errors",
        errorPlacement: function(error, element) {
          error.addClass("help-block").removeClass("error");
          if (element.prop("type") === "checkbox" || element.prop("type") === "radio") {
            var $group = element.closest(".rtcl-check-list, .rtcl-form-radio-group");
            if ($group.length) {
              error.insertAfter($group);
            } else {
              error.insertAfter(element.parent());
            }
          } else {
            error.insertAfter(element);
          }
        },
        highlight: function(element, errorClass, validClass) {
          $(element).parents(".form-group, .rtcl-form-group").addClass("has-error has-danger").removeClass("has-success");
        },
        unhighlight: function(element, errorClass, validClass) {
          $(element).parents(".form-group, .rtcl-form-group").addClass("has-success").removeClass("has-error has-danger");
        },
        invalidHandler: function(form, validator) {
          if (!validator.numberOfInvalids())
            return;
          $("html, body").animate({
            scrollTop: $(validator.errorList[0].element).offset().top - rtcl_validator.scroll_top || 200
          }, 800);
        }
      });
      $.validator.messages = rtcl_validator.messages;
      $.validator.addMethod(
        "extension",
        function(value, element, param) {
          param = typeof param === "string" ? param.replace(/,/g, "|") : "json";
          return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
        },
        rtcl_validator.messages.extension
      );
      $.validator.addClassRules("rtcl-import-file", {
        required: true,
        extension: "json"
      });
      $.validator.addMethod("rtcl-password", function(value, element) {
        if (this.optional(element)) return true;
        var result = rtclCheckPasswordStrength(value);
        return result.strength >= 5;
      }, rtcl_validator.messages.password);
      $.validator.addMethod("pattern", function(value, element, param) {
        if (this.optional(element)) {
          return true;
        }
        if (typeof param === "string") {
          param = new RegExp("^(?:" + param + ")$");
        }
        return param.test(value);
      });
      $.validator.addMethod("maxWords", function(value, element, params) {
        return this.optional(element) || stripHtml2(value).match(/\b\w+\b/g).length <= params;
      });
      $.validator.addMethod("minWords", function(value, element, params) {
        return this.optional(element) || stripHtml2(value).match(/\b\w+\b/g).length >= params;
      });
      $.validator.addMethod("rangeWords", function(value, element, params) {
        var valueStripped = stripHtml2(value), regex = /\b\w+\b/g;
        return this.optional(element) || valueStripped.match(regex).length >= params[0] && valueStripped.match(regex).length <= params[1];
      });
      $.validator.addMethod("alphanumeric", function(value, element) {
        return this.optional(element) || /^\w+$/i.test(value);
      });
      $.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[a-zA-Z\s]+$/i.test(value);
      });
      $.validator.addMethod("accept", function(value, element, param) {
        var typeParam = typeof param === "string" ? param.replace(/\s/g, "") : "image/*", optionalValue = this.optional(element), i, file, regex;
        if (optionalValue) {
          return optionalValue;
        }
        if ($(element).attr("type") === "file") {
          typeParam = typeParam.replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, "\\$&").replace(/,/g, "|").replace(/\/\*/g, "/.*");
          if (element.files && element.files.length) {
            regex = new RegExp(".?(" + typeParam + ")$", "i");
            for (i = 0; i < element.files.length; i++) {
              file = element.files[i];
              if (!file.type.match(regex)) {
                return false;
              }
            }
          }
        }
        return true;
      });
      $.validator.addMethod(
        "greaterThan",
        function(value, max, min) {
          return parseInt(value) > parseInt($(min).val());
        }
      );
    }
  })(jQuery);
})();
