# This is the Dockerfile to run Gammapy on Binder.
#

FROM continuumio/miniconda3:4.12.0
MAINTAINER Gammapy developers <gammapy@googlegroups.com>

# compilers
RUN apt-get --allow-releaseinfo-change update
RUN apt install -y curl
RUN apt install -y gcc

# install dependencies - including the stable version of Gammapy
COPY binder.py tmp/
RUN curl -o tmp/environment.yml https://raw.githubusercontent.com/gammapy/gammapy/master/environment-dev.yml

WORKDIR tmp/
RUN conda update conda
RUN conda install -c conda-forge mamba
RUN mamba install -q -y pyyaml pip
RUN python binder.py

# add gammapy user running the jupyter notebook process
ENV NB_USER gammapy
ENV NB_UID 1000
ENV HOME /home/${NB_USER}

RUN adduser --disabled-password \
    --gecos "Default user" \
    --uid ${NB_UID} \
    ${NB_USER}

# only for dev version, comment out for normal stable versions
RUN python -m pip install --no-cache-dir git+https://github.com/gammapy/gammapy.git#egg=gammapy

# download tutorials and datasets
RUN python -m gammapy download notebooks --out=${HOME}/notebooks
RUN python -m gammapy download datasets --out=${HOME}/datasets

# setting ownerships
USER root
RUN chown -R gammapy:gammapy ${HOME}

# start JupyterLab server in tutorials dir
USER ${NB_USER}
WORKDIR ${HOME}

# env vars used in tutorials
ENV GAMMAPY_DATA ${HOME}/datasets/dev
