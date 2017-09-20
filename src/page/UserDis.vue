<template>
    <div>
        <dis :disData='disData'></dis>
    </div>
</template>


<script>
import Dis from '@/components/Dis'
import { getUserDis } from '@/api/getData'
import {wan,p} from '@/function/fn'
export default {
    name: 'Home',
    components:{
        Dis
    },
    data() {
        return {
            disData:{}
        }
    },
    mounted(){
        this.initData();
    },
    methods:{
        async initData(){
            try{
                const res = await getUserDis();
                if (res.status == 1) {
                    this.disData = res.user_city;
                }else{
                    throw new Error(res)
                }
            }catch(err){
                console.log('获取用户分布信息失败',err);
            }
        },
    },
    created() {

    }

}
</script>

<style scoped>

</style>
