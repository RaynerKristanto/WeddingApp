async function importAll(context) {
  const imagePaths = [];
  for (const path in context) {
    if (Object.hasOwnProperty.call(context, path)) {
      imagePaths.push(context[path]);
    }
  }
  return imagePaths;
}

async function getWeddingImages() {
  const raynerImages = import.meta.glob('../../assets/WeddingPhotos/Rayner/*', { as: 'url' });
  const sherryImages = import.meta.glob('../../assets/WeddingPhotos/Sherry/*', { as: 'url' });

  let allWeddingImages = [];

  if (raynerImages) {
    allWeddingImages = allWeddingImages.concat(await importAll(raynerImages));
  }

  if (sherryImages) {
    allWeddingImages = allWeddingImages.concat(await importAll(sherryImages));
  }

  return allWeddingImages;
}

let weddingImages;
getWeddingImages().then(images => {
  weddingImages = images;
  console.log('Wedding images loaded', weddingImages);
});
export { weddingImages };
