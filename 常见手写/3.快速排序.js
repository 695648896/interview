function quickSort(nums, left, right) {
  // 子数组长度为1时 终止递归
  if (left >= right) {
    return;
  }
  // 哨兵划分
  const pivot = partition(nums, left, right);
  // 递归左子数组,右子数组
  quickSort(nums, left, pivot - 1);
  quickSort(nums, pivot + 1, right);
}

function partition(nums, left, right) {
    let i = left
    let j = right
    while(i < j){
        // 从右向左找第一个小于left的
        while(i<j && nums[j]>= nums[left]){
            j--
        }
        // 从左向右找首个大于left的
        while(i<j && nums[i]<=nums[left]){
            i++
        }
        [nums[i],nums[j]] = [nums[j],nums[i]]
    }
    // 将基准数交换至两子数组的分界线
    [nums[i],nums[left]] = [nums[left],nums[i]]
    return i
}
