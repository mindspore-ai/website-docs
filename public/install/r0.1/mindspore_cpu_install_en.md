# MindSpore Installation Guide

This document describes how to quickly install MindSpore on a CPU environment.

<!-- TOC -->

- [MindSpore Installation Guide](#mindspore-installation-guide)
    - [Environment Requirements](#environment-requirements)
        - [System Requirements and Software Dependencies](#system-requirements-and-software-dependencies)
        - [(Optional) Installing Conda](#optional-installing-conda)
    - [Installation Guide](#installation-guide)
        - [Installing Using Executable Files](#installing-using-executable-files)
        - [Installing Using the Source Code](#installing-using-the-source-code)
- [Installing MindArmour](#installing-mindarmour)

<!-- /TOC -->

## Environment Requirements

### System Requirements and Software Dependencies

| Version | Operating System | Executable File Installation Dependencies | Source Code Compilation and Installation Dependencies |
| ---- | :--- | :--- | :--- |
| MindSpore 0.1.0-alpha | Ubuntu 16.04 or later x86_64 | - [Python](https://www.python.org/downloads/) 3.7.5 <br> - For details about other dependency items, see [requirements.txt](https://gitee.com/mindspore/mindspore/blob/r0.1/requirements.txt). | **Compilation dependencies:**<br> - [Python](https://www.python.org/downloads/) 3.7.5 <br> - [wheel](https://pypi.org/project/wheel/) >= 0.32.0 <br> - [GCC](https://gcc.gnu.org/releases.html) 7.3.0 <br> - [CMake](https://cmake.org/download/) >= 3.14.1 <br> - [patch](http://ftp.gnu.org/gnu/patch/) >= 2.5 <br> - [Autoconf](https://www.gnu.org/software/autoconf) >= 2.64 <br> - [Libtool](https://www.gnu.org/software/libtool) >= 2.4.6 <br> - [Automake](https://www.gnu.org/software/automake) >= 1.15.1 <br> **Installation dependencies:**<br> same as the executable file installation dependencies. |

- When Ubuntu version is 18.04, GCC 7.3.0 can be installed by using apt command.
- When the network is connected, dependency items in the requirements.txt file are automatically downloaded during .whl package installation. In other cases, you need to manually install dependency items.

### (Optional) Installing Conda

1. Download the Conda installation package from the following path:

   - [X86 Anaconda](https://www.anaconda.com/distribution/) or [X86 Miniconda](https://docs.conda.io/en/latest/miniconda.html)

2. Create and activate the Python environment.

    ```bash
    conda create -n {your_env_name} python=3.7.5
    conda activate {your_env_name}
    ```

> Conda is a powerful Python environment management tool. It is recommended that a beginner read related information on the Internet first.

## Installation Guide

### Installing Using Executable Files

1. Download the .whl package from the [MindSpore website](https://www.mindspore.cn/versions/en). It is recommended to perform SHA-256 integrity verification first and run the following command to install MindSpore:

    ```bash
    pip install mindspore-{version}-cp37-cp37m-linux_{arch}.whl
    ```

2. Run the following command. If no loading error message such as `No module named 'mindspore'` is displayed, the installation is successful.

    ```bash
    python -c 'import mindspore'
    ```

### Installing Using the Source Code

1. Download the source code from the code repository.

    ```bash
    git clone https://gitee.com/mindspore/mindspore.git -b r0.1
    ```
	
2. Run the following command in the root directory of the source code to compile MindSpore:

    ```bash
    bash build.sh -e cpu -z -j4
    ```
    > - Before running the preceding command, ensure that the paths where the executable files cmake and patch store have been added to the environment variable PATH.
    > - In the build.sh script, the git clone command will be executed to obtain the code in the third-party dependency database. Ensure that the network settings of Git are correct.
    > - If the compiler performance is strong, you can add -j{Number of threads} in to script to increase the number of threads. For example, `bash build.sh -e cpu -z -j12`.

3. Run the following command to install MindSpore:

    ```bash
    chmod +x build/package/mindspore-{version}-cp37-cp37m-linux_{arch}.whl
    pip install build/package/mindspore-{version}-cp37-cp37m-linux_{arch}.whl
    ```

4. Run the following command. If no loading error message such as `No module named 'mindspore'` is displayed, the installation is successful.

    ```bash
    python -c 'import mindspore'
    ```
# Installing MindArmour

If you need to conduct AI model security research or enhance the security of the model in you applications, you can install MindArmour.

## Environment Requirements

### System Requirements and Software Dependencies

| Version | Operating System | Executable File Installation Dependencies | Source Code Compilation and Installation Dependencies |
| ---- | :--- | :--- | :--- |
| MindArmour 0.1.0-alpha | Ubuntu 16.04 or later x86_64 | - [Python](https://www.python.org/downloads/) 3.7.5 <br> - MindSpore 0.1.0-alpha <br> - For details about other dependency items, see [setup.py](https://gitee.com/mindspore/mindarmour/blob/r0.1/setup.py). | Same as the executable file installation dependencies. |

- When the network is connected, dependency items in the setup.py file are automatically downloaded during .whl package installation. In other cases, you need to manually install dependency items.

## Installation Guide

### Installing Using Executable Files

1. Download the .whl package from the [MindSpore website](https://www.mindspore.cn/versions/en). It is recommended to perform SHA-256 integrity verification first and run the following command to install MindArmour:

   ```bash
   pip install mindarmour-{version}-cp37-cp37m-linux_{arch}.whl
   ```

2. Run the following command. If no loading error message such as `No module named 'mindarmour'` is displayed, the installation is successful.

   ```bash
   python -c 'import mindarmour'
   ```

### Installing Using the Source Code

1. Download the source code from the code repository.

   ```bash
   git clone https://gitee.com/mindspore/mindarmour.git -b r0.1
   ```

2. Run the following command in the root directory of the source code to compile and install MindArmour:

   ```bash
   cd mindarmour
   python setup.py install
   ```


3. Run the following command. If no loading error message such as `No module named 'mindarmour'` is displayed, the installation is successful.

   ```bash
   python -c 'import mindarmour'
   ```

