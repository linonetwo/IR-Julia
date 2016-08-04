const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
});

const logit = (message) => {
  console.log(message);
}

class 筮草 {
  constructor() {
    this.id = uuid();
  }
}

class 筮草堆 {
  constructor(数量) {
    this.length = 0;
    this.堆 = [];
    if (数量 > 1) {
      for (let i = 1; i <= 数量; i++) { // 备好一个有 55 根筮草的筮草堆
        this.堆.push(new 筮草());
        this.length++;
      }
    }
  }

  取出一根放到(array) {
    array.push(this.堆.pop());
    this.length--;
  }

  打乱() {
    let len = this.堆.length;
    for(let i = 0; i < len - 1; i++) {
      let idx = Math.floor(Math.random() * (len - i));
      let temp = this.堆[idx];
      this.堆[idx] = this.堆[len - i - 1];
      this.堆[len - i -1] = temp;
    }
  }

  分成(左堆, 右堆) {
    let numberToLeft = Math.floor(Math.random() * this.堆.length);
    let quentityToRight = this.堆.length - numberToLeft + 1;
    for (let i = 1; i <= numberToLeft; i++) {
      一堆筮草.取出一根放到(左堆.堆);
    }
    for (let i = 1; i <= quentityToRight; i++) {
      一堆筮草.取出一根放到(右堆.堆);
    }
    this.length = this.堆.length;
  }

  合成(左堆, 右堆, 手指间 = []) {
    while (左堆.堆.length > 0) {
      左堆.取出一根放到(this.堆);
    }
    while (右堆.堆.length > 0) {
      右堆.取出一根放到(this.堆);
    }
    while (手指间.length > 0) {
      this.堆.push(手指间.pop());
    }
    this.length = this.堆.length;
  }

  以四相模() {
    return this.堆.length % 4 ? this.堆.length % 4 : 4;
  }
}





const 一堆筮草 = new 筮草堆(55); // 先搞到 55 根筮草，55 象征天数、地数之和：天数1、3、5、7、9奇，地数2、4、6、8、10偶



一堆筮草.打乱(); // 先打乱筮草堆
let 一边 = []; // 然后在桌子上流出个空位
for (let i = 1; i <= 6; i++) { // 然后选出 6 根筮草放在一边，代表六爻
  一堆筮草.取出一根放到(一边);
}


一堆筮草.打乱(); // 再打乱筮草堆
一堆筮草.取出一根放到(一边); // 从剩下的 49 根里再取出一根，代表你想测算的东西，把它放到一边
// 这时候我们的筮草堆里会剩下 48 根筮草


const 得爻 = (用来算的筮草堆) => { // 接下来是得出一个爻的算法，纯函数 (用来算的筮草堆 :筮草堆) => 爻 :number
  用来算的筮草堆.打乱(); // 先打乱筮草堆
  let 手指间 = []; // 我们可以把筮草夹在手指间，也可以直接丢在桌上，看装逼需求而定
  logit(`此时筮草堆余有${用来算的筮草堆.length}策`);
  用来算的筮草堆.取出一根放到(手指间); // 取出一根，代表太极，夹在手指间

  // 然后把筮草分成左右两堆，代表两仪
  let 左堆筮草 = new 筮草堆(0);
  let 右堆筮草 = new 筮草堆(0);

  用来算的筮草堆.分成(左堆筮草, 右堆筮草);

  // 然后把每一堆筮草都四个四个地取出来，代表四象，直到剩下 1、2、3、4 根，把剩下的这几根也放进手指间
  let left = 左堆筮草.以四相模();
  logit(`第一次左组最后一揲为${left}`);
  let right =  右堆筮草.以四相模();
  logit(`第一次右组最后一揲为${left}`);
  for (let i = 1; i <= left; i++) {
    左堆筮草.取出一根放到(手指间);
  }
  for (let i = 1; i <= left; i++) {
    右堆筮草.取出一根放到(手指间);
  }

  用来算的筮草堆.合成(左堆筮草, 右堆筮草); // 然后把筮草都合成一堆

  // 再来一把 2
  用来算的筮草堆.取出一根放到(手指间); // 取出一根，代表太极，夹在手指间
  用来算的筮草堆.分成(左堆筮草, 右堆筮草);
  left = 左堆筮草.以四相模();
  logit(`第二次左组最后一揲为${left}`);
  right =  右堆筮草.以四相模();
  logit(`第二次右组最后一揲为${left}`);
  for (let i = 1; i <= left; i++) {
    左堆筮草.取出一根放到(手指间);
  }
  for (let i = 1; i <= left; i++) {
    右堆筮草.取出一根放到(手指间);
  }
  用来算的筮草堆.合成(左堆筮草, 右堆筮草);

  // 再来一把 3
  用来算的筮草堆.取出一根放到(手指间); // 取出一根，代表太极，夹在手指间
  用来算的筮草堆.分成(左堆筮草, 右堆筮草);
  left = 左堆筮草.以四相模();
  logit(`第三次左组最后一揲为${left}`);
  right =  右堆筮草.以四相模();
  logit(`第三次右组最后一揲为${left}`);
  for (let i = 1; i <= left; i++) {
    左堆筮草.取出一根放到(手指间);
  }
  for (let i = 1; i <= left; i++) {
    右堆筮草.取出一根放到(手指间);
  }

  // 这时手指间的筮草数量模 4 得到的数字会是 6、7、8、9
  let 爻 = 手指间.length;

  用来算的筮草堆.合成(左堆筮草, 右堆筮草, 手指间);

  return 爻
}




console.log(得爻(一堆筮草));
