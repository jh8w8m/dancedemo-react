import React, { FC, useRef, VideoHTMLAttributes } from 'react';
import ReactDOM from 'react-dom';
import './Video.scss'

interface BaseVideoProps {
    myProps?: string,
}

type VideoProps = BaseVideoProps & VideoHTMLAttributes<HTMLElement>;


const Video: FC<VideoProps> = (props) => {
    const {
        src,
        autoPlay,
        loop,
        ...restProps
    } = props;

    let videoRef = useRef<HTMLVideoElement>(null)

    const handleClick = () => {
        let video = videoRef.current as HTMLVideoElement;
        if(video.paused) {
            video.play();
            console.log("play")
        }
        else {
            video.pause();
            console.log("pause")
        }
    }    

    return (
        <>
            <video
                src={src}
                autoPlay={autoPlay}
                loop={loop}
                className="innerVideo" 
                ref={videoRef}
                {...restProps}
            >
                您的浏览器不支持这个视频！
            </video>
            <button className="videoButton" onClick={handleClick}>播放</button>
            <div className="judgeArea"></div>
        </>
    )
}

export default Video;