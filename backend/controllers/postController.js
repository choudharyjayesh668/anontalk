const Post = require("../models/Post");

// ✅ CREATE POST
exports.createPost = async (req, res) => {
    try {
        const { content, category } = req.body;

        const post = await Post.create({
            content,
            category,
        });

        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ GET POSTS
exports.getPosts = async (req, res) => {
    try {
        const { category } = req.query;

        const filter = category ? { category } : {};
        const posts = await Post.find(filter).sort({ createdAt: -1 });

        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ LIKE POST
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );

        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ ADD COMMENT
exports.addComment = async (req, res) => {
    try {
        const { text } = req.body;

        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $push: { comments: { text } } },
            { new: true }
        );

        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ LIKE COMMENT
exports.likeComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        const comment = post.comments.id(req.params.commentId);
        comment.likes += 1;

        await post.save();

        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ DELETE POST
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};