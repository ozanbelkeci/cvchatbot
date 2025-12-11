function addMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");

    const message = document.createElement("div");
    message.className = sender === "user" ? "message user-message" : "message bot-message";
    message.innerText = text;

    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById("message");
    const chatBox = document.getElementById("chat-box");
    const text = input.value.trim();

    if (!text) return;

    // Kullanıcı mesajı
    chatBox.innerHTML += `<div class="user-msg">${text}</div>`;
    input.value = "";

    // Yazıyor animasyonunu aç
    document.getElementById("typing-indicator").style.display = "flex";

    // API isteği
    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    // Yazıyor animasyonunu kapat
    document.getElementById("typing-indicator").style.display = "none";

    // Bot mesajı
    chatBox.innerHTML += `<div class="bot-msg">${data.response}</div>`;
}


// Sayfa yüklenince backend'e __start__ gönder -> WELCOME_MESSAGE gelir
window.addEventListener("load", () => {
    sendMessage("__start__");
});

const chatButton = document.getElementById("chat-button");
const chatPanel = document.getElementById("chat-panel");
const closeChat = document.getElementById("close-chat");

chatButton.onclick = () => {
    chatPanel.style.display = "flex";
};

closeChat.onclick = () => {
    chatPanel.style.display = "none";
};
