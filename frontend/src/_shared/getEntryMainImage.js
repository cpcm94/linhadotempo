export const getEntryMainImage = (entry) =>
  entry.images.filter((image) => !!image.is_main_image)[0]
