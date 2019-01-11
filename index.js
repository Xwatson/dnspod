const Dnspod = require('./dnspod');
const config = require('./config.json');

(async function () {
    console.log('程序启动，时间：', new Date().toLocaleString())
    const dnspod = new Dnspod({
        login_token: config.login_token
    });
    
    const recordList = await dnspod.getRecordList(config.domain);
    if (Array.isArray(recordList.records)) {
        // 获取ip
        const ip = await dnspod.getIP();
        const records = recordList.records;
        const sub_records = config.records || [];
        try {
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
        }
    } else {
        console.log('没有获取到记录值！')
    }
    console.log('等待下次启动...')
})()