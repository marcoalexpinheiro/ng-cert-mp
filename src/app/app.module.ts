import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppMaterialModule } from './app.material.module';
import { AppComponent, DialogContentComponent } from './app.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { QuizRowComponent } from './components/quiz/components/quiz-row/quiz-row.component';
import { SharedService } from './services/shared.service';
import { SessionStorageService } from './services/session-storage.service';

import { AppService } from './services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { QuestionsStore } from './stores/questions.store';
import { CategoriesStore } from './stores/categories.store';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
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
  providers: [
    FormBuilder,
    SharedService,
    SessionStorageService,
    AppService,
    QuestionsStore,
    CategoriesStore,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
