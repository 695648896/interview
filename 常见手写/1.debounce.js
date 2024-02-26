// 思想 多次触发只执行最后一次 核心思想通过setTimeout来处理
function debounce(fn,time){
    let timeout

    return function(){
        let context = this
        let args = arguments
        if(timeout)clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn.apply(context, args)
        }, time);
    }
}