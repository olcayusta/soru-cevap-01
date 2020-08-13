import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { MyFavoritesRoutingModule } from './my-favorites-routing.module';
import { MyFavoritesComponent } from './my-favorites.component';


@NgModule({
  declarations: [MyFavoritesComponent],
  imports: [
    CommonModule,
    MyFavoritesRoutingModule,
    SharedModule
  ]
})
export class MyFavoritesModule { }
