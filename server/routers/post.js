const express = require("express");
const router = express.Router();
const Post = require("../models/PostSchema");
const User = require("../models/Userschema");

const auth = require("../middlewares/auth");
const { exists } = require("../models/PostSchema");

// router.get("/",auth,async(req,res)=>{
//   res.send("your now in post schema");
// });

//@route    POST api/post/
//@desc     create a new post
//@access   private
router.post("/", auth, async (req, res) => {
  try {
    const { name, text } = req.body;

    if (!name || !text) {
      res.status(300).json({
        message: "Please fill all the details",
      });
    } else {
      const newPost = {};
      newPost.name = name;
      newPost.text = text;
      newPost.user = req.user.id;
      const post = new Post(newPost);
      await post.save();

      //send back the post
      res.status(200).json(newPost);
    }
  } catch (error) {
    console.log("Server Error");
    res.status(500).send(`Server Error : ${error.message}`);
  }
});

//@route    GET api/post/:post_id
//@desc     get a post by id
//@access   private
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      res.status(404).send("Post not found");
    } else {
      res.status(200).json({ message: "post found", post });
    }
  } catch (error) {
    console.log("Server Error");
    res.status(500).send(`Server Error : ${error.message}`);
  }
});

//@route    GET api/post/
//@desc     get all posts
//@access   private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (!posts) {
      res.status(404).send("You don't have any posts");
    } else {
      res.status(200).send(posts);
    }
  } catch (error) {
    console.log("Server Error");
    res.status(500).send(`Server Error : ${error.message}`);
  }
});

//@route    DELETE api/post/:post_id
//@desc     Delete a post by id
//@access   private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const isExisted = await Post.findById(req.params.post_id);
    if (!isExisted) {
      res.status(404).send("Post Not Found");
    } else {
      const post = await Post.findOneAndRemove({ _id: req.params.post_id });
      res.status(200).json({message : 'Post deleted',data : post});
    }
  } catch (error) {
    console.log("Server Error");
    res.status(500).send(`Server Error : ${error.message}`);
  }
});


//@route    PUT api/post/:post_id
//@desc     update the post by id
//@access   private

router.put("/:post_id",auth, async(req,res)=>{
  try {
    //check the current user and the author is same
    const curUser = req.user.id;
    const post = await Post.findById({_id:req.params.post_id});
    const curAuthor = post.user;
    if(curUser == curAuthor){

      //he can able to update the post
      const updatePost = {};
      const{text,name} = req.body;
      if(text){updatePost.text = text}
      if(name){updatePost.name = name}

      const newPost = await Post.findOneAndUpdate({_id : req.params.post_id},{$set:updatePost},{new :true})
      // newPost.save();
      res.status(200).json(newPost);
    }
    else{
      res.status(400).send('You can not edit this post'); 
    }
  } catch (error) {
    console.log("Server Error");
    res.status(500).send(`Server Error : ${error.message}`);
  }
});


//@route    PUT api/post/likes/:post_id
//@desc     like or unlike
//@access   private

router.put("/likes/:post_id",auth, async(req,res)=>{
  try {
    const post = await Post.findById(req.params.post_id);
    if(!post){
      return res.status(404).send('Post Not Found');
    }

    //check whether logged in user liked this post
    if(post.likes.filter(like => like.user.toString()===req.user.id).length>0){
      //means he has already liked 
       res.status(400).send('This post is already liked ');

      // res.status(200).json(post);
    
      post.save();
    }
    else{
      post.likes.unshift({user:req.user.id});
      console.log('you liked this post');
      await post.save();
      res.status(200).json(post);
    }
  } catch (error) {
    console.log("Server Error");
    res.status(500).send(`Server Error : ${error.message}`); 
  }
})

//@route    PUT /comment/:post_id
//@desc     post a comment
//@access   private

router.put("/comments/:post_id", auth, async(req,res)=>{

  try {
    const post = await Post.findById(req.params.post_id);
  if(!post){return res.send('Post Not Found')}

  const commentObj = {};
  const {text} = req.body;
  if(text){commentObj.text = text};
  commentObj.user = req.user.id; //comment author

  post.comments.unshift(commentObj);
  await post.save();
  res.status(200).json(post)
  // res.status(200).send('Comment Posted Successfully');
  } catch (error) {
    console.log("Server Error");
    res.status(500).send(`Server Error : ${error.message}`); 
  }
})



//@route    DELETE /comment/:post_id
//@desc     delete  a comment by id
//@access   private
router.delete("/comments/:post_id" , auth, async(req,res)=>{

  try {
    
    const post = await Post.findById(req.params.post_id);
    if(!post){return res.status(404).send('Post Not Found')}

    //check if comment author and logged in user both are same

    if(post.comments.filter(comment => comment.user.toString()===req.user.id)){

      //now he can able to delete his comment
      post.comments.user.remove();

      return  res.send('your comment is removed');
    }
    else{

      return res.status(400).send('You are not authorized to remove this comment');
    }

  } catch (error) {
    console.log("Server Error");
    res.status(500).send(`Server Error : ${error.message}`); 
  }
})
module.exports = router;
