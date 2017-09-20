<template>
    <div>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
            <template scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="商品名称">
                        <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="店铺地址">
                        <span>{{ props.row.address }}</span>
                    </el-form-item>
                    <el-form-item label="店铺介绍">
                        <span>{{ props.row.description }}</span>
                    </el-form-item>
                    <el-form-item label="店铺 ID">
                        <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <span>{{ props.row.phone }}</span>
                    </el-form-item>
                    <el-form-item label="评分">
                        <span>{{ props.row.rating }}</span>
                    </el-form-item>
                    <el-form-item label="销售量">
                        <span>{{ props.row.recent_order_num }}</span>
                    </el-form-item>
                    <el-form-item label="分类">
                        <span>{{ props.row.category }}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>

        <el-table-column label="店铺名称" prop="name"></el-table-column>
        <el-table-column label="店铺地址" prop="address"></el-table-column>
        <el-table-column label="店铺介绍" prop="description"></el-table-column>


        <el-table-column label="操作">
            <template scope="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" @click="addFood(scope.$index, scope.row)">添加商品</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>

    </el-table>

<el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="shopsCount">
        </el-pagination>

      <el-dialog title="修改店铺信息" :visible.sync="editShow">
        <el-form label-width="100px">
          <el-form-item label="店铺名称">
            <el-input v-model="newForm.name"></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="newForm.address"></el-input>
          </el-form-item>
          <el-form-item label="店铺介绍">
            <el-input v-model="newForm.description"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="newForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类">
            <el-cascader
              :options="options"
              v-model="category"
              change-on-select
            ></el-cascader>
          </el-form-item>
          <el-form-item label="商铺图片">
            <el-upload
              class="avatar-uploader"
              action="http://cangdu.org:8001/v1/addimg/shop"
              :show-file-list="false"
              :on-success="handleShopAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="newForm.image_path" :src="'http://cangdu.org:8001/img/'+newForm.image_path" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editShow = false">取 消</el-button>
          <el-button type="primary" @click="changeShop">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>

import { getCity, getShopList, getShops, delShop, getCategoryLists, changeShop } from '@/api/getData'

import {wan,p} from '@/function/fn'
export default {
    name: 'Home',
    components:{
    },
    data() {
        return {
            tableData: [  /*商家列表信息*/
//                {
//                    name:'111',
//                    address:'222',
//                    description:'333',
//                    id:'index',
//                    phone:'123123123',
//                    recent_order_num:'5件',
//                    rating:'5',
//                    category:'分类'
//                }
            ],
            coordinate:{},  /*经纬度*/
            shopsCount:0,   /*商家数量*/
            currentPage: 1,
            offset: 0,
            limit: 20,
            editShow: false,
            newForm: {
                id: '',
                name: '',
                address: '',
                description: '',
                phone: '',
                image_path: '',
                category: '',
            },//编辑中的商店信息
            category: '',
            options: [],//商品口味分类
        }
    },
    methods: {
        //初始化数据
      async initData() {
        const resb = await getCategoryLists();
        resb.shift();
        resb.forEach(item => {
          if (item.sub_categories) {
            let addNew = {
              value: item.name,
              label: item.name,
              children: [],
            };
            item.sub_categories.forEach((child,index) => {
              if (index != 0) {
                addNew.children.push({
                  value: child.name,
                  label: child.name,
                })
              }
            });
            this.options.push(addNew);
          }
        });
      },
      handleShopAvatarSuccess() {
        if (res.status == 1) {
          this.newForm.image_path = res.image_path;
        } else {
          this.$message.error('上传图片失败')
        }
      },
      beforeAvatarUpload() {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
        handleEdit(index, row) {  /*编辑商家*/
            this.editShow = true;
            this.newForm.id = row.id;
            this.newForm.name = row.name;
            this.newForm.address = row.address;
            this.newForm.description = row.description;
            this.newForm.phone = row.phone;
            this.newForm.image_path = row.image_path;
            this.category = row.category.split('/');
        },
        handleDelete(index, row) {   /*删除*/
            this.$message({
                showClose: true,
                message: '您没有权限删除数据',
                type: 'error'
            });
        },
        addFood(index, row) {  /*添加商品*/
            this.$store.commit('addFood',row.id);
            this.$router.push('/addFood')
        },
        handleSizeChange(val) {

        },
        handleCurrentChange(val) { /*页偏移量*/
            this.currentPage = val;
            this.offset = (val - 1)*this.limit;
            this.getShops()
        },
        async getShops(){ /*根据经纬度 跟偏移量获取商家列表信息*/
            getShopList(this.coordinate.latitude,this.coordinate.longitude,this.offset,this.limit).then(v => {//用户列表
                this.tableData = [];
                v.forEach(item=>{
                    let info = {};
                    info.name=item.name;
                    info.address=item.address;
                    info.description=item.description;
                    info.id=item.id;
                    info.phone=item.phone;
                    info.recent_order_num=item.recent_order_num;
                    info.rating=item.rating;
                    info.category=item.category;
                    info.image_path = item.image_path;
                    this.tableData.push(info);
                })
            })
        },
        //确认更改商铺信息
        async changeShop() {
            this.newForm.category = this.category;
            const res = await changeShop(this.newForm);
            if (res.status == 1) {
              this.$message({
                type: 'info',
                message: '更改成功'
              });
              this.editShow = false;
              this.tableData = [];
              this.getShops();
            } else{
                this.$message({
                  type: 'error',
                  message: res.message
                })
            }
        }
    },
    mounted(){
        this.getShops();
        this.initData();
        getCity(1).then(v => {   /*根据id获取城市经纬度*/
            this.coordinate = {latitude:v.latitude,longitude:v.longitude}

        });
        getShops().then(v => {  /*获取商铺列表*/
            this.shopsCount = v.count;
        })

    }
}
</script>

<style>
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.el-pagination{
    margin: 10px 0 10px 10px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.el-table .info-row {
  background: #c9e5f5;
}
</style>
