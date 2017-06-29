import { Component, Input } from '@angular/core';

import { Item } from './../../models/item.model';

@Component({
  selector: 'item-img',
  templateUrl: 'item-img.component.html'
})
export class ItemImg {

  @Input() itemImg: string;
  constructor() {}

}
