import { Observable, from, fromEvent, of, interval, range, timer, defer, empty, never, throwError } from 'rxjs'

import { merge } from 'rxjs'
import { switchMap, map } from 'rxjs/operators'

const observable = Observable.create((observer: any) => {
  observer.next('Hello')
})

const subscribe1 = observable.subscribe(
  (data: any) => logItem('subscribe:' + data, 1),
  (err: any) => logItem(err, 1),
  () => logItem('subscribe completed', 1)
)

const click = fromEvent(document, 'click')
  .pipe(map((event: any) => `Event time: ${new Date(event.timeStamp)}`))
  .subscribe(val => logItem(val, 1))

const sourceFrom = from('str')/*promise or iterables*/.subscribe(char => logItem(char, 2))

logItem('...', 2)

const sourceOf = of({ name: 'Object' }, ['a', 'r', 'r', 'a', 'y'], function foo() {
})
  .subscribe(val => logItem(val, 2))

const intevral = interval(1000)
  .subscribe(val => logItem(`interval ${val} sec`, 1))

const ranje = range(1, 10)
  .subscribe(val => console.log('range ' + val))

const withoutDef = of(`moment of obs creation ${new Date()}`)
const withDef = defer(() => of(`moment of obs subscription ${new Date()}`))
timer(2000)
  .pipe(
    switchMap((_: any) => merge(withoutDef, withDef))
  ).subscribe(x => logItem(x, 2))

logItem('...', 2)

const emptySubscribe = empty().subscribe(
  (data: any) => logItem('emptySubscribe:' + data, 1),
  (err: any) => logItem(err, 1),
  () => logItem('emptySubscribe just ends', 1)
)

const neverSubscribe = never().subscribe(
  (data: any) => logItem('neverSubscribe:' + data, 1),
  (err: any) => logItem(err, 1),
  () => logItem('neverSubscribe completed', 1)
)
logItem('there is "never" operator but it\'s not shoving for obvious reasons', 1)

const throwErrorSubscribe = throwError(new Error('error!')).subscribe(
  (data: any) => logItem('neverSubscribe:' + data, 1),
  (err: any) => logItem(err, 1),
  () => logItem('neverSubscribe completed', 1)
)

function logItem(val: any, column: number) {
  let node = document.createElement('li')
  let textNode = document.createTextNode(val)
  node.appendChild(textNode)
  document.getElementById('list' + column).appendChild(node)
}