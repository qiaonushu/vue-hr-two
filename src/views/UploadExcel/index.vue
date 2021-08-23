<template>
  <div>
    <UpData
      :before-upload="before_upload"
      :on-success="on_success"
    />
  </div>
</template>

<script>
import UpData from '@/components/UploadExcel'

export default {
  components: {
    UpData
  },
  methods: {
    before_upload() {},
    on_success() {}
  }
}
</script>

<style>

</style>
