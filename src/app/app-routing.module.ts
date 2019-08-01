import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 預先載入
import { PreloadAllModules } from '@angular/router';


import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

import { LayoutGuard } from './layout/layout.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [ LayoutGuard ], // 加在這裡
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'feature',
        loadChildren: './feature/feature.module#FeatureModule' // 延遲載入
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { // 預設路由
    path: '',
    component: HomeComponent
  },
  { // 萬用路由
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true,  // 可以追蹤錯誤
    useHash: true,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
