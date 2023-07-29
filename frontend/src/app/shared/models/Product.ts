export class Product{
    constructor(
        public _id:string,
        public name: String,
        public pyme_id : string,
        public price: number,
        public description: String,
        public stock:number,
        public ignored:Boolean,
        public creationDate: Date,
        public updateDate:Date,
        public image:String
    ){

    }
}