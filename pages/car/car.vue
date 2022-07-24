<template>
  <view>
    <cu-custom :isBack="true" bgColor="bg-white">
      <block slot="backText">返回</block>
      <block slot="content" style="font-size: 16px;font-weight: 800;">购物车</block>
    </cu-custom>

    <view class="flex bg-white justify-between">
      <view class="padding-left-sm">
        <image src="../../static/logo-1.png" mode="" style="width: 130upx;height: 40upx;"></image>
      </view>
      <view class="padding-right-sm">删除</view>
    </view>

    <view class="car-body bg-white">
      <view class="flex solid-bottom"  style="padding: 30upx 0;" v-for="(item,index) in usersCars" :key="index">
        <view class="text-center padding-sm" style="font-size: 18px;margin-top: 30upx;">
          <image src="../../static/car/weixuanzhong.png" mode="" style="height: 30upx;width: 30upx;"></image>
        </view>
        <view class="">
          <image class="shoping-img" :src="item.images" mode="aspectFill" ></image>
        </view>
        <view class="" style="padding-left: 30upx;">
          <view class="" @click="gotoShopInfor">
            <view class="shaoping-title">
              {{item.name}}
            </view>
            <view class="text-gray" style="font-size: 10px;">
              醉酒一号，一口甜在心！
            </view>
            <view class="flex" style="margin-top: 10upx;">
              <!-- <text class="cu-tag bg-yellow light sm padding-xs">满减</text> -->
              <image src="../../static/index/manjian.png" mode="" style="width: 70upx;height: 30upx;"></image>
              <text class="" style="font-size: 10px;margin-left: 30upx;color: rgb(255,146,99);">满188立减20</text>
            </view>
          </view>

          <view class="flex justify-between">
            <view class="">
              <text class="text-red" style="font-weight: 500;font-size: 14px;color: rbg(238,54,85);">￥{{item.price}}</text>
              <text class="text-gray padding-left-sm" style="text-decoration:line-through">￥32.9</text>
            </view>
            <view class="StepAdder">
              <image src="../../static/car/jian.png" mode="" style="width: 40upx;height: 40upx;margin-top: 10upx;" @click="reduce(item)">
              </image>
              <text style="margin: 0 20upx;font-size: 14px;height: 40upx;font-size: 40upx;font-weight: 400;">{{item.number}}</text>
              <image src="../../static/car/jia.png" mode="" style="width: 40upx;height: 40upx;" @click="item.number++"></image>
              <view class="delete" @click="deletecar(item._id)">删除</view>
            </view>
          </view>
        </view>
      </view>

    </view>


    <view class="foot-list bg-white">
      <view class="flex justify-between" style="height: 90upx;margin: auto;">
        <view class="flex" style="padding:25upx 30upx">
          <view>
            <image src="../../static/car/xuanzhong.png" mode="" style="height: 40upx;width: 40upx;"></image>
          </view>
          <text class="text-center" style="padding-left: 10upx;">全选</text>
        </view>
        <view class="flex">
          <view class="text-right margin-right-sm" style="padding: 5upx 0;">
            <view class="">
              合计：<text class="text-red" style="font-size: 14px;font-weight: 600;">￥205.90</text>
            </view>
            <view class="">
              <text class="text-gray">已优惠：￥5</text>
            </view>
          </view>
          <view class="" @click="gotoOrder">
            <image src="../../static/car/gotomoney.png" mode="" style="height: 90upx;width: 200upx;"></image>
          </view>
        </view>
      </view>
    </view>



  </view>
</template>

<script>
  import {deleteCars} from '@/api/index.js'
  export default {
    data() {
      return {
        radio: ''
      }
    },
    created() {
      this.$store.dispatch("getCars");
    },
    methods: {
      gotoOrder() {
        uni.navigateTo({
          url: '../car/order'
        })
      },
      gotoShopInfor() {
        console.log(123)
        uni.navigateTo({
          url: '../index/shopping-infor'
        })
      },
      reduce(item){
        if(item.number>1){
          item.number--;
        }
      },
     async deletecar(id){
        const data = {_id:id};
        const result = await deleteCars(data);
        console.log(result);
      }
    },
    computed:{
         usersCars() {
            return this.$store.state.cars.usersCars;
          }
    }
  }
</script>

<style>
  .car-body {
    border-radius: 30upx;
    margin: 30upx 10upx;

  }

  .shaoping-title {
    width: 450upx;
    font-size: 30rpx;
    font-weight: 900;
    color: #333333;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .shoping-img {
    width: 150upx;
    height: 150upx;
  }

  .foot-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 100upx;
    border-radius: 30upx;
    margin: 0 10upx;
  }
  .StepAdder{
   position: absolute;
   top: 70rpx;
   right:30rpx;
   
  }
  .delete {
    position: absolute;
    bottom: -70upx;
    right: 2upx;
  }
</style>
