# oauth_demo

授权码（authorization-code）适用于有后端的Web应用
1、A向B请求授权码
https://b.com/oauth/authorize?response_type=code&client_id=CLIENT_ID&redirect_uri=CALLBACK_URL&scope=read

注：response_type参数表示要求返回授权码（code），client_id参数让 B 知道是谁在请求，redirect_uri参数是 B 接受或拒绝请求后的跳转网址，scope参数表示要求的授权范围（这里是只读）
2、B根据redirect_uri参数指定的网址返回授权码
https://a.com/callback?code=AUTHORIZATION_CODE

3、A获得授权码，用授权码换token
https://b.com/oauth/token?client_id=CLIENT_ID&client_secret=CLIENT_SECRET&grant_type=authorization_code&code=AUTHORIZATION_CODE&redirect_uri=CALLBACK_URL

注：client_id参数和client_secret参数用来让 B 确认 A 的身份（client_secret参数是保密的，因此只能在后端发请求），grant_type参数的值是AUTHORIZATION_CODE，表示采用的授权方式是授权码，code参数是上一步拿到的授权码，redirect_uri参数是令牌颁发后的回调网址。

4、B向redirect_uri指定的网址发送一段包含token的Json数据
{    
  "access_token":"ACCESS_TOKEN",
  "token_type":"bearer",
  "expires_in":2592000,
  "refresh_token":"REFRESH_TOKEN",
  "scope":"read",
  "uid":100101,
  "info":{...}
}

