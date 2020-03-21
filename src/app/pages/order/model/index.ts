import { ID } from '@datorama/akita';
import { CartItem } from '../../cart/model';
import * as uuid from 'uuid';
import { MealItem } from '../../meal/model';


// ?????? string VS DATA
export interface OrderItem {
    id: ID;
    userId: string;
    tableId: string;
    status: string;
    pax: number;
    totalCost?: number,
    createdAt: Date; // ??????? string vs Data
    updatedAt?: Date;
    items?: Array<CartItem & MealItem>;
}

export function createEmptyOrderItem() {
    return {
        id: uuid.v4(),
        userId: '',
        tableId: '',
        status: '',
        pax: 0,
        // items: [],
        createdAt: new Date(),
        //updatedAt: new Date()
    }
}