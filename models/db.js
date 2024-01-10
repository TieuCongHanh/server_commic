// phải cài thư viện npm install mongoose --save
const mongoose =  require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Androi')
.catch((err) => {
console.log('lỗi');
console.log(err);   
})
module.exports = {mongoose};