const Movie = require("../model/movie")

const movieController = {
    //  ADD MOVIE
    addMovie: async(req, res) => {
        try {
            const newMovie = new Movie(req.body)
            const saveMovie = await newMovie.save();
            res.status(200).json(saveMovie) 
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    
    // GET ALL MOVIE
    getAllmovie: async (req, res) => {
        try {
            const allMovie = await Movie.find()
            res.status(200).json(allMovie)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    
    // GET A MOVIE
    getAMovie: async (req, res) => {
        try {
            const aMovie = await Movie.findById(req.params.id)
            res.status(200).json(aMovie)
        }  
        catch (err) {
            res.status(500),json(err)
        }
    },

    // PUT MOVIE
    updateMovie: async (req, res) => {
        try {
            const movie = await Movie.findById(req.params.id);
            await movie.updateOne({$set: req.body})
            res.status(200).json("update successfully")
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    
    // DELETE MOVIE
    deleteMovie: async (req, res) => {
        try {
            await Movie.findById(req.params.id)
            res.status(200).json("delete successfully")
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = movieController