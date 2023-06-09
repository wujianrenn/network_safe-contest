<template>
    <el-card shadow="never" class="index">
        <template #header>
            <div class="card_header">
                <b>具体舆情</b>
            </div>
        </template>
        <br />
        <Fourth />
    </el-card>
</template>

<script>
import Fourth from './Fourth.vue'


export default {
    components: { Fourth },
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