$(function () {
  (function () {
    const body = $('body');
    const pathname = window.location.pathname;
    const isEn = pathname.includes('/en/');
    const lang = isEn ? 'en' : 'zh';
    let currentVersion = '';
    let componentName = pathname.split('/')[1];

    let isPR = true;
    let repositoryHref = '';
    let ideHref = '';

    // data
    let postData = {
      bugDocFragment: '',
      existProblem: [],
      problemDetail: '',
      comprehensiveSatisfication: 0,
      email: '',
      link: window.location.href,
    };

    const locale = {
      title: isEn ? 'Document feedback' : '文档反馈',
      participantion: isEn ? 'Click to submit bugs' : '点击参与文档捉虫',
      bugInput: [
        isEn ? 'Question document fragment' : '问题文档片段',
        isEn
          ? 'Click to input the question document fragment'
          : '点击输入问题文档片段',
      ],
      reason: isEn ? 'Problem description' : '问题描述',
      submitType: isEn ? 'Submission type' : '提交类型',
      questionType: isEn ? 'Problem type' : '问题类型',
      questionTypeList: [
        {
          name: isEn ? 'Specifications and Common Mistakes' : '规范和低错类',
          children: [
            isEn ? 'Specifications and Common Mistakes:' : '规范和低错类:',
            isEn
              ? 'Misspellings or punctuation mistakes;'
              : '错别字或拼写错误；标点符号使用错误；',
            isEn
              ? 'Incorrect links, empty cells, or wrong formats;'
              : '链接错误、空单元格、格式错误；',
            isEn
              ? 'Chinese characters in English context;'
              : '英文中包含中文字符；',
            isEn
              ? 'Minor inconsistencies between the UI and descriptions;'
              : '界面和描述不一致，但不影响操作；',
            isEn
              ? 'Low writing fluency that does not affect understanding;'
              : '表述不通顺，但不影响理解；',
            isEn
              ? 'Incorrect version numbers, including software package names and version numbers on the UI.'
              : '版本号不匹配：如软件包名称、界面版本号；',
          ],
        },
        {
          name: isEn ? 'Usability' : '易用性',

          children: [
            isEn ? 'Usability:' : '易用性:',
            isEn
              ? 'Incorrect or missing key steps;'
              : '关键步骤错误或缺失，无法指导用户完成任务；',
            isEn
              ? 'Missing prerequisites or precautions;'
              : '缺少必要的前提条件、注意事项等；',
            isEn
              ? 'Ambiguous figures, tables, or texts;'
              : '图形、表格、文字等晦涩难懂；',
            isEn
              ? 'Unclear logic, such as missing classifications, items, and steps.'
              : '逻辑不清晰，该分类、分项、分步骤的没有给出；',
          ],
        },
        {
          name: isEn ? 'Correctness' : '正确性',
          children: [
            isEn ? 'Correctness:' : '正确性:',
            isEn
              ? 'Technical principles, function descriptions, or specifications inconsistent with those of the software;'
              : '技术原理、功能、规格等描述和软件不一致，存在错误；',
            isEn
              ? 'Incorrect schematic or architecture diagrams;'
              : '原理图、架构图等存在错误；',
            isEn
              ? 'Incorrect commands or command parameters;'
              : '命令、命令参数等错误；',
            isEn ? 'Incorrect code;' : '代码片段错误；',
            isEn
              ? 'Commands inconsistent with the functions;'
              : '命令无法完成对应功能；',
            isEn ? 'Wrong screenshots.' : '界面错误，无法指导操作；',
          ],
        },
        {
          name: isEn ? 'Risk Warnings' : '风险提示',
          children: [
            isEn ? 'Risk Warnings:' : '风险提示:',
            isEn
              ? 'Lack of risk warnings for operations that may damage the system or important data.'
              : '对重要数据或系统存在风险的操作，缺少安全提示；',
          ],
        },
        {
          name: isEn ? 'Content Compliance' : '内容合规',
          children: [
            isEn ? 'Content Compliance:' : '内容合规:',
            isEn
              ? 'Contents that may violate applicable laws and regulations or geo-cultural context-sensitive words and expressions;'
              : '违反法律法规，涉及政治、领土主权等敏感词；',
            isEn ? 'Copyright infringement.' : '内容侵权；',
          ],
        },
      ],
      problemDesc: [
        isEn ? 'Problem description' : '问题描述',
        isEn
          ? 'Describe the bug so that we can quickly locate the problem.'
          : '点击输入详细问题描述，以帮助我们快速定位问题。',
      ],
      emailInput: [
        isEn
          ? 'We may contact you through email in regard to the bug fixing solution. You will also be notified through email if you win any prize during the activity.'
          : '我们可能针对您提出的问题，向您发送邮件反馈改进方案。如有获奖信息，我们也会通过此方式通知您。',
        isEn ? 'Email' : '邮箱',
        isEn ? 'Your email address' : '点击输入您的邮箱',
      ],
      satisfaction: [
        isEn
          ? 'How satisfied are you with this document'
          : '您对文档的总体满意度',
        isEn ? 'Not satisfied at all' : '不满意',
        isEn ? 'Very satisfied' : '非常满意',
      ],
      satisfactionTips: isEn
        ? 'Please rate your overall satisfaction with this document'
        : '请填写您对本文档的总体满意度',
      privacyText: [
        isEn
          ? 'By submitting the contents, you fully understand and agree to the terms of the MindSpore '
          : '您理解并同意，您填写和提交的内容，即视为您已充分阅读并同意MindSpore的',
        isEn ? 'Privacy Statement.' : '《隐私政策声明》',
      ],
      privacyLink: isEn ? '/privacy/en' : '/privacy',
      submit: isEn ? 'Submit' : '提交',
    };
    // 滑动条
    const getSilderContent = () => {
      return `<div class="ms-slider" data-tips="0" style="--percent: 0;">
          <input type="range" id="sliderInput" value="0" min="0" max="10" step="1"  />
          <div class="slider-bar"><div class='runway'><div class="trigger"></div></div></div>
        </div>`;
    };
    // 过滤列表
    const getFilterList = (data, num) => {
      return `${data
        .map((item, index) => {
          return `
        <div class="doc-filter-btn ${
          index === num ? 'active-submit' : ''
        }" attr_type="${item.name}">
          <span>${item.name}</span>
        </div>
        `;
        })
        .join('')}
      `;
    };

    const getEvaluateContent = () => {
      const {
        bugInput,
        submitType,
        submitTypeList,
        questionType,
        questionTypeList,
        problemDesc,
        emailInput,
        satisfaction,
        privacyText,
        privacyLink,
        submit,
        satisfactionTips,
        title,
      } = locale;
      return `<div class="evaluate-dialog"><div id="evaluate-mark"></div><div class="evaluate-alert ${lang}">
            <div class="evaluate-head">
              <h3>${title}</h3>
              <em class="evaluate-close"></em>
            </div>
          <div class="docs-evaluate">
            <div class="evaluate-item">
              <span class="label">${bugInput[0]}</span>
              <div class="box">
                <textarea class="txa code-snippet" placeholder="${
                  bugInput[1]
                }" maxlength="500"></textarea>
              </div>
            </div>
            <div class="evaluate-item">
              <span class="label">${submitType}</span>
              <div class="box evaluate-type">
                  <div class="doc-filter-btn ${
                    isPR ? '' : 'active-submit'
                  }" attr_type="issue">
                    <span>issue</span>
                  </div>
                  ${
                    isPR
                      ? '<div class="doc-filter-btn active-submit" attr_type="PR"><span>PR</span></div>'
                      : ''
                  }
              </div>
            </div>
            <div class="evaluate-item">
              <span class="label">${questionType}</span>
              <div class="box question-type">
                  ${getFilterList(questionTypeList, -1)}
              </div>
            </div>
            <div class="evaluate-item">
              <span class="label">${problemDesc[0]}</span>
              <div class="box">
                <textarea class="txa problem-txa" placeholder="${
                  problemDesc[1]
                }" maxlength="500"></textarea>
              </div>
            </div>
            <p class="email-tips">${emailInput[0]}</p>
            <div class="evaluate-item">
              <span class="label">${emailInput[1]}</span>
              <div class="box">
                <input type="text" class="email-input" placeholder="${
                  emailInput[2]
                }"  />
                <span class="error-tips"></span>
              </div>
            </div>
            <div class="satisfaction">
              <span class="label">${satisfaction[0]}</span>
              <span class="satisfaction-tips">${satisfactionTips}</span>
              <div class="satisfaction-box">
                <span class="txt">0-${satisfaction[1]}</span>
                ${getSilderContent()}
                <span class="txt">10-${satisfaction[2]}</span>
              </div>
            </div>
            <div class="privacy-box">
            <div class="checkbox-item">
              <input type="radio" id="privacy" name="privacy">
              <label class="privacy-label" for="privacy">${
                privacyText[0]
              }<a href="${privacyLink}" target="_blank" rel="noopener noreferrer">${
        privacyText[1]
      }</a></label>
            </div>
            </div>
            <button class="evaluate-submit">${submit}</button>
          </div> </div></div>`;
    };

    // issue模板
    const issueTemplate = (data) => {
      let Problem = '';
      data.existProblem.length == 0
        ? ''
        : (Problem = `- ${data.existProblem.join('、')}`);
      return `1. 【文档链接】
    
    > ${data.link}
    
2. 【"有虫"文档片段】
    
    > ${data.bugDocFragment.replace(/(\r\n|\r|\n)+/g, '$1')}
    
3. 【存在的问题】
    
    ${Problem}
    > ${data.problemDetail.replace(/(\r\n|\r|\n)+/g, '$1')}
    
4. 【预期结果】
    - 请填写预期结果`;
    };

    const utils = () => {
      let problemTxa = $('.problem-txa'),
        codeSnippet = $('.code-snippet'),
        satisfactionTips = $('.satisfaction-tips'),
        emailInput = $('.email-input');

      // 问题文档片段
      codeSnippet.on('input propertychange', function () {
        $(this).removeClass('error');
        let _val = $(this).val();
        if (_val.length > 500) {
          $(this).val(_val.substring(0, 500));
        }
        postData.bugDocFragment = $(this).val();
      });

      // 切换同意隐私政策
      $('#privacy').click(function () {
        let $radio = $(this);
        if ($radio.data('checked')) {
          $radio.prop('checked', false);
          $radio.data('checked', false);
        } else {
          $radio.prop('checked', true);
          $radio.data('checked', true);
        }
      });

      // 类型选中
      $('.evaluate-type .doc-filter-btn').on('click', function () {
        $(this)
          .addClass('active-submit')
          .siblings('.doc-filter-btn')
          .removeClass('active-submit');
      });

      // 问题描述
      problemTxa.on('input propertychange', function () {
        $(this).removeClass('error');
        let _val = $(this).val();
        if (_val.length > 500) {
          $(this).val(_val.substring(0, 500));
        }
        postData.problemDetail = $(this).val();
      });

      // 问题描述
      emailInput.on('input propertychange', function () {
        $(this).removeClass('error').siblings('.error-tips').text('').hide();
      });

      // 问题类型选择
      $('.question-type .doc-filter-btn').on('click', function () {
        problemTxa.removeClass('error');
        if ($(this).hasClass('active-submit')) {
          $(this).removeClass('active-submit');
          problemTxa.val('');
        } else {
          $(this)
            .addClass('active-submit')
            .siblings()
            .removeClass('active-submit');
          const index = $(this).index();
          const questionValue =
            locale.questionTypeList[index].children.join('\n');
          if (questionValue.trim().length > 500) {
            problemTxa.val(questionValue.trim().substring(0, 500));
          } else if (questionValue.length === 0) {
            problemTxa.val('');
          } else {
            problemTxa.val(`${questionValue.trim()}\n`);
          }
          postData.problemDetail = questionValue;
          postData.existProblem = [];
          postData.existProblem.push($(this).attr('attr_type'));
        }
      });

      //满意度
      const sliderNode = document.getElementById('sliderInput');
      const sliderBar = document.querySelector('.ms-slider');
      const min = 1;
      const max = 10;
      sliderNode.addEventListener('input', function () {
        let v = (this.value - min) / (max - min);
        sliderBar.style.setProperty('--percent', v);
        sliderBar.setAttribute('data-tips', this.value);
        postData.comprehensiveSatisfication = this.value;
        satisfactionTips.removeClass('show');
      });

      // 提交事件
      $('.evaluate-submit').on('click', function () {
        const regR = /[\r\n]+/g;
        let reg = new RegExp(
          '^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$'
        );
        let email = emailInput.val().trim();
        let problemTxaValue = problemTxa.val().trim();
        let submitType = $('.evaluate-type .active-submit').attr('attr_type');
        let privacy = $(".checkbox-item input[type='radio']:checked");
        let sliderInput = $('#sliderInput').val().trim();
        let tipText = '';
        postData.email = email;

        // 获取要提交的文件的路径
        const urlArr = location.href.split('/');
        const title = urlArr[urlArr.length - 1].replace('.html', '');

        if (!postData.bugDocFragment) {
          tipText = !isEn ? '请输入“有虫”片段' : 'Enter the buggy content';
          codeSnippet.focus().addClass('error').val(tipText).select();
        } else if (!problemTxaValue || !submitType) {
          tipText = !isEn
            ? '请选择提交类型并输入问题描述'
            : 'Choose a submission type and describe the bug';
          problemTxa.focus().addClass('error').val(tipText).select();
        } else if (!email) {
          tipText = !isEn ? '请输入您的邮箱' : 'Enter your email';
          emailInput.focus().addClass('error').val(tipText).select();
        } else if (!reg.test(email)) {
          tipText = !isEn ? '请输入正确的邮箱' : 'Enter a valid email';
          emailInput
            .focus()
            .addClass('error')
            .select()
            .siblings('.error-tips')
            .show()
            .text(tipText);
        } else if (sliderInput === '0') {
          tipText = !isEn
            ? '请选择满意度'
            : 'Rate your satisfaction with this document';
          satisfactionTips.addClass('show');
        } else if (privacy.length === 0) {
          tipText = !isEn ? '请勾选同意隐私声明' : 'Agree to Privacy Statement';
          $('.checkbox-item').addClass('shake1');
          setTimeout(function () {
            $('.checkbox-item').removeClass('shake1');
          }, 1000);
        } else {
          function openUrl(url = '#') {
            let tempALink = document.createElement('a');
            tempALink.setAttribute('target', '_blank');
            tempALink.setAttribute('id', 'openWin');
            tempALink.setAttribute('href', url);
            document.body.appendChild(tempALink);
            document.getElementById('openWin').click();
            document.body.removeChild(tempALink);
          }

          const first = codeSnippet.val().split(regR)[0];
          componentName =
            componentName === 'docs' ? 'mindspore' : componentName;

          if (submitType === 'issue') {
            let desc = encodeURIComponent(issueTemplate(postData));
            openUrl(
              `https://gitee.com/mindspore/docs/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0&title=有奖捉虫-${componentName}&description=${desc}`
            );
          } else {
            openUrl(
              `${ideHref}?search=${first}&title=文档捉虫-${componentName} ${currentVersion}-${title}&description=${problemTxaValue}&message=${problemTxaValue}&label_names=文档捉虫`
            );
          }

          $.ajax({
            type: 'POST',
            url: `https://dsapi.osinfra.cn/query/add/bugquestionnaire?community=mindspore&lang=${lang}`,
            data: JSON.stringify(postData),
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (data) {
              postData.link = window.location.href;
              try {
                if (JSON.parse(data).code === 200) {
                  if (submitType === 'issue') {
                    let desc = encodeURIComponent(issueTemplate(postData));
                    openUrl(
                      `https://gitee.com/mindspore/docs/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0&title=有奖捉虫-${componentName}&description=${desc}`
                    );
                  } else {
                    openUrl(
                      `${ideHref}?search=${first}&title=文档捉虫-${componentName} ${currentVersion}-${title}&description=${problemTxaValue}&message=${problemTxaValue}&label_names=文档捉虫`
                    );
                  }
                }
              } catch (error) {}
              $('#title-evaluate').css('z-index', '1003');
              $('#title-evaluate img').css('display', 'none');
            },
            error: function (err) {},
          });
          $('.evaluate-dialog').removeClass('show');
        }
      });

      $('.evaluate-close,#evaluate-mark').click(function () {
        $('.evaluate-dialog').removeClass('show');
      });
    };

    // 选中文字出现捉虫图标
    (function () {
      // 插入捉虫图标
      const feedbackDom = `<div class="feedback"><img class="bug-icon" src="/pic/bug.svg" title="${locale.participantion}" alt="">
      <img class="bug-icon-dark" src="/pic/bug-dark.svg" title="${locale.participantion}" alt=""></div>`;
      body.prepend(feedbackDom);

      function selectText() {
        if (document.selection) {
          return document.selection.createRange().text;
        } else {
          return window.getSelection().toString();
        }
      }
      let content = document.querySelector('.rst-content .document');
      let feedback = document.querySelector('.feedback');
      if (content && feedback) {
        content.onmouseup = function (event) {
          let ev = event || window.event;
          let left = ev.clientX;
          let top = ev.clientY + 30;
          let select = selectText().trim();
          setTimeout(function () {
            if (
              select.length > 0 &&
              window.getSelection() &&
              window.getSelection().type === 'Range'
            ) {
              feedback.style.display = 'block';
              feedback.style.left = left + 'px';
              feedback.style.top = top + 'px';
            } else {
              feedback.style.display = 'none';
            }
          }, 100);
        };
        content.onclick = function (ev) {
          var ev = ev || window.event;
          ev.cancelBubble = true;
        };
        document.onclick = function () {
          feedback.style.display = 'none';
        };
        feedback.onclick = function (e) {
          e.stopPropagation();
          let value =
            selectText().trim().length > 500
              ? selectText().trim().substring(0, 500)
              : selectText().trim();
          $('.code-snippet').val(value);
          postData.bugDocFragment = value;
          const evaluateDialog = $('.evaluate-dialog');
          if (evaluateDialog.hasClass('show')) {
            evaluateDialog.removeClass('show');
            $('#evaluate-mark').hide();
          } else {
            evaluateDialog.addClass('show');
            $('#evaluate-mark').show();
          }
        };
      }
    })();

    const init = () => {
      // 判断是否gitee链接
      if ($('.document a img').length > 0) {
        $('.document a img').each(function () {
          const imgAlt = $(this).attr('alt');
          const source = ['view source on gitee', '查看源文件'];
          let link = $(this).parent().attr('href');
          if (
            imgAlt &&
            source.includes(imgAlt.toLocaleLowerCase()) &&
            link.startsWith('https://gitee.')
          ) {
            repositoryHref = link;
            isPR = true;
            const BLOB = '/blob/';
            const giteeUrlArr = repositoryHref.split(BLOB);
            currentVersion = giteeUrlArr[1].split('/')[0];
            // 根据版本获取文件路径
            let source = repositoryHref.split(currentVersion)[1];
            ideHref = `https://gitee.com/-/ide/project/mindspore/docs/edit/${currentVersion}/-${source}`;

            console.log('repositoryHref :>> ', repositoryHref, currentVersion);
            console.log('ideHref :>> ', ideHref);
          } else {
            isPR = false;
          }
        });
      } else {
        isPR = false;
      }

      body.prepend(getEvaluateContent());
      utils();
    };

    init();

    //end
  })();
});
