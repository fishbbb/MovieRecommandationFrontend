//装饰器，包裹mutations，使之可以异步。
//调用mutations
export const setUser = ({commit},user) => {
    commit("userStatus",user);
}
export const setToken = ({commit},token) =>{
    commit("setToken",token);
}