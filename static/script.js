async function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (!message) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div class="user-msg">🗨️ ${message}</div>`;
    input.value = "";

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({message})
        });
        const data = await response.json();
        chatBox.innerHTML += `<div class="bot-msg">🤖 ${data.reply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        chatBox.innerHTML += `<div class="bot-msg" style="color:red;">⚠️ Sunucu hatası oluştu.</div>`;
        console.error(error);
    }
}


window.addEventListener('DOMContentLoaded', async () => {
    const chatBox = document.getElementById("chat-box");
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({message: "__start__"})
        });
        const data = await response.json();
        chatBox.innerHTML += `<div class="bot-msg">🤖 ${data.reply}</div>`;
    } catch (error) {
        chatBox.innerHTML += `<div class="bot-msg" style="color:red;">⚠️ Başlangıç mesajı yüklenemedi.</div>`;
        console.error(error);
    }
});
