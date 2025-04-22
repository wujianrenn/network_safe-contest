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
            <span :style="{ color: changeColor }" class="item-heat">{{ item.number }}</span>
            <span class="like-btn" @click.stop="good(item.id)">
              <img :src="imgSrc" alt="点赞" class="like-icon" />
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

export default {
  data() {
    const listData = [];
    return {
      ltext: "",
      listData,
      startNumber: 0,
      imgSrc:
        "https://img.51miz.com/preview/element/00/01/04/61/E-1046130-B357714A.jpg",
      clicked: false,
      changeColor: "black",
      change: false,
      number: '',
    };
  },
  methods: {
    handleButtonClick() {
      const token = sessionStorage.getItem("token");
      console.log("1");
      axios.defaults.headers.common["token"] = ` ${token}`;
      console.log(token);
      const url = "http://124.223.59.64:80/opinion/show10";
      console.log(url);
      axios
        .get(url, token)
        .then((response) => {
          console.log(response);
          response.data.data.forEach((dataItem, index) => {
            this.listData.push({
              no: index + 1,
              title: dataItem.title,
              time: dataItem.updateTime,
              name: dataItem.nickName,
              id: dataItem.id,
            });
            const url2 = 'http://124.223.59.64:80/opinion/showLike/' + dataItem.id;
        axios
          .get(url2, token)
          .then((response) => {
            const likeCount = response.data.data;
            // Update the corresponding listData item with the like count
            this.listData[index].number = likeCount;
          if (response.data.code != 1) {
            alert("网络出现问题，请重试!");
            return;
          }
        })
        .catch((error) => {
          console.error(error);
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
    good(id) {
      // this.startNumber = this.startNumber + 
      console.log('id:', id)
      
      let value = 0;
      if (!this.clicked) {
        this.imgSrc =
          "https://tse1-mm.cn.bing.net/th/id/OIP-C.JPL7jGmZwXlhWiDpEEilJwHaFo?w=278&h=211&c=7&r=0&o=5&dpr=1.5&pid=1.7";
      } else {
        this.imgSrc =
          "https://img.51miz.com/preview/element/00/01/04/61/E-1046130-B357714A.jpg";
      }
      this.clicked = !this.clicked;

      
      const opinionid = 123;
      if (!this.change) {
        this.changeColor = "red";
        this.startNumber = this.startNumber + 1
        value = 1;
      } else {
        this.changeColor = "black";
        this.startNumber = this.startNumber -1
        value = 0;
      }
      this.change = !this.change;

      //接口
      const startNumber = this.startNumber;
      const token = sessionStorage.getItem("token");
      axios.defaults.headers.common["token"] = ` ${token}`;
      const url = "http://124.223.59.64:80/opinion/like";
      const opinionId = id;
      axios
        .put(url, {value, opinionId},token,)
        .then((response) => {
          console.log(response.data);
          if (response.data.code != 1) {
            alert("网络出现问题，请重试!");
            return;
          }
        })
        .catch((error) => {
          console.error(error);
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
</style>
