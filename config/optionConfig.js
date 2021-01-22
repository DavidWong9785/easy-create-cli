const chalk = require('../util/chalk-extends')
module.exports = {
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
                name: 'eventName',
                message: chalk.SILVER('项目名称'),
            }
        ]
    ],
}