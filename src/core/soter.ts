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

export const soterApiTest = {
    inquiry: "https://sandbox.btfssoter.io/api/v0/inquiry",
    add: "https://sandbox.btfssoter.io/api/v0/add",
    recharge: "TMTqojR33e8QoB34bjsGi4D8zJgrFVopsr"
};

export const soterApi = {
    inquiry: "https://api.btfssoter.io/api/v0/inquiry",
    add: "https://api.btfssoter.io/api/v0/add",
    recharge: "TEAxH9kfc28syd1cBrwbsBz88QG5wPL8Ek"
};

import {uuidv4, ts} from "./utils";
import * as axios from "axios";
const Axios = axios.default;


export class Soter{

    private api: { inquiry: string, add: string, recharge: string};

    constructor(private tronweb: any = (window as any).tronWeb, isTest:boolean = true){
        this.api = isTest ? soterApiTest : soterApi;
    }

    async inquiry(file_size: number): Promise<SoterInquiryResponse> {

        const user_address = this.tronweb.defaultAddress.base58;

        const {status, data} = await Axios.get( this.api.inquiry , {
            params: {
                user_address,
                file_size
            }
        });

        console.log(status, data);
        
        return data;
    }

    async recharge(amount: number): Promise<void> {
        const res = await this.tronweb.trx.sendTransaction(this.api.recharge, amount, "1002000");
        console.log(res);
    }

    async add( file: File, progressHandler: (...args: any[]) => void): Promise<SoterAddResponse>{

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

        

        const {status, data} = await Axios.post(this.api.add, formData);

        console.log(status, data);

        return data;
    }

}
