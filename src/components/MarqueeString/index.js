import * as React from 'react';

import styles from './MarqueeString.module.css'
import {useEffect, useRef, useState} from "react";

export const MarqueeString = ({items = [], nextItemCB = undefined, insertItemCB = undefined}) => {

    const intervalRef = useRef(null);

    const [nextItem, setNextItem] = useState(0)

    const itemsRef = useRef([]);

    const marqueeWrapperRef = useRef(null);

    useEffect(() => {
        getNextElement()
        setTimeout(() => {
            intervalRef.current = setInterval(runLoop, 40)
        }, 100)
    }, [])

    const getNextElement = () => {
        for (let i = 0; i < itemsRef.current.length; i++) {
            if (itemsRef.current[i].offsetLeft > (marqueeWrapperRef.current.offsetWidth + marqueeWrapperRef.current.scrollLeft)) {
                setNextItem(i)
                break;
            }
        }
        if((itemsRef.current[itemsRef.current.length - 1].offsetLeft) < (marqueeWrapperRef.current.offsetWidth + marqueeWrapperRef.current.scrollLeft)) {
            if (insertItemCB !== undefined) {
                insertItemCB()
            }
        }
    }

    useEffect(() => {
        if (nextItemCB !== undefined) {
            nextItemCB(nextItem)
        }
    }, [nextItem])

    const runLoop = () => {
        if (!marqueeWrapperRef.current) {
            clearInterval(intervalRef.current)
            return;
        }
        marqueeWrapperRef.current.scrollLeft += 2
        getNextElement()
    }

    return (
        <div className={styles.marqueeWrapper} ref={marqueeWrapperRef}>
            {
                items.map((item, index) => (<div ref={el => itemsRef.current[index] = el} key={index} className={styles.marquee}>{item}?</div>))
            }
        </div>
    )
}
