<!--
<template>
  <el-tabs>
    <el-tab-pane v-for="pane in panes"
             :label="pane.label"
             :key="pane.label"
    >
      <el-card>
        <label-item label="今日跟踪号总数" class="inline">
          {{pane.total}}
        </label-item>
        <label-item label="今日跟踪号进度" class="inline">
          已完成{{pane.succCount}}
        </label-item>
        <label-item label="今日跟踪号进度" class="inline">
          已处理{{pane.processCount}}
        </label-item>
      </el-card>
      <el-card>
        <el-table :data="pane.processes"></el-table>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    name: "day-queue",
    data() {
      return {
        panes: [
        ],
        value1:'',
        value2:'',
      }
    },
    created(){
      this.$http.get('/day-queue-panes').then(({data}) =>{
        this.panes = data;
      })
    },
    components: {
      labelItem:require('./label-item').default
    }
  }
</script>

<style scoped>
  .input-lg{
    width:200px;
  }
</style>
-->
