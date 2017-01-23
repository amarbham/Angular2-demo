import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'counter',
  providers: [],
  template: require('./counter.template.html')
})

export class CounterComponent implements OnInit {
    constructor() {  console.log(this) }

    @Input() counterValue = 0;
    @Input() counterData: any;
    @Output() counterChange = new EventEmitter();

    selected: any;
    
  next(counterValue: number) {

    if (counterValue >= this.counterData.length - 1) {
      this.selected = this.counterData[0]
      return this.counterValue = 0;
    }
    this.counterValue++
    this.selected = this.counterData[this.counterValue];

    this.counterChange.emit({
      value: this.counterValue
    })
  }

  previous(counterValue: number) {

    if(counterValue <= 0){
      this.selected = this.counterData[this.counterData.length - 1]
      return this.counterValue = this.counterData.length - 1
    }
    this.counterValue--
    this.selected = this.counterData[this.counterValue]

    this.counterChange.emit({
      value: this.counterValue
    })
  }

    ngOnInit() { }
}