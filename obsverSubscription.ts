import { Observable } from "./observable.js";

const observable = new Observable()<number>((observer) => {
  console.log("Observale started");
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});
observable.subscribe({
  next(value) {
    console.log("Recieved value:", value);
  },
  error(err) {
    console.error("Error:", err);
  },
  complete() {
    console.log("Observable completed");
  },
});


observable.subscribe({
    next(value){
        console.log('Recieved value:',value);
    },
   error(err){
    console.error('Error:',err)
   }
   complete(){
    console.log('Observable completed')

   }
    
})


const asyncObservable=new Observable<string>((observer)=>{
  console.log('Async Observable started');
  setTimeout(()=>{
    observer.next('Hello');
    observer.next('World');
    observer.complete();
  },5000);
})

asyncObservable.subscribe({
  next(value){
    console.log('Recieved value:',value)
  },
  error(err){
    console.log('Error:',err)
  },
  complete(){
    console.log('Async Observable completed')
  }
})

asyncObservable.subscribe({
  next(value) {
    console.log('Received value observer1:', value);
  },
  error(err) {
    console.error('Error observer1:', err);
  },
  complete() {
    console.log('Async Observable completed observer1');
  },
})


const timerObservable=new Observable<number>((observer)=>{
  console.log("Timer Observable started");
  let count=0;
  const intervalId=setInterval(()=>{
    observer.next(count++);
    console.log('Generating value:',count);
  },1000);
  return()=>clearInterval(intervalId);
});
const subscription=timrerObservable.subscribe({
  next(value){
    console.log("Receivied value:",value);
  }
  error(err){
    console.error("Error:",err);
  }
  complete(){
    console.log('Timer Observable completed');
  }
});


setTimeout(()=>{
  console.log('Unsubscribe from timer observable');
  subscription.unsubscribe();
},5000)