export class Suscription {
  constructor(
    public _id: string,
    public suscriptor_id: string,
    public pyme_id: string,
    public charge: Number,
    public creationDate: Date
  ) {}
}
