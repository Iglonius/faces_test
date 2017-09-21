import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {CropperSettings, ImageCropperComponent} from "ng2-img-cropper";

import {IUserProfile} from "../../../../models/userProfile";
import {FirebaseAuthService} from "../../../../../firebase/services/firebase-auth.service";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'hiq-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @ViewChild('imageFile') imageFileElem;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  userInfo: Observable<IUserProfile>;
  uploadValid: boolean;
  labelText: string;
  progress: number;
  imageSrc: string;

  image: any;
  cropperSettings: CropperSettings;

  constructor(private userService: UserService, private authRef: FirebaseAuthService, private route: ActivatedRoute)
  {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.preserveSize = true;
    this.cropperSettings.canvasHeight = 288;
    this.cropperSettings.canvasWidth = 288;

    this.image = {};
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      var uid = params['uid'] ? params['uid'] : this.userService.getUserId();
      this.userInfo = this.userService.getUserProfile(uid);
    });
    this.labelText = "Välj bild";
    this.progress = 0;

    this.userInfo.subscribe(user => {
      if(user != null) {
        this.imageSrc = user.photoUrl;
      }
    });
  }

  /**
   *
   * @param file - File to update
   */
  onUploadPhoto(event, file: any) {
    event.preventDefault();
    let that = this;
    if(this.image.image && file != null) {

      let uploadTask = this.userService.uploadUserPhoto(this.image.image.split("data:image/jpeg;base64,")[1], file.name);

      uploadTask.on('state_changed', (snapshot) => {
          var progress = (event.snapshot.bytesTransferred/event.snapshot.totalBytes) * 100;
          event.progress = progress;
          event.labelText = progress+"%";
          event.uploadValid = false;
        },
          (error) => console.error(error)
        , () => {
            let url = uploadTask.snapshot.downloadURL;
            this.userService.saveUserPhoto(url)
              .then(_ => {
              this.imageFileElem.files = null;
              this.uploadValid = false;
              this.progress = 0;
              this.labelText = "Välj bild";
              this.image = {};
            });
      });
    }
  }

  onSelectFileChanged(event) {
    if(event.target.files != null && event.target.files[0])
    {
      let file = event.target.files[0];
      let reader = new FileReader();
      var tmpImage = new Image();
      this.labelText = "Vald bild: "+ file.name;
      this.uploadValid = true;

      reader.onload = (e: any) => {
        tmpImage.src = e.target.result;
        this.cropper.setImage(tmpImage);
      }

      reader.readAsDataURL(file);

    } else {
      this.uploadValid = false;
    }
  }

  private formatBase64(image: any | SVGImageElement | NodeListOf<SVGImageElement>) {
    return image.toString().split(',')[0];
  }
}
