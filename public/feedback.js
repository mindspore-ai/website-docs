$(function () {
  (function () {
    const body = $('body');
    const pathname = window.location.pathname;
    const isEn = pathname.includes('/en/');
    const lang = isEn ? 'en' : 'zh';
    let currentVersion = '';
    let componentName = $('.header-nav-info h3').text();

    let isPR = true;
    let ideHref = '';
    let repositoryComponent = 'docs';

    // data
    let postData = {
      bugDocFragment: '',
      existProblem: [],
      problemDetail: '',
      link: window.location.href,
    };

    const locale = {
      title: isEn ? 'Document feedback' : '文档反馈',
      participantion: isEn
        ? 'Click to submit Document feedback'
        : '点击参与文档反馈',
      bugInput: [
        isEn ? 'Question document fragment' : '问题文档片段',
        isEn
          ? 'Click to input the question document fragment'
          : '点击输入问题文档片段',
      ],
      submitType: isEn ? 'Submission type' : '提交类型',
      submitTypeTips: isEn
        ? 'Please select the submission type'
        : '请选择提交类型',
      issueTips: [
        isEn ? "It's a little complicated..." : '有点复杂...',
        isEn ? "I'd like to ask someone." : '找人问问吧。',
      ],
      prTips: [
        isEn ? 'Just a small problem. ' : '小问题，全程线上修改...',
        isEn ? 'I can fix it online!' : '一键搞定！',
      ],
      fragmentTips: isEn
        ? 'When a question  document fragment contains a formula, it is displayed as a space.'
        : '问题文档片段包含公式时，显示为空格。',
      questionType: isEn ? 'Problem type' : '问题类型',
      questionTypeList: [
        {
          name: isEn ? 'Specifications and Common Mistakes' : '规范和低错类',
          children: [
            isEn ? 'Specifications and Common Mistakes:' : '规范和低错类：',
            isEn
              ? 'Misspellings or punctuation mistakes,incorrect formulas, abnormal display;'
              : '错别字或拼写错误，标点符号使用错误、公式错误或显示异常；',
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
            isEn ? 'Usability:' : '易用性：',
            isEn
              ? 'Incorrect or missing key steps;'
              : '关键步骤错误或缺失，无法指导用户完成任务；',
            isEn
              ? 'Missing main function descriptions, keyword explanation, necessary prerequisites, or precautions.'
              : '缺少主要功能描述、关键词解释、必要前提条件、注意事项等；',
            isEn
              ? 'Ambiguous descriptions, unclear reference, or contradictory context;'
              : '描述内容存在歧义指代不明、上下文矛盾；',
            isEn
              ? 'Unclear logic, such as missing classifications, items, and steps.'
              : '逻辑不清晰，该分类、分项、分步骤的没有给出；',
          ],
        },
        {
          name: isEn ? 'Correctness' : '正确性',
          children: [
            isEn ? 'Correctness:' : '正确性：',
            isEn
              ? 'Technical principles, function descriptions, supported platforms, parameter types, or exceptions inconsistent with that of software implementation;'
              : '技术原理、功能、支持平台、参数类型、异常报错等描述和软件实现不一致；',
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
            isEn
              ? 'Sample code running error, or running results inconsistent with the expectation.'
              : '代码样例运行报错、运行结果不符；',
          ],
        },
        {
          name: isEn ? 'Risk Warnings' : '风险提示',
          children: [
            isEn ? 'Risk Warnings:' : '风险提示：',
            isEn
              ? 'Lack of risk warnings for operations that may damage the system or important data.'
              : '对重要数据或系统存在风险的操作，缺少安全提示；',
          ],
        },
        {
          name: isEn ? 'Content Compliance' : '内容合规',
          children: [
            isEn ? 'Content Compliance:' : '内容合规：',
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

      privacyText: [
        isEn
          ? 'By submitting the contents, you fully understand and agree to the terms of the MindSpore '
          : '您理解并同意，您填写和提交的内容，即视为您已充分阅读并同意MindSpore的',
        isEn ? ' Privacy Policy.' : '《隐私政策》',
      ],
      privacyLink: isEn ? '/privacy/en' : '/privacy',
      feedbackLink: isEn ? '/feedback/en' : '/feedback',
      submit: isEn ? 'Submit' : '提交',
      issue: [
        '1. 【Document Link】/【文档链接】',
        '2. 【Issues Section】/【问题文档片段】',
        '3. 【Issues Section】/【问题文档片段】',
        '4. 【Expected Result】【预期结果】',
        '- Please fill in the expected result',
      ],
      fragment: isEn
        ? 'Please enter the "Question" section'
        : '请输入“问题”片段',
      describe: isEn
        ? 'Describe the bug so that we can quickly locate the problem.'
        : '点击输入详细问题描述，以帮助我们快速定位问题。',
      satisfactionDesc: isEn
        ? 'Rate your satisfaction with this document'
        : '请选择满意度',
      privacyDesc: isEn ? 'Agree to Privacy Statement' : '请勾选同意隐私声明',
    };

    // 生成问题类型列表
    const getFilterList = (data, num) => {
      return `${data
        .map((item, index) => {
          return `
        <div class="doc-filter-btn ${
          index === num ? 'active-submit' : ''
        }" attr_type="${item.name}">
          <span>${item.name}</span>
          <div class="tips">${item.children
            .map((subitem) => {
              return `<p>- ${subitem
                .replace('；', '。')
                .replace(';', '.')}</p>`;
            })
            .join('')}</div>
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
        submitTypeTips,
        issueTips,
        prTips,
        questionType,
        questionTypeList,
        problemDesc,
        privacyText,
        privacyLink,
        feedbackLink,
        privacyDesc,
        submit,
        fragmentTips,
        title,
      } = locale;
      return `<div class="evaluate-dialog "><div id="evaluate-mark"></div><div class="evaluate-alert ${lang}">
            <div class="evaluate-head">
              <h3>${title} <a href="${feedbackLink}" target="_blank" rel="noopener noreferrer" class="evaluate-help"></a></h3>
              <em class="evaluate-close"></em>
            </div>
          <div class="docs-evaluate">
            <div class="evaluate-item">
              <span class="label">${bugInput[0]}</span>
              <div class="box">
                <textarea class="txa code-snippet" placeholder="${
                  bugInput[1]
                }" maxlength="500"></textarea>
                <p class="fragment-tips">${fragmentTips}</p>
              </div>
            </div>
            <div class="evaluate-item">
              <span class="label">${submitType}</span>
              <div class="box evaluate-type">
                  <div class="doc-filter-btn" attr_type="issue">
                    <span>issue</span>
                    <div class="tips">${issueTips
                      .map((item) => {
                        return `<p>${item}</p>`;
                      })
                      .join('')}</div>
                  </div>
                  ${
                    isPR
                      ? `<div class="doc-filter-btn " attr_type="PR"><span>PR</span><div class="tips">${prTips
                          .map((item) => {
                            return `<p>${item}</p>`;
                          })
                          .join('')}</div></div>`
                      : ''
                  }
                  <p class="error">${submitTypeTips}</p>
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
            <div class="privacy-box">
            <div class="checkbox-item">
              <input type="radio" id="privacy" name="privacy">
              <label class="privacy-label" for="privacy">${
                privacyText[0]
              }<a href="${privacyLink}" target="_blank" rel="noopener noreferrer">${
        privacyText[1]
      }</a></label>
            </div>
            <p class="error">${privacyDesc}</p>
            </div>
            <button class="evaluate-submit disable">${submit}</button>
          </div> </div></div>`;
    };

    // issue模板
    const issueTemplate = (data) => {
      return `${locale.issue[0]}
> ${data.link}
    
${locale.issue[1]}
    
> ${data.bugDocFragment.replace(/(\r\n|\r|\n)+/g, '$1')}
    
${locale.issue[2]}
    
${data.problemDetail.replace(/(\-)+/g, '>')}
    
${locale.issue[3]}
${locale.issue[4]}`;
    };

    const utils = () => {
      let problemTxa = $('.problem-txa'),
        codeSnippet = $('.code-snippet');

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
        let $radio = $(this),
          submitBtn = $('.evaluate-submit');
        if ($radio.data('checked')) {
          $radio.prop('checked', false);
          $radio.data('checked', false);
          $('.privacy-box .error').fadeIn();
          submitBtn.addClass('disable');
        } else {
          $radio.prop('checked', true);
          $radio.data('checked', true);
          $('.privacy-box .error').fadeOut();
          submitBtn.removeClass('disable');
        }
      });

      // 类型选中
      $('.evaluate-type .doc-filter-btn').on('click', function () {
        $(this)
          .addClass('active-submit')
          .siblings('.doc-filter-btn')
          .removeClass('active-submit');
        $('.evaluate-type').find('.error').fadeOut();
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
            locale.questionTypeList[index].children.join('\n -  ');

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

      // 提交事件
      $('.evaluate-submit').on('click', function () {
        const regR = /[\r\n]+/g;

        let problemTxaValue = problemTxa.val().trim();
        let submitType = $('.evaluate-type .active-submit').attr('attr_type');
        let privacy = $(".checkbox-item input[type='radio']:checked");
        let tipText = '';

        // 获取要提交的文件的路径
        const urlArr = location.href.split('/');
        const title = urlArr[urlArr.length - 1].replace('.html', '');

        if (privacy.length === 0) {
          $('.privacy-box .error').fadeIn();
        } else if (!postData.bugDocFragment) {
          tipText = locale.fragment;
          codeSnippet.focus().addClass('error').val(tipText).select();
        } else if (!submitType) {
          tipText = locale.submitTypeTips;
          $('.evaluate-type .error').fadeIn();
        } else if (!problemTxaValue) {
          tipText = locale.describe;
          problemTxa.focus().addClass('error').val(tipText).select();
        } else {
          $(this).removeClass('disable');
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

          if (submitType === 'issue') {
            let desc = encodeURIComponent(issueTemplate(postData));
            openUrl(
              `https://gitee.com/mindspore/${repositoryComponent}/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0&title=${locale.title}-${componentName}&description=${desc}`
            );
          } else if (submitType === 'PR') {
            openUrl(
              `${ideHref}?search=${first}&title=${locale.title}-${componentName} ${currentVersion}-${title}&description=${problemTxaValue}&message=${problemTxaValue}&label_names=文档反馈`
            );
          }

          $('.evaluate-dialog').removeClass('show');
        }
      });

      $('.evaluate-close,#evaluate-mark').click(function () {
        $('.evaluate-dialog').removeClass('show');
      });
    };

    // 选中文字出现反馈图标
    (function () {
      const feedbackDom = `<div class="feedback"><img class="bug-icon" src="/pic/feeback.svg" title="${locale.participantion}" alt="">${locale.title}</div>`;
      body.prepend(feedbackDom);

      let content = document.querySelector('.rst-content .document');
      let feedback = document.querySelector('.feedback');
      let selection = document.getSelection();
      let selectText = '';

      if (content && feedback) {
        content.onmouseup = function (event) {
          let ev = event || window.event;
          let left = ev.clientX;
          let top = ev.clientY + 16;

          setTimeout(function () {
            if (selection && selection.type === 'Range') {
              selectText = getSelectionFragment(selection);
              feedback.style.display = 'flex';
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
            selectText > 500 ? selectText.substring(0, 500) : selectText;
          $('.code-snippet').val(value);
          postData.bugDocFragment = value;
          $('.docs-feedback .text').click();
        };
        // 文档反馈点击事件
        $('.docs-feedback .text').click(function () {
          const evaluateDialog = $('.evaluate-dialog');
          if (evaluateDialog.hasClass('show')) {
            evaluateDialog.removeClass('show');
            $('#evaluate-mark').hide();
          } else {
            evaluateDialog.addClass('show');
            $('#evaluate-mark').show();
          }
        });

        // 过滤选中片段 math 的内容 替换成空格
        const getSelectionFragment = (selection) => {
          const filteredFragment = document.createDocumentFragment();

          for (let i = 0; i < selection.rangeCount; i++) {
            const range = selection.getRangeAt(i);
            const clonedContent = range.cloneContents();

            const mathElements = clonedContent.querySelectorAll('.math');
            // 替换math内容为空格
            mathElements.forEach((element) => {
              const replacementText = document.createTextNode(' ');
              element.parentNode.insertBefore(replacementText, element);
              element.parentNode.removeChild(element);
            });

            filteredFragment.appendChild(clonedContent);
          }

          const filteredDiv = document.createElement('div');
          filteredDiv.appendChild(filteredFragment);

          return filteredDiv.innerText;
        };
      }
    })();

    // 检查是否有gitee链接
    const checkImgLink = () => {
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
            isPR = true;

            const BLOB = '/blob/';
            const giteeUrlArr = link.split(BLOB);
            currentVersion = giteeUrlArr[1].split('/')[0];
            repositoryComponent = giteeUrlArr[0].split('/')[4];

            // 根据版本获取文件路径
            let source = link.split(currentVersion)[1];
            ideHref = `https://gitee.com/-/ide/project/mindspore/${repositoryComponent}/edit/${currentVersion}/-${source}`;
          } else {
            isPR = false;
          }
        });
      } else {
        isPR = false;
      }
    };

    const init = () => {
      checkImgLink();
      body.prepend(getEvaluateContent());
      utils();
    };

    init();
  })();
});
