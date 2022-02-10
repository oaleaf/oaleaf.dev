#!/usr/bin/env bash
rm -rf site_build
npm run build
cp -r build site_build
cd site_build
git init
git branch -M cf-pages
git add -A
git commit -S -a -m 'Pages' || exit $?
git remote add origin git@github.com:oaleaf/oaleaf.dev
git push origin cf-pages -f || exit $?
cd ..
rm -rf site_build
