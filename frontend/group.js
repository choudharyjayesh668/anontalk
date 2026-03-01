/* 🔒 PROTECT PAGE */
const API_URL = "http://localhost:5000/api/groups";
const token = localStorage.getItem("token");

if (!token) window.location.href = "login.html";

/* ================= NAVIGATION ================= */

function goHome() {
    window.location.href = "index.html";
}

function goCreateGroup() {
    window.location.href = "create-group.html";
}

/* ================= OPEN CHAT ================= */

function openGroupChat(group) {
    localStorage.setItem("activeGroupId", group._id);
    localStorage.setItem("activeGroupName", group.name);
    window.location.href = "chat.html";
}

/* ================= LOAD GROUPS ================= */

async function loadGroups() {
    try {
        const res = await fetch(API_URL, {
            headers: {
                Authorization: token, // ✅ clean
            },
        });

        const groups = await res.json();
        console.log("Groups from backend:", groups);

        const container = document.getElementById("groupContainer");
        container.innerHTML = "";

        groups.forEach(group => {
            const card = document.createElement("div");
            card.className = "group-card";

            // ✅ open chat only when card clicked
            card.onclick = () => openGroupChat(group);

            card.innerHTML = `
                <div class="group-name">${group.name}</div>
                <div class="group-meta">${group.memberCount} members</div>

                <div style="margin-top:8px;">
                    <span 
                        onclick="deleteGroup('${group._id}', event)" 
                        style="color:#ff6b6b; cursor:pointer; font-size:14px;"
                    >
                        🗑 Delete
                    </span>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        console.error("Load groups error:", err);
    }
}

/* ================= DELETE GROUP ================= */

async function deleteGroup(id, event) {
    event.stopPropagation();

    const confirmDelete = confirm("Delete this group?");
    if (!confirmDelete) return;

    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: token,
            },
        });

        loadGroups();
    } catch (err) {
        console.error("Delete group error:", err);
    }
}

/* ================= START ================= */

loadGroups();
function logoutUser() {
    localStorage.clear();
    window.location.href = "login.html";
}