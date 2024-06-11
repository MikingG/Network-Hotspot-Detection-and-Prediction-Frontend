<template>
  <div class="spider-container">
    <el-row>
      <el-col>
        <div class="spider-text">
          爬虫基本信息
          <el-button class="group-button" @click="showBrief">更新</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col v-for="group in groups" :key="group.id" :span="8" :offset="0">
        <el-card class="group-card" :body-style="{ padding: '20px', height: '200px' }">
          <div class="group-content">
            <div class="group-details">
              <div class="group-name">{{ group.name }}</div>
            </div>
            <div class="group-details">
              <div class="group-name">Crawl Number: {{ group.number }}</div>
            </div>
            <div class="group-details">
              <div class="group-name">Updated Time: {{ momentDate(group.last_update_time) }}</div>
            </div>

            <div class="group-details">
              <button class="group-button">查询具体信息</button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBriefInfo } from '@/api/user.js'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'username'
    ]) },
  data() {
    return {
      groups: [],
      dialogVisible: false,
      currentGroup: {
        description: ''
      }
    }
  },
  created: function() {
    getBriefInfo().then((response) => {
      this.groups = response.data
      console.log(this.groups)
    })
      .catch(error => {
        console.error(error)
      })
  },
  methods: {
    showBrief() {
      getBriefInfo().then((response) => {
        this.groups = response.data
        this.$message({
          message: '成功刷新',
          type: 'success'
        })
      })
        .catch(error => {
          console.error(error)
        })
    },
    momentDate(datetime) {
      var date = new Date(datetime)
      return date.toLocaleString()
    },
    redirectToApplication(groupname) {
      this.$router.push({
        name: 'Application',
        params: {
          groupname: groupname
        }
      })
    },
    redirectToShowgroupdetails(groupid) {
      this.$router.push({
        name: 'Showgroupdetails',
        params: {
          groupid: groupid
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>
  .spider-container {
    padding: 20px;
  }

  .spider-text {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .group-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .group-button {
    padding: 10px 20px;
    font-size: 14px;
    color: white;
    background-color: var(--primary-color);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-left: 20px;
    margin-right: 20px;
    background-color: #304156;
  }

  .group-card {
    height: 350px; /* 设置卡片高度 */
    margin-bottom: 20px; /* 设置卡片间的垂直间距 */
    margin-right: 100px;
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
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

  .center-button {
    background-color: blue;
    display: block;
    margin: 0 auto; /* 上下边距为0，左右自动调整以居中 */
  }

  .group-name {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 3px;
  }
</style>
