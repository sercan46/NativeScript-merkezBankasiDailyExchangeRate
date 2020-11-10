import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KurlarService } from '../kurlar/kurlar.service';
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { EventData } from 'tns-core-modules/ui/page';
import * as dialogs from "tns-core-modules/ui/dialogs";
import Theme from "@nativescript/theme";
import { RouterExtensions } from 'nativescript-angular/router';
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import {DropDown} from "nativescript-drop-down"
import { ItemEventData } from "tns-core-modules/ui/list-view";

@Component({
  selector: 'ns-hesaplama',
  templateUrl: './hesaplama.component.html',
  styleUrls: ['./hesaplama.component.css']
})
export class HesaplamaComponent implements OnInit {


    constructor(private router:Router,private kurService:KurlarService,private routerExtensions:RouterExtensions) { }
    hesap:number;
    kurdanGelenXml: any;
    jsonaDonusme: any;
    rssDonenDegerler: any;
    tamamlananDizi:any;
    select:''
    y:number;
    text:string;
    x:any;
    hesaplananKur:number;
    kurlar:any[]=["ABD DOLARI","AVUSTRALYA DOLARI","DANİMARKA KRONU","EURO","İNGİLİZ STERLİNİ","JAPON YENİ","BULGAR LEVASI","RUMEN LEYİ","RUS RUBLESİ","İRAN RİYALİ","ÇİN YUANI","PAKİSTAN RUPİSİ","KATAR RİYALİ"];
      secilenKur:any;
      mode="Gece Modu"
      selectedIndex:any;
    ngOnInit() {
        this.haberServis();
    }
    haberServis() {
      this.kurService.fetchKur().subscribe((resp) => {
          this.kurdanGelenXml = resp;
          this.xmlVeriCekme(this.kurdanGelenXml);
      });
  }
  xmlVeriCekme(a) {
      this.jsonaDonusme = this.kurService.xmldenAl(a);
      this.tamamlananDizi=this.jsonaDonusme.Tarih_Date.Currency


  }
  onItemTap(args: ItemEventData) {
    console.log(`Index: ${args.index}; View: ${args.view} ; Item: ${this.kurlar[args.index]}`);
    this.secilenKur=`${this.kurlar[args.index]}`
    this.kurlariAc();
}
      kurlariAc(){
        console.log("userr",this.hesap)
        if(this.hesap==undefined || !this.hesap){
            dialogs.alert({
                title: "Hata!",
                message: "Lütfen Hesaplamak İstediğiniz Tutarı Giriniz",
                okButtonText: "Tamam"
            }).then(() => {
                console.log("Dialog closed!");
            });
            this.text=""
            this.hesaplananKur=null
        }
        else{
            console.log("secilen kur",this.secilenKur)
        console.log("tamamlananDizi",this.tamamlananDizi)
         this.x= this.tamamlananDizi.filter(x=>x.Isim==this.secilenKur)
         console.log("xxxx",this.x)
         this.x.map(x=>{
             this.y=x.ForexBuying
         })
         this.hesaplananKur=this.hesap*this.y[0]

         this.text=this.hesap+" "+ this.secilenKur
        }
    }
    onSelectedIndexChanged(args: EventData){
      const picker = <ListPicker>args.object;
      this.secilenKur= `${this.kurlar[picker.selectedIndex]}`
    }
    changeMode() {
        console.log("console.girdi")
        console.log("thieme",Theme.getMode())
        if(Theme.getMode()=="ns-light"){
            this.mode="Gündüz Modu"


        }
        else{
            this.mode="Gece Modu"

        }
        Theme.setMode(
            Theme.getMode() === Theme.Light ? Theme.Dark : Theme.Light
        );
    }
    goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
