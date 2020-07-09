const chalk = require('../util/chalk-extends');

const downloadGitRepo = require('./download')
const handleTemplate = require('./handleTemplate')
const Spinner = require('../util/spinner')

const common = require('../util/common')
const { validateDirection, getDirection } = common

const spinner = new Spinner()

async function create({ git, branch = '', projectName, ...options }) {
  // 校验项目名(包名)是否合法
  validateDirection(projectName)

  // 计算目标生成目录
  const targetDirection = await getDirection(projectName)

  spinner.text = chalk.BLUE(`正在下载模板...`)
  spinner.start()

  const downloadParams = {
    url: `direct:${git}#${branch ? branch : ''}`,
    target: targetDirection,
  }
  
  // 有分支切分支
  if (branch) downloadParams.checkout = branch
  // 下载
  downloadGitRepo(downloadParams).then(url =>{
    spinner.text = chalk.ORANGE(`模板下载完成`)
    spinner.succeed()
    log('')
    // 模板处理
    handleTemplate(url, { projectName, ...options })
    log('')
    log(chalk.GREEN('============================================ easy ============================================'))
    log(chalk.GREEN('=                                                                                            ='))
    log(chalk.GREEN('=                                                                                            ='))
    log(chalk.GREEN(`=                                        项目创建成功                                        =`))
    log(chalk.GREEN('=                                                                                            ='))
    log(chalk.GREEN('=                                                                                            ='))
    log(chalk.GREEN('============================================ easy ============================================'))
  }).catch(e => {
    console.log(e)
    spinner.text = chalk.RED(`下载失败`)
    spinner.fail()
  })
}

module.exports = (options) => {
  return create(options).catch(err => {
    spinner.fail()
    console.error(err);
    process.exit(1);
  });
};
