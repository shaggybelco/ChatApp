import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { ActionSheetController } from '@ionic/angular';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private prof: UserService,
    private route: ActivatedRoute,
    private actionSheetCtrl: ActionSheetController,
    private token: TokenService,
  ) {}

  presentingElement = undefined;
  id:any = this.token.decode();
  me: any = {};
  username: string = '';

  ngOnInit() {
    this.prof.getMe(this.id.id).subscribe(
      (res: any) => {
        console.log(res[0]);
        this.me = res[0];
        this.username = this.me.name;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  file: any;
  input: any;

  openFileBrowser() {
    this.input = document.createElement('input');
    this.input.type = 'file';
    this.input.click();

    this.input.onchange = (e: any) => {
      this.file = this.input.files[0];
      console.log(this.file);
    };
  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    console.log(role);

    if (role === 'cancel') {
      return;
    } else if (role === 'confirm') {
      console.log('something');
      const data = {
        id: this.id,
        image: this.file,
        name: this.username,
        isAvatar: true
      }

      console.log(data);

      this.prof.updateProfile(data).subscribe((res: any)=>{
        console.log(res);
      }, (error: any)=>{
        console.log(error);
      })
    }
    return role === 'confirm';
  };
}
