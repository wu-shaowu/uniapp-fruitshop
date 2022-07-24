<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 16px;font-weight: 800;">全部订单</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav solid-top">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in nav_list" :key="index" @tap="tabSelect" :data-id="index">
					{{item.title}}({{4-index}})
				</view>
			</view>
		</scroll-view>
		
		<!-- 存放订单信息 -->
		<view class="">
			<!-- 商品存放 -->
			
			<!-- 已完成 -->
			<view class="order-body bg-white">
				<view class="flex  padding-left-sm" @click="gotoShopInfor">
					<view class="">
						<image class="shoping-img" src="../../static/index/shopping.png" mode="aspectFill"></image>
					</view>
					<view class="" style="padding:0 30upx;line-height: 50upx;width: 100%;">
						<view class="">
							完成时间：2019年8月13日11:19:37
						</view>
						<view class="">
							总价：￥80.9
						</view>
						<view class="flex justify-between">
							<view class="">
								订单状态：已完成
							</view>
							<view class="">
								<image src="../../static/user/shouhou.png" mode="" style="width: 140upx;height: 50upx;"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
			<!-- 待发货 -->
			<view class="order-body bg-white">
				<view class="flex padding-left-sm" @click="gotoShopInfor">
					<view class="">
						<image class="shoping-img" src="../../static/index/shopping.png" mode="aspectFill"></image>
					</view>
					<view class="" style="padding:0 30upx;line-height: 50upx;width: 100%;">
						<view class="">
							完成时间：2019年8月13日11:19:37
						</view>
						<view class="">
							总价：￥80.9
						</view>
						<view class="flex justify-between">
							<view class="">
								订单状态：<text class="text-blue">代发货</text>
							</view>
							<view class="" @click="gotoRefund">
								<image src="../../static/user/tuikuan.png" mode="" style="width: 140upx;height: 50upx;"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
			<!-- 正在派送 -->
			<view class="order-body bg-white">
				<view class="flex padding-left-sm" @click="gotoShopInfor">
					<view class="">
						<image class="shoping-img" src="../../static/index/shopping.png" mode="aspectFill"></image>
					</view>
					<view class="" style="padding:0 30upx;line-height: 50upx;width: 100%;">
						<view class="">
							完成时间：2019年8月13日11:19:37
						</view>
						<view class="">
							总价：￥80.9
						</view>
						<view class="">
							订单状态：<text class="text-yellow">镖局正在派送途中</text>
						</view>
					</view>
				</view>
			</view>
			
			
			<!-- 售后处理中 -->
			<view class="order-body bg-white">
				<view class="flex padding-left-sm" @click="gotoShopInfor">
					<view class="" >
						<image class="shoping-img" src="../../static/index/shopping.png" mode="aspectFill"></image>
					</view>
					<view class="" style="padding:0 30upx;line-height: 50upx;width: 100%;">
						<view class="">
							完成时间：2019年8月13日11:19:37
						</view>
						<view class="">
							总价：￥80.9
						</view>
						<view class="flex justify-between">
							<view class="">
								订单状态：<text class="text-red">售后处理中</text>
							</view>
							<view class="" @click="gotoRefund">
								<image src="../../static/user/tuikuan.png" mode="" style="width: 140upx;height: 50upx;"></image>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		
		<!-- 联系客户 -->
		<view class="user-border-radius" style="background-color: #fff8e7;padding: 30upx;">
			<view class="flex justify-between" style="font-size: 14px;">
				<view class="flex">
					<view class="">
						<image src="../../static/user/call.png" mode="" style="width: 40upx;height: 40upx;"></image>
					</view>
					<text class="text-black padding-left-sm">联系客服</text>
				</view>
				<view class="" style="color: #ffbe4f;">
					（09:00—22:00）<text class="cuIcon-right"></text>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				nav_list:[
					{"title":"全部"},
					{"title":"待发货"},
					{"title":"待收货"},
					{"title":"已完成"},
				],
				
				TabCur: 0,
				scrollLeft: 0
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			gotoShopInfor(){
				uni.navigateTo({
					url:'../user/state-order'
				})
			},
			gotoRefund(){
				uni.navigateTo({
					url:'../user/refund'
				})
			}
			
		}
	}
</script>

<style>
.order-body{
	border-radius:30upx;
	margin: 30upx 10upx;
	padding: 20upx 5upx;
}
	
.cu-card>.cu-item {
	margin: 10rpx 30rpx;
}
.user-border-radius{
	border-radius:30upx;
	margin: 20upx 30upx;
}
</style>
