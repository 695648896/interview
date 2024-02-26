// 思想 一段时间内只执行第一次
function throttle(fn, time){
    let timeout
    return function(){
        let context =  this
        let args = arguments
        if(!timeout){
            timeout = setTimeout(() => {
                timeout = null
                fn.apply(context, args)
            }, time);
        }
    }
}