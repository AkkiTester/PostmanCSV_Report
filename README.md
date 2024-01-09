<a href="https://www.postman.com/"><img src="https://assets.getpostman.com/common-share/postman-logo-horizontal-320x132.png" /></a><br />
# Newman Reporter CSV 

Simple CSV Reporter Akash Dilwale
 
## About

The outputted CSV file with the following Table:

| iteration | collectionName     | requestName        | testCaseName                           | url                              | status | code | responseTime | result | assertionErrorMessage               |
| --------- | ------------------ | ------------------ | -------------------------------------- | -------------------------------- | ------ | ---- | ------------ | ------ | ----------------------------------- |
| 1         | Api_Excel_O/p_Prod | GetUser-Iterations | Id: 1 Response time is less than 200ms | https://reqres.in/api/users/1    | OK     | 200  | 781          | Fail   | expected 781 to be below 200        |
| 1         | Api_Excel_O/p_Prod | GetUser-Iterations | Id: 1 Status code is 200               | https://reqres.in/api/users/1    | OK     | 200  | 781          | Pass   |                                     |
| 1         | Api_Excel_O/p_Prod | GetUser-Iterations | George First name Checking             | https://reqres.in/api/users/1    | OK     | 200  | 781          | Pass   |                                     |
| 1         | Api_Excel_O/p_Prod | GoogleApi          | 1Status code is 200                    | https://script.google.com/       | OK     | 200  | 3075         | Pass   |                                     |
| 1         | Api_Excel_O/p_Prod | GoogleApi          | 1Response time is less than 200ms      | https://script.google.com/       | OK     | 200  | 3075         | Fail   | expected 3075 to be below 200       |
| 2         | Api_Excel_O/p_Prod | GetUser-Iterations | Id: 7 Response time is less than 200ms | https://reqres.in/api/users/7    | OK     | 200  | 156          | Pass   |                                     |
| 2         | Api_Excel_O/p_Prod | GetUser-Iterations | Id: 7 Status code is 200               | https://reqres.in/api/users/7    | OK     | 200  | 156          | Pass   |                                     |
| 2         | Api_Excel_O/p_Prod | GetUser-Iterations | Akash First name Checking              | https://reqres.in/api/users/7    | OK     | 200  | 156          | Fail   | expected 'Michael' to equal 'Akash' |
| 2         | Api_Excel_O/p_Prod | GoogleApi          | 7Status code is 200                    | https://script.google.com/       | OK     | 200  | 2446         | Pass   |                                     |
| 2         | Api_Excel_O/p_Prod | GoogleApi          | 7Response time is less than 200ms      | https://script.google.com/       | OK     | 200  | 2446         | Fail   | expected 2446 to be below 200       |



## Install this package:

```console
npm install newman-reporter-csvsimple
```
## For Force 
```console
npm install newman-reporter-csvsimple --force

```

## For npm ERR! code ERESOLVE 
```console
npm install newman-reporter-csvsimple --legacy

```
OR
```console
npm install newman-reporter-csvsimple --legacy-peer-deps

```

## Usage
You can then use the `-r csvsimple` option to make Newman use the CSV Simple reporter.

```console
node_modules/.bin/newman run postman_collection.json -e postman_environment.json -r csvsimple
```

## Options

| CLI Option | Description |
| ------ | ------ |
| --reporter-csvsimple-export <path> | Specify a path where the output CSV file will be written to disk. If not specified, the file will be written to `newman/` in the current working directory. |
| --reporter-csvsimple-includeBody | If you wish to save the response body for each request, use this option. |

```console
node_modules/.bin/newman run postman_collection.json -e postman_environment.json -r csvsimple --reporter-csvsimple-includeBody
```
