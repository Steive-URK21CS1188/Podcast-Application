import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { MySubscriptionsComponent } from './my-subscriptions/my-subscriptions.component';
import { SharedModule } from 'src/app/features/shared/shared.module';


@NgModule({
  declarations: [
    MySubscriptionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SubscriptionsRoutingModule
  ]
})
export class SubscriptionsModule { }
