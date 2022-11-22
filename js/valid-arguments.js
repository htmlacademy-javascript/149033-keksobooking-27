const FILES_TYPES = ['jpg', 'jpeg', 'png'];

const isValidTypeImg = (fileName) => FILES_TYPES.some((it) => fileName.endsWith(it));
export { isValidTypeImg };
