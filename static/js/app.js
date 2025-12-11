window.addEventListener("load", function() {
    sendMessage("Merhaba!");
});


document.getElementById("sendBtn").onclick = sendMessage;
document.getElementById("message").addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
    const input = document.getElementById("message");
    const msg = input.value.trim();
    if (!msg) return;

    addMessage(msg, "user");
    input.value = "";

    const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
    });

    const data = await response.json();
    addMessage(data.reply, "bot");
}

function addMessage(text, type) {
    const box = document.getElementById("chatbox");
    const div = document.createElement("div");
    div.className = "message " + type;
    div.innerText = text;
    box.appendChild(div);

    box.scrollTop = box.scrollHeight;
}
