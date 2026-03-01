/* 🔒 PROTECT */

const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

const API = "http://localhost:5000/api/groups";

const groupId = localStorage.getItem("activeGroupId");
const groupName = localStorage.getItem("activeGroupName") || "Group Chat";

document.getElementById("groupTitle").textContent = groupName;

/* ================= NAV ================= */

function goBack() {
    window.location.href = "group.html";
}

/* ================= AUTO JOIN GROUP ================= */

async function joinGroup() {
    try {
        await fetch(`${API}/${groupId}/join`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    } catch (err) {
        console.error("Join error:", err);
    }
}

/* ================= LOAD MESSAGES ================= */

async function loadMessages() {
    try {
        const res = await fetch(`${API}/${groupId}/messages`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        const messages = await res.json();
        const box = document.getElementById("chatMessages");

        box.innerHTML = "";

        messages.forEach((m) => {
            const msg = document.createElement("div");
            msg.className = "message";
            msg.textContent = m.text; // anonymous

            box.appendChild(msg);
        });

        box.scrollTop = box.scrollHeight;
    } catch (err) {
        console.error("Load messages error:", err);
    }
}

/* ================= SEND MESSAGE ================= */

async function sendMessage() {
    const input = document.getElementById("messageInput");
    const text = input.value.trim();
    if (!text) return;

    try {
        await fetch(`${API}/${groupId}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ text }),
        });

        input.value = "";
        loadMessages();
    } catch (err) {
        console.error("Send message error:", err);
    }
}

/* ================= START ================= */

joinGroup();      // 🔥 auto increase member count
loadMessages();   // 🔥 load chat