# node-upload

> 基于node后台HTML5异步上传+FLASH异步上传,本demo涉及四种上传方式



#### 实现了四种上传方式
* html5 form-data 单文件上传
* html5 form-data 多文件上传
* flash swfupload 单文件和多文件上传
* flash uploadify 单文件和多文件上传



#### 在路由index内写了4个接口  分别对应不同的上传demo入口
 * "/"  单文件上传页面 html5
 * "/2" 多文件上传页面 html5
 * "/3" swfupload flash
 * "/4" uploadify flash



#### 后台接收文件使用到的模块
* html5 用到了 multer 模块
* flahs 用到了 formidable 模块




