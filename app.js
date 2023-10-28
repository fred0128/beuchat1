const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 5500; // Port numarasını 5500 olarak ayarladık.

app.use(express.static('public')); // Statik dosyaları sunmak için "public" klasörünü kullanıyoruz
app.use(bodyParser.urlencoded({ extended: true })); // Form verilerini işlemek için body-parser kullanıyoruz

app.post('/createFile', (req, res) => {
    const username = req.body.username;
    
    if (username) {
        const fileName = `${username}.txt`;
        const fileContent = `Bu fayl ${username} ucun yaradilib.`;

        fs.writeFile(fileName, fileContent, (err) => {
            if (err) {
                res.status(500).send("Dosya oluşturulurken hata oluştu.");
            } else {
                res.status(200).send("Dosya başarıyla oluşturuldu: " + fileName);
            }
        });
    } else {
        res.status(400).send("İstifadəci adı boş olmamalıdır.");
    }
});

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor...`);
});
