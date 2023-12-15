const _ = require('lodash')
/**
 * 1. 確認分析的資料是 16 (一歲半) 還是 26 (二歲半)
 * 2. 只取出有 16 或是 26 開頭的 key 和 value
 * 3. 將用戶選擇的回答 value 進行分析
 *      。取出 2632 和 1630 這二題是 free play 所以分數和代號不同
 *      。其餘的題目依對應的代號給與分數
 */

/**
 * @description 挑選出需要被評分的題目。基本上只要 key 裡有 16 和 26 開頭的，就是測試題目
 */
const CleanData = (data) => {

}

/**
 * @description 計算分數
 */
const MappingScore = (key) => {
    const code_to_score = {
        "S": 2, 
        "S-D": 1.5, 
        "S-1": 1, 
        "LR": 2, 
        "LR-D": 1.5, 
        "LR-1": 1, 
        "LE": 2, 
        "LE-D": 1.5, 
        "LE-1": 1, 
        "C":2, 
        "C-D":1.5, 
        "C-1":1, 
        "FM": 2, 
        "FM-D": 1.5, 
        "FM-1": 1, 
        "SLE": 2, 
        "SLE-D": 1.5, 
        "SLE-1": 1, 
        "SLE only": 2,
        "O": 0,
        "跳題": 0
    }
    return code_to_score[key]
}

/**
 * @description 處理 free play
 */
const FreePlay = () => {

}

/**
 * @description 將代號轉成分數
 */
const ConverToScore = () => {

}

module.exports.calculate = ({data}) => {
    const tasks = _.chain(data)
        .keys()
        .map((d) => {
            if (_.startsWith(d, '16') || _.startsWith(d, '26')) return d
        })
        .compact()
        .value()

    const tasksScore = _.chain(tasks)
        .map((task) => {
            const taskValue = data[task]
            if (_.includes(taskValue, '（')) {
                const taskScore = _.chain(taskValue)
                    .split('（')
                    .last()
                    .split('）')
                    .head()
                    .split(',')
                    .map((value) => { return MappingScore(_.trim(value)) })
                    .value()
                return taskScore
            } else {
                const taskScore = _.chain(taskValue)
                    .split('(')
                    .last()
                    .split(')')
                    .head()
                    .split(',')
                    .map((value) => { return MappingScore(_.trim(value)) })
                    .value()
                return taskScore
            }
        })
        .flatMap()
        .sum()
        .value()
    return tasksScore
}