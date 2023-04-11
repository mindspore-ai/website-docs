
/*
 @licstart  The following is the entire license notice for the
 JavaScript code in this file.

 Copyright (C) 1997-2017 by Dimitri van Heesch

 This program is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along
 with this program; if not, write to the Free Software Foundation, Inc.,
 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

 @licend  The above is the entire license notice
 for the JavaScript code in this file
 */
var navTreeSubIndices = new Array();
var arrowDown = '&#9660;';
var arrowRight = '&#9654;';

///// update
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

var oHead = document.getElementsByTagName('HEAD').item(0)
var oScript = document.createElement('script');
oScript.src = "https://hm.baidu.com/hm.js?7c2afdec4c0d635d30ebb361804d0464"

oHead.appendChild(oScript);

// 公共css/js文件
var oHead = document.getElementsByTagName('HEAD').item(0)
var oScript = document.createElement('script');
let host = window.location;
let path = host.pathname.indexOf('/lite/') == -1 ? host.pathname.split('/')[1]+ '/'+host.pathname.split('/')[2]+ '/'+host.pathname.split('/')[3] :
            host.pathname.split('/')[1]+ '/'+host.pathname.split('/')[2]+ '/'+host.pathname.split('/')[3]+ '/'+host.pathname.split('/')[4]
let pathname = host.origin +'/'+path;
var oHead = document.getElementsByTagName('HEAD').item(0)
var oLink = document.createElement('link');
oLink.rel = "stylesheet";
oLink.href = host.pathname.indexOf('/lite/') == -1 ? (pathname + '/predict/h5_docs.css') : (pathname + '/lite/h5_docs.css');
oScript.type = "text/javascript";
oScript.src= host.pathname.indexOf('/lite/') == -1 ? (pathname + '/predict/common_docs.js') : (pathname + '/lite/common_docs.js');
setTimeout(() => {
  oHead.appendChild(oLink);
  oHead.appendChild(oScript);
})

function liteLink (key, value) {
  if(host.pathname.indexOf('/lite/') == -1){
    return value
  }
  if (key == 'namespacemembers_vars.html') {
    value = [0, 1];
  }else if (key == 'namespacemembers_type.html') {
    value = [0, 2];
  }
  return value
}

var arr1 = []
var arr2 = []
let length = sessionStorage.getItem('navTreeLength');
for (let i = 0; i < length; i++) {
  getScript('' + 'navtreeindex' + i, function () {
    navTreeSubIndices[i] = eval('NAVTREEINDEX' + i);
    for (let j in navTreeSubIndices[i]) {
      arr2.push(j); //值
      arr1.push(liteLink(j, navTreeSubIndices[i][j])); //属性
    }
  });
}


