module.exports = {
    version: '0.1.0',
    help: ['', 'Examples:', '  $ easy-create <project-type> <project-name>'],
    list: [{
        name: 'h5-pc',
        desc: '创建H5-PC项目',
        // git 为必传参数
        git: 'https://e.coding.net/yeba-01/yeba-fontend-template.git',
        // branch 分支，非必传，可在action返回
        // branch: '',
        /**
         * commandInfo 当前命令配置信息
         * inputArgs 命令行输入参数 - Array
         * options 选择项信息
         */
        action: (commandInfo, inputArgs, options) => {
            const lib = options.lib === 1 ? 'vue' : 'react'
            return {
                branch: `${commandInfo.name}-${lib}`
            }
        }
    }, {
        name: 'h5-mobile',
        desc: '创建H5-mobile项目',
        git: 'https://e.coding.net/yeba-01/yeba-fontend-template.git',
        action: (commandInfo, inputArgs, options) => {
            const lib = options.lib === 1 ? 'vue' : 'react'
            return {
                branch: `${commandInfo.name}-${lib}`
            }
        }
    }, {
        name: 'mini',
        desc: '创建小程序项目',
        git: 'https://e.coding.net/yeba-01/yeba-fontend-template.git',
        action: (commandInfo, inputArgs, options) => {
            const type = options.type === 1 ? 'origin' : 'taro'
            return {
                branch: `${commandInfo.name}-${type}`
            }
        }
    }]
}