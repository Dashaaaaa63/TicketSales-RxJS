export interface ITour {
  name: string;
  description: string;
  tourOperator: string;
  price: string;
  img: string;
  id: string;
  type?: string;
  date?: string;
  // Как выяснилось, в api преподователя попались объекты со свойствами ниже, но они там быть не должны. Но оставим эти свойства что бы не было ошибок
  createdAt?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  cardNumber?: string;
  birthDate?: string | null;
  age?: number | null;
  citizenship?: string | null;
  _id?: string;
}
