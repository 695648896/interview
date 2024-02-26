class MyEvent{
    constructor(){
        this.events = new Map()
    }
    on(key, effect){
        let effects = this.events.get(key)
        if(!effects){
            effects = new Set()
        }
        effects.add(effect)
        this.events.set(key, effects)
    }
    emit(key,...args){
        let effects = this.events.get(key)
        if(!effects){
            return
        }
        effects.forEach(effect => {
            effect.apply(this, args)
        })
    }
    off(key, effect){
        let effects = this.events.get(key)
        if(!effects || !effects.has(effect)){
            return
        }
        effects.delete(effect)
    }
}