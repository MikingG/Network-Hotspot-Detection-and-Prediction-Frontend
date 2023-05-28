<template>
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
</el-form>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { modifypassword } from "@/api/user.js";
    export default {
        name: 'Dashboard',
        computed: {
        ...mapGetters([
        'name'
        ])},
      data() {
        const validatePass = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码长度不能少于6位'))
            } 
            else {
                callback()
            }
        }
        const validatePass2 = (rule, value, callback) => {
             if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
          ruleForm: {
            pass: '',
            checkPass: '',
          },
          rules: {
            pass: [
              { required: true, validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { required: true, validator: validatePass2, trigger: 'blur' }
            ],
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.showSuccessMessage();
               modifypassword(this.name,this.ruleForm.pass).then(response => {
                console.log(response.data);
                this.logout();
                }) 
                .catch(error => {
                console.error(error);
                });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        showSuccessMessage() {
          this.$message({
          message: '密码修改成功,请重新登录',
          type: 'success',
          });
        },
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>