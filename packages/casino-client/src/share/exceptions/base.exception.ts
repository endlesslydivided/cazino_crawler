import { MessageType } from '../consts/errorMessages';

interface IBaseException {
    message: string | MessageType;
    reason: string;
    code: number;
}

export class BaseException implements IBaseException {
    public readonly code: number;
    public readonly message: string | MessageType;
    public readonly reason: string;

    constructor({ code, message, reason }: IBaseException) {
        this.code = code;
        this.message = message;
        this.reason = reason;
    }
}
