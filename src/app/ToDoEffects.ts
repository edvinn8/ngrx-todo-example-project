import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addItem, getItems, deleteItem, ToDoActionTypes } from './ToDoActions';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToDoService } from './services/to-do.service';

@Injectable()
export class ToDoEffect {
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getItems),
      switchMap((action) => {
        const itemsLoaded = this.toDoService.getItems();
        return of({ type: ToDoActionTypes.LoadItems, items: itemsLoaded });
      }),
      catchError((error) => of({ type: ToDoActionTypes.ErrorItem, message: error }))
    )
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addItem),
      switchMap((action) => {
        this.toDoService.addItem(action.name);
        const itemsLoaded = this.toDoService.getItems();
        return of({ type: ToDoActionTypes.LoadItems, items: itemsLoaded });
      }),
      catchError((error) => of({ type: ToDoActionTypes.ErrorItem, message: error }))
    )
  );

  deleteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteItem),
      switchMap((action) => {
        this.toDoService.deleteItem(action.item);
        const itemsLoaded = this.toDoService.getItems();
        return of({ type: ToDoActionTypes.LoadItems, items: itemsLoaded });
      }),
      catchError((error) => of({ type: ToDoActionTypes.ErrorItem, message: error }))
    )
  );

  constructor(private actions$: Actions, private toDoService: ToDoService) {}
}
