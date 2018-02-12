# mix-api
express实现的后端常用api，暂时还没有内容哦。
本项目数据来源于网络，仅用于学习交流。不允许商用。
## 功能描述：
> * [天气](#weather)
> * [谷歌翻译](#translate)
> * [音乐](#music)
> * [小说](#novel)

## 功能说明
### <span name="translate"></span>谷歌翻译
由于网络原因，阿里云服务器访问超时，translate.google.cn又不稳定，所以接口不稳定，其中的/routes/translate/index.js中的参数获取已经写出，可以参考。

### <span id="weather"></span>天气
使用的是某服务商的免费接口，调用次数受限，相应的秘钥和id已经反映在了代码中。
> * 根据location获取现在的天气：get /weather/now?location=hangzhou
> * 根据location获取未来3天的天气：get /weather/future?location=hangzhou
> * 根据location获取现在的生活指数：get /weather/life?location=hangzhou
