export interface PackageManager {
  name: string
  website: string
}

export interface Headers {
  'User-Agent': string
  Accept: string
  'Accept-Language': string
  'Accept-Encoding': string
  Origin: string
  Referer: string
  Cookie: string
}

export interface Params {
  page_size: number
  page: number
}
export interface Request {
  api_urls: string[]
  'params:': Params
  headers: Headers
}

export interface App {
  id: string
  name: string
  api_kind: string
  website: string
  plugin_page: string
  request: Request
  file: string
  packageManagers?: PackageManager[]
}
