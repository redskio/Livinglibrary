export class Comment {

    public $key: string;

    constructor(
        public text: string,
        public timestamp: any,
        public userId: string
    ) {}

}
