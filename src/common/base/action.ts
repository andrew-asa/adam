const actions: { [key: string]: Action[] } = {}

class Action {
    handler: Function
    onlyTriggerOne: boolean
    constructor(handler: Function, onlyTriggerOne = false) {
        this.handler = handler
        this.onlyTriggerOne = onlyTriggerOne
    }
}
/**
 * 注册一个action
 * @param name
 * @param handler
 * @param onlyTriggerOne 是否只是触发一次就删除
 */
export function registerAction(name: string, handler: Function, onlyTriggerOne = false) {
    if (!actions[name]) {
        actions[name] = []
    }
    actions[name].push(new Action(handler, onlyTriggerOne))
}

export function getActions(name: string) {
    return actions[name]
}

export function clearActions(name: string) {
    delete actions[name]
}

export function deleteAction(name: string, fun: Function) {
    const ac: Action[] = getActions(name)
    if (ac) {
        const nac: Action[] = ac.filter((a) => {
            return a.handler !== fun
        })
        actions[name] = nac
    }
}

/**
 * 触发一个action
 * 返回最后一个触发的action的返回值
 */
export function triggerAction(name: string, ...args: any[]): any {
    const ac: Action[] = getActions(name)
    const ret = [undefined]
    if (ac) {
        const nac: Action[] = ac.filter((a) => {
            ret[0] = a.handler(...args)
            return !a.onlyTriggerOne
        })
        actions[name] = nac
    }
    return ret[0]
}