$(document).ready(function () {
  // 统一修改title
  let tit = $('title');
  tit.text('MindSpore');
  $('#doc-content').on('scroll', function () {
    if ($('#doc-content')[0].scrollTop > 59) {
      $('#side-nav').css('top', '0');
    } else {
      $('#side-nav').css('top', '3rem');
    }
  })

  setTimeout(function () {
    let select = $('#selected');
    if (select.length) {
      $("#nav-tree").scrollTop(select[0].offsetTop - 120);//滚动条返回顶部
    };
  }, 400)
  setTimeout(function () {
    let pathname = window.location.pathname;
    let index = arr2.indexOf(pathname.substring(21));
    let navDetail = arr1[index];
    if (index === -1) {
      // if(pathname == 'a00464.html') {
      //   sessionStorage.setItem('search',pathname);
      //   sessionStorage.setItem('indexArr', '[1,6,5]');     
      // }
    } else {
      if (navDetail.length > 3) {
        navDetail.splice(1, 2);
        sessionStorage.setItem('indexArr', JSON.stringify(navDetail));
        sessionStorage.setItem('newApiPathname', pathname);
      } else if (navDetail.length === 3) {
        navDetail.splice(1, 1);
        sessionStorage.setItem('indexArr', JSON.stringify(navDetail));
        sessionStorage.setItem('newApiPathname', pathname);
      } else if (navDetail.length == 2) {
        sessionStorage.setItem('indexArr', JSON.stringify(navDetail));
        sessionStorage.setItem('newApiPathname', pathname);
      }
    }
  }, 10)
  // 点击右侧内容跳转到对应目录开始
  $('.code').on('click', function () {

    let link = $(this)[0].pathname;
    sessionStorage.setItem('newApiPathname', link);
    var aIndex = arr2.indexOf(link.substring(21));
    var indexArrW = arr1[aIndex];
    if (indexArrW.length === 3) {
      indexArrW.splice(1, 1);
      sessionStorage.setItem('indexArr', JSON.stringify(indexArrW));
    }
    if (indexArrW.length > 3) {
      indexArrW.splice(1, 2);
      sessionStorage.setItem('indexArr', JSON.stringify(indexArrW));
    }
    if (indexArrW.length === 2) {
      sessionStorage.setItem('indexArr', JSON.stringify(indexArrW));
    }
  })
  $('.el').on('click', function () {
    let link = $(this)[0].pathname + $(this)[0].hash;
    sessionStorage.setItem('newApiPathname', link);
    var aIndex = arr2.indexOf(link.substring(21));
    var indexArrW = arr1[aIndex];
    if (indexArrW.length === 3) {
      indexArrW.splice(1, 1);
      sessionStorage.setItem('indexArr', JSON.stringify(indexArrW));
    }
    if (indexArrW.length > 3) {
      indexArrW.splice(1, 2);
      sessionStorage.setItem('indexArr', JSON.stringify(indexArrW));
    }
    if (indexArrW.length === 2) {
      sessionStorage.setItem('indexArr', JSON.stringify(indexArrW));
    }
  })
  // 点击右侧内容跳转到对应目录结束


  // 实现复制粘贴功能
  let fraArr = $('div .fragment');
  for (let i = 0; i < fraArr.length; i++) {
    if (fraArr[i].innerText == '') {
      $(this).remove()
    }
  }
  $('div .fragment').append('<button class="btn1" data-clipboard-action="copy"><img src="/pic/copy.png"/></button><button class="btn3" data-clipboard-action="copy"><img src="/pic/copySuc.png"/></button><span class="copybg">Copy</span>');
  $('div .memproto').append('<button class="btn2" data-clipboard-action="copy"><img src="/pic/copy.png"/></button><button class="btn3" data-clipboard-action="copy"><img src="/pic/copySuc.png"/></button><span class="copybg">Copy</span>');
  $('.btn1').click(function () {
    // console.log($(this).parent()[0].innerText);
    var Url2 = $(this).parent()[0].innerText.replace('Copy', '');
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
  $('.btn2').click(function () {
    var Url2 = $(this).parent()[0].innerText.replace('Copy', '');
    var oInput = document.createElement('textarea');
    oInput.value = Url2;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.class = 'oInput';
    oInput.style.display = 'none';
    $(this).css('display', 'none');
    $(this).next().css('display', 'block');
    setTimeout(function () {
      $('.btn3').css('display', 'none');
      $('.btn2').css('display', 'block');
    }, 1000)
  })
  $('.btn2').mouseenter(function (e) {
    e.currentTarget.childNodes[0].attributes[0].value = '/pic/copyHover.png';
    e.currentTarget.nextSibling.nextSibling.className = 'copybg showCopyBg';
  })
  $('.btn2').mouseleave(function (e) {
    e.currentTarget.childNodes[0].attributes[0].value = '/pic/copy.png';
    e.currentTarget.nextSibling.nextSibling.className = 'copybg'
  })
  // 实现复制粘贴功能结束

  let mask = '<div id="mask"></div>'
  isH5(function () {
    $('body').append(mask);
  })


  // 判断是否 h5
  function isH5(cb) {
    let screen = document.documentElement.clientWidth;
    if (screen < 768) {
      cb()
    }
  }
})

///// update

function getData(varName) {
  var i = varName.lastIndexOf('/');
  var n = i >= 0 ? varName.substring(i + 1) : varName;
  var data = eval(n.replace(/\-/g, '_'));
  return data;
  // return eval(n.replace(/\-/g,'_'));
}

function stripPath(uri) {
  return uri.substring(uri.lastIndexOf('/') + 1);
}

function stripPath2(uri) {
  var i = uri.lastIndexOf('/');
  var s = uri.substring(i + 1);
  var m = uri.substring(0, i + 1).match(/\/d\w\/d\w\w\/$/);
  return m ? uri.substring(i - 6) : s;
}

function hashValue() {
  return $(location).attr('hash').substring(1).replace(/[^\w\-]/g, '');
}

function hashUrl() {
  return '#' + hashValue();
}

function pathName() {
  return $(location).attr('pathname').replace(/[^-A-Za-z0-9+&@#/%?=~_|!:,.;\(\)]/g, '');
}

function localStorageSupported() {
  try {
    return 'localStorage' in window && window['sessionStorage'] !== null && window.sessionStorage.getItem;
  }
  catch (e) {
    return false;
  }
}


function storeLink(link) {
  if (!$("#nav-sync").hasClass('sync') && localStorageSupported()) {
    window.sessionStorage.setItem('navpath', link);
  }
}

function deleteLink() {
  if (localStorageSupported()) {
    window.sessionStorage.setItem('navpath', '');
  }
}

function cachedLink() {
  if (localStorageSupported()) {
    return window.sessionStorage.getItem('navpath');
  } else {
    return '';
  }
}

function getScript(scriptName, func, show) {
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement('script');
  script.id = scriptName;
  script.type = 'text/javascript';
  script.onload = func;
  script.src = scriptName + '.js';
  if ($.browser.msie && $.browser.version <= 8) {
    // script.onload does not work with older versions of IE
    script.onreadystatechange = function () {
      if (script.readyState == 'complete' || script.readyState == 'loaded') {
        func(); if (show) showRoot();
      }
    }
  }
  head.appendChild(script);
}

function createIndent(o, domNode, node, level) {
  var level = -1;
  var n = node;
  while (n.parentNode) { level++; n = n.parentNode; }
  if (node.childrenData) {
    var imgNode = document.createElement("span");
    imgNode.className = 'arrow';
    imgNode.style.paddingLeft = (16 * level).toString() + 'px';
    imgNode.innerHTML = arrowRight;
    node.plus_img = imgNode;
    node.expandToggle = document.createElement("a");
    node.expandToggle.href = "javascript:void(0)";
    node.expandToggle.onclick = function () {
      if (node.expanded) {
        $(node.getChildrenUL()).slideUp("fast");
        node.plus_img.innerHTML = arrowRight;
        node.expanded = false;
      } else {
        expandNode(o, node, false, false);
      }
    }
    node.expandToggle.appendChild(imgNode);
    domNode.appendChild(node.expandToggle);
  } else {
    var span = document.createElement("span");
    span.className = 'arrow';
    span.style.width = 16 * (level + 1) + 'px';
    span.innerHTML = '&#160;';
    domNode.appendChild(span);
  }
}

var animationInProgress = false;

function gotoAnchor(anchor, aname, updateLocation) {
  var pos, docContent = $('#doc-content');
  var ancParent = $(anchor.parent());
  if (ancParent.hasClass('memItemLeft') ||
    ancParent.hasClass('fieldname') ||
    ancParent.hasClass('fieldtype') ||
    ancParent.is(':header')) {
    pos = ancParent.position().top;
  } else if (anchor.position()) {
    pos = anchor.position().top;
  }
  if (pos) {
    var dist = Math.abs(Math.min(
      pos - docContent.offset().top,
      docContent[0].scrollHeight -
      docContent.height() - docContent.scrollTop()));
    animationInProgress = true;
    docContent.animate({
      scrollTop: pos + docContent.scrollTop() - docContent.offset().top
    }, Math.max(50, Math.min(500, dist)), function () {
      if (updateLocation) window.location.href = aname;
      animationInProgress = false;
    });
  }
}

function newNode(o, po, text, link, childrenData, lastNode) {
  var node = new Object();
  node.children = Array();
  node.childrenData = childrenData;
  node.depth = po.depth + 1;
  node.relpath = po.relpath;
  node.isLast = lastNode;

  node.li = document.createElement("li");
  node.li.className = 'li-item';
  po.getChildrenUL().appendChild(node.li);
  node.parentNode = po;

  node.itemDiv = document.createElement("div");
  node.itemDiv.className = "item";

  node.labelSpan = document.createElement("span");
  node.labelSpan.className = "label";

  createIndent(o, node.itemDiv, node, 0);
  node.itemDiv.appendChild(node.labelSpan);
  node.li.appendChild(node.itemDiv);

  var a = document.createElement("a");
  node.labelSpan.appendChild(a);
  node.label = document.createTextNode(text);
  node.expanded = false;
  a.appendChild(node.label);
  if (link) {
    var url;
    if (link.substring(0, 1) == '^') {
      url = link.substring(1);
      link = url;
    } else {
      url = node.relpath + link;
    }
    a.className = stripPath(link.replace('#', ':'));
    if (link.indexOf('#') != -1) {
      var aname = '#' + link.split('#')[1];
      var srcPage = stripPath(pathName());
      var targetPage = stripPath(link.split('#')[0]);
      a.href = srcPage != targetPage ? url : "javascript:void(0)";
      // a.onclick = function(){
      //   storeLink(link);
      //   if (!$(a).parent().parent().hasClass('selected'))
      //   {
      //     $('.item').removeClass('selected');
      //     $('.item').removeAttr('id');
      //     $(a).parent().parent().addClass('selected');
      //     $(a).parent().parent().attr('id','selected');
      //   }
      //   var anchor = $(aname);
      //   gotoAnchor(anchor,aname,true);
      // };

      linkClickHandle(a, link, true, aname);
    } else {
      // a.onclick = function() { storeLink(link); }
      // if (childrenData != null)
      // {
      //   a.className =  url;
      //   a.href = url;
      //   a.onclick = node.expandToggle.onclick;
      // }
      a.href = url;
      linkClickHandle(a, link);
    }
  } else {
    if (childrenData != null) {
      a.className = "nolink";
      a.href = "javascript:void(0)";
      a.onclick = node.expandToggle.onclick;
    }
  }

  node.childrenUL = null;
  node.getChildrenUL = function () {
    if (!node.childrenUL) {
      node.childrenUL = document.createElement("ul");
      node.childrenUL.className = "children_ul";
      node.childrenUL.style.display = "none";
      node.li.appendChild(node.childrenUL);
    }
    return node.childrenUL;
  };
  // if (localStorage.getItem('toroot') == link) {
  //   $(a).click();
  // }
  return node;
}

function showRoot() {
  var headerHeight = $("#top").height();
  var footerHeight = $("#nav-path").height();
  var windowHeight = $(window).height() - headerHeight - footerHeight;
  (function () { // retry until we can scroll to the selected item
    try {
      var navtree = $('#nav-tree');
      navtree.scrollTo('#selected', 0, { offset: -windowHeight / 2 });
    } catch (err) {
      setTimeout(arguments.callee, 0);
    }
  })();
}

function expandNode(o, node, imm, showRoot) {
  if (node.childrenData && !node.expanded) {
    if (typeof (node.childrenData) === 'string') {
      var varName = node.childrenData;
      getScript(node.relpath + varName, function () {
        node.childrenData = getData(varName);
        expandNode(o, node, imm, showRoot);
      }, showRoot);
    } else {
      if (!node.childrenVisited) {
        getNode(o, node);
      } if (imm || ($.browser.msie && $.browser.version > 8)) {
        // somehow slideDown jumps to the start of tree for IE9 :-(
        $(node.getChildrenUL()).show();
      } else {
        $(node.getChildrenUL()).slideDown("fast");
      }
      node.plus_img.innerHTML = arrowDown;
      node.expanded = true;
    }
  }
}

function glowEffect(n, duration) {
  n.addClass('glow').delay(duration).queue(function (next) {
    $(this).removeClass('glow'); next();
  });
}

function highlightAnchor() {
  var aname = hashUrl();
  var anchor = $(aname);
  if (anchor.parent().attr('class') == 'memItemLeft') {
    var rows = $('.memberdecls tr[class$="' + hashValue() + '"]');
    glowEffect(rows.children(), 300); // member without details
  } else if (anchor.parent().attr('class') == 'fieldname') {
    glowEffect(anchor.parent().parent(), 1000); // enum value
  } else if (anchor.parent().attr('class') == 'fieldtype') {
    glowEffect(anchor.parent().parent(), 1000); // struct field
  } else if (anchor.parent().is(":header")) {
    glowEffect(anchor.parent(), 1000); // section header
  } else {
    glowEffect(anchor.next(), 1000); // normal member
  }
  gotoAnchor(anchor, aname, false);
}

function selectAndHighlight(hash, n) {
  // console.log(hash,n,99)
  var a;
  if (hash) {
    var link = stripPath(pathName()) + ':' + hash.substring(1);
    a = $('.item a[class$="' + link + '"]');
  }
  if (a && a.length) {
    a.parent().parent().addClass('selected');
    a.parent().parent().attr('id', 'selected');
    highlightAnchor();
  } else if (n) {
    $(n.itemDiv).addClass('selected');
    $(n.itemDiv).attr('id', 'selected');
  }
  if ($('#nav-tree-contents .item:first').hasClass('selected')) {
    $('#nav-sync').css('top', '30px');
  } else {
    $('#nav-sync').css('top', '5px');
  }
  showRoot();
}

function showNode(o, node, index, hash) {
  if (node && node.childrenData) {
    if (typeof (node.childrenData) === 'string') {
      var varName = node.childrenData;
      getScript(node.relpath + varName, function () {
        node.childrenData = getData(varName);
        showNode(o, node, index, hash);
      }, true);
    } else {
      if (!node.childrenVisited) {
        getNode(o, node);
      }
      $(node.getChildrenUL()).css({ 'display': 'block' });
      node.plus_img.innerHTML = arrowDown;
      node.expanded = true;
      var n = node.children[o.breadcrumbs[index]];
      if (index + 1 < o.breadcrumbs.length) {
        showNode(o, n, index + 1, hash);
      } else {
        if (typeof (n.childrenData) === 'string') {
          var varName = n.childrenData;
          getScript(n.relpath + varName, function () {
            n.childrenData = getData(varName);
            node.expanded = false;
            showNode(o, node, index, hash); // retry with child node expanded
          }, true);
        } else {
          var rootBase = stripPath(o.toroot.replace(/\..+$/, ''));
          if (rootBase == "index" || rootBase == "pages" || rootBase == "search") {
            expandNode(o, n, true, true);
          }
          selectAndHighlight(hash, n);
        }
      }
    }
  } else {
    selectAndHighlight(hash);
  }
}

function removeToInsertLater(element) {
  var parentNode = element.parentNode;
  var nextSibling = element.nextSibling;
  parentNode.removeChild(element);
  return function () {
    if (nextSibling) {
      parentNode.insertBefore(element, nextSibling);
    } else {
      parentNode.appendChild(element);
    }
  };
}

function getNode(o, po) {
  var insertFunction = removeToInsertLater(po.li);
  po.childrenVisited = true;
  var l = po.childrenData.length - 1;
  for (var i in po.childrenData) {
    var nodeData = po.childrenData[i];
    po.children[i] = newNode(o, po, nodeData[0], nodeData[1], nodeData[2],
      i == l);
  }
  insertFunction();
}

function gotoNode(o, subIndex, root, hash, relpath) {
  var nti = navTreeSubIndices[subIndex][root + hash];
  // 遍历原数组获取dom层级下标数组
  var ntiStr = '';
  if(window.location.pathname.indexOf('namespacemembers.html') > -1){
    ntiStr = '[0, 0]';
  }else{
    ntiStr = sessionStorage.getItem('indexArr');
  }
  // o.breadcrumbs = $.extend(true, [], nti ? nti : navTreeSubIndices[subIndex][root]);
  o.breadcrumbs = !!ntiStr ? JSON.parse(ntiStr || '') : [0, 0];
  if (!o.breadcrumbs && root != NAVTREE[0][1]) { // fallback: show index
    alert(0)
    navTo(o, NAVTREE[0][1], "", relpath);
    $('.item').removeClass('selected');
    $('.item').removeAttr('id');
  }
  if (o.breadcrumbs) {
    o.breadcrumbs.unshift(0); // add 0 for root node
    showNode(o, o.node, 0, hash);
  }
}

function navTo(o, root, hash, relpath) {
  var link = cachedLink();
  if (link) {
    var parts = link.split('#');
    root = parts[0];
    if (parts.length > 1) hash = '#' + parts[1].replace(/[^\w\-]/g, '');
    else hash = '';
  }
  if (hash.match(/^#l\d+$/)) {
    var anchor = $('a[name=' + hash.substring(1) + ']');
    glowEffect(anchor.parent(), 1000); // line number
    hash = ''; // strip line number anchors
  }
  var url = root + hash;
  var i = -1;
  while (NAVTREEINDEX[i + 1] <= url) i++;
  if (i == -1) { i = 0; root = NAVTREE[0][1]; } // fallback: show index
  if (navTreeSubIndices[i]) {
    gotoNode(o, i, root, hash, relpath)
  } else {
    getScript(relpath + 'navtreeindex' + i, function () {
      navTreeSubIndices[i] = eval('NAVTREEINDEX' + i);
      if (navTreeSubIndices[i]) {
        gotoNode(o, i, root, hash, relpath);
      }
    }, true);
  }
}

function showSyncOff(n, relpath) {
  n.html('<img src="' + relpath + 'sync_off.png" title="' + SYNCOFFMSG + '"/>');
}

function showSyncOn(n, relpath) {
  n.html('<img src="' + relpath + 'sync_on.png" title="' + SYNCONMSG + '"/>');
}

function toggleSyncButton(relpath) {
  var navSync = $('#nav-sync');
  if (navSync.hasClass('sync')) {
    navSync.removeClass('sync');
    showSyncOff(navSync, relpath);
    storeLink(stripPath2(pathName()) + hashUrl());
  } else {
    navSync.addClass('sync');
    showSyncOn(navSync, relpath);
    deleteLink();
  }
}

function initNavTree(toroot, relpath) {
  var o = new Object();
  // o.toroot = toroot;
  o.toroot = sessionStorage.getItem('toroot') || 'namespacemembers.html';
  o.node = new Object();
  o.node.li = document.getElementById("nav-tree-contents");
  o.node.childrenData = NAVTREE;
  o.node.children = new Array();
  o.node.childrenUL = document.createElement("ul");
  o.node.getChildrenUL = function () { return o.node.childrenUL; };
  o.node.li.appendChild(o.node.childrenUL);
  o.node.depth = 0;
  o.node.relpath = relpath;
  o.node.expanded = false;
  o.node.isLast = true;
  o.node.plus_img = document.createElement("span");
  o.node.plus_img.className = 'arrow';
  o.node.plus_img.innerHTML = arrowRight;

  if (localStorageSupported()) {
    var navSync = $('#nav-sync');
    if (cachedLink()) {
      showSyncOff(navSync, relpath);
      navSync.removeClass('sync');
    } else {
      showSyncOn(navSync, relpath);
    }
    navSync.click(function () { toggleSyncButton(relpath); });
  }

  $(window).load(function () {
    navTo(o, o.toroot, hashUrl(), relpath);
    showRoot();
  });

  $(window).bind('hashchange', function () {
    if (window.location.hash && window.location.hash.length > 1) {
      var a;
      if ($(location).attr('hash')) {
        var clslink = stripPath(pathName()) + ':' + hashValue();
        a = $('.item a[class$="' + clslink.replace(/</g, '\\3c ') + '"]');
      }
      if (a == null || !$(a).parent().parent().hasClass('selected')) {
        $('.item').removeClass('selected');
        $('.item').removeAttr('id');
      }
      var link = stripPath2(pathName());
      navTo(o, link, hashUrl(), relpath);
    } else if (!animationInProgress) {
      $('#doc-content').scrollTop(0);
      $('.item').removeClass('selected');
      $('.item').removeAttr('id');
      navTo(o, o.toroot, hashUrl(), relpath);
    }
  })
}
/* @license-end */
function linkClickHandle(a, link, flag, aname) {
  $(a).click(function () {
    const parentLis = $(this).parents('.li-item');
    const arr = [];
    for (let i = parentLis.length - 1; i > -1; i--) {
      arr.push($(parentLis[i]).index());
    }
    var aIndex = arr2.indexOf(link);
    var indexArrW = arr1[aIndex];
    if (indexArrW.length > 3) {
      indexArrW.splice(1, 2);
      sessionStorage.setItem('indexArr', JSON.stringify(indexArrW))
    } else if (indexArrW.length == 3) {
      indexArrW.splice(1, 1);
      sessionStorage.setItem('indexArr', JSON.stringify(indexArrW))
    } else if (indexArrW.length == 2) {
      if (link == 'annotated.html') {
        sessionStorage.setItem('indexArr', '[1]')
      } else if (link == 'files.html') {
        sessionStorage.setItem('indexArr', '[2]')
      } else {
        sessionStorage.setItem('indexArr', JSON.stringify(indexArrW))
      }

    }
    sessionStorage.setItem('toroot', link);
    sessionStorage.setItem('navpath', link);
    sessionStorage.setItem('search', link);
    storeLink(link);
    if (flag) {
      if (!$(a).parent().parent().hasClass('selected')) {
        $('.item').removeClass('selected');
        $('.item').removeAttr('id');
        $(a).parent().parent().addClass('selected');
        $(a).parent().parent().attr('id', 'selected');
      }
      var anchor = $(aname);
      gotoAnchor(anchor, aname, true);
    }
  });
  $(a).on('mousedown', function (e) {
    if (e.which == 3) {
      let nodevalue = $(this)[0].attributes[1].nodeValue;
      if (nodevalue.substr(0, 10) == '/api/cc?/api') {
        return;
      } else {
        $(this)[0].attributes[1].nodeValue = "/api/cc?/api/" + nodevalue;
      }
    }
  })
}



