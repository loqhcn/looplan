/**
 * 将字符串转换为驼峰命名法
 * @param {string} str - 要转换的字符串
 * @param {boolean} [upperCase=true] - 是否将首字母大写，默认为 true
 * @returns {string} - 转换后的驼峰命名法字符串
 */
function toCamelCase(str: string, upperCase = true) {
    // 检查输入是否为字符串，如果不是则返回空字符串
    if (typeof str !== 'string') {
        return '';
    }

    // 先将字符串中的大写字母前插入空格，方便后续处理
    let newStr = str.replace(/([a-z])([A-Z])/g, '$1 $2');
    // 使用正则表达式匹配所有非字母数字字符，并将其替换为空格
    let words = newStr.replace(/[^a-zA-Z0-9]+/g, ' ').split(' ');

    // 过滤掉空字符串
    words = words.filter(word => word !== '');

    // 处理每个单词，将首字母大写（除了第一个单词，根据 upperCase 参数决定）
    for (let i = 0; i < words.length; i++) {
        if (i === 0 && !upperCase) {
            words[i] = words[i].toLowerCase();
        } else {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
        }
    }

    // 将处理后的单词连接成一个字符串
    return words.join('');
}

export {
    toCamelCase
}