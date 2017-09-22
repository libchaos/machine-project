console.log('####====START====###');


module.exports = excuteFibo

function excuteFibo() {
  return new Promise(function(resolve, reject) {
    var cluster = require('cluster');
    const numCPUs = require('os').cpus().length
    
    cluster.setupMaster({
     exec: 'worker.js',
     slient: true
    });
     
    // 剩余代码和清单 3 中 isMaster 段相同
    var workerID = []
    var collection = [44, 42, 42, 43];
    var st = Date.now();
    for (var i = 0; i < Math.min(numCPUs, collection.length); i++) {
     var wk = cluster.fork();
     workerID.push(wk.id)
     wk.send(collection[i]);
    }
    cluster.on('fork', function (worker) {
      if (workerID.indexOf(worker.id) !== -1) {
        console.log(`[master ${process.pid}] : fork worker ${worker.id}`);
      }
    });
    cluster.on('exit', function (worker, code, signal) {
     console.log(`[master] : worker ${worker.id} died`);
    });
    var numOfCompelete = 0
    var result = []
    Object.keys(cluster.workers).forEach(function (id) {
      cluster.workers[id].on('message', function (msg) {
        console.log(`[master] receive message from [worker ${id}]: ${msg}`);
        numOfCompelete++;
        result.push(msg)
        if (numOfCompelete === collection.length) {
          console.log(`[master] finish all work and using ${Date.now() -
        st} ms`);
        if (!cluster.workers[id].suicide) {
          cluster.workers[id].disconnect()
        }
        resolve(result)
        }
      });
    });
  })
}

