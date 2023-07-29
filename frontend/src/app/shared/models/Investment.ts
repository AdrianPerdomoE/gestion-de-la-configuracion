export class Investment{
    constructor(
        public _id: string,
        public investor_id: string,
        public pyme_id: string,
        public invested: Number,
        public creationDate: Date
    ){}
}