import {generate} from 'otp-generator';

export const generateOTP = () => {
    try{
        return generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
    }catch{
        console.log(`Error on generate OTP: ${error}`);
    }
}