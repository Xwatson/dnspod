# 基于node自动更新dnspod域名解析
基于[dnspod-client](https://github.com/ohsc/dnspod-client)模块实现一个简单的更新dnspod域名解析，适用于家庭中不固定的IP。
## 快速启动
### 配置文件 config.json
```
{
    "login_email": "your email",
    "login_password": "your password ",
    "login_token": "tokenId,token", // 这里是dnspod控制台创建的API Token，需要生成的tokenid和token字符串并以','号分割
    "domain": "xxxx.com",
    "records": ["@", "*"] // 记录名称
}
```
### 使用 pm2 后台常驻
```
npm install -g pm2
```
### 启动
```
pm2 start npm --watch --name dnspod --run start
```
## Todo
> * 暂未实现定时更新（可使用系统任务代替）
> * 未实现日志功能