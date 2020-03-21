import { ID } from '@datorama/akita';

export interface TableItem {
    id: ID;
    tableNumber: number;
    status: string;
    maxSeats: number;
    floor?: number;
}