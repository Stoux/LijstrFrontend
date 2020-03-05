export class DataWrapper<T> {
  data: T;
}

export class PageResult<T> {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  result: T[];
}

export class Serializable {

  constructor() {
  }

  fromJSON(json) {
    for (const propName in json) {
      if (json.hasOwnProperty(propName)) {
        this[propName] = json[propName];
      }
    }
    return this;
  }
}
