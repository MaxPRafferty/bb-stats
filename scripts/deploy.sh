#!/usr/bin/env bash

rm -rf docs
cp -aR build docs
./scripts/clean-path.sh
