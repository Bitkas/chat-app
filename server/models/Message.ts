import { Channel } from "./channel"

export type Message = {
    message: string,
    to: string,
    from: string,
    channel: Channel,
    timestamp: string
}