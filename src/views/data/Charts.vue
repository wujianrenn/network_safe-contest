<template>
  <el-row :gutter="10">
    <el-col :span="15">
      <el-card shadow="hover">
        <template #header>折线图</template>
        <div ref="lineRef"></div>
      </el-card>
    </el-col>
    <el-col :span="9">
      <el-card shadow="hover">
        <template #header>饼图</template>
        <div ref="pieRef"></div>
      </el-card>
    </el-col>
    <el-col :span="12" style="margin-top: 10px">
      <el-card shadow="hover">
        <template #header>堆叠图</template>
        <div ref="areaRef"></div>
      </el-card>
    </el-col>
    <el-col :span="12" style="margin-top: 10px">
      <el-card shadow="hover">
        <template #header>词云</template>
        <div ref="wordCloudRef"></div>
      </el-card>
    </el-col>
    <el-col :span="15" style="margin-top: 10px">
      <el-card shadow="hover">
        <template #header>中国地图</template>
        <ChinaMap />
        <div ref="wordCloudRef22"></div>
      </el-card>
    </el-col>


    <el-col :span="15" style="margin-top: 10px">
    <el-card shadow="hover">
        <template #header>中国地图</template>
        <!-- <Category /> -->
       
      </el-card>
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="6"
      ><div class="grid-content ep-bg-purple" />
      1</el-col
    >
    <el-col :span="6" :offset="6"
      ><div class="grid-content ep-bg-purple"
    />2</el-col>


    <el-col :span="6" :offset="6"
      ><div class="grid-content ep-bg-purple"
    />3</el-col>
    <el-col :span="6" :offset="6"
      ><div class="grid-content ep-bg-purple"
    />4</el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6"
      ><div class="grid-content ep-bg-purple"
    />5</el-col>
  </el-row>

  <!-- <el-card shadow="never" class="index">
        <template #header>Echarts图表</template>
        <el-empty v-if="state.isEmpty" description="暂无数据"></el-empty>
        <div ref="lineRef" id="line_view"></div>
    </el-card> -->





</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { Area, Line, Pie, WordCloud } from "@antv/g2plot";
import ChinaMap from "./ChinaMap.vue";
// import Category from "./Category.vue";

export default {
  setup() {
    const state = reactive({
      isEmpty: true,
    });
    const areaRef = ref(null);
    const lineRef = ref(null);
    const pieRef = ref(null);
    const wordCloudRef = ref(null);
    const areaChart = (el, data) => {
      new Area(el.value, {
        data,
        height: 240,
        xField: "year",
        yField: "value",
        seriesField: "country",
        color: ["#82d1de", "#cb302d", "#e3ca8c"],
        areaStyle: {
          fillOpacity: 0.7,
        },
        appendPadding: 10,
        isPercent: true,
        yAxis: {
          label: {
            formatter: (value) => value * 100,
          },
        },
      }).render();
    };
    const lineChart = (el, data) => {
      new Line(el.value, {
        data,
        height: 240,
        xField: "year" /* x轴要展示的字段名 */,
        yField: "value" /* y轴要展示的字段名 */,
        renderer: "svg",
        seriesField: "category",
        smooth: true /* 平滑曲线 */,
        yAxis: {
          label: {
            formatter: (v) =>
              `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
          },
        },
      }).render();
    };
    const pieChart = (el) => {
      const data = [
        { type: "分类一", value: 27 },
        { type: "分类二", value: 25 },
        { type: "分类三", value: 18 },
        { type: "分类四", value: 15 },
        { type: "分类五", value: 10 },
        { type: "其他", value: 5 },
      ];
      new Pie(el.value, {
        data,
        height: 240,
        angleField: "value",
        colorField: "type",
        radius: 0.8,
        label: {
          type: "outer",
          content: "{name} {percentage}",
        },
        interactions: [
          { type: "pie-legend-active" },
          { type: "element-active" },
        ],
      }).render();
    };
    // 词云
    const wordCloudChart = (el, data) => {
      new WordCloud(el.value, {
        data,
        height: 300,
        wordField: "title",
        weightField: "rate",
        colorField: "tag",
        legend: {},
        imageMask:
          "https://gw.alipayobjects.com/zos/antfincdn/Qw7Xbn76kM/53176454-747c-4f0a-a9e5-936aa66a0082.png",
        wordStyle: {
          fontFamily: "Avenir",
          fontSize: [8, 16],
        },
        state: {
          active: {
            style: {
              lineWidth: 0,
              shadowBlur: 4,
              shadowColor: "rgba(0,0,0,0.3)",
            },
          },
        },
      }).render();
    };
    const initChart = () => {
      // 饼图
      pieChart(pieRef);
      fetch(
        "https://gw.alipayobjects.com/os/bmw-prod/67ef5751-b228-417c-810a-962f978af3e7.json"
      )
        .then((res) => res.json())
        .then((data) => {
          areaChart(areaRef, data);
        })
        .catch((err) => {
          console.log("请求失败：", err);
        });
      fetch(
        "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json"
      )
        .then((res) => res.json())
        .then((data) => {
          state.isEmpty = false;
          // 折线图
          lineChart(lineRef, data);
        })
        .catch((err) => {
          console.log("请求失败：", err);
        });
      fetch(
        "https://gw.alipayobjects.com/os/antfincdn/$IWXp5slbE/2020-movie-from-douban.json"
      )
        .then((res) => res.json())
        .then((data) => {
          wordCloudChart(wordCloudRef, data);
        })
        .catch((err) => {
          console.log("请求失败：", err);
        });
    };
    onMounted(() => {
      initChart();
    });
    return { state, areaRef, lineRef, pieRef, wordCloudRef };
  },
  components: { ChinaMap,  },
};
</script>

<style lang="scss" scoped></style>
