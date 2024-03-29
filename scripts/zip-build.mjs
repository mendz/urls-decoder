import admZip from 'adm-zip';

const zip = new admZip();

const folderToZip = './build';
const destZipPath = './build/url-decoder.zip';

console.log(`
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                CREATE ZIP FROM BUILD FOLDER
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`);

console.log(`ZIP the folder: '${folderToZip}'...`);
console.log(`to: '${destZipPath}'...`);

zip.addLocalFolder(folderToZip);

zip.writeZip(destZipPath, () =>
  console.log(`
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                            DONE!
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`)
);
