import { Component } from '@angular/core';
import {
	faUser,
	faMailBulk,
	faLink,
	faGlobe
} from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
	faUser = faUser;
	faMailBulk = faMailBulk;
	faLink = faLink;
	faGlobe = faGlobe;
}
