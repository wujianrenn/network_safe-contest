<template>
  <div class="content-wrapper">
    <div class="content-container">
      <div class="search-container">
        <div class="search-area">
          <div class="search-input-wrapper">
            <input type="text" class="search-input" placeholder="请输入搜索内容" v-model="ltext" />
            <el-button type="primary" :icon="Search" round @click="start" class="search-btn">搜索</el-button>
          </div>
          <el-button @click="handleButtonClick((type = 0))" class="hot-btn">十大热点</el-button>
        </div>
      </div>
      
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="header-item header-rank">排名</div>
            <div class="header-item header-title">舆情名称</div>
            <div class="header-item header-heat">舆情热度</div>
          </div>
        </template>
        <div
          v-for="item in listData"
          @click="handleItemClick(item)"
          :key="item.no"
          class="ltext-item"
        >
          <div class="item-rank">{{ item.no }}</div>
          <div class="item-title">{{ item.title }}</div>
          <div class="item-actions">
            <span class="item-heat">
              <el-icon 
                :class="['flame-icon', { 'active': item.liked }]" 
                @click.stop="toggleLike(item)"
              >
                <component :is="item.liked ? 'StarFilled' : 'Star'" />
              </el-icon>
              <span :class="{ 'active-text': item.liked }">{{ item.number || 0 }}</span>
            </span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toRaw } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Star, StarFilled } from "@element-plus/icons-vue";



