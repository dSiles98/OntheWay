import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Site } from '../../../models/site';
import { SiteService } from './../../../services/site.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.scss']
})
export class CreateSiteComponent implements OnInit {
  lat: number = -17.3895000;
  lng: number = -66.1568009;
  zoom: number = 10;
  siteName: string;
  siteId: any;
  newSite: boolean = false;
  cardForm: FormGroup;
  markedLat: any;
  markedLng: any;
  markedDraggable: any;
  label: any;
  descritionSite: any;
  site: any;
  isFree: boolean = false;
  readySite: boolean = false;
  @Output('saveSite') saveSite: EventEmitter<Object> = new EventEmitter<Object>();
  constructor(private siteServices: SiteService, private fb: FormBuilder) { }

  

  public createSite(){
    let site: Site = {
      name: this.label,
      description: this.descritionSite,
      latitude: this.markedLat,
      longitude: this.markedLng,
      imageId: 1
    }
    console.log('site', site);
    this.siteServices.postSite(site).subscribe( response => {
      this.site = 'The Site was successfully uploaded, Site name: ' + this.label;
      this.siteId = response['siteId'];
      this.siteName = this.label;
      this.saveSite.emit(response);
      this.readySite = true;
    }, error => {
      this.site = 'The site could not uploaded';
    })
  }

  mapClicked($event: MouseEvent) {
    this.markedLat = $event.coords.lat;
    this.markedLng = $event.coords.lng;
    this.isFree = true;
    this.createSite();
  }

  ngOnInit() {
    this.cardForm = this.fb.group({
      eventName: ['', [Validators.required, Validators.pattern('([0-9A-Z][a-z0-9]+[ ]{0,15})+')]],
      description: ['', [Validators.required, Validators.pattern('([A-Za-z0-9]+[ ]{0,1250})+')]],
    });
  }

}
