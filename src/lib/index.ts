/**
 * TODO -- 等待加载完成
 * @param callback 回调函数
 * @param delay 每次刷新间隔时间
 * @returns 
 */
function waitLoaded(callback: () => boolean, delay: number = 100): Promise<void> {
    return new Promise((resolve) => {
        const iv = setInterval(() => {
            if (callback()) {
                clearInterval(iv);
                resolve();
            }   
        }, delay);
    });
}


export {
    waitLoaded,
}