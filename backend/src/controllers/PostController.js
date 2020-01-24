const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res){
        //Ordena de forma decrescente 
        const posts = await Post.find().sort('-createdAt')

        return res.json(posts);
    },

    async store(req, res){
        //olha o resultado no console
        console.log(req.body);
        //olha o resultado da imagem
        console.log(req.file);

        const {author, place, description, hashtags} = req.body;
        const {filename: image} = req.file;

        //Transformando a imagem em jpg
        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        //Ajustando o tamanho e o caminho da imagem
        await sharp(req.file.path)
                .resize(500)
                .jpeg({quality: 70})
                .toFile(
                    path.resolve(req.file.destination, 'resized', fileName)
                );
        //deleta o arquivo da pasta 
        //req.file.path > upload
        //req.file.destination > upload > recized > foto.png
        fs.unlinkSync(req.file.path);


        //Salva a imagem e seus dados no banco de Dados
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName, 
        }); 

        req.io.emit('post', post);

        return res.json(post);
    }
};