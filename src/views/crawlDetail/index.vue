<template>
  <div class="top-container">
    <el-table :data="details" height="500" border style="width: 100%">
      <el-table-column type="index" label="number" width="200" align="center" header-align="center" />
      <el-table-column v-for="key in columns" :key="key" :prop="key" :label="key" align="center" header-align="center" />
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDetailInfo } from '@/api/user.js'

export default {
  name: 'CrawlDetails',
  computed: {
    ...mapGetters([
      'username'
    ]) },
  data() {
    return {
      name: '',
      details: [],
      columns: []
    }
  },
  created: function() {
    this.name = this.$route.params.name
    console.error(this.name)
    console.error(this.$route.params)
    getDetailInfo(this.name).then((response) => {
      const details = response.data
      this.details = JSON.parse(details)
      console.error(this.details)
      this.processColumns()
    })
      .catch(error => {
        console.error(error)
      })
  },
  methods: {
    processColumns() {
      if (this.details.length > 0) {
        // 获取第一个对象的字段名
        this.columns = Object.keys(this.details[0])
        if (this.name === '抖音') {
          this.columns.splice(0, 1)
        }
        for (let i = this.columns.length - 1; i >= 0; i--) {
          if (this.columns[i].includes('aweme_id') || this.columns[i].includes('address')) {
            this.columns.splice(i, 1)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top-container {
padding: 20px;
}

.top-text {
font-size: 18px;
font-weight: bold;
margin-bottom: 20px;
}

.group-card {
height: 350px; /* 设置卡片高度 */
margin-bottom: 20px; /* 设置卡片间的垂直间距 */
width: 100%;
border-radius: 8px;
box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.group-content {
display: flex;
flex-direction: column;
height: 100%;
}

.image-wrapper {
width: 100%;
min-height: 210px;
max-height: 210px;
}

.group-image {
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 8px 8px 8px 8px;
}

.group-rank {
font-size: 20px;
font-weight: bold;
text-align: center;
margin-bottom: 3px;
}
.group-name {
font-size: 15px;
font-weight: bold;
text-align: center;
margin-bottom: 3px;
}
.group-buttons {
display: flex;
justify-content: flex-end;
margin-top: 2px
}

.group-button {
flex-grow: 1;
margin: 0 20px;
}

.group-details {
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100%;
flex-grow: 1;
padding-top: 10px; /* 设置卡片顶部内边距 */
}

</style>
