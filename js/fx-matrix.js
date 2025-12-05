export function startMatrix(canvas){
  const ctx = canvas.getContext("2d");
  const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  function resize(){
    canvas.width = innerWidth * DPR; canvas.height = innerHeight * DPR;
    canvas.style.width = innerWidth+"px"; canvas.style.height = innerHeight+"px";
  }
  resize(); addEventListener('resize', resize);

  const chars = "01";
  const size = 16 * DPR;
  let cols = Math.floor(canvas.width / size);
  let drops = new Array(cols).fill(1);

  let running = true;
  document.addEventListener("visibilitychange",()=>{running = !document.hidden;});

  function tick(){
    if(!running) return requestAnimationFrame(tick);
    ctx.fillStyle = "rgba(0,0,0,0.06)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#00ffcc";
    ctx.font = size + "px 'Fira Code', monospace";
    for(let i=0;i<drops.length;i++){
      const t = chars[Math.random()*chars.length|0];
      ctx.fillText(t, i*size, drops[i]*size);
      if(drops[i]*size > canvas.height && Math.random() > 0.975) drops[i]=0;
      drops[i]++;
    }
    requestAnimationFrame(tick);
  }
  tick();
}
