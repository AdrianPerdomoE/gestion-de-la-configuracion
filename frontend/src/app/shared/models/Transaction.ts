export class Transaction {
  constructor(
    public _id: string,
    public wallet_id: string,
    public value: number,
    public detail: String,
    public creationDate: Date
  ) {}
}
