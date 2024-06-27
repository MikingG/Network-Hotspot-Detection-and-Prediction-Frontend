# Network Hotspot detection and prediction 前端

该仓库放置的是Network Hotspot detection and prediction前端，主要修改自vue-admin-template。

相关项目
# Quick Start in MacOS
Three steps
```
brew install node
npm install
npm run dev
```

## Build Setup

```bash

# install dependency
npm install

# 如果 npm install 没能成功，可以先把以下两个文件夹/文件先删掉
node_modules
package-lock.json


# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

Refer to [Documentation](https://panjiachen.github.io/vue-element-admin-site/guide/essentials/deploy.html) for more information

## Demo

![demo](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/demo.gif)

## Extra

If you want router permission && generate menu by user roles , you can use this branch [permission-control](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)

For `typescript` version, you can use [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template) (Credits: [@Armour](https://github.com/Armour))

## Related Project

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
- [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)
- [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)
- [awesome-project](https://github.com/PanJiaChen/vue-element-admin/issues/2312)

Network Hotspot detection and prediction项目来自中山大学软件工程学院综合实训，是一个完整的网络舆情监控系统，包括数据爬取，清洗，整理，并在此基础上进行基本分析和事件图谱构建以辅助对网络舆情的掌握，还具有热点预测的功能，为舆情监管提供决策参考。

该项目的目的是为了把握中山大学在网络的舆情状况，但整体框架和机制是通用的，可以泛化应用在各种数据收集和构建上而不需要做出太多调整，具有很大的发展潜力。目前事件图谱的各项技术还不完善，并没有特别完善的事件图谱系统（有完善的知识图谱系统）。本项目基于流行的python Django和Vue搭建了完整的前后端，应用了大语言模型，机器学习，图数据库等先进技术，并构建了能将分布在网络各个地方的分散数据聚合，并将高信息熵的海量数据提炼成低信息熵的结构化数据的大数据系统，能够为决策等提供有力的信息支撑。

项目总体设计方案：https://oiv4vv80gv6.feishu.cn/docx/DQyfdKmTjoP3DCxE4XBclnumnHh?from=from_copylink

## Quick Start

环境：node.js 20.14.0

安装依赖：

```
npm install
```

开发运行：

```
npm run dev
```
