(function() {
  "use strict";
  (function($) {
    function call_daterangepicker(element, type) {
      var _a, _b;
      if (type === "time") {
        const defaultOptions = {
          autoUpdateInput: false,
          singleDatePicker: true,
          timePicker: true,
          timePicker24Hour: /H|HH/.test(((_b = (_a = rtcl_business_hours.timePicker) == null ? void 0 : _a.locale) == null ? void 0 : _b.format) || "hh:mm A"),
          timePickerIncrement: 1
        };
        const name = element.name;
        let options;
        if (name && name.includes("[end]")) {
          let endOptions = {};
          if (rtcl_business_hours.timePickerEnd && Object.keys(rtcl_business_hours.timePickerEnd).length) {
            endOptions = Object.assign({}, rtcl_business_hours.timePicker, rtcl_business_hours.timePickerEnd || {});
          } else {
            endOptions = rtcl_business_hours.timePicker;
          }
          options = Object.assign({}, defaultOptions, endOptions || {});
        } else {
          options = Object.assign({}, defaultOptions, rtcl_business_hours.timePicker || {});
        }
        $(element).daterangepicker(options).on("show.daterangepicker", function(ev, picker) {
          picker.container.find(".calendar-table").hide();
        });
      } else {
        $(element).daterangepicker({
          autoUpdateInput: false,
          singleDatePicker: true,
          locale: rtcl_business_hours.datePicker
        });
      }
      $(element).on("apply.daterangepicker", function(ev, picker) {
        $(this).val(picker.startDate.format(picker.locale.format));
      }).on("cancel.daterangepicker", function(ev, picker) {
        $(this).val("");
      });
    }
    $(document).on("click", ".rtcl-bh .time-slot-action .rtcl-icon-plus", function(e) {
      e.preventDefault();
      const _self = $(this);
      const target = _self.closest(".time-slot");
      const wrapper = target.closest(".time-slots");
      const index = wrapper.find(".time-slot").length || 0;
      const clone = $(target).clone();
      $(clone).find("input[type='text']").each(function() {
        $(this).attr("name", $(this).attr("name").replace(/times\]\[([0-9]+)\]/i, "times][" + index + "]"));
        $(this).val("");
      });
      $(clone).find(".bhs-timepicker").each(function() {
        call_daterangepicker(this, "time");
      });
      _self.removeClass("rtcl-icon-plus").addClass("rtcl-icon-minus");
      $(target).after($(clone));
    }).on("click", ".rtcl-bh .time-slot-action .rtcl-icon-minus", function(e) {
      e.preventDefault();
      if (confirm(rtcl_business_hours.lang.confirm)) {
        const _self = $(this);
        const wrapper = _self.closest(".time-slots");
        _self.closest(".time-slot").remove();
        wrapper.find(".time-slot").each(function(index, item) {
          $(this).find("input[type='text']").each(function() {
            $(this).attr("name", $(this).attr("name").replace(/times\]\[([0-9]+)\]/i, "times][" + index + "]"));
          });
        });
      }
    }).on("click", ".rtcl-special-bh .item-actions .rtcl-icon-plus", function(e) {
      e.preventDefault();
      const _self = $(this);
      const target = _self.closest(".rtcl-special-bh");
      const wrapper = target.closest(".rtcl-special-bhs");
      const index = wrapper.find(".rtcl-special-bh").length || 0;
      const clone = $(target).clone();
      $(clone).find("input[type='text']").each(function() {
        $(this).attr("name", $(this).attr("name").replace(/_rtcl_special_bhs\[([0-9]+)\]/i, "_rtcl_special_bhs[" + index + "]"));
        $(this).val("");
      });
      $(clone).find("input[type='checkbox']").each(function() {
        const _self2 = $(this);
        const id = _self2.attr("id").replace(/-open-([0-9]+)/i, "-open-" + index);
        _self2.attr("id", id).prop("checked", false).prev(".form-check").find("label").attr("for", id);
      });
      $(clone).find(".time-slots .time-slot:not(:last-child)").remove();
      $(clone).find(".bhs-timepicker").each(function() {
        call_daterangepicker(this, "time");
      });
      $(clone).find(".bhs-datepicker").each(function() {
        call_daterangepicker(this);
      });
      _self.removeClass("rtcl-icon-plus").addClass("rtcl-icon-minus");
      $(target).after($(clone));
    }).on("click", ".rtcl-special-bh .item-actions .rtcl-icon-minus", function(e) {
      e.preventDefault();
      if (confirm(rtcl_business_hours.lang.confirm)) {
        const _self_btn = $(this);
        const wrapper = _self_btn.closest(".rtcl-special-bhs");
        _self_btn.closest(".rtcl-special-bh").remove();
        wrapper.find(".rtcl-special-bh").each(function(index, item) {
          const _item = $(this);
          _item.find("input[type='text']").each(function() {
            const iName = $(this).attr("name").replace(/_rtcl_special_bhs\[([0-9]+)\]/i, "_rtcl_special_bhs[" + index + "]");
            $(this).attr("name", iName);
          });
          _item.find("input[type='checkbox']").each(function() {
            const _self = $(this);
            const id = _self.attr("id").replace(/-open-([0-9]+)/i, "-open-" + index);
            const name = _self.attr("name").replace(/_rtcl_special_bhs\[([0-9]+)\]/i, "_rtcl_special_bhs[" + index + "]");
            _self.attr("id", id).attr("name", name).prop("checked", false).prev(".form-check").find("label").attr("for", id);
          });
        });
      }
    }).ready(function($2) {
      if ($2.fn.daterangepicker) {
        $2(".bhs-datepicker").each(function() {
          call_daterangepicker(this);
        });
        $2(".bhs-timepicker").each(function() {
          call_daterangepicker(this, "time");
        });
      }
    });
  })(jQuery);
})();
