function deepClone(target={}, map = new WeakMap()){
    // 如果是值类型直接返回值
    if(typeof target !== 'object'){
       return target
    }
    // 如果是引用类型 且拷贝过 则直接从map返回
    if(map.get(target)){
        return map.get(target)
    }
    let cloneTarget = Array.isArray(target) ? [] : {}
    // 防止循环引用
    map.set(target, cloneTarget)
    for(const key in target){
        if(target.hasOwnProperty(key)){
            cloneTarget[key] = deepClone(target[key],map)
        }
    }
    return cloneTarget
}

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};
target.target = target
console.log(deepClone(target))