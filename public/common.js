$(function () {
    ;(function () {
        // 统一修改title
        $('title').text('MindSpore')
        const pathname = window.location.pathname
        const isEn = pathname.indexOf('/en/') !== -1
        const lang = isEn ? '/en/' : '/zh-CN/'
        const enPath = isEn ? 'en' : ''
        const pathPrefix = pathname.split(lang)
        const currentVersion = pathPrefix[1].split('/')[0]
        const pagePath = pathPrefix[0] + lang + currentVersion
        let isDark = localStorage.getItem('ms-theme') === 'dark'
        function curVersion(version = '') {
            return version.startsWith('r') ? version.slice(1) : version
        }

        //切换语言链接
        let newNavPath = isEn
            ? pathname.replace('/en/', '/zh-CN/')
            : pathname.replace('/zh-CN/', '/en/')

        const body = $('body')

        let headerMenuData = [],
            msVersionData = [],
            componentVersionData = [],
            pageSubMenu = [],
            pageTitle = '',
            componentVersionTitle = '',
            configIP = {}

        // 获取导航菜单
        function getHeaderData(url) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: 'get',
                    url: url,
                    dataType: 'json',
                    success: (res) => {
                        resolve(res)
                    },
                    error: (e) => {
                        reject(e)
                    },
                })
            }).catch((e) => {})
        }
        // 二级菜单
        function createSubMenu() {
            return `${
                pageSubMenu &&
                pageSubMenu
                    .map(function (item) {
                        if (
                            item.url.startsWith(pagePath) &&
                            !item.url.includes('use/downloads')
                        ) {
                            item.active = 1
                        }
                        return `<div class="header-nav-link">
          <a class="${
              item.active ? 'selected' : ''
          }" href="${filterXSS(item.url)}">${filterXSS(item.label)}</a>
      </div>
      `
                    })
                    .join('')
            }`
        }

        //初始化header
        const msHeader = {
            headerTags: function (tags) {
                return `${
                    tags && tags.length > 0
                        ? tags
                              .map((item) => {
                                  if (item.toLocaleLowerCase() === 'outlink') {
                                      return `<em class="outlink"></em>`
                                  } else {
                                      return `<span class="ms-tag ${item.toLocaleLowerCase()}">
                          <span class="ms-tag-label">${filterXSS(item)}</span>
                      </span>`
                                  }
                              })
                              .join('')
                        : ''
                }`
            },
            pcHeader: function () {
                return `<header class="header page-load">
<nav class="header-wapper header-wapper-top">
<div class="header-nav" style="display: flex;">
  <a href="/${enPath}" class="logo " >
      <img class="logo-img" src="/pic/logo_black.png" alt="logo" />
  </a>
  ${
      headerMenuData &&
      headerMenuData
          .map(function (item) {
              const href = item.href ? (isEn ? item.href.en : item.href.zh) : ''
              const name = isEn ? item.label.en : item.label.zh
              if (!item.children) {
                  if (pathname.indexOf(item.id) > -1 && item.id === 'docs') {
                      item.active = 1
                  }
                  return `
          <div class="header-nav-link"><a class="header-nav-link-line ${
              item.active ? 'selected' : ''
          }" href="${filterXSS(href)}">${filterXSS(name)}</a></div>
          `
              } else {
                  if (
                      pathname.startsWith('/tutorials/') &&
                      item.id === 'learning'
                  ) {
                      item.active = 1
                  }
                  let navLabel = ''
                  if (href) {
                      navLabel = `<a class="header-nav-link-line ${
                          item.active ? 'selected' : ''
                      }" href="${filterXSS(href)}" target="${
                          item.jumOut ? '_blank' : '_self'
                      }">${filterXSS(name)}</a>`
                  } else {
                      navLabel = `<span class="header-nav-link-line ${
                          item.active ? 'selected' : ''
                      }">${filterXSS(name)}</span>`
                  }
                  return `
          <div class="header-nav-link">
                  <div class="nav-content">${navLabel}
                  ${
                      item.label && item.label[isEn ? 'en' : 'zh']
                          ? `<ul class="dropdown-menu-git ${
                                item.id === 'docs' ? 'dropdown-menu-docs' : ''
                            }" >
                        ${item.children
                            .map(function (sub) {
                                if (
                                    sub.label &&
                                    sub.label[isEn ? 'en' : 'zh']
                                ) {
                                    let navHref = isEn
                                        ? sub.href.en
                                        : sub.href.zh
                                    if (sub.id === 'tutorials') {
                                        navHref = navHref.replace(
                                            'master',
                                            msHeader.headerPathVersion(sub.id)
                                        )
                                    }
                                    return `<li><a target="${
                                        sub.jumOut ? '_blank' : '_self'
                                    }" href="${filterXSS(navHref)}">
                                ${filterXSS(isEn ? sub.label.en : sub.label.zh)}
                                ${msHeader.headerTags(sub.tags)}
                                </a></li>`
                                }
                            })
                            .join('')}
                    </ul>`
                          : ''
                  }</div> ${msHeader.headerTags(item.tags)}
          </div>`
              }
          })
          .join('')
  }
</div>
<div class="header-nav navbar-tools" >
  <div class="header-search"><div class="search-input"><span class="search-icon"></span></span><input
          class="search-val" placeholder="${
              isEn ? 'Search...' : '全局搜索...'
          }"><span class="close-icon"></div></div>
  <div class="header-nav-link">
      <p class="code">${
          isEn ? 'Code' : '代码'
      } <i class="icon-chevron-down"></i></p>
      <ul class="dropdown-menu-git">
          <li><a href="${
              configIP.GITEE_URL
          }/mindspore/mindspore" rel="noopener noreferrer"  target="_blank">Gitee <em class="outlink"></em></a></li>
          <li><a href="${
              configIP.GITHUB_URL
          }/mindspore-ai/mindspore" rel="noopener noreferrer" target="_blank">GitHub <em class="outlink"></em></a></li>
      </ul>
  </div>
  <div class="dropdown">
      <a href="${filterXSS(
          newNavPath
      )}" class="dropdown-toggle" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          <span class="languageIpt">EN</span>
      </a>
  </div>
  <div class="theme-change"><i class="icon-theme light"></i></div>
