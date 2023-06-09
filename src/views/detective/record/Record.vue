<template>
    <el-card shadow="never">
        <template #header>
            <div class="card_header">
                <b>舆情侦探 / 上传记录</b>
            </div>
        </template>
        <br />
        <Record_next />
    </el-card>
</template>

<script>
import Record_next from "./Record_next.vue";

export default {
    components: { Record_next },
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