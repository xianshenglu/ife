预览效果，请在控制台执行下列代码：

preview demo,please execute the code below at the console.

````
let urlArr = window.location.href.split('/');
urlArr.push('index.html');
urlArr.splice(urlArr.findIndex(v => v === 'tree'), 2);
let githubIndex = urlArr.findIndex(v => v === 'github.com');
urlArr.splice(githubIndex, 1);
urlArr[githubIndex] = urlArr[githubIndex] + '.github.io';
window.open(urlArr.join('/'));
````