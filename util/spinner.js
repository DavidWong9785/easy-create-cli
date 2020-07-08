
const Ora = require('ora');
module.exports = function name(params) {
    const spinner = new Ora({
        discardStdin: false,
        text: '',
        spinner: process.argv[2]
    });
    
    return spinner
}