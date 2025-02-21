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

# project

## GET categories

GET /project/categories

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    "string"
  ]
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
|» data|[string]|true|none||none|

## GET getAll

GET /project/getAll

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "id": 0,
      "projectName": "string",
      "projectNumber": "string",
      "category": "string",
      "contactPerson": "string",
      "contactInfo": "string",
      "initiationDate": "string",
      "projectDescription": "string",
      "projectKeywords": "string",
      "createdAt": "string",
      "isAiGenerated": true
    }
  ]
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
|» data|[object]|true|none||none|
|»» id|integer|true|none||none|
|»» projectName|string|true|none||none|
|»» projectNumber|string|true|none||none|
|»» category|string|true|none||none|
|»» contactPerson|string|true|none||none|
|»» contactInfo|string|true|none||none|
|»» initiationDate|string|true|none||none|
|»» projectDescription|string|true|none||none|
|»» projectKeywords|string|true|none||none|
|»» createdAt|string|true|none||none|
|»» isAiGenerated|boolean|true|none||none|

## POST create

POST /project/create

> Body 请求参数

```json
{
  "projectName": "asd",
  "projectNumber": "asafaaa",
  "category": "asdaa",
  "contactPerson": "a",
  "contactInfo": "b",
  "projectDescription": "c",
  "projectKeywords": "hh",
  "isAiGenerated": false
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
  "data": true
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
|» data|boolean|true|none||none|

## POST update

POST /project/update

> Body 请求参数

```json
{
  "id": 11,
  "projectDescription": "zzzzzzzzzzzzzz"
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
  "data": null
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
|» data|null|true|none||none|

## POST import

POST /project/import

> Body 请求参数

```yaml
file: ""

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» file|body|string(binary)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET search

GET /project/search

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|keyword|query|string| 是 |none|
|category|query|string| 是 |none|
|isAi|query|string| 是 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "id": 0,
      "projectName": "string",
      "projectNumber": "string",
      "category": "string",
      "contactPerson": "string",
      "contactInfo": "string",
      "initiationDate": "string",
      "projectDescription": "string",
      "projectKeywords": "string",
      "createdAt": "string",
      "isAiGenerated": true
    }
  ]
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
|» data|[object]|true|none||none|
|»» id|integer|true|none||none|
|»» projectName|string|true|none||none|
|»» projectNumber|string|true|none||none|
|»» category|string|true|none||none|
|»» contactPerson|string|true|none||none|
|»» contactInfo|string|true|none||none|
|»» initiationDate|string|true|none||none|
|»» projectDescription|string|true|none||none|
|»» projectKeywords|string|true|none||none|
|»» createdAt|string|true|none||none|
|»» isAiGenerated|boolean|true|none||none|

## POST generate

POST /project/generate

> Body 请求参数

```json
{
  "keyword": "",
  "numProjects": 2
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET template

GET /project/template

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

