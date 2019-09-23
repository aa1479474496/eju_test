### 启动browsersync
// --files 路径是相对于运行该命令的项目（目录） 
browser-sync start --server --files "css/*.css, *.html"
// 如果你的文件层级比较深，您可以考虑使用 **（表示任意目录）匹配，任意目录下任意.css 或 .html文件。 
browser-sync start --server --files "**/*.css, **/*.html"

### datav
    1. index.html  datav的适配

### draggable
    1. index.html  基本用法
    2. checkMove.html 各block 相互拖拽之间的判断， 测试用例为dms->指标分析

### echarts
    1.graphic.html 自定义画块的一些用法
    
### inputFocus
    1.index.html 点击按钮往input中插入光标位置， 测试用例为dms->关注设置
    
### overflow
    1.index.html 内容超过两行出现 查看更多 按钮
    2.scrollHeight.html 判断块区域出现省略号
    3.hidden.html 一行放不下时 出现展开按钮。  可以展开收起切换

### htmlCanvas    
    1.index.html 测试截取图片

### html2canvas-1.0.0-rc.3
    htmlCanvas 官方demo

### modal
    1.index.html 采用inline-block方式使modal居中。 使用transform居中时，如果模态框的高度为奇数时，则会出现字体模糊现象。如果
      使用js动态计算高度， 当模态框内部内容可动态改变时，则需要多次调用方法，不够方便.
    2.bs_modal.html js改变模态框margin-top, 当模态内容动态改变高度时，则有缺陷

### typescript
    编译 tsc demo2.ts

### lib
    放置常用的vue, bootstrap以及部分插件

### iconfont
    阿里失量图 字体库    

### vue_cli
    使用的是vue-cli3, 使用nvm 切换版本   nvm list（查看安装的版本）
    nvm use v10.15.3(使用更高的版本)




        