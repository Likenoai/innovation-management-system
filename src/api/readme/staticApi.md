---
title: SCManager
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.28"

---

# SCManager

Base URLs:

# Authentication

# static

## GET getDataByKey

GET /static/getDataByKey

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|key|query|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|string|true|none||none|

## GET getDataPage

GET /static/getDataPage

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|pageNum|query|string| 否 |none|
|pageSize|query|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "recordList": [
      {
        "id": 0,
        "codeName": "string",
        "codeKey": "string",
        "codeValue": "string",
        "codeDesc": "string",
        "createTime": "string",
        "updateTime": "string"
      }
    ],
    "total": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» recordList|[object]|true|none||none|
|»»» id|integer|false|none||none|
|»»» codeName|string|false|none||none|
|»»» codeKey|string|false|none||none|
|»»» codeValue|string|false|none||none|
|»»» codeDesc|string|false|none||none|
|»»» createTime|string|false|none||none|
|»»» updateTime|string|false|none||none|
|»» total|integer|true|none||none|

## POST addData

POST /static/addData

> Body 请求参数

```json
{
  "codeName": "afa",
  "codeKey": "testKey",
  "codeValue": "testValue",
  "codeDesc": "测试"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|string|true|none||none|

## POST updateData

POST /static/updateData

> Body 请求参数

```json
{
  "id": "2",
  "codeKey": "testKey",
  "codeValue": "111111111"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|string|true|none||none|

# 数据模型

