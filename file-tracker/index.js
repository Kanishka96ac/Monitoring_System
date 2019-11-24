const chokidar = require("chokidar");
const dateTime = require("date-time");
const ip = require("ip");
var fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;
const mysql = require("mysql");
var bodyParser = require("body-parser");
var pathCmd = "F:/proteger_system/monitoring/file-tracker/";

const connection = mysql.createConnection({
  host: "192.168.1.120",
  port: "3306",
  user: "kanishka",
  password: "kanishka#321",
  database: "kanishka"
});

//connect with front-end
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

startWatcher();
setupServer();

function createLog(log, type) {
  if (type == 1) {
    log = "log : " + dateTime() + " : " + ip.address() + " : " + log;
    // fs.appendFile(pathCmd + "add-logs.txt", log, function(err) {
    //   if (err) throw err;
    // });
    var sql = "INSERT INTO addlogs (`value`) VALUES ('" + log + "')";
    try {
      connection.query(sql, function(err, result) {
        if (err) throw err;
      });
    } catch (e) {
      res.status(500).json({
        error: e
      });
    }
  } else if (type == 2) {
    log = "log : " + dateTime() + " : " + ip.address() + " : " + log;
    // fs.appendFile(pathCmd + "change-logs.txt", log, function(err) {
    //   if (err) throw err;
    // });
    var sql = "INSERT INTO changelogs (`value`) VALUES ('" + log + "')";
    try {
      connection.query(sql, function(err, result) {
        if (err) throw err;
      });
    } catch (e) {
      res.status(500).json({
        error: e
      });
    }
  } else if (type == 3) {
    log = "log : " + dateTime() + " : " + ip.address() + " : " + log;
    // fs.appendFile(pathCmd + "unlink-logs.txt", log, function(err) {
    //   if (err) throw err;
    // });
    var sql = "INSERT INTO unlinklogs (`value`) VALUES ('" + log + "')";
    try {
      connection.query(sql, function(err, result) {
        if (err) throw err;
      });
    } catch (e) {
      res.status(500).json({
        error: e
      });
    }
  } else if (type == 4) {
    log = "log : " + dateTime() + " : " + ip.address() + " : " + log;
    // fs.appendFile(pathCmd + "addDir-logs.txt", log, function(err) {
    //   if (err) throw err;
    // });
    var sql = "INSERT INTO addDirlogs (`value`) VALUES ('" + log + "')";
    try {
      connection.query(sql, function(err, result) {
        if (err) throw err;
      });
    } catch (e) {
      res.status(500).json({
        error: e
      });
    }
  } else if (type == 5) {
    log = "log : " + dateTime() + " : " + ip.address() + " : " + log;
    // fs.appendFile(pathCmd + "unlinkDir-logs.txt", log, function(err) {
    //   if (err) throw err;
    // });
    var sql = "INSERT INTO unlinkDirlogs (`value`) VALUES ('" + log + "')";
    try {
      connection.query(sql, function(err, result) {
        if (err) throw err;
      });
    } catch (e) {
      res.status(500).json({
        error: e
      });
    }
  } else if (type == 6) {
    log = "log : " + dateTime() + " : " + ip.address() + " : " + log;
    // fs.appendFile(pathCmd + "error-logs.txt", log, function(err) {
    //   if (err) throw err;
    // });
    var sql = "INSERT INTO errorlogs (`value`) VALUES ('" + log + "')";
    try {
      connection.query(sql, function(err, result) {
        if (err) throw err;
      });
    } catch (e) {
      res.status(500).json({
        error: e
      });
    }
  } else if (type == 7) {
    log = "log : " + dateTime() + " : " + ip.address() + " : " + log;
    // fs.appendFile(pathCmd + "ready-logs.txt", log, function(err) {
    //   if (err) throw err;
    // });
    var sql = "INSERT INTO readylogs (`value`) VALUES ('" + log + "')";
    try {
      connection.query(sql, function(err, result) {
        if (err) throw err;
      });
    } catch (e) {
      res.status(500).json({
        error: e
      });
    }
  }
}

function startWatcher() {
  // fs.writeFileSync("add-logs.txt", "");
  // fs.writeFileSync("change-logs.txt", "");
  // fs.writeFileSync("unlink-logs.txt", "");
  // fs.writeFileSync("addDir-logs.txt", "");
  // fs.writeFileSync("unlinkDir-logs.txt", "");
  // fs.writeFileSync("error-logs.txt", "");
  // fs.writeFileSync("ready-logs.txt", "");

  const watcher = chokidar.watch("F:/proteger_system/work", {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });

  // Add event listeners.
  watcher
    .on("add", path => createLog(`File ${path} has been added`, 1))
    .on("change", path => createLog(`File ${path} has been changed`, 2))
    .on("unlink", path => createLog(`File ${path} has been removed`, 3))
    .on("addDir", path => createLog(`Directory ${path} has been added`, 4))
    .on("unlinkDir", path => createLog(`Directory ${path} has been removed`, 5))
    .on("error", error => createLog(`Watcher error: ${error}`, 6))
    .on("ready", () =>
      createLog(`Initial scan complete. Ready for changes`, 7)
    );
}

