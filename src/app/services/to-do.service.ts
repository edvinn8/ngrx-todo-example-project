import { Injectable } from '@angular/core';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  constructor() {}

  getItems() {
    const items = JSON.parse(window.localStorage.getItem('items'));
    return items === null ? [] : items;
  }

  addItem(addItem: string) {
    const itemsStored = window.localStorage.getItem('items');
    let items = [];
    if (itemsStored !== null) {
      items = JSON.parse(itemsStored);
    }
    const item: Item = {
      id: items.length + 1,
      name: addItem
    };
    items.push(item);
    window.localStorage.setItem('items', JSON.stringify(items));
  }

  deleteItem(deleteItem: Item) {
    const items = JSON.parse(window.localStorage.getItem('items'));
    const saved = items.filter((item: { id: number }) => {
      return item.id !== deleteItem.id;
    });
    window.localStorage.setItem('items', JSON.stringify(saved));
  }
}
