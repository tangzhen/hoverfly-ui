import { Injectable } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { filter } from "rxjs/operators";
@Injectable()
export class StatusDialogService {
  constructor(private authService: AuthService, private router: Router) {}

  retry() {
    this.authService
      .checkAuthenticated()
      .pipe(filter((isHealthy) => isHealthy))
      .subscribe(() => {
        if (this.router.url === "/login") {
          this.router.navigateByUrl("/").then(() => this.pageReload());
        } else {
          this.pageReload();
        }
      });
  }

  pageReload() {
    window.location.reload();
  }
}
