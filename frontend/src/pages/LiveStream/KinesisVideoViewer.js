import React, { Component } from "react";
import AWS from "aws-sdk";

class KinesisVideoViewer extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const accessKeyId = 'AKIAQVY7NV32G734VFPX';
    const secretAccessKey = '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';
    const region = 'ap-northeast-2';
    const streamName = 'juchapika-stream';
    const sessionToken = null;
    // Configure AWS SDK
    AWS.config.update({
      accessKeyId,
      secretAccessKey,
      sessionToken,
      region
    });

    // Create KinesisVideo client
    const kinesisVideo = new AWS.KinesisVideo({
      apiVersion: "2017-09-30",
    });

    // Get endpoint for the stream
    kinesisVideo.getDataEndpoint(
      {
        StreamName: streamName,
        APIName: "GET_HLS_STREAMING_SESSION_URL",
      },
      (err, data) => {
        if (err) {
          console.error("Error getting data endpoint", err);
        } else {
          const hlsUrl = data.DataEndpoint;
          this.setupHlsPlayer(hlsUrl);
        }
      }
    );
  }

  setupHlsPlayer(hlsUrl) {
    // Import hls.js only when needed
    import("hls.js").then((Hls) => {
      if (Hls.default.isSupported()) {
        const hls = new Hls.default();
        hls.loadSource(hlsUrl);
        hls.attachMedia(this.videoRef.current);
        hls.on(Hls.default.Events.MANIFEST_PARSED, () => {
          this.videoRef.current.play();
        });
      } else if (this.videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        this.videoRef.current.src = hlsUrl;
        this.videoRef.current.addEventListener("loadedmetadata", () => {
          this.videoRef.current.play();
        });
      }
    });
  }

  render() {
    return (
      <div>
        <video ref={this.videoRef} width="100%" height="100%" controls autoPlay />
      </div>
    );
  }
}

export default KinesisVideoViewer;
