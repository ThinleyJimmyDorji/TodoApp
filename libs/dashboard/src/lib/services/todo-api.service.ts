import { Injectable } from '@angular/core';
import { Tasks } from '../../tasks';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  // private todoSubject = new BehaviorSubject<Tasks[]>([]);
  private apiUrl = 'http://localhost:5000/tasks';
  httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Tasks[]> {
    // return this.http
    //   .get<Tasks[]>(this.apiUrl)
    //   .pipe(tap((res) => this.todoSubject.next(res))); // next here
    return this.http.get<Tasks[]>(this.apiUrl).pipe(map((res) => res));
  }

  getTask(id: number): Observable<Tasks> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Tasks>(url).pipe(map((res) => res));
  }

  onSubmit(payload: Tasks): Observable<any> {
    return this.http.post(this.apiUrl, payload, this.httpOptions);
  }

  onDelete(task: Tasks): Observable<any> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http
      .delete<Tasks>(url, this.httpOptions)
      .pipe(
        tap(
          () => console.log(`Task deleted id:${task.id}`),
          catchError(this.handleError<Tasks>('onDelete'))
        )
      );
  }

  onUpdate(task: Tasks, taskId: number): Observable<any> {
    console.log('inside Update method');
    const url = `${this.apiUrl}/${taskId}/`;
    return this.http
      .put(url, task, this.httpOptions)
      .pipe(
        tap(
          () => console.log('Updated'),
          catchError(this.handleError('update'))
        )
      );
  }

  updateStatus(task: Tasks): Observable<any> {
    // debugger;
    const url = `${this.apiUrl}/${task.id}/`;
    return this.http
      .put(
        url,
        {
          id: task.id,
          title: task.title,
          description: task.description,
          startTime: task.startTime,
          endTime: task.endTime,
          status: 'completed',
          dependencies: task.dependencies,
        },
        this.httpOptions
      )
      .pipe(
        tap(
          () => console.log('task status updated'),
          catchError(this.handleError('updateStatus'))
        ),
        map((res) => res)
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // getTodoObs(): Observable<Tasks[]> {
  //   return this.todoSubject.asObservable();
  // }
}
