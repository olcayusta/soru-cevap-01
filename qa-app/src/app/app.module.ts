import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@shared/material/material.module';
import { SidenavContainerComponent } from './sidenav-container/sidenav-container.component';

import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
registerLocaleData(localeTr);

import { SearchFormComponent } from './sidenav-container/top-bar/search-form/search-form.component';
import { SideSheetComponent } from './sidenav-container/side-sheet/side-sheet.component';
import { TopBarComponent } from './sidenav-container/top-bar/top-bar.component';
import { AvatarIconComponent } from './sidenav-container/avatar-icon/avatar-icon.component';
import { HostComponent } from './host/host.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavContainerComponent,
    TopBarComponent,
    SearchFormComponent,
    SideSheetComponent,
    AvatarIconComponent,
    HostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    OverlayModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'tr-TR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
