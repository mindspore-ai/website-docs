let pathnames=location.pathname;
$(document).ready(function () {
    // 文档针对不同页面特殊处理为了加快效率，先从大块过滤掉不相关相关页面
    if(pathnames.includes('docs')&&pathnames.includes('note')){
        if(pathnames==='/docs/note/zh-CN/r1.3/network_list_ms.html'||pathnames==='/docs/note/en/r1.3/network_list_ms.html'){
            let dom=document.querySelector('#model-zoo');
            dom.remove();
            let domN=document.querySelector('.navRight .navList .navList2');
            domN.remove();
            if(pathnames.includes('zh-CN')){
                $('.wy-nav-content .rst-content .document').after(
                    `<p>请从Gitee获取<a href=" https://gitee.com/mindspore/docs/blob/r1.3/docs/mindspore/note/source_zh_cn/network_list_ms.md" target="_blank"> MindSpore网络支持列表</a>。</p>
                    <p>你也可以使用 <a href="https://gitee.com/mindspore/mindinsight/tree/r1.3/mindinsight/wizard/" target="_blank">MindWizard工具</a> 快速生成经典网络脚本。</p>`
                    );
            }else{
                $('.wy-nav-content .rst-content .document').after(
                    `<p>Please obtain the <a href="https://gitee.com/mindspore/docs/blob/r1.3/docs/mindspore/note/source_en/network_list_ms.md" target="_blank"> Network List</a> from Gitee.</p>
                    <p>You can also use <a href="https://gitee.com/mindspore/mindinsight/tree/r1.3/mindinsight/wizard/" target="_blank">MindWizard Tool</a> to quickly generate classic network scripts.</p>`
                    );
            }
        }
    }
    // mindspore文档页面宽度小于时，头部字体变小
    if(pathnames.includes('/docs/programming_guide')||
    pathnames.includes('/docs/migration_guide')||
    pathnames.includes('/docs/note/')||
    pathnames.includes('/docs/api/')||
    pathnames.includes('/docs/faq')||
    pathnames.includes('/docs/migration_guide')){
         // 页面宽度变小，mindspore文档页面头部太多选项卡换行问题
        setTimeout(() => {
            let domLinkDiv=document.querySelectorAll('.bottom .header-nav-link');
            let width=window.innerWidth;
            if(width<980){
                for(let i=0;i<domLinkDiv.length;i++){
                    domLinkDiv[i].style.setProperty('margin-right', '24px', 'important');
                    domLinkDiv[i].firstElementChild.style.setProperty('font-size', '0.7rem', 'important');
                }

            }else{
                for(let i=0;i<domLinkDiv.length;i++){
                    domLinkDiv[i].style.setProperty('margin-right', '40px', 'important');
                    domLinkDiv[i].firstElementChild.style.setProperty('font-size', '0.8rem', 'important');
                }
            }
            window.addEventListener('resize', function() {
                let width=window.innerWidth;
                if(width<980){
                    for(let i=0;i<domLinkDiv.length;i++){
                        domLinkDiv[i].style.setProperty('margin-right', '24px', 'important');
                        domLinkDiv[i].firstElementChild.style.setProperty('font-size', '0.7rem', 'important');
                    }
                }else{
                    for(let i=0;i<domLinkDiv.length;i++){
                        domLinkDiv[i].style.setProperty('margin-right', '40px', 'important');
                        domLinkDiv[i].firstElementChild.style.setProperty('font-size', '0.8rem', 'important');
                    }
                }
            });
        }, 1000);
    }




    // 文档公共处理




});

