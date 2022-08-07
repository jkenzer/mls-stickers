const wiki = require("wikijs").default;
const fs = require("fs");
const fetch = require("node-fetch");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function writeJSONFile(teamLogos) {
  //TODO: Change to path.join
  fs.writeFile(
    "./Public/teamlogos.json",
    JSON.stringify(teamLogos, null, 2),
    (error) => {
      if (error) throw error;
      console.log("Creating JSON file");
    }
  );
}

let teamToLogo = [];
async function saveImage(team, url) {
  const imgUrl = new URL(url);
  const paths = imgUrl.pathname.split("/");
  let fileName = paths[paths.length - 1];
  fileName = fileName.replace("%28", "(").replace("%29", ")");
  const res = await fetch(url);
  console.log("getting image for", team);
  //TODO: Join path for OS compatibility
  let stream = fs.createWriteStream(`./public/logos/${fileName}`);
  res.body.pipe(stream);
  teamToLogo.push({
    team,
    fileName,
  });
}

async function getPage(page) {
  let thePage = await wiki().page(page);
  let tables = await thePage.tables();
  for (const teams of tables[0]) {
    if (!teams.team.includes("MLS")) {
      const team = teams.team.replaceAll(" ", "_");
      await delay(1000);
      await getTeamPage(team);
    }
  }
  console.log("got all the logos");
  writeJSONFile(teamToLogo);
}

async function getTeamPage(team) {
  console.log("getting page for ", team);
  let page = await wiki().page(team);
  let mainImage = await page.mainImage();
  await saveImage(team, mainImage);
}
// getTeamPage("Portland Timbers");
getPage("Major League Soccer");
