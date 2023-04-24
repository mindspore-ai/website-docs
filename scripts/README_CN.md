# MindSpore文档构建

> 运行之前确认已安装：
>
> - python>=3.7
> - git
> - pandoc
> - doxygen

1. 准备好各个版本的json文件放在同级目录下的version文件夹内。

2. 3种运行方式：

    - 当``version="r1.3"``时，会自动运行r1.3版本之前包含r1.3的所有版本，完成替换和生成json文件的操作

      ```bash
      python distrib_json.py --version="r1.3"
      ```

    - 当``version="all"``时，会自动运行所有版本，完成替换和生成json文件的操作

      ```bash
      python distrib_json.py --version="all"
      ```
    
    - 当``version``不是上述两种情况时，可指定版本号，程序只会自动运行指定版本，完成替换和生成json文件的操作

      ```bash
      python distrib_json.py --version="r1.8"
      ```

    | 参数 | 值 | 必填 |
    | ---- | ---- | ---- |
    | version | 构建的版本号 | 是 |
