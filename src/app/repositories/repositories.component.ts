import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Organisation
} from '../shared/entities/organisation';
import { OrganisationService } from '../core/services/organisation.service';
import { LoggerService } from '../core/services/logger.service';
import { HttpError } from '../shared/entities/http-error';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
})
export class RepositoriesComponent implements OnInit {
  organisation: Organisation;
  errorMessage: string;

  constructor(
    private loggerService: LoggerService,
    private organisationService$: OrganisationService,
    private router: Router,
  ) {
    this.loggerService.log('Accessing the organisation!');
  }

  ngOnInit(): void {
    this.organisationService$.getOrganisationData().subscribe(
       (data: Organisation) => {
         this.organisation = data;
       },
       (err: HttpError) => console.log(err.friendlyMessage),
       () => this.loggerService.log('All done getting Organisation Data!')
     );
  }

  navToRepoGrid() {
    this.router.navigate(['/repositories/repositories-grid']);
  }
}
