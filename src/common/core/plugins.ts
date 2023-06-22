export interface plugin_ext {
    [key: string]: any
}
export interface AdamPlugin {
    name: string;
    desc: string;
    icon: string;
    path: string;
    keywords: string[];
    type: 'app' | 'web' | 'code';
    version: string;
    ext?: plugin_ext
}

export interface option extends AdamPlugin {

}

export interface SystemApp extends AdamPlugin {
    type: 'app';
}
export interface AdamCode extends AdamPlugin {
    type: 'code';
}
export interface AdamWeb extends AdamPlugin {
    type: 'web';
}