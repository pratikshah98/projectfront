export class billdetail{
  constructor(
    public fk_bill_id:number,
    public fk_product_id:number,
    public price:number[],
    public qty:number[]
  ){

  }
}
