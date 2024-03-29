import { formatExcelDate } from '@/utils'

// 聘用形式
export const formatEmployment = (num) => {
  const transformation = {
    '1': '正式',
    '2': '非正式'
  }
  return transformation[num] ? transformation[num] : '未知'
}

// 导入的数据转换
export const mapImport = (arr) => {
  const transformation = {
    '入职日期': 'timeOfEntry',
    '手机号': 'mobile',
    '姓名': 'username',
    '转正日期': 'correctionTime',
    '工号': 'workNumber',
    '部门': 'departmentName',
    '聘用形式': 'formOfEmployment'
  }
  return arr.map(item => {
    const obj = {}
    Object.keys(item).forEach(i => {
      transformation[i] === 'timeOfEntry' || transformation[i] === 'correctionTime'
        ? obj[transformation[i]] = new Date(formatExcelDate(item[i]))
        : obj[transformation[i]] = item[i]
    })
    return obj
  })
}

// 导出的数据转换
export const mapExcel = () => {
  const transformation = {
    'id': '编号',
    'mobile': '手机号',
    'username': '姓名',
    'password': '密码',
    'timeOfEntry': '入职日期',
    'formOfEmployment': '聘用形式',
    'workNumber': '工号',
    'correctionTime': '转正日期',
    'departmentName': '部门',
    'staffPhoto': '头像地址'
  }
  return Object.values(transformation)
}

