document.getElementById("screener-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get all 'No' responses
  const noResponses = document.querySelectorAll('input[type="radio"][value="no"]:checked');
  const riskCount = noResponses.length;

  // Get child's age and suburb
  const age = parseFloat(document.getElementById("child-age").value);
  const suburb = document.getElementById("surburb")?.value || "your area";

  // Set default message
  let riskMessage = "";
  let activitySuggestions = "";

  // Example activities by age
  const activities2to3 = [
    "📘 Read simple picture books daily",
    "🧸 Use gestures and name everyday objects",
    "🎶 Sing repetitive action songs like 'If You're Happy…'"
  ];

  const activities4to6 = [
    "📖 Practice storytelling using wordless books",
    "🔤 Play alphabet games and rhyme matching",
    "🧩 Follow fun 2–3 step instructions like 'Pick up the ball and sit down.'"
  ];

  // Set message and activities based on risk
  if (riskCount >= 1) {
    riskMessage = "🔴 At Risk: Please consider consulting a speech therapist.";
    activitySuggestions = (age < 4) ? activities2to3 : activities4to6;
  } else {
    riskMessage = "🟢 Not at Risk: Your child is developing typically. Keep supporting their learning!";
    activitySuggestions = (age < 4) ? activities2to3 : activities4to6;
  }

  // Create HTML list from activitySuggestions
  let activitiesHTML = "<ul>";
  activitySuggestions.forEach(item => {
    activitiesHTML += `<li>${item}</li>`;
  });
  activitiesHTML += "</ul>";

  // Google Maps search for local therapists
  const mapURL = `https://www.google.com/maps/search/speech+therapist+near+${encodeURIComponent(suburb)}`;

  // Display results
  document.getElementById("results").innerHTML = `
    <legend>Results</legend>
    <p><strong>No Responses:</strong> ${riskCount}</p>
    <p>${riskMessage}</p>
    <h3>Suggested Home Activities</h3>
    ${activitiesHTML}
    <a href="${mapURL}" target="_blank" class="btn-link">Find a Speech Therapist Near You</a>
  `;

  document.getElementById("results").style.display = "block";
});
