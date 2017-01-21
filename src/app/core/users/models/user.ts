export class User {
  id : number;
  displayName : string;
}

export class FullUser extends User {
  username : string;
  email : string;
  avatar : boolean;
  approvedFor : string;
}


