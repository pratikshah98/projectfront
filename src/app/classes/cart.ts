export class Addcart{
  constructor(
    public fk_user_id?:number,
    public fk_pro_id?:number,
    public Qty?:number,
    public tot_price?:number,
    public cart_id?:number
  ){}
}
