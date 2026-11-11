import { t } from './i18n.mjs';
import { adsenseSnippet } from './adsense.mjs';

/** Devuelve el script de consentimiento: AdSense solo se carga tras aceptar. '' si no hay ID. */
export function consentScript(config) {
  const load = adsenseSnippet(config);
  if (!load) return '';
  return `<script>(function(){var K='ads-consent',get=function(){try{return localStorage.getItem(K)}catch(e){return null}},set=function(v){try{localStorage.setItem(K,v)}catch(e){}};
function load(){${load}}
var b=document.getElementById('cookie-banner');
if(get()==='1'){load();if(b)b.hidden=true}else if(get()==='0'){if(b)b.hidden=true}
document.getElementById('cookie-accept')?.addEventListener('click',function(){set('1');b.hidden=true;load()});
document.getElementById('cookie-reject')?.addEventListener('click',function(){set('0');b.hidden=true});
})();</script>`;
}

export function consentParts(config, lang) {
  const script = consentScript(config);
  if (!script) return {};
  const banner = `<div id="cookie-banner" role="dialog" aria-label="Cookies"><span>${t(lang, 'cookieText')}</span>
<button type="button" id="cookie-accept">${t(lang, 'accept')}</button>
<button type="button" id="cookie-reject">${t(lang, 'reject')}</button></div>`;
  return { extraFoot: banner + '\n' + script };
}
