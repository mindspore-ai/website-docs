$(function () {
  // 每页显示数
  const curNum = 8;
  // 计算总数
  let all = $('.doc-article-list').children('div.doc-article-item').length;
  let list = [];
  const docArticleItem = $('.doc-article-item');
  const pathname = window.location.pathname;
  const isEn = pathname.includes('/en/');

  $('button.doc-btn').click(function () {
    const id_val = $(this).attr('id');
    docArticleItem.removeClass('OUO');

    if (id_val !== 'all') {
      if ($('#all').hasClass('doc-btn-color')) {
        $('#all').removeClass('doc-btn-color').find('img').remove();
        list.splice(list.indexOf('all_exist'), 1);
        docArticleItem.removeClass('all_exist');
      }
    } else {
      $('button.doc-btn-color').each(function () {
        let tag = $(this).attr('id');
        $('.' + tag).removeClass(tag + '_exist');
        list.splice(list.indexOf(tag + '_exist'), 1);
      });

      $('button.doc-btn-color')
        .removeClass('doc-btn-color')
        .find('img')
        .remove();
    }

    if ($(this).hasClass('doc-btn-color')) {
      $(this).removeClass('doc-btn-color').find('img').remove();
      $('.' + id_val).removeClass(id_val + '_exist');
      list.splice(list.indexOf(id_val + '_exist'), 1);
    } else {
      if (id_val == 'all') {
        $(this).addClass('doc-btn-color');
        $('.' + id_val).addClass(id_val + '_exist');
        list.push(id_val + '_exist');
      } else {
        $(this).addClass('doc-btn-color');

        $('.' + id_val).addClass(id_val + '_exist');
        list.push(id_val + '_exist');
      }
    }

    if (list.length > 0) {
      let options = {
        os: [],
        hardware: [],
        user: [],
        stage: [],
        language: [],
        all: [],
      };

      docArticleItem.addClass('hidden');
      var str = 'OUO';

      for (let item of list) {
        const match = item.match(/^(os|hardware|user|stage|language)/);
        if (match) {
          options[match[0]].push(item);
        } else {
          options.all.push(item);
        }
      }

      for (let key in options) {
        if (options[key].length > 0) {
          this[key + '_list'] = options[key];
        } else {
          this[key + '_list'] = 'empty';
        }
      }

      docArticleItem.each(function () {
        const classList = this.classList;
        const counts = {
          os: getCount(options.os, classList),
          hardware: getCount(options.hardware, classList),
          user: getCount(options.user, classList),
          stage: getCount(options.stage, classList),
          language: getCount(options.language, classList),
          all: getCount(options.all, classList),
        };
        const isValid =
          ((counts.os > 0 && counts.os <= options.os.length) ||
            counts.os === 'empty') &&
          ((counts.hardware > 0 &&
            counts.hardware <= options.hardware.length) ||
            counts.hardware === 'empty') &&
          ((counts.user > 0 && counts.user <= options.user.length) ||
            counts.user === 'empty') &&
          ((counts.stage > 0 && counts.stage <= options.stage.length) ||
            counts.stage === 'empty') &&
          ((counts.language > 0 &&
            counts.language <= options.language.length) ||
            counts.language === 'empty');

        if (isValid) {
          $(this).removeClass('hidden').addClass(str);
        }
      });

      function getCount(list, element) {
        if (list.length === 0) {
          return 'empty';
        }

        let count = 0;
        for (let i = 0; i < list.length; i++) {
          if (element.contains(list[i])) {
            count += 1;
          }
        }
        return count;
      }
    } else {
      docArticleItem.addClass('hidden');
    }

    const hiddenCount = $('.doc-article-list .doc-article-item.hidden').length;
    const visibleCount = all - hiddenCount;
    const len = Math.ceil(visibleCount / curNum);
    const pageNav = $('#pageNav');
    let iNum = 0;
    let pageList = '';

    const total = isEn ? 'Total ' : '共 ';
    const totalNum = isEn ? ' Result(s)' : ' 条';

    if (visibleCount > 0) {
      pageList += `<li class="disabled"><span>${
        total + visibleCount + totalNum
      }</span></li>`;
      pageList +=
        '<li class="pre"><a href="javascript:;" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
      for (let i = 0; i < len; i++) {
        pageList +=
          '<li class="doc-data"><a href="javascript:;">' +
          (i + 1) +
          '</a></li>';
      }
      pageList +=
        '<li class="nex"><a href="javascript:;" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
      // 首页加亮显示
      pageNav.empty().append(pageList).find('li').eq(2).addClass('active');
    } else {
      pageNav
        .empty()
        .append(
          '<li class="disabled"><span>共' + visibleCount + '条</span></li>'
        );
    }

    // 标签页的点击事件
    let articleItems = $('.doc-article-item[class*="' + str + '"]');
    pageNav.find('li.doc-data').click(function () {
      $(this).addClass('active').siblings('li').removeClass('active');
      iNum = $(this).index() - 2;
      $('li.pre').toggleClass('disabled', iNum <= 0);
      $('li.nex').toggleClass('disabled', iNum + 1 === len);
      articleItems.hide();
      for (let i = iNum * curNum; i < (iNum + 1) * curNum; i++) {
        $('div.doc-article-list').find(articleItems).eq(i).show();
      }
    });

    if (iNum == 0) {
      $('li.pre').addClass('disabled');
    }

    if (iNum + 1 == len) {
      $('li.nex').addClass('disabled');
    }

    $('li.pre').click(function () {
      navigatePage(-1);
    });

    $('li.nex').click(function () {
      navigatePage(1);
    });
    // 翻页
    function navigatePage(direction) {
      if (iNum + direction >= 0 && iNum + direction < len) {
        iNum += direction;
        $('li.pre').toggleClass('disabled', iNum === 0);
        $('li.nex').toggleClass('disabled', iNum + 1 === len);
        pageNav
          .find('li.doc-data')
          .eq(iNum)
          .addClass('active')
          .siblings('li')
          .removeClass('active');
        articleItems.hide();
        for (let i = iNum * curNum; i < (iNum + 1) * curNum; i++) {
          articleItems.eq(i).show();
        }
      }
    }

    articleItems.hide();
    $('div.doc-article-list').find(articleItems).slice(0, curNum).show();

    if ($('button.doc-btn-color').length == 0) {
      $('#all').trigger('click');
    }
  });

  $('#all').trigger('click');
});
