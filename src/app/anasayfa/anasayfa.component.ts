import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KurlarService } from '../kurlar/kurlar.service';
import Theme from "@nativescript/theme";


@Component({
  selector: 'ns-anasayfa',
  templateUrl: './anasayfa.component.html',
  styleUrls: ['./anasayfa.component.css']
})
export class AnasayfaComponent implements OnInit {

    constructor( private kurService:KurlarService,private router:Router) { }
    kurdanGelenXml: any;
    jsonaDonusme: any;
    rssDonenDegerler: any;
    tamamlananDizi:any;
    text:string;
    mode="Gece Modu";
    ngOnInit() {
        this.haberServis();
        this.xmlVeriCekme(this.jsonaDonusme);
    }
    haberServis() {
        this.kurService.fetchKur().subscribe((resp) => {
            this.kurdanGelenXml = resp;
            this.xmlVeriCekme(this.kurdanGelenXml);
        });
    }
    xmlVeriCekme(a) {
        this.jsonaDonusme = this.kurService.xmldenAl(a);
        //console.log("jsonaDonusme",this.jsonaDonusme );

          this.tamamlananDizi=this.jsonaDonusme.Tarih_Date.$.Tarih
        console.log("tamamlananDizi",this.tamamlananDizi );
        this.text="Kurların En Son Güncelleme Zamanı "+": "+this.tamamlananDizi;
        console.log("text",this.text)

    }
  kurlariAc(){
        this.router.navigate(["kurlar"]);
  }
  hesaplamaAc(){
    this.router.navigate(["hesaplama"]);
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
}
