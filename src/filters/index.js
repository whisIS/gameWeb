/**
 * 格式化日期
 * @param {string} time 时间戳
 * @param {string} type 分隔符
 */
export const formatDate = (time, type) => {
    if (time) {
        var date = new Date();
        date.setTime(time);
        var year = date.getFullYear();
        var month =
            date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1) * 1
                : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        if (type == "-") {
            return year + "-" + month + "-" + day;
        } else if (type == "/") {
            return year + "/" + month + "/" + day;
        } else if (type == ".") {
            return year + "." + month + "." + day;
        } else {
            return year + "年" + month + "月" + day + "日";
        }
    }
};

/**
 * 格式化时间
 * @param {string} time 时间戳
 * @param {string} type 分隔符
 */
export const formatTime = (time, type) => {
    if (time) {
        var date = new Date();
        date.setTime(time);
        var year = date.getFullYear();
        var month =
            date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1) * 1
                : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes =
            date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds =
            date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        if (type == "-") {
            return (
                year +
                "-" +
                month +
                "-" +
                day +
                " " +
                hours +
                ":" +
                minutes +
                ":" +
                seconds
            );
        } else if (type == "/") {
            return (
                year +
                "/" +
                month +
                "/" +
                day +
                " " +
                hours +
                ":" +
                minutes +
                ":" +
                seconds
            );
        } else if (type == ".") {
            return (
                year +
                "." +
                month +
                "." +
                day +
                " " +
                hours +
                ":" +
                minutes +
                ":" +
                seconds
            );
        } else {
            return (
                year +
                "年" +
                month +
                "月" +
                day +
                "日" +
                " " +
                hours +
                ":" +
                minutes +
                ":" +
                seconds
            );
        }
    }
};
