<template>
  <el-form ref="deptForm" :rules="rules" label-width="120px">
    <el-form-item label="部门名称">
      <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门编码">
      <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门负责人">
      <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
        <el-option v-for="item in list" :key="item.id" :label="item.username" :value="item.username" />
      </el-select>
    </el-form-item>
    <el-form-item label="部门介绍">
      <el-input v-model="form.introduce" style="width:80%" type="textarea" :rows="3" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click="hSubmit">确定{{ set?'编辑':'添加' }} </el-button>
      <el-button size="small" @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { GetSimpleAPI, PostDepartmentAPI, PutDepartmentAPI, GetDepartmentDetailsAPI } from '@/api'
export default {
  props: {
    // 父级部门id
    id: {
      type: String,
      required: true
    },
    set: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      list: [],
      rules: {
        name: [
          { required: true, trigger: 'blur', message: '' },
          {}],
        code: [],
        manager: [],
        introduce: []
      }
    }
  },
  watch: {
    id() {
      this.GetDepartmentDetails()
    }
  },
  created() {
    this.GetSimple()
    this.GetDepartmentDetails()
  },
  methods: {
    // 点击确定的事件
    async hSubmit() {
      this.set ? this.PutDepartment() : this.PostDepartment()
      this.$emit('success', true)
    },
    // 点击关闭的事件
    close() {
      this.$emit('success', false)
    },
    // 增加部门
    async PostDepartment() {
      try {
        await PostDepartmentAPI({
          code: this.form.code,
          introduce: this.form.introduce,
          manager: this.form.manager,
          name: this.form.name,
          pid: this.id })
        this.$message('添加成功')
      } catch (err) {
        this.$message('添加失败')
      }
    },
    // 修改部门
    async PutDepartment() {
      try {
        await PutDepartmentAPI(this.form)
        this.$message('修改成功')
      } catch (err) {
        this.$message('修改成功')
      }
    },
    // 获取员工列表
    async GetSimple() {
      const { data: res } = await GetSimpleAPI()
      this.list = res
    },
    // 获取部门详情
    async GetDepartmentDetails() {
      if (this.set) {
        const { data: form } = await GetDepartmentDetailsAPI(this.id)
        this.form = form
      }
    }
  }
}
</script>

<style>

</style>
