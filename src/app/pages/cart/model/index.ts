import { ID } from '@datorama/akita';

export interface CartItem {
    mealId: ID;
    quantity: number;
    total: number;
}