<template>
  <div class="user-info">
    <!-- 个人信息 -->
    <el-form label-width="220px" :model="user">
      <!--手机 -->
      <el-form-item label="手机">
        <el-input v-model="user.mobile" style="width:220px" />
      </el-form-item>
      <!-- 工号 入职时间 -->
      <el-form-item label="入职时间">
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
        <el-button type="primary" @click="getUser">保存更新</el-button>
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
    }, // 保存员工基本信息
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
