import axios from 'axios';

let baseURL = 'https://gitcode.net/rubickcenter/rubick-database/-/raw/master';
let access_token = '';

// try {
//   const dbdata = window.rubick.db.get('rubick-localhost-config');
//   baseURL = dbdata.data.database;
//   access_token = dbdata.data.access_token;
// } catch (e) {
//   // ignore
// }

const instance = axios.create({
  baseURL:
    baseURL || 'https://gitcode.net/rubickcenter/rubick-database/-/raw/master',
});

export async function getTotalPlugins() {
  let targetPath = 'plugins/total-plugins.json';
  if (access_token) {
    targetPath = `${encodeURIComponent(
      targetPath
    )}/raw?access_token=${access_token}&ref=master`;
  }
  const res = await instance.get(targetPath);
  return res.data;
}

export async function getFinderDetail() {
  let targetPath = 'plugins/finder.json';
  if (access_token) {
    targetPath = `${encodeURIComponent(
      targetPath
    )}/raw?access_token=${access_token}&ref=master`;
  }
  const res = await instance.get(targetPath);
  return res.data;
}

export async function getSystemDetail() {
  let targetPath = 'plugins/system.json';
  if (access_token) {
    targetPath = `${encodeURIComponent(
      targetPath
    )}/raw?access_token=${access_token}&ref=master`;
  }
  const res = await instance.get(targetPath);
  return res.data;
}
export async function getWorkerDetail() {
  let targetPath = 'plugins/worker.json';
  if (access_token) {
    targetPath = `${encodeURIComponent(
      targetPath
    )}/raw?access_token=${access_token}&ref=master`;
  }
  const res = await instance.get(targetPath);
  return res.data;
}

/**
 * 获取插件详情
 */
export async function getPluginDetail(url: string) {
  const res = await axios.get(url);
  return res.data;
}

export async function getSearchDetail() {
  let targetPath = 'plugins/search.json';
  if (access_token) {
    targetPath = `${encodeURIComponent(
      targetPath
    )}/raw?access_token=${access_token}&ref=master`;
  }
  const res = await instance.get(targetPath);
  return res.data;
}
export async function getDevDetail() {
  let targetPath = 'plugins/dev.json';
  if (access_token) {
    targetPath = `${encodeURIComponent(
      targetPath
    )}/raw?access_token=${access_token}&ref=master`;
  }
  const res = await instance.get(targetPath);
  return res.data;
}
export async function getImageDetail() {
  let targetPath = 'plugins/image.json';
  if (access_token) {
    targetPath = `${encodeURIComponent(
      targetPath
    )}/raw?access_token=${access_token}&ref=master`;
  }
  const res = await instance.get(targetPath);
  return res.data;
}
