const path = require('path');
const fs = require('fs');
const fsExtends = require('./fs-extends')
const semver = require('semver'); // npm的语义版本包
const didYouMean = require('didyoumean'); // 简易的智能匹配引擎
const chalk = require('../util/chalk-extends'); // 命令行输出美化
const validateProjectName = require('validate-npm-package-name');
const inquirer = require('inquirer');

log = console.log
didYouMean.threshold = 0.6;

module.exports = {
  // 校验node版本
  checkNodeVersion(wanted, cliName) {
    if (!semver.satisfies(process.version, wanted)) {
      log(
        chalk.TOMATO(
          '你当前版本为' +
          process.version +
          ', 但 ' +
          cliName +
          ' 最低版本要求 ' +
          wanted +
          '.\n请更新你的Node版本.'
        )
      );
      // 退出进程
      process.exit(1);
    }
  },
  // 校验输入参数
  validateArguments(argvLen, maxArgvLens) {
    if (argvLen > maxArgvLens) {
      log(chalk.GOLD('\n 提示: 你提供了多余的参数，非本次执行参数将被忽略.\n '));
    }
  },
  // 命令建议
  suggestCommands(cmd, program) {
    const avaliableCommands = program.commands.map(cmd => {
      return cmd._name;
    });
    // 简易智能匹配用户命令
    const suggestion = didYouMean(cmd, avaliableCommands);
    if (suggestion) {
      log(`  ` + chalk.TOMATO(`您需要的命令可能是 ${chalk.GOLD(suggestion)} ？`));
    }
  },
  // 校验项目名(包名)是否合法
  validateDirection(projectName) {
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
  },
  // 计算目标生成目录
  async getDirection(projectName) {
    // 获取node进程的工作目录
    const cwd = process.cwd();
    const currentDirection = path.resolve(cwd, `../${projectName}`)
    let targetDirection = ''

    // 判断是否是当前目录
    const inCurrentDir = currentDirection === cwd;

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
    return targetDirection
  }
}