(function() {
  "use strict";
  (function($) {
    $(document).on("click", ".listing-type .action span.edit", function() {
      var li = $(this).parents("li");
      li.find(".edit-action").slideToggle();
    });
    $("#input-new-type-form").on("submit", function(e) {
      e.preventDefault();
      var self = $(this), form = $(self), button = $("#rtcl-add-btn", form), type_field = $("#add-input-type", form), type = type_field.val();
      $("#_rt_rtcl_disable_price", form).val();
      const fromData = new FormData(this);
      fromData.append("action", "rtcl_ajax_add_listing_type");
      fromData.append(rtcl.nonceId, rtcl.nonce);
      form.find(".alert").remove();
      if (type) {
        $.ajax({
          url: rtcl.ajaxurl,
          cache: false,
          processData: false,
          contentType: false,
          data: fromData,
          dataType: "json",
          type: "POST",
          beforeSend: function() {
            button.addClass("spinner rtcl-loading").prop("disabled", true);
            $("#rtcl-listing-type-wrap").find(".rtcl-message").remove();
          },
          success: function(res) {
            if (res.success) {
              type_field.val("");
              renderType(res.data.data);
            }
            var alert_type = res.success ? "alert-success" : "alert-danger", alert2 = $('<div class="col-12 alert alert-dismissible fade show" role="alert" />').append(res.success ? res.data.message : res.data);
            alert2.addClass(alert_type);
            form.append(alert2);
            button.removeClass("spinner rtcl-loading").prop("disabled", false);
          },
          error: function(e2) {
            $('<div class="col-12 alert alert-danger alert-dismissible fade show" role="alert" />').append("Server Error !!!").appendTo(form);
            button.removeClass("spinner rtcl-loading").prop("disabled", false);
          }
        });
      } else {
        $('<div class="alert alert-danger alert-dismissible fade show" role="alert" />').append("Please fill type.").appendTo(form);
        type_field.focus();
      }
    });
    $(document).on("submit", ".input-update-type-form", function(e) {
      e.preventDefault();
      var form = $(this), wrap = form.closest("li"), old_id = wrap.data("id") || "", info_id = $(".type-info-id", wrap), info_name = $(".type-info-name", wrap), button = form.find("button[type=submit]"), input_id = form.find("input[name=id]"), id = input_id.val() || "", input_name = form.find("input[name=name]"), name = input_name.val() || "";
      const fromData = new FormData(this);
      fromData.append("action", "rtcl_ajax_update_listing_type");
      fromData.append("old_id", old_id);
      fromData.append(rtcl.nonceId, rtcl.nonce);
      form.find(".alert").remove();
      if (id && name && old_id) {
        $.ajax({
          url: rtcl.ajaxurl,
          cache: false,
          processData: false,
          contentType: false,
          data: fromData,
          dataType: "json",
          type: "POST",
          beforeSend: function() {
            button.addClass("spinner rtcl-loading").prop("disabled", true);
            form.find(".alert").remove();
            $("#rtcl-listing-type-wrap").find(".rtcl-message").remove();
          },
          success: function(res) {
            if (res.success) {
              input_id.val(res.data.data.id);
              input_name.val(res.data.data.name);
              info_id.text(res.data.data.id);
              info_name.text(res.data.data.name);
              wrap.data("id", res.data.data.id);
            }
            button.removeClass("spinner rtcl-loading").prop("disabled", false);
            var alert_type = res.success ? "alert-success" : "alert-danger", alert2 = $('<div class="col-12 alert alert-dismissible fade show" role="alert" />').append(res.success ? res.data.message : res.data);
            alert2.addClass(alert_type);
            form.append(alert2);
          },
          error: function(e2) {
            $('<div class="col-12 alert alert-danger alert-dismissible fade show" role="alert" />').append("Server Error !!!").appendTo(form);
            button.removeClass("spinner rtcl-loading").prop("disabled", false);
          }
        });
      } else {
        $('<div class="col-12 alert alert-danger alert-dismissible fade show" role="alert" />').append("Please fill id and type.").appendTo(form);
      }
    });
    $(document).on("click", ".listing-type .action span.delete:not(.disabled)", function() {
      if (confirm("Are you sure to delete this type?")) {
        var self = $(this), li = self.parents("li.listing-type"), id = li.data("id");
        if (id) {
          var data = {
            action: "rtcl_ajax_delete_listing_type",
            id
          };
          data[rtcl.nonceId] = rtcl.nonce;
          $.ajax({
            url: rtcl.ajaxurl,
            data,
            type: "POST",
            beforeSend: function() {
              self.addClass("spinner rtcl-loading disabled").prop("disabled", false);
            },
            success: function(res) {
              if (res.success) {
                li.slideUp("slow", function() {
                  $(this).remove();
                });
              } else {
                self.removeClass("spinner rtcl-loading disabled").prop("disabled", false);
                alert(res.data.message);
              }
            },
            error: function(e) {
              self.removeClass("spinner rtcl-loading disabled").prop("disabled", false);
              console.log(e);
            }
          });
        } else {
          alert("Type id is required.");
        }
      }
    });
    $(document).ready(function() {
      const $type_wrap = $("#rtcl-listing-type-wrap");
      $type_wrap.find("#listing-types").sortable({
        cursor: "ns-resize",
        axis: "y",
        forcePlaceholderSize: true,
        tolerance: "pointer",
        start: function(e, ui) {
          ui.placeholder.height(ui.item.height() + 30);
        },
        update: function(e, ui) {
          var $lis = $type_wrap.find("#listing-types > li");
          var types = {};
          $lis.each(function() {
            var $li = $(this), typeId = $li.find('input[name="id"]').val(), typeName = $li.find('input[name="name"]').val();
            if (typeId) {
              types[typeId] = typeName;
            }
          });
          var data = {
            action: "rtcl_ajax_sort_ad_types",
            types
          };
          data[rtcl.nonceId] = rtcl.nonce;
          $.ajax({
            url: rtcl.ajaxurl,
            data,
            type: "POST",
            beforeSend: function() {
              $type_wrap.find(".rtcl-message").remove();
            },
            success: function(res) {
              const $messageHolder = $('<div class="rtcl-message alert"></div>');
              const $class = res.success ? "alert-success" : "alert-danger";
              $messageHolder.addClass($class).text(res.data).appendTo($type_wrap);
            },
            error: function(e2) {
              console.log(e2.responseText);
            }
          });
        }
      });
    });
    function renderType(type) {
      var li = generateTypeHtml(type), target = $("#rtcl-listing-type-wrap"), ul = $(target, "#listing-types");
      if (!ul.length) {
        ul = $("<ul id='listing-types' class='list-group' />");
        target.html(ul);
      }
      ul.append(li);
    }
    function generateTypeHtml(type) {
      var li = '<li class="rtcl-list-group-item listing-type" data-id="' + type.id + '"><div class="type-details d-flex"><div class="type-info"><div class="type-info-id">' + type.id + '</div><div class="type-info-name">' + type.name + '</div></div><div class="action ml-auto"><span class="rtcl-btn edit">Edit</span><span class="rtcl-btn rtcl-btn-danger delete">Delete</span></div></div><div class="edit-action"><form class="rtcl-row input-update-type-form"><div class="rtcl-form-group rtcl-col-6"><label class="rtcl-field-label">ID</label><input type="text" name="id" class="rtcl-form-control" value="' + type.id + '" ></div><div class="rtcl-form-group rtcl-col-6"><label class="rtcl-field-label">Type</label><input type="text" name="name" class="rtcl-form-control" value="' + type.name + '" ></div><div class="rtcl-form-group rtcl-col-12"><button class="rtcl-btn">Update</button></div></form></div></div></li>';
      return li;
    }
  })(jQuery);
})();
