<template>
  <el-form
    ref="userForm"
    label-width="120px"
    style="margin-left: 120px; margin-top: 30px"
    :model="user"
    :rules="rules"
  >
    <el-form-item label="姓名:" prop="username">
      <el-input v-model="user.username" style="width:300px" />
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input v-model="user.password" type="password" style="width:300px" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="putSysUser">更新</el-button>
      <el-button @click="$router.back()">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { GetUserAPI, PutSysUserAPI } from '@/api'

export default {
  data() {
    return {
      user: {},
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', triggler: 'blur' }]
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
    },
    // 保存员工基本信息
    putSysUser() {
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

