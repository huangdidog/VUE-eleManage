<template>
    <div>
        <header class="adminInfoTitle"><h2>管理员信息</h2></header>
        <ul class="adminInfo">
            <li class="adminName">姓名：<span>马金苗</span></li>
            <li class="adminReTime">注册时间：<span>2018-58-69</span></li>
            <li class="adminPer">管理员权限：<span>没有</span></li>
            <li class="adminId">管理员id：<span>123</span></li>
            <li class="adminImg">
                <p>更换头像：</p>
                    <el-upload
                    class="avatar-uploader upImg"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
            </li>
        </ul>
    </div>
</template>


<script>

import { getUserDis } from '@/api/getData'

export default {
    name: 'AdminSetUp',
    components:{

    },
    data() {
        return {
            imageUrl:''
        }
    },
    mounted(){

    },
    watch:{

    },
    methods:{
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
    created() {

    }

}
</script>

<style>
.adminInfoTitle{
    height: 30px;
    margin: 20px 0;
    text-align: center;
}
.adminInfoTitle h2{
    font:24px/30px "微软雅黑";
    color:#333;
}
.adminInfo{
    width: 60%;
    margin:0 auto;
    height: 450px;
    font: 16px/20px "微软雅黑";
    color:#666;
    border-radius: 10px;
    background: #e4ecfb;
}
.adminInfo>li{
    height: 20px;
    padding:20px;
}
.adminInfo>li>span{
    margin-left: 10px;
}
.adminInfo .upImg{
    margin-top: 10px;
}


.avatar-uploader .el-upload {
    border: 1px dashed #000;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #0392fc;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 118px;
    height: 118px;
    line-height: 118px;
    text-align: center;
}
.avatar {
    width: 118px;
    height: 118px;
    display: block;
}
  li{
    list-style: none;
  }
</style>
