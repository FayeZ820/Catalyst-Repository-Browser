import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Organisation,
  OrganisationResolved
} from '../shared/entities/organisation';
// import { OrganisationService } from '../core/services/organisation.service';
import { LoggerService } from '../core/services/logger.service';
import { FocusMonitor } from '@angular/cdk/a11y';


@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
})
export class RepositoriesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('navButton') elementButton: ElementRef<HTMLElement>;
  @ViewChild('navGitHub') elementGitHub: ElementRef<HTMLElement>;
  @ViewChild('navBlog') elementBlog: ElementRef<HTMLElement>;

  organisation: Organisation;
  errorMessage: string;

  constructor(
    private loggerService: LoggerService,
    // private organisationService$: OrganisationService,
    private router: Router,
    private route: ActivatedRoute,
    private focusMonitor: FocusMonitor,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.loggerService.log('Accessing the organisation!');
  }

  ngOnInit(): void {
    // this.organisationService$.getOrganisationData().subscribe(
    //    (data: Organisation) => {
    //      this.organisation = data;
    //    },
    //    (err: HttpError) => console.log(err.friendlyMessage),
    //    () => this.loggerService.log('All done getting Organisation Data!')
    //  );
    const resolvedData: OrganisationResolved = this.route.snapshot.data[
      // tslint:disable-next-line:no-string-literal
      'resolvedOrgaData'
    ];
    this.loggerService.log('Prefetch organisation data from Route Resolver!');
    this.errorMessage = resolvedData.error;
    this.organisation = resolvedData.organisation;
  }

  ngAfterViewInit(): void {
    this.focusMonitor.monitor(this.elementButton).subscribe((origin) =>
      this.ngZone.run(() => {
        this.cdr.markForCheck();
      })
    );
    this.focusMonitor.monitor(this.elementGitHub).subscribe((origin) =>
      this.ngZone.run(() => {
        this.cdr.markForCheck();
      })
    );
    this.focusMonitor.monitor(this.elementBlog).subscribe((origin) =>
      this.ngZone.run(() => {
        this.cdr.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementButton);
    this.focusMonitor.stopMonitoring(this.elementGitHub);
    this.focusMonitor.stopMonitoring(this.elementBlog);
  }

  navToRepoGrid(): void {
    this.router.navigate(['/repositories/repositories-grid']);
  }
}
