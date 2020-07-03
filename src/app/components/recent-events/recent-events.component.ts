import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecentEventsService } from '../../services/recent-events.service';
import { Event, ISingleEvent } from '../../models/event'
import { EventsService } from '../../services/events.service';
import { EventListService } from '../events-list/event-list.service';
import { IParams } from '../../models/params.model';
import { Observable, Subscription } from 'rxjs';
import { EventDetailService } from '../../services/event-detail.service';
import { Key } from 'protractor';
import { FilterService } from '../filter/filter.service';
import { PaginatorService } from '../paginator/paginator.service';

@Component({
  selector: 'app-recent-events',
  templateUrl: './recent-events.component.html',
  styleUrls: ['./recent-events.component.scss']
})
export class RecentEventsComponent implements OnInit, OnDestroy {
  private events: any;
  private eventsRef: Subscription = null;
  
  private itemsTotal: number;
  isFilter: boolean;
  filter: any;
  isAdmin: boolean = false;
  constructor(private recentEventsService: RecentEventsService, private eventsListService: EventListService, private eventsService: EventsService,
    private filterService: FilterService, private paginatorService: PaginatorService ) { 
  }

  public getRecentEvents() {
    this.filterService.Params = [this.paginatorService.PageSize, this.paginatorService.PageNumber, this.filterService.NameParam];
    if (this.filterService.Params[2].value === ''){
    this.recentEventsService.getRecentEvents(this.filterService.Params).subscribe((response: Array<ISingleEvent>) => {
      this.eventsListService.Events = [...response['results']];
      this.paginatorService.TotalElements = response['count'];
      console.log("entro aqui con recent events");
    });}
    else{
      this.filterService.Params = [this.paginatorService.PageSize, this.paginatorService.PageNumber, this.filterService.NameParam];
      console.log('null recent events', this.filterService.Params);
      this.eventsService.getEvents(this.filterService.Params).subscribe((response: Array<ISingleEvent>) => {
        this.eventsListService.Events = [...response['results']];
        this.paginatorService.TotalElements = response['count'];
        console.log("entro aqui con todos events");
      });
    }
  }
  /*
  public getAllEvents(){
    this.filterService.Params = [this.paginatorService.PageSize, this.paginatorService.PageNumber, this.filterService.NameParam];
    console.log('null recent events', this.filterService.Params);
    this.eventsService.getEvents(this.filterService.Params).subscribe((response: Array<ISingleEvent>) => {
      this.eventsListService.Events = [...response['results']];
      this.paginatorService.TotalElements = response['count'];
      console.log("entro aqui con todos events");
    });
  }*/

  public getCategoryEvents() {
    this.paginatorService.Categories = true;
    console.log('categoria tipo');
    this.filterService.Params = [this.paginatorService.PageSize, this.paginatorService.PageNumber, this.filterService.NameParam, {key: 'nameCategory', value: this.eventsListService.CategoryName}];
    console.log('null recent events', this.filterService.Params);
    this.eventsService.getEvents(this.filterService.Params).subscribe((response: Array<Event>) => {
      this.eventsListService.Events = [...response['results']];
      console.log(this.eventsListService.Events, "Events");
      this.paginatorService.TotalElements = response['count'];
      this.paginatorService.Categories = true;
      console.log("buscado en categor");
    });
  }

  ngOnInit() {
    this.eventsRef = this.eventsListService.categoryNameSubject$.subscribe(() => {
      this.paginatorService.PageNumber.value = 1;
      console.log('change events');
      this.refreshEvents();
    });
    this.paginatorService.PageNumber.value = 1;
    this.eventsListService.CategoryName = null;
    let role = sessionStorage.getItem('role');
    if((role === '1')||(role === '2')){
      this.isAdmin = true;
      console.log(role, 'is admin', this.isAdmin);
    }
  }

  refreshEvents(data?: Array<IParams>) {
    if (this.eventsListService.CategoryName === null) {
      this.getRecentEvents();
    } else {
      this.getCategoryEvents();
    }
  }

  ngOnDestroy() {
    this.eventsRef.unsubscribe();
  }

}
