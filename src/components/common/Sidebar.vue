<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu itemActiveBc"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#0A4F9C"
            text-color="#ffffff"
            active-text-color="#8ED6FD"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
import '@/assets/css/common.css';
export default {
    props:['headerTypeData'], // 用来接收父组件传给子组件的数据
    data() {
        return {
            headerType:'fwmh',
            collapse: true,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-lx-home',
                    index: 'wddb',
                    title: '我的待办'
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'wdsc',
                    title: '我的收藏'
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: 'xxtx',
                    title: '消息提醒'
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'tzgg',
                    title: '通知公告'
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: 'tjfx',
                    title: '统计分析'
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'xtbz',
                    title: '系统帮助'
                }
                /* {
                    icon: 'el-icon-lx-cascades',
                    index: 'table',
                    title: '基础表格'
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: 'tabs',
                    title: 'tab选项卡'
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '表单相关',
                    subs: [
                        {
                            index: 'form',
                            title: '基本表单'
                        },
                        {
                            index: '3-2',
                            title: '三级菜单',
                            subs: [
                                {
                                    index: 'editor',
                                    title: '富文本编辑器'
                                },
                                {
                                    index: 'markdown',
                                    title: 'markdown编辑器'
                                }
                            ]
                        },
                        {
                            index: 'upload',
                            title: '文件上传'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: 'icon',
                    title: '自定义图标'
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'charts',
                    title: 'schart图表'
                },
                {
                    icon: 'el-icon-rank',
                    index: '6',
                    title: '拖拽组件',
                    subs: [
                        {
                            index: 'drag',
                            title: '拖拽列表'
                        },
                        {
                            index: 'dialog',
                            title: '拖拽弹框'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-global',
                    index: 'i18n',
                    title: '国际化功能'
                },
                {
                    icon: 'el-icon-lx-warn',
                    index: '7',
                    title: '错误处理',
                    subs: [
                        {
                            index: 'permission',
                            title: '权限测试'
                        },
                        {
                            index: '404',
                            title: '404页面'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-redpacket_fill',
                    index: '/donate',
                    title: '支持作者'
                } */
            ]
        };
    },
    watch:{
        headerTypeData(){
            this.headerType = this.headerTypeData;
            if('fwmh' === this.headerType){
                this.items = [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'wddb',
                        title: '我的待办'
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'wdsc',
                        title: '我的收藏'
                    },
                    {
                        icon: 'el-icon-lx-copy',
                        index: 'xxtx',
                        title: '消息提醒'
                    },
                    {
                        icon: 'el-icon-pie-chart',
                        index: 'tzgg',
                        title: '通知公告'
                    },
                    {
                        icon: 'el-icon-lx-emoji',
                        index: 'tjfx',
                        title: '统计分析'
                    },
                    {
                        icon: 'el-icon-pie-chart',
                        index: 'xtbz',
                        title: '系统帮助'
                    }
                ]
            } else if('sxqdgl' === this.headerType){
                this.items = [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'zwfwsxcx',
                        title: '政务服务事项查询'
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'ggfwsxcx',
                        title: '公共服务事项查询'
                    },
                    {
                        icon: 'el-icon-lx-copy',
                        index: 'sxbllcgl',
                        title: '事项办理流程管理'
                    },
                    {
                        icon: 'el-icon-lx-emoji',
                        index: 'sxsbbdgl',
                        title: '事项申报表单管理'
                    },
                    {
                        icon: 'el-icon-pie-chart',
                        index: 'sxgswsgl',
                        title: '事项格式文书管理'
                    }
                ]
            } else if('yxgl' === this.headerType){
                this.items = [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'xkdj',
                        title: '许可登记'
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'yxgl',
                        title: '运行管理',
                        subs: [
                            {
                                icon: 'el-icon-lx-home',
                                index: 'djsl',
                                title: '登记受理'
                            },
                            {
                                icon: 'el-icon-lx-cascades',
                                index: 'frsfjy',
                                title: '法人身份校验'
                            },
                            {
                                icon: 'el-icon-lx-copy',
                                index: 'zrrsfjy',
                                title: '自然人身份校验'
                            },
                            {
                                icon: 'el-icon-lx-emoji',
                                index: 'cs',
                                title: '初审'
                            },
                            {
                                icon: 'el-icon-pie-chart',
                                index: 'jssc',
                                title: '技术审查'
                            },
                            {
                                icon: 'el-icon-lx-home',
                                index: 'pz',
                                title: '批准'
                            },
                            {
                                icon: 'el-icon-lx-cascades',
                                index: 'fhws',
                                title: '复核文书'
                            },
                            {
                                icon: 'el-icon-lx-copy',
                                index: 'wsgzsd',
                                title: '文书盖章送达'
                            },
                            {
                                icon: 'el-icon-lx-emoji',
                                index: 'bjgz',
                                title: '办件跟踪'
                            },
                            {
                                icon: 'el-icon-pie-chart',
                                index: 'xxcx',
                                title: '信息查询'
                            },
                            {
                                icon: 'el-icon-pie-chart',
                                index: 'dagl',
                                title: '档案管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-home',
                        index: 'yxwddb',
                        title: '我的待办'
                    },
                    {
                        icon: 'el-icon-lx-copy',
                        index: 'yxwdyb',
                        title: '我的已办'
                    },
                    {
                        icon: 'el-icon-lx-copy',
                        index: 'bjgz',
                        title: '办件跟踪'
                    },
                    {
                        icon: 'el-icon-lx-emoji',
                        index: 'bjcx',
                        title: '办件查询'
                    },
                    {
                        icon: 'el-icon-pie-chart',
                        index: 'emscx',
                        title: 'EMS查询'
                    },
                    {
                        icon: 'el-icon-lx-home',
                        index: 'zzcx',
                        title: '证照查询'
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'jzgl',
                        title: '卷宗管理'
                    }
                ]
            } else if('jdgl' === this.headerType){
                this.items = [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'yxjk',
                        title: '运行监控'
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'sxyj',
                        title: '预警报警'
                    },
                    {
                        icon: 'el-icon-pie-chart',
                        index: 'sjzljk',
                        title: '数据质量监控'
                    }
                ]
            } else if('fwpg' === this.headerType){
                this.items = [
                    // {
                    //     icon: 'el-icon-lx-home',
                    //     index: 'zbdy',
                    //     title: '指标定义'
                    // },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'zbkgl',
                        title: '指标库定义与管理'
                    },
                    {
                        icon: 'el-icon-pie-chart',
                        index: 'zbfxyfw',
                        title: '指标分析与服务'
                    }
                ]
            } else if('sjtj' === this.headerType){
                this.items = [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'sxqdtj',
                        title: '事项清单统计'
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'wwsbltj',
                        title: '外网申报量统计'
                    },
                    {
                        icon: 'el-icon-lx-copy',
                        index: 'bjltj',
                        title: '办件量统计'
                    },
                    {
                        icon: 'el-icon-lx-emoji',
                        index: 'dzzztj',
                        title: '电子证照统计'
                    },
                    {
                        icon: 'el-icon-pie-chart',
                        index: 'emssltj',
                        title: 'EMS数量统计'
                    },
                    {
                        icon: 'el-icon-pie-chart',
                        index: 'sjzltj',
                        title: '数据质量统计'
                    }
                ]
            } else if('xtpz' === this.headerType){
                this.items = [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'jggl',
                        title: '机构管理'
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'yhgl',
                        title: '用户管理'
                    },
                    {
                        icon: 'el-icon-lx-copy',
                        index: 'qxgl',
                        title: '权限管理'
                    },
                    {
                        icon: 'el-icon-lx-emoji',
                        index: 'szzdgl',
                        title: '数字字典管理'
                    },
                    {
                        icon: 'el-icon-pie-chart',
                        index: 'gzlcgl',
                        title: '工作流程管理'
                    },
                    {
                        icon: 'el-icon-lx-home',
                        index: 'ywbdgl',
                        title: '业务表单管理'
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'wsmbgl',
                        title: '文书模板管理'
                    },
                    {
                        icon: 'el-icon-lx-copy',
                        index: 'zzmbgl',
                        title: '证照模板管理'
                    },
                    {
                        icon: 'el-icon-lx-emoji',
                        index: 'clzzgl',
                        title: '材料组织管理'
                    },
                    {
                        icon: 'el-icon-pie-chart',
                        index: 'rzgl',
                        title: '日志管理'
                    }
                ]
            }

            
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
}
.sidebar > ul {
    height: 100%;
}
</style>
