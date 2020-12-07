export const validate_password = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
export const validate_username = /.{3,}/;
export const validate_name = /^[a-zA-Z]{2,}$/;
export const validate_phone = /[0-9]{8,}/;
export const validate_date = /^((((19|[2-9]\d)\d{2})\-(0[13578]|1[02])\-(0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})\-(0[13456789]|1[012])\-(0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})\-02\-(0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\-02\-29))$/g;  //?
export const validate_stime = /^(20|21|22|23|[0-1]\d):[0-5]\d$/;
export const validate_etime = /^(20|21|22|23|[0-1]\d):[0-5]\d$/;
export const validate_time = /^(20|21|22|23|[0-1]\d):[0-5]\d$/; //edit