import express from 'express'
import { getAllUser } from '../controller/user_ctrl.js'
import { getList, addListItem, removeListItem, changeItemCheck } from '../controller/list_ctrl.js'


// 创建路由对象
const userRouter = new express.Router()

userRouter.get('/user', getAllUser)
userRouter.get('/list', getList)
userRouter.post('/addListItem', addListItem)
userRouter.post('/removeListItem', removeListItem)
userRouter.post('/changeItemCheck', changeItemCheck)

export default userRouter