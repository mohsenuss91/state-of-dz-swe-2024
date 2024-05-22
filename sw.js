(()=>{"use strict";var e={508:()=>{try{self["workbox:core:7.0.0"]&&_()}catch(e){}},704:()=>{try{self["workbox:precaching:7.0.0"]&&_()}catch(e){}},802:()=>{try{self["workbox:routing:7.0.0"]&&_()}catch(e){}},120:()=>{try{self["workbox:strategies:7.0.0"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,s),i.exports}(()=>{s(508);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),i=e=>e||n(a.precache),r=e=>e||n(a.runtime);function c(e,t){const s=t();return e.waitUntil(s),s}s(704);function o(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:a}=e;if(!a)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),i=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:i.href}}class h{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class l{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let u;async function f(e,s){let a=null;if(e.url){a=new URL(e.url).origin}if(a!==self.location.origin)throw new t("cross-origin-copy-response",{origin:a});const n=e.clone(),i={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=s?s(i):i,c=function(){if(void 0===u){const e=new Response("");if("body"in e)try{new Response(e.body),u=!0}catch(e){u=!1}u=!1}return u}()?n.body:await n.blob();return new Response(c,r)}function d(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class p{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const g=new Set;s(120);function y(e){return"string"==typeof e?new Request(e):e}class w{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new p,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let a=y(e);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const i=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:i,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:i.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=y(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,i=await this.getCacheKey(t,"read"),r=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(i,r);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(e,s){const a=y(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const i=await this.getCacheKey(a,"write");if(!s)throw new t("cache-put-with-no-response",{url:(r=i.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:o,matchOptions:h}=this._strategy,l=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),f=u?await async function(e,t,s,a){const n=d(t.url,s);if(t.url===n)return e.match(t,a);const i=Object.assign(Object.assign({},a),{ignoreSearch:!0}),r=await e.keys(t,i);for(const t of r)if(n===d(t.url,s))return e.match(t,a)}(l,i.clone(),["__WB_REVISION__"],h):null;try{await l.put(i,u?c.clone():c)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of g)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:f,newResponse:c.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=y(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class _{constructor(e={}){this.cacheName=r(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new w(this,{event:t,request:s,params:a}),i=this._getResponse(n,s,t);return[i,this._awaitComplete(i,n,s,t)]}async _getResponse(e,s,a){let n;await e.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const i of e.iterateCallbacks("handlerDidError"))if(n=await i({error:t,event:a,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,i;try{n=await e}catch(i){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(i=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:i}),t.destroy(),i)throw i}}class v extends _{constructor(e={}){e.cacheName=i(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(v.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const t=n.integrity,i=e.integrity,r=!i||i===t;if(a=await s.fetch(new Request(e,{integrity:"no-cors"!==e.mode?i||t:void 0})),t&&r&&"no-cors"!==e.mode){this._useDefaultCacheabilityPluginIfNeeded();await s.cachePut(e,a.clone());0}}return a}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(e);if(!await s.cachePut(e,a.clone()))throw new t("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==v.copyRedirectedCacheableResponsesPlugin&&(a===v.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(v.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}v.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},v.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await f(e):e};class m{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new v({cacheName:i(e),plugins:[...t,new l({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const a of e){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:e,url:n}=o(a),i="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==a.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,a.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,i),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return c(e,(async()=>{const t=new h;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),i=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return c(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}s(802);(async()=>{const e=function(){const e=JSON.parse(new URLSearchParams(self.location.search).get("params"));return e.debug&&console.log("[Docusaurus-PWA][SW]: Service Worker params:",e),e}(),t=[{"revision":"7ecaf99a9725fdc69de1ce71398ab112","url":"404.html"},{"revision":"41ba3b0ebf110c3f693e3b1296638ce4","url":"about/index.html"},{"revision":"4bb332e019ee6b7186fc764355cbae79","url":"assets/css/styles.d43cd908.css"},{"revision":"cdfe7c4b8e471a2641459c6f47c8aa5c","url":"assets/js/01a85c17.c251d24d.js"},{"revision":"3b844ab109ad54e0d9e78f583bdb8fa5","url":"assets/js/0f23b9c1.5827b3c9.js"},{"revision":"b1700f3361cd06c74750372f62621120","url":"assets/js/0fd4c4b6.cf694640.js"},{"revision":"7e723b2e61dc78e7501bae4264aa9af7","url":"assets/js/101.a360e084.js"},{"revision":"2e81c26fcb7dffc3cdb21fe81de49234","url":"assets/js/1425.479afe75.js"},{"revision":"1e8b6e1e1c0d54b10fe2043efe6fa36f","url":"assets/js/166.52fd59f4.js"},{"revision":"f20ec2e4526321970de9f3e0b58161a5","url":"assets/js/1686.33fffa75.js"},{"revision":"62a85a0360ca28ae9878be04993f9325","url":"assets/js/17896441.0f583e1f.js"},{"revision":"5c079a537bfde870ea9c544acf4fe992","url":"assets/js/18.7c4064b0.js"},{"revision":"93bcd784c61740b34a126fdf99fd000e","url":"assets/js/1896.6661ba47.js"},{"revision":"e3d0152640e5d92b6bf6d7d237b24add","url":"assets/js/1a4e3797.8c5708b8.js"},{"revision":"06a4226a9085233cd11e22486f5bc69c","url":"assets/js/1f391b9e.5fc7e2df.js"},{"revision":"6679cb89d4c5e9b06ba360a648acbdda","url":"assets/js/2101.f99d72eb.js"},{"revision":"c3c2d85a488d93716dd8fb27530c88d7","url":"assets/js/2152.01129f08.js"},{"revision":"10ac3a73a8d258ee06982794b7ea204e","url":"assets/js/2166.98b30156.js"},{"revision":"bc5f6f30e490a9989a201157755833e9","url":"assets/js/22.a5166f22.js"},{"revision":"0b3fbe7c445cc7ca641128b0ecbca605","url":"assets/js/230.2ae93e2f.js"},{"revision":"83b6a183da4189cf73b282a3069c2326","url":"assets/js/25003e4f.32d91298.js"},{"revision":"e1eae3adc1336a6ec19b41ea9b8cda5a","url":"assets/js/2531.af15e71b.js"},{"revision":"164cbd12ec4acb7868c2e72efb41e6c6","url":"assets/js/2696.1b8ca828.js"},{"revision":"d5ce96d4c83f44de142102a95eed73e7","url":"assets/js/2bd4dc93.cf774847.js"},{"revision":"552b694f55a2b8293ac4c6971cb04cfe","url":"assets/js/2f3ab84e.548546d3.js"},{"revision":"9487d5408fd49b36249dec17f304d57f","url":"assets/js/3032.77271804.js"},{"revision":"d66407d208f860422e9732359c45eeeb","url":"assets/js/3480.e8acf97a.js"},{"revision":"44c869f8110d9cc2f40ee19056834955","url":"assets/js/3530.ce77f8d9.js"},{"revision":"34f93ff368b2336006551b4230186bb3","url":"assets/js/356a0ac6.7d835f83.js"},{"revision":"5b25d0b142bee0dc9d264cca9b3b3bc9","url":"assets/js/3591.2deaff99.js"},{"revision":"946d16e1c9856e78eedb9cccafc643ba","url":"assets/js/36994c47.8f17e7f5.js"},{"revision":"d49c3997523ebb19ed82de177e90e413","url":"assets/js/3775.eb0be428.js"},{"revision":"0c44874e4f433c52db27068245b74ca3","url":"assets/js/393be207.a55e0c41.js"},{"revision":"cea5c24c49061965a8bd9479fab9e496","url":"assets/js/3964.0404a9be.js"},{"revision":"96562d41b2a9cab38432cd88fbb79188","url":"assets/js/4068.f1fec91c.js"},{"revision":"9b37e88424e188d6367dc0218b45951f","url":"assets/js/41756ce8.5f1ec040.js"},{"revision":"94056986d1ff6b7b97eef40623ed631c","url":"assets/js/4185f04d.96a43481.js"},{"revision":"8dd5475df818dfc75f8c2a7203f1e196","url":"assets/js/425.0d68b60e.js"},{"revision":"6547dde429baf33933bc9ca1c634d669","url":"assets/js/428d7c44.d003ce08.js"},{"revision":"ee3356d107618d55d6da9af01d776722","url":"assets/js/432.1f683a32.js"},{"revision":"0fb12f8df7c8d9be5869234384513b45","url":"assets/js/432.cd833a59.js"},{"revision":"fc6f383f36ccdd90a16d4c6fb1a9b7ca","url":"assets/js/483.2cfc483e.js"},{"revision":"2bab404120ede199929465a07adcdcea","url":"assets/js/4908.db4d32dd.js"},{"revision":"b8dab4d64c1e455f176a9ee52844ba6b","url":"assets/js/499d255e.05553014.js"},{"revision":"56f42730db4fb3a569eeea52d7c260cc","url":"assets/js/4b5f24e3.286da970.js"},{"revision":"0b1307725a6743f69ecaec74a0cab49c","url":"assets/js/5015.cdc9064d.js"},{"revision":"a247059aeb8cb6cd66111b1eb6fb7152","url":"assets/js/5018.9e3471de.js"},{"revision":"8654758813c1b55e1600a8f56f62d26f","url":"assets/js/531.dbb054ce.js"},{"revision":"9214696e32268054a360c2cef93d6559","url":"assets/js/5360.cb55d583.js"},{"revision":"f1887059d0ea09f31572e727c6b8922b","url":"assets/js/53a3e6dc.3b94ad0c.js"},{"revision":"70ce0c5c2690a40e071b2183e94b890d","url":"assets/js/5760.0d191178.js"},{"revision":"fb2c638bec75e5d175dc85b1a4b0bb2a","url":"assets/js/5906868a.df496f07.js"},{"revision":"ab190626b79e357882522204305fa5ab","url":"assets/js/591.e18a0d6b.js"},{"revision":"bed17c3f9fb3f425a2631128a12e015f","url":"assets/js/5962.e53c80e4.js"},{"revision":"ed84f26845135b1c6910cafe5ec297e1","url":"assets/js/5e95c892.31f6b763.js"},{"revision":"e615da2fe842c2fd0d04dc8bd8783bdc","url":"assets/js/6018.b252f274.js"},{"revision":"4572acb40777bff57fa53e281769b8cc","url":"assets/js/6022.cfb12023.js"},{"revision":"fa99bd519a5e71b5bf48c3c57710052d","url":"assets/js/605.50fa61a5.js"},{"revision":"6e4924ed6ff0ec833e523615e3fa71f5","url":"assets/js/605.f13d03ac.js"},{"revision":"a6e84c81fd155e62d4d5b1847eff8bef","url":"assets/js/608.21b8b824.js"},{"revision":"54daff191eb83ccf0c5d589b1b682256","url":"assets/js/60e0d9dc.181cb24e.js"},{"revision":"a505e42c22cbb9eb11377e0e8ea49771","url":"assets/js/628.387afc64.js"},{"revision":"dfb12cfbf3b12933478e0417521b59e0","url":"assets/js/637.97fa4cf1.js"},{"revision":"3f48e689a9b1fbccc09f3abda8f9970a","url":"assets/js/6535.d852213f.js"},{"revision":"5198914c44572996bc8cb1d034718c1f","url":"assets/js/66c10cbb.57b67adc.js"},{"revision":"2d3c19cefd9acfe933d3236000b49e44","url":"assets/js/68.714b08ee.js"},{"revision":"7e9e788d6a591123d2c8044eb16f139f","url":"assets/js/6875c492.9393fde5.js"},{"revision":"c51893323d9d2c5c4f455556c77c0e27","url":"assets/js/696.5ee39d6d.js"},{"revision":"266a3f79146897792ba8e34495f462f5","url":"assets/js/699.7a0deac4.js"},{"revision":"2aa6d5b5ea7036f2e6f8a352cdb5a893","url":"assets/js/699.98e8e836.js"},{"revision":"9595f72dae57443054d2e59589fbf9c8","url":"assets/js/7291.5d4eb369.js"},{"revision":"dcfa52eb5453b0b0494d556e579a802c","url":"assets/js/764.1a3d6554.js"},{"revision":"0aa676d2de90267129a1287b10a0e924","url":"assets/js/7960.1ec1cb5e.js"},{"revision":"c88d5982f9af4485af7c293f0e399c8a","url":"assets/js/79774bfc.632e6dbb.js"},{"revision":"e5697179639e1d7dd570a3343c3df691","url":"assets/js/7c110bd0.2a041b9b.js"},{"revision":"63b00adfc946cc864349d8f722d9c6b7","url":"assets/js/809.148cd1c6.js"},{"revision":"0cf179f20f2e6cca21cb2f2b4acb3d26","url":"assets/js/814f3328.b3d4bee9.js"},{"revision":"ff6a1b26542239d95ab173f7ce010f41","url":"assets/js/84ac4f92.c5a54e6f.js"},{"revision":"446c8e2aa10b36eb7aad6f6f9aeaa641","url":"assets/js/8608.ea6cc490.js"},{"revision":"d590a1678fea5e17cd907beec91be8fb","url":"assets/js/86360b2a.1a8a5ef9.js"},{"revision":"e197070b4a594a47be6c61a5ba7f7c41","url":"assets/js/8789.ee0a9104.js"},{"revision":"8f6a170e6c822be66a96d7382ce3dd8b","url":"assets/js/8872.d6af0d61.js"},{"revision":"094668e44fddc853f1d3dae8f5bf2a41","url":"assets/js/88884f83.93edd2e4.js"},{"revision":"666f5fc850ac4cfeddcffd9c8168bdb1","url":"assets/js/896.6bebe8e9.js"},{"revision":"ef70c09d95f2dcd5aa142dbb57218143","url":"assets/js/8e33b65d.db552428.js"},{"revision":"dad3e176c9563609e4c1af1306d9f879","url":"assets/js/8ed95ef2.06810141.js"},{"revision":"5ec16595129d631a10364da86225cae1","url":"assets/js/9019.5c077089.js"},{"revision":"3c14d84b8b67aff94d82ca2a1ef41063","url":"assets/js/908.f27ecf3d.js"},{"revision":"8d3e7452e64c579411da107057ef91cf","url":"assets/js/922cfe81.863d18ce.js"},{"revision":"7bb6ca7ba67ec927cab4bd7b58007f12","url":"assets/js/9319.5ef9113d.js"},{"revision":"6c45380caa6be8797a60b07773f20bc2","url":"assets/js/935.f2a7fb97.js"},{"revision":"9560cddc0153b7e7fee13de8b29786ec","url":"assets/js/960.7a7df71d.js"},{"revision":"4ff989e2e38e0290a0b17a41f35e7eec","url":"assets/js/962.d073ae58.js"},{"revision":"b43cdf89b1906b2a8aa41a672ec84b4e","url":"assets/js/9628.f9e5f4b3.js"},{"revision":"dbec267165aea33ee5d19492dd190d33","url":"assets/js/964.ddf26035.js"},{"revision":"a968abd6646e9afe56da31d500d18b76","url":"assets/js/9764.82eb8205.js"},{"revision":"0944030cc28e31c0f4ed36c1a0e6409f","url":"assets/js/9809.5afdb69d.js"},{"revision":"c0b06b3921e6505200c058f51e26338a","url":"assets/js/9982.07e78147.js"},{"revision":"62cf28322f31cfba1fdb7fdb8cf39b2f","url":"assets/js/9dc221e8.454a5c0a.js"},{"revision":"ca58c1fa8611d360937b7fa50c22312d","url":"assets/js/9e4087bc.91c4e463.js"},{"revision":"78577546061c6a6e3ba288aaf8ef6666","url":"assets/js/a6aa9e1f.a6bbd607.js"},{"revision":"b0286d93b8f0c7533c616fc543923a10","url":"assets/js/a7456010.7b4b0a20.js"},{"revision":"d56b5d3d8759f3258a5168df16995d3c","url":"assets/js/a7bd4aaa.fbb59131.js"},{"revision":"7fb4fda72683ebd7d0e41ff440f5ccee","url":"assets/js/a94703ab.b8921ac3.js"},{"revision":"aea484d67c6257fde3fbb92a0235e7b5","url":"assets/js/aba21aa0.9ac6642b.js"},{"revision":"4a8d963ceaca69c352419fb502b53e35","url":"assets/js/acecf23e.dee0de35.js"},{"revision":"23444b2f782d11e2b46a76db5fb48794","url":"assets/js/b168443a.fe6e63a9.js"},{"revision":"dd6aa1b79171a37126eda4dac1872a3e","url":"assets/js/b79bdd52.ae2ac528.js"},{"revision":"64d6060b5783edce03bcf6b709a0a4c7","url":"assets/js/c141421f.94fe8bc5.js"},{"revision":"a1eafc18623bc409bae381a457c9a0de","url":"assets/js/c377a04b.db06fff4.js"},{"revision":"0fa9f3f1c5a17d9fc4f69a759e09f4a8","url":"assets/js/c4f5d8e4.c194f607.js"},{"revision":"e75b61f85c3ebb8c2f4daaba1c72511c","url":"assets/js/c6c42e98.056e4bdc.js"},{"revision":"a4c5255bffe7a150014494132a8f9ad9","url":"assets/js/ccc49370.8804b816.js"},{"revision":"c0da326a6e3068cd8bb5646c57cd92fe","url":"assets/js/d5227632.d0bce5f4.js"},{"revision":"d2d5fa22369c1bc6b7ab4278f85b0317","url":"assets/js/d924ec2b.82c32c25.js"},{"revision":"234b3c8e124ddd2cd576a2a091905501","url":"assets/js/df90ec84.88662e86.js"},{"revision":"b520f69c26403730513de11cd65864c8","url":"assets/js/e6d800de.d5b5d913.js"},{"revision":"a424e79ae976150926e9ca09b0c8e0e8","url":"assets/js/f1358ff9.9bccf7f7.js"},{"revision":"eb52ee54e251244bde699a070b391c1c","url":"assets/js/f2afad6f.2918f1e3.js"},{"revision":"8dc4f7187746588748316c4d00495ccc","url":"assets/js/f36671a7.d984472f.js"},{"revision":"0be2146a25dc268a3e7d6cad23546156","url":"assets/js/f931b00d.ca1b4e0c.js"},{"revision":"94874796865499beb4b79803b74b7bdd","url":"assets/js/faabbdc4.62839c98.js"},{"revision":"367a8df3747576c4606617ccf7d2a2eb","url":"assets/js/fc099570.ab206b1d.js"},{"revision":"baa6af73a09b3ff310f615250f4a15dd","url":"assets/js/main.2ab23074.js"},{"revision":"ec029af6f941aff560ed63a35b73fc63","url":"assets/js/runtime~main.47b61ef1.js"},{"revision":"5f48ae34a6e449ff64942211a7d348e9","url":"blog/2024-survey-closing/index.html"},{"revision":"70c4a63cec112191de39a92a0dcc632c","url":"blog/archive/index.html"},{"revision":"9c2cb837f9f68ddc81f0fda68e7e0f7e","url":"blog/index.html"},{"revision":"e7bba862a4d33d05a5a10fb6fe17a04b","url":"blog/kickstart-survey-2024/index.html"},{"revision":"430972c44084e569075397aba3dde51f","url":"blog/tags/english/index.html"},{"revision":"eda7af27f03bbbabca32d0ac0ae894fc","url":"blog/tags/general/index.html"},{"revision":"c758a4ccedaa308e913749edf117eb0c","url":"blog/tags/index.html"},{"revision":"2d2c5346550a01bf9a6ca10083b39b28","url":"contact/index.html"},{"revision":"0b814854b15d8135bb69eaf0bbcfdbb9","url":"cookie/index.html"},{"revision":"0e76e504ecb15526cc0bdd6083daf594","url":"docs/appendix/glossary/index.html"},{"revision":"006a20c33b22197d0ea0503808e45b6f","url":"docs/appendix/index.html"},{"revision":"8b41454bc0a1a8c23b7be19e762d847f","url":"docs/appendix/methodology/index.html"},{"revision":"4b22ccc47b41a2e24a9901bd55a2e4ce","url":"docs/appendix/raw-interviews/index.html"},{"revision":"5020f5a3a2697a8c76d7b66eee55de4f","url":"docs/appendix/raw-results/index.html"},{"revision":"110dc2255ef28d2c8d6d147e84c8ed89","url":"docs/closing/index.html"},{"revision":"66b4fd78ee459d3a13a5985b74dee8a5","url":"docs/index.html"},{"revision":"c3afb9124f6720a9ef04fb0f296d28bb","url":"docs/insights/agile-ways-of-working/index.html"},{"revision":"c0807ef85c3b42e1204ace3a3f6211be","url":"docs/insights/challenges/index.html"},{"revision":"07c1d97c632fe40ae756b6cc7b312b05","url":"docs/insights/cloud-and-devops/index.html"},{"revision":"dc4bc91b60f4a68d5e2aca0a3f894579","url":"docs/insights/communities/index.html"},{"revision":"54fa29eabd3f82f7e1c7a1eae4cdc3a3","url":"docs/insights/cybersecurity/index.html"},{"revision":"658978c92183ea4ec9c9f9fef67801ae","url":"docs/insights/data-and-ml/index.html"},{"revision":"0fcee965899ab1db8c3e45aebe43022c","url":"docs/insights/e-payment-solutions/index.html"},{"revision":"c07b6e75f221596d121d84f05caa751c","url":"docs/insights/education-and-learning/index.html"},{"revision":"45bc7fbd0aebf670db36b9ee91e06f15","url":"docs/insights/future/index.html"},{"revision":"eed4bf6dc6de4e573d931d12c8691384","url":"docs/insights/index.html"},{"revision":"592343d5feb79f92710eabbb2f63e5f3","url":"docs/insights/open-source/index.html"},{"revision":"e948165c85c389a8ccd2b85581ac089d","url":"docs/insights/remote-working/index.html"},{"revision":"5c23460b95321464ec2a43c99dee0054","url":"docs/insights/remuneration/index.html"},{"revision":"f3edba609ec1705de6464f596f66c1fa","url":"docs/insights/talents-migration/index.html"},{"revision":"d66d54a2f136e74f5da029e45d333e40","url":"docs/insights/technology-trends/index.html"},{"revision":"02381f911e759b55a98aa24d8d714500","url":"index.html"},{"revision":"ca7fe517a0f885f241cd0949fe6e87b1","url":"manifest.json"},{"revision":"18d1bb1f8cea5499da4b960922218f4f","url":"markdown-page/index.html"},{"revision":"302b142a69014c7c03d98bd83a1c28c1","url":"privacy/index.html"},{"revision":"5fb10ee034f1e34d17f129ed1b8ee9dc","url":"report/index.html"},{"revision":"5f95516ff718f65d100a98e37cb8b38b","url":"search/index.html"},{"revision":"4e70fd2ff3cc66d529e59c671a17ae5a","url":"support/index.html"},{"revision":"38b8a1266359f178c8292ca9281831ef","url":"assets/images/agile-730c26b6d630c7d5ad6a770ea8f56db9.png"},{"revision":"524d8b5aed9e403304dc6a3d37f33222","url":"assets/images/bac-and-esi-scores-25a5b5ba17e60afe9197cebe4c26b50e.png"},{"revision":"fe90205736d7726dc4008d09f31801be","url":"assets/images/cib-web-data-9d0fc8a57fcdf496d412e98667e97a56.png"},{"revision":"d5e5811d648c1c9357723e283359bc89","url":"assets/images/google-trends-programming-langs-6a4601d77935448b2d4af4222e19c0ea.png"},{"revision":"2bbe9c169f99e3fce5127ab32caec0c8","url":"assets/images/happiness-index-d3fd5d183bf1259342a6044d2e1617b8.png"},{"revision":"cba3160389522c6f547f79797f13198f","url":"assets/images/programming-language-2020-trend-d9759270f46178743084bfcd25f8f64e.png"},{"revision":"5fbc4101466904415874aa4e0bdfaefb","url":"assets/images/salaries-in-dz-106d27f2e6e84b1b888e4563e816eec4.png"},{"revision":"a343b04e6c413cc9662d606c7d6e0064","url":"assets/images/StatCounter-dz-mobile-users-e4588bacb9adcb48dddd59b005a27c2e.png"},{"revision":"96cafc0b0bdbc3cd01a8f14b0ff8a53b","url":"assets/images/wesbos-js-course-8f84bca56c5a1bf32704ca327676971e.png"},{"revision":"12f2f62f852e671f5f4c83e64607e817","url":"favicon.ico"},{"revision":"0b2be1e066201547c2b3b2758db0c60d","url":"icons/android-chrome-192x192.png"},{"revision":"006642b3b6e1a7432305adacc5bce3c7","url":"icons/android-chrome-512x512.png"},{"revision":"c3975c6b769e557b39740db06731ac65","url":"icons/apple-touch-icon.png"},{"revision":"620f2731871d9be56396891b39499921","url":"icons/favicon-16x16.png"},{"revision":"2de9a729203d7a45fd33cbce53362985","url":"icons/favicon-32x32.png"},{"revision":"fbf769576f276b332d2408da392a5579","url":"icons/mstile-150x150.png"},{"revision":"cba3160389522c6f547f79797f13198f","url":"img/2020-survey/programming-language-2020-trend.png"},{"revision":"be018037a51fd4cad92b820109a4d600","url":"img/2020-survey/salaries-in-algiers.png"},{"revision":"5fbc4101466904415874aa4e0bdfaefb","url":"img/2020-survey/salaries-in-dz.png"},{"revision":"43ba8efeefbb6964185a33659530a86e","url":"img/chabiba-ta3-code.png"},{"revision":"96cafc0b0bdbc3cd01a8f14b0ff8a53b","url":"img/challenges/wesbos-js-course.png"},{"revision":"c90ecdc5dc7a91ad36cb1158d80aa6fe","url":"img/favicon.ico"},{"revision":"0bbbabab04484623c1cfbc22286587dc","url":"img/logo.png"},{"revision":"26c06d8a92a9d9b3cef0a464a09a795a","url":"img/stats/age.png"},{"revision":"38b8a1266359f178c8292ca9281831ef","url":"img/stats/agile.png"},{"revision":"524d8b5aed9e403304dc6a3d37f33222","url":"img/stats/bac-and-esi-scores.png"},{"revision":"fe90205736d7726dc4008d09f31801be","url":"img/stats/cib-web-data.png"},{"revision":"efa2fd6dd1c0f9be35c61231970a975f","url":"img/stats/education.png"},{"revision":"4024f01808a212a71895d2f30fdc94cb","url":"img/stats/employment-type.png"},{"revision":"d5e5811d648c1c9357723e283359bc89","url":"img/stats/external/google-trends-programming-langs.png"},{"revision":"a343b04e6c413cc9662d606c7d6e0064","url":"img/stats/external/StatCounter-dz-mobile-users.png"},{"revision":"9558f8303cbdf6ad8e6fa19957e6e14d","url":"img/stats/gender.png"},{"revision":"2bbe9c169f99e3fce5127ab32caec0c8","url":"img/stats/happiness-index.png"},{"revision":"14e2fdea2eee036e3a26fd69d476eaa5","url":"img/stats/living-abroad.png"},{"revision":"b43e5f81abd7612558416ccbb754797f","url":"img/stats/online-ads-report-icon.png"},{"revision":"1ae1b81ee54a0f787637ca45662718f7","url":"img/stats/roles.png"},{"revision":"a299c6b537aa31839bbdaa3bc5865fc8","url":"img/stats/salarie-in-eur.png"},{"revision":"20b417cdd7b8e35f7ea8ce2015ac8568","url":"img/undraw_anonymous_feedback_re_rc5v.svg"},{"revision":"46e799b297961877e0a742bff7882aee","url":"img/undraw_data_re_80ws.svg"},{"revision":"44bfd5fa02ef54dfe010a9ef5600176a","url":"img/undraw_pair_programming_re_or4x.svg"},{"revision":"fa48c770b83c78e9459d4c3aec5a2705","url":"img/undraw_real_time_analytics_re_yliv.svg"},{"revision":"fdbce306d38057613cb581a4c9331e31","url":"safari-pinned-tab.svg"}],s=new m({fallbackToNetwork:!0});e.offlineMode&&(s.addToCacheList(t),e.debug&&console.log("[Docusaurus-PWA][SW]: addToCacheList",{precacheManifest:t})),await async function(e){}(),self.addEventListener("install",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: install event",{event:t}),t.waitUntil(s.install(t))})),self.addEventListener("activate",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: activate event",{event:t}),t.waitUntil(s.activate(t))})),self.addEventListener("fetch",(async t=>{if(e.offlineMode){const a=t.request.url,n=function(e){const t=new URL(e,self.location.href);return t.origin!==self.location.origin?[]:(t.search="",t.hash="",[t.href,`${t.href}${t.pathname.endsWith("/")?"":"/"}index.html`])}(a);for(const i of n){const r=s.getCacheKeyForURL(i);if(r){const s=caches.match(r);e.debug&&console.log("[Docusaurus-PWA][SW]: serving cached asset",{requestURL:a,possibleURL:i,possibleURLs:n,cacheKey:r,cachedResponse:s}),t.respondWith(s);break}}}})),self.addEventListener("message",(async t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: message event",{event:t});const s=t.data?.type;"SKIP_WAITING"===s&&self.skipWaiting()}))})()})()})();