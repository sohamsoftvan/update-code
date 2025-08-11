export const VideoToFramesMethod = {
    fps: "fps",
    totalFrames: "totalFrames",
};

export default class VideoToFramesNew {
    static getFrames(videoUrl, amount, type = VideoToFramesMethod.fps) {
        return new Promise((resolve, reject) => {
            const frames = []
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            const video = document.createElement("video");
            video.preload = "auto";

            video.addEventListener("loadeddata", async () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const duration = video.duration;
                const totalFrames = type === VideoToFramesMethod.fps ? duration * amount : amount;

                for (let time = 0; time < duration; time += duration / totalFrames) {
                    frames.push(await VideoToFramesNew.getVideoFrame(video, context, canvas, time));
                }
                resolve(frames);
            });
            video.src = videoUrl;
            video.load();
        });
    }

    static getVideoFrame(video, context, canvas, time) {
        return new Promise((resolve) => {
            video.addEventListener("seeked", function eventCallback() {
                video.removeEventListener("seeked", eventCallback);
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                resolve(canvas.toDataURL());
            });
            video.currentTime = time;
        });
    }
}