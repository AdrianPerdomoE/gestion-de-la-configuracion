import { Kart } from './Kart';
export class User {
  constructor(
    public _id: string,
    public name: String,
    public password?: String,
    public email?: string,
    public shoppingKart?: Kart
  ) {}
}
