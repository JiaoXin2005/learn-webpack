const webpack = require('webpack');
const path = require('path');
const rm = require('rimraf'); // 移除文件的模块
const ora = require('ora');
const chalk = require('chalk'); // 色彩样式提示

const spinner = ora({
	color: 'green',
	text: '正在打包中，请耐心等待' 
}) // 打包开始的提示
spinner.start(); //
rm(path.resolve(__dirname,'../dist/js/'),(err) => { // 移除上一次打包的文件
	if(err) throw err;
	webpack({
		entry: './src/main.js',
		output: {
			path: path.resolve(__dirname,'../dist/js'),
			filename: 'jiaoxin.js'
		},
		plugins: [
			new webpack.DefinePlugin({
				LOCAL_ROOT: JSON.stringify('https://jiaoxin2005.github.io/test/api')
			})
		]
	},(err,stats)=>{
		spinner.stop(); // 打包完成关闭打包提示
		if(err) throw  err;
		process.stdout.write(stats.toString({
			color : true,
			mudules: false,
			children: false,
			chunkModules: false,
			chunks: false
		}) + '\n\n');
		console.log(chalk.cyan('Build Complete'));
		console.log(chalk.blue.bgRed('打包搞定，上线'));	
	})
})

