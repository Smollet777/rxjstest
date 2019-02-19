import { defaultIfEmpty, every, sequenceEqual } from 'rxjs/operators'
import { iif } from 'rxjs'

import { switchMap } from 'rxjs/operators'
import { empty, from, of } from 'rxjs'
const arr = [1, 3, 5]

const defaultIfNone = empty().pipe(defaultIfEmpty('DEFAULT value IFEMPTY'))
  .subscribe(val => logItem(val, 1));


const Every = from(arr)
  .pipe(
    every((val: any) => val % 2 !== 0)
  ).subscribe((val: boolean) => logItem(`is EVERY value of [${arr}] odd? ${val}`, 1))

const expectedSequence = from(arr);
of([1, 2, 3], arr, [7, 8, 9]).pipe(
  switchMap(a =>
    from(a).pipe(sequenceEqual(expectedSequence)))
).subscribe(x => logItem(`SEQUENCE is EQUAL ${arr}? ${x}`, 2))

let subscribeToFirst = true;
const firstOrSecond = iif(
  () => subscribeToFirst,
  of('first'),
  of('second'),
)
firstOrSecond.subscribe(value => logItem(`IIF value = ${value}`, 1));

function logItem(val: any, column: number) {
  let node = document.createElement('li')
  let textNode = document.createTextNode(val)
  node.appendChild(textNode)
  document.getElementById('list' + column).appendChild(node)
}