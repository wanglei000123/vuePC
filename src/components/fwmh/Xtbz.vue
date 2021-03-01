<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 服务门户
                </el-breadcrumb-item>
                <el-breadcrumb-item>系统帮助</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="main-text" style="line-height:34px;">
                <p><span style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                        class="Apple-style-span">　　<span class="Apple-style-span"
                            style="font-weight: bold;">网站定位</span>&nbsp;</span></p>
                <p style="margin: 20px 0px 20px 0px;"><span
                        style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                        class="Apple-style-span">　　为贯彻落实党中央、国务院决策部署，把简政放权、放管结合、优化服务改革推向纵深，江苏委、政府高度重视“互联网+政务服务”工作，政府办公厅结合我“不见面审批（服务）”改革实际，提出《进一步推进“互联网+政务服务”深化“不见面审批（服务）”改革工作方案》（苏政办发〔2018〕96号，以下简称《工作方案》），要求依托江苏政务服务网，加快构建一体化网上政务服务体系，推进跨层级、跨地域、跨系统、跨部门、跨业务的协同管理和服务，推动企业和群众办事线上“一网通办”，线下“只进一扇门”，在更高层次实现“不见面审批（服务）”，更大程度的利企便民。</span>
                </p>

                <p><span style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                        class="Apple-style-span">　　<span class="Apple-style-span"
                            style="font-weight: bold;">常见问题</span>&nbsp;</span></p>
                <p style="margin: 20px 0px 10px 0px;"><span
                        style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                        class="Apple-style-span">　　1、什么样的浏览器及界面分辨率可以满足浏览需求？</span></p>
                <p><span style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                        class="Apple-style-span">　　本站建议使用IE9.0及以上浏览器，1024×768分辨率进行浏览。</span></p>
                <p style="margin: 20px 0px 10px 0px;"><span style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                        class="Apple-style-span">　　2、如何检索本站的信息？</span></p>
                <p><span style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                        class="Apple-style-span">　　您只需要在本站网页右上角的搜索框内输入关键词（默认支持标题、全文检索），点击“搜索”按钮，即可实现检索。获得更多检索帮助，请点击检索区域内的“高级”按钮，可以根据时间、排序方式、标题、正文、关键字等多个维度进行精确检索。</span>
                </p>
                <p style="margin: 20px 0px 10px 0px;"><span style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                        class="Apple-style-span">　　3、如何订阅网站信息服务？</span></p>
                <p><span style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                        class="Apple-style-span">　　人民政府金融工作办公室门户网站提供RSS订阅、邮件订阅等个性化定制服务，方便您及时了解和查询政府及各部门的政务信息和办事、便民服务信息。</span>
                </p>
                <p style="margin: 20px 0px 10px 0px;"><span style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                        class="Apple-style-span">　　4、浏览网页时怎样调整字号的大小？</span></p>
                <p><span style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                        class="Apple-style-span">　　本门户网站浏览页面提供不同字号大小的浏览方式。进入浏览页面后，您可以点击正文标题正下方的“字体：[大][中][小]”，对字体的浏览大小进行调整。</span>
                </p>
                <p style="margin: 20px 0px 10px 0px;"><span style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                        class="Apple-style-span">　　5、浏览时页面出现乱码如何处理？</span></p>
                <p><span style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                        class="Apple-style-span">　　在浏览网页时如出现乱码，您可以检查浏览器（以IE为例）设置，“查看—&gt;编码”，选择“简体中文GB2312”。</span></p>
                <p style="margin: 20px 0px 10px 0px;"><span style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                        class="Apple-style-span">　　6、访问网站时部分FLASH、图片无法加载或者显示不全如何处理？</span></p>
                <p><span style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                        class="Apple-style-span">　　请确保您的电脑上已经下载并安装最新的flash player。如果flash
                        player安装不成功，建议把浏览器的安全级别调低，允许ActiveX控件和弹出窗口，禁用或删除IE插件或者拦截窗口再下载安装flash
                        player。同时在浏览器中删除脱机文件和缓存文件，重新刷新网页。具体方法为：①打开IE。在“工具”菜单上，单击“Internet&nbsp;选项”。②在弹出窗口中，单击“常规”选项卡，在“Internet&nbsp;临时文件”下。单击“删除文件”。③然后在弹出窗口中，钩选“删除所有脱机文件”。单击“确定”。④单击“删除&nbsp;Cookies”。</span>
                </p>
                <p style="margin: 20px 0px 10px 0px;"><span style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                        class="Apple-style-span">　　7、对网站的使用有意见和建议如何与我们进行联系？</span></p><span
                    style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                    class="Apple-style-span">　　您如果在访问网站的过程中遇到问题或有任何建议，请发送邮件到技术支持人员信箱，</span><span
                    style="font-size:10.5pt;font-family:'Calibri','sans-serif';" class="Apple-style-span"><a
                        href="mailto:jrb@shenzhen.gov.cn" _xhe_href="mailto:jrb@shenzhen.gov.cn"><span
                            style="font-family:'微软雅黑','sans-serif';color:#333333;"
                            class="Apple-style-span">2337681593@</span></a></span><span
                    style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                    class="Apple-style-span">qq.com</span><span
                    style="font-size:10.5pt;font-family:'微软雅黑','sans-serif';color:#333333;"
                    class="Apple-style-span">。还可以通过网站纠错页面将您的宝贵意见反馈给我们，我们将努力为您提供满意的服务。</span><br>
                <br>
                <a href="../msgFile/"></a>
            </div>
        </div>

    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        name: 'xtbz',
        data() {
            return {
                message: 'first',
            };
        },
        components: {
        },
        methods: {
        }
    };
</script>


<style scoped>

</style>