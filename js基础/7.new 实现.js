function myNew(context){
    let instance = new Object()
    // 修改原型指向
    instance.__proto__ = context.prototype
    // 修改instance内置对象
    let result = context.apply(instance,[...arguments].slice(1))
    return typeof result === 'object' ?result:instance
}