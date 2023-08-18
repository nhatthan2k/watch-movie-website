import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Styles from './VideoComponent.module.scss';
import classNames from 'classnames/bind';
import demovideo from '../../asset/video/demoVideo.mp4';
import screenfull from 'screenfull';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDownLeftAndUpRightToCenter,
    faPause,
    faPhotoFilm,
    faPlay,
    faUpRightAndDownLeftFromCenter,
    faVolumeHigh,
    faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(Styles);

function VideoComponent() {
    // Ref
    const targetRef = useRef(null);
    const playerRef = useRef(null);

    const [isplaying, setIsplaying] = useState(false);
    const [isMuted, setIsmuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isFullScreen, setIsfullScreen] = useState(true);
    const [islight, setIslight] = useState(false);

    // timeline Control
    const [isSeeking, setIsSeeking] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [durationTime, setDurationTime] = useState(0);

    // speed Control
    const [playbackRate, setPlaybackRate] = useState(1);
    const [showSpeedOption, setShowSpeedOption] = useState(false);

    const handleVolume = (e) => {
        setVolume(parseFloat(e.target.value));

        if (e.target.value == 0) {
            setIsmuted(true);
        } else {
            setIsmuted(false);
        }
    };

    // timeline control
    const handleDuration = (duration) => {
        setDurationTime(duration);
    };

    const handleProgress = (progress) => {
        setCurrentTime(progress.playedSeconds);
    };

    const handleClick = (e) => {
        const barWidth = e.target.offsetWidth;
        const clickPosition = e.pageX - e.target.offsetLeft;
        const seekPercentage = clickPosition / barWidth;
        const seekTime = durationTime * seekPercentage;
        playerRef.current.seekTo(seekTime);
    };

    const handleSeekMouseMove = (e) => {
        if (isSeeking && playerRef.current) {
            const barWidth = e.target.offsetWidth;
            const clickPosition = e.pageX - e.target.offsetLeft;
            const seekPercentage = clickPosition / barWidth;
            const seekTime = durationTime * seekPercentage;
            console.log(seekTime);
            playerRef.current.seekTo(seekTime);
        }
    };

    // speed option
    const handlePlaybackRateChange = (newRate) => {
        setPlaybackRate(newRate);
        setShowSpeedOption(false);
    };

    // PIP Mode
    const PIPMode = () => {
        const player = playerRef.current.getInternalPlayer(); // Lấy tham chiếu đến player

        if (document.pictureInPictureElement) {
            // Có một phần tử đang chạy trong chế độ Picture-in-Picture
            document.exitPictureInPicture();
            setIsplaying(false);
        } else {
            // Gọi requestPictureInPicture() trong ngữ cảnh sự kiện người dùng
            player.requestPictureInPicture();
        }
    };

    // chuyển đổi số giây sang số h:phút:giây
    const formatTime = (time) => {
        let seconds = Math.floor(time % 60),
            minutes = Math.floor(time / 60) % 60,
            hours = Math.floor(time / 3600);

        seconds = seconds < 10 ? `0${seconds}` : seconds;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        hours = hours < 10 ? `0${hours}` : hours;

        if (hours == 0) {
            return `${minutes}:${seconds}`;
        }
        return `${hours}:${minutes}:${seconds}`;
    };

    // fullscreen mode
    const handleFullscreen = () => {
        if (screenfull.isEnabled) {
            screenfull.request(targetRef.current);
            setIsfullScreen(false);
        }
    };

    const handleExitFullscreen = () => {
        if (screenfull.isEnabled) {
            screenfull.exit();
            setIsfullScreen(true);
        }
    };

    // light mode
    const handleLight = () => {
        setIsplaying(true);
        setIslight(true);
    };

    return (
        <div className={cx('playMovie')} ref={targetRef}>
            <ReactPlayer
                ref={playerRef}
                url={demovideo}
                controls={false}
                playing={isplaying}
                width={'100%'}
                height={'100%'}
                muted={isMuted}
                volume={volume}
                onDuration={handleDuration}
                onProgress={handleProgress}
                playbackRate={playbackRate}
                light={true}
                onClickPreview={handleLight}
            />
            {islight && (
                <div className={cx('Wapper')}>
                    {/* timeline */}
                    <div
                        className={cx('timeLine')}
                        onClick={handleClick}
                        onMouseLeave={() => setIsSeeking(false)}
                        onMouseDown={() => setIsSeeking(true)}
                        onMouseMove={handleSeekMouseMove}
                        onMouseUp={() => setIsSeeking(false)}
                    >
                        <div className={cx('progressArea')}>
                            <span style={{ left: `${(currentTime / durationTime) * 100}%` }}>
                                {formatTime(currentTime)}
                            </span>
                            <div
                                className={cx('progressBar')}
                                style={{ width: `${(currentTime / durationTime) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* navControl */}
                    <ul className={cx('controlVideo')}>
                        <li className={cx('leftControl')}>
                            <button className={cx('play')} onClick={() => setIsplaying(!isplaying)}>
                                {isplaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                            </button>
                            <button className={cx('volume')} onClick={() => setIsmuted(!isMuted)}>
                                {isMuted ? (
                                    <FontAwesomeIcon icon={faVolumeXmark} />
                                ) : (
                                    <FontAwesomeIcon icon={faVolumeHigh} />
                                )}
                            </button>
                            <input type="range" min="0" max="1" step="any" onChange={handleVolume} />
                            <div className={cx('videoTime')}>
                                <p>{formatTime(currentTime)}</p>
                                <p className={cx('separator')}> / </p>
                                <p>{formatTime(durationTime)}</p>
                            </div>
                        </li>

                        <li className={cx('rightControl')}>
                            <div className={cx('playbackContent')}>
                                <button
                                    className={cx('playback-speed')}
                                    onClick={() => setShowSpeedOption(!showSpeedOption)}
                                >
                                    <FontAwesomeIcon icon={faCirclePlay} />
                                </button>

                                <ul
                                    className={cx('speedOption')}
                                    style={showSpeedOption ? { display: 'block' } : { display: 'none' }}
                                >
                                    <li
                                        onClick={() => handlePlaybackRateChange(2)}
                                        className={playbackRate === 2 ? cx('active') : ''}
                                    >
                                        2x
                                    </li>
                                    <li
                                        onClick={() => handlePlaybackRateChange(1.5)}
                                        className={playbackRate === 1.5 ? cx('active') : ''}
                                    >
                                        1.5x
                                    </li>
                                    <li
                                        onClick={() => handlePlaybackRateChange(1)}
                                        className={playbackRate === 1 ? cx('active') : ''}
                                    >
                                        Normal
                                    </li>
                                    <li
                                        onClick={() => handlePlaybackRateChange(0.75)}
                                        className={playbackRate === 0.75 ? cx('active') : ''}
                                    >
                                        0.75x
                                    </li>
                                    <li
                                        onClick={() => handlePlaybackRateChange(0.5)}
                                        className={playbackRate === 0.5 ? cx('active') : ''}
                                    >
                                        0.5x
                                    </li>
                                </ul>
                            </div>
                            <button className={cx('pic-in-pic')} onClick={PIPMode}>
                                <FontAwesomeIcon icon={faPhotoFilm} />
                            </button>
                            <button className={cx('fullscreen')}>
                                {isFullScreen ? (
                                    <button onClick={handleFullscreen}>
                                        <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
                                    </button>
                                ) : (
                                    <button onClick={handleExitFullscreen}>
                                        <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} />
                                    </button>
                                )}
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default VideoComponent;
