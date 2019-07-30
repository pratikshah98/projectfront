export class order{
  constructor(
    public fk_user_id?:number,
    public order_amount?:number,
    public order_date?:Date,
    public order_id?:number,

  ){}
}
