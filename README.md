# Angular Translation & Localization

Since this blog is about translation and since our main targets markets here at <b>Yes Soft</b> are German and English speaking developers, this blog will be available in both Deutsch and English. to get the German language please use the like bellow:

* der Deutsche Artikel Link [here]( https://github.com/yes-soft-de/angular-translation/tree/master/de_readme )



## UI Designs

for simplicity sake the UI will contain a login page only with a header. and a welcome screen with "Hello world" welcome screen.



## Getting Started

for this project I'm using Angular CLI v8.3.21

### Cloning the Project

you need to execute 

```sh
git clone https://github.com/yes-soft-de/angular-translation.git
cd angular-translation
git checkout start
```

### Installing the Project

use the command `npm i` on the project directory.



## Adding the Translation Services

we have two ways to achieve that, the first is using i18n built-in service. the other is using `ngx-translate`.

in this tutorial we shall discuss both and compare them to each other.

### About i18n 

* used in multiple subdomains structure like: `en.example.com` and `de.example.com`.
* I couldn't get a clear view on how to switch between the languages on the runtime.
* uses XML format in the `xlf` file format.

### About `ngx-translate`

* simpler to use
* uses `http` interceptor in order for translation.
* clear and easy `lang_code.json` translation file format.

## `i18n`

### Adding The Service

```sh
ng add @angular/localize
```

### Shortcut for Extracting Translatable data

we add the following to `package.json`:

```json
{
    "scripts": {
        // ...
        "int:extract": "ng xi18n --output-path src/locales",
        // ...
    }
}
```

### Marking Data for Translation

for instance, if we want to change the lines in the `Login` form from `Your Password` to `Ihre Passwort` we start by changing the label tag to be as follows:

```html
<!-- Add the i18n=".." to the label -->
<mat-label i18n="@@input-login-email">Your Email</mat-label>
<mat-label i18n="@@input-login-password">Your Password</mat-labe>
```

### Extracting Data to Translation Templates

in order to generate the translation sheets, first execute:

```sh
npm run int:extract
```

when the command finishes you should see a new directory called `locales` in the `src` folder, inside you should find a file named `messages.xlf` with the content:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="input-login-email" datatype="html">
        <source>Your Email</source>
        <context-group purpose="location">
          <context context-type="sourcefile">src/app/components/login-page/login-page.component.html</context>
          <context context-type="linenumber">7</context>
        </context-group>
        <note priority="1" from="description">login form email</note>
      </trans-unit>
      <trans-unit id="input-login-password" datatype="html">
        <source>Your Password</source>
        <context-group purpose="location">
          <context context-type="sourcefile">src/app/components/login-page/login-page.component.html</context>
          <context context-type="linenumber">14</context>
        </context-group>
        <note priority="1" from="description">login form password</note>
      </trans-unit>
        
      <!-- Some Other Translation Units -->
      
    </body>
  </file>
</xliff>

```

### Making Translation Sheets

to start translation create one more file with the name `messages.de.xlf` and copy the content of `messages.xlf` into it.

after that use the tag `<target>` to specify the translation of that particular text inside that tag.

the final file should look like:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2"
  xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="input-login-email" datatype="html">
        <source>Your Email</source>
          
          
          
          
        <!-- Notice This Tag, Translation Here -->
        <target>Ihre Email</target>
          
          
          
          
        <context-group purpose="location">
          <context context-type="sourcefile">src/app/components/login-page/login-page.component.html</context>
          <context context-type="linenumber">7</context>
        </context-group>
        <note priority="1" from="description">login form email</note>
      </trans-unit>
      <trans-unit id="input-login-password" datatype="html">
        <source>Your Password</source>
        
          
          
          
          <!-- And This Tag is translation also, since the tag is Target :) -->
        <target>Ihre Passwort</target>
          
          
          
          
        <context-group purpose="location">
          <context context-type="sourcefile">src/app/components/login-page/login-page.component.html</context>
          <context context-type="linenumber">14</context>
        </context-group>
        <note priority="1" from="description">login form password</note>
      </trans-unit>
        
      <!-- Some Other Translation Units -->
        
    </body>
  </file>
</xliff>

```



### Configuring the Project for Translation Service

Now in order for us to render that file we should add a configuration to our little project, now we can do that with editing `angular.json` to use that translation file.

```json
{
    "projects": {
        "AngularInt": {
            "architect": {
                "build": {
                    "configurations": {
                        // Add these Configs
                        "de": {
                            "aot": true,
                            "outputPath": "dist/ishtar/",
                            "i18nFile": "src/locales/messages.de.xlf",
                            "i18nFormat": "xlf",
                            "i18nLocale": "de",
                            "i18nMissingTranslation": "error"
                        }
                    }
                },
                "serve": {
                    "configurations": {
                        // Some Code
                        "de": {
                            "browserTarget": "<project-name>:build:en"
                        }
                    }
                }
            }
        }
    }
}
```

Replace `<project-name>` with the Project name that you have

now, we can start serving localized versions of the website by adding another couple of scripts to `package.json` file as follows:

```json
...
"scripts": {
	"start:de": "ng serve --configuration=de",
}
```

### Running Translated Project

Ok, that's enough for preparation, let us run the thing, to do that we just execute the following:

```sh
npm run start:de
```

and voilà, it's running and in German.

You can find the final product in the `final` branch in GitHub.

By the way, use `admin` for both Email and Password to login :).



