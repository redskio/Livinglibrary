export class Item {

    public $key: string;

    constructor(
        public title: string,
        public content: string,
        public location: string,
        public date: number,
        public duedate: number,
        public selling_price: number,
        public normal_price:number,
        public purchase_price: number,
        public imgurl1: string,
        public imgurl2: string,
        public imgurl3: string,
    ) {}

}