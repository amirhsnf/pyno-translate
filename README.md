# pyno-translate

A lightweight Angular translation module with support for:
- Nested translation keys
- Dynamic parameter interpolation (`{{name}}`)
- Runtime JSON loading from assets folder

Designed for Angular 16+ standalone and module-based apps.

---

## 📦 Installation

```bash
npm install pyno-translate
```

---

## ⚙️ Setup

### 1. Import the module

For module-based apps:

```ts
import { PynoTranslateModule } from 'pyno-translate';

@NgModule({
  imports: [PynoTranslateModule]
})
export class AppModule {}
```

For standalone apps:

```ts
import { PynoTranslateModule } from 'pyno-translate';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(PynoTranslateModule)
  ]
});
```

---

### 2. Load translations using `APP_INITIALIZER`

To ensure translations are loaded before the app renders, use this in your `main.ts`:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, inject, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { PynoTranslateService, PynoTranslateModule } from 'pyno-translate';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(PynoTranslateModule),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const translate = inject(PynoTranslateService);
        return () => new Promise<void>((resolve) => {
          translate.setPath('assets/langs'); //for public folder: setPath('langs')
          translate.setLang('en', resolve); //set your default lang
        });
      }
    }
  ]
});
```

---

## 📁 JSON Structure

Create translation files like this: `assets/langs/en.json`
or for public folder `public/langs/en.json`

```json
{
  "home": {
    "greeting": "Hello {{name}}!",
    "title": "Pyno Translate!"
  }
}
```

---

## 🧪 Usage in Component

For standalone components:
```ts
import { PynoTranslateModule } from 'pyno-translate';
@Component({
  imports: [PynoTranslateModule]
})
```

### In Template (HTML):

```html
<h2>{{ 'home.greeting' | translate:{ name: 'Amir' } }}</h2>
<h3>{{ 'home.title' | translate }}</h3>
```

### In Component (TS):

```ts
import { PynoTranslateService } from 'pyno-translate';
constructor(private translate: PynoTranslateService) {
  let result = this.translate.translate('home.greeting', { name: 'Amir' });
  console.log(result); // Hello Amir!
  result = this.translate.translate('home.title');
  console.log(result); // Pyno Translate!
}
```

---

## 🧠 API

| Method | Description                                                                                                                                                            |
|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setPath(path: string)` | Set the path to JSON translation files. If you're using assets folder => `assets/langs`. If you're using public folder, do not mention public folder in path => `langs` |
| `setLang(lang: string, onComplete?: () => void)` | Load a specific language file => `translate->setLang('en')`                                                                                                            |
| `translate(key: string, params?: object)` | Translate a key with optional params                                                                                                         |

---

## ✅ License

MIT

Designed & Developed by [Amir Navidfar](https://github.com/amirhsnf)
