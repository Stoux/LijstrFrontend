export class LijstrException {
  timestamp : string;
  status : number;
  error : string;
  message : string;

  constructor(message : string) {
    this.message = message;
    this.error = message;
    this.status = 999;
    this.timestamp = new Date().toISOString();
  }

}
