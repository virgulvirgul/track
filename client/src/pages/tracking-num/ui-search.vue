<template>
    <div class="track-search">
        <el-card type="card" class="container">
            <div class="pannel-header">
                <!--追踪号-->
                <span>跟踪号:</span>
                <el-input class="input-wuliu" placeholder="请选择/输入..." v-model="search_data.track"></el-input>
                <!--物流商-->
                <label-item label="物流商" class="inline">
                    <el-select  placeholder="全部" v-model="search_data.channel">
                        <el-option
                                v-for="channel in channels"
                                :key="channel.node"
                                :label="channel.channel"
                                :value="channel.node">
                        </el-option>
                    </el-select>
                </label-item>

                <!--运输方式-->
                <!--<span>运输方式:</span>-->
                <label-item label="运输方式" class="inline">
                    <el-select placeholder="全部" v-model="search_data.transport">
                        <el-option
                                v-for="transpot in transports"
                                :key="transpot.value"
                                :label="transpot.label"
                                :value="transpot.value">
                        </el-option>
                    </el-select>
                </label-item>

                <!--上网状态-->
                <span class="span">上网状态:</span>
                <label-item label="" class="input">
                    <el-select v-model="search_data.online">
                        <el-option
                                v-for="online in onlines"
                                :key="online.value"
                                :label="online.label"
                                :value="online.value">
                        </el-option>
                    </el-select>
                </label-item>

                <!--妥投状态-->
                <span class="span">妥投状态:</span>
                <label-item label="" class="input" >
                    <el-select  placeholder="全部" v-model="search_data.vot">
                        <el-option
                                v-for="vote in votes"
                                :key="vote.value"
                                :label="vote.label"
                                :value="vote.value">
                        </el-option>
                    </el-select>
                </label-item>

                <!--搜索按钮-->
                <el-button type="primary" class="search-btn" @click="$emit('search')">搜索</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                channels:[],
                transports:[],
                onlines:[],
                votes:[],
            }
        },
        created(){
            this.$http.get('/transports').then(res=>{
                // console.log(res);
                this.transports =res.data;
            })
            this.$http.get('/channels').then(res=>{
                this.channels =[{channel:'全部',node:''},...res.data];
//                console.log(res.data)
            })
            this.$http.get('/online-status').then(res=>{
//                console.log('status:',res);
                this.onlines = res.data;

            })
            this.$http.get('/vote-status').then(res=>{
                this.votes =res.data;
//                console.log(res.data)
            })

        },
        components:{
            labelItem:require('../../components/label-item.vue').default,
        },
        methods:{
            lookUp(row) {
                this.lookDialog = true;
                this.addEditform = row;
            },
            update() {
                this.lookDialog = false;
            },
            handleEdit(row) {
                this.lookDialog = true;
                this.addEditform = row;
            },
        },
        props:{
            search_data:''
        },

    }
</script>
<style lang="stylus">
  *{
    font-size:13px;
  }
  .track-search{
    .input-wuliu {
      display: inline-block;
      width: 200px;
    }
    .update-excel {
      cursor: pointer;
      opacity: 0;
      position: absolute;
      width: 100%;
    }
    .inline{
      margin-left:10px;
    }
    .input{
      display:inline-block;
      width:100px;
    }
    .search-btn{
      margin-left:20px;
    }
    .span{
      margin-left:10px;
    }
  }


</style>
