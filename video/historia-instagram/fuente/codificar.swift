// Arma un MP4 H.264 a partir de una carpeta de cuadros PNG.
//   codificar <carpeta> <salida.mp4> <fps> <bitrate>
import AVFoundation
import CoreGraphics
import ImageIO
import Foundation

let a = CommandLine.arguments
let carpeta = URL(fileURLWithPath: a[1]), salida = URL(fileURLWithPath: a[2])
let fps = Int32(a[3])!, bitrate = Int(a[4])!
let archivos = try FileManager.default.contentsOfDirectory(at: carpeta, includingPropertiesForKeys: nil)
  .filter { $0.pathExtension == "png" }.sorted { $0.lastPathComponent < $1.lastPathComponent }
guard let primera = CGImageSourceCreateWithURL(archivos[0] as CFURL, nil), let img0 = CGImageSourceCreateImageAtIndex(primera, 0, nil) else { fatalError("sin cuadros") }
let ancho = img0.width, alto = img0.height
try? FileManager.default.removeItem(at: salida)

let escritor = try AVAssetWriter(outputURL: salida, fileType: .mp4)
escritor.shouldOptimizeForNetworkUse = true
let ajustes: [String: Any] = [
  AVVideoCodecKey: AVVideoCodecType.h264,
  AVVideoWidthKey: ancho, AVVideoHeightKey: alto,
  AVVideoColorPropertiesKey: [
    AVVideoColorPrimariesKey: AVVideoColorPrimaries_ITU_R_709_2,
    AVVideoTransferFunctionKey: AVVideoTransferFunction_ITU_R_709_2,
    AVVideoYCbCrMatrixKey: AVVideoYCbCrMatrix_ITU_R_709_2,
  ],
  AVVideoCompressionPropertiesKey: [
    AVVideoAverageBitRateKey: bitrate,
    AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
    AVVideoH264EntropyModeKey: AVVideoH264EntropyModeCABAC,
    AVVideoMaxKeyFrameIntervalKey: Int(fps),
    AVVideoExpectedSourceFrameRateKey: Int(fps),
    AVVideoAllowFrameReorderingKey: true,
  ],
]
let entrada = AVAssetWriterInput(mediaType: .video, outputSettings: ajustes)
entrada.expectsMediaDataInRealTime = false
let adaptador = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: entrada, sourcePixelBufferAttributes: [
  kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
  kCVPixelBufferWidthKey as String: ancho, kCVPixelBufferHeightKey as String: alto,
])
escritor.add(entrada)
guard escritor.startWriting() else { fatalError("\(String(describing: escritor.error))") }
escritor.startSession(atSourceTime: .zero)

let espacio = CGColorSpace(name: CGColorSpace.sRGB)!
for (i, url) in archivos.enumerated() {
  autoreleasepool {
    guard let src = CGImageSourceCreateWithURL(url as CFURL, nil), let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else { fatalError("no se pudo leer \(url.path)") }
    while !entrada.isReadyForMoreMediaData { usleep(2000) }
    var pb: CVPixelBuffer?
    CVPixelBufferPoolCreatePixelBuffer(nil, adaptador.pixelBufferPool!, &pb)
    let buf = pb!
    CVPixelBufferLockBaseAddress(buf, [])
    let ctx = CGContext(data: CVPixelBufferGetBaseAddress(buf), width: ancho, height: alto, bitsPerComponent: 8, bytesPerRow: CVPixelBufferGetBytesPerRow(buf),
      space: espacio, bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)!
    ctx.interpolationQuality = .none
    ctx.draw(img, in: CGRect(x: 0, y: 0, width: ancho, height: alto))
    CVPixelBufferUnlockBaseAddress(buf, [])
    if !adaptador.append(buf, withPresentationTime: CMTime(value: CMTimeValue(i), timescale: fps)) { fatalError("\(String(describing: escritor.error))") }
  }
}
entrada.markAsFinished()
escritor.endSession(atSourceTime: CMTime(value: CMTimeValue(archivos.count), timescale: fps))
let sem = DispatchSemaphore(value: 0)
escritor.finishWriting { sem.signal() }
sem.wait()
print(escritor.status == .completed ? "video: \(archivos.count) cuadros, \(ancho)x\(alto)" : "error: \(String(describing: escritor.error))")
