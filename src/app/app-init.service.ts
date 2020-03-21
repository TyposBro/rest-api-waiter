import { Injectable } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { MealService } from './pages/meal/state/meal.service';
import { MenuService } from './pages/menu/state/menu.service';
import { TableService } from './pages/table/state/table.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(
    private tableService: TableService,
    private menuService: MenuService,
    private mealService: MealService
  ) { }

  public httpLoad(): Observable<any> {
    return merge(
        this.tableService.httpLoad(),
        this.menuService.storageSync(),
        this.mealService.storageSync()
    )
  }

//   public init(): Observable<any> {
//     return this.authService.init().pipe(
//       switchMap(result => {
//         if (result) {
//           return merge(
//             this.categoryService.init(),
//             this.categoryService.load(),
//             this.fileService.init(),
//             this.fileService.load(),
//             this.historyService.init(),
//             this.historyService.load()
//           );
//         }
//       }),
//       catchError(error => throwError(error))
//     );
//   }
  
}
