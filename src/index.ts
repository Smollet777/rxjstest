import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

let subject = new Subject();

subject.subscribe(
  data => logItem('Observer 1:' + data, 1),
  err => logItem(err, 1),
  () => logItem('Observer 1 completed', 1)
)

subject.next('The first item has been sent from Subject/Observer 1 ')
logItem('...', 2)// визуальное уравнение столбцов
subject.next('Observer 2 is about to subscribe to Subject')
logItem('...', 2)

let observer2 = subject.subscribe(
  data => logItem('Observer 2:' + data, 2),
)

subject.next('The second item has been sent from Subject/Observer 1')
observer2.unsubscribe()

////////////////////////////////////////////////////////////////////////////////////
let behaviorSubject = new BehaviorSubject('behavior Subject init');
logItem('...', 2)
logItem('...', 2)

behaviorSubject.subscribe(
  data => logItem('behaviorSubject:' + data, 1),
  err => logItem(err, 1),
  () => logItem('behaviorSubject completed', 1)
)

behaviorSubject.next('Observer 2 is about to subscribe to BS')
observer2 = behaviorSubject.subscribe(
  data => logItem('Observer 2:' + data, 2),
)
logItem('...', 1)

behaviorSubject.next('The third item has been sent from BS')
observer2.unsubscribe()

////////////////////////////////////////////////////////////////////////////////////
let replaySubject = new ReplaySubject(2) // values to dispatch
replaySubject.subscribe(
  data => logItem('replaySubject:' + data, 1),
  err => logItem(err, 1),
  () => logItem('replaySubject completed', 1)
)

replaySubject.next('The fourth item has been sent from replaySubject')
replaySubject.next('The fifth item has been sent from replaySubject')
replaySubject.next('The sixth item has been sent from replaySubject')

logItem('...', 2); logItem('...', 2); logItem('...', 2)
observer2 = replaySubject.subscribe(
  data => logItem('Observer 2:' + data, 2),
)

function logItem(val: any, column: number) {
  let node = document.createElement('li');
  let textNode = document.createTextNode(val);
  node.appendChild(textNode);
  document.getElementById('list' + column).appendChild(node);
}