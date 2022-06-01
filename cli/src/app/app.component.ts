import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import {Frame} from "stompjs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ang-websocket';
  ws: any;
  constructor(){}

  ngOnInit(): void {
    this.wsConnect();
  }
  ngOnDestroy(): void {
    this.wsDisconnect();
  }

  private wsConnect() {
    let socket = new WebSocket("ws://localhost:8080/greeting");
    this.ws = Stomp.over(socket);
    this.ws.debug = ()=>{}; //disable verbose logging
    let that = this;
    this.ws.connect({}, function() {
      that.ws.subscribe("/unsynced", function(message: Frame) {
        console.info(`unsynced notification from Server on channel:`, message.body);
      });

      that.ws.subscribe("/other", function(message: Frame) {
        console.info(`other notification from Server on channel:`, message.body);
      });
    }, function(error: any) {
      console.error("STOMP error " + error);
    });

  }
  private wsDisconnect() {
    if (this.ws != null) {
      this.ws.ws.close();
    }
    console.log("Disconnected");
  }

}
