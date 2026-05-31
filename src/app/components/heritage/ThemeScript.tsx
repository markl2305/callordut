/* No-flash theme bootstrap. Runs before paint in <head>: reads the persisted
   choice (default light) and sets data-theme on <html> so the correct palette
   is applied on first render — no flash, SSR-safe. */
export function ThemeScript() {
  const js = `(function(){try{var t=localStorage.getItem('cl-theme');if(t!=='dark'&&t!=='light'){t='light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
