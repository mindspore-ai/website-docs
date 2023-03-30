FROM ubuntu:22.04

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
    && apt clean


# Install rtd themes and update the config file
RUN pip install -U sphinx_rtd_theme \
    && pip install --upgrade pip \
    && pip install requests \
    && pip install sphinx \
    && pip install gitpython \
    && pip install lxml \
    && pip install -U bs4 \
    && pip install -U sphinx \
    && pip install -U grpcio \
    && pip install -U easydict \
    && pip install jinja2==3.0.3 \
    && pip install nbsphinx \
    && pip install IPython \
    && pip install setuptools==65.5.0 \
    && pip install gitpython \
    && pip install lxml

ENV VERSION VERSION
ENV WGETDIR WGETDIR
ENV RELEASE_URL=RELEASE_URL

COPY . /root/build-docs
RUN cd /root/build-docs \
    && chmod 777 -R push.sh

WORKDIR /root/build-docs
CMD ./push.sh