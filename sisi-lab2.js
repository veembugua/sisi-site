// =========================================
// LAB 2.1: The Sisi function toolkit
// =========================================

// 1. participationRate (with default target of 100,000)
function participationRate(votes, target = 100_000) {
  return (votes / target) * 100;
}

// 2. classify (using early returns)
function classify(rate) {
  if (rate >= 60) return "High";
  if (rate >= 25) return "Moderate";
  return "Low";
}

// 3. formatKes (using en-KE locale for proper comma separation)
function formatKes(amount) {
  return "KES " + amount.toLocaleString("en-KE");
}

// 4. isEligible (Assuming Lesson 1 rule is age >= 18)
function isEligible(age, county) {
  return age >= 18;
}

// --- Proving Lab 2.1 works ---
console.log("--- Lab 2.1 Tests ---");
console.log("Rate:", participationRate(64_300)); // expect 64.3
console.log("Classify:", classify(64.3)); // expect "High"
console.log("Format:", formatKes(8_400_000)); // expect "KES 8,400,000"
console.log("Eligible (17):", isEligible(17, "Kiambu")); // expect false
console.log("Eligible (20):", isEligible(20, "Kiambu")); // expect true

// =========================================
// LAB 2.2: The Sisi data model
// =========================================

// 1. Create the counties array
const counties = [
  {
    name: "Kiambu",
    code: 22,
    budgetKes: 8_400_000,
    projects: [
      { id: 1, title: "Ruiru borehole", budgetKes: 3_200_000, votes: 412 },
      { id: 2, title: "Juja health post", budgetKes: 5_800_000, votes: 987 },
    ],
  },
  {
    name: "Nakuru",
    code: 32,
    budgetKes: 6_500_000,
    projects: [
      { id: 3, title: "Nakuru Town walkway", budgetKes: 2_100_000, votes: 305 },
      {
        id: 4,
        title: "Naivasha water kiosk",
        budgetKes: 4_500_000,
        votes: 1200,
      },
    ],
  },
  {
    name: "Kisumu",
    code: 42,
    budgetKes: 5_200_000,
    projects: [
      {
        id: 5,
        title: "Kisumu market stalls",
        budgetKes: 1_800_000,
        votes: 150,
      },
    ],
  },
];

console.log("\n--- Lab 2.2 Queries ---");

// 2.1 Names of all counties as one comma-separated string
const allNames = counties.map((c) => c.name).join(", ");
console.log("Counties:", allNames);

// 2.2 Total number of projects across all counties
const totalProjects = counties.reduce((sum, c) => sum + c.projects.length, 0);
console.log("Total Projects:", totalProjects);

// 2.3 Total votes cast across all counties
const totalVotes = counties.reduce(
  (sum, c) => sum + c.projects.reduce((pSum, p) => pSum + p.votes, 0),
  0,
);
console.log("Total Votes:", totalVotes);

// 2.4 The single project with the most votes, and which county it belongs to
// We use reduce to find the max without using a for loop.
const topResult = counties.reduce(
  (best, county) => {
    const countyBest = county.projects.reduce(
      (cBest, p) => (p.votes > cBest.votes ? p : cBest),
      { votes: -1 },
    );

    if (countyBest.votes > best.project.votes) {
      return { project: countyBest, countyName: county.name };
    }
    return best;
  },
  { project: { votes: -1 }, countyName: "" },
);

console.log(
  `Top Project: ${topResult.project.title} in ${topResult.countyName} with ${topResult.project.votes} votes`,
);

// 2.5 All projects whose budget is above KES 3,000,000
const bigProjects = counties.reduce((acc, county) => {
  const countyBig = county.projects.filter((p) => p.budgetKes > 3_000_000);
  return acc.concat(countyBig);
}, []);

console.log(
  "Projects over 3M:",
  bigProjects.map((p) => p.title),
);

// 3. countySummary function and forEach
function countySummary(county) {
  const totalCountyVotes = county.projects.reduce((sum, p) => sum + p.votes, 0);
  return `County: ${county.name} (Code: ${county.code})\nProjects: ${county.projects.length}\nTotal Votes: ${totalCountyVotes}\n------------------`;
}

console.log("\n--- County Summaries ---");
counties.forEach((c) => console.log(countySummary(c)));

// STRETCH: Sort one county's projects by votes, highest first
console.log("\n--- Stretch: Sorted Kiambu Projects ---");
const sortedKiambu = [...counties[0].projects].sort(
  (a, b) => b.votes - a.votes,
);
console.log(sortedKiambu.map((p) => `${p.title}: ${p.votes} votes`));
