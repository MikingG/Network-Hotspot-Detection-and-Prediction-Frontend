<template>
  <div class="outer-container">
    <div class="inner-container">
      <vue-typed-js class="mao" :strings="['现有热点整理,未来热点预测', '中大舆情尽在掌握','网络热点监测预测系统欢迎您']">
        <h2 class="typing" />
      </vue-typed-js>
      <!-- <div class="info">
        <p>Username: {{ name }}</p>
        <p>Is Staff: {{ isStaff }}</p>
      </div> -->
      <el-row>
        <el-table
        ref="singleTable"
        :data="tableData"
        border
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 80%; margin: 0 auto;">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          property="username"
          label="用户名"
          width="100">
        </el-table-column>
        <el-table-column
          property="is_staff"
          label="是否工作人员"
          width="200">
        </el-table-column>
      </el-table>
      
      </el-row>
      <div class="button-group">
        <el-button @click=deleteSelectedUser()>删除用户</el-button>
        <el-button @click=updateSelectedUser()>重置密码</el-button>
        <el-button @click=SwitchPermission()>切换权限</el-button>
        <el-button @click="setCurrent()">取消选择</el-button>
      </div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="formInline.username" placeholder="软小工"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="formInline.is_staff" placeholder="(非)管理员">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="普通用户" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="addOneUser">添加用户</el-button>
          <el-button type="primary" size="mini" @click="searchOneUser">查询用户</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { getAllUser,deleteUser,updateUser,changeAdmin,addUser } from '@/api/user';

export default {
  computed: {
    ...mapState({
      name: state => state.user.name,
      isStaff: state => state.user.is_staff
    })
  },
  data() {
    return {
      tableData: [],
      currentRow: null,
      formInline: {
        username: '',
        is_staff: ''
      }
    };
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    fetchAllUsers() {
      getAllUser()
        .then(response => {
          if (response.success) {
            console.log(response.data);
            this.tableData = response.data.map(item => ({
              username: item[0],
              is_staff: item[1] ? '是' : '否'
            }));
          } else {
            this.$message.error('获取用户数据失败');
          }
        })
        .catch(error => {
          console.error('Error fetching users:', error);
          this.$message.error('获取用户数据失败');
        });
    },
    deleteSelectedUser() {
      if (!this.currentRow) {
        this.$message.error('请选择要删除的用户');
        return;
      }
      deleteUser({username: this.currentRow.username})
        .then(response => {
          if (response.success) {
            this.$message.success('删除用户成功');
            this.fetchAllUsers(); // 刷新用户列表
          } else {
            this.$message.error(response.data.message || '删除用户失败');
          }
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          this.$message.error('删除用户失败');
        });
    },
    updateSelectedUser() {
      if (!this.currentRow) {
        this.$message.error('请选择要重置密码的用户');
        return;
      }
      updateUser({username: this.currentRow.username})
        .then(response => {
          if (response.success) {
            this.$message.success('重置密码成功');
          } else {
            this.$message.error(response.data.message || '更新用户失败');
          }
        })
        .catch(error => {
          console.error('Error updating user:', error);
          this.$message.error('更新用户失败');
        });
    },
    SwitchPermission() {
      if (!this.currentRow) {
        this.$message.error('请选择要切换权限的用户');
        return;
      }
      changeAdmin({username: this.currentRow.username})
        .then(response => {
          if (response.success) {
            this.$message.success('切换权限成功');
            this.fetchAllUsers(); // 刷新用户列表
          } else {
            this.$message.error(response.data.message || '更新用户失败');
          }
        })
        .catch(error => {
          console.error('Error updating user:', error);
            this.$message.error('更新用户失败');
      })
    },
    addOneUser(){
      addUser({username: this.formInline.username, is_staff: this.formInline.is_staff})
        .then(response => {
          if (response.success) {
            this.$message.success('添加用户成功');
            this.fetchAllUsers(); // 刷新用户列表
          } else {
            this.$message.error(response.data.message || '添加用户失败');
          }
        })
        .catch(error => {
          console.error('Error adding user:', error);
            this.$message.error('添加用户失败');
        })
      },
        searchOneUser() {
        //在表格的username中有无和this.formInline.username符合的
        if (this.formInline.username) {
          this.tableData = this.tableData.filter(item => item.username === this.formInline.username);
          if  (this.tableData.length > 0) {
            this.$message.success('已找到用户,查询用户名为空则刷新用户列表');
          } else {
            this.$message.error('未找到用户,查询用户名为空则刷新用户列表');
          }
        } else {
          this.fetchAllUsers(); // 如果没有输入用户名，则重新获取所有用户
        }
      },
    },
    mounted() {
        this.fetchAllUsers();
    }
  }

</script>

<style scoped>
.outer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.inner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}

.info {
  margin-bottom: 20px;
}

.table-container {
  width: 80%;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 80%; /* 将按钮组的宽度与表格宽度一致 */
}

.el-button {
  margin: 5px;
}

.demo-form-inline {
  width: 80%; /* 将表单宽度与表格宽度一致 */
}
</style>
