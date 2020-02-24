# Angular Translation & Localization

Since this blog is about translation and since our main targets markets here at <b>Yes Soft</b> are German and English speaking developers, this blog will be available in both Deutsch and English. to get the German language please use the like bellow:

*the German Article link

<b>This is the final stage of the `i18n` product, for the `ngx-translate` check `ngx-translate` brach</b>

## Goals

The goal of this tutorial is building a translated UI from existing one, a demo repository shall be found [here]().

but I will be starting a new project and you can start here with me.

The main goals of this Demo app is to cover these goals:

1. UI based in the geo-origin of the request.
2. switchable UI language using i18n.
3. Accept-Header http client, for requesting the correct language from the API.

with that in mind let us start.



## UI Designs

for simplicity sake the UI will contain a login page only with a header. and a welcome screen with "Hello world" welcome screen.



## Getting Started

for this project I'm using Angular CLI v8.3.21

### Cloning the Project

you need to execute 

```sh
git clone https://hello.com/iii.git
```

### Installing the Project

use the command `npm i` on the project directory.



## Adding the Translation Service

we have two ways to achieve that, the first is using i18n built-in service. the other is using `ngx-translate`.

in this tutorial we shall discuss both and compare them to each other.

### about i18n 

* used multiple subdomains like: `en.example.com` and `de.example.com`.
* I couldn't get a clear view on how to switch between the languages on the runtime.
* uses XML format in the `xlf` file format.

### About `ngx-translate`

* simpler to use
* uses `http` interceptor in order for translation.
* clear and easy `lang_code.json` translation file format.

## i18n

### Adding The Service

```
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

Finally, we add an "id" to the strings we want to translate.

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

after that use the tag `<target` to specify the translation of that particular text inside that tag.

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
                            "browserTarget": "i18n-angular-project:build:en"
                        }
                    }
                }
            }
        }
    }
}
```

Just add the lines I wrote and <b>Do Not Change anything else</b> in the `angular.json` file.

now, we can start serving localized versions of the website by adding another couple of scripts to `package.json` file as follows:

```
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







