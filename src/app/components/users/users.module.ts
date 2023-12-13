import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyUserComponent } from './my-user/my-user.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserComponent } from './user/user.component';

@NgModule({
	declarations: [MyUserComponent, UserComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FontAwesomeModule
	]
})
export class UsersModule {}
