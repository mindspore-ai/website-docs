/* sphinx_rtd_theme version 0.4.3 | MIT license */
/* Built 20190212 16:02 */

// 添加共用js，针对文档内容的特殊化处理
var oHead = document.getElementsByTagName('HEAD').item(0)
let origin=location.origin
let jsScript = document.createElement('script');
jsScript.type = "text/javascript";
jsScript.src=origin + '/commonJs/docHandle.js'  
setTimeout(()=>{
    oHead.appendChild(jsScript);
})


var oScript = document.createElement('script');
oScript.type = "text/javascript";
oScript.textContent = `var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?7c2afdec4c0d635d30ebb361804d0464";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();`;
oHead.appendChild(oScript);

// 公共css/js文件
var oHead = document.getElementsByTagName('HEAD').item(0)
var oScript = document.createElement('script');
let host =  window.location;
let path = (
        host.pathname.indexOf("master") === -1 && 
        host.pathname.indexOf("r1.6") === -1 &&   
        host.pathname.indexOf("r1.7") === -1 &&   
        host.pathname.indexOf("r1.8") === -1 &&   
        host.pathname.indexOf("r1.9") === -1 &&   
        host.pathname.indexOf("r1.10") === -1 &&   
        host.pathname.indexOf("r1.0") === -1 &&  
        host.pathname.indexOf("r1.1") === -1 && 
        host.pathname.indexOf("r1.2") === -1 && 
        host.pathname.indexOf("r1.3") === -1 && 
        host.pathname.indexOf("r1.5") === -1 && 
        host.pathname.indexOf("r0.1") === -1 && 
        host.pathname.indexOf("r0.2") === -1 && 
        host.pathname.indexOf("r0.3") === -1 && 
        host.pathname.indexOf("r0.5") === -1 && 
        host.pathname.indexOf("r0.6") === -1 && 
        host.pathname.indexOf("r0.7") === -1 && 
        host.pathname.indexOf("r0.8") === -1 && 
        host.pathname.indexOf("r1.0.0-alpha") === -1 && 
        host.pathname.indexOf("r2.0.0-alpha") === -1 && 
        host.pathname.indexOf("r0.2.0-alpha") === -1 && 
        host.pathname.indexOf("r0.1.0-alpha") === -1 && 
        host.pathname.indexOf("r0.3.0-alpha") === -1 && 
        host.pathname.indexOf("r0.6.0-alpha") === -1 && 
        host.pathname.split('/')[1] !== "lite"
    )
    ? host.pathname.split('/')[1]+ '/'+host.pathname.split('/')[2]+ '/'+host.pathname.split('/')[3]
    :host.pathname.split('/')[1]+ '/'+host.pathname.split('/')[2]+ '/'+host.pathname.split('/')[3]+ '/'+host.pathname.split('/')[4];

if(path.includes('.html') || path.includes('docs/zh-CN/r1.7/') || path.includes('docs/en/r1.7/') ||
path.includes('docs/zh-CN/r1.9/') || path.includes('docs/en/r1.9/') ||
path.includes('docs/zh-CN/r1.10/') || path.includes('docs/en/r1.10/') ||
path.includes('docs/zh-CN/r2.0.0-alpha/') || path.includes('docs/en/r2.0.0-alpha/') ||
  path.includes('docs/zh-CN/r1.8/') || path.includes('docs/en/r1.8/') ||  path.includes('docs/zh-CN/master/') || path.includes('docs/en/master/')){
  path=host.pathname.split('/')[1]+ '/'+host.pathname.split('/')[2]+ '/'+host.pathname.split('/')[3]
}

let pathname_ = host.origin +'/'+path;
var oHead = document.getElementsByTagName('HEAD').item(0)
var oLink = document.createElement('link');
oLink.rel = "stylesheet";
oLink.href =pathname_+'/_static/css/h5_docs.css';
oScript.type = "text/javascript";
oScript.src=pathname_ + '/_static/js/common_docs.js'  
setTimeout(()=>{
    oHead.appendChild(oLink);
    oHead.appendChild(oScript);
})

