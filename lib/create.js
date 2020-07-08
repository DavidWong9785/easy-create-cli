const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

const chalk = require('../util/chalk-extends');
const inquirer = require('inquirer');
const validateProjectName = require('validate-npm-package-name');

const downloadGitRepo = require('./download')
const handleTemplate = require('./handleTemplate')
const fsExtends = require('../util/fs-extends')
const Spinner = require('../util/spinner')

const spinner = new Spinner()

async function create({ git, branch = '', projectName, ...options }) {
  // 获取node进程的工作目录
  const cwd = process.cwd();
  const currentDirection = path.resolve(cwd, `../${projectName}`)
  let targetDirection = ''
  // 判断是否是当前目录
  const inCurrentDir = currentDirection === cwd;
  // 校验项目名(包名)是否合法
  const validateResult = validateProjectName(projectName);
  if (!validateResult.validForNewPackages) {
    // 打印出错误以及警告
    console.error(chalk.RED(`无效的工程名称: "${projectName}"`));
    validateResult.errors &&
      validateResult.errors.forEach(error => {
        console.error(chalk.RED.dim(`出错: ${error}`));
      });
    validateResult.warnings &&
      validateResult.warnings.forEach(warn => {
        console.error(chalk.RED.dim(`警告: ${warn}`));
      });
    process.exit(1);
  }

  let clearCurrentDir = false
  // 若当前目录就和工程名相同
  if (inCurrentDir) {
    const { current } = await inquirer.prompt([
        {
            name: 'current',
            type: 'confirm',
            message: chalk.SILVER(`当前目录就和工程名相同，是否在当前目录创建`)
        }
    ]);
    log('')
    if (current) clearCurrentDir = true
  }

  if (clearCurrentDir) {
      targetDirection = currentDirection
      // 清空当前目录
      fsExtends.delDir(targetDirection, true)
  } else {
      targetDirection = path.resolve(cwd, `./${projectName}`)
      // 判断当前目录是否已存在项目

      if (fs.existsSync(targetDirection)) {
        const { ok } = await inquirer.prompt([
            {
                name: 'ok',
                type: 'confirm',
                message: chalk.SILVER(`当前目录存在与工程名同名文件夹，是否覆盖`)
            }
        ]);
        
        if (!ok) process.exit(1);
        else fsExtends.delDir(targetDirection)
        log('')
      }
  }

  spinner.text = chalk.BLUE(`正在下载模板...`)
  spinner.start()

  const downloadParams = {
    url: `direct:${git}#${branch ? branch : ''}`,
    target: targetDirection,
  }
  
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
