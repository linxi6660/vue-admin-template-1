export default class CameraService {
    constructor() {
      // 远程摄像头 API 的 URL
      this.url = '192.168.200.143:81/stream';
    }
  
    // 获取视频流
    async getStream() {
      try {
        const response = await fetch(this.url);
        const stream = await response.blob();
        return stream;
      } catch (error) {
        console.error(error);
      }
    }
  }