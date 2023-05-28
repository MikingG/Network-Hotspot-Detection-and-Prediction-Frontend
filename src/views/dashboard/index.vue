<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎{{ name }}登录社团招新系统</div>
    <el-row :gutter="30">
      <el-col v-for="group in groups" :key="group.id" :span="6" :offset="0">
        <el-card class="group-card" :body-style="{ padding: '20px', height: '200px' }">
          <div class="group-content">
            <div class="image-wrapper">
              <img :src="group.image" class="group-image">
            </div>
          <div class="group-details">
          <div class="group-name">{{ group.name }}</div>
          <div class="group-buttons">
            <el-button type="primary" class="group-button" size="mini" @click="redirectToApplication(group.name)">申请加入</el-button>
            <el-button type="primary" class="group-button" size="mini" @click="showDescription(group)">查看详情</el-button>
          </div>
          </div>
        </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="社团详情" width="30%">
      <div>{{ currentGroup.description }}</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getGroups } from "@/api/group.js";

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])},
  data(){
    return {   
      groups: [],
      dialogVisible: false,
      currentGroup: {
      description: '',
      }
    };
  },
  created: function () {
    getGroups().then((response) => {
      this.groups = response.data.items;
      })
      .catch(error => {
        console.error(error);
      });
    },
  methods: {
    showDescription(group) {
      this.currentGroup = group;
      this.currentGroup.description = group.description;
      this.dialogVisible = true;
    },
    redirectToApplication(groupname) {
      this.$router.push({
        name: 'Application',
        params: {
          groupname: groupname
        }
      });
    }
  },
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
}

.dashboard-text {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.group-card {
  height: 300px; /* 设置卡片高度 */
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
  max-height: 210px;
}

.group-image {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  border-radius: 8px 8px 8px 8px;
}

.group-name {
  font-size: 20px;
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
