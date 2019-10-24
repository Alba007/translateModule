import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { AuthenticationService } from '../../../auth/services/authentication.service';
// import { fuseAnimations } from '../../../../../@fuse/animations';
// import { AuthenticationService } from '../../../auth/services/authentication.service';
// import { AuthenticationService } from '../../auth/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: fuseAnimations
})
export class ProfileComponent implements OnInit {
  
  logedInUsername: string;
  
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    // Loged in user data
    this.authenticationService.logedInUser().subscribe((res)=>{
      // console.log(res);
      this.logedInUsername = res.userName;
      // console.log(this.logedInUsername); 
  })
  }

}
