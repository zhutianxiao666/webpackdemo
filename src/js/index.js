import '../css/index.less';
import '../css/iconfont.less'

const p1 = new Promise(resolve => {
    resolve(222);
});
p1.then(data => {
    console.log(data);
});
