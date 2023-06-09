<template>
  <div id="main" style="width: 600px; height: 620px"></div>
</template>

<script>
import * as echarts from "echarts";
import china from "./china.json";
export default {
  name: "HelloWorld",
  props: {},
  mounted() {
    var myChart = echarts.init(document.getElementById("main"));
    echarts.registerMap("china", china); // 注册地图
    let option = {
      series: [
        {
          type: "map",
          map: "china", // 引入地图数据
          mapType: "jiangsu", // 自定义扩展图表类型
          zoom: 1.2,
          name: "该省的舆情数量",
          itemStyle: {
            Color: "#093773", // 背景颜色
            borderColor: "rgb(54,192,118)", // 边框颜色
          },
          data: [
            {
              name: "北京市",
              value: 21,
            },
            {
              name: "天津市",
              value: 12,
            },
            {
              name: "上海市",
              value: 99,
            },
            {
              name: "重庆市",
              value: 98,
            },
            {
              name: "河北省",
              value: 99,
            },
            {
              name: "河南省",
              value: 29,
            },
            {
              name: "云南省",
              value: 79,
            },
            {
              name: "辽宁省",
              value: 38,
            },
            {
              name: "黑龙江省",
              value: 4,
            },
            {
              name: "湖南省",
              value: 32,
            },
            {
              name: "安徽省",
              value: 84,
            },
            {
              name: "山东省",
              value: 72,
            },
            {
              name: "新疆维吾尔自治区",
              value: 99,
            },
            {
              name: "江苏省",
              value: 70,
            },
            {
              name: "浙江省",
              value: 85,
            },
            {
              name: "江西省",
              value: 11,
            },
            {
              name: "湖北省",
              value: 62,
            },
            {
              name: "广西壮族自治区",
              value: 13,
            },
            {
              name: "甘肃省",
              value: 74,
            },
            {
              name: "山西省",
              value: 78,
            },
            {
              name: "内蒙古自治区",
              value: 74,
            },
            {
              name: "陕西省",
              value: 40,
            },
            {
              name: "吉林省",
              value: 9,
            },
            {
              name: "福建省",
              value: 90,
            },
            {
              name: "贵州省",
              value: 57,
            },
            {
              name: "广东省",
              value: 6,
            },
            {
              name: "青海省",
              value: 52,
            },
            {
              name: "西藏自治区",
              value: 10,
            },
            {
              name: "四川省",
              value: 98,
            },
            {
              name: "宁夏回族自治区",
              value: 11,
            },
            {
              name: "海南省",
              value: 25,
            },
            {
              name: "台湾省",
              value: 86,
            },
            {
              name: "香港特别行政区",
              value: 8,
            },
            {
              name: "澳门特别行政区",
              value: 50,
            },
          ],
          regions: [ //这个地方是关键,通过设置regions,可以实现不同的省份边界线配置不同的颜色,
            {
              name: '北京', //这个名字要和china.js保持一致
              itemStyle: {
                normal: {
                  borderColor: "#fff",
                  borderWidth: 5,
                },
              },
            },
            {
              name: '重庆',
              itemStyle: {
                normal: {
                  borderColor: "red",
                  borderWidth: 5,
                },
              },
            },
          ]
        },
      ],
      tooltip: {
        trigger: "item",
      },
    };
    myChart.setOption(option);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
