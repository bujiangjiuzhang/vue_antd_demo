import db from "../db/index.js";

export async function getAllUser(req, res) {
  try {
    const [rows] = await db.query("select id, username, nickname from user");
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
