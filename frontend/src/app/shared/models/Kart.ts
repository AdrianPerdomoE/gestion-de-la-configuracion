import { KartItem } from "./KartItem";

export class Kart{
    constructor(
        public toPay:number,
        public items: Array<KartItem>,
        public amountItems:number
        ){}
}