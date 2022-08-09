<template>
	<view class="hic-login">
		<view class="logo">
			<view class="logo-inner">
				<slot name="logo">
					<image v-if="logo" :src="logo" mode="aspectFit"></image>
					<view class="title">{{ title }}</view>
				</slot>
			</view>
		</view>
		<view class="form">
			<view class="box">
				<view class="input-wrapper">
					<slot name="user"></slot>
					<input type="text" class="input" v-model="loginForm.account" placeholder="请输入您的用户名" @focus="closeHistory" />
					<view
						v-if="hasHistory"
						:class="showHistory ? 'triangle-up' : 'triangle-down'"
						@click="showHistory = !showHistory"></view>
				</view>
				<view v-show="!showHistory" class="animation-fade">
					<view class="input-wrapper">
						<slot name="pwd"></slot>
						<input type="text" password class="input" v-model="loginForm.password" placeholder="请输入您的密码" />
					</view>
					<slot name="tips"></slot>
					<view class="">
						<button class="btn round gradient" :class="{disabled: loading}" :loading="loading" @click="handleLogin">{{ btnText }}</button>
					</view>
				</view>
				<view v-show="showHistory" class="history animation-fade">
					<view class="input-wrapper" v-for="(item, index) in historyAccount" :key="item.account">
						<text style="width: 54rpx;"></text>
						<view class="input" @click="changeAccount(index)">{{ item.account }}</view>
						<text class="close" @click="removeAccount(index)"></text>
					</view>
				</view>
				<view class="third-login" v-if="providerList.length > 0">
					<view class="text-grey">—— 使用第三方账号登录 ——</view>
					<view class="provider">
						<block v-for="item in providerList" :key="item.provider">
							<slot name="third" :item="item">
								<view
									class="provider-item round"
									:class="item.color"
									@click="handleClickProvider(item.provider)">
									<text :class="item.icon"></text>
								</view>
							</slot>
						</block>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<slot name="bottom"></slot>
		</view>
		
		<!-- #ifdef MP-WEIXIN -->
		<uni-popup ref="popup" type="bottom">
			<view class="wx-authorize">
				<view class="bar">
					<view class=""></view>
					<view class="content">微信授权</view>
					<view class="action close" @click="hidePopup"></view>
				</view>
				<view class="describe">
					<slot name="wx-authorize">
						<view class="text-xl">{{ title }}</view>
						<view>申请获得您的公开信息(昵称、头像、地区等)</view>
					</slot>
				</view>
				<view class="operation">
					<view class="btn cancel" @click="hidePopup">拒绝</view>
					<view class="btn gradient" @click="getUserProfile">允许</view>
				</view>
			</view>
		</uni-popup>
		<!-- #endif -->
	</view>
</template>

