export class fivesellpro{
  constructor(
    public pro_name?:string,
    public pro_img?:string,
    public pro_color?:string,
    public pro_price?:number,
    public pro_soh?:number,
    public pro_mfg?:string,
    public pro_desc?:string,
    public fk_cat_id?:number,
    public pro_id?:number,
    public fk_bill_id?:number,
    public fk_product_id?:number,
    public price?:number[],
    public qty?:number[],
    public bill_amount?:number,
    public fk_user_id?:number,
    public date?:Date,
    public bill_type?:string


  ){}
}
