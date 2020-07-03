import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { BlobService, UploadConfig, UploadParams } from 'angular-azure-blob-service';
import { ImageService } from '../../services/image-service.service';
import { Image } from '../../models/image';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../common/dialog/dialog.model';
import { DialogService } from '../../common/dialog/dialog.service';

const Config: UploadParams = {
  sas: '?sv=2017-11-09&ss=bfqt&srt=sco&sp=rwdlacup&se=2018-11-11T00:10:48Z&st=2018-09-01T16:10:48Z&spr=https,http&sig=mfaHTtWgmNGhtC84nBrn3wj0%2B5P9roPZHJwJPsdpQo8%3D',
  storageAccount: 'onthewayservestorage',
  containerName: 'onthewayimages'
};

const allowedExt = /^image\/(jpg|jpeg|png)$/i;

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})

export class UploadImagesComponent implements OnInit {

  config: UploadConfig;
  currentFile: File;
  percent: number;
  nameFile: string;
  enabled: boolean = false;
  @ViewChild('visor') view: ElementRef;
  @ViewChild('file') file: ElementRef;
  @Output('saveImage') saveImage: EventEmitter<Object> = new EventEmitter<Object>();
  constructor(private blob: BlobService, private images: ImageService, private dialogService: DialogService,) {
    this.currentFile = null
    this.config = null
    this.percent = 0
  }

  ngOnInit() {}

  updateFiles (file) {
    this.currentFile = null;
    this.nameFile = '';
    this.enabled = false;
    console.log(this.file.nativeElement);
    this.view.nativeElement.innerHTML = '';
    if (file.files[0] && allowedExt.exec(file.files[0].type)) {
      this.currentFile = file.files[0];
      this.nameFile = this.currentFile.name.split('.')[0];
      this.enabled = true;
      this.showImage();
    }
  }

  showImage() {
    var visor = new FileReader();
    visor.onload = (ev: any) => {
      console.log(this.view);
      this.view.nativeElement.innerHTML = '<embed src="' + ev.target.result + '" width="100%" >';
    }
    visor.readAsDataURL(this.currentFile);
  }

  async upload () {
    if (this.currentFile !== null) {
      const baseUrl = this.blob.generateBlobUrl(Config, this.currentFile.name);
      console.log(baseUrl);
      this.config = {
        baseUrl: baseUrl,
        blockSize: this.currentFile.size,
        sasToken: Config.sas,
        file: this.currentFile,
        complete: () => {
          console.log('Transfer completed !')
        },
        error: () => {
          console.log('Error !')
        },
        progress: (percent) => {
          this.percent = percent
        }
      };
      let dialog: IDialog;
      this.uploadBlob().then((result) => {
        let extension = this.currentFile.name.split('.')[1];
        let image: Image = {
            name: this.currentFile.name,
            extension: extension,
            urlImage: baseUrl
          }
          console.log(image);
          this.images.addImage(image).subscribe(response => {
              console.log(response);
              this.saveImage.emit(response);
              dialog = {
                  title: 'Successful',
                  description: 'Your image has been added correctly',
                  btnNo: 'Accept',
                  type: TypeOfDialog.SUCCESS,
                  icon: IconOfDialog.SUCCESS,
                  ignoreBackdrop: result
              };
              this.dialogService.options(dialog);
          }, error => {
              dialog = {
                  title: 'Error',
                  description: 'Your image wasn\'t added',
                  btnNo: 'Accept',
                  type: TypeOfDialog.DANGER,
                  icon: IconOfDialog.DANGER,
                  keyboardEsc: result
              };
              this.dialogService.options(dialog);
          }, () => {
              console.log('finish');
          });
      }).catch(result => {
        dialog = {
          title: 'Error',
          description: 'Your image wasn\'t added into Blob Storage',
          btnNo: 'Accept',
          type: TypeOfDialog.DANGER,
          icon: IconOfDialog.DANGER,
          keyboardEsc: result
        };
        this.dialogService.options(dialog);
      });

    }
  }

  private uploadBlob(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let result = this.blob.upload(this.config);
      if (result) {
        return resolve(true);
      } 
      return reject(false);
    });
  }

}
