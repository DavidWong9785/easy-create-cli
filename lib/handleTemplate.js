const chalk = require('../util/chalk-extends');
const fs = require('fs'); 
const path = require('path'); 
const Spinner = require('../util/spinner')

log = console.log

const spinner = new Spinner();
const spinner2 = new Spinner();
spinner2.indent = 4

// 处理模板
module.exports = (url, res) => {
    spinner.text = chalk.BLUE(`正在处理模板...`)
    spinner.start()

    spinner2.text = chalk.BLUE(`读取配置中...`)
    spinner2.start()

    const existsConfigFile = fs.existsSync(path.join(url, './easy-create.json'));

    if (existsConfigFile) {
        let init = fs.readFileSync(path.join(url, './easy-create.json'))
        init = JSON.parse(init.toString())
        spinner2.text = chalk.GREEN(`读取配置完成`)
    
        init.forEach(i => {
            const fromUrl = path.join(url, i.from)
            spinner2.text = chalk.BLUE(`处理 ${fromUrl} 模板...`)
            const toUrl = path.join(url, i.to)
            const from = require(fromUrl)
            fs.writeFileSync(toUrl, from(res))
            if (fromUrl !== toUrl) {
                fs.unlinkSync(fromUrl);
            }
            spinner2.text = chalk.GREEN(`模板 ${fromUrl} 处理完毕`)
        })
        spinner2.stop()
        spinner.text = chalk.GOLD(`完成模板处理`)
        spinner.succeed()
    } else {
        spinner2.stop()
        spinner.text = chalk.GOLD(`没有配置文件，直接生成项目...`)
        spinner.succeed()
    }

}