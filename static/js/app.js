function addMessage(text, sender) {
    const chatBox = document.getElementById("newMessage");

    const message = document.createElement("div");
    message.className = sender === "user" ? "message user-message" : "message bot-message";
    message.innerText = text;

    chatBox.appendChild(message);

    // Scroll en alta
    const panel = document.getElementById("chat-box");
    panel.scrollTop = panel.scrollHeight;
}

async function sendMessage(forcedText = null, retryCount = 0) {
    const input = document.getElementById("message");
    const typing = document.getElementById("typing-indicator");

    const msg = forcedText ? forcedText : input.value.trim();
    if (!msg) return;

    if (!forcedText) {
        addMessage(msg, "user");
        input.value = "";
        typing.style.display = "flex";
    }

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg })
        });

        const data = await response.json();

        typing.style.display = "none";

        if (!data || !data.reply) {
            addMessage("⚠️ Bir hata oluştu. Backend reply döndürmedi.", "bot");
            console.error("API RESPONSE:", data);
            return;
        }

        addMessage(data.reply, "bot");

    } catch (error) {
        typing.style.display = "none";

        if (error.response && error.response.status === 429 && retryCount < 5) {
            console.warn("Rate limit aşıldı, 20 saniye bekleniyor...");
            await new Promise(r => setTimeout(r, 20000));
            return sendMessage(msg, retryCount + 1);
        } else {
            addMessage("⚠️ Sunucuya ulaşılamıyor.", "bot");
            console.error("FETCH ERROR:", error);
        }
    }
}

// Sayfa yüklenince __start__ mesajı
window.addEventListener("load", () => sendMessage("__start__"));

// === CHAT PANEL TOGGLE ===
const chatButton = document.getElementById("chat-button");
const chatPanel = document.getElementById("chat-panel");
const closeChat = document.getElementById("close-chat");

chatButton.onclick = () => {
    chatPanel.style.display = chatPanel.style.display === "flex" ? "none" : "flex";
};

closeChat.onclick = () => {
    chatPanel.style.display = "none";
};

// === ENTER İLE GÖNDER ===
const messageInput = document.getElementById("message");

messageInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});
