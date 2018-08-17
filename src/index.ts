import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

let observable1 = Observable.create((observer: any) => {
  observer.next(`Observable One is alive: ${Date.now()}`);
}).pipe(share());

document.getElementById('sunscribeBtn1').addEventListener('click', () => {
  let subscription1 = observable1.subscribe(
    (result: any) => logItem(result, 1),
  );
});

document.getElementById('sunscribeBtn2').addEventListener('click', () => {
  let subscription2 = observable1.subscribe(
    (result: any) => logItem(result, 2),
  );
});

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