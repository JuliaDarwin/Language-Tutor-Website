
export {} //this makes the file a module (?)

export type Roles = "admin" | "moderator";

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: Roles;
        };
    }
}

//then we went to clerk> users> changed my PUBLIC config to role: "admin"