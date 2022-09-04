import { useLayoutEffect, useRef } from "react";
import { Audio } from "expo-av";
import type { AVPlaybackSource, AVPlaybackStatusToSet } from "expo-av";
type Params = {
  source: AVPlaybackSource;
  shouldPlay?: boolean;
  volume?: number;
};

export function useAudio({ source, shouldPlay, volume }: Params) {
  const audio = useRef<Audio.Sound>();
  const renders = useRef(0);

  renders.current += 1;
  const playBackStatus = useRef<AVPlaybackStatusToSet>();
  useLayoutEffect(() => {
    async function mountAudio() {
      const { sound } = await Audio.Sound.createAsync(source, {
        shouldPlay,
        volume,
      });
      sound.setOnPlaybackStatusUpdate(onPlayBackStatus);
      audio.current = sound;
    }
    mountAudio();

    return () => {
      audio.current?.unloadAsync();
    };
  }, []);

  async function onPlayBackStatus(status: AVPlaybackStatusToSet) {
    playBackStatus.current = status;
  }

  async function play() {
    await audio.current?.playFromPositionAsync(0);
  }
  async function pause() {
    await audio.current?.pauseAsync();
  }
  return {
    play,
    pause,
  };
}
