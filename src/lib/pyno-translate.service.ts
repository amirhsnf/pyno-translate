import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PynoTranslateService {
  constructor(private http: HttpClient) {
  }

  private translations: any = {};
  private currentLang = 'en';
  private path = 'langs';

  setLang(lang: string, onLoadComplete?: () => void) {
    this.currentLang = lang;
    this.loadTranslations(lang, onLoadComplete);
  }

  setPath(path: string) {
    this.path = path;
  }

  private loadTranslations(lang: string, done?: () => void): void {
    let url = this.path + '/' + lang + '.json';
    this.http.get(url).subscribe({
      next: (data: any) => {
        this.translations = data;
        done?.();
      },
      error: () => {
        this.translations = {};
        done?.();
      }
    });
  }

  public translate(key: string, params?: Record<string, string | number>): string {
    const value = this.findValue(this.translations, key) || key;
    if (typeof value === 'string') {
      return this.replacement(value, params);
    }
    return key;
  }

  private findValue(data: any, key: string): any {
    return key.split('.').reduce((previous, current) => previous?.[current], data);
  }

  private replacement(text: string, params?: Record<string, string | number>): string {
    if (!params) return text;
    Object.keys(params).forEach((param: string) => {
      text = text.replaceAll(`{{${param}}}`, String(params[param]));
    });
    return text;
  }
  public getCurrentLang() {
    return this.currentLang;
  }
}
