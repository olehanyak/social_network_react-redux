export const updateObjectInArr = (items: any, itemId: any, objPropName: any, newObjectProps: any) => {
  return items.map((user: any) => {
    if (user[objPropName] === itemId) {
      return { ...user, newObjectProps };
    }
    return user;
  })
};