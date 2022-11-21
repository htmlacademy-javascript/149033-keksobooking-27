const FILES_TYPES = ['jpg', 'jpeg', 'png'];

const isVildTypeImg = (fileName) => FILES_TYPES.some((it) => fileName.endsWith(it));
export { isVildTypeImg };
