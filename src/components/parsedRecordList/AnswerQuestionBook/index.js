import * as React from 'react';
import {useRef, useState} from 'react';
import ReactHowler from "react-howler";
import {StartBtn, StopBtn} from "../../btns";

export const AnswerQuestionBook = ({item = {}, i = 0}) => {

    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false)

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTrackSrc, setCurrentTrackSrc] = useState('');

    const onClickPlayButton = () => {
        if (item.responseAudio[currentTrackIndex]) {
            setCurrentTrackSrc(`${item.responseAudio[currentTrackIndex]}`);
            setCurrentTrackIndex(currentTrackIndex + 1);
            setIsPlaying(true)
        }
    }

    const onEndPlaying = () => {
        if (item.responseAudio[currentTrackIndex]) {
            setCurrentTrackSrc(item.responseAudio[currentTrackIndex]);
            setCurrentTrackIndex(currentTrackIndex + 1);
            setIsPlaying(true)
        } else {
            setCurrentTrackIndex(0);
            setIsPlaying(false)
        }
    }

    const onClickStopButton = () => {
        setIsPlaying(false);
        setCurrentTrackIndex(0);
        audioRef.current.stop();
    }

    return (
        <div className="questions__item">
            <div className="questions__item-descr questions__item-descr--text-end">
                <div className="questions__item-title">
                    {item.question} ?
                </div>
                <div className="questions__item-subtitile">
                    {item.answer}
                </div>
                {
                    item.responseAudio.length > 0
                    && (<div>
                        {
                            !isPlaying
                                ? <StartBtn onClick={onClickPlayButton} label=""/>
                                : <StopBtn onClick={onClickStopButton} label=""/>
                        }

                    </div>)
                }
                {
                    currentTrackSrc &&
                    <ReactHowler
                        src={currentTrackSrc}
                        ref={audioRef}
                        html5={true}
                        onEnd={onEndPlaying}
                        playing={isPlaying}
                    />
                }
            </div>
        </div>
    );
};
