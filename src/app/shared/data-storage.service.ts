import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

import {AppComponent} from '../app.component';
import {FirebaseConfigService} from './firebase-config-service';




@Injectable()
export class DataStorageService {
   recipeFile = '/recipes.json?auth=';

  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService,
              private firebaseConfigService: FirebaseConfigService) {
  }



  storeRecipes() {

    return this.http.post(this.firebaseConfigService.getFirebaseConfig().databaseURL + this.recipeFile +
      this.authService.getToken(), this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.http.get(this.firebaseConfigService.getFirebaseConfig().databaseURL + this.recipeFile + token)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
