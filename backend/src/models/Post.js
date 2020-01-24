const mongoose = require('mongoose');

//Representação da Tabela no banco de dados
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    //objeto
    likes: {
        type:  Number,
        default: 0,
    }
},{
    //data de criacao e de alteracao
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);