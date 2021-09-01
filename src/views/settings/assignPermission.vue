<template>
  <div>
    <el-tree
      ref="tree"
      :data="list"
      :props="{ label: 'name' }"
      node-key="id"
      default-expand-all
      show-checkbox
      check-strictly
      check-on-click-node
      :expand-on-click-node="false"
    />
    <div style="weight:100%;text-align:right;margin:30px 20px 5px;">
      <el-button type="primary" size="medium" @click="addPer">确认</el-button>
      <el-button size="medium" @click="$emit('close')">取消</el-button>
    </div>
  </div>
</template>

<script>
import { GetSysPermissionAPI, PutRoleAssignPremAPI, GetRoleAPI } from '@/api'
import { fn } from '@/utils/tree'

export default {
  props: {
    isid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getRole()
    this.getSysPermission()
  },
  methods: {
    // 获取全部权限接口
    async getSysPermission() {
      const { data: res } = await GetSysPermissionAPI()
      this.list = fn(res)
    },
    async getRole() {
      const { data: res } = await GetRoleAPI(this.isid)
      this.$refs.tree.setCheckedKeys(res.permIds)
    },
    async putRoleAss() {
      const permIds	= this.$refs.tree.getCheckedKeys()
      if (permIds) {
        try {
          await PutRoleAssignPremAPI({
            id: this.isid,
            permIds
          })
          this.$message({
            type: 'success',
            message: '分配权限成功!'
          })
        } catch (err) {
          console.error(err)
          this.$message({
            type: 'error',
            message: '分配权限失败'
          })
        }
      }
    },
    addPer() {
      this.putRoleAss()
      this.$emit('close')
    }
  }
}
</script>

