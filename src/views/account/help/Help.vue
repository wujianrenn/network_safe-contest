<template>
    <el-card shadow="never">
        <template #header>
            <div class="card_header">
                <b>个人中心 / 帮助中心</b>
            </div>
        </template>
        <br />
        <Help_next />
    </el-card>
</template>

<script>
import Help_next from "./Help_next.vue";

export default {
    components: { Help_next },
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