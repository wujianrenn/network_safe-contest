<template>
    <el-card shadow="never" class="index">
        <template #header>
            <div class="card_header">
                <b>甄别结果</b>
            </div>
        </template>
        <br />
        <Answer />
    </el-card>
</template>

<script>
import Answer from './Answer.vue'


export default {
    components: { Answer },
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