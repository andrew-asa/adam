interface plugin_ext {

}
interface plugin {
    name: string;
    desc: string;
    icon: string;
    path: string;
    keywords: string[];
    type: 'app' | 'web' | 'code';
    version: string;
    ext?: plugin_ext
}

interface option extends plugin {

}

interface app extends plugin {
    type: 'app';
}
interface code extends plugin {
    type: 'code';
}
interface web extends plugin {
    type: 'web';
}