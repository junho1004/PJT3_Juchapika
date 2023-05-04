import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

class ApexChart extends Component {
  static propTypes = {
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    const { startDate, endDate } = this.props;

    this.state = {
      series: [
        {
          name: "전체",
          data: [2, 5, 3, 9, 4, 8, 3, 7],
        },
        {
          name: "광산구",
          data: [5, 1, 7, 8, 4, 6, 8, 5],
        },
        {
          name: "동구",
          data: [8, 6, 7, 1, 8, 2, 6, 4],
        },
        {
          name: "서구",
          data: [4, 6, 7, 1, 8, 2, 6, 4],
        },
        {
          name: "남구",
          data: [9, 6, 7, 1, 8, 2, 6, 4],
        },
        {
          name: "북구",
          data: [3, 6, 7, 1, 8, 2, 6, 4],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [4, 2, 2, 2, 2, 2],
          curve: "straight",
          dashArray: [3, 0, 0, 0, 0, 0],
        },

        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              " - " +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              ""
            );
          },
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: {
          categories: this.generateCategories(startDate, endDate),
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val + " (mins)";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val + " per session";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                },
              },
            },
          ],
        },
        grid: {
          borderColor: "#f1f1f1",
        },
      },
    };
  }

  generateCategories = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const categories = [];

    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      const formattedDate = date.toISOString().slice(0, 10);
      categories.push(formattedDate);
    }

    return categories;
  };

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={300}
            width={600}
          />
        </div>
      </div>
    );
  }
}

export default ApexChart;
