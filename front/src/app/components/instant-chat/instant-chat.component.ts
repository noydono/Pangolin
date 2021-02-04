import { Component, OnInit, Renderer2 } from '@angular/core';
import { InstantChatService } from 'src/app/_services/instant-chat.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-instant-chat',
  templateUrl: './instant-chat.component.html',
  styleUrls: ['./instant-chat.component.sass']
})
export class InstantChatComponent implements OnInit {
  myProfile: any = {};
  title = 'instant-chatting';
  user: String;
  room: String;
  colorPangolin: String;
  messageText: String;
  messageArray: Array<{ famille: String, user: String, message: String }> = [];
  constructor(
    private instantChatservice: InstantChatService,
    private tokenStorageService: TokenStorageService,
    private render2: Renderer2
  ) {
    console.log(this.messageArray);

    this.instantChatservice.newUserJoined()
      .subscribe(res => {
        this.messageArray.push(res)
        this.colorPangolin = res.famille
      });

    this.instantChatservice.userLeftRoom()
      .subscribe(res => {
        this.messageArray.push(res)
      });

    this.instantChatservice.newMessageReceived()
      .subscribe(res => {
        this.messageArray.push(res)
      });

  }

  ngOnInit() {
    this.getProfile()
    this.join()
    this.render2.listen(window, "beforeunload", () => {
      this.leave()
    })

  }
  ngOnDestroy() {
    console.log("couoc");
    this.leave()
  }
  closeWindow() {

  }
  getProfile() {
    this.myProfile = this.tokenStorageService.getProfile()
  }
  join() {
    this.instantChatservice.joinRoom({ user: this.myProfile.username, famille: this.myProfile.famille, room: this.room });
  }

  leave() {
    this.instantChatservice.leaveRoom({ user: this.myProfile.username,famille: this.myProfile.famille, room: this.room });
  }

  sendMessage() {
    this.instantChatservice.sendMessage({ user: this.myProfile.username,famille: this.myProfile.famille, room: this.room, message: this.messageText });
    this.messageText = ""

  }
}
