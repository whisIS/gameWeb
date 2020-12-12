import request from "@/utils/request";

export const gameInfo = data => {
    return request({ url: "/game/information", method: "post", data });
};

export const gameRank = data => {
    return request({ url: "/game/rank", method: "post", data });
};

export const gameScore = data => {
    return request({ url: "/game/score", method: "post", data });
};

export const gameComment = data => {
    return request({ url: "/game/comment", method: "post", data });
};

export const writeComment = data => {
    return request({ url: "/game/writeComment", method: "post", data });
};



