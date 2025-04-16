const { Transform } = require('stream');

class CustomStream extends Transform {
    constructor(options) {
        super(options);
    }

    _transform(chunk, encoding, callback) {
        const input = chunk.toString();
        const transformed = input
            .split('') 
            .map(char => {
                if (/[a-zа-яёїієґ]/i.test(char)) {
                    return char.toUpperCase();
                }
                return char; 
            })
            .join(''); 

        
        console.log(transformed); 
        callback(null, transformed); 
    }
}

module.exports = CustomStream;
