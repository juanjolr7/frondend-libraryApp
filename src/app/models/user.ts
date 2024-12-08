export interface User {
    id:         number;
    name:       string;
    email:      string;
    password:   string;
    id_rol:     number;
    created_at: Date;
    updated_at: Date;
    rol:        Rol;
}

export interface Rol {
    id:         number;
    name:       string;
    created_at: Date;
    updated_at: Date;
}

