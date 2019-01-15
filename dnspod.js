const axios = require('axios');
const qs = require('querystring');

class dnspod {
    constructor(p) {
        this.params = p;
    }
    async request(url, data = {}, method = 'POST', options = {}) {
        return new Promise((resolve, reject) => {
            if (data !== null) {
                data = { ...data, ...this.params }
                data.format = 'json';
            }
            axios.request({
                baseURL: 'https://dnsapi.cn/',
                url,
                method,
                data: qs.stringify(data),
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                responseType: 'json',
                validateStatus: function (status) {
                    return status >= 200 && status < 300;;
                },
                ...options
            })
            .then(function(res) {
                if (res.data.status.code === '1') {
                    resolve(res.data);
                } else {
                    reject(res.data.message);
                }
            })
            .catch(function(err) {
                reject(err);
            });
        });
    }
    /**
     * 获取域名信息
     */
    async getDomain(domain) {
        return this.request('Domain.Info', { domain });
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
        return this.request('Record.List', { domain });
    }
    async updateRecord(domain, record_id, sub_domain, record_type = 'A', record_line = '默认', record_line_id, value, mx) {
        return this.request('Record.Modify', { domain, record_id, sub_domain, record_type, record_line, record_line_id, value, mx });
    }
    /**
     * 获取ip
     */
    async getIP() {
        return new Promise((resolve, reject) => {
            axios.get('https://ifconfig.co/ip', {
                validateStatus: function (status) {
                    return status >= 200 && status < 300;;
                },
            }).then(function (res) {
                const ip = (res.data || '').replace(/\n/g, '');
                resolve(ip);
            })
            .catch(function (error) {
                reject(error);
            });
            })
    }
}
module.exports = dnspod;