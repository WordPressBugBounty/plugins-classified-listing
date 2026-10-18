(function() {
  "use strict";
  jQuery(function($) {
    if (typeof rtcl_country_select_params === "undefined") {
      return false;
    }
    if ($.fn.select2) {
      var getEnhancedSelectFormatString = function() {
        return {
          "language": {
            errorLoading: function() {
              return rtcl_country_select_params.i18n_searching;
            },
            inputTooLong: function(args) {
              var overChars = args.input.length - args.maximum;
              if (1 === overChars) {
                return rtcl_country_select_params.i18n_input_too_long_1;
              }
              return rtcl_country_select_params.i18n_input_too_long_n.replace("%qty%", overChars);
            },
            inputTooShort: function(args) {
              var remainingChars = args.minimum - args.input.length;
              if (1 === remainingChars) {
                return rtcl_country_select_params.i18n_input_too_short_1;
              }
              return rtcl_country_select_params.i18n_input_too_short_n.replace("%qty%", remainingChars);
            },
            loadingMore: function() {
              return rtcl_country_select_params.i18n_load_more;
            },
            maximumSelected: function(args) {
              if (args.maximum === 1) {
                return rtcl_country_select_params.i18n_selection_too_long_1;
              }
              return rtcl_country_select_params.i18n_selection_too_long_n.replace("%qty%", args.maximum);
            },
            noResults: function() {
              return rtcl_country_select_params.i18n_no_matches;
            },
            searching: function() {
              return rtcl_country_select_params.i18n_searching;
            }
          }
        };
      };
      var rtcl_country_select_select2 = function() {
        $("select.country_select:visible, select.state_select:visible").each(function() {
          var $this = $(this);
          var select2_args = $.extend({
            placeholder: $this.attr("data-placeholder") || $this.attr("placeholder") || "",
            label: $this.attr("data-label") || null,
            width: "100%"
          }, getEnhancedSelectFormatString());
          $(this).on("select2:select", function() {
            $(this).trigger("focus");
          }).select2(select2_args);
        });
      };
      rtcl_country_select_select2();
      $(document.body).on("country_to_state_changed rtcl_checkout_form_opened", function() {
        rtcl_country_select_select2();
      });
    }
    var states_json = rtcl_country_select_params.countries.replace(/&quot;/g, '"'), states = JSON.parse(states_json), wrapper_selectors = "#rtcl-billing-fields";
    $(document.body).on("change refresh", "select.country_to_state, input.country_to_state", function() {
      var $wrapper = $(this).closest(wrapper_selectors);
      if (!$wrapper.length) {
        $wrapper = $(this).closest(".rtcl-form-row").parent();
      }
      var country = $(this).val(), $statebox = $wrapper.find("#billing_state"), $parent = $statebox.closest(".rtcl-form-row"), input_name = $statebox.attr("name"), input_id = $statebox.attr("id"), input_classes = $statebox.attr("data-input-classes"), value = $statebox.val(), placeholder = $statebox.attr("placeholder") || $statebox.attr("data-placeholder") || "", $newstate;
      if (states[country]) {
        if ($.isEmptyObject(states[country])) {
          $newstate = $('<input type="hidden" />').prop("id", input_id).prop("name", input_name).prop("placeholder", placeholder).attr("data-input-classes", input_classes).addClass("hidden " + input_classes);
          $parent.hide().find(".select2-container").remove();
          $statebox.replaceWith($newstate);
          $(document.body).trigger("country_to_state_changed", [country, $wrapper]);
        } else {
          var state = states[country], $defaultOption = $('<option value=""></option>').text(rtcl_country_select_params.i18n_select_state_text);
          if (!placeholder) {
            placeholder = rtcl_country_select_params.i18n_select_state_text;
          }
          $parent.show();
          if ($statebox.is("input")) {
            $newstate = $("<select></select>").prop("id", input_id).prop("name", input_name).data("placeholder", placeholder).attr("data-input-classes", input_classes).addClass("state_select " + input_classes);
            $statebox.replaceWith($newstate);
            $statebox = $wrapper.find("#billing_state");
          }
          $statebox.empty().append($defaultOption);
          $.each(state, function(index) {
            const $option = $("<option></option>").prop("value", index).text(state[index]);
            $statebox.append($option);
          });
          $statebox.val(value).trigger("change");
          $(document.body).trigger("country_to_state_changed", [country, $wrapper]);
        }
      } else {
        if ($statebox.is('select, input[type="hidden"]')) {
          $newstate = $('<input type="text" />').prop("id", input_id).prop("name", input_name).prop("placeholder", placeholder).attr("data-input-classes", input_classes).addClass("input-text  " + input_classes);
          $parent.show().find(".select2-container").remove();
          $statebox.replaceWith($newstate);
          $(document.body).trigger("country_to_state_changed", [country, $wrapper]);
        }
      }
      $(document.body).trigger("country_to_state_changing", [country, $wrapper]);
    });
    $(document.body).on("rtcl_address_i18n_ready", function() {
      $(wrapper_selectors).each(function() {
        const $country_input = $(this).find("#billing_country, #shipping_country, #calc_shipping_country");
        if (0 === $country_input.length || 0 === $country_input.val().length) {
          return;
        }
        $country_input.trigger("refresh");
      });
    });
  });
})();
