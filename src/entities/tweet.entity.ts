export class Tweet {
    private _username: string;
    private _avatar: string;
    private _tweet: string;

    constructor(username: string, avatar: string, tweet: string) {
        this._username = username;
        this._avatar = avatar;
        this._tweet = tweet;
    }

    get username(): string {
        return this._username;
    }

    get avatar(): string {
        return this._avatar;
    }

    get tweet(): string {
        return this._tweet;
    }

    toJSON() {
        return {
            username: this.username,
            avatar: this.avatar,
            tweet: this.tweet,
        };
    }
}