import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyUserComponent } from './my-user/my-user.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	declarations: [MyUserComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FontAwesomeModule
	]
})
export class UsersModule {}
