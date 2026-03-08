const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const NAME_REGEX = /^[A-Za-z]+$/;


export const isEmail = (email: string) => {
    return EMAIL_REGEX.test(email);
}

export const isPassword = (password: string) => {
    return PASSWORD_REGEX.test(password);
}


export const isName = (name: string) => {
    return NAME_REGEX.test(name);
}

