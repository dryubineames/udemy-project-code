import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {FirebaseConfigService} from './shared/firebase-config-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  constructor(private firebaseConfigService: FirebaseConfigService) {}

  ngOnInit() {
    firebase.initializeApp(this.firebaseConfigService.getFirebaseConfig());
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

}
