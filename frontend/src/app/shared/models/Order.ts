export class Order {
  constructor(
    public _id: string,
    public client_id: string,
    public value: Number,
    public creationDate: Date
  ) {}
}
