<template>
    <div>
    <el-table :data="tableData" style="width: 100%" @expand="showLists">
        <el-table-column type="expand">
            <template scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="食品名称">
                        <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="餐馆名称">
                        <span>{{ props.row.restaurant_name }}</span>
                    </el-form-item>
                    <el-form-item label="食品 ID">
                        <span>{{ props.row.item_id }}</span>
                    </el-form-item>
                    <el-form-item label="餐馆 ID">
                        <span>{{ props.row.restaurant_id }}</span>
                    </el-form-item>
                    <el-form-item label="食品介绍">
                        <span>{{ props.row.description }}</span>
                    </el-form-item>
                    <el-form-item label="餐馆地址">
                        <span>{{ props.row.restaurant_address }}</span>
                    </el-form-item>
                    <el-form-item label="食品评分">
                        <span>{{ props.row.rating }}</span>
                    </el-form-item>
                    <el-form-item label="食品分类">
                        <span>{{ props.row.category_name }}</span>
                    </el-form-item>
                    <el-form-item label="月销量">
                        <span>{{ props.row.month_sales }}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>

        <el-table-column label="食品名称" prop="name"></el-table-column>
        <el-table-column label="食品介绍" prop="description"></el-table-column>
        <el-table-column label="评分" prop="rating"></el-table-column>


        <el-table-column label="操作">
            <template scope="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
          :total="foodsCount">
        </el-pagination>




      <el-dialog title="修改食品信息" :visible.sync="editShow">
        <el-form label-width="100px">
          <el-form-item label="食品名称">
            <el-input v-model="newFood.name"></el-input>
          </el-form-item>
          <el-form-item label="食品介绍">
            <el-input v-model="newFood.description"></el-input>
          </el-form-item>
          <el-form-item label="食品分类">
            <el-select
              style="width: 100%"
              v-model="newFood.category_name">
              <el-option
                v-for="item in categoryList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食品图片">
            <el-upload
              class="avatar-uploader"
              action="http://cangdu.org:8001/v1/addimg/shop"
              :show-file-list="false"
              :on-success="handleShopAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="newFood.image_path" :src="'http://cangdu.org:8001/img/'+newFood.image_path" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-table
          :data="newFood.specs"
          style="mmargin-bottom: 20px;"
          align="cneter"
        >
          <el-table-column
            prop="specs"
            label="规格">
          </el-table-column>
          <el-table-column
            prop="packing_fee"
            label="包装费">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button
                size="small"
                type="danger"
                @click="guiGeDelete(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row style="text-align: center;margin-top: 20px">
          <el-button type="primary" style="margin-bottom: 10px;" @click="dialogFormVisible = true">添加规格</el-button>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editShow = false">取 消</el-button>
          <el-button type="primary" @click="changeFood">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加规格" :visible.sync="dialogFormVisible">
        <el-form :rules="specsrules" :model="newSpecs">
          <el-form-item label="规格" label-width="100px" prop="newspecs">
            <el-input v-model="newSpecs.newspecs"></el-input>
          </el-form-item>
          <el-form-item label="包装费" label-width="100px">
            <el-input-number v-model="newSpecs.newpacking_fee" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="价格"  label-width="100px">
            <el-input-number v-model="newSpecs.newprice" :min="0" :max="10000"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addNewSpecs">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>

import { getFoods, getFoodsCount, getFoodMsg, getFoodShop, changeFood, getCategory } from '@/api/getData'

