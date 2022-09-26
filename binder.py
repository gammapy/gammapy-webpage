"""Install code on Binder.

This script is executed from Dockerfile configuration file
It installs software dependencies declared in environment.yml
in the docker container built for the Binder service.
"""
import yaml
import conda.cli
import subprocess
import sys

with open("environment.yml") as stream:
    content = yaml.safe_load(stream)

for chan in content['channels']:
    print("RUN mamba config --add channels {}".format(chan))
    conda.cli.main('mamba', 'config',  '--add', 'channels', chan)

for pack in content['dependencies']:
    if isinstance(pack, str):
        print("RUN mamba install -q -y {}".format(pack))
        conda.cli.main('conda', 'install',  '-y', '-q', pack)
    else:
        print("RUN pip install {}".format(pack['pip'][0]))
        subprocess.call([sys.executable, "-m", "pip", "install", "--no-cache-dir", pack['pip'][0]])

# install development version using pip
if "gammapy" not in content['dependencies']:
    print("RUN pip install gammapy dev")
    subprocess.call([sys.executable, "-m", "pip", "install", "--no-cache-dir", "git+https://github.com/gammapy/gammapy.git#egg=gammapy"])
