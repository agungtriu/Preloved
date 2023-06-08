const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const deleteFile = async (data) => {
  if (data !== null) {
    const filePath = `./public/images/${data}`;
    await unlinkAsync(filePath);
  }
};

module.exports = deleteFile;
