/* ================= SMART COLOR SYSTEM ================= */

function getSmartVariant(index) {
    const basePattern = ["", "red", "", "brown", ""];
    return basePattern[index % basePattern.length];
}

const API = "http://localhost:5000/api/posts";
const token = localStorage.getItem("token");

/* 🔒 PROTECT PAGE */
if (!token) {
    window.location.href = "login.html";
}

/* ================= GROUP NAVIGATION ================= */

function goGroups() {
    window.location.href = "group.html";
}

function goCreateGroup() {
    window.location.href = "create-group.html";
}

/* ================= FETCH POSTS ================= */

async function fetchPosts() {
    try {
        const res = await fetch(API, {
            headers: {
                Authorization: token, // ✅ FIXED (NO Bearer)
            },
        });

        const data = await res.json();
        const container = document.getElementById("posts");

        container.innerHTML = "";

        // ✅ safety check (prevents crash)
        if (!Array.isArray(data)) {
            console.error("Posts API error:", data);
            return;
        }

        data.forEach((post) => {
            const card = document.createElement("div");

            let variant = "";
            const rand = Math.random();

            if (rand < 0.25) variant = "red";
            else if (rand < 0.5) variant = "brown";

            card.className = `card ${variant}`;

            card.innerHTML = `
                <p>${post.content}</p>

                <div class="card-footer">
                    <span onclick="toggleComments('${post._id}')" style="cursor:pointer;">
                        💬 ${post.comments?.length || 0}
                    </span>

                    <span onclick="likePost('${post._id}')" style="cursor:pointer;">
                        ❤️ ${post.likes || 0}
                    </span>

                    <span onclick="deletePost('${post._id}')" style="cursor:pointer; color:#ff6b6b;">
                        🗑️
                    </span>
                </div>

                <div class="comments hidden" id="comments-${post._id}">
                    <div class="comment-list">
                        ${(post.comments || [])
                .map(c => `<div class="comment-item">${c.text}</div>`)
                .join("")}
                    </div>

                    <div class="comment-input-box">
                        <input
                            type="text"
                            placeholder="Write comment..."
                            id="input-${post._id}"
                        />
                        <button onclick="addComment('${post._id}')">Send</button>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        console.error("Fetch error:", err);
    }
}

/* ================= LIKE POST ================= */

async function likePost(id) {
    try {
        await fetch(`${API}/${id}/like`, {
            method: "PUT",
            headers: {
                Authorization: token, // ✅ FIXED
            },
        });

        fetchPosts();
    } catch (err) {
        console.error("Like error:", err);
    }
}

/* ================= MODAL ================= */

function openModal() {
    document.getElementById("postModal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("postModal").classList.add("hidden");
}

/* ================= CREATE POST ================= */

async function createPost() {
    try {
        const contentEl = document.getElementById("postContent");

        if (!contentEl.value.trim()) {
            alert("Write something!");
            return;
        }

        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token, // ✅ FIXED
            },
            body: JSON.stringify({
                content: contentEl.value,
                category: "general"
            }),
        });

        contentEl.value = "";
        closeModal();
        fetchPosts();

    } catch (err) {
        console.error("Create post error:", err);
    }
}

/* ================= TOGGLE COMMENTS ================= */

function toggleComments(postId) {
    const box = document.getElementById(`comments-${postId}`);
    box.classList.toggle("hidden");
}

/* ================= ADD COMMENT ================= */

async function addComment(postId) {
    try {
        const input = document.getElementById(`input-${postId}`);
        const text = input.value.trim();

        if (!text) return;

        await fetch(`${API}/${postId}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token, // ✅ FIXED
            },
            body: JSON.stringify({ text }),
        });

        input.value = "";
        fetchPosts();

    } catch (err) {
        console.error("Comment error:", err);
    }
}

/* ================= DELETE POST ================= */

async function deletePost(id) {
    const confirmDelete = confirm("Delete this post?");
    if (!confirmDelete) return;

    try {
        await fetch(`${API}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: token, // ✅ FIXED
            },
        });

        fetchPosts();
    } catch (err) {
        console.error("Delete error:", err);
    }
}

/* ================= START ================= */

fetchPosts();
/* ================= LOGOUT ================= */

function logoutUser() {
    localStorage.clear();
    window.location.href = "login.html";
}