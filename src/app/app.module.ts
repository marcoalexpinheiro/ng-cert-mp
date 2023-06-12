import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppMaterialModule } from './app.material.module';
import { AppComponent, DialogContentComponent } from './app.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { QuizRowComponent } from './components/quiz/components/quiz-row/quiz-row.component';
import { SharedService } from './services/shared.service';
import { AppService } from './services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { QuestionsStore } from './store/questions.store';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    DialogContentComponent,
    QuizComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    QuizRowComponent,
  ],
  providers: [SharedService, AppService, QuestionsStore],
  bootstrap: [AppComponent],
})
export class AppModule {}
