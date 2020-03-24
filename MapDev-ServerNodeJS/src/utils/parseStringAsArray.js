module.exports = parseStringAsArray => {
    return parseStringAsArray.split(',').map(index => index.trim());
}