</div>
</nav>
<div class="header-menu">
<nav class="header-wapper  header-wapper-docs" >
<div class="header-nav">
<div class="header-nav-info">
${!pathname.startsWith('/tutorials') ? `<em class="docs-menu-icon"></em>` : ''}
<h3>${pageTitle}</h3>
</div>
<div class="bottom">
${createSubMenu()}
</div>
</div>
</div></nav></div><div class="header-nav-layer">
<div class="header-nav-content">
${
    !pathname.startsWith('/tutorials')
        ? docsMenuData &&
          docsMenuData
              .map(function (item) {
                  return `<div class="docsNew-column">
                      <div class="docsNew-column-title">${
                          filterXSS(isEn ? item.title.en : item.title.zh) || ''
                      }</div>
                  <div class="bottom">
                      ${item.children
                          .map(function (subitem) {
                              return `
                            <a class="docs-column-link" href="${
                                subitem.link
                                    ? subitem.link
                                    : msHeader.headerNavLinks(subitem.id)
                            }" ${subitem.link ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                            ${filterXSS(subitem.name)}
                            ${msHeader.headerTags(subitem.tags)}
                          </a>`
                          })
                          .join('')}
                  </div>
              </div>`
              })
              .join('')
        : ''
}
</div></header>`
            },
            h5HeadMenu: function () {
                return `
    <div class="header-menu-layer">
      <div class="menu-mask"></div>
      <div class="menu-content">
        <div class="menu-left">
          <ul class="menu-list">
          ${
              headerMenuData &&
              headerMenuData
                  .map((item, index) => {
                      const href = item.href
                          ? isEn
                              ? item.href.en
                              : item.href.zh
                          : 'javascript:;'
                      const name = isEn ? item.label.en : item.label.zh

                      return `
              <li class="menu-item">
                <a href="${filterXSS(href)}" data-val='${index}' target="${
                          item.jumOut ? '_blank' : '_self'
                      }">
                      ${filterXSS(name)}
                      </a>
              </li> `
                  })
                  .join('')
          }
          </ul>
        </div>
        <div class="menu-right">
            ${
                headerMenuData &&
                headerMenuData
                    .map((item, idx) => {
                        return `<ul class="sub-menu">
                      ${
                          item.children
                              ? item.children
                                    .map((sub, index) => {
                                        let href = sub.href
                                            ? isEn
                                                ? sub.href.en
                                                : sub.href.zh
                                            : ''
                                        const name = isEn
                                            ? sub.label.en
                                            : sub.label.zh
                                        if (sub.id === 'tutorials') {
                                            href = href.replace(
                                                'master',
                                                msHeader.headerPathVersion(
                                                    sub.id
                                                )
                                            )
                                        }
                                        return `${
                                            href
                                                ? `<li class="sub-menu-item">
                                        <a href="${filterXSS(
                                            href
                                        )}" data-val='${index}' target="${
                                                      sub.jumOut
                                                          ? '_blank'
                                                          : '_self'
                                                  }">
                                              ${filterXSS(name)}
                                              </a>
                                      </li>`
                                                : ''
                                        }`
                                    })
                                    .join('')
                              : ''
                      }
                </ul>`
                    })
                    .join('')
            }
        </div>
      </div>
    </div>`
            },
            h5Header: function () {
                return `<header id="header-h5" class="header-mobile">
<div class="header-mobile-top">
<div class="header-mobile-wrap">
<div class="header-menu"> <em class="header-menu-icon"></em>
  ${msHeader.h5HeadMenu()}
