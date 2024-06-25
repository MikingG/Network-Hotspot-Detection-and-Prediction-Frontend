<template>
  <div>
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入要查询的事件"
      class="my-autocomplete"
      @select="handleSelect"
    />
    <el-button type="primary" @click="getgraph">查询</el-button>
    <!-- <span style="height: fit-content;">{{ restaurants }}</span> -->
    <!-- <div ref="networkContainer" style="height: 600px;" /> -->
    <div v-if="showgraph" style="display: flex;">
      <iframe id="myIframe" :src="getUrl" style="flex: 1; min-width: 0; height: 1000px;" />
    </div>
  </div>
</template>

<script>
import { getEventList } from '@/api/graph'
export default {
  data() {
    return {
      graphurl: 'http://localhost:8080/#/Workbench/Cypher',
      selectevent: '',
      eventname: '法国总统马克龙访问中山大学',
      eventlist: [],
      state: '',
      timeout: null,
      showgraph: false
    }
  },
  computed: {
    getUrl() {
      console.log(this.eventname)
      return this.graphurl + '?name=' + this.eventname
    }
  },
  created() {
    getEventList().then(res => {
      var ret = []
      for (let i = 0; i < res.data.length; i++) {
        ret.push(({ 'value': res.data[i] }))
      }
      console.log(ret)
      this.eventlist = ret
    }).catch(err => {
      console.log(err)
      this.eventlist = []
    })
  },
  methods: {
    querySearchAsync(queryString, cb) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        // let results = this.restaurants
        let results = this.eventlist
        if (queryString) {
          results = results.filter(item => {
            return item['value'].toLowerCase().includes(queryString.toLowerCase())
          })
        }
        cb(results)
      }, 200)
    },
    handleSelect(item) {
      console.log(item)
      this.selectevent = item.value
    },
    getgraph() {
      // 这个是为了强制刷新iframe，实测发现src变了仍旧不刷新，故这里先隐藏再显示
      this.showgraph = false
      this.eventname = this.selectevent
      // var iframe = document.getElementById('myIframe')
      // iframe.src = this.graphurl + '?name=' + this.eventname
      setTimeout(() => {
        this.showgraph = true
      }, 100)
    }
  }
}
</script>
<style lang="scss" scoped>
.my-autocomplete {
  font-size: 18px;
  min-width: 300px;
  max-width: 500px; /* 或者你想要的最大宽度 */
  word-break: break-all;
  white-space: normal;
}
</style>
