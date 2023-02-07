import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor(private prof: UserService, private route: ActivatedRoute,private actionSheetCtrl: ActionSheetController) { }

  presentingElement = undefined;
  id = this.route.snapshot.params['id'];
  me: any = {};
  username: string = "";

  ngOnInit() {
    this.prof.getMe(this.id).subscribe((res:any)=>{
      console.log(res[0]);
      this.me = res[0];
      this.username = this.me.name;
    }, (err: any)=>{
      console.log(err);
    })
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

    return role === 'confirm';
  };
}
