interface plugin {
    name: string;
    desc: string;
    icon: string;
    path: string;
    keywords: [string];
    type: 'app' | 'web' | 'code';
    version: string;
}

interface option extends plugin {
    
}