</div>
<span class="line"></span>
<a href="/${enPath}"><img class="h5-logo" src="/pic/logo1.png" alt="logo" /></a>
<p class="page-title">${pageTitle}</p></div>
<em class="search-icon"></em>
</div>
</header>`
            },
            h5Nav: function () {
                return `<div id="nav-h5"><div class="header-mobile-menu ${
                    pageSubMenu.length > 0 ? 'current' : ''
                }">
      ${createSubMenu()}
    </div>
    <div class="header-mobile-nav">
        <em class="page-menu"></em>
    </div>
    ${
        !pathname.startsWith('/tutorials')
            ? `<div class="docs-menu-icon h5"></div>`
            : ''
    }</div>
    `
            },
            dialogLayer: function (title) {
                return `
      <div class="o-layer-dialog">
        <div class="o-layer-mask"></div>
        <div class="o-dlg-main">
          <div class="o-dlg-header">${title}</div>
          <div class="o-scroller-container" id="dialog-content"></div>
        </div>
      </div>
    `
            },
            // 文档页面交互
            headerMethods: function () {
                const searchUrl = isEn ? '/search/en' : '/search'
                // 点击切换语言开始
                if (isEn) {
                    $('.languageIpt').text('中')
                    $('.changeTutorial').css('left', 0)
                    $('.logo').attr('href', '/en')
                } else {
                    $('.languageIpt').text('EN')
                }
                // 点击关闭搜索框
                $('.close-icon').on('click', function () {
                    $('.search-val').val('')
                    $(this).hide()
                })
                // 获取搜索框的值并传递到搜索页面
                const searchInput = $('.search-input')
                $('.search-val')
                    .focus(() => {
                        searchInput.addClass('current')
                    })
                    .blur(() => {
                        searchInput.removeClass('current')
                    })
                    .on('keydown', function (e) {
                        const val = $(this).val()
                        if (val !== '') {
                            $('.close-icon').show()
                        }
                        if (e.keyCode === 13 && val !== '') {
                            window.location.href =
                                searchUrl +
                                '?inputValue=' +
                                encodeURIComponent(val)
                        }
                    })

                const ratingLayer = $('.rating-layer')
                $('.rating-label').on('click', function () {
                    if (ratingLayer.hasClass('on')) return
                    ratingLayer.addClass('on').append(msFotter.rateLayer)
                    msFotter.documentEvaluationFn()
                })

                $('.rating-layer .rating-close').on('click', function () {
                    ratingLayer.removeClass('on').empty()
                })

                // 文档菜单
                let timer = ''
                const headerLayer = $('.header-nav-layer')
                const docsMenuIcon = $('.docs-menu-icon')
                docsMenuIcon
                    .mouseenter(() => {
                        clearTimeout(timer)
                        headerLayer.addClass('nav-show')
                    })
                    .mouseleave(() => {
                        clearTimeout(timer)
                        timer = setTimeout(() => {
                            headerLayer.removeClass('nav-show')
                        }, 300)
                    })
                headerLayer
                    .mouseenter(() => {
                        clearTimeout(timer)
                        headerLayer.addClass('nav-show')
                    })
                    .mouseleave(() => {
                        headerLayer.removeClass('nav-show')
                    })
                setTimeout(() => {
                    $('.wy-nav-side').addClass('page-load')
                }, 50)
                setTimeout(() => {
                    $('.header').addClass('page-load')
                }, 150)
            },
            h5HeaderMethods: function () {
                const searchUrl = isEn ? '/search/en' : '/search'
                $('.search-icon').on('click', function (e) {
                    window.location.href = searchUrl
                })
                $('.rating-label').on('click', function () {
                    body.prepend(
                        msHeader.dialogLayer(msFotter.fontmatter.helpforyou)
                    )
                    $('#mask').show()
                    $('#dialog-content').append(msFotter.rateLayer)
                })
                // 移动端菜单点击事件
                $('.header-menu-icon').on('click', function () {
                    msHeader.hideNav(1)
                    if ($(this).hasClass('on')) {
                        $('.header-menu-layer').hide()
                        $(this).removeClass('on')
                    } else {
                        $('.header-menu-layer').show()
                        $(this).addClass('on')
                    }
                })
                $('.menu-item a').on('click', function () {
                    const menuIndex = $(this).data('val')
                    $('.menu-right .sub-menu').hide().eq(menuIndex).show()
                })

                msFotter.documentEvaluationFn()
                // 国际化
                $('#dropdownMenu_h5').on('click', function () {
                    $('.dropdown-menu').slideToggle()
                })
                // 主导航显示
                $('.more-nav').on('click', function () {
                    if ($(this).hasClass('on')) {
                        msHeader.hideNav(0)
                        $(this).css(
                            'backgroundImage',
                            'url("/pic/nav_white.png")'
                        )
                    } else {
                        msHeader.showNav(0)
                        $(this).css('backgroundImage', 'url("/pic/close.png")')
                    }
                })

                // 侧栏导航显示
                $('.page-menu').on('click', function () {
                    if ($(this).hasClass('on')) {
                        msHeader.hideNav(1)
                    } else {
                        msHeader.showNav(1)
                    }
                })

                $('.h5.docs-menu-icon').on('click', function () {
                    let title = isEn ? 'Document Directory' : '文档目录'
                    body.prepend(msHeader.dialogLayer(title))
                    $('#mask').show()
                    $('#dialog-content').append($('.header-nav-content').html())
                })

                $('.header-mobile-nav .versionText').on('click', function () {
                    let title = isEn ? 'Select Version' : '选择版本'
                    body.prepend(msHeader.dialogLayer(title))
                    $('#mask').show()
                    $('#dialog-content').append(
                        $(this).siblings('.version-box').html()
                    )
                })

                // mask点击关闭侧栏
                $('#mask').on('click', function () {
                    msHeader.hideNav(0)
                    msHeader.hideNav(1)
                    $('.o-layer-dialog').remove()
                })
            },
            headerPathVersion: function (path) {
                let version = 'master'
                msVersionData &&
                    msVersionData.forEach((item) => {
                        if (path === item.name) {
                            version =
                                item.versions.length < 2
                                    ? item.versions[0].version
                                    : item.versions[1].version
                        } else if (
                            path.startsWith(item.name) &&
                            item.state !== 'old'
                        ) {
                            version =
                                item.versions.length < 2
                                    ? item.versions[0].version
                                    : item.versions[1].version
                        }
                    })
                return version
            },
            headerNavLinks: function (path) {
                let href = ''
                if (path === 'lite') {
                    href = `/${path}${isEn ? '/en' : ''}`
                } else if (path.startsWith('tutorials') || path === 'docs') {
                    href = `/${path}${lang}${msHeader.headerPathVersion(
                        path
                    )}/index.html`
                } else {
                    href = `/${path}/docs${lang}${msHeader.headerPathVersion(
                        path
                    )}/index.html`
                }
                return filterXSS(href)
            },
            // 导航显示 隐藏  val : 0 主导航  val : 1 侧导航
            showNav: function (val) {
                if (val) {
                    $('.wy-nav-side').css({ left: '0' }).show()
                    $('#mask').css('zIndex', '999')
                    $('.page-menu').addClass('on')
                } else {
                    $('.nav-link-container').css('right', 0)
                    $('#mask').css('zIndex', '150')
                    $('.page-menu').removeClass('on')
                    $('.more-nav').addClass('on')
                    this.hideNav(1)
                }
                body.addClass('overflow')
                $('#mask').show()
            },
            hideNav: function (val) {
                if (val) {
                    $('.wy-nav-side').css({ left: '-90%' }).show()
                    $('.page-menu').removeClass('on')
                } else {
                    $('.nav-link-container').css('right', '-65%')
                    $('.mobile-subnav-wraper').slideUp()
                    $('.btnArrow').css('transform', 'rotate(0deg)')
                    $('.more-nav')
                        .removeClass('on')
                        .css('backgroundImage', 'url("/pic/nav_white.png")')
                }
                body.removeClass('overflow')
                $('#mask').hide()
            },
        }

        // 初始化footer
        const msFotter = {
            gradeState: -1,
            fontmatter: {
                helpforyou: isEn ? 'Was this helpful?' : '这个对你有帮助吗 ?',
                rating: isEn ? 'Was this helpful?' : '我要评分',
                helpfor1: isEn ? 'Not helpful' : '基本没有用',
                helpfor2: isEn ? 'Somewhat helpful' : '有一点帮助',
                helpfor3: isEn ? 'Helpful' : '基本上能用',
                helpfor4: isEn ? 'Very helpful' : '能解决问题',
                helpfor5: isEn ? 'Totally helpful' : '文档很有用',
                ratingSuccess: isEn
                    ? 'Successfully, thank you for your feedback'
                    : '提交成功，感谢您的反馈',
                ratingWarning: isEn
                    ? 'Do not submit the same rating !'
                    : '请勿提交相同评分！',
                copyRight: isEn
                    ? 'Copyright©MindSpore 2023'
                    : '版权所有©MindSpore 2023',
                beianLink: 'https://beian.miit.gov.cn',
                beian: ['粤A2-20044005号', '粤公网安备 44030702002890号'],
                aboutTitle: isEn ? 'Follow us' : '关注我们',
                menu: [
                    {
                        name: isEn ? 'Security' : '安全',
                        path: `/security${isEn ? '/en' : ''}`,
                    },
                    {
                        name: isEn ? 'Service Status' : '服务状态',
                        path: 'https://status.mindspore.cn',
                    },
                    {
                        name: isEn ? 'Terms of Use' : '法律声明',
                        path: `/legal${isEn ? '/en' : ''}`,
                    },
                    {
                        name: isEn ? 'Privacy Policy' : '个人信息保护政策',
                        path: `/privacy${isEn ? '/en' : ''}`,
                    },
                ],
            },
            rateLayer: function () {
                const helpForScores = [
                    msFotter.fontmatter.helpfor1,
                    msFotter.fontmatter.helpfor2,
                    msFotter.fontmatter.helpfor3,
                    msFotter.fontmatter.helpfor4,
                    msFotter.fontmatter.helpfor5,
                ]
                return `<h3 class="evaluateTitle">${
                    msFotter.fontmatter.helpforyou
                } <i class="rating-close"></i></h3><ul class="evaluateStar">
    ${helpForScores
        .map(
            (score) => `
        <li>
          <div class="star"><svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M12.565 3.837c0.252 0.124 0.456 0.328 0.58 0.58l1.735 3.516c0.155 0.314 0.455 0.532 0.801 0.582l3.88 0.564c0.698 0.101 1.182 0.75 1.080 1.448-0.040 0.278-0.171 0.535-0.372 0.731l-2.808 2.737c-0.251 0.245-0.365 0.597-0.306 0.942l0.663 3.864c0.119 0.695-0.348 1.356-1.043 1.475-0.277 0.047-0.562 0.002-0.81-0.128l-3.47-1.824c-0.31-0.163-0.681-0.163-0.991 0l-3.47 1.824c-0.624 0.328-1.397 0.088-1.725-0.536-0.131-0.249-0.176-0.533-0.128-0.81l0.663-3.864c0.059-0.345-0.055-0.698-0.306-0.942l-2.808-2.737c-0.505-0.492-0.515-1.301-0.023-1.806 0.196-0.201 0.453-0.332 0.731-0.372l3.88-0.564c0.347-0.050 0.646-0.268 0.801-0.582l1.735-3.516c0.312-0.633 1.078-0.892 1.711-0.58zM13.735 8.499l-1.556-3.152c-0.049-0.099-0.169-0.14-0.268-0.091-0.039 0.019-0.071 0.051-0.091 0.091l-1.556 3.152c-0.315 0.638-0.901 1.095-1.589 1.249l-0.174 0.032-3.479 0.506c-0.109 0.016-0.185 0.117-0.169 0.227 0.006 0.044 0.027 0.084 0.058 0.114l2.517 2.454c0.506 0.493 0.76 1.186 0.698 1.883l-0.025 0.19-0.594 3.465c-0.019 0.109 0.054 0.212 0.163 0.231 0.043 0.007 0.088 0 0.127-0.020l3.112-1.636c0.625-0.329 1.362-0.356 2.006-0.082l0.173 0.082 3.112 1.636c0.098 0.051 0.219 0.014 0.27-0.084 0.020-0.039 0.028-0.084 0.020-0.127l-0.594-3.465c-0.119-0.696 0.082-1.406 0.542-1.933l0.132-0.139 2.517-2.454c0.079-0.077 0.081-0.204 0.004-0.283-0.031-0.031-0.071-0.052-0.114-0.058l-3.479-0.506c-0.704-0.102-1.32-0.518-1.679-1.125l-0.084-0.156z"></path>
          <path fill="currentColor" d="M12.068 5.067l0.003 11.923c-0.321-0.001-0.642 0.062-0.943 0.19l-0.178 0.085-3.174 1.669c-0.040 0.021-0.085 0.028-0.129 0.021-0.093-0.016-0.16-0.092-0.169-0.181l0.002-0.055 0.606-3.534 0.025-0.194c0.057-0.646-0.152-1.289-0.578-1.778l-0.134-0.142-2.568-2.503c-0.032-0.031-0.053-0.072-0.059-0.117-0.013-0.093 0.038-0.18 0.12-0.216l0.053-0.015 3.549-0.516 0.178-0.033c0.643-0.144 1.199-0.548 1.535-1.115l0.086-0.159 1.587-3.216c0.020-0.040 0.052-0.073 0.093-0.093 0.031-0.015 0.065-0.022 0.098-0.021z"></path>
          <path fill="currentColor" d="M11.936 5.067l-0.003 11.923c0.321-0.001 0.642 0.062 0.943 0.19l0.178 0.085 3.174 1.669c0.040 0.021 0.085 0.028 0.129 0.021 0.093-0.016 0.16-0.092 0.169-0.181l-0.002-0.055-0.606-3.534-0.025-0.194c-0.057-0.646 0.152-1.289 0.578-1.778l0.134-0.142 2.568-2.503c0.032-0.031 0.053-0.072 0.059-0.117 0.014-0.093-0.038-0.18-0.12-0.216l-0.053-0.015-3.549-0.516-0.178-0.033c-0.643-0.144-1.199-0.548-1.535-1.115l-0.086-0.159-1.587-3.216c-0.020-0.040-0.052-0.073-0.093-0.093-0.031-0.015-0.065-0.022-0.098-0.021z"></path>
          </svg>
          </div>
          <div class="wordScore">${score}</div>
        </li> `
        )
        .join('')}
  </ul>`
            },
            rateHTML: function (val) {
                return `<div class="page-rating ${val}"><span class="rating-label"><i class="rating-icon"></i>${msFotter.fontmatter.rating}</span><div class="rating-layer"></div></div>`
            },
            // PC footer
            pcFootHTML: function () {
                const { copyRight, beianLink, beian, menu } =
                    msFotter.fontmatter
                return `
