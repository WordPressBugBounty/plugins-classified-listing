var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function() {
  "use strict";
  class RtclAjaxFilter {
    constructor() {
      __publicField(this, "onLoadUpdateParams", () => {
        var _a;
        const url = new URL(window.location.href);
        if (((_a = this.options) == null ? void 0 : _a.items) && Array.isArray(this.options.items)) {
          const that = this;
          this.options.items.map((_item) => {
            if (_item.id === "price_range") {
              if (url.searchParams.has("filter_price")) {
                let filter_price = decodeURI(url.searchParams.get("filter_price"));
                if (filter_price.includes(",")) {
                  filter_price = filter_price.split(",");
                }
                this.data.params.filter_price = filter_price;
              }
            } else if (_item.id === "radius_filter") {
              if (url.searchParams.has("center_lat")) {
                this.data.params.center_lat = url.searchParams.get("center_lat");
              }
              if (url.searchParams.has("center_lng")) {
                this.data.params.center_lng = url.searchParams.get("center_lng");
              }
              if (url.searchParams.has("geo_address")) {
                this.data.params.geo_address = url.searchParams.get("geo_address");
              }
              if (url.searchParams.has("distance")) {
                this.data.params.distancem = url.searchParams.get("distance");
              }
            } else if (that.withOutFilterPrefix.includes(_item.id)) {
              if (url.searchParams.has(_item.id)) {
                this.data.params[_item.id] = decodeURI(url.searchParams.get(_item.id)).split(",");
              } else {
                if (_item.selected) {
                  that.initLoading = false;
                  this.data.params[_item.id] = Array.isArray(_item.selected) ? _item.selected : url.searchParams.get(_item.selected).split(",");
                  this.addParam(_item.id, this.data.params[_item.id], true);
                }
              }
            } else {
              let foundTerm = null;
              if (["location", "category", "tag"].includes(_item.id) && Array.isArray(rtcl.activeTerms) && rtcl.activeTerms.length && (foundTerm = rtcl.activeTerms.find(
                (element) => element.taxonomy.replace("rtcl_", "") === _item.id
              ))) {
                const filterName = "filter_" + _item.id;
                let terms;
                if (url.searchParams.has(filterName)) {
                  terms = decodeURI(url.searchParams.get(filterName)).split(",");
                  terms.push(foundTerm.term_id);
                  this.addParam(filterName, foundTerm.term_id, true);
                } else {
                  terms = [foundTerm.term_id];
                  this.addParam(filterName, foundTerm.term_id, true);
                }
                this.data.params[filterName] = terms;
              } else {
                const paramName = "filter_" + _item.id;
                if (url.searchParams.has(paramName)) {
                  this.data.params[paramName] = ["checkbox", "radio"].includes(_item.type) ? decodeURI(url.searchParams.get(paramName)).split(",") : url.searchParams.get(paramName);
                } else {
                  if (_item.selected) {
                    that.initLoading = false;
                    if (["checkbox", "radio"].includes(_item.type)) {
                      this.data.params[_item.id] = Array.isArray(_item.selected) ? _item.selected : url.searchParams.get(_item.selected).split(",");
                      this.addParam(_item.id, this.data.params[_item.id], true);
                    } else {
                      this.data.params[_item.id] = url.searchParams.get(_item.selected);
                      this.addParam(_item.id, this.data.params[_item.id]);
                    }
                  } else {
                    if ("ad_type" === _item.id && url.searchParams.has("filters[ad_type]")) {
                      that.initLoading = false;
                      const adType = url.searchParams.get("filters[ad_type]");
                      this.data.params[paramName] = adType;
                      this.addParam(paramName, adType);
                    }
                  }
                }
              }
            }
          });
        }
        if (url.searchParams.has("page")) {
          this.data.params["page"] = url.searchParams.get("page");
        }
        if (url.searchParams.has("orderby")) {
          this.data.params["orderby"] = url.searchParams.get("orderby");
        }
        if (url.searchParams.has("view")) {
          this.data.params["view"] = url.searchParams.get("view");
        }
        if (url.searchParams.has("q")) {
          this.data.params["q"] = url.searchParams.get("q");
        }
        Array.from(url.searchParams).map(([_key, _value]) => {
          if (_key.startsWith("cf_")) {
            _value = decodeURI(url.searchParams.get(_key));
            if (_value.includes(",")) {
              _value = _value.split(",");
            }
            this.data.params[_key] = _value;
          }
        });
        this.renderActiveFilter();
      });
      __publicField(this, "init", () => {
        if (!this.$(this.filterWraperClass).length) {
          return;
        }
        this.onLoadUpdateParams();
        this.handleEvents();
        this.loadAjaxData();
        this.priceRangeSliderInit();
        this.cfRangeSliderInit();
        this.radiusDistanceSliderInit();
        this.dateInit();
        this.loadInitData();
      });
      __publicField(this, "loadInitData", () => {
        if (this.isArchive) {
          this.$(this.archivePaginationClass).remove();
          this.$(this.noListingFoundClass).remove();
        }
        if (this.isTaxArchive) {
          const targetSelector = this.$("body").hasClass("tax-rtcl_category") ? "rtcl-filter_category" : this.$("body").hasClass("tax-rtcl_location") ? "rtcl-filter_location" : this.$("body").hasClass("tax-rtcl_tag") ? "rtcl-filter_tag" : "";
          const $targetSelector = this.$("body").find("." + targetSelector);
          if ($targetSelector.length) {
            const targetOptions = $targetSelector.find(".rtcl-filter-content").data("options");
            if (targetOptions && targetOptions.field_type === "checkbox") {
              const $showAll = this.$('<div class="rtcl-show-all">' + rtclAjaxFilterObj.show_all + "</div>");
              $showAll.on("click", (e) => {
                window.location.replace(rtclAjaxFilterObj.listings_archive_url);
              });
              $targetSelector.append($showAll);
            }
          }
        }
        this.callAjax();
      });
      /**
       * Scrolls the page to the top of the products' container.
       *
       * @function
       */
      __publicField(this, "scrollToTop", () => {
        if (this.$(this.filterContainerClass).hasClass("no-scroll-mode")) {
          return false;
        }
        const scrollTarget = this.$("body .rtclScrollTarget");
        const dataScrollOffset = parseInt(rtclAjaxFilterObj.filter_scroll_offset, 10);
        const scrollOffset = isNaN(dataScrollOffset) ? 50 : dataScrollOffset;
        let targetPosition;
        if (scrollTarget.length) {
          targetPosition = scrollTarget.offset().top - scrollOffset;
        } else {
          targetPosition = this.$(this.filterContainerClass).parent().offset().top - scrollOffset;
        }
        this.smoothScrollTo(targetPosition, 1200);
      });
      __publicField(this, "handleEvents", () => {
        this.$(this.filterContainerClass).on("click", ".rtcl-reset", (e) => {
          e.stopPropagation();
          const $self = this.$(e.currentTarget), $wrap = $self.closest(".rtcl-ajax-filter-item"), $content = $wrap.find(".rtcl-filter-content"), options = $content.data("options");
          if ($wrap.hasClass("rtcl-filter_radius_filter")) {
            $wrap.removeClass("is-active");
            this.reset = true;
            this.$(document).trigger("rtcl_ajax_filter_reset_radius_distance");
            this.$(document).trigger("rtcl_ajax_filter_update_params");
          } else if ($wrap.hasClass("rtcl-filter_price_range")) {
            this.reset = true;
            this.$(document).trigger("rtcl_ajax_filter_reset_price_range");
            this.$(document).trigger("rtcl_ajax_filter_update_params");
          } else if ($wrap.hasClass("rtcl-filter_rating")) {
            $wrap.removeClass("is-active");
            $content.find(".rtcl-filter-ratings-item").removeClass("selected");
            this.removeParam(options.name);
            this.$(document).trigger("rtcl_ajax_filter_update_params");
          } else {
            this.removeParam(options.name);
            $wrap.removeClass("is-active");
            $content.find("input.rtcl-filter-number-field, input.rtcl-filter-date-field, input.rtcl-filter-text-field").val("");
            this.$(document).trigger("rtcl_ajax_filter_update_params");
          }
        }).on("click keydown", ".rtcl-more-less-btn", (e) => {
          if (e.type === "keydown" && e.key !== "Enter") {
            return;
          }
          const $self = this.$(e.currentTarget);
          const $wrap = $self.closest(".rtcl-ajax-filter-data");
          const $filterContent = $self.closest(".rtcl-filter-content");
          const contentOptions = $filterContent.data("options");
          const fieldName = (contentOptions == null ? void 0 : contentOptions.name) || (contentOptions == null ? void 0 : contentOptions.filter_key) || "";
          if ($self.hasClass("active")) {
            $wrap.find(".rtcl-ajax-filter-data-item.hideAble").removeClass("active");
            $self.removeClass("active");
            if (fieldName) {
              this.expandedFields.delete(fieldName);
            }
          } else {
            $wrap.find(".rtcl-ajax-filter-data-item.hideAble").addClass("active");
            $self.addClass("active");
            if (fieldName) {
              this.expandedFields.add(fieldName);
            }
          }
        }).on("keydown", ".rtcl-ajax-filter-data .rtcl-filter-checkbox-label", function(e) {
          if (e.key === "Enter") {
            const inputId = this.getAttribute("for");
            const $input = jQuery("#" + inputId);
            if ($input.length) {
              $input.trigger("click").trigger("change");
            }
          }
        }).on("change", "input.rtcl-filter-checkbox, select.rtcl-filter-select-item", this.handleFilter).on("click", ".rtcl-filter-ratings-item", this.handleFilter).on("click keydown", ".rtcl-ajax-filter-data.filter-list .is-parent.has-sub .rtcl-load-sub-list", (e) => {
          if (e.type === "keydown" && e.key !== "Enter") {
            return;
          }
          this.loadSubListData(e);
        });
        this.$(".rtcl-listings-actions .rtcl-view-switcher a.rtcl-view-trigger", document).on("click", (event) => {
          event.preventDefault();
          const $self = this.$(event.currentTarget);
          const view = $self.data("type") || "list";
          this.addParam("view", view);
          location.replace(location.href);
        });
        this.$("body").off("change", ".rtcl-ordering select.orderby");
        this.$(".rtcl-listings-actions .rtcl-ordering select.orderby", document).off("change").on("change", (event) => {
          const $self = this.$(event.currentTarget);
          const orderBy = $self.val();
          delete this.data.params.page;
          this.removeParam("page");
          if (orderBy) {
            this.data.params.orderby = orderBy;
            this.addParam("orderby", orderBy);
          } else {
            delete this.data.params.orderby;
            this.removeParam("orderby");
          }
          this.$(document).trigger("rtcl_ajax_filter_update_params");
        });
        this.$(document).on("keydown", ".rtcl-ajax-pagination-container .rtcl-ajax-pagination-item.page-item:not(.active)", function(e) {
          if (e.key === "Enter") {
            jQuery(this).trigger("click");
          }
        });
        this.$(document).on("keyup", ".rtcl-ajax-filter-item .rtcl-ajax-filter-text input[type=text]", this.handleFilter).on("keyup", ".rtcl-ajax-filter-item .rtcl-filter-number-field-wrap input[type=number]", this.handleFilter).on("click", ".rtcl-ajax-filter-text .rtcl-clear-text", (e) => {
          const $self = this.$(e.currentTarget), $wrap = $self.closest(".rtcl-ajax-filter-item"), $content = $self.closest(".rtcl-filter-content"), $textField = $self.closest(".rtcl-ajax-filter-text").find("input[type=text]"), options = $content.data("options");
          $wrap.removeClass("is-active");
          $textField.val("");
          const filterName = options.filter_key || options.name;
          if (filterName && this.data.params[filterName]) {
            delete this.data.params[filterName];
            this.$(document).trigger("rtcl_ajax_filter_update_params");
          }
        }).on("click", ".rtcl-ajax-pagination-container .rtcl-ajax-pagination-item.page-item:not(.active)", this.handlePagination).on("click keydown", ".rtcl-active-filters-container .rtcl-clear-filters", (e) => {
          if (e.type === "keydown" && e.key !== "Enter") {
            return;
          }
          this.resetFilter(e);
        }).on("click", ".rtcl-ajax-filter-text-search .rtcl-ajax-filter-search-icon", (e) => {
          this.handleFilter(e);
        }).on("click keydown", ".rtcl-active-filters-container .af-items .afi", (e) => {
          if (e.type === "keydown" && e.key !== "Enter") {
            return;
          }
          this.removeFilterItem(e);
        }).on("click", this.filterTitleWrapClass, (e) => {
          const $self = this.$(e.currentTarget), $wrap = $self.closest(".rtcl-ajax-filter-item"), $content = $wrap.find(".rtcl-filter-content");
          if ($wrap.hasClass("is-open")) {
            $content.slideUp(() => {
              $wrap.removeClass("is-open");
            });
          } else {
            $content.slideDown(() => {
              $wrap.addClass("is-open");
            });
          }
        }).on("rtcl_ajax_filter_update_params", (event, data) => {
          delete this.data.params.page;
          this.removeParam("page");
          this.callAjax();
        }).on("rtcl_ajax_filter_reset", () => {
          this.reset = true;
          this.$(this.filterContainerClass).find("input.rtcl-filter-checkbox").prop("checked", false).end().find("select.rtcl-filter-select-item").val("").end().find("input.rtcl-filter-text-field").val("").closest(".rtcl-ajax-filter-item").removeClass("is-active").end().end().find(".rtcl-geo-address-field input").val("").closest(".rtcl-ajax-filter-item").removeClass("is-active").end().end().find(".rtcl-filter_rating").removeClass("is-active").find(".rtcl-filter-ratings .rtcl-filter-ratings-item").removeClass("selected");
          this.$(".rtcl-filter-text-field", ".rtcl-ajax-filter-date-field", document).val("").closest(".rtcl-ajax-filter-item").removeClass("is-active");
          this.$(".rtcl-number-field-wrap input", document).val("").closest(".rtcl-ajax-filter-item").removeClass("is-active");
          this.$(document).trigger("rtcl_ajax_filter_reset_price_range");
          this.$(document).trigger("rtcl_ajax_filter_reset_radius_distance");
          this.callAjax();
        }).on("rtcl_map_retrieve_geocode", (e, data) => {
          if (data.target) {
            const $target = this.$(data.target);
            const $itemWrap = $target.closest(".rtcl-filter_radius_filter"), $distanceSlider = $itemWrap.find(".rtcl-radius-distance-slider");
            if ($itemWrap.length && $distanceSlider.length) {
              const distance = $distanceSlider[0].noUiSlider.get();
              const _distance = Number(distance);
              const _unit = $distanceSlider.attr("data-unit") || "miles";
              this.data.params = __spreadProps(__spreadValues({}, this.data.params), {
                center_lat: data.lat,
                center_lng: data.lng,
                distance: _distance,
                distance_unit: _unit
              });
              this.addParam("center_lat", data.lat);
              this.addParam("center_lng", data.lng);
              this.addParam("distance", _distance);
              this.addParam("distance_unit", _unit);
              this.addParam("geo_address", data.address);
              $itemWrap.addClass("is-active");
              this.$(document).trigger("rtcl_ajax_filter_update_params", [this.data.params]);
            }
          }
        });
      });
      __publicField(this, "loadSubListData", (e) => {
        e.preventDefault();
        const self = jQuery(e.currentTarget), item = self.closest(".rtcl-ajax-filter-data-item"), parent = self.closest(".rtcl-filter-content"), is_ajax_load = parent.hasClass("rtcl-ajax"), options = parent.data("options") || {}, target = item.find("> .sub-list");
        if (item.hasClass("is-open")) {
          target.slideUp(function() {
            item.removeClass("is-open");
          });
        } else {
          if (is_ajax_load && options.taxonomy && item.hasClass("has-sub") && !item.hasClass("is-loaded")) {
            if (!parent.hasClass("rtcl-loading")) {
              options.parent = item.data("id") || 0;
              options.__rtcl_wpnonce = rtcl.__rtcl_wpnonce;
              options.action = "rtcl_ajax_filter_get_sub_terms_html";
              this.$.ajax({
                url: rtcl.ajaxurl,
                type: "POST",
                dataType: "json",
                data: options,
                beforeSend: () => {
                  parent.rtclBlock();
                },
                success: (response) => {
                  item.append(response.data);
                  parent.rtclUnblock();
                  item.addClass("is-open is-loaded");
                  item.find("> .sub-list").slideDown("slow", function() {
                    jQuery(this).css("display", "flex");
                  });
                },
                complete: () => {
                  parent.rtclUnblock();
                },
                error: (request, status, error) => {
                  console.error(error);
                }
              });
            }
          } else {
            target.slideDown();
            item.addClass("is-open");
          }
        }
      });
      __publicField(this, "loadAjaxData", () => {
        this.$(this.filterContainerClass).find(".rtcl-ajax-filter-item .rtcl-filter-content.rtcl-ajax").each((index, item) => {
          var _a;
          let _self = this.$(item), options = _self.data("options") || {};
          options.action = "rtcl_ajax_filter_get_sub_terms_html";
          options.__rtcl_wpnonce = rtcl.__rtcl_wpnonce;
          if (((_a = rtcl.listing_term) == null ? void 0 : _a.taxonomy) === options.taxonomy && Array.isArray(options.values) && !options.values.includes(rtcl.listing_term.term_id.toString())) {
            options.values.push(rtcl.listing_term.term_id);
          }
          this.$.ajax({
            url: rtcl.ajaxurl,
            type: "POST",
            dataType: "json",
            data: options,
            beforeSend: () => {
              _self.rtclBlock();
            },
            success: (response) => {
              _self.html(response.data).rtclUnblock();
              _self.closest(this.filterContainerClass);
            },
            complete: () => {
              _self.rtclUnblock();
            },
            error: (request, status, error) => {
              _self.rtclUnblock();
              if (status === 500) {
                console.error("Error while adding comment");
              } else if (status === "timeout") {
                console.error("Error: Server doesn't respond.");
              } else ;
            }
          });
        });
      });
      __publicField(this, "addParam", (filterName, value, multiple) => {
        if (!filterName) {
          return;
        }
        if (!value) {
          this.removeParam(filterName);
          return;
        }
        const url = new URL(window.location.href);
        let filterValue = value;
        if (url.searchParams.has(filterName)) {
          let _value = decodeURI(url.searchParams.get(filterName));
          if (multiple) {
            filterValue = Array.from(new Set(_value.split(",")));
            filterValue.push(value);
          }
        }
        this.data.params[filterName] = filterValue;
        url.searchParams.set(filterName, Array.isArray(filterValue) ? filterValue.join(",") : filterValue);
        window.history.pushState("", document.title, url.toString());
      });
      __publicField(this, "removeParam", (filterName, value, multiple) => {
        if (!filterName) {
          return;
        }
        const url = new URL(window.location.href);
        if (!value || !multiple) {
          delete this.data.params[filterName];
          url.searchParams.delete(filterName);
        } else {
          let filterValue = value;
          if (url.searchParams.has(filterName)) {
            let _value = decodeURI(url.searchParams.get(filterName));
            filterValue = Array.from(new Set(_value.split(","))).filter((_i) => _i.toString() !== value.toString());
            if (filterValue.length) {
              this.data.params[filterName] = filterValue;
              url.searchParams.set(filterName, Array.isArray(filterValue) ? filterValue.join(",") : filterValue);
            } else {
              delete this.data.params[filterName];
              url.searchParams.delete(filterName);
            }
          }
        }
        window.history.pushState("", document.title, url.toString());
      });
      __publicField(this, "handleFilter", (event, data) => {
        if (this.reset) {
          return;
        }
        const $self = this.$(event.currentTarget), $wrap = $self.closest(".rtcl-ajax-filter-item"), $targetContainer = $self.closest(".rtcl-filter-content"), options = $targetContainer.data("options"), option_name = options.filter_key || options.name;
        if (event.type === "change") {
          if (option_name) {
            const inputValue = event.currentTarget.value;
            if (event.currentTarget.type === "text") {
              if (inputValue) {
                this.data.params[option_name] = inputValue;
                $wrap.addClass("is-active");
                this.addParam(option_name, inputValue);
              } else {
                delete this.data.params[option_name];
                $wrap.removeClass("is-active");
                this.removeParam(option_name);
              }
            } else if (event.currentTarget.type === "checkbox") {
              const isChecked = event.currentTarget.checked;
              let currentValues = Array.isArray(this.data.params[option_name]) ? this.data.params[option_name].map(String) : this.data.params[option_name] ? [String(this.data.params[option_name])] : [];
              if (isChecked) {
                if (!currentValues.includes(String(inputValue))) {
                  currentValues.push(String(inputValue));
                }
              } else {
                currentValues = currentValues.filter((v) => v !== String(inputValue));
              }
              const url = new URL(window.location.href);
              if (currentValues.length) {
                this.data.params[option_name] = currentValues;
                url.searchParams.set(option_name, currentValues.join(","));
                $wrap.addClass("is-active");
              } else {
                delete this.data.params[option_name];
                url.searchParams.delete(option_name);
                $wrap.removeClass("is-active");
              }
              window.history.pushState("", document.title, url.toString());
            } else {
              if (options && ["radio", "select"].includes(options.field_type)) {
                if (event.currentTarget.checked) {
                  this.addParam(option_name, inputValue);
                } else if ("select" === options.field_type) {
                  if (inputValue) {
                    this.addParam(option_name, inputValue);
                  } else {
                    this.removeParam(option_name);
                  }
                } else {
                  this.removeParam(option_name, inputValue);
                }
              } else {
                this.addParam(option_name, inputValue);
              }
            }
            this.$(document).trigger("rtcl_ajax_filter_update_params");
          }
        } else if (event.type === "keyup") {
          if (event.currentTarget.tagName === "INPUT") {
            if (event.currentTarget.type === "number" && $wrap.find(".rtcl-filter-number-field-wrap").hasClass("min-max")) {
              const $self2 = this.$(event.currentTarget);
              const $wrap2 = $self2.closest(".rtcl-filter-number-field-wrap");
              const maxValue = $wrap2.find("input.max").val() || null;
              const minValue = $wrap2.find("input.min").val() || 0;
              if (event.key === "Enter" || event.keyCode === 13) {
                const _value = [minValue, maxValue];
                this.data.params[option_name] = _value;
                this.addParam(option_name, _value);
                this.$(document).trigger("rtcl_ajax_filter_update_params");
              } else {
                if (minValue || maxValue) {
                  $wrap2.addClass("is-active");
                } else {
                  $wrap2.removeClass("is-active");
                }
              }
            } else {
              const _value = event.currentTarget.value;
              if (event.key === "Enter" || event.keyCode === 13) {
                this.data.params[option_name] = event.currentTarget.value;
                this.addParam(option_name, _value);
                this.$(document).trigger("rtcl_ajax_filter_update_params");
              } else {
                if (_value) {
                  $wrap.addClass("is-active");
                } else {
                  $wrap.removeClass("is-active");
                }
              }
            }
          }
        } else if (event.type === "click") {
          const $self2 = this.$(event.currentTarget);
          if ($self2.hasClass("rtcl-filter-ratings-item")) {
            const rating = parseFloat($self2.data("id"));
            if (!isNaN(rating)) {
              $self2.closest(".rtcl-filter-ratings").find(".rtcl-filter-ratings-item").removeClass("selected");
              $self2.addClass("selected");
              $wrap.addClass("is-active");
              this.addParam(option_name, rating);
              this.$(document).trigger("rtcl_ajax_filter_update_params", [this.data.params]);
            }
          }
          if ($self2.closest(".rtcl-ajax-filter-text-search").length) {
            const $textField = $self2.closest(".rtcl-ajax-filter-text").find("input[type=text]");
            this.addParam(option_name, $textField.val());
            this.$(document).trigger("rtcl_ajax_filter_update_params", [this.data.params]);
          }
        }
      });
      __publicField(this, "dateInit", () => {
        if (this.$.fn.daterangepicker) {
          this.$(".rtcl-filter-date-field", this.$(this.filterWraperClass)).each((_i, _item) => {
            var _a;
            let $input = this.$(_item);
            let options = $input.data("options") || {};
            options = rtclFilter.apply("dateRangePickerOptions", options);
            if (window.innerWidth <= 767) {
              options.opens = options.opens || "center";
              options.drops = options.drops || "auto";
              options.autoApply = (_a = options.autoApply) != null ? _a : false;
            }
            if (Array.isArray(options.invalidDateList) && options.invalidDateList.length) {
              options.isInvalidDate = function(param) {
                return options.invalidDateList.includes(param.format(options.locale.format));
              };
            }
            $input.daterangepicker(options);
            if (options.autoUpdateInput === false) {
              $input.on("apply.daterangepicker", (event, picker) => {
                const $self = this.$(event.currentTarget), $wrap = $self.closest(".rtcl-ajax-filter-item"), $targetContainer = $self.closest(".rtcl-filter-content"), options2 = $targetContainer.data("options"), option_name = options2.name;
                let inputValue;
                if (picker.singleDatePicker) {
                  inputValue = picker.startDate.format(picker.locale.format);
                  $self.val(inputValue);
                } else {
                  inputValue = picker.startDate.format(picker.locale.format) + picker.locale.separator + picker.endDate.format(picker.locale.format);
                  $self.val(inputValue);
                }
                this.addParam(option_name, inputValue);
                this.data.params[option_name] = inputValue;
                $wrap.addClass("is-active");
                this.$(document).trigger("rtcl_ajax_filter_update_params");
              });
              $input.on("cancel.daterangepicker", (event, picker) => {
                this.$(event.currentTarget).val("");
              });
            }
          });
        }
      });
      __publicField(this, "priceRangeSliderInit", () => {
        const priceContainers = this.$(this.filterContainerClass + " .rtcl-price-range-wrap");
        if (!priceContainers.length) {
          return false;
        }
        const $itemWrap = priceContainers.closest(".rtcl-ajax-filter-item");
        priceContainers.each((i, container) => {
          const $container = this.$(container), $priceRangeSlider = $container.find(".rtcl-price-range-slider"), priceRangeSlider = $priceRangeSlider[0], $filterPriceInputWrap = $container.find(".rtcl-range-slider-input-wrap"), $maxPriceInput = $filterPriceInputWrap.find(".rtcl-range-slider-input.max"), $minPriceInput = $filterPriceInputWrap.find(".rtcl-range-slider-input.min");
          const maxPrice = parseInt($priceRangeSlider.attr("data-max"), 10) || 5e4;
          const minPrice = parseInt($priceRangeSlider.attr("data-min"), 10) || 0;
          const currentMaxPrice = parseInt($maxPriceInput.val(), 10) || maxPrice;
          const currentMinPrice = parseInt($minPriceInput.val(), 10) || minPrice;
          const filterStep = parseInt($priceRangeSlider.attr("data-step"), 10) || 1e3;
          noUiSlider.create(priceRangeSlider, {
            range: {
              min: minPrice,
              max: maxPrice
            },
            behaviour: "drag",
            connect: true,
            start: [currentMinPrice, currentMaxPrice],
            step: filterStep
          });
          priceRangeSlider.noUiSlider.on("update", (values, e) => {
            const $targetInput = e === 0 ? $minPriceInput : $maxPriceInput;
            $targetInput.val(Number(values[e]));
          });
          priceRangeSlider.noUiSlider.on("change", (values, e) => {
            if (!this.reset) {
              $itemWrap.addClass("is-active");
              const prices = [Number(values[0]), Number(values[1])];
              this.data.params = __spreadProps(__spreadValues({}, this.data.params), { filter_price: prices });
              this.addParam("filter_price", prices.filter((e2) => e2 === 0 ? true : e2).join(","));
              this.$(document).trigger("rtcl_ajax_filter_update_params", [this.data.params]);
            }
          });
          this.$(document).on("rtcl_ajax_filter_reset_price_range", () => {
            $minPriceInput.val(minPrice).trigger("change");
            $maxPriceInput.val(maxPrice).trigger("change");
            delete this.data.params["filter_price"];
            this.removeParam("filter_price");
            $itemWrap.removeClass("is-active");
          });
          function setSliderValue(index, value) {
            const values = [null, null];
            values[index] = value;
            priceRangeSlider.noUiSlider.set(values);
          }
          $filterPriceInputWrap.find(".rtcl-range-slider-input").on("change", (event) => {
            let value = event.currentTarget.value;
            value = Number(value);
            value = parseInt(value, 10);
            if (isNaN(value) || value < 0) {
              value = 0;
              event.currentTarget.value = value;
            }
            const e = this.$(event.currentTarget).hasClass("min") ? 0 : 1;
            setSliderValue(e, value);
            let values = priceRangeSlider.noUiSlider.get();
            if (!this.reset) {
              const prices = [Number(values[0]), Number(values[1])];
              this.data.params = __spreadProps(__spreadValues({}, this.data.params), { filter_price: prices });
              this.addParam("filter_price", prices.filter((e2) => e2 === 0 ? true : e2).join(","));
              this.$(document).trigger("rtcl_ajax_filter_update_params", [this.data.params]);
            }
          }).on("keydown", function(c) {
            const blockedKeys = ["-", "e", "E", "+"];
            if (blockedKeys.includes(c.key)) {
              c.preventDefault();
              return;
            }
            let values = priceRangeSlider.noUiSlider.get();
            const index = jQuery(this).hasClass("min") ? 0 : 1;
            let value = Number(values[index]);
            const steps = priceRangeSlider.noUiSlider.steps()[index];
            let step;
            switch (c.which) {
              case 13:
                if (this.dirty) {
                  this.dirty = false;
                  this.trigger("change");
                }
                break;
              case 38:
                step = steps[1];
                if (false === step) {
                  step = 1;
                }
                if (null !== step) {
                  this.dirty = true;
                  setSliderValue(index, value + step);
                }
                break;
              case 40:
                step = steps[0];
                if (false === step) {
                  c = 1;
                }
                if (null !== step) {
                  this.dirty = true;
                  setSliderValue(index, value - step);
                }
            }
          }).on("blur", function() {
            if (this.dirty) {
              jQuery(this).trigger("change");
            }
            this.dirty = false;
          }).on("paste", function(e) {
            setTimeout(() => {
              let val = this.value.replace(/[^0-9]/g, "");
              this.value = val;
            }, 0);
          });
        });
      });
      __publicField(this, "cfRangeSliderInit", () => {
        const cfRangeContainers = this.$(".rtcl-cf-range-wrap");
        if (!cfRangeContainers.length) {
          return;
        }
        cfRangeContainers.each((_idx, wrap) => {
          const $wrap = this.$(wrap);
          const sliderEl = $wrap.find(".rtcl-cf-range-slider")[0];
          if (!sliderEl || sliderEl.noUiSlider) {
            return;
          }
          const $itemWrap = $wrap.closest(".rtcl-ajax-filter-item");
          const $inputWrap = $wrap.find(".rtcl-range-slider-input-wrap");
          const $minInput = $inputWrap.find(".rtcl-range-slider-input.min");
          const $maxInput = $inputWrap.find(".rtcl-range-slider-input.max");
          const fieldName = $wrap.data("field-name");
          const min = parseFloat(sliderEl.dataset.min) || 0;
          const max = parseFloat(sliderEl.dataset.max) || 100;
          const step = parseFloat(sliderEl.dataset.step) || 1;
          const curMin = parseFloat($minInput.val()) || min;
          const curMax = parseFloat($maxInput.val()) || max;
          noUiSlider.create(sliderEl, {
            range: { min, max },
            start: [curMin, curMax],
            step,
            connect: true,
            behaviour: "drag"
          });
          sliderEl.noUiSlider.on("update", (values, e) => {
            const $input = e === 0 ? $minInput : $maxInput;
            $input.val(Number(values[e]));
          });
          sliderEl.noUiSlider.on("change", (values) => {
            if (!this.reset) {
              $itemWrap.addClass("is-active");
              const rangeVal = [Number(values[0]), Number(values[1])].join(",");
              this.data.params[fieldName] = rangeVal;
              this.addParam(fieldName, rangeVal);
              this.$(document).trigger("rtcl_ajax_filter_update_params", [this.data.params]);
            }
          });
          $inputWrap.find(".rtcl-range-slider-input").on("change", (event) => {
            const $el = this.$(event.currentTarget);
            const idx = $el.hasClass("min") ? 0 : 1;
            const val = parseFloat(event.currentTarget.value) || (idx === 0 ? min : max);
            const vals = [null, null];
            vals[idx] = val;
            sliderEl.noUiSlider.set(vals);
            if (!this.reset) {
              const current = sliderEl.noUiSlider.get();
              const rangeVal = [Number(current[0]), Number(current[1])].join(",");
              this.data.params[fieldName] = rangeVal;
              this.addParam(fieldName, rangeVal);
              this.$(document).trigger("rtcl_ajax_filter_update_params", [this.data.params]);
            }
          });
          this.$(document).on("rtcl_ajax_filter_reset", () => {
            sliderEl.noUiSlider.set([min, max]);
            $minInput.val(min);
            $maxInput.val(max);
            delete this.data.params[fieldName];
            this.removeParam(fieldName);
            $itemWrap.removeClass("is-active");
          });
        });
      });
      __publicField(this, "radiusDistanceSliderInit", () => {
        const distanceContainers = this.$(this.filterContainerClass + " .rtcl-radius-distance-slider-wrap");
        if (!distanceContainers.length) {
          return false;
        }
        const $itemWrap = distanceContainers.closest(".rtcl-ajax-filter-item");
        distanceContainers.each((i, container) => {
          const $container = this.$(container), $distanceSlider = $container.find(".rtcl-radius-distance-slider"), distanceSlider = $distanceSlider[0];
          $container.find(".rtcl-radius-distance-input");
          const rangeDefault = parseInt($distanceSlider.attr("data-default"), 10) || 30, currentDistance = parseInt($distanceSlider.attr("data-current"), 10) || rangeDefault, rangeMax = parseInt($distanceSlider.attr("data-max"), 10) || 300, rangeMin = parseInt($distanceSlider.attr("data-min"), 10) || 0, rangeStep = parseInt($distanceSlider.attr("data-step"), 10) || 5, rangeUnit = $distanceSlider.attr("data-unit") || "miles";
          noUiSlider.create(distanceSlider, {
            range: {
              min: rangeMin,
              max: rangeMax
            },
            behaviour: "drag",
            connect: [true, false],
            start: currentDistance,
            step: rangeStep
          });
          distanceSlider.noUiSlider.on("change", (values, index) => {
            if (!this.reset && this.data.params.center_lat && this.data.params.center_lng) {
              $itemWrap.addClass("is-active");
              const distance = Number(values[index]);
              this.data.params = __spreadProps(__spreadValues({}, this.data.params), { distance, distance_unit: rangeUnit });
              this.addParam("distance", distance);
              this.addParam("distance_unit", rangeUnit);
              this.$(document).trigger("rtcl_ajax_filter_update_params", [this.data.params]);
            }
          });
          distanceSlider.noUiSlider.on("update", (values, index) => {
            const value = Number(values[index]);
            $container.find(".rtcl-range-value").text(value);
          });
          this.$(document).on("rtcl_ajax_filter_reset_radius_distance", () => {
            delete this.data.params["distance"];
            delete this.data.params["distance_unit"];
            delete this.data.params["center_lat"];
            delete this.data.params["center_lng"];
            delete this.data.params["geo_address"];
            this.removeParam("distance");
            this.removeParam("distance_unit");
            this.removeParam("center_lat");
            this.removeParam("center_lng");
            this.removeParam("geo_address");
            $itemWrap.find(".rtcl-geo-address-input").val("");
            $itemWrap.removeClass("is-active");
            distanceSlider.noUiSlider.set([rangeDefault, null]);
          });
        });
      });
      __publicField(this, "callAjax", () => {
        const $filterWrap = this.$(this.filterWraperClass);
        const $listingWrap = this.$(this.listingsContainerClass);
        this.$.ajax({
          type: "POST",
          url: rtcl.ajaxurl,
          data: this.data,
          beforeSend: () => {
            $filterWrap.rtclBlock();
            $listingWrap.rtclBlock();
          },
          success: (res) => {
            if (res.success) {
              this.data.params.page = res.data.pagination.current_page;
              this.renderData(__spreadProps(__spreadValues({}, res.data), { actionData: this.data }));
              delete this.data.filterData.initLoad;
            }
          },
          error: (jqXHR, exception, error) => {
            console.error(error);
          },
          complete: () => {
            $filterWrap.rtclUnblock();
            $listingWrap.rtclUnblock();
            this.reset = false;
            this.initLoading = false;
          }
        });
      });
      __publicField(this, "removeFilterItem", (event) => {
        const $self = this.$(event.currentTarget), itemId = $self.data("item-id"), filterName = $self.data("filter-name"), filterValue = $self.data("filter-value"), $item = this.withOutFilterPrefix.includes(itemId) ? this.$(".rtcl-ajax-filter-item.rtcl-" + itemId) : this.$(".rtcl-ajax-filter-item.rtcl-filter_" + itemId), $container = $item.find(".rtcl-filter-content"), options = $container.data("options");
        if (!$item.length) {
          return;
        }
        let needToTrigger = false;
        if ("price_range" === itemId) {
          this.removeParam("filter_price");
          this.reset = true;
          this.$(document).trigger("rtcl_ajax_filter_reset_price_range");
          needToTrigger = true;
        } else if ("radius_filter" === itemId) {
          this.removeParam("distance");
          this.removeParam("center_lat");
          this.removeParam("center_lng");
          this.removeParam("geo_address");
          this.reset = true;
          this.$(document).trigger("rtcl_ajax_filter_reset_radius_distance");
          needToTrigger = true;
        } else if ("rating" === itemId) {
          this.removeParam(filterName);
          $item.removeClass("is-active");
          $item.find(".rtcl-filter-ratings-item").removeClass("selected");
          needToTrigger = true;
        } else {
          if (options) {
            if (["checkbox", "radio"].includes(options.field_type)) {
              this.removeParam(filterName, filterValue, true);
              $item.find('input[value="' + filterValue + '"]').prop("checked", false);
            } else {
              if (options.field_type === "number") {
                this.removeParam(filterName);
                $item.removeClass("is-active");
                $item.find("input.rtcl-filter-number-field").val("");
              } else {
                this.removeParam(filterName);
                $item.find('input[name="' + filterName + '"], select[name="' + filterName + '"]').val("");
                $item.removeClass("is-active");
              }
            }
            needToTrigger = true;
          }
        }
        if (needToTrigger) {
          delete this.data.params.page;
          this.removeParam("page");
          this.$(document).trigger("rtcl_ajax_filter_update_params");
        }
      });
      __publicField(this, "resetFilter", () => {
        const that = this;
        const view = this.data.params.view;
        this.data.params = {};
        if (view) {
          this.data.params.view = view;
        }
        const url = new URL(window.location.href);
        if (this.options.items && Array.isArray(this.options.items)) {
          this.options.items.map((_item) => {
            if (_item.id === "price_range") {
              url.searchParams.delete("filter_price");
            } else if (_item.id === "radius_filter") {
              url.searchParams.delete("center_lat");
              url.searchParams.delete("center_lng");
              url.searchParams.delete("geo_address");
              url.searchParams.delete("distance");
            } else {
              const paramName = that.withOutFilterPrefix.includes(_item.id) ? _item.id : "filter_" + _item.id;
              url.searchParams.delete(paramName);
            }
          });
        }
        url.searchParams.delete("page");
        url.searchParams.delete("orderby");
        url.searchParams.delete("q");
        Array.from(url.searchParams).map(([_key]) => {
          if (_key.startsWith("cf_")) {
            url.searchParams.delete(_key);
          }
        });
        window.history.pushState("", document.title, url.toString());
        this.$(document).trigger("rtcl_ajax_filter_reset");
      });
      __publicField(this, "handlePagination", (e) => {
        let target;
        if (e.target.tagName === "SPAN") {
          target = e.target.parentNode;
        } else {
          target = e.target;
        }
        const pageNumber = this.$(target).data("id") || 1;
        this.data.params["page"] = pageNumber;
        this.addParam("page", pageNumber);
        this.scrollToTop();
        this.callAjax();
      });
      __publicField(this, "renderData", (data) => {
        this.renderActiveFilter(data.active_filters);
        this.renderCfFilterItems(data.cf_items);
        this.renderListings(data.listings);
        this.renderPagination(data.pagination);
        this.renderResultCount(data.pagination);
        this.$(document).trigger("rtcl_ajax_filter_after_render", [data]);
      });
      __publicField(this, "renderListings", (listings) => {
        if (this.isArchive && this.initLoading && !this.$(this.resultWrapClass).length) {
          return;
        }
        let $wrap = this.$(document).find(this.listingsContainerClass);
        if (!$wrap.length && this.$(this.resultWrapClass).length) {
          $wrap = this.$('<div class="rtcl-ajax-listings"></div>');
          this.$(this.resultWrapClass).append($wrap);
        }
        if (!listings) {
          $wrap.addClass("no-listing-found");
          listings = this.$('<div class="rtcl-info no-listing-found"></div>');
          listings.text(rtclAjaxFilterObj.no_result_found);
        } else {
          $wrap.removeClass("no-listing-found");
        }
        $wrap.html(listings);
      });
      __publicField(this, "renderCfFilterItems", (cfItems) => {
        if (this.initLoading) {
          return;
        }
        const cfWrap = this.$(this.cfWrapperClass);
        cfWrap.empty();
        if (cfItems && Array.isArray(cfItems) && cfWrap.length) {
          cfItems.map((_cfItem) => {
            cfWrap.append(this.$(_cfItem.html));
          });
          this.restoreExpandedState();
          this.restoreCfCheckedState();
          this.dateInit();
          this.cfRangeSliderInit();
        }
      });
      __publicField(this, "restoreExpandedState", () => {
        if (!this.expandedFields.size) {
          return;
        }
        this.$(this.cfWrapperClass).find(".rtcl-filter-content").each((_, el) => {
          const $content = this.$(el);
          const options = $content.data("options");
          const fieldName = (options == null ? void 0 : options.name) || (options == null ? void 0 : options.filter_key) || "";
          if (fieldName && this.expandedFields.has(fieldName)) {
            $content.find(".rtcl-ajax-filter-data-item.hideAble").addClass("active");
            $content.find(".rtcl-more-less-btn").addClass("active");
          }
        });
      });
      __publicField(this, "restoreCfCheckedState", () => {
        this.$(this.cfWrapperClass).find(".rtcl-filter-content").each((_, el) => {
          const $content = this.$(el);
          const options = $content.data("options");
          if (!options) return;
          const fieldName = options.filter_key || options.name || "";
          if (!fieldName || !this.data.params.hasOwnProperty(fieldName)) return;
          const paramValue = this.data.params[fieldName];
          const values = Array.isArray(paramValue) ? paramValue.map(String) : [String(paramValue)];
          const $checkboxes = $content.find('input.rtcl-filter-checkbox[type="checkbox"]');
          if ($checkboxes.length) {
            values.forEach((val) => {
              $checkboxes.filter('[value="' + val + '"]').prop("checked", true);
            });
            if (values.length) {
              $content.closest(".rtcl-ajax-filter-item").addClass("is-active");
            }
          } else if (["radio"].includes(options.field_type)) {
            values.forEach((val) => {
              $content.find('input[value="' + val + '"]').prop("checked", true);
            });
            if (values.length) {
              $content.closest(".rtcl-ajax-filter-item").addClass("is-active");
            }
          } else if (options.field_type === "select") {
            $content.find("select.rtcl-filter-select-item").val(paramValue);
            if (paramValue) {
              $content.closest(".rtcl-ajax-filter-item").addClass("is-active");
            }
          }
        });
      });
      __publicField(this, "renderActiveFilter", (filters) => {
        const $filterContainer = this.$('<div class="rtcl-active-filters-container"></div>');
        if (filters && Array.isArray(filters) && filters.length) {
          const $filterWrap = this.$('<div class="rtcl-active-filters-wrap"></div>');
          const $filters = this.$('<div class="rtcl-active-filters"></div>');
          filters.map((_filter) => {
            const $filter = this.$('<div class="rtcl-active-filter"><div class="af-name"></div><div class="af-items"></div></div>');
            $filter.find(".af-name").text(_filter.label);
            Object.keys(_filter.selected).map((_id) => {
              const $item = this.$('<div class="afi" tabindex="0"><span class="rtcl-remove-filter"><i class="remove-icon"></i></span></div>');
              $item.attr("data-item-id", _filter.itemId);
              $item.attr("data-filter-name", _filter.id);
              $item.attr("data-filter-value", _id);
              $item.prepend(document.createTextNode(_filter.selected[_id]));
              $filter.find(".af-items").append($item);
            });
            $filters.append($filter);
          });
          const $restBtn = this.$('<div class="rtcl-clear-filters" tabindex="0"><span class="icon-wrap"><i class="rtcl-icon rtcl-icon-trash"></i></span><span></span></div>');
          $restBtn.find("span:last").text(rtclAjaxFilterObj.clear_all_filter);
          $filterWrap.append($filters, $restBtn);
          $filterContainer.append($filterWrap);
        }
        const $container = this.$(document).find(".rtcl-active-filters-container");
        if ($container.length) {
          $container.replaceWith($filterContainer);
        } else {
          if (this.$(this.listingsContainerClass).length) {
            $filterContainer.insertBefore(this.$(this.listingsContainerClass));
          } else if (this.$(this.resultWrapClass).length) {
            $filterContainer.insertBefore(this.$(this.resultWrapClass).find(".rtcl-listings"));
          }
        }
      });
      __publicField(this, "range", (start, end) => {
        let length = end - start + 1;
        return Array.from({ length }, (_, idx) => idx + start);
      });
      __publicField(this, "getPageNumberArray", (currentPage, pages) => {
        const totalPageCount = pages;
        const siblingCount = 1;
        const totalPageNumbers = siblingCount + 5;
        const DOTS = "...";
        if (totalPageNumbers >= totalPageCount) {
          return this.range(1, totalPageCount);
        }
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
          currentPage + siblingCount,
          totalPageCount
        );
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;
        if (!shouldShowLeftDots && shouldShowRightDots) {
          let leftItemCount = 3 + 2 * siblingCount;
          let leftRange = this.range(1, leftItemCount);
          return [...leftRange, DOTS, totalPageCount];
        }
        if (shouldShowLeftDots && !shouldShowRightDots) {
          let rightItemCount = 3 + 2 * siblingCount;
          let rightRange = this.range(
            totalPageCount - rightItemCount + 1,
            totalPageCount
          );
          return [firstPageIndex, DOTS, ...rightRange];
        }
        if (shouldShowLeftDots && shouldShowRightDots) {
          let middleRange = this.range(leftSiblingIndex, rightSiblingIndex);
          return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
      });
      __publicField(this, "renderPagination", (data) => {
        const $paginationContainer = this.$('<div class="rtcl-ajax-pagination-container"></div>');
        if (data && data.pages > 1) {
          const pages = this.getPageNumberArray(data.current_page, data.pages);
          const $paginationWrap = this.$('<div class="rtcl-ajax-pagination-wrap"></div>');
          const $pagination = this.$('<ul class="rtcl-ajax-pagination"></ul>');
          pages.map((i, index) => {
            let $pageItem;
            if (i === "...") {
              $pageItem = this.$('<li class="rtcl-ajax-pagination-item dots"><span>&#8230;</span></li>');
            } else {
              $pageItem = this.$('<li class="rtcl-ajax-pagination-item page-item" data-id="' + i + '"><span>' + i + "</span></li>");
              if (i === data.current_page) {
                $pageItem.addClass("active").attr("aria-current", "page");
              } else {
                $pageItem.attr("tabindex", "0");
              }
            }
            $pagination.append($pageItem);
          });
          $paginationWrap.append($pagination);
          $paginationContainer.append($paginationWrap);
        }
        const $container = this.$(document).find(".rtcl-ajax-pagination-container");
        if ($container.length) {
          $container.replaceWith($paginationContainer);
        } else {
          if (this.$(this.listingsContainerClass).length) {
            $paginationContainer.insertAfter(this.$(this.listingsContainerClass));
          } else if (this.$(this.resultWrapClass).length) {
            $paginationContainer.insertAfter(this.$(this.resultWrapClass).find(this.listingsContainerClass));
          }
        }
      });
      __publicField(this, "renderResultCount", (data) => {
        const $listingResultWrap = this.$(".rtcl-listings-actions");
        if (!$listingResultWrap.length) {
          return;
        }
        const $resultCount = $listingResultWrap.find(".rtcl-result-count");
        $resultCount.attr("data-options", JSON.stringify({
          items: data.items
        }));
        if (!data.current_items || data.items <= data.per_page) {
          $resultCount.text(rtclAjaxFilterObj.result_count.all.replace("%", data.items));
        } else {
          const fromCount = (data.current_page - 1) * data.per_page;
          let showing = `${fromCount + 1}–${fromCount + data.current_items}`;
          $resultCount.text(rtclAjaxFilterObj.result_count.part.replace("_", showing).replace("%", data.items));
        }
      });
      /**
       * Smoothly scrolls the page to a specified target position.
       *
       * @param {number} targetPosition - The target scroll position to scroll to.
       * @param {number} duration       - The duration of the smooth scrolling animation in milliseconds.
       */
      __publicField(this, "smoothScrollTo", (targetPosition, duration) => {
        const start = window.scrollY || window.pageYOffset;
        const startTime = "now" in window.performance ? performance.now() : (/* @__PURE__ */ new Date()).getTime();
        function easeInOutExpo(x) {
          return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;
        }
        function scrollAnimation(currentTime) {
          const timeElapsed = currentTime - startTime;
          const scrollProgress = Math.min(1, timeElapsed / duration);
          const easedProgress = easeInOutExpo(scrollProgress);
          window.scrollTo(0, start + (targetPosition - start) * easedProgress);
          if (scrollProgress < 1) {
            requestAnimationFrame(scrollAnimation);
          }
        }
        requestAnimationFrame(scrollAnimation);
      });
      var _a, _b;
      this.$ = jQuery;
      this.filterWraperClass = ".rtcl-widget-ajax-filter-wrapper";
      this.filterContainerClass = ".rtcl-ajax-filter-wrap";
      this.filterTitleWrapClass = ".rtcl-filter-title-wrap";
      this.resultWrapClass = ".rtcl-ajax-filter-result-wrap";
      this.listingsContainerClass = ".rtcl-ajax-listings";
      this.archivePaginationClass = ".rtcl-pagination";
      this.noListingFoundClass = ".no-listing-found";
      this.cfWrapperClass = ".rtcl-ajax-filter-cf-wrap";
      this.options = this.$(this.filterWraperClass).data("options");
      this.isTaxArchive = this.$("body").hasClass("tax-rtcl_category") || this.$("body").hasClass("tax-rtcl_location") || this.$("body").hasClass("tax-rtcl_tag");
      this.isListingArchive = this.$("body").hasClass("post-type-archive-rtcl_listing");
      this.isStoreSingle = this.$("body").hasClass("single-store");
      this.isArchive = this.isListingArchive || this.isTaxArchive || this.isStoreSingle;
      this.store_id = this.$("body.single-store").find("#rtcl_store_id").val();
      this.initLoading = true;
      this.withOutFilterPrefix = ["directory"];
      this.expandedFields = /* @__PURE__ */ new Set();
      this.reset = false;
      this.data = {
        filterData: __spreadProps(__spreadValues({}, this.options), { itemKeys: (_b = (_a = this.options) == null ? void 0 : _a.items) == null ? void 0 : _b.map((_i) => _i.id), initLoad: true }),
        params: {},
        is_listings: rtcl.is_listings,
        is_listing: rtcl.is_listing,
        listing_term: rtcl.listing_term,
        rtcl_store_id: this.store_id,
        activeTerms: rtcl.active_terms || [],
        hasMap: this.$(".rtcl-map-view").length ? 1 : "",
        action: "rtcl_ajax_filter_load_data",
        __rtcl_wpnonce: rtcl.__rtcl_wpnonce
      };
    }
  }
  (function($) {
    $(document).on("submit", "#rtcl-user-profile-settings", function(e) {
      e.preventDefault();
      const $form = $(this), targetBtn = $form.find("button[type=submit]"), responseHolder = $form.find(".rtcl-response"), msgHolder = $("<div class='alert'></div>"), fromData = new FormData(this);
      fromData.append("action", "rtcl_update_profile_settings");
      fromData.append("__rtcl_wpnonce", rtcl.__rtcl_wpnonce);
      $.ajax({
        url: rtcl.ajaxurl,
        data: fromData,
        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        type: "POST",
        beforeSend: function() {
          $form.addClass("rtcl-loading");
          targetBtn.prop("disabled", true);
          responseHolder.html("");
          $(
            '<span class="rtcl-icon-spinner animate-spin"></span>'
          ).insertAfter(targetBtn);
        },
        success: function(response) {
          targetBtn.prop("disabled", false).next(".rtcl-icon-spinner").remove();
          $form.removeClass("rtcl-loading");
          if (response.success) {
            msgHolder.removeClass("alert-danger").addClass("alert-success").html(response.data.message).appendTo(responseHolder);
            setTimeout(function() {
              responseHolder.html("");
            }, 1e3);
          } else {
            msgHolder.removeClass("alert-success").addClass("alert-danger").html(response.data.error).appendTo(responseHolder);
          }
        },
        error: function(e2) {
          msgHolder.removeClass("alert-success").addClass("alert-danger").html(e2.responseText).appendTo(responseHolder);
          targetBtn.prop("disabled", false).next(".rtcl-icon-spinner").remove();
          $form.removeClass("rtcl-loading");
        }
      });
    });
    $("body").on("init", "#rating", function() {
      $(".single-rtcl_listing #rating").hide().before(
        '<p class="stars"><span><a class="star-1" href="#">1</a><a class="star-2" href="#">2</a><a class="star-3" href="#">3</a><a class="star-4" href="#">4</a><a class="star-5" href="#">5</a></span></p>'
      );
    }).on("click", "#respond p.stars a", function() {
      var $star = $(this), $rating = $star.closest("#respond").find("#rating"), ratingWrap = $rating.parent(".form-group"), $container = $star.closest(".stars");
      $rating.val($star.text());
      $star.siblings("a").removeClass("active");
      $star.addClass("active");
      $container.addClass("selected");
      ratingWrap.removeClass("has-danger");
      ratingWrap.find(".with-errors").remove();
      return false;
    }).on("change", ".rtcl-ordering select.orderby", function() {
      $(this).closest("form").submit();
    }).on("click", ".rtcl-animate", function(e) {
      e.preventDefault();
      const position = $($(this).attr("href")).offset();
      $("html,body").stop().animate({ scrollTop: position.top - 120 }, 500);
    }).on("input", ".rtcl-password", function() {
      var pass_input = $(this), pass = pass_input.val(), element_wrap = pass_input.closest(".rtcl-user-pass-wrap"), pass_status_wrap = element_wrap.next(
        ".rtcl-pass-strength-result"
      ), result, strength, missing, barWidth, cls, html;
      if (!pass_status_wrap.length) {
        pass_status_wrap = $(
          '<div class="rtcl-pass-strength-result" />'
        );
        element_wrap.after(pass_status_wrap);
      }
      pass_status_wrap.removeClass("short bad good strong empty");
      if (!pass || "" === pass.trim()) {
        pass_status_wrap.addClass("empty").html("&nbsp;");
        return;
      }
      result = rtclCheckPasswordStrength(pass);
      strength = result.strength;
      missing = result.missing;
      barWidth = strength / 5 * 100;
      if (strength <= 2) {
        cls = "bad";
      } else if (strength <= 4) {
        cls = "good";
      } else {
        cls = "strong";
      }
      html = '<div class="rtcl-pass-bar"><span style="width:' + barWidth + '%"></span></div>';
      if (missing.length) {
        html += '<div class="rtcl-pass-hints">' + rtcl_validator.pwsL10n.hint_missing + " " + missing.join(", ") + "</div>";
      }
      pass_status_wrap.addClass(cls).html(html);
    }).on("click", ".rtcl-toggle-pass", function(e) {
      e.preventDefault();
      e.stopPropagation();
      const $_self = $(this);
      const $_input = $_self.closest(".rtcl-user-pass-wrap").find("input");
      const isOff = $_self.hasClass("rtcl-icon-eye-off");
      if (!$_input.length) {
        return;
      }
      if (isOff) {
        $_input.attr("type", "text");
        $_self.removeClass("rtcl-icon-eye-off").addClass("rtcl-icon-eye");
      } else {
        $_input.attr("type", "password");
        $_self.removeClass("rtcl-icon-eye").addClass("rtcl-icon-eye-off");
      }
    }).on("input focusout", ".confirm-password-wrap input", function() {
      const $confirm_input = $(this);
      setTimeout(function() {
        let valid = $confirm_input.attr("aria-invalid") !== void 0 && $confirm_input.attr("aria-invalid") != "true";
        const $element_wrap = $confirm_input.closest(".confirm-password-wrap");
        const $checkmark = $element_wrap.find(".rtcl-checkmark");
        $checkmark.toggle($confirm_input.val().length > 0 && valid);
      }, 100);
    }).on("click", ".rtcl-renew-btn", function(e) {
      e.preventDefault();
      var $self = $(this);
      var listingId = $self.data("id") || 0;
      if (!listingId) {
        toastr.error(rtcl_store.lng.error);
        return false;
      }
      var parentWrap = $self.parents(".rtcl-listing-item");
      if (confirm(rtcl.confirm_text)) {
        $.ajax({
          url: rtcl.ajaxurl,
          type: "POST",
          data: {
            listingId,
            __rtcl_wpnonce: rtcl.__rtcl_wpnonce,
            action: "rtcl_ajax_renew_listing"
          },
          beforeSend: function() {
            parentWrap.rtclBlock();
          },
          success: function(res) {
            if (res.success) {
              $self.slideUp();
              parentWrap.find(".rtcl-status-wrap .rtcl-status").html(res.data.status);
              parentWrap.find(".rtcl-expire-wrap .rtcl-expire").html(res.data.expire_at);
              toastr.success(res.data.message);
            } else {
              toastr.error(res.data);
            }
            parentWrap.rtclUnblock();
          },
          error: function(e2) {
            parentWrap.rtclUnblock();
            toastr.error("Server Error.");
          }
        });
      }
      return false;
    });
    $("#rating").trigger("init");
    $("#rtcl-toggle-filter-mobile").on("click", function(e) {
      e.preventDefault();
      let $this = $(this), $filter = $this.closest(".rtcl-widget-filter-wrapper").find(".rtcl-widget-filter-class");
      $filter.toggle();
    });
    $(document).on("click", "#rtcl-resend-verify-link", function(e) {
      e.preventDefault();
      if (confirm(rtcl.re_send_confirm_text)) {
        let login = $(this).data("login"), parent = $(this).parent();
        $.ajax({
          url: rtcl.ajaxurl,
          data: {
            action: "rtcl_resend_verify",
            user_login: login,
            __rtcl_wpnonce: rtcl.__rtcl_wpnonce
          },
          type: "POST",
          dataType: "JSON",
          beforeSend: function() {
            parent.rtclBlock();
          },
          success: function(response) {
            parent.rtclUnblock();
            alert(response.data.message);
          },
          error: function(e2) {
            parent.rtclUnblock();
            alert("Server Error!!!");
          }
        });
      }
      return false;
    });
    $(document).on("click", function(e) {
      let $container = $(".rtcl-ai-search-result-container");
      if (!$container.is(e.target) && $container.has(e.target).length === 0 && !$(e.target).closest(".rtcl-ai-quick-search").length) {
        $container.slideUp(300);
      }
    });
    $(document).on("click", ".rtcl-tab-nav li a", function(e) {
      e.preventDefault();
      var tabId = $(this).data("target"), $li = $(this).closest("li");
      $li.addClass("active").siblings().removeClass("active");
      $("#" + tabId).addClass("active").siblings(".rtcl-tab-pane").removeClass("active");
    });
    $(document).on("click", ".rtcl-ai-quick-search-inner", function() {
      let $this = $(this), $wrapper = $this.closest(".rtcl-ai-search-field"), $resultWrap = $wrapper.next(".rtcl-ai-search-result-container"), keyword = $wrapper.find("input[name='q']").val();
      let data = {
        action: "rtcl_ai_quick_search",
        __rtcl_wpnonce: rtcl.__rtcl_wpnonce,
        keyword
      };
      $.ajax({
        url: rtcl.ajaxurl,
        data,
        type: "POST",
        dataType: "JSON",
        beforeSend: function() {
          $resultWrap.addClass("loading");
          $resultWrap.find(".rtcl-ai-search-result-header h4").text(rtcl.i18n.ai_quick_search_loading);
          $resultWrap.find(".rtcl-ai-search-result-content").html("");
          $resultWrap.slideDown(250);
          $this.css("cursor", "wait");
        },
        success: function(res) {
          $this.css("cursor", "pointer");
          if (res.success) {
            $resultWrap.find(".rtcl-ai-search-result-header h4").text(rtcl.i18n.ai_quick_search_heading + keyword);
            $resultWrap.find(".rtcl-ai-search-result-content").html(res.data.html);
          } else {
            $resultWrap.find(".rtcl-ai-search-result-header h4").text(res.data.message);
          }
          $resultWrap.removeClass("loading");
        },
        error: function(e) {
          $this.css("cursor", "pointer");
          $resultWrap.removeClass("loading");
          $resultWrap.find(".rtcl-ai-search-result-header h4").text(e.errorText);
        }
      });
    });
    $(document).on("click", ".rtcl-payment-table-wrap .rtcl-payment-popup-link", function(e) {
      e.preventDefault();
      let $this = $(this), $wrapper = $this.closest(".rtcl-payment-history-wrap"), $popupWrapper = $wrapper.find(".rtcl-popup-wrapper"), orderId = $this.data("order-id");
      let data = {
        action: "rtcl_payment_details_popup",
        __rtcl_wpnonce: rtcl.__rtcl_wpnonce,
        order_id: orderId
      };
      $.ajax({
        url: rtcl.ajaxurl,
        data,
        type: "POST",
        dataType: "JSON",
        beforeSend: function() {
          $popupWrapper.animate({ opacity: 0 }, 10);
          $popupWrapper.removeClass("show");
        },
        success: function(response) {
          if (response.success) {
            $popupWrapper.find(".rtcl-popup-body").html(response.data.html);
            $popupWrapper.animate({ opacity: 1 }, 300);
            $popupWrapper.addClass("show");
          }
        },
        error: function(e2) {
          console.log(e2.errorText);
        }
      });
    }).on("click", "#rtcl-report-abuse-modal-link", function(e) {
      e.preventDefault();
      let $this = $(this), $wrapper = $this.closest(".single-listing-custom-fields-action"), $popupWrapper = $wrapper.find("#rtcl-report-abuse-modal");
      if ($popupWrapper.length) {
        $("#rtcl-report-abuse-message").val("");
        $("#rtcl-report-abuse-message-display").html("");
        $popupWrapper.animate({ opacity: 1 }, 300);
        $popupWrapper.addClass("show");
      }
    }).on("click", ".rtcl-popup-close", function(e) {
      e.preventDefault();
      let $wrapper = $(this).closest(".rtcl-popup-wrapper");
      $wrapper.animate({ opacity: 0 }, 300);
      setTimeout(function() {
        $wrapper.removeClass("show");
      }, 500);
    }).on("click", ".rtcl-MyAccount-open-menu", function(e) {
      e.preventDefault();
      let $this = $(this), $navWrapper = $(".rtcl-MyAccount-navigation"), $contentWrapper = $(".rtcl-MyAccount-content"), $html = '<div class="sidebar-menu-opened"></div>';
      if ($this.hasClass("sidebar-open")) {
        $navWrapper.css("left", "-350px");
        $contentWrapper.find(".sidebar-menu-opened").remove();
      } else {
        $navWrapper.css("left", "0");
        $contentWrapper.prepend($html);
      }
      $this.toggleClass("sidebar-open");
    }).on("click", ".rtcl-MyAccount-content .sidebar-menu-opened", function(e) {
      let $navWrapper = $(".rtcl-MyAccount-navigation"), $collapseButton = $(".rtcl-MyAccount-open-menu");
      $navWrapper.css("left", "-350px");
      $(this).remove();
      $collapseButton.removeClass("sidebar-open");
    }).on("click", ".rtcl-ajax-filter-floating-mobile .rtcl-ajax-filter-open-filter", function(e) {
      e.preventDefault();
      let $this = $(this), $floatingWrapper = $this.closest(".rtcl-ajax-filter-floating-mobile"), $mainWrapper = $floatingWrapper.closest(".rtcl-widget-ajax-filter-wrapper"), $filterWrapper = $mainWrapper.find(".rtcl-widget-ajax-filter-class"), $body = $("body"), $html = '<div class="sidebar-ajax-filter-opened"></div>';
      if ($mainWrapper.hasClass("sidebar-filter-open")) {
        $filterWrapper.css("left", "-265px");
        $body.find(".sidebar-ajax-filter-opened").remove();
      } else {
        $filterWrapper.css("left", "0");
        $body.prepend($html);
      }
      $mainWrapper.toggleClass("sidebar-filter-open");
    }).on("click", ".sidebar-ajax-filter-opened", function(e) {
      e.preventDefault();
      let $filterWrapper = $(".rtcl-widget-ajax-filter-class"), $wrapper = $(".rtcl-widget-ajax-filter-wrapper");
      $filterWrapper.css("left", "-265px");
      $(this).remove();
      $wrapper.removeClass("sidebar-filter-open");
    }).on("submit", ".rtcl-my-listings-search-form form", function(e) {
      e.preventDefault();
      my_account_listings_ajax();
    }).on("change", "#rtcl-my-listings-directory", function() {
      my_account_listings_ajax();
    }).on("change", "#rtcl-my-listings-status", function() {
      my_account_listings_ajax();
    }).on("click", ".rtcl-my-listings-content .rtcl-pagination a", function(e) {
      e.preventDefault();
      let $this = $(this), $wrapper = $this.closest(".rtcl-my-listings-content"), currentPage = parseInt($wrapper.find(".current").text()) || 1, page;
      if ($this.hasClass("next")) {
        page = currentPage + 1;
      } else if ($this.hasClass("prev")) {
        page = currentPage - 1;
      } else {
        page = parseInt($this.text());
      }
      if (page < 1) {
        page = 1;
      }
      my_account_listings_ajax(page);
    }).on("click", ".rtcl-my-listing-table .rtcl-actions-wrap .actions-dot", function(e) {
      $(".rtcl-my-listing-table").find(".rtcl-actions").removeClass("opened").addClass("closed");
      $(this).closest(".rtcl-actions-wrap").find(".rtcl-actions").removeClass("closed").addClass("opened");
    }).on("click", function(e) {
      if ($(e.target).closest(".rtcl-actions-wrap").find(".rtcl-actions").length === 0) {
        $(".rtcl-my-listing-table").find(".rtcl-actions").removeClass("opened");
      }
    }).on("click", ".rtcl-my-listings-table-toggle-info", function(e) {
      let $this = $(this), $tr = $this.closest("tr"), $hideCell = $tr.find(".list-on-responsive");
      $hideCell.toggleClass("show");
      $tr.find(".title-cell").toggleClass("showed-info");
    });
    window.rtcl_make_checkout_request = function(form, callback) {
      let $form = $(form), $submitBtn = $("button[type=submit]", $form), msgHolder = $("<div class='alert rtcl-response'></div>"), data = $form.serialize();
      $.ajax({
        url: rtcl.ajaxurl,
        data,
        type: "POST",
        dataType: "JSON",
        beforeSend: function() {
          $submitBtn.prop("disabled", true);
          $form.find(".alert.rtcl-response").remove();
          $form.rtclBlock();
        },
        success: function(response) {
          $submitBtn.prop("disabled", false);
          $form.rtclUnblock();
          let msg = "";
          if (response.success) {
            if (response.success_message.length) {
              response.success_message.map(function(message) {
                msg += "<p>" + message + "</p>";
              });
            }
            if (msg) {
              msgHolder.removeClass("alert-danger").addClass("alert-success").html(msg).appendTo($form);
            }
          } else {
            if (response.error_message.length) {
              response.error_message.map(function(message) {
                msg += "<p>" + message + "</p>";
              });
            }
            if (msg) {
              msgHolder.removeClass("alert-success").addClass("alert-danger").html(msg).appendTo($form);
            }
          }
          if (typeof callback === "function") {
            callback(response);
          } else {
            setTimeout(function() {
              if (response.redirect_url) {
                window.location = response.redirect_url;
              }
            }, 600);
          }
        },
        error: function(e) {
          $submitBtn.prop("disabled", false);
          $form.rtclUnblock();
          if (typeof callback === "function") {
            callback(e);
          }
        }
      });
    };
    window.rtcl_on_recaptcha_load = function() {
      if (rtcl.recaptcha && rtcl.recaptcha.v === 2) {
        rtcl.recaptcha.response = {};
        const args = { sitekey: rtcl.recaptcha.site_key };
        const $loginForms = $("form.rtcl-login-form, form#rtcl-login-form");
        if ($loginForms.length && $.inArray("login", rtcl.recaptcha.on) !== -1) {
          $loginForms.each((index, form) => {
            const $form = $(form);
            if (!$form.data("reCaptchaId")) {
              if ($form.find("#rtcl-login-g-recaptcha").length) {
                $form.data(
                  "reCaptchaId",
                  grecaptcha.render(
                    $form.find("#rtcl-login-g-recaptcha")[0],
                    args
                  )
                );
              } else if ($form.find(".rtcl-g-recaptcha-wrap").length) {
                $form.data(
                  "reCaptchaId",
                  grecaptcha.render(
                    $form.find(".rtcl-g-recaptcha-wrap")[0],
                    args
                  )
                );
              }
            }
          });
        }
        const $regForms = $(
          "form#rtcl-register-form, form.rtcl-register-form"
        );
        if ($regForms.length && $.inArray("registration", rtcl.recaptcha.on) !== -1) {
          $regForms.each((index, form) => {
            const $form = $(form);
            if (!$form.data("reCaptchaId")) {
              if ($form.find("#rtcl-registration-g-recaptcha").length) {
                $form.data(
                  "reCaptchaId",
                  grecaptcha.render(
                    $form.find(
                      "#rtcl-registration-g-recaptcha"
                    )[0],
                    args
                  )
                );
              } else if ($form.find(".rtcl-g-recaptcha-wrap").length) {
                $form.data(
                  "reCaptchaId",
                  grecaptcha.render(
                    $form.find(".rtcl-g-recaptcha-wrap")[0],
                    args
                  )
                );
              }
            }
          });
        }
        const $submitForm = $("form#rtcl-post-form");
        if ($submitForm.length && $.inArray("listing", rtcl.recaptcha.on) !== -1) {
          if (!$submitForm.data("reCaptchaId")) {
            if ($submitForm.find("#rtcl-listing-g-recaptcha").length) {
              $submitForm.data(
                "reCaptchaId",
                grecaptcha.render(
                  $submitForm.find(
                    "#rtcl-listing-g-recaptcha"
                  )[0],
                  args
                )
              );
            } else if ($submitForm.find(".rtcl-g-recaptcha-wrap").length) {
              $submitForm.data(
                "reCaptchaId",
                grecaptcha.render(
                  $submitForm.find(".rtcl-g-recaptcha-wrap")[0],
                  args
                )
              );
            }
          }
        }
        const $contactForms = $(
          "form.rtcl-contact-form, form#rtcl-contact-form"
        );
        if ($contactForms.length && $.inArray("contact", rtcl.recaptcha.on) !== -1) {
          $contactForms.each((index, form) => {
            const $form = $(form);
            if (!$form.data("reCaptchaId")) {
              if ($form.find("#rtcl-contact-g-recaptcha").length) {
                $form.data(
                  "reCaptchaId",
                  grecaptcha.render(
                    $form.find("#rtcl-contact-g-recaptcha")[0],
                    args
                  )
                );
              } else if ($form.find(".rtcl-g-recaptcha-wrap").length) {
                $form.data(
                  "reCaptchaId",
                  grecaptcha.render(
                    $form.find(".rtcl-g-recaptcha-wrap")[0],
                    args
                  )
                );
              }
            }
          });
        }
        const $reportForms = $(
          "form.rtcl-report-abuse-form, form#rtcl-report-abuse-form"
        );
        if ($reportForms.length && $.inArray("report_abuse", rtcl.recaptcha.on) !== -1) {
          $reportForms.each((index, form) => {
            const $form = $(form);
            if (!$form.data("reCaptchaId")) {
              if ($form.find("#rtcl-report-abuse-g-recaptcha").length) {
                $form.data(
                  "reCaptchaId",
                  grecaptcha.render(
                    $form.find(
                      "#rtcl-report-abuse-g-recaptcha"
                    )[0],
                    args
                  )
                );
              } else if ($form.find(".rtcl-g-recaptcha-wrap").length) {
                $form.data(
                  "reCaptchaId",
                  grecaptcha.render(
                    $form.find(".rtcl-g-recaptcha-wrap")[0],
                    args
                  )
                );
              }
            }
          });
        }
        $(document).trigger("rtcl_recaptcha_loaded");
      }
    };
    function getUrlParameter(sParam) {
      var sPageURL = decodeURIComponent(window.location.search.substring(1)), sURLVariables = sPageURL.split("&"), sParameterName, i;
      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split("=");
        if (sParameterName[0] === sParam) {
          return sParameterName[1] === void 0 ? true : sParameterName[1];
        }
      }
    }
    function my_account_listings_ajax(page = 1) {
      let $wrapper = $(".rtcl-my-listings-content"), $form = $(".rtcl-my-listings-search-form form"), q = $form.find('input[name="u"]').val(), directory = $("#rtcl-my-listings-directory").val(), status = $("#rtcl-my-listings-status").val();
      $.ajax({
        url: rtcl.ajaxurl,
        type: "POST",
        data: {
          action: "rtcl_my_listings_search",
          search: q,
          directory,
          status,
          rtcl_my_listing_page: page,
          __rtcl_wpnonce: rtcl.__rtcl_wpnonce
        },
        beforeSend: function() {
          $wrapper.rtclBlock();
        },
        success: function(response) {
          if (response.success) {
            $wrapper.html(response.data.html);
          }
        },
        complete: function() {
          $wrapper.rtclUnblock();
        }
      });
    }
    function equalHeight() {
      $(".rtcl-equal-height").each(function() {
        var $equalItemWrap = $(this), equalItems = $equalItemWrap.find(".equal-item");
        equalItems.height("auto");
        if ($(window).width() > 767) {
          var maxH = 0;
          equalItems.each(function() {
            var itemH = $(this).outerHeight();
            if (itemH > maxH) {
              maxH = itemH;
            }
          });
          equalItems.height(maxH + "px");
        } else {
          equalItems.height("auto");
        }
      });
    }
    $(function() {
      $("#rtcl-reg-confirm-password").on("cut copy paste", function(e) {
        e.preventDefault();
      });
      $(document).on("click", ".rtcl-delete-listing", function(e) {
        e.preventDefault();
        if (confirm(rtcl.confirm_text)) {
          var _self = $(this), wrapper = _self.closest("tr"), data = {
            action: "rtcl_delete_listing",
            post_id: parseInt(_self.attr("data-id"), 10),
            __rtcl_wpnonce: rtcl.__rtcl_wpnonce
          };
          if (data.post_id) {
            $.ajax({
              url: rtcl.ajaxurl,
              data,
              type: "POST",
              beforeSend: function() {
                wrapper.rtclBlock();
              },
              success: function(data2) {
                wrapper.rtclUnblock();
                if (data2.success) {
                  wrapper.animate(
                    {
                      height: 0,
                      opacity: 0
                    },
                    "slow",
                    function() {
                      $(this).remove();
                    }
                  );
                }
              },
              error: function() {
                wrapper.rtclUnblock();
              }
            });
          }
        }
        return false;
      });
      $(document).on("click", ".rtcl-delete-favourite-listing", function(e) {
        e.preventDefault();
        if (confirm(rtcl.confirm_text)) {
          const _target = this, _self = $(_target), data = {
            action: "rtcl_public_add_remove_favorites",
            post_id: parseInt(_self.attr("data-id"), 10),
            __rtcl_wpnonce: rtcl.__rtcl_wpnonce
          };
          if (data.post_id) {
            $.ajax({
              url: rtcl.ajaxurl,
              data,
              type: "POST",
              beforeSend: function() {
                $("<span class='rtcl-icon-spinner animate-spin'></span>").insertAfter(_self);
              },
              success: function(res) {
                res.target = _target;
                _self.next(".rtcl-icon-spinner").remove();
                if (res.success) {
                  _self.closest("tr").animate(
                    {
                      height: 0,
                      opacity: 0
                    },
                    "slow",
                    function() {
                      $(this).remove();
                    }
                  );
                  toastr.success(res.message);
                } else {
                  toastr.error(res.message);
                }
                $(document).trigger("rtcl.favorite", res);
              },
              error: function(e2) {
                $(document).trigger("rtcl.favorite.error", {
                  action: "remove",
                  post_id: data.post_id,
                  target: _target
                });
                _self.next(".rtcl-icon-spinner").remove();
              }
            });
          }
        }
        return false;
      });
      $(document).ready(function() {
        $("#rtcl-checkout-form").find("#rtcl-payment-methods").hide();
      });
      $("#rtcl-checkout-form").on("click", 'input[name="pricing_id"]', function(e) {
        if ($(this).data("price") + 0 === 0) {
          $("#rtcl-billing-fields").slideUp(250);
          $("#rtcl-payment-methods").slideUp(250);
          $("#rtcl-checkout-store-gateway").slideDown(250);
        } else {
          $("#rtcl-billing-fields").slideDown(250);
          $("#rtcl-payment-methods").slideDown(250);
          $("#rtcl-checkout-store-gateway").slideUp(250);
        }
      }).on("change", 'input[name="payment_method"]', function(e) {
        var target_payment_box = $("div.payment_box.payment_method_" + $(this).val());
        if ($(this).is(":checked") && !target_payment_box.is(":visible")) {
          $("#rtcl-checkout-form div.payment_box").filter(":visible").slideUp(250);
          if ($(this).is(":checked")) {
            target_payment_box.slideDown(250);
          }
        }
      });
      $(".rtcl-media-upload-pp .rtcl-media-action").on("click", "span.add", function() {
        const addBtn = $(this);
        const ppFile = $(
          "<input type='file' style='position:absolute;left:-9999px' />"
        );
        $("body").append(ppFile);
        if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
          ppFile.trigger("change");
        } else {
          ppFile.trigger("click");
        }
        ppFile.on("change", function() {
          const fileItem = $(this);
          const pp_wrap = addBtn.parents(".rtcl-media-upload-pp");
          const pp_thumb_holder = $(".rtcl-media-item", pp_wrap);
          const form = new FormData();
          const pp = fileItem[0].files[0];
          const allowed_image_types = rtcl.image_allowed_type.map(
            function(type) {
              return "image/" + type;
            }
          );
          const max_image_size = parseInt(rtcl.max_image_size);
          if ($.inArray(pp.type, allowed_image_types) !== -1) {
            if (pp.size <= max_image_size) {
              form.append("pp", pp);
              form.append("__rtcl_wpnonce", rtcl.__rtcl_wpnonce);
              form.append(
                "action",
                "rtcl_ajax_user_profile_picture_upload"
              );
              $.ajax({
                url: rtcl.ajaxurl,
                data: form,
                cache: false,
                contentType: false,
                processData: false,
                type: "POST",
                beforeSend: function() {
                  pp_wrap.rtclBlock();
                },
                success: function(response) {
                  pp_wrap.rtclUnblock();
                  if (!response.error) {
                    pp_wrap.removeClass("no-media").addClass("has-media").parents(
                      ".rtcl-profile-picture-wrap"
                    ).find(".rtcl-gravatar-wrap").hide();
                    pp_thumb_holder.html(
                      "<img class='rtcl-thumbnail' src='" + response.data.src + "'/>"
                    );
                  }
                },
                error: function(jqXhr, json, errorThrown) {
                  pp_wrap.rtclUnblock();
                }
              });
            } else {
              alert(rtcl.error_image_size);
            }
          } else {
            alert(rtcl.error_image_extension);
          }
        });
      }).on("click", "span.remove", function() {
        const self = $(this);
        const pp_wrap = self.parents(".rtcl-media-upload-pp");
        const media_holder = $(".rtcl-media-item", pp_wrap);
        if (confirm(rtcl.confirm_text)) {
          $.ajax({
            url: rtcl.ajaxurl,
            data: {
              action: "rtcl_ajax_user_profile_picture_delete",
              __rtcl_wpnonce: rtcl.__rtcl_wpnonce
            },
            type: "POST",
            beforeSend: function() {
              pp_wrap.rtclBlock();
            },
            success: function(response) {
              pp_wrap.rtclUnblock();
              if (!response.error) {
                pp_wrap.removeClass("has-media").addClass("no-media").parents(".rtcl-profile-picture-wrap").find(".rtcl-gravatar-wrap").show();
                media_holder.html("");
              }
            },
            error: function(jqXhr, json, errorThrown) {
              pp_wrap.rtclUnblock();
            }
          });
        }
      });
      $("#rtcl-change-password").on("change", function() {
        var $checked = $(this).is(":checked");
        if ($checked) {
          $(".rtcl-password-fields").show().find('input[type="password"]').attr("disabled", false);
        } else {
          $(".rtcl-password-fields").hide().find('input[type="password"]').attr("disabled", "disabled");
        }
      }).trigger("change");
      $(".rtcl-require-login").on("click", function(e) {
        e.preventDefault();
        alert(rtcl.user_login_alert_message);
      });
      $(".rtcl-do-email").on("click", "a", function(e) {
        e.preventDefault();
        var _self = $(this), wrap = _self.parents(".rtcl-do-email");
        $("#rtcl-contact-form", wrap).slideToggle("slow");
        return false;
      });
      $(document).on("click", "a.rtcl-favourites", function(e) {
        e.preventDefault();
        const _target = this, _self = $(_target), _parentEl = _self.parent(), data = {
          action: "rtcl_public_add_remove_favorites",
          post_id: parseInt(_self.attr("data-id"), 10),
          __rtcl_wpnonce: rtcl.__rtcl_wpnonce
        };
        if (data.post_id) {
          $.ajax({
            url: rtcl.ajaxurl,
            data,
            type: "POST",
            beforeSend: function() {
              $(
                "<span class='rtcl-icon-spinner animate-spin'></span>"
              ).insertAfter(_self);
              _parentEl.addClass("is-loading");
            },
            success: function(res) {
              res.target = _target;
              _self.next(".rtcl-icon-spinner").remove();
              if (res.success) {
                _self.replaceWith(res.html);
                toastr.success(res.message);
              } else {
                toastr.error(res.message);
              }
              $(document).trigger("rtcl.favorite", res);
              _parentEl.removeClass("is-loading");
            },
            error: function(e2) {
              $(document).trigger("rtcl.favorite.error", {
                action: "remove",
                post_id: data.post_id,
                target: _target
              });
              _self.next(".rtcl-icon-spinner").remove();
              _parentEl.removeClass("is-loading");
            }
          });
        }
      });
      const RtclSlider = function($slider) {
        this.$slider = $slider;
        this.slider = this.$slider.get(0);
        this.swiperSlider = this.slider.swiper || null;
        this.defaultOptions = {
          breakpointsInverse: true,
          observer: true,
          navigation: {
            nextEl: this.$slider.find(".swiper-button-next").get(0),
            prevEl: this.$slider.find(".swiper-button-prev").get(0)
          }
        };
        this.slider_enabled = "function" === typeof Swiper;
        this.options = Object.assign(
          {},
          this.defaultOptions,
          this.$slider.data("options") || {}
        );
        this.initSlider = function() {
          if (!this.slider_enabled) {
            return;
          }
          if (this.options.rtl) {
            this.$slider.attr("dir", "rtl");
          }
          if (this.swiperSlider) {
            this.swiperSlider.parents = this.options;
            this.swiperSlider.update();
          } else {
            this.swiperSlider = new Swiper(
              this.$slider.get(0),
              this.options
            );
          }
        };
        this.imagesLoaded = function() {
          const that = this;
          if (!$.isFunction($.fn.imagesLoaded) || $.fn.imagesLoaded.done) {
            this.$slider.trigger("rtcl_slider_loading", this);
            this.$slider.trigger("rtcl_slider_loaded", this);
            return;
          }
          this.$slider.imagesLoaded().progress(function(instance, image) {
            that.$slider.trigger("rtcl_slider_loading", [that]);
          }).done(function(instance) {
            that.$slider.trigger("rtcl_slider_loaded", [that]);
          });
        };
        this.start = function() {
          const that = this;
          this.$slider.on("rtcl_slider_loaded", this.init.bind(this));
          setTimeout(function() {
            that.imagesLoaded();
          }, 1);
        };
        this.init = function() {
          this.initSlider();
        };
        this.start();
      };
      $.fn.rtcl_slider = function() {
        new RtclSlider(this);
        return this;
      };
      $(".rtcl-carousel-slider").each(function() {
        $(this).rtcl_slider();
      });
      $(".rtcl-terms").on("change", "select", function(e) {
        e.preventDefault();
        let $this = $(this), taxonomy = $this.data("taxonomy"), parent = $this.data("parent"), value = $this.val(), slug = $this.find(":selected").attr("data-slug") || "", classes = $this.attr("class"), termHolder = $this.closest(".rtcl-terms").find("input.rtcl-term-hidden"), termValueHolder = $this.closest(".rtcl-terms").find("input.rtcl-term-hidden-value");
        termHolder.val(value).attr("data-slug", slug);
        termValueHolder.val(slug);
        $this.parent().find("div:first").remove();
        if (parent != value) {
          $this.parent().append(
            '<div class="rtcl-spinner"><span class="rtcl-icon-spinner animate-spin"></span></div>'
          );
          var data = {
            action: "rtcl_child_dropdown_terms",
            taxonomy,
            parent: value,
            class: classes,
            __rtcl_wpnonce: rtcl.__rtcl_wpnonce
          };
          $.post(rtcl.ajaxurl, data, function(response) {
            $this.parent().find("div:first").remove();
            if (response.success) {
              $this.parent().append(response.data);
            }
          });
        }
      });
      const listObj = {
        active: null,
        target: null,
        loc: {
          items: [],
          selected: null,
          parents: [],
          text: rtcl.location_text
        },
        cat: {
          items: [],
          selected: null,
          parents: [],
          text: rtcl.category_text
        }
      };
      $(".rtcl-widget-search-form .rtcl-search-input-category").on("click", function() {
        listObj.active = "cat";
        listObj.target = $(this);
        const modal = new RtclModal({
          footer: false,
          wrapClass: "no-heading"
        });
        if (!listObj.cat.items.length) {
          $.ajax({
            url: rtcl.ajaxurl,
            type: "POST",
            data: {
              action: "rtcl_get_all_cat_list_for_modal"
            },
            beforeSend: function() {
              modal.addModal().addLoading();
            },
            success: function(response) {
              modal.removeLoading();
              if (response.success) {
                listObj.cat.items = response.categories;
                listObj.cat.selected = null;
                listObj.cat.parent = null;
                modal.content(generate_list());
              }
            },
            error: function(e) {
              modal.removeLoading();
              modal.content(rtcl_validator.server_error);
            }
          });
        } else {
          modal.addModal();
          modal.content(generate_list());
        }
      });
      $(".rtcl-widget-search-form .rtcl-search-input-location").on("click", function() {
        listObj.active = "loc";
        listObj.target = $(this);
        const modal = new RtclModal({
          footer: false,
          wrapClass: "no-heading"
        });
        if (!listObj.loc.items.length) {
          $.ajax({
            url: rtcl.ajaxurl,
            type: "POST",
            data: {
              action: "rtcl_get_all_location_list_for_modal"
            },
            beforeSend: function() {
              modal.addModal().addLoading();
            },
            success: function(response) {
              modal.removeLoading();
              if (response.success) {
                listObj.loc.items = response.locations;
                listObj.loc.selected = null;
                listObj.loc.parent = null;
                modal.content(generate_list());
              } else {
                modal.content(rtcl_validator.server_error);
              }
            },
            error: function(e) {
              modal.removeLoading();
              modal.content(rtcl_validator.server_error);
            }
          });
        } else {
          modal.addModal();
          modal.content(generate_list());
        }
      });
      const autocomplete_item = $(".rtcl-widget-search-form .rtcl-autocomplete");
      if ($.fn.autocomplete && autocomplete_item.length) {
        autocomplete_item.autocomplete({
          minChars: 2,
          search: function(event, ui) {
            if (!$(event.target).parent().find(".rtcl-icon-spinner").length) {
              $(
                "<span class='rtcl-icon-spinner animate-spin'></span>"
              ).insertAfter(event.target);
              const aiResult = $(event.target).closest(".rtcl-ai-search-field");
              if (aiResult.length) {
                $(
                  "<div class='rtcl-ai-searching-data loading'><h4>" + rtcl.i18n.ai_quick_search_loading + "</h4></div>"
                ).insertAfter(event.target);
              }
            }
          },
          response: function(event, ui) {
            $(event.target).parent().find(".rtcl-icon-spinner").remove();
            $(event.target).parent().find(".rtcl-ai-searching-data").remove();
          },
          source: function source(req, response) {
            req.location_slug = rtcl.rtcl_location || "";
            req.category_slug = rtcl.rtcl_category || "";
            req.type = $(this.element).data("type") || "listing";
            req.action = "rtcl_inline_search_autocomplete";
            $.ajax({
              dataType: "json",
              type: "POST",
              url: rtcl.ajaxurl,
              data: req,
              success: response
            });
          },
          select: function select(event, ui) {
            const _self = $(event.target);
            _self.next("input").val(ui.item.target).change();
          }
        }).data("ui-autocomplete")._renderItem = function(ul, item) {
          return $("<li />").data("item.autocomplete", item).append(item.label).appendTo(ul);
        };
      }
      $(".rtcl-ajax-load").each(function() {
        let _self = $(this), settings = _self.data("settings") || {};
        settings.action = "rtcl_ajax_taxonomy_filter_get_sub_level_html";
        settings.__rtcl_wpnonce = rtcl.__rtcl_wpnonce;
        if (_self.hasClass("have-query-var")) {
          settings.query_var_location = _self.attr("data-query-var-location");
          settings.query_var_category = _self.attr("data-query-var-category");
          settings.query_var_tag = _self.attr("data-query-var-tag");
        } else {
          settings.query_var_location = "";
          settings.query_var_category = "";
          settings.query_var_tag = "";
        }
        function setValue(object, path, value, limit) {
          var keys = path.slice(0, limit), last = keys.pop();
          keys.reduce((o, k) => o[k] = o[k] || {}, object)[last] = value;
          return object;
        }
        var searchParams = new URLSearchParams(decodeURIComponent(window.location.search));
        if (searchParams.size) {
          var filters = {};
          searchParams.forEach(function(value, key) {
            if (value && key.startsWith("filters[")) {
              var _key = key.replace("filters", "");
              _key = _key.replace(/^\[+/, "");
              _key = _key.replace(/]$/, "");
              if (_key.includes("][")) {
                var arrayKeys = _key.split("][");
                filters = setValue(filters, arrayKeys, value);
              } else {
                filters[_key] = value;
              }
            }
          });
          if (Object.keys(filters).length) {
            settings.filters = filters;
          }
        }
        $.ajax({
          url: rtcl.ajaxurl,
          type: "POST",
          dataType: "json",
          data: settings,
          beforeSend: function() {
            _self.rtclBlock();
          },
          success: function(response) {
            _self.html(response.data).rtclUnblock();
          },
          complete: function() {
            _self.rtclUnblock();
          },
          error: function(request, status, error) {
            _self.rtclUnblock();
            if (status === 500) {
              console.error("Error while adding comment");
            } else if (status === "timeout") {
              console.error("Error: Server doesn't respond.");
            } else {
              var wpErrorHtml = request.responseText.split("<p>"), wpErrorStr = wpErrorHtml[1].split("</p>");
              console.error(wpErrorStr[0]);
            }
          }
        });
      });
      function findSelectedItemFromListByIds(ids, list) {
        function findSelectedItem(id) {
          if (selectedItem.sub) {
            selectedItem = selectedItem.sub;
          }
          return selectedItem.find(function(item) {
            return id === item.id;
          });
        }
        let selectedItem = list;
        if (ids.length) {
          for (let i = 0; i < ids.length; i++) {
            selectedItem = findSelectedItem(ids[i]);
          }
        }
        return selectedItem;
      }
      function generate_list() {
        const type = listObj.active, items = listObj[type].items, ul = get_list(items);
        const container = $('<div class="rtcl-ui-select-list-wrap"><h4>' + listObj[type].text + '</h4><div class="rtcl-select-action"></div><div class="rtcl-ui-select-list"></div></div>');
        container.find(".rtcl-ui-select-list").append(ul);
        return container;
      }
      function get_list(items) {
        var ul = $("<ul />");
        items.forEach(function(item) {
          var a = $('<a href="javascript:;" />'), li = $("<li />");
          if (item.hasOwnProperty("sub")) {
            li.addClass("has-sub");
          }
          if (item.hasOwnProperty("icon")) {
            a.html(item.icon);
          }
          a.append(item.name);
          a.attr("data-item", JSON.stringify(get_safe_term_item(item)));
          li.append(a);
          ul.append(li);
        });
        return ul;
      }
      function get_safe_term_item(item) {
        let safe_item = Object.assign({ icon: "", sub: "" }, item);
        delete safe_item["icon"];
        delete safe_item["sub"];
        return safe_item;
      }
      $(document).on("click", ".rtcl-ui-select-list li.has-sub a", function(e) {
        e.preventDefault();
        let type = listObj.active, items = listObj[type].items, _self = $(this), _item = _self.data("item"), wrap = _self.parents(".rtcl-ui-select-list-wrap"), list_wrap = $(".rtcl-ui-select-list", wrap), action = $(".rtcl-select-action", wrap), title = $("h4", wrap), ul = _self.parents("ul"), selectedItemId = parseInt(_item.id, 10), selectedItem;
        if (listObj[type].selected) {
          selectedItem = listObj[type].selected.sub.find(function(item) {
            return item.id === selectedItemId;
          });
          listObj[type].parent = listObj[type].selected.id;
        } else {
          selectedItem = items.find(function(item) {
            return item.id === selectedItemId;
          });
        }
        listObj[type].selected = selectedItem;
        if (selectedItem.parent) {
          listObj[type].parents.push(selectedItem.parent);
        }
        if (selectedItem.hasOwnProperty("sub") && selectedItem.sub.length) {
          ul.remove();
          const updatedUl = get_list(selectedItem.sub);
          const allOfText = rtcl.i18n.all_of_.replace("%s", selectedItem.name);
          const allLink = $('<a href="javascript:;" />'), allLi = $("<li class='rtcl-ui-sl-all-of' />");
          if (selectedItem.hasOwnProperty("icon")) {
            allLink.html(selectedItem.icon);
          }
          allLink.append(allOfText);
          const newSelectedItem = JSON.parse(JSON.stringify(selectedItem));
          delete newSelectedItem.sub;
          allLink.attr("data-item", JSON.stringify(get_safe_term_item(newSelectedItem)));
          const _allLink = allLink.clone();
          allLi.append(allLink);
          updatedUl.prepend(allLi);
          list_wrap.html(updatedUl);
          if (title.find("span").length) {
            title.find("span").html(_allLink);
          } else {
            const wrapItem = $('<span class="rtcl-icon-angle-right rtcl-selected-term-item" />').append(_allLink);
            title.append(wrapItem);
          }
          action.html(
            "<div class='go-back'>" + rtcl.i18n.go_back + "</div>"
          );
        }
      }).on("click", ".rtcl-select-action .go-back", function(e) {
        e.preventDefault();
        let type = listObj.active, _self = $(this), wrap = _self.parents(".rtcl-ui-select-list-wrap"), list_wrap = $(".rtcl-ui-select-list", wrap), title = $("h4", wrap), action = $(".rtcl-select-action", wrap), list, selectedItem, level = 0;
        if (listObj[type].parents.length) {
          selectedItem = findSelectedItemFromListByIds(
            listObj[type].parents,
            listObj[type].items
          );
          list = selectedItem.sub;
          listObj[type].parents.pop();
          listObj[type].selected = selectedItem;
          level = 1;
        } else {
          listObj[type].selected = null;
          list = listObj[type].items;
        }
        list_wrap.html("");
        list_wrap.append(get_list(list));
        if (level) {
          var a = $('<a href="javascript:;" />');
          a.append(selectedItem.name);
          a.attr(
            "data-item",
            JSON.stringify(get_safe_term_item(selectedItem))
          );
          if (title.find("span").length) {
            title.find("span").html(a);
          } else {
            var wrapItem = $(
              '<span class="rtcl-icon-angle-right rtcl-selected-term-item" />'
            ).append(a);
            title.append(wrapItem);
          }
        } else {
          title.find("span").remove();
          action.find(".go-back").remove();
        }
      }).on(
        "click",
        ".rtcl-ui-select-list li:not(.has-sub) a, .rtcl-selected-term-item a",
        function(e) {
          e.preventDefault();
          let _self = $(this), _item = _self.data("item") || null;
          if (_item && listObj.target.length) {
            listObj.target.find(".search-input-label").text(_item.name);
            listObj.target.find("input.rtcl-term-field").val(_item.slug).change();
            $("body > .rtcl-ui-modal").remove();
            $("body").removeClass("rtcl-modal-open");
            if (rtcl.popup_search_widget_auto_form_submission) {
              listObj.target.closest("form").submit();
            }
          }
          return false;
        }
      ).on(
        "click",
        ".ul-list-group.is-parent > ul > li > a",
        function(e) {
          e.preventDefault();
          const self = $(this), li = self.parent("li"), parent = li.parent("ul"), target = $(".col-md-6.sub-wrapper"), wrap = $("<li />"), list = li.find(".ul-list-group.is-sub").clone() || "", a_clone = self.clone(), a = wrap.append(a_clone);
          list.find("ul").prepend(a);
          target.addClass("is-active");
          target.html(list);
          parent.find("> li").removeClass("is-active");
          li.addClass("is-active");
          return false;
        }
      ).on(
        "click",
        ".rtcl-filter-form .filter-list .is-parent.has-sub .arrow",
        function(e) {
          e.preventDefault();
          const self = $(this), li = self.closest("li"), parent = self.closest(".ui-accordion-content"), is_ajax_load = parent.hasClass("rtcl-ajax-load"), settings = parent.data("settings") || {}, target = li.find("> ul.sub-list");
          if (li.hasClass("is-open")) {
            target.slideUp(function() {
              li.removeClass("is-open");
            });
          } else {
            if (is_ajax_load && settings.taxonomy && li.hasClass("has-sub") && !li.hasClass("is-loaded")) {
              if (!parent.hasClass("rtcl-loading")) {
                settings.parent = li.data("id") || -1;
                settings.action = "rtcl_ajax_taxonomy_filter_get_sub_level_html";
                $.ajax({
                  url: rtcl.ajaxurl,
                  type: "POST",
                  dataType: "json",
                  data: settings,
                  beforeSend: function() {
                    parent.rtclBlock();
                  },
                  success: function(response) {
                    li.append(response.data);
                    parent.rtclUnblock();
                    target.slideDown();
                    li.addClass("is-open is-loaded");
                  },
                  complete: function() {
                    parent.rtclUnblock();
                  },
                  error: function(request, status, error) {
                    parent.rtclUnblock();
                    if (status === 500) {
                      console.error(
                        "Error while adding comment"
                      );
                    } else if (status === "timeout") {
                      console.error(
                        "Error: Server doesn't respond."
                      );
                    } else {
                      var wpErrorHtml = request.responseText.split(
                        "<p>"
                      ), wpErrorStr = wpErrorHtml[1].split(
                        "</p>"
                      );
                      console.error(wpErrorStr[0]);
                    }
                  }
                });
              }
            } else {
              target.slideDown();
              li.addClass("is-open");
            }
          }
        }
      ).on(
        "click",
        "ul.filter-list.is-collapsed li.is-opener, ul.sub-list.is-collapsed li.is-opener, ul.ui-link-tree.is-collapsed li.is-opener",
        function() {
          $(this).parent("ul").removeClass("is-collapsed").addClass("is-open");
        }
      ).on("change", ".rtcl-widget-search-form", function() {
        let $form = $(this), location2 = $form.find("[name='rtcl_location']").val(), category = $form.find("[name='rtcl_category']").val(), actionLink = rtcl.rtcl_listing_base;
        if (location2 && category) {
          actionLink = actionLink + rtcl.rtcl_category_base + "/" + category + "/" + rtcl.rtcl_location_base + "/" + location2;
          $form.attr("action", actionLink);
        } else if (location2) {
          actionLink = actionLink + rtcl.rtcl_location_base + "/" + location2;
          $form.attr("action", actionLink);
        } else if (category) {
          actionLink = actionLink + rtcl.rtcl_category_base + "/" + category;
          $form.attr("action", actionLink);
        } else {
          $form.attr("action", actionLink);
        }
      });
      $("#rtcl-checkout-form").on("change", "#billing_country, #billing_state, input[name='pricing_id']", function() {
        var $this = $(this), $form = $this.closest("#rtcl-checkout-form"), country = $form.find("#billing_country").val(), state = $form.find("#billing_state").val(), postcode = $form.find("#billing_postcode").val(), city = $form.find("#billing_city").val();
        if (rtcl.is_enable_tax) {
          checkout_tax_pricing(country, state, postcode, city);
        }
      });
      $(document).on("rtcl_recalculate_tax", function() {
        if (rtcl.is_enable_tax) {
          var $form = $("#rtcl-checkout-form"), country = $form.find("#billing_country").val(), state = $form.find("#billing_state").val(), postcode = $form.find("#billing_postcode").val(), city = $form.find("#billing_city").val();
          checkout_tax_pricing(country, state, postcode, city);
        }
      });
      $(".rtcl-filter-form .ui-accordion-item, .rtcl-ajax-filter-form .ui-accordion-item").on(
        "click",
        ".ui-accordion-title",
        function() {
          const self = $(this), holder = self.parents(".ui-accordion-item"), target = $(".ui-accordion-content", holder);
          if (holder.hasClass("is-open")) {
            target.slideUp(function() {
              holder.removeClass("is-open");
            });
          } else {
            target.slideDown();
            holder.addClass("is-open");
          }
        }
      );
      $(".rtcl-filter-form").on(
        "click",
        ".filter-submit-trigger",
        function(e) {
          let r, i, self = $(this);
          if (!self.is(":checkbox")) {
            e.preventDefault();
            r = self.siblings("input");
            i = r.prop("checked");
            r.prop("checked", !i);
          }
          if (self.is(":radio") || !self.is(":radio") && self.siblings("input").is(":radio")) {
            self.closest("form").submit();
          }
        }
      );
      $(document).on("click keydown", ".reveal-phone", function(e) {
        if (e.type === "keydown" && e.keyCode !== 13) {
          return;
        }
        const $this = $(this), isMobile = $this.hasClass("rtcl-mobile");
        if (!$this.hasClass("revealed")) {
          e.preventDefault();
          const options = $this.data("options") || {};
          const $numbers = $this.find(".numbers");
          let aPhone = "";
          let wPhone = "";
          if (options.safe_phone && options.phone_hidden) {
            const purePhone = options.safe_phone.replace(
              rtcl.phone_number_placeholder,
              options.phone_hidden
            );
            aPhone = $('<a class="revealed-phone-number" href="#" />').attr("href", "tel:" + purePhone).html('<i class="rtcl-icon rtcl-icon-phone"></i>').append(purePhone);
            $this.attr("data-tel", "tel:" + purePhone);
          }
          if (options.safe_whatsapp_number && options.whatsapp_hidden) {
            const pureWPhone = options.safe_whatsapp_number.replace(
              rtcl.phone_number_placeholder,
              options.whatsapp_hidden
            );
            wPhone = $(
              '<a class="revealed-whatsapp-number" href="#" />'
            ).attr(
              "href",
              "https://wa.me/" + pureWPhone.replace(/\D/g, "").replace(/^0+/, "") + "/?text=" + rtcl.wa_message
            ).html('<i class="rtcl-icon rtcl-icon-whatsapp"></i>').append(pureWPhone);
          }
          $numbers.html(aPhone).append(wPhone);
          $this.addClass("revealed");
          $.ajax({
            url: rtcl.ajaxurl,
            type: "POST",
            dataType: "json",
            data: {
              listing_id: $this.attr("data-id"),
              action: "rtcl_phone_whatsapp_revealed",
              __rtcl_wpnonce: rtcl.__rtcl_wpnonce
            },
            success: function(res) {
              console.log(res);
            },
            error: function(e2) {
              console.log(e2);
            }
          });
        } else {
          if (isMobile) {
            const tel = $this.attr("data-tel");
            if (tel) {
              window.location = tel;
            }
          }
        }
      });
      $(document).on("click", ".reveal-phone.revealed a.revealed-phone-number", function(e) {
        e.preventDefault();
        const $this = $(this), $wrapper = $this.closest(".reveal-phone.revealed");
        $.ajax({
          url: rtcl.ajaxurl,
          type: "POST",
          dataType: "json",
          data: {
            listing_id: $wrapper.attr("data-id"),
            action: "rtcl_phone_click",
            __rtcl_wpnonce: rtcl.__rtcl_wpnonce
          },
          success: function(res) {
            if (res.success) {
              window.location = $this.attr("href");
            }
          },
          error: function(e2) {
            console.log(e2);
          }
        });
      });
      $(document).on("click", ".reveal-phone.revealed a.revealed-whatsapp-number", function(e) {
        e.preventDefault();
        const $this = $(this), $wrapper = $this.closest(".reveal-phone.revealed");
        $.ajax({
          url: rtcl.ajaxurl,
          type: "POST",
          dataType: "json",
          data: {
            listing_id: $wrapper.attr("data-id"),
            action: "rtcl_whatsapp_click",
            __rtcl_wpnonce: rtcl.__rtcl_wpnonce
          },
          success: function(res) {
            if (res.success) {
              window.open($this.attr("href"), "_blank");
            }
          },
          error: function(e2) {
            console.log(e2);
          }
        });
      });
      let option = getUrlParameter("option") || "", gateway = getUrlParameter("gateway") || "";
      if (option) {
        $("input[name='pricing_id'][value='" + option + "']").prop(
          "checked",
          true
        );
      } else {
        $("input[name='pricing_id'][value='0']").prop("checked", true);
      }
      if (gateway) {
        $("label[for='gateway-" + gateway + "']").trigger("click");
      }
      rtclInitDateField();
    });
    if ($.fn.validate) {
      $("#rtcl-lost-password-form, #rtcl-password-reset-form").each(
        function() {
          $(this).validate();
        }
      );
      $("#rtcl-checkout-form").validate({
        submitHandler: function(form) {
          $(document.body).trigger("rtcl_before_checkout_request", [form]);
          rtcl_make_checkout_request(form);
          return false;
        }
      });
      $("form#rtcl-login-form, form.rtcl-login-form").each(function() {
        $(this).validate({
          submitHandler: function(form) {
            const $form = $(form);
            console.log($form.data("reCaptchaId"));
            if (rtcl.recaptcha && typeof grecaptcha !== "undefined" && rtcl.recaptcha.on && $.inArray("login", rtcl.recaptcha.on) !== -1) {
              if (rtcl.recaptcha.v === 2 && $form.data("reCaptchaId") !== void 0) {
                const response = grecaptcha.getResponse(
                  $form.data("reCaptchaId")
                );
                console.log(response);
                const $captcha_msg = $form.find(
                  "#rtcl-login-g-recaptcha-message"
                );
                $captcha_msg.html("");
                if (0 === response.length) {
                  $captcha_msg.addClass("text-danger").html(rtcl.recaptcha.msg.invalid);
                  grecaptcha.reset($form.data("reCaptchaId"));
                  return false;
                }
                if ($form.hasClass("rtcl-ajax-login")) {
                  submit_form_data_ajax();
                  return false;
                }
                return true;
              } else if (rtcl.recaptcha.v === 3) {
                grecaptcha.ready(function() {
                  $form.rtclBlock();
                  grecaptcha.execute(rtcl.recaptcha.site_key, {
                    action: "login"
                  }).then(function(token) {
                    if ($form.hasClass("rtcl-ajax-login")) {
                      submit_form_data_ajax(token);
                      return false;
                    } else {
                      $form.append(
                        '<input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" value="' + token + '" />'
                      );
                      $form.append(
                        '<input type="hidden" name="rtcl-login" value="login" />'
                      );
                      $form.off("submit").trigger("submit");
                      return true;
                    }
                  });
                });
                return false;
              }
            }
            if ($form.hasClass("rtcl-ajax-login")) {
              submit_form_data_ajax();
              return false;
            } else {
              return true;
            }
            function submit_form_data_ajax(token) {
              const fromData = new FormData(form);
              const temp_user = fromData.get("username").trim();
              const temp_pass = fromData.get("password");
              fromData.delete("username");
              fromData.delete("password");
              fromData.set(
                "username",
                rtclCipher(rtcl.__rtcl_wpnonce)(temp_user)
              );
              fromData.set(
                "password",
                rtclCipher(rtcl.__rtcl_wpnonce)(temp_pass)
              );
              if (token) {
                fromData.set("g-recaptcha-response", token);
              }
              fromData.append("action", "rtcl_login_request");
              fromData.append("__rtcl_wpnonce", rtcl.__rtcl_wpnonce);
              $.ajax({
                url: rtcl.ajaxurl,
                type: "POST",
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                data: fromData,
                beforeSend: function() {
                  $form.find(".rtcl-error").remove();
                  $form.rtclBlock();
                },
                success: function(res) {
                  if (res.success) {
                    toastr.success(res.data.message);
                    $form.append(
                      '<div class="rtcl-error alert alert-success" role="alert"><p>' + res.data.message + "</p></div>"
                    );
                    $form[0].reset();
                    window.location.reload(true);
                  } else {
                    $form.rtclUnblock();
                    toastr.error(res.data);
                    $form.append(
                      '<div class="rtcl-error alert alert-danger" role="alert"><p>' + res.data + "</p></div>"
                    );
                  }
                },
                error: function() {
                  $form.rtclUnblock().append(
                    '<div class="rtcl-error alert alert-danger" role="alert"><p>' + rtcl_validator.messages.server_error + "</p></div>"
                  );
                  toastr.error(
                    rtcl_validator.messages.server_error
                  );
                }
              });
            }
          }
        });
      });
      $("form#rtcl-register-form, form.rtcl-register-form").each(function() {
        var regFormRules = {};
        if ($(this).find('input[name="rtcl_user_type"]').length) {
          regFormRules.rtcl_user_type = { required: true };
        }
        $(this).validate({
          rules: regFormRules,
          submitHandler: function(form) {
            const $form = $(form);
            if (rtcl.recaptcha && typeof grecaptcha !== "undefined" && rtcl.recaptcha.on && $.inArray("registration", rtcl.recaptcha.on) !== -1) {
              if (rtcl.recaptcha.v === 2 && $form.data("reCaptchaId") !== void 0) {
                const response = grecaptcha.getResponse(
                  $form.data("reCaptchaId")
                );
                const $captcha_msg = $(
                  "#rtcl-registration-g-recaptcha-message"
                );
                $captcha_msg.html("");
                if (0 === response.length) {
                  $captcha_msg.addClass("text-danger").html(rtcl.recaptcha.msg.invalid);
                  grecaptcha.reset($form.data("reCaptchaId"));
                  return false;
                }
                if ($form.hasClass("rtcl-ajax-registration")) {
                  submit_form_data_ajax();
                  return false;
                }
                return true;
              } else if (rtcl.recaptcha.v === 3) {
                grecaptcha.ready(function() {
                  $form.rtclBlock();
                  grecaptcha.execute(rtcl.recaptcha.site_key, {
                    action: "registration"
                  }).then(function(token) {
                    if ($form.hasClass(
                      "rtcl-ajax-registration"
                    )) {
                      submit_form_data_ajax(token);
                      return false;
                    } else {
                      $form.append(
                        '<input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" value="' + token + '" />'
                      );
                      $form.append(
                        '<input type="hidden" name="rtcl-register" value="register" />'
                      );
                      $form.off("submit").trigger("submit");
                      return true;
                    }
                  });
                });
                return false;
              }
            }
            if ($form.hasClass("rtcl-ajax-registration")) {
              submit_form_data_ajax();
              return false;
            } else {
              return true;
            }
            function submit_form_data_ajax(recaptcha_token) {
              const fromData = new FormData(form);
              if (recaptcha_token) {
                fromData.append(
                  "g-recaptcha-response",
                  recaptcha_token
                );
              }
              fromData.append("action", "rtcl_registration_request");
              fromData.append("__rtcl_wpnonce", rtcl.__rtcl_wpnonce);
              $.ajax({
                url: rtcl.ajaxurl,
                type: "POST",
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                data: fromData,
                beforeSend: function() {
                  $form.find(".rtcl-error").remove();
                  $form.rtclBlock();
                },
                success: function(res) {
                  $form.rtclUnblock();
                  if (res.success) {
                    $form.append(
                      '<div class="rtcl-error alert alert-success" role="alert"><p>' + res.data.message + "</p></div>"
                    );
                    $form[0].reset();
                    if (res.data.redirect_url && res.data.redirect_utl !== window.location.href) {
                      window.location = res.data.redirect_url + "?t=" + (/* @__PURE__ */ new Date()).getTime();
                    }
                  } else {
                    $form.append(
                      '<div class="rtcl-error alert alert-danger" role="alert"><p>' + res.data + "</p></div>"
                    );
                  }
                },
                error: function() {
                  $form.rtclUnblock().append(
                    '<div class="rtcl-error alert alert-danger" role="alert"><p>' + rtcl_validator.messages.server_error + "</p></div>"
                  );
                }
              });
            }
          }
          /*messages: {
          	pass2: {
          		equalTo: 'ggjggjj'
          	}
          }*/
        });
      });
      $("form.rtcl-report-abuse-form, form#rtcl-report-abuse-form").each(
        function() {
          $(this).validate({
            submitHandler: function(form) {
              const $form = $(form);
              if (rtcl.recaptcha && typeof grecaptcha !== "undefined" && rtcl.recaptcha.on && $.inArray("report_abuse", rtcl.recaptcha.on) !== -1) {
                if (rtcl.recaptcha.v === 2 && $form.data("reCaptchaId") !== void 0) {
                  const response = grecaptcha.getResponse(
                    $form.data("reCaptchaId")
                  );
                  const $captcha_msg = $form.find(
                    "#rtcl-report-abuse-message-display"
                  );
                  $captcha_msg.html("");
                  if (0 === response.length) {
                    $captcha_msg.removeClass("text-success").addClass("text-danger").html(rtcl.recaptcha.msg.invalid);
                    grecaptcha.reset(
                      rtcl.recaptcha.response["report_abuse"]
                    );
                    return false;
                  }
                  submit_form_data_ajax(response);
                  return false;
                } else if (rtcl.recaptcha.v === 3) {
                  grecaptcha.ready(function() {
                    grecaptcha.execute(rtcl.recaptcha.site_key, {
                      action: "reportAbuse"
                    }).then(function(token) {
                      submit_form_data_ajax(token);
                    });
                  });
                  return false;
                }
              }
              submit_form_data_ajax();
              return false;
              function submit_form_data_ajax(reCaptchaToken) {
                const fromData = new FormData(form);
                fromData.append(
                  "action",
                  "rtcl_public_report_abuse"
                );
                fromData.append("post_id", rtcl.post_id || 0);
                fromData.append(
                  "__rtcl_wpnonce",
                  rtcl.__rtcl_wpnonce
                );
                if (reCaptchaToken) {
                  fromData.append(
                    "g-recaptcha-response",
                    reCaptchaToken
                  );
                }
                const targetBtn = $form.find(".rtcl-btn.rtcl-btn-primary");
                $.ajax({
                  url: rtcl.ajaxurl,
                  data: fromData,
                  dataType: "json",
                  cache: false,
                  processData: false,
                  contentType: false,
                  type: "POST",
                  beforeSend: function() {
                    $(
                      '<span class="rtcl-icon-spinner animate-spin"></span>'
                    ).insertAfter(targetBtn);
                  },
                  success: function(response) {
                    targetBtn.next(".rtcl-icon-spinner").remove();
                    if (response.success) {
                      form.reset();
                      $form.find(
                        "#rtcl-report-abuse-message-display"
                      ).removeClass("text-danger").addClass("text-success").html(response.data.message);
                      setTimeout(function() {
                        $form.parents(
                          "#rtcl-report-abuse-modal"
                        ).removeClass("show");
                      }, 1500);
                    } else {
                      $form.find(
                        "#rtcl-report-abuse-message-display"
                      ).removeClass("text-success").addClass("text-danger").html(response.data.error);
                    }
                    if (rtcl.recaptcha && rtcl.recaptcha.v === 2 && $form.data("reCaptchaId") !== void 0) {
                      grecaptcha.reset(
                        $form.data("reCaptchaId")
                      );
                    }
                  },
                  error: function(e) {
                    $("#rtcl-report-abuse-message-display").removeClass("text-success").addClass("text-danger").html(e);
                    targetBtn.next(".rtcl-icon-spinner").remove();
                  }
                });
              }
            }
          });
        }
      );
      $("form.rtcl-contact-form, form#rtcl-contact-form").each(function() {
        $(this).validate({
          submitHandler: function(form) {
            const $form = $(form);
            const $captcha_msg = $form.find(
              "#rtcl-contact-message-display"
            );
            const recaptchaId = $form.data("reCaptchaId");
            if (rtcl.recaptcha && typeof grecaptcha !== "undefined" && rtcl.recaptcha.on && $.inArray("contact", rtcl.recaptcha.on) !== -1) {
              if (rtcl.recaptcha.v === 2 && recaptchaId !== void 0) {
                var response = grecaptcha.getResponse(recaptchaId);
                $captcha_msg.html("");
                if (0 === response.length) {
                  $captcha_msg.removeClass("text-success").addClass("text-danger").html(rtcl.recaptcha.msg.invalid);
                  grecaptcha.reset(recaptchaId);
                  return false;
                }
                submit_form_data_ajax(response);
                return false;
              } else if (rtcl.recaptcha.v === 3) {
                grecaptcha.ready(function() {
                  $form.rtclBlock();
                  grecaptcha.execute(rtcl.recaptcha.site_key, {
                    action: "contact"
                  }).then(function(token) {
                    $form.rtclUnblock();
                    submit_form_data_ajax(token);
                  });
                });
                return false;
              }
            }
            submit_form_data_ajax();
            return false;
            function submit_form_data_ajax(reCaptchaToken) {
              const fromData = new FormData(form);
              if (reCaptchaToken) {
                fromData.append(
                  "g-recaptcha-response",
                  reCaptchaToken
                );
              }
              fromData.append("action", "rtcl_public_send_contact_email");
              fromData.append("post_id", rtcl.post_id || 0);
              fromData.append("__rtcl_wpnonce", rtcl.__rtcl_wpnonce);
              $.ajax({
                url: rtcl.ajaxurl,
                type: "POST",
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                data: fromData,
                beforeSend: function() {
                  $form.rtclBlock();
                  $captcha_msg.removeClass("d-block").html("");
                  $(
                    '<span class="rtcl-icon-spinner animate-spin"></span>'
                  ).insertAfter($form.find(".btn"));
                },
                success: function(response2) {
                  $form.rtclUnblock();
                  $form.find(".btn").next(".rtcl-icon-spinner").remove();
                  $captcha_msg.addClass("d-block");
                  if (response2.success) {
                    form.reset();
                    $captcha_msg.removeClass("text-danger").addClass("d-block text-success").html(response2.data.message);
                    if ($form.parent().data("hide") !== 0) {
                      setTimeout(function() {
                        $form.slideUp();
                      }, 800);
                    }
                  } else {
                    $captcha_msg.removeClass("text-success").addClass("d-block text-danger").html(response2.data.error);
                  }
                  if (rtcl.recaptcha && rtcl.recaptcha.v === 2 && recaptchaId !== void 0) {
                    grecaptcha.reset(recaptchaId);
                  }
                },
                error: function(e) {
                  $form.rtclUnblock();
                  $captcha_msg.removeClass("text-success").addClass("d-block text-danger").html(e);
                  $form.find(".btn").next(".rtcl-icon-spinner").remove();
                }
              });
            }
          }
        });
      });
      $("#rtcl-user-account").validate({
        submitHandler: function(form) {
          const $form = $(form), targetBtn = $form.find("input[type=submit]"), responseHolder = $form.find(".rtcl-response"), msgHolder = $("<div class='alert'></div>"), fromData = new FormData(form);
          fromData.append("action", "rtcl_update_user_account");
          fromData.append("__rtcl_wpnonce", rtcl.__rtcl_wpnonce);
          $.ajax({
            url: rtcl.ajaxurl,
            data: fromData,
            dataType: "json",
            cache: false,
            processData: false,
            contentType: false,
            type: "POST",
            beforeSend: function() {
              $form.addClass("rtcl-loading");
              targetBtn.prop("disabled", true);
              responseHolder.html("");
              $(
                '<span class="rtcl-icon-spinner animate-spin"></span>'
              ).insertAfter(targetBtn);
            },
            success: function(response) {
              targetBtn.prop("disabled", false).next(".rtcl-icon-spinner").remove();
              $form.removeClass("rtcl-loading");
              if (response.success) {
                $form.find("input[name=pass1]").val("");
                $form.find("input[name=pass2]").val("");
                msgHolder.removeClass("alert-danger").addClass("alert-success").html(response.data.message).appendTo(responseHolder);
                setTimeout(function() {
                  responseHolder.html("");
                }, 1e3);
              } else {
                msgHolder.removeClass("alert-success").addClass("alert-danger").html(response.data.error).appendTo(responseHolder);
              }
            },
            error: function(e) {
              msgHolder.removeClass("alert-success").addClass("alert-danger").html(e.responseText).appendTo(responseHolder);
              targetBtn.prop("disabled", false).next(".rtcl-icon-spinner").remove();
              $form.removeClass("rtcl-loading");
            }
          });
        }
      });
    }
    window.rtclInitDateField = function() {
      if ($.fn.daterangepicker) {
        $(".rtcl-date").each(function() {
          let input = $(this);
          let options = input.data("options") || {};
          options = rtclFilter.apply("dateRangePickerOptions", options);
          if (Array.isArray(options.invalidDateList) && options.invalidDateList.length) {
            const formattedDates = options.invalidDateList.map((dateStr) => {
              return moment(dateStr).format(options.locale.format);
            });
            options.isInvalidDate = function(param) {
              return formattedDates.includes(param.format(options.locale.format));
            };
          }
          $(this).daterangepicker(options);
          if (options.autoUpdateInput === false) {
            input.on("apply.daterangepicker", function(ev, picker) {
              if (picker.singleDatePicker) {
                $(this).val(
                  picker.startDate.format(picker.locale.format)
                );
              } else {
                $(this).val(
                  picker.startDate.format(picker.locale.format) + picker.locale.separator + picker.endDate.format(picker.locale.format)
                );
              }
            });
            input.on("cancel.daterangepicker", function(ev, picker) {
              $(this).val("");
            });
          }
        });
      }
    };
    $(function() {
      $(".rtcl-phone-reveal").on("click", function() {
        if ($(this).hasClass("revealed")) {
          var $link;
          $link = $(this).attr("href");
          if ($link) {
            window.location.href = $link;
          }
        }
        if ($(this).hasClass("not-revealed")) {
          $(this).removeClass("not-revealed").addClass("revealed");
          var phone = $(this).data("phone");
          $(this).find("span").text(phone);
        }
        return false;
      });
      var user_ads_wrapper = $(".rtcl-user-ad-listing-wrapper"), pagination;
      if (user_ads_wrapper.length) {
        var wrapper = $(".rtcl-listing-wrapper", user_ads_wrapper);
        pagination = wrapper.data("pagination") || {};
        pagination.disable = false;
        pagination.loading = false;
        $(window).on("scroll load", function() {
          infinite_scroll(wrapper);
        });
      }
      function infinite_scroll(wrapper2) {
        var ajaxVisible = user_ads_wrapper.offset().top + user_ads_wrapper.outerHeight(true), ajaxScrollTop = $(window).scrollTop() + $(window).height();
        if (ajaxVisible <= ajaxScrollTop && ajaxVisible + $(window).height() > ajaxScrollTop) {
          if (pagination.max_num_pages > pagination.current_page && !pagination.loading && !pagination.disable) {
            var data = {
              action: "rtcl_user_ad_load_more",
              current_page: pagination.current_page,
              max_num_pages: pagination.max_num_pages,
              found_posts: pagination.found_posts,
              posts_per_page: pagination.posts_per_page,
              user_id: rtcl.user_id
            };
            $.ajax({
              url: rtcl.ajaxurl,
              data,
              type: "POST",
              beforeSend: function() {
                pagination.loading = true;
                $(
                  '<span class="rtcl-icon-spinner animate-spin"></span>'
                ).insertAfter(wrapper2);
              },
              success: function(response) {
                wrapper2.next(".rtcl-icon-spinner").remove();
                pagination.loading = false;
                pagination.current_page = response.current_page;
                if (pagination.max_num_pages === response.current_page) {
                  pagination.disable = true;
                }
                if (response.complete && response.html) {
                  wrapper2.append(response.html);
                }
              },
              error: function(e) {
                pagination.loading = false;
                wrapper2.next(".rtcl-icon-spinner").remove();
              }
            });
          }
        }
      }
    });
    const rtclAjaxFilter = new RtclAjaxFilter();
    $(document).ready(() => {
      rtclAjaxFilter.init();
    });
    $(window).on("resize load", equalHeight).on("load", function() {
      $(".rtcl-range-slider-input").on("input", function() {
        const field_wrap = $(this).parent();
        field_wrap.find("span.rtcl-range-value").text(this.value);
      });
    });
    $(document).on("rtcl.favorite", function(e, data) {
      var $favCount = $(".rt-el-header-favourite-count").first();
      var $favCountAll = $(".rt-el-header-favourite-count");
      var favCountVal = parseInt($favCount.text(), 10);
      favCountVal = isNaN(favCountVal) ? 0 : favCountVal;
      if ("added" === data.action) {
        favCountVal++;
        $favCountAll.text(favCountVal);
      } else if ("removed" === data.action) {
        favCountVal--;
        $favCountAll.text(favCountVal);
      }
    });
    $(document).on("rtcl.compare.added", function(e, data) {
      $(".rtcl-el-compare-count").text(data.current_listings);
    });
    $(document).on("rtcl.compare.removed", function(e, data) {
      $(".rtcl-el-compare-count").text(data.current_listings);
    });
    $(document).on("click", ".rtcl-compare-btn-clear", function() {
      $(".rtcl-el-compare-count").text("0");
    });
    $(window).on("load", function() {
      $(".builder-content").removeClass("content-invisible");
    });
    function checkout_tax_pricing(country, state, postcode, city) {
      var $wrapper = $(".rtcl-checkout-content"), $form = $wrapper.find("#rtcl-checkout-form"), $overview = $form.find("#rtcl-payment-overview"), type = $form.find("input[name='type']").val(), pricing_id = $form.find("input[name='pricing_id']:checked").val(), $content = "";
      $.ajax({
        type: "POST",
        url: rtcl.ajaxurl,
        data: {
          action: "rtcl_calculate_checkout_tax",
          country_code: country,
          state_code: state,
          postcode,
          city,
          type,
          pricing_id,
          __rtcl_wpnonce: rtcl.__rtcl_wpnonce
        },
        beforeSend: function() {
          $wrapper.rtclBlock();
        },
        success: function(response) {
          $wrapper.rtclUnblock();
          if (!response.error) {
            const taxData = response.hasOwnProperty("available_tax") ? response.available_tax : [];
            $overview.find(".cart-subtotal .checkout-price").text(response.pricing_price);
            $overview.find(".order-total .checkout-price").text(response.total_amount);
            if (Array.isArray(taxData)) {
              $overview.find("tr.tax-rate td").html("");
              $.each(taxData, function(index, singleTax) {
                $content += '<span class="price-amount">';
                $content += '<span class="checkout-price-currency-symbol">' + rtcl.payment_currency_symbol + "</span>";
                $content += '<span class="checkout-price"> ' + singleTax.amount + "</span>";
                $content += '<span class="checkout-tax-label">(' + singleTax.label + ")</span>";
                $content += "</span>";
                if (!response.enable_multiple_tax) {
                  return false;
                }
              });
              $overview.find("tr.tax-rate td").append($content);
            }
          }
        },
        error: function(jqXHR, exception) {
          $wrapper.rtclUnblock();
        }
      });
    }
    jQuery(document).ready(function($2) {
      var $repeater = $2(".rtcl-is-collapsable");
      if (!$repeater.length) return;
      $repeater.each(function() {
        $2(this).find(".rtcl-cfp-repeater-item").each(function(index) {
          console.log($2(this));
          var $item = $2(this);
          var $fields = $item.find("> .rtcl-cfp-repeater-field");
          if (!$fields.length) return;
          var $title = $fields.first();
          var $contents = $fields.slice(1);
          var $contentWrapper = $2('<div class="rtcl-repeater-content"></div>');
          $contents.appendTo($contentWrapper);
          $item.append($contentWrapper);
          $title.css("cursor", "pointer");
          $title.addClass("item-heading item-" + index);
          if (index === 0) {
            $contentWrapper.show();
            $item.addClass("open");
          } else {
            $contentWrapper.hide();
          }
          $title.on("click", function() {
            $contentWrapper.slideToggle(200);
            $item.toggleClass("open");
          });
        });
      });
    });
  })(jQuery);
})();
