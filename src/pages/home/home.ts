import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, IonicPage } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";

import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contasFirebase: FirebaseListObservable<any>;
  contas = [];
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

    this.afDatabase.list('/contas')
      .subscribe(contas => {
        contas.forEach(conta => {
          conta.prods = [];
          Object.keys(conta.produtos).map(function (objectKey, index) {
            var value = conta.produtos[objectKey];
            conta.prods.push(conta.produtos[objectKey])
          });
        })
        this.contas = contas;
      });

    loading.dismiss();
  }

  finalizar(conta, pedido) {
    console.log("Finalizar", pedido)
    console.log("teste", this.contas.indexOf(conta))
    console.log("prod", this.contas[this.contas.indexOf(conta)].prods.indexOf(pedido))
    console.log("fsfs", this.contas[this.contas.indexOf(conta)].prods[this.contas[this.contas.indexOf(conta)].prods.indexOf(pedido)]);

    this.contas[this.contas.indexOf(conta)].prods[this.contas[this.contas.indexOf(conta)].prods.indexOf(pedido)].entregue = true;

  }

  save() {
    this.afDatabase.list('/contas')
      .subscribe(contas => {
        contas.forEach(conta => {
          conta.prods = [];
          Object.keys(conta.produtos).map(function (objectKey, index) {
            var value = conta.produtos[objectKey];
            conta.prods.push(conta.produtos[objectKey])
          });
        })
        this.contas = contas;
      });
  }


}
