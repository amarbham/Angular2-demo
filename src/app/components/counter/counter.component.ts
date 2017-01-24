import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'counter',
  providers: [],
  template: require('./counter.template.html')
})

export class CounterComponent implements OnInit {
    constructor() { }

    @Input() currentSelected: any;
    @Input() counterData: any;
    @Output() counterChange = new EventEmitter();
    counterValue = 0;

    
  next(counterValue: number) {

    if (counterValue >= this.counterData.length - 1) return 

    this.counterValue++
   
    this.counterChange.emit({
      value: this.counterValue,
      selected: this.currentSelected = this.counterData[this.counterValue]
    })
  }

  previous(counterValue: number) {
    if (counterValue <= 0 ) return;

    this.counterValue--

    // if(counterValue <= 0){
    //   this.currentSelected = this.counterData[this.counterData.length - 1]
    //   return this.counterValue = this.counterData.length - 1
    // }
    
    this.counterChange.emit({
      value: this.counterValue,
      selected: this.currentSelected = this.counterData[this.counterValue]
    })
  }

    ngOnInit() { }
}