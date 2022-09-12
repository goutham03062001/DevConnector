const express = require("express");

const router = express.Router();

const Post = require("../models/PostSchema");

// router.get("/",(req,res)=>{
//     res.send("User router");
// })


//post register route

router.post("/newPost",async (req,res)=>{
    const{id,name,description,author,Comments,likes,dislikes} = req.body;
    // /const{selfComments,othersComments} = req.body.comments;
    //insert into db
    const{selfComments,othersComments} = req.body.Comments;
    try {
        
        const newPost = new Post({id,name,description,author,Comments,likes,dislikes});
        await newPost.save()
        .then((success)=>{
            return res.status(200).json({
                message : "your post is created",
                data:{
                    newPost
                }
            })
        })
        .catch((err)=>{
            return res.status(300).json({
                message:"your post is not created",
                error : err
            });
        });
    } catch (error) {
        console.log("error is : ",error);
    }

})

//route deletePost
router.delete("/:postId",async (req, res)=>{
    let postId = (req.params.postId)*1;
    console.log(postId);
    try {
        const postDelete = await Post.findOne({postId});
        await Post.deleteOne(postDelete);

        return res.send("your post is deleted");
    }
     catch (error) {
        return res.status(500).json({message : `server error : ${error.message}`});
    }
    
});

//router getAllPost
//api    /allposts

router.get("/allposts",async (req,res)=>{
    try {
        
        const allPosts = await Post.find();

        if(!allPosts){
            return res.status(404).json({
                message : "there is no posts yet"
            }) 
        }
        else{
            return res.json({
                length : allPosts.length,
                data : {
                    allPosts
                }
            });
        }


    } catch (error) {
        
        return res.status(500).json({
            message:`your error is : ${error.message}`
        })
    }
});

//route updatepost

router.patch("/:id",async (req,res)=>{

    const newPostName = req.body.name;
    let postId = (req.params.id)*1;

    //find the post by id
    const findPost = await Post.findOne({postId});
    
    const postName = findPost.name;

    //before updating post

    console.log(postName);
    //update the post
    const updatedPost = await Post.findOneAndUpdate({postName, newPostName});
    //after updating

    console.log(updatedPost.name);
    return res.json({
        message : "your post is updated ",
        data : updatedPost
    })
    

})
module.exports = router;
