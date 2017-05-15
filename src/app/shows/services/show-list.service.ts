import { Injectable } from "@angular/core";
import { AbsSummaryService } from "../../abs/services/target.services";
import { ApiService } from "../../core/services/api.service";
import { ShowSummary } from "../models/show";

@Injectable()
export class ShowListService extends AbsSummaryService<ShowSummary> {

  constructor(api : ApiService) {
    super(api, 'shows');
  }

}
