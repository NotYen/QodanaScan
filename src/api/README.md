## How to run service

### npm install

```
npm install
```

### ~~export GOOGLE_CLOUD_PROJECT=xxxxx GCLOUD_STORAGE_BUCKET=xxxxx~~

~~for local or dev or  staging~~

```shell
export GOOGLE_CLOUD_PROJECT=ethan-387206 GCLOUD_STORAGE_BUCKET=staging.ethan-387206.appspot.com
```

~~for prod~~

### 添加創建帳號時限制住的帳號

目前產生 1000 組帳號提供

```
src/api/devops/mmh_id.json
```

執行同資料夾的 `gen_id.js` 可以生成該檔案

```
node gen_id.js
```

在 mongoDB 建立 `mmh_id` 的 collection 再 import `mmh_id.json` 進去

### nginx

設定添加該參數以符合上傳大檔案

```
client_max_body_size 500M;
```

### add .env file

dev .env

```shell
TOKEN_KEY=mmh
GOOGLE_CLOUD_PROJECT=ethan-387206
GCLOUD_STORAGE_BUCKET=staging.ethan-387206.appspot.com
MONGODB_HOST=mongodb+srv://kid-ai-database.oyxus9y.mongodb.net
MONGODB_DATABASE=kid-ai-database
MONGODB_USER=mmh-ai-db-admin
MONGODB_PASSWORD=p3Ft0u6PTUSnq6fJ
```

.env

```shell
TOKEN_KEY=mmh
GOOGLE_CLOUD_PROJECT=ethan-387206
GCLOUD_STORAGE_BUCKET=staging.ethan-387206.appspot.com
MONGODB_HOST=mongodb+srv://root:<password>@cluster-mmh.xdh8qjs.mongodb.net/?retryWrites=true&w=majority
MONGODB_DATABASE=
MONGODB_USER=root
MONGODB_PASSWORD=ywSBBhKvuNhzxD9p
```

之後會建立 .env.local 和 .env.prod(TODO)

也可以參考裡面的設定

### npm start

```shell
npm start
```

localhost:3000

### 建立帳密

建立一組預設的帳密(現在有限制新建帳號要是 mmh_id 有的) 除非多帶 verify=false

```
curl --location 'http://localhost:3000/api/user/create' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username=mmh-admin' \
--data-urlencode 'password=mmh-123' \
--data-urlencode 'verify=false'
```

## api

- [x] POST: /api/user/login
- [x] POST: /api/user/create
- [x] POST: /api/user/update
- [x] GET: /api/user/case
- [x] POST: /api/users/case
- [x] GET: /api/result
- [x] POST: /api/result
- ~~[ ] GET: /api/file/upload-form (view)~~
- [x] POST: /api/file/upload
- [x] POST: /api/file/upload/avatar

### POST /api/result (TODO)

request body

```shell
case_id: <string>
question: <string>
answer: <string>
spend_time: <number>
more: <string>
```

response

```json
  "<question>": {
    "answer": "",
    "spend_time": "",
    "more": "",
    "created_at": ""
  }
```

`<question>` 是 POST 傳過來的題目號

**api 注意事項**

先確認有沒有這個 results collection 有沒有對應的 user_id 和 case_id

沒有就建立新的, 有的話就更新對應 user_id 和 case_id 的 results 中的內容

```
"<question>": {
    answer: "",
    spend_time: "",
    more: "",
    created_at: ""
  }
```

## MonoDB collection

connect config

```shell
src/api/config/mongodb.js
```

### users collection

```
id: "",
name: "",
created_at: "",
token: "",
cases: [{

}]
```

### results collection

```
id:: "",
user_id: "",
case_id: "",
created_at: "",
results: {
  "<question>": {
    answer: "",
    spend_time: "",
    more: "",
    created_at: ""
  }
}
```

## Note

大多的 api 都需要登入

先使用 `http://localhost:3000/api/user/login` 登入帳號密碼拿 token

curl 範例

```shell
curl --location 'http://localhost:3000/api/user/login' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username=ted' \
--data-urlencode 'password=zaq12345'
```

沒有帳號的話使用 `http://localhost:3000/api/user/create`

後續需要登入的 api 都在 header 添加 `x-access-token` 帶入 token

```shell
curl --location 'http://localhost:3000/api/user/create' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username=test' \
--data-urlencode 'password=123454321' \
--data-urlencode 'verify=false'
```

curl 範例

```shell
curl --location 'http://localhost:3000/api/user/case' \
--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ3ODFlY2QxOTkxY2FmODcwNjYwMGRkIiwidXNlcm5hbWUiOiJ0ZWQiLCJpYXQiOjE2ODU1OTQ0NjgsImV4cCI6MTY4NjE5OTI2OH0.l3NoXpFTsHT1_WCu9dCMMJk5z8Z76ZwuzziFWhwNeic'
```
