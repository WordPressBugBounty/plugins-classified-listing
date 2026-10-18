(function() {
  "use strict";
  (function($) {
    var i18n = $.extend({
      edit: "Edit",
      delete: "Delete",
      update: "Update",
      cancel: "Cancel",
      id: "ID",
      name: "Name",
      drag: "Drag to reorder",
      confirm_delete: "Are you sure to delete this type?",
      fill_type: "Please fill type.",
      fill_id_type: "Please fill id and type.",
      server_error: "Server Error !!!",
      id_required: "Type id is required."
    }, window.rtcl && rtcl.i18n || {});
    var icons = {
      grip: '<svg class="rtcl-lt-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>',
      pencil: '<svg class="rtcl-lt-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>',
      trash: '<svg class="rtcl-lt-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>'
    };
    function escapeHtml(str) {
      return String(str == null ? "" : str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
    function showNotice($target, message, success) {
      $target.find("> .rtcl-lt-notice").remove();
      var $notice = $('<div class="rtcl-lt-notice" role="alert" />').addClass(success ? "is-success" : "is-error").text($("<div/>").html(message).text()).appendTo($target);
      if (success) {
        setTimeout(function() {
          $notice.fadeOut(300, function() {
            $(this).remove();
          });
        }, 3e3);
      }
    }
    function refreshCount() {
      var count = $("#listing-types > li.listing-type").length;
      $("#rtcl-listing-type-wrap .rtcl-lt-count").text(count);
      $("#rtcl-listing-type-wrap .rtcl-lt-empty").prop("hidden", count > 0);
    }
    $(document).on("click", ".listing-type .action .edit", function() {
      var li = $(this).closest("li");
      li.toggleClass("is-editing");
      li.find(".edit-action").slideToggle(200);
    });
    $(document).on("click", ".listing-type .input-update-type-form .cancel", function() {
      var li = $(this).closest("li");
      li.removeClass("is-editing");
      li.find(".edit-action").slideUp(200);
    });
    $("#input-new-type-form").on("submit", function(e) {
      e.preventDefault();
      var form = $(this), button = $("#rtcl-add-btn", form), type_field = $("#add-input-type", form), type = type_field.val();
      const fromData = new FormData(this);
      fromData.append("action", "rtcl_ajax_add_listing_type");
      fromData.append(rtcl.nonceId, rtcl.nonce);
      form.find(".rtcl-lt-notice").remove();
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
            button.addClass("rtcl-loading").prop("disabled", true);
          },
          success: function(res) {
            if (res.success) {
              type_field.val("");
              renderType(res.data.data);
            }
            showNotice(form, res.success ? res.data.message : res.data, res.success);
            button.removeClass("rtcl-loading").prop("disabled", false);
          },
          error: function() {
            showNotice(form, i18n.server_error, false);
            button.removeClass("rtcl-loading").prop("disabled", false);
          }
        });
      } else {
        showNotice(form, i18n.fill_type, false);
        type_field.trigger("focus");
      }
    });
    $(document).on("submit", ".input-update-type-form", function(e) {
      e.preventDefault();
      var form = $(this), wrap = form.closest("li"), old_id = wrap.data("id") || "", info_id = $(".type-info-id", wrap), info_name = $(".type-info-name", wrap), button = form.find("button[type=submit]"), input_id = form.find("input[name=id]"), id = input_id.val() || "", input_name = form.find("input[name=name]"), name = input_name.val() || "";
      const fromData = new FormData(this);
      fromData.append("action", "rtcl_ajax_update_listing_type");
      fromData.append("old_id", old_id);
      fromData.append(rtcl.nonceId, rtcl.nonce);
      form.find(".rtcl-lt-notice").remove();
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
            button.addClass("rtcl-loading").prop("disabled", true);
          },
          success: function(res) {
            if (res.success) {
              input_id.val(res.data.data.id);
              input_name.val(res.data.data.name);
              info_id.text(res.data.data.id);
              info_name.text(res.data.data.name);
              wrap.data("id", res.data.data.id).attr("data-id", res.data.data.id);
            }
            button.removeClass("rtcl-loading").prop("disabled", false);
            showNotice(form, res.success ? res.data.message : res.data, res.success);
          },
          error: function() {
            showNotice(form, i18n.server_error, false);
            button.removeClass("rtcl-loading").prop("disabled", false);
          }
        });
      } else {
        showNotice(form, i18n.fill_id_type, false);
      }
    });
    $(document).on("click", ".listing-type .action .delete:not(.disabled)", function() {
      if (confirm(i18n.confirm_delete)) {
        var self = $(this), li = self.closest("li.listing-type"), id = li.data("id");
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
              self.addClass("rtcl-loading disabled").prop("disabled", true);
            },
            success: function(res) {
              if (res.success) {
                li.slideUp(250, function() {
                  $(this).remove();
                  refreshCount();
                });
              } else {
                self.removeClass("rtcl-loading disabled").prop("disabled", false);
                alert(res.data && res.data.message ? res.data.message : res.data);
              }
            },
            error: function(e) {
              self.removeClass("rtcl-loading disabled").prop("disabled", false);
              console.log(e);
            }
          });
        } else {
          alert(i18n.id_required);
        }
      }
    });
    $(document).ready(function() {
      const $type_wrap = $("#rtcl-listing-type-wrap");
      $type_wrap.find("#listing-types").sortable({
        handle: ".rtcl-lt-handle",
        axis: "y",
        forcePlaceholderSize: true,
        tolerance: "pointer",
        placeholder: "rtcl-lt-placeholder",
        start: function(e, ui) {
          ui.placeholder.height(ui.item.outerHeight());
        },
        update: function() {
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
            success: function(res) {
              showNotice($type_wrap, res.data, res.success);
            },
            error: function(e) {
              console.log(e.responseText);
            }
          });
        }
      });
    });
    function renderType(type) {
      $("#listing-types").append(generateTypeHtml(type));
      refreshCount();
    }
    function generateTypeHtml(type) {
      var id = escapeHtml(type.id), name = escapeHtml(type.name);
      return '<li class="rtcl-list-group-item listing-type" data-id="' + id + '"><div class="type-details"><span class="rtcl-lt-handle" title="' + escapeHtml(i18n.drag) + '">' + icons.grip + '</span><div class="type-info"><div class="type-info-name">' + name + '</div><code class="type-info-id">' + id + '</code></div><div class="action"><button type="button" class="rtcl-lt-icon-btn edit" title="' + escapeHtml(i18n.edit) + '">' + icons.pencil + '<span class="screen-reader-text">' + escapeHtml(i18n.edit) + '</span></button><button type="button" class="rtcl-lt-icon-btn rtcl-lt-danger delete" title="' + escapeHtml(i18n.delete) + '">' + icons.trash + '<span class="screen-reader-text">' + escapeHtml(i18n.delete) + '</span></button></div></div><div class="edit-action"><form class="input-update-type-form"><div class="rtcl-lt-edit-fields"><div class="rtcl-form-group"><label class="rtcl-field-label">' + escapeHtml(i18n.name) + '</label><input type="text" name="name" class="rtcl-form-control" value="' + name + '"></div><div class="rtcl-form-group"><label class="rtcl-field-label">' + escapeHtml(i18n.id) + '</label><input type="text" name="id" class="rtcl-form-control" value="' + id + '"></div></div><div class="rtcl-lt-edit-actions"><button type="button" class="rtcl-btn rtcl-lt-btn-ghost cancel">' + escapeHtml(i18n.cancel) + '</button><button type="submit" class="rtcl-btn rtcl-lt-btn-primary">' + escapeHtml(i18n.update) + "</button></div></form></div></li>";
    }
  })(jQuery);
})();
