var arrData = [{
    "id": 1,
    "name": "设置专用航标和搬迁、拆除或者调整专用航标审批",
    "yew": "航道业务",
    "diq":"南京市",
    "shixlx": "行政许可",
    "banlsd": "互联网咨询,互联网收件,互联网预审,互联网受理,互联网办理,互联网办理结果信息反馈,互联网电子证照反馈",
    "zidlx":"系统字典"
},{
    "id": 2,
    "name": "航道通航条件影响评价审核",
    "yew": "航道业务",
    "diq":"南京市",
    "shixlx": "行政许可",
    "banlsd": "互联网咨询,互联网收件,互联网预审,互联网受理,互联网办理,互联网办理结果信息反馈,互联网电子证照反馈",
    "zidlx":"系统字典"
},{
    "id": 3,
    "name": "收费公路的鉴定和验收",
    "yew": "公路业务",
    "diq":"南京市",
    "shixlx": "其他",
    "banlsd": "互联网咨询,互联网收件,互联网预审,互联网受理,互联网办理,互联网办理结果信息反馈",
    "zidlx":"系统字典"
},{
    "id": 4,
    "name": "因施工需分流、中断交通许可（普通公路）",
    "yew": "公路业务",
    "diq":"南京市",
    "shixlx": "其他",
    "banlsd": "互联网咨询,互联网收件,互联网预审,互联网受理,互联网办理,互联网办理结果信息反馈",
    "zidlx":"系统字典"
},{
    "id": 5,
    "name": "市际、县际客运（班线、包车、旅游）经营者的设立",
    "yew": "运管业务",
    "diq":"南京市",
    "shixlx": "行政许可",
    "banlsd": "互联网咨询,互联网收件,互联网预审,互联网受理,互联网办理,互联网办理结果信息反馈",
    "zidlx":"系统字典"
},{
    "id": 6,
    "name": "市际、县际客运（班线、包车、旅游）经营者的变更",
    "yew": "运管业务",
    "diq":"南京市",
    "shixlx": "行政许可",
    "banlsd": "互联网咨询,互联网收件,互联网预审,互联网受理,互联网办理,互联网办理结果信息反馈",
    "zidlx":"系统字典"
},{
    "id": 7,
    "name": "公路工程交工验收向交通主管部门备案",
    "yew": "建管业务",
    "diq":"南京市",
    "shixlx": "行政确认",
    "banlsd": "互联网收件,互联网预审,互联网受理,互联网办理,互联网办理结果信息反馈",
    "zidlx":"系统字典"
},{
    "id": 8,
    "name": "变更企业法定代表人备案",
    "yew": "港口业务",
    "diq":"南京市",
    "shixlx": "其他",
    "banlsd": "其他",
    "zidlx":"系统字典"
}
];

function fetchData() {
    var arr = JSON.parse(localStorage.getItem('dictData'));
    if (arr == null || arr.length == 0) {
        localStorage.setItem('dictData', JSON.stringify(arrData));
        arr = JSON.parse(localStorage.getItem('dictData'));
    }
    return arr;
}

export {
    fetchData
}