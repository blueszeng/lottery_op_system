import $ from 'jquery'
import { getServer } from '../configs/config'
import http from './http'

export const pagination = ({ totalPage, totalRecords, pageNo, url, data }) => {
    // 有些参数是可选的，比如lang，若不传有默认值
    kkpager.generPageHtml({
        pno: pageNo,
        // 总页码
        total: totalPage,
        // 总数据条数
        totalRecords: totalRecords,
        // 链接前部
        hrefFormer: url,
        // 链接尾部
        hrefLatter: '',
        getLink: function(n) {
            let args = `?page=${n}`
            for (let key in data) {
                let val = $(`#${data[key]}`).val()
                args += `&${data[key]}=${val}`
            }
            console.log(args)
            return `${this.hrefFormer}${args}`
        }
    })
}