/* 公共js包含：教程 文档 api */
// 添加共用js，针对文档内容的特殊化处理
var oHead = document.getElementsByTagName('HEAD').item(0);
let sensors_origin=location.origin;
let jsScript1 = document.createElement('script');
let jsScript2 = document.createElement('script');
let jsScript3 = document.createElement('script');
jsScript1.src=`${location.protocol === 'https:' ? 'https:' : 'http:'}//pv.sohu.com/cityjson?ie=utf-8`;
jsScript2.src=sensors_origin + '/allow_sensor/sensorsdata.min.js';
jsScript3.src=sensors_origin + '/allow_sensor/sensors.js';
oHead.appendChild(jsScript1);
oHead.appendChild(jsScript2);
setTimeout(() => {
    oHead.appendChild(jsScript3);
});
$(document).ready(function () {
    // 文档教程搜索埋点记录
    function getSearchKey() {
        var params = $.getQueryParameters();
        if (params.q) {
            startSensor(params.q[0], 5);
        }
    }
    function startSensor(search_key, num) {
        if(!num) {
            return;
        }
        if (window['sensorsCustomBuriedData']) {
            searchBuriedData(search_key);
        } else {
            num--;
            setTimeout(() => {
                // 若是一开始没有值，则重试
                startSensor(search_key, num);
            }, 2000);
        }
    }
    function searchBuriedData(search_key) {
        if (window['sensorsCustomBuriedData']) {
            const search_event_id = `${search_key}${new Date().getTime()}${window['sensorsCustomBuriedData'].ip || ''}`;
            const obj = {
                search_key,
                search_event_id
            };
            window['addSearchBuriedData'] = obj;
            let sensors = window['sensorsDataAnalytic201505'];
            if (sensors) {
                sensors.setProfile({
                    profileType: 'searchValue',
                    ...(window['sensorsCustomBuriedData'] || {}),
                    ...(window['addSearchBuriedData'] || {})
                });
                selectBuriedData();
            }
        }
    }
    // 选中文档埋点
    function selectBuriedData() {
        const data = $('#search-results > .search > li > a');
        if (data.length) {
            data.each((index, item) => {
                $(item).on('click', function(e) {
                    let sensors = window['sensorsDataAnalytic201505'];
                    let search_tag = '';
                    if(location.pathname.includes('tutorial')) {
                        search_tag = 'tutorial';
                    } else if (location.pathname.includes('docs')) {
                        search_tag = 'docs';
                    }
                    const searchKeyObj = {
                        search_tag,
                        search_rank_num: index + 1,
                        search_result_total_num: data.length,
                        search_result_url: e.currentTarget.href
                    };
                    sensors.setProfile({
                        profileType: 'selectSearchResult',
                        ...(window['sensorsCustomBuriedData'] || {}),
                        ...(window['addSearchBuriedData'] || {}),
                        ...searchKeyObj
                    });
                });
            });
        }
    }
    getSearchKey();

    // 进入页面调整到锚点,解决中文锚点问题，中文锚点需要转码
    function gotoId(){
        let url = window.location.toString();//进这个页面的url
        let id = window.decodeURIComponent(url.split('#')[1]);//中文id需要转码，英文id走catch error
        if(id){
            if(document.querySelector(`#${id}`)!==null){
                document.querySelector(`#${id}`).scrollIntoView(true);
            }
        }
    }
    try {
        setTimeout(() => {
            gotoId();
        }, 100);

    } catch (error) {}
    let host = window.location.href;
    const pathname = window.location.pathname;
    // 统一修改title
    let tit = $('title');
    tit.text('MindSpore');

    // 解决公式显示问题
    let emList = $('p>em');
    if(emList && emList.length > 0) {
        for (let i = 0; i < emList.length; i++) {
            if (emList[i].parentNode && emList[i].parentNode.innerHTML.indexOf('$') != -1) {
                emList[i].parentNode.innerHTML = emList[i].parentNode.innerText;
            }
        }
    }

    // 说明样式调整
    if (pathname && pathname.indexOf('/design/introduction') != -1) {
        let blockquoteList = $('blockquote');
        blockquoteList.addClass('noteStyle');
    }

    //隐藏内容里面的toc
    // 当p标签里有文本时，不隐藏；仅存在a标签时才隐藏
    let accessable = true;
    $('.section>h1').siblings('ul.simple').first().find('li>p').each(function (idx, pElm) {
        let obj = $(pElm).clone();
        obj.find(':nth-child(n)').remove();
        if (obj.text().length) {
            accessable = false;
        }
        if (!accessable) {
            return;
        }
    });
    if (accessable) {
        $('.section>h1').siblings('ul.simple').first().css('display', 'none');
    }

    // 跳转到外部python页面
    // $('.rst-content a').on('click', function (e) {
    //     let url = e.currentTarget.href;
    //     if (url.indexOf('http') != -1 && url.indexOf('/docs/zh-CN/') === -1 && url.indexOf('/docs/en/') === -1) {
    //         e.currentTarget.target = '_blank';
    //     }
    // })

    let isLite, isDocs, isAPI, isTutorial, mun, searchParams, paramsPath, title, navPath, lang, language, more, enPath, searchUrl, tutorial, docs, install, community, governance, developer, recruit, news, security,
        code, helpforyou,
        searchPlaceholder,
        askQuestion,
        askQuestionHref,
        askQuestion3,
        askQuestion2,
        askQuestionInfo,
        askQuestionInfo2,
        helpfor1, helpfor2, helpfor3, helpfor4, helpfor5, terms, privacy, copyRight, forum, forumPath, lite,
        liteDocs,
        tutorialTraining,
        tutorialInference,
        docsGuide,
        docsMigrationGuide,
        docsPython,
        docsC,
        docsNote,
        docsFaq,
        liteSummary,
        liteExamples,
        liteModels,
        isDocsCurrent,
        isAPICurrent,
        license,
        largeModel;
    isLite = false;
    isDocs = host.indexOf('/doc/') !== -1;

    // isAPI = true;
    // isAPICurrent = 'mindspore';
    isDocs = false;
    isDocsCurrent = 'mindspore';


    if(pathname.includes('/lite/') || (pathname.includes('/graphlearning/') && pathname.includes('/r0.1/') )){
      isLite = true;
    }

    if(isLite || isDocs ){
        if(!(window.location.href.includes('/r1.2/') || window.location.href.includes('/r1.1/') || window.location.href.includes('/r1.0/'))){
            setTimeout(() => {
                $('.wy-body-for-nav').eq(0).addClass('lite-body');
                $('body').eq(0).addClass('lite-body');
            });
        }
    }

    if( host.indexOf('/docs/programming_guide') !== -1
    ) {
        navPath = 'docs/programming_guide';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(1).children('a').addClass('selected');
        });
    }

    if(
        host.indexOf('/doc/programming_guide') !== -1
    ) {
        navPath = 'doc/programming_guide';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(1).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/docs/migration_guide') !== -1&& host.indexOf('api_mapping') == -1
    ) {
        navPath = 'docs/migration_guide';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(2).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/docs/note') !== -1
    ) {
        navPath = 'docs/note';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(3).children('a').addClass('selected');
        });
    }

    // if( host.indexOf('/docs/zh-CN') !== -1 ||  host.indexOf('/docs/en') !== -1
    // ) {
    //     navPath = 'docs';
    //     setTimeout(() => {
    //         $('.header-wapper-docs .header-nav-link').eq(3).children('a').addClass('selected');
    //     })
    // }

    if( host.indexOf('/docs/api') !== -1
    ) {
        navPath = 'docs/api';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(4).children('a').addClass('selected');
        });
    }

    if(
        host.indexOf('/doc/api') !== -1
    ) {
        navPath = 'doc/api';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(4).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/docs/faq') !== -1
    ) {
        navPath = 'docs/faq';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(5).children('a').addClass('selected');
        });
    }
    if(
        host.indexOf('/doc/faq/zh-CN/r1.2/index.html') !== -1 ||
        host.indexOf('/doc/faq/en/r1.2/index.html') !== -1
    ) {
        navPath = 'doc/faq';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(5).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/lite/docs/zh-CN/r1.3/use/downloads.html') !== -1 ||
        host.indexOf('/lite/docs/en/r1.3/use/downloads.html') !== -1
    ) {
        navPath = 'lite/docs';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(1).children('a').addClass('selected');
        });
    } else if(host.includes('/lite/docs/')) {
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(2).children('a').addClass('selected');
        });
    }

    if(
        host.indexOf('/tutorial/lite') !== -1
    ) {
        navPath = 'tutorial/lite';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(8).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/lite/api') !== -1
    ) {
        navPath = 'lite/api';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(3).children('a').addClass('selected');
        });
    }

    if(
        host.indexOf('/doc/api_cpp') !== -1
    ) {
        navPath = 'doc/api_cpp';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(9).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/lite/faq') !== -1
    ) {
        navPath = 'lite/faq';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(4).children('a').addClass('selected');
        });
    }

    if(
        host.indexOf('/doc/faq/zh-CN/r1.2/mindspore_lite.html') !== -1 ||
        host.indexOf('/doc/faq/en/r1.2/mindspore_lite.html') !== -1
    ) {
        navPath = 'doc/faq';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(10).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/mindinsight/docs') !== -1
    ) {
        navPath = 'mindinsight/docs';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(1).children('a').addClass('selected');
        });
    }

    if(
        host.indexOf('/tutorial/training') !== -1
    ) {
        navPath = 'tutorial/training';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(14).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/mindinsight/faq') !== -1
    ) {
        navPath = 'mindinsight/faq';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(2).children('a').addClass('selected');
        });
    }

    if(
        host.indexOf('/doc/faq/zh-CN/r1.2/mindinsight_use.html') !== -1 ||
        host.indexOf('/doc/faq/en/r1.2/mindinsight_use.html') !== -1
    ) {
        navPath = 'doc/faq';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(15).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/hub/docs') !== -1
    ) {
        navPath = 'hub/docs';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(1).children('a').addClass('selected');
        });
    }

    if(
        host.indexOf('/tutorial/training/zh-CN/r1.2/use/load_model_for_inference_and_transfer.html#hub') !== -1 ||
        host.indexOf('/tutorial/training/en/r1.2/use/load_model_for_inference_and_transfer.html#hub') !== -1
    ) {
        navPath = 'tutorial/training';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(17).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/hub/api') !== -1
    ) {
        navPath = 'hub/api';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(2).children('a').addClass('selected');
        });
    }

    if(
        host.indexOf('/doc/api_python') !== -1 ||
        host.indexOf('/doc/api_python/zh-CN/r1.2/mindspore_hub/mindspore_hub.html') !== -1 ||
        host.indexOf('/doc/api_python/en/r1.2/mindspore_hub/mindspore_hub.html') !== -1
    ) {
        navPath = 'doc/api_python';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(18).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/mindarmour/docs') !== -1
    ) {
        navPath = 'mindarmour/docs';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(1).children('a').addClass('selected');
        });
    }

    if(
        host.indexOf('/tutorial/training/zh-CN/r1.2/advanced_use/improve_model_security_nad.html') !== -1 ||
        host.indexOf('/tutorial/training/en/r1.2/advanced_use/improve_model_security_nad.html') !== -1
    ) {
        navPath = 'tutorial/training';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(21).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/mindarmour/api') !== -1
    ) {
        navPath = 'mindarmour/api';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(2).children('a').addClass('selected');
        });
    }

    if(
        host.indexOf('/doc/api_python/zh-CN/r1.2/mindarmour/mindarmour.html') !== -1 ||
        host.indexOf('/doc/api_python/en/r1.2/mindarmour/mindarmour.html') !== -1
    ) {
        navPath = 'doc/api_python';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(22).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/mindarmour/faq') !== -1
    ) {
        navPath = 'mindarmour/faq';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(3).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/federated/docs') !== -1
    ) {
        navPath = 'federated/docs';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(1).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/federated/api') !== -1
    ) {
        navPath = 'federated/api';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(2).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/serving/docs') !== -1
    ) {
        navPath = 'serving/docs';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(1).children('a').addClass('selected');
        });
    }

    if(
        host.indexOf('/tutorial/inference/zh-CN/r1.2/serving_example.html') !== -1 ||
        host.indexOf('/tutorial/inference/en/r1.2/serving_example.html') !== -1
    ) {
        navPath = 'tutorial/inference';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(28).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/serving/api') !== -1
    ) {
        navPath = 'serving/api';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(2).children('a').addClass('selected');
        });
    }

    if(
        host.indexOf('/doc/api_python/zh-CN/r1.2/mindspore_serving/mindspore_serving.html') !== -1 ||
        host.indexOf('/doc/api_python/en/r1.2/mindspore_serving/mindspore_serving.html') !== -1
    ) {
        navPath = 'doc/api_python';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(29).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/serving/faq') !== -1
    ) {
        navPath = 'serving/faq';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(3).children('a').addClass('selected');
        });
    }

    if(
        host.indexOf('/doc/faq/zh-CN/r1.2/mindspore_serving.html') !== -1 ||
        host.indexOf('/doc/faq/en/r1.2/mindspore_serving.html') !== -1
    ) {
        navPath = 'doc/faq';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(31).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/probability/docs') !== -1
    ) {
        navPath = 'probability/docs';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(1).children('a').addClass('selected');
        });
    }

    if(
        host.indexOf('/tutorial/training/zh-CN/r1.2/advanced_use/apply_deep_probability_programming.html') !== -1 ||
        host.indexOf('/tutorial/training/en/r1.2/advanced_use/apply_deep_probability_programming.html') !== -1
    ) {
        navPath = 'tutorial/training';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(32).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/probability/api') !== -1
    ) {
        navPath = 'probability/api';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(2).children('a').addClass('selected');
        });
    }

    if(
        host.indexOf('/doc/api_python/zh-CN/r1.2/mindspore/mindspore.nn.probability.html') !== -1 ||
        host.indexOf('/doc/api_python/en/r1.2/mindspore/mindspore.nn.probability.html') !== -1
    ) {
        navPath = 'doc/api_python';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(33).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/mindquantum/docs') !== -1) {
        navPath = 'mindquantum/docs';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(1).children('a').addClass('selected');
        });
    }
    if(
        host.indexOf('/tutorial/training/zh-CN/r1.2/advanced_use/implement_high_order_differentiation.html') !== -1 ||
        host.indexOf('/tutorial/training/en/r1.2/advanced_use/implement_high_order_differentiation.html') !== -1
    ) {
        navPath = 'tutorial/training';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(36).children('a').addClass('selected');
        });
    }

    if( host.indexOf('/mindquantum/api') !== -1 ) {
        navPath = 'mindquantum/api';
        setTimeout(() => {
            $('.display-flex .header-nav-link').eq(2).children('a').addClass('selected');
        });
    }

    if(
        host.indexOf('/doc/api_python/zh-CN/r1.2/mindquantum/mindquantum.html') !== -1 ||
        host.indexOf('/doc/api_python/en/r1.2/mindquantum/mindquantum.html') !== -1
    ) {
        navPath = 'doc/api_python';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(36).children('a').addClass('selected');
        });
    }
    if(host.indexOf('api_mapping') !== -1){
        navPath = 'docs/migration_guide';
        setTimeout(() => {
            $('.header-wapper-docs .header-nav-link').eq(2).children('a').removeClass('selected');
            $('.header-wapper-docs .header-nav-link').eq(6).children('a').addClass('selected');
        },100);
    }

    if(
        host.indexOf('/tutorials') !== -1
    ) {
        navPath = 'tutorials';
    }

    if(host.indexOf('/mindscience/api/') !== -1){
        navPath = 'mindscience/api';
    }
    if(host.indexOf('/reinforcement/api/') !== -1){
        navPath = 'reinforcement/api';
    }
    if(host.indexOf('/graphlearning/api/') !== -1){
        navPath = 'graphlearning/api';
    }
    if(host.indexOf('/mindscience/docs/') !== -1){
        navPath = 'mindscience/docs';
    }
    if(host.indexOf('/xai/docs/') !== -1){
        navPath = 'xai/docs';
    }
    if(host.indexOf('/xai/api/') !== -1){
        navPath = 'xai/api';
    }


    // 匹配1.2版本以上的内容，用正则表达式，mindspore、lite、hub...每个类型api反馈链接地址不一样
    let pattMindspore=/\/docs\/api\/.*\/.*\/.*/,
        pattLite=/\/lite\/api\/.*\/.*\/.*/,
        pattHub=/\/hub\/api\/.*\/.*\/.*/,
        pattMindarmour=/\/mindarmour\/api\/.*\/.*\/.*/,
        pattFederated=/\/federated\/api\/.*\/.*\/.*/,
        pattServing=/\/serving\/api\/.*\/.*\/.*/,
        pattProbability=/\/probability\/api\/.*\/.*\/.*/,
        pattMindquantum=/\/mindquantum\/api\/.*\/.*\/.*/,
        pattXia=/\/xai\/api\/.*\/.*\/.*/,
        pattMindscience=/\/mindscience\/api\/.*\/.*\/.*/,
        pattReinforcement=/\/reinforcement\/api\/.*\/.*\/.*/,
        pattMindinsight=/\/mindinsight\/api\/.*\/.*\/.*/;
    askQuestionHref = 'https://gitee.com/mindspore/docs/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0';
    if ( pattMindspore.test(host) ||
         host.indexOf('/doc/api_python/zh-CN/r1.2/index.html') > -1 ||
         host.indexOf('/doc/api_python/en/r1.2/index.html') > -1
    ) {
        askQuestionHref = 'https://gitee.com/mindspore/mindspore/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0';
    } else if ( pattLite.test(host) ||
                host.indexOf('/doc/api_cpp/zh-CN/r1.2/index.html') > -1 ||
                host.indexOf('/doc/api_cpp/en/r1.2/index.html') > -1
    ) {
        askQuestionHref = 'https://gitee.com/mindspore/docs/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0';
    } else if ( pattHub.test(host) ||
                host.indexOf('/doc/api_python/zh-CN/r1.2/mindspore_hub/mindspore_hub.html') > -1 ||
                host.indexOf('/doc/api_python/en/r1.2/mindspore_hub/mindspore_hub.html') > -1
    ) {
        askQuestionHref = 'https://gitee.com/mindspore/hub/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0';
    } else if ( pattMindarmour.test(host) ||
                host.indexOf('/doc/api_python/zh-CN/r1.2/mindarmour/mindarmour.html') > -1 ||
                host.indexOf('/doc/api_python/en/r1.2/mindarmour/mindarmour.html') > -1
    ) {
        askQuestionHref = 'https://gitee.com/mindspore/mindarmour/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0';
    } else if (pattFederated.test(host)
    ) {
        askQuestionHref = 'https://gitee.com/mindspore/docs/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0';
    } else if ( pattServing.test(host) ||
                host.indexOf('/doc/api_python/zh-CN/r1.2/mindspore_serving/mindspore_serving.html') > -1 ||
                host.indexOf('/doc/api_python/en/r1.2/mindspore_serving/mindspore_serving.html') > -1
    ) {
        askQuestionHref = 'https://gitee.com/mindspore/serving/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0';
    } else if ( pattProbability.test(host) ||
                host.indexOf('/doc/api_python/zh-CN/r1.2/mindspore/mindspore.nn.probability.html') > -1 ||
                host.indexOf('/doc/api_python/en/r1.2/mindspore/mindspore.nn.probability.html') > -1
    ) {
        askQuestionHref = 'https://gitee.com/mindspore/mindspore/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0';
    } else if ( pattMindquantum.test(host) ||
                host.indexOf('/doc/api_python/zh-CN/r1.2/mindquantum/mindquantum.html') > -1 ||
                host.indexOf('/doc/api_python/en/r1.2/mindquantum/mindquantum.html') > -1
    ) {
        askQuestionHref = 'https://gitee.com/mindspore/mindquantum/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0';
    } else if(pattXia.test(host)){
        askQuestionHref = 'https://gitee.com/mindspore/xai/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0';
    } else if(pattMindscience.test(host)){
        askQuestionHref = 'https://gitee.com/mindspore/mindscience/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0';
    } else if(pattReinforcement.test(host)){
        askQuestionHref = 'https://gitee.com/mindspore/reinforcement/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0';
    }else if(pattMindinsight.test(host)){
        askQuestionHref ='https://gitee.com/mindspore/mindinsight/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0';
    }else {
        askQuestionHref = 'https://gitee.com/mindspore/docs/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0';
    }


    // 当前版本
    let currentVersion = 'master';
    if(pathname.startsWith('/docs/') || pathname.startsWith('/tutorials/zh-CN/') || pathname.startsWith('/tutorials/en/')){
      currentVersion = pathname.split('/')[3];
    }else{
      currentVersion = pathname.split('/')[4];
    }
    if (host.indexOf('master') !== -1) {
        title = 'master';
    } else if (host.indexOf('r0.5') !== -1) {
        title = 'r0.5';
    } else if (host.indexOf('r0.6') !== -1) {
        title = 'r0.6';
    } else if (host.indexOf('r0.7') !== -1) {
        title = 'r0.7';
    } else if (host.indexOf('r1.0') !== -1) {
        title = 'r1.0';
    } else if (host.indexOf('r1.1') !== -1) {
        title = 'r1.1';
    } else if (host.indexOf('r1.2') !== -1) {
        title = 'r1.2';
    } else if (host.indexOf('r0.3') !== -1) {
        title = 'r0.3';
    } else if (host.indexOf('r0.2') !== -1) {
        title = 'r0.2';
    } else if (host.indexOf('r0.1') !== -1) {
        title = 'r0.1';
    } else if (host.indexOf('r1.3') !== -1)  {
        title = 'r1.3';
    } else if (host.indexOf('r1.5') !== -1)  {
        title = 'r1.5';
    } else if (host.indexOf('r1.6') !== -1)  {
      title = 'r1.6';
    } else if (host.indexOf('r1.7') !== -1)  {
      title = 'r1.7';
    } else if (host.indexOf('r1.8') !== -1)  {
      title = 'r1.8';
    } else if (host.indexOf('r1.9') !== -1)  {
      title = 'r1.9';
    }else if (host.indexOf('r1.10') !== -1)  {
      title = 'r1.10';
    }else if (host.indexOf('r0.8') !== -1)  {
      title = 'r0.8';
    }else {
      title = currentVersion;
    }

    if (host.indexOf('/en/') !== -1) {
        searchPlaceholder = 'Site-wide search';
        lang = 'en';
        enPath = 'en';
        searchUrl = '/search/en';
        more = 'More';
        tutorial = 'Tutorials';
        docs = 'Docs';
        install = 'Install';
        community = 'Community';
        governance = 'Governance';
        developer = 'Developer';
        communityActivities = 'Community Activities';
        communityStatistical = 'Statistics';
        recruit = '';
        news = 'News';
        newsVersionRelease = '';
        newsTechnologyBlog = '';
        newsActivities = '';
        newsShowroom = '';
        newsNews = '';
        security = 'Security';
        askQuestion3 = 'Document Feedback';
        askQuestion2 = 'Quick Feedback';
        askQuestionInfo = 'Click here to commit an issue in the code repository. Describe the issue in the template. We will follow up on it.';
        askQuestionInfo2 = 'Remember to add the tag below:';
        lite = 'MindSpore Lite';
        liteDocs = 'Tutorials&Docs';
        tutorialPrimary = 'Quick Start';
        tutorialTraining = 'Training ';
        tutorialInference = 'Inference';
        docsGuide = 'Programming Guide';
        docsMigrationGuide = 'Migration Guide';
        docsPython = 'Python API';
        docsJava = 'Java API';
        docsC = 'C++ API';
        docsNote = 'Specification and Notes';
        docsFaq = 'FAQ';
        liteSummary = 'Overview';
        newsVersionRelease='Version Releases';
        newsTechnologyBlog='Blogs';
        newsNews='News';
        newsActivities='Activities';
        contributionGuide='Contribution Guide';
        internship='Internship';
        msg='MSG';
        liteDownloads = 'Downloads';
        liteExamples = 'Examples';
        liteModels = 'Models';
        resource = 'Resources';
        courses = 'Courses & Certification';
        cases = '';
        papers = '';
        competitions = '';
        knowledgeMap = 'Knowledge Map';
        code = 'Code';
        language = '中';
        helpforyou = 'Was this helpful?';
        askQuestion = 'Ask questions in Ascend Forum';
        helpfor1 = 'Not helpful';
        helpfor2 = 'Somewhat helpful';
        helpfor3 = 'Helpful';
        helpfor4 = 'Very helpful';
        helpfor5 = 'Totally helpful';
        terms = 'Terms of Use';
        privacy = 'Privacy Policy';
        enHide = 'enHide';
        copyRight = 'Copyright©MindSpore 2022';
        forum = 'Ascend Forum';
        forumName = 'Forum';
        forumPath = 'https://forum.huawei.com/enterprise/en/forum-100504.html';
        docsMindSpore = 'MindSpore';
        docsMindSporeLite = 'MindSpore Lite';
        docsMindInsight = 'MindInsight';
        docsMindSporeHub = 'MindSpore Hub';
        docsMindArmour = 'MindArmour';
        docsMindSporeFederated = 'MindSpore Federated';
        docsMindSporeServing = 'MindSpore Serving';
        docsProbability = 'MindSpore Probability';
        docsMindQuantum = 'MindQuantum';
        ecosystemTools = 'Ecosystem Tools';
        cuttingEdgeTechnologies = 'Cutting-Edge Technologies';
        license = 'The content of this page is licensed under the<a target=\'_blank\' href=\'https://creativecommons.org/licenses/by/4.0/\'> Creative Commons Attribution 4.0 License</a>, and code samples are licensed under the <a target=\'_blank\' href=\'https://www.apache.org/licenses/LICENSE-2.0\'>Apache 2.0 License</a>.';
        largeModel='';
        frameworkData='';
        xiheModel='';
        ecosystem='Ecosystem';
        ecosystemLibraries='Libraries';
        ecosystemTutorials='Tutorials';
        ecosystemModels='Models';
        tutorial_quickstart='Quickstart';
        tutorial_application='Application';
        tutorial_experts='Experts';
    } else {
        searchPlaceholder = '全站搜索';
        lang = 'zh-CN';
        enPath = '';
        searchUrl = '/search';
        more = '更多';
        tutorial = '教程';
        docs = '文档';
        install = '安装';
        community = '社区';
        governance = '治理';
        developer = '开发者';
        communityActivities = '社区活动';
        communityStatistical = '贡献看板';
        recruit = '布道';
        news = '资讯';
        newsVersionRelease = '版本发布';
        newsTechnologyBlog = '技术博客';
        newsActivities = '活动公告';
        newsShowroom = '线上展厅';
        newsNews = '每日新闻';
        security = '安全';
        askQuestion3 = '文档反馈';
        askQuestion2 = '快速反馈问题';
        askQuestionInfo = '点击图标，可跳转代码仓提issue，按照issue模板填写问题描述，我们将会跟进处理';
        askQuestionInfo2 = '记得添加mindspore-assistant标签哦！';
        lite = '手机及loT';
        liteDocs = '教程及文档';
        tutorialPrimary = '快速入门';
        tutorialTraining = '训练';
        tutorialInference = '推理';
        docsGuide = '编程指南';
        docsMigrationGuide = '迁移指南';
        docsPython = 'Python API';
        docsJava = 'Java API';
        docsC = 'C++ API';
        docsNote = '规格和说明';
        docsFaq = 'FAQ';
        liteSummary = '概述';
        contributionGuide='贡献指南';
        internship='实习';
        msg='MSG';
        liteDownloads = '下载';
        liteExamples = '示例';
        liteModels = '模型';
        resource = '资源';
        courses = '课程认证';
        cases = '应用案例';
        papers = '学术论文';
        competitions = '竞赛活动';
        knowledgeMap = '知识地图';
        code = '代码';
        language = 'EN';
        helpforyou = '这个对你有帮助吗 ?';
        askQuestion = '到论坛去提问';
        helpfor1 = '基本没有用';
        helpfor2 = '有一点帮助';
        helpfor3 = '基本上能用';
        helpfor4 = '能解决问题';
        helpfor5 = '文档很有用';
        terms = '法律声明';
        privacy = '个人信息保护政策';
        enHide = '';
        copyRight = '版权所有©MindSpore 2022';
        forum = '论坛';
        forumName = '论坛';
        forumPath = 'https://www.hiascend.com/forum/forum-0106101385921175002-1.html';
        docsMindSpore = 'MindSpore';
        docsMindSporeLite = '全场景推理框架（MindSpore Lite）';
        docsMindInsight = '可视化调试调优（MindInsight）';
        docsMindSporeHub = '预训练模型（MindSpore Hub）';
        docsMindArmour = 'AI安全和隐私（MindArmour）';
        docsMindSporeFederated = '联邦学习（MindSpore Federated）';
        docsMindSporeServing = '服务化部署框架（MindSpore Serving）';
        docsProbability = '概率编程（MindSpore Probability）';
        docsMindQuantum = '量子机器学习库（MindQuantum）';
        ecosystemTools = '生态工具';
        cuttingEdgeTechnologies = '前沿技术';
        license = '本页面的内容根据<a target=\'_blank\' href=\'https://creativecommons.org/licenses/by/4.0/\'>Creative Commons Attribution 4.0</a>许可证获得许可，代码示例根据<a target=\'_blank\' href=\'https://www.apache.org/licenses/LICENSE-2.0\'>Apache 2.0</a>许可证获得许可。';
        largeModel='大模型';
        frameworkData='框架及数据';
        xiheModel='大模型平台';
        ecosystem='生态';
        ecosystemLibraries='开发库';
        ecosystemTutorials='教程';
        ecosystemModels='模型';
        tutorial_quickstart='快速入门';
        tutorial_application='应用实践';
        tutorial_experts='深度开发';
    }

    //切换语言链接
    const path_name = window.location.pathname;
    var newNavPath = lang ==='zh-CN' ? pathname.replace('/zh-CN/','/en/') : pathname.replace('/en/','/zh-CN/');

    // 最新版本控制
    const latest_version = [
      'r2.0.0-alpha',
      'r1.0.0-alpha',
      'r0.1.0-alpha',
      'r0.2.0-alpha',
      'r0.3.0-alpha',
      'r0.6.0-alpha',
      'r1.10',
      'r1.9',
      'r1.8',
      'r1.7',
      'master'
    ];
    const isNewVersion = () => {
      let isVersion = false;
      latest_version.forEach((item) => {
        if(isVersion) return ;
        isVersion = pathname.includes(item)&& true;
      });
      return isVersion;
    };


    // 每次更新版本同步最新版本
    let latestVersion = 'r1.9';
    let showVersion='r1.9';
    if(host.indexOf('/mindscience/') !== -1){
        // latestVersion = 'r0.1';
        showVersion='r0.1';
    } else if(host.indexOf('/mindquantum/api') !==-1 || host.indexOf('/mindquantum/docs') !==-1) {
        // latestVersion = 'r0.3';
        showVersion='r0.8';
    } else if(host.indexOf('/graphlearning/') !==-1  ){
        showVersion='r0.2.0-alpha';
    } else if( host.indexOf('/reinforcement/') !== -1  ){
        showVersion='r0.6.0-alpha';
    }else if( host.indexOf('/xai/') !== -1  ){
        showVersion='r1.8';
    }else {
        showVersion= currentVersion;
    }
    let oldVersionPath=[
        'tutorial/',
        'doc/',
        '/lite/docs/zh-CN/r0.7/',
        '/lite/docs/en/r0.7/',
        '/docs/zh-CN/0.1.0-alpha/',
        '/docs/en/0.1.0-alpha/',
        '/docs/zh-CN/0.2.0-alpha/',
        '/docs/en/0.2.0-alpha/',
        '/docs/zh-CN/0.3.0-alpha/',
        '/docs/en/0.3.0-alpha/',
        '/docs/zh-CN/r0.5/',
        '/docs/zh-CN/r0.6/',
        '/docs/zh-CN/r0.7/',
        '/lite/docs/zh-CN/r0.7/',
        '/api/zh-CN/r0.7/',
        '/api/zh-CN/r0.6/',
        '/api/zh-CN/r0.5/',
        '/api/zh-CN/0.3.0-alpha/',
        '/api/zh-CN/0.2.0-alpha/',
        '/api/zh-CN/0.1.0-alpha',
        '/lite/apic/zh-CN/r0.7/',
        '/docs/en/r0.5/',
        '/docs/en/r0.6/',
        '/docs/en/r0.7/',
        '/lite/docs/en/r0.7/',
        '/api/en/r0.7/',
        '/api/en/r0.6/',
        '/api/en/r0.5/',
        '/api/en/0.3.0-alpha/',
        '/api/en/0.2.0-alpha/',
        '/api/en/0.1.0-alpha',
        '/lite/apic/en/r0.7/'
    ];
    let isOld=false;
    isOld=oldVersionPath.some((item) => {
        return host.includes(item);
    });

    // 设置移动端导航
    navPath = path_name.split('/')[1];
    var nightlyVersion = title;
    if(path_name.startsWith('/docs/') || path_name.startsWith('/tutorials/')){
      nightlyVersion ='master';
    }
    let h5Nav = `
    <div class="nav-h5" id="nav-h5" style="height:4rem;">
        <div class="nav" show="1"></div>
        ${
            isOld?
            ''
            :
            `<div class="list">
                <p>${title ==='master'?'master':title}</p>
                <p class="nav-more"></p>
                <div id="nav-sec" class="selectVersion">
                    <div class="vRow">
                        ${
                            function(){
                                if(showVersion==='master'){
                                    return '';
                                }else{
                                    return`<div class="showVersion"><a class="tutorialV" href="/${navPath}/${lang}/master/index.html">master</a></div>`;
                                }
                            }()
                        }
                        <div class="showVersion"><a class="tutorialV"
                            href="/${navPath}/${lang}/${showVersion}/index.html">${showVersion}</a>
                        </div>
                        <div class="showVersion"><a class="tutorialV" href="/versions/${enPath}">${more}</a>
                        </div>
                    </div>
                </div>
            </div>`
        }

    </div>
    `;
    // 设置移动端header
    let h5_header = `
    <header id="header-h5" class="header-mobile">
        <div class="ms-content">
            <div class="header--left">
                <a href="/${enPath}"><img src="/pic/${lang == 'en' ?  'logo_black_en.png' : 'logo_black.png'}" alt="logo" /></a>
            </div>
            <div class="header--right">
                <div class="pc-lang-switch">
                    <div class="pc-lang-current">
                        <a href="/search/${enPath}" class="search"></a>

                        <a href="${newNavPath}" class="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        <span class="languageIpt">EN</span>
                    </a>
                    </div>
                </div>
                <div class="more-nav" show="1"></div>
            </div>
            <div class="nav-link-container">
                <div class="mobile-nav-item">
                    <a class="mobile-nav-link" href="/install/${enPath}">${install}</a>
                </div>
                ${isNewVersion() ? ` <div class="mobile-nav-item drop-nav">
                    <div class="mobile-nav-link">${tutorial} <span class="btnArrow topArrow"></span></div>
                    <div class="mobile-subnav-wraper">
                        <a class="mobile-subnav-link" href="/tutorials/${lang}/r2.0.0-alpha/index.html">${tutorial_quickstart}</a>
                        <a class="mobile-subnav-link" href="/tutorials/application/${lang}/r2.0.0-alpha/index.html">${tutorial_application}</a>
                        <a class="mobile-subnav-link" href="/tutorials/experts/${lang}/r2.0.0-alpha/index.html">${tutorial_experts}</a> 
                    </div>
                </div> `:`<div class="mobile-nav-item drop-nav">
                    <div class="mobile-nav-link">
                        ${tutorial}<span class="btnArrow topArrow"></span>
                    </div>
                    <div class="mobile-subnav-wraper">
                        <a class="mobile-subnav-link tutorial-primary-title" href="/tutorials/${lang}/master/index.html">master</a>
                        <a class="mobile-subnav-link" href="/tutorials/${lang}/r2.0.0-alpha/index.html">2.0.0-alpha</a>
                        <a class="mobile-subnav-link" href="/tutorials/${lang}/r1.10/index.html">1.10</a>
                        <a class="mobile-subnav-link" href="/tutorials/${lang}/r1.9/index.html">1.9</a>
                        
                        <a class="mobile-subnav-link" href="/versions/">${more}</a>
                    </div>
                </div>`}

                <div class="mobile-nav-item drop-nav">
                    <div class="mobile-nav-link">
                        ${docs}<span class="btnArrow topArrow"></span>
                    </div>
                    <div class="mobile-subnav-wraper">
                        <a class="mobile-subnav-link" href="${isNewVersion() ?`/docs/${lang}/r2.0.0-alpha/index.html`:'/mindspore'}">MindSpore</a>
                        <a class="mobile-subnav-link" href="/lite">MindSpore Lite</a>
                        <a class="mobile-subnav-link" href="/mindpandas/docs/${lang}/r0.1/index.html">MindPandas</a>
                        <a class="mobile-subnav-link" href="/mindinsight/docs/${lang}/r2.0.0-alpha/index.html">MindInsight</a>
                        <a class="mobile-subnav-link" href="/mindarmour/docs/${lang}/r1.9/index.html">MindArmour</a>
                        <a class="mobile-subnav-link" href="/serving/docs/${lang}/r1.9/index.html">MindSpore Serving</a>
                        <a class="mobile-subnav-link" href="/federated/docs/${lang}/r1.7/index.html">MindSpore Federated</a>
                        <a class="mobile-subnav-link" href="/golden_stick/docs/${lang}/r0.3.0-alpha/index.html">MindSpore Golden Stick</a>
                        <a class="mobile-subnav-link" href="/xai/docs/${lang}/r1.8/index.html">MindSpore XAI</a>
                        <a class="mobile-subnav-link" href="/devtoolkit/docs/${lang}/r1.8/index.html">MindSpore Dev Toolkit</a>
                        <a class="mobile-subnav-link" href="/graphlearning/docs/${lang}/r0.2.0-alpha/index.html">MindSpore Graph Learning</a>
                        <a class="mobile-subnav-link" href="/reinforcement/docs/${lang}/r0.6.0-alpha/index.html">Mindspore Reinforcement</a>
                        <a class="mobile-subnav-link" href="/probability/docs/${lang}/r1.7/index.html">MindSpore Probability</a>
                        <a class="mobile-subnav-link" href="/hub/docs/${lang}/r1.9/index.html">MindSpore Hub</a>
                        <a class="mobile-subnav-link" href="/mindelec/docs/${lang}/r0.2.0-alpha/index.html">MindElec</a>
                        <a class="mobile-subnav-link" href="/mindsponge/docs/${lang}/r1.0.0-alpha/index.html">MindSPONGE Hub</a>
                        <a class="mobile-subnav-link" href="/mindflow/docs/${lang}/r0.1.0-alpha/index.html">MindFlow</a>
                        <a class="mobile-subnav-link" href="/mindquantum/docs/${lang}/r0.8/index.html">MindQuantum</a>
                    </div>
                </div>
                <div class="mobile-nav-item drop-nav">
                    <div class="mobile-nav-link">
                        ${ecosystem}<span class="btnArrow topArrow"></span>
                    </div>
                    <div class="mobile-subnav-wraper"> 
                        <a class="mobile-subnav-link" href="/ecosystem/libraries/${enPath}">${ecosystemLibraries}</a>
                        <a class="mobile-subnav-link" href="/ecosystem/tutorials/${enPath}">${ecosystemTutorials}</a>
                        <a class="mobile-subnav-link" href="/ecosystem/models/${enPath}">${ecosystemModels}</a>
                    </div>
                </div>
                <div class="mobile-nav-item drop-nav">
                    <div class="mobile-nav-link">
                        ${community}<span class="btnArrow topArrow"></span>
                    </div>
                    <div class="mobile-subnav-wraper">
                        <a class="mobile-subnav-link" href="https://internship.mindspore.cn/zh/internship/">${internship}</a>
                        <a class="mobile-subnav-link" href="/community/${enPath}">${contributionGuide}</a>
                        <a class="mobile-subnav-link" href="/community/governance/${enPath}">${governance}</a>
                        <a class="mobile-subnav-link ${enHide}" href="/community/evangelist" target="_self">${recruit}</a>
                        <a class="mobile-subnav-link" href="${forumPath}" target="_blank">${forumName}</a>
                        <a class="mobile-subnav-link" href="/community/developer/${enPath}">${developer}</a>
                        ${lang == 'en' ? '':`<a class="mobile-subnav-link" href="/community/MSG/${enPath}">${msg}</a>`}
                        <a class="mobile-subnav-link" href="/community/SIG/${enPath}">SIG</a>
                        <a class="mobile-subnav-link" target="_blank" href="https://new.mindspore.cn/zh/calendar/">${communityActivities}</a>
                        <a class="mobile-subnav-link" target="_blank" href="https://datastat.mindspore.cn/${lang == 'en' ?  'en' : 'zh'}/overview">${communityStatistical}</a>

                    </div>
                </div>
                <div class="mobile-nav-item drop-nav">
                    <div class="mobile-nav-link">
                        ${resource}<span class="btnArrow topArrow"></span>
                    </div>
                    <div class="mobile-subnav-wraper">
                      <a class="mobile-subnav-link" href="/resources/knowledgeMap/${enPath}" target="_self">${knowledgeMap}</a>
                        <a class="mobile-subnav-link" href="/resources/courses/${enPath}" target="_self">${courses}</a>
                        ${lang == 'en' ? '':`<a class="mobile-subnav-link" href="/resources/cases/${enPath}" target="_self">${cases}</a>`}
                        <a class="mobile-subnav-link" href="/resources/hub/${enPath}" target="_self">Hub</a>
                        ${lang == 'en' ? '':`<a class="mobile-subnav-link" href="/resources/papers/${enPath}" target="_self">${papers}</a>`}
                        ${lang == 'en' ? '':`<a class="mobile-subnav-link" href="/resources/competitions/${enPath}" target="_self">${competitions}</a>`}
                    </div>
                </div>
                ${
                    largeModel!=''?
                    `<div class="mobile-nav-item drop-nav">
                        <div class="mobile-nav-link">
                            ${largeModel}<span class="btnArrow topArrow"></span>
                        </div>
                        <div class="mobile-subnav-wraper">
                            <a class="mobile-subnav-link" href="/largeModel/${enPath}">${largeModel}</a>
                            <a class="mobile-subnav-link" href="https://xihe.mindspore.cn/" target="_blank">${xiheModel}</a>
                            <a class="mobile-subnav-link" href="/largeModel/frameworkData">${frameworkData}</a>
                            <a class="mobile-subnav-link" href="/resources/tech/nlp/showroom/${enPath}" target="_self">${newsShowroom}</a>
                        </div>
                    </div>`
                    :
                    ''
                }

                <div class="mobile-nav-item drop-nav">
                    <div class="mobile-nav-link">
                        ${news}<span class="btnArrow topArrow"></span>
                    </div>
                    <div class="mobile-subnav-wraper">
                        <a class="mobile-subnav-link" href="/news/${enPath}">${liteSummary}</a>
                        <a class="mobile-subnav-link" href="/news/versionRelease/${enPath}" target="_self">${newsVersionRelease}</a>
                        <a class="mobile-subnav-link" href="/news/technologyBlog/${enPath}" target="_self">${newsTechnologyBlog}</a>
                        <a class="mobile-subnav-link" href="/news/news/${enPath}" target="_self">${newsNews}</a>
                        <a class="mobile-subnav-link" href="/news/activities/${enPath}" target="_self">${newsActivities}</a>
                    </div>
                </div>
                <div class="mobile-nav-item">
                    <a class="mobile-nav-link" href="/security/${enPath}">${security}</a>
                </div>
                <div class="mobile-nav-item drop-nav">
                    <div class="mobile-nav-link">
                        ${code}<span class="btnArrow topArrow"></span>
                    </div>
                    <div class="mobile-subnav-wraper">
                        <a class="mobile-subnav-link" href="https://gitee.com/mindspore/mindspore"
                            target="_blank">Gitee</a><a class="mobile-subnav-link"
                            href="https://github.com/mindspore-ai/mindspore" target="_blank">GitHub</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
    `;
    let pc_header = '';
    $.ajax({
        type: 'get',
        url: `/menu_${lang}.json`,
        dataType: 'json',
        success: function (res) {
            let subNav = {
                title: '',
                list: [],
                versionList: []
            };
            // 1.7 只有lite显示蓝色底
            let nav_options = '';
            // 匹配教程新规则
            let new_tutorials = ['tutorials/zh-cn','tutorials/en','tutorials/application','tutorials/experts'];

            let curVersion = '';
            const path_name = window.location.pathname;
            const tutorials_path = () => {
              let path_url = path_name;
              if(path_url.indexOf('r2.0.0-alpha') > -1 || path_url.indexOf('r1.10') > -1 || path_url.indexOf('r1.7') > -1 ||  path_url.indexOf('r1.9') > -1||  path_url.indexOf('r1.8') > -1 || path_url.indexOf('master') > -1){
                return (path_url.split('/')[1]+ '/'+path_url.split('/')[2]).toLocaleLowerCase();
              }
            };

            res.forEach(function (item) {
                item.children && (item.subType === 2) && item.children.forEach(function (item) {

                    item.list.forEach(function (item) {
                        if((path_name.indexOf(item.containUrl) === 0) && !subNav.list.length) {
                            subNav.title = item.subtitle;
                            if( item.subtitle === 'MindPandas'){
                              subNav.versionList = item.versionList;
                            }else{
                              subNav.list = item.subMenu;
                            }

                        }
                    });
                });
                // r1.7教程
                if(item.hasOwnProperty('newSubMenu')){
                  if(new_tutorials.includes(tutorials_path())){
                    subNav.list = item.newSubMenu;
                  }

                }
            });


            if(path_name.includes('/master/')) {
                curVersion = 'master';
                if(path_name.startsWith('/lite/') ){
                  nav_options = 'lite';
                }
            } else if (path_name.includes('/r0.3/')){
                curVersion = '0.3';
            } else if (path_name.includes('/r0.2/')){
                curVersion = '0.2';
            } else if (path_name.includes('/r0.1/')){
                curVersion = '0.1';
            } else if (path_name.includes('/r1.3/')){
                curVersion = '1.3';
            } else if (path_name.includes('/r1.5/')){
                curVersion = '1.5';
            }else if (path_name.includes('/r0.5/')){
                curVersion = '0.5';
            }else if (path_name.includes('/r0.6/')){
              curVersion = '0.6';
            }else if (path_name.includes('/r0.7/')){
              curVersion = '0.7';
            } else if (path_name.includes('/r1.6/')){
              curVersion = '1.6';
            }else if (path_name.includes('/r1.7/')){
                curVersion = '1.7';
                if(path_name.startsWith('/lite/') ){
                  nav_options = 'lite';
                }
            }else if (path_name.includes('/r1.8/')){
              curVersion = '1.8';
              if(path_name.startsWith('/lite/') ){
                nav_options = 'lite';
              }
            }else if (path_name.includes('/r1.9/')){
              curVersion = '1.9';
              if(path_name.startsWith('/lite/') ){
                nav_options = 'lite';
              }
            }else if (path_name.includes('/r1.10/')){
              curVersion = '1.10';
              if(path_name.startsWith('/lite/')){
                nav_options = 'lite';
              }
            }else{
              curVersion = currentVersion.startsWith('r')&&currentVersion.slice(1);
              if(path_name.startsWith('/lite/')){
                nav_options = 'lite';
              }
            }


            let flag = 0;
            subNav.list&&subNav.list.forEach(function (item) {

                if(item.containUrl === '/lite/docs/zh-CN/r1.5/use/downloads.html' || item.containUrl === '/lite/docs/en/r1.5/use/downloads.html'){
                    item.containUrl = item.containUrl.replace('/r1.5/',(curVersion === 'master') ? '/master/': '/r' + curVersion + '/');
                }
                if(!flag && (window.location.pathname.indexOf(item.containUrl) === 0)) {
                    flag = 1;
                    item.active = 1;
                    subNav.versionList = item.versionList || [];
                }
            });

            const noLite = () => {
                let flag = true;
                const path_name = window.location.pathname;
                if(!isNewVersion()){
                  if(
                    ((!path_name.includes('/r0.1/') ) && path_name.startsWith('/reinforcement/') ) ||
                    ((!path_name.includes('/r0.3/') || !path_name.includes('/r0.2/') ) && path_name.startsWith('/mindquantum/') ) ||
                      path_name.startsWith('/golden_stick/')
                    ){
                    flag = false;
                  }
                  return flag;
                }
            };

            pc_header = `
                        <header class="header">
                            <nav class="header-wapper row navbar navbar-expand-lg navbar-light header-nav-link-docsNew-firstNav">
                                <div class="header-nav navbar-nav" style="display: flex;">
                                    <a href="/${enPath}" class="logo">
                                        <img src="/pic/${lang == 'en' ?  'logo_black_en.png' : 'logo_black.png'}" alt="logo" />
                                    </a>
                                    ${res.map(function (item) {
                                        if(!item.children) {
                                            return `
                                            <div class="header-nav-link"><a class="header-nav-link-line" href="${item.url}">${item.name}</a></div>
                                            `;
                                        } else if(item.subType == 1) {
                                          if(item.url.indexOf('/tutorials/') !== -1 && isNewVersion()){
                                              return `
                                              <div class="header-nav-link"><a class="header-nav-link-line" href="${item.url}">${item.name}</a></div>
                                              `;
                                          }else{
                                            return `
                                            <div class="header-nav-link"><a class="header-nav-link-line" href="${item.url}">${item.name}</a>
                                                <div class="dropdown-menu-git">
                                                    <div class="vRow">
                                                        ${item.children.map(function (item) {
                                                            return `
                                                            <li><a href="${item.url}" target="${item.openType ? '_blank' : '_self'}">${item.name}</a></li>
                                                            `;
                                                        }).join('')}
                                                    </div>
                                                </div>
                                            </div>
                                            `;
                                          }
                                        } else {
                                            return `
                                            <div class="header-nav-link"><a class="header-nav-link-line" href="${item.url}">${item.name}</a>
                                                <div class="selectVersion">
                                                    <div class="vRow">
                                                        ${item.children.map(function (item) {
                                                            return `
                                                            <div class="docsNew-column">
                                                                <div class="docsNew-column-title"><p>${item.title || ''}</p></div>
                                                                <div class="bottom" style="line-height: initial;">
                                                                    ${item.list.map(function (item) {
                                                                        return `
                                                                        <div class="docsVersion"><a class="versionM" href="${item.url}">${item.name}</a></div>
                                                                        `;
                                                                    }).join('')}
                                                                </div>
                                                            </div>
                                                            `;
                                                        }).join('')}
                                                    </div>
                                                </div>
                                            </div>
                                            `;
                                        }

                                    }).join('')}
                                </div>
                                <div class="header-nav navbar-nav" style="display: flex;">
                                    <div class="dropdown">
                                        <a href="${newNavPath}" class="dropdown-toggle" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                            <span class="languageIpt">EN</span>
                                        </a>
                                    </div>
                                    <div class="header-nav-link" style="cursor: pointer;">
                                        <p>${code}</p>
                                        <ul class="dropdown-menu-git">
                                            <li><a href="https://gitee.com/mindspore/mindspore" target="_blank">Gitee</a></li>
                                            <li><a href="https://github.com/mindspore-ai/mindspore" target="_blank">GitHub</a></li>
                                        </ul>
                                    </div><a class="header__search"></a>
                                    <div class="searchMain" style="display: none;">
                                        <div class="searchInput"><span class="search-icon"></span><span class="close-icon"></span><input
                                                class="search-val" placeholder="${searchPlaceholder}"></div>
                                        <ul class="hotWord"></ul>
                                    </div>
                                </div>
                            </nav>
                            ${ noLite() ||  nav_options ==='lite' ? `
                            <nav class="header-wapper row navbar navbar-expand-lg navbar-light header-wapper-lite header-wapper-docs" >
                                <div class="header-nav navbar-nav">
                                    <div class="top">
                                        <p>${subNav.title}</p>
                                        ${subNav.versionList.length ?
                                            `<div class="version-select">
                                                ${curVersion}<img src="/pic/select-down.svg" />
                                                <ul>
                                                    ${subNav.versionList.map(function (item,index) {
                                                        return `
                                                        <li><span href="${item.value}" target="${item.value.indexOf('http')>-1 ? '_blank' : '_self'}"  class='version-option'>${item.name}</span></li>
                                                        `;
                                                    }).join('')}

                                                </ul>
                                            </div>` : ''
                                        }

                                    </div>
                                    <div class="bottom" style="line-height: initial;">
                                        ${subNav.list.map(function (item) {
                                            if(curVersion === 'master'||curVersion === '1.6'){
                                                if(!(item&&item.showMaster)){
                                                    return;
                                                }
                                            }
                                            if((curVersion === '0.3' || curVersion === '0.5')&&(
                                                item.url.includes('/reinforcement')||
                                                item.url.includes('/mindscience')
                                            )){
                                                return;
                                            }
                                            if(curVersion === '0.1'&&(
                                                item.url.includes('/graphlearning')
                                            )){
                                                return;
                                            }
                                            if((curVersion === '0.6' || curVersion === '0.7')&&(
                                                item.url.includes('/mindquantum')
                                            )){
                                                return;
                                            }
                                            let url=item.url.replace('/latest/', (curVersion === 'master') ? '/master/': '/r' + curVersion + '/');
                                            if(url.indexOf('/docs/migration_guide/zh-CN/r1.3/api_mapping.html')>-1){
                                                url='https://gitee.com/mindspore/docs/blob/r1.3/resource/api_mapping/api_mapping.md';
                                                item.openType=true;
                                            }else if(url.indexOf('/docs/migration_guide/en/r1.3/api_mapping.html')>-1){
                                                url='https://gitee.com/mindspore/docs/blob/r1.3/resource/api_mapping/api_mapping_en.md';
                                                item.openType=true;
                                            }
                                            if( (location.href.indexOf('/mindinsight/'))&&
                                                (location.href.indexOf(`/mindinsight/docs/${lang}/r1.5/`)>-1||
                                                location.href.indexOf(`/mindinsight/docs/${lang}/r1.3/`)>-1||
                                                location.href.indexOf(`/mindinsight/faq/${lang}/r1.5/`)>-1||
                                                location.href.indexOf(`/mindinsight/faq/${lang}/r1.3/`)>-1)
                                                &&item.name==='API'){
                                                return '';
                                            }
                                            if((location.href.indexOf('/federated/'))&&
                                            (location.href.indexOf(`/federated/api/${lang}/r1.5/`)>-1||
                                            location.href.indexOf(`/federated/api/${lang}/r1.3/`)>-1||
                                            location.href.indexOf(`/federated/docs/${lang}/r1.3/`)>-1||
                                            location.href.indexOf(`/federated/docs/${lang}/r1.5/`)>-1)
                                            &&item.name==='FAQ'){
                                                return '';
                                            }
                                            return `
                                            <div class="header-nav-link">
                                                <a class="header-nav-link-line ${item.active ? 'selected' : ''}" target="${item.openType ? '_blank' : '_self'}" href="${url}">${item.name}</a>
                                            </div>
                                            `;
                                        }).join('')}
                                    </div>
                                </div>
                            </nav>`:new_tutorials.includes(tutorials_path())? `<nav class="header-wapper row navbar navbar-expand-lg navbar-light header-wapper-lite header-wapper-docs" >
                            <div class="header-nav navbar-nav" style="height:100%;justify-content: flex-end;"><div class="bottom" style="line-height: initial;">
                            ${subNav.list.map(function (item) {
                              let url=item.url.replace('/master/', (curVersion === 'master') ? '/master/': '/r' + curVersion + '/');
                              return `
                                    <div class="header-nav-link">
                                        <a class="header-nav-link-line ${item.active ? 'selected' : ''}" href="${url}">${item.name}</a>
                                    </div>
                                    `;
                            }).join('')}</div></nav>`:''}

                        </header>
                        `;

                        $('body').prepend(pc_header);
                        // 切换版本
                        function checkVersion(){
                            $('.version-option,.tutorialV').on('click', function (e) {
                                let keyword=e.target.innerText;
                                if(e.target.className=='tutorialV'){  //移动端
                                    keyword='/'+keyword;
                                }else{
                                    if(keyword=='master'){
                                        keyword='/'+keyword;
                                    }else{
                                        keyword='/r'+keyword;
                                    }
                                }
                                oldHref=location.href;
                                // newHref=oldHref.replace(/\/r1.6|\/r1.7|\/r1.5|\/master|\/r0.1|\/r0.2|\/r0.3|\/r0.5|\/r0.6|\/r0.7|\/r0.8|\/r0.9|\/r1.0|\/r1.1|\/r1.2|\/r1.3/g,keyword);
                                newHref = origin+ e.target.getAttribute('href');
                                if(
                                    (newHref.indexOf('r1.10') > 0 ||newHref.indexOf('r1.9') > 0 ||newHref.indexOf('r1.8') > 0 || newHref.indexOf('r1.7') > 0 || newHref.indexOf('master') > 0) &&
                                     pathname.startsWith('/docs/api/')){
                                    window.location.href = origin+ e.target.getAttribute('href');
                                }else{
                                  // return false 可以避免默认的a标签链接，走newHref，没有return的，走a标签链接
                                  if(oldHref==newHref){return false;}

                                  if( pathname.startsWith('/docs/migration_guide/')
                                      || pathname.startsWith('/docs/faq/')
                                      || pathname.startsWith('/docs/note/')
                                      || pathname.startsWith('/federated/docs/')
                                      || pathname.startsWith('/docs/programming_guide/')){
                                    newHref = origin+ e.target.getAttribute('href');
                                  }

                                  $.ajax({
                                      type: 'get',
                                      url: newHref,
                                      dataType: 'json',
                                      complete: function (res) {
                                          if(res.status === 404) {
                                              let origin=location.origin;
                                              window.location.href = origin+ e.target.getAttribute('href');
                                          } else {
                                              window.location.href = newHref;
                                              return false;
                                          }
                                      }
                                  });
                                }
                            });
                        }
                        checkVersion();
                        // 点击切换语言开始
                        let languageType = pathname.indexOf('/en/') === -1 ? 'zhCN' : 'enUS';
                        if (languageType == 'enUS') {
                            $('.languageIpt').text('中');
                            $('.changeTutorial').css('left',0);
                            $('.logo').attr('href','/en');
                        } else if(languageType == 'zhCN'){
                            $('.languageIpt').text('EN');
                        }

                        $('#dropdownMenu1,#dropdownMenu2').on('click', function (e) {
                            e.preventDefault();
                            var that = $(this);
                            var href = languageType == 'enUS' ? location.pathname.replace('/en', '/zh-CN') + ( location.hash ? location.hash : '' ) : location.pathname.replace('/zh-CN', '/en') + ( location.hash ? location.hash : '' );
                            var noFondHref = location.pathname;
                            var indexTemp = 0;
                            noFondHref = noFondHref.split('/');
                            indexTemp = noFondHref.indexOf(languageType === 'enUS' ? 'en' : 'zh-CN');
                            noFondHref = noFondHref.filter(function (item, index) {
                                return index <= (indexTemp + 1);
                            });
                            noFondHref = noFondHref.join('/') + '/index.html';
                            if (languageType == 'enUS') {
                                noFondHref = noFondHref.replace('/en', '/zh-CN');
                                $.ajax({
                                    type: 'get',
                                    url: href,
                                    dataType: 'json',
                                    complete: function (res) {
                                        if(res.status === 404) {
                                            window.location.href = noFondHref;
                                        } else {
                                            window.location.href = href;
                                        }
                                    }
                                });
                                $('.languageIpt').text('EN');
                            } else if(languageType == 'zhCN') {
                                console.log(noFondHref);
                                noFondHref = noFondHref.replace('/zh-CN', '/en');
                                $.ajax({
                                    type: 'get',
                                    url: href,
                                    dataType: 'json',
                                    complete: function (res) {
                                        if(res.status === 404) {
                                            window.location.href = noFondHref;
                                        } else {
                                            window.location.href = href;
                                        }
                                    }
                                });
                                $('.languageIpt').text('中');
                            }
                            return false;
                        });
                        // 点击切换语言结束


                        // 点击搜索弹出搜索框
                        $('.header__search').on('click', function () {
                            $(this).css('display', 'none');
                            $(this).prevAll().css('display', 'none');
                            $('.dropdown').css('display','none !important');
                            $('.searchMain').css('display', 'block');
                        });

                        // 点击关闭搜索框
                        $('.close-icon').on('click', function () {
                            $('.header__search').css('display', 'block');
                            $('.header__search').prevAll().css('display', 'block');
                            $('.dropdown').css('display','flex !important');
                            $('.searchMain').css('display', 'none');
                        });

                        // 获取搜索框的值并传递到搜索页面
                        $('.search-val').on('keydown', function (e) {
                            const val = $('.search-val').val();
                            if (e.keyCode === 13 && val !== '') {
                                window.location.href = searchUrl + '?inputValue=' + val;
                            }
                        });
                        $('.search-icon').on('click', function (e) {
                            const val = $('.search-val').val();
                            if (val !== '') {
                                window.location.href = searchUrl + '?inputValue=' + val;
                            }
                        });

                        // 搜索框联想词设置
                        $('.search-val').on('input', function (e) {
                            let val = $('.search-val').val();
                            let $hotWord = $('.hotWord');
                            $.ajax({
                                type: 'get',
                                url: '/tips?keywords=' + val + '&index=mindspore_index_tips',
                                dataType: 'json',
                                success: function (res) {
                                    if (res && res.status && res.status === 200) {
                                        let arr = res.obj ? res.obj : [];
                                        $hotWord.html('');
                                        let html = '';
                                        if(arr.length > 0) {
                                            arr.map(function (item, index) {
                                                html += '<li class="search--list" key=' + index + '>' + item + '</li>';
                                            });
                                            $hotWord.append(html);
                                        }
                                        $('.search--list').on('click', function (e) {
                                            let value = e.target.innerText;
                                            window.location.href = '/search?inputValue=' + value;
                                            $('.header-nav').css('display', 'flex');
                                            $('.searchMain').css('display', 'none');
                                        });
                                    }
                                }
                            });
                        });

                        // 点击页面其余地方搜索框消失
                        $(document).mousedown(function (e) {
                            const target = $(e.target)[0].className;
                            if (target === 'header__search' || target === 'search-val' || target === 'search-icon' || target === 'search--list') {
                                $('.header__search').css('display', 'none');
                                $('.header__search').prevAll().css('display', 'none');
                                $('.header-nav').css('display', 'flex');
                                $('.searchMain').css('display', 'block');
                            } else {
                                $('.header__search').css('display', 'block');
                                $('.header__search').prevAll().css('display', 'block');
                                $('.searchMain').css('display', 'none');
                            }
                        });
                        function resolveText(text) {
                            if(languageType === 'zhCN') {
                                return '"' + text + '" 内搜索';
                            } else {
                                return 'Search in ' + text;
                            }
                        }
                        if(window.location.href.includes('/tutorials/') || window.location.href.includes('/tutorial/')) {
                            $('#rtd-search-form input').attr('placeholder', resolveText(tutorial));
                        } else {
                            setTimeout(function () {
                                var strTemp = $('header .selected').text();
                                if(strTemp==''){
                                    if(window.location.href.includes('/docs')){
                                        if(window.location.href.includes('/en')){
                                            strTemp='Docs';
                                        }else{
                                            strTemp='文档';
                                        }
                                    }else{
                                        strTemp='API';
                                    }
                                }
                                $('#rtd-search-form input').attr('placeholder', resolveText(strTemp));
                            }, 200);

                        }
                        let mindquantumFlag = 0;
                        const href = window.location.href;
                        if(href.includes('/mindquantum/') || href.includes('/mindscience/')|| href.includes('/reinforcement/')|| href.includes('/graphlearning/') ) {
                            mindquantumFlag = 1;
                        }
                        if(new_tutorials.includes(tutorials_path())){
                          mindquantumFlag = 1;
                          $('body').addClass('new_tutorials');
                        }
                        if(!(href.includes('/lite/') || href.includes('/master/') || href.includes('/r1.3/') || href.includes('/r1.5/')|| href.includes('/r1.6/')|| href.includes('/r1.10/')|| href.includes('/r1.9/')|| href.includes('/r1.8/')|| href.includes('/r1.7/'))  || href.includes('/tutorials/')) {
                            !mindquantumFlag && $('.header .header-wapper-docs').hide();
                        }
                        if(href.includes('/tutorial/') || href.includes('/tutorials/')) {
                            $('.header-wapper .header-nav .header-nav-link').eq(1).find('.header-nav-link-line').addClass('active');
                        } else {
                            $('.header-wapper .header-nav .header-nav-link').eq(2).find('.header-nav-link-line').addClass('active');
                        }
                        // if(href.includes('/api/') || href.includes('/api_python/')) {
                        //     $(".header-wapper .header-nav .header-nav-link .header-nav-link-line").removeClass('active');
                        //     $(".header-wapper .header-nav .header-nav-link").eq(3).find('.header-nav-link-line').addClass('active');
                        // }
            isH5(function () {
                $('.header').css('display', 'none');
            });
        }
    });
    // pc端header

    // 编写footer
    let pc_footer = `
    <div id="footer">
        <div class="evaluate">
        <div class="evaluateTitle">
            ${helpforyou}
            <div class="docsLayer">
              <div class="km-item">
                  <a class="km-item-link" href="/resources/knowledgeMap/${enPath}">
                    <img class="btn-img" src="/pic/knowledgeMap-icon.png"/>
                    <div class="btn-label">${knowledgeMap}</div>
                  </a>
              </div>
              <div class="askQuestion-box">
                  <a class="askQuestion" href="${askQuestionHref}" target="_blank">
                      <img class="btn-img" src="/pic/docs/ask.png"/>
                      <div class="btn-label">${askQuestion3}</div>
                  </a>
                  <div class="askQuestion-info">
                      <div class="askQuestion-info-title"><img src="/pic/docs/text.png"/>${askQuestion2}</div>
                      <div class="askQuestion-info-content">
                          <p class="first">${askQuestionInfo}</p>
                          <p>${askQuestionInfo2}</p>
                          <p><span></span> mindspore-assistant</p>
                      </div>
                  </div>
              </div>
            </div>
        </div>
        <ul class="evaluateStar">
            <li>
            <div class="star"></div>
            <div class="wordScore">${helpfor1}</div>
            </li>
            <li>
            <div class="star"></div>
            <div class="wordScore">${helpfor2}</div>
            </li>
            <li>
            <div class="star"></div>
            <div class="wordScore">${helpfor3}</div>
            </li>
            <li>
            <div class="star"></div>
            <div class="wordScore">${helpfor4}</div>
            </li>
            <li>
            <div class="star"></div>
            <div class="wordScore">${helpfor5}</div>
            </li>
        </ul>
        </div>
        <div class="licensed">${license}</div>
        <div class="partLine"></div>
        <div class="footer row">
        <a class="jump col-xs-12 col-md-4" target="_top" href="/install/${enPath}"
            >${install}</a
        ><a
            class="jump col-xs-12 col-md-4"
            target="_top"
            href="/tutorials/${lang}/master/index.html"
            >${tutorial}</a
        ><a
            class="jump col-xs-12 col-md-4"
            target="_top"
            href="/mindspore/${enPath}"
            >${docs}</a
        ><a
            class="jump col-xs-12 col-md-4"
            target="_top"
            href="/community/${enPath}"
            >${community}</a
        ><a class="jump col-xs-12 col-md-4" target="_top" href="/news/${enPath}"
            >${news}</a
        ><a class="jump col-xs-12 col-md-4" target="_top" href="/security/${enPath}"
            >${security}</a
        ><a class="jump col-xs-12 col-md-4" target="_blank" href="${forumPath}"
            >${forum}</a
        >
        </div>
        <div class="row copyright col-xs-12 col-md-8">
        <span class="copyRight">${copyRight}</span
        ><a class="copynum" target="_blank" href="https://beian.miit.gov.cn"
            >粤A2-20044005号</a
        ><a href="/legal/${enPath}" class="legal">${terms}</a
        ><span class="verticalLine"></span
        ><a href="/privacy/${enPath}" class="privacyPolicy">${privacy}</a>
        </div>
        <a
        class="footer-record"
        href="https://beian.miit.gov.cn"
        ><img class="copyImg2" src="/pic/copyright3.png" alt="img" /><span
            class="keepRecord"
            >粤公网安备 </span
        ><span class="recordNum">44030702002890号</span></a
        >
    </div>
    `;
    let h5_footer = `
    <div id="h5_footer">
        <div class="evaluate">
        <div class="evaluateTitle">
            ${helpforyou}
            <a class="askQuestion" style="padding-bottom:1px; border-bottom:1px solid #379bbe6;" href="https://forum.huawei.com/enterprise/en/forum-100504.html" target="_blank">${askQuestion}</a>
        </div>
        <ul class="evaluateStar">
            <li>
            <div class="star"></div>
            <div class="wordScore">${helpfor1}</div>
            </li>
            <li>
            <div class="star"></div>
            <div class="wordScore">${helpfor2}</div>
            </li>
            <li>
            <div class="star"></div>
            <div class="wordScore">${helpfor3}</div>
            </li>
            <li>
            <div class="star"></div>
            <div class="wordScore">${helpfor4}</div>
            </li>
            <li>
            <div class="star"></div>
            <div class="wordScore">${helpfor5}</div>
            </li>
        </ul>
        </div>
        <div class="licensed">${license}</div>
        <div class="footer row">
        <div class="logo"><a href="/">
            <img src="/pic/${lang == 'en' ?  'logo_bottom_en.png' : 'logo_bottom.png'}" alt="logo" />
        </a></div>
        <div class="copyright">
            <div class="copynum">
            <p>
                <span class="keepRecord">${copyRight}</span>
                <a target="_blank" href="https://beian.miit.gov.cn"
                >粤A2-20044005号</a
                >
            </p>
            <p>
                <span class="keepRecord">粤公网安备 </span
                ><a
                class="footer-record"
                href="https://beian.miit.gov.cn"
                >44030702002890号</a
                >
            </p>
            </div>
            <div class="legal">
            <a href="/legal/${enPath}" class="legal">${terms}</a
            ><span class="verticalLine"></span
            ><a href="/privacy/${enPath}" class="privacyPolicy">${privacy}</a>
            </div>
        </div>
        </div>
    </div>
    `;


    if (host.indexOf('apicc') !== -1) {
        $('#doc-content').append(pc_footer);
    } else {
        $('.wy-nav-content').append(pc_footer);
    }

    isH5(function () {
        if (host.indexOf('apicc') !== -1) {
            $('body').append(h5Nav);
            $('#footer').html(h5_footer);
        } else {
            $('.wy-nav-top').html(h5Nav);
            $('.wy-nav-content').append(h5_footer);
            $('#footer').remove();
        }
        $('body').prepend(h5_header);
        $('.header').css('display', 'none');
        srollEvent();
    });

    // 用一个宽度来记录之前的宽度，当之前的宽度和现在的宽度，从手机切换到电脑或者从电脑切换到手机，才执行下面部分函数
   let  oldWidth=window.innerWidth;
    window.addEventListener('resize', function() {
        let width=window.innerWidth;
        let h5Head=document.getElementById('header-h5');
        let h5footer=document.getElementById('h5_footer');
        let navh5=document.getElementById('nav-h5');
        let pcfooter=document.getElementById('footer');
        if(width<768){
            $('#mask').css('display', 'none');
            $('.wy-nav-side').css({ 'left': '-90%', 'transition': '0s' });
            if(h5Head===null){
                isH5(function () {
                    if (host.indexOf('apicc') !== -1) {
                        $('body').append(h5Nav);
                        $('#footer').html(h5_footer);
                    } else {
                        $('.wy-nav-top').html(h5Nav);
                        $('.wy-nav-content').append(h5_footer);
                        $('#footer').remove();
                    }
                    $('body').prepend(h5_header);
                    $('.header').css('display', 'none');
                    srollEvent();
                    let mask = '<div id="mask"></div>';
                    $('.wy-nav-content').append(mask);
                    setTimeout(() => {
                        showH5Nav();
                    }, 200);

                });
            }
        }else{
            $('.header').css('display', 'block');
            $('#mask').css('display', 'none');
            $('.wy-nav-side').css('left', '0');
            if(h5Head){
                h5Head.remove();
            }
            if(h5footer){
                h5footer.remove();
            }
            if(navh5){
                navh5.remove();
            }
            if(pcfooter===null){
                if (host.indexOf('apicc') !== -1) {
                    $('#doc-content').append(pc_footer);
                } else {
                    $('.wy-nav-content').append(pc_footer);
                }
            }
        }
        if(width>768&&oldWidth<768){
            grade();
            $('.askQuestion').on('click', function() {
                $.ajax({
                    type: 'POST',
                    url: '/saveEssayJump',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        essayUrl:location.href
                    })
                });
            });
        }
        oldWidth=width;
    });

    function srollEvent() {
        let startY, moveEndY, Y;
        let main = document.getElementsByTagName('body')[0];
        main.addEventListener('touchstart', function (e) {
            startY = e.touches[0].pageY;
        }, false);
        main.addEventListener('touchmove', function (e) {
            // 出现mask的时候，header禁止上移
            if ($('.nav').attr('show') == 1 && $('.more-nav').attr('show') == 1) {
                moveEndY = e.changedTouches[0].pageY;
                Y = moveEndY - startY;
                if (Y > 10) {
                    $('#header-h5').css('top', '0rem');
                    $('.nav-h5').css('top', '6rem');
                    $('.wy-breadcrumbs').css('top', '10rem');
                } else if (Y < -100) {
                    $('#header-h5').css('top', '-6rem');
                    $('.nav-h5').css('top', '-12rem');
                    $('.wy-breadcrumbs').css('top', '-12rem');
                }
            }
        });
    }



    // 评价相关开始
    $('div.star').on('mouseover', function () {
        $(this).addClass('sel');
        $(this).parent('li').prevAll().children('.star').addClass('sel');
        $(this).parent('li').nextAll().children('.star').removeClass('sel');
    });
    $('div.star').on('mouseout', function () {
        $(this).removeClass('sel');
        $(this).parent('li').prevAll().children('.star').removeClass('sel');
    });
    $('.evaluateStar').on('click', '.star', function(e) {
        $(this).addClass('sel');
        $(this).parent('li').prevAll().children('.star').addClass('sel');
        $(this).parent('li').nextAll().children('.star').removeClass('sel');
        $('div.star').unbind('mouseover');
        $('div.star').unbind('mouseout');
        let grade = $(this).parent('li').prevAll().length + 1;
        let typeStr;
        let pathname = window.location.pathname;
        if (pathname.indexOf('/master/') !== -1 || pathname.indexOf('/r1.0/') !== -1){
            typeStr = pathname.split('/')[1] + '/' + pathname.split('/')[2];
        } else {
            typeStr = pathname.split('/')[1];
        }
        // $.ajax({
        //     type: 'POST',
        //     contentType: 'application/json',
        //     data: JSON.stringify({
        //         title: window.location.pathname,
        //         score: grade,
        //         parent: typeStr
        //     }),
        //     url: '/grade'
        // });
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                score: grade,
                essayUrl:location.href
            }),
            url:'/saveEssayScore'
        });
    });
    // 评价相关结束

    //跳转论坛统计
    $('.askQuestion').on('click', function() {
        let pathname = window.location.pathname;
        let branch;
        let typeStr;
        let name;
        if (
            pathname.indexOf('/master/') !== -1 ||
            pathname.indexOf('/r1.0/') !== -1 ||
            pathname.indexOf('/r1.1/') !== -1 ||
            pathname.indexOf('/r1.2/') !== -1 ||
            pathname.indexOf('/r0.1/') !== -1 ||
            pathname.indexOf('/r0.2/') !== -1 ||
            pathname.indexOf('/r0.3/') !== -1 ||
            pathname.indexOf('/r0.5/') !== -1 ||
            pathname.indexOf('/r0.7/') !== -1 ||
            pathname.indexOf('/r1.3/') !== -1 ||
            pathname.indexOf('/r1.5/') !== -1||
            pathname.indexOf('/r1.6/') !== -1||
            pathname.indexOf('/r1.7/') !== -1 ||
            pathname.indexOf('/r1.9/') !== -1 ||
            pathname.indexOf('/r1.10/') !== -1 ||
            pathname.indexOf('/r1.8/') !== -1
        ) {
            branch = pathname.split('/')[4];
            typeStr = pathname.split('/')[1] + '/' + pathname.split('/')[2];
            name = pathname.split('/').slice(5).join('/');
        } else {
            branch = pathname.split('/')[3];
            typeStr = pathname.split('/')[1];
            name = pathname.split('/').slice(4).join('/');
        }

        if (branch === '0.2.0-alpha') {
            branch = 'r0.2';
        } else if (branch === '0.3.0-alpha') {
            branch = 'r0.3';
        }

        // $.ajax({
        //     type: 'POST',
        //     url: '/essay/count',
        //     contentType: 'application/json',
        //     data: JSON.stringify({
        //         language: pathname.indexOf('/en/') === -1 ? 'zh' : 'en',
        //         type: typeStr,
        //         branch: branch,
        //         name: name
        //     })
        // });

        $.ajax({
            type: 'POST',
            url: '/saveEssayJump',
            contentType: 'application/json',
            data: JSON.stringify({
                essayUrl:location.href
            })
        });
    });

    // hover时候显示提示
    $('.askQuestion-box').hover(function(){
        $('#footer .askQuestion-box .askQuestion-info').css('display', 'block');
    }, function(){
        $('#footer .askQuestion-box .askQuestion-info').css('display', 'none');
    });

    //  master 和 0.0.1选择
    $('.list').on('click', function () {
        $('#nav-sec').slideToggle();
        hideNav(0);
        hideNav(1);
    });

    // 国际化
    $('#dropdownMenu_h5').on('click', function () {
        $('.dropdown-menu').slideToggle();
    });

    // 评价相关
    function grade(){
        // 评价相关开始
        $('div.star').on('mouseover', function () {
            $(this).addClass('sel');
            $(this).parent('li').prevAll().children('.star').addClass('sel');
            $(this).parent('li').nextAll().children('.star').removeClass('sel');
        });
        $('div.star').on('mouseout', function () {
            $(this).removeClass('sel');
            $(this).parent('li').prevAll().children('.star').removeClass('sel');
        });
        $('.evaluateStar').on('click', '.star', function(e) {
            $(this).addClass('sel');
            $(this).parent('li').prevAll().children('.star').addClass('sel');
            $(this).parent('li').nextAll().children('.star').removeClass('sel');
            $('div.star').unbind('mouseover');
            $('div.star').unbind('mouseout');
            let grade = $(this).parent('li').prevAll().length + 1;
            let typeStr;
            let pathname = window.location.pathname;
            if (pathname.indexOf('/master/') !== -1 || pathname.indexOf('/r1.0/') !== -1){
                typeStr = pathname.split('/')[1] + '/' + pathname.split('/')[2];
            } else {
                typeStr = pathname.split('/')[1];
            }
            // $.ajax({
            //     type: 'POST',
            //     contentType: 'application/json',
            //     data: JSON.stringify({
            //         title: window.location.pathname,
            //         score: grade,
            //         parent: typeStr
            //     }),
            //     url: '/grade'
            // });
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    score: grade,
                    essayUrl:location.href
                }),
                url:'/saveEssayScore'
            });
        });
        // 评价相关结束
    }

    // H5显示导航
    function showH5Nav(){
        grade();
        //  master 和 0.0.1选择
        $('.list').on('click', function () {
            $('#nav-sec').slideToggle();
            hideNav(0);
            hideNav(1);
        });

        // 国际化
        $('#dropdownMenu_h5').on('click', function () {
            $('.dropdown-menu').slideToggle();
        });
        // 主导航显示
        $('.more-nav').on('click', function () {
            if ($(this).attr('show') == '0') {
                hideNav(0);
                $('.more-nav').css('backgroundImage', 'url("/pic/nav_white.png")');
            } else {
                showNav(0);
                $('.more-nav').css('backgroundImage', 'url("/pic/close.png")');
            }
        });

        // 侧栏导航显示
        $('.nav').on('click', function () {
            if ($(this).attr('show') == '0') {
                hideNav(1);
            } else {
                showNav(1);
            }
        });

        // 主导航二级菜单
        $('.drop-nav').each(function (index, el) {
            $(this).click(function () {
                $('.mobile-subnav-wraper').slideUp();
                $('.btnArrow').css('transform', 'rotate(0deg)');
                if ($(this).children('.mobile-subnav-wraper')[0].style.display === 'block') {
                    $(this).children('.mobile-subnav-wraper').slideUp();
                    $(this).children('.mobile-nav-link').children('.btnArrow').css('transform', 'rotate(0deg)');

                } else {
                    $(this).children('.mobile-subnav-wraper').slideDown();
                    $(this).children('.mobile-nav-link').children('.btnArrow').css('transform', 'rotate(180deg)');
                }
            });
        });

        // mask点击关闭侧栏
        $('#mask').on('click', function () {
            hideNav(0);
            hideNav(1);
        });
    }


    // 主导航显示
    $('.more-nav').on('click', function () {
        if ($(this).attr('show') == '0') {
            hideNav(0);
            $('.more-nav').css('backgroundImage', 'url("/pic/nav_white.png")');
        } else {
            showNav(0);
            $('.more-nav').css('backgroundImage', 'url("/pic/close.png")');
        }
    });

    // 侧栏导航显示
    $('.nav').on('click', function () {
        if ($(this).attr('show') == '0') {
            hideNav(1);
        } else {
            showNav(1);
        }
    });

    // 主导航二级菜单
    $('.drop-nav').each(function (index, el) {
        $(this).click(function () {
            $('.mobile-subnav-wraper').slideUp();
            $('.btnArrow').css('transform', 'rotate(0deg)');
            if ($(this).children('.mobile-subnav-wraper')[0].style.display === 'block') {
                $(this).children('.mobile-subnav-wraper').slideUp();
                $(this).children('.mobile-nav-link').children('.btnArrow').css('transform', 'rotate(0deg)');

            } else {
                $(this).children('.mobile-subnav-wraper').slideDown();
                $(this).children('.mobile-nav-link').children('.btnArrow').css('transform', 'rotate(180deg)');
            }
        });
    });

    // mask点击关闭侧栏
    $('#mask').on('click', function () {
        hideNav(0);
        hideNav(1);
    });

    // 设置 二级导航active
    showActive();
    function showActive(params) {
        let sections = ['tutorial', 'api', 'docs'];
        let versions = ['master','r0.1', 'r0.2','r0.3','r1.5', 'r1.3' ,'r1.2', 'r1.1', 'r1.0','r0.7', 'r0.6', 'r0.5'];
        for (let i = 0; i < sections.length; i++) {
            for (let j = 0; j < versions.length; j++) {
                if (host.indexOf(sections[i]) !== -1) {
                    if (host.indexOf(versions[j]) !== -1) {
                        $('.mobile-subnav-wraper').eq(i).children('.mobile-subnav-link').eq(j).addClass('active');
                    }
                }
            }
        }
    }

    // 导航显示
    // val : 0 主导航
    // val : 1 侧导航
    function showNav(val) {
        if (val) {
            $('.wy-nav-side').css({ 'left': '0', 'transition': '0.3s' });
            $('#side-nav').css({ 'left': '0', 'transition': '0.3s' });
            $('.nav').attr('show', '0');
            $('#mask').css('zIndex', '10');
        } else {
            $('.nav-link-container').css('right', 0);
            $('.more-nav').attr('show', '0');
            $('#mask').css('zIndex', '150');
            hideNav(1);
        }
        stopScroll();
        $('#mask').show();
    }

    // 导航关闭
    // val : 0 主导航
    // val : 1 侧导航
    function hideNav(val) {
        if (val) {
            $('.wy-nav-side').css({ 'left': '-90%', 'transition': '0.3s' });
            $('#side-nav').css({ 'left': '-90%', 'transition': '0.3s' });
            $('.nav').attr('show', '1');
        } else {
            $('.nav-link-container').css('right', '-65%');
            $('.more-nav').attr('show', '1');
            $('.mobile-subnav-wraper').slideUp();
            $('.btnArrow').css('transform', 'rotate(0deg)');
            $('.more-nav').css('backgroundImage', 'url("/pic/nav_white.png")');
        }
        openScroll();
        $('#mask').hide();
    }

    function stopScroll() {
        let body = document.querySelector('body');
        body.style.cssText = 'position:fixed; top:0; left:0; width:100%; overflow:hidden';
    }

    function openScroll() {
        let body = document.querySelector('body');
        body.style.cssText = 'position:static; top:0; left:0; width:100%; overflow:auto';
    }

    // 判断是否 h5
    function isH5(cb) {
        let screen = document.documentElement.clientWidth;
        if (screen < 768) {
            cb();
        }
    }

    if(!$('.wy-grid-for-nav .wy-menu .notoctree-l2.current .current').next().length) {
        $('.wy-grid-for-nav .wy-menu .notoctree-l2.current .current').append('<style>.wy-grid-for-nav .wy-menu .notoctree-l2.current .current::before{content:\'\'}</style>');
    }
    $('.wy-grid-for-nav .wy-menu .caption').append('<img src=\'/pic/arrow-right.svg\' />');
    $('.wy-grid-for-nav .wy-menu .caption').next().hide();
    if($('.wy-grid-for-nav .wy-menu').find('.current').length) {
        $('.wy-grid-for-nav .wy-menu>.current').show().prev().addClass('down');
    } else {
        $('.wy-grid-for-nav .wy-menu .caption').eq(0).addClass('down').next().show();
    }
    $('.wy-grid-for-nav .wy-menu .caption').click(function () {
        $(this).toggleClass('down');
        $(this).next().toggle(200);
    });

    // 左侧菜单少于4个 展开显示
    if($('.wy-grid-for-nav .wy-menu .caption').length < 5) {
      $('.wy-grid-for-nav .wy-menu .caption').each(function (index, item) {
          $(item).addClass('down').next().show();
      });
    }
    // 默认展开左侧 api
    // if (pathname.startsWith("/docs/")){
    //   $('.wy-grid-for-nav .wy-menu .caption').removeClass('down').next().hide();
    //   $('.wy-grid-for-nav .wy-menu .caption').eq(2).addClass('down').next().show();
    // }
    if (
      pathname.startsWith('/docs/zh-CN/r1.7/index.html') || pathname.startsWith('/docs/en/r1.7/index.html')
    || pathname.startsWith('/docs/zh-CN/master/index.html') || pathname.startsWith('/docs/en/master/index.html')
    || pathname.startsWith('/docs/zh-CN/master/search.html') || pathname.startsWith('/docs/en/master/search.html')
    || pathname.startsWith('/docs/zh-CN/r1.7/search.html') || pathname.startsWith('/docs/en/r1.7/search.html')
    || pathname.startsWith('/docs/zh-CN/master/_modules/') || pathname.startsWith('/docs/en/master/_modules/')
    || pathname.startsWith('/docs/zh-CN/r1.7/_modules/') || pathname.startsWith('/docs/en/r1.7/_modules/')

    ||pathname.startsWith('/docs/zh-CN/r1.8/index.html') || pathname.startsWith('/docs/en/r1.8/index.html')
    || pathname.startsWith('/docs/zh-CN/r1.8/search.html') || pathname.startsWith('/docs/en/r1.8/search.html')
    || pathname.startsWith('/docs/zh-CN/r1.8/_modules/') || pathname.startsWith('/docs/en/r1.8/_modules/')

    ||pathname.startsWith('/docs/zh-CN/r1.9/index.html') || pathname.startsWith('/docs/en/r1.9/index.html')
    || pathname.startsWith('/docs/zh-CN/r1.9/search.html') || pathname.startsWith('/docs/en/r1.9/search.html')
    || pathname.startsWith('/docs/zh-CN/r1.9/_modules/') || pathname.startsWith('/docs/en/r1.9/_modules/')

    ||pathname.startsWith('/docs/zh-CN/r1.10/index.html') || pathname.startsWith('/docs/en/r1.10/index.html')
    || pathname.startsWith('/docs/zh-CN/r1.10/search.html') || pathname.startsWith('/docs/en/r1.10/search.html')
    || pathname.startsWith('/docs/zh-CN/r1.10/_modules/') || pathname.startsWith('/docs/en/r1.10/_modules/')

    ||pathname.startsWith('/docs/zh-CN/r2.0.0-alpha/index.html') || pathname.startsWith('/docs/en/r2.0.0-alpha/index.html')
    || pathname.startsWith('/docs/zh-CN/r2.0.0-alpha/search.html') || pathname.startsWith('/docs/en/r2.0.0-alpha/search.html')
    || pathname.startsWith('/docs/zh-CN/r2.0.0-alpha/_modules/') || pathname.startsWith('/docs/en/r2.0.0-alpha/_modules/')
    ) {
      $('.wy-grid-for-nav .wy-menu .caption').removeClass('down').next().hide();
      $('.wy-grid-for-nav .wy-menu .caption').eq(2).addClass('down').next().show();
    }

});
