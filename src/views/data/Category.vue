<template>
  <div id="main" style="height: 249px; width: 249px"></div>
</template>

<style></style>
<script>
import * as echarts from "echarts";
export default {
  name: "HelloWorld",
  props: {},
  mounted() {
    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      xAxis: {
        type: "category",
        data: ["30", "31", "6.1", "6.2", "6.3", "6.4", "6.5"],
        axisLine: {
          lineStyle: {
            color: "#CCCCCC",
          },
        },
      },
      yAxis: {
        type: "value",
        data: ["0", "4", "8", "12", "16", "20", "24"],
        axisLine: {
          lineStyle: {
            color: "#CCCCCC",
          },
        },
      },
      series: [
        {
          data: [14, 18, 15, 8, 22, 10, 13],
          type: "bar",
          itemStyle: {
            color: "#547dee",
          },
        },
      ],
    };
    myChart.setOption(option);
  },
};
</script>
