import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 如果需要中文显示，可以引入相应的语言包

export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss' ) {
  return dayjs(date).format(format);
}

export function getRelativeTime(date) {
  const today = dayjs();
  const dataDate = dayjs(date);
  return dataDate.from(today);
}
/**
 * 提供开始时间和结束时间， 获取时长
 * @param {*} startTime 
 * @param {*} endTime 
 */
export function getDistanceTime(startTime, endTime){
  var startTimeStamp = new Date(startTime).getTime() / 1000;
  var endTimeStamp = new Date(endTime).getTime() / 1000;
  //获取 时长的时间戳
  var distanceStamp = endTimeStamp - startTimeStamp; 
  var getSecs = parseInt(distanceStamp  % 60)
  var getMins =  distanceStamp / 60  % 60
  var getHours = distanceStamp / 60 / 60
  if(getSecs === 0)
    return parseInt(getHours) +" 小时 " + parseInt(getMins) + " 分钟 ";
  else return parseInt(getHours) +" 小时 " + parseInt(getMins) + " 分钟 " + parseInt(getSecs) + " 秒 ";
}

export function FormatTime(t,date){
  var date=new Date(date);
  var o = {   
      "M+" : date.getMonth()+1,                 //月份
      "d+" : date.getDate(),                    //日
      "h+" : date.getHours(),                   //小时
      "m+" : date.getMinutes(),                 //分
      "s+" : date.getSeconds(),                 //秒
      "q+" : Math.floor((date.getMonth()+3)/3), //季度
      "S"  : date.getMilliseconds()             //毫秒
  };   
  if(/(y+)/.test(t)){
      t=t.replace(RegExp.$1,(date.getFullYear()+"").substr(4-RegExp.$1.length)); 
  };    
  for(var k in o){
      if(new RegExp("("+ k +")").test(t)){
          t=t.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]):(("00"+ o[k]).substr((""+o[k]).length))); 
      }; 
  }
  return t; 
};
/**
 * 
 * @param {开始的时间} startTime 
 * @param {结束时间} endTime 
 */
export function calProgress(startTime, endTime) {
  var nowDate = new Date()
  var startDate = new Date(startTime)
  var endDate = new Date(endTime)
  return (nowDate.getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime())
}
export function calSecTime(time){
  var timeDate = new Date(time)
  return timeDate
}