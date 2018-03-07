import { Component, OnInit } from '@angular/core';
import { Box } from './box';
import { Product } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Coffee Box calculator';
  boxEdge = 0;
  numOf1000g = 0;
  numOf400g = 0;
  numOf200g = 0;

  boxes : Box [];
  numOfBoxesRequired = 0;
  products: Product [];

  ngOnInit() {}

  calculate(numOf1000g: number, numOf400g: number, numOf200g: number) : void {
    console.log('this.boxEdge', this.boxEdge);
    console.log('numOf1000g', numOf1000g);
    this.boxes = [];
    let initialBox = new Box(this.boxEdge, this.boxEdge, this.boxEdge);
    this.boxes.push(initialBox);

    this.products = [];
    for(let i = 0; i < numOf1000g; i++) { // loop through the 1000g orders
      this.products.push(new Product(14, 26, 10));
    }

    for(let j = 0; j < numOf400g; j++) { // loop through the 1000g orders
      this.products.push(new Product(22, 26, 2));
    }

    for(let k = 0; k < numOf200g; k++) { // loop through the 1000g orders
      this.products.push(new Product(16, 23, 2));
    }

    this.products.forEach((p: Product) => {
      let boxWithSpaceFonud = false;
      
      for(let j = 0; j < this.boxes.length; j++) { // loop through existing boxes and see if it can fit it inside any
          let fits = this.boxes[j].addItem(p);
          if(fits) {
              boxWithSpaceFonud = true;
              break;
          }
      }
      
      if(!boxWithSpaceFonud) { // if no box can fit the 1000g product, get a new box and put it in
          let newBox: Box = new Box(this.boxEdge, this.boxEdge, this.boxEdge);
          newBox.addItem(p);
          this.boxes.push(newBox);
      }
    })

    this.numOfBoxesRequired = this.boxes.length;
  }

  reset(): void {
    this.boxEdge = 0;
    this.numOf1000g = 0;
    this.numOf400g = 0;
    this.numOf200g = 0;
    this.numOfBoxesRequired = 0;
  }
  
}
