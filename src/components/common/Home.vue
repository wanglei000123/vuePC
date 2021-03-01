<template>
    <div class="wrapper">
        <v-head @sidebarchange="sidebarComponent"></v-head>
        <v-sidebar  :headerTypeData="toHeaderType"></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}" :style="{'left':contentLeft}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: true,
            toHeaderType: 'fwmh',
            contentLeft: '0px',
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    methods: {
		sidebarComponent(type){
            this.toHeaderType = type;
            if('fwmh' != this.toHeaderType){
                if(this.collapse){
                    this.contentLeft = '65px';
                } else {
                    this.contentLeft = '200px';
                }
            } else {
                this.contentLeft = '200px';
               // this.contentLeft = '0px';
            }
        }
	},
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
            if(this.collapse){
                this.contentLeft = '65px';
            } else {
                this.contentLeft = '200px';
                // if('fwmh' != this.toHeaderType){
                //     this.contentLeft = '200px';
                // }
            }
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    },
};
</script>
