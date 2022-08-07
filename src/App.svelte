<script>
  import teamlogos from "./assets/teamlogos.json";
  import Counter from "./lib/Counter.svelte";

  console.log(teamlogos);

  const width = window.innerWidth;
  const height = window.innerHeight;
  const favorite = "Portland_Timbers";

  // TODO: Better Spacing
  // TODO: Changable background
  // TODO: More leagues
  // TODO: Favorite Team
  // TODO: Outline the svg instead of the img
  const stickers = teamlogos.map((logo) => {
    let xPos = Math.random() * (width - 150);
    let yPos = Math.random() * (height - 150);
    let zIndex = Math.floor(Math.random() * teamlogos.length);

    if (logo.team == favorite) {
      zIndex = teamlogos.length + 1;
      xPos = width / 2 - 75;
      yPos = height / 2 - 75;
    }
    const degRotate = Math.random() * (15 - -15) + -15;
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
