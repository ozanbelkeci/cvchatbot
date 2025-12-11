function addMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");

    const message = document.createElement("div");
    message.className = sender === "user" ? "message user-message" : "message bot-message";
    message.innerText = text;

    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(forcedText = null) {

    const input = document.getElementById("message");
    const msg = forcedText ? forcedText : input.value.trim();

    if (!msg) return;

    if (!forcedText) input.value = ""; // sadece kullanıcı yazarsa temizle

    // forcedText değilse kullanıcı mesajını ekle
    if (!forcedText) {
        addMessage(msg, "user");
    }

    const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
    });

    const data = await response.json();

    addMessage(data.reply, "bot");
}

// Sayfa yüklenince backend'e __start__ gönder -> WELCOME_MESSAGE gelir
window.addEventListener("load", () => {
    sendMessage("__start__");
});
