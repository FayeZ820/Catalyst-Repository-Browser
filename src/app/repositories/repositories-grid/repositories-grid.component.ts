import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { faCheck, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { GridItem } from '../../shared/entities/grid-item';
import {
  GridDisplayedColumns,
  gridDisplayedColumns,
} from '../../shared/entities/grid-displayed-columns';
import { RepositoriesGridService } from '../../core/services/repositories-grid.service';

@Component({
  selector: 'app-repositories-grid',
  templateUrl: './repositories-grid.component.html',
  styleUrls: ['./repositories-grid.component.scss'],
})
export class RepositoriesGridComponent implements OnInit, AfterViewInit {
  faCheck = faCheck;
  faTimes = faTimes;
  faStar = faStar;
  list: GridItem[] = [];
  dataSource = new MatTableDataSource<GridItem>([]);
  Columns = gridDisplayedColumns;
  filter = {
    showTrue: true,
    showFalse: true,
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(repositoriesGridService: RepositoriesGridService) {
    repositoriesGridService.getList().subscribe((ls: GridItem[]) => {
      this.list = ls;
      this.dataSource = new MatTableDataSource<GridItem>(ls);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get displayedColumns(): unknown[] {
    return this.Columns.filter((r) => r.selected).map((r) => r.name);
  }

  changeDisplayColumns(evt: GridDisplayedColumns): void {
    this.Columns = this.Columns.map((r) => {
      return {
        ...r,
        selected: r.name === evt.name ? evt.selected : r.selected,
      };
    });
  }

  changeFilter(evt: any): void {
    this.filter.showTrue = evt.showTrue;
    this.filter.showFalse = evt.showFalse;
    this.dataSource = new MatTableDataSource<GridItem>(
      this.list.filter((r) => {
        if (this.filter.showTrue && r.fork) {
          return true;
        }
        if (this.filter.showFalse && !r.fork) {
          return true;
        }
        return false;
      })
    );
    this.dataSource.paginator = this.paginator;
  }
}
