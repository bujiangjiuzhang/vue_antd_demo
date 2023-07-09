import mysql from 'mysql2'

// 创建数据库连接对象
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    database: 'zcy_demo',
    user: 'root',
    password: 'admin'
})

export default pool.promise()