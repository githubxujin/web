import utils from '@/utils/utils.js';
class SmpWebSql {
  constructor(options) {
    options = options || {};
    this.database = null;
    this.DateBaseName = options.DateBaseName || 'RedDB';
    this.Version = options.Version || '1.0';
    this.Description = options.Description || '智维离线工单数据库';
    this.DataBaseSize = options.DataBaseSize || 2 * 1024 * 1024;
    this.init();
  }
  /**
   * 初始化数据库
   */
  init() {
    this.database = openDatabase(
      this.DateBaseName,
      this.Version,
      this.Description,
      this.DataBaseSize
    );
  }
  /**
   * 批量添加字段
   * @param {*} tableName 表名
   * @param {*} arr 更新的数据    [{key1：value1 , key2 : value2 ...},{key1：value1 , key2 : value2 ...}]
   * @param {*} index BLOG字段所在的索引位置
   * @param {*} isFirst 是否是第一次创建表
   */
  addBlob(tableName, arr, index, isFirst) {
    var _db = this.database;
    var _me = this;
    // eslint-disable-next-line promise/param-names
    return new Promise(function(resovle, reject) {
      if (arr == null) {
        return this;
      }
      var keyC = [];
      var keyI = [];
      var _key = '';
      arr = arr || [];
      if (arr && arr.constructor == Array) {
        for (var i in arr[0]) {
          keyC.push(i);
          keyI.push(i);
        }
        _key = keyI.join(',');
        index = index == undefined ? 0 : index;
        keyC[index] = keyC[index] + ' BLOB';
        // eslint-disable-next-line promise/param-names

        _db.transaction(function(tx, result) {
          // var csql = 'CREATE TABLE IF NOT EXISTS ' + tableName + ' (' + keyC.join(",") + ')';
          // console.log('csql:' + csql);
          if (isFirst == true) {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS ' +
                tableName +
                ' (' +
                keyC.join(',') +
                ')'
            );
          }
          // var sql = "";
          for (var s = 0, _len = arr.length; s < _len; s++) {
            var _value = _me.split(arr[s]);
            // sql += 'INSERT INTO ' + tableName + ' (' + _key + ') VALUES (' + _value + ')';
            // console.log("sql:" + sql);
            tx.executeSql(
              'INSERT INTO ' +
                tableName +
                ' (' +
                _key +
                ') VALUES (' +
                _value +
                ')',
              [],
              function(tx, result) {
                resovle(result.rowsAffected);
                // console.log('添加成功'+result.rowsAffected);
              },
              function(tx) {
                console.error('添加失败');
                // eslint-disable-next-line prefer-promise-reject-errors
                reject(false);
              }
            );
          }
          _key = keyI = keyC = null;
          resovle();
        });
      }
    });
  }
  /**
   * 批量添加字段 注 ： 数据里面的第一个key 为主键
   * @param {*} tableName 表名
   * @param {*} arr arr 更新的数据    [{key1：value1 , key2 : value2 ...},{key1：value1 , key2 : value2 ...}]
   * @param {*} noKey noKey 第一个字段是否是主键（默认是）
   */
  add(tableName, arr, noKey) {
    var _me = this;
    var _db = this.database;
    // eslint-disable-next-line promise/param-names
    return new Promise(function(resovle, reject) {
      if (arr == null) {
        return this;
      }
      var keyC = [];
      var keyI = [];
      var _key = '';
      arr = arr || [];
      if (arr && arr.constructor == Array) {
        for (var i in arr[0]) {
          keyC.push(i);
          keyI.push(i);
        }
        if (noKey == undefined) {
          keyC[0] = keyC[0] + ' unique';
        }
        _key = keyI.join(',');
        _db.transaction(function(tx) {
          // /var csql = 'CREATE TABLE IF NOT EXISTS ' + tableName + ' (' + keyC.join(",") + ')';
          // console.log('csql:' + csql);
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS ' +
              tableName +
              ' (' +
              keyC.join(',') +
              ')'
          );
          // var sql = "";
          for (var s = 0, _len = arr.length; s < _len; s++) {
            var _value = _me.split(arr[s]);
            // sql += 'INSERT INTO ' + tableName + ' (' + _key + ') VALUES (' + _value + ')';
            // console.log("sql:" + sql);
            tx.executeSql(
              'INSERT INTO ' +
                tableName +
                ' (' +
                _key +
                ') VALUES (' +
                _value +
                ')',
              [],
              function(tx, result) {
                resovle(result.rowsAffected);
                // console.log('添加成功'+result.rowsAffected);
              },
              function(tx, error) {
                console.error('添加失败');
                // eslint-disable-next-line prefer-promise-reject-errors
                reject(false);
              }
            );
          }
          _key = keyI = keyC = null;
          // resovle();
        });
      }
    });
  }
  /**
   * 更新指定数据
   * @param {*} tableName 表名
   * @param {*} key 查询的键
   * @param {*} value 对应键的值
   * @param {*} obj obj 更新的数据    {key1：value1 , key2 : value2 ...}
   */
  update(tableName, key, value, obj) {
    var _db = this.database;
    var _value = this.splitU(obj);
    // eslint-disable-next-line promise/param-names
    return new Promise(function(resovle, reject) {
      _db.transaction(function(tx) {
        // console.log('sql:' + 'UPDATE ' + tableName + ' set ' + _value + ' where ' + key + '="' + value + '"')
        tx.executeSql(
          'UPDATE ' +
            tableName +
            ' set ' +
            _value +
            ' where ' +
            key +
            '="' +
            value +
            '"',
          [],
          function(tx, result) {
            resovle(result.rowsAffected);
          },
          function(tx, error) {
            console.error('更新失败');
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(false);
          }
        );
      });
    });
  }
  /**
   * 更新指定数据
   * @param {*} tableName 表名
   * @param {*} where 查询条件
   * @param {*} obj obj 更新的数据    {key1：value1 , key2 : value2 ...}
   */
  updateWhere(tableName, where, obj) {
    var _db = this.database;
    var _value = this.splitU(obj);
    // eslint-disable-next-line promise/param-names
    return new Promise(function(resovle, reject) {
      _db.transaction(function(tx) {
        console.log(
          'UPDATE ' + tableName + ' set ' + _value + ' where ' + where + '"'
        );
        tx.executeSql(
          'UPDATE ' + tableName + ' set ' + _value + ' where ' + where + '"',
          [],
          function(tx, result) {
            resovle(result.rowsAffected);
          },
          function(tx, error) {
            console.error('更新失败');
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(false);
          }
        );
      });
    });
  }
  /**
   * 读取表数据
   * @param {*} tableName 表名
   * @param {*} condition 查询条件   'where name="jiekzou"'
   */
  read(tableName, condition) {
    var _db = this.database;
    var _me = this;
    // eslint-disable-next-line promise/param-names
    return new Promise(function(resovle, reject) {
      var _condition = this.isString(condition) ? condition : '';
      var _re = [];
      _db.transaction(function(tx) {
        tx.executeSql(
          'SELECT * FROM ' + tableName + ' ' + _condition + ' ',
          [],
          function(tx, results) {
            if (results && results.rows) {
              _re = _me.toArray(results.rows);
              resovle(_re);
            } else {
              resovle([]);
            }
          },
          function(tx, error) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject([]);
            console.error('查询失败');
          }
        );
      });
    });
  }
  /**
   * 删除数据
   * @param {*} tableName 表名
   * @param {*} condition 查询条件   'where name="jiekzou"'
   */
  remove(tableName, condition) {
    var _me = this;
    var _condition = this.isString(condition) ? condition : '';
    // eslint-disable-next-line promise/param-names
    return new Promise(function(resovle, reject) {
      _me.database.transaction(function(tx) {
        tx.executeSql(
          'DELETE FROM ' + tableName + ' ' + _condition + ' ',
          [],
          function(tx, result) {
            resovle(result.rowsAffected);
          },
          function(tx, error) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(false);
            console.error('删除失败');
          }
        );
      });
    });
  }
  /**
   * 根据查询条件读取表记录数
   * @param {*} tableName 表名
   * @param {*} condition 查询条件   'where name="jiekzou"'
   */
  counts(tableName, condition) {
    if (utils.browserVersions.android) {
      return this.androidCounts(tableName, condition);
    } else {
      return this.iosCounts(tableName, condition);
    }
  }
  // ios下面特有的
  /**
   * 读取表数据(ios下面特有的)
   * @param {*} tableName 表名
   * @param {*} condition  查询条件   'where name="jiekzou"'
   */
  iosCounts(tableName, condition) {
    var _condition = this.isString(condition) ? condition : '';
    var _db = this.database;
    var _me = this;
    // eslint-disable-next-line promise/param-names
    return new Promise(function(resovle, reject) {
      var _re = [];
      _db.transaction(function(tx) {
        tx.executeSql(
          'SELECT NO FROM ' + tableName + ' ' + _condition + ' ',
          [],
          function(tx, results) {
            // count (*) as num
            if (results && results.rows) {
              _re = _me.toArray(results.rows);
              resovle(_re.length);
            } else {
              resovle(0);
            }
          },
          function(tx, error) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(0);
            console.error('查询失败');
          }
        );
      });
    });
  }
  /**
   * 读取表数据（Android）
   * @param {*} tableName 表名
   * @param {*} condition 查询条件   'where name="jiekzou"'
   */
  androidCounts(tableName, condition) {
    var _condition = this.isString(condition) ? condition : '';
    var _db = this.database;
    var _me = this;
    // eslint-disable-next-line promise/param-names
    return new Promise(function(resovle, reject) {
      var _re = [];
      _db.transaction(function(tx) {
        tx.executeSql(
          'SELECT count (*) as num FROM ' + tableName + ' ' + _condition + ' ',
          [],
          function(tx, results) {
            // count (*) as num
            if (results && results.rows) {
              if (results.rows[0]) {
                resovle(results.rows[0].num);
              } else {
                resovle(0);
              }
            } else {
              resovle(0);
            }
          },
          function(tx, error) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(0);
            console.error('查询失败');
          }
        );
      });
    });
  }
  /**
   * 删除数据表
   * @param {*} tableName 表名
   */
  delTable(tableName) {
    // eslint-disable-next-line promise/param-names
    return new Promise(function(resovle, reject) {
      this.database.transaction(function(tx) {
        tx.executeSql(
          'DROP TABLE IF EXISTS ' + tableName,
          [],
          function(tx, res) {
            resovle();
          },
          function(tx, err) {
            console.error(err);
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(0);
          }
        );
      });
    });
  }
  // 更新字符处理
  splitU(obj) {
    var _arr = [];
    for (var t in obj) {
      _arr.push(t + '="' + obj[t] + '"');
    }
    return _arr.join(',');
  }
  // 添加字符处理
  split(obj) {
    var _arr = [];
    for (var m in obj) {
      _arr.push('\'' + obj[m] + '\'');
    }
    return _arr.join(',');
  }
  isFunction(callback) {
    return !!(
      typeof callback != 'undefined' && callback.constructor == Function
    );
  }
  isString(string) {
    return typeof string == 'string';
  }
  toArray(obj) {
    var _arr = [];
    var _len = obj.length;
    if (_len > 0) {
      for (var i = 0; i < _len; i++) {
        _arr.push(obj.item(i));
      }
    }
    return _arr;
  }
}

export default SmpWebSql;
