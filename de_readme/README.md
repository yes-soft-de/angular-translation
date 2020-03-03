# Angular Übersetzung mit `ngx-translate` und `i18n`

Dieses Blog ist auch im Englisch, Sie kann dieses Blog im dieser [hiere]( https://github.com/yes-soft-de/angular-translation ) finden.

## UI Design

Für Einfachheit Zweck, wir haben nur 2 Seiten im unsere Website. das ist Anmeldung seit und "Dashboard" seit.

Sie Kann dieses Repository klonen zur dieses [link]( https://github.com/yes-soft-de/angular-translation).

## Das Start 

in dieser Projekt, wir haben Angular v8.3.21

### Klonen

Sie Kann dieser Repository Klonen via:

```sh
git clone https://github.com/yes-soft-de/angular-translation.git
cd angular-translation
git checkout start
```

### Installation

wir haben ein Terminal im `angular-translation`, in der Terminal ausführen:

```sh
npm i
```

und das ist Alles :).

## Übersetzungsdienste hinzufügen

Ok, wir haben 2 Methoden, erste wir will `i18n` machen, und  nächste `ngx-translate`.

in dieser Blog, wir werden beide diskutieren.

### Über `i18n`

* Wir verwenden dieser Technik in Subdomain Struktur, z.B. `en.example.com` und `de.website.com`.
* Ich können wechsel zwischen den beiden Sprache nicht im Laufzeit.
* Dieser Technik verwendet `xlf`  Datei Format.

### Über `ngx-translate`

das ist eine dritte Drittanbieter Bibliothek welche behandeln Übersetzung für euch.

* Sehr einfach Verwendung. 
* Verwendet `http` Abfangjäger für Übersetzung.
* Einfach `json` Übersetzung Datei Format.

## `i18n`

### Hinzufügen diese Bedienung

```json
ng add @angular/localize
```

### Abkürzung  für Übersetzbar Data Extraktion

Wir hinzufügen diese vor `package.json`:

```json
{
    scripts: {
        \\ ...
        "int:extract": "ng xi18n --output-path src/locales",
        \\ ...
    }
}
```



### Übersetzung Data markieren

Sie kann diese Data markieren via dieses Etikett, z.B. `Ihre Email` und `Ihre Passwort` im dieses Beispiel:

```html
<!-- Add the i18n=".." to the label -->
<mat-label i18n="@@input-login-email">Your Email</mat-label>
<mat-label i18n="@@input-login-password">Your Password</mat-labe>
```

### Übersetzung Data Extrakten

Für Data Extrakten, Wir führen aus:

```sh
npm run int:extract
```

und diese Datei verraten im `src/locales` als `messages.xlf`, wir finden in dieses Datei Dieser Texte:

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

### Daten übersetzen

wir fügen dieses Tag hinzu: `<target> übersetzung </target>` im `<trans-unit>` Tag:

z.B. 

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

### Projekt Staren 

wir füge dieses Tag hinzu im `angular.json`

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
                            "outputPath": "dist/<Projekt Name>/",
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
                            "browserTarget": "<Project Name>:build:en"
                        }
                    }
                }
            }
        }
    }
}
```

ersetzen `<Projekt Name>` mit Ihre Projekt Name.

und schließlich, wir kann hinzufügen Texte im `package.json`:

```json
"scripts": {
	"start:de": "ng serve --configuration=de",
}
```

und das ist alles :).

### Dieses Projekt starten

wir Kann diese Befehl starten:

```sh
npm run start:de
```

und voilà, es ist betreiben und im Deutsch!

Sie kann dieses Projekt finden in dieses Repo Branch [link]( https://github.com/yes-soft-de/angular-translation/tree/start/ ).

und eine letzte Sache, `admin` ist für beide Passwort und Email :).



## `ngx-translate`

Sie kann dieses Modul verwenden durch hinzufügen `core` und `http-loader`.

### Hinzufügen Modul

Sie kann durch dieses Befehl ausführen

```sh
npm i @ngx-translate/core @ngx-translate/http-loader --save
```

OK, danach, Sie muss hinzufügen `ngx-translate` und `http-loader` in `app.module.ts`.

### Importieren Module

 Sie muss dieses code importieren in `app.module.ts` wie folgt:

fonksion

```typescript
// füge diese hinzu
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// und diese funktion
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// und deise Importe
@NgModule({
   imports: [
       // ...
       	HttpClientModule,
    	TranslateModule.forRoot({
      	loader: {
        	provide: TranslateLoader,
        	useFactory: HttpLoaderFactory,
        	deps: [HttpClient]
      	},
        // ...
```

### Erstellen Übersetzen Datei

im `src/assets/i18n` Sie muss Übersetzen Datei in `json` Format als `en.json` und `de.json` und `fr.json` etc.

### z.B. `en.json`

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

### z.B. `de.json`

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

### Verwendung diese Übersetzen Datei

erste Sie muss diese Code Linien kopieren in `app.component.ts`:

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

### Erstellen des Sprachwechsel

Sie Kann Ihre Design implementieren, das ist wie ich geschafft:

```html
<!-- toolbar -->
<mat-toolbar color="white" class="app-header">
  <img src="https://yes-soft.de/wp-content/themes/yes-soft/img/logo.svg" alt="logo">

  <button mat-button (click)='switchLanguage()'>En/De</button>
</mat-toolbar>
```

und in `toolbar`, ich diese Funktion erstellen:

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

### Sprache wechseln im Anwendungslaufzeit

Sie muss ersetzen Ihre Worte mit den Ort der Übersetzung

z.B.

```html
<form [formGroup]="loginForm" (ngSubmit)="login()">
        <mat-form-field appearance="fill">
          <!-- mit dieses Methode -->
          <mat-label translate='login.email_hint'></mat-label>
          <input matInput inputmode="email" formControlName="email">
        </mat-form-field>

        <br>

        <mat-form-field appearance="fill">
          <mat-label translate='login.password_hint'></mat-label>
          <input matInput type="password" formControlName="password">
        </mat-form-field>

        <br>
    	<!-- Oder mit dieses Methode -->
    	<button mat-raised-button color="primary">{{'login.login_btn' | translate }}</button>
</form>
    
```

und im `Dashboard`:

```html
<div id="welcome-container">
  <h1 translate='dashboard.welcome_msg'></h1>
</div>
```

und das ist alles, Sie kann dieses Projekt starten via:

```sh
ng serve --o
```

und Sie kann wechseln zwischen Englisch und Deutsch mit Webseiten-Header-Schaltfläche.

Vielen Dank

Mohammad Al Kalaleeb







