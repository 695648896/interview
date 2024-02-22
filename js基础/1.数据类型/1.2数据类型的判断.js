// typeof: 值类型与function可用typeof来判断  不可对null、对象、数组进行精确判断,因为都反悔object
// instanceof: 能判断对象类型,不能判断基本数据类型,其内部运行机制是判断在其原型链中能否找到该类型的原型
// Object.prototype.toString.call(): 所有原始数据类型都是能判断的,还有Error对象,Date对象等