(function() {
  "use strict";
  (function($) {
    const rtclLocationDetection = {
      /**
       * Configuration from localized script
       */
      config: window.rtcl_location_detection || {},
      /**
       * Initialize the module
       */
      init: function() {
        this.bindEvents();
        this.maybeAutoDetect();
      },
      /**
       * Bind event handlers
       */
      bindEvents: function() {
        $(document).on("click", "#rtcl-detect-location", this.handleDetectClick.bind(this));
        $(document).on("click", "#rtcl-detect-geo-location", this.handleGeoDetectClick.bind(this));
      },
      /**
       * Auto-detect location on page load if enabled
       */
      maybeAutoDetect: function() {
        const self = this;
        const $wrapLocal = $('.rtcl-location-fields-wrap[data-location-detection="auto"]');
        if ($wrapLocal.length) {
          if (!$wrapLocal.data("has-location")) {
            setTimeout(function() {
              self.detectLocation($wrapLocal);
            }, 500);
          }
        }
        const $wrapGeo = $('.rtcl-geo-location-wrap[data-location-detection="auto"]');
        if ($wrapGeo.length) {
          if (!$wrapGeo.data("has-location")) {
            setTimeout(function() {
              self.detectGeoLocation($wrapGeo);
            }, 500);
          }
        }
      },
      /**
       * Handle detect button click for local location
       */
      handleDetectClick: function(e) {
        e.preventDefault();
        const $btn = $(e.currentTarget);
        const $wrap = $btn.closest(".rtcl-location-fields-wrap");
        this.detectLocation($wrap, $btn);
      },
      /**
       * Handle detect button click for geo location
       */
      handleGeoDetectClick: function(e) {
        e.preventDefault();
        const $btn = $(e.currentTarget);
        const $wrap = $btn.closest(".rtcl-geo-location-wrap");
        this.detectGeoLocation($wrap, $btn);
      },
      /**
       * Detect geo location (simpler flow - no taxonomy matching)
       */
      detectGeoLocation: function($wrap, $btn) {
        var _a;
        const self = this;
        const detectionMethod = this.config.detection_method || "browser_with_ip_fallback";
        if ($btn) {
          $btn.prop("disabled", true);
          $btn.find(".rtcl-detect-location-icon").hide();
          $btn.find(".rtcl-detect-location-loading").show();
        }
        this.showStatus($wrap, ((_a = this.config.i18n) == null ? void 0 : _a.detecting) || "Detecting your location...", "info");
        if (detectionMethod === "ip_only") {
          this.ipGeolocationFallbackForGeo($wrap, $btn);
          return;
        }
        if (!navigator.geolocation) {
          this.ipGeolocationFallbackForGeo($wrap, $btn);
          return;
        }
        navigator.geolocation.getCurrentPosition(
          function(position) {
            self.handleGeoPositionSuccess(position, $wrap, $btn);
          },
          function(error) {
            self.handleGeoPositionError(error, $wrap, $btn);
          },
          {
            enableHighAccuracy: true,
            timeout: 1e4,
            maximumAge: 3e5
          }
        );
      },
      /**
       * Handle successful position for geo location
       */
      handleGeoPositionSuccess: function(position, $wrap, $btn) {
        var _a;
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.showStatus($wrap, ((_a = this.config.i18n) == null ? void 0 : _a.fetching_address) || "Fetching address...", "info");
        this.reverseGeocodeOSMForGeo(lat, lng, $wrap, $btn);
      },
      /**
       * Handle position error for geo location
       */
      handleGeoPositionError: function(error, $wrap, $btn) {
        var _a, _b, _c, _d, _e;
        let message;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = ((_a = this.config.i18n) == null ? void 0 : _a.permission_denied) || "Location permission denied.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = ((_b = this.config.i18n) == null ? void 0 : _b.position_unavailable) || "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            message = ((_c = this.config.i18n) == null ? void 0 : _c.timeout) || "Location request timed out.";
            break;
          default:
            message = ((_d = this.config.i18n) == null ? void 0 : _d.unknown_error) || "An unknown error occurred.";
        }
        this.showStatus($wrap, message + " " + (((_e = this.config.i18n) == null ? void 0 : _e.trying_ip_fallback) || "Trying IP-based detection..."), "info");
        this.ipGeolocationFallbackForGeo($wrap, $btn);
      },
      /**
       * Reverse geocode using OSM for geo location
       */
      reverseGeocodeOSMForGeo: function(lat, lng, $wrap, $btn) {
        const self = this;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
        $.ajax({
          url,
          type: "GET",
          dataType: "json",
          success: function(response) {
            var _a, _b;
            if (response && response.display_name) {
              self.applyGeoLocationData(response.display_name, lat, lng, $wrap);
              self.showStatus($wrap, ((_a = self.config.i18n) == null ? void 0 : _a.location_detected) || "Location detected successfully!", "success");
            } else {
              self.showStatus($wrap, ((_b = self.config.i18n) == null ? void 0 : _b.geocode_failed) || "Could not determine address.", "error");
            }
            self.resetButton($btn);
          },
          error: function() {
            var _a;
            self.showStatus($wrap, ((_a = self.config.i18n) == null ? void 0 : _a.geocode_failed) || "Could not determine address.", "error");
            self.resetButton($btn);
          }
        });
      },
      /**
       * Apply geo location data to form fields
       */
      applyGeoLocationData: function(address, lat, lng, $wrap) {
        const $geoAddress = $("#rtcl-geo-address");
        if ($geoAddress.length) {
          $geoAddress.val(address);
        }
        const $geoWrap = $geoAddress.closest(".rtcl-geo-address-field");
        if ($geoWrap.length) {
          $geoWrap.find("input.latitude").val(lat);
          $geoWrap.find("input.longitude").val(lng);
        }
        this.updateMap(lat, lng);
        $(document).trigger("rtcl_geo_location_detected", [address, lat, lng, $wrap]);
      },
      /**
       * Main detection flow
       */
      detectLocation: function($wrap, $btn) {
        var _a;
        const self = this;
        const detectionMethod = this.config.detection_method || "browser_with_ip_fallback";
        if ($btn) {
          $btn.prop("disabled", true);
          $btn.find(".rtcl-detect-location-icon").hide();
          $btn.find(".rtcl-detect-location-loading").show();
        }
        this.showStatus($wrap, ((_a = this.config.i18n) == null ? void 0 : _a.detecting) || "Detecting your location...", "info");
        if (detectionMethod === "ip_only") {
          this.ipGeolocationFallback($wrap, $btn);
          return;
        }
        if (!navigator.geolocation) {
          this.ipGeolocationFallback($wrap, $btn);
          return;
        }
        navigator.geolocation.getCurrentPosition(
          function(position) {
            self.handlePositionSuccess(position, $wrap, $btn);
          },
          function(error) {
            self.handlePositionError(error, $wrap, $btn);
          },
          {
            enableHighAccuracy: true,
            timeout: 1e4,
            maximumAge: 3e5
            // 5 minutes cache
          }
        );
      },
      /**
       * Handle successful position retrieval
       */
      handlePositionSuccess: function(position, $wrap, $btn) {
        var _a;
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.showStatus($wrap, ((_a = this.config.i18n) == null ? void 0 : _a.fetching_address) || "Fetching address...", "info");
        this.reverseGeocodeOSM(lat, lng, $wrap, $btn);
      },
      /**
       * Handle position error - try MaxMind fallback
       */
      handlePositionError: function(error, $wrap, $btn) {
        var _a, _b, _c, _d, _e;
        let message;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = ((_a = this.config.i18n) == null ? void 0 : _a.permission_denied) || "Location permission denied.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = ((_b = this.config.i18n) == null ? void 0 : _b.position_unavailable) || "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            message = ((_c = this.config.i18n) == null ? void 0 : _c.timeout) || "Location request timed out.";
            break;
          default:
            message = ((_d = this.config.i18n) == null ? void 0 : _d.unknown_error) || "An unknown error occurred.";
        }
        this.showStatus($wrap, message + " " + (((_e = this.config.i18n) == null ? void 0 : _e.trying_ip_fallback) || "Trying IP-based detection..."), "info");
        this.ipGeolocationFallback($wrap, $btn);
      },
      /**
       * IP-based geolocation fallback using MaxMind
       * When coordinates are available, does reverse geocoding to get full address data
       */
      ipGeolocationFallback: function($wrap, $btn) {
        const self = this;
        $.ajax({
          url: this.config.ajax_url,
          type: "POST",
          data: {
            action: "rtcl_ip_geolocation",
            [this.config.nonce_id]: this.config.nonce
          },
          success: function(response) {
            var _a, _b, _c, _d;
            if (response.success && response.data) {
              const data = response.data;
              if (data.detection_unavailable) {
                self.hideStatus($wrap);
                self.resetButton($btn);
                return;
              }
              if (data.location_id) {
                if (data.latitude && data.longitude) {
                  self.showStatus($wrap, ((_a = self.config.i18n) == null ? void 0 : _a.fetching_address) || "Fetching address...", "info");
                  self.reverseGeocodeOSMWithIPData(data, $wrap, $btn);
                } else {
                  self.applyIPLocationData(data, $wrap);
                  self.showStatus(
                    $wrap,
                    (((_b = self.config.i18n) == null ? void 0 : _b.ip_location_detected) || "Location detected from IP: ") + (data.country_name || data.country_code),
                    "success"
                  );
                  self.resetButton($btn);
                }
              } else if (data.country_name) {
                self.showStatus(
                  $wrap,
                  (((_c = self.config.i18n) == null ? void 0 : _c.ip_country_detected) || "Country detected: ") + data.country_name + ". " + (((_d = self.config.i18n) == null ? void 0 : _d.select_manually) || "Please select your location manually."),
                  "warning"
                );
                self.resetButton($btn);
              } else {
                self.hideStatus($wrap);
                self.resetButton($btn);
              }
            } else {
              self.hideStatus($wrap);
              self.resetButton($btn);
            }
          },
          error: function() {
            self.hideStatus($wrap);
            self.resetButton($btn);
          }
        });
      },
      /**
       * Reverse geocode using OSM with IP data already available
       * Combines IP-detected location IDs with reverse-geocoded address data
       */
      reverseGeocodeOSMWithIPData: function(ipData, $wrap, $btn) {
        const self = this;
        const lat = ipData.latitude;
        const lng = ipData.longitude;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
        $.ajax({
          url,
          type: "GET",
          dataType: "json",
          success: function(response) {
            var _a;
            if (response && response.address) {
              const addressData = self.parseOSMResult(response);
              addressData.lat = lat;
              addressData.lng = lng;
              self.fillLocationFields(addressData, $wrap, $btn);
            } else {
              self.applyIPLocationData(ipData, $wrap);
              self.showStatus(
                $wrap,
                (((_a = self.config.i18n) == null ? void 0 : _a.ip_location_detected) || "Location detected from IP: ") + (ipData.country_name || ipData.country_code),
                "success"
              );
              self.resetButton($btn);
            }
          },
          error: function() {
            var _a;
            self.applyIPLocationData(ipData, $wrap);
            self.showStatus(
              $wrap,
              (((_a = self.config.i18n) == null ? void 0 : _a.ip_location_detected) || "Location detected from IP: ") + (ipData.country_name || ipData.country_code),
              "success"
            );
            self.resetButton($btn);
          }
        });
      },
      /**
       * Apply IP-based location data (with city/town matching)
       */
      applyIPLocationData: function(data, $wrap) {
        const $location = $wrap.find("#rtcl-location");
        const $subLocation = $wrap.find("#rtcl-sub-location");
        const $subSubLocation = $wrap.find("#rtcl-sub-sub-location");
        const $subLocationRow = $wrap.find("#sub-location-row");
        const $subSubLocationRow = $wrap.find("#sub-sub-location-row");
        if (data.location_id && $location.length) {
          $location.val(data.location_id);
          if ($location.hasClass("rtcl-select2") && $.fn.select2) {
            $location.trigger("change.select2");
          }
        }
        if (data.sub_locations_html && $subLocation.length) {
          $subLocation.html(data.sub_locations_html);
          $subLocationRow.removeClass("rtcl-hide");
          if ($subLocation.hasClass("rtcl-select2") && $.fn.select2) {
            $subLocation.trigger("change.select2");
          }
        }
        if (data.sub_sub_locations_html && $subSubLocation.length) {
          $subSubLocation.html(data.sub_sub_locations_html);
          $subSubLocationRow.removeClass("rtcl-hide");
          if ($subSubLocation.hasClass("rtcl-select2") && $.fn.select2) {
            $subSubLocation.trigger("change.select2");
          }
        }
        if (data.latitude && data.longitude) {
          this.updateMap(data.latitude, data.longitude);
        }
        $(document).trigger("rtcl_ip_location_detected", [data, $wrap]);
      },
      /**
       * IP-based geolocation fallback for geo location type
       * Uses server-side IP detection and then reverse geocodes to get address
       */
      ipGeolocationFallbackForGeo: function($wrap, $btn) {
        const self = this;
        $.ajax({
          url: this.config.ajax_url,
          type: "POST",
          data: {
            action: "rtcl_ip_geolocation",
            [this.config.nonce_id]: this.config.nonce,
            geo_type: true
            // Flag to indicate geo location type
          },
          success: function(response) {
            var _a, _b;
            if (response.success && response.data) {
              const data = response.data;
              if (data.detection_unavailable) {
                self.hideStatus($wrap);
                self.resetButton($btn);
                return;
              }
              if (data.latitude && data.longitude) {
                self.reverseGeocodeOSMForGeo(data.latitude, data.longitude, $wrap, $btn);
              } else if (data.country_name) {
                self.applyGeoLocationData(data.country_name, "", "", $wrap);
                self.showStatus(
                  $wrap,
                  (((_a = self.config.i18n) == null ? void 0 : _a.ip_country_detected) || "Country detected: ") + data.country_name + ". " + (((_b = self.config.i18n) == null ? void 0 : _b.select_manually) || "Please enter your full address manually."),
                  "warning"
                );
                self.resetButton($btn);
              } else {
                self.hideStatus($wrap);
                self.resetButton($btn);
              }
            } else {
              self.hideStatus($wrap);
              self.resetButton($btn);
            }
          },
          error: function() {
            self.hideStatus($wrap);
            self.resetButton($btn);
          }
        });
      },
      /**
       * Reverse geocode using OpenStreetMap Nominatim
       */
      reverseGeocodeOSM: function(lat, lng, $wrap, $btn) {
        const self = this;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
        $.ajax({
          url,
          type: "GET",
          dataType: "json",
          success: function(response) {
            var _a;
            if (response && response.address) {
              const addressData = self.parseOSMResult(response);
              addressData.lat = lat;
              addressData.lng = lng;
              self.fillLocationFields(addressData, $wrap, $btn);
            } else {
              self.showStatus($wrap, ((_a = self.config.i18n) == null ? void 0 : _a.geocode_failed) || "Could not determine address from location.", "error");
              self.resetButton($btn);
            }
          },
          error: function() {
            var _a;
            self.showStatus($wrap, ((_a = self.config.i18n) == null ? void 0 : _a.geocode_failed) || "Could not determine address from location.", "error");
            self.resetButton($btn);
          }
        });
      },
      /**
       * Parse OpenStreetMap Nominatim result
       */
      parseOSMResult: function(response) {
        const addr = response.address || {};
        const town = addr.suburb || addr.quarter || addr.neighbourhood || "";
        return {
          country: addr.country || "",
          state: addr.state || addr.province || addr.region || "",
          city: addr.city || addr.town || addr.village || addr.municipality || "",
          town,
          zipcode: addr.postcode || "",
          address: [
            addr.house_number,
            addr.road || addr.street,
            town
          ].filter(Boolean).join(" ") || response.display_name || "",
          street: addr.road || addr.street || ""
        };
      },
      /**
       * Fill location fields with detected data
       */
      fillLocationFields: function(data, $wrap, $btn) {
        var _a;
        const self = this;
        this.showStatus($wrap, ((_a = this.config.i18n) == null ? void 0 : _a.matching_locations) || "Matching locations...", "info");
        $.ajax({
          url: this.config.ajax_url,
          type: "POST",
          data: {
            action: "rtcl_match_location_terms",
            [this.config.nonce_id]: this.config.nonce,
            country: data.country,
            state: data.state,
            city: data.city,
            town: data.town,
            zipcode: data.zipcode,
            address: data.address
          },
          success: function(response) {
            var _a2, _b;
            if (response.success) {
              self.applyLocationData(response.data, data, $wrap);
              self.showStatus($wrap, ((_a2 = self.config.i18n) == null ? void 0 : _a2.location_detected) || "Location detected successfully!", "success");
            } else {
              self.showStatus($wrap, ((_b = self.config.i18n) == null ? void 0 : _b.match_failed) || "Could not match location. Please select manually.", "warning");
            }
            self.resetButton($btn);
          },
          error: function() {
            var _a2;
            self.showStatus($wrap, ((_a2 = self.config.i18n) == null ? void 0 : _a2.ajax_error) || "An error occurred. Please try again.", "error");
            self.resetButton($btn);
          }
        });
      },
      /**
       * Apply location data to form fields
       */
      applyLocationData: function(result, rawData, $wrap) {
        const $location = $wrap.find("#rtcl-location");
        const $subLocation = $wrap.find("#rtcl-sub-location");
        const $subSubLocation = $wrap.find("#rtcl-sub-sub-location");
        const $subLocationRow = $wrap.find("#sub-location-row");
        const $subSubLocationRow = $wrap.find("#sub-sub-location-row");
        if (result.location_id && $location.length) {
          $location.val(result.location_id);
          if ($location.hasClass("rtcl-select2") && $.fn.select2) {
            $location.trigger("change.select2");
          }
        }
        if (result.sub_locations_html && $subLocation.length) {
          $subLocation.html(result.sub_locations_html);
          $subLocationRow.removeClass("rtcl-hide");
          if ($subLocation.hasClass("rtcl-select2") && $.fn.select2) {
            $subLocation.trigger("change.select2");
          }
        }
        if (result.sub_sub_locations_html && $subSubLocation.length) {
          $subSubLocation.html(result.sub_sub_locations_html);
          $subSubLocationRow.removeClass("rtcl-hide");
          if ($subSubLocation.hasClass("rtcl-select2") && $.fn.select2) {
            $subSubLocation.trigger("change.select2");
          }
        }
        if (result.zipcode) {
          $wrap.find("#rtcl-zipcode").val(result.zipcode);
        }
        if (result.address) {
          $wrap.find("#rtcl-address").val(result.address);
        }
        const $geoAddress = $("#rtcl-geo-address");
        if ($geoAddress.length && rawData.address) {
          $geoAddress.val(rawData.address);
        }
        if (rawData.lat && rawData.lng) {
          this.updateMap(rawData.lat, rawData.lng);
        }
        $(document).trigger("rtcl_location_detected", [result, rawData, $wrap]);
      },
      /**
       * Update map marker position and hidden lat/lng fields
       */
      updateMap: function(lat, lng) {
        const $latitude = $("#rtcl-latitude");
        const $longitude = $("#rtcl-longitude");
        if ($latitude.length) {
          $latitude.val(lat);
        }
        if ($longitude.length) {
          $longitude.val(lng);
        }
        const $map = $(".rtcl-map");
        if (!$map.length) {
          return;
        }
        $map.find(".marker").attr("data-latitude", lat).attr("data-longitude", lng);
        if (typeof google !== "undefined" && google.maps && $map.data("map")) {
          const map = $map.data("map");
          const marker = $map.data("marker");
          const latLng = new google.maps.LatLng(lat, lng);
          if (map) {
            map.setCenter(latLng);
          }
          if (marker) {
            marker.setPosition(latLng);
          }
        }
        if (typeof L !== "undefined") {
          const latLng = L.latLng(lat, lng);
          let mapUpdated = false;
          $map.each(function() {
            const mapEl = this;
            if (mapEl._leaflet_id) {
              const map = L.DomUtil.get(mapEl)._leaflet;
              if (map) {
                map.panTo(latLng);
                map.eachLayer(function(layer) {
                  if (layer instanceof L.Marker) {
                    layer.setLatLng(latLng);
                  }
                });
                mapUpdated = true;
              }
            }
          });
          if (!mapUpdated) {
            $map.each(function() {
              const el = this;
              for (let key in el) {
                if (key.startsWith("_leaflet") && el[key] && typeof el[key].panTo === "function") {
                  const map = el[key];
                  map.panTo(latLng);
                  map.eachLayer(function(layer) {
                    if (layer instanceof L.Marker) {
                      layer.setLatLng(latLng);
                    }
                  });
                  mapUpdated = true;
                  break;
                }
              }
            });
          }
          if (!mapUpdated) {
            $(document).trigger("rtcl_location_detection_update_map", [lat, lng]);
          }
        }
      },
      /**
       * Show status message
       */
      showStatus: function($wrap, message, type) {
        const $status = $wrap.find(".rtcl-detect-location-status");
        if ($status.length) {
          $status.text(message).removeClass("rtcl-status-info rtcl-status-success rtcl-status-warning rtcl-status-error").addClass("rtcl-status-" + type).show();
          if (type === "success" || type === "info") {
            setTimeout(function() {
              $status.fadeOut();
            }, 5e3);
          }
        }
      },
      /**
       * Hide status message (for silent failures)
       */
      hideStatus: function($wrap) {
        const $status = $wrap.find(".rtcl-detect-location-status");
        if ($status.length) {
          $status.hide().text("").removeClass("rtcl-status-info rtcl-status-success rtcl-status-warning rtcl-status-error");
        }
      },
      /**
       * Reset button to normal state
       */
      resetButton: function($btn) {
        if ($btn && $btn.length) {
          $btn.prop("disabled", false);
          $btn.find(".rtcl-detect-location-icon").show();
          $btn.find(".rtcl-detect-location-loading").hide();
        }
      }
    };
    $(function() {
      rtclLocationDetection.init();
    });
    window.rtclLocationDetection = rtclLocationDetection;
  })(jQuery);
})();
