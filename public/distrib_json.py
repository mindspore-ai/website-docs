import copy
import os
import re
import json

version_dir = os.path.join(os.path.dirname(__file__), "version")

for json_name in os.listdir(version_dir):
    error_dir = []
    with open(os.path.join(version_dir,json_name), "r+", encoding="utf-8") as f:
        data = json.load(f)
    for i in range(len(data)):
        version = data[i]["version"]
        if "submenu" not in data[i]:
            if data[i]["repo_name"] == "mindspore":
                first_name = "docs"
            elif data[i]["repo_name"] != "tutorial" and data[i]["repo_name"] != "tutorials":
                first_name = data[i]["repo_name"] + "/docs"
            else:
                first_name = data[i]["repo_name"]
            dir_path_zh = os.path.join(os.path.dirname(__file__), first_name, 'zh-CN', version, "_static/js")
            dir_path_en = os.path.join(os.path.dirname(__file__), first_name, 'en', version, "_static/js")
            if not os.path.exists(dir_path_zh):
                error_dir.append(dir_path_zh)
                continue
            if not os.path.exists(dir_path_en):
                error_dir.append(dir_path_en)
                continue
            write_content = copy.deepcopy(data[i])
            write_content.pop("repo_name", None)
            with open(os.path.join(dir_path_zh, f"version.json"), 'w+', encoding='utf-8') as g:
                json.dump(write_content, g, indent=4)
            with open(os.path.join(dir_path_en, f"version.json"), 'w+', encoding='utf-8') as h:
                json.dump(write_content, h, indent=4)
        else:
            group_set = set()
            for group in data[i]["submenu"]["zh"]:
                first_name = ''
                if not group["url"].startswith("https"):
                    first_name = re.findall(r"/(.+?)/zh-CN/.+?\.html", group["url"])
                if first_name:
                    group_set.add(first_name[0])
            for first in group_set:
                dir_path_zh = os.path.join(os.path.dirname(__file__), first, 'zh-CN', version, "_static/js")
                dir_path_en = os.path.join(os.path.dirname(__file__), first, 'en', version, "_static/js")
                if not os.path.exists(dir_path_zh):
                    error_dir.append(dir_path_zh)
                    continue
                if not os.path.exists(dir_path_en):
                    error_dir.append(dir_path_en)
                    continue
                write_content = copy.deepcopy(data[i])
                write_content.pop("repo_name", None)
                with open(os.path.join(dir_path_zh, f"version.json"), 'w+', encoding='utf-8') as g:
                    json.dump(write_content, g, indent=4)
                with open(os.path.join(dir_path_en, f"version.json"), 'w+', encoding='utf-8') as h:
                    json.dump(write_content, h, indent=4)
    print(f"{'.'.join(json_name.split('.')[:-1])}版本各组件json文件生成完成！已分配至对应文件夹内！")
    if error_dir:
        print(error_dir)