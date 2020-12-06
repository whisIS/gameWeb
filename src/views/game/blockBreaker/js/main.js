// 封装打印日志方法
const log = console.log.bind(console)
// 生成图片对象方法
const imageFromPath = function (src) {
  let img = new Image()
  img.src = src
  return img
}
// 检测页面不可见时自动暂停游戏方法
const isPageHidden = function (game) {
  let hiddenProperty = 'hidden' in document ? 'hidden' :    
      'webkitHidden' in document ? 'webkitHidden' :    
      'mozHidden' in document ? 'mozHidden' :    
      null
  let visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange')
  // 监听页面是否可见事件
  document.addEventListener(visibilityChangeEvent, function () {
    if (!document[hiddenProperty]) {  // 可见状态
      setTimeout(function () {
        game.state = game.state_RUNNING
      }, 100)
    } else { // 不可见状态
      game.state = game.state_STOP
    }
  })
}
// 图片素材路径
const allImg = {
  background: 'background.jpg',
  paddle: 'paddle.png',
  ball: 'ball.png',
  block1: 'block001.png',
  block2: 'block002.png',
}
var ims = null
var canv = null
// 游戏主要运行逻辑
class Game {
  constructor (main, ca) {
    let g = {
      main: main,                                                   // 游戏主函数
      actions: {},                                                  // 记录按键动作
      keydowns: {},                                                 // 记录按键keycode
      state: 1,                                                     // 游戏状态值，初始默认为1
      state_START: 1,                                               // 开始游戏
      state_RUNNING: 2,                                             // 游戏开始运行
      state_STOP: 3,                                                // 暂停游戏
      state_GAMEOVER: 4,                                            // 游戏结束
      state_UPDATE: 5,                                              // 游戏通关
      canvas: ca,                    // canvas元素
      context: ca.getContext("2d"),  // canvas画布
      timer: null,                                                  // 轮询定时器
      fps: main.fps,                                                // 动画帧数，默认60
    }
    Object.assign(this, g)
  }
  // 绘制页面所有素材
  draw (paddle, ball, blockList, score) {
    let g = this
    // 清除画布
    g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
    // 绘制背景图
    g.drawBg()
    // 绘制挡板
     g.drawImage(paddle)
    // 绘制小球
    g.drawImage(ball)
    // 绘制砖块
    g.drawBlocks(blockList)
    // 绘制分数
    g.drawText(score)
  }
  // 绘制图片
  drawImage (obj) {
    this.context.drawImage(obj.image, obj.x, obj.y)
  }
  // 绘制背景图
  drawBg () {
    let bg = imageFromPath(ims["background"])
    this.context.drawImage(bg, 0, 0)
  }
  // 绘制所有砖块
  drawBlocks (list) {
    for (let item of list) {
      this.drawImage(item)
    }
  }
  // 绘制计数板
  drawText (obj) {
    this.context.font = '24px Microsoft YaHei'
    this.context.fillStyle = '#fff'
    // 绘制分数
    this.context.fillText(obj.text + obj.allScore, obj.x, obj.y)
    // 绘制关卡
    this.context.fillText(obj.textLv + obj.lv, this.canvas.width - 100, obj.y)
  }
  // 游戏结束
  gameOver () {
    // 清除定时器
    clearInterval(this.timer)
    // 清除画布
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // 绘制背景图
    this.drawBg()
    // 绘制提示文字
    this.context.font = '48px Microsoft YaHei'
    this.context.fillStyle = '#fff'
    this.context.fillText('游戏结束', 404, 226)
  }
  // 游戏晋级
  goodGame () {
    // 清除定时器
    clearInterval(this.timer)
    // 清除画布
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // 绘制背景图
    this.drawBg()
    // 绘制提示文字
    this.context.font = '48px Microsoft YaHei'
    this.context.fillStyle = '#fff'
    this.context.fillText('恭喜晋级下一关卡', 308, 226)
  }
  // 游戏通关
  finalGame () {
    // 清除定时器
    clearInterval(this.timer)
    // 清除画布
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // 绘制背景图
    this.drawBg()
    // 绘制提示文字
    this.context.font = '48px Microsoft YaHei'
    this.context.fillStyle = '#fff'
    this.context.fillText('恭喜通关全部关卡', 308, 226)
  }
  // 注册事件
  registerAction (key, callback) {
    this.actions[key] = callback
  }
  // 小球碰撞砖块检测
  checkBallBlock (g, paddle, ball, blockList, score) {
    let p = paddle, b = ball
    // 小球碰撞挡板检测
    if (p.collide(b)) {
      // 当小球运动方向趋向挡板中心时，Y轴速度取反，反之则不变
      if (Math.abs(b.y + b.h/2 - p.y + p.h/2) > Math.abs(b.y + b.h/2 + b.speedY - p.y + p.h/2)) {
        b.speedY *= -1
      } else {
        b.speedY *= 1
      }
      // 设置X轴速度
      b.speedX = p.collideRange(b)
    }
    // 小球碰撞砖块检测
    blockList.forEach(function (item, i, arr) {
      if (item.collide(b)) { // 小球、砖块已碰撞
        if (!item.alive) { // 砖块血量为0时，进行移除
          arr.splice(i, 1)
        }
        // 当小球运动方向趋向砖块中心时，速度取反，反之则不变
        if ((b.y < item.y && b.speedY < 0) || (b.y > item.y && b.speedY > 0)) {
          if (!item.collideBlockHorn(b)) {
            b.speedY *= -1
          } else { // 当小球撞击砖块四角时，Y轴速度不变
            b.speedY *= 1
          }
        } else {
          b.speedY *= 1
        }
        // 当小球撞击砖块四角时，X轴速度取反
        if (item.collideBlockHorn(b)) {
          b.speedX *= -1
        }
        // 计算分数
        score.computeScore()
      }
    })
    // 挡板移动时边界检测
    if (p.x <= 0) { // 到左边界时
      p.isLeftMove = false
    } else {
      p.isLeftMove = true
    }
    if (p.x >= 1000 - p.w) { // 到右边界时
      p.isRightMove = false
    } else {
      p.isRightMove = true
    }
    // 移动小球
    b.move(g)
  }
  // 设置逐帧动画
  setTimer (paddle, ball, blockList, score) {
    let g = this
    let main = g.main
    g.timer = setInterval(function () {
      // actions集合
      let actions = Object.keys(g.actions)
      for (let i = 0; i < actions.length; i++) {
        let key = actions[i]
        if(g.keydowns[key]) {
          // 如果按键被按下，调用注册的action
          g.actions[key]()
        }
      }
      // 当砖块数量为0时，挑战成功
      if (blockList.length == 0) {
        if (main.LV === main.MAXLV) { // 最后一关通关
          // 升级通关
          g.state = g.state_UPDATE
          // 挑战成功，渲染通关场景
          g.finalGame()
        } else { // 其余关卡通关
          // 升级通关
          g.state = g.state_UPDATE
          // 挑战成功，渲染下一关卡场景
          g.goodGame()
        }
      }
      // 判断游戏是否结束
      if (g.state === g.state_GAMEOVER) {
        g.gameOver()
      }
      // 判断游戏开始时执行事件
      if (g.state === g.state_RUNNING) {
        g.checkBallBlock(g, paddle, ball, blockList, score)
        // 绘制游戏所有素材
        g.draw(paddle, ball, blockList, score)
      } else if (g.state === g.state_START){
        // 绘制游戏所有素材
        g.draw(paddle, ball, blockList, score)
      }
    }, 1000/g.fps)
  }
  /**
   * 初始化函数
   */
  init () {
    let g = this,
        paddle = g.main.paddle,
        ball = g.main.ball,
        blockList = g.main.blockList,
        score = g.main.score
    // 设置键盘按下及松开相关注册函数
    window.addEventListener('keydown', function (event) {
     g.keydowns[event.keyCode] = true
    })
    window.addEventListener('keyup', function (event) {
      g.keydowns[event.keyCode] = false
    })
    g.registerAction = function (key, callback) {
      g.actions[key] = callback
    }
    // 注册左方向键移动事件
    g.registerAction('65', function(){
      // 判断游戏是否处于运行阶段
      if (g.state === g.state_RUNNING && paddle.isLeftMove) {
        paddle.moveLeft()
      }
    })
    // 注册右方向键移动事件
    g.registerAction('68', function(){
      // 判断游戏是否处于运行阶段
      if (g.state === g.state_RUNNING && paddle.isRightMove) {
        paddle.moveRight()
      }
    })
    window.addEventListener('keydown', function (event) {
      switch (event.keyCode) {
        // 注册空格键发射事件
        case 32 :
          if (g.state === g.state_GAMEOVER) { // 游戏结束时
            // 开始游戏
            g.state = g.state_START
            // 初始化
            g.main.start(canv, ims)
          } else { 
            // 开始游戏
            ball.fired = true
            g.state = g.state_RUNNING
          }
          break
        // N 键进入下一关卡
        case 78 :
          // 游戏状态为通关，且不为最终关卡时
          if (g.state === g.state_UPDATE && g.main.LV !== g.main.MAXLV) { // 进入下一关
            // 开始游戏
            g.state = g.state_START
            // 初始化下一关卡
            ++g.main.LV
            g.main.start(canv, ims)
          }
          break
        // P 键暂停游戏事件
        case 80 :
          g.state = g.state_STOP
          break
      }
    })
    // 设置轮询定时器
    g.setTimer(paddle, ball, blockList, score)
  }
}
// 定义挡板对象
class Paddle {
  constructor (_main) {
    let p = {
      x: _main.paddle_x,                                   // x轴坐标
      y: _main.paddle_y,                                   // y轴坐标
      w: 102,                                              // 图片宽度
      h: 22,                                               // 图片高度
      speed: 10,                                           // x轴移动速度
      ballSpeedMax: 8,                                     // 小球反弹速度最大值
      image: imageFromPath(ims["paddle"]),                 // 引入图片对象
      isLeftMove: true,                                    // 能否左移
      isRightMove: true,                                   // 能否右移
    }
    Object.assign(this, p)
  }
  moveLeft () {
    this.x -= this.speed
  }
  moveRight () {
    this.x += this.speed
  }
  // 小球、挡板碰撞检测
  collide (ball) {
    let b = ball
    let p = this
    if (Math.abs((b.x + b.w/2) - (p.x + p.w/2)) < (b.w + p.w)/2 &&
        Math.abs((b.y + b.h/2) - (p.y + p.h/2)) < (b.h + p.h)/2) {
      return true
    }
    return false
  }
  // 计算小球、挡板碰撞后x轴速度值
  collideRange (ball) {
    let b = ball
    let p = this
    let rangeX = 0
    rangeX = (p.x + p.w/2) - (b.x + b.w/2)
    if (rangeX < 0) { // 小球撞击挡板左侧
      return rangeX / (b.w/2 + p.w/2) * p.ballSpeedMax
    } else if (rangeX > 0) { // 小球撞击挡板右侧
      return rangeX / (b.w/2 + p.w/2) * p.ballSpeedMax
    }
  }
}
// 小球对象
class Ball {
  constructor (_main) {
    let b = {
      x: _main.ball_x,                      // x轴坐标
      y: _main.ball_y,                      // y轴坐标
      w: 18,                                // 图片宽度
      h: 18,                                // 图片高度
      speedX: 1,                            // x轴速度
      speedY: 5,                            // y轴速度
      image: imageFromPath(ims["ball"]),    // 图片对象
      fired: false,                         // 是否运动，默认静止不动
    }
    Object.assign(this, b)
  }
  move (game) {
    if (this.fired) {
      // 碰撞边界检测
      if (this.x < 0 || this.x > 1000 - this.w) {
        this.speedX *= -1
      }
      if (this.y < 0) {
        this.speedY *= -1
      }
      if (this.y > 500 - this.h) {
        // 游戏结束
        game.state = game.state_GAMEOVER
        // game.isGameOver = true
      }
      // 移动
      this.x -= this.speedX
      this.y -= this.speedY
    }
  }
}
// 砖块
class Block {
  constructor (x, y, life = 1) {
    let bk = {
      x: x,                                                                               // x轴坐标
      y: y,                                                                               // y轴坐标
      w: 50,                                                                              // 图片宽度
      h: 20,                                                                              // 图片高度
      image: life == 1 ? imageFromPath(ims["block001"]) : imageFromPath(ims["block002"]),     // 图片对象
      life: life,                                                                         // 生命值
      alive: true,                                                                        // 是否存活
    }
    Object.assign(this, bk)
  }
  // 消除砖块
  kill () {
    this.life--
    if (this.life == 0) {
      this.alive = false
    } else if (this.life == 1) {
      this.image = imageFromPath(ims["block001"])
    }
  }
  // 小球、砖块碰撞检测
  collide (ball) {
    let b = ball
    if (Math.abs((b.x + b.w/2) - (this.x + this.w/2)) < (b.w + this.w)/2 &&
        Math.abs((b.y + b.h/2) - (this.y + this.h/2)) < (b.h + this.h)/2) {
      this.kill()
      return true
    } else {
      return false
    }
  }
  // 计算小球、砖块碰撞后x轴速度方向
  collideBlockHorn (ball) {
    let b = ball    // 小球
    let bk = this   // 砖块
    let rangeX = 0
    let rangeY = 0
    rangeX = Math.abs((b.x + b.w/2) - (bk.x + bk.w/2))
    rangeY = Math.abs((b.y + b.h/2) - (bk.y + bk.h/2))
    if (rangeX > bk.w/2 && rangeX < (bk.w/2 + b.w/2) && rangeY < (bk.h/2 + b.h/2)) { // X轴方向与砖块四角相交
      if (b.x < bk.x && b.speedX > 0 || b.x > bk.x && b.speedX < 0) { // 小球在砖块左侧时
        return false
      } else { // 小球在砖块右侧
        return true
      }
    }
    return false
  }
}
// 计分板
class Score {
  constructor (_main) {
    let s = {
      x: _main.score_x,                               // x轴坐标
      y: _main.score_y,                               // y轴坐标
      text: '分数：',                                 // 文本分数
      textLv: '关卡：',                               // 关卡文本
      score: 200,                                     // 每个砖块对应分数
      allScore: 0,                                    // 总分
      blockList: _main.blockList,                     // 砖块对象集合
      blockListLen: _main.blockList.length,           // 砖块总数量
      lv: _main.LV,                                   // 当前关卡
    }
    Object.assign(this, s)
  }
  // 计算总分
  computeScore () {
    let num = 0
    let allNum = this.blockListLen
    num = this.blockListLen - this.blockList.length
    this.allScore = this.score * num
  }
}
// 定义场景
class Scene {
  constructor (lv) {
    let s = {
      lv: lv,                                         // 游戏难度级别
      canvas: document.getElementById("canvas"),      // canvas对象
      blockList: [],                                  // 砖块坐标集合
    }
    Object.assign(this, s)
  }
  // 实例化所有砖块对象
  initBlockList () {
    this.creatBlockList()
    let arr = []
    for (let item of this.blockList) {
      for (let list of item) {
        if (list.type === 1) {
          let obj = new Block(list.x, list.y)
          arr.push(obj)
        } else if (list.type === 2) {
          let obj = new Block(list.x, list.y, 2)
          arr.push(obj)
        }
      }
    }
    return arr
  }
  // 创建砖块坐标二维数组，并生成不同关卡
  creatBlockList () {
    let lv = this.lv,                         // 游戏难度级别
        c_w = this.canvas.width,              // canvas宽度
        c_h = this.canvas.height,             // canvas高度
        xNum_max = c_w/50,                    // x轴砖块最大数量
        yNum_max = 12,                        // y轴砖块最大数量
        x_start = 0,                          // x轴起始坐标，根据砖块数量浮动
        y_start = 60                          // y轴起始坐标，默认从60起

    switch (lv) {
      case 1 : // 正三角形
        var xNum = 16,                               // x轴砖块第一层数量
            yNum = 9                                 // y轴砖块层数
        // 循环y轴
        for(let i = 0;i < yNum;i++){
          let arr = []
          // 修改每层x轴砖块数量
          if (i === 0) {
            xNum = 1
          } else if (i === 1) {
            xNum = 2
          } else {
            xNum += 2
          }
          x_start = (xNum_max - xNum)/2 * 50             // 修改每层x轴砖块起始坐标
          // 循环x轴
          for(let k = 0;k < xNum;k++){
            if (i < 3) { // 前三排为特殊砖块
              arr.push({
                x: x_start + k*50,
                y: y_start + i*20,
                type: 2,
              })
            } else {
              arr.push({
                x: x_start + k*50,
                y: y_start + i*20,
                type: 1,
              })
            }
          }
          this.blockList.push(arr)
        }
        break
      case 2 :  // 倒三角形
        var xNum = 16,                              // x轴砖块第一层数量
            yNum = 9                                // y轴砖块层数
        // 循环y轴
        for(let i = 0;i < yNum;i++){
          let arr = []
          // 修改每层x轴砖块数量
          if (i === yNum - 1) {
            xNum = 1
          } else if (i === 0) {
            xNum = xNum
          } else {
            xNum -= 2
          }
          x_start = (xNum_max - xNum)/2 * 50             // 修改每层x轴砖块起始坐标
          // 循环x轴
          for(let k = 0;k < xNum;k++){
            if (i < 3) { // 前三排为特殊砖块
              arr.push({
                x: x_start + k*50,
                y: y_start + i*20,
                type: 2,
              })
            } else {
              arr.push({
                x: x_start + k*50,
                y: y_start + i*20,
                type: 1,
              })
            }
          }
          this.blockList.push(arr)
        }
        break
      case 3 : // 工字形
        var xNum = 16,                              // x轴砖块第一层数量
            yNum = 9                                // y轴砖块层数
        // 循环y轴
        for(let i = 0;i < yNum;i++){
          let arr = []
          // 修改每层x轴砖块数量
          if (i === 0) {
            xNum = xNum
          } else if (i > 4) {
            xNum += 2
          } else {
            xNum -= 2
          }
          x_start = (xNum_max - xNum)/2 * 50             // 修改每层x轴砖块起始坐标
          // 循环x轴
          for(let k = 0;k < xNum;k++){
            if (i < 3) { // 前三排为特殊砖块
              arr.push({
                x: x_start + k*50,
                y: y_start + i*20,
                type: 2,
              })
            } else {
              arr.push({
                x: x_start + k*50,
                y: y_start + i*20,
                type: 1,
              })
            }
          }
          this.blockList.push(arr)
        }
        break
    }
  }
}
// 游戏主函数
let _main = {
  LV: 1,                               // 初始关卡
  MAXLV: 2,                            // 最终关卡
  scene: null,                         // 场景对象
  blockList: null,                     // 所有砖块对象集合
  ball: null,                          // 小球对象
  paddle: null,                        // 挡板对象
  score: null,                         // 计分板对象
  ball_x: 491,                         // 小球默认x轴坐标
  ball_y: 432,                         // 小球默认y轴坐标
  paddle_x: 449,                       // 挡板默认x轴坐标
  paddle_y: 450,                       // 挡板默认y轴坐标
  score_x: 10,                         // 计分板默认x轴坐标
  score_y: 30,                         // 计分板默认y轴坐标
  fps: 60,                             // 游戏运行帧数
  game: null,                          // 游戏主要逻辑对象
  start: function (ca, images) {                 // 游戏启动函数
    let self = this
    ims = images
    canv = ca
    /**
     * 生成场景（根据游戏难度级别不同，生成不同关卡）
     */
    self.scene = new Scene(self.LV)
    // 实例化所有砖块对象集合
    self.blockList = self.scene.initBlockList()
    /**
     * 小球
     */
    self.ball = new Ball(self)
    /**
     * 挡板
     */
    self.paddle = new Paddle(self)
    /**
     * 计分板
     */
    self.score = new Score(self)
    /**
     * 游戏主要逻辑
     */
    self.game = new Game(self, canv, ims)
    /**
     * 游戏初始化
     */
    self.game.init(self)
  },
  restart: function(){
    self.scene = new Scene(self.LV)
    self.blockList = self.scene.initBlockList()
    self.ball = new Ball(self)
    self.paddle = new Paddle(self)
    self.score = new Score(self)
    self.game = new Game(self, canv, ims)
    self.game.init(self)
  },
}

export{
  _main
}