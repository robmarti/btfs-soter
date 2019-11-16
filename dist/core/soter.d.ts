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
export declare class Soter {
    private tronweb;
    private api;
    constructor(tronweb?: any, isTest?: boolean);
    inquiry(file_size: number): Promise<SoterInquiryResponse>;
    recharge(amount: number): Promise<any>;
    add(file: File): Promise<SoterAddResponse>;
}
