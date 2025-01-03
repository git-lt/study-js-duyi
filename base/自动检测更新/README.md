# 在浏览器中自动检测当前站点是否有更新

## 背景

在使用浏览器访问网站时，我们通常会遇到一个很常见的问题：如何知道当前网站是否更新了？
在浏览器中，我们可以通过一些简单的方法来检测当前网站是否有更新。

## 方法

1. 检查文档的更新时间：在文档的响应头中，通常会包含 `Last-Modified` 或 `ETag` 等字段，用于标识文档的更新时间。
2. SPA应用：检查 `index.html` 文件中的资源是否有更新来判断当前网站是否有更新。

方法二由于检查 `index.html` 文件中链接比较复杂，需要获取所有资源链接，一一判断，不仅要判断 `css` 、还要判断 `js`、图片等, 所以这里我们使用方法一来实现。


## 检查 ETag 值

依据 `index.html` 资源的响应头中的 `etag` 来判断资源是否有更新


## 实现步骤

1. 发送请求，获取 `index.html` 资源的 `etag` 值
2. 比较 `index.html` 资源的 `etag` 值
3. 如果 `etag` 值有更新，则提示用户有更新，用户确认更新后，使用 `window.location.reload()` 重新加载页面

## 注意点

- `etag` 值是服务器返回的，需要通过 `window.fetch()` 获取
- 不要过于频繁的请求，`etag` 值是服务器返回的，如果频繁请求，服务器可能会拒绝服务
- `etag` 值是服务器返回的，如果服务器不支持 `etag`，则无法判断资源是否有更新
- 注册 `load` 和 `visibilitychange` 事件，当页面加载完成时 和 页面可见时，判断资源是否有更新
- 页面不可见时，不请求资源判断更新，当页面可见时，再请求资源
- 当需要更新，弹出提示时，暂停检查更新
- 当用户拒绝更新时，要延长一段时间，再检查更新，避免提示过于频繁

