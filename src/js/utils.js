//获取cookie
export function  getCookie(cname) {
  var arr, reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
};
