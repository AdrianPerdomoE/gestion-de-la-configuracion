export class OrderItem{
    constructor(
        public _id:string,
        public order_id: string,
        public product_id: string,
        public amount: Number,
        public storeName: string
    ){
      
    }
}