<template>
  <div class="user-info">
    <!-- 个人信息 -->
    <el-form ref="userForm" label-width="220px" :model="user" :rules="rules">
      <!--手机 -->
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="user.mobile" style="width:220px" />
      </el-form-item>
      <!-- 工号 入职时间 -->
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="user.timeOfEntry"
          type="date"
          class="inputW"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <!-- 员工照片 -->
      <el-form-item label="员工头像">
        <!-- 放置上传图片 -->
        <img :src="user.staffPhoto">
      </el-form-item>

      <!-- 保存个人信息 -->
      <el-form-item>
        <el-button type="primary" @click="putSysUser">保存更新</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { GetUserAPI, PutSysUserAPI } from '@/api'

export default {
  data() {
    return {
      user: {},
      rules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ]
      }

    }
  },
  created() {
    this.getUser()
  },
  methods: {
    async getUser() {
      const { data: res } = await GetUserAPI(this.$route.query.id)
      this.user = res
    }, // 保存员工基本信息
    async putSysUser() {
      this.$refs.userForm.validate(async value => {
        if (value) {
          try {
            await PutSysUserAPI(this.user)
            this.$message('修改成功')
          } catch (err) {
            console.error(err)
            this.$message('修改失败')
          }
        } else {
          this.$message('请填写信息')
        }
      })
    }

  }
}
</script>
