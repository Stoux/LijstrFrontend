import { ApiService } from "../../core/services/api.service";
import { Observable } from "rxjs/Observable";
import { TargetDetail } from "../models/target";
import { ShortRating } from "../../shared/models/ratings";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Subject } from "rxjs/Subject";

export abstract class TargetDetailService<TD extends TargetDetail<ShortRating>> {

  constructor(protected api : ApiService,
              private path : string) {

  }

  /**
   * Get the details of a target.
   * @param id The target's ID
   * @returns {Observable<TD>}
   */
  getDetail(id : number) : Observable<TD> {
    return this.api.get(this.pathForId(id));
  }

  protected pathForId(id : number) : string {
    return '/' + this.path + '/' + id;
  }

}

export abstract class TargetDetailResolver<TD extends TargetDetail<ShortRating>> implements Resolve<TD> {


  constructor(private detailService : TargetDetailService<TD>,
              private router : Router,
              private basePath : string) {
  }

  resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : Observable<TD> | Promise<TD> | TD {
    let id = route.params['id'];
    let subject : Subject<TD> = new Subject();
    this.detailService.getDetail(id).finally(() => subject.complete()).subscribe(
      target => {
        subject.next(target);
      },
      error => {
        this.router.navigate(['/' + this.basePath]);
        subject.next(null);
      }
    );

    return subject.asObservable();
  }

}
