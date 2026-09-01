var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function() {
  "use strict";
  class RtclAdminAjaxFilter {
    constructor() {
      __publicField(this, "deprecatedMessage", '<span class="rtcl-deprecated" style="display: block;font-size:70%;color: red">Deprecated</span>');
      // Inline SVG icons (replace dashicons for a cleaner, crisper look)
      __publicField(this, "icons", {
        grip: '<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><circle cx="5.5" cy="3.5" r="1.35"/><circle cx="5.5" cy="8" r="1.35"/><circle cx="5.5" cy="12.5" r="1.35"/><circle cx="10.5" cy="3.5" r="1.35"/><circle cx="10.5" cy="8" r="1.35"/><circle cx="10.5" cy="12.5" r="1.35"/></svg>',
        settings: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
        trash: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>'
      });
      __publicField(this, "init", () => {
        this.handleEvents();
      });
      __publicField(this, "handleEvents", () => {
        const that = this;
        this.$(".rtcl-filter-list").on("click", "a.rtcl-filter-add, a.rtcl-filter-action-wrap .rtcl-filter-edit", (e) => {
          const $currentTarget = this.$(e.currentTarget);
          const nameField = {
            label: this.__("Name", "classified-listing"),
            placeholder: this.__("Form name", "classified-listing"),
            id: "name",
            required: true
          };
          const idField = {
            label: this.__("Id", "classified-listing"),
            id: "id",
            placeholder: this.__("Form Slug/id", "classified-listing"),
            description: this.__("Only english, lowercase, no space, no spacial character allowed", "classified-listing")
          };
          const sveBtn = this.$('<button class="rtcl-admin-btn primary">' + this.__("Save Changes", "classified-listing") + "</button>");
          sveBtn.on("click", (event) => {
            const $form = this.$(".rtcl-ui-modal #rtcl-filter-form");
            if (!this.formCheckValidation($form)) {
              return false;
            }
            const formData = new FormData($form[0]);
            formData.append("action", "rtcl_admin_settings_filter_update_name");
            formData.append("__rtcl_wpnonce", rtclFilterObj.nonce);
            if (filterId) {
              formData.append("filterId", filterId);
            }
            this.$.ajax({
              url: rtclFilterObj.ajaxurl,
              cache: false,
              processData: false,
              contentType: false,
              dataType: "json",
              type: "POST",
              data: formData,
              beforeSend: () => {
                this.modal.addLoading();
              },
              success: (res) => {
                if (res.success) {
                  toastr.success(res.data.message);
                  rtclFilterObj.filters = res.data.filters;
                  if (res.data.action === "new") {
                    this.$(".rtcl-filter-list-wrap").append('<a data-id="' + res.data.filterId + '" class="rtcl-filter-action-wrap"><span class="rtcl-filter-name">' + res.data.filters[res.data.filterId].name + '</span><span class="rtcl-filter-actions"><i class="rtcl-filter-edit dashicons dashicons-edit"></i><i class="rtcl-filter-remove dashicons dashicons-remove"></i></span></a>').find('a[data-id="' + res.data.filterId + '"]').trigger("click");
                  } else {
                    this.$(".rtcl-filter-list-wrap").find('a[data-id="' + res.data.filterId + '"]').find("span.rtcl-filter-name").text(res.data.filters[res.data.filterId].name);
                  }
                  this.modal.removeModel();
                } else {
                  toastr.error(res.data);
                }
              },
              error: (e2) => {
                console.error(e2);
              },
              complete: () => {
                this.modal.removeLoading();
              }
            });
          });
          let filterId = "";
          if ($currentTarget.hasClass("rtcl-filter-edit") && $currentTarget.parents(".rtcl-filter-action-wrap").data("id")) {
            filterId = $currentTarget.parents(".rtcl-filter-action-wrap").data("id");
            nameField.value = rtclFilterObj.filters[filterId].name;
            idField.value = filterId;
            idField.readonly = true;
          }
          const $content = this.$('<form id="rtcl-filter-form"></form>');
          $content.append(this.getRenderedField(nameField));
          $content.append(this.getRenderedField(idField));
          if (!filterId) {
            $content.find("input[name=name]").on("keyup", (event) => {
              $content.find("input[name=id]").val(this.slugify(this.$(event.currentTarget).val()));
            });
            $content.find("input[name=id]").on("keyup", (event) => {
              this.$(this).val(this.slugify($(event.currentTarget).val()));
            });
          }
          this.modal.addModal().addTitle(filterId ? this.__("Update Filter form", "classified-listing") : this.__("Add new Filter Form", "classified-listing")).content($content).addFooterContent(sveBtn);
        }).on("click", "a.rtcl-filter-action-wrap", (event) => {
          const $self = this.$(event.currentTarget);
          const id = $self.data("id");
          this.$("a.rtcl-filter-action-wrap").removeClass("active");
          $self.addClass("active");
          const url = new URL(window.location.href);
          url.searchParams.set("current_filter", id);
          window.history.pushState("", document.title, url.toString());
          this.renderFilterForm(id);
        }).on("click", "a.rtcl-filter-action-wrap .rtcl-filter-remove", (event) => {
          const formData = new FormData();
          formData.append("action", "rtcl_admin_settings_filter_remove");
          formData.append("filterId", this.$(event.currentTarget).parents("a").data("id"));
          formData.append("__rtcl_wpnonce", rtclFilterObj.nonce);
          if (confirm("Are you sure to remove?")) {
            this.$.ajax({
              url: rtclFilterObj.ajaxurl,
              cache: false,
              processData: false,
              contentType: false,
              dataType: "json",
              type: "POST",
              data: formData,
              beforeSend: () => {
                this.$wrap.rtclBlock();
              },
              success: (res) => {
                if (res.success) {
                  toastr.success(res.data.message);
                  rtclFilterObj.filters = res.data.filters;
                  this.$(".rtcl-filter-list-wrap").find('a[data-id="' + res.data.filterId + '"]').remove();
                  this.$("#rtcl-filter-wrap").empty();
                  const url = new URL(window.location.href);
                  url.searchParams.delete("current_filter");
                  window.history.pushState("", document.title, url.toString());
                  this.$(".rtcl-filter-list-wrap").find("a:first-child").trigger("click");
                } else {
                  toastr.error(res.data);
                }
              },
              error: (e) => {
                console.error(e);
              },
              complete: () => {
                this.$wrap.rtclUnblock();
              }
            });
          }
        });
        this.$("#rtcl-filter-wrap").on("click", "#rtcl-filter-add-item", (event) => {
          const filterId = that.$(event.currentTarget).parents(".rtcl-filter-content").data("id");
          const filter = rtclFilterObj.filters[filterId];
          let $content = that.$('<div id="rtcl-modal-fis"></div>');
          let hasField = false;
          Object.keys(rtclFilterObj.items).map((_fieldId) => {
            const index = filter.items.findIndex((_field) => {
              return _field.id === _fieldId;
            });
            if (index !== -1) {
              return;
            }
            hasField = true;
            const label = rtclFilterObj.items[_fieldId].label;
            const icon = rtclFilterObj.items[_fieldId].icon;
            const $item = that.$('<div class="rtcl-modal-fi" data-id="' + _fieldId + '"><div class="rtcl-mfi-label"><span>' + label + '</span><i class="' + icon + '"></i></div><div class="rtcl-mfi-description">Field Name: ' + _fieldId + "</div></div>");
            $item.on("click", (event2) => {
              const $_item = that.$(event2.currentTarget);
              const itemId = $_item.data("id");
              const item = rtclFilterObj.items[itemId];
              const itemUpdateData = {
                filterId,
                itemId,
                data: {}
              };
              if (item.fields && item.fields.length) {
                that.modal.addTitle("Add Item - " + item.label);
                const $content2 = that.$('<form id="rtcl-filter-form"></form>');
                item.fields.map((_field) => {
                  if (_field.default) {
                    _field.value = _field.default;
                  }
                  $content2.append(that.getRenderedField(_field));
                });
                that.modal.content($content2);
                if ("cf" === itemId) {
                  that.initSortableItems($content2);
                }
                const sveBtn = that.$('<button class="rtcl-admin-btn primary">' + that.__("Add Item", "classified-listing") + "</button>");
                sveBtn.on("click", (event3) => {
                  const $form = that.$(".rtcl-ui-modal #rtcl-filter-form");
                  if (!that.formCheckValidation($form)) {
                    return false;
                  }
                  const formData = new FormData($form[0]);
                  for (let [_key, _value] of formData.entries()) {
                    if (_key.endsWith("[]")) {
                      const name = _key.slice(0, -2);
                      if (!itemUpdateData.data[name]) {
                        itemUpdateData.data[name] = [];
                      }
                      itemUpdateData.data[name].push(_value);
                    } else if (itemUpdateData.data[_key]) {
                      if (!Array.isArray(itemUpdateData.data[_key])) {
                        itemUpdateData.data[_key] = [itemUpdateData.data[_key]];
                      }
                      itemUpdateData.data[_key].push(_value);
                    } else {
                      itemUpdateData.data[_key] = _value;
                    }
                  }
                  if ("cf" === itemId) {
                    const fIds = [];
                    $content2.find(".rtcl-sortable-item").each(function(_i, _item) {
                      const _id = that.$(this).data("id");
                      if (_id) {
                        fIds.push(_id);
                      }
                    });
                    itemUpdateData.data["fields_order"] = fIds;
                  }
                  this.updateItem(itemUpdateData, (res) => {
                    rtclFilterObj.filters = res.data.filters;
                    that.renderFilterForm(filterId);
                    that.modal.removeLoading();
                    that.modal.close();
                  }, () => {
                    that.modal.addLoading();
                  });
                });
                that.modal.addFooterContent(sveBtn);
              } else {
                itemUpdateData.data = rtclFilterObj.items[_fieldId].settings ? rtclFilterObj.items[_fieldId].settings : {};
                that.updateItem(itemUpdateData, (res) => {
                  rtclFilterObj.filters = res.data.filters;
                  that.renderFilterForm(filterId);
                  that.modal.close();
                });
              }
            });
            $content.append($item);
          });
          if (!hasField) {
            $content = that.$("<p>" + that.__("No remaining Item found to add.", "classified-listing") + "</p>");
          }
          that.modal.addModal().addTitle("Add Item").content($content).addFooterContent("");
        }).on("click", "a.rtcl-filter-control-btn-remove", (event) => {
          if (confirm(that.__("Are you sure to remove!!", "classified-listing"))) {
            const $self = that.$(event.currentTarget);
            const filterId = $self.parents(".rtcl-filter-content").data("id");
            const itemId = $self.parents(".rtcl-filter-item").data("id");
            if (filterId) {
              that.$.ajax({
                url: rtclFilterObj.ajaxurl,
                dataType: "json",
                type: "POST",
                data: {
                  action: "rtcl_admin_settings_filter_remove_item",
                  __rtcl_wpnonce: rtclFilterObj.nonce,
                  filterId,
                  itemId
                },
                beforeSend: () => {
                  that.$wrap.rtclBlock();
                },
                success: (res) => {
                  if (res.success) {
                    toastr.success(res.data.message);
                    rtclFilterObj.filters = res.data.filters;
                    that.renderFilterForm(filterId);
                  } else {
                    toastr.error(res.data);
                  }
                },
                error: (e) => {
                  console.error(e);
                },
                complete: () => {
                  that.$wrap.rtclUnblock();
                }
              });
            }
          }
        }).on("click", "a.rtcl-filter-control-btn-settings", (event) => {
          const $self = that.$(event.currentTarget);
          const filterId = $self.parents(".rtcl-filter-content").data("id");
          const itemId = $self.parents(".rtcl-filter-item").data("id");
          const filter = rtclFilterObj.filters[filterId];
          const itemIndex = filter.items.findIndex(function(_field) {
            return _field.id === itemId;
          });
          const filterItem = filter.items[itemIndex];
          const settingsItem = rtclFilterObj.items[itemId];
          if (settingsItem.fields && Array.isArray(settingsItem.fields)) {
            that.modal.addModal();
            that.modal.addTitle("Edit Item - " + settingsItem.label);
            const $content = that.$('<form id="rtcl-filter-form"></form>');
            settingsItem.fields.map((_field) => {
              if (filterItem[_field.id]) {
                _field.value = filterItem[_field.id];
              }
              $content.append(that.getRenderedField(_field));
            });
            this.modal.content($content);
            if ("cf" === itemId) {
              that.initSortableItems($content);
            }
            const sveBtn = this.$('<button class="rtcl-admin-btn primary">' + this.__("Update Item", "classified-listing") + "</button>");
            const itemUpdateData = { filterId, itemId, data: {} };
            sveBtn.on("click", (event2) => {
              const $form = this.$(".rtcl-ui-modal #rtcl-filter-form");
              if (!that.formCheckValidation($form)) {
                return false;
              }
              const formData = new FormData($form[0]);
              for (let [_key, _value] of formData.entries()) {
                if (_key.endsWith("[]")) {
                  const name = _key.slice(0, -2);
                  if (!itemUpdateData.data[name]) {
                    itemUpdateData.data[name] = [];
                  }
                  itemUpdateData.data[name].push(_value);
                } else if (itemUpdateData.data[_key]) {
                  if (!Array.isArray(itemUpdateData.data[_key])) {
                    itemUpdateData.data[_key] = [itemUpdateData.data[_key]];
                  }
                  itemUpdateData.data[_key].push(_value);
                } else {
                  itemUpdateData.data[_key] = _value;
                }
              }
              if ("cf" === itemId) {
                const fIds = [];
                $content.find("#rtcl-filter-modal-fields_order .rtcl-sortable-item").each(function(_i, _item) {
                  const _id = that.$(this).data("id");
                  if (_id) {
                    fIds.push(_id);
                  }
                });
                itemUpdateData.data["fields_order"] = fIds;
              }
              that.updateItem(itemUpdateData, (res) => {
                rtclFilterObj.filters = res.data.filters;
                that.renderFilterForm(filterId);
                that.modal.removeLoading();
                that.modal.close();
              }, () => {
                that.modal.addLoading();
              });
            });
            that.modal.addFooterContent(sveBtn);
          }
        });
      });
      __publicField(this, "slugify", (text) => {
        return text.toString().normalize("NFKD").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\_/g, "-").replace(/\-\-+/g, "-").replace(/\-$/g, "");
      });
      __publicField(this, "initSortableItems", ($context) => {
        const $targetWrap = $context ? $context.find(".rtcl-sortable-items") : this.$(document).find(".rtcl-ui-modal #rtcl-filter-form .rtcl-sortable-items");
        $targetWrap.sortable({
          handle: ".rtcl-sortable-handle",
          helper: "clone",
          sort: function(event, ui) {
            ui.helper.css("top", ui.position.top + 24 + "px");
          }
        });
      });
      __publicField(this, "getRenderedField", (field) => {
        if (!field) {
          return;
        }
        const value = field.value ? field.value : "";
        let $field;
        const $fieldWrap = this.$('<div class="rtcl-modal-field"><div class="rtcl-mf-label"><label for="rtcl-filter-modal-' + field.id + '">' + field.label + '</label></div><div class="rtcl-mf-content"></div></div>');
        if (field.type === "switch") {
          const checked = value ? " checked" : "";
          $field = this.$('<input type="checkbox" id="rtcl-filter-modal-' + field.id + '" name="' + field.id + '" value="1"' + checked + " />");
        } else if (field.type === "checkbox") {
          $field = this.$('<div class="rtcl-checkbox-group"/>');
          if (field.required) {
            $field.addClass("required");
          }
          const options = field.options;
          if (options) {
            Object.keys(options).map((optionKey) => {
              const $option = this.$('<label><input type="checkbox" id="rtcl-modal-checkbox-' + field.id + "-" + optionKey + '" name="' + field.id + '[]" value="' + optionKey + '" /><span class="label-text">' + options[optionKey] + "</span></label>");
              if (Array.isArray(value) && value.some((_i) => _i == optionKey)) {
                $option.find("input").prop("checked", true);
              }
              $field.append($option);
            });
          }
        } else if (field.type === "select") {
          $field = this.$('<select id="rtcl-filter-modal-' + field.id + '" name="' + field.id + '" />');
          if (field.required) {
            $field.addClass("required");
          }
          const options = field.options;
          if (options) {
            Object.keys(options).map((optionKey) => {
              const $option = this.$("<option />").val(optionKey).text(options[optionKey]);
              if (value && optionKey === value) {
                $option.prop("selected", true);
              }
              $field.append($option);
            });
          }
        } else if (field.type === "number") {
          $field = this.$('<input id="rtcl-filter-modal-' + field.id + '" type="number" name="' + field.id + '" value="' + value + '" />');
          if (field.required) {
            $field.addClass("required");
          }
        } else if (field.type === "cf_fields_order") {
          let moveArrayItem = function(arr, fromIndex, toIndex) {
            if (toIndex >= arr.length) {
              let k = toIndex - arr.length + 1;
              arr.push(...Array(k));
            }
            arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);
            return arr;
          };
          const cfFields = [];
          rtclFilterObj.forms.map((_form) => {
            Object.keys(_form.fields).map((_fieldId) => {
              const _field = _form.fields[_fieldId];
              if (!_field.preset && _field.filterable) {
                _field.form = { id: _form.id, title: _form.title };
                cfFields.push(_field);
              }
            });
          });
          if (cfFields.length && value && Array.isArray(value) && value.length) {
            value.map((_vUuid, _vIndex) => {
              const fromIndex = cfFields.findIndex((_field) => _field.uuid === _vUuid);
              if (fromIndex !== -1 && fromIndex !== _vIndex) {
                moveArrayItem(cfFields, fromIndex, _vIndex);
              }
            });
          }
          $field = this.$('<div class="cf-field-order rtcl-sortable-items" id="rtcl-filter-modal-' + field.id + '" />');
          cfFields.filter((_) => _).map((_field) => {
            var _a;
            const $item = jQuery('<div class="rtcl-sortable-item" data-id="' + _field.uuid + '"><div class="rtcl-sortable-handle">' + (_field.label || _field.name || _field.element) + " (Form: " + _field.form.title + ")</div></div>");
            if (((_a = _field.icon) == null ? void 0 : _a.type) === "class" && _field.icon.class) {
              $item.find(".rtcl-sortable-handle").prepend('<i class="' + _field.icon.class + '"/>');
            }
            $field.append($item);
          });
        } else {
          $field = this.$('<input id="rtcl-filter-modal-' + field.id + '" type="text" name="' + field.id + '" value="' + value + '" />');
          if (field.required) {
            $field.addClass("required");
          }
          if (field.placeholder) {
            $field.addClass("required");
            $field.attr("placeholder", field.placeholder);
          }
        }
        if ($field) {
          if (field.readonly) {
            $field.prop("disabled", true).attr("readonly", true);
          }
          $fieldWrap.find(".rtcl-mf-content").append($field);
        }
        if (field.description) {
          $fieldWrap.find(".rtcl-mf-content").append('<div class="description">' + field.description + "</div>");
        }
        return $fieldWrap;
      });
      __publicField(this, "updateItemsOrder", (filterId) => {
        const itemKeys = [];
        this.$("#rtcl-filter-wrap .rtcl-filter-items .rtcl-filter-item").each((_i, _item) => {
          itemKeys.push(this.$(_item).data("id"));
        });
        this.$.ajax({
          url: rtclFilterObj.ajaxurl,
          dataType: "json",
          type: "POST",
          data: {
            action: "rtcl_admin_settings_filter_update_items_order",
            __rtcl_wpnonce: rtclFilterObj.nonce,
            filterId,
            itemKeys
          },
          beforeSend: () => {
            this.$wrap.rtclBlock();
          },
          success: (res) => {
            if (res.success) {
              rtclFilterObj.filters = res.data.filters;
              toastr.success(res.data.message);
            } else {
              toastr.error(res.data);
            }
          },
          error: (e) => {
            console.error(e);
          },
          complete: () => {
            this.$wrap.rtclUnblock();
            this.renderFilterForm(filterId);
          }
        });
      });
      __publicField(this, "renderFilterForm", (filterId) => {
        const filter = rtclFilterObj.filters[filterId];
        const container = this.$('<div class="rtcl-filter-content"><div class="rtcl-filter-items"></div><div class="rtcl-filter-action"><button type="button" class="rtcl-admin-btn primary" id="rtcl-filter-add-item"><span class="dashicons dashicons-plus-alt2"></span></button></div></div>');
        container.data("id", filterId);
        if (filter.items && Array.isArray(filter.items)) {
          filter.items.map((item) => {
            if (rtclFilterObj.items[item.id]) {
              const filterItem = this.$('<div class="rtcl-filter-item" />');
              filterItem.data("id", item.id);
              const label = rtclFilterObj.items[item.id].label;
              const subTitle = '<span class="rtcl-filter-item-sub">' + (item.title || label) + "</span>";
              const itemTitle = this.$('<div class="rtcl-filter-item-title"><div class="rtcl-filter-item-handle">' + this.icons.grip + '</div><div class="rtcl-filter-item-icon"><i class="' + rtclFilterObj.items[item.id].icon + '"></i></div><div class="rtcl-filter-item-body"><span class="rtcl-filter-item-label">' + label + "</span>" + subTitle + "</div></div>");
              const itemControl = this.$('<div class="rtcl-filter-item-control"><a class="rtcl-filter-control-btn rtcl-filter-control-btn-remove" title="' + this.__("Remove", "classified-listing") + '">' + this.icons.trash + "</a></div>");
              const settingItem = rtclFilterObj.items[item.id];
              if (settingItem && settingItem.fields && Array.isArray(settingItem.fields)) {
                itemControl.prepend('<a class="rtcl-filter-control-btn rtcl-filter-control-btn-settings" title="' + this.__("Settings", "classified-listing") + '">' + this.icons.settings + "</a>");
              }
              filterItem.append(itemTitle, itemControl);
              container.find(".rtcl-filter-items").append(filterItem);
            }
          });
          this.$("#rtcl-filter-wrap").html(container);
          this.$("#rtcl-filter-wrap .rtcl-filter-items").sortable({
            handle: ".rtcl-filter-item-handle",
            helper: "clone",
            start: function(event, ui) {
              ui.item.addClass("dragging");
            },
            stop: (event, ui) => {
              ui.item.removeClass("dragging");
              this.updateItemsOrder(filterId);
            }
          });
        }
      });
      __publicField(this, "updateItem", (data, successCallBack, beforeCallBack, errorCallBack) => {
        data.action = "rtcl_admin_settings_filter_update_item";
        data.__rtcl_wpnonce = rtclFilterObj.nonce;
        this.$.ajax({
          url: rtclFilterObj.ajaxurl,
          dataType: "json",
          type: "POST",
          data,
          beforeSend: () => {
            if (beforeCallBack) {
              beforeCallBack();
            }
            this.$wrap.rtclBlock();
          },
          success: (res) => {
            if (res.success) {
              toastr.success(res.data.message);
              if (successCallBack) {
                successCallBack(res);
              }
            } else {
              toastr.error(res.data);
            }
          },
          error: (e) => {
            if (errorCallBack) {
              errorCallBack();
            }
            console.error(e);
          },
          complete: () => {
            this.$wrap.rtclUnblock();
          }
        });
      });
      __publicField(this, "formCheckValidation", ($form) => {
        let counter = 0;
        $form.find(".required").each((index, _item) => {
          const $self = this.$(_item);
          if ($self.val() === "") {
            $self.parent().addClass("invalid");
            counter++;
          }
        });
        if (counter > 0) {
          toastr.error("Some field has incorrect value");
          return false;
        }
        return true;
      });
      this.$ = jQuery;
      this.__ = wp.i18n.__;
      this.$wrap = this.$("#rtcl-filter-settings-wrap");
      this.modal = new RtclModal({ maxWidth: 800 });
    }
  }
  (function($2, window2) {
    const rtclAdminAjaxFilter = new RtclAdminAjaxFilter();
    $2(function() {
      rtclAdminAjaxFilter.init();
      const url = new URL(window2.location.href);
      const current_filter = url.searchParams.get("current_filter");
      if (current_filter) {
        $2(".rtcl-filter-list-wrap a.rtcl-filter-action-wrap[data-id=" + current_filter + "]").trigger("click");
      } else {
        $2(".rtcl-filter-list a.rtcl-filter-action-wrap:first-child").trigger("click");
      }
    });
  })(jQuery, window);
})();