## `ngx-translate` 

So in order to start doing this, first we should add a dependency for the translation service and the loader that loads all the translation files,

### Installing the Modules

 it's done with:

```sh
npm i @ngx-translate/core @ngx-translate/http-loader --save
```

Ok, now that we have done it, we should add the `ngx-translate` to the <b>root</b> module of the application, namely `app.module.ts`.

### Importing the Modules

we can do that by adding the lines:

```typescript
// Make Sure these Dependencies are Imported
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// And Add This Function
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// And Add These lines to the dependencies annotation
@NgModule({
   imports: [
       // Add These dependencies
       // ...
       	HttpClientModule,
    	TranslateModule.forRoot({
      	loader: {
        	provide: TranslateLoader,
        	useFactory: HttpLoaderFactory,
        	deps: [HttpClient]
      	},
        // ....
```

### Creating the Translation Service

Under the `assets` folder, we should add a folder `i18n`, in this folder we should add `en.json` and `de.json` files that contains the translations.

#### `en.json`

```json
{
    "login": {
        "email_hint": "Your Email",
        "input_password_hint": "Your Password",
        "login_btn": "login"
    }, "dashboard": {
        "welcome_msg": "Welcome"
    }
}
```

#### `de.json`

```json
{
    "login": {
        "email_hint": "Ihre Email",
        "input_password_hint": "Ihre Password",
        "login_btn": "Einloggen"
    }, "dashboard": {
        "welcome_msg": "Willkommen"
    }
}
```

### Using the language files

Now we can use should add the supported languages in the `App` component using:

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'translation-project';
    constructor(private translate: TranslateService) {
        translate.addLangs(['en', 'de'])
    	translate.setDefaultLang('en');
    	translate.use('en');
    }
}	
```

There are couple of ways we can do, to change the text in the HTML, the easiest of which is using a directive, this way we can avoid making any changes in the `ts` files, making less code complications doing that.

### Creating the Language Switch

```html
<mat-toolbar color="white" class="app-header">
  <img src="https://yes-soft.de/wp-content/themes/yes-soft/img/logo.svg" alt="logo">

  <button mat-button (click)='switchLanguage()'>En/De</button>
</mat-toolbar>
```

I shall add the `switchLanguage` as:

```typescript
  switchLanguage() {
    if (localStorage.getItem('lang')) {
      if (localStorage.getItem('lang') === 'en') {
        this.translationService.use('de');
      } else {
        this.translationService.use('en');
      }
    } else {
      this.translationService.use('en');
    }
  }
```

### Switching Languages in runtime

Now we can use the Directive in the Login form as:

```html
<form [formGroup]="loginForm" (ngSubmit)="login()">
        <mat-form-field appearance="fill">
          <!-- Like This -->
          <mat-label translate='login.email_hint'></mat-label>
          <input matInput inputmode="email" formControlName="email">
        </mat-form-field>

        <br>

        <mat-form-field appearance="fill">
          <mat-label translate='login.password_hint'></mat-label>
          <input matInput type="password" formControlName="password">
        </mat-form-field>

        <br>
		<!-- Or Like This -->
        <button mat-raised-button color="primary">{{'login.login_btn' | translate }}</button>
      </form>
```

* Note: the directive didn't work directly on the material button, that's why i used a span inside the button.

And we should change the Dashboard Screen as:

```html
<div id="welcome-container">
  <h1 translate='dashboard.welcome_msg'></h1>
</div>
```

Done, we can try now switching the language from the browser using:

```sh
ng serve --o
```

Thanks...

Mohammad Al Kalaleeb.



 







