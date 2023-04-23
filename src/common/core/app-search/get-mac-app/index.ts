// import getApps from "./getApp";

// export default {
//     getApps: () => {
//         return new Promise((resolve, reject) => getApps(resolve, reject));
//     },
//     isInstalled: (appName) => {
//         return new Promise((resolve, reject) => getApps(resolve, reject, appName));
//     },
// };
const { exec } = require('child_process');

function getApps() {
  return new Promise((resolve, reject) => {
    // 执行shell命令，​​列出所有已安装的应用程序
    exec('ls /Applications', (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }
      // 解析输出并提取应用程序名称
      const appNames = stdout.split('\n').filter(name => name.endsWith('.app')).map(name => name.slice(0, -4));
      resolve(appNames);
    });
  });
}

export default {
    getApps: getApps
}