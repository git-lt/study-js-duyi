function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class SuperTask {
  constructor(parallelCount = 2) {
    // 任务队列
    this.taskList = [];
    // 最大并发数
    this.parallelCount = parallelCount;
    // 正在运行的任务数
    this.runningCount = 0;
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.taskList.push({
        task,
        resolve,
        reject,
      });
      this.run();
    });
  }

  run() {
    while (this.runningCount < this.parallelCount && this.taskList.length > 0) {
      const { task, resolve, reject } = this.taskList.shift();
      this.runningCount++;
      Promise.resolve(task())
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--;
          this.run();
        });
    }
  }
}

const superTask = new SuperTask();

function addTask(time, taskName) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务 ${taskName} 完成`);
    });
}

// 添加多个任务，每次并行执行2个，后续任务会被放到队列中
// 其中一个任务执行完成后，从队列中再取出一个任务执行
// 保证同时有2个任务在运行

// addTask(10000, 1); //10000ms后输出:任务1完成
// addTask(5000, 2); //5000ms后输出:任务2完成
// addTask(3000, 3); //8000ms后输出:任务3完成
// addTask(4000, 4); //12000ms后输出:任务4完成
// addTask(5000, 5); //15000ms后输出:任务5完成

// 输出结果：
// 任务 2 完成
// 任务 3 完成
// 任务 1 完成
// 任务 4 完成
// 任务 5 完成

addTask(1000, 1);
addTask(1000, 2);
addTask(1000, 3);
addTask(1000, 4);
addTask(1000, 5);

// 运行时间一样，每次并发执行完成2个任务
// 输出结果：
// 任务 1 完成
// 任务 2 完成

// 任务 3 完成
// 任务 4 完成

// 任务 5 完成