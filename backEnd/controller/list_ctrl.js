import db from "../db/index.js";

export async function getList(req, res) {
  try {
    const [rows] = await db.query("select id, info, done from info");
    // console.log('rows', rows)
    res.send({
      code: 200,
      message: "请求成功",
      data: rows,
    });
  } catch (err) {
    res.send({
        code: 500,
        message: '请求错误'
    })
  }
}

export async function addListItem(req, res) {
    const { id, info, done } = req.body
    var sql = 'insert into info set  id=? , info=?, done=?'; // 这边的"?"是SQL的模板语法
    var params = [id, info, done]  // 这边的数组参数与上边的"?"一一映射
    try {
        await db.query(sql, params);
        res.send({
            code: 200,
            message: "新增成功"
          });
    } catch(err) {
        res.send({
            code: 500,
            message: '请求错误'
        })
    }
}

export async function removeListItem(req, res) {
    const { id } = req.body
    var sql = 'delete from info where id=?'; // 这边的"?"是SQL的模板语法
    var params = [id]  // 这边的数组参数与上边的"?"一一映射
    try {
        await db.query(sql, params);
        res.send({
            code: 200,
            message: "删除成功"
          });
    } catch(err) {
        res.send({
            code: 500,
            message: '请求错误'
        })
    }
}
export async function changeItemCheck(req, res) {
    const { id, done } = req.body
    // UPDATE Person SET FirstName = 'Fred' WHERE LastName = 'Wilson' 
    var sql = 'update info set done=? where id=?'; // 这边的"?"是SQL的模板语法
    var params = [done, id]  // 这边的数组参数与上边的"?"一一映射
    try {
        await db.query(sql, params);
        res.send({
            code: 200,
            message: "更新成功"
          });
    } catch(err) {
        res.send({
            code: 500,
            message: '请求错误'
        })
    }
}