'use client';

import { useCallback, useEffect, useState } from "react";
import styles from './stream.module.scss';

export default function Page() {

  const [stream, setStream] = useState<MediaStream>();
  const [devices, setDevices] = useState<MediaDeviceInfo[]>();

  const updateDevices = useCallback(() => {
    ;(async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setDevices(devices)
    })();
  }, []);
  
  useEffect(() => {
    navigator.mediaDevices.addEventListener('devicechange', updateDevices)
    
    ;(async () => {
      const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
      setStream(stream);

      updateDevices();
    })();

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', updateDevices);
    }
  } ,[updateDevices]);


  return (
    <div className={styles.stream}>

    </div>
  )
}