export class catpro{
  constructor(
    public cat_name:string,
    public cat_id?:number,
    public pro_name?:string,
    public pro_img?:string,
    public pro_color?:string,
    public pro_price?:number,
    public pro_soh?:number,
    public pro_mfg?:string,
    public pro_desc?:string,
    public fk_cat_id?:number,
    public pro_id?:number
  ){}
}
