# dpa-collaboration-poc

Based on https://aws-amplify.github.io/docs/js/start?platform=vue

## Project setup
Install Amplify CLI (see https://aws-amplify.github.io/docs/, also linked in the tutorial above)
```
yarn install
amplify init
    * Use existing environment: yes, choose "test"
    * Use AWS profile: yes, choose "amplify-collaboration-poc" (must be in .aws/credentials)
then check with
amplify status (you should see "dpacollaborationpoc"
```
Then you can run it locally with
```
yarn serve
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
