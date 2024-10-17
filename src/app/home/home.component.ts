import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import uitoolkit from "@zoom/videosdk-ui-toolkit";
import { KJUR } from 'jsrsasign';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  uitoolkitContainer: any;
  sessionContainer: any;
  chatContainer: any;
  videoContainer: any;
  controlsContainer: any;
  sessionName: string = "1o1-Demo";

  inSession: boolean = false
  sub: any;

  name: string = "";
  role: number = 0;
  config = {
    videoSDKJWT: '',
    sessionName: '1o1-Demo',
    userName: '',
    sessionPasscode: '123',
    features: ['preview', 'video', 'audio', 'users', 'chat'],
    options: { init: {}, audio: {}, video: {}},
    virtualBackground: {
       allowVirtualBackground: true,
       allowVirtualBackgroundUpload: false,
       virtualBackgrounds: ['https://images.unsplash.com/photo-1715490187538-30a365fa05bd?q=80&w=1945&auto=format&fit=crop']
    }
  };
 

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.name = params['name'];
      this.config.userName = this.name;
      var roleparam = params['role'];
      if(roleparam == "host")
        this.role=1;
      else
        this.role=0;
    });
    this.getVideoSDKJWT();
  }

  getVideoSDKJWT() {
    this.inSession = true;
    var jwtToken = this.generateVideoSdkApiJwt("iCjNmlJ0tHuA5k6qM3y7S1Vo4hjO0VyyoCXV", "ulaqib8IDthk6SQaT4GiNKFkbAfzMHjQ12x8");
    this.config.videoSDKJWT = jwtToken;
    this.joinSession()

  }

  joinSession() {

    this.sessionContainer = document.getElementById('sessionContainer');
    uitoolkit.joinSession(this.sessionContainer, this.config);

    // this.uitoolkitContainer = document.getElementById('uitoolkitContainer');
    // this.videoContainer = document.getElementById('videoContainer');
    // this.chatContainer = document.getElementById('chatContainer');



    // uitoolkit.showUitoolkitComponents(this.uitoolkitContainer, this.config);
    // uitoolkit.showVideoComponent(this.videoContainer);
    // uitoolkit.showChatComponent(this.chatContainer);
  
  }

  

  sessionClosed = (() => {
    console.log('session closed')
    // uitoolkit.hideVideoComponent(this.videoContainer)
    // uitoolkit.hideChatComponent(this.chatContainer)
    // uitoolkit.hideUitoolkitComponents(this.sessionContainer)
    this.inSession = false
  });



// https://www.npmjs.com/package/jsrsasign
generateVideoSdkApiJwt(sdkApiKey: string, sdkApiSecret: string): string {
  // const KJUR = require('jsrsasign');
  const iat = Math.round((new Date().getTime() - 30000) / 1000); // issued at time
  const exp = iat + 60 * 60 * 2; // expiration time (2 hours)

  const oHeader = { alg: 'HS256', typ: 'JWT' };
  const oPayload = {
    app_key: sdkApiKey,
    iss: sdkApiKey, // issuer
    iat: iat, // issued at
    exp: exp, // expiration
    tpc: this.sessionName,
    role_type: this.role
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);

  // Sign the JWT using HS256 and return the token
  const videosdkApiToken = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkApiSecret);
  console.log(videosdkApiToken);

  return videosdkApiToken;
}


}
