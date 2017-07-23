import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, IonicPage } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contas: FirebaseListObservable<any>;
  usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController, private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    this.getContas();
  }

  getContas() {
    let loading = this.loadingCtrl.create();
    loading.present();

    this.contas = this.afDatabase.list('contas');
    this.contas.subscribe((contas) => {
      loading.dismiss();
    })
  }


}
