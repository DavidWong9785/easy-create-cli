const program = require('commander'); // 命令行工具
const chalk = require('../util/chalk-extends'); // 命令行输出美化

const Option = require('../lib/option')
const Create = require('../lib/create')

const requiredNodeVersion = require('../package.json').engines.node;

const common = require('../util/common')
const { checkNodeVersion, validateArguments, suggestCommands } = common

const commandConfig = require('../config/commandConfig');

log = console.log

// 检测node版本
checkNodeVersion(requiredNodeVersion, 'easy-create');

// 命令版本
program.version(commandConfig.version)

// 命令帮助
program.on('--help', function(){
  commandConfig.help.forEach(i => {
    log(i)
  })
});

// 处理非法命令
program.arguments('<command>').action(cmd => {
  program.outputHelp();
  log(`  ` + chalk.TOMATO(`非法命令 ${chalk.GOLD(cmd)}.`));
  log();
  suggestCommands(cmd);
});

// 初始化项目模板
commandConfig.list.forEach(i => {
  i.command = ` ${i.command}` || ''
  program
    .command(`${i.name} <project-name>${i.command}`)
    .description(i.desc)
    .action((...args) => {
      // 输入参数校验
      validateArguments(process.argv.length, 5);
      
      // 处理输入参数
      let result = {
        git: i.git,
        projectName: args[0]
      }
      
      Option(i.name).then(options => {
        if (i.action) {
          const temp = i.action(i, args, options)
          if (temp) result = Object.assign(result, temp)
        }
        Create(Object.assign(options, result))
      })
  })
})

program.parse(process.argv);