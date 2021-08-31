<template>
  <div style="padding:0 20px;">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id" class="checkbox"> {{ item.name }} </el-checkbox>
    </el-checkbox-group>
    <div style="weight:100%;text-align:right;margin:30px 0 5px;">
      <el-button type="primary" size="medium" @click="putUserAssignRoles">确认</el-button>
      <el-button size="medium" @click="$emit('close')">取消</el-button>
    </div>
  </div>
</template>

<script>
import { GetSysRoleAPI, GetUserAPI, PutUserAssignRolesAPI } from '@/api'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      roleIds: [],
      list: []
    }
  },
  watch: {
    id(newval) {
      this.roleIds = []
      this.getUser(newval)
    }
  },
  created() {
    // 获取所有角色列表
    this.getSysRole()
    // 获取员工列表
    this.getUser(this.id)
  },
  methods: {
    // 获取所有角色列表接口
    async getSysRole() {
      const { data: res } = await GetSysRoleAPI()
      this.list = res.rows
    },
    // 获取员工列表接口
    async getUser(id) {
      const { data: res } = await GetUserAPI(id)
      this.roleIds = res.roleIds
    },
    // 给员工分配角色接口
    async putUserAssignRoles() {
      try {
        await PutUserAssignRolesAPI({ id: this.id, roleIds: this.roleIds })
        this.$emit('close')
        this.$message({
          type: 'success',
          message: '给用户分配角色成功'
        })
      } catch (err) {
        this.$message({
          type: 'error',
          message: '给用户分配角色失败'
        })
      }
    }
  }
}
</script>

<style >
.checkbox {
    margin-bottom: 30px;
}
</style>
