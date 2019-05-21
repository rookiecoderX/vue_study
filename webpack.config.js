var path = require('path')

// html-webpack-plugin 根据指定模板，在内存中生成一份对应的html文件，同时会自动把打包好的bundle.js放到html底部

//配置插件需要在module.exports中的plugin中配置
var htmlWebpackPlugin = require('html-webpack-plugin')

var VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: path.join(__dirname, './src/main.js'),
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
			{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
			// 处理url地址  npm install url-loader file-loader -D
			// url-loader中参数limit： 当图片小于这个值时，使用base64编码 大于这个值时，不会是有base64编码
			{ test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=1024&name=[hash]-[name].[ext]'},
			{ test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},
			{ test: /\.js/, use: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.vue/, use: 'vue-loader' }
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: path.join(__dirname, './src/index.html'),
			filename: 'index.html'
		}),
		new VueLoaderPlugin()
	],
	resolve: {
		alias: {
			// "vue$": "vue/dist/vue.js"
		}
	}
}