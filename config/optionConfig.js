const chalk = require('../util/chalk-extends')
module.exports = {
    mini: [
        [
            {
                type: 'list',
                name: 'type',
                message: chalk.SILVER('开发类型'),
                choices: [{ name: chalk.TOMATO('原生'), value: 'origin' }]
            }
        ],
        [
            {
                type: 'checkbox',
                name: 'module',
                message: chalk.SILVER('引入模块'),
                choices: [
                    { name: chalk.TOMATO('地图sdk'), value: 'map' },
                    { name: chalk.TOMATO('ping++'), value: 'ping++' },
                ],
            }
        ],
        [
            {
                type: 'input',
                name: 'appId',
                message: chalk.SILVER('appId'),
            }
        ],
        [
            {
                type: 'input',
                name: 'projectName',
                message: chalk.SILVER('项目名称'),
            }
        ]
    ],
    'h5-pc': [
        [
            {
                type: 'list',
                name: 'lib',
                message: '开发框架',
                choices: [{ name: 'Vue', value: 1 }, { name: 'React', value: 2 }]
            }
        ],
        [
            {
                type: 'input',
                name: 'eventName',
                message: chalk.SILVER('项目名称'),
            }
        ]
    ],
    'h5-mobile': [
        [
            {
                type: 'list',
                name: 'lib',
                message: '开发框架',
                choices: [{ name: 'Vue', value: 1 }, { name: 'React', value: 2 }]
            }
        ],
        [
            {
                type: 'checkbox',
                name: 'module',
                message: chalk.SILVER('引入模块'),
                choices: [
                    { name: chalk.TOMATO('原生支付'), value: 'origin-pay' },
                    { name: chalk.TOMATO('ping++'), value: 'ping++' },
                    { name: chalk.TOMATO('qiniu'), value: 'qiniu' },
                ],
            }
        ],
        [
            {
                type: 'input',
                name: 'projectName',
                message: chalk.SILVER('项目名称'),
            }
        ]
    ],
    node: [
        [
            {
                type: 'list',
                name: 'data',
                message: '开发类型',
                choices: [{ name: '原生', value: 1 }, { name: 'Taro', value: 2 }]
            }
        ],
        [
            {
                type: 'checkbox',
                name: 'data',
                message: '引入模块',
                choices: [
                    { name: 'omix', value: 1 },
                    { name: '环信', value: 2 },
                    { name: '地图sdk', value: 3 },
                    { name: 'ping++', value: 4 },
                ],
            }
        ],
        [
            {
                type: 'input',
                name: 'data',
                message: 'appId',
            }
        ]
    ]
}