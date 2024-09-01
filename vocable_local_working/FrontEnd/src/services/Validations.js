export default class Validations {
    static checkEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true); 
        }else{
            return (false);
        }
    }

    static minLenght(stringa, minLenght){
        if(stringa.lenght<minLenght){
            return false;
        }else{
            return true;
        }
    }
}