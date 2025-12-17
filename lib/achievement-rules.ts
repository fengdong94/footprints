import { Country } from "@/lib/types";

export const ACHIEVEMENT_RULES_MILESTONE = [
  {
    title: "First Step",
    description: "Your journey begins! Visit your first foreign country.",
    icon: "👣",
    target: 1,
    check: (countryList: Country[]) => countryList.length,
  },
  {
    title: "High Five",
    description: "A great start! You have visited 5 different countries.",
    icon: "🖐️",
    target: 5,
    check: (countryList: Country[]) => countryList.length,
  },
  {
    title: "The Traveler",
    description: "Visit 10 different countries.",
    icon: "🎒",
    target: 10,
    check: (countryList: Country[]) => countryList.length,
  },
  {
    title: "Seasoned Traveler",
    description: "Your passport is getting busy: 20 countries visited.",
    icon: "🗺️",
    target: 20,
    check: (countryList: Country[]) => countryList.length,
  },
  {
    title: "Global Explorer",
    description: "Reach the halfway mark to a century: 50 countries visited.",
    icon: "🧭",
    target: 50,
    check: (countryList: Country[]) => countryList.length,
  },
  {
    title: "The Centurion",
    description: "A legendary achievement: 100 countries unlocked.",
    icon: "👑",
    target: 100,
    check: (countryList: Country[]) => countryList.length,
  },
  {
    title: "The Odyssey",
    description:
      "A legendary achievement of epic proportions: 150 countries unlocked.",
    icon: "🚀",
    target: 150,
    check: (countryList: Country[]) => countryList.length,
  },
];

export const ACHIEVEMENT_RULES_CONTINENT = [
  {
    title: "Asia",
    description: "Visit at least one country in Asia.",
    icon: "🏮",
    target: 1,
    check: (countryList: Country[]) =>
      countryList.filter(({ region }) => region === "Asia").length,
  },
  {
    title: "Europe",
    description: "Visit at least one country in Europe.",
    icon: "🏰",
    target: 1,
    check: (countryList: Country[]) =>
      countryList.filter(({ region }) => region === "Europe").length,
  },
  {
    title: "Africa",
    description: "Visit at least one country in Africa.",
    icon: "🦁",
    target: 1,
    check: (countryList: Country[]) =>
      countryList.filter(({ region }) => region === "Africa").length,
  },
  {
    title: "Northern America",
    description: "Visit at least one country in Northern America.",
    icon: "🦅",
    target: 1,
    check: (countryList: Country[]) =>
      countryList.filter(({ subregion }) => subregion === "Northern America")
        .length,
  },
  // TODO South American? search all latin amer... in project
  {
    title: "Latin America and the Caribbean",
    description:
      "Visit at least one country in Latin America and the Caribbean.",
    icon: "💃",
    target: 1,
    check: (countryList: Country[]) =>
      countryList.filter(
        ({ subregion }) => subregion === "Latin America and the Caribbean"
      ).length,
  },
  {
    title: "Oceania",
    description: "Visit at least one country in Oceania.",
    icon: "🏝️",
    target: 1,
    check: (countryList: Country[]) =>
      countryList.filter(({ region }) => region === "Oceania").length,
  },
  {
    title: "Antarctica",
    description: "Set foot on Antarctica.",
    icon: "🐧",
    target: 1,
    check: (countryList: Country[]) =>
      countryList.filter(({ region }) => region === "Antarctica").length,
  },
  {
    title: "Seven Continents",
    description: "Set foot on all 7 continents of the world.",
    icon: "🌎",
    target: 7,
    check: (countryList: Country[]) => {
      const continents = new Set();
      countryList.forEach(({ region, subregion }) => {
        // TODO south america
        if (region === "Americas") {
          continents.add(subregion);
        } else {
          continents.add(region);
        }
      });
      return continents.size;
    },
  },
];

