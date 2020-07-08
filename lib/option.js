
const inquirer = require('inquirer'); // 命令行输出美化
const optionConfig = require('../config/optionConfig')
let optionValue
/**
 * 初始化选项
 */
function initOption(type) {
    optionValue = optionConfig[type]
    return select([]).then(res => {
        const target = {}
        res.map(i => Object.assign(target, i))
        return target
    })
}

function select(result = []) {
    if (optionValue.length) {
        return inquirer.prompt(optionValue.shift()).then(res => {
            result.push(res)
            console.log('')
            return select(result)
        })
    } else return Promise.resolve(result)
}

module.exports = (type) => {
    return initOption(type).catch(err => {
        console.error(err);
        process.exit(1);
    });
}