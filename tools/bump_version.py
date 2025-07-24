import argparse
import re
from pathlib import Path

VERSION_FILE = Path('app/__init__.py')
VERSION_PATTERN = r'__version__\s*=\s*"(\d+)\.(\d+)\.(\d+)"'


def read_version():
    text = VERSION_FILE.read_text()
    m = re.search(VERSION_PATTERN, text)
    if not m:
        raise ValueError('Version string not found')
    return [int(n) for n in m.groups()]


def write_version(major, minor, patch):
    text = VERSION_FILE.read_text()
    new_version = f'__version__ = "{major}.{minor}.{patch}"'
    text = re.sub(VERSION_PATTERN, new_version, text)
    VERSION_FILE.write_text(text)
    print(new_version)


def main():
    parser = argparse.ArgumentParser(description='Bump project version.')
    group = parser.add_mutually_exclusive_group()
    group.add_argument('--major', action='store_true')
    group.add_argument('--minor', action='store_true')
    group.add_argument('--patch', action='store_true')
    args = parser.parse_args()

    major, minor, patch = read_version()

    if args.major:
        major += 1
        minor = 0
        patch = 0
    elif args.minor:
        minor += 1
        patch = 0
    else:
        patch += 1

    write_version(major, minor, patch)


if __name__ == '__main__':
    main()

