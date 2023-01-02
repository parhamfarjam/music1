const router = require("express").Router()

const song = require("../models/song")

router.post("/save", async(req , res)=>{
    const newsong = song({
        name: req.body.name,
        imageURL: req.body.imageURL,
        songURL : req.body.songURL ,
        album : req.body.album ,
        language: req.body.language,
        artist: req.body.artist,
        category: req.body.category,
    })
    try {
        const savedsong = await newsong.save()
        return res.status(200).send({success : true , song : savedsong})
    } catch (error) {
        return res.status(400).send({success : false , msg : error})
    }
})

router.get("/getOne/:id", async (req , res) =>{
    const filter = {_id: req.params.id}

    const data = await song.findOne(filter)
    if(data){
        return res.status(200).send({success : true , song : data})
    }else{
        return res.status(400).send({success : false , msg : "Data Not Found"})
    }
})

router.get("/getAll", async (req ,res) =>{
    const option ={
        sort: {
            createdAt : 1,
        },
    }
    const data = await song.find(option)
    if(data){
        return res.status(200).send({success : true , song : data})
    }else{
        return res.status(400).send({success : false , msg : "Data Not Found"})
    }
})

router.put("/update/:id", async (req , res) =>{
    const filter = {_id: req.params.id}

    const options = {
        upsert : true,
        new : true,
    }
    try {
        const result = await song.findOneAndUpdate(
            filter,
            {
                name: req.body.name,
                imageURL: req.body.imageURL,
                songURL : req.body.songURL ,
                album : req.body.album ,
                language: req.body.language,
                artist: req.body.artist,
                category: req.body.category,
            },
            options
        );
        return res.status(200).send({ success : true , data : result})
    } catch (error) {
        return res.status(400).send({success : false , msg : error})
    }
})

router.delete("/delete/:id", async (req ,res)=>{
    const filter = {_id: req.params.id}

    const result = await song.deleteOne(filter)
    if(result){
        return res.status(200).send({success : true , msg : "Data deleted successfully"})
    }else{
        return res.status(400).send({success : false , msg : "Data Not Found"})
    }
})

module.exports = router