<script>
	import Service from '../../utils/ThirdServices.js';
	export default {
		name: 'HicLogin',
		props: {
			logo: {
				// logo图片src地址
				type: String
			},
			title: {
				// 标题
				type: String,
				default: ''
			},
			props: {
				// 返回的form字段，配置选项
				type: Object,
				default: () => ({ account: 'account', password: 'password' })
			},
			btnText: {
				// 登录按钮文字
				type: String,
				default: '登录'
			},
			history: {
				// 历史登录账号列表
				type: Array,
				default: () => ([])
			},
			thirdProps: {
				// 第三方账号登录
				type: Array,
				default: () => ([])
			},
			wxProfile: {
				// 微信授权 是否需要通过wx.getUserProfile获取用户信息
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			},
			autoClearPwd: {
				// 删除账号 是否自动清空密码
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				loginForm: {
					account: '',
					password: ''
				},
				showHistory: false,
				oauth: []
			}
		},
		watch: {
			'loginForm.account': {
				handler(val, oldVal) {
					if (!this.autoClearPwd) return;
					// 删除账号 自动清空密码
					if (val.length >= oldVal.length) return;
					// val长度比oldVal短 => 删除账号
					if (this.hasHistory) {
						if (this.historyAccount.some(item => (item.account === val))) {
							// 切换账号 刚好长度比之前短
							return;
						}
					}
					console.log('--- clear passward ---');
					this.loginForm.password = '';
				}
			}
		},
		computed: {
			hasHistory() {
				return this.historyAccount.length > 0;
			},
			historyAccount() {
				const { account, password } = this.props;
				return this.history.map(item => {
					return {
						account: item[account],
						password: item[password]
					};
				});
			},
			providerList() {
				if (!this.oauth.length || !this.thirdProps.length) {
					// 没传thirdProps 不显示第三方登录
					return [];
				}
				return this.thirdProps.filter(item => (this.oauth.indexOf(item.provider) !== -1));
			}
		},
		created() {
			this.getProvider();
		},
		mounted() {
			this.changeAccount(0);
		},
		methods: {
			changeAccount(index) {
				if (!this.hasHistory) return;
				if (index < 0 || index > this.historyAccount.length - 1) return;
				const item = this.historyAccount[index];
				this.loginForm.account = item.account;
				this.loginForm.password = item.password;
				this.closeHistory();
			},
			removeAccount(index) {
				const item = this.history[index];
				this.$emit('remove', item, index);
			},
			closeHistory() {
				this.showHistory = false;
			},
			handleLogin() {
				if (this.loading) return;
				const { account, password } = this.props;
				this.$emit('login', {
					[account]: this.loginForm.account,
					[password]: this.loginForm.password
				});
			},
			getProvider() {
				Service.getProvider().then((provider) => {
					this.oauth = provider;
				});
			},
			handleClickProvider(provider) {
				// #ifdef MP-WEIXIN
				if (provider === 'weixin') {
					if (this.wxProfile) {
						// 需要通过wx.getUserProfile获取用户头像、昵称、地址...信息
						this.showPopup();
						return;
					}
				}
				// #endif
				Service.login(provider).then((res) => {
					this.$emit('third-login', res);
				});
			},
			// #ifdef MP-WEIXIN
			showPopup() {
				this.$refs.popup.open();
			},
			hidePopup() {
				this.$refs.popup.close();
			},
			getUserProfile() {
				wx.getUserProfile({
					desc: '申请获得您的公开信息',
					success: (res) => {
						if(res.errMsg == 'getUserProfile:ok') {
							const userInfo = res.userInfo;
							Service.login('weixin').then((res) => {
								this.$emit('wx-login', {
									code: res.code,
									userInfo
								});
							});
						}
					},
					fail: (err) => {
						console.log('获取微信用户信息失败', err);
					}
				});
			}
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	@mixin flex($justify: flex-start, $align: center) {
		display: flex;
		justify-content: $justify;
		align-items: $align;
	}
	.hic-login {
		width: 100vw;
		height: 100vh;
		position: relative;
	}
	.logo {
		@include flex(center);
		height: 35vh;
		background-color: $hic-login-bg-color;
		.logo-inner {
			@include flex();
			flex-direction: column;
			image {
				width: 400rpx;
				height: 100rpx;
			}
			.title {
				font-size: 50rpx;
				color: #fff;
			}
		}
	}
	.form {
		padding: 0 30rpx;
		height: 10vh;
		border-radius: 0 0 100rpx 100rpx;
		background-color: $hic-login-bg-color;
		.box {
			padding: 100rpx 40rpx 30rpx;
			border-radius: 40rpx;
			background-color: #fff;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			.input-wrapper {
				@include flex(space-between);
				padding: 20rpx;
				margin-bottom: 30rpx;
				background-color: $hic-login-input-bg;
				.input {
					flex: 1;
					padding: 5rpx 20rpx;
					font-size: $font-df;
				}
				$x: 10rpx;
				$y: 1.73 * $x;	// sqrt(3) * 11 = 19
				.triangle-up,
				.triangle-down {
					padding: 0 15rpx;
					&:after {
						content: '';
						display: inline-block;
						border-left: $x solid transparent;
						border-right: $x solid transparent;
						margin-top: $x;
					}
				}
				.triangle-up:after {
					border-bottom: $y solid $hic-login-triangle-color;
				}
				.triangle-down:after {
					border-top: $y solid $hic-login-triangle-color;
				}
			}
			.tips {
				padding: 0 30rpx 30rpx;
				display: flex;
				justify-content: space-between;
				checkbox {
					margin-right: 20rpx;
				}
			}
			.history {
				max-height: 300rpx;
				overflow-y: auto;
				.input-wrapper {
					margin-bottom: 0;
				}
			}
		}
	}
	.third-login {
		text-align: center;
		padding-top: 40rpx;
		.provider {
			padding-top: 10rpx;
			@include flex(center);
			.provider-item {
				width: 96rpx;
				height: 96rpx;
				border: 1rpx solid;
				margin: 0 20rpx;
				font-size: 2rem;
				@include flex(center);
			}
		}
		.third-login-item {
			padding: 6rpx;
			border-radius: 50%;
			box-shadow: 0 0 10rpx 2rpx rgba(0, 0, 0, 0.4);
		}
	}
	.bottom {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding-bottom: 20rpx;
		color: $font-light;
		@include flex(center);
		flex-direction: column;
	}
	.wx-authorize {
		.describe {
			padding: 30rpx 30rpx 70rpx;
			view {
				padding-top: 20rpx;
			}
		}
		.operation {
			@include flex(space-around);
			.btn {
				flex: 1;
				&.cancel {
					color: $hic-login-bg-color;
					border-top: 1rpx solid #eee;
				}
			}
		}
	}
	
	.btn {
		padding: 0 40rpx;
		height: 80rpx;
		font-size: $font-df;
		box-sizing: border-box;
		overflow: visible;
		border: 0;
		text-decoration: none;
		transform: translate(0rpx, 0rpx);
		position: relative;
		@include flex(center);
		&::after {
			display: none;
		}
		&.disabled {
			opacity: 0.5;
		}
	}
	.round {
		border-radius: 5000rpx;
	}
	.gradient {
		background-color: $hic-login-bg-color;
		background-image: $hic-login-btn-bg-color;
		color: $hic-login-btn-color;
	}
	
	.animation-fade {
		animation-name: fade;
		animation-duration: .8s;
		animation-timing-function: linear;
		animation-fill-mode: both;
	}
	@keyframes fade {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	
	.bar {
		min-height: 100rpx;
		@include flex(space-between);
		.action {
			position: relative;
			@include flex(center);
			&:last-child {
				margin-right: 30rpx;
			}
		}
	}
	
	$width: 30rpx;
	.close {
		position: relative;
		width: $width;
		height: $width;
		display: inline-block;
		&::before,
		&::after {
			content: '';
			position: absolute;
			background-color: #8799a3;
			left: $width / 2;
			width: 1px;
			height: $width;
		}
		&::before {
			transform: rotate(45deg);
		}
		&::after {
			transform: rotate(-45deg);
		}
	}
	.text-xl {
		font-size: $font-xl;
	}
	.text-grey {
		color: $font-light;
	}
</style>
