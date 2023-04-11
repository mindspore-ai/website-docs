## 简述

“鹏程·盘古α“由以鹏城实验室为首的技术团队联合攻关，首次基于“鹏城云脑Ⅱ”和国产MindSpore框架的自动混合并行模式实现在2048卡算力集群上的大规模分布式训练，训练出业界首个2000亿参数以中文为核心的预训练生成语言模型。鹏程·盘古α预训练模型支持丰富的场景应用，在知识问答、知识检索、知识推理、阅读理解等文本生成领域表现突出，具备很强的小样本学习能力。


鹏程·盘古α具有以下特点：

- .业界首个2000亿参数中文自回归语言模型

- .代码、模型逐步全开源

- .首创顺序自回归预训练语言模型ALM

- .MindSpore超大规模自动并行技术

- .模型基于国产全栈式软硬件协同生态

( MindSpore+CANN+昇腾910+ModelArts )

## 模型结构

![模型](/statics/largeModel/muxing.png)

上图为鹏程·盘古α模型的网络结构，该模型是基于单向的Transformer decoder发展而来。query层堆叠在transformer层之上。query层的基本结构与transformer层相似，只是引入了一个额外的Query layer，来预测生成下一个query Q的位置。

## 数据集

海量语料是预训练模型研究的基础，联合团队从开源开放数据集、common crawl网页数据、电子书等收集了近80TB原始数据。

![数据集](/statics/largeModel/shujuji.png)

上图为鹏程·盘古α的数据集处理流程，搭建了面向大型语料库预处理的分布式集群，通过数据清洗过滤、去重、质量评估等处理流程，构建了一个约1.1TB的高质量中文语料数据集，经统计Token数量约为250B规模。通过对不同的开源数据集独立进行处理，完全清除了跟下游任务相关的标签信息，以保证源数据的无偏性。

## MindSpore超大规模自动并行

大集群下高效训练千亿至万亿参数模型，用户需要综合考虑参数量、计算量、计算类型、集群带宽拓扑和样本数量等才能设计出性能较优的并行切分策略，模型编码除了考虑算法以外，还需要编写大量并行切分和通信代码。

![超大规模自动并行](/statics/largeModel/mindspore.png)

MindSpore是业界首个支持全自动并行的框架，MindSpore多维度自动并行，通过数据并行、算子级模型并行、Pipeline模型并行、优化器模型并行、异构并行、重计算、高效内存复用，及拓扑感知调度，实现整体迭代时间最小（计算时间+通信时间）。编程接口高效易用，实现了算法逻辑和并行逻辑解耦，串行代码自动分布式并行。

## 软硬件配置

| 硬件平台   | Ascend 910| 
| :--------   | :-----  | 
| 设备数量| 2048 |  
| 操作系统| EulerOS-aarch64 |  
| 集群管理| ModelArts️ |  
| 框架| MindSpore |  



## 环境要求

| 硬件平台   | Ascend 910|  
| :--------   | :-----  | 
|操作系统 | EulerOS-aarch64 | 
|框架 | MindSpore | 
|2.6/13B推理设备数量 | 8卡 | 
|200B推理设备数量 | 64卡 | 

### 环境配置
`mindspore`
`jieba 0.42.1`
`sentencepiece 0.1.94`

## 训练
运行如下命令开始训练， MODE 选择 2.6B, 13B 或 200B.

`export MODE=2.6B`
`bash scripts/run_distribute_train.sh 8 /home/data/ /home/config/rank_table_8p.json $MODE`

## npu推理

- 首先下载以下三个文件

- .tokenizier: vocal.vocab 和 vocab.model 在“$FILE_PATH/tokenizer/”目录

- .模型: 下载模型文件放在“$FILE_PATH/checkpiont_file/”目录

- .策略文件: 该文件描述了模型的切分策略，文件位于”$FILE_PATH/strategy_load_ckpt/“目录

### 执行推理

`$FILE_PATH=/home/your_path`
`bash scripts/run_distribute_predict.sh 8 /home/config/rank_table_8p.json ${FILE_PATH}/strategy_load_ckpt \`
`${FILE_PATH}/tokenizer/ ${FILE_PATH}/checkpiont_file filitered`

