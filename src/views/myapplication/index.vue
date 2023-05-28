<template>
  <el-table
    :data="myapps"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="time"
      label="申请时间"
      width="300">
      <template slot-scope="scope">
        <span class="text">{{ formatDate(scope.row.time) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="groupname"
      label="申请社团"
      width="300">
      <template slot-scope="scope">
        <span class="text">{{ scope.row.groupname }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="isaccepted"
      label="申请状态">
      <template slot-scope="scope">
        <span v-if="scope.row.isaccepted === true" class="text success-text">已通过</span>
        <span v-else-if="scope.row.isaccepted === false" class="text fail-text">未通过</span>
        <span v-else class="text pending-text">待审核</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
  .el-table th {
    font-weight: bold;
    font-size: 18px;
  }

  .text {
    font-size: 14px;
    font-weight: bold;
  }

  .el-table .fail-row {
    background: rgb(250, 231, 231);
  }

  .el-table .success-row {
    background: #e1fce8;
  }

  .success-text {
    color: #4caf50;
  }

  .fail-text {
    color: #f44336;
  }

  .pending-text {
    color: #ff9800;
  }
</style>

<script>
import { mapGetters } from 'vuex'
import { getApplications } from "@/api/group.js";
export default {
    name: 'Myapplication',
    computed: {
    ...mapGetters([
      'name'
    ])},
    methods: {
      tableRowClassName({ row }) {
        if (row.isaccepted === true) {
          return 'success-row';
        } else if (row.isaccepted === false) {
          return 'fail-row';
        }
        return '';
      },
      formatDate(date) {
        // 格式化日期时间
        const d = new Date(date);
        return `${d.getFullYear()}年${
          d.getMonth() + 1
        }月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
      },
    },
    data() {
      return {
        myapps: [],
      }
    },
    created: function () {
      getApplications(this.name).then((response) => {
      this.myapps = response.data.items;
      })
      .catch(error => {
        console.error(error);
      });
    },
  }
</script>