import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';
import { from, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

// create an Observable
// const observable = Observable.create((observer: any) => {
//   observer.next('Hello');
//   setInterval(() => {
//     observer.next('Hi, I am good');
//   }, 2000);
// });

// const observer = observable.subscribe((x: any) => console.log(x));
// setTimeout(() => {
//   observer.unsubscribe();
// }, 6000);
// const observer2 = observable.subscribe((x: any) =>
//   console.log('This is the second subscription', x)
// );
// // setTimeout(() => {
// //   observer2.unsubscribe();
// // }, 6000);
// observer.add(observer2); // unsubscribe both the subscription together

//subject
// const subject = new Subject();
// console.log('Subject');

// subject.next(-1); // doesn't emit this value
// subject.subscribe((x) => {
//   console.log(x);
// });
// subject.next(0);
// subject.next(2);
// subject.next(3);
// subject.next(4);

// //behaviour subject
// const behaviourSubject = new BehaviorSubject(100);
// console.log('behaviour Subject');

// behaviourSubject.next(-2); // emits this value
// behaviourSubject.subscribe((x) => {
//   console.log(x);
// });
// behaviourSubject.next(-3);
// behaviourSubject.next(-4);

// //Replay Subject
// const replaySubject = new ReplaySubject(3); //store n numbber of items that you specify in the  constructor
// replaySubject.next(1); // doesn't store this value
// replaySubject.next(2);
// replaySubject.next(3);
// replaySubject.next(4);
// console.log('Replay Subject');

// replaySubject.subscribe((e) => {
//   console.log(e);
// });

// //Async subject
// const asyncSubject = new AsyncSubject(); // doesn't store the emitted values. Returns the last value when the subscription is complete
// asyncSubject.next(1);
// asyncSubject.next(2);
// asyncSubject.next(3);
// asyncSubject.complete();
// asyncSubject.subscribe((e) => {
//   console.log('Async Subject');
//   console.log(e);
// });

//Operators

//filter
// const source = from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
// const oddNumbers = source.pipe(
//   filter((n) => {
//     return n % 2 !== 0;
//   })
// );

//map
// const mappedArray = source.pipe(
//   filter((n) => {
//     return n % 2 !== 0;
//   }),
//   map((n) => {
//     return n * 10;
//   })
// );

// mappedArray.subscribe((n) => {
//   console.log(n);
// });

// RxJS v6.5+
// import { ajax } from 'rxjs/ajax';
// import { forkJoin } from 'rxjs';

// /*
//   when all observables complete, provide the last
//   emitted value from each as dictionary
// */
// forkJoin(
//   // as of RxJS 6.5+ we can use a dictionary of sources
//   {
//     google: ajax.getJSON('https://api.github.com/users/google'),
//     microsoft: ajax.getJSON('https://api.github.com/users/microsoft'),
//     users: ajax.getJSON('https://api.github.com/users'),
//   }
// )
//   // { google: object, microsoft: object, users: array }
//   .subscribe(console.log);

// // RxJS v6+
// import { interval, fromEvent } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

// fromEvent(document, 'click')
//   .pipe(
//     // restart counter on every click
//     switchMap(() => interval(1000))
//   )
//   .subscribe(console.log);
// const obserable = of(1, 2, 3);
// const observer = {
//   next: (x) => console.log(x),
// };
// obserable.subscribe((x) => {
//   console.log(x);
// });
const observable = of(1, 2, 3, 4);
// const squareValues = map((val: number) => val * val);
// squareValues(observable).subscribe((x) => console.log(x));
const data: number[] = [];
observable
  .pipe(
    map((val) => val * val),
    filter((val) => val % 2 !== 0)
  )
  .subscribe((x) => data.push(x));
console.log(data);
@Component({
  selector: 'angular-nx-rxjs-practice',
  templateUrl: './rxjs-practice.component.html',
  styleUrls: ['./rxjs-practice.component.scss'],
})
export class RxjsPracticeComponent implements OnInit {
  time = new Observable<string>((observer) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

  constructor() {}

  ngOnInit(): void {}
}
