import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { timeValidator } from '../../../common/directives/time-validator.directive';
import { ElementRef } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { Image } from '../../../models/image';
import { IPatch } from '../../../models/patch.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppError } from '../../../common/errors/app-error';
import { Scheduler } from 'rxjs/internal/Scheduler';
import { PatchSite } from '../edit-site/patch-site';
import { DialogService } from '../../../common/dialog/dialog.service';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../../common/dialog/dialog.model';
import { SiteService } from './../../../services/site.service';
import { ScheduleSiteService } from '../../../services/schedule-site-service.service';
import { PatchScheduleSite } from './patch-schedule-site';
import { CreateSchedulelocation } from './create-schedule';

@Component({
  selector: 'app-edit-site',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.scss']
})

export class EditSiteComponent implements OnInit {
  private sites: any;
  path: any;
  imageForm: FormGroup;
  cardForm: FormGroup;
  startForm: FormGroup;
  endForm: FormGroup;
  startTimeForm: FormGroup;
  endTimeForm: FormGroup;
  isComplete: boolean = false;
  isCompleteSt: boolean = false;
  isCompleteEd: boolean = false;
  checked = false;
  zoom: number = 16;
  isFree: boolean = false;
  siteId: any;
  nameImage: string;
  image: boolean;
  patchSiteInformation: PatchSite;
  patchSchedule: PatchScheduleSite;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private dialogService: DialogService,
    private siteService: SiteService, private scheduleService: ScheduleSiteService) {
  }

  openStart(time) {
    this.patchSchedule.selectedTimeStart = time;
    this.isCompleteSt = true;
  }

  openEnd(time) {
    this.patchSchedule.selectedTimeEnd = time;
    this.isCompleteEd = true;
   }
 
  mapClicked($event: MouseEvent) {
    this.patchSiteInformation.markedLat = $event.coords.lat;
    this.patchSiteInformation.markedLng = $event.coords.lng;
    this.isFree = true;
  }

  patchLocationCoordinates(modal) {
    this.patchSiteInformation.patchLocationSite(modal);
  }

  patchScheduleLocation(modal) {
    this.patchSchedule.patchAttentionDays(modal);
  }

  configurePlace(modal: any) {
    this.patchSiteInformation.nameSite = this.cardForm.value.siteName;
    this.patchSiteInformation.descriptionSite = this.cardForm.value.description;
    this.patchSiteInformation.patchInformationOfSite(modal);
    this.isComplete = true;
  }

  ngOnInit() {
    this.siteId = this.route.snapshot.paramMap.get('siteId');
    this.patchSiteInformation = new PatchSite(this.siteService, this.dialogService);
    this.patchSiteInformation.consumeSite(this.siteId);
    this.patchSchedule = new PatchScheduleSite(this.scheduleService, this.dialogService);
    this.patchSchedule.consumeScheduleSite(this.siteId);
    this.patchSchedule.checked = false;
    this.imageForm = this.fb.group({
      path: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern('([A-Za-z0-9]{1,2})+')]],
    })
    this.cardForm = this.fb.group({
      siteName: ['', [Validators.required, Validators.pattern('([0-9A-Z][a-z0-9]+[ ]{0,500})+')]],
      description: ['', [Validators.required, Validators.pattern('([A-Za-z0-9]+[ ]{0,1250})+')]],
    });
    this.startTimeForm = this.fb.group({
      startTime: ['', [Validators.required]]
    })
    this.endTimeForm = this.fb.group({
      endTime: ['', [Validators.required]]
    })
  }

  onSubmit(imageForm, bM1): void {
    console.log('image', imageForm);
    this.patchSiteInformation.imageId = imageForm.imageId;
    this.patchSiteInformation.imageUrl = imageForm.imageUrl;
    this.nameImage = imageForm.name;
    this.image = true;
    this.isComplete = true;
    this.patchSiteInformation.PatchImageOfSite(bM1);
  }

  public patchInformationOfSite() {
    var patchScheduleOperations = new Array<IPatch>();
  }

  public saveNewSchedule(modal) {
    var addSchedule = new CreateSchedulelocation(this.scheduleService, this.dialogService);
    addSchedule.createSchedule(this.patchSchedule, this.siteId, modal);
  }
}
