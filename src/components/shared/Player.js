import React, { useState, useEffect, useRef } from 'react';
import { utils } from "../../helpers";

import speaker_icon from "../../assets/images/speaker_icon.svg";
import mute_icon from "../../assets/images/mute_icon.svg";
import play_icon from "../../assets/images/play_icon.svg";
import pause_icon from "../../assets/images/pause_icon.svg";
import delete_icon_grey from "../../assets/images/delete_icon_grey.svg";

const initialState = {
    isPaused: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    muted: false,
    progressBar: 0,
    volumePercentage: 100,
    isDisplayDelete: true,
    trackName: null 
};

const Player = (props) => {
    const [playerState, setPlayerState] = useState(initialState);
    const progressBarRef = useRef();
    const volumeSliderRef = useRef();

    //Handle audio element events
    useEffect(() => {
        if (props.audioElement) {

            props.audioElement.addEventListener('loadedmetadata', () => {
                let duration = props.audioElement.duration;
                let currentTime = props.audioElement.currentTime;
                console.log('loadedmetadata duration', duration);
                // The duration variable now holds the duration (in seconds) of the audio clip
                setPlayerState((prevState) => {
                    return {
                        ...prevState,
                        currentTime: utils.formatSecondsAsTime(currentTime),
                        duration: utils.formatSecondsAsTime(duration)
                    };
                });
            });
            props.audioElement.addEventListener('timeupdate', (event) => {
                // console.log('event', event);
                const currentTime = Math.floor(props.audioElement.currentTime).toString();
                const duration = Math.floor(props.audioElement.duration).toString();
                // console.log('curr', formatSecondsAsTime(currentTime), 'du', formatSecondsAsTime(duration))
                setPlayerState((prevState) => {
                    return {
                        ...prevState,
                        currentTime: utils.formatSecondsAsTime(currentTime),
                        duration: utils.formatSecondsAsTime(duration),
                        progressBar: props.audioElement.currentTime / props.audioElement.duration.toFixed(3) * 100
                    };
                });
            }, false);
        }
    }, [props.audioElement])

    //Display delete use effect
    useEffect(() => {
        console.log('DD', props)
        if(props.preview){
            setPlayerState((prevState) => {
                return {
                    ...prevState,
                    trackName: props.trackName,
                    isDisplayDelete : false
                };
            });
        }
    }, [props.preview])

    //Display delete use effect
    useEffect(() => {
        console.log('TT', props.trackName)
        if(props.trackName){
            setPlayerState((prevState) => {
                return {
                    ...prevState,
                    trackName: props.trackName
                };
            });
        }
    }, [props.trackName])

    /**
     * Play and pause audio
     */
    const playPauseRecording = (e) => {
        e.preventDefault();
        if (props.audioElement) {
            console.log('play recording');

            console.log('paused', props.audioElement.paused);
            if (!props.audioElement.paused) {
                props.audioElement.pause();
            } else {
                props.audioElement.loop = true;
                props.audioElement.play();
            }

            console.log('src', props.audioElement.src)
            console.log('duration', props.audioElement.duration)
            console.log('currentTime', props.audioElement.currentTime)
            console.log('volume', props.audioElement.volume)
            console.log('muted', props.audioElement.muted)

            //Update player state
            setPlayerState((prevState) => {
                return {
                    ...prevState,
                    isPaused: !prevState.isPaused,
                    currentTime: props.audioElement.currentTime > 0 ? utils.formatSecondsAsTime(props.audioElement.currentTime) : utils.formatSecondsAsTime(0),
                    duration: props.audioElement.duration > 0 ? props.audioElement.duration : 0,
                    volume: props.audioElement.volume,
                    muted: props.audioElement.muted
                };
            });
        }

    }

    /**
     * Progess bar slider
     * @param {*} e 
     */
    const onProgressClick = (e) => {
        if (props.audioElement) {
            let timeline = progressBarRef.current;

            timeline.addEventListener("click", e => {
                let timelineWidth = window.getComputedStyle(timeline).width;
                let timeToSeek = e.offsetX / parseInt(timelineWidth) * props.audioElement.duration;
                props.audioElement.currentTime = timeToSeek;
            }, false);
        }

    }

    const onVolumeClick = (e) => {
        e.preventDefault();
        // console.log('Event', e);
        //click volume slider to change volume
        const volumeSlider = volumeSliderRef.current;
        volumeSlider.addEventListener('click', e => {
            const sliderWidth = window.getComputedStyle(volumeSlider).width;
            const newVolume = e.offsetX / parseInt(sliderWidth);
            console.log('new vol', newVolume)
            props.audioElement.volume = newVolume;
            setPlayerState((prevState) => {
                return {
                    ...prevState,
                    volumePercentage: newVolume * 100
                };
            });

        }, false)
        // volumeslider.addEventListener("mousemove", setvolume);
    }

    // Speaker mute and unmute
    const onSpeakeClick = (e) => {
        e.preventDefault();
        console.log('mute', playerState.muted);
        props.audioElement.muted = !playerState.muted
        setPlayerState((prevState) => {
            return {
                ...prevState,
                muted: !playerState.muted
            };
        });
    }

    //Delete recording
    const deleteRecording = (e) => {
        e.preventDefault();
        console.log('delete recording blob');
        //Send data to recorder component
        broadcastToRecoder(true);
    }

    /**
     * Send the data to parent component
     * @param {*} data
     */
    const broadcastToRecoder = (data) => {
        props.getData(data);
    };


    return (
        <React.Fragment>
            <div className={playerState.isDisplayDelete ? "audio-player" : "audio-player player"}>
                <div className="volume">
                    <button className="volumeButton" onClick={(e) => onSpeakeClick(e)}>
                        <img src={playerState.muted ? mute_icon : speaker_icon} alt="" />
                    </button>
                    <div className="progress hide">
                        {/* Speaker */}
                        <span className="start"></span>
                        <div className="progress-bar" ref={volumeSliderRef}>
                            <div className="now" onClick={(e) => onVolumeClick(e)} style={{ width: playerState.volumePercentage + '%' }}></div>
                        </div>
                        <span className="end"></span>
                    </div>
                </div>
                <div className="playerBody">
                    <div className="progress">
                        {/* Progress */}
                        <p className="trackName"> {playerState.trackName}</p>
                        <div className="progress-bar" ref={progressBarRef}>
                            <div className="now" onClick={(e) => onProgressClick(e)} style={{ width: playerState.progressBar + '%' }}></div>
                        </div>
                        <div className="audioDuration">
                            <span className="start">{playerState.currentTime}</span>
                            <span className="end">{playerState.duration}</span>
                        </div>
                    </div>
                    <div className="playerControl">
                        <button onClick={(e) => playPauseRecording(e)} className="playerBtn">
                            <img src={playerState.isPaused ? pause_icon : play_icon} alt="" />
                        </button>
                        {playerState.isDisplayDelete ?
                            <button className="playerBtn deleteAudio" onClick={(e) => deleteRecording(e)}>
                                <img src={delete_icon_grey} alt="" />
                            </button>
                            : ''
                        }

                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default Player;