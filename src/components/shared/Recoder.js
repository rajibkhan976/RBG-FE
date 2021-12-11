import React, { useState, useEffect } from "react";
import { AudioServices } from "../../services/template/AudioServices";
import Player from "./Player";

import record_mic_icon from "../../assets/images/record_mic_icon.svg";
import play_icon from "../../assets/images/play_icon.svg";
import pause_icon from "../../assets/images/pause_icon.svg";

const initialState = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  isPaused: false,
  mediaStream: null,
  mediaRecorder: null,
  blob: null,
  audioURL: null,
  audioElement: null,
};

const Recoder = (props) => {
  const [recorderState, setRecorderState] = useState(initialState);

  let chunks = [];
  let blob = null;
  let initOptions = { mimeType: "audio/wav1" };
  const [options, setOptions] = useState(initOptions);
  let audioExtension = ".wav";

  //Timer
  useEffect(() => {
    let MAX_RECORDER_TIME = 5;
    let recordingInterval = null;

    if (recorderState.initRecording)
      recordingInterval = setInterval(() => {
        setRecorderState((prevState) => {
          if (
            prevState.recordingMinutes === MAX_RECORDER_TIME &&
            prevState.recordingSeconds === 0
          ) {
            clearInterval(recordingInterval);
            return prevState;
          }

          if (
            prevState.recordingSeconds >= 0 &&
            prevState.recordingSeconds < 59
          )
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1,
            };

          if (prevState.recordingSeconds === 59)
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes + 1,
              recordingSeconds: 0,
            };
        });
      }, 1000);
    else clearInterval(recordingInterval);

    return () => clearInterval(recordingInterval);
  });

  // Stop recording on limit exceed
  useEffect(()=>{    
    let currentRecordedTime = (recorderState.recordingMinutes * 60) + recorderState.recordingSeconds;
    if (props.maxRecordingSec && currentRecordedTime >= props.maxRecordingSec) {
      recorderState.mediaRecorder.stop();
    } 
  }, [recorderState.recordingSeconds])

  //Recoder events
  useEffect(() => {
    if (recorderState.mediaRecorder && recorderState.mediaRecorder.state === 'inactive') {
      recorderState.mediaRecorder.start(10);

      recorderState.mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };

      recorderState.mediaRecorder.onerror = function (error) {
        console.log("Error: ", error);
      };

      recorderState.mediaRecorder.onstart = function () {
        console.log("Started & state = " + recorderState.mediaRecorder.state);
      };

      recorderState.mediaRecorder.onstop = function () {
        console.log("Stopped  & state = " + recorderState.mediaRecorder.state);
        console.log("mim", options.mimeType)
        blob = new Blob(chunks, { type: options.mimeType });
        chunks = [];

        let audioURL = window.URL.createObjectURL(blob);
        // let audioURL = 'https://file-examples-com.github.io/uploads/2017/11/file_example_WAV_1MG.wav';
        let audioElement = new Audio(audioURL);
        audioElement.currentTime = 24*60*60;
        console.log("audioElement", audioElement)
        // console.log('audio blob', blob);
        //Update audio blob url
        setRecorderState({
          ...initialState,
          initRecording: false,
          blob: blob,
          audioURL: audioURL,
          audioElement: audioElement,
        });
        
        //Send blob to audio create modal
        broadcastToParent(blob);
      };

      recorderState.mediaRecorder.onpause = function () {
        console.log("Paused & state = " + recorderState.mediaRecorder.state);
      };

      recorderState.mediaRecorder.onresume = function () {
        console.log("Resumed  & state = " + recorderState.mediaRecorder.state);
      };

      recorderState.mediaRecorder.onwarning = function (warning) {
        console.log("Warning: " + warning);
      };
    }
  }, [recorderState.mediaRecorder]);

  //Start recording
  const startRecording = (e) => {
    e.preventDefault();
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    if (typeof MediaRecorder === "undefined" || !navigator.getUserMedia) {
      console.log(
        "MediaRecorder not supported on your browser, use latest browser version instead."
      );
    } else {
      navigator.getUserMedia(
        { audio: true },
        startRecordingCallback,
        errorCallback
      );
    }
    console.log(
      "Start recording",
      typeof MediaRecorder,
      navigator.mediaDevices.getUserMedia
    );
  };

  const getMimType = () => {

  }

  //Recoder call back
  const startRecordingCallback = (stream) => {
    // let options, audioExtension;
    console.log("Start recording callback...");
    setRecorderState({
      ...initialState,
      initRecording: true,
    });

    if (typeof MediaRecorder.isTypeSupported === "function") {
      if (MediaRecorder.isTypeSupported("audio/wav")) {
        options.mimeType = "audio/wav";;
        audioExtension = ".wav";
      } else if (MediaRecorder.isTypeSupported("audio/mp3")) {
        options.mimeType =  "audio/mp3" ;
        audioExtension = ".mp3";
      } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
        options.mimeType = "audio/mp4";
        audioExtension = ".mp4";
      } else if (MediaRecorder.isTypeSupported("audio/mpeg")) {
        options.mimeType = "audio/mpeg";
        audioExtension = ".mpg";
      } else if (MediaRecorder.isTypeSupported("audio/aac")) {
        options.mimeType = "audio/aac";
        audioExtension = ".aac";
      } else if (MediaRecorder.isTypeSupported("audio/webm")) {
        options.mimeType = "audio/webm";
        audioExtension = ".webm";
      } else if (MediaRecorder.isTypeSupported("audio/ogg")) {
        options.mimeType = "audio/ogg";
        audioExtension = ".ogg";
      }
      setOptions((prevState) => {
        return {
          ...options
        }
      });
      console.log("Using " + options.mimeType);
      setRecorderState((prevState) => {
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(stream, options),
        };
      });
    } else {
      console.log("Using default codecs for browser");
      setRecorderState((prevState) => {
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(stream),
        };
      });
    }
  };

  //Error call back
  const errorCallback = (error) => {
    console.log("navigator.mediaDevices.getUserMedia error: ", error);
    if (error.name == "NotFoundError") {
      console.log("Make sure microphone is plugged in!");
    }
  };

  const pauseResumeRecording = (e) => {
    e.preventDefault();
    console.log("mim on pause", options)
    if (recorderState.initRecording) {
      recorderState.mediaRecorder.pause();
      console.log("Pause recording", recorderState.initRecording);
    } else {
      recorderState.mediaRecorder.resume();
      console.log("Resume recording", recorderState.initRecording);
    }
    setRecorderState({
      ...initialState,
      initRecording: !recorderState.initRecording,
      recordingMinutes: recorderState.recordingMinutes,
      recordingSeconds: recorderState.recordingSeconds,
      mediaRecorder: recorderState.mediaRecorder,
    });
    console.log("recorderState.mediaRecorder", recorderState.mediaRecorder)
  };

  const stopRecording = (e) => {
    e.preventDefault();
    recorderState.mediaRecorder.stop();
    console.log("Stop recording");
  };

  const saveRecording = () => {
    if (recorderState.blob) {
      console.log("save recording", recorderState.blob);
      let now = new Date().getTime();
      let reader = new FileReader();
      reader.onload = (r) => {
        /**
         * Make axios call
         */
        AudioServices.fileUpload({
          file: r.target.result,
          name: now + audioExtension,
        })
          .then((result) => {
            console.log("Recording: ", result);
            setSuccessMsg("Audio file uploaded successfully");
          })
          .catch((err) => {
            console.log("Recording error", err);
          });
      };
      reader.readAsDataURL(recorderState.blob);
    }
  };

  /**
   * Auto hide success or error message
   */
  const [successMsg, setSuccessMsg] = useState("");
  const messageDelay = 5000; // ms
  useEffect(() => {
    if (successMsg)
      setTimeout(() => {
        setSuccessMsg("");
      }, messageDelay);
    // if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
  }, [successMsg]);

  /**
   * Get recoder delete status
   * @param {*} isRecordingDeleted
   */
  const getDataFn = (isRecordingDeleted) => {
    console.log('data from player', isRecordingDeleted);
    if (isRecordingDeleted) {
      setRecorderState(initialState);
    }
  }

  /**
   * Send the data to parent component
   * @param {*} data
   */
   const broadcastToParent = (data) => {
    props.getData(data);
  };

  return (
    <React.Fragment>

      {recorderState.audioElement ? (
        <Player
          getData={getDataFn}
          audioElement={recorderState.audioElement}
        />
      ) : (
        <div className="global-recoder">
          <div className="microphone">
            <button
              className={
                recorderState.initRecording || (recorderState.mediaRecorder && recorderState.mediaRecorder.state === 'paused') ? "micButton disabled" : "micButton"
              }
              disabled={recorderState.initRecording || recorderState.mediaRecorder && recorderState.mediaRecorder.state === 'paused'}
              onClick={startRecording}
            >
              <img src={record_mic_icon} alt="" />
            </button>
          </div>
          {/* <h3>Recoder Audio</h3> */}
          {successMsg && (
            <div className="popupMessage success innerDrawerMessage">
              <p>{successMsg}</p>
            </div>
          )}
          <div className="playerBody">
            <div className="recordingTime">
              <span className="time">
                {recorderState.recordingMinutes +
                  ":" +
                  recorderState.recordingSeconds}
              </span>
              <span>Seconds</span>
              {recorderState.mediaRecorder ? <span className={recorderState.mediaRecorder.state === 'recording' ? "recordingBlinker" : ""}></span> : ""}
            </div>
            <div className="playerControl">
              <button
                className={recorderState.mediaRecorder ? "playerBtn" : "playerBtn disabled"}
                disabled={!recorderState.mediaRecorder}
                onClick={pauseResumeRecording}
              >
                {recorderState.mediaRecorder &&
                  recorderState.mediaRecorder.state === "paused"
                  ? <img src={play_icon} alt="" />
                  : <img src={pause_icon} alt="" />}
              </button>
              <button
                onClick={stopRecording}
                disabled={!recorderState.initRecording}
                className={recorderState.initRecording ? "playerBtn stopRecord" : "playerBtn stopRecord disabled"}
              ></button>
              {/* <button
              onClick={saveRecording}
              disabled={!recorderState.audioElement}
            >
              Save audio
            </button> */}
            </div>
          </div>
        </div>
      )}
      {/* <input type="file" onChange={(e) => handleAudioUpload(e)} /> */}
    </React.Fragment>
  );
};

export default Recoder;
