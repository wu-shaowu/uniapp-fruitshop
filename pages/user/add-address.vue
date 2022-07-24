<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 16px;font-weight: 800;">我的收货地址</block>
		</cu-custom>
		<form action="">
			<view class="cu-form-group" @click="getAddress">
				<view class="flex" style="width: 100%;">
					<view class="" style="width: 200upx;">
						收货地址：
					</view>
					<view class="flex justify-between" style="width: 100%;">
						<input placeholder="点击选择" name="input" disabled="true"></input>
						<view class="text-center" style="line-height: 50upx;">
							<text class="cuIcon-right"></text>
						</view>
					</view>
				</view>
				
			</view>
			<view class="cu-form-group">
				<view class="title">门牌号：</view>
				<input placeholder="详细地址,例如:8栋2单元101" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系人：</view>
				<input placeholder="请补充收货人姓名" name="input"></input>
			</view>
			<view class="cu-form-group flex">
				<view class="text-center flex" style="margin-left: 150upx;">
					<view class="flex" @tap="checkSex" data-sex="nan">
						<view class="">
							<image :src="Sex == 'nan'?'../../static/car/xuanzhong.png':'../../static/car/weixuanzhong.png' " mode="" style="width: 35upx;height: 35upx;"></image>
						</view>
						<text style="margin-left: 15upx;">先生</text>
					</view>
					
					<view class="flex" style="margin-left: 100upx;" @tap="checkSex" data-sex="nv">
						<view class="">
							<image :src="Sex == 'nv'?'../../static/car/xuanzhong.png':'../../static/car/weixuanzhong.png' " mode="" style="width: 35upx;height: 35upx;"></image>
						</view>
						<text style="margin-left: 15upx;">女士</text>
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号：</view>
				<input placeholder="统一标题的宽度" name="" type="number"></input>
			</view>
			<view class="cu-form-group flex">
				<view class="flex">
					<view class="title">
						标签：
					</view>
					<view class=" flex" style="margin-right: 200upx;">
						<text class="cu-tag xl  padding-df margin-right-sm" :class="sizeCheckId == index + 1?'bg-yellow text-white':''" @click="sizeCheck" v-for="(item, index) in sizeCheckList" :key="index" :data-id="item.id">{{item.name}}</text>
					</view>
				</view>
			</view>
		</form>
		
		<view class="padding flex flex-direction" @click="addAddress">
			<image src="../../static/user/save-address.png" mode="" style="width: 100%;height: 80upx;"></image>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sexChoice:true,
				
				Sex:"nan",
				
				sizeCheckList:[
					{"id":1, "name":'家'},
					{"id":2, "name":'公司'},
					{"id":3, "name":'学校'}
				],
				sizeCheckId:"",
				
			}
		},
		methods: {
			SwitchSex(){
				console.log(this.sexChoice)
			},
			getAddress(){
				uni.chooseLocation({
				    success: function (res) {
				        console.log('位置名称：' + res.name);
				        console.log('详细地址：' + res.address);
				        console.log('纬度：' + res.latitude);
				        console.log('经度：' + res.longitude);
				    }
				});
			},
			checkSex(e){
				this.Sex = e.currentTarget.dataset.sex
			},
			sizeCheck(e){
				let id = e.currentTarget.dataset.id;
				this.sizeCheckId = id;
				
			},
			
		}
	}
</script>

<style>
page{
	background-color: white;
}
	
.title{
	width: 150upx;
}
</style>
