import { RouterModule, Routes } from '@angular/router';
import * as ROUTING from './assets/constants/routing.constants';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizGuard } from './guards/quiz.guard';
import { ResultsGuard } from './guards/results.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTING.HOME,
    pathMatch: 'full',
  },

  {
    path: ROUTING.HOME,
    data: { state: 'home' },
    component: HomeComponent,
  },

  {
    path: ROUTING.QUIZ,
    data: { state: 'quiz' },
    canActivate: [QuizGuard],
    component: QuizComponent,
  },

  {
    path: ROUTING.QUIZ + '/' + ROUTING.RESULTS,
    data: { state: 'foo' },
    canActivate: [ResultsGuard],
    component: QuizComponent,
  },
  {
    path: '**',
    redirectTo: ROUTING.HOME,
    data: { state: 'a' },
    pathMatch: 'full',
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
