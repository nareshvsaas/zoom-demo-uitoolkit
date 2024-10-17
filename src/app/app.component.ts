import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  name:string ='';
  role:string = '';
  
  zoomLoaded: boolean = false;
  constructor(private route: Router){

  }
joinMeeting(){
console.log(this.name + "   " + this.role);
this.zoomLoaded = true;
this.route.navigate(['home/'+this.name +'/' + this.role])
}
}
