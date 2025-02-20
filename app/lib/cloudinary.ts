import type { CloudinarySignature } from '@/types'
// {
//   "asset_id": "2a91de3e7ea53f414c96cc49ff8587eb",
//   "public_id": "watermarked/swpk67vj6kjcjtfmcwvv",
//   "version": 1739923973,
//   "version_id": "7fcc9ca3bad8a38875da37bb5df72dbf",
//   "signature": "45c4dbd066ea738ad7cbd11686f73ef53fa2d051",
//   "width": 526,
//   "height": 701,
//   "format": "jpg",
//   "resource_type": "image",
//   "created_at": "2025-02-19T00:12:53Z",
//   "tags": [],
//   "bytes": 71138,
//   "type": "upload",
//   "etag": "9239e920c6511a3bd4dfebe1cc39ede3",
//   "placeholder": false,
//   "url": "http://res.cloudinary.com/tellsenales-cloud/image/upload/v1739923973/watermarked/swpk67vj6kjcjtfmcwvv.jpg",
//   "secure_url": "https://res.cloudinary.com/tellsenales-cloud/image/upload/v1739923973/watermarked/swpk67vj6kjcjtfmcwvv.jpg",
//   "folder": "watermarked",
//   "original_filename": "impresion-hp-latex-365",
//   "eager": [
//     {
//       "transformation": "c_pad,h_300,w_400",
//       "width": 400,
//       "height": 300,
//       "bytes": 18736,
//       "format": "jpg",
//       "url": "http://res.cloudinary.com/tellsenales-cloud/image/upload/c_pad,h_300,w_400/v1739923973/watermarked/swpk67vj6kjcjtfmcwvv.jpg",
//       "secure_url": "https://res.cloudinary.com/tellsenales-cloud/image/upload/c_pad,h_300,w_400/v1739923973/watermarked/swpk67vj6kjcjtfmcwvv.jpg"
//     },
//     {
//       "transformation": "c_crop,h_200,w_260",
//       "width": 260,
//       "height": 200,
//       "bytes": 11198,
//       "format": "jpg",
//       "url": "http://res.cloudinary.com/tellsenales-cloud/image/upload/c_crop,h_200,w_260/v1739923973/watermarked/swpk67vj6kjcjtfmcwvv.jpg",
//       "secure_url": "https://res.cloudinary.com/tellsenales-cloud/image/upload/c_crop,h_200,w_260/v1739923973/watermarked/swpk67vj6kjcjtfmcwvv.jpg"
//     }
//   ],
//   "api_key": "781191585666779"
// }
type CloudinarySuccessResponse = {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: string[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  folder: string
  original_filename: string
}

export const uploadFilesFromClient = async (
  files: File[],
  signData: CloudinarySignature,
  cb: (data: CloudinarySuccessResponse) => void
) => {
  const url =
    'https://api.cloudinary.com/v1_1/' + signData.cloudname + '/auto/upload'
  const formData = new FormData()
  for (const file of files) {
    formData.append('file', file)
    formData.append('api_key', signData.apikey)
    formData.append('timestamp', signData.timestamp)
    formData.append('signature', signData.signature)
    formData.append('eager', 'c_pad,h_300,w_400|c_crop,h_200,w_260')
    formData.append('folder', 'watermarked')

    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    })
    const data = (await res.json()) as CloudinarySuccessResponse
    cb(data)
  }
}
