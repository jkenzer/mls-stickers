<script>
  import teamlogos from "./assets/teamlogos.json";
  import Selector from "./Selector.svelte";
  import { fade } from "svelte/transition";
  let visible = false;

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
  let favorite = localStorage.getItem("favoriteTeam");
  let background = localStorage.getItem("background") || "lined-paper.jpg";
  let bodyBackground = document.getElementById("background");
  bodyBackground.style.backgroundImage = `url('/${background}')`;

  // TODO: More leagues
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

  function handleBackgroundChange(event) {
    let backgroundImg = document.getElementById("background");
    backgroundImg.style.backgroundImage = `url('/${event.detail.file}')`;
    localStorage.setItem("background", event.detail.file);
    background = event.detail.file;
  }
  function handleFavoriteTeam(event) {
    favorite = event.detail.team;
    localStorage.setItem("favoriteTeam", favorite);
  }
  function showSelector() {
    visible = !visible;
  }
</script>

<main>
  <div class="selector">
    <img
      src="settings.svg"
      alt="settings"
      class="settings-icon"
      on:click={showSelector}
    />
    {#if visible}
      <div class="settings-selector" transition:fade>
        <Selector
          teams={teamLogos}
          currentBackground={background}
          currentFavorite={favorite}
          on:favoriteTeam={handleFavoriteTeam}
          on:backgroundChange={handleBackgroundChange}
        />
      </div>
    {/if}
  </div>
  {#each stickers as sticker (sticker.team)}
    <img
      src={sticker.src}
      class="logo"
      class:favorite={sticker.team === favorite}
      alt={sticker.team}
      style={sticker.style}
    />
  {/each}
</main>

<style>
  .favorite {
    filter: drop-shadow(-3px 3px 3px darkgrey);
    max-width: 250px;
    max-height: 250px;
  }
  .settings-icon {
    width: 30px;
    cursor: pointer;
  }
  .selector {
    text-align: right;
  }
  .settings-selector {
    margin-top: 15px;
  }
</style>
