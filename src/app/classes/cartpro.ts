export class cartpro{
  constructor(
    public fk_user_id?:number,
    public fk_pro_id?:number,
    public Qty?:number,
    public tot_price?:number,
    public pro_name?:string,
    public pro_img?:string,
    public pro_color?:string,
    public pro_price?:number,
    public pro_soh?:number,
    public pro_mfg?:string,
    public pro_desc?:string,
    public fk_cat_id?:number,
    public pro_id?:number,
  ){}
}
