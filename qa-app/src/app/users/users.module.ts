import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';

@NgModule({
  declarations: [UsersComponent, UserListItemComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule {
}
