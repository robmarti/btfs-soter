export interface SoterInquiryResponse{
    
    code: number;

    message: string;

    balance: string;

}

export interface SoterAddResponse{

    code: number;

    message: string;

    cid?: string;

}

export interface SoterOptions {

    tronweb?: any;

    isTest?: boolean;

}

const soterApiTest = {
    maxFileSize: 2 * 1024 * 1024 * 1024, // 2GB
    inquiry: "https://sandbox.btfssoter.io/api/v0/inquiry",
    add: "https://sandbox.btfssoter.io/api/v0/add",
    recharge: "TEAxH9kfc28syd1cBrwbsBz88QG5wPL8Ek",
    tokenId: "1000008"
};

const soterApi = {
    maxFileSize: 2 * 1024 * 1024 * 1024, // 2GB
    inquiry: "https://api.btfssoter.io/api/v0/inquiry",
    add: "https://api.btfssoter.io/api/v0/add",
    recharge: "TMTqojR33e8QoB34bjsGi4D8zJgrFVopsr",
    tokenId: "1002000"
};

import {uuidv4, ts} from "./utils";
import * as axios from "axios";
const Axios = axios.default;


export class Soter{

    private api: { maxFileSize: number, inquiry: string, add: string, recharge: string, tokenId: string};

    private tronweb: any;

    constructor(options: SoterOptions = {tronweb: (window as any).tronWeb, isTest: false}){

        this.tronweb = !!options.tronweb ? options.tronweb : (window as any).tronWeb;
        this.api = !!options.isTest ? soterApiTest : soterApi;
    }

    async inquiry(file_size: number): Promise<SoterInquiryResponse> {

        const user_address = this.tronweb.defaultAddress.base58;

        const {data} = await Axios.get( this.api.inquiry , {
            params: {
                user_address,
                file_size
            }
        });
        
        return data;
    }

    async recharge(amount: number): Promise<any> {
        return await this.tronweb.trx.sendToken(this.api.recharge, amount, this.api.tokenId);
    }

    async add( file: File ): Promise<SoterAddResponse>{

        if(file.size > this.api.maxFileSize){
            throw new Error("Your file exceeds the maximum file size");
        }

        const request_user = this.tronweb.defaultAddress.base58;
        const signed_user = this.tronweb.defaultAddress.base58;
        const request_id = uuidv4();
        const timestamp = ts();

        const raw_data = {
            request_user,
            signed_user,
            request_id,
            timestamp
        };

        const signature = await this.tronweb.trx.sign(this.tronweb.toHex(JSON.stringify(raw_data)));

        const formData = new FormData();

        formData.append("raw_data", JSON.stringify(raw_data));
        formData.append("signature", signature);
        formData.append("file", file);

        const {data} = await Axios.post(this.api.add, formData);

        return data;
    }

}
