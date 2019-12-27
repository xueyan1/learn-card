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
const phoneCode=(sPhone) =>{
  if (!/^1[2-9][0-9]{9}$/.test(sPhone)) {
    return false;
  } else {
    return true;
  }
}
const ifEmpty=(str)=> {
  if (str == null || str == undefined || str == '') {
    return true;
  } else {
    var newstr = str.replace(/(^\s*)|(\s*$)/g, "");
    if (newstr.length) {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = {
  formatTime: formatTime,
  phoneCode: phoneCode,
  ifEmpty:ifEmpty
}
