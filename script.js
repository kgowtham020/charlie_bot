const chatbotPairs = [
  { pattern: /hi|hello|hey/i, responses: ["Hello!", "Hi there!", "Hey! How can I assist you?"] },
  { pattern: /bye|goodbye/i, responses: ["Goodbye!", "See you later!", "Take care!"] },
  { pattern: /how are you|how's it going/i, responses: ["I'm just a chatbot, but I'm here to help!", "I'm doing well, thanks! How about you?"] },
  { pattern: /tell me a joke/i, responses: ["Why did the programmer quit his job? Because he didn't get arrays!", "Why do programmers prefer dark mode? Because light attracts bugs!"] },
  { pattern: /what is your name/i, responses: ["I'm your friendly chatbot!", "I don’t have a name, but I'm here to assist you!"] },
  { pattern: /help|assist/i, responses: ["Sure, I'm here to help you with whatever I can!", "How can I assist you today?"] },
  { pattern: /what is your favorite color/i, responses: ["I like all colors, but I find blue quite calming!", "I think green is refreshing!"] },
  { pattern: /do you have feelings/i, responses: ["I don’t have feelings like humans do, but I’m programmed to be helpful!", "I understand emotions, but I don't experience them."] },
  { pattern: /tell me about yourself/i, responses: ["I'm a chatbot created to assist you with information and answer your questions.", "I exist to make your life easier!"] },
  { pattern: /what can you do/i, responses: ["I can answer questions, tell jokes, and assist you with various tasks!", "I'm here to chat and help you find information."] },
  {
    pattern: /weather in (\w+)/i,
    responses: ["Let me fetch the weather for you! (Dynamic API placeholder)."],
    dynamic: true, // Marks this pattern for API-based responses
    action: async (match) => {
      const city = match[1];
      const apiKey = "YOUR_API_KEY"; // Replace with a valid API key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
          return `The weather in ${city} is ${data.main.temp}°C with ${data.weather[0].description}.`;
        } else {
          return `Sorry, I couldn't find the weather for ${city}.`;
        }
      } catch (error) {
        return "I ran into a problem while fetching the weather. Please try again later.";
      }
    }
  },
  {
    pattern: /random trivia/i,
    responses: ["Let me fetch a trivia question! (Dynamic API placeholder)."],
    dynamic: true, // API-based response
    action: async () => {
      const url = "https://opentdb.com/api.php?amount=1";
      try {
        const response = await fetch(url);
        const data = await response.json();
        const trivia = data.results[0];
        return `${trivia.question} (Answer: ${trivia.correct_answer})`;
      } catch (error) {
        return "Sorry, I couldn't fetch a trivia question right now.";
      }
    }
  }
];

async function getChatbotResponse(input) {
  for (let pair of chatbotPairs) {
    const match = input.match(pair.pattern);
    if (match) {
      if (pair.dynamic && pair.action) {
        return await pair.action(match);
      }
      const responses = pair.responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  return "I'm not sure how to respond to that. Can you ask something else?";
}

function simulateTyping(callback) {
  const typingIndicator = document.createElement("p");
  typingIndicator.className = "bot-message typing-indicator";
  typingIndicator.textContent = "Charlie is typing...";
  document.getElementById("chat-output").appendChild(typingIndicator);

  setTimeout(() => {
    typingIndicator.remove();
    callback();
  }, 1500); // Simulate typing for 1.5 seconds
}

async function sendMessage() {
  const userInput = document.getElementById("user-input").value.trim();
  if (!userInput) return;

  const chatOutput = document.getElementById("chat-output");

  // Display user's message
  const userMessageElement = document.createElement("p");
  userMessageElement.className = "user-message";
  userMessageElement.textContent = userInput;
  chatOutput.appendChild(userMessageElement);

  // Clear input field
  document.getElementById("user-input").value = "";

  // Simulate bot typing and get response
  simulateTyping(async () => {
    const botResponse = await getChatbotResponse(userInput);

    // Display bot's response
    const botMessageElement = document.createElement("p");
    botMessageElement.className = "bot-message";
    botMessageElement.textContent = botResponse;
    chatOutput.appendChild(botMessageElement);

    // Scroll to the bottom of chat output
    chatOutput.scrollTop = chatOutput.scrollHeight;
  });
}

// Add event listener for Enter key press
document.getElementById("user-input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
