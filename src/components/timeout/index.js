import { useEffect, useState } from 'react';

export function Timeout(props) {
    const {
        timeout,
        onEnd,
    } = props;
    const [timer, setTimer] = useState(undefined);

    useEffect(() => {
        const leftTime = getLeftTime();
        const intervalId = setTimeout(() => calculate(), leftTime > 1000 ? 1000 : leftTime);

        if (leftTime < 0) {
            clearTimeout(intervalId);
        }

        return () => clearTimeout(intervalId);
    });

    const getLeftTime = () => timeout - Date.now();

    const calculate = () => {
        const leftTime = getLeftTime();

        if (leftTime < 0) {
            onEnd();
        }

        const leftSeconds = Math.round(leftTime/1000);
        const leftSecondsView = (leftSeconds % 60).toString().padStart(2, '0');
        const leftMinutesView = Math.round((leftSeconds - leftSecondsView) / 60).toString().padStart(2, '0');

        setTimer([leftMinutesView, leftSecondsView].join(':'))
    }

    return (<div>{timer}</div>);
}