require = function r(s, a, l) {
    function c(e, n) {
        if (!a[e]) {
            if (!s[e]) {
                var i = "function" == typeof require && require;
                if (!n && i) return i(e, !0);
                if (u) return u(e, !0);
                var t = new Error("Cannot find module '" + e + "'");
                throw t.code = "MODULE_NOT_FOUND",
                t
            }
            var o = a[e] = {
                exports: {}
            };
            s[e][0].call(o.exports,
                function (n) {
                    return c(s[e][1][n] || n)
                },
                o, o.exports, r, s, a, l)
        }
        return a[e].exports
    }
    for (var u = "function" == typeof require && require,
        n = 0; n < l.length; n++) c(l[n]);
    return c
}({
    "sphinx-rtd-theme": [function (n, e, i) {
        var jQuery = "undefined" != typeof window ? window.jQuery : n("jquery");
        e.exports.ThemeNav = {
            navBar: null,
            win: null,
            winScroll: !1,
            winResize: !1,
            linkScroll: !1,
            winPosition: 0,
            winHeight: null,
            docHeight: null,
            isRunning: !1,
            enable: function (e) {

                var i = this;
                void 0 === e && (e = !0),
                    i.isRunning || (i.isRunning = !0, jQuery(function (n) {
                        window.onload=function(){
                            window.MathJax.Hub.Config({
                                tex2jax: {
                                    inlineMath: [['$', '$'], ["\\(", "\\)"]],
                                    displayMath: [['$$', '$$'], ["\\[", "\\]"]],
                                    skipTags: ['script', 'noscript', 'style', 'textarea', 'code', 'pre', 'a'],
                                }
                            });
                            window.MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                        }
                        i.init(n),
                            i.reset(),
                            i.win.on("hashchange", i.reset),
                            e && i.win.on("scroll",
                                function () {
                                    i.linkScroll || i.winScroll || (i.winScroll = !0, requestAnimationFrame(function () {
                                        i.onScroll()
                                    }))
                                }),
                            i.win.on("resize",
                                function () {
                                    i.winResize || (i.winResize = !0, requestAnimationFrame(function () {
                                        i.onResize()
                                    }))
                                }),
                            i.onResize()
                    }))
            },
            enableSticky: function () {
                this.enable(!0)
            },
            init: function (i) {

                i(document);
                var t = this;
                this.navBar = i("div.wy-side-scroll:first"),
                    this.win = i(window),
                    i(document).on("click", "[data-toggle='wy-nav-top']",
                        function () {
                            i("[data-toggle='wy-nav-shift']").toggleClass("shift"),
                                i("[data-toggle='rst-versions']").toggleClass("shift")
                        }).on("click", ".wy-menu-vertical .current ul li a",
                            function () {
                                var n = i(this);
                                i("[data-toggle='wy-nav-shift']").removeClass("shift"),
                                    i("[data-toggle='rst-versions']").toggleClass("shift"),
                                    t.toggleCurrent(n),
                                    t.hashChange()
                            }).on("click", "[data-toggle='rst-current-version']",
                                function () {
                                    i("[data-toggle='rst-versions']").toggleClass("shift-up")
                                }),
                    i("table.docutils:not(.field-list,.footnote,.citation)").wrap("<div class='wy-table-responsive'></div>"),
                    i("table.docutils.footnote").wrap("<div class='wy-table-responsive footnote'></div>"),
                    i("table.docutils.citation").wrap("<div class='wy-table-responsive citation'></div>"),
                    i(".wy-menu-vertical ul").not(".simple").siblings("a").each(function () {
                        var e = i(this);
                        expand = i('<span class="toctree-expand"></span>'),
                            expand.on("click",
                                function (n) {
                                    return t.toggleCurrent(e),
                                        n.stopPropagation(),
                                        !1
                                }),
                            e.prepend(expand)
                    })
            },
            reset: function () {
                var n = encodeURI(window.location.hash) || "#";
                try {
                    var e = $(".wy-menu-vertical"),
                        i = e.find('[href="' + n + '"]');
                    if (0 === i.length) {
                        var t = $('.document [id="' + n.substring(1) + '"]').closest("div.section");
                        0 === (i = e.find('[href="#' + t.attr("id") + '"]')).length && (i = e.find('[href="#"]'))
                    }
                    0 < i.length && ($(".wy-menu-vertical .current").removeClass("current"), i.addClass("current"), i.closest("li.toctree-l1").addClass("current"), i.closest("li.toctree-l1").parent().addClass("current"), i.closest("li.toctree-l1").addClass("current"), i.closest("li.toctree-l2").addClass("current"), i.closest("li.toctree-l3").addClass("current"), i.closest("li.toctree-l4").addClass("current"))
                } catch (o) {
                    console.log("Error expanding nav for anchor", o)
                }
            },
            onScroll: function () {
                this.winScroll = !1;
                var n = this.win.scrollTop(),
                    e = n + this.winHeight,
                    i = this.navBar.scrollTop() + (n - this.winPosition);
                n < 0 || e > this.docHeight || (this.navBar.scrollTop(i), this.winPosition = n)
            },
            onResize: function () {
                this.winResize = !1,
                    this.winHeight = this.win.height(),
                    this.docHeight = $(document).height()
            },
            hashChange: function () {
                this.linkScroll = !0,
                    this.win.one("hashchange",
                        function () {
                            this.linkScroll = !1
                        })
            },
            toggleCurrent: function (n) {
                var e = n.closest("li");
                e.siblings("li.current").removeClass("current"),
                    e.siblings().find("li.current").removeClass("current"),
                    e.find("> ul li.current").removeClass("current"),
                    e.toggleClass("current")
            }
        },
            "undefined" != typeof window && (window.SphinxRtdTheme = {
                Navigation: e.exports.ThemeNav,
                StickyNav: e.exports.ThemeNav
            }),
            function () {
                for (var r = 0,
                    n = ["ms", "moz", "webkit", "o"], e = 0; e < n.length && !window.requestAnimationFrame; ++e) window.requestAnimationFrame = window[n[e] + "RequestAnimationFrame"],
                        window.cancelAnimationFrame = window[n[e] + "CancelAnimationFrame"] || window[n[e] + "CancelRequestAnimationFrame"];
                window.requestAnimationFrame || (window.requestAnimationFrame = function (n, e) {
                    var i = (new Date).getTime(),
                        t = Math.max(0, 16 - (i - r)),
                        o = window.setTimeout(function () {
                            n(i + t)
                        },
                            t);
                    return r = i + t,
                        o
                }),
                    window.cancelAnimationFrame || (window.cancelAnimationFrame = function (n) {
                        clearTimeout(n)
                    })
            }()
    },
    {
        jquery: "jquery"
    }]
},
    {},
    ["sphinx-rtd-theme"]);
