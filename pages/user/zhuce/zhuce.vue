<template>
  <view style="background-color: pink; width: 100vw;height: 100vh;">
    <view
      style="display:flex;flex-direction: column; height: 40vh; width: 100vw;background-color: #eee; margin-top:20vh;align-items: center;">
      <view style="color: #eee; background-color: blue ;width: 60px;margin-bottom: 10px;text-align: center;height: 30px;line-height: 30px;">注册</view>
      <view style="background-color: #eee;">
        <view style="display: flex; margin-bottom:10px;">
          <text>账号</text><input v-model="phone" style="color: #000;border: 1px solid #000;" />
        </view>
        <view style="display: flex;">
          <text>密码</text><input v-model="password" style="color: #000;border: 1px solid #000;margin-bottom: 20px;" />
        </view>
        <view
          style="color: #eee; background-color: blue ;width: 100px;margin-bottom: 10px;text-align: center;margin: auto;height: 30px;line-height: 30px;margin-bottom: 30px;" @click="returnIndex">
          返回</view>
        <view
          style="color: #eee; background-color: blue ;width: 100px;margin-bottom: 10px;text-align: center;margin: auto;height: 30px;line-height: 30px;" @click="zhuce">
          确定注册</view>
      </view>

    </view>
  </view>

</template>

<script>
  import {
    register
  } from '../../../api/index.js'
  export default {
    data() {
      return {
        data: {
          phone: '',
          password: '',
        },

      }
    },
    methods: {
      async zhuce(form) {
        const data = {phone:this.phone,
        password:this.password}
        const result = await register(data)
        console.log(result)
        if(result.data.status==1){
          uni.navigateTo({url:'../../../pages/navigation/navigation'})
        }
      },
      returnIndex(){
       uni.navigateTo({url:'../../../pages/navigation/navigation'})
      }
    }
  }
</script>

<style lang="scss">

</style>
