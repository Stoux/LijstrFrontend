export class DataWrapper<T> {
  data : T;
}

export class Serializable {

  constructor() {
  }

  fromJSON(json) {
    for (let propName in json) {
      if (this.hasOwnProperty(propName)) {
        this[propName] = json[propName];
      }
    }
    return this;
  }
}
