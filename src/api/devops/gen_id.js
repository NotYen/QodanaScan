const fs = require('fs');

let idList = [];
let timer = setInterval(() => {
  console.log(idList.length)
  if (idList.length >= 1000) {
    clearInterval(timer);
    writeFile();
    return;
  }
  const id = genId();
  if (!checkDuplicate(idList, id)) {
    console.log('id', id);
    idList.push({
      _id: id,
    });
  }
}, 90);

function genId() {
  return 'mmh-' + Math.floor(Math.random() * 10) + (new Date().getTime())
}

function checkDuplicate(idList, id) {
  let flag = false;
  for (let i = 0; i < idList.length; i++) {
    const item = idList[i]
    if (item._id === id) {
      flag = true
      break
    }
  }
  return flag
}

function writeFile() {
  // 将 JSON 数据转换为字符串
  const jsonString = JSON.stringify(idList, null, 2);

  // 指定要保存的文件路径和文件名
  const filePath = 'mmh_id.json';

  // 将 JSON 字符串写入文件
  fs.writeFile(filePath, jsonString, (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('JSON file saved successfully.');
    }
  });
}
