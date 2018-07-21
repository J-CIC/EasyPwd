const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 检查上次校验指纹的时间，防止重复校验
 */
function checkLastAuthTime() {
  var lastAuthTime = wx.getStorageSync("lastAuthTime");
  if (lastAuthTime) {
    lastAuthTime = parseInt(lastAuthTime);
  } else {
    lastAuthTime = 0;
  }
  // console.log("last:", lastAuthTime);
  // console.log("now:", new Date().getTime());
  // console.log("condition:", lastAuthTime + 60 * 1000 < new Date().getTime())
  if (lastAuthTime + 60 * 1000 < new Date().getTime()) {
    return false;
  }
  return true;
}
/**
 * 获取时间
 */
function getTime() {
  var date = new Date();
  var Y = date.getFullYear() + '/';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
}
module.exports = {
  formatTime: formatTime,
  checkLastAuthTime: checkLastAuthTime,
  getTime:getTime,
}
