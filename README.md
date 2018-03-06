# mix-api
express实现的后端常用api，TODO列表如下。
本项目数据来源于网络，仅用于学习交流。请勿商用。
## 功能描述：
> * - [x]  [天气](#天气)
> * - [x]  [翻译](#翻译)
> * - [ ]  [音乐](#音乐)
> * - [x]  [小说](#小说)
> * - [ ]  [快递](#快递)
> * - [ ]  [漫画](#漫画)
> * - [ ]  [视频](#视频)
> * - [ ]  [动图](#动图)
> * - [ ]  [段子](#段子)
> * - [ ]  [图片](#图片)

## 功能说明
### <span id="翻译">翻译</span>
> * 由于网络原因，阿里云服务器访问超时，translate.google.cn又不稳定，所以接口不稳定，其中的/routes/translate/index.js中的参数获取已经写出，可以参考。
> * 同时添加了有道翻译的支持：/translate/youdao?text=你好

### <span id="天气">天气</span>
使用的是某服务商的免费接口，调用次数受限，相应的秘钥和id已经反映在了代码中。
> * 根据location获取现在的天气：get /weather/now?location=hangzhou
> * 根据location获取未来3天的天气：get /weather/future?location=hangzhou
> * 根据location获取现在的生活指数：get /weather/life?location=hangzhou

### <span id="小说">小说</span>
> * 具体接口请求参考：<a href="https://github.com/shock-lee/mix-api/blob/master/routes/novel/index.js" target="_blank">routes/novel/index.js</a>
