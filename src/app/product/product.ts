export interface Product {
  id:number;
  title:string;
  price:number;
  description:string;
  category:string;
  image:string;
  raiting:RaitingProps;
}
interface RaitingProps{
  rate:number;
  count:number;
}