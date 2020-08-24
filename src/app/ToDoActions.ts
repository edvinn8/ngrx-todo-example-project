import { createAction, props } from '@ngrx/store';
import { Item } from './models/item';

export enum ToDoActionTypes {
  GetItems = '[to-do] get items',
  LoadItems = '[to-do] load items',
  AddItem = '[to-do] add item',
  DeleteItem = '[to-do] delete item',
  ErrorItem = '[to-do] error item'
}

export const getItems = createAction(ToDoActionTypes.GetItems);

export const loadItems = createAction(ToDoActionTypes.LoadItems, props<{ items: Item[] }>());

export const addItem = createAction(ToDoActionTypes.AddItem, props<{ name: string }>());

export const deleteItem = createAction(ToDoActionTypes.DeleteItem, props<{ item: Item }>());

export const errorItem = createAction(ToDoActionTypes.ErrorItem, props<{ message: string }>());
