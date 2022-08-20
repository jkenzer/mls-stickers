<script>
  import { createEventDispatcher } from "svelte";
  export let teams;
  export let currentFavorite;

  const dispatch = createEventDispatcher();

  let backgrounds = [
    { file: "lined-paper.jpg", text: `Paper` },
    { file: "marble-texture.jpg", text: `Marble` },
  ];

  let selectedBg = backgrounds[0];
  let selectedTeam = currentFavorite;

  const teamsOptions = teams.sort((a, b) => {
    let fa = a.team.toLowerCase(),
      fb = b.team.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

  function handleBackground() {
    dispatch("backgroundChange", {
      file: selectedBg.file,
    });
  }

  function handleFavorite() {
    dispatch("favoriteTeam", {
      team: selectedTeam,
    });
  }
</script>

<main>
  <div id="favoriteTeam">
    <select bind:value={selectedTeam} on:change={handleFavorite}>
      {#each teamsOptions as team}
        <option value={team.team}>
          {team.team.replaceAll("_", " ")}
        </option>
      {/each}
    </select>
  </div>
  <div id="backgroundOption">
    <select bind:value={selectedBg} on:change={handleBackground}>
      {#each backgrounds as batchground}
        <option value={batchground}>
          {batchground.text}
        </option>
      {/each}
    </select>
  </div>
</main>

<style>
</style>
