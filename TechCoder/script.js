async function analyzeIngredients() {
  const ingredientsInput = document.getElementById("ingredients");
  const output = document.getElementById("output");

  const ingredients = ingredientsInput.value;



  if (!ingredients.trim()) {
    output.innerText = "Please enter an ingredient list.";
    return;
  }

  output.innerText = "Thinking...";



  const prompt = `
You are an AI-native consumer health co-pilot.

Do NOT list or explain every ingredient.
Do NOT give medical advice.

Infer what matters for a quick buy-or-eat decision.
Explain implications in simple, human language.
Communicate trade-offs and uncertainty honestly.

Ingredients:
${ingredients}
`;

  const endpoint =
    "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=" +
    API_KEY;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    if (!response.ok) {
      output.innerText = "API error. Check console.";
      return;
    }

    const data = await response.json();

    if (
      !data.candidates ||
      !data.candidates[0]?.content?.parts?.length
    ) {
      output.innerText = "No valid response from AI.";
      return;
    }

    output.innerText = data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error(error);
    output.innerText = "Something went wrong.";
  }
}
script>
  function startDemo() {
    const screen = document.getElementById("aiScreen");
    screen.classList.remove("hidden");
    screen.scrollIntoView({ behavior: "smooth" });
  }
</script>
