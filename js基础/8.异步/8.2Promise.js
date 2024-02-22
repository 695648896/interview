class MyPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  constructor(executor) {
    this.status = MyPromise.PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = (value) => {
      if (this.status === MyPromise.PENDING) {
        this.status = MyPromise.FULFILLED;
        this.value = value;
        while (this.onFulfilledCallbacks.length) {
          this.onFulfilledCallbacks.shift()(value);
        }
      }
    };
    let reject = (reason) => {
      if (this.status === MyPromise.PENDING) {
        this.status = MyPromise.REJECTED;
        this.reason = reason;
        while (this.onRejectedCallbacks.length) {
          this.onRejectedCallbacks.shift()(reason);
        }
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    const promise2 = new MyPromise((resolve, reject) => {
        const fulfilledMicrotask =()=>{
            queueMicrotask(() => {
                // 这里微任务队列是为了在返回自身时 等待p1完成初始化
                // 例: const p1 = promise.then(value => {
                //     console.log(value)
                //     return p1
                //   })
                try {
                  const x = onFulfilled(this.value);
                  resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                  reject(error);
                }
              });
        }

        const rejectedMicrotask = () =>{
            queueMicrotask(() => {
                try {
                  const x = onRejected(this.reason);
                  resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                  reject(error);
                }
              });
        }


      if (this.status === MyPromise.FULFILLED) {
        fulfilledMicrotask()
      }
      if (this.status === MyPromise.REJECTED) {
       rejectedMicrotask()
      }
      if (this.status === MyPromise.PENDING) {
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    });

    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining ccle detected for promise #<Promise>")
    );
  }

  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

// 1. 初始化promise实例, 执行executor 改变此实例的status为fulfilled
const promise = new MyPromise((resolve, reject) => {
  // 目前这里只处理同步的问题
  resolve("success");
});

// 2. 执行promise实例的then方法,会返回新的promise实例,这里新的promise实例p1的status为pending.
const p1 = promise.then(
  // 2.1 then内的onfulfilled函数由于放入到queueMicrotask中,会异步最后执行
  (value) => {
    console.log(value);
    return p1;
  }
);
// 3. p1实例由于queueMicrotask异步执行,此时resolve还为执行,所以status还是pending,
//    所以这里会将onfulfilled函数和onRejected函数都收集到函数队列中
p1.then(
  (value) => {
    console.log(2);
    console.log("resolve", value);
  },
  (reason) => {
    console.log(3);
    console.log(reason.message);
  }
);

// 4. 执行函数栈中队列为空时,引擎会前往微任务队列中寻找微任务进行执行,
//    此时会执行promise.then内的onfulfilled函数 此时该函数返回的x为p1(即then方法内的promise2)
//    继续执行会发现resolvePromise中x与promise2相等,那么会走reject逻辑,执行收集的onrejectedcallbacks
