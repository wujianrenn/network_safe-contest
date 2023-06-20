import Layout from "../layout/Index.vue";
import RouteView from "../components/RouteView.vue";

const layoutMap = [
  {
    path: "account",
    name: "Index",
    meta: { title: "火眼金睛", icon: "View", roles: ["user"] },
    component: () => import("../views/Index.vue"),
    },
  
    {
        path: "account/answer",
        name: "Answer",
        hidden:true,
        meta: { title: "甄别结果", icon: "View"},
        component: () => import("../views/detective/answer/Index.vue"),
        },
  // {
  //     path: "account/data",
  //     name: "Data",
  //     component: RouteView,
  //     meta: { title: "数据管理", icon: "DataLine" , roles: ["user"] },
  //     children: [
  //         {
  //             path: "",
  //             name: "DataList",
  //             meta: { title: "数据列表" },
  //             component: () => import("../views/data/List.vue")
  //         },
  //         // {
  //         //     path: "table",
  //         //     name: "DataTable",
  //         //     meta: { title: "数据表格", roles: ["admin"] },
  //         //     component: () => import("../views/data/Table.vue")
  //         // }
  //     ]
  // },
  // {
  //     path: "account/player",
  //     name: "Player",
  //     meta: { title: "视频播放", icon: "Film" , roles: ["user"] },
  //     component: () => import("../views/common/XGPlayer.vue")
  // },
  {
      path: "account/charts",
      name: "Charts",
      meta: { title: "数据图表", icon: "trend-charts" , roles: ["user"] },
      // component: () => import("../views/data/Charts.vue")
      component: () => import("../views/data/LargeNumber.vue")
  },
  // {
  //     path: "account/editor",
  //     name: "Editor",
  //     meta: { title: "富文本编辑器", icon: "Document" , roles: ["user"] },
  //     component: () => import("../views/common/Editor.vue")
  // },
  {
    path: "account/user",
    name: "User",
    hidden: true /* 不在侧边导航展示 */,
    meta: { title: "个人中心" },
    component: () => import("../views/admin/User.vue"),
  },

  //+++++++++++++++++++++++++++++++++++++++
  // {
  //     path: "account/user",
  //     name: "User",
  //     hidden: true /* 不在侧边导航展示 */,
  //     meta: { title: "个人中心" },
  //     component: () => import("../views/admin/User.vue")
  // },
  //+++++++++++++++++++++++++++++++++++++++
  {
    path: "/error",
    name: "NotFound",
    hidden: true,
    meta: { title: "404" },
    component: () => import("../components/NotFound.vue"),
  },
  {
    path: "/:w+",
    hidden: true,
    redirect: { name: "NotFound" },
  },

  // ================================
  {
    path: "account/news",
    name: "News",
    meta: { title: "舆情侦探", icon: "DataLine", roles: ["user"] },
    component: () => import("../views/detective/Station.vue"),
  },

  {
    path: "account/upload",
    name: "NewsUpload",
    hidden: true /* 不在侧边导航展示 */,
    meta: { title: "舆情上传" },
    component: () => import("../views/detective/upload/Upload.vue"),
  },

  {
    path: "account/record",
    name: "Record",
    hidden: true /* 不在侧边导航展示 */,
    meta: { title: "舆情记录" },
    component: () => import("../views/detective/record/Record.vue"),
  },

  {
    path: "account/news/lastest1",
    name: "Lastest1",
    meta: { title: "1" },
    hidden: true /* 不在侧边导航展示 */,
    component: () => import("../views/detective/lastest/lastest1/Index.vue"),
  },
  {
    path: "account/news/lastest2",
    name: "Lastest2",
    hidden: true /* 不在侧边导航展示 */,
    meta: { title: "2" },

    component: () => import("../views/detective/lastest/lastest2/Index.vue"),
  },
  {
    path: "account/news/lastest3",
    name: "Lastest3",
    meta: { title: "3" },
    hidden: true /* 不在侧边导航展示 */,
    component: () => import("../views/detective/lastest/lastest3/Index.vue"),
  },
  {
    path: "account/news/lastest4",
    name: "Lastest4",
    meta: { title: "4" },
    hidden: true /* 不在侧边导航展示 */,
    component: () => import("../views/detective/lastest/lastest4/Index.vue"),
  },
  {
    path: "account/news/lastest5",
    name: "Lastest5",
    meta: { title: "5" },
    hidden: true /* 不在侧边导航展示 */,
    component: () => import("../views/detective/lastest/lastest5/Index.vue"),
  },

  {
    path: "account/hot",
    name: "Hot",
    component: RouteView,
    meta: { title: "舆情热点", icon: "DataLine", roles: ["user"] },
    children: [
      {
        path: "s",
        name: "DataList",
        meta: { title: "数据列表" },
        component: () => import("../views/hotspot/Hot.vue"),
      },
      {
        path: "table",
        name: "DataTable",
        meta: { title: "数据表格",roles: ["admin"]  },
        component: () => import("../views/data/Table.vue"),
      },
    ],
  },
  {
    path: "account/user",
    name: "User",
    // hidden: true /* 不在侧边导航展示 */,
    component: RouteView,
    meta: { title: "个人中心", icon: "User", roles: ["user"] },
    children: [
      {
        path: "",
        name: "account",
        meta: { title: "账号管理" },
        component: () => import("../views/admin/User.vue"),
      },
      // {
      //     path: "points",
      //     name: "Points",
      //     meta: { title: "积分兑换"},
      //     component: () => import("../views/account/points/Points.vue")
      // },
      // {
      //     path: "help",
      //     name: "Help",
      //     meta: { title: "帮助中心"},
      //     component: () => import("../views/account/help/Help.vue")
      // },
      // {
      //     path: "leaderboard",
      //     name: "Leaderboard",
      //     meta: { title: "积分排行榜" },
      //     component: () => import("../views/account/leaderboard/Leaderboard.vue")
      // },
    ],
  },

  // {
  //     path: "news",
  //     name: "Result",
  //     hidden: true /* 不在侧边导航展示 */,
  //     meta: { title: "舆情界面" },
  //     component: () => import("../views/detective/Station.vue")
  // },

  //===================管理端===================
  {
    path: "contor/show",
    name: "Show",
    meta: { title: "首页", roles: ["admin"], icon: "Aim" },
    component: () => import("../views/contor/show/Show.vue"),
  },
  {
    path: "contor/news_ack",
    name: "News_ack",
    meta: { title: "舆情审核", roles: ["admin"], icon: "View" },
    component: () => import("../views/contor/news_ack/News_ack.vue"),
  },
  {
    path: "contor/hot_push",
    name: "Hot_push",
    meta: { title: "热点发布", roles: ["admin"], icon: "ZoomIn" },
    component: () => import("../views/contor/hot_push/Hot_push.vue"),
  },
  // {
  //   path: "contor/record_history",
  //   name: "Record_history",
  //   meta: { title: "兑换记录", roles: ["admin"], icon: "View" },
  //   component: () =>
  //     import("../views/contor/record_history/Record_history.vue"),
  // },
];

const routes = [
  {
    path: "/login",
    name: "Login",
    meta: { title: "登录" },
    component: () => import("../views/login/Login.vue"),
  },
  { path: "/", name: "Layout", component: Layout, children: [...layoutMap] },
];

export { routes, layoutMap };
