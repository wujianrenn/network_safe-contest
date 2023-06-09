<template>
    <el-card shadow="never">
        <template #header>
            <div class="card_header">
                <b>舆情侦探 / 舆情上传</b>
            </div>
        </template>
        <br />
        <Table_next />
    </el-card>
</template>

<script>
import Table_next from "./Table_next.vue";

export default {
    components: { Table_next },
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