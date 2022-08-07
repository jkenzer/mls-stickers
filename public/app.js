const width = window.innerWidth;
const height = window.innerHeight;

// TODO: Better Spacing
// TODO: Changable background
// TODO: More leagues
// TODO: Favorite Team
// TODO: Outline the svg instead of the img

const favorite = "Portland_Timbers";
fetch("./teamlogos.json").then((res) => {
  res.json().then((teamlogos) => {
    teamlogos.forEach((logo) => {
      let xPos = Math.random() * (width - 150);
      let yPos = Math.random() * (height - 150);
      let zIndex = Math.floor(Math.random() * teamlogos.length);

      if (logo.team == favorite) {
        zIndex = teamlogos.length + 1;
        xPos = width / 2 - 75;
        yPos = height / 2 - 75;
      }
      const degRotate = Math.random() * (15 - -15) + -15;
      const img = document.createElement("img");
      img.src = `./logos/${logo.fileName}`;
      img.className = "logo";
      img.setAttribute(
        "style",
        `top:${yPos}px;left:${xPos}px;rotate: ${degRotate}deg;z-index:${zIndex}`
      );
      const src = document.getElementById("thebody");
      src.appendChild(img);
    });
  });
});
