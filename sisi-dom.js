// =========================================
// LAB 2.3: The Page (DOM Manipulation)
// =========================================

// 1. Our data model (copied from Lab 2.2)
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
];

// 2. Select the container from the HTML
const container = document.getElementById("county-container");

// 3. Render the counties to the screen
// We use .forEach() to loop through the data and create HTML elements.
counties.forEach((county) => {
  // Create the main card for the county
  const card = document.createElement("div");
  card.className = "county-card";

  // Create the heading
  const heading = document.createElement("h2");
  heading.textContent = `${county.name} (Code: ${county.code})`;
  card.appendChild(heading);

  // Create a sub-heading for projects
  const subHeading = document.createElement("h3");
  subHeading.textContent = "Active Projects";
  card.appendChild(subHeading);

  // Loop through the projects and create a div for each
  county.projects.forEach((project) => {
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";

    // Use innerHTML for quick formatting (or build with createElement)
    projectDiv.innerHTML = `
      <strong>${project.title}</strong> — ${project.votes} votes
      <br>
      <button class="vote-btn" data-id="${project.id}">Vote for this project</button>
    `;

    card.appendChild(projectDiv);
  });

  // Finally, add the completed card to the page
  container.appendChild(card);
});

// =========================================
// LAB 2.4: The User (Event Handling)
// =========================================

// 1. Event Delegation: Listen for clicks on the whole container
// Instead of adding an event listener to every single button,
// we add ONE listener to the container and check what was clicked.
container.addEventListener("click", (event) => {
  // Check if the clicked element is a vote button
  if (event.target.classList.contains("vote-btn")) {
    // 2. Get the project ID from the data-id attribute we set in the HTML
    const projectId = parseInt(event.target.dataset.id);

    // 3. Find the project in our data array and update its votes
    // We use .find() to look through all counties' projects
    let targetProject = null;
    counties.forEach((county) => {
      const found = county.projects.find((p) => p.id === projectId);
      if (found) targetProject = found;
    });

    if (targetProject) {
      // Update the data
      targetProject.votes += 1;

      // Update the UI (The DOM)
      // The button's parent is the projectDiv. We update its innerHTML.
      const projectDiv = event.target.parentElement;
      projectDiv.innerHTML = `
        <strong>${targetProject.title}</strong> — ${targetProject.votes} votes
        <br>
        <button class="vote-btn" data-id="${targetProject.id}">Vote for this project</button>
      `;

      console.log(
        `Voted for ${targetProject.title}. New total: ${targetProject.votes}`,
      );
    }
  }
});
