export default function (req: any, _res: any, next: Function) {
  req.feathers.header = req.headers
  next()
}
