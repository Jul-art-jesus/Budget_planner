const OPENAI_API_KEY = "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";

document.getElementById("chatbot-btn").addEventListener("click", chatbotResponse);

async function chatbotResponse() {
    const userMessage = prompt("Ask the AI chatbot a question:");
    if (!userMessage) return;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await response.json();
        alert("AI Response: " + data.choices[0].message.content);

    } catch (error) {
        alert("Error connecting to AI.");
    }
}
