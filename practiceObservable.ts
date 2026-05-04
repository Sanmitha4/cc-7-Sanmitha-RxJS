import type { Subscription } from "./observable.js";

export interface Observer<T>{
    next(value:T):void;
    error(err:any):void;
    cpmplete():void;
}
export type CleanupFunction=()=>void;

export type Executor<T>=(observer:Observer<T>)=>CleanupFunction|void;

export type Subsrciption={
    unsubsribe():void;

}

export class Observable<T>{
    private executor:Executor<T>;
    constructor(executor:Executor<T>){
        this.executor=executor;

    }

    subscribe(observer:Observer<T>):Subscription{
        const cleanup=this.executor(observer);
    }
    return{
        unsubscribe(){
            if(cleanup){
                cleanup();
            }
        }
    }
}


// asyncObservable.subscribe({
//   next(value) {
//     console.log('Received value observer1:', value);
//   },
//   error(err) {
//     console.error('Error observer1:', err);
//   },
//   complete() {
//     console.log('Async Observable completed observer1');
//   },