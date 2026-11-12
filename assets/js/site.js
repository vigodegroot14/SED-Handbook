const toggle = document.querySelector(".menu-toggle");
toggle?.addEventListener("click", () => {
  const nav = document.querySelector(".nav");
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav a").forEach((a) =>
  a.addEventListener("click", () => {
    document.querySelector(".nav").classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  }),
);
const steps = [
  [
    "De opgave begrijpen",
    "Begin met de vraag wat het ontwerp moet doen. Leg vast welke eisen vaststaan en waar je ontwerpvrijheid hebt.",
    [
      "Breng locatie, gebruik en beschikbare ruimte in kaart.",
      "Noteer vrije overspanningen, bouwhoogte en aansluitingen.",
      "Maak onderscheid tussen eisen, wensen en eigen aannames.",
    ],
    "Een compact programma van eisen en een eerste schets van de ontwerpruimte.",
    "bep",
    "Bekijk hoe de bestaande brug het vertrekpunt vormt",
  ],
  [
    "Een constructief systeem kiezen",
    "Vergelijk een paar logische systemen voordat je één oplossing verder uitwerkt. Geometrie, materiaal en krachtsafdracht hangen samen.",
    [
      "Schets minimaal twee haalbare constructieve varianten.",
      "Vergelijk overspanning, eigen gewicht, stabiliteit en maakbaarheid.",
      "Leg vast waarom een variant beter bij de opgave past.",
    ],
    "Een beargumenteerde systeemkeuze met schematische plattegrond en doorsnede.",
    "large-span",
    "Bekijk de varianten voor een stadiondak",
  ],
  [
    "Volg de kracht. Van dak tot fundering.",
    "Een constructief model begint met een begrijpelijke route voor de belasting. Teken hoe krachten via vloeren, liggers en kolommen de ondergrond bereiken.",
    [
      "Maak horizontale en verticale krachtsafdracht afzonderlijk zichtbaar.",
      "Kies opleggingen die passen bij de beoogde verbindingen.",
      "Controleer of iedere kracht een doorgaande route heeft.",
    ],
    "Een krachtsafdrachtsschema en een onderbouwd mechanisch model.",
    "bep",
    "Bekijk de krachtsafdracht van het bruggebouw",
  ],
  [
    "Belastingen in kaart brengen",
    "Bepaal welke belastingen relevant zijn voor de gekozen functie, locatie en constructie. Houd karakteristieke waarden en ontwerpwaarden uit elkaar.",
    [
      "Inventariseer eigen gewicht, veranderlijke belasting, wind en waar relevant sneeuw.",
      "Maak duidelijk welk oppervlak door elk element wordt gedragen.",
      "Selecteer de toepasselijke combinaties met de actuele normen en nationale bijlage.",
    ],
    "Een controleerbaar belastingoverzicht met bronnen, aannames en eenheden.",
    "high-rise",
    "Bekijk belastingen in het hoogbouwproject",
  ],
  [
    "Van systeem naar eerste afmetingen",
    "Gebruik een eenvoudige berekening om gevoel voor de afmetingen te krijgen. Een eerste schatting helpt je de haalbaarheid van een variant te beoordelen.",
    [
      "Bepaal welke krachten en vervormingen maatgevend kunnen zijn.",
      "Koppel je rekenmodel aan materiaalgedrag en stabiliteit.",
      "Vergelijk het resultaat met de beschikbare ruimte en herzie je ontwerp indien nodig.",
    ],
    "Voorlopige afmetingen met een transparante onderbouwing.",
    "large-span",
    "Bekijk de uitwerking van de hoofdconstructie",
  ],
  [
    "Toetsen, begrijpen en verbeteren",
    "Controleer niet alleen de uitkomst, maar ook of het model je ontwerp voldoende beschrijft. Ontwerpen is een iteratief proces.",
    [
      "Controleer sterkte, stabiliteit en bruikbaarheid waar van toepassing.",
      "Vergelijk software-uitkomsten met een eenvoudige handberekening.",
      "Werk verbindingen, uitvoering en de consequenties voor je ontwerp uit.",
    ],
    "Een onderbouwd ontwerp met expliciete beperkingen en vervolgstappen.",
    "high-rise",
    "Bekijk de afwegingen in het hoogbouwontwerp",
  ],
];
const panel = document.querySelector("#step-panel");
const beam = `<div class="demo"><div class="eyebrow">Probeer het zelf · eenvoudig mechanisch model</div><svg viewBox="0 0 600 245" role="img" aria-label="Vrij opgelegde ligger met gelijkmatig verdeelde belasting, een scharnier links en een roloplegging rechts"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="#c81919"/></marker></defs><g stroke="#c81919" stroke-width="2" marker-end="url(#arrow)">${[75, 130, 185, 240, 295, 350, 405, 460, 515].map((x) => `<path d="M${x} 55 V105"/>`).join("")}</g><text x="300" y="32" text-anchor="middle" fill="#c81919" font-size="15">q = 10 kN/m</text><path d="M65 120H525" stroke="#173e55" stroke-width="8"/><path d="M75 125L58 151H92Z M515 125L498 151H532Z" fill="none" stroke="#173e55" stroke-width="2"/><circle cx="507" cy="157" r="4" fill="none" stroke="#173e55"/><circle cx="523" cy="157" r="4" fill="none" stroke="#173e55"/><path d="M50 164H100 M490 164H540 M75 195H515 M75 188V202 M515 188V202" stroke="#647078"/><text id="span-label" x="295" y="220" text-anchor="middle" fill="#647078" font-size="14">L = 6 m</text></svg><label for="span-range">Overspanning L <strong id="span-value">6 m</strong></label><input id="span-range" type="range" min="2" max="12" value="6" step="1"><div class="result" aria-live="polite"><div><small>Reactie per oplegging · qL/2</small><strong id="reaction">30 kN</strong></div><div><small>Maximaal moment · qL²/8</small><strong id="moment">45 kNm</strong></div></div><p class="small-note">Illustratief onderwijsmodel: vrij opgelegde ligger, constante belasting q = 10 kN/m over de volledige overspanning. Zonder belastingfactoren. Dit is geen dimensionerings- of normtoets.</p></div>`;
function showStep(i, focus = false) {
  const s = steps[i];
  document.querySelectorAll(".step").forEach((b, j) => {
    b.setAttribute("aria-selected", String(j === i));
    b.tabIndex = j === i ? 0 : -1;
  });
  panel.setAttribute("aria-labelledby", "step-" + i);
  panel.innerHTML = `<div class="eyebrow">Stap 0${i + 1} / 06</div><h2>${s[0]}</h2><p>${s[1]}</p><ul>${s[2].map((t) => `<li>${t}</li>`).join("")}</ul><p><strong>Wat neem je mee?</strong><br>${s[3]}</p>${i === 2 ? beam : ""}<div class="feedback"><a class="text-link" href="projects/${s[4]}.html">${s[5]} ↗</a></div>`;
  if (i === 2) {
    document.querySelector("#span-range").addEventListener("input", (e) => {
      const l = Number(e.target.value);
      document.querySelector("#span-value").textContent = l + " m";
      document.querySelector("#span-label").textContent = "L = " + l + " m";
      document.querySelector("#reaction").textContent = 5 * l + " kN";
      document.querySelector("#moment").textContent =
        ((10 * l * l) / 8).toLocaleString(
          document.documentElement.lang === "en" ? "en-GB" : "nl-NL",
        ) + " kNm";
    });
  }
  if (focus) document.querySelector("#step-" + i).focus();
}
if (panel) {
  document.querySelectorAll(".step").forEach((b, i) => {
    b.addEventListener("click", () => showStep(i));
    b.addEventListener("keydown", (e) => {
      if (
        [
          "ArrowDown",
          "ArrowUp",
          "ArrowRight",
          "ArrowLeft",
          "Home",
          "End",
        ].includes(e.key)
      ) {
        e.preventDefault();
        const n =
          e.key === "Home"
            ? 0
            : e.key === "End"
              ? 5
              : (i + (["ArrowDown", "ArrowRight"].includes(e.key) ? 1 : 5)) % 6;
        showStep(n, true);
      }
    });
  });
  showStep(2);
}
