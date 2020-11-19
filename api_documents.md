## 前后端接口文档
### usr相关接口
##### 注册signup接口
* 映射地址 /usr/signin
* 请求方式 POST
* 参数 

		usrname : string

		pwd : string

		email : string

		phone : string

* 返回

		returnCode (表示成功、失败等状态。可以由后端定义)

		msg (告知用户的信息等)

##### 登录login接口
* 映射地址 /usr/login
* 请求方式 POST
* 参数 

		usrname : string

		pwd : string

* 返回

		returnCode (表示成功、失败等状态。可以由后端定义)

		msg (告知用户的信息等)

##### 用户信息info接口
* 映射地址/usr/info
* 请求方式 POST
* 返回

		returnCode (表示成功、失败等状态。可以由后端定义)

		usrInfo { 
			usrname : string,
			email : string,
			phone : string，
			gameInfos : [   #所有游戏的历史最高分数
				{
					gameId : int,
					gameName : string,
					gameScore : int
				}
				...
			]
		}

		msg (告知用户的信息等)
    

### game相关接口
##### 游戏排行榜rank接口
* /game/rank
* 请求方式 POST
* 参数

		gameId : int

* 返回

		returnCode (表示成功、失败等状态。可以由后端定义)

		rank : [
			{
				rank : int,  #排名
				score : int,  #分数
			}
			...    #建议给5个，可以编一些初始数据
		]

		msg (告知用户的信息等)
		

##### 游戏分数记录score接口
* /game/score
* 请求方式 POST
* 参数

		gameId : int

		score : int

* 返回

		returnCode (表示成功、失败等状态。可以由后端定义)

		msg (告知用户的信息等)

##### 游戏评论comment接口
* /game/comment
* 请求方式 POST
* 参数

		gameId : int

* 返回

		returnCode (表示成功、失败等状态。可以由后端定义)

		comments : [
			{
				usrname : string,
				comment : string,
				date : datestamp
			}
			....
		]

		msg (告知用户的信息等)

##### 发表评论writeComment接口
* /game/writeComment
* 请求方式 POST
* 参数

		gameId : int

		comment : string

* 返回

		returnCode (表示成功、失败等状态。可以由后端定义)

		msg (告知用户的信息等)

		
		





