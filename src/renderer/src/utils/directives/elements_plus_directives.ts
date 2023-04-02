const textAreaAutoWidth = {
    mounted: function (el) {
        const input = el.querySelector('.el-textarea__inner')
        input.style.overflow = 'hidden';
    },
    updated: function (el) {
        const input = el.querySelector('.el-textarea__inner')
        input.style.width = 'auto'
        input.style.width = input.scrollWidth + 'px'
    }
}
const textAreaAutoHeight = {
    mounted: function (el) {
        const input = el.querySelector('.el-textarea__inner')
        input.style.overflow = 'hidden';
    },
    updated: function (el) {
        const input = el.querySelector('.el-textarea__inner')
        input.style.height = 'auto'
        input.style.height = input.scrollHeight + 'px'
    }
}
export {
    textAreaAutoWidth, textAreaAutoHeight
}