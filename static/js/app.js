function addMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");

    const message = document.createElement("div");
    message.className = sender === "user" ? "message user-message" : "message bot-message";
    message.innerText = text;

    chatBox.appendChild(message);

    // Otomatik aşağı kaydır
    chatBox.scrollTop = chatBox.scrollHeight;
}

// SEND MESSAGE - hem input'tan hem dışarıdan text alabilir
async function sendMessage(forcedText = null) {

    const input = document.getElementById("message");
    const msg = forcedText ? forcedText.trim() : input.value.trim();

    if (!msg) return;

    if (!forcedText) input.value = ""; // sadece kullanıcı yazdıysa temizle

    addMessage(msg, "user");

    const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
    });

    const data = await response.json();
    addMessage(data.reply, "bot");
}

// Sayfa açılır açılmaz otomatik mesaj gönder
window.addEventListener("load", () => {
    sendMessage("Merhaba! Sana nasıl yardımcı olabilirim? İstediklerini sorabilirsin!");
});
