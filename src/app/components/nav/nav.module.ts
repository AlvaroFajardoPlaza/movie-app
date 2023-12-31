import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalBarComponent } from './horizontal-bar/horizontal-bar.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	declarations: [HorizontalBarComponent, FooterComponent],
	imports: [CommonModule, FontAwesomeModule],
	exports: [HorizontalBarComponent, FooterComponent]
})
export class NavModule {}
