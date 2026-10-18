(function() {
  "use strict";
  (function() {
    var NONCE_KEY = "__rtcl_wpnonce";
    var modal;
    var currentListingId = null;
    var charts = { views: null, engagement: null };
    var RANGES = [
      { value: 7, label: "Last 7 Days" },
      { value: 30, label: "Last 30 Days" },
      { value: 90, label: "Last 90 Days" }
    ];
    function buildModal() {
      if (modal) {
        return modal;
      }
      var rangeOptions = RANGES.map(function(r) {
        return '<option value="' + r.value + '"' + (r.value === 7 ? " selected" : "") + ">" + r.label + "</option>";
      }).join("");
      modal = document.createElement("div");
      modal.className = "rtcl-analytics-modal";
      modal.setAttribute("aria-hidden", "true");
      modal.innerHTML = '<div class="rtcl-analytics-modal-overlay" data-rtcl-analytics-close></div><div class="rtcl-analytics-modal-dialog" role="dialog" aria-modal="true" aria-label="Listing analytics"><div class="rtcl-analytics-modal-header"><div class="rtcl-analytics-modal-heading"><h3 class="rtcl-analytics-modal-title"></h3><p class="rtcl-analytics-modal-subtitle"></p></div><button type="button" class="rtcl-analytics-modal-close" data-rtcl-analytics-close aria-label="Close">&times;</button></div><div class="rtcl-analytics-toolbar"><select class="rtcl-analytics-range">' + rangeOptions + '</select></div><div class="rtcl-analytics-content"></div></div>';
      document.body.appendChild(modal);
      modal.addEventListener("click", function(event) {
        if (event.target.hasAttribute("data-rtcl-analytics-close")) {
          closeModal();
        }
      });
      modal.querySelector(".rtcl-analytics-range").addEventListener("change", function() {
        if (currentListingId) {
          loadAnalytics(currentListingId, this.value);
        }
      });
      return modal;
    }
    function openModal(listingId) {
      var root = buildModal();
      currentListingId = listingId;
      root.querySelector(".rtcl-analytics-modal-title").textContent = "";
      root.querySelector(".rtcl-analytics-modal-subtitle").textContent = "";
      root.querySelector(".rtcl-analytics-range").value = "7";
      root.classList.add("is-open");
      root.setAttribute("aria-hidden", "false");
      document.body.classList.add("rtcl-analytics-modal-open");
    }
    function closeModal() {
      if (!modal) {
        return;
      }
      destroyCharts();
      currentListingId = null;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("rtcl-analytics-modal-open");
    }
    function destroyCharts() {
      ["views", "engagement"].forEach(function(key) {
        if (charts[key]) {
          charts[key].destroy();
          charts[key] = null;
        }
      });
    }
    function showLoading() {
      destroyCharts();
      modal.querySelector(".rtcl-analytics-content").innerHTML = '<div class="rtcl-analytics-loading"><span class="rtcl-analytics-spinner"></span></div>';
    }
    function renderMessage(message) {
      if (!modal) {
        return;
      }
      destroyCharts();
      var content = modal.querySelector(".rtcl-analytics-content");
      content.innerHTML = '<p class="rtcl-analytics-error"></p>';
      content.querySelector(".rtcl-analytics-error").textContent = message;
    }
    function loadAnalytics(listingId, range) {
      if (typeof window.rtcl === "undefined" || !window.rtcl.ajaxurl) {
        renderMessage("Configuration error.");
        return;
      }
      showLoading();
      var body = new FormData();
      body.append("action", "rtcl_get_listing_analytics");
      body.append("listing_id", listingId);
      body.append("range", range || "7");
      body.append(NONCE_KEY, window.rtcl[NONCE_KEY] || "");
      fetch(window.rtcl.ajaxurl, {
        method: "POST",
        credentials: "same-origin",
        body
      }).then(function(response) {
        return response.json();
      }).then(function(res) {
        if (!modal || !modal.classList.contains("is-open")) {
          return;
        }
        if (res && res.success && res.data) {
          render(res.data);
        } else {
          renderMessage(res && res.data && res.data.message || "Unable to load analytics.");
        }
      }).catch(function() {
        renderMessage("Unable to load analytics.");
      });
    }
    function render(data) {
      modal.querySelector(".rtcl-analytics-modal-title").textContent = data.title || "";
      modal.querySelector(".rtcl-analytics-modal-subtitle").textContent = data.subtitle || "";
      var cardsHtml = (data.cards || []).map(function(card) {
        return '<div class="rtcl-analytics-card"><span class="rtcl-analytics-card-value" style="color:' + escapeAttr(card.color) + '">' + formatNumber(card.value) + '</span><span class="rtcl-analytics-card-label">' + escapeHtml(card.label) + "</span></div>";
      }).join("");
      var updatedHtml = data.last_updated ? '<p class="rtcl-analytics-updated">' + escapeHtml(data.last_updated) + "</p>" : "";
      var content = modal.querySelector(".rtcl-analytics-content");
      content.innerHTML = '<div class="rtcl-analytics-cards">' + cardsHtml + "</div>" + updatedHtml + '<div class="rtcl-analytics-chart-block"><h4 class="rtcl-analytics-chart-title">' + escapeHtml(data.views ? data.views.label : "") + '</h4><div class="rtcl-analytics-canvas-wrap"><canvas class="rtcl-views-canvas" height="200"></canvas></div></div><div class="rtcl-analytics-chart-block"><h4 class="rtcl-analytics-chart-title">' + escapeHtml(data.engagement ? data.engagement.label : "") + '</h4><div class="rtcl-analytics-canvas-wrap"><canvas class="rtcl-engagement-canvas" height="220"></canvas></div></div>';
      if (typeof window.Chart === "undefined") {
        return;
      }
      renderViewsChart(data.labels || [], data.views || {});
      renderEngagementChart(data.labels || [], data.engagement || {});
    }
    function renderViewsChart(labels, views) {
      var canvas = modal.querySelector(".rtcl-views-canvas");
      if (!canvas) {
        return;
      }
      charts.views = new window.Chart(canvas.getContext("2d"), {
        type: "bar",
        data: {
          labels,
          datasets: [{
            label: views.label || "Views",
            data: views.data || [],
            backgroundColor: views.color || "#4a6cf7",
            borderRadius: 4,
            maxBarThickness: 46
          }]
        },
        options: baseOptions(false)
      });
    }
    function renderEngagementChart(labels, engagement) {
      var canvas = modal.querySelector(".rtcl-engagement-canvas");
      if (!canvas) {
        return;
      }
      var datasets = (engagement.datasets || []).map(function(ds) {
        return {
          label: ds.label,
          data: ds.data || [],
          borderColor: ds.color,
          backgroundColor: ds.color,
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          fill: false
        };
      });
      charts.engagement = new window.Chart(canvas.getContext("2d"), {
        type: "line",
        data: { labels, datasets },
        options: baseOptions(true)
      });
    }
    function baseOptions(showLegend) {
      var isNarrow = (window.innerWidth || document.documentElement.clientWidth || 0) <= 560;
      return {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 100,
        interaction: { intersect: false, mode: "index" },
        layout: { padding: { top: 4 } },
        plugins: {
          legend: {
            display: showLegend,
            position: "bottom",
            labels: {
              usePointStyle: true,
              boxWidth: 10,
              padding: isNarrow ? 14 : 24,
              font: { size: isNarrow ? 11 : 12 }
            }
          },
          tooltip: {
            bodyFont: { size: isNarrow ? 11 : 12 },
            titleFont: { size: isNarrow ? 11 : 12 }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              autoSkip: true,
              maxRotation: isNarrow ? 0 : 40,
              autoSkipPadding: 8,
              font: { size: isNarrow ? 10 : 11 }
            }
          },
          y: {
            beginAtZero: true,
            ticks: { precision: 0, font: { size: isNarrow ? 10 : 11 } },
            grid: { color: "#f1f3f7" }
          }
        }
      };
    }
    function formatNumber(value) {
      var n = parseInt(value, 10) || 0;
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function escapeHtml(str) {
      var div = document.createElement("div");
      div.textContent = str == null ? "" : String(str);
      return div.innerHTML;
    }
    function escapeAttr(str) {
      return escapeHtml(str).replace(/"/g, "&quot;");
    }
    document.addEventListener("click", function(event) {
      var btn = event.target.closest(".rtcl-listing-analytics-btn");
      if (!btn) {
        return;
      }
      event.preventDefault();
      openModal(btn.getAttribute("data-listing-id"));
      loadAnalytics(btn.getAttribute("data-listing-id"), "7");
    });
    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  })();
})();
