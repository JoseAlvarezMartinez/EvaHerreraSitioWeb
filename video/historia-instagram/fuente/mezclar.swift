// Une un video (sin recodificar) con una pista de audio AAC.   mezclar <video.mp4> <audio.m4a> <salida.mp4>
// Con un solo argumento, muestra los datos técnicos del archivo.
import AVFoundation
import Foundation

let a = CommandLine.arguments
func datos(_ url: URL) {
  let asset = AVURLAsset(url: url)
  print(String(format: "%@ · %.3f s", url.lastPathComponent, CMTimeGetSeconds(asset.duration)))
  for t in asset.tracks {
    let d = t.formatDescriptions.first.map { $0 as! CMFormatDescription }
    var codec = "?"
    if let d = d {
      let c: UInt32 = CMFormatDescriptionGetMediaSubType(d)
      let bytes: [UInt8] = [UInt8((c >> 24) & 255), UInt8((c >> 16) & 255), UInt8((c >> 8) & 255), UInt8(c & 255)]
      codec = String(bytes: bytes, encoding: .ascii) ?? "?"
    }
    if t.mediaType == .video {
      let seg: Double = CMTimeGetSeconds(t.timeRange.duration)
      let cuadros: Int = Int((seg * Double(t.nominalFrameRate)).rounded())
      let mbps: Double = Double(t.estimatedDataRate) / 1e6
      print("  video \(codec) \(Int(t.naturalSize.width))x\(Int(t.naturalSize.height)) · \(t.nominalFrameRate) fps · \(String(format: "%.2f", mbps)) Mb/s · \(cuadros) cuadros")
    } else {
      var hz: Double = 0
      var canales: Int = 0
      if let d = d, let p = CMAudioFormatDescriptionGetStreamBasicDescription(d) { hz = p.pointee.mSampleRate; canales = Int(p.pointee.mChannelsPerFrame) }
      let kbps: Int = Int(t.estimatedDataRate / 1000)
      print("  audio \(codec) \(Int(hz)) Hz · \(canales) canales · \(kbps) kb/s")
    }
  }
}
if a.count == 2 { datos(URL(fileURLWithPath: a[1])); exit(0) }
let video = AVURLAsset(url: URL(fileURLWithPath: a[1])), audio = AVURLAsset(url: URL(fileURLWithPath: a[2]))
let salida = URL(fileURLWithPath: a[3])
try? FileManager.default.removeItem(at: salida)
let comp = AVMutableComposition()
let vt = video.tracks(withMediaType: .video)[0], at = audio.tracks(withMediaType: .audio)[0]
let rango = CMTimeRange(start: .zero, duration: vt.timeRange.duration)
let cv = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
try cv.insertTimeRange(rango, of: vt, at: .zero)
let ca = comp.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid)!
try ca.insertTimeRange(CMTimeRange(start: .zero, duration: CMTimeMinimum(at.timeRange.duration, rango.duration)), of: at, at: .zero)
let exp = AVAssetExportSession(asset: comp, presetName: AVAssetExportPresetPassthrough)!
exp.outputURL = salida
exp.outputFileType = .mp4
exp.shouldOptimizeForNetworkUse = true
let sem = DispatchSemaphore(value: 0)
exp.exportAsynchronously { sem.signal() }
sem.wait()
if exp.status == .completed { datos(salida) } else { print("error: \(String(describing: exp.error))"); exit(1) }
