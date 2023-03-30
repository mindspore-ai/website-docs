# mindspore website-docs

## 版本发布

修改 version.json 对应的组件版本，Copy template 到对应的组件中

```text
  msVersion.json
    ├─ name // 组件名
    ├─ versions // 版本列表
      ├─ version // 版本号
      ├─ versionAlias // 配置版本别名会覆盖版本号显示
      ├─ url // 版本扩展链接会替换version生成的链接
```

-   组件版本下拉会取 msVersion 数组前 **3** 个
-   文档菜单会自动获取 versions 最新的版本号（master 除外）来显示链接
-   根据 template 配置来指定模板显示
    -   theme-docs（通用组件模板）
    -   theme-tutorials（教程组件模板）
    -   theme-lite（Lite 组件模板）

## template 文件介绍

-   `common.js` 公共事件
-   后续会合并`h5_docs.css`到`common.css`为公共样式
-   `menu_zh-CN.json` `、menu_en.json` 中英文导航，不涉及版本、链接
-   `theme-*` 模板
    -   theme.js 模板事件
    -   theme.css 模板私有样式配置（待调整）
