const download = require('download-git-repo')

module.exports = async function downloadGitRepo({ url, target, checkout }) {
  return new Promise((resolve, reject) => {
    download(url, target, { clone: true, checkout }, err => {
      if (err) {
        return reject(err);
      }
      return resolve(target);
    });
  });
};
