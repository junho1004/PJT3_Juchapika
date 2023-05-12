import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

class ApexChart extends Component {

  static propTypes = {
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    chartData: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    const { startDate, endDate, chartData } = this.props;
    
    console.log("========");
    console.log(chartData);
    console.log(startDate);
    console.log(endDate);
    console.log("========");

    const total_data = [];

    const series = [  
      {    
        name: "전체",    
        data: total_data,  
      },  
      {    
        name: "남구",    
        data: [],
      },
      {
        name: "동구",
        data: [],
      },
      {
        name: "서구",
        data: [],
      },
      {
        name: "광산구",
        data: [],
      },
      {
        name: "북구",
        data: [],
      },
    ];


    // chartData 의 key(날짜) 값들을 기준으로 (남구, 동구, 서구, 광산구, 북구) 의 단속정보들을 받아온다.
    // start 날짜를 기준으로 
    for (let date = new Date(startDate); date <= new Date(endDate); date.setDate(date.getDate() + 1)) {
      const startDateObj = new Date(date);
      const key = startDateObj.getFullYear() + '-' + ('0' + (startDateObj.getMonth() + 1)).slice(-2) + '-' + ('0' + startDateObj.getDate()).slice(-2);
      console.log(chartData[key]);
      if (chartData[key] != undefined) {
        for (let i = 1; i < series.length; i++) {
          series[i].data.push(chartData[key][series[i].name]);
        }
      } else {
        for (let i = 1; i < series.length; i++) {
          series[i].data.push(0);
        }
      }

    }

    for (let i = 0; i < series[1]["data"].length; i++) {
      const total =
        series[1]["data"][i] +
        series[2]["data"][i] +
        series[3]["data"][i] +
        series[4]["data"][i] +
        series[5]["data"][i];
      total_data.push(total);
    }
    
    this.state = {
      series,
      options: {
        chart: {
          height: 350,
          type: "line",
          offsetX: -10,
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
    start.setDate(start.getDate() + 1)
    const end = new Date(endDate);
    end.setDate(end.getDate() + 1)
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
  }}

export default ApexChart;