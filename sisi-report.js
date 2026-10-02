// =========================================
// SISI REPORT — Session 3 (Labs A, B & Homework)
// =========================================

// --- DATA SETUP ---
const projects = [
  {
    id: 1,
    title: "Ruiru borehole",
    ward: "Ruiru",
    budget: 3200000,
    votes: 412,
  },
  {
    id: 2,
    title: "Juja health post",
    ward: "Juja",
    budget: 5800000,
    votes: 987,
  },
  {
    id: 3,
    title: "Thika road walkway",
    ward: "Thika",
    budget: 1450000,
    votes: 233,
  },
  {
    id: 4,
    title: "Githurai market",
    ward: "Githurai",
    budget: 2100000,
    votes: 654,
  },
];

// =========================================
// LAB A: The Sisi Project List
// =========================================

// 1 & 2. Log count, first title, and last title (using .length)
console.log("--- Lab A ---");
console.log("Project count:", projects.length);
console.log("First title:", projects[0].title);
console.log("Last title:", projects[projects.length - 1].title);

// 3. Push a fifth project
projects.push({
  id: 5,
  title: "Kalimoni dispensary",
  ward: "Kalimoni",
  budget: 900000,
  votes: 78,
});

// 4. All five titles as one comma-separated sentence
const allTitles = projects.map((p) => p.title).join(", ");
console.log("\nAll titles:", allTitles);

// 5. Total budget and total votes
const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
const totalVotes = projects.reduce((sum, p) => sum + p.votes, 0);
console.log("Total budget:", totalBudget);
console.log("Total votes:", totalVotes);

// 6. Titles of every project with more than 400 votes
const popularTitles = projects.filter((p) => p.votes > 400).map((p) => p.title);
console.log("\nProjects with >400 votes:", popularTitles);

// 7. Find project id 3 by its id, not its position
const projectThree = projects.find((p) => p.id === 3);
console.log("Project with id 3:", projectThree.title);

// 8. Does every project cost under KES 6,000,000?
const allUnderSixMillion = projects.every((p) => p.budget < 6000000);
console.log("Every project under KES 6,000,000?", allUnderSixMillion);

// =========================================
// LAB B: The Sisi Report Toolkit
// =========================================

// 1. formatKes
function formatKes(amount) {
  return "KES " + amount.toLocaleString();
}

// 2. classify (using early returns)
function classify(votes) {
  if (votes >= 500) return "High";
  if (votes >= 200) return "Moderate";
  return "Low";
}

// 5. summarise (The crucial callback requirement from Slide 27)
function summarise(list, getValue) {
  return list.reduce((sum, item) => sum + getValue(item), 0);
}

// 3. projectLine
function projectLine(project, index) {
  const rank = `${index + 1}.`;
  const title = project.title.padEnd(22);
  const budget = formatKes(project.budget).padEnd(14);
  const votes = `${project.votes} votes`.padEnd(12);
  const band = classify(project.votes);
  return `${rank} ${title} ${budget} ${votes} ${band}`;
}

// 4. report (No for loops! Uses sort, map, and join)
function report(list) {
  // Sort by votes descending without mutating the original array
  const sorted = [...list].sort((a, b) => b.votes - a.votes);

  // Map to formatted lines
  const lines = sorted.map((project, index) => projectLine(project, index));

  // Calculate totals using our summarise callback function
  const totalBudget = summarise(list, (p) => p.budget);
  const totalVotes = summarise(list, (p) => p.votes);

  // Assemble the final string
  const header = "--- Kiambu County: public participation report ---";
  const footer = `---\nProjects: ${list.length}   Total budget: ${formatKes(totalBudget)}   Total votes: ${totalVotes}`;

  return [header, ...lines, footer].join("\n");
}

console.log("\n" + report(projects));

// =========================================
// HOMEWORK
// =========================================

// 1. Write your own mapOver from scratch
function mapOver(list, transform) {
  const result = [];
  for (let i = 0; i < list.length; i++) {
    result.push(transform(list[i], i));
  }
  return result;
}

console.log("\n--- Homework 1: mapOver ---");
console.log(mapOver(projects, (p) => p.title));

// 2. Add a rank() method to the county object
const county = {
  name: "Kiambu",
  projects: projects,

  totalVotes() {
    return this.projects.reduce((sum, p) => sum + p.votes, 0);
  },

  rank(projectId) {
    const sorted = [...this.projects].sort((a, b) => b.votes - a.votes);
    const index = sorted.findIndex((p) => p.id === projectId);
    return index !== -1 ? index + 1 : null;
  },
};

console.log("\n--- Homework 2: rank() ---");
console.log(`Total votes in ${county.name}:`, county.totalVotes());
console.log(`Rank of project 2 (Juja): ${county.rank(2)}`); // Should be 1
console.log(`Rank of project 1 (Ruiru): ${county.rank(1)}`); // Should be 3

// 3. Two sentences on callbacks
console.log("\n--- Homework 3: Callback Definition ---");
console.log(
  "A callback is a function passed as an argument to another function, allowing you to hand over the 'what to do' while the receiving function controls the 'when' and 'how many times'.",
);
console.log(
  "summarise needs a callback because it must be able to total any property (like votes or budget) without being rewritten for each one — the callback extracts the specific value for each item so summarise can just focus on adding them up.",
);
