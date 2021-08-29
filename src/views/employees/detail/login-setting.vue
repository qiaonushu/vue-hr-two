<template>
  <el-form
    ref="userForm"
    label-width="120px"
    style="margin-left: 120px; margin-top: 30px"
    :model="user"
  >
    <el-form-item label="姓名:">
      <el-input v-model="user.username" style="width:300px" />
    </el-form-item>
    <el-form-item label="密码:">
      <el-input v-model="user.password" type="password" style="width:300px" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="$store.dispatch('user/putSysUser',user)">更新</el-button>
      <el-button @click="$router.back()">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { GetUserAPI, PutSysUserAPI } from '@/api'

export default {
  data() {
    return {
      user: {}
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
    async putSysUser() {
      try {
        await PutSysUserAPI(this.user)
        this.$message('修改成功')
      } catch (err) {
        console.error(err)
        this.$message('修改失败')
      }
    }
  }

}
</script>

