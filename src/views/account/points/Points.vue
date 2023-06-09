<template>
    <el-card shadow="never" class="index">
        <template #header>
            <div class="card_header">
                <b>个人中心 / 积分兑换</b>
            </div>
        </template>
        <br />
        <Points_next />
    </el-card>
</template>

<script>
import Points_next from "./Points_next.vue";

export default {
    components: { Points_next },
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