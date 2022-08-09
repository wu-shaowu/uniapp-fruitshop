<template>
  <view>
    <view style="margin-bottom: 100upx;">
      <index v-if="PageCur == 'index'" :identity="identity"></index>
      <car v-if="PageCur == 'car'" :identity="identity"></car>
      <user v-if="PageCur == 'user'" :identity="identity"></user>
    </view>


    <view class="cu-bar tabbar bg-white shadow foot">
      <view class="action" @click="NavChange" data-cur="index" :class="PageCur == 'index'?'text-blue':'text-gray'">
        <view class="cuIcon-homefill"></view> 首页
      </view>
      <view class="action " @click="NavChange" data-cur="car" :class="PageCur == 'car'?'text-blue':'text-gray'">
        <view class="cuIcon-cart"></view> 购物车
      </view>
      <view class="action " @click="NavChange" data-cur="user" :class="PageCur == 'user'?'text-blue':'text-gray'">
        <view class="cuIcon-my"></view>
        我的
      </view>
    </view>
    <!-- 强制登录弹窗 -->
    <view class="cu-modal" :class="loginModel?'show':''">
      <view class="cu-dialog">
        <view class="cu-bar bg-white justify-end">
          <view class="content">请登录</view>
        </view>
        <view>
  <!--        <view class="login">账号<input v-model="phone" class="loginput" /></view>
          <view class="login">密码<input v-model="password" class="loginput" /></view> -->
        </view>
        <view class="padding flex flex-direction solid-bottom">
          <button class='cu-btn bg-blue margin-tb-sm lg' open-type="getUserInfo" withCredentials="true" lang="zh_CN"
            @click="loguser">
            登录
          </button>
          <button class='cu-btn bg-blue margin-tb-sm lg' open-type="getUserInfo" withCredentials="true" lang="zh_CN"
            @click="loginModel=false">
            暂不登录
          </button>
        </view>
      </view>
    </view>

    <!-- 加载中 -->
    <view class="cu-modal" :class="loading?'show':''">
      <view class="cu-dialog">
        <image class="bg-img" src="../../static/login123.gif" mode=""></image>
        <view class="cu-bar bg-white">
          <view class="action margin-0 flex-sub  solid-left">登录中...</view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import {
    login
  } from '../../api/index.js'
  export default {
    data() {
      return {
        loading: false,

        PageCur: 'index',
        OpenId: '',
        showModal: "123456",
        // 默认身份是游客[{"key":"0"},{"data":"["openid"]"}]）
        identity: [],
        loginModel: true,

        // 用户注册有关
        nickName: "",
        avatarUrl: "",
        searchInfo: {
          name: "",
          pageNo: 1,
          pageSize: 10,
        },
        phone: "",
        password: ""
      }
    },
    onShow() {
      this.shareApp();
     console.log("触发onload")
     if(this.$store.state.users.usersInfo.name){
           this.loginModel = false;}
    },
    onReachBottom() {
      this.searchInfo.pageNo++;

      this.$store.dispatch("searchGoods", this.searchInfo);
      console.log('已触底');
    },

    methods: {
      async loguser() {
        uni.navigateTo({
          url:'../user/login/login'
        })
        // const data = {
        //   phone: this.phone,
        //   password: this.password
        // }

        // const result = await login(data);
        
      },
      shareApp() {
        wx.showShareMenu({
          withShareTicket: true
        })
      },

      NavChange: function(e) {
        this.PageCur = e.currentTarget.dataset.cur
        // console.log(this.PageCur)
      },


      // 获取用户code，判断用户是否注册过

      // 用户注册

      getClientInfor() {
        let _this = this
        uni.request({
          url: 'https://www.ckcoffee.club/client/',
          method: 'GET',
          data: {
            state: "getOneClientInfor",
            openid: _this.OpenId
          },
          success: res => {
            console.log(res.data[0])
            _this.identity = ['0', {
              'userInfor': res.data[0]
            }];
            uni.setStorage({
              key: 'userinfor',
              data: _this.identity,
              success: function() {
                console.log("设置缓存成功");
                // 身份验证成功，展示主页
                _this.PageCur = "index";
              }
            });

          },
          fail: () => {},
          complete: () => {}
        });
      },
      getBrokerInfor() {
        let _this = this
        uni.request({
          url: 'https://www.ckcoffee.club/broker/',
          method: 'GET',
          data: {
            state: "getOneBrokerInfor",
            openid: _this.OpenId
          },
          success: res => {
            console.log(res.data[0]);
            _this.identity = ['1', {
              'userInfor': res.data[0]
            }];
            // 将身份详细存入缓存
            uni.setStorage({
              key: 'userinfor',
              data: _this.identity,
              success: function() {
                console.log("设置缓存成功");
                // 身份验证成功，展示主页
                _this.PageCur = "index";
              }
            });




          },
          fail: () => {},
          complete: () => {}
        });

      }

    },
    computed: {
      usersInfo() {
        return this.$store.state.users.usersInfo;
      }
    },

      
    

  }
</script>

<style>
  .login {
    display: flex;
    justify-content: space-around;
    margin: 30px;
  }

  .loginput {

    border: 1px solid black;
  }
</style>
