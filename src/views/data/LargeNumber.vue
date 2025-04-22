<template>
  <div class="wpbox">
    <div class="bnt">
      <div class="topbnt_left fl">
        <ul>
          <!-- <li class="active">警情警力</li> -->
        </ul>
      </div>
      <h3 class="tith1 fl">慧眼舆情监测大屏</h3>
    </div>
    <!-- bnt end -->
    <div class="left1">
      <div class="aleftboxttop">
        <h2 class="tith2">七日舆情数据统计</h2>
        <div class="lefttoday_number">
          <div id="main" style="height: 249px; width: 269px"></div>
        </div>
      </div>
      <div class="aleftboxtmidd">
        <h2 class="tith2">七日舆情类型图</h2>
        <div id="aleftboxtmidd" style="height: 370px; width: 240px"></div>
      </div>
      <div class="aleftboxtbott">
        <h2 class="tith2">虚假舆情占比</h2>
        <div id="aleftboxtbott" style="height: 340px; width: 300px"></div>
      </div>
    </div>
    <!-- left1 end -->
    <div class="mrbox">
      <div class="mrbox_topmidd" style="width: 69%">
        <div class="amiddboxttop">
          <h2 class="tith2 pt1">实时监控统计</h2>
          <div class="amiddboxttop_map">
            <div id="mainn" style="width: 600px; height: 700px"></div>
            <ChinaMap />
          </div>
        </div>
        <!-- amiddboxttop end-->
        <div class="amidd_bott" style="background-color: transparent">
          <div class="amiddboxtbott1 fl">
            <h2 class="tith2 pt1">舆情日志</h2>
            <el-table
              :data="tableData"
              height="340"
              style="width: 100%; background-color: transparent"
              :header-cell-style="headerCellStyle"
              class="my_table"
            >
              <el-table-column prop="time" label="时间" width="180" />
              <el-table-column prop="title" label="事件名称" width="260" />
              <el-table-column prop="name" label="发布者" width="160" />
              <el-table-column prop="result" label="甄别结果" width="180" />
            </el-table>
            <div id="amiddboxtbott1" class="amiddboxtbott1content"></div>
          </div>
        </div>
        <!-- amidd_bott end -->
      </div>
      <!-- mrbox_top end -->
      <div class="mrbox_top_right">
        <div class="arightboxtop">
          <h2 class="tith2">舆情高频词</h2>
          <div class="left2_table">
            <iframe
              src="../../../舆情词云.html"
              frameborder="0"
              style="width: 400px; height: 590px"
              id="iframeBox"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div class="arightboxbott">
          <h2 class="tith2">全年舆情统计折线图</h2>
          <div
            id="arightboxbott"
            class="arightboxbottcont"
            style="height: 300px"
          ></div>
        </div>
      </div>
      <!-- mrbox_top_right end -->
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import ChinaMap from "./ChinaMap.vue";

