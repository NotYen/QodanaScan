const calculate = {
    age: birthday => {
        const current = new Date();
        const today = {
            year: current.getFullYear(),
            month: current.getMonth() + 1,
            date: current.getDate()
        }

        const difference = {
            year: today.year - birthday[0],
            month: today.month - birthday[1],
            date: today.date - birthday[2]
        }
        
        if (difference.date < 0) {
            const upper = new Date(today.year, today.month, 0);

            difference.month -= 1;
            difference.date += upper.getDate();
        }

        if (difference.month < 0) {
            const upper = new Date(today.year, today.month, 0);

            difference.year -= 1;
            difference.month += 12;
        }

        return { age: difference.year, month: difference.month, day: difference.date };
    }
};

export default calculate;