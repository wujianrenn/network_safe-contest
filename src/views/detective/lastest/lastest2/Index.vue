<template>
    <el-card shadow="never" class="index">
        <template #header>
            <div class="card_header">
                <b>具体舆情</b>
            </div>
        </template>
        <br />
        <Second />
    </el-card>
</template>

<script>
import Second from './Second.vue';


export default {
    components: { Second },
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