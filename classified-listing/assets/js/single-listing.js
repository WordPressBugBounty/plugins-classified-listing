(function() {
  "use strict";
  (function($) {
    "user strict";
    const RtclListingGallery = function($slider_wrapper, args) {
      var _a;
      this.$sliderWrapper = $slider_wrapper;
      this.$slider = $(".rtcl-slider", this.$sliderWrapper);
      this.$sliderThumbs = $(".rtcl-slider-nav", this.$sliderWrapper);
      if (!this.$slider.length) {
        return;
      }
      this.slider = this.$slider.get(0);
      this.swiperSlider = this.slider.swiper || null;
      this.sliderThumbs = this.$sliderThumbs.get(0);
      this.swiperThumbsSlider = ((_a = this == null ? void 0 : this.sliderThumbs) == null ? void 0 : _a.swiper) || null;
      this.$slider_images = $(".rtcl-slider-item", this.$slider);
      this.settings = Object.assign(
        {},
        rtcl_single_listing_localized_params || {},
        this.$sliderWrapper.data("options") || {}
      );
      this.args = args || {};
      this.options = Object.assign(
        {},
        this.args,
        this.settings.slider_options,
        this.$sliderWrapper.data("options") || {}
      );
      if (this.options.rtl && $("html").attr("dir") === "rtl") {
        this.options.rtl = true;
      }
      this.slider_enabled = "function" === typeof Swiper && this.settings.slider_enabled;
      this.zoom_enabled = $.isFunction($.fn.zoom) && this.settings.zoom_enabled;
      this.photoswipe_enabled = typeof PhotoSwipe !== "undefined" && this.settings.photoswipe_enabled;
      if (args) {
        this.slider_enabled = false === args.slider_enabled ? false : this.slider_enabled;
        this.zoom_enabled = false === args.zoom_enabled ? false : this.zoom_enabled;
        this.photoswipe_enabled = false === args.photoswipe_enabled ? false : this.photoswipe_enabled;
      }
      if (1 === this.$slider_images.length) {
        this.slider_enabled = false;
      }
      this.initSlider = function() {
        var _a2, _b;
        if (!this.slider_enabled) {
          this.hideLoader();
          return;
        }
        const $slider = this.$slider;
        const $sliderThumbs = this.$sliderThumbs;
        const $sliderThumbsGap = this.$sliderThumbs.data("slider-options") || {};
        if (this.options.rtl) {
          $slider.attr("dir", "rtl");
          $sliderThumbs.attr("dir", "rtl");
        }
        const that = this;
        let swiperThumbsSlider;
        if (this.swiperThumbsSlider) {
          swiperThumbsSlider = this.swiperThumbsSlider;
          this.swiperThumbsSlider.update();
        } else {
          swiperThumbsSlider = new Swiper(this.sliderThumbs, {
            watchSlidesVisibility: true,
            spaceBetween: ($sliderThumbsGap == null ? void 0 : $sliderThumbsGap.spaceBetween) || 5,
            slidesPerView: 5,
            navigation: {
              nextEl: $sliderThumbs.find(".swiper-button-next").get(0),
              prevEl: $sliderThumbs.find(".swiper-button-prev").get(0)
            },
            direction: $sliderThumbsGap.direction || "horizontal",
            breakpoints: {
              0: {
                slidesPerView: 3
              },
              576: {
                slidesPerView: 4
              },
              768: {
                allowTouchMove: true
              },
              1024: {
                allowTouchMove: ((_b = (_a2 = rtcl_single_listing_localized_params.slider_options) == null ? void 0 : _a2.nav) == null ? void 0 : _b.allowTouchMove.l) || false
              }
            }
          });
          this.swiperThumbsSlider = swiperThumbsSlider;
          swiperThumbsSlider.slides.forEach((slide, index) => {
            slide.addEventListener("click", () => {
              if (that.swiperSlider) {
                that.swiperSlider.slideTo(index);
              }
              that.$sliderWrapper.trigger("rtcl_thumbnail_clicked", [index, slide]);
            });
          });
        }
        let swiperSlider;
        const swiperSliderDefaultParams = {
          navigation: {
            nextEl: $slider.find(".swiper-button-next").get(0),
            prevEl: $slider.find(".swiper-button-prev").get(0)
          },
          on: {
            init: function(e) {
              const wrap = e.el.closest(".rtcl-slider-wrapper");
              if (wrap) {
                wrap.classList.remove("rtcl-slider-loading");
                wrap.classList.add("rtcl-slider-initialized");
              }
              if (e.slides[e.activeIndex].querySelector("iframe")) {
                e.el.classList.add("active-video-slider");
              }
            }
          }
        };
        if (this.$sliderThumbs.length) {
          swiperSliderDefaultParams.thumbs = {
            swiper: swiperThumbsSlider
          };
        }
        const swiperSliderParams = Object.assign(
          {},
          swiperSliderDefaultParams,
          this.options
        );
        if (this.swiperSlider) {
          swiperSlider = this.swiperSlider;
          this.swiperSlider.parents = swiperSliderParams;
          this.swiperSlider.update();
        } else {
          swiperSlider = new Swiper(this.slider, swiperSliderParams);
          this.swiperSlider = swiperSlider;
        }
        swiperSlider.on("init slideChange", function(e) {
          that.initZoomForTarget(swiperSlider.activeIndex);
          const activeIndex = swiperSlider.activeIndex;
          swiperSlider.slides.forEach((slide, index) => {
            const $iframes = $(slide).find("iframe");
            if ($iframes.length) {
              if (index === activeIndex) {
                $iframes.each(function() {
                  const dataSrc = $(this).attr("data-src");
                  const currentSrc = $(this).attr("src");
                  if (!dataSrc && currentSrc) {
                    $(this).attr("data-src", currentSrc);
                  }
                  if (!currentSrc || currentSrc !== dataSrc) {
                    $(this).attr("src", dataSrc);
                  }
                });
              } else {
                $iframes.each(function() {
                  const dataSrc = $(this).attr("data-src");
                  const currentSrc = $(this).attr("src");
                  $(this).attr("src", "");
                  if (currentSrc && !dataSrc) {
                    $(this).attr("data-src", currentSrc);
                  }
                });
              }
            }
          });
          if (e.slides[e.activeIndex].querySelector("iframe")) {
            e.el.classList.add("active-video-slider");
          } else {
            e.el.classList.remove("active-video-slider");
          }
        });
      };
      this.imagesLoaded = function() {
        let that = this;
        if ($.fn.imagesLoaded.done) {
          this.$sliderWrapper.trigger("rtcl_gallery_loading", this);
          this.$sliderWrapper.trigger("rtcl_gallery_loaded", this);
          return;
        }
        this.$sliderWrapper.imagesLoaded().progress(function(instance, image) {
          that.$sliderWrapper.trigger("rtcl_gallery_loading", [that]);
        }).done(function(instance) {
          that.$sliderWrapper.trigger("rtcl_gallery_loaded", [that]);
        });
      };
      this.initZoom = function() {
        if (!this.zoom_enabled) {
          return;
        }
        this.initZoomForTarget(0);
      };
      this.initZoomForTarget = function(sliderIndex) {
        if (!this.zoom_enabled) {
          return;
        }
        let galleryWidth = this.$slider.width(), zoomEnabled = false, zoomTarget = this.$slider_images.eq(sliderIndex);
        $(zoomTarget).each(function(index, element) {
          let image = $(element).find("img");
          if (parseInt(image.data("large_image_width")) > galleryWidth) {
            zoomEnabled = true;
            return false;
          }
        });
        if (zoomEnabled) {
          let zoom_options = $.extend(
            {
              touch: false
            },
            this.settings.zoom_options
          );
          if ("ontouchstart" in document.documentElement) {
            zoom_options.on = "click";
          }
          zoomTarget.trigger("zoom.destroy");
          zoomTarget.zoom(zoom_options);
          this.$sliderWrapper.on("rtcl_gallery_init_zoom", this.initZoom);
        }
      };
      this.initPhotoswipe = function() {
        if (!this.photoswipe_enabled) {
          return;
        }
        this.$slider.prepend(
          '<a href="#" class="rtcl-listing-gallery__trigger"><i class="rtcl-icon-search"></i></i> </a>'
        );
        this.$slider.on(
          "click",
          ".rtcl-listing-gallery__trigger",
          this.openPhotoswipe.bind(this)
        );
      };
      this.getGalleryItems = function() {
        let $slides = this.$slider_images, items = [];
        if ($slides.length > 0) {
          $slides.each(function(i, el) {
            let img = $(el).find("img");
            if (img.length) {
              let large_image_src = img.attr("data-large_image"), large_image_w = img.attr("data-large_image_width"), large_image_h = img.attr("data-large_image_height"), item = {
                src: large_image_src,
                w: large_image_w,
                h: large_image_h,
                title: img.attr("data-caption") ? img.attr("data-caption") : img.attr("title")
              };
              items.push(item);
            }
          });
        }
        return items;
      };
      this.openPhotoswipe = function(e) {
        e.preventDefault();
        let pswpElement = $(".pswp")[0], items = this.getGalleryItems(), eventTarget = $(e.target), clicked;
        if ($(e.currentTarget).hasClass("rtcl-listing-gallery__trigger") || $(e.currentTarget).closest(".rtcl-listing-gallery__trigger") || eventTarget.is(".rtcl-listing-gallery__trigger") || eventTarget.is(".rtcl-listing-gallery__trigger img")) {
          clicked = this.$slider.find(".swiper-slide.swiper-slide-active");
        } else {
          clicked = eventTarget.closest(".rtcl-slider-item");
        }
        let options = $.extend(
          {
            index: $(clicked).index()
          },
          this.settings.photoswipe_options
        );
        const photoswipe = new PhotoSwipe(
          pswpElement,
          PhotoSwipeUI_Default,
          items,
          options
        );
        photoswipe.init();
      };
      this.hideLoader = function() {
        this.$sliderWrapper.removeClass("rtcl-slider-loading").addClass("rtcl-slider-initialized");
      };
      this.start = function() {
        const that = this;
        this.init();
        this.$sliderWrapper.on("rtcl_gallery_loaded", this.init.bind(this));
        setTimeout(function() {
          that.imagesLoaded();
        }, 1);
        setTimeout(function() {
          that.hideLoader();
        }, 3e3);
      };
      this.init = function() {
        this.initSlider();
        this.initZoom();
        this.initPhotoswipe();
      };
      this.start();
    };
    const printListing = function($listing) {
      if (!$listing.length) {
        window.print();
        return;
      }
      const clean = function($el) {
        const $clone = $el.clone();
        $clone.find("button, script, .rtcl-popup-wrapper, .rtcl-sm-share-panel, .rtcl-listing-gallery__trigger, .rtcl-sm-header-price").remove();
        return $clone.length ? $clone.prop("outerHTML") : "";
      };
      const $mainImg = $listing.find(".rtcl-slider-item img").first(), mainImgSrc = $mainImg.attr("data-large_image") || $mainImg.attr("src") || "", $price = $listing.find(".rtcl-sm-contact > .rtcl-price-wrap").first(), sellerName = $.trim($listing.find(".rtcl-sm-contact .rtcl-listing-author").first().text()), sellerPlace = $.trim($listing.find(".rtcl-sm-contact .locations").first().text()), url = window.location.href.split("#")[0], styles = $('link[rel="stylesheet"][id^="rtcl-public"]').map(function() {
        return '<link rel="stylesheet" href="' + $(this).attr("href") + '">';
      }).get().join("");
      let body = clean($listing.find(".rtcl-sm-header").first()) + clean($price);
      if (mainImgSrc) {
        body += '<img class="rtcl-print-photo" src="' + mainImgSrc + '" alt="">';
      }
      body += clean($listing.find(".rtcl-sm-overview").first());
      if (sellerName || sellerPlace) {
        body += '<p class="rtcl-print-seller"><strong>' + $("<span>").text(sellerName).html() + "</strong>" + (sellerPlace ? " &middot; " + $("<span>").text(sellerPlace).html() : "") + "</p>";
      }
      body += '<p class="rtcl-print-url">' + $("<span>").text(url).html() + "</p>";
      const frame = document.createElement("iframe");
      frame.setAttribute("aria-hidden", "true");
      frame.style.cssText = "position:fixed;right:0;bottom:0;width:900px;height:0;border:0;visibility:hidden;";
      document.body.appendChild(frame);
      const doc = frame.contentWindow.document;
      doc.open();
      doc.write(
        '<!doctype html><html><head><meta charset="utf-8"><title>' + $("<span>").text(document.title).html() + "</title>" + styles + `<style>@page{margin:14mm}body{margin:0;background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#16171A;-webkit-print-color-adjust:exact;print-color-adjust:exact}.rtcl-single-modern--default{gap:14px!important}.rtcl-sm-card{border:1px solid #E7E6E2!important;box-shadow:none!important;break-inside:auto}.rtcl-cfp-item,.rtcl-print-photo{break-inside:avoid}.rtcl-price-wrap{margin:0}.rtcl-print-photo{display:block;width:100%;max-height:420px;object-fit:cover;border-radius:12px}.rtcl-print-seller{margin:0;font-size:14px;color:#4A4C52}.rtcl-print-url{margin:0;font-size:12px;color:#5F6168;word-break:break-all}</style></head><body class="rtcl` + (document.body.classList.contains("rtcl-modern-icons") ? " rtcl-modern-icons" : "") + '"><div class="rtcl-single-modern rtcl-single-modern--default rtcl-print-sheet">' + body + "</div></body></html>"
      );
      doc.close();
      let printed = false;
      const run = function() {
        if (printed) {
          return;
        }
        printed = true;
        frame.contentWindow.focus();
        frame.contentWindow.print();
        setTimeout(function() {
          frame.remove();
        }, 1e3);
      };
      frame.onload = run;
      setTimeout(run, 2500);
    };
    $.fn.rtcl_listing_gallery = function(args) {
      new RtclListingGallery(this, args);
      return this;
    };
    $(document).ready(function() {
      $(".rtcl-slider-wrapper").each(function() {
        $(this).rtcl_listing_gallery();
      });
      $(".rtcl-sm-contact").each(function() {
        const $card = $(this), $authorBody = $card.find(".rtcl-listing-author-info .media-body").first(), $safety = $card.find(".rtcl-sm-actions .rtcl-sm-safety").first(), $reportItem = $card.find(".rtcl-single-listing-action > li").filter(function() {
          return $(this).find(".rtcl-icon-trash").length > 0;
        }).first();
        if ($authorBody.length) {
          $card.find(".rtcl-user-status").first().appendTo($authorBody);
        }
        if ($safety.length && $reportItem.length) {
          $reportItem.children("a").first().addClass("rtcl-sm-report").appendTo($safety);
          $reportItem.remove();
        }
      });
      $(document).on("rtcl.favorite", function() {
        $(".rtcl-sm-actions").each(function() {
          const $wrap = $(this), $link = $wrap.find("#rtcl-favourites .rtcl-favourites").first();
          $link.find(".favourite-label").text(
            $link.hasClass("rtcl-active") ? $wrap.data("fav-saved") : $wrap.data("fav-add")
          );
        });
      });
      $(document).on("click", ".rtcl-sm-share-toggle", function() {
        const $button = $(this), open = $button.attr("aria-expanded") !== "true";
        $button.attr("aria-expanded", open ? "true" : "false");
        $("#" + $button.attr("aria-controls")).prop("hidden", !open);
      }).on("click", ".rtcl-sm-print", function() {
        printListing($(this).closest(".rtcl-single-modern--default"));
      }).on("click", ".rtcl-sm-copy-link", function() {
        const $button = $(this), $label = $button.find("span"), label = $label.text(), url = $button.data("url"), done = function() {
          $button.addClass("is-copied");
          $label.text($button.data("copied"));
          setTimeout(function() {
            $button.removeClass("is-copied");
            $label.text(label);
          }, 1500);
        };
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(url).then(done);
          return;
        }
        const $field = $("<textarea readonly>").val(url).css({ position: "fixed", opacity: 0 }).appendTo("body");
        $field[0].select();
        try {
          document.execCommand("copy");
          done();
        } catch (err) {
        }
        $field.remove();
      });
      $(document).on("click", ".rtcl-file-items .rtcl-file-item-image a", function(e) {
        const settings = window.rtcl_single_listing_localized_params || {}, pswpElement = $(".pswp")[0];
        if (typeof PhotoSwipe === "undefined" || typeof PhotoSwipeUI_Default === "undefined" || !settings.photoswipe_enabled || !pswpElement) {
          return;
        }
        e.preventDefault();
        const $links = $(this).closest(".rtcl-file-items").find(".rtcl-file-item-image a"), items = $links.map(function() {
          const $link = $(this);
          return {
            src: $link.attr("href"),
            w: parseInt($link.attr("data-width"), 10) || 0,
            h: parseInt($link.attr("data-height"), 10) || 0,
            title: $link.find("img").attr("alt") || ""
          };
        }).get(), lightbox = new PhotoSwipe(
          pswpElement,
          PhotoSwipeUI_Default,
          items,
          $.extend({}, settings.photoswipe_options, { index: $links.index(this) })
        );
        lightbox.listen("gettingData", function(index, item) {
          if (item.w > 0 && item.h > 0) {
            return;
          }
          const img = new Image();
          img.onload = function() {
            item.w = this.naturalWidth;
            item.h = this.naturalHeight;
            lightbox.updateSize(true);
          };
          img.src = item.src;
        });
        lightbox.init();
      });
      $(".rtcl-slf-repeater-item").each(function() {
        var $items = $(this).children().length;
        if (1 == $items) {
          $(this).addClass("has-one-item");
        } else {
          $(this).addClass("has-multiple-items");
        }
      });
    });
    jQuery(document).ready(function($2) {
      var $repeater = $2(".rtcl-is-collapsable");
      if (!$repeater.length) return;
      $repeater.each(function() {
        $2(this).find(".rtcl-slf-repeater-item").each(function(index) {
          var $item = $2(this);
          var $fields = $item.find("> .rtcl-slf-repeater-field");
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
