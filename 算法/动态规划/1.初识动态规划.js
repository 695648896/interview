// 动态规划是一种“从底至顶”的方法：从最小子问题的解开始，迭代地构建更大子问题的解，直至得到原问题的解。
// 爬楼梯
function climbingStairsDP(n){
    if(n ===1 || n===2)return n
    // 初始化dp表 用于存储子问题的解
    const dp = new Array(n+1).fill(-1)
    // 初始状态: 预设最小问题的解
    dp[1] = 1
    dp[2] = 2
    for(let i=3; i <= n; i++){
        dp[i] = dp[i-1]+dp[i-2]
    }
    return dp[n]
}

/* 爬楼梯：空间优化后的动态规划 */
// 由于dp[i]只与dp[i-1]和dp[i-2]有关,因此我们无须使用一个数组dp来存储所有子问题的解 ,而只需两个变量滚动前进即可
function climbingStairsDPComp(n) {
    if (n === 1 || n === 2) return n;
    let a = 1,
        b = 2;
    for (let i = 3; i <= n; i++) {
        const tmp = b;
        b = a + b;
        a = tmp;
    }
    return b;
}