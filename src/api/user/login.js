import request from "@/utils/request";

//post
export const login = data => {
    return request({ url: "/usr/login", method: "post", data });
};