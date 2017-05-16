
export class ShowStatus {
  public static readonly AIRED : string = "AIRED";
  public static readonly RUNNING : string = "RUNNING";
  public static readonly PLANNED : string = "PLANNED";
  public static readonly CANCELED : string = "CANCELED";
}

export class ShowSeasonSummary {

  seasonNumber : number;
  episodes : number;
  status : ShowStatus;

}
