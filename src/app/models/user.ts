import { Rol } from "./rol";

export class User {
    id:         number;
    name:       string;
    email:      string;
    password:   string;
    id_rol:     number;
    created_at: Date;
    updated_at: Date;
    rol:        Rol;
}