<template>
    <el-card shadow="never">
        <template #header>
            <div class="card_header">
                <b>个人中心 / 积分排行榜</b>
            </div>
        </template>
        <br />
        <Leaderboard_next />
    </el-card>
</template>

<script>
import Leaderboard_next from "./Leaderboard_next.vue";

export default {
    components: { Leaderboard_next },
    setup() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.card_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>