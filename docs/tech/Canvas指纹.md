# Canvas 指纹

基于Canvas标签绘制特定内容的图片，使用canvas.toDataURL()方法获得图片内容的base64编码（对于PNG格式的图片，以块(chunk)划分，最后一块是32位CRC校验）作为唯一性标识

## 原理

相同的HTML5 Canvas元素绘制操作，在不同操作系统、不同浏览器上，产生的图片内容不完全相同。在图片格式上，不同浏览器使用了不同的图形处理引擎、不同的图片导出选项、不同的默认压缩级别等。在像素级别来看，操作系统各自使用了不同的设置和算法来进行抗锯齿和子像素渲染操作。即使相同的绘图操作，产生的图片数据的CRC检验也不相同。

## 测试地址

[https://browserleaks.com/canvas](https://browserleaks.com/canvas)

## 工具库

[https://github.com/fingerprintjs/fingerprintjs](https://github.com/fingerprintjs/fingerprintjs)

## 隐藏工具

浏览器插件：[CanvasFingerprintBlock](https://chrome.google.com/webstore/detail/canvasfingerprintblock/ipmjngkmngdcdpmgmiebdmfbkcecdndc?hl=zh-CN)

指纹仿关联软件：

1. [LoginBox](https://www.loginbox.cn/)
2. [multilogin](https://multilogin.com/)