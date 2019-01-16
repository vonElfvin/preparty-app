import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThisOrThatComponent } from './this-or-that.component';
import { CountdownComponent } from './countdown/countdown.component';
import { StatementCardComponent } from './statement-card/statement-card.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ThisOrThatComponent,
    CountdownComponent,
    StatementCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule

  ]
})
export class ThisOrThatModule { }
