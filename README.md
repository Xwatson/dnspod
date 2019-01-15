# 基于node自动更新dnspod域名解析
基于axios实现一个简单的更新dnspod域名解析记录，适用于家庭中不固定的IP。

## 快速启动
### 配置文件 config.json
```
{
    "login_email": "your email",
    "login_password": "your password ",
    "login_token": "tokenId,token", // 这里是dnspod控制台创建的API Token，需要生成的tokenid和token字符串并以','号分割
    "domain": "xxxx.com",
    "records": ["@", "*"], // 记录名称
    "log4js": { // log4js日志配置
        "filename": "./logs/dnspod.log" // 日志输出
    }
}
```
### 安装
```
npm install
```
### 使用 pm2 后台常驻
```
npm install -g pm2
```
### 注意：要使PM2支持log4js工作，需要安装pm2-intercom模块
```
pm2 install pm2-intercom
```
### 启动
```
pm2 start pm2.json
```