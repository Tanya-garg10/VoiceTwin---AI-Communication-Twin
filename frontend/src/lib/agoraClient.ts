import AgoraRTC, {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  IRemoteAudioTrack
} from 'agora-rtc-sdk-ng'

export interface AgoraVoiceState {
  isConnected: boolean
  isPublishing: boolean
  channelName: string
  volumeLevel: number
  agentVolumeLevel: number
  error: string | null
}

export class AgoraVoiceEngine {
  private client: IAgoraRTCClient | null = null
  private localAudioTrack: IMicrophoneAudioTrack | null = null
  private remoteAudioTrack: IRemoteAudioTrack | null = null
  private volumeCallback: ((volume: number, isAgent: boolean) => void) | null = null

  public isConnected = false

  constructor() {
    // AgoraRTC config
    AgoraRTC.setLogLevel(3) // Warning level
  }

  public async initClient(
    appId: string,
    channel: string,
    token: string | null,
    uid: number = 0,
    onVolume?: (volume: number, isAgent: boolean) => void
  ): Promise<boolean> {
    try {
      this.volumeCallback = onVolume || null
      this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })

      // Setup audio volume indicators for wave animation
      this.client.enableAudioVolumeIndicator()
      this.client.on('volume-indicator', (volumes) => {
        volumes.forEach((vol) => {
          if (vol.uid === 0 || vol.uid === uid) {
            // Local user volume
            if (this.volumeCallback) this.volumeCallback(vol.level, false)
          } else {
            // Remote agent volume
            if (this.volumeCallback) this.volumeCallback(vol.level, true)
          }
        })
      })

      // Listen for remote audio track from AI Agent
      this.client.on('user-published', async (user, mediaType) => {
        await this.client?.subscribe(user, mediaType)
        if (mediaType === 'audio') {
          this.remoteAudioTrack = user.audioTrack || null
          this.remoteAudioTrack?.play()
        }
      })

      this.client.on('user-unpublished', (user, mediaType) => {
        if (mediaType === 'audio') {
          this.remoteAudioTrack?.stop()
          this.remoteAudioTrack = null
        }
      })

      // Join Agora RTC channel
      await this.client.join(appId, channel, token, uid)

      // Create and publish local mic track
      this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack()
      await this.client.publish(this.localAudioTrack)

      this.isConnected = true
      return true
    } catch (err: any) {
      console.error('Agora RTC Initialization error:', err)
      this.isConnected = false
      return false
    }
  }

  public setMute(mute: boolean) {
    if (this.localAudioTrack) {
      this.localAudioTrack.setMuted(mute)
    }
  }

  public async leave() {
    try {
      if (this.localAudioTrack) {
        this.localAudioTrack.stop()
        this.localAudioTrack.close()
        this.localAudioTrack = null
      }
      if (this.remoteAudioTrack) {
        this.remoteAudioTrack.stop()
        this.remoteAudioTrack = null
      }
      if (this.client) {
        await this.client.leave()
        this.client.removeAllListeners()
        this.client = null
      }
      this.isConnected = false
    } catch (err) {
      console.error('Error leaving Agora channel:', err)
    }
  }
}
