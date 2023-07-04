const fs = require('fs');
const path = require('path');
const { compile } = require('vue-tsc');



const adam_dir = path.resolve(__dirname, '..');
const output_dir = path.join(adam_dir, 'types');
const src_dir = path.join(adam_dir, 'src');

// // 清空输出目录
if (fs.existsSync(output_dir)) {
  fs.rmSync(output_dir, { recursive: true });
}

// 创建输出目录
fs.mkdirSync(output_dir);

// 遍历源代码目录，生成声明文件
compile(src_dir, output_dir);