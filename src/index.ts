import { Observable } from 'rxjs';

let observable = Observable.create((observer: any) => {
  observer.next('Hello world!');
  observer.next('Hello again!');
  observer.complete();
  observer.next('Will not be received')
});

observable.subscribe(
  (result: any) => logItem(result),
  (error: any) => logItem(`Error: ${error}`),
  () => logItem('Completed')
)

function logItem(val: any) {
  let node = document.createElement('li');
  let textNode = document.createTextNode(val);
  node.appendChild(textNode);
  document.getElementById('list').appendChild(node);
}