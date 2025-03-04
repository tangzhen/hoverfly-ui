import { Routes } from "@angular/router";
import { LoginComponent } from "./views/login/login.component";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { LoadGuard } from "./shared/guards/load.guard";

export const ROUTES: Routes = [
  // Main redirect
  { path: "", redirectTo: "dashboard", pathMatch: "full" },

  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: "login", component: LoginComponent, canActivate: [LoadGuard] },

  { path: "**", redirectTo: "dashboard", pathMatch: "full" },
];