export const ACHIEVEMENT_RULES_REGIONAL_COLLECTIONS = [
  {
    title: "Viking Spirit",
    description:
      "Visit the 5 Nordic countries (Denmark, Norway, Sweden, Finland, Iceland).",
    icon: "🛡️",
    target: 5,
    check: (countryList: Country[]) => {
      const targets = ["Denmark", "Norway", "Sweden", "Finland", "Iceland"];
      return countryList.filter(({ name_en }) => targets.includes(name_en))
        .length;
    },
  },
  {
    title: "East Asian Triangle",
    description: "Visit China, Japan, and South Korea.",
    icon: "🏯",
    target: 3,
    check: (countryList: Country[]) => {
      const targets = ["China", "Japan", "South Korea"];
      return countryList.filter(({ name_en }) => targets.includes(name_en))
        .length;
    },
  },
  // TODO latin problem
  {
    title: "North American Giants",
    description: "Visit United States, Canada, and Mexico.",
    icon: "🦅",
    target: 3,
    check: (countryList: Country[]) => {
      const targets = ["United States", "Canada", "Mexico"];
      return countryList.filter(({ name_en }) => targets.includes(name_en))
        .length;
    },
  },
  {
    title: "Mediterranean Dream",
    description:
      "Visit 3 countries on the Mediterranean coast (e.g., Italy, Greece, Spain, Turkey).",
    icon: "🍇",
    target: 3,
    check: (countryList: Country[]) => {
      const list = [
        "Italy",
        "Greece",
        "Spain",
        "Turkey",
        "Croatia",
        "France",
        "Egypt",
      ];
      return countryList.filter(({ name_en }) => list.includes(name_en)).length;
    },
  },
  {
    title: "The Stan Lands",
    description:
      'Visit 3 of the "Stan" countries in Central Asia (Kazakhstan, Uzbekistan, etc).',
    icon: "🐫",
    target: 3,
    check: (countryList: Country[]) => {
      const list = [
        "Kazakhstan",
        "Uzbekistan",
        "Turkmenistan",
        "Kyrgyzstan",
        "Tajikistan",
        "Afghanistan",
        "Pakistan",
      ];
      return countryList.filter(({ name_en }) => list.includes(name_en)).length;
    },
  },
  {
    title: "British Isles",
    description: "Visit both the United Kingdom and Ireland.",
    icon: "☘️",
    target: 2,
    check: (countryList: Country[]) =>
      countryList.filter(({ name_en }) =>
        ["United Kingdom", "Ireland"].includes(name_en)
      ).length,
  },
];

export const ACHIEVEMENT_RULES_SIDE_QUESTS = [
  {
    title: "The ABC Club",
    description: "Visit countries starting with A, B, and C.",
    icon: "🔤",
    target: 3,
    check: (countryList: Country[]) => {
      const hasA = countryList.some(({ name_en }) => name_en.startsWith("A"));
      const hasB = countryList.some(({ name_en }) => name_en.startsWith("B"));
      const hasC = countryList.some(({ name_en }) => name_en.startsWith("C"));
      return (hasA ? 1 : 0) + (hasB ? 1 : 0) + (hasC ? 1 : 0);
    },
  },
  {
    title: "Tiny but Mighty",
    description:
      "Visit 3 European microstates (Vatican, Monaco, San Marino, Andorra, Liechtenstein).",
    icon: "💎",
    target: 3,
    check: (countryList: Country[]) =>
      countryList.filter(({ name_en }) =>
        [
          "Vatican",
          "Monaco",
          "San Marino",
          "Andorra",
          "Liechtenstein",
        ].includes(name_en)
      ).length,
  },
  {
    title: "Saints & Angels",
    description: 'Visit 2 countries starting with "Saint" or "San".',
    icon: "😇",
    target: 2,
    check: (countryList: Country[]) => {
      return countryList.filter(
        ({ name_en }) =>
          name_en.startsWith("Saint") || name_en.startsWith("San ")
      ).length;
    },
  },
  {
    title: "Four Letter Words",
    description:
      "Visit 3 countries with exactly 4 letters in their English name.",
    icon: "🎲",
    target: 3,
    check: (countryList: Country[]) => {
      return countryList.filter(({ name_en }) => name_en.length === 4).length;
    },
  },
  {
    title: "Brand New",
    description: 'Visit 2 countries starting with the word "New".',
    icon: "🆕",
    target: 2,
    check: (countryList: Country[]) => {
      return countryList.filter(({ name_en }) => name_en.startsWith("New "))
        .length;
    },
  },
  {
    title: "The A-Team",
    description: 'Visit 5 countries ending with the letter "A".',
    icon: "🅰️",
    target: 5,
    check: (countryList: Country[]) => {
      return countryList.filter(({ name_en }) => name_en.endsWith("a")).length;
    },
  },
];
