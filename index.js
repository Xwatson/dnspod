const Dnspod = require('./dnspod');
const config = require('./config.json');

(async function () {
    const dnspod = new Dnspod({
        login_token: config.login_token
    });
    const start = async() => {
        console.log('程序已启动，时间：', new Date().toLocaleString())
        const recordList = await dnspod.getRecordList(config.domain);
        if (Array.isArray(recordList.records)) {
            try {
                // 获取ip
                const ip = await dnspod.getIP();
                console.log('ip is：', ip);
                const records = recordList.records;
                const sub_records = config.records || [];
                for (const key in records) {
                    const item = records[key];
                    if (records.hasOwnProperty(key) && item.type === 'A' && sub_records.indexOf(item.name) > -1) {
                        const update = await dnspod.updateRecord(config.domain, item.id, item.name, item.type, item.line, item.line_id, ip, item.mx);
                        if (update.code !== '1') {
                            console.log(`修改记录：${item.name} 为${ip} 成功！`);
                        } else {
                            console.log(`修改记录 ${item.name} 失败：${update.message}, code：${update.code}`);
                        }
                    }
                }
            } catch (err) {
                console.log('修改记录时发生错误：', err);
                return false;
            }
        } else {
            console.log('没有获取到记录值！');
        }
        console.log('5分钟后再次启动...');
        await sleep(1000 * 60 * 5);
        start();
    }
    const sleep = function async(time) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(true);
            }, time);
        })
    }
    // 立即启动
    start();
})()