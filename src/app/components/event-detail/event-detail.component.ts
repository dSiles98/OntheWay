import { Component, OnInit } from '@angular/core';
import { Event, ISingleEvent } from '../../models/event';
import { IEvent } from '../../models/event.model';
import { IPatch } from '../../models/patch.model';
import { IPrice } from '../../models/price-model';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { EventDetailService } from '../../services/event-detail.service';
import { AppError } from '../../common/errors/app-error';
import { PreferredEventsService } from '../../services/preferred-events.service';
import { PriceService } from '../../services/price-service.service';
import { MessageService } from '../../services/message.service';
import { TypeOfDialog, IDialog, IconOfDialog, IMapDialog, IPriceDialog } from '../../common/dialog/dialog.model';
import { DialogService } from '../../common/dialog/dialog.service';
import { MapDialogService } from '../../common/map-dialog/map-dialog.service';
import { PriceServiceDialogService } from '../../common/price-table/price-table.component.service';
import { AlertService } from 'src/app/common/alert/alert.service';
import { IAlert, IconOfAlert, ColorOfAlert } from 'src/app/common/alert/alerts.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  
  private event : any;
  private prices: Array<any>;
  private eventId: String;
  private namePlace: string;
  private amount: number;
  private havePrices: boolean;
  validData: boolean = false;
  isAdmin: boolean = false;
  private mapDialog: IMapDialog;
  private priceDialog: IPriceDialog;

  constructor(private route: ActivatedRoute, private eventService: EventDetailService, private messageService: MessageService,
    private priceService: PriceService, private preferredEventService: PreferredEventsService, private dialogService: DialogService,
    private mapService: MapDialogService, private priceDialogService: PriceServiceDialogService, private alertService: AlertService) {
    }

  ngOnInit() {
    
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.eventService.getEventDetail(Number(this.eventId)).subscribe(response => {
      console.log(response, "event detail");
      this.event = response;
      this.prices = response['prices'];
      this.havePrices = this.prices.length > 0 ? true : false;
      let role = sessionStorage.getItem('role');
      if ((role === '1') || (role === '2')) {
          this.isAdmin = true;
          console.log(role, 'is admin', this.isAdmin);
      }
    }, (error: AppError) => {
      console.log("entro a esta section de error", error);
  });
  }

  addStar(){
    let dialog: IDialog;
    let alertOptions: IAlert;
    let body = {
      'eventId' : this.eventId
    }
    if(sessionStorage.getItem('role') != null){
      this.preferredEventService.postPreferredEvent(body).subscribe(response => {
        this.event.favorite = true;
        alertOptions = {
          icon: IconOfAlert.SUCCESS,
          color: ColorOfAlert.SUCCESS,
          title: 'SUCCESSFUL!',
          message: 'The event was added as preferred',
          durationTime: 5000
        };
        this.alertService.Options = alertOptions;
      }, err => {
        alertOptions = {
          icon: IconOfAlert.DANGER,
          color: ColorOfAlert.DANGER,
          title: 'ERROR!',
          message: `Has been an error: ${err.message}`,
          durationTime: 5000
        };
        this.alertService.Options = alertOptions;
      });
    }else{
      alertOptions = {
        icon: IconOfAlert.DANGER,
        color: ColorOfAlert.DANGER,
        title: 'ERROR!',
        message: 'You have to login to be able to do this action',
        durationTime: 5000
      };
      this.alertService.Options = alertOptions;
    }
  }

  discardStar(){
    let dialog: IDialog;
    let alertOptions: IAlert;
    if(sessionStorage.getItem('role') != null){
      this.preferredEventService.deletePreferredEvent(this.eventId).subscribe(response => {
        console.log('destart', response);
        this.event.favorite = false;
        alertOptions = {
          icon: IconOfAlert.SUCCESS,
          color: ColorOfAlert.SUCCESS,
          title: 'SUCCESSFUL!',
          message: 'The event was removed of preferred',
          durationTime: 5000
        };
        this.alertService.Options = alertOptions;
      }, err => {
        alertOptions = {
          icon: IconOfAlert.DANGER,
          color: ColorOfAlert.DANGER,
          title: 'ERROR!',
          message: `Has been an error: ${err.message}`,
          durationTime: 5000
        };
        this.alertService.Options = alertOptions;
      });
    }else{
      alertOptions = {
        icon: IconOfAlert.DANGER,
        color: ColorOfAlert.DANGER,
        title: 'ERROR!',
        message: 'You have to login to be able to do this action',
        durationTime: 5000
      };
      this.alertService.Options = alertOptions;
    }
  }

  GoBackWithResfresh(event) {
      console.log("Deberia ir atras");
      window.history.back();
  }

  showMap()
  {
      console.log(this.event);
      this.mapDialog = {
          latitude : this.event.latitudeSite,
          longitude : this.event.longitudeSite,
          eventPlaceName: this.event.nameSite,
          type: TypeOfDialog.INFO
        }
      this.mapService.showDialog(this.mapDialog);
  }

  showPrices() {
    this.priceDialog = {
      itemId: this.event.eventId,
      prices: this.event.prices,
      type: TypeOfDialog.INFO,
      typePrice: "event",
      isAdmin: this.isAdmin
    }
    this.priceDialogService.showDialog(this.priceDialog);
  }
}