export default {
  data() {
    return {
      tableData: [
        {
          no: "1",
          title: "钟南山称今年6月底或是今年疫情高峰？",
          time: "2023.7.12",
          name: "张三",
          result: "70%真",
        },
        {
          no: "2",
          title: "最近AI诈骗盛行？",
          time: "2023.7.12",
          name: "张三",
          result: "50%真",
        },
        {
          no: "3",
          title: "G7峰会上拜登称美中关系会短时间内缓和，可信吗？",
          time: "2023.7.12",
          name: "张三",
          result: "70%真",
        },
        {
          no: "4",
          title: "桂林371所学校因暴雨停课？",
          time: "2023.7.12",
          name: "张三",
          result: "60%真",
        },
        {
          no: "5",
          title: "华为研发出量子芯片？",
          time: "2023.7.12",
          name: "张三",
          result: "80%真",
        },
        {
          no: "6",
          title: "oppo终止哲库业务是因为美国的威胁？",
          time: "2023.7.12",
          name: "张三",
          result: "80%真",
        },
      ],
    };
  },
  mounted() {
    const script1 = document.createElement("script");
    script1.src = "./echarts-wordcloud.min.js";
    script1.type = "text/javascript";
    document.head.appendChild(script1);
    const chart1 = echarts.init(document.getElementById("main"));
    const chart2 = echarts.init(document.getElementById("aleftboxtmidd"));
    const chart3 = echarts.init(document.getElementById("aleftboxtbott"));
    const chart4 = echarts.init(document.getElementById("mainn"));
    const chart5 = echarts.init(document.getElementById("amiddboxtbott1"));
    const chart7 = echarts.init(document.getElementById("arightboxbott"));

    chart1.setOption({
      xAxis: {
        type: "category",
        data: ["7.1", "7.2", "7.3", "6.2", "7.4", "7.5", "7.6"],
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
    });
    chart2.setOption({
      color: ["#FF5722", "#009688", "#2196F3", "#FFC107"],
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "horizontal",
        top: 15,
        left: 15,
        textStyle: {
          // 设置图例文本样式
          color: "#fff", // 将文本颜色设置为白色
        },
      },
      series: [
        {
          name: "七日舆情类型图",
          type: "pie",
          radius: "50%",
          data: [
            { value: 45, name: "社会舆情" },
            { value: 20, name: "企业舆情" },
            { value: 10, name: "经济舆情" },
            { value: 15, name: "政治舆情" },
            { value: 5, name: "体育舆情" },
            { value: 5, name: "校园舆情" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
    chart3.setOption({
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%",
      },
      series: [
        {
          name: "Pressure",
          type: "gauge",
          progress: {
            show: true,
          },
          detail: {
            valueAnimation: true,
            formatter: "{value}",
          },
          data: [
            {
              value: 41,
              name: "SCORE",
              itemStyle: {
                color: "#FF5722", // 设置图表颜色
              },
            },
          ],
        },
      ],
    });
    chart4.setOption({
      series: [
        {
          type: "map",
          map: "china", // 引入地图数据
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
            {
              name: "南海诸岛",
              value: 2,
            },
          ],
        },
      ],
      tooltip: {
        trigger: "item",
      },
    });
    chart5.setOption({});
    // chart6.setOption({
    //   backgroundColor: "rgba(128, 128, 128, 0.1)", //rgba设置透明度0.1
    //   title: {
    //     //配置标题组件
    //     text: "舆情词云",
    //     x: "center",
    //     y: 15,
    //     textStyle: {
    //       color: "green",
    //       fontSize: 22,
    //     },
    //   },
    //   tooltip: { show: true }, //配置提示框组件
    //   series: [
    //     {
    //       //数据系列及其配置
    //       name: "舆情词云", //设置名称
    //       type: "wordCloud", //设置图表类型为字云图
    //       sizeRange: [15, 100], //设置数据大小范围
    //       size: ["80%", "80%"], //设置显示的字云图的大小
    //       textRotation: [0, 45, 90, 135, -45, -90], //设置文字倾斜角度
    //       textPadding: 3, //设置文字之间的间距
    //       autoSize: { enable: true, minSize: 5 }, //设置文字的自动大小
    //       textStyle: {
    //         normal: {
    //           color: function () {
    //             return (
    //               "rgb(" +
    //               [
    //                 Math.round(Math.random() * 255),
    //                 Math.round(Math.random() * 255),
    //                 Math.round(Math.random() * 255),
    //               ].join(",") +
    //               ")"
    //             );
    //           },
    //         },
    //         emphasis: {
    //           shadowBlur: 26,
    //           color: "#333",
    //           shadowColor: "#ccc",
    //           fontSize: 20,
    //         },
    //       },
    //       data: [
    //         //设置具体的数据
    //         { name: "Java", value: 16884 },
    //         { name: "C", value: 16180 },
    //         { name: "Python", value: 9089 },
    //         { name: "C++", value: 6229 },
    //         { name: "C#", value: 3860 },
    //         { name: "VB.NET", value: 3745 },
    //         { name: "Ruby", value: 1318 },
    //         { name: "Assembly", value: 1307 },
    //         { name: "R", value: 1261 },
    //         { name: "Delphi", value: 1046 },
    //         { name: "VB", value: 1234 },
    //         { name: "Go", value: 1100 },
    //         { name: "Delphi", value: 1046 },
    //         { name: "SAS", value: 915 },
    //         { name: "Perl", value: 1023 },
    //         { name: "Matlab", value: 924 },
    //         { name: "PL/SQL", value: 822 },
    //         { name: "D", value: 814 },
    //         { name: "Scheme", value: 193 },
    //         { name: "COBEL", value: 447 },
    //         { name: "Scratch", value: 524 },
    //         { name: "Dart", value: 448 },
    //         { name: "ABAP", value: 447 },
    //         { name: "Scala", value: 442 },
    //         { name: "Fortran", value: 439 },
    //         { name: "LiveCode", value: 169 },
    //         { name: "Lisp", value: 409 },
    //         { name: "F#", value: 391 },
    //         ,
    //         { name: "Rust", value: 356 },
    //         { name: "Kotlin", value: 319 },
    //         { name: "Ada", value: 316 },
    //         { name: "Logo", value: 261 },
    //         { name: "SQL", value: 1935 },
    //         { name: "RPG", value: 274 },
    //         { name: "PHP", value: 1909 },
    //         { name: "LabVIEW", value: 243 },
    //         { name: "Haskell", value: 209 },
    //         { name: "Bash", value: 196 },
    //         { name: "ActionScript", value: 182 },
    //         { name: "Transact-SQL", value: 569 },
    //         { name: "PowerShell", value: 178 },
    //         { name: "VBScript", value: 203 },
    //         { name: "JavaScript", value: 2076 },
    //         { name: "TypeScript", value: 304 },
    //         { name: "Objective-C", value: 1501 },
    //         { name: "Prolog", value: 261 },
    //         { name: "Groovy", value: 1394 },
    //         { name: "Swift", value: 1362 },
    //         { name: "Crystal", value: 168 },
    //         { name: "Lua", value: 379 },
    //         { name: "Julia", value: 224 },
    //       ], //data结束
    //     },
    //   ], //series结束
    // });
    chart7.setOption({
      color: [
        "#7de494",
        "#7fd7b1",
        "#5578cf",
        "#5ebbeb",
        "#d16ad8",
        "#f8e19a",
        "#00b7ee",
        "#81dabe",
        "#5fc5ce",
      ],
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisLine: {
          lineStyle: {
            color: "#CCCCCC",
          },
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#CCCCCC",
          },
        },
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    });
  },

  setup() {
    const headerCellStyle = ({ column, $index }) => {
      // 返回一个样式对象，覆盖表格头部的样式
      return {
        backgroundColor: "transparent", // 设置背景色为透明，即去掉白色背景
        /* 可以设置其他样式，如颜色、边框等 */
      };
    };

    return {
      headerCellStyle,
    };
  },
  components: { ChinaMap },
};
</script>

<style scoped>
/****** PLACE YOUR CUSTOM STYLES HERE ******/

.el-table::before {
  height: 0px;
}

.el-table,
.el-table__expanded-cell {
  background-color: transparent;
  color: white;
}

.el-table thead {
  color: white;
  font-size: 16px;
}


el-table th,
.el-table tr,
el-table-column,
tr:hover ,
.el-table__body{
  background-color: transparent;
}

.wpbox {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  background: #051655;
  font-family: 微软雅黑, MicrosoftYahei, sans-serif;
  color: #fff;
}
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol,
pre,
table,
blockquote,
input,
button,
select,
em,
textarea {
  margin: 0;
  font-weight: normal;
  margin: 0;
  padding: 0;
  list-style: none;
  font-style: normal;
}
html,
.wpbox {
  color: #fff;
  background: #00065b url("./img/bg.jpg");
  background-size: 100% 100%;
  background-position: 0 0;
  width: 80%;
  height: 100%;
  background-repeat: no-repeat;
}
.wpbox {
  width: 100%;
  height: calc(100% - 10px);
}
.bnt {
  height: 9%;
  width: 100%;
  display: inline-block;
}
.left1 {
  width: 18%;
  height: calc(100% - 10%);
  float: left;
  padding-left: 2.2%;
  text-align: center;
}
.pleft1 {
  width: 18.6%;
  float: left;
  padding-left: 2.2%;
  text-align: center;
}
.puleft {
  padding-left: 2.2%;
  width: 35.2%;
  text-align: center;
  height: 100%;
}
.puleft2 {
  width: 35%;
  height: 100%;
  padding-left: 0.4%;
}
.mr_right {
  width: 25%;
  height: 100%;
}
.left2 {
  width: 18%;
  float: left;
  height: 100%;
}
.mrbox {
  float: left;
  width: 79%;
  height: 100%;
}
.mrbox.prbox {
  float: left;
  width: 60%;
  height: 100%;
}
.mrbox_bottom {
  float: left;
  width: 100%;
  height: 28%;
}
.mrbox_top_midd {
  width: 68%;
  float: left;
  height: 100%;
}
.mrbox_topmidd {
  float: left;
  width: 76%;
  padding-left: 0.2%;
  height: 100%;
}
.pmidd_bott {
  width: 100%;
  height: 57.4%;
}

.mrbox_top_right {
  float: right;
  width: 29.4%;
  padding-right: 1.4%;
  height: 100%;
}
.mrbox_top {
  width: 100%;
  height: 62.4%;
}
.hdmrbox_top {
  width: 100%;
  height: 100%;
}

.lefttime {
  background: url("./img/time.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 84%;
  height: 9.3%;
  margin-left: 6%;
}
.lefttime_text {
  padding: 2% 5% 0 5%;
}
.lefttime_text li {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  width: 20%;
  float: left;
  height: 22px;
  line-height: 22px;
  text-align: center;
  border-radius: 4px;
}
.lefttime_text li.bg {
  background: rgba(0, 183, 238, 0.1);
}
.lefttime_text li.active {
  background: rgba(0, 183, 238, 0.6);
  color: #fff;
}
.lefttoday {
  background: url("./img/left1box.png");
  background-repeat: no-repeat;
  background-position: -3px 2px;
  width: 350px;
  height: 584px;
  margin: 0 auto;
}

.lefttoday_tit {
  overflow: hidden;
  padding: 1.9% 5% 0.2%;
  height: 6%;
  position: relative;
}
.lefttoday_tit.height {
  height: 12%;
}
.lefttoday_number {
  height: 100%;
  width: 100%;
  background: rgba(1, 202, 217, 0.2);
}
.lefttoday_tit p.fl {
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  left: 5%;
  top: 22%;
}
.lefttoday_tit p.fr {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  position: absolute;
  right: 5%;
  top: 25%;
}
.lefttoday_tit p.fm {
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  left: 40%;
  top: 25%;
}

.lefttoday_tit.height.ht {
  height: 16%;
}
.lefttoday_tit.height p.fl {
  position: absolute;
  left: 5%;
  top: 15%;
}
.lefttoday_tit.height p.fr {
  position: absolute;
  left: 5%;
  top: 65%;
  right: auto;
}

.lefttoday_bar ul {
  position: relative;
  width: 100%;
  height: 100%;
}
.lefttoday_bar li {
  color: #333;
  position: absolute;
  border-radius: 50%;
  font-size: 12px;
  overflow: hidden;
  font-weight: normal;
  text-align: center;
  line-height: 140%;
}
.lefttoday_bar li span {
  padding-top: 30%;
  display: inline-block;
}
.c1 {
  background: #ac3ff2;
}
.c2 {
  background: #ffff00;
}
.c3 {
  background: #0078ff;
}
.c4 {
  background: #9cff00;
}
.c5 {
  background: #ff6c00;
}
.c6 {
  background: #77b5fb;
}
.big0 {
  width: 10px;
  height: 10px;
}
.big1 {
  width: 20px;
  height: 20px;
}
.big2 {
  width: 30px;
  height: 30px;
}
.big3 {
  width: 40px;
  height: 40px;
}
.big4 {
  width: 50px;
  height: 50px;
}
.big5 {
  width: 60px;
  height: 60px;
}
.big6 {
  width: 70px;
  height: 70px;
}

.leftclass {
  background: url("./img/leftb1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 350px;
  height: 291px;
}
.leftbox2_table {
  background: url("./img/leftbox2.png");
  background-repeat: no-repeat;
  background-position: -2px -2px;
  width: 354px;
  height: 680px;
}
.left2_table {
  width: 91%;
  /* margin-left: 5%; */
  font-size: 24px;
  height: 500px;
  /* overflow: hidden; */
}
.hdleft2_table {
  width: 91%;
  margin-left: 5%;
  font-size: 12px;
  height: 91.6%;
  overflow: hidden;
}
.left2_table li {
  background: rgba(1, 202, 217, 0.2) url("./img/icosjx.png") no-repeat top left;
  position: relative;
  overflow: hidden;
  padding: 2% 6%;
  color: rgba(255, 255, 255, 0.7);
  line-height: 150%;
}
.left2_table li b {
  color: rgba(255, 255, 255, 1);
  font-weight: normal;
}
.left2_table li p.fl {
  width: 80%;
  overflow: hidden;
}
.left2_table li p.fr {
  position: absolute;
  right: 5%;
  top: -20%;
}
.yellow {
  color: #fff45c;
}
.green {
  color: #00c2fd;
}
.left2_table li.bg {
  background: rgba(0, 255, 255, 0.4) url("./img/icosjx.png") no-repeat top left;
}
.mrbox_tr_box {
  background: url("./img/rbox1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 354px;
  height: 291px;
}

.mrboxtm-mbox {
  background: url("./img/midtop.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 100%;
  height: 63.6%;
}
.mrboxtm-b1 {
  background: url("./img/mbox1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 460px;
  height: 233px;
  float: left;
}
.mrboxtm-b2 {
  background: url("./img/mbox2.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 330px;
  height: 233px;
  float: right;
}
/* .mrbox_tr_box{background:url("./img/rbox1.png");background-size: 100% 100%; background-repeat: no-repeat;background-position: top center; width:350px; height:680px;} */

.hdmrboxtm-mbox {
  background: url("./img/hdbj.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 100%;
  height: 61.6%;
}

.rbottom_box1 {
  background: url("./img/b-rbox2.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 33.5%;
  height: 89.4%;
  float: left;
}
.rbottom_box2 {
  background: url("./img/bbox2.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 33.5%;
  height: 89.4%;
  float: left;
  margin-left: 0.8%;
}
.rbottom_box3 {
  background: url("./img/b-rbox2.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 30%;
  height: 89.4%;
  float: left;
  margin-left: 1%;
}
.prbottom_box1cont {
  margin-left: 5.2%;
  width: 90.6%;
  height: 82%;
  margin-top: 1.8%;
}
.prbottom_box2cont {
  margin-left: 5.2%;
  width: 90.6%;
  height: 82%;
  margin-top: 1.8%;
}
.prbottom_box3cont {
  margin-left: 5.2%;
  width: 90.6%;
  height: 82%;
  margin-top: 1.8%;
}

.tith2 {
  text-align: center;
  width: 100%;
  font-size: 18px;
  /* padding-top: 1.9%; */
  font-weight: normal;
  letter-spacing: 2px;
  font-weight: normal;
  overflow: hidden;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.topbnt_left {
  width: 33%;
}
.topbnt_left ul {
  padding-top: 3px;
  padding-left: 10%;
  width: 100%;
}
.topbnt_left li {
  background: url("./img/bnt.png") center;
  font-size: 14px;
  line-height: 33px;
  background-repeat: no-repeat;
  width: 18%;
  height: 35px;
  float: left;
  text-align: center;
  margin-left: 1%;
}
.topbnt_left li.active,
.topbnt_right li.active {
  background: url("./img/bntactive.png") no-repeat center;
}
.topbnt_left li a {
  text-decoration: none;
  color: #fff;
}
.tith1 {
  width: 33%;
  text-align: center;
  padding-top: 16px;
  font-weight: bold;
  letter-spacing: 8px;
  font-size: 36px;
}
.topbnt_right {
  padding-top: 2%;
  padding-right: 2.5%;
  width: 27%;
}
.topbnt_right li {
  background: url("./img/bnt.png") center;
  font-size: 14px;
  line-height: 33px;
  background-repeat: no-repeat;
  width: 22%;
  height: 35px;
  float: right;
  text-align: center;
  margin-right: 1%;
}
.topbnt_right li a {
  text-decoration: none;
  color: #fff;
}
.pt1 {
  padding-top: 1.3%;
}
.pt2 {
  padding-top: 2.2%;
}
.pt3 {
  padding-top: 3.3%;
}
.pt6 {
  padding-top: 6px;
}
.pt17 {
  padding-top: 17px;
}
.pt14 {
  padding-top: 14px;
}
.pt12 {
  padding-top: 12px;
}
.pt20 {
  padding-top: 22px;
}
/* .box_pad{ margin: 3px 20px; } */

.mrboxtm-map {
  background: url("./img/mapbg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 90%;
  margin-left: 4%;
  margin-top: 1%;
  height: 90%;
  position: relative;
}
.hdmrboxtm-map {
  background: url("./img/hdmap.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 90%;
  margin-left: 4%;
  margin-top: 1%;
  height: 66%;
  position: relative;
}
.mrboxtm-map li {
  width: 23px;
  height: 22px;
  line-height: 22px;
  color: #fff;
  text-align: center;
  background-position: center;
  background-repeat: no-repeat;
  font-size: 12px;
  position: absolute;
}
.mrboxtm-map li.bluer {
  background-image: url("./img/blue_rico.png");
}
.mrboxtm-map li.redr {
  background-image: url("./img/red_rico.png");
}
.ricontop {
  width: 29px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  text-align: center;
  bbackground-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  font-size: 12px;
  margin-right: 5px;
  font-style: normal;
  display: inline-block;
}
i.bluer {
  background-image: url("./img/ricon2.png");
}
i.redr {
  background-image: url("./img/ricon1.png");
}
.font14 p.fl,
.font14 p.fr {
  color: #fff;
  font-size: 14px;
}
.mrtop1 {
  background: rgba(1, 202, 217, 0.2);
  overflow: hidden;
  margin: 4px 15px;
}
.widget-inline-box {
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  width: 50%;
  padding: 10% 0;
  text-align: center;
  font-size: 12px;
  float: left;
  overflow: hidden;
}
.widget-inline-box h3 {
  font-size: 22px;
  font-weight: 100;
  font-weight: normal;
}
.ceeb1fd {
  color: #eeb1fd;
}
.c24c9ff {
  color: #24c9ff;
}
.cffff00 {
  color: #ffff00;
}
.c11e2dd {
  color: #11e2dd;
}
.text-muted {
  font-size: 12px;
  color: #789ce0;
}
.text-muted img {
  vertical-align: middle;
  margin: 0 3px;
}
.mrtop2 {
  margin: 4px 15px;
  padding: 20px 0;
  background: rgba(1, 202, 217, 0.2);
  width: 305px;
}
.tith4 {
  font-size: 12px;
  text-align: center;
}
.mrtop3 {
  margin: 4px 15px;
  padding: 20px 0;
  background: rgba(1, 202, 217, 0.2);
  width: 305px;
}

.mrboxtm-b1wp {
  margin: 4px 25px;
  padding: 20px 0;
  background: rgba(1, 202, 217, 0.2);
  width: 415px;
  overflow: hidden;
}
.mrboxtm_text {
  overflow: hidden;
  padding-left: 12px;
  padding-bottom: 10px;
}
.mrbtext_info {
  background: rgba(1, 202, 217, 0.2);
  font-weight: normal;
  padding: 10px 0;
  text-align: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  float: left;
  margin: 2px 0 10px 8px;
  width: 140px;
}
.mrbtext_info b {
  font-weight: normal;
  font-size: 18px;
}
.lefttoday_number .widget-inline-box {
  width: 25%;
}

/*  警情警力分析 完*/
.aleftboxttop {
  background: url("./img/leftb1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 99%;
  height: 27.5%;
}
.aleftboxttop .lefttoday_number {
  background: none;
}
.aleftboxttop .widget-inline-box {
  width: 24.2%;
  background: rgba(1, 202, 217, 0.2);
  height: 100%;
  font-size: 10px;
}

.aleftboxtmidd {
  background: url("./img/aleftboxtmidd.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 98.5%;
  height: 32%;
}
.aleftboxtmiddcont {
  width: 91%;
  height: 66%;
  margin-left: 4.4%;
  margin-top: 1%;
}
.aleftboxtbott {
  background: url("./img/aleftboxtbott.png");
  background-size: 100% 60%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 100%;
  height: 65%;
}
.aleftboxtbott_cont {
  width: 91%;
  height: 72.6%;
  margin-top: 1.8%;
  margin-left: 4.4%;
}
.aleftboxtbott_cont2 {
  width: 89.9%;
  height: 86.6%;
  margin-top: 2.8%;
  margin-left: 5%;
}
.aleftboxtbott_contr {
  width: 89.9%;
  height: 90.6%;
  margin-top: 1.8%;
  margin-left: 5%;
}
.amiddboxttop {
  overflow: hidden;
  background: url("./img/amiddboxttop.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 99%;
  height: 52.1%;
}
.amiddboxttop_map {
  /* background: url("./img/img.png"); */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  position: relative;
  width: 90%;
  height: 600px;
  margin: 1.4% 5% 0;
}
.hot_map {
  width: 90%;
  height: 86%;
  margin: 1.4% 5% 0;
}

.amidd_bott {
  width: 100%;
  height: 38%;
  padding-top: 0.8%;
}
.amiddboxttop_map span {
  background: url("./img/camera.png");
  background-repeat: no-repeat;
  background-position: 0 0;
  width: 24px;
  height: 19px;
  display: inline-block;
  position: absolute;
}
.amiddboxttop_map span.camera_l {
  background: url("./img/camera_l.png");
  background-repeat: no-repeat;
  background-position: 0 0;
  width: 24px;
  height: 19px;
  display: inline-block;
  position: absolute;
}

.amiddboxtbott1 {
  background: url("./img/amiddboxtbott1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 750px;
  height: 91.6%;
  margin-left: 0.5%;
  margin-right: 1%;
}
.amiddboxtbott1content {
  width: 90%;
  height: 86.5%;
  margin-left: 4.8%;
  margin-top: 1.6%;
}
.amiddboxtbott1content2 {
  width: 100%;
  height: 80%;
  margin-left: 4.8%;
  margin-top: 0.6%;
}
/* .amiddboxtbott2 {
  background: url("./img/amiddboxtbott2.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  float: right;
  width: 49%;
  height: 91.8%;
  margin-right: 0.9%;
} */
.amiddboxtbott2content {
  width: 91.8%;
  height: 86%;
  margin-left: 4.4%;
  margin-top: 1.6%;
}
.arightboxtop {
  background: url("./img/arightboxtop.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 100%;
  height: 51.9%;
}
.arightboxbott {
  background: url("./img/arightboxbott.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 100%;
  height: 35%;
  margin-top: 3%;
}
.arightboxbottcont {
  width: 91%;
  margin-top: 1%;
  margin-left: 5%;
  height: 79%;
}
.arightboxbottcont2 {
  width: 90%;
  margin-top: 1.6%;
  margin-left: 5.3%;
  height: 85.5%;
}
.plefttoday {
  background: url("./img/pleft1middt.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 96%;
  height: 30%;
  margin-top: 0.4%;
}
.plefttoday .widget-inline-box {
  width: 48%;
  padding: 4% 0;
}
.lpeftmidbot {
  background: url("./img/pleft1middb.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 95.8%;
  height: 27.6%;
  margin-top: 3.4%;
}
.lpeftmidbotcont {
  width: 90.1%;
  margin-top: 2%;
  margin-left: 5.2%;
  height: 82%;
}
.lpeftbot {
  background: url("./img/pleft1middb.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 95.8%;
  height: 27.6%;
  margin-top: 3.4%;
}
.lpeftbotcont {
  width: 90.1%;
  margin-top: 2%;
  margin-left: 5.2%;
  height: 82%;
}
.pleftbox2top {
  background: url("./img/pleftbox2top.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 96.8%;
  height: 35.2%;
  margin-top: 1%;
}
.pleftbox2topcont {
  width: 90.1%;
  margin-top: 2%;
  margin-left: 5%;
  height: 88%;
}
.pleftbox2midd {
  background: url("./img/pleftbox2mid.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 96.8%;
  height: 24.6%;
  margin-top: 3.8%;
}
.pleftbox2middcont {
  width: 90.1%;
  margin-top: 2%;
  margin-left: 5.2%;
  height: 82%;
  overflow: hidden;
}
.lpeft2bot {
  background: url("./img/pleft1middb.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 97.8%;
  height: 24.6%;
  margin-top: 4.2%;
}
.lpeftb2otcont1 {
  width: 100%;
  height: 100%;
}
.hdrightboxtop {
  background: url("./img/hdbjr.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 100%;
  height: 87%;
}

.lpeftb2otcont {
  width: 90.1%;
  margin-top: 2%;
  margin-left: 5.2%;
  height: 82%;
}
.pmrboxbottom {
  background: url("./img/pmiddboxmidd.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  position: relative;
  width: 100%;
  height: 32.9%;
  margin-top: 1.8%;
}
.pmrboxbottomcont {
  width: 94.1%;
  margin-top: 1.1%;
  margin-left: 3.1%;
  height: 76%;
}
.mrbox_bottom_bott {
  width: 100%;
  height: 27%;
  margin-top: 1.8%;
}
.pmrtop {
  background: url("./img/prighttop.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 100%;
  height: 56.6%;
}
.pmrtop_contheight {
  height: 30%;
  width: 100%;
  overflow: hidden;
}

.pmrtop1 {
  background: url("./img/prighttop.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 100%;
  height: 40.4%;
}
.pmrtop_cont1 {
  height: 87%;
  width: 100%;
  overflow: hidden;
}

.pmrmiddcont {
  width: 98.1%;
  margin-top: 1.1%;
  margin-left: 3.1%;
  height: 64%;
}
.pmrtop_contheight .widget-inline-box {
  padding: 5% 0;
}
.lefttoday_bar {
  height: 56%;
  width: 100%;
}
.pmrtop_cont {
  background: rgba(1, 202, 217, 0.2);
  width: 90.6%;
  height: 86%;
  margin: 2.2% 0 0 5.1%;
}
.pmrtop_wid .widget-inline-box {
  width: 33%;
}

.pulefttop {
  background: url("./img/pulefttop.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 100%;
  height: 29%;
}
.puleftboxtmidd {
  background: url("./img/puleftmidd.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 100%;
  height: 28.6%;
  margin-top: 1%;
}
.puleftboxtbott {
  background: url("./img/puleftbott.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 100%;
  height: 28%;
  margin-top: 1%;
}

.pumiddboxttop1 {
  background: url("./img/pumiddtop1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 47.7%;
  height: 100%;
  padding-left: 1.4%;
}
.pumiddboxttop2 {
  background: url("./img/pumiddtop2.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 47.7%;
  height: 100%;
  margin-left: 1.4%;
}
.pmiddboxtbott {
  background: url("./img/pumiddbott.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 98.4%;
  height: 27.8%;
  margin-top: 2%;
}
.purightboxtop {
  background: url("./img/purighttop.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 100%;
  height: 29%;
}
.purightboxmidd {
  background: url("./img/purightmidd.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 100%;
  height: 28%;
  margin-top: 1.8%;
}
.purightboxbott {
  background: url("./img/purightbott.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 100%;
  height: 28%;
  margin-top: 2.2%;
}
.purightboxtopcont {
  width: 90.2%;
  height: 77%;
  margin-left: 5%;
}
.purightboxmiddcont {
  width: 90.2%;
  height: 77%;
  margin-left: 5%;
}
.purightboxbottcont {
  width: 90.2%;
  height: 77%;
  margin-left: 5%;
}
.pumiddboxtbott1cont {
  width: 62%;
  height: 100%;
  margin-left: 3%;
}

.tith2 span {
  display: inline-block;
  float: left;
  width: 40%;
}
.pbox {
  width: 100%;
  height: 76%;
}
.pulefttoday_bar {
  width: 46.7%;
  height: 100%;
  margin-left: 2.5%;
}
.pulefttoday_bar2 {
  width: 46.7%;
  height: 100%;
  margin-right: 2.5%;
}
.puleftboxtmidd1 {
  width: 46.7%;
  height: 100%;
  margin-left: 2.5%;
}
.puleftboxtbott1 {
  width: 62.7%;
  height: 100%;
  margin-left: 2.5%;
}
.puleftboxtbott2 {
  width: 30.7%;
  height: 100%;
  margin-right: 2.5%;
}
.puleft2height {
  width: 96%;
  height: 88%;
  margin-left: 3%;
}
.puleftbox2bott_cont {
  width: 100%;
  height: 100%;
}
.pulefttoday_bar,
.puleftboxtbott2,
.pumiddboxtbott2 {
  background: rgba(1, 202, 217, 0.2);
}
.puleftboxtbott2 .widget-inline-box {
  width: 100%;
  margin: 0;
  padding: 2% 0;
}

.pumiddboxttop1 .widget-inline-box {
  width: 45%;
  background: rgba(1, 202, 217, 0.2);
  margin-left: 2%;
  margin-bottom: 1.5%;
  height: 38%;
}
.pumiddboxttop1 .widget-inline-box p {
  padding-top: 30%;
}
.f30 {
  font-size: 40px !important;
  margin: 10% 0;
}
.pumiddboxtbott2 {
  width: 30.9%;
  height: 100%;
  margin-right: 2.5%;
}
.pumiddboxtbott2 .widget-inline-box {
  width: 100%;
  margin: 0;
  text-align: center;
}
.pumiddboxtbott2 .widget-inline-box p {
  padding-top: 19%;
}

.pumiddboxttop2_cont {
  width: 90%;
  margin-left: 4.5%;
  margin-top: 0;
  height: 85.4%;
  overflow: hidden;
  text-align: left;
}
.pumiddboxttop2_cont ul {
  height: 100%;
}
.pumiddboxttop2_cont li {
  background: rgba(1, 202, 217, 0.2) url("./img/hot.png") no-repeat 12px 12px;
  height: 13.8%;
}
.pumiddboxttop2_cont li p.text_l {
  line-height: 160%;
  width: 95%;
  overflow: hidden;
  padding-left: 10%;
}
.pumiddboxttop2_cont li p.text_r {
  text-align: right;
  width: 99%;
  height: 40%;
}
.pumiddboxttop2_cont li.bg {
  background: rgba(0, 255, 255, 0.4) url("./img/hot.png") no-repeat 12px 12px;
}
.pvr {
  position: relative;
}
.pvr ul {
  position: absolute;
  left: 11%;
  top: 13%;
}
.pvr ul li {
  width: 16px;
  height: 16px;
  text-align: center;
  line-height: 16px;
  margin-top: 82%;
  border-radius: 2px;
  font-size: 12px;
  display: block;
  color: #fff;
  z-index: 1111;
}
.hot1 {
  background-color: #ff0000;
}
.hot2 {
  background-color: #ff7200;
}
.hot3 {
  background-color: #ffbd5e;
}
.hot4 {
  background-color: #b3b3b3;
}
.hot5 {
  background-color: #597a9f;
}
.liwp ul li {
  margin-top: 79%;
}
.hdtop ul li {
  margin-top: 95%;
}
.pulefttoday_bar2 ul {
  position: absolute;
  left: 4.7%;
  top: 8%;
}
.pulefttoday_bar2 ul li {
  margin-top: 110%;
}
.tlbox {
  overflow: hidden;
  height: 74%;
  width: 91%;
  margin: 1% 4%;
  background: rgba(1, 202, 217, 0.2);
  font-size: 12px;
}
.tlbox p.text {
  padding-left: 3%;
}
.tlbox p.text span {
  width: 27.8%;
  color: rgba(255, 255, 255, 0.6);
  display: inline-block;
  text-align: left;
}
.tlbox ul {
  height: 100%;
}
.tlbox li {
  height: 20%;
  padding-top: 5.6%;
}
.tlbox p.rwith {
  width: 90%;
  height: 10px;
  background: #4ab4ff;
  margin: 2% 5%;
}
.tlbox span.rwith_img {
  height: 10px;
  background: #f8e19a;
  float: left;
  display: inline-block;
}
.tlbox p.text span.w12 {
  width: 28%;
  text-align: left;
}
.tlbox p.bgc3 {
  background: #f19ec2;
}
.tlbox span.qgc2 {
  background: #7ecef4;
}
.tlbox p.bgc2 {
  background: #99b0f7;
}
.tlbox span.qgc3 {
  background: #cce198;
}
.tlbox p.text span.tr {
  text-align: right;
  width: 10%;
  padding-right: 3%;
}

.tlbox li span i {
  width: 14px;
  height: 6px;
  display: inline-block;
  margin-right: 3px;
}
.ricon1 {
  background: #f8e19a;
}
.ricon2 {
  background: #7ecef4;
}
.ricon3 {
  background: #f19ec2;
}
.tricon1 {
  background: #4ab4ff;
}
.tricon2 {
  background: #99b0f7;
}
.tricon3 {
  background: #cce198;
}
.hdwid {
  width: 49.6%;
}

/*  交通分析*/
</style>
