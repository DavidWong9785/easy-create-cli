const semver = require('semver'); // npm的语义版本包
const didYouMean = require('didyoumean'); // 简易的智能匹配引擎
const chalk = require('../util/chalk-extends'); // 命令行输出美化

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
  }
}