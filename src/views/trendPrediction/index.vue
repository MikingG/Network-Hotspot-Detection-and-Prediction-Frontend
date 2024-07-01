<template>
    <div>
        <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
        <el-card shadow="always">
            <div id="main" style="width: 100%; height: 500px;"></div>
        </el-card>
        </el-col>
        <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
        <el-card shadow="always">
            <div id="wordCloudChart" style="width: 100%; height: 500px;"></div>
        </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="table-title">短视频趋势预测</div>
            <el-table
                :data="tableData"
                height="1000px"
                style="width: 100%"
                stripe
                border
                >
                <el-table-column
                    prop="rank"
                    label="排名"
                    width="100"
                    align="center"
                />
                <el-table-column
                    prop="title"
                    label="标题"
                    class-name="right-aligned-title"
                />
                <!-- <el-table-column
                    prop="topic"
                    label="类别"
                /> -->
            </el-table>
        </el-col>
    </div>
</template>

<script>

import * as echarts from 'echarts';
import { mapGetters } from 'vuex';
import { getTrendWordFrequency, getTrendHotspots, getTrendRanking } from '@/api/table.js';


export default {
    name: 'TrendPrediction',
    computed: {
        ...mapGetters(['name'])
    },
    mounted() {
        // Initialize the chart when the component is mounted
        this.fetchDataAndInitChart();
        this.initPieChart();
        this.initWordCloudChart();
    },
    methods: {
        async fetchDataAndInitChart() {
            try {

                // Fetch data for bar chart
                const response = await getTrendHotspots();
                const data = response.data;

                data.sort((a, b) => b.score - a.score);
                // Process the data to match the required dataset format
                const dataset = [
                {
                    dimensions: ['hotspot', 'score'],
                    source: data.map(item => [item.hotspot, item.score])
                },
                {
                    // Sort transformation
                    transform: {
                    type: 'sort',
                    config: { dimension: 'score', order: 'desc' }
                    }
                }
                ];
                // Initialize the bar chart with the fetched data
                this.initMainChart(dataset);

                // Fetch data for word cloud chart
                const wordCloudResponse = await getTrendWordFrequency();
                const wordCloudData = wordCloudResponse.data;

                // Process the data for word cloud chart
                const wordCloudDataset = wordCloudData.map(item => ({
                name: item.name,
                value: item.value
                }));

                // Initialize the word cloud chart with the fetched data
                this.initWordCloudChart(wordCloudDataset);

                // Fetch data for table
                const rankResponse = await getTrendRanking();
                const fetchRankingData = rankResponse.data.sort((a, b) => b.trending_probability - a.trending_probability);

                // Process data for table, adding rank
                const processedData = fetchRankingData.map((item, index) => ({
                    rank: index + 1,
                    title: item.name,
                    topic: item.type
                }));

                this.tableData = processedData;
            } 
            catch (error) {
                console.error('Failed to fetch data:', error);
            }
        },

        initMainChart(dataset) {
        // Get the DOM element by ID
        const chartDom = document.getElementById('main');
        // Initialize the ECharts instance based on the DOM element
        const myChart = echarts.init(chartDom);
        
        // Specify the chart configuration
        const option = {
            title: {
            text: '热点话题预测',
            subtext: '预测热度百分比'
            },
            tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            position: 'right'
            },
            xAxis: {
            name: '话题', 
            nameLocation: 'middle',
            type: 'category',
            axisLabel: {
                color: '#fff'
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
            },
            yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#999'
            }
            },
            dataZoom: [
            {
                type: 'inside'
            }
            ],
            dataset: dataset,
            series: [
            {
                type: 'bar',
                encode: {
                x: 'hotspot',
                y: 'score'
                },
                datasetIndex: 1, // Use the transformed dataset
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#87CEFA' },  // 浅蓝色
                        { offset: 0.5, color: '#00BFFF' },  // 中间蓝色
                        { offset: 1, color: '#4682B4' }   // 深蓝色
                    ])
                },
                emphasis: {
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#ffa500' },  // 橙色
                    { offset: 0.7, color: '#ff8c00' },  // 深橙色
                    { offset: 1, color: '#ffd700' }  // 浅橙色
                    ])
                }
                },
                animation: true, // 开启动画
                animationDuration: 1000 // 动画时长
            }
            ]
        };

        // Enable data zoom when user clicks the bar.
        const zoomSize = 6;
        myChart.on('click', function (params) {
            console.log(dataset[0].source[Math.max(params.dataIndex - zoomSize / 2, 0)][0]);
            myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataset[0].source[Math.max(params.dataIndex - zoomSize / 2, 0)][0],
            endValue: dataset[0].source[Math.min(params.dataIndex + zoomSize / 2, dataset[0].source.length - 1)][0]
            });
        });

        // Use the specified configuration to set the chart options
        option && myChart.setOption(option);

        },
        
        // 辅助函数：生成随机颜色
        randomColor() {
            return '#' + Math.floor(Math.random()*16777215).toString(16);
        },

        initWordCloudChart(dataset) {
            // 获取词云图表的 DOM 元素
            const wordCloudChartDom = document.getElementById('wordCloudChart');
            // 初始化词云图表的 ECharts 实例
            const wordCloudChart = echarts.init(wordCloudChartDom);

            // 指定词云图表的配置
            const option = {
                title: {
                    text: '热点词云预测',
                    left: 'center'
                },
                series: [{
                type: 'wordCloud',
                gridSize: 20, // 网格尺寸
                sizeRange: [20, 80], // 字体大小范围
                rotationRange: [-90, 90], // 字体旋转角度范围
                shape: 'circle', // 词云形状
                textStyle: {
                    normal: {
                        olor: this.randomColor // 为每个单词应用随机颜色
                    }
                },
                data: dataset.map(item => ({...item, textStyle: {color: this.randomColor()}}))
                }]
            };
            // 使用指定的配置设置词云图表选项
            option && wordCloudChart.setOption(option);
        },
    },
    data() {
        return {
            tableData: [], // 表格数据
        };
    },
}

</script>

<style>

.table-title {
    margin-top: 20px; 
    padding-left: 30px; 
    margin-bottom: 16px; 
    font-size: 18px; 
    color: #333; 
    font-weight: bold;
}

.right-aligned-title .cell {
    padding-left: 40px; /* 根据需要调整数值，控制文本右移的距离 */
}

.el-table .el-table__header th.right-aligned-title .cell {
    text-align: center; /* 使表头文本居中 */
}

</style>
