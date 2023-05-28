<template>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="姓名" prop="stuname">
      <el-input v-model="ruleForm.stuname"></el-input>
    </el-form-item>
    <el-form-item label="学号" prop="stunumber">
      <el-input v-model="ruleForm.stunumber"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input v-model="ruleForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="ruleForm.gender">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="专业" prop="major">
        <el-select v-model="ruleForm.major" placeholder="请选择专业">
        <el-option label="软件工程学院" value="软件工程学院"></el-option>
        <el-option label="人工智能学院" value="人工智能学院"></el-option>
        <el-option label="微电子技术学院" value="微电子技术学院"></el-option>
        <el-option label="测绘与遥感学院" value="测绘与遥感学院"></el-option>
        <el-option label="土木工程学院" value="土木工程学院"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="自我陈述" prop="selfintro">
      <el-input type="textarea" v-model="ruleForm.selfintro" :rows="8"></el-input>
    </el-form-item>
    <el-form-item>
      <el-upload
        class="upload-button"
          :action="uploadAction"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          :show-file-list="false"
          :auto-upload="false">
            <el-button type="primary" class="group-button">附件上传</el-button>
      </el-upload>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
    <!-- <el-dialog :visible.sync="dialogVisible2" title="提示" width="30%">
      <div v-if="applicationSubmitted">申请书已递交</div>
      <div v-else>文件上传成功</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="dialogVisible2 = false">关闭</el-button>
      </span>
    </el-dialog> -->
</el-form>
</template>

  <script>
    import { postform } from "@/api/group.js";
    export default {
      data() {
        return {
          ruleForm: {
            groupname: '',
            stuname: '',
            stunumber: '',
            phone: '',
            gender: '',
            major: '',
            selfintro: '',
          },
          // dialogVisible2: false,
          // applicationSubmitted: false,
          // uploadAction: 'your_upload_endpoint', // 替换为你的后端文件上传接口
          rules: {
            stuname: [
              { required: true, message: '请输入你的名字', trigger: 'blur' },
            ],
            stunumber: [
              { required: true, message: '请输入你的学号', trigger: 'change' },
              { min: 8, max: 8, message: '学号长度必须为8位', trigger: 'blur' }
            ],
            phone: [
              { required: true, message: '请输入你的手机号码', trigger: 'change' },
              { pattern: /^1[0-9]{10}$/, message: '请输入有效的手机号码', trigger: 'blur' }
            ],
            gender: [
              { required: true, message: '请选择性别', trigger: 'change' }
            ],
            major: [
              { required: true, message: '请选择你的专业', trigger: 'change' }
            ],
            selfintro: [
              { required: true, message: '请填写自我陈述', trigger: 'blur' }
            ]
          }
        };
      },
      mounted() {
        this.ruleForm.groupname = this.$route.params.groupname;
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.showSuccessMessage();
              postform(this.ruleForm).then(response => {
                console.log(response.data);
                this.$router.push({ name: 'Dashboard' });
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
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        showSuccessMessage() {
          this.$message({
          message: '申请表提交成功!',
          type: 'success',
        });
        },
        applyJoin(group) {
          // 执行你的申请逻辑，例如发送申请请求给后端
          // 在这个示例中，我们假设申请成功后会触发文件上传
          // 调用文件上传组件的上传方法
          this.$refs.upload.submit();
        },
        handleUploadSuccess(response) {
          // 处理文件上传成功的响应
        this.applicationSubmitted = false; // 文件上传成功后将标志位设置为 false，表示文件上传成功
        this.dialogVisible = true; // 显示提示信息的对话框
        },
        handleUploadError() {
          // 处理文件上传失败的情况
        this.applicationSubmitted = true; // 文件上传失败后将标志位设置为 true，表示申请书已递交
        this.dialogVisible = true; // 显示提示信息的对话框
        }        
      }
    }
  </script>

