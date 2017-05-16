import { Injectable } from '@angular/core';
import { ApiService } from "../../core/services/api.service";
import { ShowDetail } from "../models/show";
import { TargetDetailService } from "../../abs/detail/target-detail.service";

@Injectable()
export class ShowDetailService extends TargetDetailService<ShowDetail>{

  constructor(api : ApiService) {
    super(api, 'shows');
  }

}
