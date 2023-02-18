export interface IData {
    id: number
    nickname: string
    text: string
    time: string
}
export interface IMsg {
    code: number
    msg: string
    data: Array<IData>
}