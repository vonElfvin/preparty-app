import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThisOrThatComponent } from './this-or-that.component';
import { CountdownComponent } from './countdown/countdown.component';
import { StatementCardComponent } from './statement-card/statement-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClockComponent } from './clock/clock.component';


@NgModule({
  declarations: [
    ThisOrThatComponent,
    CountdownComponent,
    StatementCardComponent,
    ClockComponent
  ],
  imports: [
    CommonModule,
    SharedModule

  ]
})
export class ThisOrThatModule { }
