export const isBuiltInComponent = vnode => {
  if (!vnode) {
    return false;
  }

  const { tag } = vnode.componentOptions;

  return /^(keep-alive|transition|transition-group)$/.test(tag);
};

export const isObject = obj => obj !== null && obj && typeof obj === 'object' && !Array.isArray(obj);

export default {};
