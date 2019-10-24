export interface ApplicationI {
    // id?: string;
    // test?: any;
    // name: string;
    // uri: string;
    // iconUri: string;
    // description: string;
    // unique?: string;

    id?: string;
    applicationName: string;
    applicationUrl: string;
    iconUrl: string;
    description: DescriptionHash;
    roles: [];
    unique?: string;
}

interface DescriptionHash {
    [lanuage: string]: string;
}
