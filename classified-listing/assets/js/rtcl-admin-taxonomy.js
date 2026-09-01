(function() {
  "use strict";
  (function($) {
    $(".rtcl-categories-upload-image").on("click", function(e) {
      e.preventDefault();
      const _this = $(this), wrapper = _this.parents(".rtcl-term-group-wrap");
      let file_frame, json;
      if (void 0 !== file_frame) {
        file_frame.open();
        return;
      }
      file_frame = wp.media.frames.file_frame = wp.media({
        frame: "post",
        state: "insert",
        multiple: false
      });
      file_frame.on("insert", function() {
        json = file_frame.state().get("selection").first().toJSON();
        if (!json.url) {
          return;
        }
        const imgUrl = json.sizes && json.sizes.thumbnail ? json.sizes.thumbnail.url : json.url;
        wrapper.find(".rtcl-category-image-id").val(json.id);
        wrapper.find(".rtcl-categories-image-wrapper").html('<img src="' + imgUrl + '" alt="" />');
      });
      file_frame.open();
    });
    $(".rtcl-categories-remove-image").on("click", function(e) {
      e.preventDefault();
      if (confirm("Are you sure to delete?")) {
        const _this = $(this), wrapper = _this.parents(".rtcl-term-group-wrap");
        wrapper.find(".rtcl-category-image-id").val("");
        wrapper.find(".rtcl-categories-image-wrapper").html("");
      }
    });
    $(document).ajaxComplete(function(event, xhr, settings) {
      if ($("#tag-rtcl-order").length) {
        const queryStringArr = settings.data ? settings.data.split("&") : "";
        if ($.inArray("action=add-tag", queryStringArr) !== -1) {
          const xml = xhr.responseXML;
          const response = $(xml).find("term_id").text();
          if (response !== "") {
            $("#tag-rtcl-order").val(0);
            $(".rtcl-category-image-id").val("");
            $("#rtcl-category-types input:checkbox").attr("checked", false);
            $("#rtcl-category-types input:checkbox[value=sell]").attr("checked", true);
            $(".rtcl-categories-image-wrapper").html("");
            $("#tag-rtcl-icon").prop("selectedIndex", 0);
          }
        }
      }
    });
    $(function() {
      if ($.fn.select2) {
        let iformat2 = function(icon) {
          console.log(icon);
          const originalOption = icon.element;
          if (icon.text.includes("fa-")) {
            return '<i class="' + $(originalOption).data("icon") + '"></i> ' + icon.text;
          } else {
            return '<i class="rtcl-icon rtcl-icon-' + $(originalOption).data("icon") + '"></i> ' + icon.text;
          }
        };
        $(".rtcl-select2").select2({
          dropdownAutoWidth: true,
          width: "100%"
        });
        $(".rtcl-select2-icon").select2({
          dropdownAutoWidth: true,
          width: "100%",
          templateSelection: iformat2,
          templateResult: iformat2,
          escapeMarkup: function(text) {
            return text;
          }
        });
      }
    });
  })(jQuery);
})();
