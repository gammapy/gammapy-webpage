#!/usr/bin/env python
"""Make the gammapy.org static webpage.

This is very much work in progress.
Probably we should add a static website build step.
"""
import logging
import json
import os
from pathlib import Path
import click

log = logging.getLogger(__name__)

GAMMAPY_DATA = Path(os.environ["GAMMAPY_DATA"])


class Dataset:
    """Dataset base class.

    A dataset has a name, which is the local folder name.
    It also has a description and list of files,
    where each file has a given remove URL (TODO: and MD5 checksum and file size).

    If you want to add a dataset, make a new class and add it to the list below.
    """

    _url = "https://github.com/gammapy/gammapy-extra/raw/master/datasets"

    @property
    def record(self):
        return {
            "name": self.name,
            "description": self.description,
            "files": list(self.files),
        }

    @property
    def files(self):
        for path in (GAMMAPY_DATA / self.name).glob("**/*.*"):
            urlpath = path.as_posix().replace(GAMMAPY_DATA.as_posix(), "")
            yield {"path": urlpath[1:], "url": self._url + urlpath}


class DatasetCTA1DC(Dataset):
    name = "cta-1dc"
    description = "tbd"


class DatasetDarkMatter(Dataset):
    name = "dark_matter_spectra"
    description = "tbd"


class DatasetCatalogFermi(Dataset):
    name = "catalogs/fermi"
    description = "tbd"


class DatasetFermi2FHL(Dataset):
    name = "fermi_2fhl"
    description = "tbd"


class DatasetFermi3FHL(Dataset):
    name = "fermi_3fhl"
    description = "tbd"


class DatasetFermiSurvey(Dataset):
    name = "fermi_survey"
    description = "tbd"


class DatasetHESSDL3DR1(Dataset):
    name = "hess-dl3-dr1"
    description = "tbd"


class DatasetImages(Dataset):
    name = "images"
    description = "tbd"


class DatasetJointCrab(Dataset):
    name = "joint-crab"
    description = "tbd"


class DatasetIndex:
    path = "download/data/gammapy-data-index.json"
    datasets = [
        DatasetCTA1DC,
        DatasetDarkMatter,
        DatasetCatalogFermi,
        DatasetFermi3FHL,
        DatasetFermi2FHL,
        DatasetFermiSurvey,
        DatasetHESSDL3DR1,
        DatasetImages,
        DatasetJointCrab
    ]

    def make(self):
        records = list(self.make_records())
        txt = json.dumps(records, indent=True)
        log.info(f"Writing {self.path}")
        Path(self.path).write_text(txt)

    def make_records(self):
        for cls in self.datasets:
            yield cls().record


@click.group()
def cli():
    """Make the gammapy.org webpage."""
    logging.basicConfig(level="INFO")


@cli.command("all")
@click.pass_context
def cli_all(ctx):
    """Run all steps"""
    ctx.invoke(cli_dataset_index)


@cli.command("dataset-index")
def cli_dataset_index():
    """Generate data index file"""
    DatasetIndex().make()


if __name__ == "__main__":
    cli()
