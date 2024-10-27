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
    { pattern: /what is the weather like/i, responses: ["I can't check the weather right now, but it's always nice to stay updated with a weather app!", "I wish I could check the weather, but I'm not connected to the internet!"] },
    { pattern: /what is your favorite food/i, responses: ["I don't eat, but I hear pizza is quite popular!", "I think I'd enjoy anything with lots of flavors!"] },
    // Add more patterns and creative responses here
  ];
  
  function getChatbotResponse(input) {
    for (let pair of chatbotPairs) {
      if (pair.pattern.test(input)) {
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
  
  function sendMessage() {
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
    simulateTyping(() => {
      const botResponse = getChatbotResponse(userInput);
      
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
  document.getElementById("user-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
  