$(document).ready(function () {
    // 本地引入js文件
    $($('head')[0]).append('<script src="https://www.mindspore.cn/video/require.min.js"></script>');
    $($('body')[0]).append('<script type="text/javascript" src="/file/mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>');

    const pathname = window.location.pathname;

    let VERSION = (
        pathname.indexOf("master") === -1 &&  
        pathname.indexOf("r1.0") === -1 &&  
        pathname.indexOf("r1.1") === -1 && 
        pathname.indexOf("r1.2") === -1 && 
        pathname.indexOf("r1.3") === -1 && 
        pathname.indexOf("r1.5") === -1 && 
        pathname.indexOf("r1.6") === -1 && 
        pathname.indexOf("r1.7") === -1 && 
        pathname.indexOf("r1.8") === -1 && 
        pathname.indexOf("r1.9") === -1 && 
        pathname.indexOf("r1.10") === -1 && 
        pathname.indexOf("r0.5") === -1 && 
        pathname.indexOf("r0.6") === -1 && 
        pathname.indexOf("r0.7") === -1 && 
        pathname.indexOf("r0.1") === -1 && 
        pathname.indexOf("r0.2") === -1 &&
        pathname.indexOf("r0.3") === -1 &&  
        pathname.indexOf("r0.8") === -1 && 
        pathname.indexOf("r1.0.0-alpha") === -1 && 
        pathname.indexOf("r2.0.0-alpha") === -1 && 
        pathname.indexOf("r0.2.0-alpha") === -1 && 
        pathname.indexOf("r0.1.0-alpha") === -1 && 
        pathname.indexOf("r0.3.0-alpha") === -1 && 
        pathname.indexOf("r0.6.0-alpha") === -1 && 
        pathname.split('/')[1] !== "lite"
    ) 
    ? pathname.split('/').slice(3)[0]
    :pathname.split('/').slice(4)[0];

    // 最新版本不显示蓝色导航 
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
      'master',
    ];
    const isNewVersion = ()=>{
      let isVersion = false;
      latest_version.forEach((item)=>{
        if(isVersion) return ;
        isVersion = pathname.includes(item)&& true;
      })
      return isVersion
    }
    const docs_versionc= pathname.split('/').slice(3)[0];
    let VerText;
    
    if(host.pathname.indexOf("/docs/") === 0 && latest_version.includes(docs_versionc) ){
      VerText = pathname.split('/').slice(3)[0];
    }

    if(pathname.startsWith('/docs/') || pathname.startsWith('/tutorials/zh-CN/') || pathname.startsWith('/tutorials/en/')){
      VERSION = pathname.split('/')[3]
    }else{
      VERSION = pathname.split('/')[4]
    }
    console.log('docs ');

    // 增加左侧目录首页 
    switch (VERSION) {
        case "master":
            VerText = "master"
            break;
        case "0.1.0-alpha":
            VerText = "0.1"
            break;
        case "0.2.0-alpha":
            VerText = "0.2"
            break;
        case "0.3.0-alpha":
            VerText = "0.3"
            break;
        case "r0.5":
            VerText = "0.5"
            break;
        case "r0.6":
            VerText = "0.6"
            break;
        case "r0.7":
            VerText = "0.7"
            break;
        case "r1.0":
            VerText = "1.0"
            break;
        case "r1.1":
            VerText = "1.1"
            break;
        case "r1.2":
            VerText = "r1.2"
            break;
        case "r1.3":
            VerText = "r1.3"
            break;
        case "r1.5":
            VerText = "1.5"
            break;
        case "r1.6":
            VerText = "1.6"
            break;
        case "r1.7":
              VerText = "1.7"
              break;
        case "r1.8":
            VerText = "1.8"
            break;
        case "r1.9":
          VerText = "1.9"
          break;
        case "r1.10":
          VerText = "1.10"
          break;
          case "r0.1":
            VerText = "0.1"
            break;
        case "r0.2":
            VerText = "0.2"
            break;
        case "r0.3":
            VerText = "0.3"
            break;
        default:
          VerText = VERSION.startsWith('r')&&VERSION.slice(1)
          break;
    }

    // 获取subtitle
    let subNav = {
      title: '',
      list: [],
      versionList: []
    };
    let lang = host.href.indexOf('/en/') !== -1 ?'en':'zh-CN';
   
    $.ajax({
      type: 'get',
      url: `/menu_${lang}.json`,
      dataType: 'json',
      success: function (res) {
        res.forEach(function (item) {
          item.children && (item.subType === 2) && item.children.forEach(function (item) {
              
              item.list.forEach(function (item) {
                  if((window.location.pathname.indexOf(item.containUrl) === 0) && !subNav.list.length) {
                      subNav.title = item.subtitle;
                      if(item.subtitle === 'MindSpore' ||  item.subtitle === 'MindPandas'||
                        item.subtitle === 'MindSpore Dev Toolkit'  || item.subtitle === 'MindSpore Golden Stick'||
                        item.subtitle === 'MindSpore Vision' || item.subtitle === 'MindElec' || item.subtitle === 'MindSPONGE' ||
                        item.subtitle === 'MindFlow' 
                        ){
                        subNav.versionList = item.versionList;
                      }else if(item.containUrl === '/mindinsight/'){
                        subNav.versionList = item.subMenu[1].versionList;
                      }else{
                        subNav.list = item.subMenu;
                      }
                  }
              })
          })
        })
        let flag = 0;
        subNav.list&&subNav.list.forEach(function (item) {
            
            if(item.containUrl === '/lite/docs/zh-CN/r1.5/use/downloads.html' || item.containUrl === '/lite/docs/en/r1.5/use/downloads.html'){
                
                item.containUrl = item.containUrl.replace('/r1.5/',(curVersion === 'master') ? '/master/': '/r' + curVersion + '/')
                console.log(item.containUrl,'2222')
            }
            if(!flag && (window.location.pathname.indexOf(item.containUrl) === 0)) {
                flag = 1;
                item.active = 1;
                subNav.versionList = item.versionList || [];
            }
        })
      }
    })  
     
    const noLite = ()=>{
      let flag = false;
      const path_name = window.location.pathname;
      if(
        ( (!path_name.includes('/r0.1/') ) && path_name.startsWith('/reinforcement/') ) ||
        ((!path_name.includes('/r0.3/') || !path_name.includes('/r0.2/') ) && path_name.startsWith('/mindquantum/') )
      ){
        flag = true
      }
      return flag
    }
    

    setTimeout(() => {
      if(host.pathname.indexOf('/docs/api/') > -1){
          $('.wy-menu-vertical').before('<div class="docsHome"><a  href="#" class="welcome">欢迎查看MindSpore API</a></div>')
          $('.wy-breadcrumbs>li:first-of-type')[0].innerText = 'API (' + VerText + ')';
      }else{
          $('.wy-menu-vertical').before('<div class="docsHome"><a  href="#" class="welcome">欢迎查看MindSpore文档</a></div>')

          // 版本判断显示
          let path_name =  window.location.pathname;
          if(isNewVersion() || path_name.startsWith('/golden_stick/docs/') || path_name.startsWith('/vision/docs/') || path_name.startsWith('/mindpandas/docs/') || noLite()){
            let breadcrumbsTitle = path_name.indexOf('vision/docs') !== -1 ? 'Vision': subNav.title;
            // if(path_name.startsWith('/docs/')){
            //   VerText = VerText ==='master'?'2.0 Nightly': VerText;
            // }
            $('.wy-breadcrumbs>li:first-of-type')[0].innerText = breadcrumbsTitle +'(' + VerText + ')';
            let versionSelectDom='';
            if(!window.location.href.includes('/lite/')){
              if(subNav.versionList.length){
                versionSelectDom = `<div class='version-select-wrap'><div class="version-select-dom">
                <span class="versionText">${VerText}</span> <img src="/pic/down.svg" />
                    <ul>
                        ${subNav.versionList.map(function (item,index) {
                            if(window.location.href.indexOf("api_mapping")>-1){
                                // if(item.name=='master'){
                                //     item.value=lang == 'en' ?'/docs/migration_guide/en/master/api_mapping.html':'/docs/migration_guide/zh-CN/master/api_mapping.html'
                                // }
                                if(item.name=='1.6'){
                                    item.value=lang == 'en' ?'/docs/migration_guide/en/r1.6/api_mapping.html':'/docs/migration_guide/zh-CN/r1.6/api_mapping.html'
                                }
                                if(item.name=='1.5'){
                                    item.value=lang == 'en' ?'/docs/migration_guide/en/r1.5/api_mapping.html':'/docs/migration_guide/zh-CN/r1.5/api_mapping.html'
                                }
                            }
                            return `
                            <li><a href="${item.value}" target="${item.value.indexOf("http")>-1 ? '_blank' : '_self'}"  class='version-option'>${item.name}</a></li>
                            `;
                        }).join('')}
                    </ul>
                </div></div>`;
                $('.wy-nav-side').addClass('side-fix').prepend(versionSelectDom);
              }
            }
          }else{
            $('.wy-breadcrumbs>li:first-of-type')[0].innerText = '文档 (' + VerText + ')';
          } 
      }
      $('.welcome')[0].attributes[0].nodeValue = $('.icon-home')[0].attributes[0].nodeValue;
    },500)
         
    
    $('.wy-breadcrumbs>li:first-of-type>a').css('visibility', 'visible');
    $('.wy-breadcrumbs>li:nth-of-type(2)')[0].innerHTML = $('.wy-breadcrumbs>li:nth-of-type(2)')[0].innerHTML.replace('»', '>');
    let aList = $('.wy-menu-vertical>ul>.current>ul>.toctree-l2>a');

    //添加算子匹配
    if (VERSION !== '0.1.0-alpha' && VERSION !== '0.2.0-alpha' && VERSION !== '1.5' && VERSION !== '1.6'&& VERSION !== 'master'&& VERSION !== '1.7'&& VERSION !== '1.8') {
        let pyVersion, pyVersionText, msVersion, msVersionText
        if (VERSION == '0.3.0-alpha') {
            pyVersion = 1.5;
            pyVersionText = '1.5.0',
            msVersion = 0.3;
            msVersionText = '0.3.0-alpha'
        } else if(VERSION == 'r0.5') {
            pyVersion = 1.5;
            pyVersionText = '1.5.0',
            msVersion = 0.5;
            msVersionText = '0.5.0-beta'
        } else if(VERSION == 'r0.6') {
            pyVersion = 1.5;
            pyVersionText = '1.5.0',
            msVersion = 0.6;
            msVersionText = '0.6.0-beta'
        } else if(VERSION == 'r0.7') {
            pyVersion = 1.5;
            pyVersionText = '1.5.0',
            msVersion = 0.7;
            msVersionText = '0.7.0-beta'
        } else if(VERSION == 'r1.0') {
            pyVersion = 1.5;
            pyVersionText = '1.5.0',
            msVersion = "1.0";
            msVersionText = '1.0.0'
        } else if(VERSION == 'r1.1') {
            pyVersion = 1.5;
            pyVersionText = '1.5.0',
            msVersion = "1.1";
            msVersionText = '1.1.1'
        } else if(VERSION == 'r1.2') {
            pyVersion = 1.5;
            pyVersionText = '1.5.0',
            msVersion = "1.2";
            msVersionText = '1.2.0'
        } else if(VERSION == 'r1.3') {
            pyVersion = 1.5;
            pyVersionText = '1.5.0',
            msVersion = "1.3";
            msVersionText = '1.3.0'
        } else if(VERSION == 'r0.2') {
            pyVersion = 1.5;
            pyVersionText = '1.5.0',
            msVersion = "0.2";
            msVersionText = '1.3.0'
        } else if(VERSION == 'r0.3') {
            pyVersion = 1.5;
            pyVersionText = '1.5.0',
            msVersion = "0.3";
            msVersionText = '0.3.0'
        }   
        if(VERSION !== 'master'&&VERSION !== 'r1.5'&&VERSION !== 'r1.6'&& VERSION !== 'r1.7' && VERSION !== 'r1.8'&& VERSION !== 'r1.9'&& VERSION !== 'r1.10') {
            //找到算子支持的li
            let $elm = $('.wy-menu-vertical>ul>.toctree-l1>a,.toctree-wrapper>ul>.toctree-l1>a').filter(function(index,element){
                if (element.innerText == '算子支持') {
                    return element
                }
            })
            let tarElm =
            '<li class="toctree-l1"><a class="reference internal" href="#operator">算子匹配</a>' +
            '<ul><li class="toctree-l2"><a class="reference internal" href="#operator_api">API映射</a></li>' +
            "</ul>" +
            "</li>";
            //插入算子支持的后面
            if(host.pathname.indexOf('/lite/') == -1){
                $elm.parent().after(tarElm)
            } 
        }


        //初始根据hash决定是否更换成算子匹配页面
        replaceContent();
        if(VERSION !== 'master'&&VERSION !== 'r1.5'&&VERSION !== 'r1.6'&&VERSION !== 'r1.7'&& VERSION !== 'r1.8'&& VERSION !== 'r1.9'&& VERSION !== 'r1.10') {
            //hash值变化,重新计算
            window.addEventListener('hashchange',replaceContent)
        }

        // 加载新的内容
        function replaceContents(){
            //清空内容
            $('.rst-content>.document').empty()
            $('.rst-content').css({"padding-right":"2.5rem"})
            setTimeout(function() {
                $('.navRightWraper').css({"display":"none"})
            },0)
        }
        //根据hash决定是否更换成算子匹配页面
        function replaceContent(params) {
            let curHash = "";
            if(VERSION !== 'master') {
                curHash = window.location.hash;
            }
            if (curHash === ""&&window.location.href[window.location.href.length - 1]=='#') {
                window.location.href = window.location.href.slice(0,-1)
            }
            if(host.pathname.includes('/docs/migration_guide/zh-CN/master/api_mapping/pytorch_api_mapping.html')) {
                curHash = "#operator_api";
            }
            if (curHash === "#operator_api" || curHash === "#operator_param") {
                isH5(function(params) {
                    $(".wy-nav-side").css({left:"-90%"})
                    $("#mask").css({display:"none"})
                })
                //加载katex
                var oHead = document.getElementsByTagName('HEAD').item(0)
                var oLink = document.createElement('link');
                oLink.rel = "stylesheet";
                oLink.href = 'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css';
                oHead.appendChild(oLink);
                //清空内容
                $('.rst-content>.document').empty()
                $('.rst-content').css({"padding-right":"2.5rem"})
                setTimeout(function() {
                    $('.navRightWraper').css({"display":"none"})
                },0)
                
                if(VERSION !== 'master'&&VERSION !== 'r1.5'&&VERSION !== 'r1.6'&&VERSION !== 'r1.7'&&VERSION !== 'r1.8'&& VERSION !== 'r1.9'&& VERSION !== 'r1.9') {
                    //面包屑的内容
                    $('.wy-breadcrumbs>li:nth-of-type(2)')[0].innerHTML = "算子匹配&nbsp;>&nbsp;";
                    if ( $('.wy-breadcrumbs>li:nth-of-type(3)')[0].className !== 'wy-breadcrumbs-aside') {
                        $('.wy-breadcrumbs>li:nth-of-type(3)').empty()
                        $('.wy-breadcrumbs>li:nth-of-type(3)').append(curHash == "#operator_api"?"API映射":"参数映射")
                        // $('.wy-breadcrumbs>li:nth-of-type(3)')[0].innerHTML = curHash == "#operator_api"?"API映射":"参数映射";
                    } else {
                        $('.wy-breadcrumbs>li:nth-of-type(2)').after(('<li>'+(curHash == "#operator_api"?"API映射":"参数映射")+'</li>'))
                    }
                }
                //定义api映射内容元素
                let inputElm = `
                <div class="maping-label-wraper">
                    <label class="maping-input-label">
                        PyTorch算子:
                        <div class="maping-input-wraper">
                            <input class="maping-input" type="text" />
                            <div class="close-wraper"></div>
                            <ul class="maping-input-hotword-wraper">
                            </ul>
                        </div>
                    </label>
                </div>`
                
                let screen = document.documentElement.clientWidth;
                let typeElm;
                if (screen < 768) {
                    typeElm = `
                    <div class="maping-type-wraper-mobile">
                        <div class="maping-target">
                            <div class="maping-type-unit-mobile maping-type-unit-mobile-active">PyTorch ${pyVersion}</div>
                            <div class="maping-type-unit-mobile">MindSpore ${msVersion}</div>
                        </div>
                    </div>
                    `
                }else{
                    typeElm = `
                    <div class="maping-type-wraper">
                        <div class="maping-type-layout">
                            <div class="maping-type-unit">PyTorch ${pyVersionText}</div>
                        </div>
                        <div class="maping-type-layout">
                            <div class="maping-type-unit">MindSpore ${msVersionText}</div>
                        </div>
                    </div>
                    `
                }
                
                let contentElm = curHash === "#operator_api"?
                `<div class="maping-content-showing-wraper">
                    <div class="content-showing-unit">
                        <div class="unit-content">
                            <div id="pytorchFrame" style="width:100%;height:500px;overflow:auto;"></div>
                        </div>
                        <div class="diff-box"></div>
                        <div class="frame-copy-right">
                            <div class="copyright-license">
                                Portions of this page are obtained from 
                                <a target="_blank" href="https://github.com/pytorch/pytorch.github.io/tree/site/docs">PyTorch</a>, and are licensed under the
                                <a target="_blank" href="https://github.com/pytorch/pytorch.github.io/blob/site/LICENSE">3-Clause BSD license</a>.
                            </div>
                        </div>
                    </div>
                    <div class="content-showing-unit">
                        <div class="unit-content">
                            <div id="mindsporeFrame" style="width:100%;height:500px;overflow:auto;"></div>
                        </div>
                    </div>
                </div>`:
                `<div class="maping-params-table-wraper">
                    <table class="maping-params-table">
                    </table>
                </div>`
                let apiContentElm = `<div class="maping-content-container">${inputElm+typeElm+contentElm}</div>`
                //添加api映射内容
                $('.rst-content>.document').append(apiContentElm)

                //pytorch算子列表请求地址
                let opsUrl = '/opmapping/ops'
                //api映射请求地址 
                let mapingApiUrl = '/opmapping/op/detail'
                //参数映射请求地址
                let mapingParamUrl = '/opmapping/op/parameters' 
                //请求pytorch算子列表
                $.get( opsUrl ,{ framework: "PyTorch" , version: pyVersion , msVersion: msVersion },function(data,status){
                    let opsList = data.obj || [];
                    let storedOp = localStorage.getItem("op")
                    let defaultOp= storedOp && opsList.indexOf(storedOp)!==-1 ? storedOp : opsList[0];
                    setTimeout(function() {
                        //创建并插入算子列表元素
                        createHotWordElms(opsList)
                        //输入事件
                        $('.maping-input')[0].addEventListener('input',function(e) {
                            if (e.target.value == '') {
                                createHotWordElms(opsList)
                            }else{
                                let opsFiltered= opsList.filter(function(value,index) {
                                    return value.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
                                })
                                createHotWordElms(opsFiltered)
                            }
                            $('.maping-input-hotword-wraper').css('display','block');
                        })
                        $('.maping-input')[0].addEventListener('focus',function(e) {
                            $('.maping-input-hotword-wraper').css('display','block');
                        })
                        window.addEventListener('click',function(e) {
                            if ($(e.target).closest('.maping-input-wraper').length == 0) {
                                $('.maping-input-hotword-wraper').css('display','none');
                            }
                        })
                        
                        //为算子列表元素添加点击事件
                        if (curHash === "#operator_api") {
                            //api映射
                            $('.maping-input')[0].value = defaultOp
                            getApiDetailAndReplaceContent(defaultOp)
                            $('.maping-input-hotword-wraper').on('click','li',function(){
                                $('.maping-input')[0].value = this.innerText //input值
                                createHotWordElms(opsList) //input下拉选项
                                localStorage.setItem("op",this.innerText)
                                setTimeout(function(){
                                    $('.maping-input')[0].blur()
                                    $('.maping-input-hotword-wraper').css('display','none')
                                },0)
                                getApiDetailAndReplaceContent(this.innerText)
                            })
                        }else if(curHash === "#operator_param"){
                            //参数映射
                            $('.maping-input')[0].value = defaultOp
                            $('.maping-input')[0].blur()
                            getParamsAndReplaceContent(defaultOp)
                            $('.maping-input-hotword-wraper').on('click','li',function(){
                                $('.maping-input')[0].value = this.innerText //input值
                                createHotWordElms(opsList) //input下拉选项
                                localStorage.setItem("op",this.innerText)
                                setTimeout(function(){
                                    $('.maping-input')[0].blur() 
                                    $('.maping-input-hotword-wraper').css('display','none')
                                },0)
                                getParamsAndReplaceContent(this.innerText)
                            })
                        }else{}

                        //为版本选择添加事件
                        $('.maping-type-version-select').on('change',function(e) {
                            if (curHash === "#operator_api") {
                                getApiDetailAndReplaceContent($('.maping-input')[0].value)
                            }else if(curHash === "#operator_param"){
                                getParamsAndReplaceContent($('.maping-input')[0].value)
                            }
                        })

                        //给input后面的关闭图标添加点击事假
                        $('.close-wraper').on('click',function(e) {
                            if ($('.maping-input')[0].value !== '') {
                                $('.maping-input')[0].value = ''
                                createHotWordElms(opsList)
                            }
                        })

                        //移动端事件
                        isH5(function(){
                            $(".content-showing-unit").eq(1).css({display:"none"})
                            $(".maping-type-unit-mobile").on('click',function(){
                                $(".maping-type-unit-mobile").removeClass("maping-type-unit-mobile-active")
                                $(this).addClass("maping-type-unit-mobile-active")
                                $(".content-showing-unit").css({display:"none"})
                                $(".content-showing-unit").eq($(this).index()).css({display:"block"})
                            })
                        })
                    },0)
                })
                function createHotWordElms(opsList) {
                    $('.maping-input-hotword-wraper').empty()
                    if (opsList && opsList.length>0) {
                        let fragment = document.createDocumentFragment()
                        opsList.forEach(function(item,index){
                            $(fragment).append('<li class="hotword-li">'+item+'</li>')
                        })
                        $('.maping-input-hotword-wraper').append(fragment)
                        updateVersion()
                    }else{
                        $('.maping-input-hotword-wraper').append($('<div class="not-found" style="display:none;">not found</div>'))
                        $(".not-found").css({display:"block"})
                    }
                }

                function getParamsAndReplaceContent(op) {
                    $.get(mapingParamUrl, { framework: "PyTorch", op: op,version:pyVersion,msVersion:msVersion}, function(data,status) {
                        let tableData = data.obj;
                        $('.maping-params-table').empty();
                        let fragment = document.createDocumentFragment()
                        if (tableData.length>0) {
                            tableData.forEach(function(item,index){
                                $(fragment).append(
                                    `<tr>
                                        <td>${item.pytorch?item.pytorch:''}</td>
                                        <td>${item.mindspore?item.mindspore:''}</td>
                                    </tr>`)
                            })
                        } else {
                            $(fragment).append(
                                `<tr>
                                    <td style="text-align:center">暂无数据</td>
                                </tr>`)
                        }
                        $('.maping-params-table').append(fragment)
                    })
                }
        
                function getApiDetailAndReplaceContent(op) {
                    $.get(mapingApiUrl, { framework: "PyTorch", op: op, version:pyVersion,msVersion:msVersion}, function(data,status) {
                        if (status !== 'success') {
                            $('.frame-copy-right').css({display:"none"})
                            return
                        }
                        let pytorchHtml = data.obj&&data.obj.torchOp&&data.obj.torchOp.description?data.obj.torchOp.description:''
                        let mindsporeHtml = data.obj&&data.obj.msOp&&data.obj.msOp.length>0?data.obj.msOp[0].description:''
                        $('#pytorchFrame').empty()
                        $('#mindsporeFrame').empty()
                        $('#pytorchFrame').append($(pytorchHtml))
                        $('#mindsporeFrame').append($(mindsporeHtml))

                        // 增加算子匹配的区别显示
                        let diffstring = data.obj && data.obj.diffstring && data.obj.diffstring.length > 0 ? data.obj.diffstring : '';
                        let diffstringTitle = '';
                        let diffLink = '';
                        let diffHtml = '';
                        let diffAPILink = 'https://www.mindspore.cn/docs/migration_guide/zh-CN/master/api_mapping/pytorch_api_mapping.html';
                        if(diffstring.length > 0) {
                            if(diffstring.indexOf('[diff]') !== -1) {
                                diffstringTitle = '差异对比' 
                                if(diffstring.indexOf('https://gitee.com') !== -1) {
                                    diffLink = diffstring.substring(7,diffstring.length-1);
                                    if (window.location.pathname.indexOf('zh-CN') !== -1) {
                                        diffLink =  diffLink.substring(0,diffLink.length-6) + '.md';
                                    } 
                                }
                                diffHtml = `
                                    <div class="diff-content">
                                        <a href=${diffLink} target="_blank">${diffstringTitle}</a>
                                        <div class="diff-content-enclosure">
                                            更多信息请参见社区提供的<a target="_blank" href=${diffAPILink} >API映射列表</a>（算子持续更新中...）
                                        </div>
                                    </div>
                                `
                            } else {
                                if(diffstring.indexOf('diff') === 0) {
                                    diffstringTitle = '差异对比' ;
                                } else if(diffstring.indexOf('same') === 0) {
                                    diffstringTitle = '功能一致';
                                }
                                 diffHtml = `
                                    <div class="diff-content">
                                        ${diffstringTitle}
                                        <div class="diff-content-enclosure">
                                            更多信息请参见社区提供的<a target="_blank" href=${diffAPILink} >API映射列表</a>（算子持续更新中...）
                                        </div>
                                    </div>
                                 `
                            }
                        }
                        $('.diff-box').empty();
                        $('.diff-box').append(diffHtml);

                        setTimeout(function(){
                            //重新渲染mindsporeFrame下的公式
                            window.MathJax&&window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub,"#mindsporeFrame"]);
                            // 算子匹配的时候，不要blockquote的样式
                            $('.rst-content .maping-content-container blockquote').addClass('operate-api');
                        },0)
                    })
                }

                function updateVersion() {
                    setTimeout(() => {
                        let op = localStorage.getItem('op')
                        let leftTextDis = ''
                        let leftVersionDis = ''
                        let leftVersionTextDis = ''
                        if(op.split('.')[0] === 'torchvision') {
                            leftTextDis = 'Torchvision'
                            leftVersionDis = '0.10'
                            leftVersionTextDis = '0.10.0'
                        } else if (op.split('.')[0] === 'torchtext') {
                            leftTextDis = 'TorchText'
                            leftVersionDis = '0.10'
                            leftVersionTextDis = '0.10.0'
                        } else if (op.split('.')[0] === 'torchaudio') {
                            leftTextDis = 'TorchAudio'
                            leftVersionDis = '0.9'
                            leftVersionTextDis = '0.9.0'
                        } else {
                            leftTextDis = 'PyTorch'
                            leftVersionDis = pyVersion
                            leftVersionTextDis = pyVersionText
                        }
                        $('.maping-type-wraper .maping-type-layout .maping-type-unit').eq(0).text(`${leftTextDis} ${leftVersionTextDis}`)
                        $('.maping-type-wraper-mobile .maping-target .maping-type-unit-mobile').eq(0).text(`${leftTextDis} ${leftVersionDis}`)
                    }, 0);
                }
            }
            if(curHash === "#operator_api" ){
                // 是否大于r1.2版本
                let isBigthen12=true
                if(VERSION=='r0.6'||
                VERSION=='r0.5'||
                VERSION=='r0.7'||
                VERSION=='r0.8'||
                VERSION=='r0.9'||
                VERSION=='r1.0'||
                VERSION=='r1.1'
                ){
                    isBigthen12=false
                }
                 //清空内容
                 $('.rst-content>.document').empty()
                 $('.rst-content').css({"padding-right":"2.5rem"})
                 setTimeout(function() {
                     $('.navRightWraper').css({"display":"none"})
                 },0)
                 let inputElm =`<div style="margin-top:20px;">
                 ${
                    `<p>PyTorch APIs和MindSpore APIs之间的映射关系详见<a href="https://gitee.com/mindspore/docs/blob/${VERSION}/resource/${isBigthen12?"api_mapping/":""}api_mapping.md">API映射</a>。</p>`
                 }
                 </div>`
                 $('.rst-content>.document').append(inputElm)
            }
        }
    }
    
    
    if ($('li.current>ul').length === 0) {
        $('li.current').addClass('notoctree-l2')
    }
    for (let i = 0; i < aList.length; i++) {
        let hash = aList[i].hash;
        if (hash != '') {
            aList[i].parentNode.parentNode.style.display = 'none';
            aList[i].parentNode.parentNode.parentNode.className = aList[i].parentNode.parentNode.parentNode.className + ' ' + 'navNoPlus';
        }
    }
    // 设置右侧导航
    // let pathname = window.location.pathname;

    // 页面内搜索框提示具体搜索内容
    if(pathname.indexOf('/doc/api_python/') !== -1) {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', '"Python API" 内搜索');
    } else if(pathname.indexOf('/doc/api_cpp/') !== -1) {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', '"C++ API" 内搜索');
    } else if(pathname.indexOf('/doc/api_java/') !== -1) {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', '"Java API" 内搜索');
    } else if(pathname.indexOf('/doc/programming_guide/') !== -1) {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', '"编程指南" 内搜索');
    } else if(pathname.indexOf('/doc/migration_guide/') !== -1) {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', '"迁移指南" 内搜索');
    } else if(pathname.indexOf('/doc/note/') !== -1) {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', '"规格和说明" 内搜索');
    } else if(pathname.indexOf('/doc/faq/') !== -1) {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', '"FAQ" 内搜索');
    } else {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', '"文档" 内搜索');
    }

    if (pathname.indexOf('/index.html') !== -1) {
        $('.welcome').addClass('selected');
    }
    sessionStorage.setItem('newApiPathname', pathname);
    if (pathname == "/zh-CN/master/index.html") {
        let h1List = $('h1');
        let $ul = '<div class="navRight"><ul class="navList"></ul></div>';
        $('body').prepend($ul);
        for (let i = 0; i < h1List.length; i++) {
            var navLi = '<li><a href="#' + h1List[i].parentNode.id + '">' + h1List[i].innerText + '</a></li>';
            $('.navList').append(navLi);
            let id = h1List[i].parentNode.id;
            let h2 = $('#' + id + ' ' + '.caption-text');
            if (h2.length > 0) {
                var navLi2 = '';
                let navList2 = '<ul class="navList2"></ul>';
                $('.navList>li').append(navList2);
                for (let i = 0; i < h2.length; i++) {
                    h2[i].id = h2[i].innerText;
                    navLi2 += "<li><a href='#" + h2[i].innerText + "'>" + h2[i].innerText + "</a></li>";
                }
            }
        }
        $('.navList2').append(navLi2);
    } else {
        let sectionList = $('.document>div:first-of-type>.section');
        let h1List = $('.section>h1');
        let h2List = $('.section>h2');
        let codeList = $('dl>dt>.descname:not(.method .descname)');
        if (sectionList[0] === undefined) {
            return;
        }
        let $ul = '<div class="navRight"><ul class="navList"><li class="navLi"><a href="#' + sectionList[0].id + '">' + h1List[0].innerText + '</a><ul class="navList2"></ul></li></ul></div>';

        $('body').prepend($ul);
        if (h2List.length > 0) {
            for (let i = 0; i < h2List.length; i++) {
                // 正则去除括号、保留内容
                let id = h2List[i].parentNode.id.replace(/\(([^).']*)\)/g,"$1").replace(/\“|\”|\'/g, "");
                let h3 = $('#' + id + ' ' + 'h3');
                if (h3.length > 0) {
                    var navLi3 = '';
                    for (let i = 0; i < h3.length; i++) {
                        if(h3[i].parentNode.querySelectorAll('h4').length>0){
                            var navLi4='';
                            let navLi4Array=h3[i].parentNode.querySelectorAll('h4')
                            for(let k=0;k<navLi4Array.length;k++){
                                navLi4+='<li><a href=\'#' + navLi4Array[k].parentNode.id + '\'>' + navLi4Array[k].innerText + '</a></li>';
                            }
                            navLi3 += "<li><a href='#" + h3[i].parentNode.id + "'>" + h3[i].innerText + "</a><ul class='navList4'>"+navLi4+"</ul></li>";
                        }else{         
                            navLi3 += "<li><a href='#" + h3[i].parentNode.id + "'>" + h3[i].innerText + "</a></li>";
                        }
                    }
                    var navLi2 = '<li><a href="#' + h2List[i].parentNode.id + '">' + h2List[i].innerText + '</a><ul class="navList3"></ul></li>';
                } else {                  
                    if(h2List[i].parentNode.querySelectorAll('.class>dt .descname,.function>dt .descname').length>0){
                        let navLi3Array=h2List[i].parentNode.querySelectorAll('.class>dt .descname,.function>dt .descname');
                        var navLi3 = '';
                        for(let j=0;j<navLi3Array.length;j++){
                            if(navLi3Array[j].parentNode.parentNode.querySelectorAll('dd .descname').length>0){
                                var navLi4='';
                                let navLi4Array=navLi3Array[j].parentNode.parentNode.querySelectorAll('dd .descname');
                                for(let k=0;k<navLi4Array.length;k++){
                                    navLi4+='<li><a href=\'#' + navLi4Array[k].parentNode.id + '\'>' + navLi4Array[k].innerText + '</a></li>';
                                }
                                navLi3 += '<li><a href=\'#' + navLi3Array[j].parentNode.id + '\'>' + navLi3Array[j].innerText + '</a><ul class="navList4">'+navLi4+'</ul></li>';
                            }else{
                                navLi3 += '<li><a href=\'#' + navLi3Array[j].parentNode.id + '\'>' + navLi3Array[j].innerText + '</a><ul class="navList4"></ul></li>';
                            }
                        }
                         var navLi2 = '<li><a href="#' + h2List[i].parentNode.id + '">' + h2List[i].innerText + '</a><ul class="navList3"></ul></li>';
                    }else{
                        var navLi2 = '<li><a href="#' + h2List[i].parentNode.id + '">' + h2List[i].innerText + '</a></li>';
                    }
                }
                if (window.location.pathname.indexOf('/mindspore/mindspore.train.html') !== -1 ||
                    window.location.pathname.indexOf('/mindspore/mindspore.nn.probability.html') !== -1 ||
                    window.location.pathname.indexOf('/mindspore/mindspore.dataset.text.html') !== -1 ||
                    window.location.pathname.indexOf('/mindspore/mindspore.dataset.transforms.html') !== -1 ||
                    window.location.pathname.indexOf('/mindspore/mindspore.dataset.vision.html') !== -1 ||
                    window.location.pathname.indexOf('/mindspore/mindspore.dataset.transforms.vision.html') !== -1 ) {
                    let classAnchors = $(h2List[i].parentNode).find('.class>dt,.function>dt');
                    var navLi3 = '';
                    for (let j = 0; j < classAnchors.length; j++) {
                        navLi3 += "<li><a href='#" + classAnchors[j].id + "'>" + classAnchors[j].id.split('.').pop() + "</a></li>";
                    }
                    var navLi2 = '<li><a href="#' + h2List[i].parentNode.id + '">' + h2List[i].innerText + '</a><ul class="navList3"></ul></li>';
                }
                $('.navList2').append(navLi2);
                $('.navList2>li:nth-of-type(' + (i + 1) + ') .navList3').append(navLi3);
            }
        } else {
            // for (let i = 0; i < codeList.length; i++) {
            //     var codeLi2 = '<li><a href="#' + codeList[i].parentNode.id + '">' + codeList[i].innerText + '</a><ul class="navList3"></ul></li>';
            //     $('.navList2').append(codeLi2);
            // }
            var navLi3 = '';
            for (let i = 0; i < codeList.length; i++) {
                var codeLi2 = '<li><a href="#' + codeList[i].parentNode.id + '">' + codeList[i].innerText + '</a><ul class="navList3"></ul></li>';
                $('.navList2').append(codeLi2);
                navLi3 = '';
                if($(codeList[i].parentNode).next().length) {
                    $(codeList[i].parentNode).next().find('.method .descname').each(function () {
                        navLi3 += '<li><a href="#' + $(this)[0].parentNode.id + '">' + $(this).text() + '</a></li>';
                    })
                    $('.navList2 .navList3').eq(i).append(navLi3);
                }
            }
        }

    }

    // 点击右侧导航标绿
    $('.navList a').on('click', function () {
        let navAlist = $('.navList a');
        for (let i = 0; i < navAlist.length; i++) {
            setTimeout(()=>{
                navAlist.removeClass('selected');
            })
        }
        setTimeout(()=>{
            $(this).addClass('selected');
        })
    })
    // 右侧导航可滚动蒙层
    function computeNavRightMask() {
        let scrollable = $('.navRight').height() < $('.navRight > .navList').height();
        let isScrolledAtBottom =  $('.navRight > .navList').height() - $('.navRight').scrollTop() < $('.navRight').height() + 10;
        if (scrollable && !isScrolledAtBottom) {
            $('.navRightMasker').css("display","block")
        } else {
            $('.navRightMasker').css("display","none")
        }
    }
    $(".navRight").wrap('<div class="navRightWraper"></div>');
    $(".navRightWraper").append('<div class="navRightMasker"></div>')
    computeNavRightMask()
    $('.navRight').scroll(computeNavRightMask)

    
    //右侧导航添加tips
    $('.wy-grid-for-nav').after("<div id='tip' style='position:absolute; width:fit-content; z-index:99999; background-color: #ffffff; border: 1px solid #555555; overflow: visible;visibility: hidden;font-size:12px;padding:4px 8px;color:#333333;box-shadow: rgb(238 238 238) 2px 2px 2px 2p;'></div>")
    let doms=$('.navList li a')
    for(let i=0;i<doms.length;i++){
        if(doms[i].scrollWidth>doms[i].clientWidth){
            doms.eq(i).on('mouseover',function(e){
                let x=e.clientX;
                let y=e.clientY;
                let tip=document.querySelector('#tip')
                tip.innerHTML=e.target.innerHTML;
                tip.style.visibility="visible";
                console.log(e.target.clientX)
                tip.style.left=e.target.getClientRects()[0].left-(e.target.scrollWidth-e.target.clientWidth)+'px';
                tip.style.top=e.target.getClientRects()[0].y+20+'px';
            })
            doms.eq(i).on('mouseout',function(e){
                let tip=document.querySelector('#tip')
                tip.innerHTML='';
                tip.style.visibility="hidden";
            })
        }
    }

    
    // jQuery中id含有特殊字符转义后使用
    function escapeJquery(srcString) {
        // 转义之后的结果
        var escapseResult = srcString;
        // javascript正则表达式中的特殊字符
        var jsSpecialChars = ["\\", "^", "$", "*", "?", ".", "+", "(", ")", "[", "]", "|", "{", "}"];
        // jquery中的特殊字符,不是正则表达式中的特殊字符
        var jquerySpecialChars = ["~", "`", "@", "#", "%", "&", "=", "'", "\"",	":", ";", "<", ">", ",", "/"];
        for (var i = 0; i < jsSpecialChars.length; i++) {
          escapseResult = escapseResult.replace(
            new RegExp("\\"+ jsSpecialChars[i], "g"), 
            "\\" + jsSpecialChars[i]
          );
        }
        for (var i = 0; i < jquerySpecialChars.length; i++) {
          escapseResult = escapseResult.replace(
            new RegExp(jquerySpecialChars[i],"g"), 
            "\\" + jquerySpecialChars[i]
          );
        }
        return escapseResult;
    }

    // 锚点跟随滚动定位\
    function navContentAnchor() {
        for (let i = 0; i < $(".navList a").length; i++) {
            let anchorId = $(".navList a").eq(i).attr("href").substring(1);
            let newAnchorId = escapeJquery(anchorId);
            if(!newAnchorId) return;
            if ($("#" + newAnchorId).offset().top - 60 < 116) {
                $(".navList a").removeClass("selected");
                $(".navList a").eq(i).addClass("selected");
            }
        }
        return false;
    }
    navContentAnchor();
    $('.wy-grid-for-nav').scroll(navContentAnchor);
   
    // 解决目录滚动问题
    let height = sessionStorage.getItem('height');
    if (height === null) {
        $('.wy-side-scroll').scrollTop(0)
    } else {
        $('.wy-side-scroll').scrollTop(height)
    }
    $('.wy-side-scroll a').on('click', function () {
        sessionStorage.setItem('height', $('.wy-side-scroll')[0].scrollTop);
    })
    $('.wy-menu-vertical a').on('click', function (e) {
        let txt = e.target.innerText;
        if (txt === 'predict') {
            $(this)[0].target = '_blank'
        }
    });
    let faq = window.location.pathname;
    if (faq.indexOf('FAQ.html') != -1) {
        $('.wy-side-scroll').scrollTop(document.body.scrollHeight)
    }
    // 记录当前点击source的位置
    let sourceHeight = sessionStorage.getItem('sourceHeight');
    let lastSourceUrl = sessionStorage.getItem('lastSourceUrl');
    if (lastSourceUrl && lastSourceUrl !== window.location.pathname) {
        sourceHeight = 0
    }
    if (sourceHeight) {
        $('.wy-grid-for-nav').scrollTop(sourceHeight)
    }else{
        $('.wy-grid-for-nav').scrollTop(0)
    }
    $('.viewcode-link').on('click', function (e) {
        sessionStorage.setItem('sourceHeight', $('.wy-grid-for-nav')[0].scrollTop);
        sessionStorage.setItem('lastSourceUrl', window.location.pathname);
    })
   
    let mask = '<div id="mask"></div>'
    isH5(function () {
        $('.wy-nav-content').append(mask);
    })


    // 判断是否 h5
    function isH5(cb) {
        let screen = document.documentElement.clientWidth;
        if (screen < 768) {
            cb()
        }
    }

    // 项目内部页面不开新页面，项目外链接开新页面
    $('.rst-content a').each(function () {
        let hrefStr= $(this).attr('href');
        if( hrefStr.indexOf('https:') !== -1 && hrefStr.indexOf('https://www.mindspore.cn') === -1) {
            $(this).attr('target','_blank');
        } else {
            $(this).attr('target','_self');
        }
    })
    $('.rst-content a').on('click', function (e) {
        e.preventDefault();
        window.open($(this).attr('href'), ($(this).attr('target') || "_self"));
    })   
    setTimeout(() => {
        let doms=document.querySelectorAll('.toctree-l1 a')
        doms.forEach(item=>{
            if(item.innerText&&item.innerText.includes('.')&&!item.innerText.includes(' ')){
                if(item.offsetWidth>238){
                    item.innerText=insertStr(item.innerText, item.innerText.lastIndexOf(".")+1,' ')
                }
            }
            
        })
        
    }, 10);
    setTimeout(() => {
        let doml2=document.querySelectorAll('.toctree-l2 a')
        doml2.forEach(item=>{
            if(item.innerText&&item.innerText.includes('.')&&!item.innerText.includes(' ')){
                if(item.offsetWidth>232){
                    item.innerText=insertStr(item.innerText, item.innerText.lastIndexOf(".")+1,' ')
                }
            }
            
        })
    }, 500);
    function insertStr(soure, start, newStr){   
        return soure.slice(0, start) + newStr + soure.slice(start);
    }
     
})
