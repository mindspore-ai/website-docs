FROM ubuntu:22.04


ENV TZ=Asia/Shanghai \
    DEBIAN_FRONTEND=noninteractive

RUN apt update \
    && apt install -y tzdata \
    && ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone \
    && dpkg-reconfigure --frontend noninteractive tzdata \
    && rm -rf /var/lib/apt/lists/*

# Install tools
RUN apt update \
        && apt install -y wget curl git subversion

# Install python, pip and doxygen
RUN apt install -y software-properties-common \
    && add-apt-repository ppa:deadsnakes/ppa \
    && apt update -y \
    && apt install -y python3.7 python3.7-dev python3-distutils \
    && rm /usr/bin/python3 \
    && ln -s /usr/bin/python3.7 /usr/bin/python3 \
    && ln -s /usr/bin/python3.7 /usr/bin/python \
    && apt install -y python3-pip \
    && apt-get install -y python3.7-distutils \
    && apt-get install -y libgl1 \
    && apt install -y doxygen \
    && apt install -y pandoc \
    && apt install -y libgmp-dev \
    && apt clean


# Install rtd themes and update the config file
RUN pip install sphinx_rtd_theme==1.0.0 \
    && pip install --upgrade pip \
    && pip install requests \
    && pip install sphinx==4.4.0 \
    && pip install gitpython \
    && pip install lxml \
    && pip install -U bs4 \
    && pip install -U grpcio \
    && pip install -U easydict \
    && pip install jinja2==3.0.3 \
    && pip install nbsphinx \
    && pip install IPython \
    && pip install setuptools==65.5.0 \
    && pip install gitpython \
    && pip install lxml \
    && pip install protobuf==3.20.1 \
    && pip install astor

ENV VERSION=VERSION
ENV WGETDIR=WGETDIR
ENV RELEASE_URL=RELEASE_URL
ENV DO_BUILD=DO_BUILD
ENV REPLACE_BUILD=REPLACE_BUILD
ENV TARGET_BRANCH=TARGET_BRANCH
ENV SINGLE_GENERATE=SINGLE_GENERATE


RUN mkdir -p /root/workspace \
    && cd /root/workspace \
    && git clone https://gitee.com/mindspore/docs.git -b "${VERSION}" \
    && git clone https://${GIT_USERNAME}:${GIT_PASSWORD}@gitee.com/mindspore/website-docs.git -b "${TARGET_BRANCH:-master}" \
    && git clone https://${GIT_USERNAME}:${GIT_PASSWORD}@gitee.com/gemini524/website-log.git 

COPY . /root/build-docs
RUN cd /root/build-docs \
    && chmod 777 -R push.sh

WORKDIR /root/build-docs
RUN mkdir /log
CMD ./push.sh 2>&1 | tee /log/"$(date +%Y-%m-%d_%H:%M:%S)".log