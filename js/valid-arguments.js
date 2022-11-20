const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const isVildTypeImg = (fileName) => FILE_TYPES.some((it) => fileName.endsWith(it));
export { isVildTypeImg };
