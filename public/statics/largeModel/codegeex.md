## 简述

CodeGeeX 是一个具有 130 亿参数的大规模多语言代码生成模型，在 20 多种编程语言的大型代码语料库上进行了预训练。截至 2022 年 6 月 22 日，CodeGeeX 已在 1,536 个 Ascend 910 AI 处理器集群上接受了超过 8500 亿个代币的训练。CodeGeeX 有几个独特的功能：

-   多语言代码生成：CodeGeeX 在生成 Python、C++、Java、JavaScript、Go 等多种主流编程语言的可执行程序方面具有良好的性能。

-   跨语言代码翻译：CodeGeeX 支持不同语言之间的代码片段翻译。只需单击一下，CodeGeeX 就可以将程序高精度地转换为任何预期的语言。

-   可定制的编程助手：CodeGeeX 可在 VS Code 扩展市场免费获得。它支持代码完成、解释、总结等，为用户提供更好的编码体验。

-   开源和跨平台：所有代码和模型权重都将公开用于研究目的。我们也一直在努力适应其他 GPU 平台，很快就会准备好。

HumanEval-X 用于现实的多语言基准测试。为了帮助标准化多语言代码生成和翻译的评估，我们开发并发布了 HumanEval-X Benchmark。HumanEval-X 是一个新的多语言基准测试，包含 5 种编程语言（Python、C++、Java、JavaScript 和 Go）中的 820 个人工编码问题，每个问题都与测试和解决方案相关联。

<img src='/statics/largeModel/codegeex/performance.png' />

## CodeGeeX：架构、代码语料库和实现

架构： CodeGeeX 是一种基于转换器的大规模预训练编程语言模型。它是一个从左到右的自回归解码器，它将代码和自然语言作为输入，并预测下一个标记的概率。CodeGeeX 包含 40 个 transformer 层，隐藏大小为 5,120 的 self-attention 块和 20,480 个前馈层，使其大小达到 130 亿个参数。它支持的最大序列长度为 2,048。

<img src='/statics/largeModel/codegeex/framework.png' />

代码语料库：我们的训练数据包含两部分。第一部分来自开源代码数据集 The Pile 和 CodeParrot. The Pile 包含一个代码语料库子集，它从 GitHub 收集了超过 100 颗星的公共存储库，我们从中选择了 23 种流行编程语言的代码。第二部分是直接从公共 GitHub 存储库中提取的补充数据，这些数据未出现在以前的数据集中，包括 Python、Java 和 C++。为了获得可能更高质量的数据，选择具有至少一颗星且其大小小于 10MB 的存储库。如果一个文件 1) 平均每行超过 100 个字符，2) 自动生成，3) 字母比例小于 40%，或 4) 大于 100KB 或小于 1KB，则文件被过滤掉。为了帮助模型区分不同的语言，我们在每个段的开头添加一个特定于语言的前缀，形式为[Comment sign] language: [LANG]，例如，# language: Python. 对于标记化，我们使用与 GPT-2 相同的标记器并将空格作为额外标记处理，从而产生 50,400 个标记的词汇表。代码语料库总共有 23 种编程语言和 158.7B 个令牌。

训练：我们在 Mindspore 1.7 中实现 CodeGeeX 并在 1,536 个 Ascend 910 AI 处理器 (32GB) 上对其进行训练。模型权重采用 FP16 格式，除了我们使用 FP32 进行 layer-norm 和 softmax 以获得更高的精度和稳定性。整个模型消耗大约 27GB 的内存。为了提高训练效率，我们采用了 8 路模型并行训练和 192 路数据并行训练，并启用了 ZeRO-2 优化器。微批量大小为 16，全局批量大小达到 3,072。此外，我们还采用了逐元素算子融合、快速格鲁激活、矩阵乘法维度优化等技术来进一步提升训练效率。整个训练过程耗时近两个月，时间跨度为 2022 年 4 月 18 日至 6 月 22 日，期间其中 850B 个令牌通过了训练，即 5+ epochs。
HumanEval

