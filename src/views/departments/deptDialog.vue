<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="部门名称" prop="name">
      <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门编码" prop="code">
      <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门负责人" prop="manager">
      <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
        <el-option v-for="item in list" :key="item.id" :label="item.username" :value="item.username" />
      </el-select>
    </el-form-item>
    <el-form-item label="部门介绍" prop="introduce">
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
    id: {
      type: String,
      required: true
    },
    set: {
      type: Boolean,
      required: true
    },
    comList: {
      type: Array,
      required: true
    }
  },
  data() {
    const validate_name = (rule, value, callback) => {
      const pid = this.id ? this.comList.filter(item => item.id === this.id)[0].pid : ''
      const arr = this.comList.filter(item => item.id !== this.id).filter(item => item.pid === pid).some(item => item.name === value)
      const newarr = this.comList.filter(item => item.pid === this.id).some(item => item.name === value)
      this.set ? (arr ? callback(new Error('部门名称重复')) : callback()) : (newarr ? callback(new Error('部门名称重复')) : callback())
    }
    const validate_code = (rule, value, callback) => {
      const newarr = this.comList.some(item => item.code === value)
      const arr = this.comList.filter(item => item.id !== this.id).some(item => item.code === value)
      this.set ? (arr ? callback(new Error('编码名称重复')) : callback()) : (newarr ? callback(new Error('编码名称重复')) : callback())
    }
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
          { required: true, trigger: 'blur', message: '请输入部门名称' },
          { min: 1, max: 50, trigger: 'blur', message: '部门名称为1~50个字符' },
          { validator: validate_name, trigger: 'blur' }
        ],
        code: [
          { required: true, trigger: 'blur', message: '请输入部门编码' },
          { validator: validate_code, trigger: 'blur' }
        ],
        manager: [{ required: true, trigger: 'change', message: '请输入部门负责人' }],
        introduce: [
          { required: true, trigger: 'blur', message: '请输入部门介绍' },
          { min: 1, max: 500, trigger: 'blur', message: '部门介绍为1~300个字符' }
        ]
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
    hSubmit() {
      this.$refs.form.validate(callback => {
        if (callback) {
          this.set ? this.PutDepartment() : this.PostDepartment()
          this.$emit('success', true)
        } else {
          this.$message('请输入正确内容')
        }
      })
      // this.set ? this.PutDepartment() : this.PostDepartment()
      // this.$emit('success', true)
    },
    // 点击关闭的事件
    close() {
      this.$refs.form.resetFields()
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
      try {
        const { data: res } = await GetSimpleAPI()
        this.list = res
      } catch (err) {
        console.error(err)
      }
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
