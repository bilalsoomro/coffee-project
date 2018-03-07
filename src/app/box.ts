import { Product } from './product';

export class Box {
    width: number;
    height: number;
    length: number;

    widthConsumed: number;
    heightConsumed: number;
    lengthConsumed: number;

    products: Product [];

    constructor(width: number, height: number, length: number) {
        this.width = width;
        this.height = height;
        this.length = length;

        this.widthConsumed = 0;
        this.heightConsumed = 0;
        this.lengthConsumed = 0;

        this.products = [];
    }

    addItem(p: Product): boolean {
        let fits: boolean = false;
        
        if(this.length - this.lengthConsumed >= p.length) { // check if you can stack in the corner or next to the item
            this.lengthConsumed += p.length;
            if(this.widthConsumed == 0)
                this.widthConsumed = p.width;
            if(this.heightConsumed == 0)
                this.heightConsumed = p.height;
            this.products.push(p);
            fits = true;
        } else if(this.width - this.widthConsumed >= p.width) { // if no space beside another item, shift it and make another row and start placing there
            this.widthConsumed += p.width;
            if(this.lengthConsumed == 0)
                this.lengthConsumed = p.length;
            if(this.heightConsumed == 0)
                this.heightConsumed = p.height;
            this.products.push(p);
            fits = true;
        } else if(this.height - this.heightConsumed >= p.height) { // if one level is filled, check if there is space to start laying products above the previous ones
            this.heightConsumed += p.height;
            this.lengthConsumed = p.length;
            this.widthConsumed = p.width;
            this.products.push(p);
            fits = true;
        }

        // console.warn('this.width', this.width + ', this.widthConsumed: ' + this.widthConsumed);
        // console.warn('this.height: ' + this.length + ', this.heightConsumed: ' + this.heightConsumed);
        // console.warn('this.length', this.length + ', this.lengthConsumed: ' + this.lengthConsumed);
    
        return fits;
    }
}

