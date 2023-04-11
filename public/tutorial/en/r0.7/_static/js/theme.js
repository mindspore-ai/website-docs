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

// 公共css/js文件
var oHead = document.getElementsByTagName('HEAD').item(0)
var oScript = document.createElement('script');
let host =  window.location;
let path = (
        (host.pathname.indexOf("master") === -1 || host.pathname.indexOf("tutorials") > -1) && 
        host.pathname.indexOf("r1.0") === -1 &&  
        host.pathname.indexOf("r1.1") === -1 && 
        host.pathname.indexOf("r1.2") === -1 && 
        host.pathname.indexOf("tutorials") > -1 && 
        host.pathname.indexOf("r0.2") === -1 && 
        host.pathname.indexOf("r0.3") === -1 && 
        host.pathname.split('/')[1] !== "lite" &&
        host.pathname.indexOf("tutorials/experts") === -1 &&
        host.pathname.indexOf("tutorials/application") === -1
    ) 
    ? host.pathname.split('/')[1]+ '/'+host.pathname.split('/')[2]+ '/'+host.pathname.split('/')[3]
    :host.pathname.split('/')[1]+ '/'+host.pathname.split('/')[2]+ '/'+host.pathname.split('/')[3]+ '/'+host.pathname.split('/')[4]

// 教程-初级目录结构不一致
if((path.split('/')[0] === 'tutorial' || path.split('/')[0] === 'tutorials') && 
   (path.split('/')[1] == 'zh-CN' ||  path.split('/')[1] == 'en') 
) {
    path = path.split('/')[0]+ '/'+path.split('/')[1]+ '/'+path.split('/')[2];
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
                        window.onload = function () {
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
    $($('body')[0]).append('<script type="text/javascript" src="/file/mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>');
    // 增加左侧目录首页
    let VerText;
    const pathname = window.location.pathname;
    let version = (
       (pathname.indexOf("master") === -1 || pathname.indexOf("tutorials") > -1) && 
        pathname.indexOf("r1.0") === -1 &&  
        pathname.indexOf("r1.1") === -1 && 
        pathname.indexOf("r1.2") === -1 && 
        pathname.indexOf("tutorials") > -1 && 
        pathname.indexOf("r0.2") === -1 && 
        pathname.indexOf("r0.3") === -1 && 
        pathname.split('/')[1] !== "lite"
    ) 
    ? pathname.split('/').slice(3)[0]
    :pathname.split('/').slice(4)[0];

    // 教程--初级目录结构不一致
    if((pathname.split('/')[1] === 'tutorial' || pathname.split('/')[1] === 'tutorials') && 
        (pathname.split('/')[2] === 'zh-CN' || pathname.split('/')[2] === 'en')
    ){
        version = pathname.split('/').slice(3)[0]
    }


    // 获取subtitle
    let subNav = {
      title: '',
      list: [],
      versionList: []
    };
    let lang = host.href.indexOf('/en/') !== -1 ?'en':'zh-CN';
    let tutorials_path ='/'+ pathname.split('/')[1]+ '/'+pathname.split('/')[2] +'/';
    $.ajax({
      type: 'get',
      url: `/menu_${lang}.json`,
      dataType: 'json',
      success: function (res) {
        res.forEach(function (item) {
          if(item.children && (item.hasOwnProperty('newSubMenu')) ){
            item.newSubMenu.map((k)=>{ 
              if(k.containUrl === tutorials_path){
                subNav.list = k.versionList
              }  
            }) 
          }
        })
         
      }
    })  
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
    setTimeout(() => {
      // 版本判断显示
      if(isNewVersion()){ 
        let versionSelectDom=''
        if(subNav.list.length){
          versionSelectDom = `<div class='version-select-wrap'><div class="version-select-dom">
          <span class="versionText">${VerText}</span>  <img src="/pic/down.svg" />
              <ul>
                  ${subNav.list.map(function (item,index) {    
                      return `
                      <li><a href="${item.value}" class='version-option'>${item.name}</a></li>
                      `;
                  }).join('')}
                  
              </ul>
          </div></div>`;
          $('.wy-nav-side').addClass('side-fix').prepend(versionSelectDom);
        }
        
      }  
    },500)


    if(host.pathname.indexOf("tutorials/experts") > -1 || host.pathname.indexOf("tutorials/application") > -1){
      version = window.location.pathname.split('/').slice(4)[0];
    }

    switch (version) {
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
          case "r0.2":
          VerText = "0.2"
          break;
        case "r0.3":
            VerText = "0.3"
            break;
        default:
          VerText = version.startsWith('r')&&version.slice(1)
            break;
    }
    if(host.pathname.indexOf('/lite/') == -1){
        $('.wy-menu-vertical').before('<div class="docsHome"><a  href="#" class="welcome">MindSpore Tutorials</a></div>')
    }else{
        $('.wy-menu-vertical').before('<div class="docsHome"><a  href="#" class="welcome">MindSpore Lite Tutorials</a></div>')
    } 
    $('.welcome')[0].attributes[0].nodeValue = $('.icon-home')[0].attributes[0].nodeValue;
    $('.wy-breadcrumbs>li:first-of-type')[0].innerText = 'Tutorials (' + VerText + ')';
    
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

    // 页面内搜索框提示具体搜索内容
    if(pathname.indexOf('/tutorial/lite/') !== -1) {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', 'Search in Mobile&loT');
    } else if(pathname.indexOf('/tutorial/training/') !== -1) {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', 'Search in Training');
    } else if(pathname.indexOf('/tutorial/inference/') !== -1) {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', 'Search in Inference');
    } else if(pathname.indexOf('/tutorial/') !== -1) {
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', 'Search in Quick Start');
    } else if(pathname.indexOf('/tutorials/') !== -1){
        $('.wy-grid-for-nav #rtd-search-form input').eq(0).attr('placeholder', 'Search in Tutorials');
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
                let id = h2List[i].parentNode.id.replace(/\(([^).]*)\)/g,"$1");
                let h3 = $('#' + id + ' ' + 'h3');
                if (h3.length > 0) {
                    var navLi3 = '';
                    for (let i = 0; i < h3.length; i++) {
                        navLi3 += "<li><a href='#" + h3[i].parentNode.id + "'>" + h3[i].innerText + "</a></li>";
                    }
                    var navLi2 = '<li><a href="#' + h2List[i].parentNode.id + '">' + h2List[i].innerText + '</a><ul class="navList3"></ul></li>';
                } else {
                    var navLi2 = '<li><a href="#' + h2List[i].parentNode.id + '">' + h2List[i].innerText + '</a></li>';
                }
                $('.navList2').append(navLi2);
                $('.navList2>li:nth-of-type(' + (i + 1) + ') .navList3').append(navLi3);
            }
        } else {
            for (let i = 0; i < codeList.length; i++) {
                var codeLi2 = '<li><a href="#' + codeList[i].parentNode.id + '">' + codeList[i].innerText + '</a><ul class="navList3"></ul></li>';
                $('.navList2').append(codeLi2);
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
        let isScrolledAtBottom = $('.navRight > .navList').height() - $('.navRight').scrollTop() < $('.navRight').height() + 10;
        if (scrollable && !isScrolledAtBottom) {
            $('.navRightMasker').css("display", "block")
        } else {
            $('.navRightMasker').css("display", "none")
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
            if ($("#" + newAnchorId).offset().top - 20 < 116) {
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
    })

    // 判断是否 h5
    function isH5(cb) {
        let screen = document.documentElement.clientWidth;
        if (screen < 768) {
            cb()
        }
    }

    // 视频播放处理
    function loadJS (url, callback) {
        let head = document.getElementsByTagName('head')[0]
        let script = document.createElement('script')
        script.charset = 'utf-8'
        script.type = 'text/javascript'
        script.src = url
      
        if (typeof callback == 'function') {
          script.onload = script.onreadystatechange = function () {
            // 动态 script 加载完毕
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
              callback()
              script.onload = script.onreadystatechange = null
            }
          }
        }
        head.appendChild(script)
    }
    function loadLink(cssURL,media,charset){
        let linkTag = $('<link href="' + cssURL + '" rel="stylesheet" type="text/css" media="' + (media || "all") + '" charset="'+ (charset || "utf-8") +'" />');
        $($('head')[0]).append(linkTag);
    }
    
    $('video').css({display:'none'})
    loadJS("https://www.mindspore.cn/video/video.js",function(){
        loadLink("https://www.mindspore.cn/video/video-js.css")
        $('video').addClass('video-js vjs-default-skin vjs-big-play-centered vjs-playback-rate')
        $('video').css({display:'block'})
        if ($(window).width()>768) {
            $('video').closest(".section").css({"max-width":"95%"})
        }
        
        let videoIds = []
        $('video').each(function(index,elm) {
            videoIds.push($(elm).attr('id'))
        })
        videoIds.forEach(function(id,index) {
            videojs(
                id,
                {
                  poster: "",
                  loop: false,
                  muted: false,
                  fluid: true,
                  playbackRates: [0.5, 1, 1.25, 1.5, 2],
                  aspectRatio: "2:1",
                  controlBar:{
          
                  }
                },
                function onPlayerReady() {
                  // videojs.log("播放器已经准备好了!");
                  this.on("ended", function () {
                    // videojs.log("播放结束了!");
                  });                  
                  $.ajax({
                    type: "POST",
                    contentType: 'application/json',
                    headers: {'Authorization': 'MMq2kpWYVSganL4bOfNlkKUx+sPm5yqXsvfsh6W9Rr0='},
                    data: JSON.stringify({
                        name: decodeURIComponent($(this.el()).find("source")[0].src.split("/").pop()).split(".")[0],
                        from: 2, //1首页 2教程
                    }),
                    url: '/clickvideo',
                    success: function (res) {
                      
                    }
                  });
                }
              );
        })
    })

    // 不是md文件的样式修改
    $('div.nboutput.container div.output_area img').parent().css('background','#fff');
    
    setTimeout(() => {
        let doms=document.querySelectorAll('.toctree-l1 a')
        doms.forEach(item=>{
            if(item.innerText&&item.innerText.includes('.')&&!item.innerText.includes(' ')&&item.innerText.length>35){
                item.innerText=insertStr(item.innerText, item.innerText.lastIndexOf(".")+1,' ')
            }
            
        })
    }, 10);
    function insertStr(soure, start, newStr){   
        return soure.slice(0, start) + newStr + soure.slice(start);
    }

})