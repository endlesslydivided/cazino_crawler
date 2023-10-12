import { MessageType } from '../consts/errorMessages';
import { BaseException } from './base.exception';

interface IInternalServerErrorException {
    message?: string | MessageType;
    reason: string;
}

export class InternalServerErrorException extends BaseException {
    constructor({ message, reason }: IInternalServerErrorException) {
        super({
            code: 500,
            message: message ?? MessageType.SERVER_ERROR,
            reason,
        });
    }
}
