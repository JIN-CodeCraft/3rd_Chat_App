    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-btn");
    const chatBox = document.querySelector(".chat-box");

    sendButton.addEventListener("click", sendMessage);

    messageInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
    
    async function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === "") return;
        
        const timestamp = getCurrentTime();
        const message = { text: messageText, timestamp: timestamp };
        

        await fetch("http://127.0.0.1:8000/messages", {
            method: "POST", // HTTPメソッドはPOST
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(message),  // メッセージをJSON形式で送信
        });
        // UIにメッセージを追加
        addMessageToChat(message);
        messageInput.value = "";
    }

    // サーバーからメッセージを取得する処理
    async function fetchMessages() {
        // サーバーからメッセージをGETで取得する部分
        const response = await fetch("http://127.0.0.1:8000/messages");
        const messages = await response.json();
        chatBox.innerHTML = ""; // 一度リセット

        // 取得したメッセージをUIに表示
        messages.forEach(addMessageToChat);
    }

    function addMessageToChat(message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", "sent");

        const messageContent = document.createElement("p");
        messageContent.textContent = message.text;

        const timestamp = document.createElement("span");
        timestamp.classList.add("timestamp");
        timestamp.textContent = message.timestamp;

        messageElement.appendChild(messageContent);
        messageElement.appendChild(timestamp);
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;  // チャットの最下部にスクロール
    }

    
    function getCurrentTime() {
        const now = new Date();
        return now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
    }

    // 初回読み込み時にメッセージを取得する
    fetchMessages();  // サーバーからメッセージを取得して表示