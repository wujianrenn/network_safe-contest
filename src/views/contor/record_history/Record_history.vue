
<template>
    <el-table :data="tableData" stripe style="width: 100% ; height: 820px;">
        <el-table-column prop="no" label="序号" width="100" />
        <el-table-column prop="title" label="奖品名称" width="300" />
        <el-table-column prop="name" label="用户名"  width="100" />
        <el-table-column prop="wxid" label="用户微信号"  width="200" />
        <el-table-column prop="address" label="用户地址"  width="100" />
        <el-table-column prop="phone" label="用户电话"  width="200" />
    </el-table>
</template>

<script>
export default {
    data() {
        return {
            tableData :[
                {
                    no: '1',
                    title: '百度网盘会员（1个月）',
                    name: '张三',
                    wxid: 'zs1879563846218',
                    address: '陕西省 西安市区',
                    phone: '1879563846218',
                },
                {
                    no: '2',
                    title: 'Tom',
                    name: '李四',
                    wxid: 'zs1879563846218',
                    address: '陕西省 西安市区',
                    phone: '1879563846218',
                },
                {
                    no: '3',
                    title: 'Tom',
                    name: '王五',
                    wxid: 'zs1879563846218',
                    address: '陕西省 西安市区',
                    phone: '1879563846218',
                },
                {
                    no: '4',
                    title: 'Tom',
                    name: '张三',
                    wxid: 'zs1879563846218',
                    address: '陕西省 西安市区',
                    phone: '1879563846218',
                },
            ]
        };
    },
    methods: {
        handleButtonClick(row) {
            // 处理按钮点击事件
            console.log('点击了编辑按钮，当前行数据：', row);
        }
    }
};
</script>

<style lang="scss" scoped>
.middle {
    display: flex;
    align-items: center;
    justify-content: space-between;

}

</style>