'use client'

import { useEffect, useState } from 'react'

export default function HeroVideo() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {/* 占位背景 - 视频加载前显示 */}
      <div className="absolute inset-0 bg-gradient-to-br from-sand via-cream to-taupe" />

      {/* 视频背景 - 只在客户端挂载后渲染 */}
      {mounted && (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          {/* 视频遮罩层 - 让文字更易读 */}
          <div className="absolute inset-0 bg-black/20" />
        </>
      )}
    </>
  )
}
