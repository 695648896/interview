Array.prototype.myreduce = function(cb,initialValue) {
    const arr = this
    let total = initialValue || arr[0]
    for(let i=initialValue? 0 : 1; i < arr.length; i++){
        total = cb(total,arr[i],i,arr)
    }
    return total
}