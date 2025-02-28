    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-btn");
    const chatBox = document.querySelector(".chat-box");

    sendButton.addEventListener("click", sendMessage);

    messageInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === "") return;

        const messageElement = document.createElement("div");
        messageElement.classList.add("message", "sent");

        const messageContent = document.createElement("p");
        messageContent.textContent = messageText;

        const timestamp = document.createElement("span");
        timestamp.classList.add("timestamp");
        timestamp.textContent = getCurrentTime();

        messageElement.appendChild(messageContent);
        messageElement.appendChild(timestamp);

        chatBox.appendChild(messageElement);

        chatBox.scrollTop = chatBox.scrollHeight;

        messageInput.value = "";
    }
    
    function getCurrentTime() {
        const now = new Date();
        return now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
    };