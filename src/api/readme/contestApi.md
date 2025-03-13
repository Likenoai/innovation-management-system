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

# contest

## POST applyProject

POST /contest/applyProject

项目注册

> Body 请求参数

```json
{
  "projectDetail": {
    "projectType": "科研项目",
    "projectCategory": "信息安全",
    "keyField": "网络安全",
    "projectName": "网络安全研究",
    "projectLevel": "国家级",
    "primaryDiscipline": "计算机科学与技术",
    "secondaryDiscipline": "信息安全",
    "requestedFunding": 500000,
    "approvedFunding": 450000,
    "projectDuration": 24,
    "projectDescription": "本项目致力于提升网络安全技术的研究与应用。",
    "sourceName": "国家科技基金",
    "approvalTime": "2025-03-01T10:00:00",
    "dutyName": "王小明",
    "dutySex": 1,
    "dutyNation": "汉族",
    "dutyBirth": "2000-05-15",
    "dutyId": "20231001",
    "dutyCollege": "计算机学院",
    "dutyRelation": "13800138000",
    "dutyExperience": "曾参与多项网络安全科研项目，并发表相关论文。",
    "enterpriseAdvisorName": "李总",
    "enterpriseAdvisorContact": "13912345678",
    "enterpriseAdvisorPosition": "某安全公司 CTO",
    "enterpriseAdvisorExperience": "多年从事信息安全行业，负责企业级安全系统设计。",
    "attachment": "proposal.pdf,design.docx"
  },
  "projectMembers": [
    {
      "studentId": "20231001",
      "mainWork": "后端开发"
    },
    {
      "studentId": "20231002",
      "mainWork": "前端开发"
    }
  ],
  "projectAdvisors": [
    {
      "name": "张教授",
      "personnelCode": "T1001",
      "college": "计算机学院",
      "position": "第一导师",
      "researchTopic": "网络安全攻防技术",
      "supportStatus": "提供实验设备支持",
      "suggestion": "加强对 AI 生成安全策略的研究"
    },
    {
      "name": "王教授",
      "personnelCode": "T1002",
      "college": "软件学院",
      "position": "第二导师",
      "researchTopic": "人工智能安全",
      "supportStatus": "提供科研指导",
      "suggestion": "建议引入更多 AI 训练数据"
    }
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|SC-TOKEN|header|string| 否 |none|
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

## GET getProjectDetails

GET /contest/getProjectDetails

通过登录角色判断，查和自己相关的所有项目

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
  "data": [
    {
      "id": 0,
      "projectId": "string",
      "projectType": "string",
      "projectCategory": "string",
      "keyField": "string",
      "projectName": "string",
      "projectLevel": "string",
      "primaryDiscipline": "string",
      "secondaryDiscipline": "string",
      "requestedFunding": 0,
      "approvedFunding": 0,
      "projectDuration": 0,
      "projectDescription": "string",
      "sourceName": "string",
      "approvalTime": "string",
      "dutyName": "string",
      "dutySex": 0,
      "dutyNation": "string",
      "dutyBirth": "string",
      "dutyId": "string",
      "dutyCollege": "string",
      "dutyRelation": "string",
      "dutyExperience": "string",
      "enterpriseAdvisorName": "string",
      "enterpriseAdvisorContact": "string",
      "enterpriseAdvisorPosition": "string",
      "enterpriseAdvisorExperience": "string",
      "attachment": "string",
      "createTime": "string",
      "updateTime": "string",
      "dutyFlag": null
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
|»» id|integer|false|none||none|
|»» projectId|string|false|none||none|
|»» projectType|string|false|none||none|
|»» projectCategory|string|false|none||none|
|»» keyField|string|false|none||none|
|»» projectName|string|false|none||none|
|»» projectLevel|string|false|none||none|
|»» primaryDiscipline|string|false|none||none|
|»» secondaryDiscipline|string|false|none||none|
|»» requestedFunding|integer|false|none||none|
|»» approvedFunding|integer|false|none||none|
|»» projectDuration|integer|false|none||none|
|»» projectDescription|string|false|none||none|
|»» sourceName|string|false|none||none|
|»» approvalTime|string|false|none||none|
|»» dutyName|string|false|none||none|
|»» dutySex|integer|false|none||none|
|»» dutyNation|string|false|none||none|
|»» dutyBirth|string|false|none||none|
|»» dutyId|string|false|none||none|
|»» dutyCollege|string|false|none||none|
|»» dutyRelation|string|false|none||none|
|»» dutyExperience|string|false|none||none|
|»» enterpriseAdvisorName|string|false|none||none|
|»» enterpriseAdvisorContact|string|false|none||none|
|»» enterpriseAdvisorPosition|string|false|none||none|
|»» enterpriseAdvisorExperience|string|false|none||none|
|»» attachment|string|false|none||none|
|»» createTime|string|false|none||none|
|»» updateTime|string|false|none||none|
|»» dutyFlag|null|false|none||none|

## GET advisorsByDetailId

GET /contest/advisorsByDetailId

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|detailId|query|string| 否 |none|
|SC-TOKEN|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "id": 0,
      "detailId": 0,
      "name": "string",
      "personnelCode": "string",
      "college": "string",
      "position": "string",
      "researchTopic": "string",
      "supportStatus": "string",
      "suggestion": "string",
      "createTime": "string",
      "updateTime": "string"
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
|»» detailId|integer|true|none||none|
|»» name|string|true|none||none|
|»» personnelCode|string|true|none||none|
|»» college|string|true|none||none|
|»» position|string|true|none||none|
|»» researchTopic|string|true|none||none|
|»» supportStatus|string|true|none||none|
|»» suggestion|string|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|

## GET membersByDetailId

GET /contest/membersByDetailId

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|detailId|query|string| 否 |none|
|SC-TOKEN|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "id": 0,
      "detailId": 0,
      "studentId": "string",
      "mainWork": "string",
      "createTime": "string",
      "updateTime": "string",
      "name": "string",
      "college": "string",
      "grade": "string",
      "educationLevel": "string"
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
|»» detailId|integer|true|none||none|
|»» studentId|string|true|none||none|
|»» mainWork|string|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|
|»» name|string|true|none||none|
|»» college|string|true|none||none|
|»» grade|string|true|none||none|
|»» educationLevel|string|true|none||none|

## GET versionByDetailId

GET /contest/versionByDetailId

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|detailId|query|string| 否 |none|
|SC-TOKEN|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "id": 0,
    "detailId": 0,
    "projectId": "string",
    "reviewStatus": 0,
    "reviewName": null,
    "reviewScore": null,
    "reviewOrder": null,
    "reviewDescribe": null,
    "createTime": "string",
    "updateTime": "string"
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
|»» id|integer|true|none||none|
|»» detailId|integer|true|none||none|
|»» projectId|string|true|none||none|
|»» reviewStatus|integer|true|none||none|
|»» reviewName|null|true|none||none|
|»» reviewScore|null|true|none||none|
|»» reviewOrder|null|true|none||none|
|»» reviewDescribe|null|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|

## POST updateDetail

POST /contest/updateDetail

> Body 请求参数

```json
{
  "id": 1,
  "projectType": "科研项目",
  "projectCategory": "信息安全new",
  "keyField": "网络安全更新"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|SC-TOKEN|header|string| 否 |none|
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

## POST advisorSuggestion

POST /contest/advisorSuggestion

> Body 请求参数

```json
{
  "detailId": 1,
  "suggestion": "建议建议"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|SC-TOKEN|header|string| 否 |none|
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

## POST review

POST /contest/review

管理员 推荐项目状态接口
reviewStatus评审状态             0--未评审 1--院级评审打回  2--已推荐校级  3--校级评审打回  4--已推荐省级  5--已推荐国家级  6--院级  7--校级  8--省级 9--国家级

> Body 请求参数

```json
{
  "projectId": "P20250001",
  "detailId": "1",
  "reviewStatus": "6",
  "reviewOrder": "1"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|SC-TOKEN|header|string| 否 |none|
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

## GET scoreProjectsByCollege

GET /contest/scoreProjectsByCollege

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|pageNum|query|integer| 否 |none|
|pageSize|query|integer| 否 |none|
|college|query|string| 否 |none|
|type|query|integer| 否 |0--院级打分  1--校级打分|
|status|query|integer| 否 |0--未打分 1--已打分|
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
        "projectId": "string",
        "projectType": "string",
        "projectCategory": "string",
        "keyField": "string",
        "projectName": "string",
        "projectLevel": "string",
        "primaryDiscipline": "string",
        "secondaryDiscipline": "string",
        "requestedFunding": 0,
        "approvedFunding": 0,
        "projectDuration": 0,
        "projectDescription": "string",
        "sourceName": "string",
        "approvalTime": "string",
        "dutyName": "string",
        "dutySex": 0,
        "dutyNation": "string",
        "dutyBirth": "string",
        "dutyId": "string",
        "dutyCollege": "string",
        "dutyRelation": "string",
        "dutyExperience": "string",
        "enterpriseAdvisorName": "string",
        "enterpriseAdvisorContact": "string",
        "enterpriseAdvisorPosition": "string",
        "enterpriseAdvisorExperience": "string",
        "attachment": "string",
        "createTime": "string",
        "updateTime": "string",
        "dutyFlag": null
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
|»»» projectId|string|false|none||none|
|»»» projectType|string|false|none||none|
|»»» projectCategory|string|false|none||none|
|»»» keyField|string|false|none||none|
|»»» projectName|string|false|none||none|
|»»» projectLevel|string|false|none||none|
|»»» primaryDiscipline|string|false|none||none|
|»»» secondaryDiscipline|string|false|none||none|
|»»» requestedFunding|integer|false|none||none|
|»»» approvedFunding|integer|false|none||none|
|»»» projectDuration|integer|false|none||none|
|»»» projectDescription|string|false|none||none|
|»»» sourceName|string|false|none||none|
|»»» approvalTime|string|false|none||none|
|»»» dutyName|string|false|none||none|
|»»» dutySex|integer|false|none||none|
|»»» dutyNation|string|false|none||none|
|»»» dutyBirth|string|false|none||none|
|»»» dutyId|string|false|none||none|
|»»» dutyCollege|string|false|none||none|
|»»» dutyRelation|string|false|none||none|
|»»» dutyExperience|string|false|none||none|
|»»» enterpriseAdvisorName|string|false|none||none|
|»»» enterpriseAdvisorContact|string|false|none||none|
|»»» enterpriseAdvisorPosition|string|false|none||none|
|»»» enterpriseAdvisorExperience|string|false|none||none|
|»»» attachment|string|false|none||none|
|»»» createTime|string|false|none||none|
|»»» updateTime|string|false|none||none|
|»»» dutyFlag|null|false|none||none|
|»» total|integer|true|none||none|

## POST giveScore

POST /contest/giveScore

    "reviewType":"1", //打分类型 0--院级打分  1--校级打分

> Body 请求参数

```json
"{\r\n    \"detailId\":1,\r\n    \"projectId\":\"P20250001\",\r\n    \"reviewType\":\"0\", //打分类型院 0--院级打分  1--校级打分\r\n    \"reviewScore\":20,\r\n    \"reviewDetail\":\"json\",\r\n    \"reviewDescribe\":\"院院院院院级意见\"\r\n}"
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|SC-TOKEN|header|string| 否 |none|
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

## POST assignToExpertScore

POST /contest/assignToExpertScore

学院管理员分配给院级专家未评审项目

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

## GET pendingScore

GET /contest/pendingScore

查看打分项目

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|pageNum|query|string| 否 |none|
|pageSize|query|string| 否 |none|
|type|query|string| 否 |none|
|status|query|string| 否 |none|
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
        "projectId": "string",
        "contestCode": null,
        "projectType": "string",
        "projectCategory": "string",
        "keyField": "string",
        "projectName": "string",
        "projectLevel": "string",
        "primaryDiscipline": "string",
        "secondaryDiscipline": "string",
        "requestedFunding": 0,
        "approvedFunding": 0,
        "projectDuration": 0,
        "projectDescription": "string",
        "sourceName": "string",
        "approvalTime": "string",
        "dutyName": "string",
        "dutySex": 0,
        "dutyNation": "string",
        "dutyBirth": "string",
        "dutyId": "string",
        "dutyCollege": "string",
        "dutyRelation": "string",
        "dutyExperience": "string",
        "enterpriseAdvisorName": "string",
        "enterpriseAdvisorContact": "string",
        "enterpriseAdvisorPosition": "string",
        "enterpriseAdvisorExperience": "string",
        "attachment": "string",
        "createTime": "string",
        "updateTime": "string",
        "dutyFlag": null
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
|»»» projectId|string|false|none||none|
|»»» contestCode|null|false|none||none|
|»»» projectType|string|false|none||none|
|»»» projectCategory|string|false|none||none|
|»»» keyField|string|false|none||none|
|»»» projectName|string|false|none||none|
|»»» projectLevel|string|false|none||none|
|»»» primaryDiscipline|string|false|none||none|
|»»» secondaryDiscipline|string|false|none||none|
|»»» requestedFunding|integer|false|none||none|
|»»» approvedFunding|integer|false|none||none|
|»»» projectDuration|integer|false|none||none|
|»»» projectDescription|string|false|none||none|
|»»» sourceName|string|false|none||none|
|»»» approvalTime|string|false|none||none|
|»»» dutyName|string|false|none||none|
|»»» dutySex|integer|false|none||none|
|»»» dutyNation|string|false|none||none|
|»»» dutyBirth|string|false|none||none|
|»»» dutyId|string|false|none||none|
|»»» dutyCollege|string|false|none||none|
|»»» dutyRelation|string|false|none||none|
|»»» dutyExperience|string|false|none||none|
|»»» enterpriseAdvisorName|string|false|none||none|
|»»» enterpriseAdvisorContact|string|false|none||none|
|»»» enterpriseAdvisorPosition|string|false|none||none|
|»»» enterpriseAdvisorExperience|string|false|none||none|
|»»» attachment|string|false|none||none|
|»»» createTime|string|false|none||none|
|»»» updateTime|string|false|none||none|
|»»» dutyFlag|null|false|none||none|
|»» total|integer|true|none||none|

## GET getProjectsByCollege

GET /contest/getProjectsByCollege

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|college|query|string| 否 |none|
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
        "projectId": "string",
        "contestCode": null,
        "projectType": "string",
        "projectCategory": "string",
        "keyField": "string",
        "projectName": "string",
        "projectLevel": "string",
        "primaryDiscipline": "string",
        "secondaryDiscipline": "string",
        "requestedFunding": 0,
        "approvedFunding": 0,
        "projectDuration": 0,
        "projectDescription": "string",
        "sourceName": "string",
        "approvalTime": "string",
        "dutyName": "string",
        "dutySex": 0,
        "dutyNation": "string",
        "dutyBirth": "string",
        "dutyId": "string",
        "dutyCollege": "string",
        "dutyRelation": "string",
        "dutyExperience": "string",
        "enterpriseAdvisorName": "string",
        "enterpriseAdvisorContact": "string",
        "enterpriseAdvisorPosition": "string",
        "enterpriseAdvisorExperience": "string",
        "attachment": "string",
        "createTime": "string",
        "updateTime": "string",
        "dutyFlag": null
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
|»»» projectId|string|false|none||none|
|»»» contestCode|null|false|none||none|
|»»» projectType|string|false|none||none|
|»»» projectCategory|string|false|none||none|
|»»» keyField|string|false|none||none|
|»»» projectName|string|false|none||none|
|»»» projectLevel|string|false|none||none|
|»»» primaryDiscipline|string|false|none||none|
|»»» secondaryDiscipline|string|false|none||none|
|»»» requestedFunding|integer|false|none||none|
|»»» approvedFunding|integer|false|none||none|
|»»» projectDuration|integer|false|none||none|
|»»» projectDescription|string|false|none||none|
|»»» sourceName|string|false|none||none|
|»»» approvalTime|string|false|none||none|
|»»» dutyName|string|false|none||none|
|»»» dutySex|integer|false|none||none|
|»»» dutyNation|string|false|none||none|
|»»» dutyBirth|string|false|none||none|
|»»» dutyId|string|false|none||none|
|»»» dutyCollege|string|false|none||none|
|»»» dutyRelation|string|false|none||none|
|»»» dutyExperience|string|false|none||none|
|»»» enterpriseAdvisorName|string|false|none||none|
|»»» enterpriseAdvisorContact|string|false|none||none|
|»»» enterpriseAdvisorPosition|string|false|none||none|
|»»» enterpriseAdvisorExperience|string|false|none||none|
|»»» attachment|string|false|none||none|
|»»» createTime|string|false|none||none|
|»»» updateTime|string|false|none||none|
|»»» dutyFlag|null|false|none||none|
|»» total|integer|true|none||none|

## GET getProject

GET /contest/getProject/1

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
    "projectDetail": {
      "id": 0,
      "projectId": "string",
      "contestCode": null,
      "projectType": "string",
      "projectCategory": "string",
      "keyField": "string",
      "projectName": "string",
      "projectLevel": "string",
      "primaryDiscipline": "string",
      "secondaryDiscipline": "string",
      "requestedFunding": 0,
      "approvedFunding": 0,
      "projectDuration": 0,
      "projectDescription": "string",
      "sourceName": "string",
      "approvalTime": "string",
      "dutyName": "string",
      "dutySex": 0,
      "dutyNation": "string",
      "dutyBirth": "string",
      "dutyId": "string",
      "dutyCollege": "string",
      "dutyRelation": "string",
      "dutyExperience": "string",
      "enterpriseAdvisorName": "string",
      "enterpriseAdvisorContact": "string",
      "enterpriseAdvisorPosition": "string",
      "enterpriseAdvisorExperience": "string",
      "attachment": "string",
      "createTime": "string",
      "updateTime": "string",
      "dutyFlag": null
    },
    "projectMembers": [
      {
        "id": 0,
        "detailId": 0,
        "studentId": "string",
        "mainWork": "string",
        "createTime": "string",
        "updateTime": "string",
        "name": null,
        "college": null,
        "grade": null,
        "educationLevel": null
      }
    ],
    "projectAdvisors": [
      {
        "id": 0,
        "detailId": 0,
        "name": "string",
        "personnelCode": "string",
        "college": "string",
        "position": "string",
        "researchTopic": "string",
        "supportStatus": "string",
        "suggestion": "string",
        "createTime": "string",
        "updateTime": "string"
      }
    ]
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
|»» projectDetail|object|true|none||none|
|»»» id|integer|true|none||none|
|»»» projectId|string|true|none||none|
|»»» contestCode|null|true|none||none|
|»»» projectType|string|true|none||none|
|»»» projectCategory|string|true|none||none|
|»»» keyField|string|true|none||none|
|»»» projectName|string|true|none||none|
|»»» projectLevel|string|true|none||none|
|»»» primaryDiscipline|string|true|none||none|
|»»» secondaryDiscipline|string|true|none||none|
|»»» requestedFunding|integer|true|none||none|
|»»» approvedFunding|integer|true|none||none|
|»»» projectDuration|integer|true|none||none|
|»»» projectDescription|string|true|none||none|
|»»» sourceName|string|true|none||none|
|»»» approvalTime|string|true|none||none|
|»»» dutyName|string|true|none||none|
|»»» dutySex|integer|true|none||none|
|»»» dutyNation|string|true|none||none|
|»»» dutyBirth|string|true|none||none|
|»»» dutyId|string|true|none||none|
|»»» dutyCollege|string|true|none||none|
|»»» dutyRelation|string|true|none||none|
|»»» dutyExperience|string|true|none||none|
|»»» enterpriseAdvisorName|string|true|none||none|
|»»» enterpriseAdvisorContact|string|true|none||none|
|»»» enterpriseAdvisorPosition|string|true|none||none|
|»»» enterpriseAdvisorExperience|string|true|none||none|
|»»» attachment|string|true|none||none|
|»»» createTime|string|true|none||none|
|»»» updateTime|string|true|none||none|
|»»» dutyFlag|null|true|none||none|
|»» projectMembers|[object]|true|none||none|
|»»» id|integer|true|none||none|
|»»» detailId|integer|true|none||none|
|»»» studentId|string|true|none||none|
|»»» mainWork|string|true|none||none|
|»»» createTime|string|true|none||none|
|»»» updateTime|string|true|none||none|
|»»» name|null|true|none||none|
|»»» college|null|true|none||none|
|»»» grade|null|true|none||none|
|»»» educationLevel|null|true|none||none|
|»» projectAdvisors|[object]|true|none||none|
|»»» id|integer|true|none||none|
|»»» detailId|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» personnelCode|string|true|none||none|
|»»» college|string|true|none||none|
|»»» position|string|true|none||none|
|»»» researchTopic|string|true|none||none|
|»»» supportStatus|string|true|none||none|
|»»» suggestion|string|true|none||none|
|»»» createTime|string|true|none||none|
|»»» updateTime|string|true|none||none|

## POST updateProject

POST /contest/updateProject

> Body 请求参数

```json
{
  "projectDetail": {
    "id": 1,
    "projectType": "科研项目",
    "projectCategory": "信息安全",
    "keyField": "网络安全",
    "projectName": "网络安全研究",
    "projectLevel": "国家级",
    "primaryDiscipline": "计算机科学与技术",
    "secondaryDiscipline": "信息安全",
    "requestedFunding": 500000,
    "approvedFunding": 450000,
    "projectDuration": 24,
    "projectDescription": "本项目致力于提升网络安全技术的研究与应用。",
    "sourceName": "国家科技基金",
    "approvalTime": "2025-03-01T10:00:00",
    "dutyName": "王大明",
    "dutySex": 1,
    "dutyNation": "汉族",
    "dutyBirth": "2000-05-15",
    "dutyId": "20231001",
    "dutyCollege": "计算机学院",
    "dutyRelation": "13800138000",
    "dutyExperience": "曾参与多项网络安全科研项目，并发表相关论文。",
    "enterpriseAdvisorName": "李总",
    "enterpriseAdvisorContact": "13912345678",
    "enterpriseAdvisorPosition": "某安全公司 CTO",
    "enterpriseAdvisorExperience": "多年从事信息安全行业，负责企业级安全系统设计。",
    "attachment": "proposal.pdf,design.docx"
  },
  "projectMembers": [
    {
      "studentId": "20231001",
      "mainWork": "后端开发后端开发"
    },
    {
      "studentId": "20231002",
      "mainWork": "前端开发前端开发"
    }
  ],
  "projectAdvisors": [
    {
      "name": "张教授",
      "personnelCode": "T1001",
      "college": "计算机学院",
      "position": "第一导师",
      "researchTopic": "网络安全攻防技术",
      "supportStatus": "提供实验设备支持",
      "suggestion": "加强对 AI 生成安全策略的研究"
    },
    {
      "name": "王教授",
      "personnelCode": "T1002",
      "college": "软件学院",
      "position": "第二导师",
      "researchTopic": "人工智能安全",
      "supportStatus": "提供科研指导",
      "suggestion": "建议引入更多 AI 训练数据，小心ai取代人类"
    }
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|SC-TOKEN|header|string| 否 |none|
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

# 数据模型

