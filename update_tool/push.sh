#!/bin/bash
echo "Start now --> ""${VERSION}"

# shellcheck disable=SC2164
cd /root

echo "clone docs repositories bash --> ""${VERSION}"

rm -rf docs

git clone https://gitee.com/mindspore/docs.git -b "${VERSION}"

echo "clone docs success, now start building"

# shellcheck disable=SC2034
BUILD_PATH=${VERSION}
# shellcheck disable=SC2164
cd /root/docs/tools/generate_html
if [ ${VERSION} == "master" ];then
  # shellcheck disable=SC2034
  BUILD_PATH="daily"
  python run.py --user="${USER}" --pd="${PD}" --wgetdir="${WGETDIR}"
else
  python run.py --version="${VERSION}" --user="${USER}" --pd="${PD}" --wgetdir="${WGETDIR}" --release_url="${RELEASE_URL}"
fi
# shellcheck disable=SC2164
cd /root

rm -rf website-docs

# shellcheck disable=SC2086
git clone https://${GIT_USERNAME}:"${GIT_PASSWORD}"@gitee.com/mindspore/website-docs.git -b "${TARGET_BRANCH:-master}"

# shellcheck disable=SC2164
cd /root/docs/tools/generate_html/${BUILD_PATH}/output
cp -f common.css /root/website-docs/public/
cp -f common.js /root/website-docs/public/
cp -f h5_docs.css /root/website-docs/public/
cp -f menu_en.json /root/website-docs/public/
cp -f menu_zh-CN.json /root/website-docs/public/
cp -f msVersion.json /root/website-docs/public/

# shellcheck disable=SC2164
cd /root
#!/bin/bash
# shellcheck disable=SC2120
function delete_old() {
  local buildPath="/root/docs/tools/generate_html/${BUILD_PATH}/output$1"
  # shellcheck disable=SC2045
  for dir in $(ls "$buildPath"); do
    # shellcheck disable=SC2034
    local next="$1"/"$dir"
    local dirPath="$buildPath"/"$dir"

    if [ ! -d "$dirPath" ]; then
      continue
    fi
    #    echo "$dirPath"
    # shellcheck disable=SC2155
    local in=$(awk -v a="$dirPath" -v b="/en/" 'BEGIN{print index(a,b)}')
    # shellcheck disable=SC2170
    # shellcheck disable=SC2071
    if [ "$in" -gt 0 ]; then
      local inz=${dirPath:in+3}
      # shellcheck disable=SC2155
      local k=$(awk -v a="$inz" -v b="/" 'BEGIN{print index(a,b)}')
      if [ "$k" == 0 ]; then
        refreshDir "$next"
      fi
    fi

    # shellcheck disable=SC2155
    local on=$(awk -v a="$dirPath" -v b="/zh-CN/" 'BEGIN{print index(a,b)}')
    # shellcheck disable=SC2170
    # shellcheck disable=SC2071
    if [ "$on" -gt 0 ]; then
      local onz=${dirPath:on+6}
      # shellcheck disable=SC2155
      local k=$(awk -v a="$onz" -v b="/" 'BEGIN{print index(a,b)}')
      if [ "$k" == 0 ]; then
        refreshDir "$next"
      fi
    fi
    delete_old "$next"
  done
}

function refreshDir() {
  local path=$1
  echo "$path"
  rm -rf "/root/website-docs/public"$1

  mkdir -p "/root/website-docs/public"$1

  cp -r /root/docs/tools/generate_html/${BUILD_PATH}/output"$path"/* /root/website-docs/public"$path"/
}

delete_old

rm -rf /root/website-docs/public/install/${VERSION}
mkdir -p /root/website-docs/public/install/${VERSION}
cp /root/docs/install* /root/website-docs/public/install/${VERSION}/
if [ ${VERSION} == "master" ];then
  cp -r /root/docs/resource/release/release_list_* /root/website-docs/more/
fi


# shellcheck disable=SC2164
cd /root/website-docs

git config --global user.email "contact@mindspore.cn"

git config --global user.name "MindSpore"

git config core.ignorecase false

git add -A

git commit -m "Update website files generated by mindspore && docs repo"

git push

echo "success!!!!!!"
