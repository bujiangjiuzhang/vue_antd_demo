import express from "express";
import userRouter from "./router/user_router.js";
// express的中间件 body-parser(用于解析客户端请求的body中的内容，JSON编码处理和url编码处理)
// 如果不添加，无法获取req.body
import bodyParser from 'body-parser';


const app = express()

app.use(bodyParser());

app.all('*', function (req, res, next) {
    // 开发环境设置，生产环境谨慎使用
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Content-Type', 'application/json;charset=utf-8')
    if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    } else {
    next();
    }
   });

// 挂载路由
app.use('/api', userRouter)

app.listen(80, () => {
    console.log('项目运行在：http://127.0.0.1')
})