let numberOfEls = 1000;
let duration = 1000;
let midScreenX = window.innerWidth / 2;
let midScreenY = window.innerHeight / 2;
let radius = Math.sqrt(midScreenX * midScreenX + midScreenY * midScreenY);
let fragment = document.createDocumentFragment();

for (let i = 0; i < numberOfEls; i++) {
  let hue = Math.round((360 / numberOfEls) * i);
  let angle = Math.random() * Math.PI * 2;
  let el = document.createElement("div");
  el.classList.add("particle");
  el.style.backgroundColor = "hsl(" + hue + ", 40%, 60%)";
  el.style.width = "1px";
  el.style.height = "1px";
  anime({
    targets: el,
    width: ["1px", "10px"],
    height: ["1px", "10px"],
    left: [midScreenX + "px", Math.cos(angle) * radius + midScreenX + "px"],
    top: [midScreenY + "px", Math.sin(angle) * radius + midScreenY + "px"],
    delay: (duration / numberOfEls) * i,
    duration: duration,
    easing: "easeInExpo",
    loop: true
  });
  fragment.appendChild(el);
}

document.body.appendChild(fragment);
