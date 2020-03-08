import { Observable, ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';

/**
 * Class that fetches a given value, caches it and returns it as observables.
 */
export class CachedSubject<T> {

  private hasFetched: boolean;
  private subject: ReplaySubject<T>;

  constructor(private fetcher: () => Observable<T> | T ) {
    this.wipe();
  }

  public wipe() {
    if (this.subject instanceof ReplaySubject) {
      this.subject.complete();
    }

    this.subject = new ReplaySubject<T>(1);
    this.hasFetched = false;
  }

  /**
   * Get an observable that will return a single result.
   */
  public asObservable(): Observable<T> {
    this.fetch();
    return this.subject.asObservable().pipe(first());
  }

  private fetch(): void {
    // Check if already fetched
    if (this.hasFetched) {
      return;
    }
    this.hasFetched = true;

    // Fetch the result
    const fetchedResult = this.fetcher();
    if (fetchedResult instanceof Observable) {
      // Might be an observable, wait for it to resolve
      fetchedResult.subscribe(
        result => this.subject.next(result),
        error => this.subject.next(error)
      );
    } else {
      // Otherwise instantly add it to the subject
      this.subject.next(fetchedResult);
    }
  }





}
