export interface SoterInquiryResponse {
    code: number;
    message: string;
    balance: string;
}
export interface SoterAddResponse {
    code: number;
    message: string;
    cid?: string;
}
export declare const soterApiTest: {
    inquiry: string;
    add: string;
    recharge: string;
};
export declare const soterApi: {
    inquiry: string;
    add: string;
    recharge: string;
};
export declare class Soter {
    private tronweb;
    private api;
    constructor(tronweb?: any, isTest?: boolean);
    inquiry(file_size: number): Promise<SoterInquiryResponse>;
    recharge(amount: number): Promise<void>;
    add(file: File, progressHandler: (...args: any[]) => void): Promise<SoterAddResponse>;
}
