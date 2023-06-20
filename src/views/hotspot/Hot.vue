<template>
    <el-card shadow="never">
        <template #header>
            <div class="card_header">
                <b>舆情热点 / 舆情</b>
            </div>
        </template>
        <br />
        <Details />
    </el-card>
</template>

<script>
import Details from "./Details.vue";

export default {
    components: { Details },
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