import {wan,p} from '@/function/fn'
export default {
    name: 'Home',
    components:{
    },
    data() {
        return {
            tableData: [  /*商家列表信息*/
//                {
//                    name:'食品名称',
//                    restaurant_name:'餐馆名称',
//                    item_id:'食品id',
//                    restaurant_id:'餐馆id',
//                    description:'食品介绍',
//                    restaurant_address:'餐馆地址',
//                    rating:'食品评分',
//                    category_name:'食品分类',
//                    month_sales:'月销量'
//                }
            ],
            coordinate:{},  /*经纬度*/
            foodsCount:0,   /*商家数量*/
            currentPage: 1,
            offset: 0,
            limit: 20,

          categorySelect: '',
          categoryList: [],
          newFood: {
            category_id: '',
            category_name: '',
            description: '',
            image_path: '',
            index: '',
            item_id: '',
            month_sales: '',
            name: '',
            new_category_id: '',
            rating: '',
            restaurant_address: '',
            restaurant_id: '',
            restaurant_name: '',

            specfoods: [],
            specs: []
          },

          editShow: false,
          dialogFormVisible: false,

          specsrules: {
            newspecs: [
              { required: true, message: '请输入食品名称', trigger: 'blur' },
            ],
          },

          newSpecs: {
            newspecs: '',
            newpacking_fee: 0,
            newprice: 20,
          },//新添加的食品规格

          formID: ''
        }
    },
    methods: {
        //展开食品
        showLists(row,expanded) {
          this.getFormMsg(row);
        },
        //获取食品所在店铺，店铺所在低点//展开会编辑的时候 调用
        async getFormMsg(row){
          const index = row.index;



          const resb = await getFoodMsg(row.category_id);
          this.tableData[index].category_name = resb.name;

          this.newFood.category_name = row.category_name;
          try {
            const resa = await getFoodShop(row.restaurant_id);
            this.tableData[index].restaurant_name = resa.name;
            this.tableData[index].restaurant_address = resa.address;
          } catch (err){
            console.log('不属于任何店铺')
          }
        },
        handleEdit(index, row) {  /*编辑商家*/
          this.getFormMsg(row);

          this.editShow = true;
          this.formID = row.restaurant_id;
          this.init();


          this.newFood.restaurant_name = row.restaurant_name;
          this.newFood.restaurant_address = row.restaurant_address;
          this.newFood.new_category_id = row.category_id;
          this.newFood.rating = row.rating;
          this.newFood.index = row.index;
          this.newFood.month_sales = row.month_sales;
          this.newFood.item_id = row.item_id;
          this.newFood.name = row.name;
          this.newFood.description = row.description;
          this.newFood.image_path = row.image_path;
          this.newFood.restaurant_id = row.restaurant_id;
          this.newFood.category_id = row.category_id;
          this.newFood.specs = [];


          row.specfoods.forEach((item,index) => {
            this.newFood.specs.push({
              specs: item.specs_name,
              packing_fee: item.packing_fee,
              price: item.price
            })
          });
        },
        //删除 已添加的规格
        guiGeDelete(index) {
          this.newFood.specs.splice(index, 1);
        },
        //删除食品
        handleDelete(index, row) {   /*删除*/
            this.$message({
                showClose: true,
                message: '您没有权限删除数据',
                type: 'error'
            });
        },
        handleSizeChange(val) {

        },
        handleCurrentChange(val) { /*页偏移量*/
            this.currentPage = val;
            this.offset = (val - 1)*this.limit;
            this.getFoods()
        },
        async getFoods(){ /*根据经纬度 跟偏移量获取商家列表信息*/
            getFoods('undefined',this.offset,this.limit).then(v => {//用户列表
                this.tableData = [];
                v.forEach((item,index)=>{
                    let info = {};
                    info.name = item.name;
                    info.item_id = item.item_id;
                    info.description = item.description;
                    info.rating = item.rating;
                    info.month_sales = item.month_sales;
                    info.restaurant_id = item.restaurant_id;//1
                    info.category_id = item.category_id;//1
                    info.image_path = item.image_path;
                    info.specfoods = item.specfoods;
                    info.specs = [];
                    info.index = index;
                    info.restaurant_name = '';
                    info.restaurant_address = '';
                    info.category_name = '';
                    this.tableData.push(info);
                })
            })
        },
      //修改食品信息
      async changeFood() {
        this.editShow = false;
        const res = await changeFood(this.newFood);
        if (res.status == 1) {
            this.$message({
              type: 'info',
              message: '修改成功'
            })
            this.getFoods();
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      },
      //添加新规格
      addNewSpecs() {
        this.dialogFormVisible = false;
        this.newFood.specs.push({
          specs: this.newSpecs.newspecs,
          packing_fee: this.newSpecs.newpacking_fee,
          price: this.newSpecs.newprice
        })
      },
      //初始化获取食品种类
      async init() {
        const res = await getCategory(this.formID);
        if (res.status == 1) {
          res.category_list.map((item, index) => {
            item.value = index;
            item.label = item.name;
          })
          this.categoryList = res.category_list;
        }
      },
      //上传食品图片
      handleShopAvatarSuccess() {
        if (res.status == 1) {
          this.newFood.image_path = res.image_path;
        } else {
          this.$message.error('上传图片失败')
        }
      },
      //上传之前
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
      }
    },
    mounted(){
        this.getFoods();
        getFoodsCount().then(v => {  /*获取商铺列表*/
            this.foodsCount = v.count;
        });
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
