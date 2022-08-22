import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";

export function ThumbsDefault({files = []}) {

    const {t} = useTranslation();

    return (<Fragment>
        {
            files.length ? (
                <aside className="thumbs-container">
                    {files.map(file => (<div className='thumb' key={file.name}>
                        <div className='thumb-inner'>
                            <img
                                src={file.preview}
                                alt=""
                                role="presentation"
                                onLoad={() => {
                                    URL.revokeObjectURL(file.preview)
                                }}
                            />
                        </div>
                    </div>))}
                </aside>
            ) : (
                <Fragment>
                    <p>{t('UseDragNDropInformationTitle')}</p>
                    <em>({t('DragNDropAcceptFilesJpegPng')})</em>
                </Fragment>
            )
        }
    </Fragment>);
}
