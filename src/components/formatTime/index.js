export const formatTime = (time) => {
    if(!time) {
      return ''
    }
    let date = new Date(time)
  
    let year,month,day,hour,minute,second
    //year
    year = date.getFullYear()
    //month
    month = date.getMonth() +1  //(0-11)
    //day
    day = date.getDate()
    //hour
    hour = date.getHours() <10? '0'+date.getHours():date.getHours()
    //minute
    minute = date.getMinutes() <10? '0'+date.getMinutes():date.getMinutes()
    //second
    second = date.getSeconds() <10? '0'+date.getSeconds():date.getSeconds()
  
    return `${day}-${month}-${year}  ${hour}:${minute}:${second}`
  }