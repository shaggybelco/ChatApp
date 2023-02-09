import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from '../contacts/contacts.component';
import { ProfileComponent } from '../profile/profile.component';

import { ChatPage } from './chat.page';

const routes: Routes = [
  {
    path: '',
    component: ChatPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/tab/list',
      },
      {
        path: 'list',
        loadChildren: () =>
          import('../list-chats/list-chats.module').then(
            (m) => m.ListChatsPageModule
          ),
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
      },
      {
        path: 'contacts',
        component: ContactsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPageRoutingModule {}
