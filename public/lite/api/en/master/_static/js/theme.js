/* sphinx_rtd_theme version 0.4.3 | MIT license */
/* Built 20190212 16:02 */

var oHead = document.getElementsByTagName('HEAD').item(0)
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
// 添加共用js，针对文档内容的特殊化处理
let origin=location.origin
let jsScript = document.createElement('script');
jsScript.type = "text/javascript";
jsScript.src=origin + '/commonJs/docHandle.js'  
setTimeout(()=>{
    oHead.appendChild(jsScript);
})


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
if(path.includes('.html')){
  path=host.pathname.split('/')[1]+ '/'+host.pathname.split('/')[2]+ '/'+host.pathname.split('/')[3]
}
let pathname = host.origin +'/'+path;
var oHead = document.getElementsByTagName('HEAD').item(0)
var oLink = document.createElement('link');
oLink.rel = "stylesheet";
oLink.href =pathname+'/_static/css/h5_docs.css';
oScript.type = "text/javascript";
oScript.src=pathname + '/_static/js/common_docs.js'  
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
                                    skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'a'],
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
    $($('body')[0]).append('<script async="async" type="text/javascript" src="/file/mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>');
     
    let VERSION = (
        host.pathname.indexOf("master") === -1 &&  
        host.pathname.indexOf("r1.0") === -1 &&  
        host.pathname.indexOf("r1.1") === -1 && 
        host.pathname.indexOf("r1.2") === -1 && 
        host.pathname.indexOf("r1.3") === -1 && 
        host.pathname.indexOf("r1.5") === -1 && 
        host.pathname.indexOf("r1.6") === -1 && 
        host.pathname.indexOf("r1.7") === -1 && 
        host.pathname.indexOf("r1.8") === -1 && 
        host.pathname.indexOf("r1.9") === -1 && 
        host.pathname.indexOf("r1.10") === -1 && 
        host.pathname.indexOf("r0.5") === -1 && 
        host.pathname.indexOf("r0.6") === -1 && 
        host.pathname.indexOf("r0.7") === -1 && 
        host.pathname.indexOf("r0.1") === -1 && 
        host.pathname.indexOf("r0.2") === -1 && 
        host.pathname.indexOf("r0.3") === -1 && 
        host.pathname.split('/')[1] !== "lite"
    ) 
    ? window.location.pathname.split('/').slice(3)[0]
    :window.location.pathname.split('/').slice(4)[0];
    // 统一修改title
    let tit = $('title');
    tit.text('MindSpore');

    
    // 最新版本不显示蓝色导航 1.7>
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
    let p_name = window.location.pathname;
    const docs_versionc= p_name.split('/').slice(3)[0];
    let VerText;

    if(p_name.indexOf("/docs/") === 0 && latest_version.includes(docs_versionc) ){
      VerText = p_name.split('/').slice(3)[0];
    }
    if(p_name.startsWith('/docs/') || p_name.startsWith('/tutorials/zh-CN/') || p_name.startsWith('/tutorials/en/')){
      VERSION = p_name.split('/')[3]
    }else{
      VERSION = p_name.split('/')[4]
    }

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
          VerText = "1.2"
          break;
      case "r1.3":
          VerText = "1.3"
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
                      if(item.subtitle === 'MindSpore Vision' || item.subtitle === 'MindSpore' || item.subtitle === 'MindPandas'){
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
 

    setTimeout(() => {
      if(host.pathname.indexOf('/docs/api/') > -1){
          $('.wy-menu-vertical').before('<div class="docsHome"><a  href="#" class="welcome">MindSpore API</a></div>')
          $('.wy-breadcrumbs>li:first-of-type')[0].innerText = 'API (' + VerText + ')';
      }else{
          $('.wy-menu-vertical').before('<div class="docsHome"><a  href="#" class="welcome">MindSpore Documentation</a></div>') 

          // 版本判断显示 
          if(isNewVersion() || host.pathname.startsWith('/vision/docs') || host.pathname.startsWith('/mindpandas/docs') ){
            let isVisionTitle = window.location.pathname.indexOf('vision/docs') !== -1 ? 'Vision': subNav.title;
             
            $('.wy-breadcrumbs>li:first-of-type')[0].innerText = isVisionTitle +'(' + VerText + ')';
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
            $('.wy-breadcrumbs>li:first-of-type')[0].innerText = 'Docs (' + VerText + ')';
          } 
      }
      $('.welcome')[0].attributes[0].nodeValue = $('.icon-home')[0].attributes[0].nodeValue;
    },500)
         
    
    $('.wy-breadcrumbs>li:first-of-type>a').css('visibility', 'visible');
    $('.wy-breadcrumbs>li:nth-of-type(2)')[0].innerHTML = $('.wy-breadcrumbs>li:nth-of-type(2)')[0].innerHTML.replace('»', '>');

    let aList = $('.wy-menu-vertical>ul>.current>ul>.toctree-l2>a');
    for (let i = 0; i < aList.length; i++) {
        let hash = aList[i].hash;
        if (hash != '') {
            aList[i].parentNode.parentNode.style.display = 'none';
            aList[i].parentNode.parentNode.parentNode.className = aList[i].parentNode.parentNode.parentNode.className + ' ' + 'navNoPlus';
        }
    }

    // 教程首页中间导航点击在本页打开
    $('.toctree-l1 .reference').on('click', function (e) {
        e.preventDefault();
        window.open($(this).attr('href'), ($(this).attr('target') || "_self"))
    })

    // 设置右侧导航
    let pathname = window.location.pathname;

     // 页面内搜索框提示具体搜索内容
    if(pathname.indexOf('/doc/api_python/') !== -1) {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', 'Search in Python API');
    } else if(pathname.indexOf('/doc/api_cpp/') !== -1) {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', 'Search in C++ API');
    } else if(pathname.indexOf('/doc/api_java/') !== -1) {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', 'Search in Java API');
    } else if(pathname.indexOf('/doc/programming_guide/') !== -1) {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', 'Search in Programming Guide');
    } else if(pathname.indexOf('/doc/note/') !== -1) {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', 'Search in Specification and Notes');
    } else if(pathname.indexOf('/doc/faq/') !== -1) {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', 'Search in FAQ');
    } else {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', 'Search in API');
    }

    if (pathname.indexOf('/index.html') !== -1) {
        $('.welcome').addClass('selected');
    }
    sessionStorage.setItem('newApiPathname', pathname);
    if (pathname == "/tutorial/en/master/index.html" || pathname == "/lite/tutorial/zh-CN/master/index.html") {
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
                    if (h2[i].innerText === 'Statement') {
                        navLi2 += "";
                    } else {
                        h2[i].id = h2[i].innerText;
                        navLi2 += "<li><a href='#" + h2[i].innerText + "'>" + h2[i].innerText + "</a></li>";
                    }
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
                let id = h2List[i].parentNode.id;
                let h3 = $('#' + id + ' ' + 'h3');
                if (h3.length > 0) {
                    var navLi3 = '';
                    for (let i = 0; i < h3.length; i++) {
                        navLi3 += "<li><a href='#" + h3[i].parentNode.id + "'>" + h3[i].innerText + "</a></li>";
                    }
                    var navLi2 = '<li><a href="#' + h2List[i].parentNode.id + '">' + h2List[i].innerText + '</a><ul class="navList3"></ul></li>';
                } else {
                    if(pathname.indexOf('lite/api') > -1 ) {
                        codeList = $(h2List[i].parentNode).find('.class>dt>.descname:not(.method .descname),.function.parents:not(.class)>dt>.descname:not(.method .descname),.enum>dt>.descname:not(.method .descname),.member>dt>.descname:not(.method .descname),.type>dt>.descname:not(.method .descname)');
                        navLi3 = ''
                        for (let i = 0; i < codeList.length; i++) {
                            navLi3 += '<li><a href="#' + codeList[i].parentNode.id + '">' + codeList[i].innerText + '</a></li>';
                        }
                        var navLi2 = '<li><a href="#' + h2List[i].parentNode.id + '">' + h2List[i].innerText + '</a><ul class="navList3"></ul></li>';
                    } else {
                        let classAnchors = $(h2List[i].parentNode).find('.class>dt,.function>dt');
                        var navLi3 = '';
                        for (let j = 0; j < classAnchors.length; j++) {
                            navLi3 += "<li><a href='#" + classAnchors[j].id + "'>" + classAnchors[j].id.split('.').pop() + "</a></li>";
                        }
                        var navLi2 = '<li><a href="#' + h2List[i].parentNode.id + '">' + h2List[i].innerText + '</a><ul class="navList3"></ul></li>';
                    }
                }                
                $('.navList2').append(navLi2);
                $('.navList2>li:nth-of-type(' + (i + 1) + ') .navList3').append(navLi3);
            }
        } else {
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
   
    // window.addEventListener('scroll', function () {
    //     if ($(document).scrollTop() > 60) {
    //         $('.wy-nav-side').css('top', '0')
    //     } else {
    //         $('.wy-nav-side').css('top', '3rem')
    //     }
    // })
    $('.wy-menu-vertical a').on('click', function (e) {
        e.preventDefault();
        window.open($(this).attr('href'), ($(this).attr('target') || "_self"))
    })

     // 项目内部页面不开新页面，项目外链接开新页面
     $('.rst-content a').each(function () {
        let url= $(this).attr('href');
        if (url.indexOf('https') != -1 && url.indexOf('https://www.mindspore.cn') === -1) {
            $(this).attr('target','_blank');
        } else {
            $(this).attr('target','_self');
        }
    })
    $('.rst-content a').on('click', function (e) {
        e.preventDefault();
        window.open($(this).attr('href'), ($(this).attr('target') || "_self"));
    })
    
    // 解决目录滚动问题
    let height = sessionStorage.getItem('height');
    if (height === null) {
        $('.wy-side-scroll').scrollTop(0)
    } else {
        $('.wy-side-scroll').scrollTop(height)
    }
    $('.wy-menu-vertical a').on('click', function () {
        sessionStorage.setItem('height', $('.wy-side-scroll')[0].scrollTop);
    })
   
    
   let mask = '<div id="mask"></div>'
   isH5(function () {
       $('.wy-nav-content').append(mask);
    //    $('.math').css('display', 'none');
       $('.math').css('overflow', 'hidden');
   })


   // 判断是否 h5
   function isH5(cb) {
       let screen = document.documentElement.clientWidth;
       if (screen < 768) {
           cb()
       }
   }
   // /doc/api_python/zh-CN/r1.2/index.html页面添加下载链接
   if(pathname.indexOf('/doc/api_python/en/r1.2/index.html') !== -1) {
    $('.wy-nav-content h1').after(
        `<p><a href=" https://mindspore-website.obs.cn-north-4.myhuaweicloud.com/api/MindSpore_1.2_API.rar">Download API Documents</a></p>`
        )
    }
    if(pathname.indexOf('/docs/api/')!==-1){
        document.styleSheets[0].addRule('.rst-content div:not(.node) blockquote::before','display:none;')
        document.styleSheets[0].addRule('.rst-content div:not(.node) blockquote>div','padding-left:0;')
        document.styleSheets[0].addRule('.rst-content blockquote','position:unset;line-height:unset;margin:0;padding:unset;background-color:unset;')
    }
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