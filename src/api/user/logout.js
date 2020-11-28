import request from "@/utils/request";

//post
export const logout = data => {
    return request({ url: "/usr/logout", method: "post", data });
};