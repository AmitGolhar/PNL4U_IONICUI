import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
 
import { SharedModule } from './shared/shared.module';
import { JwtInterceptor } from './guards/auth.interceptor';
 import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
     
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
     AppRoutingModule,
    HttpClientModule,
    SharedModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    QRCodeModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
