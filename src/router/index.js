import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/Clzgl',
            component: () => import(/* webpackChunkName: "clzgl" */ '../components/clzgl/Clzgl.vue'),
            meta: { title: '材料组管理' }
        },
        {
            path: '/Clgl',
            component: () => import(/* webpackChunkName: "Clgl" */ '../components/clzgl/Clgl.vue'),
            meta: { title: '材料管理' }
        },
        {
            path: '/Dict',
            component: () => import(/* webpackChunkName: "Dict" */ '../components/dict/Dict.vue'),
            meta: { title: '数据字典管理' }
        },
        {
            path: '/logManage',
            component: () => import(/* webpackChunkName: "LogManage" */ '../components/log/LogManage.vue'),
            meta: { title: '日志管理' }
        },
        {
            path: '/shixlcglpz',
            component: () => import(/* webpackChunkName: "LogManage" */ '../components/sxqdgl/Shixlcglpz.vue'),
            meta: { title: '事项流程关联配置' }
        },
        // {
        //     path: '/xitgl',
        //     component: () => import(/* webpackChunkName: "xitgl" */ 'http://ez.jsnjwj.com/defaultroot/public/login/auto.html'),
        //     meta: { title: '系统管理' }
        // },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    // path: '/dashboard',
                    // component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    // meta: { title: '系统首页' }
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "wddb" */ '../components/fwmh/Shouy.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: '消息通知' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
                ,
                {
                    path: '/wddb',
                    component: () => import(/* webpackChunkName: "wddb" */ '../components/fwmh/Wddb.vue'),
                    meta: { title: '我的待办' }
                },
                {
                    path: '/wdsc',
                    component: () => import(/* webpackChunkName: "wdsc" */ '../components/fwmh/Wdsc.vue'),
                    meta: { title: '我的收藏' }
                },
                {
                    path: '/xxtx',
                    component: () => import(/* webpackChunkName: "xxtx" */ '../components/fwmh/Xxtx.vue'),
                    meta: { title: '消息提醒' }
                },
                // {
                //     path: '/ydd',
                //     component: () => import(/* webpackChunkName: "ydd" */ '../components/fwmh/Ydd.vue'),
                //     meta: { title: '移动端' }
                // },
                {
                    path: '/tzgg',
                    component: () => import(/* webpackChunkName: "tzgg" */ '../components/fwmh/Tzgg.vue'),
                    meta: { title: '通知公告' }
                },
                {
                    path: '/tjfx',
                    component: () => import(/* webpackChunkName: "tzgg" */ '../components/fwmh/Tjfx.vue'),
                    meta: { title: '统计分析' }
                },
                {
                    path: '/xtbz',
                    component: () => import(/* webpackChunkName: "xtbz" */ '../components/fwmh/Xtbz.vue'),
                    meta: { title: '系统帮助' }
                },
                {
                    path: '/zwfwsxcx',
                    component: () => import(/* webpackChunkName: "zwfwsxcx" */ '../components/sxqdgl/Zwfwsxcx.vue'),
                    meta: { title: '政务服务事项查询' }
                },
                {
                    path: '/ggfwsxcx',
                    component: () => import(/* webpackChunkName: "ggfwsxcx" */ '../components/sxqdgl/Ggfwsxcx.vue'),
                    meta: { title: '公共服务事项查询' }
                },
                {
                    path: '/sxbllcgl',
                    component: () => import(/* webpackChunkName: "sxbllcgl" */ '../components/sxqdgl/Sxbllcgl.vue'),
                    meta: { title: '事项办理流程管理' }
                },
                {
                    path: '/sxsbbdgl',
                    component: () => import(/* webpackChunkName: "sxsbbdgl" */ '../components/sxqdgl/Sxsbbdgl.vue'),
                    meta: { title: '事项申报表单管理' }
                },
                {
                    path: '/sxgswsgl',
                    component: () => import(/* webpackChunkName: "sxgswsgl" */ '../components/sxqdgl/Sxgswsgl.vue'),
                    meta: { title: '事项格式文书管理' }
                },
                {
                    path: '/sxdbfx',
                    component: () => import(/* webpackChunkName: "sxdbfx" */ '../components/sxqdgl/Sxdbfx.vue'),
                    meta: { title: '事项对比分析' }
                },
                {
                    path: '/lisjl',
                    component: () => import(/* webpackChunkName: "lisjl" */ '../components/sxqdgl/Lisjl.vue'),
                    meta: { title: '历史记录' }
                },
                {
                    path: '/xkdj',
                    component: () => import(/* webpackChunkName: "xkdj" */ '../components/yxgl/Xkdj.vue'),
                    meta: { title: '许可登记' }
                },{
                    path: '/yxwddb',
                    component: () => import(/* webpackChunkName: "yxwddb" */ '../components/yxgl/Yxwddb.vue'),
                    meta: { title: '我的待办' }
                },{
                    path: '/yxwdyb',
                    component: () => import(/* webpackChunkName: "yxwdyb" */ '../components/yxgl/Yxwdyb.vue'),
                    meta: { title: '我的已办' }
                },{
                    path: '/bjgz',
                    component: () => import(/* webpackChunkName: "bjgz" */ '../components/yxgl/Bjgz.vue'),
                    meta: { title: '办件跟踪' }
                },{
                    path: '/bjcx',
                    component: () => import(/* webpackChunkName: "bjcx" */ '../components/yxgl/Bjcx.vue'),
                    meta: { title: '办件查询' }
                },{
                    path: '/emscx',
                    component: () => import(/* webpackChunkName: "emscx" */ '../components/yxgl/Emscx.vue'),
                    meta: { title: 'EMS查询' }
                },{
                    path: '/zzcx',
                    component: () => import(/* webpackChunkName: "zzcx" */ '../components/yxgl/Zzcx.vue'),
                    meta: { title: '证照查询' }
                },{
                    path: '/jzgl',
                    component: () => import(/* webpackChunkName: "jzgl" */ '../components/yxgl/Jzgl.vue'),
                    meta: { title: '卷宗管理' }
                },
                {
                    path: '/djsl',
                    component: () => import(/* webpackChunkName: "djsl" */ '../components/yxgl/Xkdj.vue'),
                    meta: { title: '登记受理' }
                },
                // {
                //     path: '/frsfjy',
                //     component: () => import(/* webpackChunkName: "frsfjy" */ '../components/yxgl/Frsfjy.vue'),
                //     meta: { title: '法人身份校验' }
                // },
                // {
                //     path: '/zrrsfjy',
                //     component: () => import(/* webpackChunkName: "zrrsfjy" */ '../components/yxgl/Zrrsfjy.vue'),
                //     meta: { title: '自然人身份校验' }
                // },
                // {
                //     path: '/cs',
                //     component: () => import(/* webpackChunkName: "cs" */ '../components/yxgl/Cs.vue'),
                //     meta: { title: '初审' }
                // },
                // {
                //     path: '/jssc',
                //     component: () => import(/* webpackChunkName: "jssc" */ '../components/yxgl/Jssc.vue'),
                //     meta: { title: '技术审查' }
                // },
                // {
                //     path: '/pz',
                //     component: () => import(/* webpackChunkName: "pz" */ '../components/yxgl/Pz.vue'),
                //     meta: { title: '批准' }
                // },
                // {
                //     path: '/fhws',
                //     component: () => import(/* webpackChunkName: "fhws" */ '../components/yxgl/Fhws.vue'),
                //     meta: { title: '复核文书' }
                // },
                // {
                //     path: '/wsgzsd',
                //     component: () => import(/* webpackChunkName: "wsgzsd" */ '../components/yxgl/Wsgzsd.vue'),
                //     meta: { title: '文书盖章送达' }
                // },
                // {
                //     path: '/bjgz',
                //     component: () => import(/* webpackChunkName: "bjgz" */ '../components/yxgl/Bjgz.vue'),
                //     meta: { title: '办件跟踪' }
                // },
                // {
                //     path: '/xxcx',
                //     component: () => import(/* webpackChunkName: "xxcx" */ '../components/yxgl/Xxcx.vue'),
                //     meta: { title: '信息查询' }
                // },
                // {
                //     path: '/dagl',
                //     component: () => import(/* webpackChunkName: "dagl" */ '../components/yxgl/Dagl.vue'),
                //     meta: { title: '档案管理' }
                // },
                {
                    path: '/yxjk',
                    component: () => import(/* webpackChunkName: "yxjk" */ '../components/jdgl/Yxjk.vue'),
                    meta: { title: '运行监控' }
                },
                {
                    path: '/sxyj',
                    component: () => import(/* webpackChunkName: "sxyj" */ '../components/jdgl/Sxyj.vue'),
                    meta: { title: '预警报警' }
                },
                {
                    path: '/sjzljk',
                    component: () => import(/* webpackChunkName: "sjzljk" */ '../components/jdgl/Sjzljk.vue'),
                    meta: { title: '数据质量监控' }
                },
                {
                    path: '/zbdy',
                    component: () => import(/* webpackChunkName: "zbdy" */ '../components/fwpg/Zbdy.vue'),
                    meta: { title: '指标定义' }
                },
                {
                    path: '/zbkgl',
                    component: () => import(/* webpackChunkName: "zbkgl" */ '../components/fwpg/Zbkgl.vue'),
                    meta: { title: '指标库管理' }
                },
                {
                    path: '/zbfxyfw',
                    component: () => import(/* webpackChunkName: "zbfxyfw" */ '../components/fwpg/Zbfxyfw.vue'),
                    meta: { title: '指标分析与服务' }
                },
                {
                    path: '/sxqdtj',
                    component: () => import(/* webpackChunkName: "sxqdtj" */ '../components/sjtj/Sxqdtj.vue'),
                    meta: { title: '事项清单统计' },
                },
                {
                    path: '/wwsbltj',
                    component: () => import(/* webpackChunkName: "wwsbltj" */ '../components/sjtj/Wwsbltj.vue'),
                    meta: { title: '外网申报量统计' }
                },
                {
                    path: '/bjltj',
                    component: () => import(/* webpackChunkName: "bjltj" */ '../components/sjtj/Bjltj.vue'),
                    meta: { title: '办件量统计' }
                },
                {
                    path: '/dzzztj',
                    component: () => import(/* webpackChunkName: "dzzztj" */ '../components/sjtj/Dzzztj.vue'),
                    meta: { title: '电子证照统计' }
                },
                {
                    path: '/emssltj',
                    component: () => import(/* webpackChunkName: "emssltj" */ '../components/sjtj/Emssltj.vue'),
                    meta: { title: 'EMS数量统计' }
                },
                {
                    path: '/sjzltj',
                    component: () => import(/* webpackChunkName: "sjzltj" */ '../components/sjtj/Sjzltj.vue'),
                    meta: { title: '数据质量统计' }
                },
                // {
                //     path: '/jggl',
                //     component: () => import(/* webpackChunkName: "jggl" */ '../components/xtpz/Jggl.vue'),
                //     meta: { title: '机构管理' }
                // },
                // {
                //     path: '/yhgl',
                //     component: () => import(/* webpackChunkName: "yhgl" */ '../components/xtpz/Yhgl.vue'),
                //     meta: { title: '用户管理' }
                // },
                // {
                //     path: '/qxgl',
                //     component: () => import(/* webpackChunkName: "qxgl" */ '../components/xtpz/Qxgl.vue'),
                //     meta: { title: '权限管理' }
                // },
                // {
                //     path: '/szzdgl',
                //     component: () => import(/* webpackChunkName: "szzdgl" */ '../components/xtpz/Szzdgl.vue'),
                //     meta: { title: '数字字典管理' }
                // },
                // {
                //     path: '/gzlcgl',
                //     component: () => import(/* webpackChunkName: "gzlcgl" */ '../components/xtpz/Gzlcgl.vue'),
                //     meta: { title: '工作流程管理' }
                // },
                // {
                //     path: '/ywbdgl',
                //     component: () => import(/* webpackChunkName: "ywbdgl" */ '../components/xtpz/Ywbdgl.vue'),
                //     meta: { title: '业务表单管理' }
                // },
                // {
                //     path: '/wsmbgl',
                //     component: () => import(/* webpackChunkName: "wsmbgl" */ '../components/xtpz/Wsmbgl.vue'),
                //     meta: { title: '文书模板管理' }
                // },
                // {
                //     path: '/zzmbgl',
                //     component: () => import(/* webpackChunkName: "zzmbgl" */ '../components/xtpz/Zzmbgl.vue'),
                //     meta: { title: '证照模板管理' }
                // },
                // {
                //     path: '/clzzgl',
                //     component: () => import(/* webpackChunkName: "clzzgl" */ '../components/xtpz/Clzzgl.vue'),
                //     meta: { title: '材料组织管理' }
                // },
                // {
                //     path: '/rzgl',
                //     component: () => import(/* webpackChunkName: "rzgl" */ '../components/xtpz/Rzgl.vue'),
                //     meta: { title: '日志管理' }
                // }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
