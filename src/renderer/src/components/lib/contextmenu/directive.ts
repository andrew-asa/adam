import bus from './bus'
import { DirectiveBinding } from 'vue'
function hideContextmenu() {
    // console.log(`hideContextmenu`);
    bus.emit('hide-contextmenu')
}
const onMounted = (el: HTMLElement, binding: DirectiveBinding) => {
    el.addEventListener('contextmenu', e => {
        e.preventDefault()
        e.stopPropagation()
        // console.log(`contextmenu: ${JSON.stringify(binding.value)}`)
        bus.emit('add-contextmenu', { x: e.clientX, y: e.clientY, value: binding.value })
    })
    document.addEventListener('click', hideContextmenu)
}

const unmounted = () => {
    bus.emit('hide-contextmenu')
    document.removeEventListener('click', hideContextmenu)
}

export default {
    mounted: onMounted,
    unmounted: unmounted
}
