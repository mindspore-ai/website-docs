import argparse
import copy
import os
import re
import json
import shutil

def main(arg_version, docs_path):
    if not docs_path:
        print("请提供docs仓的路径： --docs_path=xxx")
        raise ValueError
    theme_path = os.path.join(docs_path,"resource/api_generate_theme")
    version_dir = os.path.join(os.path.dirname(__file__), "version")
    public_path = os.path.join(os.path.dirname(__file__),"../public")
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
    for json_name in json_name_list:
        with open(os.path.join(version_dir, json_name), "r+", encoding="utf-8") as f:
            data = json.load(f)
        for i in range(len(data)):
            js_path_zh = []
            js_path_en = []
            css_path_zh = []
            css_path_en = []
            version = data[i]["version"]
            if data[i]["repo_name"] == "mindspore":
                first_name = "docs"
                theme_class = theme_docs
                if "submenu" in data[i]:
                    theme_class = theme_lite
            elif data[i]["repo_name"] == "lite":
                theme_class = theme_lite
                first_name = data[i]["repo_name"]
            elif data[i]["repo_name"] == "tutorial" or data[i]["repo_name"] == "tutorials":
                first_name = data[i]["repo_name"]
                theme_class = theme_tutorials
            else:
                first_name = data[i]["repo_name"] + "/docs"
                theme_class = theme_docs
                if "submenu" in data[i]:
                    theme_class = theme_lite
            if "submenu" not in data[i]:

                js_path_zh.append(os.path.join(public_path, first_name, 'zh-CN', version, "_static/js"))
                js_path_en.append(os.path.join(public_path, first_name, 'en', version, "_static/js"))
                css_path_zh.append(os.path.join(public_path, first_name, 'zh-CN', version, "_static/css"))
                css_path_en.append(os.path.join(public_path, first_name, 'en', version, "_static/css"))
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

            for num in range(len(js_path_en)):
                if not os.path.exists(js_path_zh[num]):
                    error_dir.append(js_path_zh[num])
                    continue
                if not os.path.exists(js_path_en[num]):
                    error_dir.append(js_path_en[num])
                    continue
                if not os.path.exists(css_path_zh[num]):
                    error_dir.append(css_path_zh[num])
                    continue
                if not os.path.exists(css_path_en[num]):
                    error_dir.append(css_path_en[num])
                    continue
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
                write_content = copy.deepcopy(data[i])
                write_content.pop("repo_name", None)
                with open(os.path.join(js_path_zh[num], f"version.json"), 'w+', encoding='utf-8') as g:
                    json.dump(write_content, g, indent=4)
                with open(os.path.join(js_path_en[num], f"version.json"), 'w+', encoding='utf-8') as h:
                    json.dump(write_content, h, indent=4)
        print(f"{'.'.join(json_name.split('.')[:-1])}版本各组件json文件生成完成！已分配至对应文件夹内！样式文件也已替换完成！")
    if error_dir:
        print('error_dir', error_dir)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--version', type=str, default="r1.3") # release as r1.3 or r1.5 or r1.7
    parser.add_argument('--docs_path', type=str, default="") # docs repo path
    args = parser.parse_args()
    main(arg_version=args.version, docs_path = args.docs_path)