import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { dateValidator } from '../../../common/directives/date-validator.directive';
import { Schedule } from '../../../models/schedule';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../../common/dialog/dialog.model';
import { SchedulesService } from '../../../services/schedules.service';
import { DialogService } from '../../../common/dialog/dialog.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent implements OnInit {
  checked: boolean = false;
  startForm: FormGroup;
  maxStart: Date = new Date();
  minStart: Date = new Date();
  maxEnd: Date = new Date();
  startTimeForm: FormGroup;
  endTimeForm: FormGroup;
  selectedTimeStart : any;
  selectedTimeEnd : any;
  dateOficialStart: any;
  dateOficialEnd: any;
  dateStartShow: any;
  dateEndShow: any;
  dateEnd : any;
  scheduleId: any;
  date: boolean;
  endForm: FormGroup;
  dateStart : any;
  newDate : any;
  @Output('saveSchedule') saveSchedule: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(private fb: FormBuilder, private scheduleService: SchedulesService,  private dialogService: DialogService) { }

  public verifeEnd(dateEnd: any){
    this.dateEnd = dateEnd.split('-');
  }

  public openStart(time) {
    this.selectedTimeStart = time;
  }

  public send(date: any){
    this.dateStart = date;
    var parts = this.dateStart.split('-');
    this.newDate = date;
    this.dateOficialStart = new Date(parts[0], parts[1] - 1, parts[2]);
    this.endForm = this.fb.group({
      endDate: ['', [Validators.required, dateValidator(this.dateOficialStart, this.maxStart)]],
    });
  }

  openEnd(time) {
    this.selectedTimeEnd = time;
    if(!this.checked){
      console.log('entro a unchecked');
      var hoursStart = this.selectedTimeStart.split(':');
      var hoursEnd = this.selectedTimeEnd.split(':');
      var parts = this.newDate.split('-');
      this.dateOficialStart = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), hoursStart[0] - 4, hoursStart[1]);
      this.dateOficialEnd = new Date(this.dateEnd[0], this.dateEnd[1] - 1, this.dateEnd[2], hoursEnd[0] - 4, hoursEnd[1]);
      this.dateEndShow =  new Date(this.dateEnd[0], this.dateEnd[1] - 1, this.dateEnd[2], hoursEnd[0], hoursEnd[1]);
      this.dateStartShow = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), hoursStart[0], hoursStart[1]);
      let schedule: Schedule = {
        startDate: this.dateOficialStart.toISOString(),
        finishDate: this.dateOficialEnd.toISOString()
      }
      let dialog: IDialog;
      this.scheduleService.postSchedule(schedule).subscribe( response => {
        this.scheduleId = response['scheduleId'];
        console.log('schedule', this.scheduleId); 
        this.saveSchedule.emit({id: response['scheduleId'], dateStartShow: this.dateStartShow, dateEndShow: this.dateEndShow});   
        dialog = {
          title: 'Successful',
          description: 'Your schedule was created successfuly',
          btnNo: 'Accept',
          type: TypeOfDialog.SUCCESS,
          icon: IconOfDialog.SUCCESS,
          ignoreBackdrop: true
        };
        this.dialogService.options(dialog);
        this.date = true;
      }, error => {
        dialog = {
          title: 'Error',
            description: 'Your schedule wasn\'t created',
          btnNo: 'Accept',
          type: TypeOfDialog.DANGER,
          icon: IconOfDialog.DANGER,
          keyboardEsc: true
        };
        this.dialogService.options(dialog);
      }, () => {
        console.log('finish');
      });
    }
    else{
      console.log('entro a checked');
      var hoursStart = this.selectedTimeStart.split(':');
      var hoursEnd = this.selectedTimeEnd.split(':');
      var parts = this.newDate.split('-');
      this.dateOficialStart = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), hoursStart[0] - 4, hoursStart[1]);
      this.dateOficialEnd = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), hoursEnd[0] - 4, hoursEnd[1]);
      this.dateEndShow =  new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), hoursEnd[0], hoursEnd[1]);
      this.dateStartShow = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), hoursStart[0], hoursStart[1]);
      let schedule: Schedule = {
        startDate: this.dateOficialStart.toISOString(),
        finishDate: this.dateOficialEnd.toISOString()
      }
      let dialog: IDialog;
      this.scheduleService.postSchedule(schedule).subscribe( response => {
        this.scheduleId = response['scheduleId'];
        console.log('schedule', this.scheduleId); 
        this.saveSchedule.emit({id: response['scheduleId'], dateStartShow: this.dateStartShow, dateEndShow: this.dateEndShow});  
        dialog = {
          title: 'Successful',
          description: 'Your schedule was created successfuly',
          btnNo: 'Accept',
          type: TypeOfDialog.SUCCESS,
          icon: IconOfDialog.SUCCESS,
          ignoreBackdrop: true
        };
        this.dialogService.options(dialog);
        this.date = true;
      }, error => {
        dialog = {
          title: 'Error',
            description: 'Your schedule wasn\'t created',
          btnNo: 'Accept',
          type: TypeOfDialog.DANGER,
          icon: IconOfDialog.DANGER,
          keyboardEsc: true
        };
        this.dialogService.options(dialog);
      }, () => {
        console.log('finish');
      });
    }
  }

  ngOnInit() {
    this.maxStart.setFullYear(this.minStart.getFullYear() + 1);
    this.minStart.toLocaleDateString();
    this.date = false;
    this.startForm = this.fb.group({
      startDate: ['', [Validators.required, dateValidator(this.minStart, this.maxStart)]],
    });
    this.endForm = this.fb.group({
      endDate: ['', [Validators.required, dateValidator(this.dateOficialStart, this.maxStart)]],
    });
    this.startTimeForm = this.fb.group({
      startTime: ['', Validators.required]
    })
    this.endTimeForm = this.fb.group({
      endTime: ['', Validators.required]
    })
  }

}
