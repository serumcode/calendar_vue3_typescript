import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';
import messages from '../translations/translations'
import { useI18n } from "vue-i18n";

let i18n:any;
export function setI18nLanguage(locale:string) {
  
    i18n.global.locale.value = locale;
    i18n.global.locale._value = locale;
    localStorage.setItem('lang', locale);
}

export default function setupI18n() {
  if(!i18n) {
    let locale:any = localStorage.getItem('lang');
    if(!locale){
      locale= navigator?.language
    }
    if(!locale){
      locale="hu"
    }
    i18n = createI18n({
      globalInjection: true,
      legacy: false,
      locale: locale,
      messages,
      fallbackLocale: 'hu'
    });

    setI18nLanguage(locale);
  }
  return i18n;
}
export {i18n}