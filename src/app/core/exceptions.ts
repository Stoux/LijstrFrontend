import { Serializable } from "./models/common";

export class LijstrException extends Serializable {
  timestamp : string;
  status : number;
  error : string;
  message : string;

  static forMessage(message : string) : LijstrException {
    return this.forErrorMessage(999, message);
  }

  static forErrorMessage(status : number, message : string) {
    let e = new LijstrException();
    e.message = message;
    e.error = message;
    e.status = status;
    e.timestamp = new Date().toISOString();
    return e;
  }

  toString() {
    return LijstrException.toString(this);
  }

  static toString(error) : string {
    return "[" + error.status + " - " + error.error + "] " + error.message;
  }

}
