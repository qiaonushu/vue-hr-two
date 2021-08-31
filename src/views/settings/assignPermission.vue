<template>
  <div>
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A" />
      <el-checkbox label="复选框 B" />
      <el-checkbox label="复选框 C" />
    </el-checkbox-group>
  </div>
</template>

<script>
import { GetSysPermissionAPI } from '@/api'

export default {
  data() {
    return {
      checkList: []
    }
  },
  created() {
    this.getSysPermission()
  },
  methods: {
    // 获取全部权限接口
    async getSysPermission() {
      const { data: res } = await GetSysPermissionAPI()
      console.log(res)
      // const arr = res.map(item => {
      //   item.name = item.name.trim()
      //   return item
      // })
    }
  }
}
</script>

<style>

</style>
