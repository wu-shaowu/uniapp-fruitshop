<template>
  <view>
    <hic-login
        logo="/static/images/logo/logo_white.png"
        title="登录"
        :props="props"

     
        wxProfile
        @login="handleLogin"
        @remove="remove"
        @third-login="thirdLogin"
        @wx-login="wxLogin">
        <template #user>
            <text class="cuIcon-my form-input"></text>
        </template>
        <template #pwd>
            <text class="cuIcon-unlock form-input"></text>
        </template>

    </hic-login>
  </view>
</template>

<script>
  import {login} from '../../../api/index.js'
  export default {
    data() {
           return {
               props: {account: 'loginName', password: 'password'},
        
           }
       },
       methods: {
           async handleLogin(form) {
               // 表单验证
               console.log(form)
               this.$store.dispatch("login",form)
               // const result = await login(form);
               // if (result.data.status == 1) {
               //   this.loginModel = false
               //   this.$store.commit("LOGIN", result.data)       
               //    uni.setStorage({
               //      key:"id",
               //      data:result.data.data._id,
               //      success(){
               //        console.log("成功")
               //      }
               //    })
               //    uni.getStorage({
               //      key:"id",
               //      success(res){
               //        console.log(res)
               //      }
               //    })
               //    uni.navigateTo({
               //      url:'../../navigation/navigation?show=false'
               //    })
               // } else {
               //   alert("登录失败")
               // }
           },
           remove(item, index) {
               uni.showModal({
                   title: '提示',
                   content: `确定删除账号${item.loginName}？`,
                   success: (res) => {
                       // this.history.splice(index, 1);
                   }
               });
           },
           thirdLogin(res) {
               console.log(res);   // {errMsg: "login:ok", code: "xxx"}
           },
           wxLogin(data) {
               console.log(data);  // {code: "xxx", userInfo: {nickName: 'xx', gender: '0', avatarUrl: 'http://xxx'}}
           }
       }
  }
</script>

<style lang="scss">
.form-input {
    font-size: 45rpx;
    color: $hic-login-triangle-color;
    margin: 0 10rpx;
}
.cuIcon-weixin:before {
    content: "\e612";
}
.text-green, .line-green, .lines-green {
    color: #39b54a;
}
</style>
