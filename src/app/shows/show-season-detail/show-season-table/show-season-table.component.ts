import { Component, Input, OnInit } from '@angular/core';
import { ShowEpisodeDetail, ShowSeasonDetail } from '../../models/show';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'lijstr-show-season-table',
  templateUrl: './show-season-table.component.html',
  styleUrls: ['./show-season-table.component.scss']
})
export class ShowSeasonTableComponent implements OnInit {

  @Input() season: ShowSeasonDetail;

  public avgLijstrRating: string = undefined;
  public avgImdbRating: string = undefined;
  public avgTmdbRating: string = undefined;

  private decimalPipe: DecimalPipe;

  constructor() {
    this.decimalPipe = new DecimalPipe('en-US');
  }

  ngOnInit(): void {
    this.avgLijstrRating = this.calcAverage(episode => null, episode => null); // TODO: LijstrRating
    this.avgImdbRating = this.calcAverage(episode => episode.imdbRating, episode => episode.imdbVotes);
    this.avgTmdbRating = this.calcAverage(episode => episode.tmdbRating, episode => episode.tmdbVotes);
  }

  private calcAverage(
    ratingFetcher: (episode: ShowEpisodeDetail) => number | null,
    votesFetcher: (episode: ShowEpisodeDetail) => number | null): string {
    let nrOfRatings = 0;
    let combinedTotal = 0.0;
    let totalNrOfVotes = 0;

    for (const episode of this.season.episodes) {
      const rating = ratingFetcher(episode);
      if (rating !== undefined && rating !== null) {
        nrOfRatings++;
        combinedTotal += rating;

        const nrOfVotes = votesFetcher(episode);
        if (nrOfVotes !== undefined && nrOfVotes !== null) {
          totalNrOfVotes += nrOfVotes;
        }
      }
    }

    if (nrOfRatings === 0) {
      return 'N/A';
    }

    let result = this.decimalPipe.transform(combinedTotal / nrOfRatings, '1.1-1');
    if (totalNrOfVotes > 0) {
      result += ` (${totalNrOfVotes} votes)`;
    }
    return result;
  }

}
