export class DataWrapper<T> {
  data : T;
}

export class Serializable {

  constructor() {
  }

  fromJSON(json) {
    for (let propName in json) {
      this[propName] = json[propName];
    }
    return this;
  }
}
