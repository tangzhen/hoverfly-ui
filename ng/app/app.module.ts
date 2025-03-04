import { BrowserModule } from "@angular/platform-browser";
import { isDevMode, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule, RequestOptions } from "@angular/http";
import { RouterModule } from "@angular/router";

import { ROUTES } from "./app.routes";

import { AppComponent } from "./app.component";
import { LoginModule } from "./views/login/login.module";
import { DashboardModule } from "./views/dashboard/dashboard.module";
import { TopNavBarModule } from "./components/topnavbar/topnavbar.module";

import { ngModuleSharedProviders } from "./shared";
import { APP_BASE_HREF } from "@angular/common";
import { CustomRequestOptions } from "app/shared/http/custom-request-options";
import {
  DevToolsExtension,
  NgRedux,
  NgReduxModule,
} from "@angular-redux/store";
import { AppState, enhancers, rootReducer } from "./app.state";
import { AlertModule, ModalModule } from "ngx-bootstrap";
import { DialogboxModule } from "./components/dialogbox/dialogbox.module";
import { StatusDialogComponent } from "./components/status-dialog/status-dialog.component";
import { StatusDialogModule } from "./components/status-dialog/status-dialog.module";
import { NotificationModule } from "./components/notifications/notification.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Angular modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),

    LoginModule,
    DashboardModule,
    TopNavBarModule,
    StatusDialogModule,
    NotificationModule,

    // Third-party modules
    NgReduxModule,

    AlertModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    ...ngModuleSharedProviders,
    { provide: APP_BASE_HREF, useValue: "/" },
    {
      provide: RequestOptions,
      useClass: CustomRequestOptions,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<AppState>,
    private devTools: DevToolsExtension
  ) {
    ngRedux.configureStore(
      rootReducer,
      Object.assign({}),
      [],
      [
        ...enhancers,
        isDevMode() && devTools.isEnabled() ? devTools.enhancer() : (f) => f,
      ]
    );
  }
}
