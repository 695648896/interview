// 状态转移方程
// dp[i,c] = max(dp[i-1,c],dp[i-1,c-wgt[i-1]]+val[i-1])

function knapsackDP(wgt, val, cap){
    const n = wgt.length
    const dp =  Array(n+1).fill(0).map(()=>{Array(cap+1).fill(0)})
    for(let i=1; i<=n; i++){
        for(let c=1; c <=cap; c++){
            if(wgt[i-1] > c){
                // 若超过背包容量，则不选物品 i
                dp[i][c] = dp[i-1][c]
            }else{
                dp[i][c] = Math.max(dp[i-1][c],dp[i-1][c-wgt[i-1]]+ val[i-1])
            }
        }
    }
    return dp[n][cap];
}