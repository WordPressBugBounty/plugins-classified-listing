var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
(function() {
  "use strict";
  (function($) {
    var listingData = [];
    function toggleJsonForm(disabled) {
      var $wrap = $("#rtcl-import-wrap");
      var $btn = $("#rtcl-import-btn");
      $wrap.find("input, button").prop("disabled", disabled);
      $btn.toggleClass("is-busy", disabled);
      if (disabled) {
        if (!$btn.next(".rtcl-ie-spinner").length) {
          $btn.after('<span class="rtcl-ie-spinner"></span>');
        }
      } else {
        $btn.next(".rtcl-ie-spinner").remove();
      }
    }
    function showFileAlert(inputSelector, message) {
      var $input = $(inputSelector);
      var $control = $input.closest(".rtcl-ie-fcontrol");
      if (!$control.length) {
        $control = $input.parent();
      }
      $control.find(".rtcl-ie-file-alert").remove();
      var $alert = $('<div class="rtcl-ie-file-alert">' + message + "</div>");
      $control.append($alert);
      setTimeout(function() {
        $alert.fadeOut(300, function() {
          $alert.remove();
        });
      }, 5e3);
    }
    if ($.fn.validate) {
      let getDataLength = function(data) {
        let length = data !== void 0 ? data.length : 0;
        if (length) {
          data.forEach(function(item, index) {
            if (item.child) {
              length += getDataLength(item.child);
            }
          });
        }
        return length;
      };
      const insertData = function insertData2(data, action, text) {
        return __async(this, null, function* () {
          if (data && !data.length) {
            return;
          }
          var percentageCount = 0;
          let responseTarget = $("#import-response"), length = getDataLength(data), initPercentage = 100 / length, percentage = 0;
          var sectionHtml = '<div class="rtcl-ie-json-progress-section"><div class="rtcl-ie-json-progress-head"><span class="rtcl-ie-json-progress-label">' + text + '</span><span class="rtcl-ie-json-progress-pct">0%</span></div><div class="rtcl-ie-progress" style="height:6px;margin-bottom:8px;"><div class="rtcl-ie-progress-bar" style="width:0%"></div></div><div class="rtcl-ie-json-progress-log"></div></div>';
          var $section = $(sectionHtml);
          responseTarget.append($section);
          $("html, body").animate({ scrollTop: $section.offset().top - 80 }, 400);
          var $pct = $section.find(".rtcl-ie-json-progress-pct"), $bar = $section.find(".rtcl-ie-progress-bar"), $log = $section.find(".rtcl-ie-json-progress-log");
          toggleJsonForm(true);
          function insertAjaxCall(dataItem) {
            return new Promise(function(resolve, reject) {
              $.ajax({
                url: rtcl.ajaxurl,
                method: "POST",
                data: {
                  data: dataItem,
                  action,
                  __rtcl_wpnonce: rtcl.__rtcl_wpnonce
                },
                dataType: "json",
                success: function success(res) {
                  percentage = percentage + initPercentage;
                  percentageCount = Math.ceil(percentage);
                  if (percentageCount > 100) {
                    percentageCount = 100;
                  }
                  $pct.text(percentageCount + "%");
                  $bar.css("width", percentageCount + "%");
                  if (res.success) {
                    $log.append('<p class="rtcl-ie-log-ok">' + res.message + "</p>");
                  } else {
                    $log.append('<p class="rtcl-ie-log-err">' + res.message + "</p>");
                  }
                  if (percentageCount >= 100) {
                    $bar.addClass("is-done");
                    $log.append('<p class="rtcl-ie-log-done">' + text + " successfully imported</p>");
                  }
                  $log.scrollTop($log[0].scrollHeight);
                  resolve(res);
                },
                error: function error(jqXHR, textStatus, errorThrown) {
                  percentage = percentage + initPercentage;
                  percentageCount = Math.ceil(percentage);
                  if (percentageCount > 100) {
                    percentageCount = 100;
                  }
                  $pct.text(percentageCount + "%");
                  $bar.css("width", percentageCount + "%");
                  reject(textStatus);
                }
              });
            });
          }
          function insertDataItem(dataItem, parent) {
            return __async(this, null, function* () {
              if (dataItem !== void 0 && Array.isArray(dataItem) && dataItem.length) {
                for (let index = 0; index < dataItem.length; index++) {
                  const item = dataItem[index];
                  if (parent) {
                    item.parent = parent;
                  }
                  let itemObj = Object.assign({}, item);
                  if (itemObj.child) {
                    delete itemObj.child;
                  }
                  try {
                    const response = yield insertAjaxCall(itemObj);
                    if (response.success && item.child) {
                      yield insertDataItem(item.child, response.data.term_id);
                    }
                  } catch (error) {
                    console.error("Error inserting item:", error);
                  }
                }
              }
            });
          }
          yield insertDataItem(data);
        });
      };
      $("#rtcl-import-file").on("change", function(e) {
        const self = $(this);
        self.parent(".custom-file").find(".custom-file-label").text(self.val());
        self.closest(".rtcl-ie-fcontrol").find(".rtcl-ie-file-alert").remove();
        $("#rtcl-import-form").validate();
      });
      $(".rtcl-import-listing-file").on("change", function(e) {
        const self = $(this);
        self.parent(".custom-file").find(".custom-file-label").text(self.val());
        self.closest(".rtcl-ie-fcontrol").find(".rtcl-ie-file-alert").remove();
      });
      $(document).on("click", "#rtcl-import-listing-btn", function(e) {
        e.preventDefault();
        var formData = new FormData(), $btn = $(this), $input = $("#rtcl-import-listing-file"), importFile = $input.prop("files")[0], $mappingWrapper = $(".rtcl-listings-import-mapping-wrapper"), $html = "";
        if (!importFile) {
          showFileAlert("#rtcl-import-listing-file", "Please select a CSV file to import listings data.");
          return;
        }
        if ("text/csv" !== importFile.type && "application/csv" !== importFile.type) {
          showFileAlert("#rtcl-import-listing-file", "Please select a valid CSV file. Your selected file is not supported.");
          return;
        }
        formData.append("file", importFile);
        formData.append("action", "rtcl_import_listings");
        formData.append("__rtcl_wpnonce", rtcl.__rtcl_wpnonce);
        $.ajax({
          url: rtcl.ajaxurl,
          method: "POST",
          data: formData,
          cache: false,
          dataType: "json",
          processData: false,
          contentType: false,
          beforeSend: function() {
            $btn.addClass("is-busy").prop("disabled", true).after('<span class="rtcl-ie-spinner"></span>');
          },
          success: function(res) {
            $btn.removeClass("is-busy").prop("disabled", false).next(".rtcl-ie-spinner").remove();
            $mappingWrapper.html("");
            if (res.success) {
              listingData = res.rawData;
              $html = res.data;
              $mappingWrapper.show();
              $mappingWrapper.append($html);
              $("html, body").animate({ scrollTop: $mappingWrapper.offset().top - 25 }, 1e3);
              $input.val("");
              $input.parent(".custom-file").find(".custom-file-label").text("Choose CSV file...");
            } else {
              showFileAlert("#rtcl-import-listing-file", res.message);
            }
          },
          error: function(e2) {
            $btn.removeClass("is-busy").prop("disabled", false).next(".rtcl-ie-spinner").remove();
            console.log(e2);
          }
        });
      });
      $("#rtcl-import-form").validate({
        submitHandler: function submitHandler(form) {
          let file = $("#rtcl-import-form").find("#rtcl-import-file")[0].files[0];
          if (!file) {
            showFileAlert("#rtcl-import-file", "Please select a JSON file to import.");
            return;
          }
          if (file.type !== "application/json") {
            showFileAlert("#rtcl-import-file", "Please select a valid JSON file.");
            return;
          }
          let reader = new FileReader();
          reader.onload = function(event) {
            return __async(this, null, function* () {
              const obj = JSON.parse(event.target.result);
              $("#import-response").html("");
              const locations = obj.locations;
              const categories = obj.categories;
              const settings = obj.settings;
              const ad_type = obj.types;
              if (locations) {
                yield insertData(locations, "rtcl_import_location", "Location");
              }
              if (categories) {
                yield insertData(categories, "rtcl_import_category", "Category");
              }
              if (settings) {
                yield insertData(settings, "rtcl_import_settings", "Settings");
              }
              if (ad_type) {
                yield insertData(ad_type, "rtcl_import_ad_types", "Ad Types");
              }
              toggleJsonForm(false);
            });
          };
          reader.readAsText(file);
        }
      });
      $(document).on("submit", "#rtcl-listings-import-mapping-form", function(e) {
        e.preventDefault();
        var $form = $(this), $wrapper = $form.closest(".rtcl-listings-import-mapping-wrapper"), fromData = $form.serialize(), $button = $form.find("#rtcl_listings_import_submit");
        var $importWrap = $("#rtcl-import-wrap"), $noticeWrap = $(".rtcl-import-notice");
        var $loader = $("<div class='rtcl-preloader-dot-loading'><div class='rtcl-cssload-loading'><i></i><i></i><i></i><i></i></div><span>The import process is in progress...</span></div>");
        $.ajax({
          url: rtcl.ajaxurl,
          method: "POST",
          data: {
            rows: JSON.stringify(listingData),
            action: "rtcl_import_process_listing_data",
            formData: fromData,
            __rtcl_wpnonce: rtcl.__rtcl_wpnonce
          },
          beforeSend: function() {
            $button.attr("disabled", true);
            $wrapper.append($loader);
            $importWrap.find("input").attr("disabled", true);
            $importWrap.find("button").attr("disabled", true);
            $noticeWrap.slideDown();
            $("html, body").animate({ scrollTop: $wrapper.offset().top - 25 }, 1e3);
          },
          success: function(res) {
            $button.attr("disabled", false);
            $wrapper.find(".rtcl-preloader-dot-loading").remove();
            $form.remove();
            $importWrap.find("input").attr("disabled", false);
            $importWrap.find("button").attr("disabled", false);
            $noticeWrap.slideUp();
            var responseHtml = "";
            if (res.success) {
              responseHtml += "<p class='rtcl-listing-import-response'>" + res.message + "</p>";
            } else {
              responseHtml += "<p class='rtcl-listing-import-response error'>" + res.message + "</p>";
            }
            if (res.errors && res.errors.length) {
              responseHtml += "<div class='rtcl-import-errors' style='margin-top:10px;'>";
              responseHtml += "<p style='color:#d63638;font-weight:600;'>Import errors:</p>";
              responseHtml += "<ul style='list-style:disc;padding-left:20px;color:#d63638;max-height:200px;overflow-y:auto;'>";
              res.errors.forEach(function(err) {
                responseHtml += "<li>" + err + "</li>";
              });
              responseHtml += "</ul></div>";
            }
            $wrapper.append(responseHtml);
          },
          error: function(e2, error, errorThrown) {
            $button.attr("disabled", false);
            $wrapper.find(".rtcl-preloader-dot-loading").remove();
            $form.remove();
            $importWrap.find("input").attr("disabled", false);
            $importWrap.find("button").attr("disabled", false);
            $noticeWrap.slideUp();
            var message = "";
            var statusErrorMap = {
              "400": "Server rejected the request (HTTP 400). This may be caused by too many fields or data exceeding server limits. Try reducing the number of listings per CSV file.",
              "401": "Unauthorized access.",
              "403": "Forbidden resource can't be accessed.",
              "413": "Request payload too large. Try importing fewer listings per CSV file.",
              "500": "Internal server error. Check your server error logs for details.",
              "503": "Service unavailable."
            };
            if (e2.status) {
              message = statusErrorMap[e2.status] || "Server error (HTTP " + e2.status + ").";
              if (e2.responseText) {
                try {
                  var jsonResponse = JSON.parse(e2.responseText);
                  if (jsonResponse.message) {
                    message += "\n" + jsonResponse.message;
                  }
                  if (jsonResponse.errors && jsonResponse.errors.length) {
                    message += "\n\nDetails:";
                    jsonResponse.errors.forEach(function(err) {
                      message += "\n• " + err;
                    });
                  }
                } catch (parseErr) {
                }
              }
            } else if (errorThrown === "parsererror") {
              message = "Error.\nParsing JSON Request failed.";
            } else if (errorThrown === "timeout") {
              message = "Request Time out. Try importing fewer listings per CSV file.";
            } else if (errorThrown === "abort") {
              message = "Request was aborted by the server.";
            } else {
              message = e2.responseText || "An unknown error occurred.";
            }
            $wrapper.append("<pre class='rtcl-listing-import-response error' style='white-space:pre-wrap;color:#d63638;'>" + message + "</pre>");
            console.log("Import error:", e2.status, errorThrown, e2.responseText);
          }
        });
      });
    }
    (function() {
      var $form = $("#rtcl-rss-source-form");
      if (!$form.length || typeof rtcl === "undefined") {
        return;
      }
      var $testBtn = $("#rtcl-rss-test-btn");
      var $saveBtn = $("#rtcl-rss-save-btn");
      var $preview = $("#rtcl-rss-preview");
      var $response = $("#rtcl-rss-form-response");
      function withNonce(data) {
        data = data || {};
        data.__rtcl_wpnonce = rtcl.__rtcl_wpnonce;
        return data;
      }
      function flash($target, isError, message) {
        var cls = isError ? "rtcl-ie-banner rtcl-ie-banner-critical" : "rtcl-ie-banner rtcl-ie-banner-success";
        $target.html('<div class="' + cls + '"><p>' + message + "</p></div>");
      }
      function setBusy($btn, busy) {
        $btn.prop("disabled", busy).toggleClass("is-busy", busy);
        if (busy) {
          if (!$btn.next(".rtcl-ie-spinner").length) {
            $btn.after('<span class="rtcl-ie-spinner"></span>');
          }
        } else {
          $btn.next(".rtcl-ie-spinner").remove();
        }
      }
      $form.on("submit", function(e) {
        e.preventDefault();
        var data = $(this).serializeArray().reduce(function(acc, kv) {
          acc[kv.name] = kv.value;
          return acc;
        }, {});
        data.action = "rtcl_import_rss_save";
        data.update_existing = $(this).find("[name=update_existing]").is(":checked") ? 1 : 0;
        setBusy($saveBtn, true);
        $.post(rtcl.ajaxurl, withNonce(data), function(res) {
          setBusy($saveBtn, false);
          if (res && res.success) {
            flash($response, false, res.data.message);
            window.location.reload();
          } else {
            flash($response, true, res && res.data && res.data.message || "Save failed.");
          }
        }).fail(function() {
          setBusy($saveBtn, false);
          flash($response, true, "Save failed.");
        });
      });
      $testBtn.on("click", function() {
        var url = $("#rtcl-rss-url").val();
        if (!url) {
          $preview.html(
            '<div class="rtcl-ie-banner rtcl-ie-banner-warning"><p>Please enter a Feed URL before testing.</p></div>'
          );
          return;
        }
        $testBtn.prop("disabled", true);
        $preview.html(
          '<div class="rtcl-rss-preview-loading"><span class="rtcl-ie-spinner"></span><span>Fetching feed data…</span></div>'
        );
        $.post(rtcl.ajaxurl, withNonce({ action: "rtcl_import_rss_preview", url }), function(res) {
          $testBtn.prop("disabled", false);
          if (res && res.success) {
            var html = '<div class="rtcl-rss-preview-header"><span class="rtcl-ie-tag rtcl-ie-tag-success">' + res.data.count + " item" + (res.data.count !== 1 ? "s" : "") + " found</span></div>";
            html += '<div class="rtcl-rss-preview-items">';
            res.data.items.forEach(function(it) {
              var thumb = it.images && it.images.length ? it.images[0] : "";
              html += '<div class="rtcl-rss-preview-item">';
              if (thumb) {
                html += '<div class="rtcl-rss-preview-thumb"><img src="' + thumb + '" alt=""></div>';
              }
              html += '<div class="rtcl-rss-preview-content">';
              html += '<div class="rtcl-rss-preview-title">' + (it.title || "(no title)") + "</div>";
              if (it.excerpt) {
                html += '<div class="rtcl-rss-preview-excerpt">' + it.excerpt + "</div>";
              }
              if (it.source_url) {
                html += '<a class="rtcl-rss-preview-url" href="' + it.source_url + '" target="_blank" rel="noopener">' + it.source_url + "</a>";
              }
              html += "</div></div>";
            });
            html += "</div>";
            $preview.html(html);
          } else {
            $preview.html(
              '<div class="rtcl-ie-banner rtcl-ie-banner-critical"><p>' + (res && res.data && res.data.message || "Preview failed.") + "</p></div>"
            );
          }
        }).fail(function() {
          $testBtn.prop("disabled", false);
          $preview.html(
            '<div class="rtcl-ie-banner rtcl-ie-banner-critical"><p>Preview request failed.</p></div>'
          );
        });
      });
      $(document).on("click", ".rtcl-rss-run", function() {
        var id = $(this).data("id");
        var $btn = $(this);
        setBusy($btn, true);
        $.post(rtcl.ajaxurl, withNonce({ action: "rtcl_import_rss_run", id }), function(res) {
          setBusy($btn, false);
          if (res && res.success) {
            flash($response, false, res.data.message);
            if (res.data.errors && res.data.errors.length) {
              console.warn("rtcl rss import errors", res.data.errors);
            }
          } else {
            flash($response, true, res && res.data && res.data.message || "Run failed.");
          }
        }).fail(function() {
          setBusy($btn, false);
          flash($response, true, "Run request failed.");
        });
      });
      $(document).on("click", ".rtcl-rss-delete", function() {
        var id = $(this).data("id");
        if (!confirm("Delete this feed?")) {
          return;
        }
        $.post(rtcl.ajaxurl, withNonce({ action: "rtcl_import_rss_delete", id }), function(res) {
          if (res && res.success) {
            window.location.reload();
          } else {
            alert(res && res.data && res.data.message || "Delete failed.");
          }
        });
      });
    })();
  })(jQuery);
})();
