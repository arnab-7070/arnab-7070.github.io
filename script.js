// Skills marquee (edit this list)
const skills = ["Java","JavaScript","HTML5","CSS","SQL","PostgreSQL","MySQL","JDBC","Hibernate","Maven","Git","OOP","DSA"];
const track = document.getElementById("track");
track.innerHTML = [...skills, ...skills].map(s => "<span>" + s + "</span>").join("");

// Nav shadow on scroll
const nav = document.getElementById("nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 20), { passive: true });

// Reveal on scroll
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: 0.15 });
document.querySelectorAll("[data-reveal]").forEach(el => io.observe(el));

// Photo: fallback initials if photo.jpg is missing, plus mouse tilt
const photo = document.getElementById("photo");
const img = photo.querySelector("img");
const noPhoto = () => photo.classList.add("noimg");
img.addEventListener("error", noPhoto);
if (img.complete && img.naturalWidth === 0) noPhoto();

const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!still) {
  const wrap = photo.parentElement;
  wrap.addEventListener("mousemove", e => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    photo.style.transform = "rotate(3deg) perspective(800px) rotateY(" + x * 10 + "deg) rotateX(" + -y * 10 + "deg)";
  });
  wrap.addEventListener("mouseleave", () => { photo.style.transform = ""; });
}

// Code chip typing
const code = document.getElementById("chip-code");
const lines = ["learn();", "build();", "improve();"];
if (still) code.textContent = lines.join("\n");
else {
  let l = 0, c = 0;
  setTimeout(function type() {
    if (l >= lines.length) return;
    code.textContent += lines[l][c++];
    if (c === lines[l].length) { code.textContent += "\n"; l++; c = 0; setTimeout(type, 350); }
    else setTimeout(type, 70);
  }, 1500);
}
