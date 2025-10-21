
import QRCode from 'react-qr-code'

type Props = {
  url: string
}

export default function QRCard({ url }: Props) {
  const downloadPng = () => {
    const svg = document.querySelector('#qr-svg') as SVGSVGElement | null
    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      const a = document.createElement('a')
      a.download = 'loopcard-qr.png'
      a.href = canvas.toDataURL('image/png')
      a.click()
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  return (
    <div className="card flex flex-col items-center gap-3">
      <div className="bg-white p-3 rounded-2xl border">
        <QRCode id="qr-svg" value={url} size={180} />
      </div>
      <button className="btn btn-primary w-full" onClick={downloadPng}>
        Download QR
      </button>
    </div>
  )
}
