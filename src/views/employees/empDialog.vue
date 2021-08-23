<template>
  <!-- 表单 -->
  <el-form ref="form" :rules="rules" :model="formData" label-width="120px">
    <el-form-item label="姓名" prop="username">
      <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="入职时间" prop="timeOfEntry">
      <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
    </el-form-item>
    <el-form-item label="聘用形式" prop="formOfEmployment">
      <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
        <el-option value="1" label="正式" />
        <el-option value="2" label="非正式" />
        <!-- v-for="item in hireType"
          :key="item.id"
          :label="item.value"
          :value="item.id" -->

      </el-select>
    </el-form-item>
    <el-form-item label="工号" prop="workNumber">
      <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
    </el-form-item>
    <el-form-item label="部门" prop="departmentName" readonly>
      <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="show_tree" />
      <div v-show="showTree">
        <el-tree
          :data="list"
          :props="{label: 'name'}"
          @node-click="depName"
        />
      </div>
    </el-form-item>
    <el-form-item label="转正时间">
      <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
    </el-form-item>
    <el-form-item>
      <el-button @click.native="addemp(false)">取消</el-button>
      <el-button type="primary" @click.native="addemp(true)">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { GetDepartmentAPI, PostSysUserAPI } from '@/api'
import { fn } from '@/utils/tree'

export default {
  data() {
    return {
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ]
      },
      list: [],
      showTree: false
    }
  },
  methods: {
    async show_tree() {
      const { data: res } = await GetDepartmentAPI()
      res.depts.shift()
      this.list = fn(res.depts)
      this.showTree = true
    },
    depName(e) {
      this.formData.departmentName = e.name
      this.showTree = false
    },
    async PostSysUser() {
      console.log(this.formData)
      await PostSysUserAPI(this.formData)
    },
    addemp(state) {
      if (state) this.PostSysUser()
      setTimeout(() => {
        this.$emit('setemp')
      })
    }
  }
}
</script>

<style>

</style>
