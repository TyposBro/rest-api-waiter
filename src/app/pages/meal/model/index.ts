import { ID } from '@datorama/akita';

export interface MealItem {
    id: ID;
    title: string;
    description: string;
    price: number;
    imgUrl?: string;
    menuId: ID;
}