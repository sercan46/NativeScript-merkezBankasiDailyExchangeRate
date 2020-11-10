import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { KurlarComponent } from "./kurlar/kurlar.component";
import { AnasayfaComponent } from "./anasayfa/anasayfa.component";
import { HesaplamaComponent } from "./hesaplama/hesaplama.component";

const routes: Routes = [
    { path: "", redirectTo: "/anasayfa", pathMatch: "full" },
    { path: "anasayfa", component: AnasayfaComponent },
    { path: "kurlar", component: KurlarComponent },
    { path: "hesaplama", component: HesaplamaComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
