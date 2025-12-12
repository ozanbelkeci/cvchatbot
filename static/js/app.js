function addMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");
    const typing = document.getElementById("typing-indicator");

    // Yeni mesaj oluştur
    const message = document.createElement("div");
    message.className = sender === "user" ? "message user-message" : "message bot-message";
    message.innerText = text;

    // Mesajı ekle
    chatBox.appendChild(message);

    // Typing indicator'ı en alta almak için sona tekrar ekle
    chatBox.appendChild(typing);

    // Her şeyden sonra scroll'u aşağıya çek
    chatBox.scrollTop = chatBox.scrollHeight;
}


async function sendMessage(forcedText = null) {
    const input = document.getElementById("message");
    const typing = document.getElementById("typing-indicator");

    const msg = forcedText ? forcedText : input.value.trim();
    if (!msg) return;

    // Kullanıcı kendi mesajını yazdıysa ekle
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

        // ❗ API yanlış dönerse undefined yerine düzgün hata göster
        if (!data || !data.reply) {
            addMessage("⚠️ Bir hata oluştu. Backend reply döndürmedi.", "bot");
            console.error("API RESPONSE:", data);
            return;
        }

        addMessage(data.reply, "bot");

    } catch (error) {
        typing.style.display = "none";
        addMessage("⚠️ Sunucuya ulaşılamıyor.", "bot");
        console.error("FETCH ERROR:", error);
    }
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
