/*
 * doctools.js
 * ~~~~~~~~~~~
 *
 * Sphinx JavaScript utilities for all documentation.
 *
 * :copyright: Copyright 2007-2019 by the Sphinx team, see AUTHORS.
 * :license: BSD, see LICENSE for details.
 *
 */

/**
 * select a different prefix for underscore
 */
$u = _.noConflict();

/**
 * make the code below compatible with browsers without
 * an installed firebug like debugger
if (!window.console || !console.firebug) {
  var names = ["log", "debug", "info", "warn", "error", "assert", "dir",
    "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace",
    "profile", "profileEnd"];
  window.console = {};
  for (var i = 0; i < names.length; ++i)
    window.console[names[i]] = function() {};
}
 */

/**
 * small helper function to urldecode strings
 */
jQuery.urldecode = function (x) {
  return decodeURIComponent(x).replace(/\+/g, ' ');
};

/**
 * small helper function to urlencode strings
 */
jQuery.urlencode = encodeURIComponent;

/**
 * This function returns the parsed url parameters of the
 * current request. Multiple values per key are supported,
 * it will always return arrays of strings for the value parts.
 */
jQuery.getQueryParameters = function (s) {
  if (typeof s === 'undefined')
    s = document.location.search;
  var parts = s.substr(s.indexOf('?') + 1).split('&');
  var result = {};
  for (var i = 0; i < parts.length; i++) {
    var tmp = parts[i].split('=', 2);
    var key = jQuery.urldecode(tmp[0]);
    var value = jQuery.urldecode(tmp[1]);
    if (key in result)
      result[key].push(value);
    else
      result[key] = [value];
  }
  return result;
};

/**
 * highlight a given string on a jquery object by wrapping it in
 * span elements with the given class name.
 */
jQuery.fn.highlightText = function (text, className) {
  function highlight(node, addItems) {
    if (node.nodeType === 3) {
      var val = node.nodeValue;
      var pos = val.toLowerCase().indexOf(text);
      if (pos >= 0 &&
        !jQuery(node.parentNode).hasClass(className) &&
        !jQuery(node.parentNode.parentNode).hasClass("nohighlight") &&
        !jQuery(node.parentNode).hasClass("nohighlight")) {
        var span;
        var isInSVG = jQuery(node).closest("body, svg, foreignObject").is("svg");
        if (isInSVG) {
          span = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        } else {
          span = document.createElement("span");
          span.className = className;
        }
        span.appendChild(document.createTextNode(val.substr(pos, text.length)));
        node.parentNode.insertBefore(span, node.parentNode.insertBefore(
          document.createTextNode(val.substr(pos + text.length)),
          node.nextSibling));
        node.nodeValue = val.substr(0, pos);
        if (isInSVG) {
          var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
          var bbox = node.parentElement.getBBox();
          rect.x.baseVal.value = bbox.x;
          rect.y.baseVal.value = bbox.y;
          rect.width.baseVal.value = bbox.width;
          rect.height.baseVal.value = bbox.height;
          rect.setAttribute('class', className);
          addItems.push({
            "parent": node.parentNode,
            "target": rect
          });
        }
      }
    }
    else if (!jQuery(node).is("button, select, textarea")) {
      jQuery.each(node.childNodes, function () {
        highlight(this, addItems);
      });
    }
  }
  var addItems = [];
  var result = this.each(function () {
    highlight(this, addItems);
  });
  for (var i = 0; i < addItems.length; ++i) {
    jQuery(addItems[i].parent).before(addItems[i].target);
  }
  return result;
};

/*
 * backward compatibility for jQuery.browser
 * This will be supported until firefox bug is fixed.
 */
if (!jQuery.browser) {
  jQuery.uaMatch = function (ua) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
      /(webkit)[ \/]([\w.]+)/.exec(ua) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
      /(msie) ([\w.]+)/.exec(ua) ||
      ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
      [];

    return {
      browser: match[1] || "",
      version: match[2] || "0"
    };
  };
  jQuery.browser = {};
  jQuery.browser[jQuery.uaMatch(navigator.userAgent).browser] = true;
}

