const path = require('path');
const fs = require('fs');

function delDir(path, del_self = false) {
    let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
                delDir(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        if (!del_self) fs.rmdirSync(path);
    }
}
module.exports = {
    delDir
}