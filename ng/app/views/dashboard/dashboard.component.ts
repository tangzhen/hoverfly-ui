import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { HoverflyService } from "../../shared/services/hoverfly.service";
import { Hoverfly } from "../../shared/models/hoverfly.model";
import { select } from "@angular-redux/store";
import { Map } from "immutable";
import { API_ERRORS } from "../../shared/http/error-handling";
import { NotificationService } from "../../components/notifications/notification.service";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.css"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @select(["hoverfly", "hoverfly"]) hoverfly$: Observable<any>;

  public hoverfly: Hoverfly;
  public pollingSubscription: Subscription;

  constructor(
    private service: HoverflyService,
    private notiffyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.hoverfly$.subscribe((hoverfly: Map<any, any>) => {
      this.hoverfly = hoverfly.toJS();
    });

    this.pollingSubscription = this.service.pollHoverfly();

    this.notiffyService.errors
      .pipe(filter((error) => error === API_ERRORS.SERVICE_UNAVAILABLE))
      .subscribe(() => this.pollingSubscription.unsubscribe());
  }

  ngOnDestroy(): void {
    this.pollingSubscription.unsubscribe();
  }

  setMode(event) {
    this.service.setMode(event.srcElement.name);
  }
}
