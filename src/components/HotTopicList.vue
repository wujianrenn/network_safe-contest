<template>
  <div class="hot-topic-list">
    <div class="hot-topic-header">
      <div class="rank-header">排名</div>
      <div class="topic-name-header">舆情名称</div>
      <div class="heat-header">舆情热度</div>
    </div>
    <div 
      v-for="(topic, index) in hotTopics" 
      :key="topic.id" 
      class="hot-topic-item"
    >
      <div class="rank">{{ index + 1 }}</div>
      <div class="topic-name">{{ topic.name }}</div>
      <div class="heat">
        <div class="heat-value">
          <el-icon 
            :class="['flame-icon', { 'active': topic.liked }]" 
            @click="toggleLike(topic)"
          >
            <component :is="topic.liked ? 'Flame' : 'FlameOutlined'" />
          </el-icon>
          <span>{{ topic.heat }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineComponent } from 'vue';
import { Flame } from '@element-plus/icons-vue';

// 自定义一个轮廓版的火焰图标
const FlameOutlined = defineComponent({
  name: 'FlameOutlined',
  render() {
    return (
      <svg viewBox="0 0 1024 1024" width="1em" height="1em">
        <path 
          fill="currentColor" 
          stroke="currentColor"
          stroke-width="30"
          fill-opacity="0"
          d="M834.1 469.2A347.49 347.49 0 0 0 751.2 354l-29.1-26.7a8.09 8.09 0 0 0-13 3.3l-13 37.3c-8.1 23.4-23 47.3-44.1 70.8-1.4 1.5-3 1.9-4.1 2-1.1.1-2.8-.1-4.3-1.5-1.4-1.2-2.1-3-2-4.8 3.7-60.2-14.3-122.6-54-179.4-1-1.4-2.3-2.1-3.7-2.1h-.8c-1.7.4-3.1 1.8-3.6 3.5-1.5 6.1-2.8 12.7-3.9 19.6-5.2 30.3-17.7 73.3-41.5 112.2-2.2 3.5-4.4 7.1-6.7 10.6-22.8 34.2-52.2 69.6-90.7 105.5-4.3 4-8.7 8-13.1 12-1.1 1-1.7 2.3-1.8 3.5-.1 1.3.4 2.6 1.3 3.6 1 1.1 2.4 1.7 3.9 1.7.9 0 1.8-.2 2.6-.6 4.2-1.9 8.4-3.9 12.6-6 26.3-13.2 52-27.5 71.4-45.5 3.2-3 6.4-6 9.4-9.1 1.2-1.2 2.9-2.1 4.3-2.1 1.3.1 2.6.5 3.7 1.3 2.4 1.8 3.1 4.9 1.6 7.5-2.4 4.3-4.8 8.6-7.2 12.8-24.7 42.8-50.2 87.1-44.5 146.6.3 3.6 1.1 7.1 1.8 10.7.7 3.9 1.5 7.9 2 11.9.5 4.4 3.1 7.7 7 8.8 1.1.3 2.3.5 3.5.5 3.3 0 6.4-1.6 8.4-4.5 2.1-3 4.2-6 6.3-9 12.8-18.3 27.4-39 31.8-64.3 4.3-24.9-.7-44.9-5.1-63.2-1.3-5.5-2.7-11.2-3.7-16.9-.8-4.8.5-9 3.6-11.9 3.1-2.8 7.3-3.5 11.5-1.8 4.3 1.7 8.6 3.4 12.9 5.1 14.9 5.9 30.2 11.9 45.1 19.3 25 12.5 44.9 28.4 58.3 46.3 13.3 17.8 19.9 38.3 19.7 60.9-.1 14.1-3.5 28.7-10.3 44.1-1 2.3-.8 4.8.5 6.8 1.2 1.9 3.2 3.1 5.4 3.2 1 .1 2.1-.1 3.1-.6 7.5-3.6 15.1-7.3 22.6-11 40.7-20.5 82.9-41.7 111.2-76.9 28.9-36 42.1-77.3 39.4-122.5z" 
        />
      </svg>
    );
  }
});

// 假数据
const hotTopics = ref([
  {
    id: 1,
    name: "某明星涉嫌偷税漏税事件",
    heat: 9527,
    liked: false
  },
  {
    id: 2,
    name: "新冠疫情最新变种引发关注",
    heat: 8642,
    liked: false
  },
  {
    id: 3,
    name: "某高校学术不端事件曝光",
    heat: 7531,
    liked: false
  },
  {
    id: 4,
    name: "国际贸易摩擦升级",
    heat: 6248,
    liked: false
  },
  {
    id: 5,
    name: "某网红直播带货虚假宣传",
    heat: 5139,
    liked: false
  }
]);

// 点赞功能
const toggleLike = (topic) => {
  if (topic.liked) {
    topic.heat -= 1;
  } else {
    topic.heat += 1;
  }
  topic.liked = !topic.liked;
};
</script>

<style scoped>
.hot-topic-list {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.hot-topic-header {
  display: flex;
  padding: 15px 20px;
  background-color: #f5f7fa;
  font-weight: bold;
  border-bottom: 1px solid #ebeef5;
}

.hot-topic-item {
  display: flex;
  padding: 15px 20px;
  border-bottom: 1px solid #ebeef5;
  transition: all 0.3s;
}

.hot-topic-item:hover {
  background-color: #f5f7fa;
}

.rank, .rank-header {
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.topic-name, .topic-name-header {
  flex: 1;
  display: flex;
  align-items: center;
}

.heat, .heat-header {
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heat-value {
  display: flex;
  align-items: center;
  gap: 8px;
}

.flame-icon {
  cursor: pointer;
  font-size: 20px;
  color: #909399;
  transition: all 0.3s;
}

.flame-icon:hover {
  transform: scale(1.2);
}

.flame-icon.active {
  color: #f56c6c;
}
</style>
