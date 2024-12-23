const mongoose = require('mongoose');
const schema = mongoose.Schema

const blogschema = new schema({
    recepi: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
 
})
const blog = mongoose.model('blogData', blogschema);
module.exports = blog;