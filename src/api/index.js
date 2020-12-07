import request from "@/utils/request";

//get
export const getDemo = params => {
    return request({ url: "/getDemo", method: "get", params });
};

//post
export const postDemo = data => {
    return request({ url: "/postDemo", method: "post", data });
};