const menuToggle=document.getElementById("menuToggle");
const navLinks=document.getElementById("navLinks");

menuToggle.addEventListener("click",()=>{
  const open=navLinks.classList.toggle("active");
  menuToggle.textContent=open?"✕":"☰";
  menuToggle.setAttribute("aria-expanded",open);
});
document.querySelectorAll(".nav-links a").forEach(link=>link.addEventListener("click",()=>{
  navLinks.classList.remove("active");
  menuToggle.textContent="☰";
  menuToggle.setAttribute("aria-expanded","false");
}));

const topButton=document.getElementById("topButton");
window.addEventListener("scroll",()=>{
  topButton.classList.toggle("show",window.scrollY>500);
});
topButton.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

document.getElementById("year").textContent=new Date().getFullYear();

const counters=document.querySelectorAll("[data-number]");
const counterObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target,target=Number(el.dataset.number),duration=1100,start=performance.now();
    const tick=now=>{
      const p=Math.min((now-start)/duration,1);
      el.textContent=Math.floor(p*target);
      if(p<1)requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
},{threshold:.6});
counters.forEach(el=>counterObserver.observe(el));

const reveal=document.querySelectorAll(".service-card,.project-card,.about-grid,.contact-grid");
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  });
},{threshold:.1});
reveal.forEach(el=>revealObserver.observe(el));

const form=document.getElementById("contactForm");
const formMessage=document.getElementById("formMessage");
form.addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  const email=document.getElementById("email").value.trim();
  const message=document.getElementById("message").value.trim();
  if(!name||!email||!message){
    formMessage.textContent="Veuillez remplir tous les champs.";
    return;
  }
  const subject=encodeURIComponent("Nouveau message — GHURAB Technologies");
  const body=encodeURIComponent(`Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`);
  window.location.href=`mailto:contact@ghurab.tech?subject=${subject}&body=${body}`;
  formMessage.textContent="Ouverture de votre messagerie…";
});
