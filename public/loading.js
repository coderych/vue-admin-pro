/**
 * loading 占位
 * 解决首次加载时白屏的问题
 */
(function () {
  const div = document.createElement('div')
  const body = document.querySelector('body')
  body?.appendChild(div)
  div.setAttribute('id', '__app-loading__')
  // 获取页面标题
  const title = document.title

  // 从缓存读取主题色
  const primaryColor = JSON.parse(localStorage.getItem('__APP_SETTING__') || '{}')?.primaryColor || '#506bc2'
  const style = `--primary-color: ${primaryColor};`
  if (div && div.innerHTML === '') {
    div.innerHTML = `
      <style>
        #__app-loading__{transition:all 0.3s ease-in-out;opacity: 1;z-index:99999;position:fixed;top:0;left:0;width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;background-color:transparent}#__app-loading__.hide{opacity:0;visibility:hidden}.dark #__app-loading__{background-color:#1e1e1e}.app-loading{position:relative;width:64px;height:64px}.app-loading,.app-loading > div{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.app-loading{display:block;font-size:0}.app-loading > div{display:inline-block;float:none;background-color:var(--primary-color);border:0 solid var(--primary-color)}.app-loading > div:nth-child(1),.app-loading > div:nth-child(2){position:absolute;left:0;width:100%}.app-loading > div:nth-child(1){top:-25%;z-index:1;height:100%;border-radius:10%;-webkit-animation:square-jelly-box-animate 0.6s -0.1s linear infinite;-moz-animation:square-jelly-box-animate 0.6s -0.1s linear infinite;-o-animation:square-jelly-box-animate 0.6s -0.1s linear infinite;animation:square-jelly-box-animate 0.6s -0.1s linear infinite}.app-loading > div:nth-child(2){bottom:-9%;height:10%;background:var(--primary-color);border-radius:50%;opacity:0.2;-webkit-animation:square-jelly-box-shadow 0.6s -0.1s linear infinite;-moz-animation:square-jelly-box-shadow 0.6s -0.1s linear infinite;-o-animation:square-jelly-box-shadow 0.6s -0.1s linear infinite;animation:square-jelly-box-shadow 0.6s -0.1s linear infinite}.app-loading-text{font-size:28px;font-weight:700;text-align:center;margin:0;padding:0;margin-top:30px;color:rgb(0,0,0,0.85)}.dark .app-loading-text{color:#fff}@-webkit-keyframes square-jelly-box-animate{17%{border-bottom-right-radius:10%}25%{-webkit-transform:translateY(25%) rotate(22.5deg);transform:translateY(25%) rotate(22.5deg)}50%{border-bottom-right-radius:100%;-webkit-transform:translateY(50%) scale(1,0.9) rotate(45deg);transform:translateY(50%) scale(1,0.9) rotate(45deg)}75%{-webkit-transform:translateY(25%) rotate(67.5deg);transform:translateY(25%) rotate(67.5deg)}100%{-webkit-transform:translateY(0) rotate(90deg);transform:translateY(0) rotate(90deg)}}@-moz-keyframes square-jelly-box-animate{17%{border-bottom-right-radius:10%}25%{-moz-transform:translateY(25%) rotate(22.5deg);transform:translateY(25%) rotate(22.5deg)}50%{border-bottom-right-radius:100%;-moz-transform:translateY(50%) scale(1,0.9) rotate(45deg);transform:translateY(50%) scale(1,0.9) rotate(45deg)}75%{-moz-transform:translateY(25%) rotate(67.5deg);transform:translateY(25%) rotate(67.5deg)}100%{-moz-transform:translateY(0) rotate(90deg);transform:translateY(0) rotate(90deg)}}@-o-keyframes square-jelly-box-animate{17%{border-bottom-right-radius:10%}25%{-o-transform:translateY(25%) rotate(22.5deg);transform:translateY(25%) rotate(22.5deg)}50%{border-bottom-right-radius:100%;-o-transform:translateY(50%) scale(1,0.9) rotate(45deg);transform:translateY(50%) scale(1,0.9) rotate(45deg)}75%{-o-transform:translateY(25%) rotate(67.5deg);transform:translateY(25%) rotate(67.5deg)}100%{-o-transform:translateY(0) rotate(90deg);transform:translateY(0) rotate(90deg)}}@keyframes square-jelly-box-animate{17%{border-bottom-right-radius:10%}25%{-webkit-transform:translateY(25%) rotate(22.5deg);-moz-transform:translateY(25%) rotate(22.5deg);-o-transform:translateY(25%) rotate(22.5deg);transform:translateY(25%) rotate(22.5deg)}50%{border-bottom-right-radius:100%;-webkit-transform:translateY(50%) scale(1,0.9) rotate(45deg);-moz-transform:translateY(50%) scale(1,0.9) rotate(45deg);-o-transform:translateY(50%) scale(1,0.9) rotate(45deg);transform:translateY(50%) scale(1,0.9) rotate(45deg)}75%{-webkit-transform:translateY(25%) rotate(67.5deg);-moz-transform:translateY(25%) rotate(67.5deg);-o-transform:translateY(25%) rotate(67.5deg);transform:translateY(25%) rotate(67.5deg)}100%{-webkit-transform:translateY(0) rotate(90deg);-moz-transform:translateY(0) rotate(90deg);-o-transform:translateY(0) rotate(90deg);transform:translateY(0) rotate(90deg)}}@-webkit-keyframes square-jelly-box-shadow{50%{-webkit-transform:scale(1.25,1);transform:scale(1.25,1)}}@-moz-keyframes square-jelly-box-shadow{50%{-moz-transform:scale(1.25,1);transform:scale(1.25,1)}}@-o-keyframes square-jelly-box-shadow{50%{-o-transform:scale(1.25,1);transform:scale(1.25,1)}}@keyframes square-jelly-box-shadow{50%{-webkit-transform:scale(1.25,1);-moz-transform:scale(1.25,1);-o-transform:scale(1.25,1);transform:scale(1.25,1)}}
      </style>
      <div class="app-loading" style="${style}">
        <div></div>
        <div></div>
      </div>
      <h3 class="app-loading-text" style="color: ${primaryColor}">
          ${title}
      </h3>
    `
  }
})()
