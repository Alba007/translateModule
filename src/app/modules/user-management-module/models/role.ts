export interface Role {
    id?: string;
    type: Type;
    name: string;
    description: string;
    active: boolean;
}

enum Type {
    SYSTEM,
    APPLICATION
}

