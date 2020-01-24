const multer = require ('multer');
// biblioteca nativa do node, para lidar com caminhos. formatar os caminhos da maneira correta independente do Sistema Operacional
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({
        //Caminho aonde vai salvar as imagens
        destination: path.resolve(__dirname, '..', '..', 'uploads' ),
       //pegar o nome da imagem 
        filename: function(req, file, cb){
            cb(null, file.originalname);
        }
    })
}; 