export default {
  data() {
    // 初始化五条假数据
    const listData = [
      {
        no: 1,
        title: "某明星涉嫌偷税漏税事件引发热议",
        time: "2025-05-30 12:30:45",
        name: "热点观察员",
        id: "101",
        liked: false,
        number: 22
      },
      {
        no: 2,
        title: "新冠疫情最新变种引发全球关注",
        time: "2025-05-30 10:15:22",
        name: "医疗观察",
        id: "102",
        liked: false,
        number: 18
      },
      {
        no: 3,
        title: "某高校学术不端事件曝光引发教育界反思",
        time: "2025-05-29 18:45:36",
        name: "教育观察",
        id: "103",
        liked: false,
        number: 15
      },
      {
        no: 4,
        title: "国际贸易摩擦升级，多国发表联合声明",
        time: "2025-05-29 15:20:10",
        name: "国际视角",
        id: "104",
        liked: false,
        number: 10
      },
      {
        no: 5,
        title: "某网红直播带货虚假宣传被罚款500万",
        time: "2025-05-28 20:10:05",
        name: "消费监督",
        id: "105",
        liked: false,
        number: 6
      }
    ];
    
    return {
      ltext: "",
      listData,
      startNumber: 0,
      clicked: false,
      number: '',
      useRealData: false, // 控制是否使用真实数据
    };
  },
  methods: {
    handleButtonClick() {
      // 如果不使用真实数据，则保留假数据
      if (!this.useRealData) {
        ElMessage.success('已加载热点数据');
        return;
      }
      
      // 使用真实数据时，清空之前的数据
      this.listData = [];
      
      const token = sessionStorage.getItem("token");
      if (!token) {
        ElMessage.warning('请先登录');
        return;
      }
      
      axios.defaults.headers.common["token"] = `${token}`;
      const url = "http://124.223.59.64:80/opinion/show10";
      
      axios
        .get(url, token)
        .then((response) => {
          console.log('获取热点列表:', response);
          if (response.data.code !== 1) {
            ElMessage.error("获取热点列表失败，请重试!");
            return;
          }
          
          response.data.data.forEach((dataItem, index) => {
            // 添加基本数据
            this.listData.push({
              no: index + 1,
              title: dataItem.title,
              time: dataItem.updateTime,
              name: dataItem.nickName,
              id: dataItem.id,
              liked: false, // 初始化点赞状态
              number: 0 // 初始化热度数值
            });
            
            // 获取每个舆情的点赞数
            const url2 = 'http://124.223.59.64:80/opinion/showLike/' + dataItem.id;
            axios
              .get(url2, token)
              .then((response) => {
                if (response.data.code === 1) {
                  const likeCount = response.data.data;
                  // 更新对应的热度数值
                  this.listData[index].number = likeCount;
                } else {
                  console.warn("获取点赞数失败:", dataItem.id);
                }
              })
              .catch((error) => {
                console.error("获取点赞数错误:", error);
              });
          });
          console.log(toRaw(this.listData), "111");
          if (response.data.code != 1) {
            alert("网络出现问题，请重试!");
            return;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    handleItemClick(item) {
      console.log("Clicked item:", toRaw(item));
      setTimeout(() => {
        this.$router.push({
          path: "/account/detail",
          query: {
            itemNo: item.no,
            itemTitle: item.title,
            itemTime: item.time,
            itemName: item.name,
            itemId: item.id,
          },
          params: {},
        });
      }, 2000);
    },

    start() {
      const token = sessionStorage.getItem("token");
      axios.defaults.headers.common["token"] = ` ${token}`;

      const text = this.ltext;
      const url = `http://124.223.59.64:80/common/search/` + text;

      axios
        .get(url, token)
        .then((response) => {
          console.log(response.data);
          ElMessageBox.alert(
            {
              搜索结果: "成功",
            }
          );
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 点赞功能
    toggleLike(item) {
      console.log('点赞舆情ID:', item.id);
      
      // 如果item没有liked属性，初始化为false
      if (item.liked === undefined) {
        this.$set(item, 'liked', false);
      }
      
      // 切换点赞状态
      item.liked = !item.liked;
      
      // 更新热度数值
      if (item.number === undefined) {
        item.number = 0;
      }
      
      let value = 0;
      if (item.liked) {
        item.number++;
        value = 1;
      } else {
        item.number--;
        value = 0;
      }
      
      // 如果不使用真实数据，则只更新本地状态
      if (!this.useRealData) {
        // 点赞成功提示
        if (item.liked) {
          ElMessage.success('点赞成功');
        } else {
          ElMessage.info('已取消点赞');
        }
        return;
      }
      
      // 调用接口
      const token = sessionStorage.getItem("token");
      if (!token) {
        ElMessage.warning('请先登录后再点赞');
        return;
      }
      
      axios.defaults.headers.common["token"] = `${token}`;
      const url = "http://124.223.59.64:80/opinion/like";
      const opinionId = item.id;
      
      axios
        .put(url, {value, opinionId}, token)
        .then((response) => {
          console.log(response.data);
          if (response.data.code !== 1) {
            ElMessage.error("点赞失败，请重试!");
            // 恢复原状态
            item.liked = !item.liked;
            if (item.liked) {
              item.number++;
            } else {
              item.number--;
            }
            return;
          }
          
          // 点赞成功提示
          if (item.liked) {
            ElMessage.success('点赞成功');
          } else {
            ElMessage.info('已取消点赞');
          }
        })
        .catch((error) => {
          console.error(error);
          ElMessage.error("网络错误，请稍后再试");
          // 恢复原状态
          item.liked = !item.liked;
          if (item.liked) {
            item.number++;
          } else {
            item.number--;
          }
        });
    },
  },
};
</script>

<style scoped>
/* 全局容器样式 */
.content-wrapper {
  min-height: 100vh;
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

/* 内容容器样式 */
.content-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5vh;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
}

/* 搜索区域样式 */
.search-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.search-area {
  display: flex;
  width: 100%;
  max-width: 700px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.search-input-wrapper {
  display: flex;
  flex: 1;
  min-width: 280px;
  max-width: 800px;
  transition: all 0.3s ease;
  /* animation: search-breathe 4s infinite ease-in-out; */
  align-items: center;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
}

@keyframes search-breathe {
  0% {
    box-shadow: 0 0 0 rgba(64, 158, 255, 0);
  }
  50% {
    box-shadow: 0 0 15px rgba(64, 158, 255, 0.2);
  }
  100% {
    box-shadow: 0 0 0 rgba(64, 158, 255, 0);
  }
}

.search-input-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(64, 158, 255, 0.15);
}

.search-input {
  flex: 1;
  height: 40px;
  border: 1px solid #dcdfe6;
  border-right: none;
  border-radius: 20px 0 0 20px;
  padding: 0 15px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
}

.search-input:focus {
  border-color: #409eff;
}

.search-btn {
  height: 40px;
  border-radius: 0 20px 20px 0 !important;
  margin: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  box-sizing: border-box;
}

.hot-btn {
  height: 40px;
  transition: all 0.3s ease;
  /* animation: hot-btn-breathe 4s infinite ease-in-out; */
}

@keyframes hot-btn-breathe {
  0% {
    box-shadow: 0 0 0 rgba(64, 158, 255, 0);
  }
  50% {
    box-shadow: 0 0 10px rgba(64, 158, 255, 0.25);
  }
  100% {
    box-shadow: 0 0 0 rgba(64, 158, 255, 0);
  }
}

.hot-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(64, 158, 255, 0.2);
}

/* 卡片样式 */
.box-card {
  width: 100%;
  max-width: 700px;
  margin-top: 16px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  /* animation: breathe 4s infinite ease-in-out;/ */
}

@keyframes breathe {
  0% {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  50% {
    box-shadow: 0 4px 20px 0 rgba(64, 158, 255, 0.15);
  }
  100% {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}

.box-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px 0 rgba(64, 158, 255, 0.2);
}

/* 卡片头部样式 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.header-item {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.header-rank {
  width: 15%;
  text-align: center;
}

.header-title {
  width: 60%;
  text-align: left;
}

.header-heat {
  width: 25%;
  text-align: right;
}

/* 列表项样式 */
.ltext-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #ebeef5;
  cursor: pointer;
  transition: background-color 0.3s;
}

.ltext-item:hover {
  background-color: #f5f7fa;
}

.ltext-item:last-child {
  border-bottom: none;
}

.item-rank {
  width: 15%;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
}

.item-title {
  width: 60%;
  text-align: left;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-actions {
  width: 25%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.item-heat {
  font-size: 14px;
  margin-right: 16px;
}

.like-btn {
  cursor: pointer;
  padding: 4px;
}

.like-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.2s;
}

.like-btn:hover .like-icon {
  transform: scale(1.2);
}

/* 响应式布局 */
@media (max-width: 768px) {
  .content-container {
    padding-top: 3vh;
  }
  
  .search-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-input-wrapper {
    max-width: 100%;
  }
  
  .hot-btn {
    width: 100%;
  }
  
  .header-item {
    font-size: 16px;
  }
  
  .item-rank {
    width: 20%;
  }
  
  .item-title {
    width: 50%;
  }
  
  .item-actions {
    width: 30%;
  }
}

@media (max-width: 480px) {
  .header-item {
    font-size: 14px;
  }
  
  .item-rank {
    font-size: 14px;
  }
  
  .item-title {
    font-size: 14px;
  }
  
  .item-heat {
    font-size: 12px;
    margin-right: 8px;
  }
  
  .like-icon {
    width: 20px;
    height: 20px;
  }
}

.content {
  height: 30px;
  width: 500px;
  border-radius: 12px;
  margin-right: 15px;
  padding: 5px 5px 5px 15px;
}
/* 火焰图标样式 */
.flame-icon {
  cursor: pointer;
  font-size: 20px;
  color: #909399;
  transition: all 0.3s;
  margin-right: 5px;
}

.flame-icon:hover {
  transform: scale(1.2);
}

.flame-icon.active {
  color: #f56c6c;
}

.active-text {
  color: #f56c6c;
  font-weight: bold;
}

.item-heat {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
