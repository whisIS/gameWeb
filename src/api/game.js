import request from "@/utils/request";

export const getGameInfo = data => {
    return request({ url: "/game/information", method: "post", data });
};

export const getGameInfo = data => {
    return request({ url: "/game/rank", method: "post", data });
};

export const getGameInfo = data => {
    return request({ url: "/game/score", method: "post", data });
};

export const getGameInfo = data => {
    return request({ url: "/game/comment", method: "post", data });
};

export const getGameInfo = data => {
    return request({ url: "/game/writeComment", method: "post", data });
};



