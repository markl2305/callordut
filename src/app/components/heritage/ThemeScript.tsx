/* No-flash theme bootstrap. Runs before paint in <head>: reads the persisted
   choice (light | dark; anything else is Auto, following the system) and sets
   data-theme + data-theme-choice on <html>. Also marks <html data-js> so
   reveal-once motion hides content only when JS is actually running. */
export function ThemeScript() {
  const js = `(function(){var d=document.documentElement;var t=null;try{t=localStorage.getItem('cl-theme');}catch(e){}var c=(t==='light'||t==='dark')?t:'system';var m=window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches;d.setAttribute('data-theme-choice',c);d.setAttribute('data-theme',c==='system'?(m?'dark':'light'):c);d.setAttribute('data-js','');})();`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
