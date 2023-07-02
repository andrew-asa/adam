import { registerAction,triggerAction } from "../action"

export {registerAction} from "../action"
const items:any = []
function add(i){
    items.push(i)
}


registerAction("test",add)
registerAction("test",add)
triggerAction("test",1)
triggerAction("test",2)
registerAction("test",add,true)
triggerAction("test",3)
triggerAction("test",4)

