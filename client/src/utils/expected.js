const expected = (str) => {
    if (str.length > 40) {
        str = str.substr(0, 40) + " ...";
    }
    return str
}

export default expected