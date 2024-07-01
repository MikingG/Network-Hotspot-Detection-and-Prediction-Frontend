<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- ÷<breadcrumb class="breadcrumb-container" /> -->

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://www.sysu.edu.cn/">
            <el-dropdown-item>中大首页</el-dropdown-item>
          </a>
          <a target="_blank" href="https://sse.sysu.edu.cn/">
            <el-dropdown-item>软件工程学院首页</el-dropdown-item>
          </a>
          <el-dropdown-item @click.native="dialogVisible = true">
            修改密码
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改密码对话框 -->
    <el-dialog :visible.sync="dialogVisible" title="修改密码">
      <el-form :model="form">
        <el-form-item label="旧密码">
          <el-input v-model="form.oldPassword" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newPassword" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="form.confirmNewPassword" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { modifypassword } from '@/api/user'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    // Breadcrumb,
    Hamburger
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    submitForm() {
      // 在这里处理表单提交逻辑，例如验证密码、调用API等
      if (this.form.newPassword !== this.form.confirmNewPassword) {
        this.$message.error('新密码和确认新密码不一致')
        return
      }
      modifypassword(this.form).then(response => {
        this.$message({
          message: '修改密码成功',
          type: 'success'
        })
        // 清除表单数据
        this.form.oldPassword = ''
        this.form.newPassword = ''
        this.form.confirmNewPassword = ''
        console.log('修改密码成功', response)
        // 关闭对话框
        this.dialogVisible = false
      }).catch(error => {
        console.error('修改密码失败', error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
