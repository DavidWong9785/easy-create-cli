module.exports = {
    version: '0.1.0',
    help: ['', 'Examples:', '  $ easy-create <project-type> <project-name>'],
    list: [{
        name: 'h5-mobile',
        desc: '创建h5-mobile项目',
        // git 为必传参数
        git: 'https://github.com/DavidWong9785/easy-create-template.git',
        // branch 分支，非必传，可在action返回
        // branch: 'h5-mobile-vue',
        /**
         * commandInfo 当前命令配置信息 - (name, desc, git, branch...)
         * inputArgs 命令行输入参数 - Array
         * options 选择项信息
         */
        action: (commandInfo, inputArgs, options) => {
            const lib = options.lib === 1 ? 'vue' : 'react'
            return {
                branch: `${commandInfo.name}-${lib}`
            }
        }
    }]
}