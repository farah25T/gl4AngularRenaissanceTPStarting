import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { TodoComponent } from "./todo/todo/todo.component";
import { MiniWordComponent } from "./directives/mini-word/mini-word.component";
import { ColorComponent } from "./components/color/color.component";
import { FrontComponent } from "./templates/front/front.component";
import { AdminComponent } from "./templates/admin/admin.component";
import { LoginComponent } from "./auth/login/login.component";
import { NF404Component } from "./components/nf404/nf404.component";
import { AuthGuard } from "./auth/guards/auth.guard";
import { AddCvComponent } from "./cv/add-cv/add-cv.component";
import { CvComponent } from "./cv/cv/cv.component";
import { DetailsCvComponent } from "./cv/details-cv/details-cv.component";
import { RhComponent } from "./optimizationPattern/rh/rh.component";
import { MasterDetailsCvComponent } from "./cv/master-details-cv/master-details-cv.component";
import { CvResolver } from "./cv/resolvers/cv.resolver";
import { DetailsCvComponentV2 } from "./cv/details-cv-v2/details-cv.component";
import { CvDetailsResolver } from "./cv/resolvers/cv-details.resolver";
import { FilteredCvComponent } from "./cv/filtered-cv/filtered-cv.component";
import { ProductsComponent } from "./products/products.component";
import { CustomPreloadingStrategy } from "./preloading.strategy";
const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'rh', component: RhComponent },
  {
    path: 'cvs',
    component: MasterDetailsCvComponent,
    resolve: {
      cvR: CvResolver,  
    },
    children: [
      {
        path: ':id',
        component: DetailsCvComponentV2,
        resolve :
        {
          cvDetails : CvDetailsResolver
        }
      }
    ]
  },
  {
    path: "cv",
    component: CvComponent,
    resolve: {
      cvR: CvResolver,  
    },
    loadChildren: () => import('./cv/cv.module').then((m) => m.CvModule),
    data : {preload : true}
  },
  {
    path: 'cvf',
    component: FilteredCvComponent,
  },
  { path: 'cv/add', component: AddCvComponent, canActivate: [AuthGuard] },
  { path: 'cv/:id', component: DetailsCvComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: '',
    component: FrontComponent,
    children: [
      { path: "todo", 
        component: TodoComponent,
        loadChildren: () => import('./todo/todo.module').then((m) => m.TodoModule),
        data : {preload : false}
      },
      { path: "word", component: MiniWordComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [{ path: 'color', component: ColorComponent }],
  },
  { path: '**', component: NF404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{preloadingStrategy: CustomPreloadingStrategy})
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
