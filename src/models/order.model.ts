export class Order {
    constructor(
        public sellerId: string,
        public timestamp: number,
        public itemId: string,
        public title: string,
        public brand: string,
        public location: string,
        public selling_price: number,
        public normal_price:number,
        public purchase_price: number,
    ) {}

}


