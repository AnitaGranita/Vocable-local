import Validations from "./Validations";

export default class SignupValidations {
    constructor(nickname,email, password) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }

    checkValidations() {
        let errors = [];

        //controllo nome
        if (!Validations.minLenght(this.nickname,3)) {
            errors['nickname'] = 'Il nickname dovrebbe essere lungo almeno 3 caratteri';
        }

        //controllo email
        if (!Validations.checkEmail(this.email)) {
            errors['email'] = 'email non valida';
        }

        //controllo password
        if (!Validations.minLenght(this.password, 6)) {
            errors['password'] = 'la password dovrebbe essere lunga più di 6 caratteri';
        }

        return errors;
    }
}
