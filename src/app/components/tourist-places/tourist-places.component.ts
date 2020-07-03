import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { IParams } from '../../models/params.model';
import { Subscription } from 'rxjs';
import { SitesListService } from '../sites-list/sites-list.service';
import { FilterService } from '../filter/filter.service';
import { PaginatorService } from '../paginator/paginator.service';

@Component({
  selector: 'app-tourist-places',
  templateUrl: './tourist-places.component.html',
  styleUrls: ['./tourist-places.component.scss']
})
export class TouristPlacesComponent implements OnInit {

  private events: any;
  
  private itemsTotal: number;
  isFilter: boolean;
  filter: any;
  constructor(private sitesService: SiteService, private sitesListService: SitesListService,
    private filterService: FilterService, private paginatorService: PaginatorService ) { 
  }

  public getSites() {
    this.filterService.Params = [this.paginatorService.PageSize, this.paginatorService.PageNumber, this.filterService.NameParam];
    this.sitesService.getSites(this.filterService.Params).subscribe((response: Array<Event>) => {
      this.sitesListService.Sites = [...response['results']];
      this.paginatorService.TotalElements = response['count'];
      console.log("buscado en sites");
    });
  }

  ngOnInit() {
    this.paginatorService.PageNumber.value = 1;
    this.paginatorService.Categories = false;
    this.refreshSites();
  }

  refreshSites(data?: Array<IParams>) {
    this.getSites();
  }

  ngOnDestroy() {
    
  }

}
