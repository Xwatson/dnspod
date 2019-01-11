const Dnspod = require('dnspod-client');

class dnspod {
    constructor(p) {
        this.client = new Dnspod(p);
    }
    /**
     * 获取域名信息
     */
    async getDomain(domain) {
        return new Promise((resolve, reject) => {
            this.client
            .domainInfo({domain})
            .on('domainInfo', function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    }
    /**
     * 获取记录值列表
     */
    async getRecordList(domain) {
        return new Promise((resolve, reject) => {
            this.client
            .recordList({domain})
            .on('recordList', function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    }
    async updateRecord(domain, record_id, sub_domain, record_type = 'A', record_line = '默认', record_line_id, value, mx) {
        return new Promise((resolve, reject) => {
            this.client
            .recordModify({domain, record_id, sub_domain, record_type, record_line, record_line_id, value, mx})
            .on('recordModify', function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    }
    /**
     * 获取ip
     */
    async getIP() {
        return new Promise((resolve, reject) => {
            this.client
            .getHostIp()
            .on('getHostIp', function (err, message) {
                if (err) {
                    reject(err);
                } else {
                    resolve(message);
                }
            });
        })
    }
}
module.exports = dnspod;