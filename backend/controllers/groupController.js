const Group = require("../models/Group");
const Message = require("../models/Message");

/* ================= CREATE GROUP ================= */

exports.createGroup = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Group name required" });
        }

        const group = await Group.create({
            name,
            createdBy: req.user.id, // 🔥 MUST EXIST
            members: [req.user.id],
            memberCount: 1,
        });

        res.status(201).json(group);
    } catch (err) {
        console.error("Create group error:", err);
        res.status(500).json({ message: err.message });
    }
};

/* ================= GET ALL GROUPS ================= */

exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find().sort({ createdAt: -1 });
        res.json(groups);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* ================= SEARCH GROUPS ================= */

exports.searchGroups = async (req, res) => {
    try {
        const q = req.query.q || "";

        const groups = await Group.find({
            name: { $regex: q, $options: "i" },
        });

        res.json(groups);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* ================= JOIN GROUP (AUTO) ================= */

exports.joinGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // if user not already member → add
        const alreadyMember = group.members.includes(req.user.id);

        if (!alreadyMember) {
            group.members.push(req.user.id);
            group.memberCount += 1;
            await group.save();
        }

        res.json(group);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* ================= SEND MESSAGE ================= */

exports.sendMessage = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: "Message required" });
        }

        const message = await Message.create({
            group: req.params.groupId,
            sender: req.user.id,
            text,
        });

        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* ================= GET MESSAGES ================= */

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            group: req.params.groupId,
        }).sort({ createdAt: 1 });

        // 🔥 REMOVE sender for anonymity
        const safeMessages = messages.map((m) => ({
            _id: m._id,
            text: m.text,
            createdAt: m.createdAt,
        }));

        res.json(safeMessages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
/* ================= DELETE GROUP ================= */

/* ================= DELETE GROUP ================= */

exports.deleteGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // 🔒 STRICT OWNER CHECK (FINAL HARD LOCK)
        if (!group.createdBy || String(group.createdBy) !== String(req.user.id)) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await Group.findByIdAndDelete(req.params.id);
        await Message.deleteMany({ group: req.params.id });

        res.json({ message: "Group deleted successfully" });

    } catch (err) {
        console.error("Delete group error:", err);
        res.status(500).json({ message: err.message });
    }
};