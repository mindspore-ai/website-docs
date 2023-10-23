$(function () {
  (function () {
    $('title').text('MindSpore');
    const pathname = window.location.pathname;
    const isEn = pathname.indexOf('/en/') !== -1;
    const lang = isEn ? '/en/' : '/zh-CN/';
    const enPath = isEn ? 'en' : '';
    const pathPrefix = pathname.split(lang);
    const currentVersion = pathPrefix[1].split('/')[0];
    const pagePath = pathPrefix[0] + lang + currentVersion;
    const body = $('body');
    let isDark = localStorage.getItem('ms-theme') === 'dark';

    // 公共方法
    const utils = {
      newNavPath: isEn
        ? pathname.replace('/en/', '/zh-CN/')
        : pathname.replace('/zh-CN/', '/en/'),
      getHeaderMenu: [],
      getAllComponentVersion: [],
      getVersionData: [],
      getSubMenuData: [],
      getPageTitle: '',
      componentVersionTitle: '',
      configIP: {},
      searchUrl: isEn ? '/search/en' : '/search',
      // 获取版本 不带r
      getVersion: (version = '') => {
        return version.startsWith('r') ? version.slice(1) : version;
      },
      // xss
      filterXSS: (val) => {
        return $('<div>').text(val).html();
      },
      // 数据请求事件
      getRequest: (url) => {
        return new Promise((resolve, reject) => {
          $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            success: (res) => {
              resolve(res);
            },
            error: (e) => {
              reject(e);
            },
          });
        }).catch((e) => {});
      },
      // 判断是否是移动端
      isPad: () => {
        let screen =
          document.documentElement.clientWidth || document.body.clientWidth;
        if (screen < 1200) {
          return true;
        }
        return false;
      },
      // 弹窗
      oDialog: (title) => {
        return `
          <div class="o-layer-dialog">
          <div class="o-dlg-main">
            <div class="o-dlg-header">${title}</div>
            <div class="o-scroller-container" id="dialog-content"></div>
          </div>
          </div>
        `;
      },
    };

    // header公共方法
    const appHeaderUtils = {
      // tag：['outlink','new','hot'....]
      ItemTags: (tags) => {
        return `${
          tags && tags.length > 0
            ? tags
                .map((item) => {
                  if (item.toLocaleLowerCase() === 'outlink') {
                    return `<em class="outlink"></em>`;
                  } else {
                    return `<span class="ms-tag ${item.toLocaleLowerCase()}">
                            <span class="ms-tag-label">
                            ${utils.filterXSS(item)}
                            </span>
                        </span>`;
                  }
                })
                .join('')
            : ''
        }`;
      },
      // 代码仓
      ItemCode: (className = '') => {
        const codeList = [
          {
            value: 'gitee',
            label: 'Gitee',
            href: `${utils.configIP.GITEE_URL}/mindspore/mindspore`,
          },
          {
            value: 'github',
            label: 'Github',
            href: `${utils.configIP.GITHUB_URL}/mindspore-ai/mindspore`,
          },
        ];
        return `
          ${codeList
            .map((item) => {
              return `<li class="${className}"><a href="${item.href}"  target="_blank" rel="noopener noreferrer">
                  ${item.label}
                  <em class="outlink"></em></a></li>`;
            })
            .join('')}
          `;
      },
      // 风格切换
      ItemTheme: () => {
        return `<div class="theme-change"><i class="icon-theme light"></i></div>`;
      },
      // 获取组件最新版本
      getLatestVersion: (path) => {
        let version = 'master';
        utils.getAllComponentVersion &&
          utils.getAllComponentVersion.forEach((item) => {
            if (path === item.name) {
              version =
                item.versions.length < 2
                  ? item.versions[0].version
                  : item.versions[1].version;
            } else if (path.startsWith(item.name) && item.eom !== 'true') {
              version =
                item.versions.length < 2
                  ? item.versions[0].version
                  : item.versions[1].version;
            }
          });
        return version;
      },
      // 获取组件版本链接
      getNavLinks: (path) => {
        let href = '';
        if (path === 'lite') {
          href = `/${path}${isEn ? '/en' : ''}`;
        } else if (path.startsWith('tutorials') || path === 'docs') {
          href = `/${path}${lang}${appHeaderUtils.getLatestVersion(
            path
          )}/index.html`;
        } else {
          href = `/${path}/docs${lang}${appHeaderUtils.getLatestVersion(
            path
          )}/index.html`;
        }
        return utils.filterXSS(href);
      },
      // 获取组件切换下拉列表
      getVersionSwitchList: () => {
        let list = [];
        const matchingItem = utils.getAllComponentVersion.find(
          (item) => pathname.startsWith(`/${item.name}/`) && item.eom !== 'true'
        );
        if (matchingItem) {
          list = matchingItem.versions.map((sub) => ({
            version: utils.getVersion(sub.version),
            href:
              sub.href !== ''
                ? sub.href
                : `${pagePath.replace(currentVersion, sub.version)}/index.html`,
            versionAlias: utils.getVersion(sub.versionAlias),
          }));
        }
        return list.slice(0, 4);
      },
    };

    // header 移动端方法
    const appHeaderMo = {
      ItemMenuMo: () => {
        return `
        <div class="header-menu-layer">
        <div class="menu-mask"></div>
        <div class="menu-content">
        <div class="menu-left">
          <ul class="menu-list">
          <li class="menu-item"><a href="/" >${isEn ? 'Home' : '首页'}</a></li>
          ${
            utils.getHeaderMenu &&
            utils.getHeaderMenu
              .map((item, index) => {
                const href = item.href
                  ? isEn
                    ? item.href.en
                    : item.href.zh
                  : 'javascript:;';
                const name = isEn ? item.label.en : item.label.zh;
                return `
              <li class="menu-item">
                <a href="${utils.filterXSS(
                  href
                )}" data-val='${index}' target="${
                  item.jumOut ? '_blank' : '_self'
                }">
                      ${utils.filterXSS(name)}
                      </a>
              </li> `;
              })
              .join('')
          }
          </ul>
          <div class="menu-tool">
            <div class="menu-item"><a href="javascript:;" data-val='7'>${
              isEn ? 'Code' : '代码'
            }</a></div>
            <div class="tool-item">
            <a href="${utils.filterXSS(
              utils.newNavPath
            )}" class="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <span class="languageIpt">EN</span>
                </a>
                ${appHeaderUtils.ItemTheme()}
            </div>
          </div>
        </div>
        <div class="menu-right">
            ${
              utils.getHeaderMenu &&
              utils.getHeaderMenu
                .map((item) => {
                  return `<ul class="sub-menu">
                      ${appHeader.ItemNav(item.children, 'sub-menu-item')}
                </ul>`;
                })
                .join('')
            }
            <ul class="sub-menu">
              ${appHeaderUtils.ItemCode('sub-menu-item')}
            </ul>
        </div>
        </div>
        </div>`;
      },
      // 移动端导航
      ItemContentMo: () => {
        return `<header id="header-h5" class="header-mobile">
        <div class="header-mobile-top">
        <div class="header-mobile-wrap">
        <div class="header-menu"> <em class="header-menu-icon"></em>
        ${appHeaderMo.ItemMenuMo()}
        </div>
        <span class="line"></span>
        <a href="/${enPath}"><img class="h5-logo" src="/pic/logo1.png" alt="logo" /></a>
        <p class="page-title">${utils.getPageTitle}</p></div>
        <em class="search-icon"></em>
        </div>
        </header>`;
      },
      // 移动端子菜单
      ItemNavMo: () => {
        return `<div id="nav-h5">
        <div class="header-mobile-menu ${
          utils.getSubMenuData.length > 0 ? 'current' : ''
        }">
          ${appHeader.ItemSubMenu()}
          </div>
          <div class="header-mobile-nav">
          <em class="page-menu"></em>
          </div>
          ${
            !pathname.startsWith('/tutorials')
              ? `<div class="docs-menu-icon h5"></div>`
              : ''
          }</div>
      `;
      },
      // 移动端交互
      ItemMethodsMo: () => {
        $('.search-icon').on('click', function () {
          window.location.href = utils.searchUrl;
        });
        // 移动端菜单点击事件
        $('.header-menu-icon').on('click', function () {
          appHeader.handleToggleMenu(false);
          if ($(this).hasClass('on')) {
            $('.header-menu-layer').hide();
            $(this).removeClass('on');
          } else {
            $('.header-menu-layer').show();
            $(this).addClass('on');
          }
          $('.menu-left').find('.menu-item').removeClass('on');
        });
        $('.menu-mask').on('click', function () {
          $('.header-menu-layer').hide();
          $('.header-menu-icon').removeClass('on');
        });
        $('.menu-item a').on('click', function () {
          const menuIndex = $(this).data('val');
          $(this).closest('.menu-left').find('.menu-item').removeClass('on');
          $(this).parent().addClass('on');
          $('.menu-right .sub-menu').hide().eq(menuIndex).show();
        });

        // 国际化
        $('#dropdownMenu_h5').on('click', function () {
          $('.dropdown-menu').slideToggle();
        });

        // 侧栏导航显示
        $('.page-menu').on('click', function () {
          const isFlag = $(this).hasClass('on');
          appHeader.handleToggleMenu(!isFlag);
        });

        $('.h5.docs-menu-icon').on('click', function () {
          const title = isEn ? 'Document Directory' : '文档目录';
          body.prepend(utils.oDialog(title));
          $('#mask').show();
          $('#dialog-content').append($('.header-nav-content').html());
        });

        $('.header-mobile-nav .versionText').on('click', function () {
          const title = isEn ? 'Select Version' : '选择版本';
          body.prepend(utils.oDialog(title));
          $('#mask').show();
          $('#dialog-content').append($(this).siblings('.version-box').html());
        });

        // mask点击关闭侧栏
        $('#mask').on('click', function () {
          appHeader.handleToggleMenu(false);
          $('.o-layer-dialog').remove();
          $(this).hide();
        });
      },
      init: () => {
        $('.wy-nav-content').append(
          '<div id="footer-mo"></div><div id="mask"></div>'
        );
        $('#footer').remove();
        $('.page-rating.pc').remove();
        body.prepend(appHeaderMo.ItemContentMo());
        $('.wy-nav-content-wrap').prepend(appHeaderMo.ItemNavMo());
        $('.header-mobile-nav').append(appHeader.ItemVersion());
        $('#footer-mo')
          .append(appFooter.ItemContent())
          .before(ratingMethods.ItemContent('mo'));
        ratingMethods.clickEvaluationMethods();
        appHeaderMo.ItemMethodsMo();
      },
    };

    //初始化header
    const appHeader = {
      ItemSubMenu: () => {
        return `${
          utils.getSubMenuData &&
          utils.getSubMenuData
            .map((item) => {
              if (
                item.url.startsWith(pagePath) &&
                !item.url.includes('use/downloads')
              ) {
                item.active = 1;
              }
              return `<div class="header-nav-link">
              <a class="${
                item.active ? 'selected' : ''
              }" href="${utils.filterXSS(item.url)}">${utils.filterXSS(
                item.label
              )}</a>
            </div>
            `;
            })
            .join('')
        }`;
      },
      ItemContent: () => {
        return `<header class="header page-load">
        <nav class="header-wapper header-wapper-top">
        <div class="header-nav" style="display: flex;">
        <a href="/${enPath}" class="logo " >
        <img class="logo-img" src="/pic/logo_black.png" alt="logo" />
        </a>
        ${
          utils.getHeaderMenu &&
          utils.getHeaderMenu
            .map((item) => {
              const href = item.href
                ? isEn
                  ? item.href.en
                  : item.href.zh
                : '';
              const name = isEn ? item.label.en : item.label.zh;
              if (!item.children) {
                if (pathname.indexOf(item.id) > -1 && item.id === 'docs') {
                  item.active = 1;
                }
                return `
                  <div class="header-nav-link"><a class="header-nav-link-line ${
                    item.active ? 'selected' : ''
                  }" href="${utils.filterXSS(href)}">${utils.filterXSS(
                  name
                )}</a></div>
                  `;
              } else {
                if (
                  pathname.startsWith('/tutorials/') &&
                  item.id === 'learning'
                ) {
                  item.active = 1;
                }
                let navLabel = '';
                if (href) {
                  navLabel = `<a class="header-nav-link-line ${
                    item.active ? 'selected' : ''
                  }" href="${utils.filterXSS(href)}" target="${
                    item.jumOut ? '_blank' : '_self'
                  }">${utils.filterXSS(name)}</a>`;
                } else {
                  navLabel = `<span class="header-nav-link-line ${
                    item.active ? 'selected' : ''
                  }">${utils.filterXSS(name)}</span>`;
                }

                return `
                  <div class="header-nav-link">
                          <div class="nav-content">${navLabel}
                          ${
                            item.label && item.label[isEn ? 'en' : 'zh']
                              ? `<ul class="dropdown-menu-git ${
                                  item.id === 'docs' ? 'dropdown-menu-docs' : ''
                                }" >
                                ${appHeader.ItemNav(item.children, '')}
                            </ul>`
                              : ''
                          }</div> ${appHeaderUtils.ItemTags(item.tags)}
                  </div>`;
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
        ${appHeaderUtils.ItemCode('')}
        </ul>
        </div>
        <div class="dropdown">
        <a href="${utils.filterXSS(
          utils.newNavPath
        )}" class="dropdown-toggle" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          <span class="languageIpt">EN</span>
        </a>
        </div>
        ${appHeaderUtils.ItemTheme()}
        </div>
        </nav>
        <div class="header-menu">
        <nav class="header-wapper  header-wapper-docs" >
        <div class="header-nav">
        <div class="header-nav-info">
        ${
          !pathname.startsWith('/tutorials')
            ? `<em class="docs-menu-icon"></em>`
            : ''
        }
        <h3>${utils.getPageTitle}</h3>
        </div>
        <div class="bottom">
        ${appHeader.ItemSubMenu()}
        </div>
        </div>
        </div></nav></div><div class="header-nav-layer">
        <div class="header-nav-content">
        ${
          !pathname.startsWith('/tutorials')
            ? utils.getDocsMenu &&
              utils.getDocsMenu
                .map((item) => {
                  return `<div class="docsNew-column">
                      <div class="docsNew-column-title">${
                        utils.filterXSS(isEn ? item.title.en : item.title.zh) ||
                        ''
                      }</div>
                  <div class="bottom">
                      ${item.children
                        .map((subitem) => {
                          return `
                            <a class="docs-column-link" href="${
                              subitem.href
                                ? subitem.href
                                : appHeaderUtils.getNavLinks(subitem.id)
                            }" ${
                            subitem.link
                              ? 'target="_blank" rel="noopener noreferrer"'
                              : ''
                          }>
                            ${utils.filterXSS(subitem.name)}
                            ${appHeaderUtils.ItemTags(subitem.tags)}
                          </a>`;
                        })
                        .join('')}
                  </div>
              </div>`;
                })
                .join('')
            : ''
        }
        </div></header>`;
      },
      // 导航子菜单
      ItemNav: (data, className) => {
        return data
          ? data
              .map((sub) => {
                if (sub.label && sub.label[isEn ? 'en' : 'zh']) {
                  let navHref = isEn ? sub.href.en : sub.href.zh;
                  if (sub.id === 'tutorials') {
                    navHref = navHref.replace(
                      'master',
                      appHeaderUtils.getLatestVersion(sub.id)
                    );
                  }
                  return `<li class="${className}"><a target="${
                    sub.jumOut ? '_blank' : '_self'
                  }" href="${utils.filterXSS(navHref)}">
                    ${utils.filterXSS(isEn ? sub.label.en : sub.label.zh)}
                    ${appHeaderUtils.ItemTags(sub.tags)}
                    </a></li>`;
                }
              })
              .join('')
          : '';
      },
      // 文档页面交互
      getHeaderMethods: () => {
        // 点击切换语言开始
        if (isEn) {
          $('.languageIpt').text('中');
          $('.logo').attr('href', '/en');
        } else {
          $('.languageIpt').text('EN');
        }
        // 点击关闭搜索框
        $('.close-icon').on('click', function () {
          $('.search-val').val('');
          $(this).hide();
        });
        // 获取搜索框的值并传递到搜索页面
        const searchInput = $('.search-input');
        $('.search-val')
          .focus(() => {
            searchInput.addClass('current');
          })
          .blur(() => {
            searchInput.removeClass('current');
          })
          .on('keydown', function (e) {
            const val = $(this).val();
            if (val !== '') {
              $('.close-icon').show();
            }
            if (e.keyCode === 13 && val !== '') {
              window.location.href =
                utils.searchUrl + '?inputValue=' + encodeURIComponent(val);
            }
          });

        // 文档菜单
        let timer = '';
        const headerLayer = $('.header-nav-layer');
        const docsMenuIcon = $('.docs-menu-icon');
        docsMenuIcon
          .mouseenter(() => {
            clearTimeout(timer);
            headerLayer.addClass('nav-show');
          })
          .mouseleave(() => {
            clearTimeout(timer);
            timer = setTimeout(() => {
              headerLayer.removeClass('nav-show');
            }, 300);
          });
        headerLayer
          .mouseenter(() => {
            clearTimeout(timer);
            headerLayer.addClass('nav-show');
          })
          .mouseleave(() => {
            headerLayer.removeClass('nav-show');
          });
        setTimeout(() => {
          $('.wy-nav-side').addClass('page-load');
        }, 50);
        setTimeout(() => {
          $('.header').addClass('page-load');
        }, 150);
      },
      // 组件切换列表
      ItemVersion: () => {
        return (
          appHeaderUtils.getVersionSwitchList().length > 0 &&
          `<div class='version-select-wrap '><div class="version-select-dom">
            <span class="versionText">
            ${utils.componentVersionTitle}
            <em class="icon-chevron-down"></em>
            </span>
              <div class="version-box"><ul class="version-list">
                    ${appHeaderUtils
                      .getVersionSwitchList()
                      .map((item) => {
                        return `<li><a href="${utils.filterXSS(
                          item.href
                        )}" class='version-option'>${utils.filterXSS(
                          item.versionAlias === ''
                            ? item.version
                            : item.versionAlias
                        )}</a></li>`;
                      })
                      .join('')}
                    <li><a href="/versions${
                      isEn ? '/en' : ''
                    }" class='version-option'>${isEn ? 'More' : '更多'}</a></li>
                </ul></div>
            </div></div>`
        );
      },
      // 导航切换
      handleToggleMenu: (show) => {
        const wyNavSide = $('.wy-nav-side');
        const mask = $('#mask');
        const pageMenu = $('.page-menu');
        if (show) {
          wyNavSide.css({ left: '0' }).show();
          mask.css('zIndex', '999');
          pageMenu.addClass('on');
          body.addClass('overflow');
          mask.show();
        } else {
          wyNavSide.css({ left: '-90%' }).show();
          pageMenu.removeClass('on');
          body.removeClass('overflow');
          mask.hide();
        }
      },
      // 初始化菜单
      init: () => {
        body.prepend(appHeader.ItemContent());
        appHeader.getHeaderMethods();
        $('.header-nav-info').append(appHeader.ItemVersion());
        docsMethods.init();
      },
    };

    // 初始化footer
    const appFooter = {
      beian: ['粤A2-20044005号', '粤公网安备 44030702002890号'],
      aboutTitle: isEn ? 'Follow us' : '关注我们',
      copyRight: isEn ? 'Copyright©MindSpore 2023' : '版权所有©MindSpore 2023',
      footLinks: [
        {
          name: isEn ? 'Security' : '安全',
          path: `/security${isEn ? '/en' : ''}`,
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
      // PC footer
      ItemContent: () => {
        return `
          <div id="footer">
          <div class="footer-bottom">
          <div class="copyright">
          <span class="copyRight">${appFooter.copyRight}</span>
          <a class="copynum" rel="noopener noreferrer" target="_blank" href="${
            utils.configIP.BEIAN_URL
          }">${appFooter.beian[0]}</a>
          <div>
          <a class="footer-record" rel="noopener noreferrer" target="_blank" href="${
            utils.configIP.BEIAN_URL
          }">
          <img class="copyImg2" src="/pic/copyright3.png" alt="img" />
          <span class="keepRecord">${appFooter.beian[1]} </span>
          </a>
          </div>
          </div>
          <div class="footer-menu">
          ${appFooter.footLinks
            .map((item) => {
              return `<a href="${item.path}">${item.name}</a>`;
            })
            .join('')}
          </div>
          </div>
        `;
      },
      // 初始化
      init: () => {
        $('.wy-nav-content').append(appFooter.ItemContent());
        ratingMethods.init();
      },
    };

    // 文档方法
    const docsMethods = {
      // 用一个宽度来记录之前的宽度，当之前的宽度和现在的宽度，从手机切换到电脑或者从电脑切换到手机，才执行下面部分函数
      watchWinResize: () => {
        let oldWidth = window.innerWidth;
        window.addEventListener('resize', () => {
          let width = window.innerWidth;
          let h5Head = document.getElementById('header-h5');
          let h5footer = document.getElementById('footer-mo');
          let pcfooter = document.getElementById('footer');
          let navh5 = document.getElementById('nav-h5');
          if (width < 1200) {
            $('#mask').css('display', 'none');
            $('.wy-nav-side').css({ left: '-90%', transition: '0s' });
            if (h5Head === null) {
              appHeaderMo.init();
            }
            $('.o-layer-dialog').remove();
          } else {
            $('.header').css('display', 'block');
            $('#mask').remove();
            $('.wy-nav-side').css('left', '0');

            if (h5Head || h5footer || navh5) {
              h5Head.remove();
              h5footer.remove();
              navh5.remove();
              $('.page-rating.mo').remove();
            }
            if ($('.page-rating.pc').length === 0) {
              ratingMethods.init();
            }

            if (pcfooter === null) {
              $('.wy-nav-content').append(appFooter.ItemContent());
            }
          }
          oldWidth = width;
        });
      },
      // 复制粘贴功能
      clickClipboard: () => {
        $('pre>span:first-of-type').append(
          '<em class="copy-btn" data-tooltip="copy"><i class="icon-copy"></i></em>'
        );

        $('.copy-btn').click(function () {
          let that = $(this);
          that.attr('data-tooltip', isEn ? 'Copy Success!' : '复制成功！');
          let domTemp = that.parent().parent()[0].cloneNode(true);
          domTemp.querySelectorAll('.go').forEach((item) => item.remove());
          let Url2 = domTemp.innerText.replace('Copy', '');
          Url2 = Url2.split(/[\n]/);
          // 只有python才需要去掉>>>和...
          const parentElement = that
            .closest('.highlight-cpp, .highlight-c++, .highlight-java')
            .get(0);

          if (parentElement) {
            Url2 = Url2.join('\n');
          } else {
            let flag = false;
            for (let i = 0; i < Url2.length; i++) {
              if (Url2[i].indexOf('>>>') > -1 || Url2[i].indexOf('...') == 0) {
                flag = true;
              } else {
                flag = false;
              }
              if (flag) {
                if (
                  Url2[i].indexOf('>>>') > -1 ||
                  Url2[i].indexOf('...') == 0
                ) {
                  Url2[i] = Url2[i].slice(4);
                } else {
                  Url2[i] = '';
                }
              }
            }
            Url2 = Url2.join('\n').replace(/>>> /g, '').replace(/>>>/g, '');
          }
          var oInput = document.createElement('textarea');
          oInput.value = Url2;
          document.body.appendChild(oInput);
          oInput.select(); // 选择对象
          document.execCommand('Copy'); // 执行浏览器复制命令
          oInput.class = 'oInput';
          oInput.style.display = 'none';
          setTimeout(() => {
            that.attr('data-tooltip', 'copy');
          }, 1000);
        });
      },
      //跳转论坛统计
      jumpDocsStatistics: () => {
        $('.askQuestion').on('click', () => {
          $.ajax({
            type: 'POST',
            url: '/api/saveEssayJump',
            contentType: 'application/json',
            data: JSON.stringify({
              essayUrl: encodeURIComponent(location.href),
            }),
          });
        });
      },
      // 文档反馈
      ItemFeedback: () => {
        let issueUrl =
          utils.configIP.GITEE_URL +
          '/mindspore/docs/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0';
        if (
          pathname.startsWith('/docs/') &&
          pathname.indexOf('/api_python/') > -1
        ) {
          issueUrl =
            utils.configIP.GITEE_URL +
            '/mindspore/mindspore/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0';
        }
        const askQuestion = isEn ? 'Document Feedback' : '文档反馈',
          askQuestion1 = isEn ? 'Quick Feedback' : '快速反馈问题',
          askQuestionInfo = isEn
            ? 'Click the blue button to commit an issue in the code repository. Describe the issue in the template. We will follow up on it.'
            : '点击蓝色按钮，可跳转代码仓提issue，按照issue模板填写问题描述，我们将会跟进处理',
          askQuestionInfo1 = isEn
            ? 'Remember to add the tag below:'
            : '记得添加mindspore-assistant标签哦！';

        const feedbackDom = `<div class="docs-feedback">
          <div class="feedback-box ${isEn ? 'en' : ''}">
          <a href="${issueUrl}" rel="noopener noreferrer" target="_blank" class="text askQuestion">${askQuestion}</a>
          <div class="feedback-layer">
            <p class="title"><i class="feedback-icon"></i>${askQuestion1}</p>
            <p class="desc">${askQuestionInfo}</p>
            <p class="desc m12">${askQuestionInfo1}</p>
            <p class="desc assistant">mindspore- assistant</p>
          </div>
          </div>
          <div class="go-top"><i class="icon-gotop"></i></div>
          </div>`;

        body.prepend(feedbackDom);
        $('.docs-feedback .go-top').on('click', () => {
          $('.wy-nav-content-wrap').animate({ scrollTop: 0 }, 300);
        });
      },
      init: () => {
        ratingMethods.clickEvaluationMethods();
        docsMethods.clickClipboard();
        docsMethods.watchWinResize();
        docsMethods.ItemFeedback();
        docsMethods.jumpDocsStatistics();
        docsAnchoMethods.init();

        // 解决公式显示问题
        let emList = $('p>em');
        if (emList && emList.length > 0) {
          for (let i = 0; i < emList.length; i++) {
            if (
              emList[i].parentNode &&
              emList[i].parentNode.innerHTML.indexOf('$') != -1
            ) {
              emList[i].parentNode.innerHTML = emList[i].parentNode.innerText;
            }
          }
        }

        // 说明样式调整
        if (pathname && pathname.indexOf('/design/introduction') != -1) {
          let blockquoteList = $('blockquote');
          blockquoteList.addClass('noteStyle');
        }

        // 左侧菜单控制
        (function menuInit() {
          const wyMenu = $('.wy-grid-for-nav .wy-menu');
          wyMenu
            .find('.caption')
            .append("<i class='icon-chevron-down'></i>")
            .next()
            .hide();

          if (wyMenu.find('.current').length) {
            $('.wy-grid-for-nav .wy-menu>.current')
              .show()
              .prev()
              .addClass('down');
          } else {
            wyMenu.find('.caption').eq(0).addClass('down').next().show();
          }
          wyMenu.find('.caption').click(() => {
            $(this).toggleClass('down').next().toggle(200);
          });

          // 左侧菜单少于4个 展开显示
          if (wyMenu.find('.caption').length < 5) {
            wyMenu.find('.caption').each((item) => {
              $(item).addClass('down').next().show();
            });
          }
        })();

        // 进入页面调整到锚点,解决中文锚点问题，中文锚点需要转码
        (function gotoId() {
          const url = utils.filterXSS(window.location.toString()); //进这个页面的url
          const id = window.decodeURIComponent(url.split('#')[1]); //中文id需要转码，英文id走catch error
          if (id && document.getElementById(id) !== null) {
            document.getElementById(id).scrollIntoView(true);
          }
        })();

        const resolveText = (text) => {
          return isEn ? `Search in ${text} ` : `"${text}" 内搜索`;
        };

        let strTemp = isEn ? 'Docs' : '文档';
        let docsHome = isEn
          ? `${utils.getPageTitle} Documentation`
          : `欢迎查看${utils.getPageTitle}文档`;

        if (pathname.startsWith('/tutorials')) {
          strTemp = isEn ? 'Tutorials' : '教程';
          docsHome = isEn
            ? `MindSpore ${utils.getPageTitle}`
            : `欢迎查看MindSpore${utils.getPageTitle}`;
        }
        $('#rtd-search-form input').attr(
          'placeholder',
          utils.filterXSS(resolveText(strTemp))
        );

        //返回组件index
        $('.wy-side-nav-search').after(
          `<div class="docs-home"><a href="${pagePath}/index.html" class="welcome">${docsHome}</a></div>`
        );

        //lite 配置
        if (
          pathname.startsWith('/lite/docs') &&
          pathname.indexOf('/use/downloads') > -1
        ) {
          $('.header-wapper-docs .bottom .header-nav-link a')
            .removeClass('selected')
            .eq(1)
            .addClass('selected');
          $('.header-nav-info .version-select-wrap').hide();
        }

        $('.wy-breadcrumbs').parent('div').addClass('rst-content-top');
        $('.wy-breadcrumbs>li:first-of-type')[0].innerText =
          utils.getPageTitle +
          ' (' +
          utils.componentVersionTitle +
          ')';
      },
    };

    // 评分模块
    const ratingMethods = {
      // 评分状态，避免重复提交
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
      },
      // 评分弹窗内容
      ItemDialogContent: () => {
        const helpForScores = [
          ratingMethods.fontmatter.helpfor1,
          ratingMethods.fontmatter.helpfor2,
          ratingMethods.fontmatter.helpfor3,
          ratingMethods.fontmatter.helpfor4,
          ratingMethods.fontmatter.helpfor5,
        ];
        return `<h3 class="evaluate-title">${
          ratingMethods.fontmatter.helpforyou
        } <i class="rating-close"></i></h3><ul class="evaluate-star">
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
            </ul>`;
      },
      // 评分
      ItemContent: (val = '') => {
        return `<div class="page-rating ${val}"><span class="rating-label"><i class="rating-icon"></i>${ratingMethods.fontmatter.rating}</span><div class="rating-layer"></div></div>`;
      },
      // 评分弹窗
      clickEvaluationMethods() {
        $('.rating-label').on('click', function () {
          const pageRating = $(this).closest('.page-rating');
          if (pageRating.hasClass('pc')) {
            const box = $(this).siblings('.rating-layer');
            if (box.hasClass('on')) return;
            box.addClass('on').append(ratingMethods.ItemDialogContent);
          } else {
            body.prepend(utils.oDialog(ratingMethods.fontmatter.helpforyou));
            $('#mask').show();
            $('#dialog-content').append(ratingMethods.ItemDialogContent);
          }
          ratingMethods.clickRatingMethods();
        });
      },
      // 评分事件
      clickRatingMethods() {
        $('.rating-layer .rating-close').on('click', () => {
          $('.rating-layer').removeClass('on').empty();
        });

        $('#mask').on('click', function () {
          $('.o-layer-dialog').remove();
          $(this).hide();
        });

        const star = $('div.star');
        star
          .on('mouseover', function () {
            const parentLi = $(this).parent('li');
            $(this).addClass('sel');
            parentLi.prevAll().children('.star').addClass('sel');
            parentLi.nextAll().children('.star').removeClass('sel');
          })
          .on('mouseout', function () {
            const parentLi = $(this).parent('li');
            $(this).removeClass('sel');
            parentLi.prevAll().children('.star').removeClass('sel');
          });

        $('.evaluate-star').on('click', '.star', function () {
          const parentLi = $(this).parent('li');
          $(this).addClass('sel');
          parentLi.prevAll().children('.star').addClass('sel');
          parentLi.nextAll().children('.star').removeClass('sel');
          star.unbind('mouseover');
          star.unbind('mouseout');
          let grade = parentLi.prevAll().length + 1;
          const isRatingMo = $('.page-rating').hasClass('mo');

          const ratingTips = (type) => {
            return `<div class="rating-tips ${type}"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M21 12c0 4.971-4.029 9-9 9s-9-4.029-9-9c0-4.971 4.029-9 9-9s9 4.029 9 9z"></path>
            <path fill="#fff" d="M12 13.621c-0.228 0-0.416-0.176-0.432-0.404l-0.367-5.441-0.002-0.054c0-0.408 0.306-0.745 0.701-0.795l0.1-0.006c0.027 0 0.027 0 0.054 0.002 0.441 0.030 0.775 0.412 0.745 0.853l-0.367 5.441c-0.015 0.227-0.204 0.404-0.432 0.404zM12 16.771c-0.608 0-1.1-0.492-1.1-1.1s0.492-1.1 1.1-1.1c0.608 0 1.1 0.492 1.1 1.1s-0.492 1.1-1.1 1.1z"></path>
            </svg>
            ${
              type === 'warning'
                ? ratingMethods.fontmatter.ratingWarning
                : ratingMethods.fontmatter.ratingSuccess
            }</div>`;
          };
          // 避免重复提交
          if (grade === ratingMethods.gradeState) {
            $('.evaluate-star').after(ratingTips('warning'));
            setTimeout(() => {
              $('.rating-tips').remove();
            }, 2000);
          } else {
            // 评分记录
            $.ajax({
              type: 'POST',
              contentType: 'application/json',
              data: JSON.stringify({
                score: grade,
                essayUrl: encodeURIComponent(location.href),
              }),
              url: '/api/saveEssayScore',
            });
            ratingMethods.gradeState = grade;
            if (isRatingMo) {
              $('.evaluate-star').after(ratingTips('success'));
            } else {
              $('.evaluate-star').hide().after(ratingTips('success'));
              $('.evaluate-title').hide();
            }
            setTimeout(() => {
              if (isRatingMo) {
                $('.o-layer-dialog').remove();
                $('#mask').hide();
              } else {
                $('.rating-layer').removeClass('on').empty();
              }
            }, 1000);
          }
        });
      },
      init: () => {
        $('.wy-breadcrumbs').after(ratingMethods.ItemContent('pc'));
        ratingMethods.clickEvaluationMethods();
      },
    };

    // 文档右侧锚点
    const docsAnchoMethods = {
      getNodeList: (
        node,
        isShow = false,
        isId = false,
        child = '',
        className = ''
      ) => {
        const name = utils.filterXSS(node.innerText);
        return `<li>
        <span class="line"></span>
        <a title="${name}" href="#${utils.filterXSS(
          isId ? node.closest('dt').id : node.parentNode.id
        )}">${name}</a>
        ${
          isShow
            ? `<ul class='${utils.filterXSS(className)}'>${
                child ? child : ''
              }</ul>`
            : ''
        }
      </li> `;
      },
      sideRightAnchor: () => {
        let sectionList = $('.document>div:first-of-type>section');
        let h1List = $('.document section>h1');
        let h2List = $('.document section>h2');
        let codeList = $(
          'dl>dt>.descname>.pre:not(.method .descname>.pre):not(.property .descname>.pre)'
        );
        if (sectionList[0] === undefined) {
          return;
        }
        let $ul =
          '<div class="navRight"><ul class="navList"><li class="navLi"><a href="#' +
          utils.filterXSS(sectionList[0].id) +
          '" class="navLiTitle">' +
          utils.filterXSS(h1List[0].innerText) +
          '</a><ul class="navList2"></ul></li></ul></div>';
        let navLi3 = '',
          navLi2 = '',
          navLi4 = '';
        $('.wy-nav-content-wrap').append($ul);
        if (h2List.length > 0) {
          for (let i = 0; i < h2List.length; i++) {
            // 正则去除括号、保留内容
            let id = h2List[i].parentNode.id
              .replace(/\(([^).']*)\)/g, '$1')
              .replace(/\“|\”|\'/g, '');
            let h3 = document.getElementById(id).querySelectorAll('h3');
            if (h3.length > 0) {
              navLi2 = '';
              navLi3 = '';
              for (let i = 0; i < h3.length; i++) {
                if (h3[i].parentNode.querySelectorAll('h4').length > 0) {
                  navLi4 = '';
                  let navLi4Array = h3[i].parentNode.querySelectorAll('h4');
                  for (let k = 0; k < navLi4Array.length; k++) {
                    navLi4 += docsAnchoMethods.getNodeList(navLi4Array[k]);
                  }
                  navLi3 += docsAnchoMethods.getNodeList(
                    h3[i],
                    true,
                    false,
                    navLi4,
                    'navList4'
                  );
                } else {
                  navLi3 += docsAnchoMethods.getNodeList(h3[i]);
                }
              }
              navLi2 = docsAnchoMethods.getNodeList(
                h2List[i],
                true,
                false,
                '',
                'navList3'
              );
            } else {
              navLi3 = '';
              navLi2 = '';
              if (
                h2List[i].parentNode.querySelectorAll(
                  '.class>dt .descname>.pre,.function>dt .descname>.pre'
                ).length > 0
              ) {
                let navLi3Array = h2List[i].parentNode.querySelectorAll(
                  '.class>dt .descname>.pre,.function>dt .descname>.pre'
                );

                for (let j = 0; j < navLi3Array.length; j++) {
                  if (
                    navLi3Array[j].parentNode.parentNode.querySelectorAll(
                      'dd .pre'
                    ).length > 0
                  ) {
                    navLi4 = '';
                    let navLi4Array =
                      navLi3Array[j].parentNode.parentNode.querySelectorAll(
                        'dd .descname>.pre'
                      );
                    for (let k = 0; k < navLi4Array.length; k++) {
                      navLi4 += docsAnchoMethods.getNodeList(
                        navLi4Array[k],
                        false,
                        true
                      );
                    }
                    navLi3 += docsAnchoMethods.getNodeList(
                      navLi3Array[j],
                      true,
                      true,
                      navLi4,
                      'navList4'
                    );
                  } else {
                    navLi3 += docsAnchoMethods.getNodeList(
                      navLi3Array[j],
                      true,
                      true,
                      '',
                      'navList4'
                    );
                  }
                }
                navLi2 = docsAnchoMethods.getNodeList(
                  h2List[i],
                  true,
                  false,
                  '',
                  'navList3'
                );
              } else {
                navLi2 = docsAnchoMethods.getNodeList(h2List[i]);
              }
            }

            $('.navList2').append(navLi2);
            $('.navList2>li:nth-of-type(' + (i + 1) + ') .navList3').append(
              navLi3
            );
          }
        } else {
          codeList.each(function () {
            let codeText = $(this).text();
            let parentID = $(this).closest('dt').attr('id');
            codeText = utils.filterXSS(codeText);
            parentID = utils.filterXSS(parentID);
            const codeLi2 = `
              <li>
              <a title="${codeText}" href="#${parentID}">${codeText}</a>
              <ul class="navList3"></ul>
              </li>`;
            $('.navList2').append(codeLi2);
            const nextDescnames = $(this)
              .closest('dt')
              .next()
              .find('.descname>.pre');
            if (nextDescnames.length) {
              const navLi3 = nextDescnames
                .map(function () {
                  const descnameText = $(this).text();
                  const descnameParentID = $(this).closest('dt').attr('id');
                  return `<li><a href="#${descnameParentID}" title="${descnameText}">${descnameText}</a></li>`;
                })
                .get()
                .join('');
              $('.navList2 .navList3').last().append(navLi3);
            }
          });
        }
      },
      // 滚动定位
      navRightScroll: () => {
        let scrollable = $('.wy-nav-content-wrap').scrollTop();
        if (scrollable > 90) {
          $('.navRightWraper').addClass('fixed');
        } else {
          $('.navRightWraper').removeClass('fixed');
        }
      },
      init: () => {
        docsAnchoMethods.sideRightAnchor();
        // 点击右侧导航选中
        const navListLink = $('.navList a');
        navListLink.on('click', function () {
          navListLink.closest('li').removeClass('selected');
          $(this).closest('li').addClass('selected');
        });
        const navContentAnchor = () => {
          for (let i = 0; i < navListLink.length; i++) {
            let anchorId = navListLink.eq(i).attr('href').substring(1);
            let newAnchorId = anchorId.replace(
              /[-\/\\^$*+?.()|[\]{}]/g,
              '\\$&'
            );
            if (!newAnchorId) return;
            if ($('#' + newAnchorId).offset().top - 140 < 116) {
              navListLink.closest('li').removeClass('selected');
              navListLink.eq(i).closest('li').addClass('selected');
            }
          }
          return false;
        };
        navContentAnchor();
        $('.navRight').wrap('<div class="navRightWraper"></div>');
        $('.wy-nav-content-wrap').scroll(navContentAnchor);
        $('.wy-nav-content-wrap').scroll(docsAnchoMethods.navRightScroll);
      },
    };

    // 百度统计
    const getBaiduSensor = () => {
      (function () {
        var hm = document.createElement('script');
        hm.src = 'https://hm.baidu.com/hm.js?7c2afdec4c0d635d30ebb361804d0464';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(hm, s);
      })();
    };

    // 埋点JS
    const createScriptSensor = () => {
      var oHead = document.getElementsByTagName('HEAD').item(0);
      let sensors_origin = location.origin;
      let jsScript2 = document.createElement('script');
      let jsScript3 = document.createElement('script');
      jsScript2.src = sensors_origin + '/allow_sensor/sensorsdata.min.js';
      jsScript3.src = sensors_origin + '/allow_sensor/sensors.js';
      oHead.appendChild(jsScript2);
      setTimeout(() => {
        oHead.appendChild(jsScript3);
      });
    };

    // 文档搜索埋点记录
    const sensorsMethods = {
      getSearchKey: () => {
        var params = $.getQueryParameters();
        if (params.q) {
          sensorsMethods.startSensor(params.q[0], 20);
        }
      },
      startSensor: (search_key, num) => {
        if (!num) {
          return;
        }
        if (window['sensorsCustomBuriedData']) {
          sensorsMethods.searchBuriedData(search_key);
        } else {
          num--;
          setTimeout(() => {
            // 若是一开始没有值，则重试
            sensorsMethods.startSensor(search_key, num);
          }, 500);
        }
      },
      searchBuriedData: (search_key) => {
        if (window['sensorsCustomBuriedData']) {
          const search_event_id = `${search_key}${new Date().getTime()}${
            window['sensorsCustomBuriedData'].ip || ''
          }`;
          const obj = {
            search_key,
            search_event_id,
          };
          window['addSearchBuriedData'] = obj;
          let sensors = window['sensorsDataAnalytic201505'];
          if (sensors) {
            sensors.setProfile({
              profileType: 'searchValue',
              ...(window['sensorsCustomBuriedData'] || {}),
              ...(window['addSearchBuriedData'] || {}),
            });
          }
        }
      },
    };

    // 换肤
    const initTheme = () => {
      const themeStyle = localStorage.getItem('ms-theme');
      const themeIcon = $('.theme-change i');
      const documentElement = document.documentElement;
      themeIcon.removeClass('dark light');

      if (!themeStyle) {
        localStorage.getItem('ms-theme', 'light');
        documentElement.removeAttribute('data-o-theme');
        themeIcon.addClass('light');
      } else {
        documentElement.setAttribute('data-o-theme', themeStyle);
        themeIcon.addClass(themeStyle);
      }
      isDark = themeStyle === 'dark';
      logoImg = isEn
        ? isDark
          ? 'logo-en-dark.svg'
          : 'logo-en-light.svg'
        : isDark
        ? 'logo-zh-dark.svg'
        : 'logo-zh-light.svg';

      $('.logo-img').attr('src', '/pic/' + logoImg);

      themeIcon.click(function () {
        let theme = 'light';
        if ($(this).hasClass('light')) {
          theme = 'dark';
          $(this).addClass('dark').removeClass('light');
          documentElement.setAttribute('data-o-theme', theme);
        } else {
          theme = 'light';
          $(this).addClass('light').removeClass('dark');
          documentElement.removeAttribute('data-o-theme');
        }
        localStorage.setItem('ms-theme', theme);
        isDark = theme === 'dark';
        logoImg = isEn
          ? isDark
            ? 'logo-en-dark.svg'
            : 'logo-en-light.svg'
          : isDark
          ? 'logo-zh-dark.svg'
          : 'logo-zh-light.svg';
        $('.logo-img').attr('src', '/pic/' + logoImg);
      });
    };

    const initPage = async () => {
      createScriptSensor();
      getBaiduSensor();

      //获取导航菜单json
      utils.getHeaderMenu = await utils.getRequest(`/header.json`);
      //获取文档导航菜单json
      utils.getDocsMenu = await utils.getRequest(`/docs-menu.json`);
      utils.getAllComponentVersion = await utils.getRequest('/ms-version.json');
      // 公网ip配置
      utils.configIP = await utils.getRequest('/config.json');

      //页面信息
      utils.getVersionData = await utils.getRequest(
        `${pagePath}/_static/js/version.json`
      );

      const pageTitle = isEn
        ? utils.getVersionData.label.en
        : utils.getVersionData.label.zh;
      utils.getPageTitle = utils.filterXSS(pageTitle);

      // 子菜单
      if (utils.getVersionData.submenu) {
        utils.getSubMenuData = isEn
          ? utils.getVersionData.submenu.en
          : utils.getVersionData.submenu.zh;
      }

      // 页面组件版本
      const componentVersionTitle = utils.getVersionData.versionAlias
        ? utils.getVersionData.versionAlias
        : utils.getVersionData.version;
        utils.componentVersionTitle = utils.filterXSS(utils.getVersion(componentVersionTitle));

      appHeader.init();
      appFooter.init();

      if (utils.isPad()) {
        appHeaderMo.init();
      }

      initTheme();
      sensorsMethods.getSearchKey();
    };
    initPage();
  })();
});
