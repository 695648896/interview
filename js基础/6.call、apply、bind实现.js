Function.prototype.myCall = function(context){
    if(typeof this !== "function"){
        throw new Error("Type Error")
    }
    const context = context || window
    context.fn = this
    let args = [...arguments].slice(1)
    let res = context.fn(...args)
    delete context.fn
    return res
}
Function.prototype.myApply = function(context){
    if(typeof this !== "function"){
        throw new Error("Type Error")
    }
    context = context || window
    context.fn = this
    let res 
    if(arguments[1]){
         res = context.fn(...arguments[1])
    }else{
         res = context.fn()
    }
    delete context.fn
    return res
}
Function.prototype.myBind = function(context){
    if(typeof this !== "function"){
        throw new Error("Type Error")
    }
    var fn = this
    var args = [...arguments].slice(1)
    return function(){
        var bindArgs = [...arguments]
        return fn.apply(context, args.concat(bindArgs))
    }
}