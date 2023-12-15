const timestamp = {
    get: () => {
        const _timestamp = new Date();
        
        let year = _timestamp.getFullYear();
        let month = _timestamp.getMonth() + 1;
        let day = _timestamp.getDate();

        if(month >= 1 && month <= 9 )
            month = '0' + month

        if(day >= 0 && day <= 9)
            day = '0' + day

        return [year, month, day].join('-');
    },
    getTimer: () => {
        const _timestamp = new Date();
        
        let year = _timestamp.getFullYear();
        let month = _timestamp.getMonth() + 1;
        let day = _timestamp.getDate();
        let hour = _timestamp.getHours();
        let minute = _timestamp.getMinutes();
        let second = _timestamp.getSeconds();
        
        if(month >= 1 && month <= 9 )
            month = '0' + month

        if(day >= 0 && day <= 9)
            day = '0' + day
        
        if(hour >= 0 && hour <= 9)
            hour = '0' + hour

        if(minute >= 0 && minute <= 9)
            minute = '0' + minute

        if(second >= 0 && second <= 9)
            second = '0' + second

        return `${[year, month, day].join('-')} ${[hour, minute, second].join(':')}`;
    },
    checkTime: (year, month, day) => {
        const checkTime = new Date(year, (month - 1), day).getDate() === day;
        
        if (!checkTime) return timestamp.checkTime(year, month, (day - 1));
        else return { year, month, day }
    }
}

export default timestamp;