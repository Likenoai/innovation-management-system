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

# staff

## GET getStudents

GET /staff/getStudents

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|SC-TOKEN|header|string| 否 |none|

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
        "name": "string",
        "studentId": "string",
        "college": "string",
        "majorName": "string",
        "grade": "string",
        "educationLevel": "string",
        "className": "string",
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
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» studentId|string|true|none||none|
|»»» college|string|true|none||none|
|»»» majorName|string|true|none||none|
|»»» grade|string|true|none||none|
|»»» educationLevel|string|true|none||none|
|»»» className|string|true|none||none|
|»»» createTime|string|true|none||none|
|»»» updateTime|string|true|none||none|
|»» total|integer|true|none||none|

## GET getTeachers

GET /staff/getTeachers

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|SC-TOKEN|header|string| 否 |none|

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
        "personnelCode": "string",
        "name": "string",
        "gender": "string",
        "birthDate": "string",
        "currentUnit": "string",
        "ethnicity": "string",
        "professionalTitle": "string",
        "rankLevel": "string",
        "highestEducation": "string",
        "highestDegree": "string",
        "arrivalDate": "string",
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
|»»» personnelCode|string|false|none||none|
|»»» name|string|false|none||none|
|»»» gender|string|false|none||none|
|»»» birthDate|string|false|none||none|
|»»» currentUnit|string|false|none||none|
|»»» ethnicity|string|false|none||none|
|»»» professionalTitle|string|false|none||none|
|»»» rankLevel|string|false|none||none|
|»»» highestEducation|string|false|none||none|
|»»» highestDegree|string|false|none||none|
|»»» arrivalDate|string|false|none||none|
|»»» createTime|string|false|none||none|
|»»» updateTime|string|false|none||none|
|»» total|integer|true|none||none|

## GET getExperts

GET /staff/getExperts

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|SC-TOKEN|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "recordList": [
      "string"
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
|»» recordList|[string]|true|none||none|
|»» total|integer|true|none||none|

# 数据模型

