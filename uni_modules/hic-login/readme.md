# hic-login 登录组件

## 基本用法
**示例**

- 修改登录组件主题颜色：`uni.scss`文件引入默认的scss自定义变量
``` css
@import '~@/uni_modules/hic-login/theme.scss';
```
或者不引入，直接在`uni.scss`文件添加scss自定义变量
``` scss
$hic-login-bg-color: #4e9eeb;		// 背景颜色
$hic-login-input-bg: #f8f8f8;		// 输入框背景颜色
$hic-login-triangle-color: #5057cb;	// 输入框右侧三角颜色
$hic-login-btn-bg-color: linear-gradient(45deg, #0081ff, #1cbbb4);	// 按钮背景渐变色
$hic-login-btn-color: #fff;			// 按钮文字颜色
// 文字大小
$font-xl: 19px;
$font-df: 30rpx;
$font-light: #c0c4cc;	// 文字颜色
```

- 组件示例

``` HTML
<hic-login
	logo="/static/images/logo/logo_white.png"
	title="益农数字农业"
	:props="props"
	:history="history"
	:thirdProps="thirdProps"
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
	<template #bottom>
		<view>福建海智信息技术有限公司</view>
		<view class="text-center">0591-88515005</view>
	</template>
</hic-login>
```
对应script
``` javaScript
export default {
	data() {
		return {
			props: {account: 'loginName', password: 'password'},
			history: [],
			thirdProps: [
				{ provider: 'weixin', text: '微信授权', icon: 'cuIcon-weixin', color: 'lines-green' }
			]
		}
	},
	methods: {
		handleLogin(form) {
			// 表单验证
			console.log(form);	// {loginName: '13xxx81', password: '123'}
		},
		remove(item, index) {
			uni.showModal({
				title: '提示',
				content: `确定删除账号${item.loginName}？`,
				success: (res) => {
					this.history.splice(index, 1);
				}
			});
		},
		thirdLogin(res) {
			console.log(res);	// {errMsg: "login:ok", code: "xxx"}
		},
		wxLogin(data) {
			console.log(data);	// {code: "xxx", userInfo: {nickName: 'xx', gender: '0', avatarUrl: 'http://xxx'}}
		}
	}
};
```
对应css
``` scss
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
```

- 可以修改pages.json，取消默认的原生导航栏

``` json
{
	"path": "pages/login/login",
	"style": {
		"navigationBarTitleText": "登录",
		"navigationStyle": "custom"
	}
}
```

## API
### hic-login Props

| 参数         | 说明                                                | 类型    | 可选值     | 默认值                                       |
| ------------ | --------------------------------------------------- | ------- | ---------- | -------------------------------------------- |
| logo         | logo图片地址                                        | String  |            |                                              |
| title        | 标题                                                | String  |            |                                              |
| props        | 返回的form字段，参数history，配置选项，具体看下表   | Object  |            | { account: 'account', password: 'password' } |
| btnText      | 登录按钮文字                                        | String  |            | 登录                                         |
| history      | 历史登录账号列表，配置选项同props                   | Array   |            | []                                           |
| thirdProps   | 第三方账号登录配置，具体看下表                      | Array   |            | []                                           |
| wxProfile    | 微信授权，是否需要通过wx.getUserProfile获取用户信息 | Boolean | true/false | false                                        |
| loading      | 是否加载中                                          | Boolean | true/false | false                                        |
| autoClearPwd | 删除账号 是否自动清空密码                           | Boolean | true/false | false                                        |

### props Options

参考：`{account: 'loginName', password: 'password'}`

| 参数     | 说明           | 类型   | 默认值   |
| -------- | -------------- | ------ | -------- |
| account  | 用户名对应字段 | String | account  |
| password | 密码对应字段   | String | password |

### thirdProps Options

参考：`{ provider: 'weixin', text: '微信授权', icon: 'cuIcon-weixin', color: 'lines-green' }`

| 参数     | 说明                                                         | 类型   |
| -------- | ------------------------------------------------------------ | ------ |
| provider | 登录服务提供商，通过 [uni.getProvider](https://uniapp.dcloud.io/api/plugins/provider) 获取 | String |
| text     | 文字                                                         | String |
| icon     | 显示Icon对应的class                                          | String |
| color    | Icon颜色对应的class                                          | String |

### hic-login Slot

| name         | 说明                                             |
| ------------ | ------------------------------------------------ |
| logo         | logo部分的显示方式                               |
| user         | 用户名前Icon                                     |
| pwd          | 密码前Icon                                       |
| tips         | 密码输入框、登录按钮之间                         |
| bottom       | 底部显示方式                                     |
| wx-authorize | wxProfile为true时，微信授权显示方式              |
| third        | 第三方账号登录 每一个item(作用域插槽 参数: item) |

### hic-login Events

| 事件名      | 说明                                  | 参数                           |
| ----------- | ------------------------------------- | ------------------------------ |
| remove      | 删除历史登录账号                      | item, index                    |
| login       | 点击登录按钮，按props配置返回输入内容 | {[account], [password]}        |
| third-login | 第三方账号登录                        | {code: 'xxx'}                  |
| wx-login    | wxProfile为true时，微信授权登录       | {code: 'xxx', userInfo: {...}} |
