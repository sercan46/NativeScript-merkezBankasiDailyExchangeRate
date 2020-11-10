import { Component, OnInit } from '@angular/core';
import { KurlarService } from './kurlar.service';
import Theme from "@nativescript/theme";
import { RouterExtensions } from 'nativescript-angular/router';
@Component({
  selector: 'ns-kurlar',
  templateUrl: './kurlar.component.html',
  styleUrls: ['./kurlar.component.css']
})
export class KurlarComponent implements OnInit {

  constructor( private kurService:KurlarService,private routerExtensions:RouterExtensions) { }
  kurdanGelenXml: any;
  jsonaDonusme: any;
  rssDonenDegerler: any;
  tamamlananDizi:any;
  mode="Gece Modu"
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

        this.tamamlananDizi=this.jsonaDonusme.Tarih_Date.Currency
      console.log("tamamlananDizi",this.tamamlananDizi );
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
