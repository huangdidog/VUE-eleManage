<template>
  <div>
    <el-row style="margin-top: 20px">
      <el-col :span="14" :offset="4">
        <header class="form_header">选择食品种类</header>
        <el-form label-width="110px" class="form">
          <el-row class="categorySelect">
            <el-form-item label="食品种类">
              <el-select
                style="width: 100%"
                v-model="categorySelect"
                placeholder="请选择">
                <el-option
                  v-for="item in this.categoryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row class="add_category_row" :class="showAddCategory? 'showEdit': ''">
            <div class="addCategory">
              <el-form-item label="食品种类">
                <el-input v-model="newCategory.name"></el-input>
              </el-form-item>
              <el-form-item label="种类描述">
                <el-input v-model="newCategory.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addNewCategory">提交</el-button>
              </el-form-item>
            </div>
          </el-row>
          <div class="addCategoryButton" @click="addCategoryFun">
            <i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
            <i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
            <span>添加食品种类</span>
          </div>
        </el-form>
        <header class="form_header">添加食品</header>
        <el-form label-width="110px" class="form" :rules="foodrules" :model="foodData" ref="foodData">
          <el-row class="categorySelect">
            <el-form-item label="食品名称" prop="name">
              <el-input v-model="foodData.name"></el-input>
            </el-form-item>
            <el-form-item label="食品活动">
              <el-input v-model="foodData.activity"></el-input>
            </el-form-item>
            <el-form-item label="食品详情">
              <el-input v-model="foodData.description"></el-input>
            </el-form-item>
            <el-form-item label="上传食品图片">
              <el-upload
                class="avatar-uploader"
                action="http://cangdu.org:8001/v1/addimg/food"
                :show-file-list="false"
                :on-success="handleFoodSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="foodData.image_path" :src="'http://cangdu.org:8001/img/'+foodData.image_path" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="食品特点">
              <el-select v-model="foodData.attributes" multiple placeholder="请选择">
                <el-option
                  v-for="item in attributes"
                  :key="item.value"
                  :label="item.label"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="食品规格">
              <template>
                <el-radio class="radio" v-model="radio" label="1">单规格</el-radio>
                <el-radio class="radio" v-model="radio" label="2">多规格</el-radio>
              </template>
            </el-form-item>
            <el-row v-if="radio == 1">
              <el-form-item label="包装费">
                <el-input-number v-model="foodData.specs[0].packing_fee" :min="0" :max="100"></el-input-number>
              </el-form-item>
              <el-form-item label="价格">
                <el-input-number v-model="foodData.specs[0].price" :min="0" :max="10000"></el-input-number>
              </el-form-item>
            </el-row>
            <el-row v-else style="text-align: center;margin-bottom: 20px">
              <el-button type="primary" style="margin-bottom: 10px;" @click="dialogFormVisible = true">添加规格</el-button>
              <el-table
                :data="foodData.specs"
                style="mmargin-bottom: 20px;"
                align="cneter"
                :row-class-name="tableRowClassName"
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
                      @click="handleDelete(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row style="text-align: center">
              <el-button type="primary" style="margin-bottom: 10px;" @click="addFood">确认添加食品</el-button>
            </el-row>
          </el-row>
        </el-form>
        <el-dialog title="添加规格" :visible.sync="dialogFormVisible">
          <el-form :rules="specsrules" :model="newSpecs" ref="newSpecs">
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
      </el-col>
    </el-row>
    <el-dialog
      title="提示"
      :visible.sync="hadFormID"
      size="tiny"
      v-if="hadFormID">
      <span>添加食品需要选择一个商铺，先去就去选择商铺吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="hadFormID = false">取 消</el-button>
    <el-button type="primary" @click="gotoShopList">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { addNewFood, getCategory, addCategory } from '@/api/getData'
  export default {
    name: 'addFood',
    data() {
      return {
        hadFormID: false,//是否选择了商铺
        showAddCategory: false,//下拉箭头是否显示
        categoryList: [],//食品种类列表
        categorySelect: '',//选择的那个食品种类的index
        newCategory: {
          name: '',
          description: '',
        },//新创建食品种类数据
        foodData: {
          image_path: '',//图片  1
          attributes: [],//食品特点   1
          specs: [{
            specs: '默认',
            packing_fee: 0,
            price: 20,
          }],//食品规格   1
          category_id: '',//选择的食品种类ID    1
          restaurant_id: '',//店铺ID   1
          name: '',//食品名字    1
          description: '',//食品描述  1
          activity: '',//活动  1
        },//要创建的食品对象
        attributes: [{
          value: '新',
          label: '新品'
        }, {
          value: '招牌',
          label: '招牌'
        },],//食品特点数据，仅供选择
        radio: '1',//食品规格选择
        dialogFormVisible: false,//添加规格的弹出框是否显示
        newSpecs: {
          newspecs: '',
          newpacking_fee: 0,
          newprice: 20,
        },//新添加的食品规格
        foodrules: {
          name: [
            { required: true, message: '请输入食品名称', trigger: 'blur' },
          ],
        },
        specsrules: {
          newspecs: [
            { required: true, message: '请输入食品名称', trigger: 'blur' },
          ],
        },
      }
    },
    computed: {
      ...mapState(['formID']),//餐馆ID
    },
    methods: {
      gotoShopList() {
        this.hadFormID = false;
        this.$router.push('/ShopList');
      },
      //下拉菜单是否显示
      addCategoryFun() {
        this.showAddCategory = !this.showAddCategory
      },
      //添加新食品种类
      async addNewCategory() {
        Object.assign(this.newCategory, {restaurant_id: this.formID});
        const res = await addCategory(this.newCategory);
        try {
          if (res.status == 1) {
            this.$message({
              type: 'info',
              message: '添加成功'
            });
            this.newCategory = {
              name: '',
              description: '',
            };
            this.init();
            this.showAddCategory = false;
          }
        } catch (e) {

        }
      },
      //上传 食品图片
      handleFoodSuccess(res, file) {
        try {
          if (res.status == 1) {
            this.foodData.image_path = res.image_path;
          } else {
            this.$message.error('上传图片失败')
          }
        } catch (e){

        }
      },
      //限制上传照片大小等（上传成功前）
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
      },
      //规格列表删除
      handleDelete() {
        this.foodData.specs.splice(index, 1);
      },
      //设置列表隔行颜色
      tableRowClassName(row,index) {
        if (index%2 === 1) {
          return 'info-row';
        }
        return '';
      },
      //添加新规格
      addNewSpecs() {
        if (!this.newSpecs.newspecs) {
            this.$message({
              type: 'error',
              message: '请输入规格'
            })
          return
        }
        this.dialogFormVisible = false;
        this.foodData.specs.push({
          specs: this.newSpecs.newspecs,
          packing_fee: this.newSpecs.newpacking_fee,
          price: this.newSpecs.newprice
        });
        this.newSpecs = {
          newspecs: '',
          newpacking_fee: 0,
          newprice: 20,
        }
      },
      //最终添加食品了
      async addFood() {
        const res = await addNewFood(this.foodData);
        try {
          if (res.status == 1) {
            this.$message({
              type: 'info',
              message: '食品添加成功'
            })
            this.$router.push('/FoodList')
          } else {
            this.$message({
              type: 'error',
              message: res.message,
            })
          }
        } catch (e){

        }
      },
      //初始化获取食品种类
      async init() {
        const res = await getCategory(this.formID);
        try {
          if (res.status == 1) {
            res.category_list.map((item, index) => {
              item.value = index;
              item.label = item.name;
            })
            this.categoryList = res.category_list;
          }
        } catch (e){

        }
      }
    },
    mounted() {
      this.init();
      this.foodData.restaurant_id = this.formID;
    },
    watch: {
      categorySelect(newValue) {
        this.foodData.category_id = this.categoryList[newValue].id;
      },
    },

    created(){
      if (!this.formID) {
          this.hadFormID = true;
      }
    },
  }
</script>

<style>
  .form{
    min-width: 400px;
    margin-bottom: 30px;
  }
  .form:hover{
     box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
     border-radius: 6px;
     transition: all 400ms;
   }
  .form_header{
    text-align: center;
    margin-bottom: 10px;
  }
  .categorySelect {
    border: 1px solid #eaeefb;
    padding: 10px 30px 10px 10px;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }
  .addCategory {
    background: #f9fafc;
    padding: 10px 30px 1px 10px;
    border-left: 1px solid #eaeefb;
    border-right: 1px solid #eaeefb;
  }
  .addCategoryButton {
    text-align: center;
    border: 1px solid #eaeefb;
    padding: 10px 30px 10px 10px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    color: #8f9199;
    font-size: 14px;
  }
  .addCategoryButton:hover {
    color: #20a0ff;
    background: #f9fafc;
  }
  .add_category_row{
    height: 0;
    overflow: hidden;
    transition: all 400ms;
    background: #f9fafc;
  }
  .showEdit {
    height: 185px;
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


  .el-table .info-row {
    background: #c9e5f5;
  }
  .cell {
    text-align: center;
  }
</style>
