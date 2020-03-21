import { ID } from '@datorama/akita';
import { CartItem } from '../../cart/model';
import { MealItem } from '../../meal/model';

export interface HistoryItem {
    id: ID,
    userId: string,
    tableId: string,
    status: string,
    pax: number,
    createdAt: Date,
    updatedAt: Date;
    items: Array<CartItem & MealItem>;
}