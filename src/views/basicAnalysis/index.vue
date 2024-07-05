<template>
  <div>
    <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
      <el-card shadow="always">
        <div id="main" style="width: 100%; height: 500px;" />
        <el-table :data="tableData" height="300" border style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="rank" label="位次" width="100" />
          <el-table-column prop="hotspot" label="热点" />
        </el-table>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
      <el-card shadow="always">
        <div id="pieChart" style="width: 100%; height: 360px;" />
      </el-card>
      <el-card shadow="always">
        <div id="wordCloudChart" style="width: 100%; height: 400px;" />
      </el-card>
    </el-col>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { mapGetters } from 'vuex'
import { getHotspots, getCategory, getWordFrequency } from '@/api/group.js'

export default {
  name: 'BasicAnalysis',
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    // Initialize the chart when the component is mounted
    this.fetchDataAndInitChart()
    this.initPieChart()
    this.initWordCloudChart()
  },
  methods: {
    async fetchDataAndInitChart() {
      try {
        // Fetch data for bar chart
        const response = await getHotspots()
        const data = response.data

        data.sort((a, b) => b.score - a.score)
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
        ]
        // Initialize the bar chart with the fetched data
        this.initMainChart(dataset)

        const tableData = data.map((item, index) => ({
          rank: index + 1,
          hotspot: item.hotspot
        }))
        this.tableData = tableData

        // Fetch data for pie chart
        const cateResponse = await getCategory()
        const cateData = cateResponse.data

        // Process the data for pie chart
        const pieDataset = {
          dimensions: ['name', 'value'],
          source: cateData
        }

        // Initialize the pie chart with the fetched data
        this.initPieChart(pieDataset)

        // Fetch data for word cloud chart
        const wordCloudResponse = await getWordFrequency()
        const wordCloudData = wordCloudResponse.data

        // Process the data for word cloud chart
        const wordCloudDataset = wordCloudData.map(item => ({
          name: item.name,
          value: item.value
        }))

        // Initialize the word cloud chart with the fetched data
        this.initWordCloudChart(wordCloudDataset)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    },
    initMainChart(dataset) {
      // Get the DOM element by ID
      const chartDom = document.getElementById('main')
      // Initialize the ECharts instance based on the DOM element
      const myChart = echarts.init(chartDom)

      // Specify the chart configuration
      const option = {
        title: {
          text: '当前热点事件图',
          subtext: '点击柱状图或者滚动鼠标可以进行缩放（横坐标表示事件，纵坐标表示热度）'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          position: 'right'
        },
        xAxis: {
          name: '鼠标悬浮在条状可以显示事件内容',
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
                { offset: 0, color: '#ff7f7f' }, // 浅红色
                { offset: 0.5, color: '#ff4c4c' }, // 中间红色
                { offset: 1, color: '#ff1a1a' } // 深红色
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#ffa500' }, // 橙色
                  { offset: 0.7, color: '#ff8c00' }, // 深橙色
                  { offset: 1, color: '#ffd700' } // 浅橙色
                ])
              }
            },
            animation: true, // 开启动画
            animationDuration: 1000 // 动画时长
          }
        ]
      }

      // Enable data zoom when user clicks the bar.
      const zoomSize = 6
      myChart.on('click', function(params) {
        console.log(dataset[0].source[Math.max(params.dataIndex - zoomSize / 2, 0)][0])
        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: dataset[0].source[Math.max(params.dataIndex - zoomSize / 2, 0)][0],
          endValue: dataset[0].source[Math.min(params.dataIndex + zoomSize / 2, dataset[0].source.length - 1)][0]
        })
      })

      // Use the specified configuration to set the chart options
      option && myChart.setOption(option)
    },
    initPieChart(dataset) {
      // Get the DOM element by ID for the pie chart
      const pieChartDom = document.getElementById('pieChart')
      // Initialize the ECharts instance for the pie chart based on the DOM element
      const pieChart = echarts.init(pieChartDom)

      // Specify the configuration for the pie chart
      const option = {
        title: {
          text: '话题聚焦',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: dataset.source,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      // Use the specified configuration to set the pie chart options
      option && pieChart.setOption(option)
    },
    initWordCloudChart(dataset) {
      // 获取词云图表的 DOM 元素
      const wordCloudChartDom = document.getElementById('wordCloudChart')
      // 初始化词云图表的 ECharts 实例
      const wordCloudChart = echarts.init(wordCloudChartDom)

      // 指定词云图表的配置
      const option = {
        title: {
          text: '词云图',
          left: 'center',
        },
        tooltip: {
          show: true
        },
        series: [{
          type: 'wordCloud',
          gridSize: 20, // 网格尺寸
          sizeRange: [20, 100], // 字体大小范围
          rotationRange: [-90, 90], // 字体旋转角度范围
          shape: 'circle', // 词云形状
          data: dataset.map(item => ({ ...item, textStyle: { color: this.randomColor() }}))
        }]
      }
      // 使用指定的配置设置词云图表选项
      option && wordCloudChart.setOption(option)
    },
    randomColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16)
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 4 === 0) {
        return 'warning-row';
      } else if (rowIndex % 2 === 0) {
        return 'success-row';
      }
      return '';
    }
  },
  data() {
    return {
      tableData: [] // 表格数据
    }
  }
}
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
