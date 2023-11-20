import { Component } from '@angular/core';
import { alvaroCurriculum } from 'src/mocks/alv-cv';

@Component({
	selector: 'app-about-us',
	templateUrl: './about-us.component.html',
	styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
	curriculum = alvaroCurriculum;
}
