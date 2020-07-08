const pathEVN = process.env.Path;
const spawn = require("child_process").spawn;
const fs = require('fs')
const path = require('path')

let file = fs.readFileSync(path.resolve('./package.json'))
file = JSON.parse(file)
if (file.haveInit) {
    console.log("已添加到环境变量");
    return
}
const child = spawn(
	'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe',
	[`[environment]::SetEnvironmentvariable('Path','${pathEVN};${process.cwd()};','User')`],
);
child.stderr.on("data",function(data){
    console.log("环境变量写入失败: " + data);
});
child.on("exit",function(){
    console.log("环境变量写入完毕");
    file.haveInit = true
    fs.writeFileSync(path.resolve('./package.json'), JSON.stringify(file))
});
child.stdin.end();