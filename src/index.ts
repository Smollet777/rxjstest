import { Observable } from 'rxjs';

let observable1 = Observable.create((observer: any) => {
  observer.next('Observable One is alive!');
  setInterval(() => {
    observer.next('Observable One')
  }, 5000)
});

let observable2 = Observable.create((observer: any) => {
  observer.next('Observable Two is alive!');
  setInterval(() => {
    observer.next('Observable Two')
  }, 2500)
});

let subscription1 = observable1.subscribe(
  (result: any) => logItem(result, 1),
)

let subscription2 = observable2.subscribe(
  (result: any) => logItem(result, 2),
)

document.getElementById('unsunscribeBtn1').addEventListener('click', () => {
  subscription1.unsubscribe()
})
document.getElementById('unsunscribeBtn2').addEventListener('click', () => {
  subscription2.unsubscribe()
})

document.getElementById('addSubscriptionBtn').addEventListener('click', () => {
  subscription2.add(subscription1)
})

function logItem(val: any, column: any) {
  let node = document.createElement('li');
  let textNode = document.createTextNode(val);
  node.appendChild(textNode);
  if (column == 1) {
    document.getElementById('list1').appendChild(node);
  } else if (column == 2) {
    document.getElementById('list2').appendChild(node);
  }
}