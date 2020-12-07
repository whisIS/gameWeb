import request from "@/utils/request";

export const signup = data => {
    return request({ url: "/usr/signup", method: "post", data });
};

export const login = data => {
    return request({ url: "/usr/login", method: "post", data });
};

export const logout = data => {
    return request({ url: "/usr/logout", method: "post", data });
};

export const getUserInfo = data => {
    return request({ url: "/usr/info", method: "post", data });
}