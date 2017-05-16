import { Injectable } from '@angular/core';
import { TargetDetailResolver } from "../../../abs/detail/target-detail.service";
import { ShowDetail } from "../../models/show";
import { Router } from "@angular/router";
import { ShowDetailService } from "../../services/show-detail.service";

@Injectable()
export class ShowDetailResolver extends TargetDetailResolver<ShowDetail> {

  constructor(detailService : ShowDetailService,
              router : Router) {
    super(detailService, router, 'shows');
  }

}
