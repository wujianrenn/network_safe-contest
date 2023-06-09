<template>
    <el-card shadow="never" class="index">
        <template #header>
            <div class="card_header">
                <b>舆情侦探</b>
            </div>
        </template>
        <br />
        <News />
    </el-card>
</template>

<script>
import News from "./News.vue";

export default {
    components: { News },
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