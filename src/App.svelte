<script>
  import teamlogos from "./assets/teamlogos.json";

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  function random(low, high) {
    return Math.random() * (high - low) + low;
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const favorite = "Portland_Timbers";

  // TODO: Changable background
  // TODO: More leagues
  // TODO: Favorite Team with special display
  // TODO: Outline the svg instead of the img

  // 4 rows of 7
  const colspacing = width / 7;
  const rowspacing = height / 4;
  let rowY = -rowspacing;

  const teamLogos = shuffleArray(teamlogos);
  const stickers = teamLogos.map((logo, idx) => {
    let xPos = (idx % 7) * colspacing + random(-35, 35);
    if (idx % 7 == 0) {
      rowY += rowspacing;
    }
    let yPos = rowY + random(-35, 35);
    let zIndex = Math.floor(Math.random() * teamlogos.length);

    const degRotate = random(-15, 15);
    const style = `top:${yPos}px;left:${xPos}px;rotate: ${degRotate}deg;z-index:${zIndex}`;

    return {
      team: logo.team,
      src: `/logos/${logo.fileName}`,
      style,
    };
  });
</script>

<main>
  {#each stickers as sticker (sticker.team)}
    <img
      src={sticker.src}
      class="logo"
      alt={sticker.team}
      style={sticker.style}
    />
  {/each}
</main>

<style>
</style>
