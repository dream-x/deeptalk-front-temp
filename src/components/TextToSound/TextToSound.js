import {Fragment, useState} from "react";
import {Icons} from "../../Constants";
import {API} from "../../api";
import {CircleButton} from "../btns";
import ReactHowler from "react-howler";

export const TextToSound = ({description = "", endedCB = null}) => {

    const [audioSrc, setAudioSrc] = useState('');

    const [isBlockPlay, setIsBlockPlay] = useState(false);
    const [isPlayed, setIsPlayed] = useState(false);

    const clickPlay = () => {
        console.log('clickPlay')
        //Получаем дорожку по текущему вопросу
        API.convertTextToSound(description).then(({data, headers}) => {
            if (!data) {
                setIsBlockPlay(true);
                //Вывести ошибку!
                console.error('Не удалось получить файл с сервера!')
                return;
            }

            const fileName = headers['content-disposition'].replace('inline; filename=', '');
            setAudioSrc(`https://test-deeptalk.cdo-global.ru/api/static/${fileName}`)
            setIsPlayed(true);
        });
    }

    const clickPause = () => {
        setIsPlayed(false);
    }

    const endPlay = () => {
        setIsPlayed(false);
        if (endedCB) {
            endedCB();
        }
    }

    const buttonPlay = {
        label: 'RunQuestionButtonLabel',
        icon: Icons.ICON_PLAY,
        hide: isPlayed,
        disabled: isBlockPlay,
        onClick: clickPlay
    };

    const buttonPause = {
        label: 'StopQuestionButtonLabel',
        icon: Icons.ICON_STOP,
        hide: !isPlayed,
        disabled: false,
        onClick: clickPause
    };

    return (
        <Fragment>
            {
                audioSrc &&
                <ReactHowler
                    src={audioSrc}
                    playing={isPlayed}
                    onEnd={endPlay}
                />
            }
            <CircleButton button={buttonPlay}/>
            <CircleButton button={buttonPause}/>
        </Fragment>
    );
}
