function hexToHSL(H) {
    let r = parseInt(H.substr(1, 2), 16) / 255;
    let g = parseInt(H.substr(3, 2), 16) / 255;
    let b = parseInt(H.substr(5, 2), 16) / 255;
  
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin;
  
    let h = 0, s = 0, l = 0;
  
    if (delta !== 0) {
      if (cmax === r) h = ((g - b) / delta) % 6;
      else if (cmax === g) h = (b - r) / delta + 2;
      else h = (r - g) / delta + 4;
    }
  
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2*l - 1));
  
    return { h, s: s * 100, l: l * 100 };
  }
  
  function hsl(h, s, l) {
    return `hsl(${h}, ${Math.min(s,100)}%, ${l}%)`;
  }
  
  function createColorRow(title, color, desc) {
    return `
      <div style="
        display:flex;
        align-items:center;
        gap:12px;
        margin-bottom:12px;
        padding:10px;
        border-radius:10px;
        background: rgba(255,255,255,0.03);
      ">
        
        <div style="
          width:40px;
          height:40px;
          border-radius:8px;
          background:${color};
          border:1px solid rgba(255,255,255,0.1);
        "></div>
  
        <div>
          <div style="font-weight:600;">${title}</div>
          <div style="font-size:12px; opacity:0.7;">
            ${desc}
          </div>
          <div style="font-size:11px; opacity:0.5;">
            ${color}
          </div>
        </div>
  
      </div>
    `;
  }
  
  function generatePalette() {
    const root = document.documentElement;
    const base = document.getElementById("baseColor").value;
    const preview = document.getElementById("preview");
    const info = document.getElementById("info");
    const generateBtn = document.getElementById("generateBtn");
  
    const c = hexToHSL(base);
  
    const bg = hsl(c.h, c.s * 0.6, 12);
    const surface = hsl(c.h, c.s * 0.5, 18);
    const card = hsl(c.h, c.s * 0.4, 26);
    const textPrimary = hsl(c.h, Math.min(c.s * 0.25, 100), 88);
    const textSecondary = hsl(c.h, Math.min(c.s * 0.2, 100), 70);
  
    root.style.setProperty("--bg", `linear-gradient(135deg, ${bg}, ${surface})`);
    root.style.setProperty("--card", card);
    root.style.setProperty("--text-primary", textPrimary);
    root.style.setProperty("--text-secondary", textSecondary);
    root.style.setProperty("--accent", base);
  
    const buttonText = c.l > 60 ? "#000" : "#fff";
  
    // 🔥 BOTÃO DINÂMICO
    generateBtn.style.background = base;
    generateBtn.style.color = buttonText;
    generateBtn.style.boxShadow = `0 5px 15px ${base}55`;
  
    preview.innerHTML = `
      <div style="
        background: linear-gradient(135deg, ${bg}, ${surface});
        padding:40px;
        color:${textPrimary};
        box-shadow: 0 0 0 1px rgba(255,255,255,0.1);
      ">
        <h2>✨ Seção Gerada</h2>
        <p style="color:${textSecondary};">
            Paleta aplicada dinamicamente.
        </p>
  
        <div style="background:${card}; padding:20px; border-radius:10px;">
          Interface adaptada automaticamente.
        </div>
  
        <button style="
          margin-top:15px;
          padding:10px 16px;
          border:none;
          border-radius:8px;
          background:${base};
          color:${buttonText};
        ">
          Botão
        </button>
      </div>
    `;
  
    info.innerHTML = `
      <div class="card" style="
        background: ${surface};
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      ">
        <h3 style="margin-bottom:15px;">🎨 Paleta Gerada</h3>
  
        ${createColorRow("Fundo (Background)", bg, "Plano de fundo principal")}
        ${createColorRow("Surface", surface, "Seções e containers")}
        ${createColorRow("Card", card, "Cartões e elementos elevados")}
        ${createColorRow("Texto Primário", textPrimary, "Títulos e textos principais")}
        ${createColorRow("Texto Secundário", textSecondary, "Textos de apoio")}
        ${createColorRow("Accent", base, "Botões e destaques")}
      </div>
    `;
  }
  
  // ⚡ ATUALIZA EM TEMPO REAL
  document.getElementById("baseColor").addEventListener("input", (e) => {
    const color = e.target.value;
    const c = hexToHSL(color);
    const buttonText = c.l > 60 ? "#000" : "#fff";
  
    const generateBtn = document.getElementById("generateBtn");
  
    generateBtn.style.background = color;
    generateBtn.style.color = buttonText;
    generateBtn.style.boxShadow = `0 5px 15px ${color}55`;
  });