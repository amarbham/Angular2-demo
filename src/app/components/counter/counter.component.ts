import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'counter',
  providers: [],
  template: require('./counter.template.html')
})

export class CounterComponent {
    constructor() { }

    @Input() currentSelected: any;
    @Input() counterData: any;
    @Output() counterChange = new EventEmitter();
    counterValue = 0;

  next() {
    if (this.counterValue >= this.counterData.length - 1) return 

    this.counterValue++
   
    this.counterChange.emit({
      value: this.counterValue,
      selected: this.currentSelected = this.counterData[this.counterValue]
    })
  }

  previous() {
    if (this.counterValue <= 0 ) return;

    this.counterValue--
    
    this.counterChange.emit({
      value: this.counterValue,
      selected: this.currentSelected = this.counterData[this.counterValue]
    })
  }
}