/**
 * Small JavaScript module for the documentation.
 */
var Documentation = {

  init: function () {
    this.fixFirefoxAnchorBug();
    this.highlightSearchWords();
    this.initIndexTable();
    if (DOCUMENTATION_OPTIONS.NAVIGATION_WITH_KEYS) {
      this.initOnKeyListeners();
    }
  },

  /**
   * i18n support
   */
  TRANSLATIONS: {},
  PLURAL_EXPR: function (n) { return n === 1 ? 0 : 1; },
  LOCALE: 'unknown',

  // gettext and ngettext don't access this so that the functions
  // can safely bound to a different name (_ = Documentation.gettext)
  gettext: function (string) {
    var translated = Documentation.TRANSLATIONS[string];
    if (typeof translated === 'undefined')
      return string;
    return (typeof translated === 'string') ? translated : translated[0];
  },

  ngettext: function (singular, plural, n) {
    var translated = Documentation.TRANSLATIONS[singular];
    if (typeof translated === 'undefined')
      return (n == 1) ? singular : plural;
    return translated[Documentation.PLURALEXPR(n)];
  },

  addTranslations: function (catalog) {
    for (var key in catalog.messages)
      this.TRANSLATIONS[key] = catalog.messages[key];
    this.PLURAL_EXPR = new Function('n', 'return +(' + catalog.plural_expr + ')');
    this.LOCALE = catalog.locale;
  },

  /**
   * add context elements like header anchor links
   */
  addContextElements: function () {
    $('div[id] > :header:first').each(function () {
      $('<a class="headerlink">\u00B6</a>').
        attr('href', '#' + this.id).
        attr('title', _('Permalink to this headline')).
        appendTo(this);
    });
    $('dt[id]').each(function () {
      $('<a class="headerlink">\u00B6</a>').
        attr('href', '#' + this.id).
        attr('title', _('Permalink to this definition')).
        appendTo(this);
    });
  },

  /**
   * workaround a firefox stupidity
   * see: https://bugzilla.mozilla.org/show_bug.cgi?id=645075
   */
  fixFirefoxAnchorBug: function () {
    if (document.location.hash && $.browser.mozilla)
      window.setTimeout(function () {
        document.location.href += '';
      }, 10);
  },

  /**
   * highlight the search words provided in the url in the text
   */
  highlightSearchWords: function () {
    var params = $.getQueryParameters();
    var terms = (params.highlight) ? params.highlight[0].split(/\s+/) : [];
    if (terms.length) {
      var body = $('div.body');
      if (!body.length) {
        body = $('body');
      }
      window.setTimeout(function () {
        $.each(terms, function () {
          body.highlightText(this.toLowerCase(), 'highlighted');
        });
      }, 10);
      $('<p class="highlight-link"><a href="javascript:Documentation.' +
        'hideSearchWords()">' + _('Hide Search Matches') + '</a></p>')
        .appendTo($('#searchbox'));
    }
  },

  /**
   * init the domain index toggle buttons
   */
  initIndexTable: function () {
    var togglers = $('img.toggler').click(function () {
      var src = $(this).attr('src');
      var idnum = $(this).attr('id').substr(7);
      $('tr.cg-' + idnum).toggle();
      if (src.substr(-9) === 'minus.png')
        $(this).attr('src', src.substr(0, src.length - 9) + 'plus.png');
      else
        $(this).attr('src', src.substr(0, src.length - 8) + 'minus.png');
    }).css('display', '');
    if (DOCUMENTATION_OPTIONS.COLLAPSE_INDEX) {
      togglers.click();
    }
  },

  /**
   * helper function to hide the search marks again
   */
  hideSearchWords: function () {
    $('#searchbox .highlight-link').fadeOut(300);
    $('span.highlighted').removeClass('highlighted');
  },

  /**
   * make the url absolute
   */
  makeURL: function (relativeURL) {
    return DOCUMENTATION_OPTIONS.URL_ROOT + '/' + relativeURL;
  },

  /**
   * get the current relative url
   */
  getCurrentURL: function () {
    var path = document.location.pathname;
    var parts = path.split(/\//);
    $.each(DOCUMENTATION_OPTIONS.URL_ROOT.split(/\//), function () {
      if (this === '..')
        parts.pop();
    });
    var url = parts.join('/');
    return path.substring(url.lastIndexOf('/') + 1, path.length - 1);
  },

  initOnKeyListeners: function () {
    $(document).keyup(function (event) {
      var activeElementType = document.activeElement.tagName;
      // don't navigate when in search box or textarea
      if (activeElementType !== 'TEXTAREA' && activeElementType !== 'INPUT' && activeElementType !== 'SELECT') {
        switch (event.keyCode) {
          case 37: // left
            var prevHref = $('link[rel="prev"]').prop('href');
            if (prevHref) {
              window.location.href = prevHref;
              return false;
            }
          case 39: // right
            var nextHref = $('link[rel="next"]').prop('href');
            if (nextHref) {
              window.location.href = nextHref;
              return false;
            }
        }
      }
    });
  }
};

// quick alias for translations
_ = Documentation.gettext;

var oHead = document.getElementsByTagName('HEAD').item(0)
var oScript= document.createElement('script');
oScript.src = "https://hm.baidu.com/hm.js?7c2afdec4c0d635d30ebb361804d0464"
oHead.appendChild(oScript);
$(document).ready(function () {
  Documentation.init();

  // 实现复制粘贴功能
  $('pre>span:first-of-type').append('<button class="btn1" data-clipboard-action="copy"><img src="/pic/copy.png"/></button><button class="btn3" data-clipboard-action="copy"><img src="/pic/copySuc.png"/></button><span class="copybg">Copy</span>');
  $('.btn1').click(function () {
    var Url2 = $(this).parent().parent()[0].innerText.replace('Copy', '');
    Url2 = Url2.split(/[\n]/);
    let flag = false
    for (let i = 0; i < Url2.length; i++) {
      if(Url2[i].indexOf('>>>') > -1 || Url2[i].indexOf('...') == 0) {
        flag = true
      } else {
        flag = false
      }
      if(flag) {
        if(Url2[i].indexOf('>>>') > -1 || Url2[i].indexOf('...') == 0) {
          Url2[i] = Url2[i].slice(4);
        } else {
          Url2[i] = ''
        }
      }
    }
    Url2 = Url2.join('\n').replace(/>>> /g, '').replace(/>>>/g, '');
    var oInput = document.createElement('textarea');
    oInput.value = Url2;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.class = 'oInput';
    oInput.style.display = 'none';
    $(this).css('display', 'none');
    $(this).next().css('display', 'block');
    $(".copybg").css('display', 'none');
    setTimeout(function () {
      $('.btn3').css('display', 'none');
      $('.btn1').css('display', 'block');
    }, 1000)
  })
  $('.btn1').mouseenter(function (e) {
    e.currentTarget.childNodes[0].attributes[0].value = '/pic/copyHover.png';
    e.currentTarget.nextSibling.nextSibling.className = 'copybg showCopyBg';
  })
  $('.btn1').mouseleave(function (e) {
    e.currentTarget.childNodes[0].attributes[0].value = '/pic/copy.png';
    e.currentTarget.nextSibling.nextSibling.className = 'copybg'
  })
  //     实现复制粘贴功能结束

  // 点击搜索弹出搜索框
  $('.header__search').on('click', function () {
    $('.header-nav').css('display', 'none');
    $('.searchMain').css('display', 'block');
  })
  // 点击关闭搜索框
  $('.close-icon').on('click', function () {
    $('.header-nav').css('display', 'flex');
    $('.searchMain').css('display', 'none');
  })

  // 获取搜索框的值并传递到搜索页面
  $('.search-val').on('keydown', function (e) {
    const val = $('.search-val').val();
    if (e.keyCode === 13 && val !== '') {
      window.location.href = "/search?headerTabIndex=2&mold=文档&inputValue=" + val;
    }
  })
  $('.search-icon').on('click', function (e) {
    const val = $('.search-val').val();
    if (val !== '') {
      window.location.href = "/search?headerTabIndex=2&mold=文档&inputValue=" + val;
    }
  })

  // 搜索框联想词设置
  $('.search-val').on('input', function (e) {
    let val = $('.search-val').val();
    let $hotWord = $('.hotWord');
    $.ajax({
      type: "get",
      url: '/tips?keywords=' + val + '&index=index_tips',
      dataType: "json",
      success: function (res) {
        if (res.status === 200) {
          let arr = res.obj;
          $hotWord.html('')
          let html = "";
          arr.map(function (item, index) {
            html += '<li class="search--list" key=' + index + '>' + item + '</li>'
          })
          $hotWord.append(html)
          $('.search--list').on('click', function (e) {
            let value = e.target.innerText;
            window.location.href = "/search?headerTabIndex=2&mold=文档&inputValue=" + value;
            $('.header-nav').css('display', 'flex');
            $('.searchMain').css('display', 'none');
          })
        }
      }
    });
  })
   
  $('#dropdownMenu1').on('click', function (e) {
    let showLanguage = $('.dropdown-menu');
    if (showLanguage[0].style.display == 'block') {
      $('.arrowTop').removeClass('arrImgTop');
      $('.dropdown-menu').css('display', 'none');
    } else {
      $('.arrowTop').addClass('arrImgTop');
      $('.dropdown-menu').css('display', 'block');
    }

  })
  $('.enZH').on('click', function (e) {
    $(this).attr('href', location.pathname.replace('en', 'zh-CN'));
    let chinese = e.target.innerText;
    $('.languageIpt')[0].innerText = chinese;
    $('.dropdown-menu').css('display', 'none');
  })
  $('.enUS').on('click', function (e) {
    $(this).attr('href', location.pathname.replace('zh-CN', 'en'));
    let English = e.target.innerText;
    $('.languageIpt')[0].innerText = English;
    $('.dropdown-menu').css('display', 'none');
  })
  // 点击切换语言结束

  // 点击页面其余地方搜索框消失
  $(document).mousedown(function (e) {
    const target = $(e.target)[0].className;
    if (target === 'header__search' || target === 'search-val' || target === 'search-icon' || target === 'search--list') {
      $('.header-nav').css('display', 'none');
      $('.searchMain').css('display', 'block');
    } else {
      $('.header-nav').css('display', 'flex');
      $('.searchMain').css('display', 'none');
    }
  });
  // 点击右侧导航标绿
  $('.navList a').on('click', function () {
    let navAlist = $('.navList a');
    for (let i = 0; i < navAlist.length; i++) {
      navAlist.removeClass('selected');
    }
    $(this).addClass('selected');
  })

  // 评价相关开始
  $("div.star").on("mouseover", function () {
    $(this).addClass("sel");
    $(this).parent("li").prevAll().children(".star").addClass("sel");
    $(this).parent("li").nextAll().children(".star").removeClass("sel");
  })
  $("div.star").on("mouseout", function () {
    $(this).removeClass("sel");
    $(this).parent("li").prevAll().children(".star").removeClass("sel");
  })
  let gradeList = $(".evaluateStar>li>div:first-of-type");
  for (var i = 0; i < gradeList.length; i++) {
    gradeList[i].index = i
    gradeList[i].onclick = function () {
      $(this).addClass("sel");
      $(this).parent("li").prevAll().children(".star").addClass("sel");
      $(this).parent("li").nextAll().children(".star").removeClass("sel");
      $('div.star').unbind("mouseover");
      $('div.star').unbind("mouseout");
      let grade = this.index + 1;
      $.ajax({
        type: "get",
        url: `/grade?title=API&score=${grade}`,
        success: function (res) {
          
        }
      });
    }
  }
 
});


