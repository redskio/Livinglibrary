export class Message {

    constructor(
        public senderId: string,
        public receiverId: string,
        public text: string,
        public timestamp: any
    ) {}

}
