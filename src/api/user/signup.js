import request from "@/utils/request";

//post
export const signup = data => {
    return request({ url: "/usr/signup", method: "post", data });
};