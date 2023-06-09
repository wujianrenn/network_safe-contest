
<template>
     <el-button @click="handleButtonClick()">获取最新数据</el-button>
    <el-table :data="tableData" stripe style="width: 100% ; height: 820px;">
        <el-table-column prop="no" label="序号" width="100" />
        <el-table-column prop="title" label="舆情标题" width="300" />
        <el-table-column prop="time" label="上传时间"  width="180" />
        <el-table-column prop="name" label="用户名"  width="100" />
        <el-table-column label="评估结果" width="200" >
            <el-button @click="handleButtonPass()">通过</el-button>
            <el-button @click="handleButtonUnpass()">不通过</el-button>
        </el-table-column>
        <el-table-column prop="date" label="查看详情" width="200" >
            <el-button @click="handleButtonDetail()">查看详情</el-button>
        </el-table-column>
       
    </el-table>

</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            tableData :[
                {
                    no: '1',
                    title: '钟南山称今年6月底或是今年疫情高峰？',
                    time:'2022.5.16',
                    name: '天眼',
                },
                {
                    no: '2',
                    title: '华为研发出量子芯片？',
                    time:'2022.5.20',
                    name: '南风',
                },
                {
                    no: '3',
                    title: '最近AI诈骗盛行？',
                    time:'2022.5.22',
                    name: '张强',
                },
                {
                    no: '4',
                    title: 'G7峰会上拜登称美中关系会短时间内缓和，可信吗？',
                    time:'2022.5.06',
                    name: '秀西',
                },
                {
                    no: '5',
                    title: '桂林371所学校因暴雨停课？',
                    time:'2022.5.12',
                    name: '宇胜',
                },
                {
                    no: '6',
                    title: 'oppo终止哲库业务是因为美国的威胁？',
                    time:'2022.5.18',
                    name: '哲雅',
                },
            ]
        };
    },
    methods: {
        handleButtonClick(row) {
            // 处理按钮点击事件
            // console.log('点击了编辑按钮，当前行数据：', row);
            const token = sessionStorage.getItem('token');
            const type = 1;
            console.log('1');
            axios.defaults.headers.common['token'] = ` ${token}`;
            console.log(token)
            const url = "http://124.223.59.64:80/opinion/list0";
                console.log(url)
            axios
                .get(url,token)
                .then((response) => {
                    console.log(response.data);
                    response.data.data.forEach((dataItem, index) => {
                        this.tableData.push({
                            no: index + 1,
                            title: dataItem.title,
                            time: dataItem.updateTime,
                            name: dataItem.nickName,
                        });
                    });
                    if (response.data.code != 1) {
                        alert("网络出现问题，请重试!");
                    return;
                    }
                    // sessionStorage.setItem('token',res.token)
                })
                .catch((error) => {
                    console.error(error)
                });
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