<template>
    <div class="page-container">
        <el-card shadow="hover" class="main-card">
            <template #header>
                <div class="card_header">
                    <b>舆情侦探 / 舆情上传</b>
                </div>
            </template>
            <Table_next />
        </el-card>
        <div class="footer-space"></div>
    </div>
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
.page-container {
    width: 100%;
    min-height: calc(100vh - 48px); /* 留出底部版权信息空间 */
    background: #fff;
    display: flex;
    flex-direction: column;
}

.main-card {
    flex: 1;
    margin-bottom: 0;
    padding: 10px 15px;
}

:deep(.el-card__header) {
    padding: 10px 15px;
}

.footer-space {
    height: 30px; /* 版权信息空间 */
}

.card_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
}

:deep(.el-card) {
    transition: all 0.3s ease;
}

:deep(.el-card:hover) {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
</style>