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
        <view class="padding-xl">
          登录会获取您的头像和用户名
        </view>
        <view class="padding flex flex-direction solid-bottom">
          <button class='cu-btn bg-blue margin-tb-sm lg' open-type="getUserInfo" withCredentials="true" lang="zh_CN"
            @getuserinfo="userRegister" :disabled="loginGoTo">
            授权并登录
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
  export default {
    data() {
      return {
        loading: false,

        PageCur: 'index',
        OpenId: '',
        showModal: "123456",
        // 默认身份是游客[{"key":"0"},{"data":"["openid"]"}]）
        identity: [],
        loginModel: false,

        // 用户注册有关
        nickName: "",
        avatarUrl: "",
        searchInfo: {
          name: "",
          pageNo: 1,
          pageSize: 10,
        },

      }
    },
    onShow() {
      this.shareApp();
      // console.log("123");
    },
    onReachBottom(){
      this.searchInfo.pageNo++;
           
      this.$store.dispatch("searchGoods", this.searchInfo);
    		console.log('已触底');
        },
   
    methods: {
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
      login() {
        let _this = this;

        //1.wx获取登录用户code
        uni.login({
          provider: 'weixin',
          success: function(loginRes) {
            let code = loginRes.code;

            //2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
            uni.request({
              url: 'https://www.ckcoffee.club/login/',
              data: {
                code: code,
              },
              method: 'GET',
              success: (res) => {
                // console.log(res.data);

                if (res.data.state == 1001) {
                  console.log("未注册的用户！")
                  // 未注册的用户，强制用户注册
                  _this.loginModel = true;
                  _this.OpenId = res.data.openid;

                }
                if (res.data.state == 1002) {
                  console.log("游客用户")
                  _this.OpenId = res.data.openid
                  _this.getClientInfor()

                }
                if (res.data.state == 1003) {
                  console.log("经纪人用户")
                  _this.OpenId = res.data.openid
                  _this.getBrokerInfor()

                }
                _this.loading = false;

                // 身份验证成功之后再开始渲染index页面。之后给index页面传递参数

              },
              fail(res) {
                // 第一次发送失败，再来一次！
                _this.login();
              }
            });
          },
        });
      },
      // 用户注册
      userRegister() {
        let _this = this;
        uni.getUserInfo({
          provider: 'weixin',
          success: function(infoRes) {
            _this.nickName = infoRes.userInfo.nickName; //昵称
            _this.avatarUrl = infoRes.userInfo.avatarUrl; //头像

            // 用户首次注册
            uni.request({
              url: 'https://www.ckcoffee.club/client/',
              data: {
                openid: _this.OpenId,
                username: _this.nickName,
                head_img: _this.avatarUrl
              },
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              success: (res) => {
                // console.log(res.data)
                _this.OpenId = res.data.openid
                _this.getClientInfor()

                _this.loginModel = false


              },
              fail() {
                console.log("出错了！")
              }
            });
            _this.loading = false;

          },
          fail(res) {
            console.log(res)
          }
        });
      },
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
    onLoad() {
      // wx.checkSession({
      // 	success: function(){
      // 		//session_key 未过期，并且在本生命周期一直有效
      // 		console.log("未过期")
      // 	},
      // 	fail: function(){
      // 		// session_key 已经失效，需要重新执行登录流程
      // 		console.log("已经过期") 
      // 		// wx.login() //重新登录
      // 	}
      // });
      // // 登陆
      // let _this = this
      // 
      // // setTimeout(function() {
      // // 	_this.login();
      // // }, 3000);
      // 
      // _this.login();

    }
  }
</script>

<style>

</style>
