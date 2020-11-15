import Vue from "vue";

// 处理大小写
function changeStr(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// 批量匹配注册
const requireComponent = require.context('.', false, /\.vue$/)
requireComponent.keys().forEach(fileName => {
    const config = requireComponent(fileName)
    const componentName = changeStr(
        fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
    )
    Vue.component(componentName, config.default || config)
})