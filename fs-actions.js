const { readdir, stat } = require('fs/promises')
const path = require('path')


const entries = [];
async function ListFiles(directory) {

    const directoryStats = await stat(directory);
    const parentPathIsDir = directoryStats.isDirectory();

    if (!parentPathIsDir){
        throw new Error('Path is not a directory');
    }

    let contents = await readdir(directory)

    for (let entry of contents) {
        const subpath = path.join(directory, entry);
        const subpathStats = await stat(subpath);
        const subpathIsValid = subpathStats.isDirectory()
        if (subpathIsValid) await ListFiles(subpath);
        else {
            const newFile = path.join(directory, entry)
            entries.push(newFile)
        }
    }
    return entries
}

async function getMetadata(filepath) {
      const metadata = await stat(filepath)
      const size = metadata.size
      const mtimeMs = metadata.mtime
      return {
        size,
        mtimeMs,
    }
  }

function getFileType(filepath){
    const documentExtension = ['.pdf', '.docx', '.doc', '.odt', '.ppt', '.pptx', '.xls', '.xlsx', '.htm', '.html', '.txt']
    const extension = path.extname(filepath);
    const isDocument = documentExtension.includes(extension);

    if(isDocument) return 'document';
    const type = mime.lookup(extension).split('/')[0];
    return type;
}

module.exports = { ListFiles, getFileType, getMetadata };