## HumanEval-X：多语言程序合成的新基准

为了更好地评估代码生成模型的多语言能力，我们提出了一个新的基准 HumanEval-X。虽然以前的工作在语义相似性（例如）下评估多语言程序合成，这通常会产生误导，但 HumanEval-X 评估了生成程序的功能正确性。HumanEval-X 由 Python、C++、Java、JavaScript 和 Go 语言的 820 个高质量人工数据样本（每个都有测试用例）组成，可用于各种任务。

<img src='/statics/largeModel/codegeex/baseline.png' />

HumanEval-X 支持的任务说明。声明、文档字符串和解决方案分别用红色、绿色和蓝色标记。代码生成使用声明和文档字符串作为输入，生成解决方案。代码翻译使用两种语言的声明，并将源语言的解决方案翻译成目标语言的解决方案。

在 HumanEval-X 中，每种语言的每个样本都包含声明、文档字符串和解决方案，可以通过多种方式组合以支持不同的下游任务，包括生成、翻译、摘要等。我们目前主要关注两个任务：代码生成和代码翻译。对于代码生成，模型使用声明和文档字符串作为输入来生成解决方案。对于代码翻译，该模型使用两种语言的声明和源语言的解决方案作为输入，以生成目标语言的解决方案。我们在代码翻译的时候去掉了描述，防止模型直接解决问题。对于这两个任务，我们使用 Codex 中提出的无偏 pass@k 指标：

### 多语言代码生成

<img src='/statics/largeModel/codegeex/code-generation.png' />

左：HumanEval-X 中五种语言的代码生成任务的详细 pass@k (k=1,10,100) 性能。右：每个模型的所有语言的平均性能。与 InCoder-6.7B、CodeGen-Multi-6B 和 CodeGen-Multi-16B 相比，CodeGeeX 实现了最高的平均性能。

我们将 CodeGeeX 与另外两个开源代码生成模型 InCoder（来自 Meta）和 CodeGen（来自 Salesforce）进行了比较。具体来说，考虑了 InCoder-6.7B、CodeGen-Multi-6B 和 CodeGen-Multi-16B。CodeGeeX 显着优于较小规模的模型（7.5%~16.3%），并且与较大规模的 CodeGen-Multi-16B 具有竞争力（平均性能 54.76% 对 54.39%）。CodeGeeX 实现了跨语言的最佳平均性能。我们进一步研究了将抽样预算分配给不同语言的影响。CodeGeeX 使用一种简单的启发式方法来分配由训练数据分布加权的预算，CodeGeeX 的通过率高于任何单一语言（由红色虚线圆圈表示）。

<img src='/statics/largeModel/codegeex/code-generation2.png' />

<div style='text-align:center'>HumanEval-X代码翻译任务的结果。最佳语言表现以粗体显示。</div>

我们还评估了跨不同编程语言的翻译性能。我们测试了 CodeGeeX 的零样本性能，以及微调后的 CodeGeeX-13B-FT（使用 XLCoST 中的代码翻译任务训练集进行微调）; 原始集合中没有围棋，因此我们添加了一个小集合）。结果表明，模型对语言有偏好，例如，CodeGeeX 擅长将其他语言翻译成 Python 和 C++，而 CodeGen-Multi-16B 更擅长翻译成 JavaScript 和 Go；这可能是由于训练语料库中语言分布的差异造成的。在 20 个翻译对中，我们还观察到 A-to-B 和 B-to-A 的性能始终呈负相关，这可能表明当前模型仍然无法很好地学习所有语言。

### 如何使用 HumanEval-X 并为之做出贡献？

有关如何使用 HumanEval-X 的更多详细信息，请参阅用法。我们非常欢迎社区通过添加更多问题或将其扩展到其他语言来为 HumanEval-X 做出贡献，请查看 HumanEval-X 的标准格式并添加拉取请求。

如果您有任何意见或建议，请通过codegeex@aminer.cn告诉我们。

### 生成示例

<img src='/statics/largeModel/codegeex/generation-example.png' />
