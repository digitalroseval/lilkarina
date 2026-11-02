const SESSION_HOURS = 8;

const HTML = (appName) => `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#101114">
  <title>${escapeHtml(appName)}</title>
  <style>
    :root{color-scheme:dark;--bg:#101114;--panel:#181a20;--panel2:#20232b;--line:#2b2e38;--text:#f3f4f6;--muted:#9da3b2;--accent:#c4a6ff;--accent2:#9b7be0}
    *{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:15px/1.6 Inter,ui-sans-serif,system-ui,-apple-system,sans-serif}
    button,input{font:inherit}.shell{max-width:1120px;margin:auto;padding:34px 24px 80px}.top{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:54px}
    .brand{display:flex;align-items:center;gap:12px;font-weight:700;letter-spacing:.01em}.mark{width:36px;height:36px;border-radius:12px;background:var(--accent);color:#17131f;display:grid;place-items:center;font-weight:900}
    .eyebrow{color:var(--accent);font-size:11px;text-transform:uppercase;letter-spacing:.16em;font-weight:700}.hero{max-width:680px;margin-bottom:34px}.hero h1{font-size:clamp(34px,6vw,56px);line-height:1.05;letter-spacing:-.045em;margin:12px 0}.hero p{color:var(--muted);font-size:16px;margin:0}
    .section-head{display:flex;justify-content:space-between;align-items:end;margin:42px 0 16px}.section-head h2{font-size:18px;margin:0}.section-head span{color:var(--muted);font-size:13px}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:14px}.category{border:1px solid var(--line);background:var(--panel);border-radius:18px;padding:21px;text-align:left;color:inherit;cursor:pointer;min-height:166px;transition:.18s}.category:hover{border-color:#655482;transform:translateY(-2px);background:var(--panel2)}
    .cat-icon{width:38px;height:38px;border-radius:12px;background:#292433;color:var(--accent);display:grid;place-items:center;font-size:18px;margin-bottom:20px}.category h3{margin:0 0 5px;font-size:17px}.category p{margin:0;color:var(--muted);font-size:13px}.lock{float:right;color:var(--muted);font-size:12px}
    .panel{border:1px solid var(--line);background:var(--panel);border-radius:18px;padding:24px}.hidden{display:none!important}.back{background:none;border:0;color:var(--accent);cursor:pointer;padding:0;margin:0 0 22px}.article-list{display:grid;gap:10px}.article{width:100%;text-align:left;background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:17px;color:inherit;cursor:pointer}.article:hover{border-color:#655482}.article h3{font-size:16px;margin:0 0 4px}.article p{color:var(--muted);margin:0;font-size:13px}.meta{font-size:12px;color:var(--muted);margin-top:8px}
    .reader{max-width:780px;margin:auto}.reader h1{font-size:clamp(30px,5vw,44px);line-height:1.12;letter-spacing:-.035em}.prose{color:#d9dbe2}.prose h2{margin-top:34px;font-size:23px}.prose h3{margin-top:25px;font-size:18px}.prose p,.prose li{line-height:1.8}.prose blockquote{border-left:3px solid var(--accent);margin:22px 0;padding:8px 18px;background:var(--panel);color:#c7c3d0}.prose code{background:#272a32;padding:2px 5px;border-radius:5px}.prose pre{white-space:pre-wrap;background:#1b1d24;padding:16px;border-radius:12px;overflow:auto}.prose a{color:var(--accent)}
    .modal-wrap{position:fixed;inset:0;background:#000a;display:grid;place-items:center;padding:20px;z-index:5}.modal{width:min(420px,100%);background:#1b1d24;border:1px solid var(--line);border-radius:20px;padding:26px;box-shadow:0 25px 80px #0008}.modal h2{margin:0 0 5px}.modal p{color:var(--muted);margin:0 0 20px;font-size:14px}.field{width:100%;padding:13px 14px;border-radius:10px;border:1px solid var(--line);background:#111318;color:var(--text);outline:none}.field:focus{border-color:var(--accent)}.primary{width:100%;border:0;border-radius:10px;padding:13px;background:var(--accent);color:#17131f;font-weight:750;cursor:pointer;margin-top:12px}.error{color:#ff9b9b;font-size:13px;margin-top:10px;min-height:20px}.empty{color:var(--muted);padding:28px;text-align:center;border:1px dashed var(--line);border-radius:14px}
    @media(max-width:600px){.shell{padding:22px 16px 60px}.top{margin-bottom:38px}.hero p{font-size:14px}}
  </style>
</head>
<body>
<div class="shell">
  <header class="top"><div class="brand"><div class="mark">K</div><span id="brandName">${escapeHtml(appName)}</span></div><span class="eyebrow">Espace interne</span></header>
  <main>
    <section id="home">
      <div class="hero"><div class="eyebrow">Knowledge hub</div><h1>Tout le savoir-faire<br>de l’agence, au même endroit.</h1><p>Retrouve les procédures, formations et conseils de l’équipe dans une bibliothèque unique.</p></div>
      <div class="section-head"><h2>Bibliothèque</h2><span id="categoryCount">Chargement…</span></div>
      <div class="grid" id="categories"></div>
    </section>
    <section id="categoryView" class="hidden"><button class="back" id="backHome">← Toutes les catégories</button><div class="hero"><div class="eyebrow">Catégorie</div><h1 id="categoryTitle"></h1><p id="categoryDescription"></p></div><div class="article-list" id="articles"></div></section>
    <section id="readerView" class="hidden reader"><button class="back" id="backCategory">← Retour à la catégorie</button><div class="eyebrow" id="readerCategory"></div><h1 id="readerTitle"></h1><div class="meta" id="readerMeta"></div><article class="prose" id="readerContent"></article></section>
  </main>
</div>
<div class="modal-wrap hidden" id="passwordModal"><form class="modal" id="passwordForm"><h2>Accès réservé</h2><p id="passwordDescription">Entre le mot de passe de cette section pour continuer.</p><input class="field" id="passwordInput" type="password" placeholder="Mot de passe" autocomplete="current-password" required><button class="primary" type="submit">Déverrouiller</button><div class="error" id="passwordError"></div></form></div>
<script>
const $ = (id) => document.getElementById(id);
let categories = [], activeCategory = null, pendingCategory = null;
const icons = {'chatting':'✦','instagram':'◎','management':'◈','training':'▤'};
function show(id){['home','categoryView','readerView'].forEach(x=>$(x).classList.toggle('hidden',x!==id))}
async function api(url, options={}){const r=await fetch(url,{headers:{'content-type':'application/json',...(options.headers||{})},...options});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.error||'Une erreur est survenue');return data}
function escapeHtml(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function renderMarkdown(md=''){
 const lines=md.split(/\r?\n/);let out='',inList=false,inCode=false,code='';
 const inline=s=>escapeHtml(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>');
 for(const line of lines){if(line.startsWith('```')){if(inList){out+='</ul>';inList=false}if(inCode){out+='<pre><code>'+escapeHtml(code.trimEnd())+'</code></pre>';code='';inCode=false}else inCode=true;continue}if(inCode){code+=line+'\n';continue}
  if(/^[-*] /.test(line)){if(!inList){out+='<ul>';inList=true}out+='<li>'+inline(line.slice(2))+'</li>';continue}else if(inList){out+='</ul>';inList=false}
  if(!line.trim())continue;if(line.startsWith('### '))out+='<h3>'+inline(line.slice(4))+'</h3>';else if(line.startsWith('## '))out+='<h2>'+inline(line.slice(3))+'</h2>';else if(line.startsWith('# '))out+='<h2>'+inline(line.slice(2))+'</h2>';else if(line.startsWith('> '))out+='<blockquote>'+inline(line.slice(2))+'</blockquote>';else out+='<p>'+inline(line)+'</p>';
 }if(inList)out+='</ul>';if(inCode)out+='<pre><code>'+escapeHtml(code)+'</code></pre>';return out;
}
function openModal(cat){pendingCategory=cat;$('passwordDescription').textContent='Entre le mot de passe pour accéder à '+cat.name+'.';$('passwordError').textContent='';$('passwordInput').value='';$('passwordModal').classList.remove('hidden');$('passwordInput').focus()}
function closeModal(){$('passwordModal').classList.add('hidden')}
async function enterCategory(cat){activeCategory=cat;show('categoryView');$('categoryTitle').textContent=cat.name;$('categoryDescription').textContent=cat.description;const box=$('articles');box.innerHTML='<div class="empty">Chargement…</div>';try{const data=await api('/api/categories/'+encodeURIComponent(cat.id)+'/articles');if(!data.articles.length){box.innerHTML='<div class="empty">Aucune ressource publiée pour le moment.</div>';return}box.innerHTML=data.articles.map(a=>'<button class="article" data-id="'+escapeHtml(a.id)+'"><h3>'+escapeHtml(a.title)+'</h3><p>'+escapeHtml(a.summary)+'</p><div class="meta">'+a.reading_minutes+' min de lecture</div></button>').join('');box.querySelectorAll('.article').forEach(el=>el.addEventListener('click',()=>openArticle(el.dataset.id)))}catch(e){box.innerHTML='<div class="empty">'+escapeHtml(e.message)+'</div>'}}
async function openArticle(id){try{const data=await api('/api/articles/'+encodeURIComponent(id));$('readerCategory').textContent=activeCategory.name;$('readerTitle').textContent=data.article.title;$('readerMeta').textContent=data.article.reading_minutes+' min de lecture';$('readerContent').innerHTML=renderMarkdown(data.article.content);show('readerView')}catch(e){alert(e.message)}}
$('categories').addEventListener('click',e=>{const card=e.target.closest('[data-category]');if(!card)return;const cat=categories.find(c=>c.id===card.dataset.category);if(cat)openModal(cat)});
$('passwordForm').addEventListener('submit',async e=>{e.preventDefault();if(!pendingCategory)return;try{await api('/api/auth/'+encodeURIComponent(pendingCategory.id),{method:'POST',body:JSON.stringify({password:$('passwordInput').value})});closeModal();enterCategory(pendingCategory)}catch(err){$('passwordError').textContent=err.message}});
$('backHome').onclick=()=>show('home');$('backCategory').onclick=()=>show('categoryView');$('passwordModal').addEventListener('click',e=>{if(e.target===$('passwordModal'))closeModal()});
async function init(){try{const data=await api('/api/categories');categories=data.categories;$('categoryCount').textContent=categories.length+' sections';$('categories').innerHTML=categories.map(c=>'<button class="category" data-category="'+escapeHtml(c.id)+'"><span class="lock">⌑ Protégé</span><div class="cat-icon">'+(icons[c.id]||'▦')+'</div><h3>'+escapeHtml(c.name)+'</h3><p>'+escapeHtml(c.description)+'</p></button>').join('')}catch(e){$('categories').innerHTML='<div class="empty">'+escapeHtml(e.message)+'</div>'}}
init();
</script>
</body></html>`;

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers }
  });
}

function cookieMap(request) {
  return Object.fromEntries((request.headers.get("Cookie") || "").split(";").map(part => {
    const i = part.indexOf("=");
    return i < 0 ? ["", ""] : [part.slice(0, i).trim(), part.slice(i + 1).trim()];
  }).filter(([key]) => key));
}

function base64url(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function sign(value, secret) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return base64url(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value)));
}

async function makeToken(section, secret) {
  const payload = base64url(new TextEncoder().encode(JSON.stringify({ section, exp: Date.now() + SESSION_HOURS * 3600_000 })));
  return payload + "." + await sign(payload, secret);
}

async function validToken(token, section, secret) {
  if (!token || !secret) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || signature !== await sign(payload, secret)) return false;
  try {
    const data = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return data.section === section && data.exp > Date.now();
  } catch { return false; }
}

async function getCategory(env, id) {
  return env.DB.prepare("SELECT id, name, description, password_key FROM categories WHERE id = ? AND is_active = 1").bind(id).first();
}

async function authorized(request, section, env) {
  const token = cookieMap(request)["kb_" + section];
  return validToken(token, section, env.SESSION_SECRET);
}

function cookieHeader(name, value, maxAge) {
  return name + "=" + value + "; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=" + maxAge;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders() });

    try {
      if (request.method === "GET" && path === "/") {
        return new Response(HTML(env.APP_NAME || "Agency Knowledge Base"), {
          headers: { "content-type": "text/html; charset=utf-8", "x-content-type-options": "nosniff", "referrer-policy": "strict-origin-when-cross-origin" }
        });
      }

      if (!env.DB) return json({ error: "La base D1 n’est pas encore configurée." }, 503);

      if (request.method === "GET" && path === "/api/categories") {
        const { results } = await env.DB.prepare("SELECT id, name, description, icon, sort_order FROM categories WHERE is_active = 1 ORDER BY sort_order, name").all();
        return json({ categories: results });
      }

      const authMatch = path.match(/^\/api\/auth\/([a-z0-9-]+)$/);
      if (request.method === "POST" && authMatch) {
        const category = await getCategory(env, authMatch[1]);
        if (!category) return json({ error: "Section introuvable." }, 404);
        const body = await request.json().catch(() => ({}));
        const expected = env[category.password_key];
        if (!expected) return json({ error: "Le mot de passe de cette section n’est pas encore configuré." }, 503);
        if (typeof body.password !== "string" || body.password.length > 200 || body.password !== expected) {
          return json({ error: "Mot de passe incorrect." }, 401);
        }
        if (!env.SESSION_SECRET) return json({ error: "Le secret de session n’est pas configuré." }, 503);
        const token = await makeToken(category.id, env.SESSION_SECRET);
        return json({ success: true }, 200, { "set-cookie": cookieHeader("kb_" + category.id, token, SESSION_HOURS * 3600) });
      }

      const articlesMatch = path.match(/^\/api\/categories\/([a-z0-9-]+)\/articles$/);
      if (request.method === "GET" && articlesMatch) {
        const category = await getCategory(env, articlesMatch[1]);
        if (!category) return json({ error: "Section introuvable." }, 404);
        if (!await authorized(request, category.id, env)) return json({ error: "Accès refusé. Déverrouille cette section." }, 401);
        const { results } = await env.DB.prepare("SELECT id, title, summary, reading_minutes FROM articles WHERE category_id = ? AND is_published = 1 ORDER BY sort_order, title").bind(category.id).all();
        return json({ articles: results });
      }

      const articleMatch = path.match(/^\/api\/articles\/([a-z0-9-]+)$/);
      if (request.method === "GET" && articleMatch) {
        const article = await env.DB.prepare("SELECT id, category_id, title, summary, content, reading_minutes FROM articles WHERE id = ? AND is_published = 1").bind(articleMatch[1]).first();
        if (!article) return json({ error: "Ressource introuvable." }, 404);
        if (!await authorized(request, article.category_id, env)) return json({ error: "Accès refusé. Déverrouille cette section." }, 401);
        return json({ article });
      }

      return json({ error: "Route introuvable." }, 404);
    } catch (error) {
      return json({ error: "Erreur serveur.", detail: env.ENVIRONMENT === "development" ? String(error) : undefined }, 500);
    }
  }
};

function corsHeaders() {
  return { "access-control-allow-origin": "*", "access-control-allow-methods": "GET, POST, OPTIONS", "access-control-allow-headers": "content-type" };
}
