var arrData = [{
    "id": 1,
    "shixlb": "占用、挖掘公路、公路用地或者使公路改线审批(因修建铁路、机场、供电、水利、通信等建设工程需要使公路改线的（高速公路）",
    "cailzmc": "占用、挖掘公路、公路用地或者使公路改线审批材料组",
    "zhuangt":"启用",
    "status": true
},{
    "id": 2,
    "shixlb": "网约车平台公司线上服务能力认定",
    "cailzmc": "网约车平台公司线上服务能力认定材料组",
    "zhuangt":"启用",
    "status": true
},{
    "id": 3,
    "shixlb": "对路产损失调查处理",
    "cailzmc": "对路产损失调查处理材料组",
    "zhuangt":"启用",
    "status": true
},{
    "id": 4,
    "shixlb": "船用产品法定检验",
    "cailzmc": "船用产品法定检验材料组",
    "zhuangt":"启用",
    "status": true
},{
    "id": 5,
    "shixlb": "变更企业法定代表人或者办公地点备案",
    "cailzmc": "变更企业法定代表人或者办公地点备案材料组",
    "zhuangt":"启用",
    "status": true
},{
    "id": 6,
    "shixlb": "道路运输服务质量投诉调解",
    "cailzmc": "道路运输服务质量投诉调解材料组",
    "zhuangt":"启用",
    "status": true
},{
    "id": 7,
    "shixlb": "客运标志牌",
    "cailzmc": "客运标志牌材料组",
    "zhuangt":"启用",
    "status": true
},{
    "id": 8,
    "shixlb": "临时客运标志牌发放",
    "cailzmc": "临时客运标志牌发放材料组",
    "zhuangt":"禁用",
    "status": false
},{
    "id": 9,
    "shixlb": "收费公路的鉴定和验收",
    "cailzmc": "收费公路的鉴定和验收材料组",
    "zhuangt":"启用",
    "status": true
}
];

function fetchData() {
    var arr = JSON.parse(localStorage.getItem('arrData'));
    if (arr == null || arr.length == 0) {
        localStorage.setItem('arrData', JSON.stringify(arrData));
        arr = JSON.parse(localStorage.getItem('arrData'));
    }
    return arr;
}

export {
    fetchData
}