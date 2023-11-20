#coding: UTF-8
import argparse
import copy
import os
import re
import json
import shutil

def main(arg_version):
    theme_path = os.path.join(os.path.dirname(__file__),"../template")
    version_dir = os.path.join(os.path.dirname(__file__), "version")
    public_path = os.path.join(os.path.dirname(__file__),"../public")
    update_js_path = os.path.join(os.path.dirname(__file__),"../template/update_js")
    for f_name in os.listdir(theme_path):
        if os.path.isfile(os.path.join(theme_path, f_name)):
            if os.path.exists(os.path.join(public_path, f_name)):
                os.remove(os.path.join(public_path, f_name))
            shutil.copy(os.path.join(theme_path, f_name), os.path.join(public_path, f_name))

    theme_lite = os.path.join(theme_path, "theme-lite")
    theme_docs = os.path.join(theme_path, "theme-docs")
    theme_tutorials = os.path.join(theme_path, "theme-tutorials")
    error_dir = []
    if arg_version == "r1.3":
        json_name_list = ["0.1.0-alpha.json", "0.2.0-alpha.json", "0.3.0-alpha.json", "r0.5.json",
                          "r0.6.json", "r0.7.json", "r1.0.json", "r1.1.json", "r1.2.json", "r1.3.json"]
    elif arg_version != "all":
        json_name_list = [arg_version + ".json"]
    else:
        json_name_list = [file for file in os.listdir(version_dir)]
    json_name_list = sorted(json_name_list)
    for json_name in json_name_list:
        with open(os.path.join(version_dir, json_name), "r+", encoding="utf-8") as f:
            data = json.load(f)
        for i in range(len(data)):
            js_path_zh = []
            js_path_en = []
            css_path_zh = []
            css_path_en = []
            static_path_zh = []
            static_path_en = []
            version = data[i]["version"]
            theme_class = ''
            if "theme" in data[i] and data[i]["theme"]:
                theme_class = os.path.join(theme_path, data[i]["theme"])
            if data[i]["repo_name"] == "mindspore":
                first_name = "docs"
                if not theme_class:
                    theme_class = theme_docs
                    if "submenu" in data[i]:
                        theme_class = theme_lite
                        data[i]["theme"] = "theme-lite"
                    else:
                        data[i]["theme"] = "theme-docs"
            elif data[i]["repo_name"] == "lite":
                first_name = data[i]["repo_name"]
                if not theme_class:
                    theme_class = theme_lite
                    data[i]["theme"] = "theme-lite"
            elif data[i]["repo_name"] == "tutorial" or data[i]["repo_name"] == "tutorials":
                first_name = data[i]["repo_name"]
                if not theme_class:
                    theme_class = theme_tutorials
                    if "submenu" not in data[i]:
                        theme_class = theme_docs
                        data[i]["theme"] = "theme-docs"
                    else:
                        data[i]["theme"] = "theme-tutorials"
            else:
                first_name = data[i]["repo_name"] + "/docs"
                if not theme_class:
                    theme_class = theme_docs
                    if "submenu" in data[i]:
                        theme_class = theme_lite
                        data[i]["theme"] = "theme-lite"
                    else:
                        data[i]["theme"] = "theme-docs"

            if "submenu" not in data[i]:

                js_path_zh.append(os.path.join(public_path, first_name, 'zh-CN', version, "_static/js"))
                js_path_en.append(os.path.join(public_path, first_name, 'en', version, "_static/js"))
                css_path_zh.append(os.path.join(public_path, first_name, 'zh-CN', version, "_static/css"))
                css_path_en.append(os.path.join(public_path, first_name, 'en', version, "_static/css"))
                static_path_zh.append(os.path.join(public_path, first_name, 'zh-CN', version, "_static"))
                static_path_en.append(os.path.join(public_path, first_name, 'en', version, "_static"))

            else:
                group_set = set()
                for group in data[i]["submenu"]["zh"]:
                    first_name = ''
                    if not group["url"].startswith("https"):
                        first_name = re.findall(r"/(.+?)/zh-CN/.+?\.html", group["url"])
                    if first_name:
                        group_set.add(first_name[0])
                for first in group_set:
                    js_path_zh.append(os.path.join(public_path, first, 'zh-CN', version, "_static/js"))
                    js_path_en.append(os.path.join(public_path, first, 'en', version, "_static/js"))
                    css_path_zh.append(os.path.join(public_path, first, 'zh-CN', version, "_static/css"))
                    css_path_en.append(os.path.join(public_path, first, 'en', version, "_static/css"))
                    static_path_en.append(os.path.join(public_path, first, 'en', version, "_static"))
                    static_path_zh.append(os.path.join(public_path, first, 'zh-CN', version, "_static"))

            
            for num in range(len(js_path_en)):
                if not os.path.exists(js_path_zh[num]):
                    error_dir.append(js_path_zh[num])
                    continue
                elif not os.path.exists(js_path_en[num]):
                    error_dir.append(js_path_en[num])
                    continue
                elif not os.path.exists(css_path_zh[num]):
                    error_dir.append(css_path_zh[num])
                    continue
                elif not os.path.exists(css_path_en[num]):
                    error_dir.append(css_path_en[num])
                    continue
                elif not os.path.exists(static_path_zh[num]):
                    error_dir.append(static_path_zh[num])
                    continue
                elif not os.path.exists(static_path_en[num]):
                    error_dir.append(static_path_en[num])
                    continue

                # 拷贝样式文件至各组件工程内

                if os.path.exists(os.path.join(static_path_zh[num], "jquery-3.5.1.js")):
                    os.remove(os.path.join(static_path_zh[num], "jquery-3.5.1.js"))
                if os.path.exists(os.path.join(static_path_en[num], "underscore-1.13.1.js")):
                    os.remove(os.path.join(static_path_en[num], "underscore-1.13.1.js"))
                if os.path.exists(os.path.join(static_path_en[num], "jquery-3.5.1.js")):
                    os.remove(os.path.join(static_path_en[num], "jquery-3.5.1.js"))
                if os.path.exists(os.path.join(static_path_zh[num], "underscore-1.13.1.js")):
                    os.remove(os.path.join(static_path_zh[num], "underscore-1.13.1.js"))
                if os.path.exists(os.path.join(static_path_zh[num], "jquery.js")):
                    os.remove(os.path.join(static_path_zh[num], "jquery.js"))
                shutil.copy(os.path.join(update_js_path, "jquery.js"), os.path.join(static_path_zh[num], "jquery.js"))
                if os.path.exists(os.path.join(static_path_en[num], "underscore.js")):
                    os.remove(os.path.join(static_path_en[num], "underscore.js"))
                shutil.copy(os.path.join(update_js_path, "underscore.js"), os.path.join(static_path_en[num], "underscore.js"))
                if os.path.exists(os.path.join(static_path_en[num], "jquery.js")):
                    os.remove(os.path.join(static_path_en[num], "jquery.js"))
                shutil.copy(os.path.join(update_js_path, "jquery.js"), os.path.join(static_path_en[num], "jquery.js"))
                if os.path.exists(os.path.join(static_path_zh[num], "underscore.js")):
                    os.remove(os.path.join(static_path_zh[num], "underscore.js"))
                shutil.copy(os.path.join(update_js_path, "underscore.js"), os.path.join(static_path_zh[num], "underscore.js"))

                if os.path.exists(os.path.join(js_path_zh[num], "badge_only.js")):
                    os.remove(os.path.join(js_path_zh[num], "badge_only.js"))
                if os.path.exists(os.path.join(js_path_zh[num], "html5shiv-printshiv.min.js")):
                    os.remove(os.path.join(js_path_zh[num], "html5shiv-printshiv.min.js"))
                if os.path.exists(os.path.join(js_path_zh[num], "html5shiv.min.js")):
                    os.remove(os.path.join(js_path_zh[num], "html5shiv.min.js"))
                if os.path.exists(os.path.join(js_path_en[num], "badge_only.js")):
                    os.remove(os.path.join(js_path_en[num], "badge_only.js"))
                if os.path.exists(os.path.join(js_path_en[num], "html5shiv-printshiv.min.js")):
                    os.remove(os.path.join(js_path_en[num], "html5shiv-printshiv.min.js"))
                if os.path.exists(os.path.join(js_path_en[num], "html5shiv.min.js")):
                    os.remove(os.path.join(js_path_en[num], "html5shiv.min.js"))

                if os.path.exists(os.path.join(css_path_zh[num], "badge_only.css")):
                    os.remove(os.path.join(css_path_zh[num], "badge_only.css"))
                if os.path.exists(os.path.join(css_path_en[num], "badge_only.css")):
                    os.remove(os.path.join(css_path_en[num], "badge_only.css"))

                if os.path.exists(os.path.join(js_path_zh[num], "theme.js")):
                    os.remove(os.path.join(js_path_zh[num], "theme.js"))
                shutil.copy(os.path.join(theme_class, "theme.js"), os.path.join(js_path_zh[num], "theme.js"))
                if os.path.exists(os.path.join(js_path_en[num], "theme.js")):
                    os.remove(os.path.join(js_path_en[num], "theme.js"))
                shutil.copy(os.path.join(theme_class, "theme.js"), os.path.join(js_path_en[num], "theme.js"))
                if os.path.exists(os.path.join(css_path_zh[num], "theme.css")):
                    os.remove(os.path.join(css_path_zh[num], "theme.css"))
                shutil.copy(os.path.join(theme_class, "theme.css"), os.path.join(css_path_zh[num], "theme.css"))
                if os.path.exists(os.path.join(css_path_en[num], "theme.css")):
                    os.remove(os.path.join(css_path_en[num], "theme.css"))
                shutil.copy(os.path.join(theme_class, "theme.css"), os.path.join(css_path_en[num], "theme.css"))

                # 删字体文件
                if os.path.exists(os.path.join(css_path_zh[num], "fonts")):
                    shutil.rmtree(os.path.join(css_path_zh[num], "fonts"))
                    # print(f'{css_path_zh[num]}字体删除成功')
                if os.path.exists(os.path.join(css_path_en[num], "fonts")):
                    shutil.rmtree(os.path.join(css_path_en[num], "fonts"))
                    # print(f'{css_path_en[num]}字体删除成功')

                # 分发版本信息json至各工程内
                write_content = copy.deepcopy(data[i])
                write_content.pop("repo_name", None)
                with open(os.path.join(js_path_zh[num], "version.json"), 'w+', encoding='utf-8') as g:
                    json.dump(write_content, g, indent=4)
                with open(os.path.join(js_path_en[num], "version.json"), 'w+', encoding='utf-8') as h:
                    json.dump(write_content, h, indent=4)
    if error_dir:
        print('错误或不存在的路径：', error_dir)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--version', type=str, default="all") # release as r1.3 or r1.5 or r1.7
    args = parser.parse_args()
    main(arg_version=args.version)