function setupServer() {
  app.listen(port, () => console.log(`App listening on port ${port}!`));

  app.get("/addlogs", function(req, res) {
    try {
      connection.query("SELECT * FROM addlogs", function(err, result, fields) {
        if (err) throw err;
        res.send({
          File_add_logs: { result }
        });
      });
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/changelogs", function(req, res) {
    try {
      connection.query("SELECT * FROM changelogs", function(
        err,
        result,
        fields
      ) {
        if (err) throw err;
        res.send({
          File_change_logs: { result }
        });
      });
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/unlinklogs", function(req, res) {
    try {
      connection.query("SELECT * FROM unlinklogs", function(
        err,
        result,
        fields
      ) {
        if (err) throw err;
        res.send({
          File_unlink_logs: { result }
        });
      });
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/addDirlogs", function(req, res) {
    try {
      connection.query("SELECT * FROM addDirlogs", function(
        err,
        result,
        fields
      ) {
        if (err) throw err;
        res.send({
          File_addDir_logs: { result }
        });
      });
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/unlinkDirlogs", function(req, res) {
    try {
      connection.query("SELECT * FROM unlinkDirlogs", function(
        err,
        result,
        fields
      ) {
        if (err) throw err;
        res.send({
          File_unlinkDir_logs: { result }
        });
      });
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/errorlogs", function(req, res) {
    try {
      connection.query("SELECT * FROM errorlogs", function(
        err,
        result,
        fields
      ) {
        if (err) throw err;
        res.send({
          File_error_logs: { result }
        });
      });
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/readylogs", function(req, res) {
    try {
      connection.query("SELECT * FROM readylogs", function(
        err,
        result,
        fields
      ) {
        if (err) throw err;
        res.send({
          File_ready_logs: { result }
        });
      });
    } catch (e) {
      console.log(e);
    }
  });

  // app.get("/", function(req, res) {
  //   let add_logs = fs
  //     .readFileSync(pathCmd + "add-logs.txt")
  //     .toString()
  //     .replace(/\n/g, "&");
  //   let change_logs = fs
  //     .readFileSync(pathCmd + "change-logs.txt")
  //     .toString()
  //     .replace(/\n/g, "&");
  //   let unlink_logs = fs
  //     .readFileSync(pathCmd + "unlink-logs.txt")
  //     .toString()
  //     .replace(/\n/g, "&");
  //   let addDir_logs = fs
  //     .readFileSync(pathCmd + "addDir-logs.txt")
  //     .toString()
  //     .replace(/\n/g, "&");
  //   let unlinkDir_logs = fs
  //     .readFileSync(pathCmd + "unlinkDir-logs.txt")
  //     .toString()
  //     .replace(/\n/g, "&");
  //   let error_logs = fs
  //     .readFileSync(pathCmd + "error-logs.txt")
  //     .toString()
  //     .replace(/\n/g, "&");
  //   let ready_logs = fs
  //     .readFileSync(pathCmd + "ready-logs.txt")
  //     .toString()
  //     .replace(/\n/g, "&");
  //   res.send({
  //     File_add_logs: {
  //       add_logs
  //     },
  //     File_change_logs: {
  //       change_logs
  //     },
  //     File_unlink_logs: {
  //       unlink_logs
  //     },
  //     File_addDir_logs: {
  //       addDir_logs
  //     },
  //     File_unlinkDir_logs: {
  //       unlinkDir_logs
  //     },
  //     File_error_logs: {
  //       error_logs
  //     },
  //     File_ready_logs: {
  //       ready_logs
  //     }
  //   });
  // });

  var addlogs = [];
  var changelogs = [];
  var unlinklogs = [];
  var addDirlogs = [];
  var unlinkDirlogs = [];
  var errorlogs = [];
  var readylogs = [];

  var getAddLogs = function(callback) {
    connection.query("SELECT * FROM addlogs", function(err, res, fields) {
      if (err) return callback(err);
      if (res.length) {
        for (var i = 0; i < res.length; i++) {
          addlogs.push(res[i]);
        }
      }
      callback(null, addlogs);
    });
  };

  var getChangeLogs = function(callback) {
    connection.query("SELECT * FROM changelogs", function(err, res, fields) {
      if (err) return callback(err);
      if (res.length) {
        for (var i = 0; i < res.length; i++) {
          changelogs.push(res[i]);
        }
      }
      callback(null, changelogs);
    });
  };

  var getUnlinkLogs = function(callback) {
    connection.query("SELECT * FROM unlinklogs", function(err, res, fields) {
      if (err) return callback(err);
      if (res.length) {
        for (var i = 0; i < res.length; i++) {
          unlinklogs.push(res[i]);
        }
      }
      callback(null, unlinklogs);
    });
  };

  var getAddDirLogs = function(callback) {
    connection.query("SELECT * FROM addDirlogs", function(err, res, fields) {
      if (err) return callback(err);
      if (res.length) {
        for (var i = 0; i < res.length; i++) {
          addDirlogs.push(res[i]);
        }
      }
      callback(null, addDirlogs);
    });
  };

  var getUnlinkDirLogs = function(callback) {
    connection.query("SELECT * FROM unlinkDirlogs", function(err, res, fields) {
      if (err) return callback(err);
      if (res.length) {
        for (var i = 0; i < res.length; i++) {
          unlinkDirlogs.push(res[i]);
        }
      }
      callback(null, unlinkDirlogs);
    });
  };

  var getErrLogs = function(callback) {
    connection.query("SELECT * FROM errorlogs", function(err, res, fields) {
      if (err) return callback(err);
      if (res.length) {
        for (var i = 0; i < res.length; i++) {
          errorlogs.push(res[i]);
        }
      }
      callback(null, errorlogs);
    });
  };

  var getReadyLogs = function(callback) {
    connection.query("SELECT * FROM readylogs", function(err, res, fields) {
      if (err) return callback(err);
      if (res.length) {
        for (var i = 0; i < res.length; i++) {
          readylogs.push(res[i]);
        }
      }
      callback(null, readylogs);
    });
  };

  app.get("/backup", async function(req, res) {
    await getAddLogs(function(err, addlogs) {
      if (err) throw err;
      addlogs.map(data => {
        fs.appendFile(
          "F:/proteger_system/monitoring/backup/backup_file_add.txt",
          data.value + "\n",
          function(err) {
            if (err) throw err;
          }
        );
      });
      // return addlogs;
    });
    await getChangeLogs(function(err, changelogs) {
      if (err) throw err;
      changelogs.map(data => {
        fs.appendFile(
          "F:/proteger_system/monitoring/backup/backup_file_change.txt",
          data.value + "\n",
          function(err) {
            if (err) throw err;
          }
        );
      });
      // return changelogs;
    });
    await getUnlinkLogs(function(err, unlinklogs) {
      if (err) throw err;
      unlinklogs.map(data => {
        fs.appendFile(
          "F:/proteger_system/monitoring/backup/backup_file_remove.txt",
          data.value + "\n",
          function(err) {
            if (err) throw err;
          }
        );
      });
      // return unlinklogs;
    });
    await getAddDirLogs(function(err, addDirlogs) {
      if (err) throw err;
      addDirlogs.map(data => {
        fs.appendFile(
          "F:/proteger_system/monitoring/backup/backup_directory_add.txt",
          data.value + "\n",
          function(err) {
            if (err) throw err;
          }
        );
      });
      // return addDirlogs;
    });
    await getUnlinkDirLogs(function(err, unlinkDirlogs) {
      if (err) throw err;
      unlinkDirlogs.map(data => {
        fs.appendFile(
          "F:/proteger_system/monitoring/backup/backup_directory_remove.txt",
          data.value + "\n",
          function(err) {
            if (err) throw err;
          }
        );
      });
      // return unlinkDirlogs;
    });
    await getErrLogs(function(err, errorlogs) {
      if (err) throw err;
      errorlogs.map(data => {
        fs.appendFile(
          "F:/proteger_system/monitoring/backup/backup_error.txt",
          data.value + "\n",
          function(err) {
            if (err) throw err;
          }
        );
      });
      // return errorlogs;
    });
    await getReadyLogs(function(err, readylogs) {
      if (err) throw err;
      readylogs.map(data => {
        fs.appendFile(
          "F:/proteger_system/monitoring/backup/backup_ready.txt",
          data.value + "\n",
          function(err) {
            if (err) throw err;
          }
        );
      });
      // return readylogs;
    });
  });

  app.post("/login", function(req, res) {
    Emp_username = req.body.uname;
    Emp_password = req.body.pw;
    try {
      connection.query(
        "SELECT tier FROM `users` WHERE `name` = ? and `password` = ?",
        [Emp_username, Emp_password],
        function(error, results) {
          if (error) throw error;
          if (results.length > 0) {
            res.status(200).json({
              tier: results[0].tier
            });
          } else {
            res.status(500).json({
              tier: "error"
            });
          }
        }
      );
    } catch (e) {
      res.status(500).json({
        error: e
      });
    }
  });
}
