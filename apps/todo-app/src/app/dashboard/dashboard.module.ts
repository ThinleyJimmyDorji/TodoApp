import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureDashboardModule } from '@angular-nx/dashboard';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FeatureDashboardModule, DashboardRoutingModule],
})
export class DashboardModule {}
