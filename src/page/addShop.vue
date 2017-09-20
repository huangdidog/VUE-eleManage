<template>
  <div>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="4">
        <el-form :model="formData" :rules="rules" label-width="100px" ref="form">

          <el-form-item label="店铺名称" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>

          <el-form-item label="详细地址" prop="address">
            <el-autocomplete
              v-model="formData.address"
              :fetch-suggestions="querySearchAsync"
              @select="handleSelect"
              style="width: 100%"
              :trigger-on-focus="false"
              placeholder="请输入地址"
            ></el-autocomplete>
            <span>当前城市: {{city.name}}</span>
          </el-form-item>

          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="formData.phone"></el-input>
          </el-form-item>

          <el-form-item label="店铺简介" prop="description">
            <el-input v-model="formData.description"></el-input>
          </el-form-item>

          <el-form-item label="店铺标语" prop="promotion_info">
            <el-input v-model="formData.promotion_info"></el-input>
          </el-form-item>

          <el-form-item label="店铺分类">
            <el-cascader
              :options="options"
              v-model="formData.category"
              change-on-select
            ></el-cascader>
          </el-form-item>

          <el-form-item label="店铺特点" style="white-space: nowrap">
            <span>品牌保证</span>
            <el-switch
              v-model="formData.is_premium"
              on-text=""
              off-text="">
            </el-switch>
            <span>蜂鸟专送</span>
            <el-switch
              v-model="formData.delivery_mode"
              on-text=""
              off-text="">
            </el-switch>
            <span>新开店铺</span>
            <el-switch
              v-model="formData.new"
              on-text=""
              off-text="">
            </el-switch>
            <br>
            <span>外卖保</span>
            <el-switch
              v-model="formData.bao"
              on-text=""
              off-text="">
            </el-switch>
            <span>准时达</span>
            <el-switch
              v-model="formData.zhun"
              on-text=""
              off-text="">
            </el-switch>
            <span>开发票</span>
            <el-switch
              v-model="formData.piao"
              on-text=""
              off-text="">
            </el-switch>
          </el-form-item>

          <el-form-item label="配送费">
            <el-input-number v-model="formData.float_delivery_fee" :min="0" :max="20"></el-input-number>
          </el-form-item>

          <el-form-item label="起送价">
            <el-input-number v-model="formData.float_minimum_order_amount" :min="0" :max="100"></el-input-number>
          </el-form-item>

          <el-form-item label="营业时间">
            <el-time-select
              v-model="formData.startTime"
              :picker-options="{
                start: '05:30',
                step: '00:15',
                end: '23:30'
              }"
              placeholder="启始时间">
            </el-time-select>

            <el-time-select
              v-model="formData.endTime"
              :picker-options="{
                start: '05:30',
                step: '00:15',
                end: '23:30'
              }"
              placeholder="结束时间">
            </el-time-select>
          </el-form-item>

          <el-form-item label="上传店铺头像">
            <el-upload
              class="avatar-uploader"
              action="http://cangdu.org:8001/v1/addimg/shop"
              :show-file-list="false"
              :on-success="handleShopAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="formData.image_path" :src="'http://cangdu.org:8001/img/'+formData.image_path" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="上传营业执照">
            <el-upload
              class="avatar-uploader"
              action="http://cangdu.org:8001/v1/addimg/shop"
              :show-file-list="false"
              :on-success="handleBusinessAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="formData.business_license_image" :src="'http://cangdu.org:8001/img/'+formData.business_license_image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="上传餐饮服务许可证">
            <el-upload
              class="avatar-uploader"
              action="http://cangdu.org:8001/v1/addimg/shop"
              :show-file-list="false"
              :on-success="handleServiceAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="formData.catering_service_license_image" :src="'http://cangdu.org:8001/img/'+formData.catering_service_license_image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="优惠活动">
            <el-select v-model="activityValue" @change="selectActivity" :placeholder="activityValue">
              <el-option
                v-for="item in activitiesOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-table
              :data="formData.activities"
              style="min-width: 600px;margin-bottom: 20px;"
              align="cneter"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                prop="icon_name"
                label="活动标题"
                width="120">
              </el-table-column>
              <el-table-column
                prop="name"
                label="活动名称"
                width="120">
              </el-table-column>
              <el-table-column
                prop="description"
                label="活动详情">
              </el-table-column>
              <el-table-column
                label="操作"
                width="120">
                <template scope="scope">
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>

          <el-form-item style="text-align: center;margin-bottom: 100px">
            <el-button type="primary" @click="submitForm">立即创建</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getGuessCity, getCategoryLists, getCitySearchLists, addNewShop } from '@/api/getData'
  export default {
    name: 'addShop',
    data() {
      return {
        formData: {
          name: '',//店铺名字
          address: '',//店铺地址
          phone: '',//店铺电话
          float_delivery_fee: 5,//配送费
          float_minimum_order_amount: 20,//起送价
          category: ['快餐便当', '简餐'],//店铺分类
          latitude: '',//纬度
          longitude: '',//经度
          image_path: '',//店铺图片地址

          description: '',//店铺简介
          promotion_info: '',//店铺标语
          is_premium: true,//品牌商铺,默认false
          delivery_mode: true,//支持蜂鸟专送，默认false
          new: true,//新开店铺，默认false
          bao: true,//支持保险，默认false
          zhun: true,//准时达，默认false
          piao: true,//开发票，默认false
          startTime: '',//开始营业时间
          endTime: '',//停止营业时间
          business_license_image: '',//营业执照图片地址
          catering_service_license_image: '',//餐饮服务许可证图片地址
          activities: [{
            icon_name: '减',
            name: '满减优惠',
            description: '满30减5，满60减8',
          }],//商铺活动：示例：[{icon_name:'新', name:'新用户立减', description: ''}]
        },
        rules: {
          name: [
            { required: true, message: '请输入店铺名称' }
          ],
          address: [
            { required: true, message: '请输入详细地址' }
          ],
          phone: [
            { required: true, message: '请输入联系电话' }
          ],
        },
        city: {},//定位城市
        options: [],//商品口味分类
        activitiesOptions: [{
          value: '满减优惠',
          label: '满减优惠'
        }, {
          value: '优惠大酬宾',
          label: '优惠大酬宾'
        }, {
          value: '新用户立减',
          label: '新用户立减'
        }, {
          value: '进店领券',
          label: '进店领券'
        }],
        activityValue: '满减优惠',//要添加的优惠政策
      }
    },
    methods: {
        //初始化数据
      async initData() {
        const resa = await getGuessCity(); //获取定位城市
        this.city = resa;

        const resb = await getCategoryLists();//获取所有商铺分类列表
        resb.shift();//因为 获取到的信息的 数组的第一个 是所有都包含 所以去掉
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
      //选择位置后，记录 东西径
      handleSelect(address) {
          this.formData.latitude = address.latitude;
          this.formData.longitude = address.longitude;
      },
      //搜索 弹出框
      async querySearchAsync(queryString, cb) {
        const res = await getCitySearchLists(this.city.id, queryString);

        if (res instanceof Array) {
          res.map(item => {
            item.value = item.address;
            return item;
          });
          cb(res)
        }
      },
      //上传 店铺图片
      handleShopAvatarSuccess(res, file) {
        if (res.status == 1) {
          this.formData.image_path = res.image_path;
        } else {
          this.$message.error('上传图片失败')
        }
      },
      //上传营业执照
      handleBusinessAvatarSuccess(res, file) {
        if (res.status == 1) {
          this.formData.business_license_image = res.image_path;
        } else {
          this.$message.error('上传图片失败')
        }
      },
      //上传许可证
      handleServiceAvatarSuccess(res, file) {
        if (res.status == 1) {
          this.formData.catering_service_license_image = res.image_path;
        } else {
            this.$message.error('上传图片失败')
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
      //添加各种优惠
      selectActivity() {
        this.$prompt('请输入活动详情', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if (value == null) {
            this.$message({
              type: 'success',
              message: '请输入活动详情'
            });
          } else {
            let newObj = {};
            switch (this.activityValue) {
              case '满减优惠':
                  newObj = {
                    icon_name: '减',
                    name: '满减优惠',
                    description: value,
                  };
                break;
              case '优惠大酬宾':
                newObj = {
                  icon_name: '特',
                  name: '优惠大酬宾',
                  description: value,
                };
                break;
              case '新用户立减':
                newObj = {
                  icon_name: '新',
                  name: '新用户立减',
                  description: value,
                };
                break;
              case '进店领券':
                newObj = {
                  icon_name: '领',
                  name: '进店领券',
                  description: value,
                };
                break;
            }
            this.formData.activities.push(newObj);
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      //设置列表隔行颜色
      tableRowClassName(row,index) {
        if (index%2 === 1) {
          return 'info-row';
        }
        return '';
      },
      //设置列表 删除
      handleDelete(index) {
        this.formData.activities.splice(index, 1);
      },
      //最终提交表单
      submitForm(){
        this.$refs.form.validate(async (value) => {
          this.formData.category.join('/');
          const aaa = await addNewShop(this.formData);
          const res = await aaa.json();
          if(res.status == 1) {
            this.$message({
              type: 'info',
              message: '添加商铺成功',
            });
            this.$router.push('/ShopList');
          }
        })

      }
    },
    mounted() {
      this.initData();
    }
  }
</script>

<style>
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
