export class orderdetail{
  constructor(
    public fk_order_id?:number,
    public fk_pro_id?:number,
    public qty?:number,
    public price?:number,
    public orderdetails_id?:number

  ){}
}
