(function() {
  "use strict";
  (function($) {
    var revenueChartObj = null;
    var revenueDates = [];
    function render_revenue_chart(data) {
      var canvas = document.getElementById("rtcl-revenue-reports");
      if (!canvas || typeof Chart !== "function") {
        return;
      }
      var labels, values;
      if (data && data.labels) {
        labels = data.labels;
        values = data.values || [];
        revenueDates = data.dates || [];
      } else if (data) {
        labels = Object.keys(data);
        values = Object.values(data);
        revenueDates = labels;
      } else {
        return;
      }
      if (revenueChartObj) {
        revenueChartObj.destroy();
        revenueChartObj = null;
      }
      var ctx = canvas.getContext("2d");
      var gradient = ctx.createLinearGradient(0, 0, 0, canvas.parentElement.clientHeight || 300);
      gradient.addColorStop(0, "rgba(50, 50, 255, 0.15)");
      gradient.addColorStop(1, "rgba(50, 50, 255, 0.01)");
      revenueChartObj = new Chart(canvas, {
        type: "line",
        data: {
          labels,
          datasets: [{
            label: "Revenue",
            fill: true,
            backgroundColor: gradient,
            borderColor: "rgba(50,50,255, 0.6)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(50,50,255,1)",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.3,
            data: values
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              boxPadding: 5,
              callbacks: {
                title: function(tooltipItems) {
                  var idx = tooltipItems[0].dataIndex;
                  return revenueDates[idx] || labels[idx] || "";
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: "#8898aa",
                font: { size: 12 }
              },
              grid: {
                color: "rgba(0,0,0,0.05)",
                drawBorder: false
              }
            },
            x: {
              ticks: {
                color: "#8898aa",
                font: { size: 12 }
              },
              grid: { display: false }
            }
          }
        }
      });
    }
    function init_revenue_chart() {
      if (typeof Chart !== "function") {
        return;
      }
      var data = rtcl_chart_vars.revenue_data;
      if (data) {
        render_revenue_chart(data);
      }
      $("#rtcl-revenue-range").on("change", function() {
        var range = $(this).val();
        var $select = $(this);
        var $customWrap = $("#rtcl-revenue-custom-date");
        if (range === "custom") {
          $customWrap.show();
          return;
        }
        $customWrap.hide();
        $("#rtcl-revenue-report-search").val("");
        $select.prop("disabled", true);
        $.ajax({
          url: rtcl.ajaxurl,
          type: "POST",
          data: {
            action: "rtcl_revenue_range",
            range,
            __rtcl_wpnonce: rtcl.__rtcl_wpnonce
          },
          success: function(res) {
            if (res.success && res.data) {
              render_revenue_chart(res.data);
            }
          },
          error: function(e) {
            console.log(e.responseText);
          },
          complete: function() {
            $select.prop("disabled", false);
          }
        });
      });
      $("#rtcl-revenue-report-search").on("apply.daterangepicker", function(ev, picker) {
        var dateFormat = "M/D/Y";
        var startDate = picker.startDate.format(dateFormat);
        var endDate = picker.endDate.format(dateFormat);
        var startDay = moment(startDate, dateFormat);
        var endDay = moment(endDate, dateFormat);
        var dayDifference = endDay.diff(startDay, "days");
        var chartType = "daily";
        if (dayDifference > 300) {
          chartType = "monthly";
        } else if (dayDifference > 100) {
          chartType = "weekly";
        }
        $.ajax({
          url: rtcl.ajaxurl,
          type: "POST",
          data: {
            action: "rtcl_revenue_order_search",
            start_date: startDate,
            end_date: endDate,
            chart_type: chartType,
            __rtcl_wpnonce: rtcl.__rtcl_wpnonce
          },
          success: function(res) {
            var tempData = res.data;
            var countResponseData = Object.keys(tempData).length;
            var xValues = [];
            var yValues = [];
            if (countResponseData > 50) {
              if ("monthly" === chartType) {
                var monthlyData = getMonthlyData(tempData);
                xValues = Object.keys(monthlyData);
                yValues = Object.values(monthlyData);
              } else {
                var weeklyData = getDateIntervalData(tempData);
                weeklyData.forEach(function(item) {
                  xValues.push(item.date);
                  yValues.push(item.price);
                });
              }
            } else {
              xValues = Object.keys(tempData);
              yValues = Object.values(tempData);
            }
            render_revenue_chart({ labels: xValues, values: yValues, dates: xValues });
          },
          error: function(e) {
            console.log(e.responseText);
          }
        });
      });
      $("#rtcl-revenue-report-search").on("cancel.daterangepicker", function() {
        $(this).val("");
      });
    }
    function getDateIntervalData(tempData) {
      var dateList = [];
      var firstDate = Object.keys(tempData)[0];
      var lastDate = Object.keys(tempData)[Object.keys(tempData).length - 1];
      firstDate = new Date(firstDate);
      lastDate = new Date(lastDate);
      while (firstDate <= lastDate) {
        dateList.push(new Date(firstDate));
        firstDate.setDate(firstDate.getDate() + 7);
      }
      var lastDateFromList = dateList[dateList.length - 1];
      if (lastDateFromList !== lastDate) {
        dateList.push(new Date(lastDate));
      }
      var weeklyData = [];
      dateList.forEach(function(date) {
        var totalTempDataAmount = 0;
        Object.keys(tempData).forEach(function(orderDate) {
          var formatOrderDate = new Date(orderDate);
          if (formatOrderDate <= date) {
            totalTempDataAmount += tempData[orderDate];
            delete tempData[orderDate];
          }
        });
        var weeklyDateFormat = moment(date).format("D MMM, YYYY");
        weeklyData.push({
          "date": weeklyDateFormat,
          "price": totalTempDataAmount
        });
      });
      return weeklyData;
    }
    function getMonthlyData(dateList) {
      var monthlyCounts = [];
      for (var date in dateList) {
        if (dateList.hasOwnProperty(date)) {
          var dateObj = new Date(date);
          var monthYear = dateObj.toLocaleString("en-us", { month: "short", year: "numeric" });
          if (!monthlyCounts[monthYear]) {
            monthlyCounts[monthYear] = 0;
          }
          monthlyCounts[monthYear] += dateList[date];
        }
      }
      return monthlyCounts;
    }
    var adViewsChartInstance = null;
    function render_ad_views_chart(data) {
      var canvas = document.getElementById("rtcl-ad-views-chart");
      if (!canvas || typeof Chart !== "function") {
        return;
      }
      if (!data) {
        data = rtcl_chart_vars.ad_views_data;
      }
      if (!data) {
        return;
      }
      var labels = data.labels || [];
      var values = data.values || [];
      var dates = data.dates || [];
      if (adViewsChartInstance) {
        adViewsChartInstance.destroy();
        adViewsChartInstance = null;
      }
      var ctx = canvas.getContext("2d");
      var gradient = ctx.createLinearGradient(0, 0, 0, canvas.parentElement.clientHeight || 250);
      gradient.addColorStop(0, "rgba(74, 108, 247, 0.25)");
      gradient.addColorStop(1, "rgba(74, 108, 247, 0.02)");
      adViewsChartInstance = new Chart(canvas, {
        type: "line",
        data: {
          labels,
          datasets: [{
            label: "Ad Views",
            data: values,
            fill: true,
            backgroundColor: gradient,
            borderColor: "#4a6cf7",
            borderWidth: 2.5,
            pointBackgroundColor: "#4a6cf7",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              boxPadding: 5,
              callbacks: {
                title: function(tooltipItems) {
                  var idx = tooltipItems[0].dataIndex;
                  return dates[idx] || labels[idx] || "";
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
                color: "#8898aa",
                font: { size: 12 }
              },
              grid: {
                color: "rgba(0,0,0,0.05)",
                drawBorder: false
              }
            },
            x: {
              ticks: {
                color: "#8898aa",
                font: { size: 12 }
              },
              grid: { display: false }
            }
          }
        }
      });
    }
    function on_ad_views_range_change() {
      $("#rtcl-ad-views-range").on("change", function() {
        var range = $(this).val();
        var $select = $(this);
        var $customWrap = $("#rtcl-ad-views-custom-date");
        if (range === "custom") {
          $customWrap.show();
          return;
        }
        $customWrap.hide();
        $("#rtcl-ad-views-daterange").val("");
        $select.prop("disabled", true);
        $.ajax({
          url: rtcl.ajaxurl,
          type: "POST",
          data: {
            action: "rtcl_ad_views_range",
            range,
            __rtcl_wpnonce: rtcl.__rtcl_wpnonce
          },
          success: function(res) {
            if (res.success && res.data) {
              render_ad_views_chart(res.data);
            }
          },
          error: function(e) {
            console.log(e.responseText);
          },
          complete: function() {
            $select.prop("disabled", false);
          }
        });
      });
      $("#rtcl-ad-views-daterange").on("apply.daterangepicker", function(ev, picker) {
        var dateFormat = "M/D/Y";
        var startDate = picker.startDate.format(dateFormat);
        var endDate = picker.endDate.format(dateFormat);
        $.ajax({
          url: rtcl.ajaxurl,
          type: "POST",
          data: {
            action: "rtcl_ad_views_range",
            range: "custom",
            start_date: startDate,
            end_date: endDate,
            __rtcl_wpnonce: rtcl.__rtcl_wpnonce
          },
          success: function(res) {
            if (res.success && res.data) {
              render_ad_views_chart(res.data);
            }
          },
          error: function(e) {
            console.log(e.responseText);
          }
        });
      });
      $("#rtcl-ad-views-daterange").on("cancel.daterangepicker", function() {
        $(this).val("");
      });
    }
    function render_distribution_chart() {
      var canvas = document.getElementById("rtcl-distribution-chart");
      var legendEl = document.getElementById("rtcl-distribution-legend");
      if (!canvas || typeof Chart !== "function" || !rtcl_chart_vars.listings_distribution) {
        return;
      }
      var rawData = rtcl_chart_vars.listings_distribution;
      if (!rawData.length) {
        return;
      }
      var labels = [];
      var values = [];
      var colors = [
        "#4a6cf7",
        "#f59e0b",
        "#10b981",
        "#ef4444",
        "#8b5cf6",
        "#06b6d4",
        "#ec4899",
        "#f97316",
        "#14b8a6",
        "#6366f1"
      ];
      for (var i = 0; i < rawData.length; i++) {
        labels.push(rawData[i].name);
        values.push(rawData[i].count);
      }
      new Chart(canvas, {
        type: "doughnut",
        data: {
          labels,
          datasets: [{
            data: values,
            backgroundColor: colors.slice(0, labels.length),
            borderWidth: 2,
            borderColor: "#fff",
            hoverBorderColor: "#fff",
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "65%",
          plugins: {
            legend: { display: false },
            tooltip: {
              boxPadding: 5
            }
          }
        }
      });
      if (legendEl) {
        var html = "";
        for (var j = 0; j < labels.length; j++) {
          html += '<div class="rtcl-legend-item"><span class="rtcl-legend-color" style="background:' + colors[j % colors.length] + '"></span><span class="rtcl-legend-label">' + labels[j] + '</span><span class="rtcl-legend-value">' + values[j] + "</span></div>";
        }
        legendEl.innerHTML = html;
      }
    }
    var topListingsChartInstance = null;
    function render_top_listings_chart(data) {
      var canvas = document.getElementById("rtcl-top-listings-chart");
      if (!canvas || typeof Chart !== "function") {
        return;
      }
      if (!data) {
        data = rtcl_chart_vars.top_listings_by_views;
      }
      if (!data || !data.length) {
        return;
      }
      var labels = [];
      var values = [];
      for (var i = 0; i < data.length; i++) {
        labels.push(data[i].title);
        values.push(data[i].views);
      }
      if (topListingsChartInstance) {
        topListingsChartInstance.destroy();
        topListingsChartInstance = null;
      }
      topListingsChartInstance = new Chart(canvas, {
        type: "bar",
        data: {
          labels,
          datasets: [{
            label: "Views",
            data: values,
            backgroundColor: "#4a6cf7",
            borderRadius: 4,
            barThickness: 18,
            maxBarThickness: 22
          }]
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              boxPadding: 5
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                precision: 0,
                color: "#8898aa",
                font: { size: 11 }
              },
              grid: {
                color: "rgba(0,0,0,0.05)",
                drawBorder: false
              }
            },
            y: {
              ticks: {
                color: "#334155",
                font: { size: 11 }
              },
              grid: { display: false }
            }
          }
        }
      });
    }
    function on_top_listings_limit_change() {
      $("#rtcl-top-listings-limit").on("change", function() {
        var limit = $(this).val();
        var $select = $(this);
        $select.prop("disabled", true);
        $.ajax({
          url: rtcl.ajaxurl,
          type: "POST",
          data: {
            action: "rtcl_top_listings_by_views",
            limit,
            __rtcl_wpnonce: rtcl.__rtcl_wpnonce
          },
          success: function(res) {
            if (res.success && res.data) {
              render_top_listings_chart(res.data);
            }
          },
          error: function(e) {
            console.log(e.responseText);
          },
          complete: function() {
            $select.prop("disabled", false);
          }
        });
      });
    }
    $(document).ready(function() {
      init_revenue_chart();
      render_ad_views_chart();
      on_ad_views_range_change();
      render_distribution_chart();
      render_top_listings_chart();
      on_top_listings_limit_change();
    });
  })(jQuery);
})();