<div id="footer">
<div class="footer-bottom">
<div class="copyright">
  <span class="copyRight">${copyRight}</span>
  <a class="copynum" rel="noopener noreferrer" target="_blank" href="${beianLink}">${
                    beian[0]
                }</a>
  <div>
  <a class="footer-record" rel="noopener noreferrer" target="_blank" href="${beianLink}">
    <img class="copyImg2" src="/pic/copyright3.png" alt="img" />
    <span class="keepRecord">${beian[1]} </span>
  </a>
</div>
</div>
<div class="footer-menu">
${menu
    .map((item) => {
        return `<a href="${item.path}">${item.name}</a>`
    })
    .join('')}
</div>
</div>
`
            },
            //跳转论坛统计
            jumpForumStatistics: function () {
                $('.askQuestion').on('click', function () {
                    $.ajax({
                        type: 'POST',
                        url: '/api/saveEssayJump',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            essayUrl: encodeURIComponent(location.href),
                        }),
                    })
                })
            },
            // H5 footer
            h5FootHTML: function () {
                return `<div id="h5_footer"></div> `
            },
            // 评分事件
            documentEvaluationFn() {
                const star = $('div.star')
                star.on('mouseover', function () {
                    $(this).addClass('sel')
                    $(this)
                        .parent('li')
                        .prevAll()
                        .children('.star')
                        .addClass('sel')
                    $(this)
                        .parent('li')
                        .nextAll()
                        .children('.star')
                        .removeClass('sel')
                }).on('mouseout', function () {
                    $(this).removeClass('sel')
                    $(this)
                        .parent('li')
                        .prevAll()
                        .children('.star')
                        .removeClass('sel')
                })
                const ratingLayer = $('.rating-layer')
                $('.evaluateStar').on('click', '.star', function () {
                    $(this).addClass('sel')
                    $(this)
                        .parent('li')
                        .prevAll()
                        .children('.star')
                        .addClass('sel')
                    $(this)
                        .parent('li')
                        .nextAll()
                        .children('.star')
                        .removeClass('sel')
                    star.unbind('mouseover')
                    star.unbind('mouseout')
                    let grade = $(this).parent('li').prevAll().length + 1
                    if (grade === msFotter.gradeState) {
                        $('.evaluateStar').after(
                            `<div class="rating-tips warning"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M21 12c0 4.971-4.029 9-9 9s-9-4.029-9-9c0-4.971 4.029-9 9-9s9 4.029 9 9z"></path>
                  <path fill="#fff" d="M12 13.621c-0.228 0-0.416-0.176-0.432-0.404l-0.367-5.441-0.002-0.054c0-0.408 0.306-0.745 0.701-0.795l0.1-0.006c0.027 0 0.027 0 0.054 0.002 0.441 0.030 0.775 0.412 0.745 0.853l-0.367 5.441c-0.015 0.227-0.204 0.404-0.432 0.404zM12 16.771c-0.608 0-1.1-0.492-1.1-1.1s0.492-1.1 1.1-1.1c0.608 0 1.1 0.492 1.1 1.1s-0.492 1.1-1.1 1.1z"></path>
                  </svg>
                  ${msFotter.fontmatter.ratingWarning}</div>`
                        )
                        setTimeout(() => {
                            $('.rating-tips').remove()
                        }, 2000)
                    } else {
                        $.ajax({
                            type: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                score: grade,
                                essayUrl: encodeURIComponent(location.href),
                            }),
                            url: '/api/saveEssayScore',
                        })
                        msFotter.gradeState = grade
                        $('.evaluateStar')
                            .hide()
                            .after(
                                `<div class="rating-tips success"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M21 12c0 4.971-4.029 9-9 9s-9-4.029-9-9c0-4.971 4.029-9 9-9s9 4.029 9 9z"></path>
                      <path fill="#fff" d="M16.21 8.679l-5.225 5.212-0.043 0.032c-0.047 0.026-0.12 0.016-0.169-0.032l-2.478-2.465-0.076-0.064c-0.244-0.169-0.567-0.14-0.772 0.066-0.234 0.235-0.233 0.615 0.002 0.849l2.478 2.465 0.105 0.094c0.538 0.431 1.312 0.391 1.8-0.096l5.225-5.212 0.064-0.076c0.17-0.244 0.143-0.567-0.063-0.773-0.234-0.235-0.614-0.235-0.849-0.001z"></path>
                      </svg>
                      ${msFotter.fontmatter.ratingSuccess}</div>`
                            )
                        $('.evaluateTitle').hide()
                        setTimeout(() => {
                            ratingLayer.empty().removeClass('on')
                        }, 1000)
                    }
                })

                $('.page-rating .rating-close').on('click', function () {
                    ratingLayer.removeClass('on').empty()
                })
            },
        }
        // 复制代码
        function codeClipboard() {
            // 实现复制粘贴功能
            $('pre>span:first-of-type').append(
                '<em class="copy-btn" data-tooltip="copy"><i class="icon-copy"></i></em>'
            )

            $('.copy-btn').click(function () {
                let that = $(this)
                $(this).attr(
                    'data-tooltip',
                    isEn ? 'Copy Success!' : '复制成功！'
                )
                let domTemp = $(this).parent().parent()[0].cloneNode(true)
                domTemp.querySelectorAll('.go').forEach((item) => item.remove())
                let Url2 = domTemp.innerText.replace('Copy', '')
                Url2 = Url2.split(/[\n]/)
                // 只有python才需要去掉>>>和...
                const parentElement = $(this)
                    .closest('.highlight-cpp, .highlight-c++, .highlight-java')
                    .get(0)

                if (parentElement) {
                    Url2 = Url2.join('\n')
                } else {
                    let flag = false
                    for (let i = 0; i < Url2.length; i++) {
                        if (
                            Url2[i].indexOf('>>>') > -1 ||
                            Url2[i].indexOf('...') == 0
                        ) {
                            flag = true
                        } else {
                            flag = false
                        }
                        if (flag) {
                            if (
                                Url2[i].indexOf('>>>') > -1 ||
                                Url2[i].indexOf('...') == 0
                            ) {
                                Url2[i] = Url2[i].slice(4)
                            } else {
                                Url2[i] = ''
                            }
                        }
                    }
                    Url2 = Url2.join('\n')
                        .replace(/>>> /g, '')
                        .replace(/>>>/g, '')
                }
                var oInput = document.createElement('textarea')
                oInput.value = Url2
                document.body.appendChild(oInput)
                oInput.select() // 选择对象
                document.execCommand('Copy') // 执行浏览器复制命令
                oInput.class = 'oInput'
                oInput.style.display = 'none'
                setTimeout(function () {
                    that.attr('data-tooltip', 'copy')
                }, 1000)
            })
        }

        function isPadShow() {
            $('.wy-nav-content')
                .append(msFotter.h5FootHTML)
                .append('<div id="mask"></div>')
            $('#footer').remove()
            body.prepend(msHeader.h5Header)
            $('.wy-nav-content-wrap').prepend(msHeader.h5Nav)
            $('.header-mobile-nav').append(componentInfo.sideVersionList())
            $('#h5_footer')
                .append(msFotter.pcFootHTML)
                .before(msFotter.rateHTML('rating-h5'))
            msHeader.h5HeaderMethods()
            msFotter.documentEvaluationFn()
        }

        // 用一个宽度来记录之前的宽度，当之前的宽度和现在的宽度，从手机切换到电脑或者从电脑切换到手机，才执行下面部分函数
        const watchWinResize = () => {
            let oldWidth = window.innerWidth
            window.addEventListener('resize', function () {
                let width = window.innerWidth
                let h5Head = document.getElementById('header-h5')
                let h5footer = document.getElementById('h5_footer')
                let pcfooter = document.getElementById('footer')
                let navh5 = document.getElementById('nav-h5')
                if (width < 1200) {
                    $('#mask').css('display', 'none')
                    $('.wy-nav-side').css({ left: '-90%', transition: '0s' })
                    if (h5Head === null) {
                        isPadShow()
                    }
                    $('.o-layer-dialog').remove()
                } else {
                    $('.header').css('display', 'block')
                    $('#mask').remove()
                    $('.wy-nav-side').css('left', '0')

                    if (h5Head || h5footer || navh5) {
                        h5Head.remove()
                        h5footer.remove()
                        navh5.remove()
                        $('.rating-h5').remove()
                    }
                    if (pcfooter === null) {
                        $('.wy-nav-content').append(msFotter.pcFootHTML)
                    }
                }
                if (width > 1200 && oldWidth < 1200) {
                    msFotter.documentEvaluationFn()
                    msFotter.jumpForumStatistics()
                }
                oldWidth = width
            })
        }

        // 文档显示格式化
        function docsformatter() {
            // 解决公式显示问题
            let emList = $('p>em')
            if (emList && emList.length > 0) {
                for (let i = 0; i < emList.length; i++) {
                    if (
                        emList[i].parentNode &&
                        emList[i].parentNode.innerHTML.indexOf('$') != -1
                    ) {
                        emList[i].parentNode.innerHTML =
                            emList[i].parentNode.innerText
                    }
                }
            }

            // 说明样式调整
            if (pathname && pathname.indexOf('/design/introduction') != -1) {
                let blockquoteList = $('blockquote')
                blockquoteList.addClass('noteStyle')
            }

            function resolveText(text) {
                return isEn ? `Search in ${text} ` : `"${text}" 内搜索`
            }
            const wyMenu = $('.wy-grid-for-nav .wy-menu')
            wyMenu
                .find('.caption')
                .append("<i class='icon-chevron-down'></i>")
                .next()
                .hide()

            if (wyMenu.find('.current').length) {
                $('.wy-grid-for-nav .wy-menu>.current')
                    .show()
                    .prev()
                    .addClass('down')
            } else {
                wyMenu.find('.caption').eq(0).addClass('down').next().show()
            }
            wyMenu.find('.caption').click(function () {
                $(this).toggleClass('down')
                $(this).next().toggle(200)
            })

            // 左侧菜单少于4个 展开显示
            if (wyMenu.find('.caption').length < 5) {
                wyMenu.find('.caption').each(function (index, item) {
                    $(item).addClass('down').next().show()
                })
            }

            // 进入页面调整到锚点,解决中文锚点问题，中文锚点需要转码
            function gotoId() {
                let url = filterXSS(window.location.toString()) //进这个页面的url
                let id = window.decodeURIComponent(url.split('#')[1]) //中文id需要转码，英文id走catch error
                if (id && document.getElementById(id) !== null) {
                    document.getElementById(id).scrollIntoView(true)
                }
            }

            let strTemp = isEn ? 'Docs' : '文档'
            if (pathname.startsWith('/tutorials')) {
                strTemp = isEn ? 'Tutorials' : '教程'
            }

            $('#rtd-search-form input').attr(
                'placeholder',
                filterXSS(resolveText(strTemp))
            )
            gotoId()
        }

        // 右侧锚点标识
        function sideRightAnchor() {
            let sectionList = $('.document>div:first-of-type>section')
            let h1List = $('.document section>h1')
            let h2List = $('.document section>h2')
            let codeList = $(
                'dl>dt>.descname>.pre:not(.method .descname>.pre):not(.property .descname>.pre)'
            )
            if (sectionList[0] === undefined) {
                return
            }
            let $ul =
                '<div class="navRight"><ul class="navList"><li class="navLi"><a href="#' +
                filterXSS(sectionList[0].id) +
                '" class="navLiTitle">' +
                filterXSS(h1List[0].innerText) +
                '</a><ul class="navList2"></ul></li></ul></div>'
            let navLi3 = '',
                navLi2 = '',
                navLi4 = ''
            $('.wy-nav-content-wrap').append($ul)
            if (h2List.length > 0) {
                for (let i = 0; i < h2List.length; i++) {
                    // 正则去除括号、保留内容
                    let id = h2List[i].parentNode.id
                        .replace(/\(([^).']*)\)/g, '$1')
                        .replace(/\“|\”|\'/g, '')
                    let h3 = document.getElementById(id).querySelectorAll('h3')
                    if (h3.length > 0) {
                        navLi2 = ''
                        navLi3 = ''
                        for (let i = 0; i < h3.length; i++) {
                            if (
                                h3[i].parentNode.querySelectorAll('h4').length >
                                0
                            ) {
                                navLi4 = ''
                                let navLi4Array =
                                    h3[i].parentNode.querySelectorAll('h4')
                                for (let k = 0; k < navLi4Array.length; k++) {
                                    navLi4 += `<li><span class="line"></span>
                                  <a title="${
                                      navLi4Array[k].innerText
                                  }" href='#${filterXSS(
                                        navLi4Array[k].parentNode.id
                                    )}'>
                                  ${filterXSS(navLi4Array[k].innerText)}</a>
                                </li>`
                                }
                                navLi3 +=
                                    '<li><span class="line"></span><a title="' +
                                    filterXSS(h3[i].innerText) +
                                    '" href=\'#' +
                                    filterXSS(h3[i].parentNode.id) +
                                    "'>" +
                                    filterXSS(h3[i].innerText) +
                                    "</a><ul class='navList4'>" +
                                    navLi4 +
                                    '</ul></li>'
                            } else {
                                navLi3 +=
                                    '<li><span class="line"></span><a title="' +
                                    filterXSS(h3[i].innerText) +
                                    '" href=\'#' +
                                    filterXSS(h3[i].parentNode.id) +
                                    "'>" +
                                    filterXSS(h3[i].innerText) +
                                    '</a></li>'
                            }
                        }
                        navLi2 =
                            '<li><span class="line"></span><a title="' +
                            filterXSS(h2List[i].innerText) +
                            '" href="#' +
                            filterXSS(h2List[i].parentNode.id) +
                            '">' +
                            filterXSS(h2List[i].innerText) +
                            '</a><ul class="navList3"></ul></li>'
                    } else {
                        navLi3 = ''
                        navLi2 = ''
                        if (
                            h2List[i].parentNode.querySelectorAll(
                                '.class>dt .descname>.pre ,.function>dt .descname>.pre'
                            ).length > 0
                        ) {
                            let navLi3Array = h2List[
                                i
                            ].parentNode.querySelectorAll(
                                '.class>dt .descname>.pre,.function>dt .descname>.pre'
                            )

                            for (let j = 0; j < navLi3Array.length; j++) {
                                if (
                                    navLi3Array[
                                        j
                                    ].parentNode.parentNode.querySelectorAll(
                                        'dd .pre'
                                    ).length > 0
                                ) {
                                    navLi4 = ''
                                    let navLi4Array =
                                        navLi3Array[
                                            j
                                        ].parentNode.parentNode.querySelectorAll(
                                            'dd .descname>.pre'
                                        )
                                    for (
                                        let k = 0;
                                        k < navLi4Array.length;
                                        k++
                                    ) {
                                        navLi4 +=
                                            '<li><span class="line"></span><a title="' +
                                            filterXSS(
                                                navLi4Array[k].innerText
                                            ) +
                                            '" href=\'#' +
                                            filterXSS(
                                                navLi4Array[k].parentNode.id
                                            ) +
                                            "'>" +
                                            filterXSS(
                                                navLi4Array[k].innerText
                                            ) +
                                            '</a></li>'
                                    }
                                    navLi3 +=
                                        '<li><span class="line"></span><a title="' +
                                        filterXSS(navLi3Array[j].innerText) +
                                        '" href=\'#' +
                                        filterXSS(
                                            navLi3Array[j].parentNode.id
                                        ) +
                                        "'>" +
                                        filterXSS(navLi3Array[j].innerText) +
                                        '</a><ul class="navList4">' +
                                        filterXSS(navLi4) +
                                        '</ul></li>'
                                } else {
                                    navLi3 +=
                                        '<li><span class="line"></span><a title="' +
                                        filterXSS(navLi3Array[j].innerText) +
                                        '" href=\'#' +
                                        filterXSS(
                                            navLi3Array[j].parentNode.id
                                        ) +
                                        "'>" +
                                        filterXSS(navLi3Array[j].innerText) +
                                        '</a><ul class="navList4"></ul></li>'
                                }
                            }
                            navLi2 =
                                '<li><span class="line"></span><a title="' +
                                filterXSS(h2List[i].innerText) +
                                '" href="#' +
                                filterXSS(h2List[i].parentNode.id) +
                                '">' +
                                filterXSS(h2List[i].innerText) +
                                '</a><ul class="navList3"></ul></li>'
                        } else {
                            navLi2 =
                                '<li><span class="line"></span><a title="' +
                                filterXSS(h2List[i].innerText) +
                                '" href="#' +
                                filterXSS(h2List[i].parentNode.id) +
                                '">' +
                                filterXSS(h2List[i].innerText) +
                                '</a></li>'
                        }
                    }

                    $('.navList2').append(navLi2)
                    $(
                        '.navList2>li:nth-of-type(' + (i + 1) + ') .navList3'
                    ).append(navLi3)
                }
            } else {
                codeList.each(function () {
                    let codeText = $(this).text()
                    let parentID = $(this).closest('dt').attr('id')
                    codeText = filterXSS(codeText)
                    parentID = filterXSS(parentID)
                    const codeLi2 = `
    <li>
      <a title="${codeText}" href="#${parentID}">${codeText}</a>
      <ul class="navList3"></ul>
    </li>`
                    $('.navList2').append(codeLi2)
                    const nextDescnames = $(this)
                        .closest('dt')
                        .next()
                        .find('.descname>.pre')
                    if (nextDescnames.length) {
                        const navLi3 = nextDescnames
                            .map(function () {
                                const descnameText = $(this).text()
                                const descnameParentID = $(this)
                                    .closest('dt')
                                    .attr('id')
                                return `<li><a href="#${descnameParentID}">${descnameText}</a></li>`
                            })
                            .get()
                            .join('')
                        $('.navList2 .navList3').last().append(navLi3)
                    }
                })
            }

            // 点击右侧导航选中
            const navListLink = $('.navList a')
            navListLink.on('click', function () {
                navListLink.closest('li').removeClass('selected')
                $(this).closest('li').addClass('selected')
            })
            // 右侧导航可滚动蒙层
            function navRightScroll() {
                let scrollable = $('.wy-nav-content-wrap').scrollTop()
                if (scrollable > 90) {
                    $('.navRightWraper').addClass('fixed')
                } else {
                    $('.navRightWraper').removeClass('fixed')
                }
            }
            $('.navRight').wrap('<div class="navRightWraper"></div>')
            $('.navRightWraper').append('<div class="navRightMasker"></div>')
            // computeNavRightMask()
            $('.wy-nav-content-wrap').scroll(navRightScroll)

            // 锚点跟随滚动定位\
            function navContentAnchor() {
                for (let i = 0; i < navListLink.length; i++) {
                    let anchorId = navListLink.eq(i).attr('href').substring(1)
                    let newAnchorId = escapeJquery(anchorId)
                    if (!newAnchorId) return
                    if ($('#' + newAnchorId).offset().top - 140 < 116) {
                        navListLink.closest('li').removeClass('selected')
                        navListLink.eq(i).closest('li').addClass('selected')
                    }
                }
                return false
            }
            navContentAnchor()
            $('.wy-nav-content-wrap').scroll(navContentAnchor)
        }

        const componentInfo = {
            versionDropdownList: function () {
                let list = []
                const matchingItem = msVersionData.find(
                    (item) =>
                        pathname.startsWith(`/${item.name}/`) &&
                        item.state !== 'old'
                )
                if (matchingItem) {
                    list = matchingItem.versions.map((sub) => ({
                        version: curVersion(sub.version),
                        url:
                            sub.url !== ''
                                ? sub.url
                                : `${pagePath.replace(
                                      currentVersion,
                                      sub.version
                                  )}/index.html`,
                        versionAlias: curVersion(sub.versionAlias),
                    }))
                }
                return list.slice(0, 4)
            },
            sideVersionList: function () {
                return (
                    componentInfo.versionDropdownList().length > 0 &&
                    `<div class='version-select-wrap '><div class="version-select-dom">
            <span class="versionText">
            ${filterXSS(curVersion(currentVersion))}
            <em class="icon-chevron-down"></em>
            </span>
               <div class="version-box"><ul class="version-list">
                    ${componentInfo
                        .versionDropdownList()
                        .map(function (item) {
                            return `<li><a href="${filterXSS(
                                item.url
                            )}" class='version-option'>${filterXSS(item.versionAlias === '' ? item.version : item.versionAlias)}</a></li>`
                        })
                        .join('')}
                    <li><a href="/versions${
                        isEn ? '/en' : ''
                    }" class='version-option'>${isEn ? 'More' : '更多'}</a></li>
                </ul></div> 
            </div></div>`
                )
            },
        }

        // 百度统计
        function createScriptBaidu() {
            // var _hmt = _hmt || [];
            ;(function () {
                var hm = document.createElement('script')
                hm.src =
                    'https://hm.baidu.com/hm.js?7c2afdec4c0d635d30ebb361804d0464'
                var s = document.getElementsByTagName('script')[0]
                s.parentNode.insertBefore(hm, s)
            })()
        }
        // jQuery中id含有特殊字符转义后使用
        function escapeJquery(srcString) {
            // 转义之后的结果
            var escapseResult = srcString
            // javascript正则表达式中的特殊字符
            var jsSpecialChars = [
                '\\',
                '^',
                '$',
                '*',
                '?',
                '.',
                '+',
                '(',
                ')',
                '[',
                ']',
                '|',
                '{',
                '}',
            ]
            // jquery中的特殊字符,不是正则表达式中的特殊字符
            var jquerySpecialChars = [
                '~',
                '`',
                '@',
                '#',
                '%',
                '&',
                '=',
                "'",
                '"',
                ':',
                ';',
                '<',
                '>',
                ',',
                '/',
            ]
            for (let i = 0; i < jsSpecialChars.length; i++) {
                escapseResult = escapseResult.replace(
                    new RegExp('\\' + jsSpecialChars[i], 'g'),
                    '\\' + jsSpecialChars[i]
                )
            }
            for (let i = 0; i < jquerySpecialChars.length; i++) {
                escapseResult = escapseResult.replace(
                    new RegExp(jquerySpecialChars[i], 'g'),
                    '\\' + jquerySpecialChars[i]
                )
            }
            return escapseResult
        }
        // 判断是否 Pad
        function isPad(cb) {
            let screen = document.documentElement.clientWidth
            if (screen < 1200) {
                cb()
            }
        }
        function filterXSS(val) {
            return $('<div>').text(val).html()
        }

        // 文档反馈链接
        const getQuestionHref = () => {
            let url = ''
            if (
                pathname.startsWith('/docs/') &&
                pathname.indexOf('/api_python/') > -1
            ) {
                url =
                    configIP.GITEE_URL +
                    '/mindspore/mindspore/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0'
            } else {
                url =
                    configIP.GITEE_URL +
                    '/mindspore/docs/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0'
            }
            return url
        }

        const docsFeedback = () => {
            const askQuestion = isEn ? 'Document Feedback' : '文档反馈',
                askQuestion1 = isEn ? 'Quick Feedback' : '快速反馈问题',
                askQuestionInfo = isEn
                    ? 'Click the blue button to commit an issue in the code repository. Describe the issue in the template. We will follow up on it.'
                    : '点击蓝色按钮，可跳转代码仓提issue，按照issue模板填写问题描述，我们将会跟进处理',
                askQuestionInfo1 = isEn
                    ? 'Remember to add the tag below:'
                    : '记得添加mindspore-assistant标签哦！'

            const feedbackDom = `<div class="docs-feedback">
      <div class="feedback-box ${isEn ? 'en' : ''}">
        <a href="${getQuestionHref()}" rel="noopener noreferrer" target="_blank" class="text askQuestion">${askQuestion}</a>
        <div class="feedback-layer">
          <p class="title"><i class="feedback-icon"></i>${askQuestion1}</p>
          <p class="desc">${askQuestionInfo}</p>
          <p class="desc m12">${askQuestionInfo1}</p>
          <p class="desc assistant">mindspore- assistant</p>
        </div>
      </div>
      <div class="go-top"><i class="icon-gotop"></i></div>
      </div>`

            body.prepend(feedbackDom)
            $('.docs-feedback .go-top').on('click', function () {
                $('.wy-nav-content-wrap').animate({ scrollTop: 0 }, 300)
            })
        }

        // 换肤
        function initTheme() {
            const themeStyle = localStorage.getItem('ms-theme')
            const themeIcon = $('.theme-change i')
            const documentElement = document.documentElement
            themeIcon.removeClass('dark light')

            if (!themeStyle) {
                localStorage.getItem('ms-theme', 'light')
                documentElement.removeAttribute('data-o-theme')
                themeIcon.addClass('light')
            } else {
                documentElement.setAttribute('data-o-theme', themeStyle)
                themeIcon.addClass(themeStyle)
            }
            isDark = themeStyle === 'dark'
            logoImg = isEn
                ? isDark
                    ? 'logo-en-dark.svg'
                    : 'logo-en-light.svg'
                : isDark
                ? 'logo-zh-dark.svg'
                : 'logo-zh-light.svg'

            $('.logo-img').attr('src', '/pic/' + logoImg)

            themeIcon.click(function () {
                let theme = 'light'
                if ($(this).hasClass('light')) {
                    theme = 'dark'
                    $(this).addClass('dark').removeClass('light')
                    documentElement.setAttribute('data-o-theme', theme)
                } else {
                    theme = 'light'
                    $(this).addClass('light').removeClass('dark')
                    documentElement.removeAttribute('data-o-theme')
                }
                localStorage.setItem('ms-theme', theme)
                isDark = theme === 'dark'
                logoImg = isEn
                    ? isDark
                        ? 'logo-en-dark.svg'
                        : 'logo-en-light.svg'
                    : isDark
                    ? 'logo-zh-dark.svg'
                    : 'logo-zh-light.svg'
                $('.logo-img').attr('src', '/pic/' + logoImg)
            })
        }

        const initPage = async function () {
            createScriptBaidu()

            watchWinResize()
            docsformatter()
            codeClipboard()

            //获取导航菜单json
            headerMenuData = await getHeaderData(`/header.json`)
            //获取文档导航菜单json
            docsMenuData = await getHeaderData(`/docs-menu.json`)
            msVersionData = await getHeaderData('/ms-version.json')
            // 公网ip配置
            configIP = await getHeaderData('/config.json')

            //组件信息
            componentVersionData = await getHeaderData(
                `${pagePath}/_static/js/version.json`
            )

            pageTitle = isEn
                ? componentVersionData.label.en || ''
                : componentVersionData.label.zh || ''
            if (componentVersionData.submenu) {
                pageSubMenu = isEn
                    ? componentVersionData.submenu.en || []
                    : componentVersionData.submenu.zh || []
            }

            componentVersionTitle = componentVersionData.versionAlias
                ? componentVersionData.versionAlias
                : componentVersionData.version

            pageTitle = filterXSS(pageTitle)
            componentVersionTitle = filterXSS(componentVersionTitle)

            $('.wy-breadcrumbs')
                .after(msFotter.rateHTML)
                .parent('div')
                .addClass('rst-content-top')
            $('.wy-breadcrumbs>li:first-of-type')[0].innerText =
                pageTitle + ' (' + curVersion(componentVersionTitle) + ')'

            body.prepend(msHeader.pcHeader)

            msHeader.headerMethods()

            $('.header-nav-info').append(componentInfo.sideVersionList())

            $('.wy-nav-content').append(msFotter.pcFootHTML)
            docsFeedback()
            msFotter.jumpForumStatistics()
            msFotter.documentEvaluationFn()

            //lite 配置
            if (
                pathname.startsWith('/lite/docs') &&
                pathname.indexOf('/use/downloads') > -1
            ) {
                $('.header-wapper-docs .bottom .header-nav-link a')
                    .removeClass('selected')
                    .eq(1)
                    .addClass('selected')
                $('.header-nav-info .version-select-wrap').hide()
            }

            // H5 显示
            isPad(() => {
                isPadShow()
            })
            initTheme()

            sideRightAnchor()
        }

        initPage()
    })()
})
