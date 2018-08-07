1、
function getPropertyValue(obj, propertyPath) {
  if (!obj) {
    return null;
  }

  let result = obj;
  const propertyNames = propertyPath.split('.');
  for (let index = 0; index < propertyNames.length; index += 1) {
    result = result[propertyNames[index]];
    if (!result) {
      return result;
    }
  }

  return result;
}
/*
split(),字符串的一个方法，用于把字符串按照某种规则分割成数组。返回值array，参数有separator，字符串或正则表达式，从该参数的地方分割；
limit参数，指定返回的数组的最大长度
比如：
var str="How are you doing today?";
var n=str.split(" ");   输出How,are,you,doing,today? ，即按空字符分割
var n=str.split("");  输出H,o,w, ,a,r,e, ,y,o,u, ,d,o,i,n,g, ,t,o,d,a,y,? ，分隔每个字符
var n=str.split("o"); 输出H,w are y,u d,ing t,day?   使用字符o进行分割
*/

2、
function setPropertyValue(obj, propertyPath, value) {
  if (obj) {
    const propertyNames = propertyPath.split('.');
    let parentObj = obj;
    for (let index = 0; index < propertyNames.length; index += 1) {
      const propertyName = propertyNames[index];
      if (index < propertyNames.length - 1) {
        const propertyValue = parentObj[propertyName];
        if (!propertyValue) {
          parentObj[propertyName] = {};
        }
        parentObj = parentObj[propertyName];

        continue;
      }

      parentObj[propertyName] = value;
    }
  }
}

3、
export default function handleError(error) {
  let messageText = error.message;
  if (messageText === null || messageText === '') {
    const item = errorMessageMapping.find(x => x.code === error.code);
    if (item !== undefined) {
      messageText = item.message;
    }
  }

  if (messageText === null || messageText === '') {
    messageText = 'System error, please retry later!';
  }

  message.error(messageText);
}

4、
import moment from 'moment';
export default class SlaRecord {
  get applicableFromMoment() {
    if (this.applicableFrom === undefined || this.applicableFrom === null) {
      return null;
    }

    return moment(this.applicableFrom);
  }

  set applicableFromMoment(value) {
    if (!value) {
      this.applicableFrom = null;
      return;
    }

    this.applicableFrom = value.valueOf();
  }

  get applicableFromDateString() {
    if (this.applicableFromMoment != null) {
      return this.applicableFromMoment.format('L');
    }

    return '';
  }

  get applicableToMoment() {
    if (this.applicableTo === undefined || this.applicableTo === null) {
      return null;
    }

    return moment(this.applicableTo);
  }

  set applicableToMoment(value) {
    if (!value) {
      this.applicableTo = null;
      return;
    }

    this.applicableTo = value.valueOf();
  }

  get applicableToDateString() {
    if (this.applicableToMoment != null) {
      return this.applicableToMoment.format('L');
    }

    return '';
  }
}

5、
const httpClient = new OSHttpClient();
export default class SLAServiceProxy {
  loadSLALocationsForCustomer(customerId) {
    return new Promise((resolve, reject) => {
      const url = `/pivotwebservice/api/SLA/locations?customerId=${customerId}`;
      httpClient.get(url, (resp) => {
        resolve(resp.SLALocations);
      }, (error) => {
        reject(error);
      });
    });
  }

  loadSLARecordsForLocation(locationId) {
    return new Promise((resolve, reject) => {
      const url = `/pivotwebservice/api/SLA?locationId=${locationId}`;
      httpClient.get(url, (resp) => {
        resp.SLAItems.forEach((item) => { item.__proto__ = SlaRecord.prototype; });
        resolve(resp.SLAItems);
      }, (error) => {
        reject(error);
      });
    });
  }

  submitSLAModification(modificationRequest) {
    return new Promise((resolve, reject) => {
      const url = '/pivotwebservice/api/SLA';
      httpClient.put(url, modificationRequest, (resp) => {
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  }
}

6、
/*
NaN属性代表非数字值的特殊值，标识某个值不是数字。
isNaN()全局函数可判断一个值是否是NaN值
*/

7、
/*
parseInt(string,radix) 这个函数将其第一个参数转换为字符串，解析它，并返回一个整数或NaN。如果不是NaN，返回的值是一个指定基数的整数
参数string是要被解析的值
参数radix是一个介于2和36之间的整数，表示基数。比如10就是用十进制解析
：radix参数为10 将会把第一个参数看作是一个数的十进制表示，8 对应八进制，16 对应十六进制，等等。基数大于 10 时，用字母表中的字母来表示大于 9 的数字。例如十六进制中，使用 A 到 F
*/

8、
/*
object.create(prototype,descriptors)，是object对象的一个函数，用来创建一个具有指定原型且可选择性地包含指定属性的对象
参数prototype是要用作原型的对象，可以为null；参数descriptors包含一个或多个属性描述符的 JavaScript 对象。  
返回一个具有指定的内部原型且包含指定的属性（如果有）的新对象。
*/
var newObj = Object.create(null, {
            size: {
                value: "large",
                enumerable: true
            },
            shape: {
                value: "round",
                enumerable: true
            }
        });




































