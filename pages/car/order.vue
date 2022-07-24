<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 16px;font-weight: 800;">填写订单</block>
		</cu-custom>
		
		
		<view class="order-body bg-white">
			<view class="text-black" style="font-size: 16px;font-weight: 600;padding: 20upx 0 0 20upx;">配送方式</view>
			
			<view class="padding grid col-2"> 
				<view class="text-center" style="" @click="userThemselves">
					<image :src="SendShopMethod == 'ziti'?'../../static/car/yuyu-liang.png':'../../static/car/yuyu-hui.png' " mode="" style="width: 250upx;height: 100upx;"></image>
				</view>
				
				<view class="text-center" style="" @click="shopDistribution">
					<view class="">
						<image :src="SendShopMethod == 'peisong'?'../../static/car/biaoju-liang.png':'../../static/car/biaoju-hui.png' " mode="" style="width: 250upx;height: 100upx;"></image>
					</view>
					
					<!-- 次日达  没设置好 -->
<!-- 					<view class="car-cirida">
						<image class="" src="../../static/car/cirida.png" mode="" style="width: 110upx;height: 45upx;"></image>
					</view> -->
				</view>
			
			</view>
			
			<view class="text-center" style="padding-bottom: 30upx;">
				<text class="text-red">自提注意事项：营业时间10:00一22:00</text>
			</view>
			
			<!-- 自提选择 -->
			<view class="" v-if="SendShopMethod == 'ziti'">
				<view class="flex justify-between padding solid">
					<view class="">
						选择自提日期
					</view>
					<view class="flex">
						<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
							<view class="picker">
								{{date}}
							</view>
						</picker>
						<picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange" style="margin-left: 30upx;">
							<view class="picker">
								{{time}}
							</view>
						</picker>
					</view>
					
				</view>
			</view>
			
			<!-- 镖局配送选择 -->
			
			<!-- 客户无地址 -->
			<view class="padding" v-if="SendShopMethod == 'peisong'">
				<view @click="getUserHomeLocation">
					<view class="padding-left-sm ">
						<text class="cuIcon-locationfill text-gray" style="font-size: 14px;"></text><text style="margin-left: 10upx;color: #666666;">点击去选择地址</text>
					</view>
				</view>
			</view>
			
			<!-- 客户有地址 -->
			<view class="padding" v-if="SendShopMethod == 'peisong'">
				<view class="flex justify-between" @click="getUserHomeLocation">
					<view class="">
						<view class="padding-left-sm">
							<image src="../../static/car/home.png" mode="" style="width: 60upx;height: 30upx;"></image>
							<image src="../../static/car/moren.png" mode="" style="width: 60upx;height: 30upx;margin-left: 10upx;"></image>
							<text class="margin-left-sm" style="font-weight: 600;font-size: 14px;">毛毛福</text>
							<text class="margin-left-xs" style="font-weight: 600;font-size: 14px;">13971884962</text>
						</view>
						<view class="padding-left-sm">
							<text class="cuIcon-locationfill text-blue" style="font-size: 14px;"></text><text style="margin-left: 10upx;">湖北省黄石市下陆区湖北理工学院</text>
						</view>
					</view>
					<view class=" text-center">
						<text class="cuIcon-right"></text>
					</view>
				</view>
			</view><strong></strong>
		</view>
		
		<!-- 商品存放 -->
		<view class="order-body bg-white margin-top" style="padding: 1upx 0 20upx 0;">
			<view class="flex solid-bottom margin-top padding-left-sm" v-for="(item, index) in 3" :key="index" @click="gotoShopInfor">
				<view class="">
					<image class="shoping-img" src="../../static/index/shopping.png" mode="aspectFill"></image>
				</view>
				<view class="" style="padding-left: 30upx;">
					<view class="shaoping-title">
						我以为天理，何必了？你觉得我应该怎么办，我要杀戮！
					</view>
					<view class="text-gray" style="font-size: 10px;">
						醉酒一号，一口甜在心！
					</view>
					<view class="flex" style="margin-top: 10upx;">
						<image src="../../static/index/manjian.png" mode="" style="width: 70upx;height: 30upx;"></image>
						<text class="" style="font-size: 10px;margin-left: 30upx;color: rgb(255,146,99);">满188立减20</text>
					</view>
					<view class="text-gray text-sm flex justify-between">
						<view class="">
							<text class="text-red" style="font-weight: 500;font-size: 14px;color: rbg(238,54,85);">￥19.9</text>
							<text class="text-gray padding-left-sm" style="text-decoration:line-through">￥32.9</text>
						</view>
						<view class="" style="font-size: 12px;">
							<text class="cuIcon-close">1</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 订单备注 -->
		<view class="order-body bg-white flex" style="padding: 30upx 20upx;">
			<view class="text-black" style="font-size: 16px;font-weight: 600;">订单备注</view>
			<input placeholder="如剥皮、餐具等" name="input" style="margin-left: 20upx;"></input>
		</view>
		
		<!-- 镖局地址 -->
		<view class="order-body bg-white" style="padding-bottom: 20upx;">
			<view class="padding-sm text-black" style="font-size: 16px;font-weight: 600;">日鲜镖局地址</view>
			<view class="text-gray padding-left-sm" >
				<text class="cuIcon-locationfill text-blue" style="font-size: 16px;"></text><text style="font-size: 14px;">湖北省黄石市下陆区湖北理工学院</text>
			</view>
			
			<map style="width: 97%; height: 200px;margin: 10upx;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
		</view>
		
		
		<view class="order-body bg-white">
			<view class="flex justify-between">
				<view class="">
					
				</view>
				<view class="flex">
					<view class="text-right margin-right-sm">
						<view class="">
							合计：<text class="text-red" style="font-size: 14px;font-weight: 600;">￥205.90</text>
						</view>
						<view class="">
							<text class="text-gray">已优惠：￥5</text>
						</view>
					</view>
					<view @click="gotoGetMoney">
						<image src="../../static/car/submit-order.png" mode="" style="height: 90upx;width: 200upx;"></image>
					</view>
				</view>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				radio:'',
				
				date:"请选择",
				time:"请选择",
				
				SendShopMethod:"peisong",
				
				
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39740,
					title:'日鲜镖局',
					iconPath: '../../static/location.png',
					width:'40px',
					height: '41px'
				}]
			}
		},
		methods: {
			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			userThemselves(){
				this.SendShopMethod = "ziti"
			},
			shopDistribution(){
				this.SendShopMethod = "peisong"
			},
			getUserHomeLocation(){
				uni.navigateTo({
					url:'../user/my-address'
				})
			},
			gotoGetMoney(){
				uni.navigateTo({
					url:'../car/pay-result'
				})
			}
			
			
		}
	}
</script>

<style>
	
.order-body{
	border-radius:20upx;
	margin: 30upx 10upx;
	
}
	
.shaoping-title{
		width: 530upx;
		font-size: 30rpx;
		font-weight: 900;
		color: #333333;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	
.shoping-img{
	width: 150upx;
	height: 150upx;
}
.foot-list{
	position: absolute;
	left: 0;
	right: 0;
	bottom: 10upx;
}
.order-text{
	margin: 0 30upx;
	border-radius: 5px;
	background: #fff;
	padding: 5upx; 
}
/* .car-cirida{
	position: absolute;
	top: 0;
	left: 0;
} */
</style>
