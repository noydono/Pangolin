import { Component, OnInit, Renderer2 } from '@angular/core';
import { InstantChatService } from 'src/app/_services/instant-chat.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-instant-chat',
  templateUrl: './instant-chat.component.html',
  styleUrls: ['./instant-chat.component.sass']
})
export class InstantChatComponent implements OnInit {
  myProfile: any={};
  title = 'instant-chatting';
  user: String;
  room: String;
  messageText: String;
  messageArray: Array<{user: String , message: String }> = [];
  constructor(
    private instantChatservice: InstantChatService,
    private tokenStorageService : TokenStorageService,
    private render2 : Renderer2
    ){

    this.instantChatservice.newUserJoined()
      .subscribe(data => this.messageArray.push(data));

    this.instantChatservice.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this.instantChatservice.newMessageReceived()
      .subscribe(data => this.messageArray.push(data));

  }

  ngOnInit(){    
    this.getProfile()
    this.join()
    this.render2.listen( window, "beforeunload", ()=>{
      this.leave()
    })

  }
  ngOnDestroy(){
    console.log("couoc");
    this.leave()
  }
  closeWindow(){

  }
  getProfile(){    
    this.myProfile = this.tokenStorageService.getProfile()
  }
  join(){
      this.instantChatservice.joinRoom({user: this.myProfile.username, room: this.room});
  }

  leave(){
    this.instantChatservice.leaveRoom({user: this.myProfile.username, room: this.room});
  }

  sendMessage()
  {
    this.instantChatservice.sendMessage({user: this.myProfile.username, room: this.room, message: this.messageText});
    this.messageText=""
  
  }
}
