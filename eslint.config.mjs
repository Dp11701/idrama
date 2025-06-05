image: node:20

stages:
  - build

build:
  stage: build
  script: [
    'node -v',
    'npm ci',
    'npm run build'
  ]

